"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
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
  radiusLg: 24,
  radiusXl: 32,
  radiusPill: 999,
  maxW: 1200,
  sectionPy: "clamp(80px, 10vw, 140px)",
};

const sectionBorder = `1px solid ${T.border}`;

/* ───────────────────────── NAV ITEMS ───────────────────────── */
const navItems = [
  { label: "Robots", href: "/robots" },
  { label: "Web3", href: "/web3" },
  { label: "Research", href: "/research" },
  { label: "News", href: "/news" },
  { label: "Team", href: "/team" },
  { label: "Brand Kit", href: "/brand-kit" },
];

/* ───────────────────────── BRAND COLORS ───────────────────────── */
const brandColors = [
  { name: "Accent Gold", hex: "#f2b400", desc: "Primary brand accent. Used for highlights, CTAs, and key visual elements.", dark: false },
  { name: "Black", hex: "#000000", desc: "Primary text and backgrounds. Clean and authoritative.", dark: true },
  { name: "White", hex: "#ffffff", desc: "Base background. Creates clean, modern spacing.", dark: false, border: true },
  { name: "Surface", hex: "#f5f5f7", desc: "Card backgrounds, subtle containers, and section dividers.", dark: false },
  { name: "Indigo", hex: "#6366f1", desc: "Web3 track accent. Used for blockchain and network features.", dark: true },
  { name: "Emerald", hex: "#10B981", desc: "Success states, online indicators, and positive metrics.", dark: true },
];

/* ───────────────────────── LOGO VARIANTS ───────────────────────── */
const logoVariants = [
  { name: "Wordmark — Dark", bg: "#ffffff", color: "#000000", borderCol: T.border },
  { name: "Wordmark — Light", bg: "#000000", color: "#ffffff", borderCol: "transparent" },
  { name: "Wordmark — Gold", bg: "#1a1a1a", color: "#f2b400", borderCol: "transparent" },
];

/* ───────────────────────── TYPOGRAPHY ───────────────────────── */
const typeSamples = [
  { label: "Display", size: 64, weight: 500, tracking: "-0.04em", sample: "Robot Operation at Scale" },
  { label: "Heading 1", size: 42, weight: 500, tracking: "-0.03em", sample: "Building the global robot economy" },
  { label: "Heading 2", size: 28, weight: 600, tracking: "-0.02em", sample: "A new standard of control" },
  { label: "Body", size: 16, weight: 400, tracking: "0", sample: "A real-time robot operations platform built for enterprise performance and an open network economy." },
  { label: "Caption", size: 13, weight: 500, tracking: "0.02em", sample: "MODULR · ROBOTICS + WEB3" },
];


