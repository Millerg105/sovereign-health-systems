"use client";

import { ChevronDown } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type DropdownMenuProps = {
  options: {
    label: string;
    onClick: () => void;
    Icon?: React.ReactNode;
  }[];
  children: React.ReactNode;
  triggerVariant?: "primary" | "secondary" | "pill";
  triggerClassName?: string;
  menuClassName?: string;
};

const DropdownMenu = ({ options, children, triggerVariant = "secondary", triggerClassName, menuClassName }: DropdownMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDesktopHover, setIsDesktopHover] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    if (isDesktopHover) return;
    setIsOpen(!isOpen);
  };

  const openDropdown = () => setIsOpen(true);
  const closeDropdown = () => setIsOpen(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");

    const updateHoverSupport = () => {
      setIsDesktopHover(mediaQuery.matches);
    };

    updateHoverSupport();

    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    mediaQuery.addEventListener("change", updateHoverSupport);
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      mediaQuery.removeEventListener("change", updateHoverSupport);
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="relative"
      onMouseEnter={isDesktopHover ? openDropdown : undefined}
      onMouseLeave={isDesktopHover ? closeDropdown : undefined}
    >
      <motion.button
        type="button"
        onClick={toggleDropdown}
        onFocus={openDropdown}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        whileHover={triggerVariant === "pill" ? undefined : { scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        className={
          triggerVariant === "pill"
            ? `inline-flex items-center justify-center gap-1 ${triggerClassName ?? ""}`
            : `${triggerVariant === "primary" ? "btn-premium-primary" : "btn-premium-secondary"} inline-flex items-center justify-center gap-2 px-4 py-2 font-medium ${triggerClassName ?? ""}`
        }
      >
        {children ?? "Menu"}
        <motion.span
          className={triggerVariant === "pill" ? "ml-0" : "ml-2"}
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
        >
          <ChevronDown className={triggerVariant === "pill" ? "h-3 w-3 opacity-70" : "h-4 w-4"} />
        </motion.span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: -6, scale: 0.97, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: -6, scale: 0.97, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={`absolute right-0 z-[70] w-72 mt-2 p-1.5 bg-black/90 border border-brand-cyan/25 rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.45)] backdrop-blur-xl flex flex-col gap-1.5 ${menuClassName ?? ""}`}
          >
            {options && options.length > 0 ? (
              options.map((option, index) => (
                <motion.button
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  transition={{
                    duration: 0.16,
                    delay: index * 0.03,
                    ease: "easeInOut",
                  }}
                  whileHover={{
                    backgroundColor: "rgba(34,211,238,0.08)",
                    transition: {
                      duration: 0.4,
                      ease: "easeInOut",
                    },
                  }}
                  whileTap={{
                    scale: 0.98,
                    transition: {
                      duration: 0.2,
                      ease: "easeInOut",
                    },
                  }}
                  key={option.label}
                  onClick={() => {
                    option.onClick();
                    setIsOpen(false);
                  }}
                  className="px-3 py-3 cursor-pointer text-white/85 hover:text-[#8cf7ee] font-medium text-sm rounded-lg w-full text-left flex items-center gap-x-2 border border-transparent hover:border-brand-cyan/35 transition-colors"
                >
                  {option.Icon}
                  {option.label}
                </motion.button>
              ))
            ) : (
              <div className="px-4 py-2 text-white text-xs">No options</div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export { DropdownMenu };
