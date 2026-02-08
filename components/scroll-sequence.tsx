"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Preloader } from "./preloader";
import NeuralBackground from "./ui/flow-field-background";
import { InteractiveGrid } from "./ui/interactive-grid";

// --- Configuration ---
const FRAME_COUNT = 120; // Number of frames in the sequence
const SEQUENCE_PATH = "/sequence/frame_"; // Path prefix
const EXTENSION = "webp"; // or jpg, png

// --- Types ---
// --- Types ---
type TextBeat = {
    id: string;
    start: number; // 0.0 - 1.0 scroll progress
    end: number;
    title: string;
    subtitle: string;
    align: "center" | "left" | "right";
    isInteractive?: boolean; // Trigger for dashboard widgets
};

// --- Story Beats (Simplified to support the visual callouts) ---
const BEATS: TextBeat[] = [
    {
        id: "beat-hero-hook",
        start: 0.0,
        end: 0.15,
        title: "Revenue You Didn't Know You Lost.",
        subtitle: "The Strongest Pain Solving Point.",
        align: "center",
        isInteractive: false
    },
    // Beats are now visual mainly, handled by the overlay. 
    // We keep empty spacers or minimal text to allow the user to focus on the dashboard action.
];

export function ScrollSequence() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [loadingComplete, setLoadingComplete] = useState(false);

    // Scroll hooks
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    // Background Opacity
    const bgOpacity = useTransform(smoothProgress, [0, 0.2], [1, 0]);

    // Load images
    useEffect(() => {
        let loadedCount = 0;
        const imgArray: HTMLImageElement[] = [];

        const loadImages = async () => {
            for (let i = 0; i < FRAME_COUNT; i++) {
                const img = new Image();
                img.src = `${SEQUENCE_PATH}${i}.${EXTENSION}`;
                img.onload = () => {
                    loadedCount++;
                    if (loadedCount === FRAME_COUNT) setLoadingComplete(true);
                };
                img.onerror = () => loadedCount++;
                imgArray.push(img);
            }
            setImages(imgArray);
        };

        loadImages();
    }, []);

    // Sync Canvas Draw
    useEffect(() => {
        if (!canvasRef.current || images.length === 0) return;
        const ctx = canvasRef.current.getContext("2d");
        if (!ctx) return;

        const renderFrame = (progress: number) => {
            if (!ctx || !canvasRef.current) return;

            ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            ctx.fillStyle = "#050505";
            ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);

            const frameIndex = Math.min(FRAME_COUNT - 1, Math.floor(progress * FRAME_COUNT));
            const img = images[frameIndex];

            if (img && img.complete && img.naturalHeight !== 0) {
                const hRatio = canvasRef.current.width / img.width;
                const vRatio = canvasRef.current.height / img.height;
                const scale = Math.max(hRatio, vRatio);

                const centerShift_x = (canvasRef.current.width - img.width * scale) / 2;
                const centerShift_y = (canvasRef.current.height - img.height * scale) / 2;

                ctx.drawImage(img, 0, 0, img.width, img.height, centerShift_x, centerShift_y, img.width * scale, img.height * scale);
            }
        };

        const handleResize = () => {
            if (canvasRef.current) {
                canvasRef.current.width = window.innerWidth;
                canvasRef.current.height = window.innerHeight;
                renderFrame(smoothProgress.get());
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        const unsubscribe = smoothProgress.on("change", (latest) => {
            requestAnimationFrame(() => renderFrame(latest));
        });

        return () => {
            window.removeEventListener("resize", handleResize);
            unsubscribe();
        };
    }, [images, smoothProgress]);

    return (
        <>
            <AnimatePresence mode="wait">
                {!loadingComplete && (
                    <Preloader onComplete={() => setLoadingComplete(true)} />
                )}
            </AnimatePresence>

            <div ref={containerRef} className="relative w-full bg-void" style={{ height: "600vh" }}>

                {/* Neural Flow Field Background (Hero Layer) */}
                <motion.div
                    style={{ opacity: bgOpacity }}
                    className="fixed inset-0 z-0 pointer-events-none"
                >
                    <NeuralBackground color="#22d3ee" intensity="medium" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-void/50 to-void" />
                </motion.div>

                {/* Sticky Canvas Layer */}
                <div className="sticky top-0 h-screen w-full overflow-hidden z-10">
                    <canvas ref={canvasRef} className="block w-full h-full object-cover" />

                    {/* INTERACTIVE DASHBOARD LAYER */}
                    <DashboardOverlay progress={smoothProgress} />
                </div>

                {/* Text Overlays */}
                <div className="absolute inset-0 pointer-events-none z-20">
                    {BEATS.map((beat) => (
                        <ScrollBeat key={beat.id} beat={beat} progress={smoothProgress} />
                    ))}
                </div>
            </div>
        </>
    );
}

