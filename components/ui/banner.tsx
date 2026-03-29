"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const bannerVariants = cva(
  "relative overflow-hidden rounded-md border shadow-lg text-sm",
  {
    variants: {
      variant: {
        default: "bg-muted/40 border-muted/80",
        success:
          "bg-green-50 border-green-200 text-green-900 dark:bg-green-900/20 dark:border-green-800 dark:text-green-100",
        warning:
          "bg-amber-50 border-amber-200 text-amber-900 dark:bg-amber-900/20 dark:border-amber-800 dark:text-amber-100",
        info: "bg-blue-50 border-blue-200 text-blue-900 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-100",
        premium:
          "bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200 text-purple-900 dark:from-purple-900/20 dark:to-pink-900/20 dark:border-purple-800 dark:text-purple-100",
        gradient:
          "bg-slate-50 border-slate-200 text-slate-900 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100",
      },
      size: {
        default: "py-1.5 px-2.5",
        sm: "text-xs py-1 px-2",
        lg: "text-lg py-4 px-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

type BannerProps = React.ComponentProps<"div"> &
  VariantProps<typeof bannerVariants> & {
    title: string;
    description?: string;
    icon?: React.ReactNode;
    showShade?: boolean;
    show?: boolean;
    onHide?: () => void;
    action?: React.ReactNode;
    closable?: boolean;
    autoHide?: number;
  };

export function Banner({
  variant = "default",
  size = "default",
  title,
  description,
  icon,
  showShade = false,
  show = true,
  onHide,
  action,
  closable = false,
  className,
  autoHide,
  ...props
}: BannerProps) {
  React.useEffect(() => {
    if (!autoHide || !onHide) return;
    const timer = window.setTimeout(() => onHide(), autoHide);
    return () => window.clearTimeout(timer);
  }, [autoHide, onHide]);

  if (!show) return null;

  return (
    <div
      className={cn(bannerVariants({ variant, size }), className)}
      role={variant === "warning" || variant === "default" ? "alert" : "status"}
      {...props}
    >
      {showShade && (
        <div className="absolute inset-0 -z-10 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      )}

      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 flex-1 items-start gap-3 sm:items-center">
          {icon && <div className="flex-shrink-0">{icon}</div>}

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center">
              <p className="font-semibold leading-tight sm:truncate">{title}</p>
            </div>
            {description && <p className="text-xs opacity-80">{description}</p>}
          </div>
        </div>

        <div className="flex w-full flex-shrink-0 items-center gap-2 sm:w-auto sm:justify-end">
          {action && action}

          {closable && (
            <button
              type="button"
              onClick={onHide}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-black/5 dark:hover:bg-white/10"
              aria-label="Close banner"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
