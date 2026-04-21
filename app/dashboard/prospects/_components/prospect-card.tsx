"use client";

import { useState, useTransition } from "react";
import ReactMarkdown from "react-markdown";
import { CheckCircle, Trash2, Star, ChevronDown } from "lucide-react";
import { approveProspect, binProspect } from "../_actions";
import type { Prospect } from "../_types";

interface ProspectCardProps {
  prospect: Prospect;
  accessToken: string;
}

function gapColour(score: number | null): string {
  if (score === null) return "rgba(255,255,255,0.2)";
  if (score >= 70) return "#DC2626";
  if (score >= 40) return "#F59E0B";
  return "#22d3ee";
}

function socialBadge(active: boolean | null): { dot: string; label: string; tint: string } {
  if (active === true) {
    return { dot: "#22c55e", label: "Active", tint: "rgba(34, 197, 94, 0.08)" };
  }
  if (active === false) {
    return { dot: "#DC2626", label: "Stale", tint: "rgba(220, 38, 38, 0.08)" };
  }
  return { dot: "rgba(255,255,255,0.4)", label: "Unknown", tint: "rgba(255,255,255,0.04)" };
}

export function ProspectCard({ prospect, accessToken }: ProspectCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const social = socialBadge(prospect.socials_active);
  const gapScore = prospect.gap_score ?? 0;
  const gapWidth = Math.max(0, Math.min(100, gapScore));

  const handleApprove = (e: React.MouseEvent) => {
    e.stopPropagation();
    setError(null);
    startTransition(async () => {
      const result = await approveProspect(accessToken, prospect.id);
      if (!result.ok) setError(result.error);
    });
  };

  const handleBin = (e: React.MouseEvent) => {
    e.stopPropagation();
    setError(null);
    startTransition(async () => {
      const result = await binProspect(accessToken, prospect.id);
      if (!result.ok) setError(result.error);
    });
  };

  return (
    <div
      className="rounded-xl bg-black/40 backdrop-blur-md border border-white/10 hover:border-white/20 transition-colors"
      style={{
        opacity: isPending ? 0.5 : 1,
      }}
    >
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="w-full text-left px-4 py-3.5 cursor-pointer"
      >
        <div className="flex items-start justify-between gap-2">
          <span className="font-semibold text-sm text-white leading-tight">
            {prospect.business_name}
          </span>
          <ChevronDown
            size={14}
            className="shrink-0 text-white/40 transition-transform mt-0.5"
            style={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }}
          />
        </div>

        {(prospect.niche || prospect.template_match) && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {prospect.niche && (
              <span
                className="font-mono uppercase tracking-[0.08em] rounded-full px-2 py-0.5"
                style={{
                  fontSize: "9px",
                  background: "rgba(34, 211, 238, 0.08)",
                  color: "#22d3ee",
                  border: "1px solid rgba(34, 211, 238, 0.2)",
                }}
              >
                {prospect.niche}
              </span>
            )}
            {prospect.template_match && (
              <span
                className="font-mono uppercase tracking-[0.08em] rounded-full px-2 py-0.5"
                style={{
                  fontSize: "9px",
                  background: "rgba(59, 130, 246, 0.08)",
                  color: "#60a5fa",
                  border: "1px solid rgba(59, 130, 246, 0.2)",
                }}
              >
                {prospect.template_match}
              </span>
            )}
          </div>
        )}

        {(prospect.owner_first_name || prospect.city) && (
          <p className="mt-2 text-xs text-white/50">
            {[prospect.owner_first_name, prospect.city].filter(Boolean).join(" · ")}
          </p>
        )}

        {prospect.gap_score !== null && (
          <div className="mt-3">
            <div className="flex items-center gap-2">
              <div
                className="flex-1 h-1.5 rounded-full overflow-hidden"
                style={{ background: "rgba(255,255,255,0.06)" }}
              >
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${gapWidth}%`,
                    background: gapColour(prospect.gap_score),
                  }}
                />
              </div>
              <span
                className="font-mono text-[10px] tabular-nums"
                style={{ color: gapColour(prospect.gap_score) }}
              >
                {prospect.gap_score}
              </span>
            </div>
          </div>
        )}

        <div className="mt-3 flex items-center justify-between gap-2">
          {prospect.review_count !== null || prospect.review_rating !== null ? (
            <div className="flex items-center gap-1.5 text-xs text-white/60">
              <Star size={12} className="text-amber-400" fill="currentColor" />
              <span className="font-mono tabular-nums">
                {prospect.review_rating !== null ? Number(prospect.review_rating).toFixed(1) : "0.0"}
              </span>
              {prospect.review_count !== null && (
                <span className="text-white/40">({prospect.review_count})</span>
              )}
            </div>
          ) : (
            <span />
          )}

          <div
            className="flex items-center gap-1.5 rounded-full px-2 py-0.5"
            style={{ background: social.tint }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: social.dot }}
            />
            <span
              className="font-mono uppercase tracking-[0.08em] text-white/70"
              style={{ fontSize: "9px" }}
            >
              {social.label}
            </span>
          </div>
        </div>
      </button>

      {expanded && (
        <div className="px-4 pb-3 -mt-1">
          {prospect.intel_report ? (
            <div
              className="rounded-lg p-3 text-xs leading-relaxed text-white/70 max-h-64 overflow-y-auto"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}
            >
              <div className="prose-prospect">
                <ReactMarkdown>{prospect.intel_report}</ReactMarkdown>
              </div>
            </div>
          ) : (
            <p className="text-xs italic text-white/40 px-1">
              No intel report yet. Claude will write one when this prospect is enriched.
            </p>
          )}
        </div>
      )}

      {error && (
        <div className="mx-4 mb-2 px-2 py-1.5 rounded-md text-[11px] text-red-400 bg-red-500/10 border border-red-500/20">
          {error}
        </div>
      )}

      <div className="flex border-t border-white/5">
        <button
          type="button"
          onClick={handleApprove}
          disabled={isPending || prospect.stage === "approved"}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-mono uppercase tracking-[0.1em] transition-colors hover:bg-[rgba(34,211,238,0.06)] text-white/60 hover:text-[#22d3ee] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          aria-label="Approve prospect"
        >
          <CheckCircle size={14} />
          Approve
        </button>
        <div className="w-px bg-white/5" />
        <button
          type="button"
          onClick={handleBin}
          disabled={isPending || prospect.stage === "dead"}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-mono uppercase tracking-[0.1em] transition-colors hover:bg-red-500/5 text-white/60 hover:text-red-400 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          aria-label="Bin prospect"
        >
          <Trash2 size={14} />
          Bin
        </button>
      </div>
    </div>
  );
}
