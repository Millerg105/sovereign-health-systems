"use client"

import * as React from "react"
import Link from "next/link";
import { Input } from "@/components/ui/input"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Linkedin, Send } from "lucide-react"
import { CONTACT_EMAIL, LINKEDIN_URL } from "@/lib/constants"

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-transparent text-foreground transition-colors duration-300">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-2xl pointer-events-none" />

      <div className="container mx-auto px-4 py-12 md:px-6 lg:px-8 relative z-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Newsletter Section */}
          <div className="relative">
            <h2 className="mb-4 text-3xl md:text-4xl font-bold tracking-tight text-white">Stay Connected</h2>
            <p className="mb-6 text-white/80">
              Join our newsletter for the latest automation insights and exclusive offers.
            </p>
            <form
              className="relative"
              onSubmit={async (e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const emailInput = form.querySelector('input') as HTMLInputElement;
                const email = emailInput.value;
                if (!email) return;

                const btn = form.querySelector('button') as HTMLButtonElement;
                btn.disabled = true;

                try {
                  await fetch('/api/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, name: 'Newsletter Subscriber', source: 'Footer Newsletter' })
                  });
                  emailInput.value = '';
                  alert('Thank you for subscribing!');
                } catch {
                  alert("Subscription failed. Please try again.");
                } finally {
                  btn.disabled = false;
                }
              }}
            >
              <Input
                type="email"
                required
                placeholder="Enter your email"
                className="pr-12 backdrop-blur-sm bg-white/5 border-white/10 text-white placeholder:text-white/40"
              />
              <button
                type="submit"
                className="absolute right-1 top-1 h-8 w-8 rounded-full bg-brand-cyan text-black transition-transform hover:scale-105 flex items-center justify-center disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
                <span className="sr-only">Subscribe</span>
              </button>
            </form>
            <div className="absolute -right-4 top-0 h-24 w-24 rounded-full bg-brand-cyan/10 blur-2xl" />
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-xl font-semibold text-white">Quick Links</h3>
            <nav className="space-y-2 text-base">
              <a href="#problem" className="block transition-colors hover:text-brand-cyan text-white/70">
                Pain Points
              </a>
              <a href="#solution" className="block transition-colors hover:text-brand-cyan text-white/70">
                Our Solution
              </a>
              <a href="#pricing" className="block transition-colors hover:text-brand-cyan text-white/70">
                Pricing
              </a>
              <a href="#booking" className="block transition-colors hover:text-brand-cyan text-white/70">
                Book Your Free Strategy Audit
              </a>
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 text-xl font-semibold text-white">Contact Us</h3>
            <address className="space-y-2 text-base not-italic text-white/70">
              <p>Greater Manchester</p>
              <p>Wigan, UK</p>
              <p>Email: {CONTACT_EMAIL}</p>
            </address>
          </div>

          {/* Social Media - LinkedIn Only */}
          <div className="relative">
            <h3 className="mb-4 text-xl font-semibold text-white">Follow Us</h3>
            <div className="mb-6 flex space-x-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      href={LINKEDIN_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-10 w-10 rounded-full border border-white/10 bg-white/5 hover:bg-brand-cyan/20 hover:border-brand-cyan/50 transition-all flex items-center justify-center"
                    >
                      <Linkedin className="h-4 w-4 text-white/70 hover:text-brand-cyan" />
                      <span className="sr-only">LinkedIn</span>
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Connect with us on LinkedIn</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>

        {/* Bottom Bar with System Status */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-center md:flex-row">
          <p className="text-base text-white/40">
            © {new Date().getFullYear()} Sovereign Health Systems. All rights reserved.
          </p>
          <nav className="flex flex-wrap justify-center md:justify-start gap-4 text-base items-center">
            <Link href="/privacy" className="transition-colors hover:text-brand-cyan text-white/60">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-brand-cyan text-white/60">
              Terms of Service
            </Link>
            <div className="flex items-center gap-2 text-xs text-white/40 uppercase tracking-widest ml-4">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Systems Operational
            </div>
          </nav>
        </div>
      </div>
    </footer>
  )
}
