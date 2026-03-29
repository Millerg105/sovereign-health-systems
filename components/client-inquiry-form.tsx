"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ExternalLink } from "lucide-react";

import { Banner } from "@/components/ui/banner";
import AnimatedTextCycle from "@/components/ui/animated-text-cycle";
import { FileUploadCard, type UploadedFile } from "@/components/ui/file-upload-card";
import { MissionSuccessDialog } from "@/components/ui/mission-success-dialog";
import { getSupabaseBrowserClient } from "@/lib/supabase";
import { cn } from "@/lib/utils";

type FormState = {
  name: string;
  business: string;
  email: string;
  phone: string;
  location: string;
  currentSite: string;
  businessDesc: string;
  idealCustomer: string;
  differentiator: string;
  services: string[];
  dream: string;
  findYou: string[];
  contactMethod: string[];
  headache: string;
  hasLogo: string;
  colours: string;
  vibe: string[];
  timeline: string[];
  notes: string;
};

const INITIAL_FORM: FormState = {
  name: "",
  business: "",
  email: "",
  phone: "",
  location: "",
  currentSite: "",
  businessDesc: "",
  idealCustomer: "",
  differentiator: "",
  services: [],
  dream: "",
  findYou: [],
  contactMethod: [],
  headache: "",
  hasLogo: "",
  colours: "",
  vibe: [],
  timeline: [],
  notes: "",
};

const SERVICE_OPTIONS = [
  "New Website",
  "Redesign",
  "Online Booking",
  "SMS Reminders",
  "Missed Call Text-Back",
  "Google Reviews",
  "Lead Capture",
  "Chatbot",
  "Social Media",
];

const FIND_YOU_OPTIONS = ["Google", "Facebook", "Instagram", "Word of Mouth", "Yell / Checkatrade"];
const CONTACT_OPTIONS = ["Phone", "WhatsApp", "Email", "DMs", "No System"];
const VIBE_OPTIONS = ["Clean & Professional", "Bold & Modern", "Friendly & Warm", "Premium / High-End", "Surprise me"];
const TIMELINE_OPTIONS = ["ASAP", "Next 2 weeks", "Within a month", "No rush"];
const HERO_WORDS = ["Work.", "Freedom.", "Time.", "Money.", "Recognition."];
const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/webp", "application/pdf", "video/mp4"];
const MAX_FILES = 5;
const MAX_FILE_SIZE = 10 * 1024 * 1024;
const MAX_VIDEO_SECONDS = 12;
const SUPABASE_BUCKET = "CLIENT-UPLOADS";

type Status = "idle" | "active" | "complete";

const isFilled = (value: string | string[]) => {
  if (Array.isArray(value)) return value.length > 0;
  return value.trim().length > 0;
};

const formatAcceptLabel = (type: string) => {
  switch (type) {
    case "image/jpeg":
      return "JPG";
    case "image/png":
      return "PNG";
    case "image/webp":
      return "WEBP";
    case "application/pdf":
      return "PDF";
    case "video/mp4":
      return "MP4";
    default:
      return type;
  }
};

const getFileId = (file: File) => `${file.name}-${file.size}-${file.lastModified}`;

const sanitizeFilename = (value: string) => value.replace(/[^a-zA-Z0-9._-]/g, "-");

const readVideoDuration = (file: File) =>
  new Promise<number>((resolve, reject) => {
    const video = document.createElement("video");
    const objectUrl = URL.createObjectURL(file);

    const cleanup = () => {
      URL.revokeObjectURL(objectUrl);
      video.removeAttribute("src");
      video.load();
    };

    video.preload = "metadata";
    video.onloadedmetadata = () => {
      const duration = video.duration;
      cleanup();
      resolve(duration);
    };
    video.onerror = () => {
      cleanup();
      reject(new Error(`Could not read video metadata for ${file.name}.`));
    };
    video.src = objectUrl;
  });

const getStatus = (state: FormState, keys: (keyof FormState)[], required: (keyof FormState)[] = []): Status => {
  const anyFilled = keys.some((key) => isFilled(state[key]));
  const allRequired = required.length > 0 ? required.every((key) => isFilled(state[key])) : anyFilled;

  if (allRequired) return "complete";
  if (anyFilled) return "active";
  return "idle";
};

