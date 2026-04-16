"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Send } from "lucide-react";

const PRICING_PLANS = [
    {
        name: "STARTER",
        tagline: "Get Online Fast",
        price: "£300–£500",
        implementationFee: undefined,
        description: "A sharp, single-page website that gets your business online and looking professional — fast.",
        features: [
            "One-Page Custom Website",
            "Mobile-Optimised & Fast Loading",
            "Contact Form & Enquiry Capture",
            "Basic SEO Setup",
            "Done-For-You — We Handle Everything",
            "Live in 5–7 Days"
        ],
        highlight: false,
        footerText: "Built for Presence"
    },
    {
        name: "STANDARD",
        tagline: "The Full Package",
        price: "£500–£1,000",
        implementationFee: undefined,
        description: "A multi-page site with everything you need to compete online and convert visitors into customers.",
        features: [
            "Everything in Starter, Plus:",
            "Multi-Page Site (Up to 5 Pages)",
            "Custom Design — No Templates",
            "Blog or News Section",
            "Google Analytics & Tracking",
            "CMS for Easy Content Updates",
            "Priority Support for 30 Days"
        ],
        highlight: true,
        badge: "Most Popular",
        footerText: "Built for Growth"
    },
    {
        name: "PREMIUM",
        tagline: "Site + Automation",
        price: "£800–£2,000",
        implementationFee: undefined,
        description: "A full website plus automation systems that capture leads, follow up, and save you hours every week.",
        features: [
            "Everything in Standard, Plus:",
            "Lead Capture & Auto Follow-Up",
            "Booking or Calendar Integration",
            "Email & SMS Automation",
            "CRM Setup & Integration",
            "Ongoing Technical Support",
            "Built to Scale With You"
        ],
        highlight: false,
        footerText: "Built for Scale"
    }
];

