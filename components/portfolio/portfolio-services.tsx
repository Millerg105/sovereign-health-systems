import { PortfolioPage } from "@/components/portfolio/portfolio-page";

const SERVICES = [
  {
    title: "Custom-Coded Platforms",
    description:
      "A proper website that actually brings in work — built from scratch, fast, mobile-ready, and designed to convert visitors into paying customers. Not a WordPress template.",
  },
  {
    title: "AI Receptionist",
    description:
      "Never miss a call again. When you're busy, our AI answers, qualifies the lead, and books them in — so the customer doesn't call your competitor instead.",
  },
  {
    title: "Missed-Call Text-Back",
    description:
      "Instant defensive cover. Miss a call? Automated SMS engages the caller within seconds. 78% buy from whoever responds first.",
  },
  {
    title: "Automated Booking",
    description:
      "Customers book themselves straight into your calendar — no phone tag, no back-and-forth texts. You just show up ready to go.",
  },
  {
    title: "SMS Reminders",
    description:
      "Automated confirmations that reduce no-shows and keep your pipeline moving without manual admin.",
  },
  {
    title: "Revenue Recovery",
    description:
      "Past customers sitting in a spreadsheet or nowhere at all? We reactivate them automatically — turning forgotten contacts back into paying customers.",
  },
];

export function PortfolioServices() {
  return (
    <PortfolioPage>
      <div className="flex h-full flex-col px-8 py-8 sm:px-10 sm:py-10 lg:px-14 lg:py-12">
        <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/55">How We Stop You Losing Money</div>
        <h2 className="mt-4 font-heading text-[clamp(2.2rem,4.2vw,4.6rem)] font-semibold tracking-[-0.04em] text-white">What We Build For You</h2>

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
