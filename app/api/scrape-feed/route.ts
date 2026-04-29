import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { ApifyClient } from "apify-client";
import { getServiceClient } from "@/lib/hq";
import scrapeTargetsRaw from "@/config/scrape-targets.json";

type ScrapeTargets = {
  x: { actor: string; handles: string[]; postsPerHandle: number };
  reddit: { subreddits: string[]; postsPerSubreddit: number };
  linkedin: {
    actor: string;
    council_seats: { slug: string; url: string; name: string }[];
    postsPerSeat: number;
  };
  substack: { feeds: { slug: string; url: string; name: string }[]; postsPerFeed: number };
};
const scrapeTargets = scrapeTargetsRaw as unknown as ScrapeTargets;

export const runtime = "nodejs";
export const maxDuration = 300; // 5 min cron budget

type RawPost = {
  source: "x" | "reddit" | "linkedin" | "substack";
  source_url: string;
  source_post_id: string;
  council_member_slug?: string | null;
  post_author?: string;
  post_text: string;
  posted_at?: string | null;
};

type RelevanceVerdict = {
  score: number;
  tag: "systems" | "bookings" | "both" | "neither";
  reason: string;
};

// =====================================================================
// Sources
// =====================================================================

async function pullX(token: string): Promise<RawPost[]> {
  const cfg = scrapeTargets.x;
  if (!cfg.handles.length) return [];
  try {
    const client = new ApifyClient({ token });
    const run = await client.actor(cfg.actor).call(
      { profileUrls: cfg.handles.map((h) => `https://x.com/${h}`), tweetsDesired: cfg.postsPerHandle },
      { waitSecs: 90 },
    );
    const { items } = await client.dataset(run.defaultDatasetId).listItems({
      limit: cfg.handles.length * cfg.postsPerHandle * 2,
    });
    return items
      .map((p) => p as Record<string, unknown>)
      .filter((p) => typeof p.text === "string" || typeof p.fullText === "string")
      .map((p) => ({
        source: "x" as const,
        source_url: String(p.url || p.tweetUrl || ""),
        source_post_id: String(p.id || p.tweetId || p.url || ""),
        post_author: String(p.author || p.username || p.user || ""),
        post_text: String(p.text || p.fullText || ""),
        posted_at: p.createdAt ? new Date(String(p.createdAt)).toISOString() : null,
      }));
  } catch (err) {
    console.warn("X scrape failed:", err instanceof Error ? err.message : err);
    return [];
  }
}

async function pullReddit(): Promise<RawPost[]> {
  const cfg = scrapeTargets.reddit;
  const out: RawPost[] = [];
  for (const sub of cfg.subreddits) {
    try {
      const r = await fetch(`https://www.reddit.com/r/${sub}/new.json?limit=${cfg.postsPerSubreddit}`, {
        headers: { "user-agent": "SovereignSystemsBot/1.0 (+sovereignsystem.co.uk)" },
        signal: AbortSignal.timeout(15000),
      });
      if (!r.ok) continue;
      const j = await r.json();
      const children: Array<{ data: Record<string, unknown> }> = j?.data?.children || [];
      for (const c of children) {
        const d = c.data;
        const title = String(d.title || "");
        const selftext = String(d.selftext || "");
        const text = `${title}\n\n${selftext}`.trim();
        if (text.length < 60) continue; // skip empty/link-only posts
        out.push({
          source: "reddit",
          source_url: `https://www.reddit.com${d.permalink || ""}`,
          source_post_id: String(d.id || d.name || ""),
          post_author: String(d.author || ""),
          post_text: text.slice(0, 4000),
          posted_at: d.created_utc ? new Date(Number(d.created_utc) * 1000).toISOString() : null,
        });
      }
    } catch (err) {
      console.warn(`Reddit ${sub} failed:`, err instanceof Error ? err.message : err);
    }
  }
  return out;
}

