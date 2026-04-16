"use client";

import { Button } from "@/components/ui/button";
import { Smartphone } from "lucide-react";
import { CONTACT_PHONE } from "@/lib/constants";

export function CTA() {
    return (
        <section id="booking" className="py-24 bg-brand-navy relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-cyan/10 blur-[100px] rounded-full opacity-50 pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-brand-cyan mb-8 uppercase tracking-wider">
                    Custom proposals built around your business
                </div>

                <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6 tracking-tight">
                    Ready to Take Control?
                </h2>

                <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
                    Join the businesses building their digital presence with Sovereign Systems. Start a project and see the difference.
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
                        <div className="absolute inset-0 bg-brand-cyan rounded-xl blur opacity-40 group-hover:opacity-60 transition-opacity" />
                        <Button
                            variant="primary"
                            size="lg"
                            className="relative w-full md:w-auto"
                            onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                            Book Your Strategy Audit →
                        </Button>
                    </div>

                    <Button
                        variant="secondary"
                        size="lg"
                        className="w-full md:w-auto"
                        onClick={() => window.open(`sms:${CONTACT_PHONE}?body=Hi Miller, I'd like to book a free audit for my business.`, '_self')}
                        leftIcon={<Smartphone className="w-5 h-5" />}
                    >
                        Text me instead
                    </Button>
                </div>

                <div className="mt-16 bg-white/[0.02] border border-white/5 rounded-2xl p-8 max-w-2xl mx-auto backdrop-blur-sm">
                    <p className="text-brand-cyan font-bold mb-2 uppercase text-[10px] tracking-wider font-mono">Your Investment, Your Return</p>
                    <p className="text-sm text-white/40 leading-relaxed">
                        Most clients see results within the first month. Everything we build belongs to you — custom-coded, no templates, no lock-in.
                    </p>
                </div>
            </div>
        </section>
    );
}
