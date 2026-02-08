"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface NeuralBackgroundProps {
    className?: string;
    color?: string;
    trailOpacity?: number;
    particleCount?: number;
    speed?: number;
    intensity?: 'subtle' | 'medium' | 'hero';
}

export default function NeuralBackground({
    className,
    color = "#22d3ee", // Brand Cyan
    intensity = 'hero',
    // Allow direct overrides, otherwise derive from intensity
    trailOpacity,
    particleCount,
    speed,
}: NeuralBackgroundProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Derive sensible defaults from intensity if not explicitly set
    const resolvedTrailOpacity = trailOpacity ?? { subtle: 0.08, medium: 0.10, hero: 0.12 }[intensity];
    const resolvedParticleCount = particleCount ?? { subtle: 400, medium: 600, hero: 800 }[intensity];
    const resolvedSpeed = speed ?? { subtle: 0.6, medium: 0.8, hero: 1.0 }[intensity];

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        // Use alpha:true so the canvas is transparent — background shows through
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = container.clientWidth;
        let height = container.clientHeight;
        let particles: Particle[] = [];
        let animationFrameId: number;
        let mouse = { x: -1000, y: -1000 };

        class Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            age: number;
            life: number;

            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = 0;
                this.vy = 0;
                this.age = 0;
                this.life = Math.random() * 200 + 100;
            }

            update() {
                // Flow field angle — same formula as reference
                const angle = (Math.cos(this.x * 0.005) + Math.sin(this.y * 0.005)) * Math.PI;

                this.vx += Math.cos(angle) * 0.2 * resolvedSpeed;
                this.vy += Math.sin(angle) * 0.2 * resolvedSpeed;

                // Mouse repulsion
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const interactionRadius = 150;

                if (dist < interactionRadius) {
                    const force = (interactionRadius - dist) / interactionRadius;
                    this.vx -= dx * force * 0.05;
                    this.vy -= dy * force * 0.05;
                }

                this.x += this.vx;
                this.y += this.vy;
                this.vx *= 0.95;
                this.vy *= 0.95;

                this.age++;
                if (this.age > this.life) this.reset();

                if (this.x < 0) this.x = width;
                if (this.x > width) this.x = 0;
                if (this.y < 0) this.y = height;
                if (this.y > height) this.y = 0;
            }

            reset() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = 0;
                this.vy = 0;
                this.age = 0;
                this.life = Math.random() * 200 + 100;
            }

            draw(context: CanvasRenderingContext2D) {
                context.fillStyle = color;
                // Smooth fade-in / fade-out over lifetime
                const alpha = 1 - Math.abs((this.age / this.life) - 0.5) * 2;
                context.globalAlpha = alpha * 0.85;
                context.fillRect(this.x, this.y, 1.5, 1.5);
            }
        }

        const init = () => {
            const dpr = window.devicePixelRatio || 1;
            width = container.clientWidth;
            height = container.clientHeight;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            ctx.scale(dpr, dpr);
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;

            // Scale particle count for mobile performance
            let count = resolvedParticleCount;
            if (window.innerWidth < 768) count = Math.floor(count / 3);
            else if (window.innerWidth < 1024) count = Math.floor(count / 2);

            particles = [];
            for (let i = 0; i < count; i++) {
                particles.push(new Particle());
            }
        };

        let isVisible = true;

        const animate = () => {
            if (!ctx || !isVisible) return;

            // Trail fade — draws semi-transparent dark rect each frame
            ctx.fillStyle = `rgba(3, 3, 3, ${resolvedTrailOpacity})`;
            ctx.fillRect(0, 0, width, height);

            particles.forEach(p => {
                p.update();
                p.draw(ctx);
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        const handleResize = () => init();

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        };

        const handleMouseLeave = () => {
            mouse.x = -1000;
            mouse.y = -1000;
        };

        const handleVisibilityChange = () => {
            isVisible = document.visibilityState === 'visible';
            if (isVisible) {
                cancelAnimationFrame(animationFrameId);
                animate();
            }
        };

        init();
        animate();

        window.addEventListener("resize", handleResize);
        container.addEventListener("mousemove", handleMouseMove);
        container.addEventListener("mouseleave", handleMouseLeave);
        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            window.removeEventListener("resize", handleResize);
            container.removeEventListener("mousemove", handleMouseMove);
            container.removeEventListener("mouseleave", handleMouseLeave);
            document.removeEventListener("visibilitychange", handleVisibilityChange);
            cancelAnimationFrame(animationFrameId);
        };
    }, [color, resolvedTrailOpacity, resolvedParticleCount, resolvedSpeed]);

    return (
        <div ref={containerRef} className={cn("relative w-full h-full overflow-hidden", className)}>
            <canvas ref={canvasRef} className="block w-full h-full" style={{ transform: 'translateZ(0)' }} />
        </div>
    );
}

// Export with alternative name for compatibility
export { NeuralBackground as FlowFieldBackground };
