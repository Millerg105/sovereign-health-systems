"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { usePathname, useRouter } from "next/navigation";
import {
    CalendarCheck,
    Calculator,
    Code,
    FileText,
    Lightbulb,
    LogIn,
    Mail,
    Menu,
    MessageCircle,
    Phone,
    PoundSterling,
    Settings,
    Sparkles,
    Workflow,
    X,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { CONTACT_EMAIL, CONTACT_PHONE, WHATSAPP_URL } from "@/lib/constants";

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const { scrollY } = useScroll();
    const pathname = usePathname();
    const router = useRouter();

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 50);
    });

    useEffect(() => {
        if (!mobileOpen) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = prev;
        };
    }, [mobileOpen]);

    const navigateToSection = (id: string) => {
        setMobileOpen(false);
        if (pathname === "/") {
            document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
            return;
        }

        router.push(`/#${id}`);
    };

    const openExternal = (url: string) => {
        window.open(url, "_blank", "noopener,noreferrer");
    };

    const painPointOptions = [
        { label: "Web Design & Development", onClick: () => navigateToSection("problem"), Icon: <Code className="h-4 w-4" /> },
        { label: "Business Automation", onClick: () => navigateToSection("problem"), Icon: <Workflow className="h-4 w-4" /> },
        { label: "AI Systems & Chatbots", onClick: () => navigateToSection("problem"), Icon: <Sparkles className="h-4 w-4" /> },
        { label: "Digital Strategy", onClick: () => navigateToSection("problem"), Icon: <Lightbulb className="h-4 w-4" /> },
    ];

    const openRoadmapPlan = () => {
        if (pathname === "/") {
            window.dispatchEvent(new Event("open-roadmap-plan"));
            navigateToSection("booking");
            return;
        }

        router.push("/#booking");
    };

    const valueOptions = [
        { label: "Return on Investment Calculator", onClick: () => navigateToSection("roi"), Icon: <Calculator className="h-4 w-4" /> },
        { label: "Project Roadmap", onClick: openRoadmapPlan, Icon: <FileText className="h-4 w-4" /> },
    ];

    const pricingOptions = [
        { label: "View Investment Tiers", onClick: () => navigateToSection("pricing"), Icon: <PoundSterling className="h-4 w-4" /> },
        { label: "Custom Configuration", onClick: () => navigateToSection("pricing"), Icon: <Settings className="h-4 w-4" /> },
    ];

    const bookingOptions = [
        { label: "Start a Project", onClick: () => navigateToSection("booking"), Icon: <CalendarCheck className="h-4 w-4" /> },
        { label: "Message on WhatsApp", onClick: () => openExternal(WHATSAPP_URL), Icon: <MessageCircle className="h-4 w-4" /> },
        { label: "Email Us", onClick: () => (window.location.href = `mailto:${CONTACT_EMAIL}`), Icon: <Mail className="h-4 w-4" /> },
        { label: "Call Now", onClick: () => (window.location.href = `tel:${CONTACT_PHONE}`), Icon: <Phone className="h-4 w-4" /> },
    ];

    const mobileNavItems: Array<{ label: string; onClick: () => void; Icon: React.ReactNode }> = [
        { label: "Portfolio", onClick: () => { setMobileOpen(false); router.push("/portfolio"); }, Icon: <FileText className="h-4 w-4" /> },
        { label: "Services", onClick: () => navigateToSection("problem"), Icon: <Workflow className="h-4 w-4" /> },
        { label: "ROI Calculator", onClick: () => navigateToSection("roi"), Icon: <Calculator className="h-4 w-4" /> },
        { label: "Pricing", onClick: () => navigateToSection("pricing"), Icon: <PoundSterling className="h-4 w-4" /> },
        { label: "Start a Project", onClick: () => navigateToSection("booking"), Icon: <CalendarCheck className="h-4 w-4" /> },
    ];

    const dropdownTriggerClass = "h-9 lg:h-10 px-3 lg:px-4 text-xs lg:text-sm rounded-full";
    const dropdownPrimaryClass = "h-9 lg:h-10 px-4 lg:px-5 text-xs lg:text-sm rounded-full";

    return (
        <motion.nav
            className={`fixed top-0 w-full z-50 transition-all duration-500 ${
                isScrolled
                    ? "py-3 md:py-4 bg-black/70 backdrop-blur-lg border-b border-white/10 shadow-lg shadow-black/20"
                    : "py-4 md:py-5 bg-transparent border-b border-transparent"
            }`}
        >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10 flex items-center justify-between gap-3">
                {/* Logo */}
                <button
                    onClick={() => pathname === "/" ? window.scrollTo({ top: 0, behavior: "smooth" }) : router.push("/")}
                    className="group flex items-center gap-2 sm:gap-3 z-50 min-w-0 cursor-pointer shrink-0"
                >
                    <div className="relative w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center shrink-0">
                        <Image
                            src="/logo.png"
                            alt="Sovereign Systems Logo"
                            width={44}
                            height={44}
                            className="object-contain"
                        />
                    </div>
                    <span className="font-heading font-bold tracking-tight text-white transition-colors group-hover:text-brand-cyan whitespace-nowrap text-sm sm:text-lg lg:text-xl">
                        Sovereign Systems
                    </span>
                </button>

                {/* Centre nav, md+ */}
                <div className="hidden md:flex items-center gap-1 lg:gap-2">
                    <Link
                        href="/portfolio"
                        className="inline-flex items-center justify-center h-9 lg:h-10 px-3 lg:px-4 text-xs lg:text-sm font-medium text-white/80 hover:text-brand-cyan rounded-full transition-colors"
                    >
                        Portfolio
                    </Link>
                    <DropdownMenu options={valueOptions} triggerClassName={dropdownTriggerClass}>Quick Links</DropdownMenu>
                    <DropdownMenu options={painPointOptions} triggerClassName={dropdownTriggerClass}>Services</DropdownMenu>
                    <DropdownMenu options={pricingOptions} triggerClassName={dropdownTriggerClass}>Pricing</DropdownMenu>
                    <DropdownMenu
                        options={bookingOptions}
                        triggerVariant="primary"
                        triggerClassName={dropdownPrimaryClass}
                    >
                        Start a Project
                    </DropdownMenu>
                </div>

                {/* Right CTAs, md+ */}
                <div className="hidden md:flex items-center gap-2 lg:gap-3 shrink-0">
                    <Link
                        href="/sign-in"
                        className="btn-premium-primary inline-flex items-center justify-center h-9 lg:h-10 px-3 lg:px-5 text-xs lg:text-sm font-semibold rounded-full whitespace-nowrap"
                        style={{ borderRadius: "9999px" }}
                    >
                        Client Login
                    </Link>
                    <a
                        href="https://sovereignbookings.co.uk"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Visit Sovereign Bookings"
                        className="relative flex items-center justify-center w-10 h-10 lg:w-11 lg:h-11 rounded-xl overflow-hidden ring-1 ring-white/15 hover:ring-brand-cyan/60 transition-all hover:scale-105"
                    >
                        <Image
                            src="/sovereign-bookings-logo.png"
                            alt="Sovereign Bookings"
                            width={44}
                            height={44}
                            className="object-contain w-full h-full"
                        />
                    </a>
                </div>

                {/* Mobile hamburger, below md */}
                <button
                    type="button"
                    aria-label="Open menu"
                    aria-expanded={mobileOpen}
                    onClick={() => setMobileOpen(true)}
                    className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-white/15 text-white hover:bg-white/5 transition-colors shrink-0"
                >
                    <Menu className="h-5 w-5" />
                </button>
            </div>

            {/* Mobile drawer */}
            <AnimatePresence>
                {mobileOpen && (
                    <>
                        <motion.div
                            key="backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="md:hidden fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
                            onClick={() => setMobileOpen(false)}
                        />
                        <motion.aside
                            key="sheet"
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "tween", duration: 0.25, ease: "easeOut" }}
                            className="md:hidden fixed top-0 right-0 z-50 h-full w-[85%] max-w-sm bg-[#031316] border-l border-white/10 shadow-2xl shadow-black/50 flex flex-col"
                            role="dialog"
                            aria-modal="true"
                        >
                            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
                                <span className="font-heading font-bold text-white tracking-tight">Menu</span>
                                <button
                                    type="button"
                                    aria-label="Close menu"
                                    onClick={() => setMobileOpen(false)}
                                    className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-white/10 text-white hover:bg-white/5 transition-colors"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            <nav className="flex-1 overflow-y-auto px-5 py-6">
                                <ul className="flex flex-col gap-2">
                                    {mobileNavItems.map((item) => (
                                        <li key={item.label}>
                                            <button
                                                type="button"
                                                onClick={item.onClick}
                                                className="w-full inline-flex items-center gap-3 px-4 py-3 rounded-lg border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] text-white text-left transition-colors"
                                            >
                                                <span className="text-brand-cyan">{item.Icon}</span>
                                                <span className="text-sm font-medium">{item.label}</span>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </nav>

                            <div className="px-5 pb-6 pt-2 border-t border-white/10 flex flex-col gap-3">
                                <Link
                                    href="/sign-in"
                                    onClick={() => setMobileOpen(false)}
                                    className="btn-premium-primary inline-flex items-center justify-center gap-2 h-11 px-4 text-sm font-semibold rounded-full"
                                    style={{ borderRadius: "9999px" }}
                                >
                                    <LogIn className="h-4 w-4" />
                                    Client Login
                                </Link>
                                <a
                                    href="https://sovereignbookings.co.uk"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => setMobileOpen(false)}
                                    className="inline-flex items-center justify-center gap-3 h-12 px-4 rounded-xl border border-white/15 bg-white/[0.03] hover:bg-white/[0.07] transition-all"
                                >
                                    <Image
                                        src="/sovereign-bookings-logo.png"
                                        alt="Sovereign Bookings"
                                        width={32}
                                        height={32}
                                        className="object-contain"
                                    />
                                    <span className="text-sm font-semibold text-white">Sovereign Bookings</span>
                                </a>
                            </div>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
