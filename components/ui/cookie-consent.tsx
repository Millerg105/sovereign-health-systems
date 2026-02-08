"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X } from "lucide-react";
import Link from "next/link";

export function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem("cookie-consent");
        if (!consent) {
            const timer = setTimeout(() => setIsVisible(true), 2000);
            return () => clearTimeout(timer);
        }
    }, []);

    const accept = () => {
        localStorage.setItem("cookie-consent", "true");
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    className="fixed bottom-[max(0.75rem,env(safe-area-inset-bottom))] left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:max-w-sm z-[200]"
                >
                    <div className="bg-brand-navy/90 backdrop-blur-xl border border-white/10 p-6 rounded-[2rem] shadow-2xl">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-brand-cyan/10 flex items-center justify-center shrink-0 border border-brand-cyan/20">
                                <Cookie className="w-5 h-5 text-brand-cyan" />
                            </div>
                            <div className="space-y-3">
                                <h3 className="text-white font-bold text-sm">Privacy & Experience</h3>
                                <p className="text-white/50 text-[11px] leading-relaxed">
                                    We use essentials to analyze traffic and ensure your ROI calculations are accurate. By continuing, you agree to our <Link href="/privacy" className="text-brand-cyan hover:underline">Privacy Policy</Link>.
                                </p>
                                <div className="flex gap-3">
                                    <button
                                        onClick={accept}
                                        className="bg-brand-cyan text-black text-[10px] font-bold px-5 py-2 rounded-full hover:bg-white transition-colors"
                                    >
                                        Accept
                                    </button>
                                    <button
                                        onClick={() => setIsVisible(false)}
                                        className="text-white/30 text-[10px] uppercase tracking-widest hover:text-white transition-colors"
                                    >
                                        Decline
                                    </button>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsVisible(false)}
                                className="text-white/20 hover:text-white"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
