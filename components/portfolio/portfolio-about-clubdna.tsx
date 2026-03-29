import Image from "next/image";

import { PortfolioPage } from "@/components/portfolio/portfolio-page";

export function PortfolioAboutClubDNA() {
  return (
    <PortfolioPage>
      <div className="flex h-full flex-col px-7 py-7 sm:px-9 sm:py-8 lg:px-12 lg:py-9">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand-cyan/18 bg-black/40 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-white/72 shadow-[0_0_22px_rgba(34,211,238,0.08)]">
          <span className="h-2 w-2 rounded-full bg-brand-cyan shadow-[0_0_14px_rgba(34,211,238,0.5)]" /> Founder-Led Infrastructure
        </div>
        <h2 className="mt-4 font-heading text-[clamp(2rem,3.9vw,4.2rem)] font-semibold tracking-[-0.04em] text-white">Who I Am</h2>

        <div className="mt-6 grid flex-1 gap-4 lg:grid-cols-2">
          <div className="glass-panel rounded-[24px] border-white/10 p-5 lg:p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="relative h-24 w-24 overflow-hidden rounded-full border border-brand-cyan/25 shadow-[0_0_30px_rgba(34,211,238,0.14)] lg:h-28 lg:w-28">
                <Image src="/founder-photo-new.png" alt="Miller Glenholmes" fill className="object-cover object-center" sizes="128px" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(34,211,238,0.12))]" />
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-brand-cyan/80">Miller Glenholmes</div>
            </div>
            <p className="text-[0.96rem] leading-[1.58] sm:text-[1rem]">
              I&apos;m Miller Glenholmes - a 21-year-old web developer, automation specialist and civil engineer based in Wigan, Greater Manchester.
            </p>
            <p className="mt-4 text-[0.96rem] leading-[1.58] sm:text-[1rem]">
              With a professional background in civil engineering at Curtins and RSK, two of the UK&apos;s leading structural and civil engineering consultancies, I bring precision, project management discipline and commercial delivery standards to every build. I&apos;ve worked on projects across the UK and understand what it takes to deliver work that wins business.
            </p>
            <p className="mt-4 text-[0.96rem] leading-[1.58] sm:text-[1rem]">
              Sovereign Systems is my digital infrastructure agency. Every platform I build is custom-coded using Next.js, React and Tailwind CSS - the same enterprise technology stack behind the fastest platforms in the world. No WordPress. No templates. Purpose-built systems engineered for speed, security and 24/7 lead capture.
            </p>
          </div>

          <div className="glass-panel rounded-[24px] border-white/10 p-5 lg:p-6">
            <p className="text-[0.96rem] leading-[1.58] sm:text-[1rem]">
              I&apos;m from Wigan - born and raised - and I&apos;ve always been drawn to the sports world. I used to play rugby from Cubs through to my late teens, so I&apos;ve always been committed to things and taken them seriously.
            </p>
            <p className="mt-4 text-[0.96rem] leading-[1.58] sm:text-[1rem]">
              Joe Winstanley is one of my closest mates and we go to games together. Through Joe I&apos;ve had a genuine window into the professional football industry, and it&apos;s a world I find fascinating.
            </p>
            <p className="mt-4 text-[0.96rem] leading-[1.58] sm:text-[1rem]">
              What I build isn&apos;t a website. It&apos;s a 24/7 front office that captures leads, automates follow-ups and ensures your business never misses an opportunity - even when you&apos;re in a meeting, on the move or closing a deal.
            </p>
          </div>
        </div>

        <div className="mt-5 font-body text-sm font-semibold text-brand-cyan text-glow sm:text-base">
          Every missed call is a missed contract. I&apos;m here to stop that leak.
        </div>
      </div>
    </PortfolioPage>
  );
}
