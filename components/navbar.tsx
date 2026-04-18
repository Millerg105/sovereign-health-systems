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

    // Always keeping text light due to dark theme
    const textColorClass = "text-white";

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

    return (
        <motion.nav
            className={`fixed top-0 w-full z-50 py-4 md:py-6 transition-all duration-500 ${isScrolled ? "bg-black/60 backdrop-blur-lg border-b border-white/10 shadow-lg shadow-black/20" : "bg-transparent"}`}
        >
            <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between">
                {/* Logo & Brand - with backdrop blur */}
                <button onClick={() => pathname === "/" ? window.scrollTo({ top: 0, behavior: 'smooth' }) : router.push("/")} className="group flex items-center gap-3 sm:gap-5 z-50 min-w-0 cursor-pointer">
                    <div className="relative w-11 h-11 sm:w-14 sm:h-14 flex items-center justify-center shrink-0">
                        <Image
                            src="/logo.png"
                            alt="Sovereign Systems Logo"
                            width={44}
                            height={44}
                            className="object-contain"
                        />
                    </div>

                    <div className={`leading-none font-heading font-bold tracking-tight transition-colors min-w-0 ${textColorClass}`}>
                        <span className="block sm:hidden text-[0.82rem] text-white transition-colors group-hover:text-brand-cyan">Sovereign Systems</span>
                        <span className="hidden sm:block text-2xl text-white transition-colors group-hover:text-brand-cyan whitespace-nowrap">Sovereign Systems</span>
                    </div>
                </button>

                {/* Right controls */}
                <div className="flex items-center gap-2 xl:gap-5">
                    {/* Desktop Menu (lg+) */}
                    <div className="hidden lg:flex items-center gap-2 xl:gap-5">
                        <Link href="/portfolio" className="btn-premium-secondary inline-flex items-center justify-center h-10 xl:h-12 px-3 xl:px-6 text-sm xl:text-base font-medium transition-colors">
                            Portfolio
                        </Link>
                        <DropdownMenu options={valueOptions} triggerClassName="h-10 xl:h-12 px-3 xl:px-6 text-sm xl:text-base">Quick Links</DropdownMenu>
                        <DropdownMenu options={painPointOptions} triggerClassName="h-10 xl:h-12 px-3 xl:px-6 text-sm xl:text-base">Services</DropdownMenu>
                        <DropdownMenu options={pricingOptions} triggerClassName="h-10 xl:h-12 px-3 xl:px-6 text-sm xl:text-base">Pricing</DropdownMenu>
                        <DropdownMenu
                            options={bookingOptions}
                            triggerVariant="primary"
                            triggerClassName="h-10 xl:h-12 px-4 xl:px-7 text-sm xl:text-base"
                        >
                            Start a Project
                        </DropdownMenu>
                        <span className="border-l border-white/20 h-6 mx-3" />
                    </div>

                    {/* CTA pair (md+) */}
                    <div className="hidden md:flex items-center gap-3">
                        <a
                            href="https://sovereignbookings.co.uk"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-premium-secondary inline-flex items-center justify-center h-10 xl:h-12 px-4 xl:px-6 text-sm xl:text-base font-semibold whitespace-nowrap"
                        >
                            Sovereign Bookings
                        </a>
                        <Link
                            href="/sign-in"
                            className="btn-premium-primary inline-flex items-center justify-center h-10 xl:h-12 px-4 xl:px-6 text-sm xl:text-base font-semibold whitespace-nowrap"
                        >
                            Client Login
                        </Link>
                    </div>

                    {/* Mobile hamburger (below lg) */}
                    <button
                        type="button"
                        aria-label="Open menu"
                        aria-expanded={mobileOpen}
                        onClick={() => setMobileOpen(true)}
                        className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg border border-white/15 text-white hover:bg-white/5 transition-colors"
                    >
                        <Menu className="h-5 w-5" />
                    </button>
                </div>
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
                            className="lg:hidden fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
                            onClick={() => setMobileOpen(false)}
                        />
                        <motion.aside
                            key="sheet"
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "tween", duration: 0.25, ease: "easeOut" }}
                            className="lg:hidden fixed top-0 right-0 z-50 h-full w-[85%] max-w-sm bg-[#031316] border-l border-white/10 shadow-2xl shadow-black/50 flex flex-col"
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
                                <a
                                    href="https://sovereignbookings.co.uk"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => setMobileOpen(false)}
                                    className="btn-premium-secondary inline-flex items-center justify-center h-11 px-4 text-sm font-semibold"
                                >
                                    Sovereign Bookings
                                </a>
                                <Link
                                    href="/sign-in"
                                    onClick={() => setMobileOpen(false)}
                                    className="btn-premium-primary inline-flex items-center justify-center gap-2 h-11 px-4 text-sm font-semibold"
                                >
                                    <LogIn className="h-4 w-4" />
                                    Client Login
                                </Link>
                            </div>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
