"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useState } from "react";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
    variant?: "primary" | "outline" | "ghost" | "glow";
    size?: "sm" | "md" | "lg";
    loading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    children?: React.ReactNode;
}

export function Button({
    className,
    variant = "primary",
    size = "md",
    loading = false,
    leftIcon,
    rightIcon,
    children,
    disabled,
    onClick,
    ...props
}: ButtonProps) {
    const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (disabled || loading) return;

        const button = e.currentTarget;
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const newRipple = { x, y, id: Date.now() };
        setRipples((prev) => [...prev, newRipple]);

        setTimeout(() => {
            setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
        }, 600);

        onClick?.(e as any);
    };

    const variants = {
        primary: "bg-brand-blue text-white hover:bg-brand-cyan hover:text-brand-navy shadow-lg shadow-brand-blue/20",
        outline: "border-2 border-brand-cyan/50 bg-transparent text-brand-cyan hover:bg-brand-cyan/10 hover:border-brand-cyan",
        ghost: "bg-transparent text-white/60 hover:text-white hover:bg-white/5",
        glow: "bg-brand-cyan text-black hover:bg-brand-cyan/90 shadow-[0_0_30px_rgba(34,211,238,0.4)] hover:shadow-[0_0_40px_rgba(34,211,238,0.6)]",
    };

    const sizes = {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-lg font-semibold",
    };

    return (
        <motion.button
            whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
            whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
            className={cn(
                "relative rounded-full transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-void",
                "disabled:pointer-events-none disabled:opacity-50",
                variants[variant],
                sizes[size],
                className
            )}
            disabled={disabled || loading}
            onClick={handleClick}
            {...props}
        >
            {/* Ripple Effect */}
            {ripples.map((ripple) => (
                <span
                    key={ripple.id}
                    className="absolute rounded-full bg-white/30 pointer-events-none"
                    style={{
                        left: ripple.x - 50,
                        top: ripple.y - 50,
                        width: 100,
                        height: 100,
                        animation: "ripple 0.6s ease-out",
                    }}
                />
            ))}

            {/* Content */}
            {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
                <>
                    {leftIcon && <span className="shrink-0">{leftIcon}</span>}
                    {children}
                    {rightIcon && <span className="shrink-0">{rightIcon}</span>}
                </>
            )}
        </motion.button>
    );
}
