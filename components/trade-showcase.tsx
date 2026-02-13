"use client";

import { CardStack, CardStackItem } from "@/components/ui/card-stack";

const items: CardStackItem[] = [
    {
        id: 1,
        title: "Plumbing & HVAC",
        description: "Emergency callouts, boiler installs, and heating repairs — automated from first call to five-star review.",
        imageSrc: "/showcase/physio.jpg", // Placeholder - reusing existing image for now
    },
    {
        id: 2,
        title: "Commercial Cleaning",
        description: "Contract cleaning, office maintenance, and deep cleans — scheduled, tracked, and scaled with zero admin overhead.",
        imageSrc: "/showcase/chiro.webp", // Placeholder
    },
    {
        id: 3,
        title: "Pest Control",
        description: "High-urgency enquiries captured instantly. Every missed call is a job that goes to someone else.",
        imageSrc: "/showcase/sports-massage.jpg", // Placeholder
    },
    {
        id: 4,
        title: "Landscaping & Tree Surgery",
        description: "Seasonal demand, repeat maintenance, and quote follow-ups — automated so nothing falls through the cracks.",
        imageSrc: "/showcase/thai-massage.jpg", // Placeholder
    },
];

export function TradeShowcase() {
    return (
        <section className="py-24 bg-transparent overflow-hidden relative" id="partners">

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-16">
                    {/* Left Side: Content */}
                    <div className="w-full md:w-[45%] flex flex-col items-start text-left">
                        {/* ... existing content ... */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-navy/50 border border-brand-cyan/20 text-sm font-bold text-brand-cyan mb-8 uppercase tracking-wider shadow-[0_0_15px_rgba(34,211,238,0.1)] text-glow backdrop-blur-sm">
                            <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse" />
                            Sovereign Partners
                        </div>

                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 leading-[1.1] tracking-tight">
                            Modernising Home Service <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-blue italic">Businesses.</span>
                        </h2>

                        <div className="text-base sm:text-lg md:text-xl text-white/80 mb-8 leading-relaxed space-y-6 md:space-y-8 font-light max-w-lg">
                            <p className="border-l-2 border-brand-cyan/40 pl-5 md:pl-8 py-2">
                                From <span className="text-white font-medium">Plumbers</span> to <span className="text-white font-medium">Cleaners</span>,
                                <span className="text-white font-medium block mt-2 text-base sm:text-lg md:text-xl">HVAC Engineers to Pest Control.</span>
                            </p>

                            <p className="text-lg text-white/70">
                                We build the sovereign digital <span className="text-white font-medium underline underline-offset-8 decoration-brand-cyan/30">infrastructure</span> for <span className="text-brand-cyan font-semibold">growing home service businesses.</span>
                            </p>

                            <div className="pt-2">
                                <p className="text-sm font-mono text-brand-cyan/60 uppercase tracking-widest mb-3">Serving areas across</p>
                                <div className="flex flex-wrap gap-2">
                                    {[
                                        "Greater Manchester", "Lancashire", "Merseyside", "Yorkshire",
                                        "Cheshire", "Cumbria", "Derbyshire", "Staffordshire",
                                        "Birmingham", "London", "Bristol", "Leeds"
                                    ].map((place) => (
                                        <span key={place} className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/60 font-mono">
                                            {place}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-10">
                                <div className="relative pl-6 border-l border-white/10">
                                    <p className="text-xl md:text-2xl font-heading font-bold leading-relaxed tracking-tight">
                                        <span className="text-white">Your trade is your craft.</span>{" "}
                                        <span className="text-brand-cyan">Our</span>{" "}
                                        <span className="text-white">systems handle the</span>{" "}
                                        <span className="text-red-500">admin,</span>{" "}
                                        <br className="hidden md:block" />
                                        <span className="text-white">so you can focus on the</span>{" "}
                                        <span className="text-green-500 text-glow">work.</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Card Stack */}
                    <div className="w-full md:w-[55%] flex justify-center md:justify-center">
                        <div className="relative group md:-ml-8 lg:-ml-16">
                            {/* Decorative background glow for the stack */}
                            <div className="absolute -inset-4 bg-brand-cyan/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                            <CardStack
                                items={items}
                                cardWidth={300}
                                cardHeight={280}
                                initialIndex={0}
                                autoAdvance={true}
                                intervalMs={3500}
                                pauseOnHover={true}
                                showDots={true}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
