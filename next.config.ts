import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/pitch/luke-steedman",
        destination: "/pitch/luke-steedman/index.html",
      },
    ];
  },
  async headers() {
    const sharedHeaders = [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-XSS-Protection", value: "1; mode=block" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
      {
        key: "Content-Security-Policy",
        value:
          "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https:; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://api.resend.com https://*.calendly.com https://*.supabase.co; frame-src 'self'; frame-ancestors 'self';",
      },
    ];
    return [
      // The /internal/ path serves the embedded HQ dashboard.
      // It must be iframable from the gated /dashboard/hq route on the same origin.
      {
        source: "/internal/:path*",
        headers: [
          ...sharedHeaders,
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
      // Everything else stays locked down.
      {
        source: "/(.*)",
        headers: [
          ...sharedHeaders,
          { key: "X-Frame-Options", value: "DENY" },
        ],
      },
    ];
  },
};

export default nextConfig;
