import { PortfolioPage } from "@/components/portfolio/portfolio-page";

const SERVICES = [
  {
    title: "Custom-Coded Platforms",
    description:
      "Bespoke digital infrastructure built with Next.js & React for speed, security, and total ownership. Enterprise-grade - not shared templates.",
  },
  {
    title: "AI Receptionist",
    description:
      "Your 24/7 front office. Handles enquiries, qualifies leads, and books meetings while your team focuses on high-value work.",
  },
  {
    title: "Missed-Call Text-Back",
    description:
      "Instant defensive cover. Miss a call? Automated SMS engages the caller within seconds. 78% buy from whoever responds first.",
  },
  {
    title: "Automated Booking",
    description:
      "High-tempo lead capture that locks in prospects immediately. No back-and-forth. Straight into your calendar.",
  },
  {
    title: "SMS Reminders",
    description:
      "Automated confirmations that reduce no-shows and keep your pipeline moving without manual admin.",
  },
  {
    title: "Revenue Recovery",
    description:
      "Intelligent automation taking lead capture from 20-30% to over 95%. Your platform works harder than any admin hire.",
  },
];

export function PortfolioServices() {
  return (
    <PortfolioPage>
      <div className="flex h-full flex-col px-8 py-8 sm:px-10 sm:py-10 lg:px-14 lg:py-12">
        <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/55">Infrastructure Layer</div>
        <h2 className="mt-4 font-heading text-[clamp(2.2rem,4.2vw,4.6rem)] font-semibold tracking-[-0.04em] text-white">What We Engineer</h2>

        <div className="mt-8 grid flex-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {SERVICES.map((service) => (
            <article
              key={service.title}
              className="glass-panel relative rounded-[26px] border border-white/10 p-5 shadow-[0_18px_36px_rgba(0,0,0,0.28)]"
            >
              <div className="absolute inset-x-5 top-0 h-px bg-[linear-gradient(90deg,rgba(34,211,238,0.82),rgba(59,130,246,0.4),transparent)]" />
              <div className="font-body text-lg font-semibold text-white sm:text-xl">{service.title}</div>
              <p className="mt-4 text-[0.98rem] leading-[1.75] text-white/78 sm:text-[1.02rem]">{service.description}</p>
            </article>
          ))}
        </div>
      </div>
    </PortfolioPage>
  );
}
