import Image from "next/image";

import type { PortfolioProject } from "@/lib/portfolio";

import { PortfolioPage } from "@/components/portfolio/portfolio-page";
import { PortfolioPlaceholder } from "@/components/portfolio/portfolio-placeholder";

type PortfolioCaseStudyProps = {
  project: PortfolioProject;
};

export function PortfolioCaseStudy({ project }: PortfolioCaseStudyProps) {
  return (
    <PortfolioPage>
      <div className="grid h-full lg:grid-cols-[0.92fr_1.08fr]">
        <div className="flex h-full flex-col border-b border-white/10 lg:border-b-0 lg:border-r">
          <div className="relative min-h-[310px] flex-1 overflow-hidden">
            {project.heroImage.exists ? (
              <>
                <Image src={project.heroImage.src} alt={project.heroImage.alt} fill className="object-cover object-top" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.02),rgba(0,0,0,0.28)),linear-gradient(90deg,rgba(0,0,0,0.2),rgba(0,0,0,0.04),rgba(0,0,0,0.2))]" />
                <div className="absolute inset-x-0 bottom-0 h-28 bg-[linear-gradient(180deg,transparent,rgba(1,3,6,0.92))]" />
              </>
            ) : (
              <PortfolioPlaceholder label={`${project.name} hero screenshot`} />
            )}
          </div>

          <div className="border-t border-white/10 bg-[linear-gradient(180deg,rgba(3,8,13,0.92),rgba(2,6,11,0.98))] p-4">
            <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">Supporting Frames</div>
            <div className="portfolio-support-grid">
              {project.supportingImages.length > 0 ? (
                project.supportingImages.map((image) => (
                  <div key={image.src} className="portfolio-support-card">
                    {image.exists ? (
                      <Image src={image.src} alt={image.alt} fill className="object-cover object-top" />
                    ) : (
                      <PortfolioPlaceholder label={image.alt} compact />
                    )}
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(2,6,11,0.48))]" />
                  </div>
                ))
              ) : (
                <div className="portfolio-support-card col-span-full">
                  <PortfolioPlaceholder label={`${project.name} supporting screenshot`} compact />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex h-full items-center px-7 py-7 sm:px-9 sm:py-9 lg:px-12 lg:py-10">
          <div className="glass-panel w-full rounded-[30px] border-white/10 px-6 py-6 sm:px-8 sm:py-7 lg:px-9 lg:py-8">
            <div className="font-body text-[3rem] font-semibold leading-none tracking-[-0.06em] text-brand-cyan text-glow sm:text-[4rem]">
              {project.number}
            </div>
            <h2 className="mt-3 font-heading text-[clamp(2rem,3.3vw,3.4rem)] font-semibold tracking-[-0.04em] text-white">
              {project.summaryTitle ?? "Project Summary"}
            </h2>
            <div className="mt-5 font-body text-[1.2rem] font-bold uppercase tracking-[0.04em] text-white sm:text-[1.36rem]">
              {project.name}
            </div>
            <div className="mt-1 font-body text-base font-medium text-white/65 sm:text-lg">{project.subtitle}</div>
            <div className="mt-4 font-mono text-[11px] uppercase tracking-[0.24em] text-brand-cyan/90">{project.typeLabel}</div>

            <div className="mt-6 space-y-4">
              {project.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-[0.98rem] leading-[1.72] text-white/82 sm:text-[1.04rem]">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PortfolioPage>
  );
}
