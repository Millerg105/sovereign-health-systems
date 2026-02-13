"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function TopBanner() {
    const [isDismissed, setIsDismissed] = useState(false);

    useEffect(() => {
        // Check if banner was previously dismissed
        const dismissed = localStorage.getItem("topBannerDismissed");
        if (dismissed === "true") {
            setIsDismissed(true);
        }
    }, []);

    const handleDismiss = () => {
        setIsDismissed(true);
        localStorage.setItem("topBannerDismissed", "true");
    };

    const scrollToBooking = () => {
        document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
    };

    if (isDismissed) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-blue-950 via-blue-900 to-blue-950 border-b border-blue-700/30 shadow-lg"
            >
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="flex items-center justify-between gap-3 py-2.5 sm:py-3">
                        {/* Left side - Message */}
                        <div className="flex-1 min-w-0">
                            <p className="text-white text-xs sm:text-sm font-medium truncate sm:whitespace-normal">
                                🚀 We&apos;re building free websites for 5 home service businesses in Greater Manchester
                            </p>
                        </div>

                        {/* Right side - CTA and Close */}
                        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                            <button
                                onClick={scrollToBooking}
                                className="px-3 sm:px-5 py-1.5 sm:py-2 bg-brand-cyan hover:bg-brand-cyan/90 text-black text-xs sm:text-sm font-bold rounded-lg transition-all hover:shadow-[0_0_15px_rgba(34,211,238,0.4)] whitespace-nowrap"
                            >
                                Claim Yours →
                            </button>
                            <button
                                onClick={handleDismiss}
                                className="p-1.5 hover:bg-white/10 rounded-md transition-colors text-white/70 hover:text-white"
                                aria-label="Dismiss banner"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
