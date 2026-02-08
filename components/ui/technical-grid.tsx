"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface TechnicalGridProps {
    className?: string;
    intensity?: "subtle" | "medium" | "bold";
}

export function TechnicalGrid({ className, intensity = "subtle" }: TechnicalGridProps) {
    const opacity = {
        subtle: "opacity-[0.05]",
        medium: "opacity-[0.10]",
        bold: "opacity-[0.18]",
    }[intensity];

    return (
        <div className={cn("absolute inset-0 pointer-events-none overflow-hidden", className)}>
            {/* Topographic/Grid Feel */}
            <div
                className={cn(
                    "absolute inset-0 w-full h-full",
                    opacity
                )}
                style={{
                    backgroundImage: `
                        linear-gradient(to right, rgba(34, 211, 238, 0.2) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(34, 211, 238, 0.2) 1px, transparent 1px)
                    `,
                    backgroundSize: "40px 40px",
                }}
            />

            {/* Larger Accent Grid — slow pulse for a living feel */}
            <div
                className="absolute inset-0 w-full h-full opacity-[0.04] animate-[grid-pulse_8s_ease-in-out_infinite]"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, rgba(34, 211, 238, 0.7) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(34, 211, 238, 0.7) 1px, transparent 1px)
                    `,
                    backgroundSize: "200px 200px",
                }}
            />

            {/* Radial mask to fade edges */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(2,4,8,0.4)_100%)]" />
        </div>
    );
}
