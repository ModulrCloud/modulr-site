"use client";

import { useState, useEffect } from "react";

export function ScrollToTopButton({ theme }: { theme: "dark" | "light" }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!show) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        width: 44,
        height: 44,
        borderRadius: "50%",
        background: theme === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
        border: `1px solid ${theme === "dark" ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)"}`,
        color: theme === "dark" ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.7)",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "opacity 0.3s, background 0.2s, border-color 0.2s, color 0.2s",
        zIndex: 50,
        backdropFilter: "blur(12px)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = theme === "dark" ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)";
        e.currentTarget.style.borderColor = theme === "dark" ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = theme === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
        e.currentTarget.style.borderColor = theme === "dark" ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)";
      }}
      aria-label="Scroll to top"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  );
}
