"use client";

import { useState, useEffect } from "react";

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
        background: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        border: "1px solid rgba(0,0,0,0.08)",
        boxShadow: "0 20px 60px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.04)",
        padding: "22px 24px",
        animation: "cookieSlideUp 0.45s cubic-bezier(0.16, 1, 0.3, 1)",
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      {/* Close */}
      <button
        onClick={handleDecline}
        aria-label="Close"
        style={{
          position: "absolute", top: 12, right: 12,
          width: 28, height: 28, borderRadius: 8,
          background: "transparent", border: "none",
          color: "rgba(0,0,0,0.35)", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
      </button>

      {/* Icon + title */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
        <div style={{
          width: 36, height: 36, borderRadius: 10,
          background: "linear-gradient(135deg, #f2b400 0%, #e09800 100%)",
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <circle cx="8" cy="9" r="1.2" fill="#000" stroke="none" />
            <circle cx="15" cy="9" r="1.2" fill="#000" stroke="none" />
            <circle cx="10" cy="15" r="1.2" fill="#000" stroke="none" />
            <circle cx="15.5" cy="13" r="1" fill="#000" stroke="none" />
            <circle cx="7" cy="13" r="0.8" fill="#000" stroke="none" />
          </svg>
        </div>
        <span style={{ fontSize: 15, fontWeight: 600, color: "#000", letterSpacing: "-0.01em" }}>
          We use cookies
        </span>
      </div>

      <p style={{ fontSize: 13, lineHeight: 1.6, color: "rgba(0,0,0,0.55)", marginBottom: 18, paddingRight: 16 }}>
        We use cookies to enhance your experience, analyze traffic, and personalize content.
        Read our <a href="/privacy-policy" style={{ color: "#000", textDecoration: "underline", textUnderlineOffset: 2 }}>Privacy Policy</a>.
      </p>

      {/* Buttons */}
      <div style={{ display: "flex", gap: 10 }}>
        <button
          onClick={handleAccept}
          style={{
            flex: 1,
            height: 40,
            borderRadius: 10,
            background: "#000",
            color: "#fff",
            fontSize: 13,
            fontWeight: 600,
            border: "none",
            cursor: "pointer",
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
            flex: 1,
            height: 40,
            borderRadius: 10,
            background: "rgba(0,0,0,0.05)",
            color: "#000",
            fontSize: 13,
            fontWeight: 500,
            border: "1px solid rgba(0,0,0,0.08)",
            cursor: "pointer",
            transition: "background 0.15s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(0,0,0,0.08)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(0,0,0,0.05)"; }}
        >
          Decline
        </button>
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
