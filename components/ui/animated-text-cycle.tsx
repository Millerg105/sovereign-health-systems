"use client";

import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface AnimatedTextCycleProps {
  words: string[];
  interval?: number;
  className?: string;
}

export default function AnimatedTextCycle({
  words,
  interval = 5000,
  className = "",
}: AnimatedTextCycleProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [width, setWidth] = useState("auto");
  const measureRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!measureRef.current) return;
    const elements = measureRef.current.children;
    if (elements.length <= currentIndex) return;
    const nextWidth = elements[currentIndex].getBoundingClientRect().width;
    setWidth(`${nextWidth}px`);
  }, [currentIndex]);

  useEffect(() => {
    if (words.length <= 1) return;
    const timer = window.setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, interval);

    return () => window.clearInterval(timer);
  }, [interval, words.length]);

  return (
    <>
      <div
        ref={measureRef}
        aria-hidden="true"
        className="absolute opacity-0 pointer-events-none"
        style={{ visibility: "hidden" }}
      >
        {words.map((word, i) => (
          <span key={i} className={`font-bold ${className}`}>
            {word}
          </span>
        ))}
      </div>

      <motion.span
        className="relative inline-block align-baseline"
        animate={{
          width,
          transition: {
            type: "spring",
            stiffness: 150,
            damping: 15,
            mass: 1.2,
          },
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={currentIndex}
            className={`inline-block font-bold ${className}`}
            initial={{ y: -20, opacity: 0, filter: "blur(8px)" }}
            animate={{
              y: 0,
              opacity: 1,
              filter: "blur(0px)",
              transition: { duration: 0.4 },
            }}
            exit={{
              y: 20,
              opacity: 0,
              filter: "blur(8px)",
              transition: { duration: 0.3 },
            }}
            style={{ whiteSpace: "nowrap" }}
          >
            {words[currentIndex]}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </>
  );
}
