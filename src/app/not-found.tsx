"use client";

import Link from "next/link";

const T = {
  bg: "#ffffff",
  text: "#000000",
  muted: "rgba(0,0,0,0.55)",
  muted2: "rgba(0,0,0,0.38)",
  border: "rgba(0,0,0,0.08)",
  surface: "#f5f5f7",
  accent: "#000",
  accentFg: "#fff",
  radiusPill: 999,
  maxW: 1200,
};

export default function NotFound() {
  const sectionBorder = `1px solid ${T.border}`;

  return (
    <div style={{ background: T.bg, color: T.text, fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <header style={{ background: "rgba(255,255,255,0.82)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", borderBottom: sectionBorder }}>
        <div style={{ maxWidth: T.maxW, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", height: 64 }}>
          <Link href="/eleven" style={{ fontWeight: 700, fontSize: 18, color: T.text, textDecoration: "none", letterSpacing: "-0.02em" }}>
            Modulr
          </Link>
        </div>
      </header>

      {/* Main */}
      <main style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "80px 24px" }}>
        <div style={{ maxWidth: 680, width: "100%", textAlign: "center" }}>
          {/* Geometric "broken signal" visual */}
          <div style={{ marginBottom: 48 }}>
            <svg width="280" height="160" viewBox="0 0 280 160" fill="none" style={{ margin: "0 auto", display: "block" }}>
              {/* Outer frame */}
              <rect x="20" y="20" width="240" height="120" rx="16" stroke={T.text} strokeWidth="0.5" strokeDasharray="4 4" opacity="0.12" />
              <rect x="40" y="35" width="200" height="90" rx="12" stroke={T.text} strokeWidth="0.5" strokeDasharray="3 3" opacity="0.08" />

              {/* Broken signal path */}
              <path d="M 40 80 L 80 80 L 90 50 L 100 110 L 110 60 L 120 80" stroke={T.text} strokeWidth="1.5" opacity="0.25" strokeLinecap="round" />
              <path d="M 120 80 L 140 80" stroke={T.text} strokeWidth="1.5" opacity="0.08" strokeDasharray="3 3" strokeLinecap="round" />
              <path d="M 160 80 L 180 80" stroke={T.text} strokeWidth="1.5" opacity="0.08" strokeDasharray="3 3" strokeLinecap="round" />
              <path d="M 200 80 L 210 60 L 220 100 L 230 70 L 240 80" stroke={T.text} strokeWidth="1.5" opacity="0.15" strokeLinecap="round" />

              {/* Signal nodes */}
              <circle cx="80" cy="80" r="3" fill={T.text} opacity="0.3" />
              <circle cx="140" cy="80" r="2" fill={T.text} opacity="0.15" />
              <circle cx="200" cy="80" r="2" fill={T.text} opacity="0.15" />

              {/* Disconnected X */}
              <g opacity="0.2" transform="translate(140, 80)">
                <line x1="-8" y1="-8" x2="8" y2="8" stroke={T.text} strokeWidth="2" strokeLinecap="round" />
                <line x1="8" y1="-8" x2="-8" y2="8" stroke={T.text} strokeWidth="2" strokeLinecap="round" />
              </g>

              {/* Concentric scan rings */}
              <circle cx="140" cy="80" r="24" stroke={T.text} strokeWidth="0.5" strokeDasharray="2 4" opacity="0.08" />
              <circle cx="140" cy="80" r="40" stroke={T.text} strokeWidth="0.5" strokeDasharray="2 6" opacity="0.05" />
            </svg>
          </div>

          <div style={{ fontSize: 13, letterSpacing: "0.15em", textTransform: "uppercase", color: T.muted2, marginBottom: 16, fontWeight: 500 }}>
            Error 404
          </div>
          <h1 style={{ fontSize: "clamp(40px, 6vw, 64px)", fontWeight: 500, letterSpacing: "-0.04em", lineHeight: 1.05, marginBottom: 16 }}>
            Signal lost
          </h1>
          <p style={{ fontSize: 17, color: T.muted, lineHeight: 1.6, maxWidth: 480, margin: "0 auto 40px" }}>
            The page you&apos;re looking for doesn&apos;t exist, has been moved, or the connection was interrupted.
          </p>
          <Link href="/eleven" style={{ display: "inline-flex", alignItems: "center", height: 48, padding: "0 24px", background: T.accent, color: T.accentFg, borderRadius: T.radiusPill, fontSize: 15, fontWeight: 600, textDecoration: "none" }}>
            Go home
          </Link>

          {/* Subtle status bar */}
          <div style={{ marginTop: 80, display: "flex", alignItems: "center", justifyContent: "center", gap: 24, color: T.muted2, fontSize: 13 }}>
            <span>modulr.cloud</span>
            <span style={{ width: 4, height: 4, borderRadius: "50%", background: T.border }} />
            <span>Status: Online</span>
            <span style={{ width: 4, height: 4, borderRadius: "50%", background: T.border }} />
            <span>Latency: 12ms</span>
          </div>
        </div>
      </main>
    </div>
  );
}
