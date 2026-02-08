"use client";

import { motion } from "framer-motion";

export function Implementation() {
    const steps = [
        { title: "Day 1: Audit", desc: "We map your current patient journey and find the leaks." },
        { title: "Day 3: Build", desc: "We configure your custom AI automation workflows." },
        { title: "Day 7: Launch", desc: "We go live. Missed calls start turning into bookings instantly." },
        { title: "Day 14: Optimise", desc: "We review the data and refine the AI for maximum conversion." }
    ];

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-heading font-bold text-slate-900 mb-6">
                        Live in 7 Days. <br className="md:hidden" />No Tech Skills Required.
                    </h2>
                </div>

                <div className="relative max-w-4xl mx-auto">
                    {/* Line */}
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -translate-y-1/2 hidden md:block" />

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {steps.map((step, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.2 }}
                                viewport={{ once: true }}
                                className="relative bg-white md:bg-transparent p-6 md:p-0 rounded-xl border md:border-none border-slate-100 shadow-sm md:shadow-none z-10 text-center"
                            >
                                <div className="w-10 h-10 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold mx-auto mb-4 border-4 border-white">
                                    {idx + 1}
                                </div>
                                <h3 className="font-bold text-slate-900 mb-2">{step.title}</h3>
                                <p className="text-sm text-slate-500">{step.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
