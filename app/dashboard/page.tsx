"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarDays,
  Clock,
  CheckCircle2,
  CalendarRange,
  ChevronDown,
  Loader2,
  Phone,
  PhoneMissed,
  Mail,
  FileText,
  RefreshCw,
  AlertCircle,
  Inbox,
  MessageSquare,
  Users,
  Zap,
  Globe,
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { cn } from "@/lib/utils";

/* ───────────────────────── Types ───────────────────────── */

interface Booking {
  id: string;
  ref: string;
  call_type: string;
  booking_date: string;
  booking_date_display: string;
  booking_time: string;
  name: string;
  business: string;
  phone: string;
  email: string;
  help_text: string | null;
  ip_address: string;
  created_at: string;
  status?: string;
}

type Filter = "all" | "pending" | "confirmed" | "this-week";

/* ──────────────────────── Helpers ──────────────────────── */

function getWeekBounds() {
  const now = new Date();
  const start = new Date(now);
  start.setDate(now.getDate() - ((now.getDay() + 6) % 7)); // Monday
  start.setHours(0, 0, 0, 0);
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  end.setHours(23, 59, 59, 999);
  return { start, end };
}

function resolveStatus(b: Booking) {
  return b.status ?? "Pending";
}

/* ───────────────────── Summary Cards ──────────────────── */

const CARD_CONFIG = [
  { key: "total", label: "Total Bookings", icon: CalendarDays },
  { key: "pending", label: "Pending", icon: Clock },
  { key: "confirmed", label: "Confirmed", icon: CheckCircle2 },
  { key: "thisWeek", label: "This Week", icon: CalendarRange },
] as const;

/* ───────────────────── Filter Config ──────────────────── */

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "pending", label: "Pending" },
  { key: "confirmed", label: "Confirmed" },
  { key: "this-week", label: "This Week" },
];

/* ──────────────────── Mock: Missed Calls ─────────────────── */

const MOCK_MISSED_CALLS = [
  { id: "mc1", callerNumber: "07421 883 201", callerName: "James Whitfield", time: "Today, 2:14 PM", duration: "0:08", smsStatus: "Sent" as const, smsMessage: "Hi, sorry we missed your call! Reply here or we'll call you back within 15 mins." },
  { id: "mc2", callerNumber: "07508 112 449", callerName: null, time: "Today, 11:32 AM", duration: "0:04", smsStatus: "Sent" as const, smsMessage: "Hi, sorry we missed your call! Reply here or we'll call you back within 15 mins." },
  { id: "mc3", callerNumber: "07734 560 821", callerName: "Sarah Cottam", time: "Today, 9:07 AM", duration: "0:12", smsStatus: "Sent" as const, smsMessage: "Hi, sorry we missed your call! Reply here or we'll call you back within 15 mins." },
  { id: "mc4", callerNumber: "01942 254 903", callerName: null, time: "Yesterday, 5:48 PM", duration: "0:06", smsStatus: "Pending" as const, smsMessage: "Hi, sorry we missed your call! Reply here or we'll call you back within 15 mins." },
  { id: "mc5", callerNumber: "07901 334 776", callerName: "Dave Orrell", time: "Yesterday, 3:22 PM", duration: "0:15", smsStatus: "Sent" as const, smsMessage: "Hi, sorry we missed your call! Reply here or we'll call you back within 15 mins." },
  { id: "mc6", callerNumber: "07812 990 415", callerName: "Karen McBride", time: "Mon, 4:55 PM", duration: "0:03", smsStatus: "Sent" as const, smsMessage: "Hi, sorry we missed your call! Reply here or we'll call you back within 15 mins." },
];

/* ──────────────────── Mock: Leads ─────────────────── */