// --- Sequential Dashboard Callouts ---
function DashboardOverlay({ progress }: { progress: any }) {
    // Times mapped to scroll progress
    const opacity = useTransform(progress, [0.15, 0.2, 0.9, 1.0], [0, 1, 1, 0]);
    const scale = useTransform(progress, [0.15, 0.3], [0.95, 1]);

    // Widget 1: Missed Calls (0.2-0.3)
    const w1Opacity = useTransform(progress, [0.2, 0.25], [0, 1]);
    const w1Y = useTransform(progress, [0.2, 0.25], [20, 0]);

    // Widget 2: Response Time (0.35-0.4)
    const w2Opacity = useTransform(progress, [0.35, 0.4], [0, 1]);
    const w2Y = useTransform(progress, [0.35, 0.4], [20, 0]);

    // Widget 3: Bookings (0.5-0.55)
    const w3Opacity = useTransform(progress, [0.5, 0.55], [0, 1]);
    const w3Y = useTransform(progress, [0.5, 0.55], [20, 0]);

    // Widget 4: Revenue (0.65-0.7)
    const w4Opacity = useTransform(progress, [0.65, 0.7], [0, 1]);
    const w4Y = useTransform(progress, [0.65, 0.7], [20, 0]);

    // Widget 5: Reactivation (0.8-0.85)
    const w5Opacity = useTransform(progress, [0.8, 0.85], [0, 1]);
    const w5Y = useTransform(progress, [0.8, 0.85], [20, 0]);


    return (
        <motion.div
            style={{ opacity, scale }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
            {/* Screen Glow Effect */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.15),transparent_60%)] pointer-events-none" />

            {/* Grid Container */}
            <div className="relative w-[80vw] md:w-[60vw] h-[50vh] grid grid-cols-2 md:grid-cols-3 gap-6 pointer-events-auto">

                {/* 1. MISSED CALLS */}
                <motion.div style={{ opacity: w1Opacity, y: w1Y }} className="col-span-1 bg-brand-navy/90 border border-brand-cyan/20 p-6 rounded-xl shadow-lg backdrop-blur-md">
                    <div className="flex justify-between mb-2">
                        <span className="text-brand-cyan text-xs font-mono uppercase">Capture</span>
                        <div className="w-2 h-2 bg-brand-cyan rounded-full animate-pulse" />
                    </div>
                    <div className="text-3xl font-bold text-white mb-1">12</div>
                    <p className="text-xs text-white/50">Missed calls caught automatically</p>
                </motion.div>

                {/* 2. RESPONSE TIME */}
                <motion.div style={{ opacity: w2Opacity, y: w2Y }} className="col-span-1 bg-brand-navy/90 border border-brand-blue/20 p-6 rounded-xl shadow-lg backdrop-blur-md">
                    <div className="text-brand-blue text-xs font-mono uppercase mb-2">Speed</div>
                    <div className="text-3xl font-bold text-white mb-1">1m 42s</div>
                    <p className="text-xs text-white/50">Average AI response time</p>
                </motion.div>

                {/* 3. BOOKINGS */}
                <motion.div style={{ opacity: w3Opacity, y: w3Y }} className="col-span-1 bg-brand-navy/90 border border-emerald-500/20 p-6 rounded-xl shadow-lg backdrop-blur-md">
                    <div className="text-emerald-400 text-xs font-mono uppercase mb-2">Results</div>
                    <div className="text-3xl font-bold text-white mb-1">5 New</div>
                    <p className="text-xs text-white/50">Bookings while you slept</p>
                </motion.div>

                {/* 4. REVENUE (Wide) */}
                <motion.div style={{ opacity: w4Opacity, y: w4Y }} className="col-span-2 md:col-span-2 bg-brand-navy/90 border border-white/10 p-6 rounded-xl shadow-lg backdrop-blur-md flex justify-between items-center">
                    <div>
                        <div className="text-white/40 text-xs font-mono uppercase mb-1">Revenue Source: Ads</div>
                        <div className="text-4xl font-bold text-white">£4,250</div>
                    </div>
                    <div className="text-right">
                        <div className="text-white/40 text-xs font-mono uppercase mb-1">Organic</div>
                        <div className="text-xl font-bold text-white/80">£1,800</div>
                    </div>
                </motion.div>

                {/* 5. REACTIVATION */}
                <motion.div style={{ opacity: w5Opacity, y: w5Y }} className="col-span-1 bg-brand-navy/90 border border-purple-500/20 p-6 rounded-xl shadow-lg backdrop-blur-md">
                    <div className="text-purple-400 text-xs font-mono uppercase mb-2">Reactivation</div>
                    <div className="text-3xl font-bold text-white mb-1">28%</div>
                    <p className="text-xs text-white/50">Old leads turned into patients</p>
                </motion.div>

            </div>
        </motion.div>
    );
}

// --- Text Beats ---
function ScrollBeat({ beat, progress }: { beat: TextBeat, progress: any }) {
    const opacity = useTransform(progress, [beat.start, beat.start + 0.05, beat.end - 0.05, beat.end], [0, 1, 1, 0]);
    const y = useTransform(progress, [beat.start, beat.end], [50, -50]);

    // Specific animation for the Hero Hook: Scale UP as you scroll (Zoom In effect)
    const isHero = beat.id === "beat-hero-hook";
    const scale = useTransform(progress, [beat.start, beat.end], [1, 1.2]);

    // Conditional alignment
    const alignClass = {
        center: "items-center text-center justify-center",
        left: "items-start text-left ml-[5%] md:ml-[15%] justify-center",
        right: "items-end text-right mr-[5%] md:mr-[15%] justify-center"
    }[beat.align];

    return (
        <motion.div
            style={{ opacity, y, scale: isHero ? scale : 1 }}
            className={`fixed inset-0 flex flex-col px-6 z-30 pointer-events-none ${alignClass}`}
        >
            <div className="max-w-xl pointer-events-auto backdrop-blur-none p-4 rounded-xl">
                <h2 className="text-4xl md:text-6xl font-heading font-bold text-white mb-4 tracking-tighter leading-[0.95] drop-shadow-2xl">
                    {beat.title}
                </h2>
                <p className="text-lg md:text-2xl text-brand-cyan/90 font-light pl-4 border-l-4 border-brand-cyan">
                    {beat.subtitle}
                </p>
            </div>
        </motion.div>
    );
}