function Subsection({ status, children, label = "Activated" }: { status: Status; children: React.ReactNode; label?: string }) {
  return (
    <div
      className={cn(
        "relative rounded-[18px] border p-4 transition-all duration-300",
        status === "idle" && "border-white/5 bg-white/[0.01]",
        status === "active" && "border-brand-cyan/20 bg-brand-cyan/[0.03]",
        status === "complete" && "border-emerald-400/35 bg-[linear-gradient(180deg,rgba(16,185,129,0.08),rgba(34,211,238,0.04))] shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_0_24px_rgba(16,185,129,0.08)]"
      )}
    >
      {status !== "idle" && (
        <div className={cn("mb-3 text-[10px] font-medium uppercase tracking-[0.14em]", status === "complete" ? "text-emerald-300" : "text-white/45")}>
          {status === "complete" ? label : "In progress"}
        </div>
      )}
      {children}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/65">{label}</span>
      {children}
    </label>
  );
}

function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn(
        "w-full rounded-[18px] border border-white/10 bg-[#09111b]/80 px-4 py-4 text-sm text-white outline-none transition-all duration-200 placeholder:text-white/28 focus:border-brand-cyan focus:bg-[#0b1622] focus:shadow-[0_0_0_3px_rgba(34,211,238,0.08),0_0_24px_rgba(34,211,238,0.08)]",
        props.className
      )}
    />
  );
}

function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={cn(
        "min-h-[110px] w-full rounded-[18px] border border-white/10 bg-[#09111b]/80 px-4 py-4 text-sm text-white outline-none transition-all duration-200 placeholder:text-white/28 focus:border-brand-cyan focus:bg-[#0b1622] focus:shadow-[0_0_0_3px_rgba(34,211,238,0.08),0_0_24px_rgba(34,211,238,0.08)]",
        props.className
      )}
    />
  );
}

function SelectInput(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={cn(
        "w-full rounded-[18px] border border-white/10 bg-[#09111b]/80 px-4 py-4 text-sm text-white outline-none transition-all duration-200 focus:border-brand-cyan focus:bg-[#0b1622] focus:shadow-[0_0_0_3px_rgba(34,211,238,0.08),0_0_24px_rgba(34,211,238,0.08)]",
        props.className
      )}
    />
  );
}

