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
            <section key={group.id} className="glass-panel rounded-[28px] border-white/10 p-4">
              <div className="mb-4 flex items-center justify-between gap-3">
                <h3 className="font-body text-lg font-semibold uppercase tracking-[0.06em] text-white">{group.label}</h3>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-brand-cyan/80">
                  {group.images.length} Frames
                </span>
              </div>
              <div className="portfolio-showcase-grid">
                {group.images.map((image) => (
                  <div key={image.src} className="portfolio-showcase-card">
                    {image.exists ? (
                      <Image src={image.src} alt={image.alt} fill className="object-cover object-top" />
                    ) : (
                      <PortfolioPlaceholder label={image.alt} compact />
                    )}
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(2,6,11,0.22))]" />
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </PortfolioPage>
  );
}
