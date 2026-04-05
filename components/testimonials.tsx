"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Button } from "./ui/button";

const TRUST_INDICATORS = [
    {
        title: "7-Day Quick Win (Defined)",
        detail: "Missed-call capture + inbox + first follow-up live",
    },
    {
        title: "Founder-Led Implementation",
        detail: "Senior attention from strategy through launch",
    },
    {
        title: "No Long-Term Lock-In",
        detail: "Stay because the system performs, not contracts",
    },
];

const ROADMAP_STEPS = [
    {
        days: "Days 0-7",
        title: "Stop The Leak",
        outcomes: [
            "Missed-call text-back live",
            "Lead capture workflows active",
            "Unified inbox connected",
        ],
        needs: "Access to phone/SMS provider + booking link + staff emails.",
    },
    {
        days: "Days 8-14",
        title: "Deploy Infrastructure",
        outcomes: [
            "Calendar sync and reminders deployed",
            "Follow-up sequences activated",
            "Tracking baseline established",
        ],
        needs: "Customer list export or CRM access if available.",
    },
    {
        days: "Days 15-30",
        title: "Optimise & Scale",
        outcomes: [
            "Scripts and automations refined",
            "Performance audit and reactivation launched",
            "ROI reporting handoff completed",
        ],
        needs: "Approve messaging and allocate 15 mins/week for review.",
    },
];

function Testimonials() {
    return (
        <section id="testimonials" className="relative overflow-hidden bg-transparent py-24">
            <div className="container relative z-10 mx-auto px-4">
                <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-8 lg:grid-cols-2 lg:items-start">
                    <motion.div
                        initial={{ opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-6"
                    >
                        <span className="inline-flex rounded-full border border-brand-cyan/30 bg-brand-cyan/10 px-3 py-1 text-xs font-mono uppercase tracking-[0.2em] text-cyan-400">
                            Founder-Led Delivery
                        </span>

                        <h2 className="text-3xl font-heading font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
                            Stop Losing Work. Start Recovering Revenue.
                        </h2>

                        <div className="space-y-4 text-base leading-relaxed text-white/80">
                            <p>
                                Every missed call is a lost job. Every day without a proper website is money walking to your competitors. Sovereign plugs those leaks — fast — so your business stops bleeding revenue.
                            </p>
                            <p>
                                You work directly with the founder from strategy through launch. No outsourced handoff, no generic package — just systems built around how your business actually wins work.
                            </p>
                        </div>

                        <div className="glass-panel rounded-2xl border border-white/15 p-5 backdrop-blur-[24px] bg-white/[0.03] sm:p-6 shadow-[0_0_40px_-15px_rgba(255,255,255,0.05)]">
                            <p className="mb-3 text-sm font-mono uppercase tracking-[0.15em] text-brand-cyan">
                                What You Get
                            </p>
                            <p className="text-sm leading-relaxed text-white/85 sm:text-base">
                                <span className="font-semibold text-white">You get:</span> a website that actually works for you, calls answered 24/7, and leads chased automatically. <span className="font-semibold text-white">We deliver:</span> a system that stops you losing money and starts recovering revenue from day one.
                            </p>
                            <p className="mt-3 text-sm font-medium text-white italic">No long-term lock-in.</p>
                        </div>

                        <div className="grid grid-cols-1 gap-3">
                            {TRUST_INDICATORS.map((item) => (
                                <div
                                    key={item.title}
                                    className="rounded-xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl"
                                >
                                    <p className="text-sm font-semibold text-white">{item.title}</p>
                                    <p className="mt-2 text-xs leading-relaxed text-white/60">{item.detail}</p>
                                </div>
                            ))}
                        </div>

                        <Button
                            variant="primary"
                            size="lg"
                            className="w-full max-w-sm"
                            onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })}
                        >
                            Request Your Proposal
                        </Button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.6 }}
                        className="glass-panel rounded-3xl border border-white/10 p-5 backdrop-blur-xl sm:p-7"
                    >
                        <div className="mb-6">
                            <p className="text-xs font-mono uppercase tracking-[0.15em] text-brand-cyan">First 30 Days</p>
                            <h3 className="mt-2 text-2xl font-heading font-bold text-white">Growth Roadmap</h3>
                        </div>

                        <div className="relative pl-8">
                            <div className="absolute left-[11px] top-1 h-[calc(100%-0.5rem)] w-px bg-white/15" aria-hidden="true" />
                            <motion.div
                                className="absolute left-[11px] top-1 h-[calc(100%-0.5rem)] w-px origin-top bg-gradient-to-b from-brand-cyan to-brand-blue"
                                initial={{ scaleY: 0, opacity: 0.4 }}
                                whileInView={{ scaleY: 1, opacity: 1 }}
                                viewport={{ once: true, amount: 0.35 }}
                                transition={{ duration: 1, ease: "easeOut" }}
                                aria-hidden="true"
                            />

                            <div className="space-y-5">
                                {ROADMAP_STEPS.map((step, index) => (
                                    <motion.article
                                        key={step.title}
                                        initial={{ opacity: 0, x: 16 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true, amount: 0.35 }}
                                        transition={{ duration: 0.45, delay: index * 0.12 }}
                                        className="relative rounded-2xl border border-white/10 bg-white/[0.04] p-4 sm:p-5 backdrop-blur-xl"
                                    >
                                        <motion.span
                                            className="absolute -left-[29px] top-5 flex h-5 w-5 items-center justify-center rounded-full border border-brand-cyan/50 bg-black shadow-[0_0_18px_rgba(34,211,238,0.45)]"
                                            initial={{ scale: 0.75, opacity: 0.5 }}
                                            whileInView={{ scale: 1, opacity: 1 }}
                                            viewport={{ once: true, amount: 0.4 }}
                                            transition={{ duration: 0.3, delay: index * 0.12 + 0.1 }}
                                            aria-hidden="true"
                                        >
                                            <span className="h-2 w-2 rounded-full bg-brand-cyan" />
                                        </motion.span>

                                        <p className="text-xs font-mono uppercase tracking-[0.12em] text-brand-cyan">{step.days}</p>
                                        <h4 className="mt-1 text-lg font-semibold text-white">{step.title}</h4>

                                        <ul className="mt-3 space-y-2">
                                            {step.outcomes.map((outcome) => (
                                                <li key={outcome} className="flex items-start gap-2 text-sm text-white/80">
                                                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-cyan" aria-hidden="true" />
                                                    <span>{outcome}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        <p className="mt-3 text-xs leading-relaxed text-white/65">
                                            <span className="font-semibold text-white/85">What we need from you:</span> {step.needs}
                                        </p>
                                    </motion.article>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export { Testimonials };
export default Testimonials;
