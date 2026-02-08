"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "./ui/button";

const TESTIMONIALS = [
    {
        id: 1,
        clinic: "Sovereign Health Systems",
        location: "London, UK",
        specialty: "Physiotherapy",
        quote: "We recovered 12 missed calls in the first week alone. The AI handles after-hours inquiries better than our old answering service ever did.",
        author: "Dr. Sarah Mitchell",
        role: "Practice Director",
        metrics: {
            before: "8 missed calls/week",
            after: "0 missed calls",
            revenue: "+£4,250/month"
        }
    },
    {
        id: 2,
        clinic: "Elite Wellness Clinic",
        location: "Manchester, UK",
        specialty: "Chiropractic",
        quote: "The automation freed up 15 hours per week for our admin team. We're now booking appointments while we sleep.",
        author: "James Thompson",
        role: "Clinic Owner",
        metrics: {
            before: "2-3 hour response time",
            after: "< 2 minute response",
            revenue: "+£3,800/month"
        }
    },
    {
        id: 3,
        clinic: "Peak Performance Physio",
        location: "Birmingham, UK",
        specialty: "Sports Therapy",
        quote: "The ROI was immediate. We paid for the system in the first month just from recovered bookings.",
        author: "Dr. Michael Chen",
        role: "Lead Physiotherapist",
        metrics: {
            before: "45% booking rate",
            after: "78% booking rate",
            revenue: "+£5,100/month"
        }
    }
];

export function Testimonials() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
        }),
    };

    const swipeConfidenceThreshold = 10000;
    const swipePower = (offset: number, velocity: number) => {
        return Math.abs(offset) * velocity;
    };

    const paginate = (newDirection: number) => {
        setDirection(newDirection);
        setCurrentIndex((prevIndex) => {
            let nextIndex = prevIndex + newDirection;
            if (nextIndex < 0) nextIndex = TESTIMONIALS.length - 1;
            if (nextIndex >= TESTIMONIALS.length) nextIndex = 0;
            return nextIndex;
        });
    };

    const currentTestimonial = TESTIMONIALS[currentIndex];

    return (
        <section id="testimonials" className="relative py-24 bg-transparent overflow-hidden">
            <div className="container px-4 mx-auto relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 mb-6 backdrop-blur-sm"
                    >
                        <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse shadow-[0_0_10px_rgba(34,211,238,0.6)]" />
                        <span className="text-xs font-mono uppercase tracking-widest text-brand-cyan">
                            Sovereign Results
                        </span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-heading font-bold text-white mb-4 tracking-tight"
                    >
                        Sovereign Clinics That Stopped <span className="text-text-glow text-white">Losing Revenue</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed"
                    >
                        Real Sovereign-powered clinics. Real automation. Real growth.
                    </motion.p>
                </div>

                {/* Testimonial Carousel */}
                <div className="max-w-5xl mx-auto">
                    <div className="relative h-[700px] sm:h-[620px] md:h-[400px] flex items-center">
                        <AnimatePresence initial={false} custom={direction}>
                            <motion.div
                                key={currentIndex}
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{
                                    x: { type: "spring", stiffness: 300, damping: 30 },
                                    opacity: { duration: 0.2 },
                                }}
                                drag="x"
                                dragConstraints={{ left: 0, right: 0 }}
                                dragElastic={1}
                                onDragEnd={(e, { offset, velocity }) => {
                                    const swipe = swipePower(offset.x, velocity.x);

                                    if (swipe < -swipeConfidenceThreshold) {
                                        paginate(1);
                                    } else if (swipe > swipeConfidenceThreshold) {
                                        paginate(-1);
                                    }
                                }}
                                className="absolute w-full"
                            >
                                <div className="glass-panel p-8 md:p-12 rounded-3xl relative overflow-hidden group">
                                    {/* Quote Icon */}
                                    <Quote className="absolute top-10 left-10 w-24 h-24 text-brand-cyan/5 -z-10 rotate-180" />

                                    <div className="relative z-10 flex flex-col md:flex-row gap-8 md:gap-12 items-start md:items-center">
                                        <div className="flex-1">
                                            <blockquote className="text-base sm:text-lg md:text-xl font-heading text-white leading-relaxed mb-6 md:mb-8">
                                                "{currentTestimonial.quote}"
                                            </blockquote>

                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-cyan/20 to-brand-blue/20 flex items-center justify-center text-brand-cyan font-bold border border-white/10">
                                                    {currentTestimonial.author.charAt(0)}
                                                </div>
                                                <div>
                                                    <div className="text-white font-bold text-lg">
                                                        {currentTestimonial.author}
                                                    </div>
                                                    <div className="text-white/60 text-sm mb-1">
                                                        {currentTestimonial.role}, {currentTestimonial.clinic}
                                                    </div>
                                                    <div className="text-brand-cyan/80 text-xs font-mono uppercase tracking-wider">
                                                        {currentTestimonial.location}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="w-full md:w-auto flex flex-row md:flex-col gap-4">
                                            <MetricCard label="Before" value={currentTestimonial.metrics.before} />
                                            <MetricCard label="After" value={currentTestimonial.metrics.after} highlight />
                                            <MetricCard label="Revenue" value={currentTestimonial.metrics.revenue} success />
                                        </div>
                                    </div>

                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Navigation */}
                    <div className="flex items-center justify-center gap-4 mt-8">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => paginate(-1)}
                            className="text-white/40 hover:text-white hover:bg-white/5"
                            aria-label="Previous testimonial"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </Button>

                        {/* Dots */}
                        <div className="flex gap-3">
                            {TESTIMONIALS.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => {
                                        setDirection(index > currentIndex ? 1 : -1);
                                        setCurrentIndex(index);
                                    }}
                                    className={`h-1.5 rounded-full transition-all duration-300 ${index === currentIndex
                                        ? "bg-brand-cyan w-8 shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                                        : "bg-white/10 w-2 hover:bg-white/30"
                                        }`}
                                    aria-label={`Go to testimonial ${index + 1}`}
                                />
                            ))}
                        </div>

                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => paginate(1)}
                            className="text-white/40 hover:text-white hover:bg-white/5"
                            aria-label="Next testimonial"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}

function MetricCard({ label, value, highlight, success }: { label: string, value: string, highlight?: boolean, success?: boolean }) {
    return (
        <div className={`flex-1 md:w-48 p-4 rounded-xl border backdrop-blur-sm transition-colors ${success
            ? "bg-brand-cyan/10 border-brand-cyan/20"
            : highlight
                ? "bg-white/5 border-white/10"
                : "bg-white/[0.02] border-white/5"
            }`}>
            <div className="text-xs text-white/40 uppercase tracking-wider mb-1 font-mono">
                {label}
            </div>
            <div className={`text-sm font-bold ${success ? "text-brand-cyan" : highlight ? "text-white" : "text-white/60"
                }`}>
                {value}
            </div>
        </div>
    );
}
