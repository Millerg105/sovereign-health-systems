"use client"

import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, Clock, Video, FileText, MessageCircle, Linkedin, Phone, ChevronRight, Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
import { BOOKING_URL, CONTACT_PHONE, WHATSAPP_URL, LINKEDIN_URL } from "@/lib/constants"
import { ClientInquiryCTA } from "@/components/client-inquiry-cta"

type Tab = "call" | "meeting" | "plan"

interface ActionPlanForm {
  name: string
  business: string
  email: string
  pain1: string
  pain2: string
  pain3: string
  pain4: string
  pain5: string
}

export function CalendarBooking() {
  const [activeTab, setActiveTab] = useState<Tab>("call")
  const [planStep, setPlanStep] = useState<"form" | "pay" | "done">("form")
  const [form, setForm] = useState<ActionPlanForm>({ name: "", business: "", email: "", pain1: "", pain2: "", pain3: "", pain4: "", pain5: "" })

  useEffect(() => {
    const openRoadmapPlan = () => {
      setActiveTab("plan")
      setPlanStep("form")
    }

    window.addEventListener("open-roadmap-plan", openRoadmapPlan)
    return () => window.removeEventListener("open-roadmap-plan", openRoadmapPlan)
  }, [])

  const tabs = [
    { id: "call" as Tab, icon: Phone, label: "15–20 Min Call", sub: "Quick & focused" },
    { id: "meeting" as Tab, icon: Video, label: "Virtual Meeting", sub: "Calendly · Zoom · Meet" },
    { id: "plan" as Tab, icon: FileText, label: "Action Plan", sub: "14-day roadmap · Custom" },
  ]

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setPlanStep("pay") // Reusing 'pay' step as a 'review/confirm' step or skipping

    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          source: "Action Plan Request",
          problems: `Pain points: ${form.pain1}, ${form.pain2}, ${form.pain3}, ${form.pain4}, ${form.pain5}`
        }),
      });
      setPlanStep("done")
    } catch {
      setPlanStep("done") // Still show done to user
    }
  }

  return (
    <section className="relative py-20 md:py-24 overflow-hidden bg-transparent" id="booking">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-5xl mx-auto">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-14"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 mb-6">
              <Calendar className="w-4 h-4 text-brand-cyan" />
              <span className="text-sm font-medium text-brand-cyan uppercase tracking-wider">Get In Touch</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-7xl font-heading font-bold text-white mb-5 md:mb-6 leading-tight">
              Book Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-blue">
                Strategy Audit
              </span>
            </h2>

            <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
              No commitment. Walk away with a clear action plan to recover lost revenue.
            </p>
          </motion.div>

          {/* Main Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-cyan rounded-3xl blur-xl opacity-20" />
            <div className="relative bg-[#0A0A0A] border border-white/10 rounded-3xl p-5 sm:p-6 md:p-12 backdrop-blur-xl">

              {/* Tab Selector */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8 md:mb-10">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => { setActiveTab(tab.id); setPlanStep("form") }}
                    className={`btn-premium-secondary flex flex-col items-center justify-center text-center p-4 sm:p-5 transition-all group min-h-[98px] sm:min-h-[130px] backdrop-blur-3xl ${activeTab === tab.id
                      ? "bg-brand-cyan/[0.14] border-brand-cyan/70 text-[#8cf7ee] shadow-[0_0_20px_rgba(34,211,238,0.2)]"
                      : "bg-transparent border-brand-cyan/35 hover:bg-brand-cyan/[0.08]"
                      }`}
                  >
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center mb-2.5 sm:mb-3 transition-all ${activeTab === tab.id ? "bg-brand-cyan/30" : "bg-white/5 group-hover:bg-brand-cyan/10"
                      }`}>
                      <tab.icon className="w-4 h-4 sm:w-5 sm:h-5 text-brand-cyan" />
                    </div>
                    <h3 className={`font-semibold leading-tight text-sm mb-1 text-white`}>
                      {tab.label}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-white/80">{tab.sub}</p>
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <AnimatePresence mode="wait">

                {/* 15-20 Min Call */}
                {activeTab === "call" && (
                  <motion.div key="call" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
                    <p className="text-white/70 text-center text-base mb-6">
                          A quick 15-minute chat to figure out where you&apos;re losing jobs. No pressure - just straight answers.
                    </p>
                    <a
                      href={`sms:${CONTACT_PHONE}?body=Hi Miller, I'd like to book a 15-20 minute strategy call.`}
                      className="btn-premium-primary flex w-full max-w-full items-center justify-center gap-2 px-5 py-3 text-center text-sm font-semibold leading-tight sm:text-base [text-wrap:balance]"
                    >
                      <Phone className="w-5 h-5" />
                      Book via SMS
                    </a>
                    <p className="text-xs text-white/30 text-center">Tap to open your messages — Miller will reply within 2 hours</p>
                  </motion.div>
                )}

                {/* Virtual Meeting */}
                {activeTab === "meeting" && (
                  <motion.div key="meeting" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
                    <p className="text-white/70 text-center text-base mb-6">
                      A proper face-to-face via Calendly. Pick a time that suits you — we&apos;ll meet on Google Meet or Zoom.
                    </p>
                    <a
                      href={BOOKING_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-premium-primary flex w-full max-w-full items-center justify-center gap-2 px-5 py-3 text-center text-sm font-semibold leading-tight sm:text-base [text-wrap:balance]"
                    >
                      <Video className="w-5 h-5" />
                      Book on Calendly
                    </a>
                    <p className="text-xs text-white/30 text-center">Opens Calendly — choose your preferred time slot</p>
                  </motion.div>
                )}

                {/* Action Plan */}
                {activeTab === "plan" && (
                  <motion.div key="plan" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                    {planStep === "form" && (
                      <form onSubmit={handleFormSubmit} className="space-y-4">
                        <div className="bg-brand-cyan/5 border border-brand-cyan/20 rounded-xl p-4 mb-2">
                          <p className="text-sm text-white/80 leading-relaxed">
                            Request a personalised <span className="text-white font-semibold">14-day Sovereign implementation roadmap</span> — a PDF showing exactly how we&apos;d build your automation infrastructure, step by step.
                          </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Your name" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/30 outline-none focus:border-brand-cyan/40" />
                          <input required value={form.business} onChange={e => setForm({ ...form, business: e.target.value })} placeholder="Business Name" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/30 outline-none focus:border-brand-cyan/40" />
                        </div>
                        <input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="Email (we'll send your roadmap here)" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/30 outline-none focus:border-brand-cyan/40" />
                        <p className="text-xs text-white/40 font-mono uppercase tracking-widest pt-1">Your top 3 pain points / problems</p>
                        <input required value={form.pain1} onChange={e => setForm({ ...form, pain1: e.target.value })} placeholder="e.g. Missed calls costing us jobs" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/30 outline-none focus:border-brand-cyan/40" />
                        <input required value={form.pain2} onChange={e => setForm({ ...form, pain2: e.target.value })} placeholder="e.g. Admin taking 2+ hours per day" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/30 outline-none focus:border-brand-cyan/40" />
                        <input required value={form.pain3} onChange={e => setForm({ ...form, pain3: e.target.value })} placeholder="e.g. No system for following up old customers" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/30 outline-none focus:border-brand-cyan/40" />
                        <button type="submit" className="btn-premium-primary flex w-full max-w-full items-center justify-center gap-2 px-5 py-3 text-center text-sm font-semibold leading-tight sm:text-base [text-wrap:balance]">
                          <ChevronRight className="w-5 h-5" />
                          Request My Custom Roadmap
                        </button>
                      </form>
                    )}
                    {planStep === "pay" && (
                      <div className="space-y-6 text-center">
                        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                          <Loader2 className="w-8 h-8 text-brand-cyan animate-spin mx-auto mb-4" />
                          <p className="text-white font-bold text-lg mb-1">Generating Your Request...</p>
                        </div>
                      </div>
                    )}
                    {planStep === "done" && (

                      <div className="text-center py-8 space-y-4">
                        <div className="w-16 h-16 rounded-full bg-brand-cyan/20 border border-brand-cyan/40 flex items-center justify-center mx-auto">
                          <FileText className="w-8 h-8 text-brand-cyan" />
                        </div>
                        <h3 className="text-white font-bold text-xl">Roadmap on its way!</h3>
                        <p className="text-white/60 text-sm max-w-sm mx-auto">Your personalised 14-day Sovereign implementation plan will be in your inbox at <span className="text-white">{form.email}</span> within 24 hours.</p>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Trust Signals */}
              <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-white/40 mt-8 pt-6 border-t border-white/5">
                <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /><span>No credit card needed</span></div>
                <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /><span>No-pressure consultation</span></div>
                <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /><span>Instant Booking</span></div>
              </div>

              <p className="text-xs text-white/20 text-center mt-4">Powered by Sovereign Scheduling</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            <ClientInquiryCTA />
          </motion.div>

          {/* Contact Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-[1.1fr_0.9fr]"
          >
            <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(7,14,22,0.88),rgba(4,10,16,0.96))] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-xl sm:p-7">
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(34,211,238,0.08),transparent_38%,transparent_65%,rgba(59,130,246,0.08))]" />
              <div className="relative flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                <div className="max-w-xl">
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-brand-cyan/20 bg-brand-cyan/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.16em] text-brand-cyan">
                    Portfolio Preview
                  </div>
                  <h3 className="text-2xl font-heading font-bold tracking-tight text-white sm:text-3xl">
                    See the standard of platform, brand execution, and performance engineering behind Sovereign Systems.
                  </h3>
                </div>

                <Link
                  href="/portfolio"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-brand-cyan/35 bg-white/[0.03] px-6 py-3 text-sm font-semibold text-cyan-50 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-cyan/60 hover:bg-brand-cyan/10 hover:shadow-[0_0_24px_rgba(34,211,238,0.16)] sm:text-base"
                >
                  View Portfolio
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-premium-secondary flex items-center justify-center gap-3 py-4 font-medium"
            >
              <MessageCircle className="w-5 h-5 text-brand-cyan" />
              Message on WhatsApp
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-premium-secondary flex items-center justify-center gap-3 py-4 font-medium"
            >
              <Linkedin className="w-5 h-5 text-brand-cyan" />
              Message on LinkedIn
            </a>
            </div>
          </motion.div>

          {/* Bottom Social Proof */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 text-center"
          >
            <p className="text-sm text-white/40 mb-2">Trusted by Sovereign-powered businesses across Greater Manchester</p>
            <div className="flex items-center justify-center gap-2 text-xs text-white/30">
              <Clock className="w-3 h-3" />
              <span>Average response time: 2 hours</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
