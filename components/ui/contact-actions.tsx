"use client";

import React, { useState } from "react";
import { MessageSquare, Mail, Copy, Check, Smartphone } from "lucide-react";
import { CONTACT_EMAIL, CONTACT_PHONE, WHATSAPP_URL, EMAIL_SUBJECTS, EMAIL_BODY_TEMPLATES } from "@/lib/constants";
import { Button } from "./button";

export function ContactActions() {
    const [copiedEmail, setCopiedEmail] = useState(false);
    const [copiedPhone, setCopiedPhone] = useState(false);

    const copyToClipboard = (text: string, type: 'email' | 'phone') => {
        navigator.clipboard.writeText(text);
        if (type === 'email') {
            setCopiedEmail(true);
            setTimeout(() => setCopiedEmail(false), 2000);
        } else {
            setCopiedPhone(true);
            setTimeout(() => setCopiedPhone(false), 2000);
        }
    };

    const emailHref = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(EMAIL_SUBJECTS.AUDIT)}&body=${encodeURIComponent(EMAIL_BODY_TEMPLATES.AUDIT)}`;
    const smsHref = `sms:${CONTACT_PHONE}?body=${encodeURIComponent("Hi Miller, I'd like to book a strategy audit.")}`;

    return (
        <div className="flex flex-col gap-4 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* SMS Button */}
                <div className="relative group">
                    <a
                        href={smsHref}
                        className="flex items-center justify-center gap-4 py-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 transition-all font-bold text-xl w-full"
                    >
                        <Smartphone className="w-6 h-6" />
                        Text Me
                    </a>
                    {/* Desktop Fallback Tooltip/Hint */}
                    <button
                        onClick={() => copyToClipboard(CONTACT_PHONE, 'phone')}
                        className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-[10px] text-white/30 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
                    >
                        {copiedPhone ? "Number Copied!" : "Click to copy number (Desktop)"}
                    </button>
                </div>

                {/* Email Button */}
                <div className="relative group">
                    <a
                        href={emailHref}
                        className="flex items-center justify-center gap-4 py-6 rounded-2xl bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan hover:bg-brand-cyan/20 transition-all font-bold text-xl w-full"
                    >
                        <Mail className="w-6 h-6" />
                        Email Me
                    </a>
                    <button
                        onClick={() => copyToClipboard(CONTACT_EMAIL, 'email')}
                        className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-[10px] text-white/30 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
                    >
                        {copiedEmail ? "Email Copied!" : "Click to copy email (Desktop)"}
                    </button>
                </div>
            </div>

            {/* WhatsApp Alternative (Subtle) */}
            <div className="mt-6 pt-6 border-t border-white/5 flex flex-col items-center">
                <p className="text-white/40 text-[10px] uppercase tracking-[0.2em] mb-4">Or reach out via WhatsApp</p>
                <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-400/80 hover:bg-emerald-500/10 text-xs font-mono transition-all"
                >
                    <MessageSquare className="w-3 h-3" />
                    Direct Message
                </a>
            </div>
        </div>
    );
}
