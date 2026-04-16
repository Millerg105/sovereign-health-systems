"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, AlertTriangle, CheckCircle2, ArrowRight, HelpCircle, Info, Clock, PoundSterling, PhoneMissed } from "lucide-react";
import { ContactForm } from "./contact-form";
import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

export function ROICalculator() {
    // New metrics that users actually know
    const [adminHours, setAdminHours] = useState(10); // Weekly hours spent on admin/quotes
    const [sessionFee, setSessionFee] = useState(150); // Average job value
    const [missedCalls, setMissedCalls] = useState(5); // Estimated missed enquiries per week

    const [monthlyLoss, setMonthlyLoss] = useState(0);
    const [annualLoss, setAnnualLoss] = useState(0);
    const [recoveredRevenue, setRecoveredRevenue] = useState(0);
    const [showForm, setShowForm] = useState(false);

    // Default plan cost for ROI calc
    const planMonthly = 149;
    const planSetup = 750;

    useEffect(() => {
        // Logic: 
        // 1. Admin Loss: Every hour spent on admin is an hour you COULD have been earning.
        // Maybe not full project rate, but let's keep the formula simple: time is money.
        const monthlyAdminLoss = adminHours * (sessionFee / 2) * 4.33; // Conservative estimate: admin time worth 50% of revenue gen time

        // 2. Missed Lead Loss: Every missed inquiry is a lost job.
        const monthlyLeadLoss = missedCalls * sessionFee * 4.33;

        const totalLoss = monthlyAdminLoss + monthlyLeadLoss;
        setMonthlyLoss(totalLoss);
        setAnnualLoss(totalLoss * 12);

        // Sovereign Impact: 
        // - We automate almost all admin (90% recovery of that time)
        // - We capture 70% of missed bookings via instant AI response
        const recoveredTimeVal = monthlyAdminLoss * 0.9;
        const recoveredLeadsVal = monthlyLeadLoss * 0.7;
        setRecoveredRevenue(recoveredTimeVal + recoveredLeadsVal);

    }, [adminHours, sessionFee, missedCalls]);

    const breakEvenWeeks = Math.ceil((planSetup / (recoveredRevenue / 4.33)) * 10) / 10;

    return (
        <section id="roi" className="py-24 bg-transparent relative overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 motherboard-texture opacity-10 pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-cyan/10 border border-brand-cyan/30 text-[10px] font-bold text-brand-cyan mb-6 uppercase tracking-[0.3em] backdrop-blur-sm"
                        >
                            <Info className="w-3 h-3" />
                            Digital ROI Calculator
                        </motion.div>
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4 tracking-tight">
                            What's your digital presence <span className="text-brand-cyan">costing you?</span>
                        </h2>
                        <p className="text-base text-white/80 max-w-2xl mx-auto font-light leading-relaxed">
                            Plug in your own numbers. See exactly how much you're losing to a weak online presence and manual processes.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                        {/* Inputs Side */}
                        <div className="space-y-6">
                            <div className="p-6 md:p-8 rounded-[2rem] bg-black/40 border border-white/10 backdrop-blur-xl space-y-6 md:space-y-8">
                                <div className="space-y-1 mb-2 md:mb-4 border-b border-white/5 pb-3 md:pb-4">
                                    <h4 className="text-sm font-bold text-white uppercase tracking-wider">Step 1: Your Business Numbers</h4>
                                    <p className="text-xs text-white/40">These are the numbers you know off the top of your head.</p>
                                </div>

                                {/* Job Value Slider */}
                                <div>
                                    <div className="flex justify-between mb-3 md:mb-4 items-end">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <PoundSterling className="w-4 h-4 text-brand-cyan" />
                                                <label className="text-sm md:text-base font-medium text-white">Average Project Value</label>
                                            </div>
                                            <p className="text-[10px] text-white/40">What's your typical sale or project value?</p>
                                        </div>
                                        <span className="text-brand-cyan font-mono text-xl md:text-2xl font-bold tabular-nums tracking-tighter">£{sessionFee}</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="50"
                                        max="1000"
                                        step="50"
                                        value={sessionFee}
                                        onChange={(e) => setSessionFee(parseInt(e.target.value))}
                                        className="w-full h-2 md:h-1.5 bg-white/5 rounded-lg appearance-none cursor-pointer accent-brand-cyan transition-all hover:bg-white/10 touch-manipulation"
                                        style={{ minHeight: '44px', marginTop: '-16px', marginBottom: '-16px', padding: '16px 0' }}
                                    />
                                </div>

                                {/* Admin Hours Slider */}
                                <div>
                                    <div className="flex justify-between mb-3 md:mb-4 items-end">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <Clock className="w-4 h-4 text-brand-cyan" />
                                                <label className="text-sm md:text-base font-medium text-white">Weekly Admin Hours</label>
                                            </div>
                                            <p className="text-[10px] text-white/40">Time spent on manual tasks, chasing leads, answering emails.</p>
                                        </div>
                                        <span className="text-brand-cyan font-mono text-xl md:text-2xl font-bold tabular-nums tracking-tighter">{adminHours}h</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="2"
                                        max="40"
                                        step="1"
                                        value={adminHours}
                                        onChange={(e) => setAdminHours(parseInt(e.target.value))}
                                        className="w-full h-2 md:h-1.5 bg-white/5 rounded-lg appearance-none cursor-pointer accent-brand-cyan transition-all hover:bg-white/10 touch-manipulation"
                                        style={{ minHeight: '44px', marginTop: '-16px', marginBottom: '-16px', padding: '16px 0' }}
                                    />
                                </div>

                                <div className="space-y-1 mb-4 border-b border-white/5 pb-4 pt-4">
                                    <h4 className="text-sm font-bold text-red-400 uppercase tracking-wider">Step 2: The Estimated Leak</h4>
                                    <p className="text-xs text-white/40">How many enquiries slip through the cracks?</p>
                                </div>

                                {/* Lost Enquiries Slider */}
                                <div>
                                    <div className="flex justify-between mb-3 md:mb-4 items-end">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <PhoneMissed className="w-4 h-4 text-red-400" />
                                                <label className="text-sm md:text-base font-medium text-red-400">Weekly Lost Enquiries</label>
                                            </div>
                                            <p className="text-[10px] text-white/40">Enquiries lost to a slow website, no follow-up, or poor online presence.</p>
                                        </div>
                                        <span className="text-red-400 font-mono text-xl md:text-2xl font-bold tabular-nums tracking-tighter">{missedCalls}</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="1"
                                        max="30"
                                        step="1"
                                        value={missedCalls}
                                        onChange={(e) => setMissedCalls(parseInt(e.target.value))}
                                        className="w-full h-2 md:h-1.5 bg-red-500/10 rounded-lg appearance-none cursor-pointer accent-red-400 transition-all hover:bg-red-500/20 touch-manipulation"
                                        style={{ minHeight: '44px', marginTop: '-16px', marginBottom: '-16px', padding: '16px 0' }}
                                    />
                                    <div className="flex justify-between mt-3 text-[9px] text-white/20 font-mono uppercase tracking-[0.2em]">
                                        <span>1 Call/wk</span>
                                        <span>30 Calls/wk</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Outcomes Side */}
                        <div className="flex flex-col gap-6">
                            {/* The "Loss" Card */}
                            <motion.div
                                initial={false}
                                animate={{ scale: [1, 1.005, 1] }}
                                className="p-8 rounded-[2rem] bg-red-500/[0.08] border border-red-500/10 relative overflow-hidden group shadow-2xl backdrop-blur-xl"
                            >
                                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-all duration-700">
                                    <AlertTriangle className="w-32 h-32 text-red-500" />
                                </div>
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                    <p className="text-red-400 text-[10px] font-mono uppercase tracking-[0.3em]">Total Opportunity Cost</p>
                                </div>
                                <h3 className="text-5xl font-bold text-white mb-2 tracking-tighter">
                                    £{Math.round(monthlyLoss).toLocaleString()}<span className="text-xl text-white/20 font-light ml-2">/mo</span>
                                </h3>
                                <div className="space-y-3">
                                    <p className="text-white/40 text-[11px] font-medium leading-relaxed">
                                        This is your business's <span className="text-white font-bold">digital gap</span>. It's the combined cost of hours wasted on manual processes plus revenue lost from enquiries that never convert.
                                    </p>
                                    <div className="p-3 rounded-lg bg-red-500/5 border border-red-500/10 text-[10px] text-red-300 font-mono uppercase tracking-wider">
                                        Annual Opportunity Cost: £{Math.round(annualLoss).toLocaleString()}
                                    </div>
                                </div>
                            </motion.div>

                            {/* The "Recovery" Card */}
                            <div className="p-8 rounded-[2rem] bg-brand-cyan/[0.08] border border-brand-cyan/20 relative overflow-hidden shadow-[0_20px_60px_rgba(34,211,238,0.1)] backdrop-blur-xl">
                                <div className="flex items-center gap-2 mb-4">
                                    <TrendingUp className="w-3 h-3 text-brand-cyan" />
                                    <p className="text-brand-cyan text-[10px] font-mono uppercase tracking-[0.3em]">Sovereign Systems Impact</p>
                                </div>
                                <h3 className="text-4xl font-bold text-white mb-6 tracking-tighter">
                                    +£{Math.round(recoveredRevenue).toLocaleString()}<span className="text-lg text-white/20 font-light ml-2">/mo</span>
                                </h3>

                                <p className="text-xs text-white/40 mb-8 leading-relaxed">
                                    With a proper website, automation, and lead capture in place, we give you back <span className="text-white font-bold">10 hours a week</span> and turn missed enquiries into paying clients.
                                </p>

                                <div className="grid grid-cols-2 gap-3 mb-8">
                                    <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 space-y-0.5">
                                        <p className="text-[9px] text-white/40 uppercase tracking-widest">ROI Multiplier</p>
                                        <p className="text-xl font-bold text-brand-cyan">
                                            {Math.round((recoveredRevenue / planMonthly) * 10) / 10}x
                                        </p>
                                        <p className="text-[8px] text-white/20 leading-tight">Your fee is covered {Math.round((recoveredRevenue / planMonthly))} times over.</p>
                                    </div>
                                    <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 space-y-0.5">
                                        <p className="text-[9px] text-white/40 uppercase tracking-widest">Setup Payback</p>
                                        <p className="text-xl font-bold text-white">
                                            {breakEvenWeeks} <span className="text-[10px] text-white/40 font-normal">Weeks</span>
                                        </p>
                                        <p className="text-[8px] text-white/20 leading-tight">Time to earn back your investment via new clients.</p>
                                    </div>
                                </div>

                                <AnimatePresence mode="wait">
                                    {showForm ? (
                                        <motion.div
                                            key="form"
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            className="mt-6"
                                        >
                                            <div className="mb-4 bg-brand-cyan/10 border border-brand-cyan/20 p-4 rounded-xl">
                                                <p className="text-brand-cyan text-xs font-bold uppercase tracking-wider mb-1">Ready to Fix This?</p>
                                                <p className="text-[11px] text-white/60 leading-relaxed">Let's build your digital presence. Submit for a custom project proposal.</p>
                                            </div>
                                            <ContactForm
                                                source="ROI Calculator"
                                                showRevenueFields
                                                initialData={{
                                                    revenue: `£${Math.round(monthlyLoss).toLocaleString()}/mo Loss`,
                                                    problems: `${adminHours}h admin, ${missedCalls} lost enquiries/wk`
                                                }}
                                            />
                                        </motion.div>
                                    ) : (
                                        <Button
                                            key="button"
                                            onClick={() => setShowForm(true)}
                                            variant="primary"
                                            size="lg"
                                            className="w-full"
                                            rightIcon={<ArrowRight className="w-5 h-5" />}
                                        >
                                            Get Your Free Proposal
                                        </Button>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
