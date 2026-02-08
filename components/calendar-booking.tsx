"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Calendar, Clock, Video, FileText, MessageCircle, Linkedin, Phone, ChevronRight } from "lucide-react"
import { useEffect, useState } from "react"
import { BOOKING_URL, CONTACT_PHONE, WHATSAPP_URL, LINKEDIN_URL } from "@/lib/constants"

type Tab = "call" | "meeting" | "plan"

interface ActionPlanForm {
  name: string
  clinic: string
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
  const [form, setForm] = useState<ActionPlanForm>({ name: "", clinic: "", email: "", pain1: "", pain2: "", pain3: "", pain4: "", pain5: "" })

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
    { id: "plan" as Tab, icon: FileText, label: "Action Plan", sub: "14-day roadmap · £4.99" },
  ]

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setPlanStep("pay")
  }

  const handlePayment = () => {
    // TODO: integrate Stripe £4.99 charge
    // For now simulate success
    setPlanStep("done")
  }

  return (
    <section className="relative py-24 overflow-hidden bg-transparent" id="booking">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 md:mb-14"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 mb-6">
              <Calendar className="w-4 h-4 text-brand-cyan" />
              <span className="text-sm font-medium text-brand-cyan uppercase tracking-wider">Get In Touch</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-7xl font-heading font-bold text-white mb-5 md:mb-6 leading-tight">
              Book Your Free <br />
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
                    className={`flex flex-col items-center justify-center text-center p-4 sm:p-5 rounded-2xl border transition-all group min-h-[98px] sm:min-h-[130px] ${
                      activeTab === tab.id
                        ? "bg-brand-cyan/10 border-brand-cyan/50 shadow-[0_0_20px_rgba(34,211,238,0.15)]"
                        : "bg-white/[0.02] border-white/5 hover:border-brand-cyan/20"
                    }`}
                  >
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center mb-2.5 sm:mb-3 transition-all ${
                      activeTab === tab.id ? "bg-brand-cyan/20" : "bg-brand-cyan/10 group-hover:bg-brand-cyan/15"
                    }`}>
                      <tab.icon className="w-4 h-4 sm:w-5 sm:h-5 text-brand-cyan" />
                    </div>
                    <h3 className={`font-semibold leading-tight text-sm mb-1 ${activeTab === tab.id ? "text-brand-cyan" : "text-white"}`}>
                      {tab.label}
                    </h3>
                      <p className="text-[11px] sm:text-xs text-white/40">{tab.sub}</p>
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <AnimatePresence mode="wait">

                {/* 15-20 Min Call */}
                {activeTab === "call" && (
                  <motion.div key="call" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
                    <p className="text-white/70 text-center text-base mb-6">
                      A quick 15–20 minute call to understand your clinic&apos;s biggest bottlenecks. No pitch — just clarity.
                    </p>
                    <a
                      href={`sms:${CONTACT_PHONE}?body=Hi Miller, I'd like to book a 15-20 minute strategy call.`}
                      className="flex items-center justify-center gap-3 w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 via-brand-cyan to-blue-400 text-black font-bold text-base hover:brightness-110 transition-all"
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
                      className="flex items-center justify-center gap-3 w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 via-brand-cyan to-blue-400 text-black font-bold text-base hover:brightness-110 transition-all"
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
                            For just <span className="text-brand-cyan font-bold">£4.99</span> you&apos;ll receive a personalised <span className="text-white font-semibold">14-day Sovereign implementation roadmap</span> — a PDF showing exactly how we&apos;d build your automation infrastructure, step by step.
                          </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Your name" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/30 outline-none focus:border-brand-cyan/40" />
                          <input required value={form.clinic} onChange={e => setForm({...form, clinic: e.target.value})} placeholder="Clinic name" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/30 outline-none focus:border-brand-cyan/40" />
                        </div>
                        <input required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="Email (we'll send your roadmap here)" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/30 outline-none focus:border-brand-cyan/40" />
                        <p className="text-xs text-white/40 font-mono uppercase tracking-widest pt-1">Your top 5 pain points / problems</p>
                        <input required value={form.pain1} onChange={e => setForm({...form, pain1: e.target.value})} placeholder="e.g. Missed calls costing us bookings" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/30 outline-none focus:border-brand-cyan/40" />
                        <input required value={form.pain2} onChange={e => setForm({...form, pain2: e.target.value})} placeholder="e.g. Admin taking 2+ hours per day" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/30 outline-none focus:border-brand-cyan/40" />
                        <input required value={form.pain3} onChange={e => setForm({...form, pain3: e.target.value})} placeholder="e.g. No system for following up old patients" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/30 outline-none focus:border-brand-cyan/40" />
                        <input required value={form.pain4} onChange={e => setForm({...form, pain4: e.target.value})} placeholder="e.g. Unclear patient journey after first enquiry" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/30 outline-none focus:border-brand-cyan/40" />
                        <input required value={form.pain5} onChange={e => setForm({...form, pain5: e.target.value})} placeholder="e.g. Team has no live performance dashboard" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/30 outline-none focus:border-brand-cyan/40" />
                        <button type="submit" className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 via-brand-cyan to-blue-400 text-black font-bold text-base hover:brightness-110 transition-all flex items-center justify-center gap-2">
                          <ChevronRight className="w-5 h-5" />
                          Continue to Payment — £4.99
                        </button>
                      </form>
                    )}
                    {planStep === "pay" && (
                      <div className="space-y-6 text-center">
                        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                          <p className="text-white/60 text-sm mb-2">You&apos;re getting</p>
                          <p className="text-white font-bold text-lg mb-1">14-Day Sovereign Implementation Roadmap</p>
                          <p className="text-white/50 text-sm">Personalised PDF for <span className="text-white font-medium">{form.clinic}</span></p>
                          <p className="text-brand-cyan font-bold text-3xl mt-4">£4.99</p>
                        </div>
                        <button
                          onClick={handlePayment}
                          className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 via-brand-cyan to-blue-400 text-black font-bold text-base hover:brightness-110 transition-all"
                        >
                          Pay £4.99 & Get My Roadmap
                        </button>
                        <button onClick={() => setPlanStep("form")} className="text-sm text-white/30 hover:text-white/60 transition-colors">← Back</button>
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
                <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /><span>No Credit Card for Free Audit</span></div>
                <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /><span>100% Free Consultation</span></div>
                <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /><span>Instant Booking</span></div>
              </div>

              <p className="text-xs text-white/20 text-center mt-4">Powered by Sovereign Scheduling</p>
            </div>
          </motion.div>

          {/* Contact Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 py-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-green-500/40 hover:bg-green-500/5 text-white/70 hover:text-white transition-all font-medium"
            >
              <MessageCircle className="w-5 h-5 text-green-400" />
              Message on WhatsApp
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 py-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-blue-500/40 hover:bg-blue-500/5 text-white/70 hover:text-white transition-all font-medium"
            >
              <Linkedin className="w-5 h-5 text-blue-400" />
              Message on LinkedIn
            </a>
          </motion.div>

          {/* Bottom Social Proof */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 text-center"
          >
            <p className="text-sm text-white/40 mb-2">Trusted by Sovereign-powered clinics across Greater Manchester</p>
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
