"use client";

import { motion } from "framer-motion";
import {
    PhoneOff,
    Clock,
    Database,
    Users,
    TrendingDown,
    ArrowRight,
    Hammer,
    PoundSterling
} from "lucide-react";

const PROBLEMS = [
    {
        icon: PhoneOff,
        problem: "The Missed Call Tax",
        pain: "62% of patients won't leave a message. They just call the next clinic on Google. Every missed call is a missed £150+ appointment.",
        cost: "£1,200+/mo loss",
        solution: "24/7 AI Receptionist captures every lead instantly."
    },
    {
        icon: Clock,
        problem: "The Speed-to-Lead Gap",
        pain: "leads go cold after 5 minutes. If you're busy treating patients when an enquiry comes in, that patient is gone by the time you reply.",
        cost: "7x lower booking rate",
        solution: "Instant automated SMS/WhatsApp follow-ups."
    },
    {
        icon: Database,
        problem: "The Dormant Database",
        pain: "You have hundreds of past patients sitting in a spreadsheet. Without a re-activation system, you're leaving thousands on the table.",
        cost: "£5,000+ hidden revenue",
        solution: "Automated 'Database Reactivation' campaigns."
    }
];

export function ProblemsSection() {
    return (
        <section id="problem" className="py-24 bg-transparent relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-red-500/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 mb-8">
                        <span className="text-base sm:text-sm font-bold text-red-500 uppercase tracking-widest font-mono">Sovereign Diagnosis</span>
                    </div>

                    <h2 className="text-[2.2rem] md:text-5xl font-heading font-bold text-white mb-6 leading-[1.1] tracking-tight">
                        Every Day You Wait,<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-orange-400 to-red-400">
                            Money Walks Out the Door
                        </span>
                    </h2>

                    <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
                        These aren't just admin headaches. They're silent profit killers costing UK clinics an average of <span className="text-white font-semibold">£47,000+ per year</span>.
                    </p>
                </motion.div>

                {/* Problems List - Vertical Layout */}
                <div className="space-y-6 mb-16 max-w-5xl mx-auto">
                    {PROBLEMS.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group relative"
                        >
                            {/* Hover Glow */}
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-cyan/0 via-brand-cyan/10 to-brand-cyan/0 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />

                            {/* Card */}
                            <div className="relative bg-black/40 border border-white/5 rounded-2xl p-6 md:p-8 backdrop-blur-xl group-hover:border-brand-cyan/20 transition-all duration-300">
                                <div className="flex flex-col md:flex-row md:items-center gap-6">

                                    {/* Icon */}
                                    <div className="shrink-0">
                                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-red-500/10 to-orange-500/10 flex items-center justify-center border border-red-500/10 group-hover:scale-105 transition-all duration-300">
                                            <item.icon className="w-6 h-6 text-red-500/80" />
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 space-y-3">
                                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                            <h3 className="text-2xl font-heading font-bold text-white group-hover:text-brand-cyan transition-colors">
                                                {item.problem}
                                            </h3>
                                            <div className="flex items-center gap-2 px-3 py-1.5 bg-red-500/5 border border-red-500/10 rounded-full shrink-0">
                                                <PoundSterling className="w-3.5 h-3.5 text-red-400" />
                                                <span className="text-xs font-bold text-red-400 font-mono uppercase tracking-tight">{item.cost}</span>
                                            </div>
                                        </div>

                                        <p className="text-sm text-white/40 leading-relaxed max-w-3xl">
                                            {item.pain}
                                        </p>

                                        {/* Solution */}
                                        <div className="flex items-start gap-3 pt-3 border-t border-white/5">
                                            <ArrowRight className="w-4 h-4 text-brand-cyan shrink-0 mt-0.5" />
                                            <p className="text-xs text-brand-cyan font-medium">
                                                {item.solution}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Micro-CTA */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="text-center mt-20 md:mt-10"
                >
                    <div className="max-w-3xl mx-auto py-12 px-8 rounded-[2.5rem] bg-white shadow-[0_0_60px_rgba(255,255,255,0.15)] relative overflow-hidden group">
                        {/* Decorative Gradient Inner */}
                        <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                        <p className="text-black text-2xl sm:text-3xl font-heading font-bold uppercase tracking-tight mb-3 relative z-10">
                            You don't need <span className="text-red-500">more leads</span>.
                        </p>
                        <p className="text-black/70 text-lg sm:text-xl font-medium leading-[1.4] relative z-10">
                            You need an <span className="text-black font-extrabold italic underline decoration-red-500 underline-offset-8 decoration-2">engine</span> that's better at keeping them.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
