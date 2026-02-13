"use client";

import { motion } from "framer-motion";

const steps = [
    {
        num: "01",
        title: "Book your free audit",
        desc: "We analyze your current lead flow and find lost revenue gaps.",
    },
    {
        num: "02",
        title: "We build your plan",
        desc: "We design a custom automation roadmap for your specific business.",
    },
    {
        num: "03",
        title: "We install & launch",
        desc: "The system runs 24/7. You see more bookings within weeks.",
    },
];

export function Process() {
    return (
        <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
            {/* Dark Mode Gradient */}
            <div className="absolute top-0 left-0 w-full h-full bg-slate-900 z-0" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-slate-800/50 rounded-full blur-[100px] z-0" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                        How It Works
                    </h2>
                    <p className="text-slate-400 text-lg">
                        Simple 3-step implementation.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
                    {steps.map((step, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.2 }}
                            className="relative p-6 rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur hover:border-gold-600/30 transition-colors group"
                        >
                            <div className="text-5xl font-bold text-slate-800 group-hover:text-gold-600/20 transition-colors mb-6 font-heading">
                                {step.num}
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-slate-100">{step.title}</h3>
                            <p className="text-slate-400 leading-relaxed text-sm">
                                {step.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
