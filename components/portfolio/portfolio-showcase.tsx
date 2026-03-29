import Link from "next/link";
import Image from "next/image";

import type { PortfolioShowcaseGroup } from "@/lib/portfolio";

import { PortfolioPage } from "@/components/portfolio/portfolio-page";
import { PortfolioPlaceholder } from "@/components/portfolio/portfolio-placeholder";

type PortfolioShowcaseProps = {
  groups: PortfolioShowcaseGroup[];
};

export function PortfolioShowcase({ groups }: PortfolioShowcaseProps) {
  return (
    <PortfolioPage>
      <div className="flex h-full flex-col px-8 py-8 sm:px-10 sm:py-10 lg:px-14 lg:py-12">
        <h2 className="font-heading text-[clamp(2.2rem,4.2vw,4.6rem)] font-semibold tracking-[-0.04em] text-white">Portfolio Showcase</h2>
        <p className="mt-3 max-w-4xl font-body text-[1rem] leading-[1.7] text-white/68 sm:text-[1.08rem]">
          Platforms built across accountancy, trades, fitness, automotive, e-commerce, and professional services.
        </p>

        <div className="mt-8 grid flex-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
          {groups.map((group) => (
            <section key={group.id} className="glass-panel flex flex-col rounded-[28px] border-white/10 p-4">
              <div className="mb-4 flex items-center justify-between gap-3">
                <h3 className="font-body text-lg font-semibold uppercase tracking-[0.06em] text-white">{group.label}</h3>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-brand-cyan/80">Hero Frame</span>
              </div>
              <div className="portfolio-showcase-card min-h-[290px] flex-1">
                {group.heroImage.exists ? (
                  <Image src={group.heroImage.src} alt={group.heroImage.alt} fill className="object-cover object-top" />
                ) : (
                  <PortfolioPlaceholder label={group.heroImage.alt} compact />
                )}
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(2,6,11,0.12)_55%,rgba(2,6,11,0.85))]" />
              </div>
              <div className="mt-4 flex items-center justify-between gap-3">
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">Project Link</div>
                {group.siteHref ? (
                  <Link
                    href={group.siteHref}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center rounded-full border border-brand-cyan/28 bg-brand-cyan/10 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-cyan-50 transition-all hover:-translate-y-px hover:border-brand-cyan/55 hover:bg-brand-cyan/15"
                  >
                    {group.siteLabel}
                  </Link>
                ) : (
                  <div className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-brand-cyan/90">
                    {group.siteLabel}
                  </div>
                )}
              </div>
            </section>
          ))}
        </div>
      </div>
    </PortfolioPage>
  );
}
