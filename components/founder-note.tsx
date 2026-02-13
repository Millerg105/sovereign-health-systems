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
                                    We'll Build Your Website For Free.
                                </h3>
                                <p className="text-xl md:text-2xl font-heading font-bold text-brand-cyan mb-6 tracking-tight leading-tight">AND SET UP YOUR SYSTEMS. YOU JUST TELL US IF IT WORKS.</p>
                            </div>

                            <div className="space-y-6 text-base md:text-lg text-white/80 font-light leading-relaxed">
                                <p>
                                    We're looking for 3 home service businesses in Greater Manchester to work with completely free. We build your website, set up missed call text-back, automate your follow-ups, and prove it works. No contracts, no fees, no catch.
                                </p>
                                <p>
                                    All we ask for is an honest testimonial once you've seen the results.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-4 pt-4 border-t border-white/10 mt-6">
                                <div>
                                    <div className="text-xs font-mono text-brand-cyan uppercase tracking-wider mb-1">Live in 7 Days</div>
                                    <div className="text-sm text-white/70 font-light">Missed-call capture + new website live within a week</div>
                                </div>
                                <div>
                                    <div className="text-xs font-mono text-brand-cyan uppercase tracking-wider mb-1">Founder-Led</div>
                                    <div className="text-sm text-white/70 font-light">No juniors, no outsourcing — founder-led from start to finish</div>
                                </div>
                                <div>
                                    <div className="text-xs font-mono text-brand-cyan uppercase tracking-wider mb-1">No Lock-In</div>
                                    <div className="text-sm text-white/70 font-light">Stay because it works, not because of a contract</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 pt-6">
                                <div className="inline-block px-4 py-2 bg-white/10 border border-white/20 text-white text-[10px] font-black uppercase tracking-wider rounded-full">
                                    LIMITED: 3 SLOTS
                                </div>
                                <div className="inline-block px-4 py-2 bg-brand-cyan/20 border border-brand-cyan/40 text-brand-cyan text-[10px] font-black uppercase tracking-wider rounded-full">
                                    APPLICATIONS OPEN NOW
                                </div>
                            </div>

                            <button
                                onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
                                className="px-8 py-4 bg-gradient-to-r from-blue-600 via-brand-cyan to-blue-400 text-black font-bold text-sm uppercase tracking-wider rounded-2xl shadow-[0_0_30px_rgba(34,211,238,0.3)] hover:shadow-[0_0_40px_rgba(34,211,238,0.5)] transition-all"
                            >
                                CLAIM YOUR FREE BUILD
                            </button>

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
