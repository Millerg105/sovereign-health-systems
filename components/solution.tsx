"use client";

import { motion } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";

export function Solution() {
    return (
        <section id="solution" className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-heading font-bold text-slate-900 mb-6">
                        The Old Way vs. <span className="text-gold-600">The Sovereign Way</span>
                    </h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Stop relying on human willpower to chase leads. Switch to a system that never gets tired, never calls in sick, and never forgets to follow up.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                    {/* The Old Way */}
                    <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 opacity-80">
                        <h3 className="text-xl font-bold text-slate-500 mb-8 flex items-center gap-2">
                            <XCircle className="w-5 h-5" />
                            Manual Chaos
                        </h3>
                        <ul className="space-y-6">
                            <li className="flex gap-4 text-slate-500">
                                <XCircle className="w-5 h-5 shrink-0 mt-1 opacity-50" />
                                <div>
                                    <strong className="block text-slate-700">Receptionist Misses Calls</strong>
                                    Staff are busy with patients; 40% of calls go to voicemail.
                                </div>
                            </li>
                            <li className="flex gap-4 text-slate-500">
                                <XCircle className="w-5 h-5 shrink-0 mt-1 opacity-50" />
                                <div>
                                    <strong className="block text-slate-700">Sticky Notes & Spreadsheets</strong>
                                    Leads are tracked on paper; easy to lose, impossible to track.
                                </div>
                            </li>
                            <li className="flex gap-4 text-slate-500">
                                <XCircle className="w-5 h-5 shrink-0 mt-1 opacity-50" />
                                <div>
                                    <strong className="block text-slate-700">Chasing = Burnout</strong>
                                    Staff hate making sales calls, so they don't do them.
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* The New Way */}
                    <div className="bg-slate-900 p-8 rounded-3xl border border-gold-500/30 text-white relative shadow-2xl">
                        <div className="absolute top-0 right-0 bg-gold-500 text-slate-900 text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-2xl">
                            AUTOMATED
                        </div>
                        <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-2 text-gold-400">
                            <CheckCircle2 className="w-5 h-5" />
                            Sovereign Automation
                        </h3>
                        <ul className="space-y-6">
                            <li className="flex gap-4">
                                <CheckCircle2 className="w-5 h-5 shrink-0 mt-1 text-gold-500" />
                                <div>
                                    <strong className="block text-white">Instant Text-Back</strong>
                                    Missed a call? AI texts the patient instantly: "Sorry we missed you, how can we help?"
                                </div>
                            </li>
                            <li className="flex gap-4">
                                <CheckCircle2 className="w-5 h-5 shrink-0 mt-1 text-gold-500" />
                                <div>
                                    <strong className="block text-white">24/7 Booking Agent</strong>
                                    AI answers FAQs and books slots directly into your calendar.
                                </div>
                            </li>
                            <li className="flex gap-4">
                                <CheckCircle2 className="w-5 h-5 shrink-0 mt-1 text-gold-500" />
                                <div>
                                    <strong className="block text-white">Database Goldmine</strong>
                                    We text your old leads: "We have an opening tomorrow, want it?" (Avg return: £2k in 24h).
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
