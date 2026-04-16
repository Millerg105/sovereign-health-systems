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

        <div className="mt-6 grid flex-1 gap-4 lg:grid-cols-2">
          {/* Miller */}
          <div className="glass-panel rounded-[24px] border-white/10 p-5 lg:p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full border border-brand-cyan/25 shadow-[0_0_30px_rgba(34,211,238,0.14)] lg:h-28 lg:w-28">
                <Image src="/founder-photo-new.png" alt="Miller Glenholmes" fill className="object-cover object-center" sizes="128px" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(34,211,238,0.12))]" />
              </div>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-brand-cyan/80">Miller Glenholmes</div>
                <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.18em] text-white/40">Founder</div>
              </div>
            </div>
            <p className="text-[0.96rem] leading-[1.58] sm:text-[1rem]">
              I&apos;m Miller Glenholmes - a 21-year-old web developer, automation specialist and civil engineer based in Wigan, Greater Manchester.
            </p>
            <p className="mt-4 text-[0.96rem] leading-[1.58] sm:text-[1rem]">
              With a professional background in civil engineering at Curtins, one of the UK&apos;s leading structural and civil engineering consultancies, I bring precision, project management discipline and commercial delivery standards to every build.
            </p>
            <p className="mt-4 text-[0.96rem] leading-[1.58] sm:text-[1rem]">
              Sovereign Systems exists for one reason: to help businesses grow through custom websites, automation, and AI systems. Every platform is custom-coded — no WordPress, no templates — purpose-built to convert visitors into customers and save you hours every week.
            </p>
            <p className="mt-4 text-[0.96rem] leading-[1.58] sm:text-[1rem]">
              My engineering background means I approach every project with precision and structure - not just creativity. I understand project delivery, client management, and professional standards because I work to those standards every day.
            </p>
            <p className="mt-4 text-[0.96rem] leading-[1.58] sm:text-[1rem]">
              What I build isn&apos;t just a website. It&apos;s a digital system that captures leads, automates follow-ups, and makes sure you never lose a customer to a competitor with a better online presence.
            </p>
          </div>

          {/* Joe */}
          <div className="glass-panel rounded-[24px] border-white/10 p-5 lg:p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full border border-brand-cyan/25 shadow-[0_0_30px_rgba(34,211,238,0.14)] lg:h-28 lg:w-28">
                <Image src="/joe-winstanley.jpg" alt="Joe Winstanley" fill className="object-cover object-center" sizes="128px" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(34,211,238,0.12))]" />
              </div>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-brand-cyan/80">Joe Winstanley</div>
                <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.18em] text-white/40">Co-Founder</div>
              </div>
            </div>
            <p className="text-[0.96rem] leading-[1.58] sm:text-[1rem]">
              Joe Winstanley is a Client Services Manager at ClubDNA — one of the UK&apos;s leading performance management platforms in professional football. He also works as a Digital Business Development Manager at Routes Platform, a recruitment technology company operating across elite sport.
            </p>
            <p className="mt-4 text-[0.96rem] leading-[1.58] sm:text-[1rem]">
              Before entering the business side of football, Joe spent two years on a Football Scholarship at Brighton &amp; Hove Albion FC, where he earned his UEFA C License and FA Talent ID Level 1 qualification. That combination of elite sport environment and commercial client management gives him a rare understanding of how to build relationships and close deals at pace.
            </p>
            <p className="mt-4 text-[0.96rem] leading-[1.58] sm:text-[1rem]">
              At Sovereign Systems, Joe leads client relations, outreach, and new business development. He&apos;s the first point of contact for new clients and the person who makes sure every relationship is built on trust, clear communication, and results.
            </p>
            <p className="mt-4 text-[0.96rem] leading-[1.58] sm:text-[1rem]">
              Joe&apos;s from Wigan — born and raised — and brings the same competitive edge from professional football into everything he does in business.
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
