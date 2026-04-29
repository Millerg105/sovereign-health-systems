import { NextRequest, NextResponse } from "next/server";
import {
  authenticateRequest,
  findLead,
  loadState,
  mentorContext,
  mutateLead,
  saveState,
} from "@/lib/hq";

export const runtime = "nodejs";
export const maxDuration = 60;

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

function withTimeout<T>(p: Promise<T>, ms: number, fallback: T, label: string): Promise<T> {
  return Promise.race([
    p.catch((e) => {
      console.warn(`[/api/enrich] ${label} threw:`, e instanceof Error ? e.message : e);
      return fallback;
    }),
    new Promise<T>((resolve) => setTimeout(() => {
      console.warn(`[/api/enrich] ${label} hit ${ms}ms wall-clock timeout`);
      resolve(fallback);
    }, ms)),
  ]);
}

// =====================================================================
// Scrapers — Apify for Maps, Firecrawl for sites. Both via direct fetch
// (no SDKs) to avoid the Node-runtime hang we hit with native fetch +
// AbortSignal.timeout.
// =====================================================================

async function scrapeMapsViaApify(url: string): Promise<string> {
  const token = process.env.APIFY_TOKEN;
  if (!token) return `(APIFY_TOKEN missing)`;
  console.log("[/api/enrich] apify start");
  try {
    // run-sync-get-dataset-items returns dataset items directly when ready,
    // and waits up to ?timeout= seconds. Single round-trip, no polling.
    const r = await fetch(
      `https://api.apify.com/v2/acts/compass~crawler-google-places/run-sync-get-dataset-items?token=${token}&timeout=35&memory=1024`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          startUrls: [{ url }],
          maxCrawledPlaces: 1,
          language: "en",
          scrapeReviews: false,
          scrapeContacts: true,
        }),
      },
    );
    console.log("[/api/enrich] apify status", r.status);
    if (!r.ok) return `(Apify ${r.status})`;
    const items = (await r.json()) as Array<Record<string, unknown>>;
    if (!items?.length) return `(Apify returned no items)`;
    const p = items[0];
    return JSON.stringify(
      {
        firm: p.title || p.name,
        phone: p.phoneUnformatted || p.phone,
        website: p.website,
        address: p.address,
        city: p.city,
        categoryName: p.categoryName,
        categories: p.categories,
        rating: p.totalScore,
        reviewCount: p.reviewsCount,
      },
      null,
      2,
    );
  } catch (err) {
    return `(Apify error: ${err instanceof Error ? err.message : String(err)})`;
  }
}

async function scrapeLinkedInViaApify(url: string): Promise<string> {
  const token = process.env.APIFY_TOKEN;
  if (!token) return `(APIFY_TOKEN missing)`;
  console.log("[/api/enrich] apify-linkedin start");
  try {
    const r = await fetch(
      `https://api.apify.com/v2/acts/harvestapi~linkedin-profile-posts/run-sync-get-dataset-items?token=${token}&timeout=35&memory=1024`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profileUrls: [url], maxPosts: 5 }),
      },
    );
    console.log("[/api/enrich] apify-linkedin status", r.status);
    if (!r.ok) return `(LinkedIn ${r.status})`;
    const items = (await r.json()) as Array<Record<string, unknown>>;
    if (!items?.length) return `(LinkedIn returned no items)`;
    const out = items.slice(0, 5).map((p) => {
      const author = (p.author as Record<string, unknown> | undefined) || {};
      return `- ${author.name || "(unknown)"}: ${(p.text || p.content || "").toString().slice(0, 280)}`;
    }).join("\n");
    return `LinkedIn recent posts:\n${out}`;
  } catch (err) {
    return `(LinkedIn error: ${err instanceof Error ? err.message : String(err)})`;
  }
}

async function scrapeSiteViaFirecrawl(url: string): Promise<string> {
  const key = process.env.FIRECRAWL_API_KEY;
  if (!key) return `(FIRECRAWL_API_KEY missing)`;
  console.log("[/api/enrich] firecrawl start");
  try {
    const r = await fetch("https://api.firecrawl.dev/v2/scrape", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        url,
        formats: ["markdown"],
        onlyMainContent: true,
      }),
    });
    console.log("[/api/enrich] firecrawl status", r.status);
    if (!r.ok) {
      const text = await r.text();
      return `(Firecrawl ${r.status}: ${text.slice(0, 200)})`;
    }
    const j = (await r.json()) as { data?: { markdown?: string; metadata?: Record<string, unknown> } };
    const md = j.data?.markdown || "";
    const title = j.data?.metadata?.title || "";
    return `Title: ${title}\n\n${md.slice(0, 6000)}`;
  } catch (err) {
    return `(Firecrawl error: ${err instanceof Error ? err.message : String(err)})`;
  }
}

// =====================================================================
// Anthropic via direct fetch (skipping SDK to avoid runtime issues)
// =====================================================================

