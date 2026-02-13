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
                answer: "2\u20133 weeks from kickoff to fully live. We handle everything \u2014 you just give us access to your systems and approve the messaging."
            },
            {
                id: "q2",
                question: "Do I need to change my current systems?",
                answer: "No. We build around what you already use. If you\u2019re running everything from your phone and a notebook, that\u2019s fine \u2014 we\u2019ll set up proper systems from scratch."
            },
            {
                id: "q3",
                question: "What if I don't have a website?",
                answer: "We build you one as part of every tier. If you have one that\u2019s outdated, we rebuild it."
            }
        ]
    },
    {
        category: "Pricing & ROI",
        questions: [
            {
                id: "q4",
                question: "What's the typical ROI?",
                answer: "Most clients recover the cost of Sovereign within the first 2\u20134 weeks through captured missed calls and reactivated past customers alone."
            },
            {
                id: "q5",
                question: "Are there any hidden fees?",
                answer: "No. The only extra cost is usage \u2014 SMS and AI call fees passed through at cost (typically \u00A320\u2013\u00A350/mo). We never mark up."
            },
            {
                id: "q6",
                question: "Can I cancel anytime?",
                answer: "Yes. Month-to-month. No long-term contracts. Stay because it works."
            }
        ]
    },
    {
        category: "Technical",
        questions: [
            {
                id: "q7",
                question: "How does the AI handle complex questions?",
                answer: "It captures the enquiry, qualifies the lead, and routes it to you with full context. It\u2019s not replacing you \u2014 it\u2019s making sure you never miss a potential job."
            },
            {
                id: "q8",
                question: "Is my customer data secure?",
                answer: "Yes. Everything is encrypted, GDPR-compliant, and hosted in the UK. Your data stays yours."
            },
            {
                id: "q9",
                question: "What happens if the system goes down?",
                answer: "Our guarantee covers it. If we fail to capture a lead due to our error, your monthly fee for that month is waived."
            }
        ]
    },
    {
        category: "Results",
        questions: [
            {
                id: "q10",
                question: "How quickly will I see results?",
                answer: "Most businesses see their first recovered lead within the first 7 days. The missed call text-back alone typically pays for itself in week one."
            },
            {
                id: "q11",
                question: "What if it doesn't work for my business?",
                answer: "Cancel anytime. No lock-in. But in our experience, if your phone rings and you sometimes miss it \u2014 it works."
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
