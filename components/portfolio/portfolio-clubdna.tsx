import { PortfolioPage } from "@/components/portfolio/portfolio-page";

const HELP_POINTS = [
  {
    title: "A custom-coded platform built for authority",
    body:
      "ClubDNA handles intelligent contract management at the highest level of football. Your website needs to project trust, speed, and technological sophistication to every club, agent, and governing body that visits it. We build that - not from a template, but from the ground up.",
  },
  {
    title: "24/7 lead capture and enquiry management",
    body:
      "When a club or agent visits your site outside office hours, the AI receptionist handles the enquiry, qualifies it, and books it into your calendar. No lead slips through because someone was busy on a deal.",
  },
  {
    title: "Missed-call text-back for high-stakes contacts",
    body:
      "In football, timing is everything. Miss a call from a club looking to move on a contract? Our system sends an instant SMS keeping that conversation alive until your team can respond.",
  },
  {
    title: "Speed of delivery",
    body:
      "While other agencies quote 6 weeks, we deliver in days. ClubDNA moves at the pace of the transfer window - your digital infrastructure should too.",
  },
  {
    title: "A platform that grows with you",
    body:
      "As ClubDNA scales, the technology scales with it. Custom-coded platforms don't hit the ceiling that WordPress templates do.",
  },
];

export function PortfolioClubDNA() {
  return (
    <PortfolioPage>
      <div className="flex h-full flex-col px-8 py-8 sm:px-10 sm:py-10 lg:px-14 lg:py-12">
        <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/55">Personalised Pitch</div>
        <h2 className="mt-4 font-heading text-[clamp(2.2rem,4.1vw,4.6rem)] font-semibold tracking-[-0.04em] text-white">
          How We Can Help ClubDNA
        </h2>
        <p className="mt-5 max-w-5xl text-[1rem] leading-[1.72] text-white/76 sm:text-[1.08rem]">
          ClubDNA was born from one of the most respected performance management platforms in elite sport. Your digital presence should reflect that same standard.
        </p>

        <div className="mt-8 grid flex-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
          {HELP_POINTS.map((point) => (
            <article key={point.title} className="glass-panel rounded-[26px] border-white/10 p-5">
              <div className="font-body text-lg font-semibold text-white">{point.title}</div>
              <p className="mt-4 text-[0.98rem] leading-[1.72] text-white/78">{point.body}</p>
            </article>
          ))}
        </div>

        <div className="mt-8 font-body text-base font-semibold text-brand-cyan text-glow sm:text-lg">
          I&apos;d love the opportunity to sit down and show you exactly what this would look like for ClubDNA.
        </div>
      </div>
    </PortfolioPage>
  );
}
