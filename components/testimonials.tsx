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
        needs: "Patient list export or CRM access if available.",
    },
    {
        days: "Days 15-30",
        title: "Optimize & Scale",
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
                            Founding Partner Program
                        </span>

                        <h2 className="text-3xl font-heading font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
                            We&apos;re Building Our Case Study Portfolio. You Get the ROI.
                        </h2>

                        <div className="space-y-4 text-base leading-relaxed text-white/80">
                            <p>
                                We are a specialized startup agency, founder-led from strategy through delivery. We are building our first case studies with transparent execution and clear performance goals.
                            </p>
                            <p>
                                You get Sovereign-level systems at Foundation pricing, limited to our first <span className="font-semibold text-white">3 founding partners</span>.
                            </p>
                        </div>

                        <div className="glass-panel rounded-2xl border border-white/15 p-5 backdrop-blur-[24px] bg-white/[0.03] sm:p-6 shadow-[0_0_40px_-15px_rgba(255,255,255,0.05)]">
                            <p className="mb-3 text-sm font-mono uppercase tracking-[0.15em] text-brand-cyan">
                                The Deal
                            </p>
                            <p className="text-sm leading-relaxed text-white/85 sm:text-base">
                                <span className="font-semibold text-white">You get:</span> Founder-led implementation, custom build, and priority support. <span className="font-semibold text-white">We get:</span> a video testimonial and case study rights once the agreed KPI milestone is achieved, or after 60 days of active deployment (whichever comes first).
                            </p>
                            <p className="mt-3 text-sm font-medium text-white italic">No long-term lock-in.</p>
                        </div>

                        <div className="flex flex-wrap items-center gap-3">
                            <div className="rounded-full border border-brand-cyan/35 bg-brand-cyan/10 px-4 py-2 text-xs font-mono uppercase tracking-[0.14em] text-brand-cyan">
                                Limited: 3 Slots
                            </div>
                            <div className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-mono uppercase tracking-[0.14em] text-white/80">
                                Applications Open Now
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
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
                            variant="glow"
                            className="w-full max-w-sm rounded-full px-7 py-6 text-sm font-bold uppercase tracking-[0.14em]"
                            onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })}
                        >
                            Apply for Founder Pricing
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
