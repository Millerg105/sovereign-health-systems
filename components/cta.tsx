"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MessageSquare, Smartphone, ArrowRight } from "lucide-react";
import { CONTACT_PHONE } from "@/lib/constants";

export function CTA() {
    return (
        <section id="booking" className="py-24 bg-brand-navy relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-cyan/10 blur-[100px] rounded-full opacity-50 pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-brand-cyan mb-8 uppercase tracking-wider">
                    Founder Pricing ends Feb 15th — First 10 practices only
                </div>

                <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6 tracking-tight">
                    Ready to Take Control?
                </h2>

                <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
                    Join the elite clinics moving from "Answering Machine" to "Revenue Machine." Start your infrastructure build today.
                </p>

                <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-12 text-sm text-brand-cyan font-medium">
                    <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-brand-cyan/10 flex items-center justify-center border border-brand-cyan/30 text-brand-cyan">✓</div>
                        Cost Analysis Report
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-brand-cyan/10 flex items-center justify-center border border-brand-cyan/30 text-brand-cyan">✓</div>
                        Infrastructure Roadmap
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-brand-cyan/10 flex items-center justify-center border border-brand-cyan/30 text-brand-cyan">✓</div>
                        30-Day Rollout Plan
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                    <div className="relative group">
                        <div className="absolute inset-0 bg-brand-cyan rounded-full blur opacity-40 group-hover:opacity-60 transition-opacity" />
                        <Button
                            className="relative h-14 px-10 text-base bg-brand-cyan hover:bg-white text-black border-0 shadow-xl transition-all"
                            onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                            Book Your Free Strategy Audit →
                        </Button>
                    </div>

                    <Button
                        variant="outline"
                        className="h-14 px-8 text-base border-white/10 text-white hover:bg-white/5 hover:text-white"
                        onClick={() => window.open(`sms:${CONTACT_PHONE}?body=Hi Miller, I'd like to book a clinical audit.`, '_self')}
                    >
                        <Smartphone className="w-5 h-5 mr-2" />
                        Text me instead
                    </Button>
                </div>

                <div className="mt-16 bg-white/[0.02] border border-white/5 rounded-2xl p-8 max-w-2xl mx-auto backdrop-blur-sm">
                    <p className="text-brand-cyan font-bold mb-2 uppercase text-[10px] tracking-wider font-mono">Managed Infrastructure ROI</p>
                    <p className="text-sm text-white/40 leading-relaxed">
                        1-3 months payback, then pure profit for years. We build assets you own, inside your business ecosystem, forever.
                    </p>
                </div>
            </div>
        </section>
    );
}