const MOCK_LEADS = [
  { id: "ld1", name: "James Whitfield", business: "Whitfield Roofing", source: "Missed Call" as const, responseTime: "< 1 min", followUp: "Booked" as const, date: "Today" },
  { id: "ld2", name: "Emma Richardson", business: "Richardson Interiors", source: "Website Form" as const, responseTime: "2 min", followUp: "Contacted" as const, date: "Today" },
  { id: "ld3", name: "Paul Aspey", business: "Rock Artist Management", source: "Referral" as const, responseTime: "< 1 min", followUp: "Qualified" as const, date: "Yesterday" },
  { id: "ld4", name: "Sarah Cottam", business: "Cottam Cleaning Co", source: "Google Ads" as const, responseTime: "3 min", followUp: "Booked" as const, date: "Yesterday" },
  { id: "ld5", name: "Mark Gibson", business: "Gibson Plumbing", source: "Facebook" as const, responseTime: "8 min", followUp: "Awaiting" as const, date: "Mon 31 Mar" },
  { id: "ld6", name: "Dave Orrell", business: "Orrell Heating & Plumbing", source: "WhatsApp" as const, responseTime: "< 1 min", followUp: "Qualified" as const, date: "Mon 31 Mar" },
];

const SMS_STATUS_STYLES = {
  Sent: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20",
  Pending: "bg-amber-500/15 text-amber-400 border border-amber-500/20",
  Failed: "bg-red-500/15 text-red-400 border border-red-500/20",
};

const FOLLOW_UP_STYLES = {
  Booked: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20",
  Contacted: "bg-blue-500/15 text-blue-400 border border-blue-500/20",
  Awaiting: "bg-amber-500/15 text-amber-400 border border-amber-500/20",
  Qualified: "bg-brand-cyan/15 text-brand-cyan border border-brand-cyan/20",
};

const SOURCE_ICONS: Record<string, typeof Globe> = {
  "Website Form": Globe,
  "Missed Call": PhoneMissed,
  "Google Ads": Zap,
  Facebook: Globe,
  Referral: Users,
  WhatsApp: MessageSquare,
};

/* ═══════════════════════ Component ══════════════════════ */

