import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HQ | Sovereign Systems",
  robots: { index: false, follow: false },
};

export default function HQLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
