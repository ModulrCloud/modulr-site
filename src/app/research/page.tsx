"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { researchPosts } from "@/content/research";
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


/* ───────────────────────── CARD VISUAL CONFIGS ───────────────────────── */
type CardVisual = {
  /* Base background */
  bg: string;
  /* Whether card bg is dark (white text) */
  dark: boolean;
  /* Overlay text to show large on the visual */
  overlayText?: string;
  overlayTextSize?: number;
  /* Additional CSS pattern layer */
  pattern?: string;
  /* SVG overlay for geometric art */
  svg?: React.ReactNode;
};

const cardVisuals: CardVisual[] = [
  {
    /* Warm noisy gradient — like the ElevenLabs hero */
    bg: "linear-gradient(145deg, #4a3f8a 0%, #6e5fa8 20%, #a18595 40%, #c49b7a 60%, #8a7bb5 80%, #5f6fb0 100%)",
    dark: true,
    pattern: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.15'/%3E%3C/svg%3E\")",
  },
  {
    /* Deep dark with topographic lines */
    bg: "linear-gradient(160deg, #1a1a2e 0%, #16213e 40%, #0f3460 70%, #1a1a2e 100%)",
    dark: true,
    overlayText: "Latency\n< 50ms",
    overlayTextSize: 48,
    svg: (
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.12 }} viewBox="0 0 400 400" preserveAspectRatio="none">
        {Array.from({ length: 20 }, (_, i) => (
          <ellipse key={i} cx="200" cy="200" rx={40 + i * 16} ry={30 + i * 12} fill="none" stroke="#fff" strokeWidth="0.5" />
        ))}
      </svg>
    ),
  },
  {
    /* Coral-red with wavy mesh (like ElevenLabs Government card) */
    bg: "linear-gradient(145deg, #dc6b55 0%, #c55a4b 30%, #8b3a3a 60%, #a54a4a 100%)",
    dark: true,
    pattern: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.18'/%3E%3C/svg%3E\")",
    svg: (
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.18 }} viewBox="0 0 400 400" preserveAspectRatio="none">
        {Array.from({ length: 12 }, (_, i) => (
          <path
            key={i}
            d={`M 0 ${30 + i * 28} Q 100 ${15 + i * 28} 200 ${30 + i * 28} T 400 ${30 + i * 28}`}
            fill="none"
            stroke="#fff"
            strokeWidth="1"
          />
        ))}
      </svg>
    ),
  },
  {
    /* Amber-teal duotone */
    bg: "linear-gradient(135deg, #1a3c34 0%, #2d6a4f 25%, #d4a373 55%, #c08552 80%, #8b6914 100%)",
    dark: true,
    overlayText: "Market\nDesign",
    overlayTextSize: 44,
    pattern: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.14'/%3E%3C/svg%3E\")",
  },
  {
    /* Cool indigo-violet (like ElevenLabs Expressive Mode) */
    bg: "linear-gradient(145deg, #1e1b4b 0%, #312e81 30%, #4338ca 55%, #6366f1 80%, #818cf8 100%)",
    dark: true,
    svg: (
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.1 }} viewBox="0 0 400 400" preserveAspectRatio="none">
        {Array.from({ length: 8 }, (_, i) => (
          <circle key={i} cx={100 + (i % 3) * 100} cy={100 + Math.floor(i / 3) * 100} r={20 + i * 8} fill="none" stroke="#fff" strokeWidth="0.8" strokeDasharray="4 4" />
        ))}
      </svg>
    ),
    pattern: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.12'/%3E%3C/svg%3E\")",
  },
  {
    /* Warm pink-orange sunset */
    bg: "linear-gradient(135deg, #831843 0%, #be185d 25%, #f97316 55%, #fbbf24 85%, #fde68a 100%)",
    dark: true,
    overlayText: "Blockchain\nSafety",
    overlayTextSize: 42,
    pattern: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.16'/%3E%3C/svg%3E\")",
  },
];

/* Noise overlay inline SVG for grain texture */
const noiseOverlaySvg = "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.25'/%3E%3C/svg%3E\")";

