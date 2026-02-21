"use client";

import React, { useState } from "react";
import { MessageSquare, Mail, Smartphone } from "lucide-react";
import { CONTACT_EMAIL, CONTACT_PHONE, WHATSAPP_URL, EMAIL_SUBJECTS, EMAIL_BODY_TEMPLATES, SMS_TEMPLATE } from "@/lib/constants";

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
    const smsHref = `sms:${CONTACT_PHONE}?body=${encodeURIComponent(SMS_TEMPLATE)}`;

    return (
        <div className="flex flex-col gap-4 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* SMS Button */}
                <div className="relative group">
                    <a
                        href={smsHref}
                        className="btn-premium-primary flex w-full items-center justify-center gap-3 px-5 py-3 text-sm font-semibold sm:text-base"
                    >
                        <Smartphone className="w-5 h-5" />
                        Text Me
                    </a>
                    {/* Desktop Fallback Tooltip/Hint */}
                    <button
                        onClick={() => copyToClipboard(CONTACT_PHONE, 'phone')}
                        className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-[10px] text-white/30 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap active:scale-[0.98]"
                    >
                        {copiedPhone ? "Number Copied!" : "Click to copy number (Desktop)"}
                    </button>
                </div>

                {/* Email Button */}
                <div className="relative group">
                    <a
                        href={emailHref}
                        className="btn-premium-secondary flex w-full items-center justify-center gap-3 px-5 py-3 text-sm font-semibold sm:text-base"
                    >
                        <Mail className="w-5 h-5" />
                        Email Me
                    </a>
                    <button
                        onClick={() => copyToClipboard(CONTACT_EMAIL, 'email')}
                        className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-[10px] text-white/30 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap active:scale-[0.98]"
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
                    className="btn-premium-secondary flex items-center gap-2 px-6 py-2 text-xs font-mono"
                >
                    <MessageSquare className="w-3 h-3 text-brand-cyan" />
                    Direct Message
                </a>
            </div>
        </div>
    );
}
