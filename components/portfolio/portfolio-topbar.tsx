"use client";

import Link from "next/link";
import { Printer } from "lucide-react";

type PortfolioTopbarProps = {
  className?: string;
};

export function PortfolioTopbar({ className }: PortfolioTopbarProps) {
  return (
    <div className={className}>
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <Link
          href="/"
          className="inline-flex min-h-[42px] items-center justify-center self-start rounded-full border border-brand-cyan/25 bg-black/50 px-4 font-mono text-xs font-semibold uppercase tracking-[0.12em] text-cyan-50 backdrop-blur-xl transition-all hover:-translate-y-px hover:border-brand-cyan/45 hover:bg-brand-cyan/10 hover:shadow-[0_0_18px_rgba(34,211,238,0.12)]"
        >
          Return To Main Site
        </Link>

        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex min-h-[48px] items-center justify-center gap-2 self-start rounded-full border border-brand-cyan/35 bg-black/60 px-5 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-cyan-50 shadow-[0_0_24px_rgba(34,211,238,0.1)] transition-all hover:-translate-y-px hover:border-brand-cyan/55 hover:bg-brand-cyan/10 hover:shadow-[0_0_28px_rgba(34,211,238,0.16)] lg:self-auto"
        >
          <Printer className="h-4 w-4" /> Export To PDF
        </button>
      </div>
    </div>
  );
}
