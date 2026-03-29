import Image from "next/image";

import type { PortfolioImage } from "@/lib/portfolio";

import { PortfolioPage } from "@/components/portfolio/portfolio-page";
import { PortfolioPlaceholder } from "@/components/portfolio/portfolio-placeholder";

type PortfolioCoverProps = {
  image: PortfolioImage;
};

export function PortfolioCover({ image }: PortfolioCoverProps) {
  return (
    <PortfolioPage>
      <div className="grid h-full md:grid-cols-[1.05fr_0.95fr]">
        <div className="relative min-h-[300px] overflow-hidden border-b border-white/10 md:border-b-0 md:border-r">
          {image.exists ? (
            <>
              <Image src={image.src} alt={image.alt} fill priority className="object-cover object-left-top" />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,4,8,0.2),rgba(2,4,8,0.44)),linear-gradient(180deg,rgba(0,0,0,0.12),rgba(0,0,0,0.46))]" />
            </>
          ) : (
            <PortfolioPlaceholder label="Sovereign Systems cover image" />
          )}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(34,211,238,0.12),transparent_26%)]" />
        </div>

        <div className="relative flex h-full flex-col justify-between px-8 py-8 sm:px-10 sm:py-10 lg:px-14 lg:py-14">
          <div>
            <div className="font-body text-[11px] font-semibold uppercase tracking-[0.34em] text-white/72 sm:text-xs">MILLER GLENHOLMES</div>
            <div className="mt-5 h-px w-28 bg-[linear-gradient(90deg,rgba(34,211,238,0.85),rgba(59,130,246,0.35),transparent)]" />
            <h1 className="portfolio-text-balance mt-8 max-w-[12ch] font-heading text-[clamp(2.7rem,5.2vw,5.4rem)] font-semibold leading-[0.94] tracking-[-0.05em] text-white">
              Digital Infrastructure &amp; Performance Engineering
            </h1>
            <p className="mt-6 font-body text-lg text-white/68 sm:text-xl">Portfolio 2025-2026</p>
          </div>

          <div className="flex items-end justify-end text-right">
            <p className="font-body text-sm text-white/75 sm:text-base">
              miller.glenholmes@outlook.com | +44 7405 179973
            </p>
          </div>
        </div>
      </div>
    </PortfolioPage>
  );
}
