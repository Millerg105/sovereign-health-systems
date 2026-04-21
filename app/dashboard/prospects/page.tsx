"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getSupabaseBrowserClient } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";
import { ProspectCard } from "./_components/prospect-card";
import { MapsInput } from "./_components/maps-input";
import { STAGE_LABELS, STAGE_ORDER, type Prospect, type ProspectStage } from "./_types";

export default function ProspectsPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [prospects, setProspects] = useState<Prospect[]>([]);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();
    let cancelled = false;

    supabase.auth.getSession().then(({ data }) => {
      if (cancelled) return;
      if (!data.session?.user) {
        router.replace("/sign-in");
        return;
      }
      setUser(data.session.user);
      setAccessToken(data.session.access_token);
      setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [router]);

  useEffect(() => {
    if (!user) return;

    const supabase = getSupabaseBrowserClient();
    let cancelled = false;

    const load = async () => {
      const { data, error } = await supabase
        .from("prospects")
        .select("*")
        .order("priority", { ascending: true, nullsFirst: false })
        .order("created_at", { ascending: false });

      if (cancelled) return;
      if (error) {
        setFetchError(error.message);
        return;
      }
      setProspects((data ?? []) as unknown as Prospect[]);
    };

    load();

    const channel = supabase
      .channel(`prospects-${user.id}`)
      .on(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        "postgres_changes" as any,
        { event: "*", schema: "public", table: "prospects", filter: `user_id=eq.${user.id}` },
        (payload: { eventType: string; new: Prospect; old: Prospect }) => {
          setProspects((current) => {
            if (payload.eventType === "INSERT") {
              if (current.some((p) => p.id === payload.new.id)) return current;
              return [payload.new, ...current];
            }
            if (payload.eventType === "UPDATE") {
              return current.map((p) => (p.id === payload.new.id ? payload.new : p));
            }
            if (payload.eventType === "DELETE") {
              return current.filter((p) => p.id !== payload.old.id);
            }
            return current;
          });
        },
      )
      .subscribe();

    return () => {
      cancelled = true;
      supabase.removeChannel(channel);
    };
  }, [user]);

  const grouped = useMemo(() => {
    const buckets: Record<ProspectStage, Prospect[]> = {
      pending_enrichment: [],
      enriched: [],
      approved: [],
      built: [],
      sent: [],
      replied: [],
      converted: [],
      dead: [],
    };
    for (const p of prospects) {
      const stage = (p.stage ?? "pending_enrichment") as ProspectStage;
      if (buckets[stage]) buckets[stage].push(p);
    }
    return buckets;
  }, [prospects]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#030303]">
        <div className="text-center">
          <div
            className="w-8 h-8 border-2 rounded-full animate-spin mx-auto mb-4"
            style={{ borderColor: "#22d3ee", borderTopColor: "transparent" }}
          />
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-white/40">
            Loading prospects...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030303] text-white">
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at 20% 10%, rgba(34,211,238,0.08), transparent 50%), radial-gradient(ellipse at 80% 90%, rgba(59,130,246,0.06), transparent 50%)",
        }}
      />

      <div className="relative z-10 px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-[0.12em] text-white/50 hover:text-white transition-colors mb-3"
            >
              <ArrowLeft size={12} />
              Dashboard
            </Link>
            <h1
              className="font-heading font-bold text-white"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}
            >
              Prospects
            </h1>
            <p className="text-sm mt-1 text-white/50">
              Pipeline of agency leads. Paste a Google Maps link to add one, Claude enriches it, you approve or bin.
            </p>
          </div>
          <div
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full"
            style={{
              background: "rgba(34, 211, 238, 0.08)",
              border: "1px solid rgba(34, 211, 238, 0.2)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#22d3ee] animate-pulse" />
            <span
              className="font-mono uppercase tracking-[0.12em]"
              style={{ fontSize: "10px", color: "#22d3ee" }}
            >
              {prospects.length} total
            </span>
          </div>
        </div>

        <MapsInput accessToken={accessToken} />

        {fetchError && (
          <div className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {fetchError}
          </div>
        )}

        <div className="mt-6 overflow-x-auto pb-6 -mx-6 px-6">
          <div className="flex gap-4 min-w-max">
            {STAGE_ORDER.map((stage) => (
              <div key={stage} className="w-[320px] shrink-0">
                <div
                  className="sticky top-[88px] z-10 mb-3 px-3 py-2.5 rounded-lg bg-black/60 backdrop-blur-md border border-white/10"
                >
                  <div className="flex items-center justify-between">
                    <span
                      className="font-mono uppercase tracking-[0.12em] text-white/70"
                      style={{ fontSize: "10px" }}
                    >
                      {STAGE_LABELS[stage]}
                    </span>
                    <span
                      className="font-mono tabular-nums px-1.5 py-0.5 rounded text-white/60"
                      style={{
                        fontSize: "10px",
                        background: "rgba(255,255,255,0.06)",
                      }}
                    >
                      {grouped[stage].length}
                    </span>
                  </div>
                </div>
                <div className="space-y-3">
                  {grouped[stage].length === 0 ? (
                    <div
                      className="rounded-lg p-4 text-center"
                      style={{
                        background: "rgba(255,255,255,0.02)",
                        border: "1px dashed rgba(255,255,255,0.06)",
                      }}
                    >
                      <p className="text-xs italic text-white/30">Empty</p>
                    </div>
                  ) : (
                    grouped[stage].map((prospect) => (
                      <ProspectCard
                        key={prospect.id}
                        prospect={prospect}
                        accessToken={accessToken}
                      />
                    ))
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
