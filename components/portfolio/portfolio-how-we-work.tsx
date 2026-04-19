import { PortfolioPage } from "@/components/portfolio/portfolio-page";

type Way = {
  pill: string;
  title: string;
  body: string;
  brand: "systems" | "bookings";
  brandLabel: string;
  recommended?: boolean;
};

const WAYS: Way[] = [
  {
    pill: "Option A · One-off site",
    title: "Just a website, flat fee",
    body: "Clean, fast, professional. Mobile-first. Looks the part for referrals. No automations, no monthly. You just want a presence.",
    brand: "systems",
    brandLabel: "Powered by Sovereign Systems",
  },
  {
    pill: "Option B · Site + automations",
    title: "Full site + booking system",
    body: "Recommended. Full website, Google Business, booking flow, SMS auto-reply, review automation, dashboard. The lead engine most clients pick.",
    brand: "systems",
    brandLabel: "Powered by Sovereign Systems",
    recommended: true,
  },
  {
    pill: "Option C · Performance / PPA",
    title: "Pay only when leads land",
    body: "Pay-per-appointment model. We run the ads and the system. You only pay per qualified booked job. Available for garden room businesses right now.",
    brand: "bookings",
    brandLabel: "Powered by Sovereign Bookings",
  },
];

export function PortfolioHowWeWork() {
  return (
    <PortfolioPage>
      <div className="flex h-full flex-col px-8 py-8 sm:px-10 sm:py-10 lg:px-14 lg:py-12">
        <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/55">How We Work With You</div>
        <h2 className="mt-4 font-heading text-[clamp(2.2rem,4.2vw,4.6rem)] font-semibold tracking-[-0.04em] text-white">
          Three ways we work together.
        </h2>
        <p className="mt-4 max-w-3xl text-[1.02rem] leading-[1.7] text-white/70 sm:text-[1.08rem]">
          Same three options every client gets. Each one is live and running for someone right now.
        </p>

        <div className="mt-8 grid flex-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {WAYS.map((way) => (
            <article
              key={way.title}
              className="glass-panel relative rounded-[26px] border border-white/10 p-5 shadow-[0_18px_36px_rgba(0,0,0,0.28)]"
            >
              <div
                className={`absolute inset-x-5 top-0 h-px ${
                  way.brand === "bookings"
                    ? "bg-[linear-gradient(90deg,rgba(16,185,129,0.85),rgba(34,211,238,0.3),transparent)]"
                    : "bg-[linear-gradient(90deg,rgba(34,211,238,0.82),rgba(59,130,246,0.4),transparent)]"
                }`}
              />
              <div className="flex items-center gap-2">
                <span
                  className={`inline-block rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] ${
                    way.brand === "bookings"
                      ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-200"
                      : "border-brand-cyan/30 bg-brand-cyan/10 text-cyan-100"
                  }`}
                >
                  {way.pill}
                </span>
                {way.recommended ? (
                  <span className="inline-block rounded-full border border-white/20 bg-white/[0.06] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-white/80">
                    Recommended
                  </span>
                ) : null}
              </div>
              <div className="mt-4 font-body text-lg font-semibold text-white sm:text-xl">{way.title}</div>
              <p className="mt-3 text-[0.98rem] leading-[1.7] text-white/78 sm:text-[1.02rem]">{way.body}</p>
              <div
                className={`mt-5 font-mono text-[10px] uppercase tracking-[0.22em] ${
                  way.brand === "bookings" ? "text-emerald-300/90" : "text-brand-cyan/90"
                }`}
              >
                {way.brandLabel}
              </div>
            </article>
          ))}
        </div>
      </div>
    </PortfolioPage>
  );
}
