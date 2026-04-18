"use client";

export default function SiteHealthWidget() {
  return (
    <div className="rounded-xl p-4 sm:p-6 flex flex-col bg-black/40 backdrop-blur-md border border-white/10">
      {/* Heading */}
      <p
        className="font-mono font-medium uppercase tracking-[0.16em] mb-4 sm:mb-5 text-white/40"
        style={{ fontSize: "10px" }}
      >
        Site Health
      </p>

      {/* Big Status Indicator */}
      <div className="flex items-center gap-3 mb-5 sm:mb-6">
        <span className="relative flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#22d3ee] opacity-40" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-[#22d3ee]" />
        </span>
        <span className="font-heading font-semibold text-sm sm:text-base text-white">
          All Systems Operational
        </span>
      </div>

      {/* Mini Metric Rows */}
      <div className="space-y-2.5">
        {/* SSL Certificate */}
        <div
          className="flex items-center justify-between rounded-lg px-4 py-3"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <span className="text-xs text-white/50">SSL Certificate</span>
          <span
            className="text-xs text-white/80"
            style={{ fontFamily: "monospace" }}
          >
            Valid until 14 Mar 2027
          </span>
        </div>

        {/* Last Backup */}
        <div
          className="flex items-center justify-between rounded-lg px-4 py-3"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <span className="text-xs text-white/50">Last Backup</span>
          <span className="flex items-center gap-1.5">
            <span
              className="text-xs text-white/80"
              style={{ fontFamily: "monospace" }}
            >
              2 hours ago
            </span>
            <svg
              className="w-3.5 h-3.5 shrink-0"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.25 4.75L6 12L2.75 8.75"
                stroke="#22d3ee"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>

        {/* Uptime (90d) */}
        <div
          className="flex items-center justify-between rounded-lg px-4 py-3"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <span className="text-xs text-white/50">Uptime (90d)</span>
          <span
            className="text-xs text-white/80"
            style={{ fontFamily: "monospace" }}
          >
            99.98%
          </span>
        </div>

        {/* Security Scans */}
        <div
          className="flex items-center justify-between rounded-lg px-4 py-3"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <span className="text-xs text-white/50">Security Scans</span>
          <span
            className="text-xs text-white/80"
            style={{ fontFamily: "monospace" }}
          >
            Daily, last clean run today
          </span>
        </div>
      </div>

      {/* Footer link */}
      <a
        href="#"
        className="mt-4 pt-3 text-xs font-mono uppercase tracking-[0.12em] transition-colors border-t border-white/5"
        style={{ color: "#22d3ee" }}
      >
        View full report →
      </a>
    </div>
  );
}
