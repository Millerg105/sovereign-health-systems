import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sovereign Digital — Links",
  description:
    "Sovereign Digital Limited. Web design (Sovereign Systems) and pay-per-appointment lead generation (Sovereign Bookings) for trades and local businesses across the UK.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Sovereign Digital — Links",
    description:
      "Web design (Systems) and pay-per-appointment lead generation (Bookings) for trades and local businesses.",
    url: "https://sovereignsystem.co.uk/links",
    siteName: "Sovereign Digital",
    locale: "en_GB",
    type: "website",
  },
  alternates: { canonical: "/links" },
};

const SYSTEMS_BLUE = "#3b82f6";
const BOOKINGS_GREEN = "#10b981";

type LinkCard = {
  label: string;
  sub: string;
  href: string;
  external?: boolean;
  logo?: { src: string; alt: string };
  accent?: string;
};

const cards: LinkCard[] = [
  {
    label: "Sovereign Systems",
    sub: "Websites + retainers for any business",
    href: "https://sovereignsystem.co.uk/",
    external: true,
    logo: { src: "/logo.png", alt: "Sovereign Systems" },
    accent: SYSTEMS_BLUE,
  },
  {
    label: "Sovereign Bookings",
    sub: "Free site, pay £300 per qualified appointment",
    href: "https://sovereignbookings.co.uk/",
    external: true,
    logo: { src: "/sovereign-bookings-logo.png", alt: "Sovereign Bookings" },
    accent: BOOKINGS_GREEN,
  },
  {
    label: "Book a 10-minute call",
    sub: "Pick a slot, no hard sell",
    href: "https://sovereignbookings.co.uk/book-call",
    external: true,
  },
  {
    label: "Systems client dashboard",
    sub: "What our retainer clients see",
    href: "https://sovereignsystem.co.uk/dashboard",
    external: true,
    accent: SYSTEMS_BLUE,
  },
  {
    label: "Bookings client dashboard",
    sub: "Live appointment tracker for garden room companies",
    href: "https://sovereignbookings.co.uk/dashboard",
    external: true,
    accent: BOOKINGS_GREEN,
  },
  {
    label: "Email us",
    sub: "contact.sovereignsystems@gmail.com",
    href: "mailto:contact.sovereignsystems@gmail.com",
    external: true,
  },
];

const socials = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/sovereignbookings/",
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@sovereignbookings",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M19.6 6.7a5.3 5.3 0 0 1-3.2-1.1V15a5.5 5.5 0 1 1-5.5-5.5c.3 0 .6 0 .9.1v2.7a2.8 2.8 0 1 0 1.9 2.7V2h2.7a5.3 5.3 0 0 0 3.2 4.7Z" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/sovereignbookings",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.9.3-1.5 1.6-1.5H17V4.4a23 23 0 0 0-2.4-.1c-2.4 0-4 1.4-4 4.1v2.1H8v3h2.6V21h2.9Z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/112880250",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M4.5 3.5A2 2 0 1 0 4.5 7.5 2 2 0 0 0 4.5 3.5ZM3 9h3v12H3V9Zm6 0h2.9v1.6h.1A3.2 3.2 0 0 1 15 9c3 0 3.6 2 3.6 4.5V21H15.7v-6.7c0-1.6 0-3.6-2.2-3.6S11 12.4 11 14.2V21H8V9Z" />
      </svg>
    ),
  },
];

export default function LinksPage() {
  return (
    <main
      className="min-h-screen flex flex-col items-center px-5 py-12 sm:py-16"
      style={{ background: "#000", color: "#fafafa" }}
    >
      <div className="w-full max-w-md flex-1 flex flex-col">
        {/* Header */}
        <header className="flex flex-col items-center text-center mb-10">
          <div
            className="text-[10px] sm:text-[11px] tracking-[0.4em] uppercase mb-4"
            style={{ color: "#666" }}
          >
            Sovereign Digital Limited
          </div>
          <h1
            className="text-3xl sm:text-4xl font-semibold tracking-tight mb-3"
            style={{ color: "#fafafa", letterSpacing: "-0.01em" }}
          >
            Sovereign Digital
          </h1>
          <p
            className="text-sm sm:text-base max-w-xs leading-relaxed"
            style={{ color: "#999" }}
          >
            Web design and pay-per-appointment lead generation for trades and local businesses.
          </p>
        </header>

        {/* Cards */}
        <nav className="flex flex-col gap-2.5" aria-label="Links">
          {cards.map((card) => {
            const className =
              "group block w-full rounded-2xl px-4 sm:px-5 py-4 transition-all border overflow-hidden relative hover:bg-white/[0.04] hover:border-white/20 active:scale-[0.99]";
            const style = {
              background: "#0a0a0a",
              borderColor: "#1f1f1f",
              color: "#fafafa",
            };

            const inner = (
              <div className="flex items-center gap-3.5 relative">
                {/* Accent stripe */}
                {card.accent && (
                  <span
                    className="absolute left-[-16px] sm:left-[-20px] top-1/2 -translate-y-1/2 w-1 h-10 rounded-r-full"
                    style={{ background: card.accent }}
                    aria-hidden="true"
                  />
                )}

                {/* Logo or spacer */}
                {card.logo ? (
                  <div
                    className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ background: "#fafafa" }}
                  >
                    <Image
                      src={card.logo.src}
                      alt={card.logo.alt}
                      width={28}
                      height={28}
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <div className="flex-shrink-0 w-10 h-10" aria-hidden="true" />
                )}

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-[15px] sm:text-base leading-tight">
                    {card.label}
                  </div>
                  <div
                    className="mt-0.5 text-xs sm:text-[13px] leading-snug truncate"
                    style={{ color: "#888" }}
                  >
                    {card.sub}
                  </div>
                </div>

                {/* Arrow */}
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="flex-shrink-0 w-4 h-4 opacity-40 group-hover:opacity-90 group-hover:translate-x-0.5 transition-all"
                  style={{ color: "#fafafa" }}
                  aria-hidden="true"
                >
                  <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            );

            return card.external ? (
              <a
                key={card.label}
                href={card.href}
                target={card.href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className={className}
                style={style}
              >
                {inner}
              </a>
            ) : (
              <Link key={card.label} href={card.href} className={className} style={style}>
                {inner}
              </Link>
            );
          })}
        </nav>

        {/* Socials */}
        <section className="mt-10 mb-6">
          <div
            className="text-[10px] tracking-[0.3em] uppercase mb-4 text-center"
            style={{ color: "#555" }}
          >
            Sovereign Bookings
          </div>
          <ul className="flex justify-center items-center gap-7 sm:gap-8" aria-label="Social links">
            {socials.map((social) => (
              <li key={social.name}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="block w-7 h-7 sm:w-8 sm:h-8 transition-all hover:scale-110 active:scale-95"
                  style={{ color: "#fafafa" }}
                >
                  {social.svg}
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* Footer */}
        <footer
          className="mt-auto pt-8 text-center text-[11px]"
          style={{ color: "#555" }}
        >
          <p>© Sovereign Digital Limited · Built in Wigan</p>
          <p className="mt-2 opacity-70">
            <Link href="/privacy" className="hover:text-white/80 underline-offset-2 hover:underline">
              Privacy
            </Link>
            <span className="mx-2">·</span>
            <Link href="/terms" className="hover:text-white/80 underline-offset-2 hover:underline">
              Terms
            </Link>
          </p>
        </footer>
      </div>
    </main>
  );
}
