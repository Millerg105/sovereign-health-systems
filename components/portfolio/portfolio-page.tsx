import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type PortfolioPageProps = {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
};

export function PortfolioPage({ children, className, contentClassName }: PortfolioPageProps) {
  return (
    <section className="portfolio-sheet portfolio-print-exact">
      <div className={cn("portfolio-page-frame", className)}>
        <div className={cn("relative z-[1] h-full w-full", contentClassName)}>{children}</div>
      </div>
    </section>
  );
}
