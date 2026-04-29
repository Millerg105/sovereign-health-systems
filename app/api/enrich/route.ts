import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { ApifyClient } from "apify-client";
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

async function scrapeMaps(url: string): Promise<string> {
  const token = process.env.APIFY_TOKEN;
  if (!token) return `(Apify token missing — could not scrape ${url})`;
  const client = new ApifyClient({ token });
  // Actor name + input shape mirrors lead-enrich-from-maps SKILL.md.
  const run = await client.actor("compass/crawler-google-places").call(
    {
      startUrls: [{ url }],
      maxCrawledPlaces: 1,
      language: "en",
      scrapeReviews: false,
      scrapeContacts: true,
    },
    { waitSecs: 50 },
  );
  const { items } = await client.dataset(run.defaultDatasetId).listItems({ limit: 1 });
  if (!items?.length) return `(Maps scrape returned no items for ${url})`;
  const p = items[0] as Record<string, unknown>;
  // Field mapping per lead-enrich-from-maps SKILL.md step 3.
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
      url: p.url,
      neighborhood: p.neighborhood,
      openingHours: p.openingHours,
    },
    null,
    2,
  );
}

async function scrapeSite(url: string): Promise<string> {
  try {
    const r = await fetch(url, {
      headers: { "user-agent": "SovereignSystemsBot/1.0 (+https://sovereignsystem.co.uk)" },
      signal: AbortSignal.timeout(15000),
    });
    if (!r.ok) return `(Site fetch failed ${r.status} for ${url})`;
    const html = await r.text();
    // Strip scripts, styles, tags. Compress whitespace.
    const text = html
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 8000);
    return text;
  } catch (err) {
    return `(Site fetch error: ${err instanceof Error ? err.message : String(err)})`;
  }
}

export async function POST(req: NextRequest) {
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

  const url = lead.website || lead.mapsUrl || lead.facebook || "";
  if (!url) {
    return NextResponse.json(
      { error: "No URL on this lead. Add a website, Maps URL, or social link." },
      { status: 400 },
    );
  }

  const isMaps = url.includes("google.com/maps") || url.includes("maps.app.goo.gl");
  const scrapeOutput = isMaps ? await scrapeMaps(url) : await scrapeSite(url);

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "ANTHROPIC_API_KEY missing on server" }, { status: 500 });
  }

  const { markdown: mentorMd } = mentorContext(lead.niche);

  const anthropic = new Anthropic({ apiKey });
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

  let resp;
  try {
    resp = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 2000,
      messages: [{ role: "user", content: prompt }],
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: `Anthropic call failed: ${msg}` }, { status: 502 });
  }

  const text =
    resp.content
      .map((b) => (b.type === "text" ? b.text : ""))
      .join("")
      .trim() || "";

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

  const newState = mutateLead(state || {}, body.leadId, patch);
  await saveState(auth.userId, newState);

  return NextResponse.json({
    success: true,
    enriched,
    leadPatch: patch,
  });
}
