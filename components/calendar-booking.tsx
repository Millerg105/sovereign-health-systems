"use client"

import { motion, AnimatePresence } from "framer-motion"
import {
  Calendar, Clock, Video, FileText, MessageCircle, Linkedin, Phone,
  User, Mail, ArrowRight, ArrowLeft, CheckCircle, Briefcase
} from "lucide-react"
import { useEffect, useState, useMemo, useCallback } from "react"
import { WHATSAPP_URL, LINKEDIN_URL } from "@/lib/constants"
import { ClientInquiryCTA } from "@/components/client-inquiry-cta"

/* ─────────────────────────────────────────────
   Constants
   ───────────────────────────────────────────── */

const CALL_TYPES = [
  {
    id: "quick",
    label: "15-Min Quick Call",
    description: "A fast, focused chat to identify where you're losing revenue.",
    duration: "15 min",
    icon: Phone,
  },
  {
    id: "strategy",
    label: "30-Min Strategy Audit",
    description: "A deep-dive into your current systems with actionable next steps.",
    duration: "30 min",
    icon: FileText,
  },
  {
    id: "discovery",
    label: "Full Discovery Session",
    description: "Comprehensive review of your business operations and automation opportunities.",
    duration: "60 min",
    icon: Video,
  },
]

const TIME_SLOTS = [
  { time: "09:00 AM", period: "morning" },
  { time: "10:00 AM", period: "morning" },
  { time: "11:00 AM", period: "morning" },
  { time: "12:00 PM", period: "afternoon" },
  { time: "01:00 PM", period: "afternoon" },
  { time: "02:00 PM", period: "afternoon" },
  { time: "03:00 PM", period: "afternoon" },
  { time: "04:00 PM", period: "evening" },
  { time: "05:00 PM", period: "evening" },
]

const STEPS = [
  { num: 1, label: "Type", icon: Phone },
  { num: 2, label: "Date", icon: Calendar },
  { num: 3, label: "Time", icon: Clock },
  { num: 4, label: "Details", icon: User },
  { num: 5, label: "Confirm", icon: CheckCircle },
]

const stepVariants = {
  enter: (direction: number) => ({ x: direction > 0 ? 80 : -80, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: direction < 0 ? 80 : -80, opacity: 0 }),
}

function getAvailableDates() {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const result = []
  const now = new Date()
  for (let i = 1; i <= 14; i++) {
    const d = new Date(now)
    d.setDate(now.getDate() + i)
    result.push({
      date: d,
      day: days[d.getDay()],
      dayNum: d.getDate(),
      month: months[d.getMonth()],
      available: d.getDay() !== 0,
    })
  }
  return result
}

/* ─────────────────────────────────────────────
   Component
   ───────────────────────────────────────────── */

