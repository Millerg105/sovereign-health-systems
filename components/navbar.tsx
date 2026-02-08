"use client";

import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { Menu, X } from "lucide-react";
import {
    AlertTriangle,
    CalendarCheck,
    Calculator,
    FileText,
    Mail,
    MessageCircle,
    Phone,
    PoundSterling,
    Settings,
    ShieldAlert,
    Timer,
    TrendingDown,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image"; // Optimization
import { CONTACT_EMAIL, CONTACT_PHONE, WHATSAPP_URL } from "@/lib/constants";

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 50);
    });

    // Always keeping text light due to dark theme
    const textColorClass = "text-white";

    const scrollToSection = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

    const openExternal = (url: string) => {
        window.open(url, "_blank", "noopener,noreferrer");
    };

    const painPointOptions = [
        { label: "Missed Leads", onClick: () => scrollToSection("problem"), Icon: <ShieldAlert className="h-4 w-4" /> },
        { label: "Slow Follow-Up", onClick: () => scrollToSection("problem"), Icon: <Timer className="h-4 w-4" /> },
        { label: "No-Show Drag", onClick: () => scrollToSection("problem"), Icon: <TrendingDown className="h-4 w-4" /> },
        { label: "Admin Overload", onClick: () => scrollToSection("problem"), Icon: <AlertTriangle className="h-4 w-4" /> },
    ];

    const openRoadmapPlan = () => {
        window.dispatchEvent(new Event("open-roadmap-plan"));
        scrollToSection("booking");
    };

    const valueOptions = [
        { label: "Return on Investment Calculator", onClick: () => scrollToSection("roi"), Icon: <Calculator className="h-4 w-4" /> },
        { label: "14-Day Roadmap for £5", onClick: openRoadmapPlan, Icon: <FileText className="h-4 w-4" /> },
    ];

    const pricingOptions = [
        { label: "View Investment Tiers", onClick: () => scrollToSection("pricing"), Icon: <PoundSterling className="h-4 w-4" /> },
        { label: "Custom Configuration", onClick: () => scrollToSection("pricing"), Icon: <Settings className="h-4 w-4" /> },
    ];

    const bookingOptions = [
        { label: "Book Strategy Audit", onClick: () => scrollToSection("booking"), Icon: <CalendarCheck className="h-4 w-4" /> },
        { label: "Message on WhatsApp", onClick: () => openExternal(WHATSAPP_URL), Icon: <MessageCircle className="h-4 w-4" /> },
        { label: "Email Us", onClick: () => (window.location.href = `mailto:${CONTACT_EMAIL}`), Icon: <Mail className="h-4 w-4" /> },
        { label: "Call Now", onClick: () => (window.location.href = `tel:${CONTACT_PHONE}`), Icon: <Phone className="h-4 w-4" /> },
    ];

    return (
        <motion.nav
            className={`fixed top-0 w-full z-50 py-4 md:py-6 transition-all duration-500 ${isScrolled ? "bg-black/60 backdrop-blur-lg border-b border-white/10 shadow-lg shadow-black/20" : "bg-transparent"}`}
        >
            <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between">
                {/* Logo & Brand - with backdrop blur */}
                <Link href="/" className="group flex items-center gap-3 sm:gap-5 z-50 min-w-0">
                    <div className="relative w-11 h-11 sm:w-14 sm:h-14 flex items-center justify-center shrink-0">
                        <Image
                            src="/logo.png"
                            alt="Sovereign Health Logo"
                            width={44}
                            height={44}
                            className="object-contain"
                        />
                    </div>

                    <div className={`leading-none font-heading font-bold tracking-tight transition-colors min-w-0 ${textColorClass}`}>
                        <span className="block sm:hidden text-[0.82rem] text-white transition-colors group-hover:text-brand-cyan">Sovereign Health</span>
                        <span className="hidden sm:block text-2xl text-white transition-colors group-hover:text-brand-cyan whitespace-nowrap">Sovereign Health Systems</span>
                    </div>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-5">
                    <DropdownMenu options={valueOptions} triggerClassName="h-12 px-6 text-lg">Get Started £5</DropdownMenu>
                    <DropdownMenu options={painPointOptions} triggerClassName="h-12 px-6 text-lg">Pain Points</DropdownMenu>
                    <DropdownMenu options={pricingOptions} triggerClassName="h-12 px-6 text-lg">Pricing Options</DropdownMenu>
                    <DropdownMenu
                        options={bookingOptions}
                        triggerClassName="h-12 px-7 text-lg bg-gradient-to-r from-blue-600 via-brand-cyan to-blue-400 !text-black hover:!text-black hover:brightness-110 shadow-[0_0_20px_rgba(34,211,238,0.35)] border-0"
                    >
                        Book Your Free Strategy Audit
                    </DropdownMenu>
                </div>

                {/* Mobile Toggle */}
                <button
                    className={`md:hidden z-50 p-2.5 rounded-full transition-all ${textColorClass} ${isScrolled ? "backdrop-blur-md bg-black/20 border border-white/10" : "bg-transparent"}`}
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X /> : <Menu />}
                </button>

                {/* Mobile Menu Overlay */}
                {mobileMenuOpen && (
                    <div className="fixed inset-0 h-screen bg-void/95 backdrop-blur-sm flex flex-col items-center justify-start pt-24 pb-10 px-4 gap-5 md:hidden text-white z-40 overflow-y-auto">
                        <DropdownMenu
                            options={valueOptions.map((option) => ({
                                ...option,
                                onClick: () => {
                                    option.onClick();
                                    setMobileMenuOpen(false);
                                },
                            }))}
                            triggerClassName="w-full max-w-sm justify-between text-lg font-medium"
                            menuClassName="left-1/2 right-auto -translate-x-1/2 w-[min(20rem,calc(100vw-2rem))]"
                        >
                            Get Started £5
                        </DropdownMenu>

                        <DropdownMenu
                            options={painPointOptions.map((option) => ({
                                ...option,
                                onClick: () => {
                                    option.onClick();
                                    setMobileMenuOpen(false);
                                },
                            }))}
                            triggerClassName="w-full max-w-sm justify-between text-lg font-medium"
                            menuClassName="left-1/2 right-auto -translate-x-1/2 w-[min(20rem,calc(100vw-2rem))]"
                        >
                            Pain Points
                        </DropdownMenu>

                        <DropdownMenu
                            options={pricingOptions.map((option) => ({
                                ...option,
                                onClick: () => {
                                    option.onClick();
                                    setMobileMenuOpen(false);
                                },
                            }))}
                            triggerClassName="w-full max-w-sm justify-between text-lg font-medium"
                            menuClassName="left-1/2 right-auto -translate-x-1/2 w-[min(20rem,calc(100vw-2rem))]"
                        >
                            Pricing Options
                        </DropdownMenu>

                        <Link
                            href="#solution"
                            className="text-2xl font-heading font-bold text-white hover:text-brand-cyan transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Solution
                        </Link>
                        <Link
                            href="#pricing"
                            className="text-2xl font-heading font-bold text-white hover:text-brand-cyan transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Pricing
                        </Link>
                        <DropdownMenu
                            options={bookingOptions.map((option) => ({
                                ...option,
                                onClick: () => {
                                    option.onClick();
                                    setMobileMenuOpen(false);
                                },
                            }))}
                            triggerClassName="w-full max-w-sm justify-between bg-gradient-to-r from-blue-600 via-brand-cyan to-blue-400 !text-black hover:!text-black text-lg font-semibold hover:brightness-110 transition-all border-0"
                            menuClassName="left-1/2 right-auto -translate-x-1/2 w-[min(20rem,calc(100vw-2rem))]"
                        >
                            Book Your Free Strategy Audit
                        </DropdownMenu>
                    </div>
                )}
            </div>
        </motion.nav >
    );
}
