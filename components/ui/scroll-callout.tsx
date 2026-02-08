"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScrollCalloutProps {
    text: string;
    opacity: any; // Framer Motion value
    x: any;       // Framer Motion value
    side?: "left" | "right";
    className?: string;
}

export function ScrollCallout({
    text,
    opacity,
    x,
    side = "left",
    className
}: ScrollCalloutProps) {
    return (
        <motion.div
            style={{ opacity, x }}
            className={cn(
                "absolute top-1/2 -translate-y-1/2 max-w-sm p-6 rounded-2xl",
                "bg-black/40 backdrop-blur-md border border-white/10 shadow-2xl",
                side === "left" ? "left-8 md:left-20" : "right-8 md:right-20",
                className
            )}
        >
            <div className="flex items-start gap-4">
                {/* Decorative Indicator */}
                <div className={cn(
                    "mt-1.5 w-2 h-2 rounded-full shrink-0",
                    side === "left" ? "bg-brand-cyan" : "bg-brand-blue"
                )} />

                {/* Text */}
                <p className="text-xl md:text-2xl font-medium text-white leading-relaxed">
                    {text}
                </p>
            </div>
        </motion.div>
    );
}
