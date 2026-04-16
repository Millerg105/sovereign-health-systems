"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

if (typeof window !== "undefined") {
    gsap.registerPlugin(CustomEase);
}

export function KineticMenu() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    const navigateToSection = (id: string) => {
        closeMenu();

        if (pathname === "/") {
            document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
            return;
        }

        router.push(`/#${id}`);
    };

    useEffect(() => {
        if (!containerRef.current) return;

        try {
            if (!gsap.parseEase("main")) {
                CustomEase.create("main", "0.65, 0.01, 0.05, 0.99");
                gsap.defaults({ ease: "main", duration: 0.7 });
            }
        } catch (e) {
            console.warn("CustomEase failed to load, falling back to default.", e);
            gsap.defaults({ ease: "power2.out", duration: 0.7 });
        }

        const ctx = gsap.context(() => {
            // Menu Items Hover - simple text translate/color update to replace the heavy shapes
            const menuItems = containerRef.current!.querySelectorAll(".menu-list-item");

            menuItems.forEach((item) => {
                const textArea = item.querySelector('.nav-link-text');
                if (!textArea) return;

                const onEnter = () => {
                    gsap.to(textArea, { color: "#00D4AA", x: 8, duration: 0.4, ease: "power2.out", overwrite: "auto" });
                };

                const onLeave = () => {
                    gsap.to(textArea, { color: "#FFFFFF", x: 0, duration: 0.4, ease: "power2.in", overwrite: "auto" });
                };

                item.addEventListener("mouseenter", onEnter);
                item.addEventListener("mouseleave", onLeave);

                (item as any)._cleanup = () => {
                    item.removeEventListener("mouseenter", onEnter);
                    item.removeEventListener("mouseleave", onLeave);
                };
            });

        }, containerRef);

        return () => {
            ctx.revert();
            if (containerRef.current) {
                const items = containerRef.current.querySelectorAll(".menu-list-item");
                items.forEach((item: any) => item._cleanup && item._cleanup());
            }
        };
    }, []);

    // Menu Open/Close Animation Effect
    useEffect(() => {
        if (!containerRef.current) return;

        const ctx = gsap.context(() => {
            const navWrap = containerRef.current!.querySelector(".nav-overlay-wrapper");
            const menu = containerRef.current!.querySelector(".menu-content");
            const overlay = containerRef.current!.querySelector(".menu-overlay");
            const bgPanels = containerRef.current!.querySelectorAll(".backdrop-layer");
            const menuLinks = containerRef.current!.querySelectorAll(".nav-link");

            const menuButtonTexts = containerRef.current!.querySelectorAll(".menu-button-text p");
            const menuButtonIcon = containerRef.current!.querySelector(".menu-button-icon");

            const tl = gsap.timeline();

            if (isMenuOpen) {
                // OPEN
                tl.set(navWrap, { display: "block", autoAlpha: 1 })
                    .set(overlay, { autoAlpha: 0 })
                    .set(menu, { xPercent: 100, autoAlpha: 1 })
                    .set(bgPanels, { xPercent: 101 })
                    .set(menuLinks, { yPercent: 60, autoAlpha: 0 })

                    .to(overlay, { autoAlpha: 1, duration: 0.4 })
                    .to(menu, { xPercent: 0, duration: 0.6, ease: "power3.out" }, "<")
                    .fromTo(menuButtonTexts, { yPercent: 0 }, { yPercent: -100, stagger: 0.1, duration: 0.4 }, "<")
                    .fromTo(menuButtonIcon, { rotate: 0 }, { rotate: 315, duration: 0.4 }, "<")
                    .to(bgPanels, { xPercent: 0, stagger: 0.08, duration: 0.5, ease: "power2.out" }, "<+=0.1")
                    .to(menuLinks, {
                        yPercent: 0,
                        autoAlpha: 1,
                        stagger: 0.1,
                        duration: 0.5,
                        ease: "power2.out",
                        delay: 0.2
                    }, "<");

            } else {
                // CLOSE
                tl.to(menuLinks, { autoAlpha: 0, yPercent: 40, duration: 0.3 })
                    .to(bgPanels, { xPercent: 101, stagger: 0.05, duration: 0.4 }, "<")
                    .to(overlay, { autoAlpha: 0, duration: 0.4 }, "<")
                    .to(menu, { xPercent: 100, duration: 0.5, ease: "power3.in" }, "<")
                    .to(menuButtonTexts, { yPercent: 0, duration: 0.4 }, "<")
                    .to(menuButtonIcon, { rotate: 0, duration: 0.4 }, "<")
                    .set(navWrap, { display: "none" });
            }

        }, containerRef);

        return () => ctx.revert();
    }, [isMenuOpen]);

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isMenuOpen) {
                setIsMenuOpen(false);
            }
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [isMenuOpen]);

    const toggleMenu = () => setIsMenuOpen(prev => !prev);
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <div ref={containerRef} className="pointer-events-auto">
            {/* Toggle Button */}
            <button
                role="button"
                className="relative z-[100] flex items-center gap-3 group"
                onClick={toggleMenu}
            >
                <div className="menu-button-text h-5 overflow-hidden block relative w-12 text-left">
                    <div className="flex flex-col">
                        <p className="text-xs sm:text-sm font-semibold text-white tracking-wider uppercase h-5 leading-5 m-0 p-0">Menu</p>
                        <p className="text-xs sm:text-sm font-semibold text-brand-cyan tracking-wider uppercase h-5 leading-5 m-0 p-0">Close</p>
                    </div>
                </div>

                <div className="w-10 h-10 flex items-center justify-center bg-black/40 backdrop-blur-md border border-white/10 rounded-full hover:bg-brand-cyan/20 transition-colors shadow-lg shadow-black/30">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 16 16"
                        fill="none"
                        className="menu-button-icon text-white group-hover:text-brand-cyan transition-colors"
                    >
                        <path d="M7.33333 16L7.33333 -3.2055e-07L8.66667 -3.78832e-07L8.66667 16L7.33333 16Z" fill="currentColor"></path>
                        <path d="M16 8.66667L-2.62269e-07 8.66667L-3.78832e-07 7.33333L16 7.33333L16 8.66667Z" fill="currentColor"></path>
                        <path d="M6 7.33333L7.33333 7.33333L7.33333 6C7.33333 6.73637 6.73638 7.33333 6 7.33333Z" fill="currentColor"></path>
                        <path d="M10 7.33333L8.66667 7.33333L8.66667 6C8.66667 6.73638 9.26362 7.33333 10 7.33333Z" fill="currentColor"></path>
                        <path d="M6 8.66667L7.33333 8.66667L7.33333 10C7.33333 9.26362 6.73638 8.66667 6 8.66667Z" fill="currentColor"></path>
                        <path d="M10 8.66667L8.66667 8.66667L8.66667 10C8.66667 9.26362 9.26362 8.66667 10 8.66667Z" fill="currentColor"></path>
                    </svg>
                </div>
            </button>

            {/* Fullscreen Menu */}
            <div className="nav-overlay-wrapper fixed inset-0 z-[90] text-left" style={{ display: 'none' }}>
                <div className="menu-overlay absolute inset-0 bg-black/60 backdrop-blur-md" onClick={closeMenu}></div>

                <nav className="menu-content absolute top-0 right-0 bottom-0 w-full md:w-[600px] h-full overflow-y-auto shadow-2xl shadow-black/50">
                    {/* Background Panels */}
                    <div className="absolute inset-0 flex">
                        <div className="backdrop-layer w-1/3 h-full bg-[#0A0A0E] border-l border-white/5"></div>
                        <div className="backdrop-layer w-1/3 h-full bg-[#0A0A0E] border-l border-white/5"></div>
                        <div className="backdrop-layer w-1/3 h-full bg-[#0A0A0E] border-l border-white/5"></div>
                    </div>

                    {/* Ambient Glow */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute -top-1/4 -right-1/4 w-[500px] h-[500px] bg-brand-cyan/10 rounded-full blur-[120px]" />
                        <div className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px]" />
                    </div>

                    {/* Menu Items */}
                    <div className="relative z-10 w-full min-h-full flex flex-col justify-start px-8 pt-28 pb-12 sm:px-12 sm:pt-32 md:px-20 md:pt-36">
                        <div className="mb-8 sm:mb-10 font-mono text-[11px] uppercase tracking-[0.24em] text-white/40">
                            Navigate
                        </div>
                        <ul className="menu-list flex flex-col gap-4 md:gap-10">
                            <li className="menu-list-item overflow-hidden">
                                <Link href="/portfolio" onClick={closeMenu} className="nav-link block min-h-12 text-left w-full group">
                                    <span className="nav-link-text inline-block text-[1.85rem] xs:text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-white tracking-tight">Portfolio</span>
                                </Link>
                            </li>
                            <li className="menu-list-item overflow-hidden">
                                <button onClick={() => navigateToSection('pricing')} className="nav-link block min-h-12 text-left w-full group">
                                    <span className="nav-link-text inline-block text-[1.85rem] xs:text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-white tracking-tight">Pricing</span>
                                </button>
                            </li>
                            <li className="menu-list-item overflow-hidden">
                                <button onClick={() => navigateToSection('problem')} className="nav-link block min-h-12 text-left w-full group">
                                    <span className="nav-link-text inline-block text-[1.85rem] xs:text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-white tracking-tight">Services</span>
                                </button>
                            </li>
                            <li className="menu-list-item overflow-hidden">
                                <button onClick={() => navigateToSection('solution')} className="nav-link block min-h-12 text-left w-full group">
                                    <span className="nav-link-text inline-block text-[1.85rem] xs:text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-white tracking-tight">About Sovereign</span>
                                </button>
                            </li>

                            <li className="mt-8 md:mt-12 overflow-hidden">
                                <div className="nav-link">
                                    <Link
                                        href="/#booking"
                                        onClick={closeMenu}
                                        className="inline-flex items-center gap-3 px-6 py-3 sm:px-8 sm:py-4 bg-[#00D4AA] text-white text-lg sm:text-xl md:text-2xl font-semibold rounded-full hover:bg-[#00b390] transition-all shadow-[0_0_20px_rgba(0,212,170,0.3)] hover:shadow-[0_0_30px_rgba(0,212,170,0.5)]"
                                    >
                                        Start a Project <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
                                    </Link>
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
    );
}
