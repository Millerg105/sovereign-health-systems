"use client";

import { motion } from "framer-motion";
import { AlertCircle, Clock, XCircle, MessageSquare, PhoneMissed, Mail } from "lucide-react";
import painData from "@/content/painpoints.json";

// Icon mapping
const iconMap: Record<string, any> = {
    Clock: Clock,
    XCircle: XCircle,
    AlertCircle: AlertCircle,
    MessageSquare: MessageSquare,
    PhoneMissed: PhoneMissed,
    Mail: Mail
};

export function PainPoints() {
    const pains = painData.pain_points;

    return (
        <section id="problem" className="py-24 bg-slate-50 relative">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row gap-12 items-start max-w-6xl mx-auto">
                    {/* Text Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="md:w-1/3 sticky top-32"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-600 font-bold text-xs uppercase tracking-wider mb-6">
                            The Problem
                        </div>
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-6 leading-tight">
                            Most trade businesses lose customers before they ever book.
                        </h2>
                        <p className="text-lg text-slate-600 leading-relaxed">
                            You spend money on ads and SEO, but administrative bottlenecks are capping your growth.
                            <br /><br />
                            Every missed call and slow reply is a customer gifting their money to your competitor.
                        </p>

                        <div className="mt-8 p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
                            <div className="text-4xl font-bold text-slate-900 mb-1">62%</div>
                            <div className="text-sm text-slate-500">of calls to small businesses go unanswered.</div>
                        </div>
                    </motion.div>

                    {/* Cards Side */}
                    <div className="md:w-2/3 grid gap-6">
                        {pains.map((pain, idx) => {
                            const Icon = iconMap[pain.icon] || AlertCircle;

                            return (
                                <motion.div
                                    key={pain.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all group"
                                >
                                    <div className="flex items-start gap-6">
                                        <div className="w-12 h-12 shrink-0 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:text-gold-600 group-hover:bg-gold-50 transition-colors">
                                            <Icon className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-slate-900 mb-2">{pain.title}</h3>
                                            <p className="text-slate-600 font-medium mb-2">{pain.symptom}</p>
                                            <div className="text-sm text-red-500 bg-red-50 px-3 py-1 rounded-md inline-block">
                                                Cost: {pain.cost}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
