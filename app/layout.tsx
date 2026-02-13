import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google"; // Use Outfit later if requested, but stick to this for now as per prev context
import "./globals.css";
import { ChatWidget } from "@/components/chat-widget";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sovereign Systems | Elite Trade Automation & ROI Recovery",
  description: "Capture missed leads, automate quotes, and recover £5k+ in lost monthly revenue. Managed infrastructure for home service businesses. Fixed installation, not a subscription.",
  keywords: ["trade automation", "home service AI", "lead response", "UK trade systems", "business efficiency"],
  metadataBase: new URL("https://sovereignsystems.co.uk"),
  openGraph: {
    title: "Sovereign Systems | Elite Trade Automation",
    description: "Built for Sovereign Growth. Not a subscription.",
    url: "https://sovereignsystems.co.uk",
    siteName: "Sovereign Systems",
    images: [
      {
        url: "/og-image.png", // We should generate this or use a generic one
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
};

import { BackgroundLayer } from "@/components/ui/background-layer";
import { CookieConsent } from "@/components/ui/cookie-consent";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${playfair.variable} antialiased selection:bg-brand-cyan/30 font-body`}
      >
        <BackgroundLayer />
        {children}
        <ChatWidget />
        <CookieConsent />
      </body>
    </html>
  );
}
