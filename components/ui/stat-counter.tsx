"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";

interface StatCounterProps {
    value: number;
    duration?: number;
    prefix?: string;
    suffix?: string;
    decimals?: number;
    className?: string;
}

export function StatCounter({
    value,
    duration = 2,
    prefix = "",
    suffix = "",
    decimals = 0,
    className = "",
}: StatCounterProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [hasAnimated, setHasAnimated] = useState(false);

    const motionValue = useSpring(0, {
        duration: duration * 1000,
        bounce: 0,
    });

    const rounded = useTransform(motionValue, (latest) =>
        latest.toFixed(decimals)
    );

    useEffect(() => {
        if (isInView && !hasAnimated) {
            motionValue.set(value);
            setHasAnimated(true);
        }
    }, [isInView, value, motionValue, hasAnimated]);

    return (
        <span ref={ref} className={className}>
            {prefix}
            <motion.span>{rounded}</motion.span>
            {suffix}
        </span>
    );
}