export default function BrandKitPage() {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const copyHex = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(null), 1500);
  };

  return (
    <div style={{ background: T.bg, color: T.text, fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      {/* ════════════ HEADER ════════════ */}
      <header style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(255,255,255,0.82)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", borderBottom: sectionBorder }}>
        <div style={{ maxWidth: T.maxW, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, fontWeight: 700, fontSize: 18, color: T.text, textDecoration: "none", letterSpacing: "-0.02em" }}><Image src="/Modulr_logo.png" alt="Modulr" width={28} height={28} style={{ objectFit: "contain" }} unoptimized />Modulr</Link>
            <nav className="el-desktop-only" style={{ gap: 4 }}>
              {navItems.map((item) => (
                <Link key={item.label} href={item.href} style={{ padding: "6px 12px", fontSize: 14, color: T.muted, textDecoration: "none", borderRadius: 8 }}>{item.label}</Link>
              ))}
            </nav>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Link href="https://app.modulr.cloud/" target="_blank" rel="noreferrer" style={{ padding: "8px 18px", fontSize: 14, fontWeight: 600, color: T.accentFg, background: T.accent, borderRadius: T.radiusPill, textDecoration: "none" }}>Open App</Link>
            <button className="el-mobile-only" onClick={() => setIsMobileNavOpen(!isMobileNavOpen)} style={{ background: "none", border: "none", padding: 8, cursor: "pointer" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={T.text} strokeWidth="2" strokeLinecap="round"><path d={isMobileNavOpen ? "M6 6l12 12M6 18L18 6" : "M4 7h16M4 12h16M4 17h16"} /></svg>
            </button>
          </div>
        </div>
        <div className={`el-mobile-menu${isMobileNavOpen ? " open" : ""}`}>
          {navItems.map((item) => (
            <Link key={item.label} href={item.href} onClick={() => setIsMobileNavOpen(false)} style={{ padding: "10px 0", fontSize: 15, color: T.muted, textDecoration: "none" }}>
              {item.label}
            </Link>
          ))}
        </div>
      </header>

      {/* ════════════ HERO ════════════ */}
      <section style={{ padding: `${T.sectionPy} 24px 60px`, maxWidth: T.maxW, margin: "0 auto" }}>
        <div style={{ fontSize: 13, color: T.muted2, marginBottom: 8 }}>Brand</div>
        <h1 style={{ fontSize: "clamp(40px, 6vw, 64px)", fontWeight: 500, letterSpacing: "-0.04em", lineHeight: 1.05, marginBottom: 20 }}>
          Brand &amp; Press Kit
        </h1>
        <p style={{ fontSize: 17, color: T.muted, maxWidth: 640, lineHeight: 1.6, marginBottom: 32 }}>
          Guidelines, assets, and resources for representing Modulr in media, presentations, and partner materials.
        </p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <a href="#" style={{ display: "inline-flex", alignItems: "center", height: 44, padding: "0 22px", background: T.accent, color: T.accentFg, borderRadius: T.radiusPill, fontSize: 14, fontWeight: 600, textDecoration: "none" }}>
            Download Brand Assets
          </a>
          <a href="#colors" style={{ display: "inline-flex", alignItems: "center", height: 44, padding: "0 22px", background: T.surface, color: T.text, borderRadius: T.radiusPill, fontSize: 14, fontWeight: 500, textDecoration: "none", border: sectionBorder }}>
            View guidelines
          </a>
        </div>
      </section>

      {/* ════════════ LOGO ════════════ */}
      <section style={{ borderTop: sectionBorder, padding: `${T.sectionPy} 24px`, maxWidth: T.maxW, margin: "0 auto" }}>
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontSize: 13, color: T.muted2, marginBottom: 8 }}>Logo</div>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 500, letterSpacing: "-0.03em" }}>
            Wordmark
          </h2>
          <p style={{ marginTop: 12, fontSize: 16, color: T.muted, maxWidth: 640, lineHeight: 1.65 }}>
            The Modulr wordmark is our primary identifier. Always use it with sufficient clear space and never distort proportions.
          </p>
        </div>

        <div className="el-g3" style={{ gap: 16 }}>
          {logoVariants.map((v) => (
            <div key={v.name} style={{ borderRadius: T.radiusXl, border: `1px solid ${v.borderCol}`, overflow: "hidden" }}>
              <div style={{
                background: v.bg,
                height: 200,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <span style={{ fontSize: 36, fontWeight: 700, letterSpacing: "-0.03em", color: v.color }}>
                  Modulr
                </span>
              </div>
              <div style={{ padding: "16px 20px", borderTop: `1px solid ${v.borderCol || T.border}` }}>
                <div style={{ fontSize: 14, fontWeight: 500 }}>{v.name}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Logo don'ts */}
        <div style={{ marginTop: 40 }}>
          <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>Usage guidelines</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
            {[
              { rule: "Maintain minimum clear space equal to the height of the 'M'", icon: "✓" },
              { rule: "Don't rotate, skew, or add effects to the logo", icon: "✗" },
              { rule: "Don't change the typeface or letter spacing", icon: "✗" },
              { rule: "Use on solid backgrounds only — no busy imagery", icon: "✗" },
            ].map((item) => (
              <div key={item.rule} style={{ padding: 20, borderRadius: T.radius, border: sectionBorder, background: T.surface }}>
                <div style={{ fontSize: 18, marginBottom: 8, color: item.icon === "✓" ? "#10B981" : "#EF4444" }}>{item.icon}</div>
                <p style={{ fontSize: 13, color: T.muted, lineHeight: 1.5 }}>{item.rule}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ COLORS ════════════ */}
      <section id="colors" style={{ borderTop: sectionBorder, padding: `${T.sectionPy} 24px`, maxWidth: T.maxW, margin: "0 auto" }}>
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontSize: 13, color: T.muted2, marginBottom: 8 }}>Color</div>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 500, letterSpacing: "-0.03em" }}>
            Brand Palette
          </h2>
          <p style={{ marginTop: 12, fontSize: 16, color: T.muted, maxWidth: 640, lineHeight: 1.65 }}>
            Our palette is intentionally restrained — black, white, and gold — to convey precision and authority. Accent colors differentiate our two tracks.
          </p>
        </div>

        <div className="el-g3" style={{ gap: 16 }}>
          {brandColors.map((c) => (
            <div
              key={c.hex}
              onClick={() => copyHex(c.hex)}
              style={{
                borderRadius: T.radiusXl,
                border: c.border ? sectionBorder : "none",
                overflow: "hidden",
                cursor: "pointer",
                transition: "transform 0.15s",
              }}
            >
              <div style={{
                height: 120,
                background: c.hex,
                display: "flex",
                alignItems: "flex-end",
                padding: 14,
              }}>
                <span style={{
                  fontSize: 12,
                  fontFamily: "var(--font-geist-mono), monospace",
                  color: c.dark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.4)",
                  fontWeight: 500,
                }}>
                  {copiedColor === c.hex ? "Copied!" : c.hex}
                </span>
              </div>
              <div style={{ padding: "14px 16px", background: "#fff", border: c.border ? "none" : sectionBorder, borderTop: "none", borderBottomLeftRadius: T.radiusXl, borderBottomRightRadius: T.radiusXl }}>
                <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{c.name}</div>
                <p style={{ fontSize: 12, color: T.muted, lineHeight: 1.4 }}>{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════ TYPOGRAPHY ════════════ */}
      <section style={{ borderTop: sectionBorder, padding: `${T.sectionPy} 24px`, maxWidth: T.maxW, margin: "0 auto" }}>
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontSize: 13, color: T.muted2, marginBottom: 8 }}>Typography</div>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 500, letterSpacing: "-0.03em" }}>
            Type System
          </h2>
          <p style={{ marginTop: 12, fontSize: 16, color: T.muted, maxWidth: 640, lineHeight: 1.65 }}>
            We use the system font stack for performance and native feel. Tight tracking on headings, relaxed on body text.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {typeSamples.map((t, i) => (
            <div key={t.label} style={{ padding: "28px 0", borderTop: i === 0 ? sectionBorder : "none", borderBottom: sectionBorder }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 12, flexWrap: "wrap" }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: T.muted2, letterSpacing: "0.05em", minWidth: 100 }}>{t.label}</span>
                <span style={{ fontSize: 12, color: T.muted2, fontFamily: "var(--font-geist-mono), monospace" }}>
                  {t.size}px · {t.weight} · {t.tracking}
                </span>
              </div>
              <div style={{ fontSize: Math.min(t.size, 48), fontWeight: t.weight, letterSpacing: t.tracking, lineHeight: 1.2, color: T.text }}>
                {t.sample}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════ TONE OF VOICE ════════════ */}
      <section style={{ borderTop: sectionBorder, padding: `${T.sectionPy} 24px`, maxWidth: T.maxW, margin: "0 auto" }}>
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontSize: 13, color: T.muted2, marginBottom: 8 }}>Voice</div>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 500, letterSpacing: "-0.03em" }}>
            Tone &amp; Voice
          </h2>
        </div>

        <div className="el-g3" style={{ gap: 16 }}>
          {[
            { trait: "Precise", desc: "We say what we mean. No buzzwords, no fluff. Technical accuracy builds trust.", example: "\"Sub-500ms latency with end-to-end encryption.\"" },
            { trait: "Bold", desc: "We're building something new. Our language reflects ambition without arrogance.", example: "\"The open network for robot operations.\"" },
            { trait: "Clear", desc: "Complex technology, simple communication. If it can't be understood quickly, rewrite it.", example: "\"Connect your robots. Operate remotely. Earn.\"" },
          ].map((item) => (
            <div key={item.trait} style={{ borderRadius: T.radiusXl, border: sectionBorder, padding: 24, background: T.surface }}>
              <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>{item.trait}</h3>
              <p style={{ fontSize: 14, color: T.muted, lineHeight: 1.55, marginBottom: 16 }}>{item.desc}</p>
              <div style={{ padding: 16, borderRadius: T.radius, background: "#fff", border: sectionBorder, fontStyle: "italic", fontSize: 14, color: T.text, lineHeight: 1.5 }}>
                {item.example}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════ VISUAL LANGUAGE ════════════ */}
      <section style={{ borderTop: sectionBorder, padding: `${T.sectionPy} 24px`, maxWidth: T.maxW, margin: "0 auto" }}>
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontSize: 13, color: T.muted2, marginBottom: 8 }}>Visual Language</div>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 500, letterSpacing: "-0.03em" }}>
            Illustration Style
          </h2>
          <p style={{ marginTop: 12, fontSize: 16, color: T.muted, maxWidth: 640, lineHeight: 1.65 }}>
            We use geometric, technical SVG illustrations — not stock photography. Clean lines, minimal palettes, and structural forms that evoke precision engineering.
          </p>
        </div>

        <div className="el-g3" style={{ gap: 16 }}>
          {/* Sample illustration 1 */}
          <div style={{ borderRadius: T.radiusXl, border: sectionBorder, background: T.surface, overflow: "hidden" }}>
            <div style={{ height: 220, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
              <svg width="160" height="160" viewBox="0 0 160 160" fill="none">
                <circle cx="80" cy="80" r="60" stroke={T.text} strokeWidth="0.5" strokeDasharray="3 3" opacity="0.15" />
                <circle cx="80" cy="80" r="40" stroke={T.text} strokeWidth="1" opacity="0.3" />
                <circle cx="80" cy="80" r="20" stroke={T.text} strokeWidth="1.5" opacity="0.5" />
                <circle cx="80" cy="80" r="4" fill={T.text} opacity="0.5" />
                <path d="M 80 20 L 80 35" stroke={T.text} strokeWidth="1" opacity="0.3" />
                <path d="M 80 125 L 80 140" stroke={T.text} strokeWidth="1" opacity="0.3" />
                <path d="M 20 80 L 35 80" stroke={T.text} strokeWidth="1" opacity="0.3" />
                <path d="M 125 80 L 140 80" stroke={T.text} strokeWidth="1" opacity="0.3" />
              </svg>
            </div>
            <div style={{ padding: "16px 20px", borderTop: sectionBorder }}>
              <div style={{ fontSize: 13, fontWeight: 600 }}>Concentric / Radar</div>
              <div style={{ fontSize: 12, color: T.muted }}>Network scanning, connectivity</div>
            </div>
          </div>

          {/* Sample illustration 2 */}
          <div style={{ borderRadius: T.radiusXl, border: sectionBorder, background: T.surface, overflow: "hidden" }}>
            <div style={{ height: 220, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
              <svg width="160" height="160" viewBox="0 0 160 160" fill="none">
                <rect x="30" y="50" width="50" height="50" stroke={T.text} strokeWidth="1" opacity="0.4" />
                <rect x="80" y="60" width="50" height="50" stroke={T.text} strokeWidth="0.5" strokeDasharray="3 3" opacity="0.2" />
                <line x1="30" y1="50" x2="50" y2="30" stroke={T.text} strokeWidth="0.5" strokeDasharray="3 3" opacity="0.2" />
                <line x1="80" y1="50" x2="100" y2="30" stroke={T.text} strokeWidth="0.5" strokeDasharray="3 3" opacity="0.2" />
                <line x1="80" y1="100" x2="100" y2="80" stroke={T.text} strokeWidth="1" opacity="0.4" />
                <rect x="50" y="30" width="50" height="50" stroke={T.text} strokeWidth="0.5" strokeDasharray="3 3" opacity="0.15" />
              </svg>
            </div>
            <div style={{ padding: "16px 20px", borderTop: sectionBorder }}>
              <div style={{ fontSize: 13, fontWeight: 600 }}>Isometric / Spatial</div>
              <div style={{ fontSize: 12, color: T.muted }}>Architecture, data structures</div>
            </div>
          </div>

          {/* Sample illustration 3 */}
          <div style={{ borderRadius: T.radiusXl, border: sectionBorder, background: T.surface, overflow: "hidden" }}>
            <div style={{ height: 220, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
              <svg width="160" height="160" viewBox="0 0 160 160" fill="none">
                <ellipse cx="80" cy="80" rx="60" ry="30" stroke={T.text} strokeWidth="0.5" strokeDasharray="3 3" opacity="0.2" />
                <ellipse cx="80" cy="80" rx="60" ry="30" stroke={T.text} strokeWidth="0.5" strokeDasharray="3 3" opacity="0.2" transform="rotate(60 80 80)" />
                <ellipse cx="80" cy="80" rx="60" ry="30" stroke={T.text} strokeWidth="0.5" strokeDasharray="3 3" opacity="0.2" transform="rotate(120 80 80)" />
                <ellipse cx="80" cy="80" rx="40" ry="20" stroke={T.text} strokeWidth="1" opacity="0.4" />
                <ellipse cx="80" cy="80" rx="40" ry="20" stroke={T.text} strokeWidth="1" opacity="0.4" transform="rotate(60 80 80)" />
                <ellipse cx="80" cy="80" rx="40" ry="20" stroke={T.text} strokeWidth="1" opacity="0.4" transform="rotate(120 80 80)" />
                <circle cx="80" cy="80" r="3" fill={T.text} opacity="0.5" />
              </svg>
            </div>
            <div style={{ padding: "16px 20px", borderTop: sectionBorder }}>
              <div style={{ fontSize: 13, fontWeight: 600 }}>Orbital / Atomic</div>
              <div style={{ fontSize: 12, color: T.muted }}>Security, encryption, protocols</div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ CONTACT ════════════ */}
      <section style={{ borderTop: sectionBorder, padding: "60px 24px 80px", textAlign: "center" }}>
        <div style={{ maxWidth: T.maxW, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 500, letterSpacing: "-0.03em", marginBottom: 16 }}>
            Need something specific?
          </h2>
          <p style={{ fontSize: 16, color: T.muted, maxWidth: 480, margin: "0 auto 32px", lineHeight: 1.6 }}>
            For press inquiries, custom assets, or partnership materials, reach out to our team directly.
          </p>
          <a href="mailto:press@modulr.cloud" style={{ display: "inline-flex", alignItems: "center", height: 48, padding: "0 24px", background: T.accent, color: T.accentFg, borderRadius: T.radiusPill, fontSize: 15, fontWeight: 600, textDecoration: "none" }}>
            Contact press team
          </a>
        </div>
      </section>
      <ModulrFooter />
    </div>
  );
}
