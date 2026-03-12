"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { MODULR_LINKS } from "@/config/links";

/* ── Design tokens (matching site style) ── */
const T = {
  text: "#000000",
  muted: "rgba(0,0,0,0.55)",
  muted2: "rgba(0,0,0,0.38)",
  border: "rgba(0,0,0,0.08)",
  maxW: 1200,
};

const sectionBorder = `1px solid ${T.border}`;

const footerCols = [
  {
    title: "Platform",
    links: [
      { label: "Operator Console", href: MODULR_LINKS.APP },
      { label: "Fleet Management", href: "/robots" },
      { label: "Teleoperation", href: "/robots" },
      { label: "Data Marketplace", href: "/web3" },
      { label: "Staking", href: "/web3" },
      { label: "Explorer", href: "https://testnet.explorer.modulr.cloud" },
    ],
  },
  {
    title: "Products",
    links: [
      { label: "Modulr SDK", href: MODULR_LINKS.DOCS },
      { label: "Teleoperation API", href: MODULR_LINKS.DOCS },
      { label: "Fleet API", href: MODULR_LINKS.DOCS },
      { label: "Network API", href: MODULR_LINKS.DOCS },
      { label: "Digital Twins", href: "/robots" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "For Enterprise", href: "/robots" },
      { label: "For Developers", href: MODULR_LINKS.DOCS },
      { label: "For Robot Owners", href: "/robots" },
      { label: "Industrial", href: "/robots" },
      { label: "Healthcare", href: "/robots" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: MODULR_LINKS.DOCS },
      { label: "Research", href: "/research" },
      { label: "News", href: "/news" },
      { label: "Brand Kit", href: "/brand-kit" },
      { label: "Privacy Policy", href: "/privacy-policy" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "X (Twitter)", href: MODULR_LINKS.X },
      { label: "LinkedIn", href: MODULR_LINKS.LINKEDIN },
      { label: "GitHub", href: MODULR_LINKS.GITHUB },
      { label: "Telegram", href: MODULR_LINKS.TELEGRAM },
      { label: "Linktree", href: MODULR_LINKS.LINKTREE },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/team" },
      { label: "Careers", href: "/careers" },
      { label: "Web3", href: "/web3" },
      { label: "Robots", href: "/robots" },
    ],
  },
];

/**
 * Unified footer for all /eleven-style (light) pages.
 * Drop-in: `<ModulrFooter />` — optionally pass `showCta` for the main page CTA block.
 */
export function ModulrFooter({ showCta = false }: { showCta?: boolean }) {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {showCta && (
        <div className="section-divider" style={{ maxWidth: T.maxW, margin: "0 auto" }} />
      )}
      {showCta && (
        <section style={{ padding: "80px 24px", textAlign: "center" }}>
          <div style={{ maxWidth: T.maxW, margin: "0 auto" }}>
            <h2 className="text-shimmer" style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 500, letterSpacing: "-0.03em", lineHeight: 1.08, marginBottom: 16 }}>
              The open network for<br />robot operations
            </h2>
            <p style={{ fontSize: 17, color: T.muted, maxWidth: 540, margin: "0 auto 32px", lineHeight: 1.6 }}>
              Connect your robots, operate remotely, and earn from the global robotics economy — all on one platform.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
              <Link href={MODULR_LINKS.APP} target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", height: 48, padding: "0 24px", background: "#000", color: "#fff", borderRadius: 999, fontSize: 15, fontWeight: 600, textDecoration: "none" }}>
                Launch App
              </Link>
              <Link href={MODULR_LINKS.DEMO} target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", height: 48, padding: "0 24px", background: "#f5f5f7", color: "#000", borderRadius: 999, fontSize: 15, fontWeight: 500, textDecoration: "none", border: sectionBorder }}>
                Book a Demo
              </Link>
            </div>
          </div>
        </section>
      )}

      <footer style={{ borderTop: sectionBorder, padding: "60px 24px 40px", background: "#fff" }}>
        <div style={{ maxWidth: T.maxW, margin: "0 auto" }}>
          {/* Top row */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 40 }}>
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
              <Image src="/Modulr_logo.png" alt="Modulr" width={24} height={24} style={{ objectFit: "contain" }} unoptimized />
              <span style={{ fontWeight: 700, fontSize: 18, letterSpacing: "-0.02em", color: T.text }}>Modulr</span>
            </Link>
          </div>

          {/* Columns */}
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "32px 0" }} className="footer-cols">
            {footerCols.map((col) => (
              <div key={col.title}>
                <div style={{ fontSize: 13, fontWeight: 600, color: T.text, marginBottom: 12 }}>{col.title}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {col.links.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                      style={{ fontSize: 13, color: T.muted, textDecoration: "none", transition: "color 0.15s" }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = T.text; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = T.muted; }}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom */}
          <div style={{ marginTop: 48, paddingTop: 24, borderTop: sectionBorder, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <span style={{ fontSize: 12, color: T.muted2 }}>© {new Date().getFullYear()} Modulr. All rights reserved.</span>
            <div style={{ display: "flex", gap: 16 }}>
              <Link href="/privacy-policy" style={{ fontSize: 12, color: T.muted2, textDecoration: "none" }}>Privacy</Link>
              <Link href="/careers" style={{ fontSize: 12, color: T.muted2, textDecoration: "none" }}>Careers</Link>
              <Link href={MODULR_LINKS.DOCS} target="_blank" rel="noreferrer" style={{ fontSize: 12, color: T.muted2, textDecoration: "none" }}>Docs</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll-to-top button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Scroll to top"
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          width: 44,
          height: 44,
          borderRadius: 12,
          background: "rgba(255,255,255,0.9)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: sectionBorder,
          boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          opacity: showScrollTop ? 1 : 0,
          pointerEvents: showScrollTop ? "auto" : "none",
          transform: showScrollTop ? "translateY(0)" : "translateY(12px)",
          transition: "opacity 0.3s, transform 0.3s",
          zIndex: 50,
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 15l-6-6-6 6" />
        </svg>
      </button>
    </>
  );
}
