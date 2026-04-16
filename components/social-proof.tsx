"use client";

import { motion } from "framer-motion";

export function SocialProof() {
    return (
        <section className="py-20 bg-slate-50 border-t border-slate-100">
            <div className="container mx-auto px-6 text-center">
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-10">
                    Trusted by Businesses Across the UK
                </p>

                <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                    {/* Placeholders for Client Logos */}
                    <div className="text-xl font-heading font-black text-slate-800">CLIENT ONE</div>
                    <div className="text-xl font-heading font-black text-slate-800">CLIENT TWO</div>
                    <div className="text-xl font-heading font-black text-slate-800">CLIENT THREE</div>
                    <div className="text-xl font-heading font-black text-slate-800">CLIENT FOUR</div>
                </div>

                <div className="mt-20 grid md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                        <div className="flex gap-1 text-gold-500 mb-4">★★★★★</div>
                        <p className="text-slate-600 mb-6 italic">
                            "Sovereign built our site in under a week and set up automation that handles enquiries around the clock. It pays for itself every month."
                        </p>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-slate-200 rounded-full" />
                            <div>
                                <div className="font-bold text-slate-900">Dr. Sarah J.</div>
                                <div className="text-xs text-slate-500">Owner, Apex Physio</div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                        <div className="flex gap-1 text-gold-500 mb-4">★★★★★</div>
                        <p className="text-slate-600 mb-6 italic">
                            "The database reactivation campaign was magic. Miller's team sent one blast and we filled our calendar for the next two weeks. Incredible."
                        </p>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-slate-200 rounded-full" />
                            <div>
                                <div className="font-bold text-slate-900">James T.</div>
                                <div className="text-xs text-slate-500">Director, London Chiro</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
