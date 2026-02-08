"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown, Bot } from "lucide-react";

const FAQ_DATA = [
    {
        category: "Getting Started",
        questions: [
            {
                id: "q1",
                question: "How long does implementation take?",
                answer: "Most clinics are live within 2-3 weeks. We handle the technical setup, integrate with your existing systems (Cliniko, SimplePractice, etc.), and train your team. You'll see results in the first week."
            },
            {
                id: "q2",
                question: "Do I need to change my current systems?",
                answer: "No. We integrate with your existing booking system, phone provider, and CRM. The automation works alongside your current workflow - it doesn't replace it."
            },
            {
                id: "q3",
                question: "What if I don't have a website?",
                answer: "We can build one for you as part of the Growth or Sovereign packages. It's designed specifically for clinic conversion and includes the chat widget pre-installed."
            }
        ]
    },
    {
        category: "Pricing & ROI",
        questions: [
            {
                id: "q4",
                question: "What's the typical ROI?",
                answer: "Most clinics recover 8-15 missed bookings per month, worth £800-£1,500 in revenue. The system typically pays for itself in the first month from recovered bookings alone."
            },
            {
                id: "q5",
                question: "Are there any hidden fees?",
                answer: "No. Setup fee + monthly subscription. That's it. No per-message fees, no usage limits, no surprise charges. SMS costs are included in your monthly fee."
            },
            {
                id: "q6",
                question: "Can I cancel anytime?",
                answer: "Yes. 30-day notice period. We're confident you'll see results, so we don't lock you into long contracts."
            }
        ]
    },
    {
        category: "Technical",
        questions: [
            {
                id: "q7",
                question: "How does the AI handle complex questions?",
                answer: "The AI is trained on your clinic's specific services, pricing, and policies. For complex medical questions, it escalates to your team. For booking and admin queries, it handles them autonomously."
            },
            {
                id: "q8",
                question: "Is my patient data secure?",
                answer: "Yes. We're GDPR compliant and use bank-level encryption. Patient data never leaves your existing systems - the AI only accesses what's needed for booking and follow-up."
            },
            {
                id: "q9",
                question: "What happens if the system goes down?",
                answer: "We have 99.9% uptime SLA. If there's an issue, calls and messages automatically route to your backup number. We monitor 24/7 and you'll be notified immediately."
            }
        ]
    },
    {
        category: "Results",
        questions: [
            {
                id: "q10",
                question: "How quickly will I see results?",
                answer: "Most clinics see recovered bookings in the first week. Full ROI typically within 30 days. We provide a live dashboard so you can track every recovered call and booking."
            },
            {
                id: "q11",
                question: "What if it doesn't work for my clinic?",
                answer: "We offer a 60-day results guarantee. If you don't recover at least 5 missed bookings in the first 60 days, we'll refund your setup fee and first month."
            }
        ]
    }
];

export function FAQSection() {
    const [openId, setOpenId] = useState<string | null>(null);

    const toggleQuestion = (id: string) => {
        setOpenId(openId === id ? null : id);
    };

    const openChat = () => {
        window.dispatchEvent(new Event("open-chat-widget"));
    };

    return (
        <section id="faq" className="relative py-32 md:py-48 bg-transparent overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-brand-blue/5 blur-[100px] pointer-events-none" />

            <div className="container px-4 mx-auto relative z-10">
                {/* Backdrop blur panel behind entire FAQ content */}
                <div className="absolute inset-0 mx-auto max-w-5xl bg-black/50 backdrop-blur-xl rounded-3xl pointer-events-none" />

                {/* Section Header */}
                <div className="text-center mb-12 md:mb-16 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 mb-6"
                    >
                        <span className="text-xs font-mono uppercase tracking-widest text-brand-cyan">
                            Sovereign FAQ
                        </span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight"
                    >
                        Everything You Need to Know
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg sm:text-xl md:text-2xl text-white/80 max-w-2xl mx-auto mb-8"
                    >
                        Still have questions? We're here to help.
                    </motion.p>

                    {/* Ask Sovereign AI + Book CTA side by side */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="max-w-xl mx-auto flex flex-col sm:flex-row gap-3"
                    >
                        <button
                            onClick={openChat}
                            className="flex-1 flex items-center gap-3 px-6 py-4 bg-brand-cyan/10 border border-brand-cyan/30 rounded-xl text-brand-cyan hover:bg-brand-cyan/20 hover:border-brand-cyan/60 transition-all group backdrop-blur-sm"
                        >
                            <Bot className="w-5 h-5 shrink-0" />
                            <span className="font-medium">Ask Sovereign AI</span>
                            <span className="ml-auto text-brand-cyan/50 group-hover:text-brand-cyan text-sm transition-colors">→</span>
                        </button>
                        <a
                            href="#booking"
                            className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white/80 hover:bg-white/10 hover:text-white transition-all backdrop-blur-sm font-medium"
                        >
                            Book Your Free Strategy Audit →
                        </a>
                    </motion.div>
                </div>

                {/* FAQ Accordion */}
                <div className="max-w-4xl mx-auto space-y-8 md:space-y-12 relative z-10">
                    {FAQ_DATA.map((category, categoryIndex) => (
                        <motion.div
                            key={category.category}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: categoryIndex * 0.1 }}
                        >
                            {/* Category Header */}
                            <h3 className="text-2xl font-heading font-bold text-white mb-6 flex items-center gap-3">
                                <span className="w-1 h-8 bg-brand-cyan rounded-full shadow-[0_0_10px_var(--color-brand-cyan)]" />
                                {category.category}
                            </h3>

                            {/* Questions */}
                            <div className="space-y-4">
                                {category.questions.map((faq) => (
                                    <div
                                        key={faq.id}
                                        className="glass-panel rounded-xl overflow-hidden hover:border-brand-cyan/30 transition-all duration-300 group"
                                    >
                                        <button
                                            onClick={() => toggleQuestion(faq.id)}
                                            className="w-full px-6 py-4 md:py-5 flex items-center justify-between text-left"
                                            aria-expanded={openId === faq.id}
                                        >
                                            <span className="text-base sm:text-lg md:text-xl text-white font-medium group-hover:text-brand-cyan transition-colors pr-6 md:pr-8">
                                                {faq.question}
                                            </span>
                                            <motion.div
                                                animate={{ rotate: openId === faq.id ? 180 : 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="shrink-0 text-white/40 group-hover:text-brand-cyan transition-colors"
                                            >
                                                <ChevronDown className="w-5 h-5" />
                                            </motion.div>
                                        </button>

                                        <AnimatePresence initial={false}>
                                            {openId === faq.id && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                                >
                                                    <div className="px-6 pb-6 text-white/70 leading-relaxed border-t border-white/5 pt-4 font-light">
                                                        {faq.answer}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}


                </div>


            </div>
        </section>
    );
}
