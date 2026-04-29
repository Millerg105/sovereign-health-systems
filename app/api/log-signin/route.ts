import { NextRequest, NextResponse } from "next/server";
import { authenticateRequest, logEngagement } from "@/lib/hq";

// Phase 0 SHARP: tiny route called fire-and-forget by /dashboard/hq on allowed-status.
// Lands a sign_in row in hq_engagement_log so the Trial tab signal works.
export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const auth = await authenticateRequest(req);
  if ("error" in auth) return NextResponse.json({ error: auth.error }, { status: auth.status });

  let body: { userAgent?: string; viewport?: string } = {};
  try {
    body = await req.json();
  } catch {
    // Body optional, ignore parse errors.
  }

  await logEngagement(auth.userId, auth.email, "sign_in", {
    userAgent: body.userAgent || req.headers.get("user-agent") || "unknown",
    viewport: body.viewport,
  });

  return NextResponse.json({ ok: true });
}
