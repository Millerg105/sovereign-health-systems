"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Printer } from "lucide-react";

import { Banner } from "@/components/ui/banner";
import { PortfolioAbout } from "@/components/portfolio/portfolio-about";
import { PortfolioCaseStudy } from "@/components/portfolio/portfolio-case-study";
import { PortfolioClubDNA } from "@/components/portfolio/portfolio-clubdna";
import { PortfolioComparison } from "@/components/portfolio/portfolio-comparison";
import { PortfolioContact } from "@/components/portfolio/portfolio-contact";
import { PortfolioCover } from "@/components/portfolio/portfolio-cover";
import { PortfolioServices } from "@/components/portfolio/portfolio-services";
import { PortfolioShowcase } from "@/components/portfolio/portfolio-showcase";
import type { PortfolioPageData } from "@/lib/portfolio";

type PortfolioShellProps = {
  data: PortfolioPageData;
};

const transition = { duration: 0.45, ease: [0.21, 1, 0.32, 1] } as const;

export function PortfolioShell({ data }: PortfolioShellProps) {
  return (
    <main className="portfolio-root overflow-x-hidden">
      <div className="portfolio-screen-only relative z-[2] mx-auto flex w-full max-w-[1440px] flex-col gap-4 px-4 pt-5 sm:px-6 sm:pt-6">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <Banner
            title="Private portfolio deck"
            description="Standalone presentation route built to export cleanly as a landscape PDF."
            showShade
            icon={<span className="h-2 w-2 rounded-full bg-brand-cyan shadow-[0_0_12px_rgba(34,211,238,0.5)]" />}
            className="rounded-[24px] border-white/10 bg-black/50 px-4 py-3 text-white backdrop-blur-xl [&_p]:text-white [&_p:last-child]:text-white/70"
            action={
              <Link
                href="/"
                className="inline-flex min-h-[42px] items-center justify-center rounded-full border border-brand-cyan/25 bg-brand-cyan/10 px-4 font-mono text-xs font-semibold uppercase tracking-[0.12em] text-cyan-50 transition-all hover:-translate-y-px hover:border-brand-cyan/45 hover:bg-brand-cyan/15 hover:shadow-[0_0_18px_rgba(34,211,238,0.12)]"
              >
                Return To Main Site
              </Link>
            }
          />

          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex min-h-[48px] items-center justify-center gap-2 self-start rounded-full border border-brand-cyan/35 bg-black/60 px-5 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-cyan-50 shadow-[0_0_24px_rgba(34,211,238,0.1)] transition-all hover:-translate-y-px hover:border-brand-cyan/55 hover:bg-brand-cyan/10 hover:shadow-[0_0_28px_rgba(34,211,238,0.16)] lg:self-auto"
          >
            <Printer className="h-4 w-4" /> Export To PDF
          </button>
        </div>
      </div>

      <div className="portfolio-document">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={transition}>
          <PortfolioCover image={data.coverImage} />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ ...transition, delay: 0.04 }}>
          <PortfolioAbout />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ ...transition, delay: 0.08 }}>
          <PortfolioServices />
        </motion.div>
        {data.projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transition, delay: 0.12 + index * 0.03 }}
          >
            <PortfolioCaseStudy project={project} />
          </motion.div>
        ))}
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ ...transition, delay: 0.21 }}>
          <PortfolioClubDNA />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ ...transition, delay: 0.24 }}>
          <PortfolioShowcase groups={data.showcaseGroups} />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ ...transition, delay: 0.27 }}>
          <PortfolioComparison />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ ...transition, delay: 0.3 }}>
          <PortfolioContact />
        </motion.div>
      </div>

      <div className="portfolio-print-only fixed bottom-2 right-3 z-[1] font-mono text-[9px] uppercase tracking-[0.22em] text-white/30">
        Sovereign Systems Portfolio <ArrowUpRight className="ml-1 inline h-3 w-3" />
      </div>
    </main>
  );
}
