import { NextRequest, NextResponse } from "next/server";
import { authenticateRequest, getServiceClient, logEngagement } from "@/lib/hq";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const auth = await authenticateRequest(req);
  if ("error" in auth) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const url = new URL(req.url);
  const limit = Math.min(50, Number(url.searchParams.get("limit") || 20));
  const status = url.searchParams.get("status") || "new";

  const supabase = getServiceClient();
  const { data, error } = await supabase
    .from("reading_queue")
    .select("id, scraped_at, source, source_url, council_member_slug, post_author, post_text, posted_at, relevance_score, tag, haiku_reason, status")
    .eq("status", status)
    .order("relevance_score", { ascending: false, nullsFirst: false })
    .order("scraped_at", { ascending: false })
    .limit(limit);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ items: data || [] });
}

export async function POST(req: NextRequest) {
  const auth = await authenticateRequest(req);
  if ("error" in auth) return NextResponse.json({ error: auth.error }, { status: auth.status });

  let body: { id?: string; action?: "save" | "draft-outreach" | "deepen-seat" | "dismiss" };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
  if (!body.id || !body.action) {
    return NextResponse.json({ error: "Body must include {id, action}" }, { status: 400 });
  }

  const newStatus =
    body.action === "save"
      ? "saved"
      : body.action === "draft-outreach"
        ? "drafted"
        : body.action === "deepen-seat"
          ? "appended"
          : body.action === "dismiss"
            ? "dismissed"
            : null;
  if (!newStatus) return NextResponse.json({ error: "Unknown action" }, { status: 400 });

  const supabase = getServiceClient();
  const { data, error } = await supabase
    .from("reading_queue")
    .update({ status: newStatus })
    .eq("id", body.id)
    .select("id, source, council_member_slug, post_author, post_text, source_url, scraped_at, relevance_score, tag")
    .maybeSingle();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!data) return NextResponse.json({ error: "Row not found" }, { status: 404 });

  await logEngagement(auth.userId, auth.email, "reading_queue_action", {
    id: body.id,
    action: body.action,
    council_member_slug: data.council_member_slug,
    source: data.source,
  });

  // For deepen-seat, return a markdown snippet ready to append to the seat card.
  if (body.action === "deepen-seat") {
    const date = (data.scraped_at as string).slice(0, 10);
    const excerpt = String(data.post_text || "").replace(/\s+/g, " ").slice(0, 240);
    const markdown = `| ${date} | ${data.source} | ${Number(data.relevance_score || 0).toFixed(2)} | ${excerpt.replace(/\|/g, "/")} | ${data.source_url} |`;
    return NextResponse.json({ ok: true, status: newStatus, markdown });
  }

  return NextResponse.json({ ok: true, status: newStatus });
}
