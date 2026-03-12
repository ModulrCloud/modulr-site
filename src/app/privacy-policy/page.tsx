"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ModulrFooter } from "@/components/ModulrFooter";

/* ───────────────────────── DESIGN TOKENS ───────────────────────── */
const T = {
  bg: "#ffffff",
  text: "#000000",
  muted: "rgba(0,0,0,0.55)",
  muted2: "rgba(0,0,0,0.38)",
  border: "rgba(0,0,0,0.08)",
  surface: "#f5f5f7",
  accent: "#000",
  accentFg: "#fff",
  radius: 16,
  radiusXl: 32,
  radiusPill: 999,
  maxW: 1200,
};

const sectionBorder = `1px solid ${T.border}`;

const navLinks = [
  { label: "Robots", href: "/robots" },
  { label: "Web3", href: "/web3" },
  { label: "Research", href: "/research" },
  { label: "News", href: "/news" },
  { label: "Team", href: "/team" },
  { label: "Brand Kit", href: "/brand-kit" },
];

const sections = [
  {
    title: "On-Chain Operations",
    body: "Modulr is a blockchain-native platform. All activity, whether related to co-chains, job execution, or governance, is processed on-chain. This means transaction data such as wallet addresses and actions are inherently public and transparent. Modulr does not log or store additional metadata outside of this.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
  {
    title: "Zero Collection of Personal Data",
    body: "Modulr does not request, collect, or store personally identifiable information (PII). You engage with the platform through your Web3 wallet, with no usernames, passwords, or emails required. User privacy is preserved by design.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: "Integration with WalletConnect and Similar Tools",
    body: "When connecting to Modulr, you may use third-party tools like WalletConnect. While Modulr does not track or analyze your data, these integrations may use cookies or other technologies for connection purposes. Please refer to those services' privacy policies for more information.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    ),
  },
  {
    title: "Global Privacy Considerations",
    body: "Though we do not handle personal data, Modulr aligns with key principles of international privacy frameworks, including GDPR, CCPA, and other applicable regional standards. Our decentralized model inherently limits data exposure, ensuring compliance with privacy-first practices.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
  {
    title: "Local Law Responsibility",
    body: "Users are responsible for ensuring that their use of Modulr complies with the laws and regulations of their jurisdiction. Modulr does not apply geo-restrictions but recommends all participants operate in accordance with local legal requirements.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4l3 3" />
      </svg>
    ),
  },
  {
    title: "Security Commitments",
    body: "We apply best-practice security measures across our smart contracts and supporting infrastructure. Regular audits and reviews are part of our protocol development process. Users are solely responsible for managing the safety of their wallets, private keys, and device environments.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
  {
    title: "No Commercial Exploitation of User Data",
    body: "Modulr does not share, monetize, or commercialize user data. We do not partner with data brokers or engage in targeted advertising practices.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18" />
        <circle cx="12" cy="12" r="10" />
      </svg>
    ),
  },
  {
    title: "Immutable Ledger Records",
    body: "The decentralized nature of Modulr ensures that all transactions and updates to the network are permanent. Once submitted, data cannot be altered or removed — this is a fundamental principle of blockchain technology.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
  },
  {
    title: "Use of External Services",
    body: "Modulr may reference or integrate third-party websites and tools. We are not responsible for the privacy or data practices of these external entities. Always consult their privacy terms when engaging with external resources.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
        <polyline points="15 3 21 3 21 9" />
        <line x1="10" y1="14" x2="21" y2="3" />
      </svg>
    ),
  },
  {
    title: "Future Revisions",
    body: "As Modulr evolves, we may update this policy to reflect technical, legal, or community-driven changes. Any such updates will be posted with a revised effective date and made accessible on our website.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 4 23 10 17 10" />
        <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
      </svg>
    ),
  },
  {
    title: "Get in Touch",
    body: "For inquiries or concerns regarding this Privacy Policy, contact us via our website at modulr.cloud or through Telegram at t.me/Modulr_Robotics.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
];

