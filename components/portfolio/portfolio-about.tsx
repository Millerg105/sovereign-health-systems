import Image from "next/image";

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
            <div className="mb-6 flex items-center gap-4">
              <div className="relative h-32 w-32 overflow-hidden rounded-full border border-brand-cyan/25 shadow-[0_0_30px_rgba(34,211,238,0.14)]">
                <Image src="/founder-photo-new.png" alt="Miller Glenholmes" fill className="object-cover object-center" sizes="128px" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(34,211,238,0.12))]" />
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-brand-cyan/80">Miller Glenholmes</div>
            </div>
            <p>
              I&apos;m Miller Glenholmes - a 21-year-old web developer, automation specialist, and civil engineer based in Wigan, Greater Manchester.
            </p>
            <p className="mt-5">
              With a professional background in civil engineering at Curtins, one of the UK&apos;s leading structural and civil engineering consultancies, I bring precision, project management discipline, and commercial delivery standards to every build. I&apos;ve worked on major commercial projects across the North West and I understand what it takes to deliver work that wins business.
            </p>
            <p className="mt-5">
              Sovereign Systems is my digital infrastructure agency. Every platform I build is custom-coded using Next.js, React, and Tailwind CSS - the same enterprise technology stack behind the fastest platforms in the world. No WordPress. No templates. Purpose-built systems engineered for speed, security, and 24/7 lead capture.
            </p>
          </div>

          <div className="glass-panel rounded-[28px] border-white/10 p-6 lg:p-8">
            <p>
              I grew up supporting Arsenal, following football closely from as far back as I can remember right through to 18. I&apos;m from Wigan - born and raised - and I&apos;ve always been drawn to the sports world.
            </p>
            <p className="mt-5">
              Joe Winstanley is one of my closest mates. We go to games together, we train together, and through Joe I&apos;ve had a genuine window into the professional football industry. It&apos;s a world I find fascinating - the contracts, the relationships, the pace of it - and it&apos;s a world I&apos;d genuinely love to work in.
            </p>
            <p className="mt-5">
              What I build isn&apos;t a website. It&apos;s a 24/7 front office that captures leads, automates follow-ups, and ensures your business never misses an opportunity - even when you&apos;re on the pitch, in a meeting, or closing a deal.
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
