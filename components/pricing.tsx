"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const PricingTiers = [
    {
        name: "STARTER",
        price: "£1,500",
        period: "one-time setup",
        desc: "For smaller clinics starting with automation.",
        features: [
            "Missed Call Text-Back System",
            "Lead Follow-Up Automation",
            "Basic Reporting",
            "Calendar Sync",
            "Sovereign Brand Support"
        ],
        cta: "Start Recovery",
        popular: false
    },
    {
        name: "GROWTH",
        price: "£3,000",
        period: "one-time setup",
        desc: "Best for most clinics efficiently scaling.",
        features: [
            "Everything in Starter",
            "2-Way Booking + Reminders",
            "Reactivation Campaigns",
            "ROI Dashboard",
            "Lead Conversion Dashboard",
            "Priority Support"
        ],
        cta: "Scale Your Clinic",
        popular: true
    },
    {
        name: "SOVEREIGN",
        price: "Custom",
        period: "custom scope",
        desc: "For multi-location & franchise networks.",
        features: [
            "Multi-Location Architecture",
            "CRM Migration",
            "Deep Integrations",
            "Advanced Analytics",
            "Dedicated Account Manager",
            "Priority Support"
        ],
        cta: "Contact Sales",
        popular: false
    }
];

export function Pricing() {
    return (
        <section id="pricing" className="py-32 bg-void relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-30">
                <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-brand-blue/20 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-cyan/10 rounded-full blur-[100px]" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <span className="text-brand-cyan font-mono text-sm tracking-widest uppercase mb-4 block">
                        Investment
                    </span>
                    <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6 tracking-tight">
                        One Setup. Bookings Forever.
                    </h2>
                    <p className="text-xl text-white/60">
                        Install the Sovereign System once. Recover missed revenue every single day.
                        <br className="hidden md:block" /> No hidden subscriptions. Just results.
                    </p>
                </div>

                {/* Pricing Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
                    {PricingTiers.map((tier, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className={`relative rounded-2xl p-8 border backdrop-blur-sm flex flex-col ${tier.popular
                                ? "bg-brand-navy border-brand-cyan/50 shadow-[0_0_50px_rgba(34,211,238,0.15)] z-10"
                                : "bg-brand-navy/50 border-white/10 hover:border-white/20"
                                }`}
                        >
                            {tier.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-cyan text-brand-navy px-4 py-1 rounded-full text-xs font-bold tracking-widest shadow-lg uppercase">
                                    Most Popular
                                </div>
                            )}

                            <div className="mb-8">
                                <h3 className={`text-sm font-bold tracking-widest uppercase mb-4 ${tier.popular ? "text-brand-cyan" : "text-white/50"}`}>
                                    {tier.name}
                                </h3>
                                <div className="flex items-baseline gap-1 mb-2">
                                    <span className="text-4xl md:text-5xl font-heading font-medium text-white">{tier.price}</span>
                                    {tier.price !== "Custom" && (
                                        <span className="text-white/40 font-mono text-xs uppercase">/{tier.period}</span>
                                    )}
                                </div>
                                <p className="text-white/60 text-sm">
                                    {tier.desc}
                                </p>
                            </div>

                            <div className="space-y-4 mb-8 flex-1">
                                {tier.features.map((feature, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${tier.popular ? "text-brand-cyan bg-brand-cyan/10" : "text-white/40 bg-white/5"
                                            }`}>
                                            <Check className="w-3 h-3" />
                                        </div>
                                        <span className="text-white/80 text-sm leading-relaxed">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <Button
                                className={`w-full py-6 text-base font-bold tracking-wide ${tier.popular
                                    ? "bg-brand-blue hover:bg-brand-cyan text-white hover:text-brand-navy shadow-lg shadow-brand-blue/20"
                                    : "bg-white/10 hover:bg-white/20 text-white"
                                    }`}
                                onClick={() => document.getElementById('audit')?.scrollIntoView({ behavior: 'smooth' })}
                            >
                                {tier.cta}
                            </Button>
                        </motion.div>
                    ))}
                </div>

                {/* Disclaimer */}
                <div className="text-center max-w-2xl mx-auto border-t border-white/10 pt-8">
                    <p className="text-white/40 text-sm flex items-center justify-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-brand-cyan/50 inline-block" />
                        Website build available as an add-on, or included in Growth+ depending on scope.
                    </p>
                </div>

                <div className="mt-16 text-center">
                    <p className="text-white/40 mb-4 text-sm">Need a custom enterprise solution?</p>
                    <a href="mailto:hello@sovereignhealthsystems.co.uk" className="text-brand-cyan font-bold hover:text-white transition-colors">
                        Talk to our engineering team →
                    </a>
                </div>
            </div>
        </section>
    );
}