export default function PrivacyPolicyPage() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
    <div style={{ background: T.bg, color: T.text, fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      {/* ═══ HEADER ═══ */}
      <header style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(255,255,255,0.82)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", borderBottom: sectionBorder }}>
        <div style={{ maxWidth: T.maxW, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, fontWeight: 700, fontSize: 18, color: T.text, textDecoration: "none", letterSpacing: "-0.02em" }}>
              <Image src="/Modulr_logo.png" alt="Modulr" width={28} height={28} style={{ objectFit: "contain" }} unoptimized />Modulr
            </Link>
            <nav className="el-desktop-only" style={{ gap: 4 }}>
              {navLinks.map((item) => (
                <Link key={item.label} href={item.href} style={{ padding: "6px 12px", fontSize: 14, color: T.muted, fontWeight: 400, textDecoration: "none", borderRadius: 8 }}>{item.label}</Link>
              ))}
            </nav>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Link href="https://testnet.explorer.modulr.cloud/" target="_blank" rel="noreferrer" className="el-desktop-only" style={{ padding: "8px 18px", fontSize: 14, fontWeight: 500, color: T.text, textDecoration: "none", borderRadius: T.radiusPill, border: sectionBorder, background: "#fff" }}>Explorer</Link>
            <Link href="https://app.modulr.cloud/" target="_blank" rel="noreferrer" style={{ padding: "8px 18px", fontSize: 14, fontWeight: 600, color: T.accentFg, background: T.accent, borderRadius: T.radiusPill, textDecoration: "none" }}>Open App</Link>
            <button className="el-mobile-only" onClick={() => setIsMobileNavOpen(!isMobileNavOpen)} style={{ background: "none", border: "none", padding: 8, cursor: "pointer" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={T.text} strokeWidth="2" strokeLinecap="round"><path d={isMobileNavOpen ? "M6 6l12 12M6 18L18 6" : "M4 7h16M4 12h16M4 17h16"} /></svg>
            </button>
          </div>
        </div>
        <div className={`el-mobile-menu${isMobileNavOpen ? " open" : ""}`}>
          {navLinks.map((item) => (
            <Link key={item.label} href={item.href} onClick={() => setIsMobileNavOpen(false)} style={{ padding: "10px 0", fontSize: 15, color: T.muted, textDecoration: "none" }}>{item.label}</Link>
          ))}
        </div>
      </header>

      {/* ═══ HERO ═══ */}
      <section style={{ padding: "clamp(60px, 8vw, 120px) 24px 40px", maxWidth: 900, margin: "0 auto" }}>
        <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: T.muted2, marginBottom: 16 }}>LEGAL</div>
        <h1 style={{ fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 500, letterSpacing: "-0.04em", lineHeight: 1.1, marginBottom: 20 }}>
          Privacy Policy
        </h1>
        <p style={{ fontSize: 16, color: T.muted, lineHeight: 1.7, maxWidth: 680 }}>
          This Privacy Policy outlines how Modulr handles data and user activity within its decentralized operating infrastructure. Our commitment is to protect user privacy while ensuring transparency across all services and technologies we offer.
        </p>
        <div style={{ marginTop: 24, display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: T.muted2 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" /></svg>
          Last updated: March 2026
        </div>
      </section>

      {/* ═══ TABLE OF CONTENTS ═══ */}
      <section style={{ padding: "0 24px 48px", maxWidth: 900, margin: "0 auto" }}>
        <div style={{ borderRadius: T.radius, background: T.surface, border: sectionBorder, padding: "24px 28px" }}>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 12, color: T.text }}>Contents</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {sections.map((s, i) => (
              <a key={i} href={`#section-${i}`} style={{ fontSize: 13, color: T.muted, textDecoration: "none", transition: "color 0.15s", display: "flex", gap: 8 }}>
                <span style={{ color: T.muted2, minWidth: 20, fontVariantNumeric: "tabular-nums" }}>{i + 1}.</span>
                {s.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SECTIONS ═══ */}
      <section style={{ padding: "0 24px 80px", maxWidth: 900, margin: "0 auto" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {sections.map((s, i) => (
            <div key={i} id={`section-${i}`} style={{ padding: "36px 0", borderTop: sectionBorder }}>
              <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: T.surface, border: sectionBorder, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: T.text }}>
                  {s.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 10 }}>
                    <span style={{ fontSize: 12, color: T.muted2, fontVariantNumeric: "tabular-nums" }}>{String(i + 1).padStart(2, "0")}</span>
                    <h2 style={{ fontSize: 18, fontWeight: 600, letterSpacing: "-0.01em" }}>{s.title}</h2>
                  </div>
                  <p style={{ fontSize: 15, lineHeight: 1.7, color: T.muted }}>{s.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <ModulrFooter />
    </div>
  );
}
