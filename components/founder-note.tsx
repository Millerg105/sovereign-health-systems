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
                                        alt="Miller, founder of Sovereign Systems"
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
                                <h3 className="text-3xl md:text-4xl font-heading font-bold text-white mb-2 tracking-tight leading-none">
                                    We're Building Our <br />
                                    <span className="text-brand-cyan">Case Study Portfolio.</span>
                                </h3>
                                <p className="text-sm font-mono text-white/50 uppercase tracking-[0.2em] mb-6">You Get the ROI.</p>
                            </div>

                            <div className="space-y-6 text-base md:text-lg text-white/80 font-light leading-relaxed">
                                <p>
                                    We are a specialised startup agency, founder-led from strategy through delivery. We are building our first case studies with transparent execution and clear performance goals.
                                </p>
                                <p>
                                    <span className="text-white font-bold">The Deal:</span> You get Sovereign-level systems at Foundation pricing, limited to our <span className="text-brand-cyan font-bold">first 3 founding partners</span>.
                                </p>
                                <ul className="space-y-3 pl-2">
                                    <li className="flex items-start gap-3 text-sm md:text-base">
                                        <div className="w-1.5 h-1.5 rounded-full bg-brand-cyan mt-2.5 shrink-0" />
                                        <span><strong className="text-white">You get:</strong> Founder-led implementation, custom build, and priority support.</span>
                                    </li>
                                    <li className="flex items-start gap-3 text-sm md:text-base">
                                        <div className="w-1.5 h-1.5 rounded-full bg-brand-cyan mt-2.5 shrink-0" />
                                        <span><strong className="text-white">We get:</strong> A video testimonial and case study rights once the agreed KPI milestone is achieved, or after 60 days of active deployment (whichever comes first).</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="grid grid-cols-1 gap-4 pt-4 border-t border-white/10 mt-6">
                                <div>
                                    <div className="text-xs font-mono text-brand-cyan uppercase tracking-wider mb-1">7-Day Quick Win</div>
                                    <div className="text-sm text-white/70 font-light">Missed-call capture + inbox + first follow-up live.</div>
                                </div>
                                <div>
                                    <div className="text-xs font-mono text-brand-cyan uppercase tracking-wider mb-1">Founder-Led Implementation</div>
                                    <div className="text-sm text-white/70 font-light">Senior attention from strategy through launch.</div>
                                </div>
                                <div>
                                    <div className="text-xs font-mono text-brand-cyan uppercase tracking-wider mb-1">No Long-Term Lock-In</div>
                                    <div className="text-sm text-white/70 font-light">Stay because the system performs, not contracts.</div>
                                </div>
                            </div>

                            <div className="pt-4 flex flex-col md:flex-row items-center gap-6 hidden">
                                <div className="flex flex-col items-center md:items-start">
                                    <span className="text-white font-heading font-bold text-xl">Miller</span>
                                    <span className="text-xs font-mono text-white/30 uppercase tracking-widest">Sovereign Systems</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
