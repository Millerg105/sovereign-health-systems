import { PortfolioPage } from "@/components/portfolio/portfolio-page";

const TRADITIONAL = [
  "WordPress templates with custom colours",
  "3-6 week delivery timelines",
  "GBP2,000-GBP10,000 for a digital brochure",
  "No automation, no lead capture",
  "GBP50-200/month to update plugins",
  "Slow, bloated, outdated technology",
];

const SOVEREIGN = [
  "Custom-coded with Next.js & React",
  "Delivered in days, not weeks",
  "Premium quality without agency bloat",
  "AI receptionist, SMS, booking built in",
  "24/7 revenue recovery automation",
  "Enterprise-grade technology stack",
];

const STATS = [
  { value: "DAYS", detail: "Launch windows measured in execution speed, not dragged-out retainers." },
  { value: "24/7", detail: "Automation layer stays live when your team is on-site, offline, or asleep." },
  { value: "CUSTOM", detail: "Every platform is engineered around your offer, workflow, and conversion pressure points." },
];

export function PortfolioComparison() {
  return (
    <PortfolioPage>
      <div className="flex h-full flex-col px-8 py-8 sm:px-10 sm:py-10 lg:px-14 lg:py-12">
        <h2 className="font-heading text-[clamp(2.3rem,4.2vw,4.8rem)] font-semibold tracking-[-0.04em] text-white">Why Sovereign Systems</h2>
        <div className="mt-4 h-px w-32 bg-[linear-gradient(90deg,rgba(34,211,238,0.85),rgba(59,130,246,0.4),transparent)]" />

        <div className="mt-8 grid flex-1 gap-5 lg:grid-cols-2">
          <section className="glass-panel rounded-[30px] border-white/10 p-6 lg:p-8">
            <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/38">Traditional Agencies</div>
            <div className="mt-5 space-y-4">
              {TRADITIONAL.map((item) => (
                <div key={item} className="flex gap-3 text-white/72">
                  <span className="mt-[2px] text-base text-rose-300">&times;</span>
                  <p className="text-[1rem] leading-[1.7] text-white/76">{item}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="glass-panel rounded-[30px] border-brand-cyan/18 p-6 shadow-[0_0_44px_rgba(34,211,238,0.08)] lg:p-8">
            <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/82">Sovereign Systems</div>
            <div className="mt-5 space-y-4">
              {SOVEREIGN.map((item) => (
                <div key={item} className="flex gap-3 text-white/92">
                  <span className="mt-[2px] text-base text-brand-cyan">&#10003;</span>
                  <p className="text-[1rem] leading-[1.7] text-white/90">{item}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {STATS.map((stat) => (
            <div key={stat.value} className="glass-panel rounded-[24px] border-white/10 p-5">
              <div className="font-body text-[2rem] font-semibold tracking-[-0.05em] text-brand-cyan text-glow">{stat.value}</div>
              <p className="mt-3 text-[0.95rem] leading-[1.65] text-white/70">{stat.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </PortfolioPage>
  );
}
