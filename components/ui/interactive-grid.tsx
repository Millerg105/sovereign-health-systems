"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

export function InteractiveGrid() {
    const [hoveredCol, setHoveredCol] = useState<number | null>(null);

    // 12 columns grid
    const cols = Array.from({ length: 12 });

    return (
        <div className="absolute inset-0 pointer-events-none z-0 flex justify-between px-[5vw] opacity-20">
            {cols.map((_, i) => (
                <div key={i} className="relative h-full w-[1px]">
                    {/* The String */}
                    <motion.div
                        className="absolute inset-0 w-full h-full bg-brand-cyan shadow-[0_0_15px_var(--color-brand-cyan)]"
                        initial={{ opacity: 0.1 }}
                        animate={{
                            x: hoveredCol === i ? [0, 2, -2, 1, -1, 0] : 0,
                            scaleX: hoveredCol === i ? [1, 2, 1] : 1,
                            opacity: hoveredCol === i ? 0.8 : 0.1,
                            backgroundColor: hoveredCol === i ? "var(--color-brand-cyan)" : "var(--color-brand-blue)"
                        }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                    />

                    {/* Hitbox for interactions - enable pointer events purely for this */}
                    <div
                        className="absolute inset-y-0 -left-4 w-8 pointer-events-auto"
                        onMouseEnter={() => setHoveredCol(i)}
                        onMouseLeave={() => setHoveredCol(null)}
                    />
                </div>
            ))}
        </div>
    );
}
