import React from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function PrivacyPage() {
    return (
        <main className="bg-brand-navy min-h-screen text-white pt-32">
            <Navbar />
            <div className="container mx-auto px-6 py-20 max-w-4xl">
                <h1 className="text-4xl md:text-5xl font-heading font-bold mb-10 tracking-tight">Privacy Policy</h1>
                <div className="prose prose-invert prose-brand max-w-none space-y-8 text-white/70">
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
                        <p>
                            Sovereign Health Systems ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website sovereignhealthsystems.co.uk.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">2. Information We Collect</h2>
                        <p>We may collect personal information that you voluntarily provide to us when you:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Fill out a form (e.g., ROI Calculator, Audit Request)</li>
                            <li>Subscribe to our newsletter</li>
                            <li>Contact us directly via email or phone</li>
                            <li>Book a consultation through our booking links</li>
                        </ul>
                        <p className="mt-4">This information may include your name, email address, clinic name, phone number, and business revenue data.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">3. How We Use Your Information</h2>
                        <p>We use the collected information to:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Provide the specific services you requested (e.g., ROI analysis)</li>
                            <li>Improve our website and service offerings</li>
                            <li>Communicate with you regarding your inquiry</li>
                            <li>Send periodic marketing emails (which you can opt-out of at any time)</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">4. Data Sharing and Disclosure</h2>
                        <p>
                            We do not sell or rent your personal information to third parties. We may share data with trusted service providers (e.g., Resend for emails, Calendly for bookings, Zapier for automation) only as strictly necessary to provide our services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">5. Your Rights</h2>
                        <p>
                            Depending on your location (including UK GDPR), you have the right to access, correct, or delete your personal data. To exercise these rights, please contact us at miller@sovereignhealthsystems.co.uk.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">6. Cookies</h2>
                        <p>
                            We use cookies to analyze website traffic and improve your experience. You can manage your cookie preferences through your browser settings.
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
