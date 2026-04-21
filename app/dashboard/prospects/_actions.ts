"use server";

import { getSupabaseServerClient } from "@/lib/supabase-server";
import type { Prospect } from "./_types";

type ActionResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string };

const MAPS_HOSTS = ["google.com/maps", "maps.app.goo.gl", "goo.gl/maps"];

function isValidGoogleMapsUrl(url: string): boolean {
  return MAPS_HOSTS.some((host) => url.includes(host));
}

async function getUserIdFromToken(accessToken: string): Promise<string | null> {
  if (!accessToken) return null;
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase.auth.getUser(accessToken);
  if (error || !data.user) return null;
  return data.user.id;
}

export async function addProspect(
  accessToken: string,
  googleMapsUrl: string,
): Promise<ActionResult<Prospect>> {
  const userId = await getUserIdFromToken(accessToken);
  if (!userId) return { ok: false, error: "Not authenticated." };

  const trimmed = googleMapsUrl.trim();
  if (!isValidGoogleMapsUrl(trimmed)) {
    return { ok: false, error: "That does not look like a Google Maps link." };
  }

  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from("prospects")
    .insert({
      user_id: userId,
      business_name: "(pending enrichment)",
      google_maps_url: trimmed,
      stage: "pending_enrichment",
      brand: "systems",
    })
    .select("*")
    .single();

  if (error || !data) {
    return { ok: false, error: error?.message ?? "Insert failed." };
  }
  return { ok: true, data: data as unknown as Prospect };
}

async function updateStage(
  accessToken: string,
  id: string,
  stage: Prospect["stage"],
): Promise<ActionResult<Prospect>> {
  const userId = await getUserIdFromToken(accessToken);
  if (!userId) return { ok: false, error: "Not authenticated." };

  const supabase = getSupabaseServerClient();

  const { data: existing, error: fetchError } = await supabase
    .from("prospects")
    .select("user_id")
    .eq("id", id)
    .single();

  if (fetchError || !existing) {
    return { ok: false, error: "Prospect not found." };
  }
  if ((existing as { user_id: string }).user_id !== userId) {
    return { ok: false, error: "Not authorised." };
  }

  const { data, error } = await supabase
    .from("prospects")
    .update({ stage })
    .eq("id", id)
    .select("*")
    .single();

  if (error || !data) {
    return { ok: false, error: error?.message ?? "Update failed." };
  }
  return { ok: true, data: data as unknown as Prospect };
}

export async function approveProspect(
  accessToken: string,
  id: string,
): Promise<ActionResult<Prospect>> {
  return updateStage(accessToken, id, "approved");
}

export async function binProspect(
  accessToken: string,
  id: string,
): Promise<ActionResult<Prospect>> {
  return updateStage(accessToken, id, "dead");
}
