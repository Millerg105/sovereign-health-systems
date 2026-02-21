"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useState } from "react";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
    variant?: "primary" | "secondary" | "outline" | "ghost" | "glow";
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

        onClick?.(e);
    };

    const variants = {
        primary: "btn-premium-primary font-semibold",
        secondary: "btn-premium-secondary font-semibold",
        outline: "btn-premium-secondary font-semibold",
        ghost: "bg-transparent text-white/70 hover:text-white hover:bg-white/5",
        glow: "btn-premium-primary font-semibold",
    };

    const sizes = {
        sm: "px-4 py-2 text-sm min-h-10",
        md: "px-5 py-2.5 text-sm sm:text-base min-h-11",
        lg: "px-6 sm:px-7 py-3 text-sm sm:text-base md:text-lg min-h-12",
    };

    return (
        <motion.button
            whileHover={{ scale: disabled || loading ? 1 : 1.01 }}
            whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
            className={cn(
                "relative rounded-lg transition-all duration-300 flex max-w-full items-center justify-center gap-2 overflow-hidden text-center leading-tight whitespace-normal [text-wrap:balance]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-void",
                "disabled:pointer-events-none disabled:opacity-45 disabled:saturate-50 disabled:shadow-none",
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
