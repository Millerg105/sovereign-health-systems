import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export function ClientInquiryCTA() {
  return (
    <div className="relative mt-8 overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(7,14,22,0.88),rgba(4,10,16,0.96))] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-xl sm:p-7">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(34,211,238,0.08),transparent_38%,transparent_65%,rgba(59,130,246,0.08))]" />

      <div className="relative flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-brand-cyan/20 bg-brand-cyan/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.16em] text-brand-cyan">
            <Sparkles className="h-3.5 w-3.5" />
            Need something more bespoke?
          </div>

          <h3 className="text-2xl font-heading font-bold tracking-tight text-white sm:text-3xl">
            For specialist builds, larger scopes, or specific client requirements, send a direct inquiry.
          </h3>
        </div>

        <Link
          href="/client-inquiry"
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-brand-cyan/35 bg-white/[0.03] px-6 py-3 text-sm font-semibold text-cyan-50 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-cyan/60 hover:bg-brand-cyan/10 hover:shadow-[0_0_24px_rgba(34,211,238,0.16)] sm:text-base"
        >
          Submit a Client Inquiry
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
