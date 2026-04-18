"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { getSupabaseBrowserClient } from "@/lib/supabase";

function isSupabaseConfigured(): boolean {
  return !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

export default function SignInPage() {
  const [mode, setMode] = useState<"signin" | "signup">("signup");
  const [fullName, setFullName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success] = useState(false);

  const configured = useMemo(() => isSupabaseConfigured(), []);

  const handleGoogleSignIn = async () => {
    if (!configured) {
      setError("Google sign-in requires Supabase configuration. Contact the team to enable this.");
      return;
    }
    try {
      const supabase = getSupabaseBrowserClient();
      const { error: oauthError } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (oauthError) throw oauthError;
    } catch {
      setError("Google sign-in is not available right now. Use email and password instead.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setError(null);
    setLoading(true);

    if (!configured) {
      setError("Authentication is being set up. Check back soon or contact the team.");
      setLoading(false);
      return;
    }

    try {
      const supabase = getSupabaseBrowserClient();

      if (mode === "signup") {
        const { error: signUpError } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
            data: {
              full_name: fullName.trim(),
              business_name: businessName.trim(),
            },
          },
        });
        if (signUpError) throw signUpError;
        window.location.href = "/dashboard";
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });
        if (signInError) throw signInError;
        window.location.href = "/dashboard";
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong. Try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="relative min-h-screen flex flex-col items-center justify-center bg-[#030303]">
        <div className="text-center max-w-md px-6">
          <div
            className="mx-auto mb-6 w-16 h-16 rounded-full flex items-center justify-center"
            style={{ background: "rgba(34, 211, 238, 0.1)", border: "1px solid rgba(34, 211, 238, 0.3)" }}
          >
            <span style={{ fontSize: "28px", color: "#22d3ee" }}>✓</span>
          </div>
          <h1 className="font-heading font-bold text-2xl text-white">
            Check your inbox
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-white/50">
            We&apos;ve sent a confirmation link to <strong className="text-white">{email}</strong>. Click it to activate your account and access your dashboard.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex items-center gap-1.5 rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-white/5 hover:border-white/40"
          >
            ← Back to homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex flex-col bg-[#030303]">
      {/* Grain overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at 20% 10%, rgba(34,211,238,0.08), transparent 50%), radial-gradient(ellipse at 80% 90%, rgba(59,130,246,0.06), transparent 50%)",
        }}
      />

      {/* Back link */}
      <div className="relative z-10 px-6 pt-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-white/80 transition-all hover:border-white/30 hover:bg-white/5 hover:text-white"
        >
          ← Back
        </Link>
      </div>

      {/* Main content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-10">
        {/* Brand */}
        <div className="text-center mb-10 flex flex-col items-center">
          <Image
            src="/logo.png"
            alt="Sovereign Systems"
            width={96}
            height={96}
            className="rounded-2xl mb-5"
          />
          <h1
            className="font-heading font-black tracking-[-0.02em]"
            style={{
              fontSize: "clamp(2rem, 4vw, 2.75rem)",
              background: "linear-gradient(90deg, #14c6c4 0%, #22d3ee 52%, #35e6d1 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Sovereign Systems
          </h1>
          <p
            className="mt-2 uppercase tracking-[0.25em] font-mono font-medium text-white/40"
            style={{ fontSize: "10px" }}
          >
            AI &amp; Automation Infrastructure
          </p>
        </div>

        {/* Sign-in/up card */}
        <div
          className="w-full max-w-md rounded-xl p-8 md:p-10 bg-black/40 border border-white/10"
          style={{
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.45)",
          }}
        >
          {/* Mode toggle */}
          <div className="flex gap-1 p-1 rounded-lg mb-8 bg-white/5 border border-white/5">
            <button
              type="button"
              onClick={() => { setMode("signup"); setError(null); }}
              className="flex-1 py-2.5 text-sm font-medium rounded-md transition-all"
              style={{
                background: mode === "signup" ? "rgba(34, 211, 238, 0.1)" : "transparent",
                color: mode === "signup" ? "#22d3ee" : "rgba(255,255,255,0.5)",
                border: mode === "signup" ? "1px solid rgba(34, 211, 238, 0.25)" : "1px solid transparent",
              }}
            >
              Sign Up
            </button>
            <button
              type="button"
              onClick={() => { setMode("signin"); setError(null); }}
              className="flex-1 py-2.5 text-sm font-medium rounded-md transition-all"
              style={{
                background: mode === "signin" ? "rgba(34, 211, 238, 0.1)" : "transparent",
                color: mode === "signin" ? "#22d3ee" : "rgba(255,255,255,0.5)",
                border: mode === "signin" ? "1px solid rgba(34, 211, 238, 0.25)" : "1px solid transparent",
              }}
            >
              Sign In
            </button>
          </div>

          {/* Google sign-in button */}
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 font-semibold text-base rounded-lg transition-all hover:shadow-[0_0_24px_rgba(34,211,238,0.45)] hover:brightness-105 active:scale-[0.98]"
            style={{
              background: "linear-gradient(135deg, #22d3ee, #3b82f6)",
              color: "#031316",
              padding: "16px 32px",
              minHeight: "56px",
            }}
            onClick={handleGoogleSignIn}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1Z" fill="#031316" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23Z" fill="#031316" />
              <path d="M5.84 14.09A6.97 6.97 0 0 1 5.47 12c0-.72.13-1.43.37-2.09V7.07H2.18A11.96 11.96 0 0 0 .96 12c0 1.94.46 3.77 1.22 5.33l3.66-3.24Z" fill="#031316" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38Z" fill="#031316" />
            </svg>
            {mode === "signup" ? "Sign up with Google" : "Sign in with Google"}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-white/10" />
            <span className="uppercase tracking-[0.16em] font-mono font-medium shrink-0 text-white/40" style={{ fontSize: "10px" }}>
              Or
            </span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Error */}
          {error && (
            <div className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {mode === "signup" && (
              <>
                <div>
                  <label className="block uppercase tracking-[0.16em] font-mono font-medium mb-2 text-white/50" style={{ fontSize: "10px" }}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Miller Glenholmes"
                    required
                    autoComplete="name"
                    className="w-full rounded-lg outline-none transition-all text-white"
                    style={{ background: "rgba(255,255,255,0.04)", padding: "14px 16px", fontSize: "16px", border: "1px solid rgba(255,255,255,0.1)" }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = "#22d3ee"; e.currentTarget.style.boxShadow = "0 0 0 2px rgba(34, 211, 238, 0.15)"; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.boxShadow = "none"; }}
                  />
                </div>
                <div>
                  <label className="block uppercase tracking-[0.16em] font-mono font-medium mb-2 text-white/50" style={{ fontSize: "10px" }}>
                    Business Name
                  </label>
                  <input
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="Your Business Ltd"
                    required
                    autoComplete="organization"
                    className="w-full rounded-lg outline-none transition-all text-white"
                    style={{ background: "rgba(255,255,255,0.04)", padding: "14px 16px", fontSize: "16px", border: "1px solid rgba(255,255,255,0.1)" }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = "#22d3ee"; e.currentTarget.style.boxShadow = "0 0 0 2px rgba(34, 211, 238, 0.15)"; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.boxShadow = "none"; }}
                  />
                </div>
              </>
            )}

            <div>
              <label className="block uppercase tracking-[0.16em] font-mono font-medium mb-2 text-white/50" style={{ fontSize: "10px" }}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@yourbusiness.co.uk"
                required
                autoComplete="email"
                className="w-full rounded-lg outline-none transition-all text-white"
                style={{ background: "rgba(255,255,255,0.04)", padding: "14px 16px", fontSize: "16px", border: "1px solid rgba(255,255,255,0.1)" }}
                onFocus={(e) => { e.currentTarget.style.borderColor = "#22d3ee"; e.currentTarget.style.boxShadow = "0 0 0 2px rgba(34, 211, 238, 0.15)"; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.boxShadow = "none"; }}
              />
            </div>

            <div>
              <label className="block uppercase tracking-[0.16em] font-mono font-medium mb-2 text-white/50" style={{ fontSize: "10px" }}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min 6 characters"
                required
                minLength={6}
                autoComplete={mode === "signup" ? "new-password" : "current-password"}
                className="w-full rounded-lg outline-none transition-all text-white"
                style={{ background: "rgba(255,255,255,0.04)", padding: "14px 16px", fontSize: "16px", border: "1px solid rgba(255,255,255,0.1)" }}
                onFocus={(e) => { e.currentTarget.style.borderColor = "#22d3ee"; e.currentTarget.style.boxShadow = "0 0 0 2px rgba(34, 211, 238, 0.15)"; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.boxShadow = "none"; }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full font-medium text-base rounded-lg transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-45 disabled:cursor-not-allowed text-white border border-white/20 hover:border-white/40"
              style={{
                background: "transparent",
                padding: "14px 28px",
                minHeight: "52px",
              }}
            >
              {loading ? "Loading..." : mode === "signup" ? "Create account" : "Sign in"}
            </button>
          </form>

          {/* Legal */}
          <p className="mt-8 text-center leading-relaxed text-white/40" style={{ fontSize: "11px" }}>
            By signing {mode === "signup" ? "up" : "in"} you agree to our{" "}
            <Link href="/terms" className="underline underline-offset-2 transition-colors hover:text-white" style={{ color: "#67e8f9" }}>
              terms of service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="underline underline-offset-2 transition-colors hover:text-white" style={{ color: "#67e8f9" }}>
              privacy policy
            </Link>
            .
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-6 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono uppercase tracking-[0.16em] text-white/40" style={{ fontSize: "10px" }}>
            &copy; 2026 Sovereign Systems
          </p>
          <div className="flex items-center gap-6">
            <span className="font-mono uppercase tracking-[0.16em]" style={{ fontSize: "10px", color: "#22d3ee" }}>
              System Status: Optimal
            </span>
            <Link href="/" className="font-mono uppercase tracking-[0.16em] transition-colors hover:text-white text-white/40" style={{ fontSize: "10px" }}>
              Support
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
