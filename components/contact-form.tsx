"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, Loader2, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface ContactFormProps {
    source?: string;
    showRevenueFields?: boolean;
    initialData?: {
        revenue?: string;
        problems?: string;
    };
}

export function ContactForm({ source = "General", showRevenueFields = false, initialData }: ContactFormProps) {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        clinicName: "",
        revenue: initialData?.revenue || "",
        problems: initialData?.problems || "",
        honeypot: "", // Antispam
    });
    const [errorMsg, setErrorMsg] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Honeypot check
        if (formData.honeypot) return;

        setStatus("loading");

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    source,
                }),
            });

            if (res.ok) {
                setStatus("success");
                setTimeout(() => {
                    router.push("/thank-you");
                }, 1500);
            } else {
                const data = await res.json();
                setErrorMsg(data.message || "Something went wrong.");
                setStatus("error");
            }
        } catch (err) {
            setErrorMsg("Could not connect to the server.");
            setStatus("error");
        }
    };

    return (
        <div className="w-full">
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot Field (Hidden) */}
                <input
                    type="text"
                    name="honeypot"
                    value={formData.honeypot}
                    onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className="text-xs font-mono uppercase tracking-widest text-white/40 ml-1">Your Name</label>
                        <input
                            required
                            type="text"
                            placeholder="John Doe"
                            className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-brand-cyan/50 focus:border-brand-cyan transition-all"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-mono uppercase tracking-widest text-white/40 ml-1">Work Email</label>
                        <input
                            required
                            type="email"
                            placeholder="john@clinic.com"
                            className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-brand-cyan/50 focus:border-brand-cyan transition-all"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>
                </div>

                <div className="space-y-1">
                    <label className="text-xs font-mono uppercase tracking-widest text-white/40 ml-1">Clinic Name</label>
                    <input
                        required
                        type="text"
                        placeholder="Prime Health London"
                        className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-brand-cyan/50 focus:border-brand-cyan transition-all"
                        value={formData.clinicName}
                        onChange={(e) => setFormData({ ...formData, clinicName: e.target.value })}
                    />
                </div>

                {showRevenueFields && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-xs font-mono uppercase tracking-widest text-white/40 ml-1">Estimated Loss</label>
                            <input
                                type="text"
                                className="w-full px-5 py-4 bg-brand-cyan/5 border border-brand-cyan/20 rounded-xl text-brand-cyan font-bold placeholder:text-white/20 focus:outline-none"
                                value={formData.revenue}
                                onChange={(e) => setFormData({ ...formData, revenue: e.target.value })}
                                placeholder="e.g. £5,000/mo"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-mono uppercase tracking-widest text-white/40 ml-1">Top Concern</label>
                            <select
                                className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-brand-cyan/50 focus:border-brand-cyan transition-all appearance-none"
                                value={formData.problems.includes('admin') ? 'manual_followup' : formData.problems}
                                onChange={(e) => setFormData({ ...formData, problems: e.target.value })}
                            >
                                <option value="" disabled className="bg-[#0A0A0A]">Select Primary Pain Point</option>
                                <option value="missed_calls" className="bg-[#0A0A0A]">Missed Calls/Revenue</option>
                                <option value="slow_reply" className="bg-[#0A0A0A]">Slow Lead Response</option>
                                <option value="manual_followup" className="bg-[#0A0A0A]">Manual Follow-ups</option>
                                <option value="no_shows" className="bg-[#0A0A0A]">Empty Slots / No-Shows</option>
                                <option value="full_scaling" className="bg-[#0A0A0A]">Ready to Scale Operations</option>
                            </select>
                        </div>
                    </div>
                )}

                <button
                    disabled={status === "loading" || status === "success"}
                    type="submit"
                    className="w-full py-5 rounded-xl bg-brand-cyan text-black font-bold text-lg hover:bg-white transition-all flex items-center justify-center gap-3 shadow-[0_10px_30px_-10px_rgba(34,211,238,0.4)] disabled:opacity-70 disabled:grayscale"
                >
                    {status === "loading" ? (
                        <Loader2 className="w-6 h-6 animate-spin" />
                    ) : status === "success" ? (
                        <>
                            <CheckCircle2 className="w-6 h-6" />
                            Sending Success
                        </>
                    ) : (
                        <>
                            <Send className="w-5 h-5" />
                            Book Your Free Strategy Audit
                        </>
                    )}
                </button>

                {status === "error" && (
                    <p className="text-red-400 text-sm text-center mt-2 animate-pulse">
                        {errorMsg}
                    </p>
                )}
            </form>
        </div>
    );
}
