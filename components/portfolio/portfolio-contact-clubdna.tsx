import { CONTACT_EMAIL } from "@/lib/constants";

import { PortfolioPage } from "@/components/portfolio/portfolio-page";

export function PortfolioContactClubDNA() {
  return (
    <PortfolioPage>
      <div className="grid h-full md:grid-cols-[0.72fr_1.28fr]">
        <div className="flex flex-col justify-between border-b border-white/10 bg-[linear-gradient(180deg,rgba(2,5,9,0.9),rgba(1,3,6,0.98))] px-8 py-8 md:border-b-0 md:border-r md:px-10 md:py-10 lg:px-12 lg:py-12">
          <div>
            <h2 className="max-w-[10ch] font-heading text-[clamp(2.2rem,4vw,4.6rem)] font-semibold leading-[0.96] tracking-[-0.04em] text-white">
              Let&apos;s Build Something Great.
            </h2>
            <div className="mt-6 h-px w-28 bg-[linear-gradient(90deg,rgba(34,211,238,0.85),rgba(59,130,246,0.4),transparent)]" />
          </div>

          <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-white/42">
            SOVEREIGN SYSTEMS | 2025-2026
          </div>
        </div>

        <div className="flex h-full items-center px-8 py-8 sm:px-10 sm:py-10 lg:px-14 lg:py-12">
          <div className="w-full max-w-3xl">
            <div className="font-body text-[1.45rem] font-bold uppercase tracking-[0.06em] text-white sm:text-[1.7rem]">
              MILLER GLENHOLMES
            </div>
            <p className="mt-2 text-[1.05rem] text-white/72 sm:text-[1.2rem]">Digital Infrastructure &amp; Performance Engineering</p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                ["Email", CONTACT_EMAIL],
                ["Phone", "+44 7405 179973"],
                ["Web", "sovereignsystem.co.uk"],
                ["Based", "Wigan, Greater Manchester"],
              ].map(([label, value]) => (
                <div key={label} className="glass-panel rounded-[22px] border-white/10 px-5 py-4">
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-brand-cyan/82">{label}</div>
                  <div className="mt-2 font-body text-base text-white/88 sm:text-lg">{value}</div>
                </div>
              ))}
            </div>

            <p className="mt-8 max-w-2xl font-heading text-[1.2rem] italic leading-[1.55] text-white/52 sm:text-[1.45rem]">
              ClubDNA was built on intelligent systems. Your digital platform should be too.
            </p>
          </div>
        </div>
      </div>
    </PortfolioPage>
  );
}