function CardVisualBlock({ visual, title, height = 420 }: { visual: CardVisual; title: string; height?: number }) {
  return (
    <div style={{ position: "relative", height, overflow: "hidden", borderRadius: T.radiusXl }}>
      {/* Base gradient */}
      <div style={{ position: "absolute", inset: 0, background: visual.bg }} />

      {/* Noise / grain overlay */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: noiseOverlaySvg, backgroundSize: "256px 256px", mixBlendMode: "overlay", opacity: 0.7 }} />

      {/* Additional pattern */}
      {visual.pattern && (
        <div style={{ position: "absolute", inset: 0, backgroundImage: visual.pattern, backgroundSize: "400px 400px" }} />
      )}

      {/* SVG geometry */}
      {visual.svg}

      {/* Overlay text (big centered text) */}
      {visual.overlayText && (
        <div style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 32,
        }}>
          <div style={{
            fontSize: visual.overlayTextSize ?? 48,
            fontWeight: 700,
            lineHeight: 1.1,
            color: "#fff",
            textAlign: "center",
            whiteSpace: "pre-line",
            textShadow: "0 2px 20px rgba(0,0,0,0.25)",
            letterSpacing: "-0.03em",
          }}>
            {visual.overlayText}
          </div>
        </div>
      )}

      {/* If no overlay text, show the title as ambient text */}
      {!visual.overlayText && (
        <div style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 40,
        }}>
          <div style={{
            fontSize: "clamp(28px, 3.5vw, 40px)",
            fontWeight: 600,
            lineHeight: 1.15,
            color: visual.dark ? "#fff" : T.text,
            textAlign: "center",
            textShadow: visual.dark ? "0 2px 16px rgba(0,0,0,0.2)" : "none",
            letterSpacing: "-0.02em",
            maxWidth: 400,
          }}>
            {title}
          </div>
        </div>
      )}

      {/* Category pill — top left */}
      <div style={{ position: "absolute", top: 16, left: 16 }}>
        <div style={{
          padding: "5px 14px",
          borderRadius: T.radiusPill,
          background: visual.dark ? "rgba(255,255,255,0.88)" : "rgba(0,0,0,0.08)",
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.06em",
          textTransform: "uppercase" as const,
          color: T.text,
          backdropFilter: "blur(4px)",
        }}>
          RESEARCH
        </div>
      </div>
    </div>
  );
}

