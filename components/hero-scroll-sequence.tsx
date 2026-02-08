"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

export function HeroScrollSequence() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"] // Extended offset for better control
    });

    // Slogan fades out faster to clear the stage
    const sloganOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
    const sloganScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.9]);
    const sloganY = useTransform(scrollYProgress, [0, 0.15], [0, -100]);

    // Laptop Animation: "Rise and Reveal"
    // 0% -> 40%: Laptop moves from bottom (peek) to center (full view) - SLOWER ZOOM
    const laptopScale = useTransform(scrollYProgress, [0, 0.4], [1.1, 0.9]);
    const laptopY = useTransform(scrollYProgress, [0, 0.4], ["60vh", "0vh"]);
    const laptopOpacity = useTransform(scrollYProgress, [0, 0.15], [0.5, 1]);

    // Callout Animations - Sequenced tightly (Shifted later to accommodate slower laptop entry)
    const callout1Opacity = useTransform(scrollYProgress, [0.42, 0.48], [0, 1]);
    const callout1Y = useTransform(scrollYProgress, [0.42, 0.48], [20, 0]);

    const callout2Opacity = useTransform(scrollYProgress, [0.50, 0.56], [0, 1]);
    const callout2Y = useTransform(scrollYProgress, [0.50, 0.56], [20, 0]);

    const callout3Opacity = useTransform(scrollYProgress, [0.58, 0.64], [0, 1]);
    const callout3Y = useTransform(scrollYProgress, [0.58, 0.64], [20, 0]);

    const callout4Opacity = useTransform(scrollYProgress, [0.66, 0.72], [0, 1]);
    const callout4Y = useTransform(scrollYProgress, [0.66, 0.72], [20, 0]);

    const callout5Opacity = useTransform(scrollYProgress, [0.74, 0.80], [0, 1]);
    const callout5Y = useTransform(scrollYProgress, [0.74, 0.80], [20, 0]);

    const callout6Opacity = useTransform(scrollYProgress, [0.82, 0.88], [0, 1]);
    const callout6Y = useTransform(scrollYProgress, [0.82, 0.88], [20, 0]);

    // Status Text Transition (Grey -> Green at the end)
    const statusOpacity = useTransform(scrollYProgress, [0.90, 0.95], [1, 0]);
    const successOpacity = useTransform(scrollYProgress, [0.90, 0.95], [0, 1]);


    return (
        <div ref={containerRef} className="relative h-[300vh] bg-transparent">
            {/* Sticky Container */}
            <div className="sticky top-0 h-[100svh] md:h-screen w-full overflow-hidden flex flex-col items-center justify-center">

                <div className="relative z-10 w-full h-full max-w-[1400px] mx-auto flex flex-col items-center justify-center pointer-events-none">

                    {/* Text Backdrop for readability */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[140%] h-[140%] -translate-y-[20%] bg-black/40 blur-3xl -z-10 rounded-full pointer-events-none" />

                    {/* Revenue Slogan */}
                    <motion.div
                        style={{ opacity: sloganOpacity, scale: sloganScale, y: sloganY }}
                        className="relative z-20 flex flex-col items-center text-center max-w-4xl px-4 pointer-events-auto mt-[-6vh] sm:mt-[-12vh] md:mt-[-16vh]"
                    >
                        <h1 className="text-[3rem] sm:text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-white leading-[1.05] mb-4 md:mb-6 tracking-tighter drop-shadow-2xl">
                            Revenue You Didn’t <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-brand-cyan to-blue-400 animate-pulse">
                                Know You Lost.
                            </span>
                        </h1>
                        <p className="text-sm sm:text-lg md:text-xl lg:text-2xl text-white/85 max-w-2xl mb-5 md:mb-10 leading-relaxed">
                            A dedicated automation partner who builds, monitors, and scales your clinic infrastructure without hiring more admin.
                        </p>
                        <div className="flex flex-col items-center gap-6 md:gap-10">
                            <div className="flex flex-col md:flex-row gap-3 md:gap-4 w-full md:w-auto px-2 sm:px-0">
                                <button
                                    onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
                                    className="h-11 sm:h-14 md:h-16 px-6 sm:px-8 md:px-12 w-full md:w-auto rounded-full bg-brand-cyan text-black font-bold text-base sm:text-lg md:text-2xl hover:bg-white transition-all shadow-[0_0_30px_rgba(34,211,238,0.4)] hover:shadow-[0_0_50px_rgba(255,255,255,0.6)]"
                                >
                                    Book Your Free Strategy Audit
                                </button>
                                <button
                                    onClick={() => document.getElementById('roi')?.scrollIntoView({ behavior: 'smooth' })}
                                    className="h-11 sm:h-14 md:h-16 px-6 sm:px-8 md:px-12 w-full md:w-auto rounded-full bg-white/5 border border-white/10 text-white font-bold text-base sm:text-lg md:text-2xl hover:bg-white/10 transition-all backdrop-blur-xl"
                                >
                                    Analyze Your ROI
                                </button>
                            </div>

                            {/* Trust Microcopy */}
                            <div className="flex flex-col items-center gap-4">
                                <div className="flex flex-wrap items-center justify-center gap-x-6 md:gap-x-10 gap-y-3 md:gap-y-4 opacity-80">
                                    <div className="flex items-center gap-2.5">
                                        <div className="w-2 h-2 rounded-full bg-brand-cyan" />
                                        <span className="text-xs sm:text-sm md:text-lg font-mono uppercase tracking-[0.12em] sm:tracking-[0.2em] md:tracking-widest text-white">Built for private practices</span>
                                    </div>
                                    <div className="flex items-center gap-2.5">
                                        <div className="w-2 h-2 rounded-full bg-brand-cyan" />
                                        <span className="text-xs sm:text-sm md:text-lg font-mono uppercase tracking-[0.12em] sm:tracking-[0.2em] md:tracking-widest text-white">2–3 week implementation</span>
                                    </div>
                                    <div className="flex items-center gap-2.5">
                                        <div className="w-2 h-2 rounded-full bg-brand-cyan" />
                                        <span className="text-xs sm:text-sm md:text-lg font-mono uppercase tracking-[0.12em] sm:tracking-[0.2em] md:tracking-widest text-white">ROI tracking included</span>
                                    </div>
                                </div>
                                <p className="text-[11px] sm:text-sm font-mono text-white/50 uppercase tracking-[0.1em] sm:tracking-[0.18em] text-center px-2">Limited to 3 new clinic partners per month.</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Laptop with Integrated Dashboard */}
                    <motion.div
                        style={{
                            scale: laptopScale,
                            y: laptopY,
                            opacity: laptopOpacity
                        }}
                        className="absolute bottom-auto top-auto w-full max-w-6xl px-4 sm:px-6 md:px-0 flex items-center justify-center pointer-events-none"
                    >
                        {/* Feature Callouts - Positioned Away From Laptop (3 on each side) */}
                        {/* LEFT SIDE CALLOUTS - Further away from laptop */}
                        <motion.div
                            style={{ opacity: callout1Opacity }}
                            className="absolute -left-56 top-[15%] z-50 pointer-events-none hidden lg:block"
                        >
                            <motion.div
                                animate={{ x: [0, 5, 0] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                className="bg-black/90 backdrop-blur-md border border-brand-cyan/40 text-brand-cyan px-5 py-3 rounded-xl text-sm font-mono uppercase tracking-widest shadow-[0_0_30px_rgba(34,211,238,0.3)]"
                            >
                                Leads Captured →
                            </motion.div>
                        </motion.div>
                        <motion.div
                            style={{ opacity: callout3Opacity }}
                            className="absolute -left-60 top-[42%] z-50 pointer-events-none hidden lg:block"
                        >
                            <motion.div
                                animate={{ x: [0, 5, 0] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                                className="bg-black/90 backdrop-blur-md border border-purple-500/40 text-purple-400 px-5 py-3 rounded-xl text-sm font-mono uppercase tracking-widest shadow-[0_0_30px_rgba(168,85,247,0.3)]"
                            >
                                Automated Scheduling →
                            </motion.div>
                        </motion.div>
                        <motion.div
                            style={{ opacity: callout5Opacity }}
                            className="absolute -left-52 bottom-[18%] z-50 pointer-events-none hidden lg:block"
                        >
                            <motion.div
                                animate={{ x: [0, 5, 0] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                                className="bg-black/90 backdrop-blur-md border border-emerald-500/40 text-emerald-400 px-5 py-3 rounded-xl text-sm font-mono uppercase tracking-widest shadow-[0_0_30px_rgba(16,185,129,0.3)]"
                            >
                                Voice AI Calls →
                            </motion.div>
                        </motion.div>

                        {/* RIGHT SIDE CALLOUTS - Further away from laptop */}
                        <motion.div
                            style={{ opacity: callout2Opacity }}
                            className="absolute -right-56 top-[16%] z-50 pointer-events-none hidden lg:block"
                        >
                            <motion.div
                                animate={{ x: [0, -5, 0] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                                className="bg-black/90 backdrop-blur-md border border-emerald-500/40 text-emerald-400 px-5 py-3 rounded-xl text-sm font-mono uppercase tracking-widest shadow-[0_0_30px_rgba(16,185,129,0.3)]"
                            >
                                ← Revenue Recovered
                            </motion.div>
                        </motion.div>
                        <motion.div
                            style={{ opacity: callout4Opacity }}
                            className="absolute -right-60 top-[44%] z-50 pointer-events-none hidden lg:block"
                        >
                            <motion.div
                                animate={{ x: [0, -5, 0] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                                className="bg-black/90 backdrop-blur-md border border-blue-500/40 text-blue-400 px-5 py-3 rounded-xl text-sm font-mono uppercase tracking-widest shadow-[0_0_30px_rgba(59,130,246,0.3)]"
                            >
                                ← Instant Follow-Ups
                            </motion.div>
                        </motion.div>
                        <motion.div
                            style={{ opacity: callout6Opacity }}
                            className="absolute -right-52 bottom-[16%] z-50 pointer-events-none hidden lg:block"
                        >
                            <motion.div
                                animate={{ x: [0, -5, 0] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
                                className="bg-black/90 backdrop-blur-md border border-pink-500/40 text-pink-400 px-5 py-3 rounded-xl text-sm font-mono uppercase tracking-widest shadow-[0_0_30px_rgba(236,72,153,0.3)]"
                            >
                                ← Client Reactivation
                            </motion.div>
                        </motion.div>

                        {/* Laptop Frame */}
                        <div className="relative rounded-[1.25rem] md:rounded-[2rem] bg-[#0A0A0A] border-[4px] md:border-[8px] border-[#1A1A1A] shadow-2xl overflow-hidden aspect-[16/11] sm:aspect-[16/10] ring-1 ring-white/10 w-full max-h-[60vh] sm:max-h-[85vh] md:max-h-[75vh]">
                            {/* Screen Reflection/Gloss */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none z-50" />

                            {/* Dashboard UI */}
                            <div className="w-full h-full bg-gradient-to-br from-[#0A0A0F] via-[#0F0F14] to-[#050509] flex flex-col relative overflow-hidden">

                                {/* Top Bar with Scrollable Tabs */}
                                <div className="h-10 sm:h-12 border-b border-white/5 flex items-center justify-between bg-black/20 backdrop-blur-xl z-20">
                                    <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-6">
                                        <div className="flex gap-1.5">
                                            <div className="w-2.5 h-2.5 rounded-full bg-red-500/30 ring-1 ring-red-500/60" />
                                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/30 ring-1 ring-yellow-500/60" />
                                            <div className="w-2.5 h-2.5 rounded-full bg-green-500/30 ring-1 ring-green-500/60" />
                                        </div>
                                        <div className="h-3 w-[1px] bg-white/10" />
                                        <div className="text-[9px] sm:text-[11px] font-mono text-brand-cyan/90 tracking-[0.18em] sm:tracking-widest uppercase">Sovereign.OS <span className="text-white/30 ml-1.5">v2.4.0</span></div>
                                    </div>

                                    {/* Dashboard Tabs - Static */}
                                    <div className="hidden md:flex items-center gap-1 px-6">
                                        <div className="px-3 py-1.5 bg-brand-cyan/10 border-b-2 border-brand-cyan text-brand-cyan text-[10px] font-medium">
                                            Overview
                                        </div>
                                        <div className="px-3 py-1.5 text-white/40 text-[10px] font-medium hover:text-white/60 cursor-pointer">
                                            Appointments
                                        </div>
                                        <div className="px-3 py-1.5 text-white/40 text-[10px] font-medium hover:text-white/60 cursor-pointer">
                                            Missed Calls
                                        </div>
                                        <div className="px-3 py-1.5 text-white/40 text-[10px] font-medium hover:text-white/60 cursor-pointer">
                                            AI Assistant
                                        </div>
                                        <div className="px-3 py-1.5 text-white/40 text-[10px] font-medium hover:text-white/60 cursor-pointer">
                                            Analytics
                                        </div>
                                        <div className="px-3 py-1.5 text-white/40 text-[10px] font-medium hover:text-white/60 cursor-pointer">
                                            Integrations
                                        </div>
                                    </div>

                                    <div className="hidden sm:flex items-center gap-3 px-3 sm:px-6">
                                        <div className="px-2 sm:px-3 py-1 bg-brand-cyan/10 border border-brand-cyan/20 rounded-full text-brand-cyan text-[9px] sm:text-[10px] font-medium flex items-center gap-2 whitespace-nowrap">
                                            <div className="w-1.5 h-1.5 bg-brand-cyan rounded-full animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.5)]" />
                                            System Active
                                        </div>
                                    </div>
                                </div>

                                {/* Main Layout */}
                                <div className="flex-1 flex flex-col md:flex-row overflow-hidden">

                                    {/* Quick Actions Sidebar - Integration & Setup */}
                                    <div className="hidden md:flex w-80 border-r border-white/5 bg-white/[0.02] flex-col p-5 z-10 relative overflow-hidden">
                                        {/* Animated Background Gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-b from-brand-cyan/5 via-transparent to-purple-500/5 opacity-50 pointer-events-none" />

                                        <div className="text-[10px] sm:text-xs font-mono text-white/40 mb-3 sm:mb-4 flex items-center justify-between relative z-10">
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
                                                QUICK SETUP
                                            </div>
                                            <div className="text-[10px] text-brand-cyan/60 font-bold">6000+ APPS</div>
                                        </div>

                                        <div className="space-y-2 flex-1 overflow-y-auto relative z-10 pr-1 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                                            {/* Integration & Setup Tasks */}
                                            {[
                                                { text: "Connect Gmail", icon: "✉️", opacity: callout1Opacity, y: callout1Y, type: 'action', status: 'completed' },
                                                { text: "Connect Outlook", icon: "📧", opacity: callout1Opacity, y: callout1Y, type: 'action', status: 'completed' },
                                                { text: "Sync Google Calendar", icon: "📅", opacity: callout2Opacity, y: callout2Y, type: 'action', status: 'active' },
                                                { text: "Setup Missed Call Automation", icon: "📞", opacity: callout2Opacity, y: callout2Y, type: 'action', status: 'completed' },
                                                { text: "Speak to Software AI", icon: "🤖", opacity: callout3Opacity, y: callout3Y, type: 'action', status: 'active' },
                                                { text: "Enable SMS Auto-Reply", icon: "💬", opacity: callout3Opacity, y: callout3Y, type: 'action', status: 'completed' },
                                                { text: "Integrate Stripe Payments", icon: "💳", opacity: callout4Opacity, y: callout4Y, type: 'action', status: 'pending' },
                                                { text: "Connect CRM (Salesforce)", icon: "📊", opacity: callout4Opacity, y: callout4Y, type: 'action', status: 'pending' },
                                                { text: "Link Social Media Accounts", icon: "📱", opacity: callout5Opacity, y: callout5Y, type: 'action', status: 'pending' },
                                                { text: "Setup Slack Notifications", icon: "🔔", opacity: callout5Opacity, y: callout5Y, type: 'action', status: 'pending' },
                                                { text: "Connect WhatsApp Business", icon: "💚", opacity: callout6Opacity, y: callout6Y, type: 'action', status: 'pending' },
                                                { text: "Integrate QuickBooks", icon: "📚", opacity: callout6Opacity, y: callout6Y, type: 'action', status: 'pending' },
                                            ].map((item, i) => (
                                                <motion.div
                                                    key={i}
                                                    style={{ opacity: item.opacity, y: item.y }}
                                                    whileHover={{ scale: 1.02, x: 3 }}
                                                    className={cn(
                                                        "p-3 rounded-lg border backdrop-blur-md relative overflow-hidden cursor-pointer transition-all group",
                                                        item.status === 'completed' ? "bg-emerald-500/5 border-emerald-500/20 hover:bg-emerald-500/10" :
                                                            item.status === 'active' ? "bg-brand-cyan/5 border-brand-cyan/20 hover:bg-brand-cyan/10" :
                                                                "bg-white/5 border-white/10 hover:bg-white/10"
                                                    )}
                                                >
                                                    <div className={cn(
                                                        "absolute left-0 top-0 bottom-0 w-1 group-hover:w-1.5 transition-all",
                                                        item.status === 'completed' ? "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" :
                                                            item.status === 'active' ? "bg-brand-cyan shadow-[0_0_10px_rgba(34,211,238,0.5)]" :
                                                                "bg-white/30"
                                                    )} />

                                                    <div className="flex items-center justify-between pl-1">
                                                        <div className="flex items-center gap-2.5">
                                                            <span className="text-sm">{item.icon}</span>
                                                            <p className="text-xs font-medium text-white/90">
                                                                {item.text}
                                                            </p>
                                                        </div>
                                                        {item.status === 'completed' && (
                                                            <div className="w-4 h-4 rounded-full bg-emerald-500/20 flex items-center justify-center">
                                                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                                            </div>
                                                        )}
                                                        {item.status === 'active' && (
                                                            <div className="w-4 h-4 rounded-full bg-brand-cyan/20 flex items-center justify-center">
                                                                <div className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse" />
                                                            </div>
                                                        )}
                                                        {item.status === 'pending' && (
                                                            <div className="text-[10px] font-mono text-white/30 uppercase">Setup</div>
                                                        )}
                                                    </div>

                                                    {/* Hover glow */}
                                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none" />
                                                </motion.div>
                                            ))}
                                        </div>

                                        {/* Bottom Status */}
                                        <div className="pt-4 border-t border-white/5 space-y-3">
                                            {/* Status Text */}
                                            <div className="text-xs font-mono relative">
                                                <motion.span style={{ opacity: statusOpacity }} className="absolute text-white/30">
                                                    Syncing integrations...
                                                </motion.span>
                                                <motion.span style={{ opacity: successOpacity }} className="text-emerald-400 flex items-center gap-2">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                                    All Systems Connected
                                                </motion.span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Main Dashboard Area - Lighter Background */}
                                    <div className="flex-1 p-2 sm:p-4 md:p-6 overflow-hidden relative bg-gradient-to-br from-white/[0.08] to-white/[0.02]">
                                        {/* Ambient Glows - Subtle */}
                                        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-cyan/5 rounded-full blur-[100px] pointer-events-none" />
                                        <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-purple-500/5 rounded-full blur-[90px] pointer-events-none" />

                                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-4 sm:mb-6 gap-3">
                                            <div>
                                                <h2 className="text-lg sm:text-2xl font-heading font-bold text-white mb-1">Morning Overview</h2>
                                                <p className="text-white/50 text-xs sm:text-sm">Real-time performance metrics</p>
                                            </div>

                                            {/* Mobile Integrations Row - Prominent */}
                                            <div className="flex md:hidden flex-wrap items-center gap-2 mb-4 pr-4">
                                                <p className="w-full text-[10px] font-mono text-white/40 mb-1">Live Connections:</p>
                                                <div className="shrink-0 h-9 px-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-2 text-[10px] text-emerald-400 font-bold uppercase">
                                                    <span>✉️</span> Gmail
                                                </div>
                                                <div className="shrink-0 h-9 px-3 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center gap-2 text-[10px] text-blue-400 font-bold uppercase">
                                                    <span>📧</span> Outlook
                                                </div>
                                                <div className="shrink-0 h-9 px-3 rounded-lg bg-brand-cyan/10 border border-brand-cyan/20 flex items-center gap-2 text-[10px] text-brand-cyan font-bold uppercase">
                                                    <span>📅</span> Calendar
                                                </div>
                                                <div className="shrink-0 h-9 px-3 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center gap-2 text-[10px] text-purple-400 font-bold uppercase">
                                                    <span>📞</span> CRM
                                                </div>
                                                <div className="shrink-0 h-9 px-3 rounded-lg bg-white/5 border border-white/10 flex items-center gap-2 text-[10px] text-white/40 font-bold uppercase">
                                                    <span>💬</span> WhatsApp
                                                </div>
                                            </div>
                                            <div className="hidden sm:flex flex-wrap items-center gap-2 p-2.5 rounded-xl bg-white/[0.06] border border-white/10 max-w-[68%]">
                                                <div className="h-8 px-4 rounded-lg bg-white/5 border border-white/10 flex items-center text-[11px] text-white/70 hover:bg-white/10 transition-colors cursor-pointer">Today</div>

                                                {/* Legal/Compliance Document Templates */}
                                                <div className="h-8 px-3.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-1.5 text-[11px] text-emerald-400 hover:bg-emerald-500/20 transition-colors cursor-pointer">
                                                    <span className="text-[10px]">📄</span>
                                                    <span>Patient Consent</span>
                                                </div>
                                                <div className="h-8 px-3.5 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center gap-1.5 text-[11px] text-blue-400 hover:bg-blue-500/20 transition-colors cursor-pointer">
                                                    <span className="text-[10px]">📋</span>
                                                    <span>Clinical Notes</span>
                                                </div>
                                                <div className="h-8 px-3.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center gap-1.5 text-[11px] text-cyan-300 hover:bg-cyan-500/20 transition-colors cursor-pointer">
                                                    <span className="text-[10px]">🩺</span>
                                                    <span>Medical History Form</span>
                                                </div>
                                                <div className="h-8 px-3.5 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center gap-1.5 text-[11px] text-purple-400 hover:bg-purple-500/20 transition-colors cursor-pointer">
                                                    <span className="text-[10px]">⚕️</span>
                                                    <span>Clinical Risk</span>
                                                </div>
                                                <div className="h-8 px-3.5 rounded-lg bg-pink-500/10 border border-pink-500/20 flex items-center gap-1.5 text-[11px] text-pink-400 hover:bg-pink-500/20 transition-colors cursor-pointer">
                                                    <span className="text-[10px]">📝</span>
                                                    <span>GDPR Records</span>
                                                </div>
                                                <div className="h-8 px-3.5 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center gap-1.5 text-[11px] text-amber-300 hover:bg-amber-500/20 transition-colors cursor-pointer">
                                                    <span className="text-[10px]">🔐</span>
                                                    <span>Privacy Notice</span>
                                                </div>
                                                <div className="h-8 px-3.5 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center gap-1.5 text-[11px] text-rose-300 hover:bg-rose-500/20 transition-colors cursor-pointer">
                                                    <span className="text-[10px]">🚨</span>
                                                    <span>Incident Report</span>
                                                </div>

                                                <div className="h-8 px-4 rounded-lg bg-white/5 border border-white/10 flex items-center text-[11px] text-white/70 hover:bg-white/10 transition-colors cursor-pointer">Export Templates</div>
                                            </div>
                                        </div>

                                        {/* Quick Stats Grid - Clinic Focused */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
                                            {/* To-Do List */}
                                            <div className="relative group p-4 rounded-xl bg-white/[0.03] border border-white/10 overflow-hidden hover:bg-white/[0.05] transition-all cursor-pointer">
                                                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                                <p className="text-xs text-white/50 mb-3 uppercase tracking-wide font-medium flex items-center gap-2">
                                                    <span>📋</span> To-Do List
                                                </p>
                                                <div className="space-y-2">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-3 h-3 rounded border border-emerald-500 bg-emerald-500/20 flex items-center justify-center">
                                                            <div className="text-[8px] text-emerald-400">✓</div>
                                                        </div>
                                                        <p className="text-[10px] text-white/40 line-through">Review missed calls</p>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-3 h-3 rounded border border-emerald-500 bg-emerald-500/20 flex items-center justify-center">
                                                            <div className="text-[8px] text-emerald-400">✓</div>
                                                        </div>
                                                        <p className="text-[10px] text-white/40 line-through">Check appointments</p>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-3 h-3 rounded border border-white/20" />
                                                        <p className="text-[10px] text-white/70">Follow up reactivations</p>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-3 h-3 rounded border border-white/20" />
                                                        <p className="text-[10px] text-white/70">Review analytics</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Goals - Q1/Q2/Q3 */}
                                            <div className="hidden sm:block relative group p-4 rounded-xl bg-white/[0.03] border border-white/10 overflow-hidden hover:bg-white/[0.05] transition-all cursor-pointer">
                                                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                                <p className="text-xs text-white/50 mb-3 uppercase tracking-wide font-medium flex items-center gap-2">
                                                    <span>🎯</span> Q1 Goals
                                                </p>
                                                <div className="space-y-2">
                                                    <div>
                                                        <div className="flex justify-between items-center mb-1">
                                                            <p className="text-[10px] text-white/60">Revenue Target</p>
                                                            <p className="text-[10px] text-emerald-400 font-bold">87%</p>
                                                        </div>
                                                        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                                            <div className="h-full w-[87%] bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full" />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="flex justify-between items-center mb-1">
                                                            <p className="text-[10px] text-white/60">New Patients</p>
                                                            <p className="text-[10px] text-brand-cyan font-bold">64%</p>
                                                        </div>
                                                        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                                            <div className="h-full w-[64%] bg-gradient-to-r from-brand-cyan to-blue-500 rounded-full" />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="flex justify-between items-center mb-1">
                                                            <p className="text-[10px] text-white/60">Automation Rate</p>
                                                            <p className="text-[10px] text-purple-400 font-bold">92%</p>
                                                        </div>
                                                        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                                            <div className="h-full w-[92%] bg-gradient-to-r from-purple-400 to-pink-500 rounded-full" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Sovereign AI Assistant */}
                                            <div className="hidden sm:block relative group p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 overflow-hidden hover:from-purple-500/15 hover:to-pink-500/15 transition-all cursor-pointer">
                                                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                                <div className="flex items-center gap-2 mb-2">
                                                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center text-[10px]">🤖</div>
                                                    <p className="text-xs text-purple-300 uppercase tracking-wide font-medium">Sovereign AI</p>
                                                </div>
                                                <div className="space-y-1.5">
                                                    <div className="flex gap-1.5">
                                                        <div className="flex-1 bg-white/5 rounded px-2 py-1">
                                                            <p className="text-[9px] text-white/60">How many bookings today?</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-1.5">
                                                        <div className="flex-1 bg-purple-500/20 rounded px-2 py-1">
                                                            <p className="text-[9px] text-purple-200">You have 24 bookings...</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-1.5 bg-white/5 rounded px-2 py-1">
                                                        <div className="w-1 h-1 rounded-full bg-purple-400 animate-pulse" />
                                                        <p className="text-[8px] text-white/40 italic">Type a message...</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Big Chart Area */}
                                        <div className="hidden sm:block w-full h-44 sm:h-52 rounded-xl bg-white/[0.03] border border-white/10 p-3 sm:p-5 relative overflow-hidden group hover:bg-white/[0.05] transition-all">
                                            <div className="flex justify-between items-center mb-4">
                                                <h4 className="text-xs font-medium text-white/60 uppercase tracking-wide">Lead Conversion Trajectory</h4>
                                                <div className="flex gap-4">
                                                    <div className="flex items-center gap-2 text-[10px] text-white/40">
                                                        <div className="w-2 h-2 rounded-full bg-brand-cyan shadow-[0_0_8px_rgba(34,211,238,0.5)]" /> Captured
                                                    </div>
                                                    <div className="flex items-center gap-2 text-[10px] text-white/40">
                                                        <div className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.5)]" /> Booked
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Stylized Graph Lines */}
                                            <div className="absolute inset-x-0 bottom-0 top-14 px-5 pointer-events-none">
                                                <svg className="w-full h-full text-brand-cyan overflow-visible" preserveAspectRatio="none">
                                                    <defs>
                                                        <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                                                            <stop offset="0%" stopColor="currentColor" stopOpacity="0.3" />
                                                            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                                                        </linearGradient>
                                                    </defs>
                                                    {/* Grid lines */}
                                                    <line x1="0" y1="20%" x2="100%" y2="20%" stroke="white" strokeWidth="1" strokeDasharray="4 4" opacity="0.08" />
                                                    <line x1="0" y1="40%" x2="100%" y2="40%" stroke="white" strokeWidth="1" strokeDasharray="4 4" opacity="0.08" />
                                                    <line x1="0" y1="60%" x2="100%" y2="60%" stroke="white" strokeWidth="1" strokeDasharray="4 4" opacity="0.08" />
                                                    <line x1="0" y1="80%" x2="100%" y2="80%" stroke="white" strokeWidth="1" strokeDasharray="4 4" opacity="0.08" />

                                                    {/* Line 1: Purple (Booked) */}
                                                    <path d="M0,90 Q150,85 300,70 T600,60 T900,40" fill="none" stroke="#a855f7" strokeWidth="2.5" strokeDasharray="6 2" opacity="0.7" className="drop-shadow-[0_0_10px_rgba(168,85,247,0.4)]" />

                                                    {/* Line 2: Cyan (Captured) */}
                                                    <path d="M0,100 Q150,80 300,60 T600,30 T900,10" fill="none" stroke="#22d3ee" strokeWidth="3" className="drop-shadow-[0_0_15px_rgba(34,211,238,0.6)]" />
                                                    <path d="M0,100 Q150,80 300,60 T600,30 T900,10 V100 H0 Z" fill="url(#chartGradient)" opacity="0.25" />
                                                </svg>
                                            </div>
                                        </div>

                                        {/* Today's Schedule & Activity */}
                                        <div className="hidden md:grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 mt-4 sm:mt-6">
                                            {/* Today's Appointments */}
                                            <div className="rounded-xl bg-white/[0.03] border border-white/10 p-4 hover:bg-white/[0.05] transition-all">
                                                <div className="flex items-center justify-between mb-3">
                                                    <h4 className="text-xs font-medium text-white/60 uppercase tracking-wide">Today's Appointments</h4>
                                                    <div className="text-[10px] text-brand-cyan font-mono">8 Booked</div>
                                                </div>
                                                <div className="space-y-2">
                                                    {[
                                                        { time: '09:00', name: 'Sarah Mitchell', type: 'Consultation', status: 'confirmed' },
                                                        { time: '10:30', name: 'James Peterson', type: 'Follow-up', status: 'confirmed' },
                                                        { time: '14:00', name: 'Emma Rodriguez', type: 'New Patient', status: 'pending' },
                                                        { time: '15:30', name: 'Michael Chen', type: 'Treatment', status: 'confirmed' },
                                                    ].map((apt, i) => (
                                                        <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all group cursor-pointer">
                                                            <div className="text-[10px] font-mono text-brand-cyan/80 w-10">{apt.time}</div>
                                                            <div className="h-3 w-[1px] bg-white/10" />
                                                            <div className="flex-1 min-w-0">
                                                                <div className="text-[11px] font-medium text-white/90 truncate">{apt.name}</div>
                                                                <div className="text-[9px] text-white/40">{apt.type}</div>
                                                            </div>
                                                            <div className={`w-1.5 h-1.5 rounded-full ${apt.status === 'confirmed' ? 'bg-emerald-500' : 'bg-yellow-500'} shadow-[0_0_6px_currentColor]`} />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Follow-Up Clients Retrieved by Automation */}
                                            <div className="rounded-xl bg-white/[0.03] border border-white/10 p-4 hover:bg-white/[0.05] transition-all">
                                                <div className="flex items-center justify-between mb-3">
                                                    <h4 className="text-xs font-medium text-white/60 uppercase tracking-wide">Follow-Up: Retrieved Clients</h4>
                                                    <div className="text-[10px] text-emerald-400 font-mono">Auto-Found</div>
                                                </div>
                                                <div className="space-y-2">
                                                    {[
                                                        { name: 'David Miller', lastVisit: '3 months ago', action: 'SMS sent', status: 'responded' },
                                                        { name: 'Lisa Anderson', lastVisit: '5 months ago', action: 'Email sent', status: 'opened' },
                                                        { name: 'Robert Taylor', lastVisit: '4 months ago', action: 'Voice AI called', status: 'booked' },
                                                        { name: 'Jennifer White', lastVisit: '6 months ago', action: 'SMS sent', status: 'pending' },
                                                    ].map((client, i) => (
                                                        <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all group cursor-pointer">
                                                            <div className="flex-1 min-w-0">
                                                                <div className="text-[11px] font-medium text-white/90 truncate">{client.name}</div>
                                                                <div className="text-[9px] text-white/40">{client.lastVisit} • {client.action}</div>
                                                            </div>
                                                            <div className={`text-[9px] px-1.5 py-0.5 rounded font-medium ${client.status === 'booked' ? 'bg-emerald-500/20 text-emerald-400' :
                                                                client.status === 'responded' || client.status === 'opened' ? 'bg-brand-cyan/20 text-brand-cyan' :
                                                                    'bg-yellow-500/20 text-yellow-400'
                                                                }`}>
                                                                {client.status === 'booked' ? '✓ Booked' : client.status === 'responded' ? '→ Reply' : client.status === 'opened' ? '👁 Opened' : '⋯ Pending'}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Laptop Base */}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 w-[120%] h-4 bg-[#1A1A1A] rounded-b-xl opacity-50 blur-[2px]" />

                        {/* Glow Behind */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[60%] bg-brand-cyan/10 blur-[100px] -z-10" />
                    </motion.div>

                </div>
            </div>
        </div>
    );
}
