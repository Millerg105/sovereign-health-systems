"use client";

import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { KineticMenu } from "@/components/ui/kinetic-menu";
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
import Image from "next/image";
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
        { label: "14-Day Complimentary Roadmap", onClick: openRoadmapPlan, Icon: <FileText className="h-4 w-4" /> },
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
                <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="group flex items-center gap-3 sm:gap-5 z-50 min-w-0 cursor-pointer">
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

                {/* Desktop Menu */}
                <div className="hidden lg:flex items-center gap-2 xl:gap-5">
                    <DropdownMenu options={valueOptions} triggerClassName="h-10 xl:h-12 px-3 xl:px-6 text-sm xl:text-base">Quick Links</DropdownMenu>
                    <DropdownMenu options={painPointOptions} triggerClassName="h-10 xl:h-12 px-3 xl:px-6 text-sm xl:text-base">Pain Points</DropdownMenu>
                    <DropdownMenu options={pricingOptions} triggerClassName="h-10 xl:h-12 px-3 xl:px-6 text-sm xl:text-base">Pricing</DropdownMenu>
                    <DropdownMenu
                        options={bookingOptions}
                        triggerVariant="primary"
                        triggerClassName="h-10 xl:h-12 px-4 xl:px-7 text-sm xl:text-base"
                    >
                        Book Strategy Audit
                    </DropdownMenu>
                </div>

                {/* Hamburger Menu (Sterling Gate Kinetic) - Visible on all screens, primary on mobile */}
                <div className="ml-4">
                    <KineticMenu />
                </div>
            </div>
        </motion.nav>
    );
}
