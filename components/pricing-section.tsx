"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Mail, MessageSquare, Send } from "lucide-react";
import { ContactActions } from "./ui/contact-actions";

const PRICING_PLANS = [
    {
        name: "FOUNDATION",
        tagline: "The Digital Asset",
        price: "£99",
        setup: "£500 implementation",
        description: "Your 'Always-On' front desk. Stops enquiry leaks and captures every missed call instantly.",
        features: [
            "Full Business Website (or Fix)",
            "Missed Call Text-Back",
            "5-Minute Lead Guarantee",
            "Unified Inbox (SMS/Email)",
            "Founder-Led CRM Setup",
            "Monthly Performance Audit"
        ],
        highlight: false,
        badge: "Limited: 2 Spots"
    },
    {
        name: "ACCELERATOR",
        tagline: "Reactivation Engine",
        price: "£199",
        setup: "£1,000 implementation",
        description: "The 'Sweet Spot'. Full booking infrastructure plus campaigns to fill your calendar from past customer data.",
        features: [
            "Everything in Foundation",
            "Customer Reactivation Campaign",
            "Full Calendar & Booking Sync",
            "AI Appointment Reminders",
            "Web-to-Booking Chat Widget",
            "Customer Lead Reactivation",
            "Mobile Business App (PWA)"
        ],
        highlight: true,
        badge: "Most Popular"
    },
    {
        name: "SOVEREIGN",
        tagline: "Enterprise Systems",
        price: "£349",
        setup: "£2,500+ custom",
        description: "For multi-van or multi-location operations requiring deep integrations and high-volume architecture.",
        features: [
            "Multi-Location Sync",
            "Custom Software Integrations",
            "Managed Database Migration",
            "Custom App Store Deployment",
            "Priority Stakeholder Access",
            "Scalable Usage Architecture",
            "UK-Based Project Lead"
        ],
        highlight: false,
        priceNote: "+£97 per extra location"
    }
];

