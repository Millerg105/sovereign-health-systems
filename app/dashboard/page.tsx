"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getSupabaseBrowserClient } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";
import { Globe } from "@/components/ui/cobe-globe";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from "@/components/ui/interfaces-card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

/* ═══════════════════ Demo Data — Agency Flavour ═══════════════════ */

type PipelineStatus = "Live" | "Build" | "Proposal" | "Discovery";

const PIPELINE_ENTRIES: {
  day: string;
  time: string;
  name: string;
  location: string;
  budget: string;
  status: PipelineStatus;
  result: string;
}[] = [
  { day: "Mon", time: "09:30", name: "Routes Platform",    location: "Manchester, UK",  budget: "£5,000",  status: "Proposal",  result: "Sent" },
  { day: "Mon", time: "14:00", name: "ClubDNA",            location: "Manchester, UK",  budget: "£5,000",  status: "Proposal",  result: "Sent" },
  { day: "Tue", time: "10:00", name: "LMK Luxe Tan",       location: "Wigan, UK",       budget: "£750",    status: "Build",     result: "In Progress" },
  { day: "Wed", time: "11:30", name: "Omar (Site 1)",      location: "Bolton, UK",      budget: "£800",    status: "Discovery", result: "Awaiting Brief" },
  { day: "Thu", time: "09:00", name: "Chris Kearns (K2C)", location: "Liverpool, UK",   budget: "£1,500",  status: "Discovery", result: "Portfolio Sent" },
  { day: "Fri", time: "13:00", name: "Tranquil Gardens",   location: "Cheshire, UK",    budget: "£349/mo", status: "Live",      result: "Retainer Active" },
];

const FOLLOW_UPS: {
  name: string;
  action: string;
  priority: "high" | "medium" | "low";
}[] = [
  { name: "Andy Clark (Routes)", action: "Chase proposal response, 5 days since send",  priority: "high" },
  { name: "Omar, Site 1 brief",  action: "Andy Rodan to confirm brief handoff",         priority: "high" },
  { name: "Chris Kearns",        action: "Follow up portfolio send with Loom walkthrough", priority: "medium" },
  { name: "Paul Aspey / RAM",    action: "Finish pitch and pricing deck",               priority: "low" },
];

/* Included with every retainer, the Sovereign Systems stack */
const INCLUDED_WITH_PLAN = [
  { name: "Managed Hosting & Uptime",    desc: "Vercel edge deployment, 99.9% uptime, automatic SSL, continuous backups. Your site never goes dark.",             icon: "🚀" },
  { name: "Monthly Performance Report",  desc: "Traffic, conversions, leads captured, Core Web Vitals. Delivered the first Monday of every month.",                 icon: "📊" },
  { name: "On-Site SEO Upkeep",          desc: "Meta tags, schema, sitemaps, and content refreshes to keep you climbing Google rankings.",                          icon: "🔍" },
  { name: "Security & Maintenance",      desc: "Dependency patches, bot protection, spam filtering, continuous security monitoring.",                               icon: "🛡️" },
  { name: "Content & Copy Edits",        desc: "Up to 2 hours of content or copy changes per month. New pages, pricing updates, service tweaks, sorted.",           icon: "✍️" },
  { name: "Analytics & Tracking",        desc: "GA4, Meta Pixel, conversion events wired and monitored. You see what works, not just what moves.",                 icon: "📈" },
  { name: "Priority Support Channel",    desc: "Direct WhatsApp line to the build team. No ticket queues. Average response under 2 hours, business day.",          icon: "💬" },
];