async function pullLinkedin(token: string): Promise<RawPost[]> {
  const cfg = scrapeTargets.linkedin;
  if (!cfg.council_seats.length) return [];
  const out: RawPost[] = [];
  try {
    const client = new ApifyClient({ token });
    const run = await client.actor(cfg.actor).call(
      {
        profileUrls: cfg.council_seats.map((s) => s.url),
        maxPosts: cfg.postsPerSeat,
      },
      { waitSecs: 120 },
    );
    const { items } = await client.dataset(run.defaultDatasetId).listItems({
      limit: cfg.council_seats.length * cfg.postsPerSeat * 2,
    });
    const urlToSlug = new Map(cfg.council_seats.map((s) => [s.url.replace(/\/$/, ""), s.slug]));
    for (const raw of items) {
      const p = raw as Record<string, unknown>;
      const author = (p.author as Record<string, unknown> | undefined) || {};
      const profileUrl = String(p.profileUrl || p.authorProfileUrl || author.url || "").replace(/\/$/, "");
      const slug = urlToSlug.get(profileUrl) || null;
      const text = String(p.text || p.content || p.commentary || "");
      if (text.length < 80) continue;
      out.push({
        source: "linkedin",
        source_url: String(p.url || p.postUrl || ""),
        source_post_id: String(p.id || p.urn || p.url || ""),
        council_member_slug: slug,
        post_author: String(p.authorName || author.name || ""),
        post_text: text.slice(0, 4000),
        posted_at: p.postedAt ? new Date(String(p.postedAt)).toISOString() : null,
      });
    }
  } catch (err) {
    console.warn("LinkedIn scrape failed:", err instanceof Error ? err.message : err);
  }
  return out;
}

async function pullSubstack(): Promise<RawPost[]> {
  const cfg = scrapeTargets.substack;
  const out: RawPost[] = [];
  for (const feed of cfg.feeds) {
    try {
      const r = await fetch(feed.url, {
        headers: { "user-agent": "SovereignSystemsBot/1.0 (+sovereignsystem.co.uk)" },
        signal: AbortSignal.timeout(15000),
      });
      if (!r.ok) continue;
      const xml = await r.text();
      // Cheap RSS parse — extract <item> blocks.
      const items = xml.match(/<item>[\s\S]*?<\/item>/g) || [];
      for (const it of items.slice(0, cfg.postsPerFeed)) {
        const title = (it.match(/<title>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/) || [, ""])[1].trim();
        const link = (it.match(/<link>([\s\S]*?)<\/link>/) || [, ""])[1].trim();
        const guid = (it.match(/<guid[^>]*>([\s\S]*?)<\/guid>/) || [, link])[1].trim();
        const pubDate = (it.match(/<pubDate>([\s\S]*?)<\/pubDate>/) || [, ""])[1].trim();
        const description =
          (it.match(/<description>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/description>/) || [, ""])[1].trim();
        const text = `${title}\n\n${description.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").slice(0, 3000)}`;
        if (text.length < 80) continue;
        out.push({
          source: "substack",
          source_url: link,
          source_post_id: guid,
          council_member_slug: feed.slug,
          post_author: feed.name,
          post_text: text,
          posted_at: pubDate ? new Date(pubDate).toISOString() : null,
        });
      }
    } catch (err) {
      console.warn(`Substack ${feed.slug} failed:`, err instanceof Error ? err.message : err);
    }
  }
  return out;
}

// =====================================================================
// Haiku relevance filter
// =====================================================================

async function scoreBatch(anthropic: Anthropic, posts: RawPost[]): Promise<RelevanceVerdict[]> {
  if (!posts.length) return [];
  const prompt = `Score each post 0.0-1.0 for relevance to either bucket and tag it.

(systems) AI agency · automation · web design · Claude / agent builds · agency case studies · cold email · GHL / FB ads for B2B services
(bookings) garden rooms · UK contractors · pay-per-appointment lead gen · FB ads for trades · appointment-setting · tradesperson marketing

Score 0 if neither bucket. Score 1.0 only for high-signal, on-topic posts (specific tactic, concrete number, fresh insight). Score 0.7-0.9 for clearly relevant. Score 0.4-0.6 for adjacent. Score below 0.6 means we drop it.

Output ONE line per post in the same order, format:
INDEX|SCORE|TAG|REASON

Where TAG is "systems", "bookings", "both", or "neither". REASON is one short sentence (max 12 words).

Posts:
${posts.map((p, i) => `[${i}] (${p.source} ${p.post_author}): ${p.post_text.slice(0, 600).replace(/\n+/g, " ")}`).join("\n\n")}`;

  const resp = await anthropic.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 4000,
    messages: [{ role: "user", content: prompt }],
  });
  const text = resp.content.map((b) => (b.type === "text" ? b.text : "")).join("");
  const verdicts: RelevanceVerdict[] = posts.map(() => ({ score: 0, tag: "neither", reason: "no verdict" }));
  for (const line of text.split("\n")) {
    const m = line.match(/^\s*(\d+)\s*\|\s*([\d.]+)\s*\|\s*(systems|bookings|both|neither)\s*\|\s*(.+)$/i);
    if (!m) continue;
    const idx = Number(m[1]);
    if (idx < 0 || idx >= verdicts.length) continue;
    verdicts[idx] = {
      score: Math.max(0, Math.min(1, Number(m[2]))),
      tag: m[3].toLowerCase() as RelevanceVerdict["tag"],
      reason: m[4].slice(0, 240),
    };
  }
  return verdicts;
}

