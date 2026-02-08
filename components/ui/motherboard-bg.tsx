"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

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
        const gridSize = 60; // Spacing between nodes

        // Create Grid
        const createGrid = () => {
            nodes.length = 0;
            for (let x = 0; x < width; x += gridSize) {
                for (let y = 0; y < height; y += gridSize) {
                    if (Math.random() > 0.7) { // 30% chance for a node
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
            // Choose random start node
            const startNode = nodes[Math.floor(Math.random() * nodes.length)];
            if (!startNode) return;

            // Choose random direction (strictly horizontal or vertical)
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

        const draw = () => {
            ctx.fillStyle = "#020408"; // Deep charcoal/black
            ctx.fillRect(0, 0, width, height);

            // Draw Grid Lines (Subtle) - DISABLED per user request (Scion lines removal)
            // ctx.beginPath();
            // ctx.strokeStyle = "rgba(40, 60, 80, 0.3)";
            // ctx.lineWidth = 1;
            // nodes.forEach(node => {
            //     ctx.moveTo(node.x - 2, node.y);
            //     ctx.lineTo(node.x + 2, node.y);
            //     ctx.moveTo(node.x, node.y - 2);
            //     ctx.lineTo(node.x, node.y + 2);
            // });
            // ctx.stroke();

            // Draw Electrons (Pulses)
            electrons.forEach((e, i) => {
                // Move towards target
                const dx = e.tax - e.x;
                const dy = e.tay - e.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 5) {
                    e.life = 0; // Arrived
                } else {
                    const angle = Math.atan2(dy, dx);
                    e.x += Math.cos(angle) * e.speed;
                    e.y += Math.sin(angle) * e.speed;
                }

                // Fade out over life or if almost at destination
                e.life -= 0.005;

                if (e.life <= 0) {
                    electrons.splice(i, 1);
                } else {
                    // Draw Tail
                    const tailLength = 20;
                    ctx.beginPath();
                    // Gradient for electron tail
                    const grad = ctx.createLinearGradient(e.x - Math.cos(Math.atan2(dy, dx)) * tailLength, e.y - Math.sin(Math.atan2(dy, dx)) * tailLength, e.x, e.y);
                    grad.addColorStop(0, "rgba(34, 211, 238, 0)"); // Fade out tail
                    grad.addColorStop(1, `rgba(34, 211, 238, ${e.life})`); // Brand Cyan head

                    ctx.strokeStyle = grad;
                    ctx.lineWidth = 2;
                    ctx.moveTo(e.x - Math.cos(Math.atan2(dy, dx)) * tailLength, e.y - Math.sin(Math.atan2(dy, dx)) * tailLength);
                    ctx.lineTo(e.x, e.y);
                    ctx.stroke();

                    // Glowing Tip
                    ctx.beginPath();
                    ctx.fillStyle = `rgba(34, 211, 238, ${e.life})`;
                    ctx.arc(e.x, e.y, 2, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.stroke();
                }
            });

            // Randomly spawn electrons
            if (electrons.length < maxElectrons && Math.random() > 0.95) {
                spawnElectron();
            }

            requestAnimationFrame(draw);
        };

        createGrid();
        const animationId = requestAnimationFrame(draw);

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            createGrid();
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(animationId);
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
