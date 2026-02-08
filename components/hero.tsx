"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import FlowFieldBackground from "@/components/ui/flow-field-background";

export function Hero() {
    return (
        <div className="relative w-full h-screen overflow-hidden bg-void">
            {/* Flow Field Background - Full Screen */}
            <div className="absolute inset-0 z-0">
                <FlowFieldBackground
                    color="#22d3ee" // Brand cyan
                    intensity="hero"
                />
            </div>

            {/* Motherboard Texture Overlay */}
            <div className="absolute inset-0 z-5 motherboard-texture pointer-events-none opacity-30" />

            {/* Content Container */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="relative z-10 container mx-auto px-6 h-full flex flex-col items-center justify-center text-center"
            >
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10 shadow-lg mb-8"
                >
                    <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse" />
                    <span className="text-xs font-bold text-white uppercase tracking-wider">Accepting 2 New Clinics for Q1</span>
                </motion.div>

                {/* Headline */}
                <motion.h1
                    className="text-6xl md:text-8xl lg:text-9xl font-heading font-bold text-white mb-6 tracking-tight leading-[0.95] max-w-6xl"
                >
                    Revenue You Didn't <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-blue drop-shadow-[0_0_25px_rgba(34,211,238,0.3)]">
                        Know You Lost.
                    </span>
                </motion.h1>

                {/* Subhead */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="space-y-4 mb-12"
                >
                    <p className="text-2xl md:text-3xl text-white font-medium tracking-tight">
                        It’s your shortcut into the future.
                    </p>
                    <p className="text-lg md:text-xl text-white/50 max-w-3xl mx-auto leading-relaxed font-light">
                        We capture missed calls, reply instantly, and book appointments automatically — so clinics grow without hiring.
                    </p>
                </motion.div>

                {/* CTA Group */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.1 }}
                    className="flex flex-col items-center gap-8"
                >
                    <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                        <Button
                            size="lg"
                            variant="glow"
                            onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
                            rightIcon={<ArrowRight className="w-5 h-5" />}
                            className="h-16 px-10 text-lg font-bold rounded-2xl"
                        >
                            Book Your Free Strategy Audit
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            onClick={() => document.getElementById('roi')?.scrollIntoView({ behavior: 'smooth' })}
                            className="h-16 px-10 text-lg font-bold rounded-2xl border-white/10 bg-white/5 hover:bg-white/10"
                        >
                            Analyze Your ROI
                        </Button>
                    </div>

                    {/* Trust Microcopy */}
                    <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-mono uppercase tracking-[0.2em] text-white/40">
                        <span className="flex items-center gap-2">
                            Built for private practices
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-white/10 hidden md:block" />
                        <span className="flex items-center gap-2">
                            2–3 week implementation
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-white/10 hidden md:block" />
                        <span className="flex items-center gap-2">
                            ROI tracking included
                        </span>
                    </div>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    className="absolute bottom-12 left-1/2 -translate-x-1/2"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                    <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2">
                        <motion.div
                            className="w-1.5 h-1.5 rounded-full bg-brand-cyan"
                            animate={{ y: [0, 12, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        />
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}
