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
  title: "Sovereign Systems | Web Design, Automation & AI Systems",
  description: "Premium websites, automation, and AI systems for businesses across the UK. Built by Sovereign Digital Limited.",
  keywords: ["web design", "business automation", "AI systems", "UK digital agency"],
  metadataBase: new URL("https://sovereignsystems.co.uk"),
  openGraph: {
    title: "Sovereign Systems | Web Design, Automation & AI Systems",
    description: "Premium websites, automation, and AI systems for businesses across the UK.",
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
