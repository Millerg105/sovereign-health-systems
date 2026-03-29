"use client";

import * as React from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, Zap } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface MissionSuccessDialogProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  title: string;
  description: string;
  inputPlaceholder?: string;
  primaryButtonText: string;
  onPrimaryClick: (inputValue: string) => void;
  secondaryButtonText: string;
  onSecondaryClick: () => void;
  badgeText?: string;
  badgeIcon?: React.ReactNode;
  showInput?: boolean;
}

export const MissionSuccessDialog: React.FC<MissionSuccessDialogProps> = ({
  isOpen,
  onClose,
  imageUrl,
  title,
  description,
  inputPlaceholder = "Enter a value",
  primaryButtonText,
  onPrimaryClick,
  secondaryButtonText,
  onSecondaryClick,
  badgeText,
  badgeIcon,
  showInput = false,
}) => {
  const [inputValue, setInputValue] = React.useState("");

  const handlePrimaryClick = () => {
    onPrimaryClick(inputValue);
    onClose();
  };

  const handleSecondaryClick = () => {
    onSecondaryClick();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/72 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="relative z-10 w-full max-w-md overflow-hidden rounded-[28px] border border-white/10 bg-[#06111a]/95 p-8 shadow-[0_24px_80px_rgba(0,0,0,0.45)]"
          >
            <div className="absolute inset-0 bg-[linear-gradient(140deg,rgba(34,211,238,0.08),transparent_35%,transparent_65%,rgba(59,130,246,0.08))] pointer-events-none" />

            <div className="relative text-center">
              {badgeText && (
                <div className="absolute left-0 top-0 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/80">
                  {badgeIcon}
                  <span>{badgeText}</span>
                </div>
              )}

              <Button
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-8 w-8 rounded-full px-0 text-white/70 hover:bg-white/10 hover:text-white"
                onClick={onClose}
                aria-label="Close dialog"
              >
                <X className="h-4 w-4" />
              </Button>

              <div className="mx-auto mb-5 flex h-28 w-28 items-center justify-center rounded-[26px] border border-brand-cyan/20 bg-white/5 shadow-[0_0_30px_rgba(34,211,238,0.12)]">
                <Image src={imageUrl} alt="Sovereign Systems logo" width={64} height={64} className="object-contain" />
              </div>

              <h2 className="mb-3 flex items-center justify-center gap-2 text-3xl font-heading font-bold text-white">
                <Zap className="h-5 w-5 text-brand-cyan" />
                {title}
              </h2>

              <p className="mb-6 text-sm leading-7 text-white/70">{description}</p>

              <div className="flex flex-col gap-4">
                {showInput && (
                  <Input
                    type="text"
                    placeholder={inputPlaceholder}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="border-white/10 bg-white/5 text-center text-white placeholder:text-white/35 focus-visible:ring-brand-cyan/20"
                  />
                )}
                <Button onClick={handlePrimaryClick} size="lg" className="w-full">
                  {primaryButtonText}
                </Button>
                <button
                  type="button"
                  onClick={handleSecondaryClick}
                  className="text-sm font-medium text-white/55 transition-colors hover:text-white"
                >
                  {secondaryButtonText}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
