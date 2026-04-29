import { NextRequest, NextResponse } from "next/server";
import {
  authenticateRequest,
  findLead,
  loadState,
  logEngagement,
  mentorContext,
  mutateLead,
  saveState,
  routeChannel,
  todayISO,
} from "@/lib/hq";

// EDGE RUNTIME — Anthropic calls hang on Vercel's Node runtime even with
// direct fetch + AbortController (likely TLS/HTTP2 stack issue). Edge runs
// on Cloudflare Workers, different stack, no hang. 25s function budget is
// fine for Haiku 4.5 (3-8s typical).
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

type Pitch = {
  pitchSubject: string;
  pitchBody: string;
  mentorFrameworkUsed: string;
  headlineQuote: string;
  ctaLine: string;
};

export async function POST(req: NextRequest) {
  try {
    return await handleMakePitch(req);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    const stack = err instanceof Error ? err.stack : "";
    console.error("[/api/make-pitch] uncaught:", msg, stack);
    return NextResponse.json({ error: `make-pitch crashed: ${msg}` }, { status: 500 });
  }
}

async function handleMakePitch(req: NextRequest) {
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

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "ANTHROPIC_API_KEY missing on server" }, { status: 500 });
  }

  const { markdown: mentorMd } = mentorContext(lead.niche);
  const isBookings = lead.brand === "bookings";

  const offerBlock = isBookings
    ? `**Sovereign Bookings offer:** £500 setup + £300 per qualified appointment. FREE garden-room-firm website as the hook. No retainer until month 3. 10 qualified appointments in 30 days delivery commitment, 60-day cap, qualified criteria, clock-pause if client not fit.`
    : `**Sovereign Systems offer:** £800 Premium website (custom build, 5-7 pages, mobile-first, real photography). Optional £200/mo Foundation retainer (hosting, edits, monthly tune-up) — only after 30 days satisfaction.`;

  const prompt = `Write a personalised outreach pitch for "${lead.name}" (${lead.niche}, ${lead.area}). Use the mentor framework verbatim where it fits. No em dashes. Northern English casual tone (Miller is from Wigan, 21, founder).

**Lead context:**
- Name: ${lead.name}
- Brand: ${lead.brand}
- Niche: ${lead.niche}
- Area: ${lead.area}
- Source: ${lead.source}
- Website: ${lead.website || "(none)"}
- Owner: ${lead.ownerName || "(unknown)"}
- Lead score: ${lead.leadScore || "TBC"}
- Pitch angle (from prior enrich): ${lead.pitchAngle || "(none — derive from mentor framework)"}
- Mentor principle: ${lead.mentorPrincipleApplied || "(none — derive)"}
- Existing opener: ${lead.opener || "(none)"}

${offerBlock}

**Mentor framework (this niche):**
${mentorMd}

**Tone rules:**
- No em dashes anywhere.
- Northern English casual where the copy is conversational.
- Result first. Mechanism second. Price last (Sabri Suby order).
- One specific signal from the lead context (their area, niche, owner name) in the first 2 lines.
- Body 120-180 words. No fluff.

**Output JSON only (no commentary, no markdown fences):**
{
  "pitchSubject": "<8-12 words, lowercase, looks like a friend forwarded it>",
  "pitchBody": "<120-180 word email body, plain text, line breaks via \\n>",
  "mentorFrameworkUsed": "<which mentor's framework you leaned on, one sentence why>",
  "headlineQuote": "<the quote from the framework that anchors the pitch>",
  "ctaLine": "<one short line — a low-friction yes ask, not a calendar link spam>"
}`;

  let text: string;
  try {
    // Haiku 4.5 keeps the loop snappy on phone (≤30s tap-to-send target).
    text = await anthropicMessage(prompt, apiKey);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: `Anthropic call failed: ${msg}` }, { status: 502 });
  }
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    return NextResponse.json({ error: "Anthropic did not return JSON", raw: text }, { status: 502 });
  }
  let pitch: Pitch;
  try {
    pitch = JSON.parse(jsonMatch[0]) as Pitch;
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: `JSON parse failed: ${msg}`, raw: jsonMatch[0] }, { status: 502 });
  }

  // Defence: scrub em dashes if Anthropic snuck any through.
  pitch.pitchBody = (pitch.pitchBody || "").replace(/—/g, " - ").replace(/–/g, " - ");
  pitch.pitchSubject = (pitch.pitchSubject || "").replace(/—/g, " - ").replace(/–/g, " - ");

  const patch = {
    pitchSubject: pitch.pitchSubject,
    pitchBody: pitch.pitchBody,
    pitchNotes: `Mentor: ${pitch.mentorFrameworkUsed}\nHeadline quote: ${pitch.headlineQuote}\nCTA: ${pitch.ctaLine}\nGenerated: ${new Date().toISOString()}`,
    stage: lead.stage === "cold" || lead.stage === "mock" ? "pitching" : lead.stage,
    lastContact: todayISO(),
  };

  const newState = mutateLead(state || {}, body.leadId, patch);
  await saveState(auth.userId, newState);

  const channel = routeChannel({ ...lead, ...patch });

  await logEngagement(auth.userId, auth.email, "make_pitch", { leadId: body.leadId, leadName: lead.name, channel });

  return NextResponse.json({
    success: true,
    pitch,
    suggestedChannel: channel,
    leadId: body.leadId,
  });
}
