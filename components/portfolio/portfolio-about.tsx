import { PortfolioPage } from "@/components/portfolio/portfolio-page";

export function PortfolioAbout() {
  return (
    <PortfolioPage>
      <div className="flex h-full flex-col px-8 py-8 sm:px-10 sm:py-10 lg:px-14 lg:py-12">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand-cyan/18 bg-black/40 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-white/72 shadow-[0_0_22px_rgba(34,211,238,0.08)]">
          <span className="h-2 w-2 rounded-full bg-brand-cyan shadow-[0_0_14px_rgba(34,211,238,0.5)]" /> Founder-Led Infrastructure
        </div>
        <h2 className="mt-6 font-heading text-[clamp(2.2rem,4.2vw,4.7rem)] font-semibold tracking-[-0.04em] text-white">Who I Am</h2>

        <div className="mt-8 grid flex-1 gap-5 lg:grid-cols-2">
          <div className="glass-panel rounded-[28px] border-white/10 p-6 lg:p-8">
            <p>
              I build high-performance digital infrastructure for businesses that can&apos;t afford to lose leads. Civil Engineering Technician at Curtins by day - one of the UK&apos;s leading structural consultancies delivering major commercial projects. Sovereign Systems by evening - custom-coded platforms with AI automation built in as standard. Every build uses Next.js, React, and Tailwind CSS - the same enterprise stack behind the fastest platforms in the world.
            </p>
          </div>

          <div className="glass-panel rounded-[28px] border-white/10 p-6 lg:p-8">
            <p>
              My engineering background means I approach every project with precision and structure - not just creativity. I understand project delivery, client management, and professional standards because I work to those standards every day. What I build isn&apos;t a website. It&apos;s a 24/7 front office that captures leads, automates follow-ups, and ensures your business never misses an opportunity.
            </p>
          </div>
        </div>

        <div className="mt-8 font-body text-base font-semibold text-brand-cyan text-glow sm:text-lg">
          Every missed call is a missed contract. I&apos;m here to stop that leak.
        </div>
      </div>
    </PortfolioPage>
  );
}