// =====================================================================
// Route
// =====================================================================

function isAuthorized(req: NextRequest): boolean {
  // Vercel cron auto-injects an Authorization header equal to CRON_SECRET when set.
  const cronSecret = process.env.SCRAPE_CRON_SECRET;
  if (cronSecret) {
    const auth = req.headers.get("authorization") || "";
    if (auth === `Bearer ${cronSecret}`) return true;
  }
  // Fallback: Vercel internal cron header.
  if (req.headers.get("x-vercel-cron")) return true;
  return false;
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const apifyToken = process.env.APIFY_TOKEN;
  const anthropicKey = process.env.ANTHROPIC_API_KEY;
  if (!apifyToken || !anthropicKey) {
    return NextResponse.json(
      { error: "APIFY_TOKEN or ANTHROPIC_API_KEY missing" },
      { status: 500 },
    );
  }

  const start = Date.now();

  // Pull from all 4 sources in parallel
  const [xPosts, redditPosts, liPosts, sbPosts] = await Promise.all([
    pullX(apifyToken),
    pullReddit(),
    pullLinkedin(apifyToken),
    pullSubstack(),
  ]);
  const all = [...xPosts, ...redditPosts, ...liPosts, ...sbPosts];

  if (!all.length) {
    return NextResponse.json({
      processed: 0,
      queued: 0,
      dropped: 0,
      durationMs: Date.now() - start,
      message: "No posts pulled.",
    });
  }

  // Dedup against existing rows in reading_queue (same source + source_post_id)
  const supabase = getServiceClient();
  const seenKeys = new Set(all.map((p) => `${p.source}::${p.source_post_id}`));
  const { data: existing } = await supabase
    .from("reading_queue")
    .select("source, source_post_id")
    .in("source_post_id", Array.from(new Set(all.map((p) => p.source_post_id))));
  const existingSet = new Set((existing || []).map((r) => `${r.source}::${r.source_post_id}`));
  const fresh = all.filter((p) => seenKeys.has(`${p.source}::${p.source_post_id}`) && !existingSet.has(`${p.source}::${p.source_post_id}`));

  if (!fresh.length) {
    return NextResponse.json({
      processed: all.length,
      queued: 0,
      dropped: 0,
      durationMs: Date.now() - start,
      message: "All posts already in queue.",
    });
  }

  // Score in batches of 10
  const anthropic = new Anthropic({ apiKey: anthropicKey });
  const verdicts: RelevanceVerdict[] = [];
  const BATCH = 10;
  for (let i = 0; i < fresh.length; i += BATCH) {
    const batchVerdicts = await scoreBatch(anthropic, fresh.slice(i, i + BATCH));
    verdicts.push(...batchVerdicts);
  }

  // Insert posts that pass threshold (≥0.6) — except council-member posts which get
  // queued regardless (we want voice samples even at lower scores).
  const rows = fresh
    .map((p, i) => ({ p, v: verdicts[i] }))
    .filter(({ p, v }) => v.score >= 0.6 || !!p.council_member_slug)
    .map(({ p, v }) => ({
      source: p.source,
      source_url: p.source_url,
      source_post_id: p.source_post_id,
      council_member_slug: p.council_member_slug || null,
      post_author: p.post_author || null,
      post_text: p.post_text,
      posted_at: p.posted_at,
      relevance_score: v.score,
      tag: v.tag,
      haiku_reason: v.reason,
      status: "new",
    }));

  if (rows.length) {
    const { error } = await supabase.from("reading_queue").insert(rows);
    if (error) {
      return NextResponse.json({ error: `Insert failed: ${error.message}` }, { status: 500 });
    }
  }

  return NextResponse.json({
    processed: all.length,
    fresh: fresh.length,
    queued: rows.length,
    dropped: fresh.length - rows.length,
    durationMs: Date.now() - start,
    sources: {
      x: xPosts.length,
      reddit: redditPosts.length,
      linkedin: liPosts.length,
      substack: sbPosts.length,
    },
  });
}