/* Paid upgrades, bolt-on automations that stack on top of the retainer */
const PAID_UPGRADES = [
  { name: "AI Chat Agent",          desc: "24/7 site chatbot trained on your business. Books calls, answers FAQs, qualifies leads before they hit your inbox.",     icon: "🤖", price: "£79/mo",  checkoutUrl: "https://buy.stripe.com/5kQ4gs6317jD3nk0bQ97G08" },
  { name: "Online Booking System",  desc: "Calendar-synced self-booking flow. Clients pick a slot, pay a deposit if you want, land straight on your calendar.",     icon: "📅", price: "£49/mo",  checkoutUrl: "https://buy.stripe.com/00w7sE4YXdI1e1Y5wa97G09" },
  { name: "WhatsApp Inbox",         desc: "Centralised WhatsApp messaging for all leads. Reply from one dashboard, not your personal phone.",                       icon: "📱", price: "£49/mo",  checkoutUrl: "https://buy.stripe.com/aFa5kwcrp47r3nk2jY97G03" },
  { name: "Missed Call Text-Back",  desc: "Missed a call? An instant SMS fires within 60 seconds. Stops hot leads bleeding to competitors.",                        icon: "📞", price: "£39/mo",  checkoutUrl: "https://buy.stripe.com/aFa9AMbnl8nH5vse2G97G0a" },
  { name: "Review Harvester",       desc: "Automated Google review request sequence fires after every completed job. Builds reputation on autopilot.",              icon: "⭐", price: "£39/mo",  checkoutUrl: "https://buy.stripe.com/dRmdR28b99rL3nkgaO97G0b" },
  { name: "Follow-Up Sequence",     desc: "7-day automated email and SMS chase after every lead. Stays on them so you don't have to.",                               icon: "🔁", price: "£29/mo",  checkoutUrl: "https://buy.stripe.com/6oUfZa2QPdI13nkgaO97G04" },
  { name: "Stripe Auto-Invoicing",  desc: "Invoices generated and sent automatically after a confirmed booking. Get paid without chasing.",                         icon: "💳", price: "£29/mo",  checkoutUrl: "https://buy.stripe.com/eVq4gs2QP1Zj3nk9Mq97G05" },
  { name: "Twilio Quote Line",      desc: "Dedicated local phone number for your business line. Calls route, record, and log automatically.",                       icon: "☎️", price: "£29/mo",  checkoutUrl: "https://buy.stripe.com/fZu3co2QP7jD9LI2jY97G06" },
  { name: "Slack Show-Up Alerts",   desc: "Instant notification the moment a lead books in. Your team knows before the kettle boils.",                              icon: "🔔", price: "£19/mo",  checkoutUrl: "https://buy.stripe.com/4gMfZafDBgUd4ro9Mq97G07" },
  { name: "Extra Location",         desc: "Add another site location to your Sovereign (Command Centre) tier. Routing, analytics, staff splits handled.",           icon: "📍", price: "£97/mo",  checkoutUrl: "https://buy.stripe.com/fZu8wI775gUd1fc5wa97G0c" },
];

const CHART_BARS = [
  { month: "Nov", leads: 12, deals: 2 },
  { month: "Dec", leads: 18, deals: 3 },
  { month: "Jan", leads: 24, deals: 4 },
  { month: "Feb", leads: 31, deals: 5 },
  { month: "Mar", leads: 42, deals: 7 },
  { month: "Apr", leads: 38, deals: 6 },
];

const AI_INSIGHTS: { text: string; type: "action" | "positive" | "warning" }[] = [
  { text: "Routes Platform proposal still open 5 days in. Suggest a short Loom chase.",                             type: "warning"  },
  { text: "MRR up 18% month-on-month. You crossed your April retainer target a week early.",                       type: "positive" },
  { text: "LMK Luxe Tan build is 80% done. Schedule a client review call Friday to hit 5-day turnaround.",         type: "action"   },
  { text: "Conversion on /brief enquiries jumped from 11% to 19% after the pricing page rebuild last month.",      type: "positive" },
];

/* ═══════════════════ Status Styles ═══════════════════ */

const statusStyles: Record<PipelineStatus, string> = {
  Live:      "bg-[rgba(34,211,238,0.1)] text-[#22d3ee] border-[rgba(34,211,238,0.25)]",
  Build:     "bg-[rgba(59,130,246,0.1)] text-[#60a5fa] border-[rgba(59,130,246,0.25)]",
  Proposal:  "bg-[rgba(250,204,21,0.08)] text-[#facc15] border-[rgba(250,204,21,0.2)]",
  Discovery: "bg-white/5 text-white/70 border-white/10",
};

