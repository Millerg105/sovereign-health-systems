import { NextRequest, NextResponse } from "next/server";
import {
  authenticateRequest,
  findLead,
  loadState,
  mentorContext,
  mutateLead,
  saveState,
} from "@/lib/hq";

// EDGE RUNTIME — switched 29 Apr 2026 evening after direct-fetch on the Node
// runtime kept hanging on the Anthropic call (Cloudflare 502 HTML reaching
// the dashboard, no Vercel logs at all in the 2hr window). Edge runtime uses
// the Cloudflare Workers fetch stack which doesn't share Node's TLS/HTTP2
// state machine, so the silent hang doesn't reproduce.
//
// Trade-offs accepted:
// - 25s function budget (was 60s) — Haiku 4.5 returns in 3-8s so plenty
// - No Apify SDK — Apify path was already bypassed, so no regression
// - Supabase client works on Edge (documented support)
export const runtime = "edge";

async function anthropicMessage(prompt: string, apiKey: string, maxTokens = 1500): Promise<string> {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 22000);
  try {
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: maxTokens,
        messages: [{ role: "user", content: prompt }],
      }),
      signal: ctrl.signal,
    });
    clearTimeout(t);
    if (!r.ok) {
      const errText = await r.text();
      throw new Error(`Anthropic ${r.status}: ${errText.slice(0, 300)}`);
    }
    const j = (await r.json()) as { content?: Array<{ type: string; text?: string }> };
    return (j.content || []).map((b) => (b.type === "text" ? b.text || "" : "")).join("").trim();
  } finally {
    clearTimeout(t);
  }
}

type EnrichResult = {
  firm?: string;
  phone?: string;
  email?: string;
  ownerName?: string;
  address?: string;
  rating?: number;
  reviewCount?: number;
  categories?: string[];
  leadScore?: number;
  websiteIssue?: string;
  heroHeadline?: string;
  pitchAngle?: string;
  mentorPrincipleApplied?: string;
  opener4Line?: string;
};

export async function POST(req: NextRequest) {
  try {
    return await handleEnrich(req);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    const stack = err instanceof Error ? err.stack : "";
    console.error("[/api/enrich] uncaught:", msg, stack);
    return NextResponse.json({ error: `enrich crashed: ${msg}` }, { status: 500 });
  }
}

async function handleEnrich(req: NextRequest) {
  const auth = await authenticateRequest(req);
  if ("error" in auth) return NextResponse.json({ error: auth.error }, { status: auth.status });

  let body: { leadId?: number };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
  if (typeof body.leadId !== "number") {
    return NextResponse.json({ error: "Body must be { leadId: number }" }, { status: 400 });
  }

  const state = await loadState(auth.userId);
  const lead = findLead(state, body.leadId);
  if (!lead) return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  console.log("[/api/enrich] lead", { id: lead.id, name: lead.name, niche: lead.niche, website: lead.website, mapsUrl: lead.mapsUrl, facebook: lead.facebook });

  const url = lead.website || lead.mapsUrl || lead.facebook || "";
  if (!url) {
    return NextResponse.json(
      { error: "No URL on this lead. Add a website, Maps URL, or social link." },
      { status: 400 },
    );
  }

  // Bypass ALL scraping. Apify was also hanging on Vercel's Node runtime.
  // Anthropic works from lead metadata + mentor framework alone.
  // (Re-enable Apify later via a separate /api/enrich-maps endpoint with its
  // own dedicated function.)
  const isMaps = url.includes("google.com/maps") || url.includes("maps.app.goo.gl");
  const t0 = Date.now();
  const scrapeOutput = `(scraping bypassed in this deploy; URL: ${url}, isMaps: ${isMaps})`;
  console.log("[/api/enrich] scrape phase done (bypassed)", { isMaps, ms: Date.now() - t0, url });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "ANTHROPIC_API_KEY missing on server" }, { status: 500 });
  }

  const { markdown: mentorMd } = mentorContext(lead.niche);

  const prompt = `Enrich this lead by combining the scrape data and the mentor framework. Output a single JSON object then a 4-line outreach opener.

**Lead:** ${lead.name}
**Niche:** ${lead.niche}
**Area:** ${lead.area}
**URL:** ${url}
**Source:** ${lead.source}

**Mentor framework (curated for this niche):**
${mentorMd}

**Scrape data (${isMaps ? "Apify Google Maps" : "site fetch"}):**
\`\`\`
${scrapeOutput}
\`\`\`

**Output JSON shape (return JSON only, no commentary, no markdown fences):**
{
  "firm": "<best business name>",
  "phone": "<+44... if found>",
  "email": "<info@... or owner email if found>",
  "ownerName": "<owner first name if found>",
  "address": "<full address if found>",
  "rating": 0,
  "reviewCount": 0,
  "categories": ["..."],
  "leadScore": <0-100 — base 50, +5 per 100 reviews, +10 if site<2s loads, +5 portfolio of 5+ visible jobs, -10 no mobile contact, -10 no clear pricing>,
  "websiteIssue": "<one-line diagnosis from the scrape>",
  "heroHeadline": "<their current hero copy>",
  "pitchAngle": "<one-line angle from the mentor framework — name the mentor in parens>",
  "mentorPrincipleApplied": "<5-8 word canonical principle the angle invokes>",
  "opener4Line": "<4 short lines a Northern English founder would actually say. No em dashes. Casual, direct, names a specific signal from the scrape.>"
}

No em dashes anywhere.`;

  let text: string;
  const t1 = Date.now();
  try {
    text = await anthropicMessage(prompt, apiKey);
    console.log("[/api/enrich] anthropic done", { ms: Date.now() - t1, len: text.length });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[/api/enrich] anthropic failed", { msg, ms: Date.now() - t1 });
    return NextResponse.json({ error: `Anthropic call failed: ${msg}` }, { status: 502 });
  }

  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    return NextResponse.json({ error: "Anthropic did not return JSON", raw: text }, { status: 502 });
  }
  let enriched: EnrichResult;
  try {
    enriched = JSON.parse(jsonMatch[0]) as EnrichResult;
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { error: `JSON parse failed: ${msg}`, raw: jsonMatch[0] },
      { status: 502 },
    );
  }

  // Merge non-empty enriched fields into the lead, preserving existing values.
  const patch: Partial<typeof lead> = {};
  for (const k of ["firm", "phone", "email", "ownerName", "address"] as const) {
    const v = enriched[k];
    if (typeof v === "string" && v && !v.startsWith("(")) patch[k === "firm" ? "name" : k] = v;
  }
  if (typeof enriched.leadScore === "number" && enriched.leadScore > 0) patch.leadScore = enriched.leadScore;
  if (typeof enriched.rating === "number") patch.rating = enriched.rating;
  if (typeof enriched.reviewCount === "number") patch.reviewCount = enriched.reviewCount;
  if (Array.isArray(enriched.categories)) patch.categories = enriched.categories;
  if (enriched.pitchAngle) patch.pitchAngle = enriched.pitchAngle;
  if (enriched.mentorPrincipleApplied) patch.mentorPrincipleApplied = enriched.mentorPrincipleApplied;
  if (enriched.opener4Line) patch.opener = enriched.opener4Line;
  patch.lastEnrichedAt = new Date().toISOString();
  // Auto-bump cold leads into the new "enriched" kanban column. Don't override
  // leads already further down the funnel.
  if (lead.stage === "cold") patch.stage = "enriched";

  const newState = mutateLead(state || {}, body.leadId, patch);
  await saveState(auth.userId, newState);

  return NextResponse.json({
    success: true,
    enriched,
    leadPatch: patch,
  });
}
