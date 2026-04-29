// Shared helpers for /api/enrich, /api/make-pitch, /api/send.
// Auth pattern mirrors /api/pipeline-state.

import { NextRequest } from "next/server";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

const HARDCODED_ALLOWED = ["miller.glenholmes@outlook.com"];

function getAllowlist(): string[] {
  const env = process.env.NEXT_PUBLIC_HQ_ALLOWED_EMAILS;
  if (env && env.trim().length > 0) {
    return env.split(",").map((e) => e.trim().toLowerCase()).filter(Boolean);
  }
  return HARDCODED_ALLOWED.map((e) => e.toLowerCase());
}

export type AuthError = { error: string; status: 400 | 401 | 403 | 500 };
export type AuthOk = { userId: string; email: string };

export async function authenticateRequest(req: NextRequest): Promise<AuthError | AuthOk> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return { error: "Supabase env vars missing", status: 500 };
  const auth = req.headers.get("authorization") || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  if (!token) return { error: "Missing Authorization Bearer token", status: 401 };
  const supabase = createClient(url, anonKey, { auth: { persistSession: false } });
  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data.user) return { error: "Invalid or expired token", status: 401 };
  const email = (data.user.email || "").toLowerCase();
  if (!getAllowlist().includes(email)) return { error: "Email not on HQ allowlist", status: 403 };
  return { userId: data.user.id, email };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let serviceClient: SupabaseClient<any> | null = null;
export function getServiceClient() {
  if (serviceClient) return serviceClient;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) throw new Error("Supabase server env missing");
  serviceClient = createClient(url, serviceKey, { auth: { persistSession: false, autoRefreshToken: false } });
  return serviceClient;
}

// Lead shape mirrors what the dashboard stores in pipeline_state.state.leads[].
// Kept loose: dashboard owns the canonical schema, server only mutates known fields.
export type Lead = {
  id: number;
  name: string;
  brand?: "systems" | "bookings";
  niche?: string;
  area?: string;
  source?: string;
  stage?: string;
  website?: string;
  mapsUrl?: string;
  facebook?: string;
  email?: string;
  phone?: string;
  ownerName?: string;
  leadScore?: number;
  pitchSubject?: string;
  pitchBody?: string;
  pitchNotes?: string;
  email_routing?: "cold" | "warm" | "mobile";
  lastContact?: string;
  slug?: string;
  [k: string]: unknown;
};

export type PipelineState = {
  leads?: Lead[];
  [k: string]: unknown;
};

export async function loadState(userId: string): Promise<PipelineState | null> {
  const supabase = getServiceClient();
  const { data, error } = await supabase
    .from("pipeline_state")
    .select("state")
    .eq("user_id", userId)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return (data?.state as PipelineState) || null;
}

export async function saveState(userId: string, state: PipelineState): Promise<void> {
  const supabase = getServiceClient();
  const { error } = await supabase
    .from("pipeline_state")
    .upsert(
      { user_id: userId, state, updated_at: new Date().toISOString() },
      { onConflict: "user_id" },
    );
  if (error) throw new Error(error.message);
}

export function findLead(state: PipelineState | null, leadId: number): Lead | null {
  if (!state?.leads) return null;
  return state.leads.find((l) => l.id === leadId) || null;
}

export function mutateLead(state: PipelineState, leadId: number, patch: Partial<Lead>): PipelineState {
  const leads = (state.leads || []).map((l) => (l.id === leadId ? { ...l, ...patch } : l));
  return { ...state, leads };
}

export function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

// Phase 0 SHARP: per-user engagement log for /dashboard/hq actions.
// Backs the Trial tab signal (Wooty 14-day trial pass/fail).
// Fire-and-forget, never throws — logging must not break the action.
export async function logEngagement(
  userId: string,
  email: string,
  actionKind: string,
  context?: Record<string, unknown>,
): Promise<void> {
  try {
    const supabase = getServiceClient();
    await supabase.from("hq_engagement_log").insert({
      user_id: userId,
      email,
      action_kind: actionKind,
      context: context || null,
    });
  } catch (err) {
    console.warn("[engagement-log] insert failed (non-fatal)", err);
  }
}

