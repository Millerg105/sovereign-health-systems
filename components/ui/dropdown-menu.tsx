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
  triggerClassName?: string;
  menuClassName?: string;
};

const DropdownMenu = ({ options, children, triggerClassName, menuClassName }: DropdownMenuProps) => {
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
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className={`inline-flex items-center justify-center gap-2 px-4 py-2 text-white hover:text-white bg-black/80 hover:bg-black/90 shadow-[0_0_18px_rgba(0,0,0,0.3)] border border-white/15 rounded-xl backdrop-blur-md transition-colors duration-200 font-medium ${triggerClassName ?? ""}`}
      >
        {children ?? "Menu"}
        <motion.span
          className="ml-2"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
        >
          <ChevronDown className="h-4 w-4" />
        </motion.span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: -6, scale: 0.97, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: -6, scale: 0.97, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={`absolute right-0 z-[70] w-72 mt-2 p-1.5 bg-black/90 border border-white/15 rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.45)] backdrop-blur-xl flex flex-col gap-1.5 ${menuClassName ?? ""}`}
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
                    backgroundColor: "rgba(255,255,255,0.1)",
                    transition: {
                      duration: 0.4,
                      ease: "easeInOut",
                    },
                  }}
                  whileTap={{
                    scale: 0.95,
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
                  className="px-3 py-3 cursor-pointer text-white font-medium text-sm rounded-lg w-full text-left flex items-center gap-x-2"
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
