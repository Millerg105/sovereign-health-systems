import Image from "next/image";

import { PortfolioPage } from "@/components/portfolio/portfolio-page";

export function PortfolioAbout() {
  return (
    <PortfolioPage>
      <div className="flex h-full flex-col px-7 py-7 sm:px-9 sm:py-8 lg:px-12 lg:py-9">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand-cyan/18 bg-black/40 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-white/72 shadow-[0_0_22px_rgba(34,211,238,0.08)]">
          <span className="h-2 w-2 rounded-full bg-brand-cyan shadow-[0_0_14px_rgba(34,211,238,0.5)]" /> Founder-Led Infrastructure
        </div>
        <h2 className="mt-4 font-heading text-[clamp(2rem,3.9vw,4.2rem)] font-semibold tracking-[-0.04em] text-white">Who We Are</h2>

        <div className="mt-6 flex flex-1 justify-center">
          {/* Miller */}
          <div className="glass-panel w-full max-w-2xl rounded-[24px] border-white/10 p-5 lg:p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full border border-brand-cyan/25 shadow-[0_0_30px_rgba(34,211,238,0.14)] lg:h-28 lg:w-28">
                <Image src="/founder-photo-new.png" alt="Miller Glenholmes" fill className="object-cover object-center" sizes="128px" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(34,211,238,0.12))]" />
              </div>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-brand-cyan/80">Miller Glenholmes</div>
                <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.18em] text-white/40">Founder &amp; Technical Director</div>
              </div>
            </div>
            <p className="text-[0.96rem] leading-[1.58] sm:text-[1rem]">
              I&apos;m Miller Glenholmes, a 21-year-old web developer, automation specialist and civil engineer based in Wigan, Greater Manchester.
            </p>
            <p className="mt-4 text-[0.96rem] leading-[1.58] sm:text-[1rem]">
              With a professional background in civil engineering at Curtins, one of the UK&apos;s leading structural and civil engineering consultancies, I bring precision, project management discipline and commercial delivery standards to every build.
            </p>
            <p className="mt-4 text-[0.96rem] leading-[1.58] sm:text-[1rem]">
              Sovereign Systems exists for one reason. To help businesses grow through custom websites, automation, and AI systems. Every platform is custom-coded (no WordPress, no templates), purpose-built to convert visitors into customers and save you hours every week.
            </p>
            <p className="mt-4 text-[0.96rem] leading-[1.58] sm:text-[1rem]">
              My engineering background means I approach every project with precision and structure, not just creativity. I understand project delivery, client management, and professional standards because I work to those standards every day.
            </p>
            <p className="mt-4 text-[0.96rem] leading-[1.58] sm:text-[1rem]">
              What I build isn&apos;t just a website. It&apos;s a digital system that captures leads, automates follow-ups, and makes sure you never lose a customer to a competitor with a better online presence.
            </p>
          </div>
        </div>

        <div className="mt-5 font-body text-sm font-semibold text-brand-cyan text-glow sm:text-base">
          Every missed enquiry is a missed opportunity. We&apos;re here to fix that.
        </div>
      </div>
    </PortfolioPage>
  );
}