// Per-niche mentor framework lifted server-side from the dashboard's NICHE_TO_MENTOR map.
// Used as system context for /api/enrich and /api/make-pitch.
export type Mentor = { mentor: string; tag: string; angle: string; quote: string };

export const NICHE_TO_MENTOR: Record<string, Mentor[]> = {
  "Garden Rooms": [
    { mentor: "Kyran Rawson", tag: "Offer", angle: "PPA offer + tonality on setting call", quote: "First impression is everything. Tonality moves the needle more than the script." },
    { mentor: "Sean", tag: "Ads", angle: "FB ad warmup + show-up rate", quote: "CTR bands: 0-0.5% RED, 0.5-1% YELLOW, 1%+ GREEN. Disable Advantage+ audience." },
    { mentor: "Abdullah", tag: "Tools", angle: "Toll-free + GHL backend + 6-touch reminder", quote: "Use guarantee to hook the call, not pitch the guarantee on the call." },
  ],
  Driveways: [
    { mentor: "PARKED", tag: "Niche", angle: "Niche locked to Garden Rooms only. Re-open after £5k MRR proven.", quote: "" },
  ],
  "Tax/Accounting": [
    { mentor: "Kyle", tag: "Sales", angle: "Logic close · B2B", quote: 'Treat callbacks not cold calls. "I just saw you filled out our form, calling to schedule a quick time."' },
  ],
  "Beauty/Tan": [
    { mentor: "Abdullah", tag: "Ads", angle: "B2C creative + AI UGC", quote: "AI UGC intro then B-roll switch with price-based copy. Speel.app + Arcads + Higgsfield." },
  ],
  Sports: [
    { mentor: "Kyran", tag: "Offer", angle: "Premium tier offer framing · scary-bait anchor", quote: "Anchor with scary-bait offer, real offer sells itself. Fuel to the fire." },
  ],
  "Auto/Art": [
    { mentor: "Abdullah", tag: "Ads", angle: "B2C emotional close + seasonal calendar", quote: "Match emotional hook to seasonal calendar. Father's Day, Christmas Lights, Snow Removal." },
  ],
  "General Trades": [
    { mentor: "Kyran", tag: "Offer", angle: "Wigan Flip £800 site offer · pain point first", quote: "Pain point first, price last. Result · Mechanism · Price (Sabri Suby order)." },
  ],
  Other: [
    { mentor: "TBC", tag: "Niche", angle: "Generic agency framework — niche-specific guidance unavailable.", quote: "" },
  ],
};

export function mentorContext(niche?: string): { mentors: Mentor[]; markdown: string } {
  const mentors = NICHE_TO_MENTOR[niche || "Other"] || NICHE_TO_MENTOR["Other"];
  const markdown = mentors
    .map((m) => `**${m.mentor}** (${m.tag}) — ${m.angle}${m.quote ? `\n> "${m.quote}"` : ""}`)
    .join("\n\n");
  return { mentors, markdown };
}

// Channel routing per CLAUDE.md plan: cold→Resend, warm→mailto, mobile→whatsapp.
export type Channel = "gmail-mailto" | "resend" | "whatsapp";
export function routeChannel(lead: Lead): Channel {
  if (lead.email_routing === "cold") return "resend";
  if (lead.email_routing === "mobile") return "whatsapp";
  if (lead.email_routing === "warm") return "gmail-mailto";
  // Auto-route fallback
  if (!lead.email && lead.phone) return "whatsapp";
  if (lead.source === "Cold Email" || lead.source === "Apify" || lead.source === "Wigan Flip") return "resend";
  return "gmail-mailto";
}

export function buildMailto(to: string, subject: string, body: string): string {
  const u = new URLSearchParams({ subject, body });
  return `mailto:${encodeURIComponent(to)}?${u.toString()}`;
}

export function buildWhatsapp(phone: string, body: string): string {
  const clean = phone.replace(/[^\d+]/g, "").replace(/^\+/, "");
  return `https://wa.me/${clean}?text=${encodeURIComponent(body)}`;
}
