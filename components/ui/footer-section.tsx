"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Linkedin, Send } from "lucide-react"

function Footerdemo() {
  return (
    <footer className="relative border-t bg-void text-foreground transition-colors duration-300">
      <div className="container mx-auto px-4 py-12 md:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Newsletter Section */}
          <div className="relative">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-white">Stay Connected</h2>
            <p className="mb-6 text-white/60">
              Join our newsletter for the latest automation insights and exclusive offers.
            </p>
            <form className="relative">
              <Input
                type="email"
                placeholder="Enter your email"
                className="pr-12 backdrop-blur-sm bg-white/5 border-white/10 text-white placeholder:text-white/40"
              />
              <button
                type="submit"
                className="absolute right-1 top-1 h-8 w-8 rounded-full bg-brand-cyan text-black transition-transform hover:scale-105 flex items-center justify-center"
              >
                <Send className="h-4 w-4" />
                <span className="sr-only">Subscribe</span>
              </button>
            </form>
            <div className="absolute -right-4 top-0 h-24 w-24 rounded-full bg-brand-cyan/10 blur-2xl" />
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Quick Links</h3>
            <nav className="space-y-2 text-sm">
              <a href="#pain-points" className="block transition-colors hover:text-brand-cyan text-white/70">
                Pain Points
              </a>
              <a href="#solution" className="block transition-colors hover:text-brand-cyan text-white/70">
                Our Solution
              </a>
              <a href="#pricing" className="block transition-colors hover:text-brand-cyan text-white/70">
                Pricing
              </a>
              <a href="#audit" className="block transition-colors hover:text-brand-cyan text-white/70">
                Free Strategy Audit
              </a>
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Contact Us</h3>
            <address className="space-y-2 text-sm not-italic text-white/70">
              <p>Greater Manchester</p>
              <p>Wigan, UK</p>
              <p>Email: hello@sovereignhealth.uk</p>
            </address>
          </div>

          {/* Social Media - LinkedIn Only */}
          <div className="relative">
            <h3 className="mb-4 text-lg font-semibold text-white">Follow Us</h3>
            <div className="mb-6 flex space-x-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a 
                      href="https://linkedin.com" 
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

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-center md:flex-row">
          <p className="text-sm text-white/40">
            © 2024 Sovereign Health Systems. All rights reserved.
          </p>
          <nav className="flex gap-4 text-sm">
            <a href="#privacy" className="transition-colors hover:text-brand-cyan text-white/60">
              Privacy Policy
            </a>
            <a href="#terms" className="transition-colors hover:text-brand-cyan text-white/60">
              Terms of Service
            </a>
          </nav>
        </div>
      </div>
    </footer>
  )
}

export { Footerdemo }
