"use client";

import { Button } from "@/components/ui/button";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { cn } from "@/lib/utils";

export function HeroScrollSequence() {
    return (
        <div className="flex flex-col overflow-hidden bg-transparent mb-20 md:mb-32">
            <ContainerScroll
                titleComponent={
                    <div className="flex flex-col items-center text-center max-w-4xl mx-auto px-4 pointer-events-auto">
                        <h1 className="text-[clamp(2.25rem,8vw,3rem)] sm:text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-white mt-8 md:mt-12 mb-0 tracking-tighter drop-shadow-2xl max-w-full break-words leading-[1.1]">
                            Jobs You Didn&apos;t <br className="hidden sm:inline" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-brand-cyan to-blue-400 animate-pulse">
                                Know You Lost.
                            </span>
                        </h1>
                        <p className="text-[clamp(0.875rem,3.5vw,1rem)] sm:text-lg md:text-xl lg:text-2xl text-white/85 max-w-2xl mt-6 mb-0 leading-relaxed px-2">
                            We answer your missed calls, chase your leads, and book your jobs — automatically. So you can stay on site and stop losing work.
                        </p>
                        <div className="flex flex-col items-center gap-3 md:gap-6 w-full mt-8">
                            <div className="flex flex-col w-full gap-3 px-4 sm:px-8 md:px-0 md:flex-row md:w-auto md:gap-4">
                                <Button
                                    onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
                                    variant="primary"
                                    size="lg"
                                    className="w-full md:w-auto text-sm sm:text-base"
                                >
                                    Book Your Free Growth Audit
                                </Button>
                                <Button
                                    onClick={() => document.getElementById('roi')?.scrollIntoView({ behavior: 'smooth' })}
                                    variant="secondary"
                                    size="lg"
                                    className="w-full md:w-auto text-sm sm:text-base"
                                >
                                    Calculate Your Lost Revenue
                                </Button>
                            </div>

                            {/* Trust Microcopy */}
                            <div className="flex flex-col items-center gap-4 mt-6">
                                <div className="flex flex-wrap items-center justify-center gap-x-6 md:gap-x-10 gap-y-3 md:gap-y-4 opacity-80">
                                    <div className="flex items-center gap-2.5">
                                        <div className="w-2 h-2 rounded-full bg-brand-cyan" />
                                        <span className="text-xs sm:text-sm md:text-lg font-mono uppercase tracking-[0.12em] sm:tracking-[0.2em] md:tracking-widest text-white">Built for home service businesses</span>
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
                                <p className="text-[11px] sm:text-sm font-mono text-white/50 uppercase tracking-[0.1em] sm:tracking-[0.18em] text-center px-2">Limited to 3 new clients per month.</p>
                            </div>
                            <div className="mt-10 md:mt-16 w-full" />
                        </div>
                    </div>
                }
            >
                {/* Dashboard UI — identical visual to before, wrapped in ContainerScroll */}
                <div className="w-full h-full bg-gradient-to-br from-[#0A0A0F] via-[#0F0F14] to-[#050509] flex flex-col relative overflow-hidden rounded-xl md:rounded-2xl">

                    {/* Top Bar */}
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

                        {/* Dashboard Tabs */}
                        <div className="hidden md:flex items-center gap-1 px-6">
                            <div className="px-3 py-1.5 bg-brand-cyan/10 border-b-2 border-brand-cyan text-brand-cyan text-[10px] font-medium">Overview</div>
                            <div className="px-3 py-1.5 text-white/40 text-[10px] font-medium">Jobs & Quotes</div>
                            <div className="px-3 py-1.5 text-white/40 text-[10px] font-medium">Missed Calls</div>
                            <div className="px-3 py-1.5 text-white/40 text-[10px] font-medium">AI Assistant</div>
                            <div className="px-3 py-1.5 text-white/40 text-[10px] font-medium">Analytics</div>
                            <div className="px-3 py-1.5 text-white/40 text-[10px] font-medium">Integrations</div>
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

                        {/* Quick Actions Sidebar */}
                        <div className="hidden md:flex w-80 border-r border-white/5 bg-white/[0.02] flex-col p-5 z-10 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-b from-brand-cyan/5 via-transparent to-purple-500/5 opacity-50 pointer-events-none" />

                            <div className="text-[10px] sm:text-xs font-mono text-white/40 mb-3 sm:mb-4 flex items-center justify-between relative z-10">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
                                    QUICK SETUP
                                </div>
                                <div className="text-[10px] text-brand-cyan/60 font-bold">6000+ APPS</div>
                            </div>

                            <div className="space-y-2 flex-1 overflow-y-auto relative z-10 pr-1">
                                {[
                                    { text: "Connect Gmail", icon: "✉️", status: 'completed' },
                                    { text: "Connect Outlook", icon: "📧", status: 'completed' },
                                    { text: "Sync Google Calendar", icon: "📅", status: 'active' },
                                    { text: "Setup Missed Call Automation", icon: "📞", status: 'completed' },
                                    { text: "Speak to Software AI", icon: "🤖", status: 'active' },
                                    { text: "Enable SMS Auto-Reply", icon: "💬", status: 'completed' },
                                    { text: "Integrate Stripe Payments", icon: "💳", status: 'pending' },
                                    { text: "Connect CRM (Salesforce)", icon: "📊", status: 'pending' },
                                    { text: "Link Social Media Accounts", icon: "📱", status: 'pending' },
                                    { text: "Setup Slack Notifications", icon: "🔔", status: 'pending' },
                                ].map((item, i) => (
                                    <div
                                        key={i}
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
                                                <p className="text-xs font-medium text-white/90">{item.text}</p>
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
                                    </div>
                                ))}
                            </div>

                            {/* Bottom Status */}
                            <div className="pt-4 border-t border-white/5 space-y-3">
                                <div className="text-xs font-mono text-emerald-400 flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                    All Systems Connected
                                </div>
                            </div>
                        </div>

                        {/* Main Dashboard Area */}
                        <div className="flex-1 p-1.5 sm:p-4 md:p-6 overflow-hidden relative bg-gradient-to-br from-white/[0.08] to-white/[0.02]">
                            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-cyan/5 rounded-full blur-[100px] pointer-events-none" />
                            <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-purple-500/5 rounded-full blur-[90px] pointer-events-none" />

                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-4 sm:mb-6 gap-3">
                                <div>
                                    <h2 className="text-lg sm:text-2xl font-heading font-bold text-white mb-1">Morning Overview</h2>
                                    <p className="text-white/50 text-xs sm:text-sm">Real-time performance metrics</p>
                                </div>
                                <div className="grid grid-cols-2 gap-2 md:hidden">
                                    {[
                                        { label: 'Quotes', tone: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-300', icon: '📏' },
                                        { label: 'Priority', tone: 'bg-purple-500/10 border-purple-500/20 text-purple-300', icon: '⚠️' },
                                        { label: 'Job Sheet', tone: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300', icon: '📄' },
                                        { label: 'AI Notes', tone: 'bg-blue-500/10 border-blue-500/20 text-blue-300', icon: '🤖' },
                                    ].map((item) => (
                                        <div key={item.label} className={cn("flex items-center gap-2 rounded-xl border px-3 py-2 text-[11px] font-medium", item.tone)}>
                                            <span className="text-[10px]">{item.icon}</span>
                                            <span>{item.label}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="hidden sm:flex flex-wrap items-center gap-2 p-2.5 rounded-xl bg-white/[0.06] border border-white/10 max-w-[68%]">
                                    <div className="h-8 px-4 rounded-lg bg-white/5 border border-white/10 flex items-center text-[11px] text-white/70">Today</div>
                                    <div className="h-8 px-3.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-1.5 text-[11px] text-emerald-400">
                                        <span className="text-[10px]">📄</span><span>Job Sheet</span>
                                    </div>
                                    <div className="h-8 px-3.5 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center gap-1.5 text-[11px] text-blue-400">
                                        <span className="text-[10px]">📋</span><span>Job Notes</span>
                                    </div>
                                    <div className="h-8 px-3.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center gap-1.5 text-[11px] text-cyan-300">
                                        <span className="text-[10px]">📏</span><span>Quote Calculator</span>
                                    </div>
                                    <div className="h-8 px-3.5 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center gap-1.5 text-[11px] text-purple-400">
                                        <span className="text-[10px]">⚠️</span><span>Job Priority</span>
                                    </div>
                                    <div className="h-8 px-3.5 rounded-lg bg-pink-500/10 border border-pink-500/20 flex items-center gap-1.5 text-[11px] text-pink-400">
                                        <span className="text-[10px]">📝</span><span>GDPR Records</span>
                                    </div>
                                    <div className="h-8 px-3.5 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center gap-1.5 text-[11px] text-amber-300">
                                        <span className="text-[10px]">🔐</span><span>Privacy Notice</span>
                                    </div>
                                    <div className="h-8 px-3.5 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center gap-1.5 text-[11px] text-rose-300">
                                        <span className="text-[10px]">🚨</span><span>Issue Report</span>
                                    </div>
                                    <div className="h-8 px-4 rounded-lg bg-white/5 border border-white/10 flex items-center text-[11px] text-white/70">Export Templates</div>
                                </div>
                            </div>

                            {/* Quick Stats Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
                                {/* To-Do List */}
                                <div className="relative group p-4 rounded-xl bg-white/[0.03] border border-white/10 overflow-hidden">
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
                                            <p className="text-[10px] text-white/40 line-through">Check today&apos;s jobs</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded border border-white/20" />
                                            <p className="text-[10px] text-white/70">Follow up on quotes sent</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded border border-white/20" />
                                            <p className="text-[10px] text-white/70">Review weekly analytics</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Goals */}
                                <div className="hidden sm:block relative group p-4 rounded-xl bg-white/[0.03] border border-white/10 overflow-hidden">
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
                                                <p className="text-[10px] text-white/60">New Customers</p>
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
                                <div className="hidden sm:block relative group p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 overflow-hidden">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center text-[10px]">🤖</div>
                                        <p className="text-xs text-purple-300 uppercase tracking-wide font-medium">Sovereign AI</p>
                                    </div>
                                    <div className="space-y-1.5">
                                        <div className="flex-1 bg-white/5 rounded px-2 py-1">
                                            <p className="text-[9px] text-white/60">How many jobs booked today?</p>
                                        </div>
                                        <div className="flex-1 bg-purple-500/20 rounded px-2 py-1">
                                            <p className="text-[9px] text-purple-200">You have 24 jobs booked...</p>
                                        </div>
                                        <div className="flex items-center gap-1.5 bg-white/5 rounded px-2 py-1">
                                            <div className="w-1 h-1 rounded-full bg-purple-400 animate-pulse" />
                                            <p className="text-[8px] text-white/40 italic">Type a message...</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="sm:hidden relative group p-4 rounded-xl bg-white/[0.03] border border-white/10 overflow-hidden">
                                    <p className="text-xs text-white/50 mb-3 uppercase tracking-wide font-medium flex items-center gap-2">
                                        <span>🎯</span> Today&apos;s Targets
                                    </p>
                                    <div className="space-y-3">
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
                                                <p className="text-[10px] text-white/60">Automation Rate</p>
                                                <p className="text-[10px] text-purple-400 font-bold">92%</p>
                                            </div>
                                            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                                <div className="h-full w-[92%] bg-gradient-to-r from-purple-400 to-pink-500 rounded-full" />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2 pt-1">
                                            <div className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2">
                                                <div className="text-[9px] uppercase tracking-[0.16em] text-white/35">Booked</div>
                                                <div className="mt-1 text-lg font-semibold text-white">24</div>
                                            </div>
                                            <div className="rounded-lg border border-brand-cyan/20 bg-brand-cyan/5 px-3 py-2">
                                                <div className="text-[9px] uppercase tracking-[0.16em] text-white/35">Recovered</div>
                                                <div className="mt-1 text-lg font-semibold text-brand-cyan">£3.4k</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="sm:hidden relative group p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 overflow-hidden">
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center text-[10px]">🤖</div>
                                        <p className="text-xs text-purple-300 uppercase tracking-wide font-medium">Sovereign AI</p>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="rounded-lg bg-white/5 px-3 py-2 text-[10px] text-white/65">How many jobs booked today?</div>
                                        <div className="rounded-lg bg-purple-500/20 px-3 py-2 text-[10px] text-purple-100">24 booked, 6 quotes sent, 3 callbacks recovered.</div>
                                        <div className="grid grid-cols-2 gap-2">
                                            <div className="rounded-lg border border-white/10 bg-black/20 px-3 py-2">
                                                <div className="text-[9px] uppercase tracking-[0.16em] text-white/35">Urgent</div>
                                                <div className="mt-1 text-sm font-semibold text-white">2 leads</div>
                                            </div>
                                            <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-3 py-2">
                                                <div className="text-[9px] uppercase tracking-[0.16em] text-emerald-300/70">AI active</div>
                                                <div className="mt-1 text-sm font-semibold text-emerald-300">Live</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Big Chart Area */}
                            <div className="w-full h-44 sm:h-52 rounded-xl bg-white/[0.03] border border-white/10 p-3 sm:p-5 relative overflow-hidden">
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
                                <div className="absolute inset-x-0 bottom-0 top-14 px-5 pointer-events-none">
                                    <svg className="w-full h-full text-brand-cyan overflow-visible" preserveAspectRatio="none">
                                        <defs>
                                            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor="currentColor" stopOpacity="0.3" />
                                                <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                                            </linearGradient>
                                        </defs>
                                        <line x1="0" y1="20%" x2="100%" y2="20%" stroke="white" strokeWidth="1" strokeDasharray="4 4" opacity="0.08" />
                                        <line x1="0" y1="40%" x2="100%" y2="40%" stroke="white" strokeWidth="1" strokeDasharray="4 4" opacity="0.08" />
                                        <line x1="0" y1="60%" x2="100%" y2="60%" stroke="white" strokeWidth="1" strokeDasharray="4 4" opacity="0.08" />
                                        <line x1="0" y1="80%" x2="100%" y2="80%" stroke="white" strokeWidth="1" strokeDasharray="4 4" opacity="0.08" />
                                        <path d="M0,90 Q150,85 300,70 T600,60 T900,40" fill="none" stroke="#a855f7" strokeWidth="2.5" strokeDasharray="6 2" opacity="0.7" className="drop-shadow-[0_0_10px_rgba(168,85,247,0.4)]" />
                                        <path d="M0,100 Q150,80 300,60 T600,30 T900,10" fill="none" stroke="#22d3ee" strokeWidth="3" className="drop-shadow-[0_0_15px_rgba(34,211,238,0.6)]" />
                                        <path d="M0,100 Q150,80 300,60 T600,30 T900,10 V100 H0 Z" fill="url(#chartGradient)" opacity="0.25" />
                                    </svg>
                                </div>
                            </div>

                            {/* Today's Schedule & Activity */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 mt-4 sm:mt-6 md:grid">
                                {/* Today's Appointments */}
                                <div className="rounded-xl bg-white/[0.03] border border-white/10 p-4">
                                    <div className="flex items-center justify-between mb-3">
                                        <h4 className="text-xs font-medium text-white/60 uppercase tracking-wide">Today&apos;s Jobs</h4>
                                        <div className="text-[10px] text-brand-cyan font-mono">8 Booked</div>
                                    </div>
                                    <div className="space-y-2">
                                        {[
                                            { time: '09:00', name: 'Dave Thompson', type: 'Boiler Service', status: 'confirmed' },
                                            { time: '10:30', name: 'Sarah Clarke', type: 'Quote Follow-Up', status: 'confirmed' },
                                            { time: '14:00', name: 'Mark Williams', type: 'New Enquiry', status: 'pending' },
                                            { time: '15:30', name: 'Raj Patel', type: 'Emergency Callout', status: 'confirmed' },
                                        ].map((apt, i) => (
                                            <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.02] border border-white/5">
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

                                {/* Follow-Up Clients */}
                                <div className="rounded-xl bg-white/[0.03] border border-white/10 p-4">
                                    <div className="flex items-center justify-between mb-3">
                                        <h4 className="text-xs font-medium text-white/60 uppercase tracking-wide">Follow-Up: Retrieved Clients</h4>
                                        <div className="text-[10px] text-emerald-400 font-mono">Auto-Found</div>
                                    </div>
                                    <div className="space-y-2">
                                        {[
                                            { name: 'Dave Miller', lastVisit: '3 months ago', action: 'SMS sent', status: 'responded' },
                                            { name: 'Lisa Anderson', lastVisit: '5 months ago', action: 'Email sent', status: 'opened' },
                                            { name: 'Robert Taylor', lastVisit: '4 months ago', action: 'Voice AI called', status: 'booked' },
                                            { name: 'Jennifer White', lastVisit: '6 months ago', action: 'SMS sent', status: 'pending' },
                                        ].map((client, i) => (
                                            <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.02] border border-white/5">
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
            </ContainerScroll>
        </div>
    );
}
