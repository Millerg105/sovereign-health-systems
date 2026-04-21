"use client";

import { useState, useTransition } from "react";
import { Plus } from "lucide-react";
import { addProspect } from "../_actions";

interface MapsInputProps {
  accessToken: string;
}

export function MapsInput({ accessToken }: MapsInputProps) {
  const [value, setValue] = useState("");
  const [message, setMessage] = useState<{ tone: "ok" | "err"; text: string } | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    const url = value.trim();
    if (!url) return;

    startTransition(async () => {
      const result = await addProspect(accessToken, url);
      if (result.ok) {
        setValue("");
        setMessage({ tone: "ok", text: "Added to pipeline, Claude will enrich shortly." });
      } else {
        setMessage({ tone: "err", text: result.error });
      }
    });
  };

  return (
    <div className="sticky top-0 z-20 -mx-4 sm:-mx-6 px-4 sm:px-6 py-4 bg-[#030303]/90 backdrop-blur-md border-b border-white/5">
      <form onSubmit={handleSubmit} className="flex gap-2 max-w-3xl">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Paste a Google Maps link to add a prospect"
          disabled={isPending}
          className="flex-1 rounded-lg outline-none transition-all text-white placeholder:text-white/30 disabled:opacity-50"
          style={{
            background: "rgba(255,255,255,0.04)",
            padding: "12px 14px",
            fontSize: "14px",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "#22d3ee";
            e.currentTarget.style.boxShadow = "0 0 0 2px rgba(34, 211, 238, 0.15)";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
            e.currentTarget.style.boxShadow = "none";
          }}
        />
        <button
          type="submit"
          disabled={isPending || value.trim().length === 0}
          className="flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-mono uppercase tracking-[0.1em] transition-all hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          style={{
            background: "rgba(34, 211, 238, 0.1)",
            color: "#22d3ee",
            border: "1px solid rgba(34, 211, 238, 0.25)",
          }}
        >
          <Plus size={14} />
          {isPending ? "Adding..." : "Add"}
        </button>
      </form>

      {message && (
        <p
          className="mt-2 text-xs"
          style={{ color: message.tone === "ok" ? "#22d3ee" : "#f87171" }}
        >
          {message.text}
        </p>
      )}
    </div>
  );
}
