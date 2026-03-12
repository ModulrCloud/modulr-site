"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export function CookieToast() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem("cookieConsent");
      if (!consent) {
        const timer = setTimeout(() => setShow(true), 2200);
        return () => clearTimeout(timer);
      }
    } catch {
      /* SSR / incognito */
    }
  }, []);

  const handleAccept = () => {
    try { localStorage.setItem("cookieConsent", "accepted"); } catch {}
    setShow(false);
  };

  const handleDecline = () => {
    try { localStorage.setItem("cookieConsent", "declined"); } catch {}
    setShow(false);
  };

  if (!show) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 24,
        left: 24,
        zIndex: 9999,
        maxWidth: 420,
        borderRadius: 20,
        background: "rgba(255,255,255,0.95)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        border: "1px solid rgba(0,0,0,0.08)",
        boxShadow: "0 20px 60px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.04)",
        overflow: "hidden",
        animation: "cookieSlideUp 0.45s cubic-bezier(0.16, 1, 0.3, 1)",
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      {/* ── Abstract pattern strip at top ── */}
      <div style={{ position: "relative", height: 80, overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #f8f4ea 0%, #fdf6e0 40%, #f0ece2 100%)" }} />
        <svg width="100%" height="100%" viewBox="0 0 420 80" preserveAspectRatio="none" style={{ position: "absolute", inset: 0 }}>
          {/* Grid */}
          {Array.from({ length: 6 }).map((_, i) => (
            <line key={`h${i}`} x1="0" y1={i * 16} x2="420" y2={i * 16} stroke="rgba(0,0,0,0.04)" strokeWidth="0.5" />
          ))}
          {Array.from({ length: 16 }).map((_, i) => (
            <line key={`v${i}`} x1={i * 28} y1="0" x2={i * 28} y2="80" stroke="rgba(0,0,0,0.04)" strokeWidth="0.5" />
          ))}
          {/* Accent lines */}
          <line x1="0" y1="32" x2="420" y2="32" stroke="rgba(242,180,0,0.15)" strokeWidth="1.5" />
          <line x1="0" y1="64" x2="420" y2="64" stroke="rgba(242,180,0,0.08)" strokeWidth="1" />
          <line x1="140" y1="0" x2="140" y2="80" stroke="rgba(242,180,0,0.1)" strokeWidth="1" />
          <line x1="280" y1="0" x2="280" y2="80" stroke="rgba(242,180,0,0.08)" strokeWidth="0.8" />
          {/* Blocks */}
          <rect x="24" y="8" width="100" height="20" rx="3" fill="rgba(242,180,0,0.06)" stroke="rgba(242,180,0,0.12)" strokeWidth="0.6" />
          <rect x="160" y="38" width="80" height="16" rx="2" fill="rgba(242,180,0,0.04)" stroke="rgba(242,180,0,0.08)" strokeWidth="0.5" />
          <rect x="300" y="12" width="90" height="18" rx="3" fill="rgba(242,180,0,0.05)" stroke="rgba(242,180,0,0.09)" strokeWidth="0.6" />
          {/* Circles */}
          <circle cx="340" cy="56" r="16" fill="none" stroke="rgba(242,180,0,0.1)" strokeWidth="1" />
          <circle cx="340" cy="56" r="9" fill="rgba(242,180,0,0.04)" />
          <circle cx="60" cy="58" r="12" fill="rgba(242,180,0,0.04)" />
          {/* Dot cluster */}
          {Array.from({ length: 4 }).map((_, r) =>
            Array.from({ length: 6 }).map((_, c) => (
              <circle key={`d${r}${c}`} cx={190 + c * 8} cy={10 + r * 8} r="1" fill="rgba(242,180,0,0.15)" />
            ))
          )}
          {/* Intersection markers */}
          {[{ x: 140, y: 32 }, { x: 280, y: 32 }, { x: 140, y: 64 }, { x: 280, y: 64 }].map((p, i) => (
            <rect key={`sq${i}`} x={p.x - 2.5} y={p.y - 2.5} width="5" height="5" rx="1" fill="rgba(242,180,0,0.25)" />
          ))}
          {/* Circuit paths */}
          <path d="M0 48 H60 V68 H120" fill="none" stroke="rgba(242,180,0,0.06)" strokeWidth="0.8" />
          <path d="M260 0 V20 H320 V40" fill="none" stroke="rgba(242,180,0,0.05)" strokeWidth="0.8" />
        </svg>
        {/* Glow */}
        <div style={{ position: "absolute", top: 0, left: "25%", width: 160, height: 80, background: "radial-gradient(ellipse, rgba(242,180,0,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
        {/* Logo badge */}
        <div style={{
          position: "absolute", bottom: 10, left: 16,
          width: 36, height: 36, borderRadius: 10,
          background: "rgba(255,255,255,0.85)",
          border: "1px solid rgba(0,0,0,0.06)",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        }}>
          <Image src="/Modulr_logo.png" alt="Modulr" width={22} height={22} style={{ objectFit: "contain" }} unoptimized />
        </div>
        {/* Close */}
        <button
          onClick={handleDecline}
          aria-label="Close"
          style={{
            position: "absolute", top: 8, right: 8,
            width: 28, height: 28, borderRadius: 8,
            background: "rgba(0,0,0,0.04)", border: "none",
            color: "rgba(0,0,0,0.35)", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "background 0.15s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(0,0,0,0.08)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(0,0,0,0.04)"; }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
        </button>
      </div>

      {/* ── Content ── */}
      <div style={{ padding: "16px 20px 20px" }}>
        <h3 style={{ fontSize: 15, fontWeight: 600, color: "#000", marginBottom: 6 }}>
          We use cookies
        </h3>
        <p style={{ fontSize: 13, lineHeight: 1.6, color: "rgba(0,0,0,0.5)", marginBottom: 16 }}>
          We use cookies to enhance your experience, analyze traffic, and personalize content.{" "}
          <a href="/privacy-policy" style={{ color: "#000", textDecoration: "underline", textUnderlineOffset: 2 }}>Privacy Policy</a>
        </p>

        {/* Buttons — side by side */}
        <div style={{ display: "flex", gap: 10 }}>
          <button
            onClick={handleAccept}
            style={{
              flex: 1, height: 40, borderRadius: 10,
              background: "#000", color: "#fff",
              fontSize: 13, fontWeight: 600,
              border: "none", cursor: "pointer",
              transition: "opacity 0.15s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.85"; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
          >
            Accept all
          </button>
          <button
            onClick={handleDecline}
            style={{
              flex: 1, height: 40, borderRadius: 10,
              background: "rgba(0,0,0,0.04)", color: "#000",
              fontSize: 13, fontWeight: 500,
              border: "1px solid rgba(0,0,0,0.08)",
              cursor: "pointer", transition: "background 0.15s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(0,0,0,0.07)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(0,0,0,0.04)"; }}
          >
            Decline
          </button>
        </div>
      </div>

      <style>{`
        @keyframes cookieSlideUp {
          from { opacity: 0; transform: translateY(24px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}
