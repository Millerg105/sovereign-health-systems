"use client";

import { motion } from "framer-motion";
import { TrendingDown, PhoneMissed, Coins, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ROIFraming() {
    return (
        <section className="relative py-24 bg-transparent overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">
                            The Real Cost of <span className="text-red-500">Inaction.</span>
                        </h2>
                        <p className="text-lg text-white/60">
                            Every missed call is a patient who went to your competitor.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                        {/* Metric 1 */}
                        <div className="bg-[#0A0A0A]/80 backdrop-blur-md border border-white/5 rounded-2xl p-8 flex flex-col items-center text-center group hover:border-red-500/30 transition-colors">
                            <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <PhoneMissed className="w-6 h-6 text-red-500" />
                            </div>
                            <div className="text-4xl font-bold text-white mb-2">5</div>
                            <div className="text-sm text-white/40 uppercase tracking-widest font-mono">Missed Calls / Day</div>
                        </div>

                        {/* Metric 2 */}
                        <div className="bg-[#0A0A0A]/80 backdrop-blur-md border border-white/5 rounded-2xl p-8 flex flex-col items-center text-center group hover:border-red-500/30 transition-colors">
                            <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <TrendingDown className="w-6 h-6 text-red-500" />
                            </div>
                            <div className="text-4xl font-bold text-white mb-2">30%</div>
                            <div className="text-sm text-white/40 uppercase tracking-widest font-mono">Booking Potential</div>
                        </div>

                        {/* Metric 3 */}
                        <div className="bg-[#0A0A0A]/80 backdrop-blur-md border border-white/5 rounded-2xl p-8 flex flex-col items-center text-center relative overflow-hidden group hover:border-red-500/50 transition-colors">
                            <div className="absolute inset-0 bg-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform relative z-10">
                                <Coins className="w-6 h-6 text-red-500" />
                            </div>
                            <div className="text-4xl font-bold text-red-500 mb-2">£2,700+</div>
                            <div className="text-sm text-white/40 uppercase tracking-widest font-mono relative z-10">Lost Revenue / Month</div>
                        </div>
                    </div>

                    <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-6 text-center">
                        <p className="text-white/80 text-lg mb-6">
                            You aren't losing money because you lack skill.<br />
                            You're losing money because you lack <span className="text-white font-bold">infrastructure</span>.
                        </p>
                        <Button
                            onClick={() => document.getElementById('roi')?.scrollIntoView({ behavior: 'smooth' })}
                            className="bg-red-500 hover:bg-red-600 text-white shadow-[0_0_20px_rgba(239,68,68,0.4)]"
                        >
                            Stop The Bleeding <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