export default function ElevenResearchPage() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const navLinks = [
    { label: "Robots", href: "/robots" },
    { label: "Web3", href: "/web3" },
    { label: "Research", href: "/research" },
    { label: "News", href: "/news" },
    { label: "Team", href: "/team" },
    { label: "Brand Kit", href: "/brand-kit" },
  ];

  return (
    <div style={{ background: T.bg, color: T.text, fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      {/* HEADER */}
      <header style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(255,255,255,0.82)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", borderBottom: sectionBorder }}>
        <div style={{ maxWidth: T.maxW, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, fontWeight: 700, fontSize: 18, color: T.text, textDecoration: "none", letterSpacing: "-0.02em" }}><Image src="/Modulr_logo.png" alt="Modulr" width={28} height={28} style={{ objectFit: "contain" }} unoptimized />Modulr</Link>
            <nav className="el-desktop-only" style={{ gap: 4 }}>
              {navLinks.map((item) => (
                <Link key={item.label} href={item.href} style={{ padding: "6px 12px", fontSize: 14, color: item.href === "/research" ? T.text : T.muted, fontWeight: item.href === "/research" ? 600 : 400, textDecoration: "none", borderRadius: 8 }}>
                  {item.label}
                </Link>
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
        {/* Mobile nav dropdown */}
        <div className={`el-mobile-menu${isMobileNavOpen ? " open" : ""}`}>
          {navLinks.map((item) => (
            <Link key={item.label} href={item.href} onClick={() => setIsMobileNavOpen(false)} style={{ padding: "10px 0", fontSize: 15, color: item.href === "/research" ? T.text : T.muted, fontWeight: item.href === "/research" ? 600 : 400, textDecoration: "none" }}>
              {item.label}
            </Link>
          ))}
          <Link href="https://testnet.explorer.modulr.cloud/" target="_blank" rel="noreferrer" onClick={() => setIsMobileNavOpen(false)} style={{ padding: "10px 0", fontSize: 15, color: T.muted, textDecoration: "none" }}>Explorer</Link>
        </div>
      </header>

      {/* HERO */}
      <section style={{ padding: "clamp(60px, 8vw, 120px) 24px 60px", maxWidth: T.maxW, margin: "0 auto" }}>
        <h1 style={{ fontSize: "clamp(40px, 6vw, 64px)", fontWeight: 500, letterSpacing: "-0.04em", lineHeight: 1.06, marginBottom: 16 }}>
          Research
        </h1>
        <p style={{ fontSize: 17, color: T.muted, maxWidth: 640, lineHeight: 1.6 }}>
          Our vision is to make communication and creation with technology seamless. We build our own foundational models, beginning with the first human-like voice model and now extending far beyond voice.
        </p>
      </section>

      {/* FEATURED POST (full-width hero card like ElevenLabs blog) */}
      {researchPosts.length > 0 && (
        <section style={{ padding: "0 24px 20px", maxWidth: T.maxW, margin: "0 auto" }}>
          <Link href={`/research/${researchPosts[0].slug}`} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
            <div style={{ position: "relative", overflow: "hidden", borderRadius: T.radiusXl, cursor: "pointer", minHeight: 480 }}>
              {/* Visual */}
              <div style={{ position: "absolute", inset: 0, background: cardVisuals[0].bg }} />
              <div style={{ position: "absolute", inset: 0, backgroundImage: noiseOverlaySvg, backgroundSize: "256px 256px", mixBlendMode: "overlay", opacity: 0.7 }} />
              {cardVisuals[0].pattern && <div style={{ position: "absolute", inset: 0, backgroundImage: cardVisuals[0].pattern, backgroundSize: "400px 400px" }} />}
              {cardVisuals[0].svg}

              {/* Category pill */}
              <div style={{ position: "absolute", top: 20, left: 20 }}>
                <div style={{ padding: "5px 14px", borderRadius: T.radiusPill, background: "rgba(255,255,255,0.88)", fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" as const, color: T.text, backdropFilter: "blur(4px)" }}>
                  {researchPosts[0].category}
                </div>
              </div>

              {/* Centered title */}
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", padding: 48 }}>
                <h2 style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 600, color: "#fff", textAlign: "center", textShadow: "0 2px 20px rgba(0,0,0,0.2)", letterSpacing: "-0.03em", lineHeight: 1.1, maxWidth: 700 }}>
                  {researchPosts[0].title}
                </h2>
              </div>

              {/* Bottom bar */}
              <div style={{ position: "absolute", bottom: 20, left: 20, right: 20, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", gap: 8 }}>
                  {researchPosts[0].tags.slice(0, 3).map((tag) => (
                    <span key={tag} style={{ padding: "4px 12px", borderRadius: T.radiusPill, background: "rgba(255,255,255,0.2)", backdropFilter: "blur(8px)", fontSize: 12, color: "#fff", fontWeight: 500 }}>{tag}</span>
                  ))}
                </div>
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.7)" }}>{researchPosts[0].date} · {researchPosts[0].readingMinutes} min read</span>
              </div>
            </div>

            {/* Below-card info */}
            <div style={{ padding: "16px 4px 0", display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontSize: 13, color: T.muted2, marginBottom: 2 }}>{researchPosts[0].date}</div>
              </div>
              <span style={{
                padding: "8px 20px",
                borderRadius: T.radiusPill,
                background: T.accent,
                color: T.accentFg,
                fontSize: 14,
                fontWeight: 600,
                textDecoration: "none",
              }}>
                READ ARTICLE
              </span>
            </div>
          </Link>
        </section>
      )}

      {/* POSTS GRID (2-column like ElevenLabs blog) */}
      <section style={{ maxWidth: T.maxW, margin: "0 auto" }} className="el-section-pad">
        <div className="el-g2">
          {researchPosts.slice(1).map((post, idx) => {
            const visual = cardVisuals[(idx + 1) % cardVisuals.length];
            return (
              <Link key={post.slug} href={`/research/${post.slug}`} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
                <div>
                  <CardVisualBlock visual={visual} title={post.title} height={420} />

                  {/* Below-card meta */}
                  <div style={{ padding: "16px 4px 0" }}>
                    <h3 style={{ fontSize: 18, fontWeight: 600, letterSpacing: "-0.01em", lineHeight: 1.35, marginBottom: 4 }}>{post.title}</h3>
                    <div style={{ fontSize: 13, color: T.muted2 }}>{post.date} · {post.readingMinutes} min read</div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
      <ModulrFooter />
    </div>
  );
}
