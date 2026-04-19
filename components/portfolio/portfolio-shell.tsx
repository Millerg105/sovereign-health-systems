"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { PortfolioAbout } from "@/components/portfolio/portfolio-about";
import { PortfolioCaseStudy } from "@/components/portfolio/portfolio-case-study";
import { PortfolioComparison } from "@/components/portfolio/portfolio-comparison";
import { PortfolioContact } from "@/components/portfolio/portfolio-contact";
import { PortfolioCover } from "@/components/portfolio/portfolio-cover";
import { PortfolioHowWeWork } from "@/components/portfolio/portfolio-how-we-work";
import { PortfolioServices } from "@/components/portfolio/portfolio-services";
import { PortfolioShowcase } from "@/components/portfolio/portfolio-showcase";
import { PortfolioTopbar } from "@/components/portfolio/portfolio-topbar";
import type { PortfolioPageData } from "@/lib/portfolio";

type PortfolioShellProps = {
  data: PortfolioPageData;
};

const transition = { duration: 0.45, ease: [0.21, 1, 0.32, 1] } as const;

export function PortfolioShell({ data }: PortfolioShellProps) {
  return (
    <main className="portfolio-root overflow-x-hidden">
      <PortfolioTopbar className="portfolio-screen-only relative z-[2] mx-auto w-full max-w-[1440px] px-4 pt-5 sm:px-6 sm:pt-6" showExport={false} />

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
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ ...transition, delay: 0.1 }}>
          <PortfolioHowWeWork />
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
