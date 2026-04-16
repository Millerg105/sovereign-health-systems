"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";

const FAQ_DATA = [
    {
        category: "Getting Started",
        questions: [
            {
                id: "q1",
                question: "How long does a website take to build?",
                answer: "Most sites go live within 5\u20137 days. Larger projects with automation or custom platforms take 2\u20134 weeks. We\u2019ll give you a clear timeline before we start."
            },
            {
                id: "q2",
                question: "What\u2019s included in a website build?",
                answer: "Custom design, mobile optimisation, SEO setup, contact forms, analytics, and hosting configuration. No templates, no WordPress \u2014 everything is custom-coded and yours to keep."
            },
            {
                id: "q3",
                question: "Do I need a retainer after launch?",
                answer: "No. The website build is a one-off fee and it\u2019s yours. Retainers are optional \u2014 they cover hosting, updates, content changes, and ongoing support if you want it."
            }
        ]
    },
    {
        category: "Pricing & Process",
        questions: [
            {
                id: "q4",
                question: "How much does a website cost?",
                answer: "One-page sites start from \u00A3300. Multi-page sites from \u00A3500. Full builds with automation from \u00A3800. Enterprise platforms from \u00A35,000+. Every project is scoped and quoted upfront."
            },
            {
                id: "q5",
                question: "Are there any hidden fees?",
                answer: "No. You get a fixed quote before we start. The only ongoing costs are optional retainers and any third-party services (hosting, domain, email) which we\u2019ll outline upfront."
            },
            {
                id: "q6",
                question: "What if I need changes after launch?",
                answer: "Small tweaks within 30 days are included. After that, you can either request one-off changes or join a monthly retainer for unlimited updates and support."
            }
        ]
    },
    {
        category: "Technical",
        questions: [
            {
                id: "q7",
                question: "What tech stack do you use?",
                answer: "We build with Next.js, React, and modern frameworks. Every site is custom-coded \u2014 no page builders, no WordPress. Fast, secure, and built to last."
            },
            {
                id: "q8",
                question: "Do I own the code and design?",
                answer: "Yes. Everything we build belongs to you. Full source code, design files, and documentation are handed over on completion."
            },
            {
                id: "q9",
                question: "Can you integrate with my existing tools?",
                answer: "Yes. We integrate with CRMs, email platforms, payment providers, calendars, and more. If it has an API, we can connect it."
            }
        ]
    },
    {
        category: "Support",
        questions: [
            {
                id: "q10",
                question: "What if I\u2019m not happy with the design?",
                answer: "We include revision rounds in every project. You\u2019ll see the design before we build, and we refine until you\u2019re happy. No surprises."
            },
            {
                id: "q11",
                question: "How do I get started?",
                answer: "Book a call or send us a message. We\u2019ll scope your project, send a proposal, and get started as soon as you\u2019re ready. Most projects kick off within 48 hours."
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
                            className="btn-premium-secondary flex flex-1 items-center gap-3 px-5 py-3 group backdrop-blur-sm"
                        >
                            <Bot className="w-5 h-5 shrink-0" />
                            <span className="font-medium">Ask Sovereign AI</span>
                            <span className="ml-auto text-brand-cyan/50 group-hover:text-brand-cyan text-sm transition-colors">→</span>
                        </button>
                        <Button
                            onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
                            variant="primary"
                            size="md"
                            className="flex-1"
                        >
                            Start a Project →
                        </Button>
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
                                            className="w-full px-6 py-4 md:py-5 flex items-center justify-between text-left active:scale-[0.98] transition-transform"
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
