"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot } from "lucide-react";
import faqData from "@/content/faq.json";

type Message = {
    id: string;
    role: "bot" | "user";
    text: string;
    showFAQ?: boolean;
};

const WELCOME_MSG: Message = {
    id: "welcome",
    role: "bot",
    text: "Hi, I'm the Sovereign AI assistant. Ask me anything about how we help clinics grow, or pick a common question below.",
    showFAQ: true,
};

function findAnswer(input: string): string | null {
    const lower = input.toLowerCase();
    // Try to match against FAQ questions and keywords
    for (const faq of faqData) {
        const keywords = faq.question.toLowerCase().split(/\W+/);
        const matchCount = keywords.filter(k => k.length > 3 && lower.includes(k)).length;
        if (matchCount >= 2) return faq.answer;
    }
    // Fallback keyword matches
    if (lower.includes("price") || lower.includes("cost") || lower.includes("how much")) {
        return faqData.find(f => f.id === "cost")?.answer ?? null;
    }
    if (lower.includes("data") || lower.includes("gdpr") || lower.includes("secure") || lower.includes("privacy")) {
        return faqData.find(f => f.id === "privacy")?.answer ?? null;
    }
    if (lower.includes("implement") || lower.includes("how long") || lower.includes("setup") || lower.includes("start")) {
        return faqData.find(f => f.id === "implementation")?.answer ?? null;
    }
    if (lower.includes("roi") || lower.includes("return") || lower.includes("result")) {
        return faqData.find(f => f.id === "roi")?.answer ?? null;
    }
    if (lower.includes("cancel") || lower.includes("contract") || lower.includes("lock")) {
        return faqData.find(f => f.id === "cancel")?.answer ?? null;
    }
    if (lower.includes("integrat") || lower.includes("booking software") || lower.includes("system")) {
        return faqData.find(f => f.id === "integration")?.answer ?? null;
    }
    if (lower.includes("robot") || lower.includes("sound") || lower.includes("human") || lower.includes("natural")) {
        return faqData.find(f => f.id === "quality")?.answer ?? null;
    }
    if (lower.includes("medical") || lower.includes("advice") || lower.includes("diagnos")) {
        return faqData.find(f => f.id === "medical")?.answer ?? null;
    }
    if (lower.includes("website") || lower.includes("no site") || lower.includes("don't have")) {
        return faqData.find(f => f.id === "website")?.answer ?? null;
    }
    if (lower.includes("guarantee") || lower.includes("free month") || lower.includes("fail")) {
        return faqData.find(f => f.id === "guarantee")?.answer ?? null;
    }
    if (lower.includes("down") || lower.includes("outage") || lower.includes("uptime")) {
        return faqData.find(f => f.id === "downtime")?.answer ?? null;
    }
    if (lower.includes("quick") || lower.includes("fast") || lower.includes("when will")) {
        return faqData.find(f => f.id === "results")?.answer ?? null;
    }
    return null;
}

