"use client";

import React, { useEffect, useRef } from "react";

export function MotherboardBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        // Circuit Nodes
        const nodes: { x: number; y: number; active: boolean }[] = [];
        const gridSize = 60;

        const createGrid = () => {
            nodes.length = 0;
            for (let x = 0; x < width; x += gridSize) {
                for (let y = 0; y < height; y += gridSize) {
                    if (Math.random() > 0.7) {
                        nodes.push({ x, y, active: Math.random() > 0.9 });
                    }
                }
            }
        };

        // Electrons (Signals travelling)
        const electrons: { x: number; y: number; tax: number; tay: number; speed: number; life: number }[] = [];
        const maxElectrons = 20;

        const spawnElectron = () => {
            if (nodes.length === 0) return;
            const startNode = nodes[Math.floor(Math.random() * nodes.length)];
            if (!startNode) return;

            const isHorizontal = Math.random() > 0.5;
            const targetX = isHorizontal ? (Math.random() > 0.5 ? width : 0) : startNode.x;
            const targetY = isHorizontal ? startNode.y : (Math.random() > 0.5 ? height : 0);

            electrons.push({
                x: startNode.x,
                y: startNode.y,
                tax: targetX,
                tay: targetY,
                speed: 2 + Math.random() * 3,
                life: 1.0
            });
        };

        // Visibility flag — set by IntersectionObserver
        let isIntersecting = false;
        let animationId = 0;

        const draw = () => {
            ctx.fillStyle = "#020408";
            ctx.fillRect(0, 0, width, height);

            electrons.forEach((e, i) => {
                const dx = e.tax - e.x;
                const dy = e.tay - e.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 5) {
                    e.life = 0;
                } else {
                    const angle = Math.atan2(dy, dx);
                    e.x += Math.cos(angle) * e.speed;
                    e.y += Math.sin(angle) * e.speed;
                }

                e.life -= 0.005;

                if (e.life <= 0) {
                    electrons.splice(i, 1);
                } else {
                    const tailLength = 20;
                    const angle = Math.atan2(dy, dx);
                    ctx.beginPath();
                    const grad = ctx.createLinearGradient(
                        e.x - Math.cos(angle) * tailLength,
                        e.y - Math.sin(angle) * tailLength,
                        e.x, e.y
                    );
                    grad.addColorStop(0, "rgba(34, 211, 238, 0)");
                    grad.addColorStop(1, `rgba(34, 211, 238, ${e.life})`);

                    ctx.strokeStyle = grad;
                    ctx.lineWidth = 2;
                    ctx.moveTo(e.x - Math.cos(angle) * tailLength, e.y - Math.sin(angle) * tailLength);
                    ctx.lineTo(e.x, e.y);
                    ctx.stroke();

                    ctx.beginPath();
                    ctx.fillStyle = `rgba(34, 211, 238, ${e.life})`;
                    ctx.arc(e.x, e.y, 2, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.stroke();
                }
            });

            if (electrons.length < maxElectrons && Math.random() > 0.95) {
                spawnElectron();
            }

            // Only schedule next frame if still in view
            if (isIntersecting) {
                animationId = requestAnimationFrame(draw);
            }
        };

        createGrid();

        // Start/stop animation based on visibility
        const observer = new IntersectionObserver(
            (entries) => {
                isIntersecting = entries[0]?.isIntersecting ?? false;
                if (isIntersecting) {
                    cancelAnimationFrame(animationId);
                    animationId = requestAnimationFrame(draw);
                }
            },
            { threshold: 0, rootMargin: "300px" }
        );
        observer.observe(canvas);

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            createGrid();
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(animationId);
            observer.disconnect();
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full opacity-60 pointer-events-none"
        />
    );
}

// Simple overlay gradient to ensure text readability
export function MotherboardOverlay() {
    return (
        <div className="absolute inset-0 bg-gradient-to-b from-[#020408] via-transparent to-[#020408] pointer-events-none z-10" />
    );
}
