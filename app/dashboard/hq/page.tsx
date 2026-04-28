"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";

// Allowlist: only these email addresses can view /dashboard/hq.
// Override via NEXT_PUBLIC_HQ_ALLOWED_EMAILS env var (comma-separated) when adding Wooty etc.
const HARDCODED_ALLOWED = ["miller.glenholmes@outlook.com"];

function getAllowlist(): string[] {
  const env = process.env.NEXT_PUBLIC_HQ_ALLOWED_EMAILS;
  if (env && env.trim().length > 0) {
    return env.split(",").map((e) => e.trim().toLowerCase()).filter(Boolean);
  }
  return HARDCODED_ALLOWED.map((e) => e.toLowerCase());
}

export default function HQPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<"loading" | "allowed" | "denied" | "unauth">("loading");

  useEffect(() => {
    const allowlist = getAllowlist();
    let mounted = true;
    (async () => {
      try {
        const supabase = getSupabaseBrowserClient();
        const { data, error } = await supabase.auth.getUser();
        if (!mounted) return;
        if (error || !data.user) {
          setStatus("unauth");
          setTimeout(() => router.replace("/sign-in?next=/dashboard/hq"), 800);
          return;
        }
        const email = (data.user.email || "").toLowerCase();
        setUser(data.user);
        if (allowlist.includes(email)) {
          setStatus("allowed");
        } else {
          setStatus("denied");
        }
      } catch {
        if (!mounted) return;
        setStatus("unauth");
        setTimeout(() => router.replace("/sign-in?next=/dashboard/hq"), 800);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [router]);

  if (status === "loading") {
    return (
      <main style={{ minHeight: "100vh", background: "#080809", color: "#f5f5f5", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "ui-sans-serif, system-ui" }}>
        <div style={{ fontSize: "13px", color: "#888", letterSpacing: "0.1em", textTransform: "uppercase" }}>
          Verifying access...
        </div>
      </main>
    );
  }

  if (status === "unauth") {
    return (
      <main style={{ minHeight: "100vh", background: "#080809", color: "#f5f5f5", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "ui-sans-serif, system-ui" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "13px", color: "#888", marginBottom: "8px" }}>Not signed in</div>
          <div style={{ fontSize: "11px", color: "#555" }}>Redirecting to sign-in...</div>
        </div>
      </main>
    );
  }

  if (status === "denied") {
    return (
      <main style={{ minHeight: "100vh", background: "#080809", color: "#f5f5f5", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "ui-sans-serif, system-ui", padding: "24px" }}>
        <div style={{ maxWidth: "420px", textAlign: "center" }}>
          <div style={{ fontSize: "22px", fontWeight: 700, marginBottom: "12px" }}>Access denied</div>
          <p style={{ fontSize: "13px", color: "#888", lineHeight: 1.6, marginBottom: "16px" }}>
            HQ is private. Signed in as <span style={{ color: "#fff" }}>{user?.email}</span> but that email is not on the allowlist.
          </p>
          <p style={{ fontSize: "12px", color: "#555", lineHeight: 1.55 }}>
            If this should work, add your email to the NEXT_PUBLIC_HQ_ALLOWED_EMAILS env var (comma-separated) and redeploy.
          </p>
        </div>
      </main>
    );
  }

  // status === "allowed" -> render the v9 dashboard inside an iframe so all its localStorage,
  // drag-drop, council intel, and export/import wiring keeps working unchanged.
  return (
    <main style={{ minHeight: "100vh", margin: 0, padding: 0, background: "#080809" }}>
      <iframe
        src="/internal/hq.html"
        title="Sovereign HQ"
        style={{
          width: "100vw",
          height: "100vh",
          border: 0,
          display: "block",
        }}
      />
    </main>
  );
}