export function PricingSection() {
    return (
        <section id="pricing" className="relative py-28 md:py-40 bg-transparent overflow-hidden">
            <div className="container px-4 mx-auto relative z-10">

                <div className="text-center mb-10 md:mb-14 lg:mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="inline-block px-4 md:px-5 py-2 md:py-2.5 bg-white/5 border border-white/10 rounded-full text-white text-[clamp(0.75rem,2.5vw,0.875rem)] md:text-base font-mono uppercase tracking-widest mb-6 md:mb-8 backdrop-blur-sm"
                    >
                        Transparent Pricing • No Surprises
                    </motion.div>
                    <h2 className="text-[clamp(1.75rem,7vw,2.5rem)] sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-4 md:mb-6 tracking-tight leading-[0.95] md:leading-[0.9] px-4">
                        One-Off Builds. <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-blue">Ongoing Retainers. Your Choice.</span>
                    </h2>
                    <p className="text-[clamp(0.9375rem,3.5vw,1.125rem)] md:text-lg lg:text-xl text-white max-w-4xl mx-auto leading-relaxed px-6">
                        Every project is custom-coded and belongs to you.
                        Pick a one-off build or add a retainer for ongoing support, updates, and <span className="text-white font-bold">growth.</span>
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-[1400px] mx-auto mb-12 md:mb-14 lg:mb-20 px-4 md:px-0">
                    {PRICING_PLANS.map((plan, index) => (
                        <PricingCard key={index} plan={plan} />
                    ))}
                </div>

                {/* Monthly Fee Justification */}
                <div className="max-w-5xl mx-auto mb-20 md:mb-28">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-10 items-start p-6 sm:p-8 md:p-10 lg:p-14 rounded-[2rem] md:rounded-[3rem] bg-black/50 border border-white/10 backdrop-blur-xl mx-4 md:mx-0">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-xs font-mono uppercase tracking-widest mb-5">
                                Monthly Retainers
                            </div>
                            <h3 className="text-3xl font-heading font-bold text-white mb-4">Want ongoing support after launch?</h3>
                            <p className="text-base text-white font-light mb-6 leading-relaxed">
                                Think of it like having a full digital team on call — except you're not paying for 4 or 5 different tools and freelancers to stitch it all together. One monthly fee. Everything handled.
                            </p>
                            <p className="text-base text-white font-light mb-8 leading-relaxed">
                                We keep your website live, make updates, run your automations, and send you a monthly report showing exactly what's working.
                            </p>
                            <div className="grid grid-cols-1 gap-3">
                                {[
                                    "Foundation — £99/mo: hosting, maintenance, monthly check-in",
                                    "Accelerator — £199/mo: + content updates, SEO, lead automation",
                                    "Sovereign — £349/mo: + priority support, advanced integrations, growth strategy",
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
                                <p className="text-xs font-mono text-brand-cyan uppercase tracking-widest mb-3">Enterprise & Custom Platforms</p>
                                <p className="text-sm text-white leading-relaxed">
                                    Need something bigger? Custom platforms, SaaS builds, and bespoke digital systems start from <span className="text-white font-bold">£5,000+</span>. Scoped to your exact requirements. <span className="text-white font-bold">Get in touch for a custom quote.</span>
                                </p>
                            </div>
                            <div className="p-7 rounded-3xl bg-brand-cyan/10 border border-brand-cyan/40 backdrop-blur-xl">
                                <p className="text-xs font-mono text-white uppercase tracking-widest mb-3">The Sovereign Guarantee</p>
                                <p className="text-sm text-white leading-relaxed">
                                    We stand behind every project we deliver. If your site isn't live within the agreed timeline due to our error, <span className="text-white font-bold underline">we'll discount your project fee by 20%.</span>
                                </p>
                            </div>
                            <div className="p-5 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 text-xs text-white font-mono leading-relaxed">
                                <span className="text-white font-bold">TL;DR —</span> Fixed project pricing. Optional retainer. One team. No surprises.
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 max-w-5xl mx-auto">
                    {/* Refer Button */}
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex flex-col items-center justify-center p-6 sm:p-8 md:p-9 rounded-[2rem] md:rounded-[2.5rem] bg-black/25 border border-brand-cyan/30 hover:border-brand-cyan/70 hover:bg-brand-cyan/[0.08] transition-all group relative overflow-hidden h-full"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Send className="w-12 h-12" />
                        </div>
                        <span className="text-3xl sm:text-[2.25rem] font-heading font-bold text-white mb-2 text-center">Refer A Business & Earn.</span>
                        <p className="text-white text-[15px] font-light">Know another business owner who needs a website or digital system? Refer them and earn a referral fee — or get 20% off your next project.</p>
                    </motion.button>

                    {/* Portfolio Module */}
                    <div className="relative flex flex-col justify-center p-6 sm:p-8 md:p-9 rounded-[2rem] md:rounded-[2.5rem] bg-brand-navy/30 border border-white/10 backdrop-blur-xl h-full shadow-2xl shadow-black/40 overflow-hidden">
                        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(34,211,238,0.08),transparent_38%,transparent_65%,rgba(59,130,246,0.08))]" />
                        <div className="relative">
                            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-cyan/20 bg-brand-cyan/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.16em] text-brand-cyan">
                                Portfolio Preview
                            </div>
                            <span className="block max-w-md text-xl md:text-[1.65rem] font-heading font-bold text-white/95 mb-8 leading-tight">
                                See real examples of what we build for businesses — and the results they get.
                            </span>
                            <Link
                                href="/portfolio"
                                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-brand-cyan/35 bg-white/[0.03] px-6 py-3 text-sm font-semibold text-cyan-50 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-cyan/60 hover:bg-brand-cyan/10 hover:shadow-[0_0_24px_rgba(34,211,238,0.16)] sm:text-base"
                            >
                                View Portfolio
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
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
                <div className="text-[clamp(1.5rem,5vw,2rem)] lg:text-[2rem] font-heading font-bold text-white mb-5 tracking-tight leading-none">{plan.tagline}</div>
                <div className="text-white text-[clamp(0.8125rem,3vw,0.875rem)] leading-relaxed min-h-[4rem] font-medium">{plan.description}</div>
            </div>

            <div className="mb-8 md:mb-9 p-6 sm:p-8 md:p-9 bg-black/40 rounded-[1.5rem] md:rounded-[2rem] border border-white/5 text-center group-hover:border-brand-cyan/10 transition-colors">
                <div className="flex flex-col items-center justify-center">
                    <div className="flex items-baseline gap-2">
                        <span className="text-[clamp(2.25rem,7vw,3rem)] sm:text-5xl lg:text-6xl font-bold text-white tracking-tighter tabular-nums">{plan.price}</span>
                        <span className="text-white text-lg font-light"></span>
                    </div>
                    {plan.priceNote && (
                        <div className="text-brand-cyan text-[14px] mt-3 uppercase tracking-[0.15em] font-bold">{plan.priceNote}</div>
                    )}
                    {plan.implementationFee && (
                        <div className="mt-4 rounded-2xl border border-brand-cyan/20 bg-brand-cyan/5 px-4 py-3 relative overflow-hidden group/fee">
                            <div className="absolute inset-0 bg-gradient-to-r from-brand-cyan/10 to-transparent opacity-0 group-hover/fee:opacity-100 transition-opacity duration-500" />
                            <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-brand-cyan font-bold">One-Time Implementation</div>
                            <div className="mt-1 font-body text-[1.4rem] font-semibold text-white tracking-[-0.02em] tabular-nums">{plan.implementationFee}</div>
                        </div>
                    )}
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
                variant={plan.highlight ? "primary" : "secondary"}
                size="lg"
                className="w-full mb-6"
            >
                Request Proposal
            </Button>

            <div className="text-center">
                <p className="text-white text-[10px] font-mono uppercase tracking-[0.1em]">
                    {plan.footerText || "Built for Sovereign Growth"}
                </p>
            </div>
        </motion.div>
    );
}
