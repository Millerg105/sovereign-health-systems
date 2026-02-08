import React from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function TermsPage() {
    return (
        <main className="bg-brand-navy min-h-screen text-white pt-32">
            <Navbar />
            <div className="container mx-auto px-6 py-20 max-w-4xl">
                <h1 className="text-4xl md:text-5xl font-heading font-bold mb-10 tracking-tight">Terms of Service</h1>
                <div className="prose prose-invert prose-brand max-w-none space-y-8 text-white/70">
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
                        <p>
                            By accessing or using sovereignhealthsystems.co.uk, you agree to comply with and be bound by these Terms of Service. If you do not agree, please do not use our site.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">2. Services Offered</h2>
                        <p>
                            Sovereign Health Systems provides clinical automation infrastructure, ROI analysis, and managed systems for healthcare practices. All "Audits" or "Consultations" are for informational purposes and do not constitute legal or medical clinical advice.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">3. Intellectual Property</h2>
                        <p>
                            All content on this website, including but not limited to the ROI Calculator logic, design elements, and text, is the intellectual property of Sovereign Health Systems, unless otherwise stated.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">4. Limitation of Liability</h2>
                        <p>
                            While we strive for 100% uptime and accuracy, we are not liable for any direct or indirect damages arising from the use or inability to use our systems, including data loss or missed revenue. The "Sovereign Guarantee" is limited to the specific terms outlined in your service agreement.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">5. User Conduct</h2>
                        <p>
                            Users agree not to attempt to reverse-engineer the ROI calculator or use automated scripts to scrape data from the site.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">6. Governing Law</h2>
                        <p>
                            These terms are governed by the laws of England and Wales.
                        </p>
                    </section>

                    <section className="pt-10 border-t border-white/10 text-sm italic">
                        <p>Last Updated: February 8, 2026</p>
                    </section>
                </div>
            </div>
            <Footer />
        </main>
    );
}
