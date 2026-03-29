"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { HeroScrollSequence } from "@/components/hero-scroll-sequence";
import { DigitalAlchemy } from "@/components/digital-alchemy";
import { PricingSection } from "@/components/pricing-section";
import { ProblemsSection } from "@/components/problems-section";
import { TradeShowcase } from "@/components/trade-showcase";
import { Testimonials } from "@/components/testimonials";
import { FAQSection } from "@/components/faq-section";
import { CalendarBooking } from "@/components/calendar-booking";
import { Footer } from "@/components/footer";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { Preloader } from "@/components/preloader";
import { PromoBanner } from "@/components/top-banner";

import { ROICalculator } from "@/components/roi-calculator";
import { FounderNote } from "@/components/founder-note";

export default function Home() {
  const [showPreloader, setShowPreloader] = useState(true);

  const scrollToHash = (hash: string) => {
    if (!hash) return;
    const id = hash.replace(/^#/, "");
    const target = document.getElementById(id);
    if (!target) return;

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  };

  useEffect(() => {
    const previous = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    if (window.location.hash) {
      setShowPreloader(false);
      scrollToHash(window.location.hash);
    } else {
      window.scrollTo(0, 0);
    }

    return () => {
      window.history.scrollRestoration = previous;
    };
  }, []);

  const handlePreloaderComplete = () => {
    setShowPreloader(false);

    if (window.location.hash) {
      scrollToHash(window.location.hash);
      return;
    }

    window.scrollTo(0, 0);
  };

  return (
    <main className="min-h-screen relative">
      <AnimatePresence>{showPreloader && <Preloader onComplete={handlePreloaderComplete} />}</AnimatePresence>

      <div className="relative z-10">
        <ScrollProgress />
        <Navbar />

        <div className="w-full mt-24 md:mt-32">
          <PromoBanner />
        </div>

        <HeroScrollSequence />
        <DigitalAlchemy />

        <div id="roi">
          <ROICalculator />
        </div>

        <ProblemsSection />
        <PricingSection />

        <FounderNote />

        <Testimonials />

        <TradeShowcase />

        <FAQSection />
        <CalendarBooking />
        <Footer />
      </div>
    </main>
  );
}