export function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([WELCOME_MSG]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping]);

    useEffect(() => {
        if (isOpen) setTimeout(() => inputRef.current?.focus(), 300);
    }, [isOpen]);

    useEffect(() => {
        const handler = () => setIsOpen(true);
        window.addEventListener("open-chat-widget", handler);
        return () => window.removeEventListener("open-chat-widget", handler);
    }, []);

    const sendMessage = (text: string) => {
        if (!text.trim() || isTyping) return;

        const userMsg: Message = { id: Date.now().toString(), role: "user", text: text.trim() };
        setMessages(prev => [...prev, userMsg]);
        setInputValue("");
        setIsTyping(true);

        setTimeout(() => {
            const answer = findAnswer(text);
            const botMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: "bot",
                text: answer ?? "I don't have a specific answer for that, but I'd love to help. Book your free 15–20 minute Sovereign Strategy Audit and we'll answer everything on the call.",
            };
            setMessages(prev => [...prev, botMsg]);
            setIsTyping(false);
        }, 800 + Math.random() * 400);
    };

    const handleFAQClick = (faqId: string) => {
        const faq = faqData.find(f => f.id === faqId);
        if (!faq) return;
        sendMessage(faq.question);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") sendMessage(inputValue);
    };

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.92, y: 16 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.92, y: 16 }}
                        transition={{ type: "spring", stiffness: 300, damping: 28 }}
                        className="fixed bottom-20 sm:bottom-24 right-2 sm:right-6 w-[min(370px,calc(100vw-1rem))] sm:w-[370px] h-[min(580px,80vh)] sm:h-[580px] max-h-[80vh] bg-[#0a0a0f] border border-white/10 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] z-[100] flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-black/40 backdrop-blur-sm shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-cyan/30 to-brand-blue/30 border border-brand-cyan/30 flex items-center justify-center">
                                    <Bot className="w-4 h-4 text-brand-cyan" />
                                </div>
                                <div>
                                    <div className="font-bold text-white text-sm">Sovereign AI</div>
                                    <div className="flex items-center gap-1.5 text-xs text-white/50">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                                        Online
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="text-white/30 hover:text-white transition-colors p-1">
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
                            {messages.map((msg) => (
                                <div key={msg.id}>
                                    <div className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                                        <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                                            msg.role === "user"
                                                ? "bg-brand-cyan text-black font-medium rounded-br-sm"
                                                : "bg-white/5 border border-white/10 text-white/90 rounded-bl-sm"
                                        }`}>
                                            {msg.text}
                                        </div>
                                    </div>
                                    {/* FAQ quick-replies — only on the welcome message */}
                                    {msg.showFAQ && (
                                        <div className="mt-3 flex flex-wrap gap-2 pl-1">
                                            {faqData.map(faq => (
                                                <button
                                                    key={faq.id}
                                                    onClick={() => handleFAQClick(faq.id)}
                                                    className="text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/70 hover:bg-brand-cyan/10 hover:border-brand-cyan/30 hover:text-brand-cyan transition-all text-left"
                                                >
                                                    {faq.question}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-white/5 border border-white/10 rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 bg-brand-cyan/60 rounded-full animate-bounce [animation-delay:-0.3s]" />
                                        <span className="w-1.5 h-1.5 bg-brand-cyan/60 rounded-full animate-bounce [animation-delay:-0.15s]" />
                                        <span className="w-1.5 h-1.5 bg-brand-cyan/60 rounded-full animate-bounce" />
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="px-4 pb-4 pt-3 border-t border-white/10 shrink-0 space-y-3">
                            <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 focus-within:border-brand-cyan/40 transition-colors">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={inputValue}
                                    onChange={e => setInputValue(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Ask anything about Sovereign..."
                                    className="flex-1 bg-transparent text-sm text-white placeholder:text-white/30 outline-none"
                                    disabled={isTyping}
                                />
                                <button
                                    onClick={() => sendMessage(inputValue)}
                                    disabled={!inputValue.trim() || isTyping}
                                    className="text-brand-cyan disabled:text-white/20 hover:text-white transition-colors"
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                            <button
                                onClick={() => { document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' }); setIsOpen(false); }}
                                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-brand-cyan to-blue-400 text-black font-bold text-sm hover:brightness-110 transition-all"
                            >
                                Book Your Free Strategy Audit
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="fixed bottom-4 sm:bottom-6 right-2 sm:right-6 w-14 h-14 bg-gradient-to-br from-brand-cyan to-brand-blue text-black rounded-full shadow-[0_0_20px_rgba(34,211,238,0.4)] flex items-center justify-center z-[100] transition-all"
            >
                <AnimatePresence mode="wait">
                    {isOpen
                        ? <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}><X className="w-5 h-5" /></motion.div>
                        : <motion.div key="msg" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}><MessageSquare className="w-5 h-5" /></motion.div>
                    }
                </AnimatePresence>
            </motion.button>
        </>
    );
}
