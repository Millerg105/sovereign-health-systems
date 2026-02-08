"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface PreloaderProps {
    onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
    const [count, setCount] = useState(1);
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        // Match-strike easing: slow start, then accelerates toward 100%
        // Total duration ~3s
        const totalDuration = 3000;
        const startTime = performance.now();
        let frameId = 0;
        let completeTimer: ReturnType<typeof setTimeout> | undefined;

        const tick = (now: number) => {
            const elapsed = now - startTime;
            const t = Math.min(elapsed / totalDuration, 1);

            // Ease function: slow start, fast finish (match igniting)
            // Using a cubic ease-in curve
            const eased = t * t * t;
            const value = Math.floor(1 + eased * 99);

            setCount(value);

            if (t < 1) {
                frameId = requestAnimationFrame(tick);
            } else {
                setCount(100);
                setShowSuccess(true);
                completeTimer = setTimeout(onComplete, 900);
            }
        };

        frameId = requestAnimationFrame(tick);
        return () => {
            cancelAnimationFrame(frameId);
            if (completeTimer) clearTimeout(completeTimer);
        };
    }, [onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
        >
            {/* Subtle grid lines */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.04]">
                <div className="absolute left-[20%] h-full w-[1px] bg-white" />
                <div className="absolute left-[40%] h-full w-[1px] bg-white" />
                <div className="absolute left-[60%] h-full w-[1px] bg-white" />
                <div className="absolute left-[80%] h-full w-[1px] bg-white" />
                <div className="absolute top-[25%] w-full h-[1px] bg-white" />
                <div className="absolute top-[50%] w-full h-[1px] bg-white" />
                <div className="absolute top-[75%] w-full h-[1px] bg-white" />
            </div>

            {/* Blue ambient glow */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-600/10 blur-[120px]" />
            </div>

            <div className="relative z-10 flex flex-col items-start w-full max-w-[80vw] md:max-w-[44vw]">
                {/* Top metadata */}
                <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="flex justify-between w-full text-[10px] md:text-xs font-mono text-white/40 mb-3 tracking-widest uppercase"
                >
                    <span>Sovereign Health Systems</span>
                    <span>v2.0 — Initialising</span>
                </motion.div>

                {/* LOADING label */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="text-sm md:text-base font-mono font-semibold tracking-[0.4em] uppercase text-blue-400 mb-1"
                >
                    Loading
                </motion.p>

                {/* Big percentage number */}
                <h1 className="text-[100px] md:text-[180px] leading-none font-heading font-bold tracking-tighter tabular-nums text-white select-none">
                    {count}
                    <span className="text-blue-400">%</span>
                </h1>

                {/* Progress bar */}
                <div className="w-full h-[3px] bg-white/10 mt-6 relative overflow-hidden rounded-full">
                    <motion.div
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"
                        style={{ width: `${count}%` }}
                    />
                    {/* Travelling glow on bar */}
                    <motion.div
                        className="absolute top-0 h-full w-8 bg-white/60 blur-sm rounded-full"
                        style={{ left: `calc(${count}% - 1rem)` }}
                    />
                </div>

                {/* Bottom metadata */}
                <div className="w-full flex justify-between mt-4 text-[10px] text-white/20 font-mono uppercase tracking-wider">
                    <span>System Ready</span>
                    <span>{count}% complete</span>
                </div>

                {showSuccess && (
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        className="mt-6 text-sm md:text-base text-blue-300 font-mono uppercase tracking-[0.12em]"
                    >
                        Successfully activated. Welcome - control panel connected.
                    </motion.p>
                )}
            </div>
        </motion.div>
    );
}
