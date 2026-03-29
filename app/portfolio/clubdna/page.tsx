import type { Metadata } from "next";

import "../portfolio.css";

import { PortfolioShellClubDNA } from "@/components/portfolio/portfolio-shell-clubdna";
import { getPortfolioPageData } from "@/lib/portfolio";

export const metadata: Metadata = {
  title: "Miller Glenholmes | ClubDNA Portfolio",
  description:
    "Private ClubDNA portfolio presentation for Miller Glenholmes and Sovereign Systems.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function PortfolioClubDNAPage() {
  const data = await getPortfolioPageData();

  return <PortfolioShellClubDNA data={data} />;
}