export function PricingSection() {
    return (
        <section id="pricing" className="relative py-28 md:py-40 bg-transparent overflow-hidden">
            <div className="container px-4 mx-auto relative z-10">

                <div className="text-center mb-14 md:mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="inline-block px-5 py-2.5 bg-white/5 border border-white/10 rounded-full text-white text-base font-mono uppercase tracking-widest mb-8 backdrop-blur-sm"
                    >
                        Sovereign Infrastructure • High-Yield Assets
                    </motion.div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 tracking-tight leading-[0.95] md:leading-[0.9]">
                        Managed Infrastructure, <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-blue">Not A Subscription.</span>
                    </h2>
                    <p className="text-lg md:text-xl text-white max-w-4xl mx-auto leading-relaxed">
                        We build assets you own inside your business.
                        The implementation covers the build; the monthly fee covers the <span className="text-white font-bold">sovereign uptime.</span>
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[1400px] mx-auto mb-14 md:mb-20">
                    {PRICING_PLANS.map((plan, index) => (
                        <PricingCard key={index} plan={plan} />
                    ))}
                </div>

                {/* Monthly Fee Justification */}
                <div className="max-w-5xl mx-auto mb-28">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-start p-6 sm:p-8 md:p-14 rounded-[2rem] md:rounded-[3rem] bg-black/50 border border-white/10 backdrop-blur-xl">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-xs font-mono uppercase tracking-widest mb-5">
                                Sovereign Monthly License
                            </div>
                            <h3 className="text-3xl font-heading font-bold text-white mb-4">What does the monthly fee actually cover?</h3>
                            <p className="text-base text-white font-light mb-6 leading-relaxed">
                                Think of it like a retainer for a full digital team — except you're not paying for 4–7 separate tools or freelancers to stitch them together. At Sovereign, your monthly fee keeps your entire business infrastructure running, monitored, and improving 24/7.
                            </p>
                            <p className="text-base text-white font-light mb-8 leading-relaxed">
                                While you're out on jobs, Sovereign handles the website uptime, AI responses, booking flows, missed call recovery, compliance updates, and monthly ROI reporting — all under one roof.
                            </p>
                            <div className="grid grid-cols-1 gap-3">
                                {[
                                    "Your full website hosted, maintained & optimised",
                                    "AI receptionist answering calls & messages 24/7",
                                    "Missed call text-back within 60 seconds",
                                    "Automated job booking & reminders",
                                    "Monthly Sovereign ROI report with recovered revenue",
                                    "All integrations & updates handled for you"
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-3 text-white">
                                        <div className="w-1.5 h-1.5 rounded-full bg-brand-cyan mt-2 shrink-0" />
                                        <span className="text-sm font-medium">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="p-7 rounded-3xl bg-black/40 border border-white/10">
                                <p className="text-xs font-mono text-brand-cyan uppercase tracking-widest mb-3">Usage Costs — Passed Through at Cost</p>
                                <p className="text-sm text-white leading-relaxed">
                                    The only extra costs are the direct provider fees (SMS via Twilio, AI via OpenAI) for the messages and calls your business generates. <span className="text-white font-bold">We never add markup.</span> Most Sovereign clients spend <span className="text-white font-bold">£20–£50/mo</span> in usage — often less than one recovered job pays back.
                                </p>
                            </div>
                            <div className="p-7 rounded-3xl bg-brand-cyan/10 border border-brand-cyan/40 backdrop-blur-xl">
                                <p className="text-xs font-mono text-white uppercase tracking-widest mb-3">The Sovereign Guarantee</p>
                                <p className="text-sm text-white leading-relaxed">
                                    We stand behind every system we build. If the Sovereign infrastructure fails to capture a lead or respond within 5 minutes due to our error, <span className="text-white font-bold underline">your monthly license for that month is completely free.</span>
                                </p>
                            </div>
                            <div className="p-5 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 text-xs text-white font-mono leading-relaxed">
                                <span className="text-white font-bold">TL;DR —</span> One flat monthly fee. One team. One system. No surprises.
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 max-w-5xl mx-auto">
                    {/* Refer Button */}
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex flex-col items-center justify-center p-6 sm:p-8 md:p-9 rounded-[2rem] md:rounded-[2.5rem] bg-white/[0.03] border border-white/10 hover:border-brand-cyan/40 hover:bg-brand-cyan/5 transition-all group relative overflow-hidden h-full"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Send className="w-12 h-12" />
                        </div>
                        <span className="text-3xl sm:text-[2.25rem] font-heading font-bold text-white mb-2 text-center">Refer A Business & Earn.</span>
                        <p className="text-white text-[15px] font-light">Refer a business & earn 20% off your monthly fee, or a direct referral payment.</p>
                    </motion.button>

                    {/* Contact Module */}
                    <div className="flex flex-col items-center justify-center p-6 sm:p-8 md:p-9 rounded-[2rem] md:rounded-[2.5rem] bg-brand-navy/30 border border-white/10 backdrop-blur-xl h-full shadow-2xl shadow-black/40">
                        <span className="text-xl md:text-[1.65rem] font-heading font-bold text-white/95 mb-8 text-center leading-tight">
                            Ready to secure <br />your allocation?
                        </span>
                        <ContactActions />
                    </div>
                </div>

            </div>
        </section>
    );
}

function PricingCard({ plan }: { plan: any }) {
    return (
        <motion.div
            whileHover={{ y: -8 }}
            className={`relative p-6 sm:p-8 md:p-9 rounded-[2rem] md:rounded-[2.5rem] flex flex-col h-full transition-all duration-500 group backdrop-blur-3xl ${plan.highlight
                ? "bg-[#050505] md:bg-black/98 border-2 border-brand-cyan/50 shadow-[0_0_80px_rgba(34,211,238,0.25)]"
                : "bg-[#080808] md:bg-black/95 border border-white/20 shadow-2xl"
                }`}
        >
            {plan.highlight && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-black border border-brand-cyan text-white text-[10px] font-black px-4 sm:px-6 py-2.5 rounded-full uppercase tracking-[0.16em] sm:tracking-[0.3em] shadow-[0_0_30px_rgba(34,211,238,0.4)] whitespace-nowrap backdrop-blur-md">
                    {plan.badge || "Most Popular"}
                </div>
            )}

            {!plan.highlight && plan.badge && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-white/20 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-[0.12em] sm:tracking-widest whitespace-nowrap">
                    {plan.badge}
                </div>
            )}

            <div className="mb-9 text-center md:text-left">
                <h3 className={`text-[10px] font-mono uppercase tracking-[0.22em] sm:tracking-[0.4em] mb-5 ${plan.highlight ? "text-brand-cyan" : "text-white"}`}>
                    {plan.name}
                </h3>
                <div className="text-[1.65rem] lg:text-[2rem] font-heading font-bold text-white mb-5 tracking-tight leading-none">{plan.tagline}</div>
                <div className="text-white text-sm leading-relaxed min-h-[4rem] font-medium">{plan.description}</div>
            </div>

            <div className="mb-8 md:mb-9 p-6 sm:p-8 md:p-9 bg-black/40 rounded-[1.5rem] md:rounded-[2rem] border border-white/5 text-center group-hover:border-brand-cyan/10 transition-colors">
                <div className="flex flex-col items-center justify-center">
                    <div className="flex items-baseline gap-2">
                        <span className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tighter tabular-nums">{plan.price}</span>
                        <span className="text-white text-lg font-light">/mo</span>
                    </div>
                    {plan.priceNote && (
                        <div className="text-brand-cyan text-[14px] mt-3 uppercase tracking-[0.15em] font-bold">{plan.priceNote}</div>
                    )}
                    <div className="text-white text-[14px] font-mono uppercase tracking-[0.12em] sm:tracking-[0.2em] mt-7 py-3 px-6 sm:px-7 bg-white/10 rounded-xl border border-white/20 text-center font-bold">
                        {plan.setup}
                    </div>
                </div>
            </div>

            <ul className="space-y-4 mb-10 flex-1">
                {plan.features.map((feature: string, i: number) => (
                    <li key={i} className="flex items-start gap-4 text-white">
                        <div className="mt-1.5">
                            <Check className={`w-4 h-4 shrink-0 ${plan.highlight ? "text-brand-cyan" : "text-white"}`} />
                        </div>
                        <span className="text-sm lg:text-[15px] font-bold text-white">{feature}</span>
                    </li>
                ))}
            </ul>

            <Button
                onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
                variant={plan.highlight ? "glow" : "outline"}
                className={`w-full py-7 text-sm uppercase tracking-[0.12em] sm:tracking-[0.2em] transition-all duration-300 rounded-2xl mb-6 font-bold ${!plan.highlight ? "bg-white/5 border-white/10 hover:bg-white/10" : ""
                    }`}
            >
                Secure Allocation
            </Button>

            <div className="text-center">
                <p className="text-white text-[10px] font-mono uppercase tracking-[0.1em]">
                    Built for <span className="text-white font-bold">Sovereign Growth</span>
                </p>
            </div>
        </motion.div>
    );
}
