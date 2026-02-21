"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function PromoBanner() {
    return (
        <div className="w-full h-12 flex items-center justify-center relative z-20 pointer-events-none">
            <div className="relative flex items-center px-4 sm:px-6 py-1.5 bg-black/80 backdrop-blur-md border border-white/10 rounded-full shadow-[0_0_20px_rgba(0,0,0,0.5)] pointer-events-auto">
                {/* Subtle glow localized to this pill */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-cyan/10 to-transparent rounded-full pointer-events-none" />

                <div className="flex items-center gap-3 sm:gap-6 relative z-10">
                    <p className="text-white text-[10px] sm:text-xs md:text-sm font-medium tracking-wide flex items-center gap-2">
                        <span className="shrink-0">🚀</span>
                        <span className="whitespace-nowrap">We&apos;re building 5 free websites for the first 5 businesses in Greater Manchester</span>
                    </p>

                    <Link
                        href="https://calendly.com/miller-sovereignhealthsystems/15min"
                        target="_blank"
                        className="shrink-0 bg-[#00D4AA] hover:bg-[#00D4AA]/80 text-white px-3 py-1.5 sm:px-4 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-semibold transition-all duration-300 flex items-center gap-1.5 shadow-[0_0_10px_rgba(0,212,170,0.3)] hover:shadow-[0_0_15px_rgba(0,212,170,0.5)]"
                    >
                        Claim <span className="hidden sm:inline">Yours</span> <ArrowRight className="w-3 h-3" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
