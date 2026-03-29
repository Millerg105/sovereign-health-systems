import { ImageOff } from "lucide-react";

import { cn } from "@/lib/utils";

type PortfolioPlaceholderProps = {
  label: string;
  className?: string;
  compact?: boolean;
};

export function PortfolioPlaceholder({ label, className, compact = false }: PortfolioPlaceholderProps) {
  return (
    <div
      className={cn(
        "relative flex h-full w-full flex-col justify-between overflow-hidden rounded-[inherit] border border-white/8 bg-[linear-gradient(180deg,rgba(4,10,16,0.92),rgba(2,7,12,0.98))] p-4",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.12),transparent_35%),radial-gradient(circle_at_85%_25%,rgba(59,130,246,0.12),transparent_30%)]" />
      <div className="relative z-[1] flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.2em] text-brand-cyan/80">
        <span className="h-2 w-2 rounded-full bg-brand-cyan shadow-[0_0_14px_rgba(34,211,238,0.5)]" /> Screenshot Pending
      </div>
      <div className="relative z-[1] flex flex-1 flex-col items-center justify-center gap-3 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-brand-cyan/25 bg-brand-cyan/10 text-brand-cyan shadow-[0_0_20px_rgba(34,211,238,0.14)]">
          <ImageOff className={compact ? "h-4 w-4" : "h-6 w-6"} />
        </div>
        <div>
          <div className={cn("font-mono uppercase tracking-[0.18em] text-white/45", compact ? "text-[9px]" : "text-[10px]")}>Copy Puff Asset</div>
          <div className={cn("mt-1 font-body text-white/78", compact ? "text-[11px]" : "text-sm")}>{label}</div>
        </div>
      </div>
      {!compact && <div className="relative z-[1] text-[10px] uppercase tracking-[0.18em] text-white/28">Standby Render</div>}
    </div>
  );
}