function ChipGroup({
  options,
  selected,
  onToggle,
}: {
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2.5">
      {options.map((option) => {
        const active = selected.includes(option);
        return (
          <button
            key={option}
            type="button"
            onClick={() => onToggle(option)}
            className={cn(
              "rounded-full border px-4 py-2.5 text-sm transition-all duration-200",
              active
                ? "border-brand-cyan/50 bg-[linear-gradient(180deg,rgba(34,211,238,0.14),rgba(59,130,246,0.1))] text-cyan-50 shadow-[0_0_18px_rgba(34,211,238,0.1)]"
                : "border-white/10 bg-[#09111b]/60 text-white/70 hover:border-brand-cyan/35 hover:-translate-y-px"
            )}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}

export function ClientInquiryForm() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [lastSubmissionFileCount, setLastSubmissionFileCount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let animationFrameId = 0;
    let isRunning = false;
    const particles: Array<{ x: number; y: number; vx: number; vy: number; life: number; age: number }> = [];
    const mouse = { x: -1000, y: -1000 };
    let particleCount = window.innerWidth < 640 ? 140 : window.innerWidth < 1024 ? 220 : 340;
    let trailOpacity = window.innerWidth < 768 ? 0.18 : 0.12;

    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const resetParticle = (particle: (typeof particles)[number]) => {
      particle.x = Math.random() * width;
      particle.y = Math.random() * height;
      particle.vx = 0;
      particle.vy = 0;
      particle.life = 100 + Math.random() * 180;
      particle.age = Math.random() * particle.life;
    };

    const populateParticles = () => {
      particles.length = 0;
      for (let i = 0; i < particleCount; i += 1) {
        const particle = { x: 0, y: 0, vx: 0, vy: 0, life: 0, age: 0 };
        resetParticle(particle);
        particles.push(particle);
      }
    };

    const render = () => {
      isRunning = true;
      ctx.fillStyle = `rgba(3, 3, 3, ${trailOpacity})`;
      ctx.fillRect(0, 0, width, height);

      particles.forEach((particle) => {
        const angle = (Math.cos(particle.x * 0.0048) + Math.sin(particle.y * 0.0052)) * Math.PI;
        particle.vx += Math.cos(angle) * 0.18;
        particle.vy += Math.sin(angle) * 0.18;

        const dx = mouse.x - particle.x;
        const dy = mouse.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const radius = 150;

        if (distance < radius) {
          const force = (radius - distance) / radius;
          particle.vx -= dx * force * 0.03;
          particle.vy -= dy * force * 0.03;
        }

        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vx *= 0.95;
        particle.vy *= 0.95;
        particle.age += 1;

        if (particle.age >= particle.life) resetParticle(particle);
        if (particle.x < 0) particle.x = width;
        if (particle.x > width) particle.x = 0;
        if (particle.y < 0) particle.y = height;
        if (particle.y > height) particle.y = 0;

        const fade = 1 - Math.abs(particle.age / particle.life - 0.5) * 2;
        ctx.globalAlpha = fade * 0.72;
        ctx.fillStyle = "#22d3ee";
        ctx.fillRect(particle.x, particle.y, 1.4, 1.4);
      });

      animationFrameId = window.requestAnimationFrame(render);
    };

    const handleResize = () => {
      particleCount = window.innerWidth < 640 ? 140 : window.innerWidth < 1024 ? 220 : 340;
      trailOpacity = window.innerWidth < 768 ? 0.18 : 0.12;
      setCanvasSize();
      populateParticles();
    };

    setCanvasSize();
    populateParticles();
    render();

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        isRunning = false;
        cancelAnimationFrame(animationFrameId);
      } else if (!isRunning) {
        render();
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };

    const clearMouse = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", clearMouse);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", clearMouse);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const canSubmit = useMemo(() => {
    return [form.name, form.business, form.email, form.businessDesc].every((value) => String(value).trim().length > 0);
  }, [form.business, form.businessDesc, form.email, form.name]);

  const statuses = {
    aboutCore: getStatus(form, ["name", "business"], ["name", "business"]),
    aboutContact: getStatus(form, ["email", "phone"], ["email"]),
    aboutLocation: getStatus(form, ["location", "currentSite"]),
    businessDesc: getStatus(form, ["businessDesc"], ["businessDesc"]),
    businessIdeal: getStatus(form, ["idealCustomer"]),
    businessDifferentiator: getStatus(form, ["differentiator"]),
    services: getStatus(form, ["services"]),
    dream: getStatus(form, ["dream"]),
    findYou: getStatus(form, ["findYou"]),
    contactMethod: getStatus(form, ["contactMethod"]),
    headache: getStatus(form, ["headache"]),
    branding: getStatus(form, ["hasLogo", "colours"]),
    vibe: getStatus(form, ["vibe"]),
    timeline: getStatus(form, ["timeline"]),
    notes: getStatus(form, ["notes"]),
  };

  const updateField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const toggleArrayValue = (key: "services" | "findYou" | "contactMethod" | "vibe" | "timeline", value: string) => {
    setForm((prev) => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter((entry) => entry !== value)
        : [...prev[key], value],
    }));
  };

  const handleFileRemove = (id: string) => {
    const target = uploadedFiles.find((file) => file.id === id);
    if (target?.storagePath) {
      const supabase = getSupabaseBrowserClient();
      supabase.storage.from(SUPABASE_BUCKET).remove([target.storagePath]).catch(() => null);
    }

    setUploadedFiles((prev) => prev.filter((file) => file.id !== id));
  };

  const handleFilesChange = async (files: File[]) => {
    setErrorMessage(null);

    const existingIds = new Set(uploadedFiles.map((file) => file.id));
    const availableSlots = MAX_FILES - uploadedFiles.length;

    if (availableSlots <= 0) {
      setErrorMessage(`You can upload up to ${MAX_FILES} files.`);
      return;
    }

    const nextFiles = files.slice(0, availableSlots);

    for (const file of nextFiles) {
      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        setErrorMessage(`Unsupported file type for ${file.name}. Use ${ALLOWED_FILE_TYPES.map(formatAcceptLabel).join(", ")}.`);
        continue;
      }

      if (file.size > MAX_FILE_SIZE) {
        setErrorMessage(`${file.name} is larger than 10 MB.`);
        continue;
      }

      if (file.type === "video/mp4") {
        try {
          const duration = await readVideoDuration(file);
          if (duration > MAX_VIDEO_SECONDS) {
            setErrorMessage(`${file.name} is longer than ${MAX_VIDEO_SECONDS} seconds.`);
            continue;
          }
        } catch (error) {
          setErrorMessage(error instanceof Error ? error.message : `Could not validate ${file.name}.`);
          continue;
        }
      }

      const id = getFileId(file);
      if (existingIds.has(id)) continue;
      existingIds.add(id);

      const uploadingEntry: UploadedFile = {
        id,
        file,
        progress: 20,
        status: "uploading",
      };

      setUploadedFiles((prev) => [...prev, uploadingEntry]);

      try {
        const supabase = getSupabaseBrowserClient();
        const extension = file.name.split(".").pop() || "file";
        const storagePath = `client-inquiry/${Date.now()}-${Math.random().toString(36).slice(2, 10)}-${sanitizeFilename(file.name.replace(new RegExp(`\\.${extension}$`), ""))}.${extension}`;

        const { error } = await supabase.storage.from(SUPABASE_BUCKET).upload(storagePath, file, {
          cacheControl: "3600",
          upsert: false,
          contentType: file.type,
        });

        if (error) throw error;

        const { data } = supabase.storage.from(SUPABASE_BUCKET).getPublicUrl(storagePath);

        setUploadedFiles((prev) =>
          prev.map((entry) =>
            entry.id === id
              ? {
                  ...entry,
                  progress: 100,
                  status: "completed",
                  storagePath,
                  url: data.publicUrl,
                }
              : entry,
          ),
        );
      } catch (error) {
        const message = error instanceof Error ? error.message : `Could not upload ${file.name}.`;
        setUploadedFiles((prev) =>
          prev.map((entry) =>
            entry.id === id
              ? {
                  ...entry,
                  progress: 100,
                  status: "error",
                  errorMessage: message,
                }
              : entry,
          ),
        );
        setErrorMessage(message);
      }
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!canSubmit || isSubmitting) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const failedUploads = uploadedFiles.filter((entry) => entry.status === "error");
      const stillUploading = uploadedFiles.filter((entry) => entry.status === "uploading");

      if (failedUploads.length > 0) {
        throw new Error("One or more files failed to upload. Remove them or try again before sending your brief.");
      }

      if (stillUploading.length > 0) {
        throw new Error("Please wait for your files to finish uploading before sending your brief.");
      }

      const uploadedFileLinks = uploadedFiles
        .filter((entry) => entry.status === "completed" && entry.url)
        .map((entry) => ({
          name: entry.file.name,
          url: entry.url,
          type: entry.file.type,
          size: entry.file.size,
        }));

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "Client Inquiry",
          name: form.name,
          email: form.email,
          business: form.business,
          phone: form.phone,
          location: form.location,
          currentSite: form.currentSite,
          businessDesc: form.businessDesc,
          idealCustomer: form.idealCustomer,
          differentiator: form.differentiator,
          dream: form.dream,
          headache: form.headache,
          hasLogo: form.hasLogo,
          colours: form.colours,
          notes: form.notes,
          services: form.services,
          findYou: form.findYou,
          contactMethod: form.contactMethod,
          vibe: form.vibe,
          timeline: form.timeline,
          uploadedFiles: uploadedFileLinks,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.message || data?.error || "Something went wrong while sending your brief.");
      }

      setShowSuccess(true);
      setLastSubmissionFileCount(uploadedFiles.length);
      setForm(INITIAL_FORM);
      setUploadedFiles([]);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Unable to send your brief right now.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <main className="relative min-h-screen overflow-x-hidden bg-[#030303] text-white">
        <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_top_center,rgba(34,211,238,0.1),transparent_34%),radial-gradient(circle_at_80%_22%,rgba(59,130,246,0.11),transparent_28%),linear-gradient(180deg,#010203_0%,#020508_45%,#010203_100%)]" />
        <div className="pointer-events-none fixed inset-0 z-[1] opacity-[0.12] [background-image:radial-gradient(rgba(34,211,238,0.22)_0.6px,transparent_0.6px)] [background-size:24px_24px] [mask-image:linear-gradient(to_bottom,rgba(0,0,0,0.5),transparent_90%)]" />
        <div className="pointer-events-none fixed inset-0 z-[1] bg-[linear-gradient(rgba(34,211,238,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.045)_1px,transparent_1px)] [background-size:42px_42px] opacity-40 [mask-image:radial-gradient(circle_at_50%_22%,black,transparent_78%)]" />
        <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-[2] opacity-80" />
        <div className="pointer-events-none fixed inset-0 z-[3] bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.08),rgba(0,0,0,0.48)),linear-gradient(180deg,rgba(0,0,0,0.04),rgba(0,0,0,0.38))] backdrop-blur-[1.5px]" />
        <div className="pointer-events-none fixed left-1/2 top-[90px] z-[4] h-[420px] w-[min(72vw,900px)] -translate-x-1/2 bg-[radial-gradient(ellipse,rgba(34,211,238,0.14)_0%,rgba(34,211,238,0.05)_42%,transparent_72%)] blur-[28px]" />
        <div className="pointer-events-none fixed right-[-12rem] top-[18rem] z-[1] h-[28rem] w-[28rem] rounded-full bg-brand-cyan/10 blur-[140px]" />
        <div className="pointer-events-none fixed left-[-10rem] bottom-[12rem] z-[1] h-[24rem] w-[24rem] rounded-full bg-blue-600/10 blur-[130px]" />

        <div className="relative z-10 mx-auto max-w-[920px] px-[18px] pb-20 pt-7 sm:px-5 md:px-6">
          <div className="mb-12 flex flex-col items-start justify-between gap-6 pt-4 md:flex-row md:items-center">
            <div className="flex min-w-0 items-center gap-4">
              <div className="flex h-[58px] w-[58px] flex-shrink-0 items-center justify-center rounded-[18px] border border-white/10 bg-white/[0.03] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_0_24px_rgba(34,211,238,0.1)] backdrop-blur-xl">
                <Image src="/logo.png" alt="Sovereign Systems" width={40} height={40} className="object-contain drop-shadow-[0_0_12px_rgba(34,211,238,0.2)]" />
              </div>
              <div>
                <h1 className="font-heading text-[clamp(1.8rem,2vw,2.2rem)] font-bold leading-none tracking-[-0.03em] text-white">Sovereign Systems</h1>
                <p className="mt-1.5 font-mono text-xs uppercase tracking-[0.22em] text-white/60">Private Client Intake</p>
              </div>
            </div>

            <div className="flex w-full flex-wrap gap-3 md:w-auto md:justify-end">
              <div className="inline-flex min-h-10 items-center gap-2 rounded-full border border-brand-cyan/20 bg-black/60 px-4 font-mono text-[11px] uppercase tracking-[0.16em] text-white/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_12px_40px_rgba(0,0,0,0.25)]">
                <span className="h-[7px] w-[7px] rounded-full bg-brand-cyan shadow-[0_0_14px_rgba(34,211,238,0.55)]" /> Founder-Led Builds
              </div>
              <div className="inline-flex min-h-10 items-center gap-2 rounded-full border border-brand-cyan/20 bg-black/60 px-4 font-mono text-[11px] uppercase tracking-[0.16em] text-white/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_12px_40px_rgba(0,0,0,0.25)]">
                <span className="h-[7px] w-[7px] rounded-full bg-brand-cyan shadow-[0_0_14px_rgba(34,211,238,0.55)]" /> Reply Within 48 Hours
              </div>
            </div>
          </div>

          <Banner
            title="This is your private brief"
            description="Want to see the full Sovereign experience before you send it through?"
            showShade
            icon={<span className="h-2 w-2 rounded-full bg-brand-cyan shadow-[0_0_12px_rgba(34,211,238,0.5)]" />}
            className="mb-5 rounded-[24px] border-white/10 bg-black/50 px-4 py-3 text-white backdrop-blur-xl [&_p]:text-white [&_p:last-child]:text-white/70"
            action={
              <Link
                href="https://www.sovereignsystem.co.uk/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full min-h-[42px] items-center justify-center rounded-full border border-brand-cyan/25 bg-brand-cyan/10 px-4 font-mono text-xs font-semibold uppercase tracking-[0.08em] text-cyan-50 transition-all hover:-translate-y-px hover:border-brand-cyan/45 hover:bg-brand-cyan/15 hover:shadow-[0_0_18px_rgba(34,211,238,0.12)] sm:w-auto sm:tracking-[0.12em]"
              >
                <span className="sm:hidden">Visit Main Site</span>
                <span className="hidden sm:inline">Visit SovereignSystem.co.uk</span>
              </Link>
            }
          />

          <section className="relative mb-9 overflow-hidden rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(4,10,16,0.72),rgba(3,8,13,0.84))] px-6 py-8 shadow-[0_24px_80px_rgba(0,0,0,0.45),0_0_60px_rgba(34,211,238,0.08),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-[18px] sm:px-8">
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(34,211,238,0.08),transparent_38%,transparent_60%,rgba(59,130,246,0.1))]" />
            <div className="relative inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-white/80">
              <span className="h-2 w-2 rounded-full bg-[linear-gradient(135deg,#22d3ee,#3b82f6)] shadow-[0_0_18px_rgba(34,211,238,0.45)]" /> Premium Briefing Experience
            </div>
            <h2 className="relative mt-5 max-w-[820px] font-heading text-[clamp(3rem,8vw,5.7rem)] font-bold leading-[0.98] tracking-[-0.05em] text-white [text-shadow:0_0_24px_rgba(0,0,0,0.35)]">
              Shape the System That <span className="bg-[linear-gradient(90deg,#3b82f6,#22d3ee,#66e2ff)] bg-clip-text text-transparent">Wins You More <AnimatedTextCycle words={HERO_WORDS} interval={2800} className="bg-[linear-gradient(90deg,#3b82f6,#22d3ee,#66e2ff)] bg-clip-text text-transparent" /></span>
            </h2>
            <p className="relative mt-5 max-w-[700px] text-[clamp(1.03rem,1.8vw,1.22rem)] leading-[1.75] text-white/70">
              Share the essentials behind your business, your offer, and the bottlenecks slowing growth. We use this brief to shape a sharper website, stronger automation, and a cleaner path to revenue.
            </p>
            <div className="mt-6 flex flex-wrap gap-x-7 gap-y-3 font-mono text-xs uppercase tracking-[0.16em] text-white/55">
              <span className="inline-flex items-center gap-2 before:h-1.5 before:w-1.5 before:rounded-full before:bg-brand-cyan before:content-['']">Live project scoping</span>
              <span className="inline-flex items-center gap-2 before:h-1.5 before:w-1.5 before:rounded-full before:bg-brand-cyan before:content-['']">Built around your workflow</span>
              <span className="inline-flex items-center gap-2 before:h-1.5 before:w-1.5 before:rounded-full before:bg-brand-cyan before:content-['']">Limited monthly intake</span>
            </div>
          </section>

          <div className="mb-10 flex flex-wrap gap-3">
            {[
              ["1", "Fill this in"],
              ["2", "We send a proposal"],
              ["3", "We build your system"],
            ].map(([step, label]) => (
              <div key={step} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/45 px-4 py-2.5 font-mono text-xs uppercase tracking-[0.08em] text-white/70 backdrop-blur-xl">
                <span className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-[linear-gradient(135deg,#22d3ee,#3b82f6)] text-[11px] font-semibold text-[#041317] shadow-[0_0_16px_rgba(34,211,238,0.3)]">{step}</span>
                {label}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {errorMessage && (
              <div className="rounded-[22px] border border-rose-400/30 bg-rose-400/10 px-5 py-4 text-sm text-rose-100 shadow-[0_0_20px_rgba(251,113,133,0.08)]">
                {errorMessage}
              </div>
            )}

            <section className="overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(5,11,18,0.82),rgba(3,8,13,0.92))] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-[18px]">
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-[38px] w-[38px] items-center justify-center rounded-xl border border-brand-cyan/20 bg-[linear-gradient(180deg,rgba(34,211,238,0.12),rgba(59,130,246,0.08))] font-mono text-xs tracking-[0.12em] text-cyan-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_0_18px_rgba(34,211,238,0.08)]">01</div>
                <div>
                  <h3 className="font-heading text-[clamp(1.6rem,3vw,2rem)] font-semibold tracking-[-0.03em] text-white">About You</h3>
                  <p className="mt-1 font-mono text-[13px] uppercase tracking-[0.08em] text-white/35">The essentials behind the enquiry</p>
                </div>
              </div>

              <div className="grid gap-4">
                <Subsection status={statuses.aboutCore}>
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label="Your Name"><TextInput value={form.name} onChange={(e) => updateField("name", e.target.value)} placeholder="e.g. Dave Smith" required /></Field>
                    <Field label="Business Name"><TextInput value={form.business} onChange={(e) => updateField("business", e.target.value)} placeholder="e.g. Smith's Paving" required /></Field>
                  </div>
                </Subsection>

                <Subsection status={statuses.aboutContact}>
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label="Email"><TextInput type="email" value={form.email} onChange={(e) => updateField("email", e.target.value)} placeholder="dave@example.com" required /></Field>
                    <Field label="Phone"><TextInput value={form.phone} onChange={(e) => updateField("phone", e.target.value)} placeholder="07xxx xxxxxx" /></Field>
                  </div>
                </Subsection>

                <Subsection status={statuses.aboutLocation}>
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label="Area You Cover"><TextInput value={form.location} onChange={(e) => updateField("location", e.target.value)} placeholder="e.g. Wigan & surrounding areas" /></Field>
                    <Field label="Current Website (if any)"><TextInput value={form.currentSite} onChange={(e) => updateField("currentSite", e.target.value)} placeholder="e.g. www.smithspaving.co.uk" /></Field>
                  </div>
                </Subsection>
              </div>
            </section>

            <section className="overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(5,11,18,0.82),rgba(3,8,13,0.92))] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-[18px]">
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-[38px] w-[38px] items-center justify-center rounded-xl border border-brand-cyan/20 bg-[linear-gradient(180deg,rgba(34,211,238,0.12),rgba(59,130,246,0.08))] font-mono text-xs tracking-[0.12em] text-cyan-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_0_18px_rgba(34,211,238,0.08)]">02</div>
                <div>
                  <h3 className="font-heading text-[clamp(1.6rem,3vw,2rem)] font-semibold tracking-[-0.03em] text-white">Your Business</h3>
                  <p className="mt-1 font-mono text-[13px] uppercase tracking-[0.08em] text-white/35">What you do and who you serve best</p>
                </div>
              </div>

              <div className="grid gap-4">
                <Subsection status={statuses.businessDesc}><Field label="What does your business do? One or two lines is perfect."><TextArea value={form.businessDesc} onChange={(e) => updateField("businessDesc", e.target.value)} placeholder="e.g. We do driveways, patios, and landscaping for homeowners across Greater Manchester" required /></Field></Subsection>
                <Subsection status={statuses.businessIdeal}><Field label="Who's your ideal customer?"><TextInput value={form.idealCustomer} onChange={(e) => updateField("idealCustomer", e.target.value)} placeholder="e.g. Homeowners, landlords, brides-to-be, gym goers..." /></Field></Subsection>
                <Subsection status={statuses.businessDifferentiator}><Field label="What makes you different from competitors?"><TextInput value={form.differentiator} onChange={(e) => updateField("differentiator", e.target.value)} placeholder="e.g. We turn up on time and don't ghost people" /></Field></Subsection>
              </div>
            </section>

            <section className="overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(5,11,18,0.82),rgba(3,8,13,0.92))] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-[18px]">
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-[38px] w-[38px] items-center justify-center rounded-xl border border-brand-cyan/20 bg-[linear-gradient(180deg,rgba(34,211,238,0.12),rgba(59,130,246,0.08))] font-mono text-xs tracking-[0.12em] text-cyan-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_0_18px_rgba(34,211,238,0.08)]">03</div>
                <div>
                  <h3 className="font-heading text-[clamp(1.6rem,3vw,2rem)] font-semibold tracking-[-0.03em] text-white">What Do You Need?</h3>
                  <p className="mt-1 font-mono text-[13px] uppercase tracking-[0.08em] text-white/35">The systems and outcomes you want next</p>
                </div>
              </div>

              <div className="grid gap-4">
                <Subsection status={statuses.services}>
                  <Field label="Tick everything you're interested in"><ChipGroup options={SERVICE_OPTIONS} selected={form.services} onToggle={(value) => toggleArrayValue("services", value)} /></Field>
                </Subsection>
                <Subsection status={statuses.dream}><Field label="What's the dream? What would make your life easier?"><TextArea value={form.dream} onChange={(e) => updateField("dream", e.target.value)} placeholder="e.g. I just want people to be able to book online so I'm not answering the phone while I'm on a job" /></Field></Subsection>
              </div>
            </section>

            <section className="overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(5,11,18,0.82),rgba(3,8,13,0.92))] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-[18px]">
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-[38px] w-[38px] items-center justify-center rounded-xl border border-brand-cyan/20 bg-[linear-gradient(180deg,rgba(34,211,238,0.12),rgba(59,130,246,0.08))] font-mono text-xs tracking-[0.12em] text-cyan-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_0_18px_rgba(34,211,238,0.08)]">04</div>
                <div>
                  <h3 className="font-heading text-[clamp(1.6rem,3vw,2rem)] font-semibold tracking-[-0.03em] text-white">How Things Work Now</h3>
                  <p className="mt-1 font-mono text-[13px] uppercase tracking-[0.08em] text-white/35">Your current lead flow and friction points</p>
                </div>
              </div>

              <div className="grid gap-4">
                <Subsection status={statuses.findYou}><Field label="How do customers find you?"><ChipGroup options={FIND_YOU_OPTIONS} selected={form.findYou} onToggle={(value) => toggleArrayValue("findYou", value)} /></Field></Subsection>
                <Subsection status={statuses.contactMethod}><Field label="How do they book or get in touch?"><ChipGroup options={CONTACT_OPTIONS} selected={form.contactMethod} onToggle={(value) => toggleArrayValue("contactMethod", value)} /></Field></Subsection>
                <Subsection status={statuses.headache}><Field label="What's the biggest headache right now?"><TextArea value={form.headache} onChange={(e) => updateField("headache", e.target.value)} placeholder="e.g. I miss calls when I'm on a job and lose work to competitors" /></Field></Subsection>
              </div>
            </section>

            <section className="overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(5,11,18,0.82),rgba(3,8,13,0.92))] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-[18px]">
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-[38px] w-[38px] items-center justify-center rounded-xl border border-brand-cyan/20 bg-[linear-gradient(180deg,rgba(34,211,238,0.12),rgba(59,130,246,0.08))] font-mono text-xs tracking-[0.12em] text-cyan-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_0_18px_rgba(34,211,238,0.08)]">05</div>
                <div>
                  <h3 className="font-heading text-[clamp(1.6rem,3vw,2rem)] font-semibold tracking-[-0.03em] text-white">Design & Style</h3>
                  <p className="mt-1 font-mono text-[13px] uppercase tracking-[0.08em] text-white/35">The visual direction we should build around</p>
                </div>
              </div>

              <div className="grid gap-4">
                <Subsection status={statuses.branding}>
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label="Got a logo?">
                      <SelectInput value={form.hasLogo} onChange={(e) => updateField("hasLogo", e.target.value)}>
                        <option value="">Select...</option>
                        <option value="Yes">Yes - I'll send it over</option>
                        <option value="No">No - I need one</option>
                        <option value="Needs updating">Got one but it needs updating</option>
                      </SelectInput>
                    </Field>
                    <Field label="Any brand colours?"><TextInput value={form.colours} onChange={(e) => updateField("colours", e.target.value)} placeholder="e.g. Blue and white, same as my van" /></Field>
                  </div>
                </Subsection>
                <Subsection status={statuses.vibe}><Field label="What vibe are you after?"><ChipGroup options={VIBE_OPTIONS} selected={form.vibe} onToggle={(value) => toggleArrayValue("vibe", value)} /></Field></Subsection>
                <Subsection status={uploadedFiles.length > 0 ? "complete" : "idle"} label="Files Ready">
                  <div className="space-y-4">
                    <div>
                      <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.14em] text-white/65">Attachments & References</div>
                      <p className="text-sm leading-6 text-white/60">
                        Logos, PDFs, image references, and short video references welcome. For video references, only upload cinematic shots of work or company. Max 12 seconds.
                      </p>
                    </div>
                    <FileUploadCard files={uploadedFiles} onFilesChange={handleFilesChange} onFileRemove={handleFileRemove} />
                  </div>
                </Subsection>
              </div>
            </section>

            <section className="overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(5,11,18,0.82),rgba(3,8,13,0.92))] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-[18px]">
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-[38px] w-[38px] items-center justify-center rounded-xl border border-brand-cyan/20 bg-[linear-gradient(180deg,rgba(34,211,238,0.12),rgba(59,130,246,0.08))] font-mono text-xs tracking-[0.12em] text-cyan-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_0_18px_rgba(34,211,238,0.08)]">06</div>
                <div>
                  <h3 className="font-heading text-[clamp(1.6rem,3vw,2rem)] font-semibold tracking-[-0.03em] text-white">Timeline</h3>
                  <p className="mt-1 font-mono text-[13px] uppercase tracking-[0.08em] text-white/35">Timing, urgency, and any final context</p>
                </div>
              </div>

              <div className="grid gap-4">
                <Subsection status={statuses.timeline}><Field label="When do you need this?"><ChipGroup options={TIMELINE_OPTIONS} selected={form.timeline} onToggle={(value) => toggleArrayValue("timeline", value)} /></Field></Subsection>
                <Subsection status={statuses.notes}><Field label="Anything else we should know?"><TextArea value={form.notes} onChange={(e) => updateField("notes", e.target.value)} placeholder="Whatever comes to mind - we're all ears" /></Field></Subsection>
              </div>
            </section>

            <div className="px-2 py-6 text-center">
              <button
                type="submit"
                disabled={!canSubmit || isSubmitting}
                className="min-w-[min(100%,360px)] rounded-full border border-brand-cyan/45 bg-[linear-gradient(90deg,#14c6c4_0%,#22d3ee_52%,#35e6d1_100%)] px-8 py-[18px] text-base font-semibold text-[#031316] shadow-[0_0_20px_rgba(34,211,238,0.24)] transition-all hover:-translate-y-0.5 hover:brightness-105 hover:shadow-[0_0_30px_rgba(34,211,238,0.38)] disabled:cursor-not-allowed disabled:saturate-50 disabled:opacity-40 disabled:shadow-none"
              >
                {isSubmitting ? "Sending..." : "Send Private Brief"}
              </button>
              <p className="mt-4 font-mono text-xs uppercase tracking-[0.08em] text-white/35">
                Complete the core fields first. Upload up to 5 files - 10 MB each - including short MP4 references up to 12 seconds.
              </p>
            </div>
          </form>

          <div className="pt-6 text-center">
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-white/35">
              <Link href="https://www.sovereignsystem.co.uk/" target="_blank" rel="noopener noreferrer" className="text-cyan-200 transition-colors hover:text-white">
                sovereignsystem.co.uk
              </Link>{" "}
              • Sovereign Systems • Wigan, Greater Manchester
            </p>
          </div>
        </div>
      </main>

      <MissionSuccessDialog
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        imageUrl="/logo.png"
        title="Well done."
        description={lastSubmissionFileCount > 0
          ? "Your brief and attached references have been sent to my email. I will review everything together and come back with a sharper proposal."
          : "Your brief has been sent to my email. If you want to send extra references afterwards, reply with attachments and I will fold them into the concept."}
        primaryButtonText="Close Brief"
        onPrimaryClick={() => setShowSuccess(false)}
        secondaryButtonText="Visit Main Website"
        onSecondaryClick={() => window.open("https://www.sovereignsystem.co.uk/", "_blank", "noopener,noreferrer")}
        badgeText="Private Brief"
        badgeIcon={<ExternalLink className="h-3 w-3" />}
        showInput={false}
      />
    </>
  );
}
