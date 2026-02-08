"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CheckCircle2, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { BOOKING_URL } from "@/lib/constants";

export default function ThankYouPage() {
    return (
        <main className="min-h-screen bg-[#020408] text-white selection:bg-brand-cyan/30 selection:text-brand-cyan overflow-hidden">
            <Navbar />

            <div className="relative pt-32 pb-24 px-6 min-h-[80vh] flex items-center justify-center">
                {/* Background Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[400px] bg-brand-cyan/10 blur-[150px] -z-10 pointer-events-none" />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-3xl w-full text-center"
                >
                    <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 mb-10 shadow-[0_0_50px_-10px_rgba(34,211,238,0.3)]">
                        <CheckCircle2 className="w-12 h-12 text-brand-cyan" />
                    </div>

                    <h1 className="text-5xl md:text-7xl font-heading font-bold mb-8 tracking-tight">
                        Audit Request <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan via-white to-brand-cyan">Received.</span>
                    </h1>

                    <p className="text-xl text-white/60 mb-12 leading-relaxed">
                        We've received your clinic details. Miller is personally reviewing your data and will be in touch within 24 hours with your preliminary findings.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Link
                            href={BOOKING_URL}
                            target="_blank"
                            className="w-full sm:w-auto px-10 py-5 bg-brand-cyan text-black font-bold rounded-2xl hover:bg-brand-cyan/90 transition-all flex items-center justify-center gap-3 group"
                        >
                            <Calendar className="w-5 h-5" />
                            Book Your Free Strategy Audit
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>

                        <Link
                            href="/"
                            className="w-full sm:w-auto px-10 py-5 bg-white/5 border border-white/10 text-white font-medium rounded-2xl hover:bg-white/10 transition-all flex items-center justify-center"
                        >
                            Return to Homepage
                        </Link>
                    </div>
                </motion.div>
            </div>

            <Footer />
        </main>
    );
}
