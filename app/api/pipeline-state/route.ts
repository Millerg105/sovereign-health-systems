import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Allowlist mirrors the dashboard route. Only these users can read/write pipeline_state.
const HARDCODED_ALLOWED = ["miller.glenholmes@outlook.com"];
function getAllowlist(): string[] {
  const env = process.env.NEXT_PUBLIC_HQ_ALLOWED_EMAILS;
  if (env && env.trim().length > 0) {
    return env.split(",").map((e) => e.trim().toLowerCase()).filter(Boolean);
  }
  return HARDCODED_ALLOWED.map((e) => e.toLowerCase());
}

async function authenticateRequest(req: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) {
    return { error: "Supabase env vars missing", status: 500 as const };
  }
  const auth = req.headers.get("authorization") || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  if (!token) {
    return { error: "Missing Authorization Bearer token", status: 401 as const };
  }
  // Validate the token by asking Supabase who it belongs to.
  const supabase = createClient(url, anonKey, { auth: { persistSession: false } });
  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data.user) {
    return { error: "Invalid or expired token", status: 401 as const };
  }
  const email = (data.user.email || "").toLowerCase();
  const allowlist = getAllowlist();
  if (!allowlist.includes(email)) {
    return { error: "Email not on HQ allowlist", status: 403 as const };
  }
  return { userId: data.user.id, email };
}

function getServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) throw new Error("Server env missing");
  return createClient(url, serviceKey, { auth: { persistSession: false, autoRefreshToken: false } });
}

export async function GET(req: NextRequest) {
  const auth = await authenticateRequest(req);
  if ("error" in auth) return NextResponse.json({ error: auth.error }, { status: auth.status });
  try {
    const supabase = getServiceClient();
    const { data, error } = await supabase
      .from("pipeline_state")
      .select("state, updated_at")
      .eq("user_id", auth.userId)
      .maybeSingle();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    if (!data) return NextResponse.json({ state: null, updatedAt: null });
    return NextResponse.json({ state: data.state, updatedAt: data.updated_at });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const auth = await authenticateRequest(req);
  if ("error" in auth) return NextResponse.json({ error: auth.error }, { status: auth.status });
  let body: { state?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
  if (!body || typeof body !== "object" || body.state === undefined) {
    return NextResponse.json({ error: "Body must be { state: <object> }" }, { status: 400 });
  }
  try {
    const supabase = getServiceClient();
    const { error } = await supabase
      .from("pipeline_state")
      .upsert(
        { user_id: auth.userId, state: body.state, updated_at: new Date().toISOString() },
        { onConflict: "user_id" },
      );
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true, savedAt: new Date().toISOString() });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
