"use client";

import { useState } from "react";
import { Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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
                        {/* Founder Card */}
                        <div className="shrink-0 flex flex-col gap-10">
                            {/* Miller */}
                            <div className="relative group">
                                <div className="w-28 h-28 md:w-36 md:h-36 rounded-[1.5rem] border-2 border-brand-cyan/20 shadow-[0_0_50px_rgba(34,211,238,0.1)] overflow-hidden bg-white/5 relative z-10">
                                    {!photoMissing ? (
                                        <Image
                                            src="/founder-photo-new.png"
                                            alt="Miller, founder of Sovereign Systems"
                                            fill
                                            sizes="(max-width: 768px) 112px, 144px"
                                            className="object-cover object-center"
                                            quality={100}
                                            priority
                                            onError={() => setPhotoMissing(true)}
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-white/10 group-hover:text-brand-cyan/40 transition-colors">
                                            <Users className="w-12 h-12" />
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-brand-cyan/20 to-transparent opacity-50" />
                                </div>
                                <div className="absolute -inset-3 border border-brand-cyan/10 rounded-[2rem] -z-10 group-hover:border-brand-cyan/30 transition-colors duration-500" />
                                <div className="absolute -bottom-2.5 -right-2.5 bg-brand-cyan text-black text-[9px] font-black px-3 py-1 rounded-full border-2 border-black z-20 shadow-xl">
                                    FOUNDER
                                </div>
                                <p className="mt-4 text-center text-xs font-heading font-bold text-white">Miller Glenholmes</p>
                                <p className="text-center text-[10px] font-mono text-white/40 uppercase tracking-wider leading-tight">Founder &amp; Technical Director</p>
                            </div>
                        </div>

                        <div className="text-center md:text-left flex-1 space-y-8">
                            <div>
                                <h3 className="text-3xl md:text-4xl font-heading font-bold text-white mb-2 tracking-tight leading-none">
                                    Founder-Led From Start To Finish.
                                </h3>
                                <p className="text-xl md:text-2xl font-heading font-bold text-brand-cyan mb-6 tracking-tight leading-tight">I build websites, automation, and AI systems, and I do it all myself.</p>
                            </div>

                            <div className="space-y-6 text-base md:text-lg text-white/80 font-light leading-relaxed">
                                <p>
                                    Sovereign Systems is me, Miller Glenholmes. I design, build, and launch digital products for businesses of all sizes, from one-page sites to full automation platforms.
                                </p>
                                <p>
                                    You get a custom proposal, a clear rollout plan, and systems built around how your business actually works. No outsourcing, no juniors, just me, building what your business needs.
                                </p>
                                <p className="text-white/60 italic text-sm md:text-base">
                                    &quot;I&apos;m your first point of contact and the person shipping the work. I&apos;ll learn your business, understand what you need, and make sure we deliver exactly that. No hard sell, no jargon. Straight talking and results.&quot; - Miller
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-4 pt-4 border-t border-white/10 mt-6">
                                <div>
                                    <div className="text-xs font-mono text-brand-cyan uppercase tracking-wider mb-1">Live in 7 Days</div>
                                    <div className="text-sm text-white/70 font-light">Your website or system live within a week</div>
                                </div>
                                <div>
                                    <div className="text-xs font-mono text-brand-cyan uppercase tracking-wider mb-1">Founder-Led</div>
                                    <div className="text-sm text-white/70 font-light">No juniors, no outsourcing, built by the founders</div>
                                </div>
                                <div>
                                    <div className="text-xs font-mono text-brand-cyan uppercase tracking-wider mb-1">Custom Proposal</div>
                                    <div className="text-sm text-white/70 font-light">Scope, systems, and rollout built around your business</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 pt-6">
                                <div className="inline-block px-4 py-2 bg-white/10 border border-white/20 text-white text-[10px] font-black uppercase tracking-wider rounded-full">
                                    Founder-Led Delivery
                                </div>
                                <div className="inline-block px-4 py-2 bg-brand-cyan/20 border border-brand-cyan/40 text-brand-cyan text-[10px] font-black uppercase tracking-wider rounded-full">
                                    Custom Proposals
                                </div>
                            </div>

                            <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row md:items-center">
                                <Button
                                    onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
                                    variant="primary"
                                    size="lg"
                                    className="w-full md:w-auto"
                                >
                                    Start a Project
                                </Button>
                                <Link
                                    href="/portfolio"
                                    className="btn-premium-secondary inline-flex min-h-12 items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold sm:px-7 sm:text-base md:text-lg"
                                >
                                    View Portfolio
                                </Link>
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
