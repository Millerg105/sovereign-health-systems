"use client";

import { usePathname } from "next/navigation";
import FlowFieldBackground from "@/components/ui/flow-field-background";
import { TechnicalGrid } from "@/components/ui/technical-grid";

export function BackgroundLayer() {
    const pathname = usePathname();

    // The live background must run across the entire website.
    // We render it as a fixed layer at the absolute bottom.
    // All sections should be bg-transparent or use semi-transparent glass panels.

    return (
        <div className="fixed inset-0 -z-[100] w-full h-full pointer-events-none bg-void">
            {/* The technical grid provides the 'light lines' requested by the user */}
            <TechnicalGrid intensity="medium" className="opacity-60" />

            {/* The flow field provides the 'live' organic movement */}
            <FlowFieldBackground
                intensity="subtle"
                className="opacity-100"
            />

            {/* Cyan centre glow — gives the background a living 'heartbeat' */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,rgba(34,211,238,0.06)_0%,transparent_70%)]" />
        </div>
    );
}