export default function DashboardPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<Filter>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  /* ── Fetch ── */

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/dashboard");
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message || `Error ${res.status}`);
      }
      const data: Booking[] = await res.json();
      setBookings(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load bookings.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  /* ── Derived ── */

  const counts = useMemo(() => {
    const { start, end } = getWeekBounds();
    return {
      total: bookings.length,
      pending: bookings.filter((b) => resolveStatus(b) === "Pending").length,
      confirmed: bookings.filter((b) => resolveStatus(b) === "Confirmed").length,
      thisWeek: bookings.filter((b) => {
        const d = new Date(b.booking_date);
        return d >= start && d <= end;
      }).length,
    };
  }, [bookings]);

  const filteredBookings = useMemo(() => {
    if (activeFilter === "all") return bookings;
    if (activeFilter === "pending")
      return bookings.filter((b) => resolveStatus(b) === "Pending");
    if (activeFilter === "confirmed")
      return bookings.filter((b) => resolveStatus(b) === "Confirmed");
    const { start, end } = getWeekBounds();
    return bookings.filter((b) => {
      const d = new Date(b.booking_date);
      return d >= start && d <= end;
    });
  }, [bookings, activeFilter]);

  /* ── Toggle row ── */

  const toggle = (id: string) =>
    setExpandedId((prev) => (prev === id ? null : id));

  /* ═══════════════════════ Render ═══════════════════════ */

  return (
    <main className="min-h-screen text-white selection:bg-brand-cyan/30">
      <Navbar />

      <section className="relative pt-32 pb-24 overflow-hidden">
        {/* Background texture */}
        <div className="absolute inset-0 motherboard-texture opacity-10 pointer-events-none" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-brand-cyan/8 blur-[150px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          {/* ── Header ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 mb-6">
              <span className="text-xs font-mono uppercase tracking-widest text-brand-cyan">
                Internal Dashboard
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold tracking-tight mb-4">
              Booking{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-blue">
                Dashboard
              </span>
            </h1>
            <p className="text-lg text-white/50 max-w-xl">
              Manage and track all incoming booking requests.
            </p>
          </motion.div>

          {/* ── Summary Cards ── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {CARD_CONFIG.map((card, i) => {
              const Icon = card.icon;
              const value = counts[card.key];
              return (
                <motion.div
                  key={card.key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="glass-panel rounded-xl p-5 md:p-6 hover:border-brand-cyan/30 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-white/40">
                      {card.label}
                    </span>
                    <Icon className="w-5 h-5 text-brand-cyan/60" />
                  </div>
                  <p className="text-3xl md:text-4xl font-heading font-bold text-white">
                    {loading ? "—" : value}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* ── Filter Bar ── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center gap-2 mb-8"
          >
            {FILTERS.map((f) => (
              <button
                key={f.key}
                onClick={() => setActiveFilter(f.key)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200",
                  activeFilter === f.key
                    ? "bg-brand-cyan/15 border-brand-cyan/40 text-brand-cyan"
                    : "bg-white/5 border-white/10 text-white/50 hover:text-white hover:border-white/20",
                )}
              >
                {f.label}
              </button>
            ))}

            <button
              onClick={fetchBookings}
              disabled={loading}
              className="ml-auto p-2.5 rounded-full bg-white/5 border border-white/10 text-white/40 hover:text-brand-cyan hover:border-brand-cyan/30 transition-all duration-200 disabled:opacity-40"
              aria-label="Refresh bookings"
            >
              <RefreshCw
                className={cn("w-4 h-4", loading && "animate-spin")}
              />
            </button>
          </motion.div>

          {/* ── Content Area ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {/* Error */}
            {error && (
              <div className="glass-panel rounded-2xl p-8 text-center mb-8 border-red-500/20">
                <AlertCircle className="w-10 h-10 text-red-400/80 mx-auto mb-4" />
                <p className="text-white/70 mb-4">{error}</p>
                <button
                  onClick={fetchBookings}
                  className="px-5 py-2.5 rounded-full text-sm font-medium bg-white/5 border border-white/10 text-white/60 hover:text-white hover:border-white/20 transition-all"
                >
                  Try Again
                </button>
              </div>
            )}

            {/* Loading */}
            {loading && !error && (
              <div className="glass-panel rounded-2xl flex flex-col items-center justify-center py-24">
                <Loader2 className="w-8 h-8 text-brand-cyan animate-spin mb-4" />
                <p className="text-white/40 text-sm">Loading bookings...</p>
              </div>
            )}

            {/* Table — Desktop */}
            {!loading && !error && (
              <>
                {/* Desktop table */}
                <div className="hidden lg:block glass-panel rounded-2xl overflow-hidden">
                  {/* Header */}
                  <div className="grid grid-cols-[100px_1fr_1fr_1fr_130px_90px_100px_40px] gap-4 px-6 py-4 border-b border-white/10">
                    {["Ref", "Name", "Business", "Call Type", "Date", "Time", "Status", ""].map(
                      (h) => (
                        <span
                          key={h}
                          className="text-[11px] font-mono uppercase tracking-widest text-white/30"
                        >
                          {h}
                        </span>
                      ),
                    )}
                  </div>

                  {/* Rows */}
                  {filteredBookings.length === 0 ? (
                    <div className="text-center py-20">
                      <Inbox className="w-12 h-12 text-white/10 mx-auto mb-4" />
                      <p className="text-white/30 text-sm">No bookings found.</p>
                    </div>
                  ) : (
                    filteredBookings.map((booking) => {
                      const status = resolveStatus(booking);
                      const isOpen = expandedId === booking.id;
                      return (
                        <div key={booking.id} className="group">
                          <button
                            onClick={() => toggle(booking.id)}
                            className="w-full grid grid-cols-[100px_1fr_1fr_1fr_130px_90px_100px_40px] gap-4 px-6 py-4 border-b border-white/5 hover:bg-white/[0.03] transition-colors text-left items-center cursor-pointer"
                          >
                            <span className="text-sm font-mono text-brand-cyan/80">
                              {booking.ref}
                            </span>
                            <span className="text-sm text-white/80 truncate">
                              {booking.name}
                            </span>
                            <span className="text-sm text-white/60 truncate">
                              {booking.business}
                            </span>
                            <span className="text-sm text-white/60 truncate">
                              {booking.call_type}
                            </span>
                            <span className="text-sm text-white/50">
                              {booking.booking_date_display}
                            </span>
                            <span className="text-sm text-white/50">
                              {booking.booking_time}
                            </span>
                            <span>
                              <span
                                className={cn(
                                  "inline-block px-2.5 py-1 rounded-full text-xs font-medium",
                                  status === "Confirmed"
                                    ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20"
                                    : "bg-amber-500/15 text-amber-400 border border-amber-500/20",
                                )}
                              >
                                {status}
                              </span>
                            </span>
                            <motion.div
                              animate={{ rotate: isOpen ? 180 : 0 }}
                              transition={{ duration: 0.3 }}
                              className="text-white/30 group-hover:text-white/50 transition-colors justify-self-center"
                            >
                              <ChevronDown className="w-4 h-4" />
                            </motion.div>
                          </button>

                          <AnimatePresence initial={false}>
                            {isOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{
                                  duration: 0.3,
                                  ease: "easeInOut",
                                }}
                                className="overflow-hidden"
                              >
                                <div className="px-6 pb-6 pt-3 border-b border-white/5 bg-white/[0.01]">
                                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                    <div>
                                      <span className="text-[11px] font-mono uppercase tracking-widest text-white/30 block mb-1.5">
                                        <Phone className="w-3 h-3 inline mr-1.5 -mt-0.5" />
                                        Phone
                                      </span>
                                      <a
                                        href={`tel:${booking.phone}`}
                                        className="text-sm text-white/80 hover:text-brand-cyan transition-colors"
                                      >
                                        {booking.phone}
                                      </a>
                                    </div>
                                    <div>
                                      <span className="text-[11px] font-mono uppercase tracking-widest text-white/30 block mb-1.5">
                                        <Mail className="w-3 h-3 inline mr-1.5 -mt-0.5" />
                                        Email
                                      </span>
                                      <a
                                        href={`mailto:${booking.email}`}
                                        className="text-sm text-white/80 hover:text-brand-cyan transition-colors break-all"
                                      >
                                        {booking.email}
                                      </a>
                                    </div>
                                    <div>
                                      <span className="text-[11px] font-mono uppercase tracking-widest text-white/30 block mb-1.5">
                                        <FileText className="w-3 h-3 inline mr-1.5 -mt-0.5" />
                                        Notes
                                      </span>
                                      <p className="text-sm text-white/60 leading-relaxed">
                                        {booking.help_text || (
                                          <span className="italic text-white/20">
                                            No notes provided
                                          </span>
                                        )}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Mobile cards */}
                <div className="lg:hidden space-y-3">
                  {filteredBookings.length === 0 ? (
                    <div className="glass-panel rounded-2xl text-center py-16">
                      <Inbox className="w-12 h-12 text-white/10 mx-auto mb-4" />
                      <p className="text-white/30 text-sm">No bookings found.</p>
                    </div>
                  ) : (
                    filteredBookings.map((booking) => {
                      const status = resolveStatus(booking);
                      const isOpen = expandedId === booking.id;
                      return (
                        <div
                          key={booking.id}
                          className="glass-panel rounded-xl overflow-hidden hover:border-brand-cyan/20 transition-all duration-300"
                        >
                          <button
                            onClick={() => toggle(booking.id)}
                            className="w-full p-4 text-left cursor-pointer"
                          >
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex-1 min-w-0">
                                <span className="text-xs font-mono text-brand-cyan/70 block mb-1">
                                  {booking.ref}
                                </span>
                                <span className="text-base font-medium text-white/90 block truncate">
                                  {booking.name}
                                </span>
                                <span className="text-sm text-white/40 block truncate">
                                  {booking.business}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 ml-3 shrink-0">
                                <span
                                  className={cn(
                                    "px-2.5 py-1 rounded-full text-xs font-medium",
                                    status === "Confirmed"
                                      ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20"
                                      : "bg-amber-500/15 text-amber-400 border border-amber-500/20",
                                  )}
                                >
                                  {status}
                                </span>
                                <motion.div
                                  animate={{ rotate: isOpen ? 180 : 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="text-white/30"
                                >
                                  <ChevronDown className="w-4 h-4" />
                                </motion.div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 text-xs text-white/30">
                              <span>{booking.call_type}</span>
                              <span>·</span>
                              <span>{booking.booking_date_display}</span>
                              <span>·</span>
                              <span>{booking.booking_time}</span>
                            </div>
                          </button>

                          <AnimatePresence initial={false}>
                            {isOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{
                                  duration: 0.3,
                                  ease: "easeInOut",
                                }}
                                className="overflow-hidden"
                              >
                                <div className="px-4 pb-4 pt-2 border-t border-white/5 space-y-3">
                                  <div>
                                    <span className="text-[11px] font-mono uppercase tracking-widest text-white/30 block mb-1">
                                      <Phone className="w-3 h-3 inline mr-1 -mt-0.5" />
                                      Phone
                                    </span>
                                    <a
                                      href={`tel:${booking.phone}`}
                                      className="text-sm text-white/80 hover:text-brand-cyan transition-colors"
                                    >
                                      {booking.phone}
                                    </a>
                                  </div>
                                  <div>
                                    <span className="text-[11px] font-mono uppercase tracking-widest text-white/30 block mb-1">
                                      <Mail className="w-3 h-3 inline mr-1 -mt-0.5" />
                                      Email
                                    </span>
                                    <a
                                      href={`mailto:${booking.email}`}
                                      className="text-sm text-white/80 hover:text-brand-cyan transition-colors break-all"
                                    >
                                      {booking.email}
                                    </a>
                                  </div>
                                  <div>
                                    <span className="text-[11px] font-mono uppercase tracking-widest text-white/30 block mb-1">
                                      <FileText className="w-3 h-3 inline mr-1 -mt-0.5" />
                                      Notes
                                    </span>
                                    <p className="text-sm text-white/60 leading-relaxed">
                                      {booking.help_text || (
                                        <span className="italic text-white/20">
                                          No notes provided
                                        </span>
                                      )}
                                    </p>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })
                  )}
                </div>
              </>
            )}
          </motion.div>

          {/* ════════════════ Missed Calls Section ════════════════ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-16"
          >
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 mb-5">
                <PhoneMissed className="w-3.5 h-3.5 text-red-400" />
                <span className="text-xs font-mono uppercase tracking-widest text-red-400">
                  Missed Calls
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-heading font-bold tracking-tight text-white mb-2">
                Missed Call{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-amber-400">
                  Recovery
                </span>
              </h2>
              <p className="text-sm text-white/40">
                Auto-SMS text-back — never lose a lead to a missed call.
              </p>
            </div>

            {/* Mini stat cards */}
            <div className="grid grid-cols-3 gap-3 mb-8">
              {[
                { label: "Total Missed", value: "6", icon: PhoneMissed },
                { label: "SMS Sent", value: "5", icon: MessageSquare },
                { label: "Recovery Rate", value: "83%", icon: Zap },
              ].map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="glass-panel rounded-xl p-4 md:p-5"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-white/35">
                      {s.label}
                    </span>
                    <s.icon className="w-4 h-4 text-red-400/50" />
                  </div>
                  <p className="text-2xl md:text-3xl font-heading font-bold text-white">
                    {s.value}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Desktop table */}
            <div className="hidden lg:block glass-panel rounded-2xl overflow-hidden">
              <div className="grid grid-cols-[1fr_1fr_160px_80px_100px] gap-4 px-6 py-4 border-b border-white/10">
                {["Caller", "Number", "Time", "Duration", "Auto-SMS"].map(
                  (h) => (
                    <span
                      key={h}
                      className="text-[11px] font-mono uppercase tracking-widest text-white/30"
                    >
                      {h}
                    </span>
                  ),
                )}
              </div>
              {MOCK_MISSED_CALLS.map((call) => (
                <div
                  key={call.id}
                  className="grid grid-cols-[1fr_1fr_160px_80px_100px] gap-4 px-6 py-4 border-b border-white/5 hover:bg-white/[0.03] transition-colors items-center"
                >
                  <span className="text-sm text-white/80">
                    {call.callerName || (
                      <span className="italic text-white/30">Unknown</span>
                    )}
                  </span>
                  <span className="text-sm font-mono text-white/60">
                    {call.callerNumber}
                  </span>
                  <span className="text-sm text-white/50">{call.time}</span>
                  <span className="text-sm text-white/40">{call.duration}</span>
                  <span
                    className={cn(
                      "inline-block px-2.5 py-1 rounded-full text-xs font-medium w-fit",
                      SMS_STATUS_STYLES[call.smsStatus],
                    )}
                  >
                    {call.smsStatus}
                  </span>
                </div>
              ))}
            </div>

            {/* Mobile cards */}
            <div className="lg:hidden space-y-3">
              {MOCK_MISSED_CALLS.map((call) => (
                <div
                  key={call.id}
                  className="glass-panel rounded-xl p-4"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="min-w-0">
                      <span className="text-base font-medium text-white/90 block">
                        {call.callerName || (
                          <span className="italic text-white/40">Unknown Caller</span>
                        )}
                      </span>
                      <span className="text-sm font-mono text-white/50 block">
                        {call.callerNumber}
                      </span>
                    </div>
                    <span
                      className={cn(
                        "px-2.5 py-1 rounded-full text-xs font-medium shrink-0 ml-3",
                        SMS_STATUS_STYLES[call.smsStatus],
                      )}
                    >
                      {call.smsStatus}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-white/30">
                    <span>{call.time}</span>
                    <span>·</span>
                    <span>{call.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ════════════════ Leads Overview Section ════════════════ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-16"
          >
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 mb-5">
                <Users className="w-3.5 h-3.5 text-brand-cyan" />
                <span className="text-xs font-mono uppercase tracking-widest text-brand-cyan">
                  Leads Overview
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-heading font-bold tracking-tight text-white mb-2">
                Lead{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-blue">
                  Pipeline
                </span>
              </h2>
              <p className="text-sm text-white/40">
                Enquiry tracking & response times across all channels.
              </p>
            </div>

            {/* Mini stat cards */}
            <div className="grid grid-cols-3 gap-3 mb-8">
              {[
                { label: "Total Leads", value: "6", icon: Users },
                { label: "Avg Response", value: "< 2 min", icon: Zap },
                { label: "Qualified", value: "4", icon: CheckCircle2 },
              ].map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="glass-panel rounded-xl p-4 md:p-5"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-white/35">
                      {s.label}
                    </span>
                    <s.icon className="w-4 h-4 text-brand-cyan/50" />
                  </div>
                  <p className="text-2xl md:text-3xl font-heading font-bold text-white">
                    {s.value}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Desktop table */}
            <div className="hidden lg:block glass-panel rounded-2xl overflow-hidden">
              <div className="grid grid-cols-[1fr_1fr_140px_120px_100px_100px] gap-4 px-6 py-4 border-b border-white/10">
                {["Name", "Business", "Source", "Response", "Status", "Date"].map(
                  (h) => (
                    <span
                      key={h}
                      className="text-[11px] font-mono uppercase tracking-widest text-white/30"
                    >
                      {h}
                    </span>
                  ),
                )}
              </div>
              {MOCK_LEADS.map((lead) => {
                const SourceIcon = SOURCE_ICONS[lead.source] || Globe;
                return (
                  <div
                    key={lead.id}
                    className="grid grid-cols-[1fr_1fr_140px_120px_100px_100px] gap-4 px-6 py-4 border-b border-white/5 hover:bg-white/[0.03] transition-colors items-center"
                  >
                    <span className="text-sm text-white/80">{lead.name}</span>
                    <span className="text-sm text-white/60 truncate">
                      {lead.business}
                    </span>
                    <span className="text-sm text-white/50 flex items-center gap-2">
                      <SourceIcon className="w-3.5 h-3.5 text-white/30" />
                      {lead.source}
                    </span>
                    <span className="text-sm font-mono text-brand-cyan/70">
                      {lead.responseTime}
                    </span>
                    <span
                      className={cn(
                        "inline-block px-2.5 py-1 rounded-full text-xs font-medium w-fit",
                        FOLLOW_UP_STYLES[lead.followUp],
                      )}
                    >
                      {lead.followUp}
                    </span>
                    <span className="text-sm text-white/40">{lead.date}</span>
                  </div>
                );
              })}
            </div>

            {/* Mobile cards */}
            <div className="lg:hidden space-y-3">
              {MOCK_LEADS.map((lead) => {
                const SourceIcon = SOURCE_ICONS[lead.source] || Globe;
                return (
                  <div
                    key={lead.id}
                    className="glass-panel rounded-xl p-4"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="min-w-0">
                        <span className="text-base font-medium text-white/90 block">
                          {lead.name}
                        </span>
                        <span className="text-sm text-white/40 block truncate">
                          {lead.business}
                        </span>
                      </div>
                      <span
                        className={cn(
                          "px-2.5 py-1 rounded-full text-xs font-medium shrink-0 ml-3",
                          FOLLOW_UP_STYLES[lead.followUp],
                        )}
                      >
                        {lead.followUp}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-white/30">
                      <span className="flex items-center gap-1">
                        <SourceIcon className="w-3 h-3" />
                        {lead.source}
                      </span>
                      <span>·</span>
                      <span className="text-brand-cyan/60">{lead.responseTime}</span>
                      <span>·</span>
                      <span>{lead.date}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