export function CalendarBooking() {
  const [currentStep, setCurrentStep] = useState(1)
  const [direction, setDirection] = useState(1)
  const [selectedCallType, setSelectedCallType] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState<number | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [formData, setFormData] = useState({ name: "", business: "", phone: "", email: "", helpText: "" })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [bookingRef, setBookingRef] = useState("")

  const dates = useMemo(() => getAvailableDates(), [])

  // Generate 2-3 random unavailable slots per selected date
  const unavailableSlots = useMemo(() => {
    if (selectedDate === null) return new Set<number>()
    const seed = selectedDate * 7 + 3
    const count = 2 + (seed % 2)
    const disabled = new Set<number>()
    let idx = seed
    while (disabled.size < count) {
      idx = (idx * 31 + 17) % TIME_SLOTS.length
      disabled.add(idx)
    }
    return disabled
  }, [selectedDate])

  const selectedCallTypeData = useMemo(
    () => CALL_TYPES.find((t) => t.id === selectedCallType),
    [selectedCallType]
  )
  const selectedDateData = useMemo(
    () => (selectedDate !== null ? dates[selectedDate] : null),
    [selectedDate, dates]
  )

  const resetBooking = useCallback(() => {
    setCurrentStep(1)
    setDirection(1)
    setSelectedCallType(null)
    setSelectedDate(null)
    setSelectedTime(null)
    setFormData({ name: "", business: "", phone: "", email: "", helpText: "" })
    setIsSubmitted(false)
    setIsSubmitting(false)
    setSubmitError(null)
    setBookingRef("")
  }, [])

  useEffect(() => {
    const openRoadmapPlan = () => resetBooking()
    window.addEventListener("open-roadmap-plan", openRoadmapPlan)
    return () => window.removeEventListener("open-roadmap-plan", openRoadmapPlan)
  }, [resetBooking])

  function goNext() {
    if (currentStep < 5) { setDirection(1); setCurrentStep((s) => s + 1) }
  }
  function goBack() {
    if (currentStep > 1) { setDirection(-1); setCurrentStep((s) => s - 1) }
  }

  // Reset time when date changes
  useEffect(() => { setSelectedTime(null) }, [selectedDate])

  function canProceed(): boolean {
    switch (currentStep) {
      case 1: return selectedCallType !== null
      case 2: return selectedDate !== null
      case 3: return selectedTime !== null
      case 4: return (
        formData.name.trim() !== "" &&
        formData.business.trim() !== "" &&
        formData.phone.trim() !== "" &&
        formData.email.trim() !== ""
      )
      default: return true
    }
  }

  async function handleSubmit() {
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          callType: selectedCallTypeData?.label,
          bookingDateISO: selectedDateData?.date.toISOString(),
          bookingDateDisplay: selectedDateData
            ? `${selectedDateData.day} ${selectedDateData.dayNum} ${selectedDateData.month}`
            : "",
          time: selectedTime,
          ...formData,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong. Please try again.")
      }

      setBookingRef(data.ref)
      setIsSubmitted(true)
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  /* ── Period grouping for time slots ── */
  const periods = useMemo(() => {
    const groups: { label: string; slots: { time: string; idx: number; available: boolean }[] }[] = []
    const periodMap: Record<string, typeof groups[number]> = {}
    TIME_SLOTS.forEach((slot, idx) => {
      const label = slot.period.charAt(0).toUpperCase() + slot.period.slice(1)
      if (!periodMap[label]) {
        periodMap[label] = { label, slots: [] }
        groups.push(periodMap[label])
      }
      periodMap[label].slots.push({ time: slot.time, idx, available: !unavailableSlots.has(idx) })
    })
    return groups
  }, [unavailableSlots])

  return (
    <section className="relative py-20 md:py-24 overflow-hidden bg-transparent" id="booking">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-5xl mx-auto">

          {/* ── Header ── */}
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

          {/* ── Main Card ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-cyan rounded-3xl blur-xl opacity-20" />
            <div className="relative bg-[#0A0A0A] border border-white/10 rounded-3xl overflow-hidden backdrop-blur-xl">

              {/* ── Progress Stepper ── */}
              {!isSubmitted && (
                <div className="px-5 py-4 sm:px-8 sm:py-5 border-b border-white/5">
                  <div className="flex items-center justify-between">
                    {STEPS.map((step, i) => {
                      const StepIcon = step.icon
                      return (
                        <div key={step.num} className="flex items-center flex-1 last:flex-initial">
                          <div className="flex flex-col items-center gap-1.5">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                              currentStep > step.num
                                ? "bg-brand-cyan text-[#031316] shadow-lg shadow-brand-cyan/25"
                                : currentStep === step.num
                                  ? "bg-brand-cyan text-[#031316] shadow-lg shadow-brand-cyan/25"
                                  : "bg-white/5 border border-white/10 text-white/30"
                            }`}>
                              {currentStep > step.num
                                ? <CheckCircle className="w-4 h-4" />
                                : <StepIcon className="w-3.5 h-3.5" />
                              }
                            </div>
                            <span className={`text-[9px] uppercase tracking-widest font-bold transition-colors duration-300 hidden sm:block ${
                              currentStep >= step.num ? "text-brand-cyan" : "text-white/20"
                            }`}>
                              {step.label}
                            </span>
                          </div>
                          {i < STEPS.length - 1 && (
                            <div className={`flex-1 h-[1px] mx-2 sm:mx-3 transition-colors duration-500 ${
                              currentStep > step.num ? "bg-brand-cyan/50" : "bg-white/5"
                            }`} />
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* ── Step Content ── */}
              <div className="p-5 sm:p-6 md:p-10 min-h-[400px] md:min-h-[440px]">
                <AnimatePresence mode="wait" custom={direction}>

                  {/* ══════ STEP 1 — Call Type ══════ */}
                  {currentStep === 1 && !isSubmitted && (
                    <motion.div
                      key="step1"
                      custom={direction}
                      variants={stepVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <h3 className="text-white font-heading font-bold text-lg tracking-tight mb-1">What type of call works best?</h3>
                      <p className="text-white/40 text-sm mb-6">Pick the format that fits your schedule.</p>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {CALL_TYPES.map((type) => {
                          const isSelected = selectedCallType === type.id
                          const TypeIcon = type.icon
                          return (
                            <button
                              key={type.id}
                              onClick={() => setSelectedCallType(type.id)}
                              className={`relative text-left p-4 sm:p-5 rounded-xl border transition-all duration-200 group ${
                                isSelected
                                  ? "bg-brand-cyan/[0.14] border-brand-cyan/70 shadow-[0_0_20px_rgba(34,211,238,0.2)]"
                                  : "bg-white/[0.02] border-white/10 hover:bg-brand-cyan/[0.08] hover:border-white/15"
                              }`}
                            >
                              {isSelected && (
                                <div className="absolute top-3 right-3">
                                  <CheckCircle className="w-4 h-4 text-brand-cyan" />
                                </div>
                              )}
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 transition-all ${
                                isSelected ? "bg-brand-cyan/30" : "bg-white/5 group-hover:bg-brand-cyan/10"
                              }`}>
                                <TypeIcon className="w-5 h-5 text-brand-cyan" />
                              </div>
                              <h4 className="text-white font-heading font-semibold text-sm tracking-tight mb-1">{type.label}</h4>
                              <p className="text-[11px] text-white/50 leading-relaxed">{type.description}</p>
                              <div className="flex items-center gap-1 mt-3 pt-2.5 border-t border-white/5">
                                <Clock className="w-3 h-3 text-white/25" />
                                <span className="text-[10px] text-white/25">{type.duration}</span>
                              </div>
                            </button>
                          )
                        })}
                      </div>
                    </motion.div>
                  )}

                  {/* ══════ STEP 2 — Date ══════ */}
                  {currentStep === 2 && !isSubmitted && (
                    <motion.div
                      key="step2"
                      custom={direction}
                      variants={stepVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <h3 className="text-white font-heading font-bold text-lg tracking-tight flex items-center gap-2 mb-1">
                        <Calendar className="w-4 h-4 text-brand-cyan" />
                        Choose a Date
                      </h3>
                      <p className="text-white/40 text-sm mb-6">Next 14 available days. Closed Sundays.</p>

                      <div className="flex gap-2 overflow-x-auto pb-3 -mx-1 px-1 [&::-webkit-scrollbar]:hidden">
                        {dates.map((d, i) => (
                          <button
                            key={i}
                            onClick={() => d.available && setSelectedDate(i)}
                            disabled={!d.available}
                            className={`flex-shrink-0 w-[62px] h-[78px] rounded-xl flex flex-col items-center justify-center border transition-all duration-200 ${
                              !d.available
                                ? "opacity-25 cursor-not-allowed border-white/5"
                                : selectedDate === i
                                  ? "bg-brand-cyan text-[#031316] border-brand-cyan shadow-lg shadow-brand-cyan/25 scale-[1.02]"
                                  : "bg-white/[0.02] border-white/10 text-white/50 hover:bg-white/[0.05] hover:border-white/15"
                            }`}
                          >
                            <span className="text-[10px] font-medium opacity-60 uppercase">{d.day}</span>
                            <span className="text-xl font-bold leading-tight">{d.dayNum}</span>
                            <span className="text-[9px] opacity-50">{d.month}</span>
                          </button>
                        ))}
                      </div>

                      {selectedDateData && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-4 bg-brand-cyan/10 border border-brand-cyan/20 rounded-xl p-3 flex items-center gap-3"
                        >
                          <Calendar className="w-4 h-4 text-brand-cyan flex-shrink-0" />
                          <p className="text-xs text-white/50">
                            Selected: <span className="text-white font-bold">{selectedDateData.day} {selectedDateData.dayNum} {selectedDateData.month}</span>
                            {selectedCallTypeData && <> &mdash; {selectedCallTypeData.label}</>}
                          </p>
                        </motion.div>
                      )}
                    </motion.div>
                  )}

                  {/* ══════ STEP 3 — Time ══════ */}
                  {currentStep === 3 && !isSubmitted && (
                    <motion.div
                      key="step3"
                      custom={direction}
                      variants={stepVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <h3 className="text-white font-heading font-bold text-lg tracking-tight flex items-center gap-2 mb-1">
                        <Clock className="w-4 h-4 text-brand-cyan" />
                        Pick a Time
                      </h3>
                      <p className="text-white/40 text-sm mb-6">
                        Available slots for {selectedDateData?.day} {selectedDateData?.dayNum} {selectedDateData?.month}
                      </p>

                      <div className="space-y-5">
                        {periods.map((period) => (
                          <div key={period.label}>
                            <p className="text-[10px] uppercase tracking-widest font-bold text-white/25 mb-2">{period.label}</p>
                            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                              {period.slots.map((slot) => (
                                <button
                                  key={slot.time}
                                  onClick={() => slot.available && setSelectedTime(slot.time)}
                                  disabled={!slot.available}
                                  className={`py-2.5 px-3 rounded-lg border text-sm font-medium transition-all duration-200 ${
                                    !slot.available
                                      ? "opacity-20 cursor-not-allowed border-white/5 text-white/30 line-through"
                                      : selectedTime === slot.time
                                        ? "bg-brand-cyan border-brand-cyan text-[#031316] shadow-lg shadow-brand-cyan/20"
                                        : "bg-white/[0.02] border-white/10 text-white/50 hover:bg-white/[0.05] hover:border-white/15"
                                  }`}
                                >
                                  {slot.time}
                                </button>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>

                      {selectedTime && selectedDateData && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-5 bg-brand-cyan/10 border border-brand-cyan/20 rounded-xl p-3 flex items-start gap-3"
                        >
                          <Calendar className="w-4 h-4 text-brand-cyan flex-shrink-0 mt-0.5" />
                          <p className="text-xs text-white/50 leading-relaxed">
                            <span className="text-white font-bold">{selectedDateData.day} {selectedDateData.dayNum} {selectedDateData.month}</span> at{" "}
                            <span className="text-white font-bold">{selectedTime}</span>
                            {selectedCallTypeData && <> &mdash; {selectedCallTypeData.label}</>}
                          </p>
                        </motion.div>
                      )}
                    </motion.div>
                  )}

                  {/* ══════ STEP 4 — Details ══════ */}
                  {currentStep === 4 && !isSubmitted && (
                    <motion.div
                      key="step4"
                      custom={direction}
                      variants={stepVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {/* Booking summary badge */}
                      <div className="bg-brand-cyan/10 border border-brand-cyan/20 rounded-xl p-3 flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                          <Calendar className="w-4 h-4 text-brand-cyan flex-shrink-0" />
                          <p className="text-xs text-white/60">
                            <span className="text-white font-bold">{selectedCallTypeData?.label}</span> &mdash;{" "}
                            {selectedDateData?.day} {selectedDateData?.dayNum} {selectedDateData?.month} at {selectedTime}
                          </p>
                        </div>
                        <button
                          onClick={() => { setDirection(-1); setCurrentStep(1) }}
                          className="text-[10px] text-brand-cyan hover:text-brand-cyan/80 font-medium uppercase tracking-wider"
                        >
                          Edit
                        </button>
                      </div>

                      <h3 className="text-white font-heading font-bold text-lg tracking-tight mb-1">Your Details</h3>
                      <p className="text-white/40 text-sm mb-5">So we know who we&apos;re speaking to.</p>

                      <div className="space-y-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <label className="text-xs text-white/40 font-medium flex items-center gap-1.5 mb-1.5">
                              <User className="w-3 h-3" /> Full Name <span className="text-brand-cyan">*</span>
                            </label>
                            <input
                              required
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              placeholder="Your name"
                              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/30 outline-none focus:border-brand-cyan/40 transition-colors"
                            />
                          </div>
                          <div>
                            <label className="text-xs text-white/40 font-medium flex items-center gap-1.5 mb-1.5">
                              <Briefcase className="w-3 h-3" /> Business Name <span className="text-brand-cyan">*</span>
                            </label>
                            <input
                              required
                              value={formData.business}
                              onChange={(e) => setFormData({ ...formData, business: e.target.value })}
                              placeholder="Your business"
                              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/30 outline-none focus:border-brand-cyan/40 transition-colors"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-xs text-white/40 font-medium flex items-center gap-1.5 mb-1.5">
                            <Phone className="w-3 h-3" /> Phone <span className="text-brand-cyan">*</span>
                          </label>
                          <input
                            required
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="07xxx xxxxxx"
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/30 outline-none focus:border-brand-cyan/40 transition-colors"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-white/40 font-medium flex items-center gap-1.5 mb-1.5">
                            <Mail className="w-3 h-3" /> Email <span className="text-brand-cyan">*</span>
                          </label>
                          <input
                            required
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="you@business.co.uk"
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/30 outline-none focus:border-brand-cyan/40 transition-colors"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-white/40 font-medium flex items-center gap-1.5 mb-1.5">
                            <MessageCircle className="w-3 h-3" /> What do you need help with?
                          </label>
                          <textarea
                            value={formData.helpText}
                            onChange={(e) => setFormData({ ...formData, helpText: e.target.value })}
                            placeholder="Brief overview of your situation (optional)"
                            rows={3}
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/30 outline-none focus:border-brand-cyan/40 transition-colors resize-none"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* ══════ STEP 5 — Confirm ══════ */}
                  {currentStep === 5 && !isSubmitted && (
                    <motion.div
                      key="step5"
                      custom={direction}
                      variants={stepVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {/* Gradient banner */}
                      <div className="bg-gradient-to-r from-brand-cyan to-brand-blue rounded-xl p-4 mb-6 text-center">
                        <p className="text-[#031316] font-heading font-bold text-lg tracking-tight">{selectedCallTypeData?.label}</p>
                        <p className="text-[#031316]/60 text-xs mt-0.5">{selectedCallTypeData?.duration}</p>
                      </div>

                      <h3 className="text-white font-heading font-bold text-lg tracking-tight mb-4">Confirm Your Booking</h3>

                      <div className="space-y-3 mb-6">
                        <div className="flex items-start gap-3 text-sm">
                          <Calendar className="w-4 h-4 text-brand-cyan flex-shrink-0 mt-0.5" />
                          <div>
                            <span className="text-white/40 text-xs block">Date &amp; Time</span>
                            <span className="text-white font-medium">{selectedDateData?.day} {selectedDateData?.dayNum} {selectedDateData?.month} at {selectedTime}</span>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 text-sm">
                          <User className="w-4 h-4 text-brand-cyan flex-shrink-0 mt-0.5" />
                          <div>
                            <span className="text-white/40 text-xs block">Name</span>
                            <span className="text-white font-medium">{formData.name}</span>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 text-sm">
                          <Briefcase className="w-4 h-4 text-brand-cyan flex-shrink-0 mt-0.5" />
                          <div>
                            <span className="text-white/40 text-xs block">Business</span>
                            <span className="text-white font-medium">{formData.business}</span>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 text-sm">
                          <Phone className="w-4 h-4 text-brand-cyan flex-shrink-0 mt-0.5" />
                          <div>
                            <span className="text-white/40 text-xs block">Phone</span>
                            <span className="text-white font-medium">{formData.phone}</span>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 text-sm">
                          <Mail className="w-4 h-4 text-brand-cyan flex-shrink-0 mt-0.5" />
                          <div>
                            <span className="text-white/40 text-xs block">Email</span>
                            <span className="text-white font-medium">{formData.email}</span>
                          </div>
                        </div>
                        {formData.helpText && (
                          <div className="flex items-start gap-3 text-sm">
                            <MessageCircle className="w-4 h-4 text-brand-cyan flex-shrink-0 mt-0.5" />
                            <div>
                              <span className="text-white/40 text-xs block">Notes</span>
                              <span className="text-white/70 text-xs">{formData.helpText}</span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* What happens next */}
                      <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4">
                        <p className="text-[10px] uppercase tracking-widest font-bold text-white/25 mb-3">What happens next</p>
                        <div className="space-y-2">
                          {[
                            "Confirmation email sent within 5 minutes",
                            "Miller will review your details and prepare for the call",
                            "Reminder sent 1 hour before your appointment",
                          ].map((item) => (
                            <div key={item} className="flex items-center gap-2">
                              <CheckCircle className="w-3.5 h-3.5 text-brand-cyan flex-shrink-0" />
                              <span className="text-xs text-white/50">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {submitError && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-4 bg-red-500/10 border border-red-500/30 rounded-xl p-3 text-center"
                        >
                          <p className="text-xs text-red-400">{submitError}</p>
                        </motion.div>
                      )}
                    </motion.div>
                  )}

                  {/* ══════ POST-SUBMIT — Confirmed ══════ */}
                  {isSubmitted && (
                    <motion.div
                      key="confirmed"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="text-center py-6"
                    >
                      <div className="relative w-16 h-16 mx-auto mb-5">
                        <div className="absolute inset-0 rounded-full bg-brand-cyan/20 animate-ping" />
                        <div className="relative w-16 h-16 rounded-full bg-brand-cyan/20 border border-brand-cyan/40 flex items-center justify-center">
                          <CheckCircle className="w-8 h-8 text-brand-cyan" />
                        </div>
                      </div>

                      <h3 className="text-white font-heading font-bold text-xl tracking-tight mb-1">Booking Confirmed</h3>
                      <p className="text-white/40 text-xs font-mono tracking-wider mb-4">Ref: {bookingRef}</p>

                      <div className="bg-white/[0.03] border border-white/5 rounded-xl p-4 max-w-sm mx-auto mb-6">
                        <p className="text-white font-heading font-semibold text-sm tracking-tight">{selectedCallTypeData?.label}</p>
                        <p className="text-white/50 text-xs mt-1">
                          {selectedDateData?.day} {selectedDateData?.dayNum} {selectedDateData?.month} at {selectedTime}
                        </p>
                        <p className="text-white/40 text-xs mt-0.5">{formData.name} &mdash; {formData.business}</p>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto">
                        <button
                          onClick={resetBooking}
                          className="btn-premium-primary flex flex-1 items-center justify-center gap-2 px-5 py-3 text-sm font-semibold"
                        >
                          Book Another
                        </button>
                        <a
                          href={WHATSAPP_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-premium-secondary flex flex-1 items-center justify-center gap-2 px-5 py-3 text-sm font-semibold"
                        >
                          <MessageCircle className="w-4 h-4" /> WhatsApp
                        </a>
                      </div>
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>

              {/* ── Bottom Action Bar ── */}
              {!isSubmitted && (
                <div className="px-5 py-4 sm:px-8 border-t border-white/5">
                  <div className="flex gap-3">
                    {currentStep > 1 && (
                      <button
                        onClick={goBack}
                        className="btn-premium-secondary flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold"
                      >
                        <ArrowLeft className="w-4 h-4" /> Back
                      </button>
                    )}
                    {currentStep < 5 ? (
                      <button
                        onClick={goNext}
                        disabled={!canProceed()}
                        className="btn-premium-primary flex flex-1 items-center justify-center gap-2 px-5 py-3 text-sm font-semibold"
                      >
                        Continue <ArrowRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="btn-premium-primary flex flex-1 items-center justify-center gap-2 px-5 py-3 text-sm font-semibold"
                      >
                        {isSubmitting ? (
                          <>
                            <span className="w-4 h-4 border-2 border-[#031316]/30 border-t-[#031316] rounded-full animate-spin" />
                            Confirming...
                          </>
                        ) : (
                          <>
                            Confirm Booking <CheckCircle className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* ── Trust Signals ── */}
              <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-white/40 px-5 pb-5 sm:px-8 pt-2 border-t border-white/5">
                <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /><span>No credit card needed</span></div>
                <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /><span>No-pressure consultation</span></div>
                <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /><span>Instant Booking</span></div>
              </div>

              <p className="text-xs text-white/20 text-center pb-5">Powered by Sovereign Scheduling</p>
            </div>
          </motion.div>

          {/* ── Client Inquiry CTA ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            <ClientInquiryCTA />
          </motion.div>

          {/* ── Contact Row ── */}
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
          </motion.div>

          {/* ── Bottom Social Proof ── */}
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
