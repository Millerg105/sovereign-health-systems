import type { Metadata } from "next";

import "./portfolio.css";

import { PortfolioShell } from "@/components/portfolio/portfolio-shell";
import { getPortfolioPageData } from "@/lib/portfolio";

export const metadata: Metadata = {
  title: "Miller Glenholmes | Digital Infrastructure & Performance Engineering",
  description:
    "Printable portfolio document for Miller Glenholmes and Sovereign Systems, showcasing digital infrastructure, automation, and performance engineering work.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function PortfolioPage() {
  const data = await getPortfolioPageData();

  return <PortfolioShell data={data} />;
}
