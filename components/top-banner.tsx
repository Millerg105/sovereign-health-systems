"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function PromoBanner() {
    return (
        <div className="w-full flex items-center justify-center relative z-20 pointer-events-none px-3 sm:px-0 min-h-12 sm:h-12">
            <div className="relative flex w-full max-w-[calc(100vw-1.5rem)] sm:w-auto items-center px-3 py-2 sm:px-6 sm:py-1.5 bg-black/80 backdrop-blur-md border border-white/10 rounded-2xl sm:rounded-full shadow-[0_0_20px_rgba(0,0,0,0.5)] pointer-events-auto overflow-hidden">
                {/* Subtle glow localized to this pill */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-cyan/10 to-transparent rounded-full pointer-events-none" />

                <div className="flex w-full items-center justify-between gap-2 sm:gap-6 relative z-10 sm:w-auto">
                    <p className="min-w-0 text-white text-[10px] sm:text-xs md:text-sm font-medium tracking-wide flex items-center gap-2 leading-tight sm:leading-normal">
                        <span className="shrink-0">🚀</span>
                        <span className="text-balance sm:text-left">Got a trade business? Book a free audit</span>
                    </p>

                    <Link
                        href="/#booking"
                        className="shrink-0 bg-[#00D4AA] hover:bg-[#00D4AA]/80 text-white px-3 py-1.5 sm:px-4 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-semibold transition-all duration-300 flex items-center gap-1.5 shadow-[0_0_10px_rgba(0,212,170,0.3)] hover:shadow-[0_0_15px_rgba(0,212,170,0.5)]"
                    >
                        Book <span className="hidden sm:inline">Audit</span> <ArrowRight className="w-3 h-3" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