const priorityStyles = {
  high:   { dot: "#DC2626", text: "#F87171" },
  medium: { dot: "#F59E0B", text: "#FBBF24" },
  low:    { dot: "#22d3ee", text: "rgba(255,255,255,0.5)" },
};

/* ═══════════════════ Component ═══════════════════ */

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"overview" | "pipeline" | "automations">("overview");

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        router.replace("/sign-in");
      } else {
        setUser(data.user);
        setLoading(false);
      }
    });
  }, [router]);

  const handleSignOut = async () => {
    const supabase = getSupabaseBrowserClient();
    await supabase.auth.signOut();
    router.replace("/sign-in");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#030303]">
        <div className="text-center">
          <div
            className="w-8 h-8 border-2 rounded-full animate-spin mx-auto mb-4"
            style={{ borderColor: "#22d3ee", borderTopColor: "transparent" }}
          />
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-white/40">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  const userName = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "Operator";
  const userAvatar = user?.user_metadata?.avatar_url;

  return (
    <div className="min-h-screen flex flex-col bg-[#030303] text-white">
      {/* Ambient glow */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at 20% 10%, rgba(34,211,238,0.08), transparent 50%), radial-gradient(ellipse at 80% 90%, rgba(59,130,246,0.06), transparent 50%)",
        }}
      />

      {/* Demo banner */}
      <div
        className="relative z-10 w-full text-center py-2.5 font-mono text-xs uppercase tracking-[0.12em]"
        style={{ background: "rgba(34, 211, 238, 0.08)", color: "#22d3ee", borderBottom: "1px solid rgba(34, 211, 238, 0.15)" }}
      >
        Demo Mode &middot; live data activates when your retainer goes active
      </div>

      {/* Top bar */}
      <header className="relative z-10 w-full flex items-center justify-between px-4 sm:px-6 md:px-10 py-3 sm:py-4 border-b border-white/10">
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <Image
            src="/logo.png"
            alt="Sovereign Systems"
            width={32}
            height={32}
            className="rounded-lg w-7 h-7 sm:w-8 sm:h-8"
          />
          <span
            className="font-heading font-bold text-base sm:text-lg hidden sm:inline"
            style={{
              background: "linear-gradient(90deg, #14c6c4 0%, #22d3ee 52%, #35e6d1 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Sovereign Systems
          </span>
          <span
            className="font-heading font-bold text-sm sm:hidden"
            style={{
              background: "linear-gradient(90deg, #14c6c4 0%, #22d3ee 52%, #35e6d1 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            SS
          </span>
          <span
            className="font-mono uppercase tracking-[0.16em] hidden sm:inline text-white/40"
            style={{ fontSize: "10px" }}
          >
            OS
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ background: "rgba(34, 211, 238, 0.08)", border: "1px solid rgba(34, 211, 238, 0.2)" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#22d3ee] animate-pulse" />
            <span className="font-mono uppercase tracking-[0.12em]" style={{ fontSize: "10px", color: "#22d3ee" }}>Live</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            {userAvatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={userAvatar}
                alt=""
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full ring-2 ring-[rgba(34,211,238,0.25)]"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-semibold text-xs sm:text-sm ring-2 ring-[rgba(34,211,238,0.25)]"
                style={{ background: "rgba(255,255,255,0.06)", color: "#ffffff" }}
              >
                {userName[0]?.toUpperCase()}
              </div>
            )}
            <span className="text-sm hidden sm:inline text-white/80">{userName}</span>
          </div>
          <button
            onClick={handleSignOut}
            className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.12em] px-2 sm:px-3 py-1 sm:py-1.5 rounded-md transition-all cursor-pointer hover:bg-white/5 text-white/50 border border-white/15 hover:border-white/30"
          >
            Sign Out
          </button>
        </div>
      </header>

      {/* Tab bar */}
      <div className="relative z-10 px-4 sm:px-6 md:px-10 pt-4 sm:pt-6 flex gap-1">
        {(["overview", "pipeline", "automations"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg font-mono text-[10px] sm:text-xs uppercase tracking-[0.1em] sm:tracking-[0.12em] transition-all cursor-pointer"
            style={{
              background: activeTab === tab ? "rgba(34, 211, 238, 0.1)" : "transparent",
              color: activeTab === tab ? "#22d3ee" : "rgba(255,255,255,0.5)",
              border: activeTab === tab ? "1px solid rgba(34, 211, 238, 0.25)" : "1px solid transparent",
            }}
          >
            {tab === "overview" ? "Overview" : tab === "pipeline" ? "Client Pipeline" : "Automations"}
          </button>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 flex-1 px-4 sm:px-6 md:px-10 py-6 sm:py-8">
        {activeTab === "overview" ? (
          <div className="space-y-6 max-w-[1800px]">
            {/* Stats Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <div className="rounded-xl p-4 sm:p-5 md:p-6 bg-black/40 backdrop-blur-md border border-white/10">
                <p className="font-mono font-medium uppercase tracking-[0.16em] mb-2 sm:mb-3 text-white/40" style={{ fontSize: "9px" }}>MRR (April)</p>
                <p className="font-heading font-bold" style={{ fontSize: "clamp(24px, 4vw, 42px)", color: "#22d3ee", lineHeight: 1 }}>£1,947</p>
                <p className="mt-1.5 sm:mt-2 text-[10px] sm:text-xs text-white/50">
                  6 retainers active <span style={{ color: "#22d3ee" }}>+18%</span>
                </p>
              </div>

              <div className="rounded-xl p-4 sm:p-5 md:p-6 bg-black/40 backdrop-blur-md border border-white/10">
                <p className="font-mono font-medium uppercase tracking-[0.16em] mb-2 sm:mb-3 text-white/40" style={{ fontSize: "9px" }}>Active Builds</p>
                <p className="font-heading font-bold text-white" style={{ fontSize: "clamp(24px, 4vw, 42px)", lineHeight: 1 }}>4</p>
                <p className="mt-1.5 sm:mt-2 text-[10px] sm:text-xs text-white/50">Target: 5 &middot; <span className="text-white/70">1 slot free</span></p>
              </div>

              <div className="rounded-xl p-4 sm:p-5 md:p-6 bg-black/40 backdrop-blur-md border border-white/10">
                <p className="font-mono font-medium uppercase tracking-[0.16em] mb-2 sm:mb-3 text-white/40" style={{ fontSize: "9px" }}>Pipeline Value</p>
                <p className="font-heading font-bold text-white" style={{ fontSize: "clamp(24px, 4vw, 42px)", lineHeight: 1 }}>£18.4k</p>
                <div className="mt-2 sm:mt-3 h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
                  <div className="h-full rounded-full" style={{ width: "76%", background: "linear-gradient(90deg, #14c6c4, #22d3ee, #3b82f6)" }} />
                </div>
                <p className="mt-1.5 text-[10px] sm:text-xs text-white/50">76% to £25k target</p>
              </div>

              <div className="rounded-xl p-4 sm:p-5 md:p-6 bg-black/40 backdrop-blur-md border border-white/10">
                <p className="font-mono font-medium uppercase tracking-[0.16em] mb-2 sm:mb-3 text-white/40" style={{ fontSize: "9px" }}>Avg Build Value</p>
                <p className="font-heading font-bold text-white" style={{ fontSize: "clamp(24px, 4vw, 42px)", lineHeight: 1 }}>£2.1k</p>
                <p className="mt-1.5 sm:mt-2 text-[10px] sm:text-xs text-white/50">From 9 qualified leads</p>
              </div>
            </div>

            {/* Chart + AI Insights */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-4 sm:gap-6">
              <div className="rounded-xl pt-4 sm:pt-6 pb-0 px-4 sm:px-6 overflow-hidden bg-black/40 backdrop-blur-md border border-white/10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 sm:mb-6">
                  <p className="font-mono font-medium uppercase tracking-[0.16em] text-white/40" style={{ fontSize: "10px" }}>Leads vs Deals (6 Months)</p>
                  <div className="flex items-center gap-4 sm:gap-5">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-sm" style={{ background: "rgba(59, 130, 246, 0.25)", border: "1px solid rgba(59, 130, 246, 0.3)" }} />
                      <span className="text-[10px] sm:text-xs text-white/50">Leads</span>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-sm" style={{ background: "linear-gradient(180deg, #22d3ee, #67e8f9)" }} />
                      <span className="text-[10px] sm:text-xs text-white/50">Deals Won</span>
                    </div>
                  </div>
                </div>
                <div className="h-64 -mx-4 sm:-mx-6 -mb-1">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={CHART_BARS} margin={{ top: 5, right: 0, left: -20, bottom: -8 }}>
                      <defs>
                        <linearGradient id="leadsGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="rgba(59, 130, 246, 0.25)" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="rgba(59, 130, 246, 0.25)" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="dealsGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.06)" vertical={false} />
                      <XAxis dataKey="month" tick={{ fontSize: 11, fill: "rgba(255,255,255,0.5)", fontFamily: "monospace" }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 11, fill: "rgba(255,255,255,0.5)", fontFamily: "monospace" }} axisLine={false} tickLine={false} />
                      <Tooltip
                        contentStyle={{
                          background: "rgba(10, 10, 10, 0.95)",
                          border: "1px solid rgba(255, 255, 255, 0.1)",
                          borderRadius: "8px",
                          fontSize: "12px",
                          color: "#ffffff",
                          fontFamily: "monospace",
                          backdropFilter: "blur(12px)",
                        }}
                        labelStyle={{ color: "#22d3ee", fontWeight: 600 }}
                      />
                      <Area type="monotone" dataKey="leads" stroke="rgba(59, 130, 246, 0.6)" fillOpacity={1} fill="url(#leadsGrad)" strokeWidth={2} />
                      <Area type="monotone" dataKey="deals" stroke="#22d3ee" fillOpacity={1} fill="url(#dealsGrad)" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="rounded-xl p-4 sm:p-6 flex flex-col bg-black/40 backdrop-blur-md border border-white/10">
                <div className="flex items-center gap-2 mb-4 sm:mb-5">
                  <div className="w-2 h-2 rounded-full bg-[#22d3ee] animate-pulse" />
                  <p className="font-mono font-medium uppercase tracking-[0.16em] text-white/40" style={{ fontSize: "10px" }}>Sovereign AI</p>
                </div>
                <div className="flex-1 space-y-2.5 overflow-y-auto">
                  {AI_INSIGHTS.map((insight, i) => (
                    <div
                      key={i}
                      className="rounded-lg px-4 py-3 text-xs leading-relaxed"
                      style={{
                        background: insight.type === "positive"
                          ? "rgba(34, 211, 238, 0.08)"
                          : insight.type === "warning"
                          ? "rgba(245, 158, 11, 0.08)"
                          : "rgba(255, 255, 255, 0.03)",
                        color: insight.type === "positive"
                          ? "#67e8f9"
                          : insight.type === "warning"
                          ? "#FBBF24"
                          : "rgba(255,255,255,0.75)",
                        borderLeft: insight.type === "positive"
                          ? "2px solid rgba(34, 211, 238, 0.4)"
                          : insight.type === "warning"
                          ? "2px solid rgba(245, 158, 11, 0.4)"
                          : "2px solid rgba(255, 255, 255, 0.15)",
                      }}
                    >
                      {insight.text}
                    </div>
                  ))}
                </div>
                <p className="text-xs mt-4 pt-3 italic text-white/40 border-t border-white/5">
                  AI insights activate with live retainer data.
                </p>
              </div>
            </div>

            {/* Pipeline + Follow-ups */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <div className="rounded-xl p-4 sm:p-6 bg-black/40 backdrop-blur-md border border-white/10">
                <p className="font-mono font-medium uppercase tracking-[0.16em] mb-4 sm:mb-5 text-white/40" style={{ fontSize: "10px" }}>This Week&apos;s Pipeline</p>
                <div className="space-y-2.5">
                  {PIPELINE_ENTRIES.slice(0, 4).map((entry) => (
                    <div
                      key={entry.day + entry.name}
                      className="flex items-center gap-3 rounded-lg px-4 py-3"
                      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}
                    >
                      <span className="shrink-0 w-2 h-2 rounded-full bg-[#22d3ee]" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-white">{entry.name}</span>
                          <span className="text-xs text-white/50">{entry.day} {entry.time}</span>
                        </div>
                        <span className="text-xs text-white/50">{entry.location} &middot; {entry.budget}</span>
                      </div>
                      <span
                        className={`font-mono font-medium uppercase tracking-[0.05em] rounded-full border px-3 py-1 ${statusStyles[entry.status]}`}
                        style={{ fontSize: "10px" }}
                      >
                        {entry.status}
                      </span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setActiveTab("pipeline")}
                  className="mt-4 w-full text-center text-xs font-mono uppercase tracking-[0.12em] py-2.5 rounded-lg transition-all cursor-pointer"
                  style={{ color: "#22d3ee", background: "rgba(34, 211, 238, 0.06)", border: "1px solid rgba(34, 211, 238, 0.15)" }}
                >
                  View full pipeline →
                </button>
              </div>

              <div className="rounded-xl p-4 sm:p-6 bg-black/40 backdrop-blur-md border border-white/10">
                <p className="font-mono font-medium uppercase tracking-[0.16em] mb-4 sm:mb-5 text-white/40" style={{ fontSize: "10px" }}>Follow-Ups Due</p>
                <div className="space-y-2.5">
                  {FOLLOW_UPS.map((item) => (
                    <div
                      key={item.name}
                      className="flex items-start gap-3 rounded-lg px-4 py-3"
                      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}
                    >
                      <span
                        className="shrink-0 w-2 h-2 rounded-full mt-1.5"
                        style={{ background: priorityStyles[item.priority].dot }}
                      />
                      <div className="flex-1 min-w-0">
                        <span className="text-sm font-semibold block text-white">{item.name}</span>
                        <span className="text-xs text-white/50">{item.action}</span>
                      </div>
                      <span
                        className="font-mono uppercase tracking-[0.05em] shrink-0"
                        style={{ fontSize: "10px", color: priorityStyles[item.priority].text }}
                      >
                        {item.priority}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Globe */}
            <div className="rounded-xl p-6 sm:p-8 bg-black/40 backdrop-blur-md border border-white/10">
              <p className="font-mono font-medium uppercase tracking-[0.16em] mb-6 text-center text-white/40" style={{ fontSize: "10px" }}>
                Client Footprint &middot; 9 Active
              </p>
              <div className="max-w-lg mx-auto">
                <Globe
                  markers={[
                    { id: "wigan",      location: [53.5448, -2.6318],  label: "Wigan, UK" },
                    { id: "manchester", location: [53.4808, -2.2426],  label: "Manchester, UK" },
                    { id: "liverpool",  location: [53.4084, -2.9916],  label: "Liverpool, UK" },
                    { id: "london",     location: [51.5074, -0.1278],  label: "London, UK" },
                    { id: "miami",      location: [25.7617, -80.1918], label: "Miami, US" },
                    { id: "newyork",    location: [40.7128, -74.0060], label: "New York, US" },
                    { id: "la",         location: [34.0522, -118.2437],label: "Los Angeles, US" },
                    { id: "dallas",     location: [32.7767, -96.7970], label: "Dallas, US" },
                    { id: "amsterdam",  location: [52.3676, 4.9041],   label: "Amsterdam, NL" },
                  ]}
                  arcs={[
                    { id: "wigan-manc",      from: [53.5448, -2.6318], to: [53.4808, -2.2426] },
                    { id: "wigan-london",    from: [53.5448, -2.6318], to: [51.5074, -0.1278] },
                    { id: "wigan-miami",     from: [53.5448, -2.6318], to: [25.7617, -80.1918] },
                    { id: "wigan-ny",        from: [53.5448, -2.6318], to: [40.7128, -74.0060] },
                    { id: "wigan-la",        from: [53.5448, -2.6318], to: [34.0522, -118.2437] },
                    { id: "wigan-dallas",    from: [53.5448, -2.6318], to: [32.7767, -96.7970] },
                    { id: "wigan-amsterdam", from: [53.5448, -2.6318], to: [52.3676, 4.9041] },
                    { id: "wigan-liverpool", from: [53.5448, -2.6318], to: [53.4084, -2.9916] },
                  ]}
                  dark={1}
                  baseColor={[0.04, 0.06, 0.08]}
                  glowColor={[0.05, 0.1, 0.15]}
                  markerColor={[0.13, 0.83, 0.93]}
                  arcColor={[0.13, 0.83, 0.93]}
                  mapBrightness={4}
                  speed={0.002}
                />
              </div>
            </div>
          </div>
        ) : activeTab === "pipeline" ? (
          <div className="max-w-[1800px]">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-heading font-bold text-white" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}>Client Pipeline</h2>
                <p className="text-sm mt-1 text-white/50">Everything in flight this week &middot; builds, proposals, discovery.</p>
              </div>
              <div className="hidden sm:flex items-center gap-3 text-xs font-mono uppercase tracking-[0.1em] text-white/50">
                <span>Week of 13 Apr 2026</span>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden bg-black/40 backdrop-blur-md border border-white/10">
              <div className="hidden md:grid grid-cols-[60px_80px_1.4fr_1.2fr_120px_110px_130px] gap-3 px-5 py-3 border-b border-white/10">
                {["Day", "Time", "Client", "Location", "Value", "Status", "Result"].map((h) => (
                  <span key={h} className="font-mono uppercase tracking-[0.12em] text-white/40" style={{ fontSize: "10px" }}>{h}</span>
                ))}
              </div>
              {PIPELINE_ENTRIES.map((entry, i) => (
                <div
                  key={i}
                  className="grid grid-cols-1 md:grid-cols-[60px_80px_1.4fr_1.2fr_120px_110px_130px] gap-2 md:gap-3 px-5 py-4 items-center"
                  style={{ borderBottom: i < PIPELINE_ENTRIES.length - 1 ? "1px solid rgba(255, 255, 255, 0.04)" : "none" }}
                >
                  <span className="text-sm font-semibold text-white">{entry.day}</span>
                  <span className="text-sm font-mono text-white/50">{entry.time}</span>
                  <span className="text-sm text-white">{entry.name}</span>
                  <span className="text-sm text-white/70">{entry.location}</span>
                  <span className="text-sm font-semibold font-mono text-white">{entry.budget}</span>
                  <span
                    className={`font-mono font-medium uppercase tracking-[0.05em] rounded-full border px-3 py-1 text-center ${statusStyles[entry.status]}`}
                    style={{ fontSize: "10px" }}
                  >
                    {entry.status}
                  </span>
                  <span
                    className="text-sm font-medium"
                    style={{
                      color: entry.result === "Retainer Active"
                        ? "#22d3ee"
                        : entry.result === "Sent" || entry.result === "In Progress"
                        ? "#FBBF24"
                        : "rgba(255,255,255,0.5)",
                    }}
                  >
                    {entry.result}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="rounded-xl p-4 text-center bg-black/40 backdrop-blur-md border border-white/10">
                <p className="font-mono text-xs uppercase tracking-[0.12em] mb-1 text-white/40">Total</p>
                <p className="text-2xl font-bold text-white">6</p>
              </div>
              <div className="rounded-xl p-4 text-center bg-black/40 backdrop-blur-md border border-white/10">
                <p className="font-mono text-xs uppercase tracking-[0.12em] mb-1 text-white/40">Live</p>
                <p className="text-2xl font-bold" style={{ color: "#22d3ee" }}>1</p>
              </div>
              <div className="rounded-xl p-4 text-center bg-black/40 backdrop-blur-md border border-white/10">
                <p className="font-mono text-xs uppercase tracking-[0.12em] mb-1 text-white/40">In Build</p>
                <p className="text-2xl font-bold" style={{ color: "#60a5fa" }}>1</p>
              </div>
              <div className="rounded-xl p-4 text-center bg-black/40 backdrop-blur-md border border-white/10">
                <p className="font-mono text-xs uppercase tracking-[0.12em] mb-1 text-white/40">Proposals Out</p>
                <p className="text-2xl font-bold" style={{ color: "#FBBF24" }}>2</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-[1800px]">
            <div className="mb-8">
              <h2 className="font-heading font-bold text-white" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}>Automations</h2>
              <p className="text-sm mt-1 text-white/50">
                Everything included in your Sovereign Systems retainer, plus paid bolt-ons you can add when you&apos;re ready to scale.
              </p>
            </div>

            <div className="space-y-10">
              <div>
                <p className="font-mono font-medium uppercase tracking-[0.16em] mb-2 flex items-center gap-2" style={{ fontSize: "10px", color: "#22d3ee" }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#22d3ee] animate-pulse" />
                  Included with Your Retainer
                </p>
                <p className="text-xs mb-5 leading-relaxed text-white/50">
                  The Sovereign Systems stack &middot; hosting, SEO, security, support. All rolled into your monthly.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {INCLUDED_WITH_PLAN.map((a) => (
                    <div key={a.name} className="rounded-xl p-5 flex flex-col bg-black/40 backdrop-blur-md border border-white/10" style={{ borderLeft: "3px solid rgba(34, 211, 238, 0.4)" }}>
                      <div className="flex items-start gap-3 mb-3">
                        <span className="text-xl">{a.icon}</span>
                        <div className="flex-1">
                          <h3 className="text-sm font-semibold text-white">{a.name}</h3>
                          <p className="text-xs mt-1.5 leading-relaxed text-white/50">{a.desc}</p>
                        </div>
                      </div>
                      <div className="mt-auto pt-3 flex items-center gap-2 border-t border-white/5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#22d3ee]" />
                        <span className="font-mono uppercase tracking-[0.1em]" style={{ fontSize: "10px", color: "#22d3ee" }}>Included</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="font-mono font-medium uppercase tracking-[0.16em] mb-2 flex items-center gap-2 text-white/70" style={{ fontSize: "10px" }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
                  Available Upgrades
                </p>
                <p className="text-xs mb-5 leading-relaxed text-white/50">
                  Bolt-on automations that stack on top of your retainer &middot; activates inside 48 hours.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {PAID_UPGRADES.map((a) => (
                    <Card key={a.name}>
                      <CardHeader>
                        <div className="flex items-start gap-3">
                          <span className="text-xl">{a.icon}</span>
                          <div className="flex-1">
                            <CardTitle>{a.name}</CardTitle>
                            <CardDescription>{a.desc}</CardDescription>
                          </div>
                        </div>
                        <CardAction>
                          <span className="font-mono font-semibold text-sm" style={{ color: "#22d3ee" }}>{a.price}</span>
                        </CardAction>
                      </CardHeader>
                      <CardContent />
                      <CardFooter>
                        <div className="flex gap-2 w-full">
                          <a
                            href={a.checkoutUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 text-center text-xs font-mono uppercase tracking-[0.12em] py-2.5 rounded-lg transition-all cursor-pointer"
                            style={{ color: "#22d3ee", background: "rgba(34, 211, 238, 0.08)", border: "1px solid rgba(34, 211, 238, 0.2)" }}
                          >
                            Add to plan →
                          </a>
                          <a
                            href="https://wa.me/447986767758?text=Hi%20Sovereign%20Systems%20%E2%80%93%20I%27d%20like%20to%20discuss%20the%20upgrade%20options"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 text-center text-xs font-mono uppercase tracking-[0.12em] py-2.5 rounded-lg transition-all cursor-pointer text-white/60 hover:text-white"
                            style={{ background: "rgba(255, 255, 255, 0.04)", border: "1px solid rgba(255, 255, 255, 0.1)" }}
                          >
                            Book a call
                          </a>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
