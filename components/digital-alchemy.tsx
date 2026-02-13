"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MotherboardBackground } from "@/components/ui/motherboard-bg";
import { Button } from "@/components/ui/button";

export function DigitalAlchemy() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // --- Transforms ---

    // Opacity of the "Inner World" (Motherboard Traces) - Blends in to add texture
    const motherboardOpacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 0.4]);


    // Text Phase 1: Kicker (Visible BEFORE we enter)
    const kickerOpacity = useTransform(scrollYProgress, [0.05, 0.2, 0.35], [0, 1, 0]);
    const kickerScale = useTransform(scrollYProgress, [0.05, 0.35], [0.8, 1.2]);

    // Text Phase 2: Headline (Visible AFTER we enter)
    const headlineOpacity = useTransform(scrollYProgress, [0.5, 0.6, 0.9], [0, 1, 1]);
    const headlineScale = useTransform(scrollYProgress, [0.5, 0.7], [0.5, 1]);
    const headlineY = useTransform(scrollYProgress, [0.5, 0.7], [50, 0]);

    // Text Phase 3: Support
    const supportOpacity = useTransform(scrollYProgress, [0.65, 0.85], [0, 1]);
    const supportY = useTransform(scrollYProgress, [0.65, 0.85], [20, 0]);

    // Subtle darkening for text readability — never goes fully opaque
    const bgDimOpacity = useTransform(scrollYProgress, [0.4, 0.7], [0, 0.55]);


    return (
        <section ref={containerRef} className="relative h-[240vh] md:h-[300vh] bg-transparent" id="solution">

            {/* Sticky Viewport */}
            <div className="sticky top-0 h-[100svh] md:h-screen w-full overflow-hidden flex items-center justify-center perspective-1000">

                {/* Layer 1: Transparent — global BackgroundLayer shows through */}

                {/* Layer 2: Motherboard Traces */}
                <motion.div style={{ opacity: motherboardOpacity }} className="absolute inset-0 z-10 mix-blend-screen pointer-events-none">
                    <MotherboardBackground />
                </motion.div>

                {/* --- Typography Layers --- */}

                {/* Phase 1: Kicker (Floats above the chip before we zoom in) */}
                <motion.div
                    style={{ opacity: kickerOpacity, scale: kickerScale }}
                    className="absolute z-30 flex flex-col items-center justify-center pointer-events-none"
                >
                    <p className="text-white font-mono text-xs sm:text-sm md:text-xl font-bold tracking-[0.18em] md:tracking-[0.3em] uppercase glow-text bg-[#020408]/90 backdrop-blur-xl px-5 sm:px-6 md:px-10 py-3 md:py-5 rounded-full border border-brand-cyan/50 shadow-[0_0_50px_-10px_rgba(34,211,238,0.3)] z-50 text-center">
                        Your Competitors Are Already Here
                    </p>
                </motion.div>

                {/* Phase 2: Main Headline */}
                <motion.div
                    style={{ opacity: headlineOpacity, scale: headlineScale, y: headlineY }}
                    className="absolute inset-0 flex flex-col items-center justify-center z-40 px-4 pointer-events-none"
                >
                    {/* Subtle vignette for text readability — lets animated bg show through */}
                    <motion.div
                        style={{ opacity: bgDimOpacity }}
                        className="absolute inset-0 bg-black/60 -z-10"
                    />

                    <h2 className="text-3xl sm:text-4xl md:text-7xl lg:text-8xl font-heading font-bold text-center text-white tracking-tight leading-[1.02] md:leading-[0.95] drop-shadow-2xl max-w-5xl">
                        DON'T LOOK BACK IN 10 YEARS<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan via-white to-brand-cyan animate-pulse drop-shadow-[0_0_25px_rgba(34,211,238,0.4)]">
                            WISHING YOU STARTED TODAY.
                        </span>
                    </h2>

                    {/* Phase 3: Support Text */}
                    <motion.div style={{ opacity: supportOpacity, y: supportY }} className="mt-8 md:mt-14 max-w-4xl text-center px-4 sm:px-6">
                        <p className="text-lg sm:text-xl md:text-3xl lg:text-4xl text-white/85 font-light leading-[1.3] mb-5 md:mb-6">
                            AI is answering enquiries, booking jobs, and recovering revenue <span className="text-white font-semibold">while you're under a boiler or halfway through a clean.</span>
                        </p>
                        <p className="text-base sm:text-lg md:text-2xl text-white/85 leading-relaxed mb-6 md:mb-8">
                            This isn't the future — it's happening now. Your competitors are automating. Your customers are calling someone else. <span className="text-brand-cyan font-medium">Every day you wait costs you thousands.</span>
                        </p>
                        <div className="mt-10 flex justify-center">
                            <span className="inline-block px-5 py-2.5 md:px-6 md:py-3 border border-red-500/20 rounded-full text-sm md:text-lg text-red-400 font-mono uppercase tracking-[0.16em] md:tracking-widest bg-red-500/5 backdrop-blur-sm">
                                Join now before your area is taken
                            </span>
                        </div>
                    </motion.div>
                </motion.div>

            </div>
        </section>
    );
}