async function callAnthropicDirect(prompt: string, apiKey: string): Promise<string> {
  console.log("[/api/enrich] anthropic fetch start");
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 35000);
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
        max_tokens: 1500,
        messages: [{ role: "user", content: prompt }],
      }),
      signal: ctrl.signal,
    });
    clearTimeout(t);
    console.log("[/api/enrich] anthropic status", r.status);
    if (!r.ok) {
      const errText = await r.text();
      throw new Error(`Anthropic ${r.status}: ${errText.slice(0, 300)}`);
    }
    const j = (await r.json()) as {
      content?: Array<{ type: string; text?: string }>;
      stop_reason?: string;
    };
    return (j.content || []).map((b) => (b.type === "text" ? b.text || "" : "")).join("").trim();
  } finally {
    clearTimeout(t);
  }
}

// =====================================================================
// Route
// =====================================================================

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
  console.log("[/api/enrich] start");
  const auth = await authenticateRequest(req);
  if ("error" in auth) return NextResponse.json({ error: auth.error }, { status: auth.status });
  console.log("[/api/enrich] auth ok", auth.email);

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
  console.log("[/api/enrich] lead ok", { id: lead.id, name: lead.name, niche: lead.niche });

  const url = lead.website || lead.mapsUrl || lead.facebook || "";
  const isMaps = url ? url.includes("google.com/maps") || url.includes("maps.app.goo.gl") : false;
  const isLinkedIn = url ? url.includes("linkedin.com/") : false;
  const scrapeKind = !url ? "none" : isMaps ? "apify-maps" : isLinkedIn ? "apify-linkedin" : "firecrawl";

  // Scrape phase — every path returns a string (success or error sentinel),
  // never throws. Hard wall-clock so the function never hangs.
  let scrapeOutput: string;
  if (!url) {
    scrapeOutput = "(no URL on lead)";
  } else if (isMaps) {
    scrapeOutput = await withTimeout(scrapeMapsViaApify(url), 38000, "(Apify Maps timeout)", "apify-maps");
  } else if (isLinkedIn) {
    scrapeOutput = await withTimeout(scrapeLinkedInViaApify(url), 38000, "(Apify LinkedIn timeout)", "apify-linkedin");
  } else {
    // Site, Facebook, or Instagram URLs — Firecrawl handles all three.
    scrapeOutput = await withTimeout(scrapeSiteViaFirecrawl(url), 25000, "(Firecrawl timeout)", "firecrawl");
  }
  console.log("[/api/enrich] scrape done", { kind: scrapeKind, len: scrapeOutput.length });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "ANTHROPIC_API_KEY missing on server" }, { status: 500 });
  }

  const { markdown: mentorMd } = mentorContext(lead.niche);

  const prompt = `Enrich this lead by combining the scrape data and the mentor framework. Output a single JSON object only — no commentary, no markdown fences.

**Lead:** ${lead.name}
**Niche:** ${lead.niche}
**Area:** ${lead.area}
**URL:** ${url || "(none)"}
**Source:** ${lead.source}

**Mentor framework (curated for this niche):**
${mentorMd}

**Scrape data (${scrapeKind}):**
\`\`\`
${scrapeOutput}
\`\`\`

**Return JSON:**
{
  "firm": "<best business name>",
  "phone": "<+44... if found>",
  "email": "<info@... or owner email if found>",
  "ownerName": "<owner first name if found>",
  "address": "<full address if found>",
  "rating": 0,
  "reviewCount": 0,
  "categories": ["..."],
  "leadScore": <0-100>,
  "websiteIssue": "<one-line diagnosis from the scrape>",
  "heroHeadline": "<their current hero copy>",
  "pitchAngle": "<one-line angle from the mentor framework — name the mentor in parens>",
  "mentorPrincipleApplied": "<5-8 word canonical principle the angle invokes>",
  "opener4Line": "<4 short lines a Northern English founder would actually say. No em dashes.>"
}

If a field can't be determined from the data, use empty string or 0. No em dashes anywhere.`;

  let text: string;
  try {
    text = await callAnthropicDirect(prompt, apiKey);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[/api/enrich] anthropic failed", msg);
    return NextResponse.json({ error: `Anthropic call failed: ${msg}` }, { status: 502 });
  }

  console.log("[/api/enrich] anthropic returned", { len: text.length });

  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    return NextResponse.json({ error: "Anthropic did not return JSON", raw: text.slice(0, 500) }, { status: 502 });
  }
  let enriched: EnrichResult;
  try {
    enriched = JSON.parse(jsonMatch[0]) as EnrichResult;
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { error: `JSON parse failed: ${msg}`, raw: jsonMatch[0].slice(0, 500) },
      { status: 502 },
    );
  }

  // Merge into lead.
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
  if (lead.stage === "cold") patch.stage = "enriched";

  const newState = mutateLead(state || {}, body.leadId, patch);
  await saveState(auth.userId, newState);
  console.log("[/api/enrich] state saved");

  return NextResponse.json({
    success: true,
    enriched,
    leadPatch: patch,
    scrapedVia: scrapeKind,
  });
}
