"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Users } from "lucide-react";
import Image from "next/image";

export function FounderNote() {
    const [photoMissing, setPhotoMissing] = useState(false);

    return (
        <section className="py-24 bg-transparent relative overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 motherboard-texture opacity-5 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[300px] bg-brand-cyan/5 blur-[120px] -z-10 pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto bg-black/40 backdrop-blur-2xl p-10 md:p-16 rounded-[3rem] border border-white/5 shadow-2xl">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-16">
                        {/* Founder Image Placeholder */}
                        <div className="shrink-0 relative group">
                            <div className="w-32 h-32 md:w-48 md:h-48 rounded-[2rem] border-2 border-brand-cyan/20 shadow-[0_0_50px_rgba(34,211,238,0.1)] overflow-hidden bg-white/5 relative z-10">
                                {!photoMissing ? (
                                    <Image
                                        src="/founder-photo-new.png"
                                        alt="Miller, founder of Sovereign Health"
                                        fill
                                        sizes="(max-width: 768px) 192px, 256px"
                                        className="object-cover object-center"
                                        quality={100}
                                        priority
                                        onError={() => setPhotoMissing(true)}
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-white/10 group-hover:text-brand-cyan/40 transition-colors">
                                        <Users className="w-16 h-16" />
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-brand-cyan/20 to-transparent opacity-50" />
                            </div>

                            {/* Decorative Frame */}
                            <div className="absolute -inset-4 border border-brand-cyan/10 rounded-[2.5rem] -z-10 group-hover:border-brand-cyan/30 transition-colors duration-500" />

                            <div className="absolute -bottom-3 -right-3 bg-brand-cyan text-black text-[10px] font-black px-4 py-1.5 rounded-full border-2 border-black z-20 shadow-xl">
                                FOUNDER
                            </div>
                        </div>

                        <div className="text-center md:text-left flex-1 space-y-8">
                            <div>
                                <h3 className="text-4xl font-heading font-bold text-white mb-2 tracking-tight">
                                    A Note From Miller.
                                </h3>
                                <p className="text-sm font-mono text-brand-cyan uppercase tracking-[0.3em]">Building Clinical ROI</p>
                            </div>

                            <div className="space-y-6 text-xl text-white/80 font-light leading-relaxed italic">
                                <p>
                                    "I built <span className="text-white font-medium not-italic">Sovereign Health Systems</span> because I saw too many world-class clinics losing revenue through simple leaks: missed calls, 2-hour reply times, and dormant patient databases."
                                </p>
                                <p>
                                    "You shouldn't have to hire more admin just to keep up with your own growth. Our systems plug those leaks instantly, so you can focus on the patient in front of you while the technology handles the booking."
                                </p>
                            </div>

                            <div className="pt-4 flex flex-col md:flex-row items-center gap-6">
                                <div className="flex flex-col items-center md:items-start">
                                    <span className="text-white font-heading font-bold text-xl">Miller</span>
                                    <span className="text-xs font-mono text-white/30 uppercase tracking-widest">Founder, Sovereign Health</span>
                                </div>
                                <div className="h-px w-12 bg-white/10 hidden md:block" />
                                <button
                                    onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                                    className="text-sm font-mono text-brand-cyan hover:text-white transition-colors uppercase tracking-[0.2em] border-b border-brand-cyan/20 pb-1"
                                >
                                    View Implementation Tiers
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
