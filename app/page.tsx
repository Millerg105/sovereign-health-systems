"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { HeroScrollSequence } from "@/components/hero-scroll-sequence";
import { DigitalAlchemy } from "@/components/digital-alchemy";
import { PricingSection } from "@/components/pricing-section";
import { ProblemsSection } from "@/components/problems-section";
import { ClinicShowcase } from "@/components/clinic-showcase";
import { Testimonials } from "@/components/testimonials";
import { FAQSection } from "@/components/faq-section";
import { CalendarBooking } from "@/components/calendar-booking";
import { Footer } from "@/components/footer";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { Preloader } from "@/components/preloader";

import { ROICalculator } from "@/components/roi-calculator";
import { FounderNote } from "@/components/founder-note";

export default function Home() {
  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    const previous = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    return () => {
      window.history.scrollRestoration = previous;
    };
  }, []);

  const handlePreloaderComplete = () => {
    window.scrollTo(0, 0);
    setShowPreloader(false);
  };

  return (
    <main className="min-h-screen relative">
      <AnimatePresence>{showPreloader && <Preloader onComplete={handlePreloaderComplete} />}</AnimatePresence>

      <div className="relative z-10">
        <ScrollProgress />
        <Navbar />

        <HeroScrollSequence />
        <DigitalAlchemy />

        <div id="roi">
          <ROICalculator />
        </div>

        <ProblemsSection />
        <PricingSection />

        <FounderNote />

        <Testimonials />
        <ClinicShowcase />

        <FAQSection />
        <CalendarBooking />
        <Footer />
      </div>
    </main>
  );
}
