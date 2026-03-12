"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { getResearchPost, researchPosts, type ResearchPost } from "@/content/research";

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
  maxW: 760,
  maxWFull: 1200,
};

const sectionBorder = `1px solid ${T.border}`;

/* ───────────────────────── FOOTER COLUMNS ───────────────────────── */
const footerCols = [
  {
    title: "Platform",
    links: [
      { label: "Operator Console", href: "https://app.modulr.cloud" },
      { label: "Fleet Management", href: "/technology-overview" },
      { label: "Teleoperation", href: "/technology-overview" },
      { label: "Data Marketplace", href: "#" },
      { label: "Staking", href: "#" },
      { label: "Explorer", href: "https://testnet.explorer.modulr.cloud" },
      { label: "Switchboard", href: "#" },
      { label: "Games Arena", href: "#" },
    ],
  },
  {
    title: "Products",
    links: [
      { label: "Modulr SDK", href: "https://docs.modulr.cloud" },
      { label: "Modulr Agent", href: "#" },
      { label: "Teleoperation API", href: "https://docs.modulr.cloud" },
      { label: "Fleet API", href: "https://docs.modulr.cloud" },
      { label: "Network API", href: "https://docs.modulr.cloud" },
      { label: "Digital Twins", href: "#" },
      { label: "Compute Credits", href: "#" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "For Enterprise", href: "#" },
      { label: "For Developers", href: "https://docs.modulr.cloud" },
      { label: "For Robot Owners", href: "#" },
      { label: "For Operators", href: "#" },
      { label: "Industrial", href: "#" },
      { label: "Entertainment", href: "#" },
      { label: "Defense & Security", href: "#" },
      { label: "Healthcare", href: "#" },
    ],
  },
  {
    title: "Earn",
    links: [
      { label: "List Your Robot", href: "#" },
      { label: "Become a Validator", href: "#" },
      { label: "Data Provider", href: "#" },
      { label: "Compute Provider", href: "#" },
      { label: "Affiliate Program", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "https://docs.modulr.cloud" },
      { label: "API Reference", href: "https://docs.modulr.cloud" },
      { label: "Help Center", href: "#" },
      { label: "Tokenomics", href: "#" },
      { label: "Governance", href: "#" },
      { label: "Terms", href: "#" },
      { label: "Privacy", href: "#" },
    ],
  },
  {
    title: "Socials",
    links: [
      { label: "X (Twitter)", href: "https://x.com/Modulr_Robotics" },
      { label: "LinkedIn", href: "http://linkedin.com/company/modulrcloud" },
      { label: "GitHub", href: "https://github.com/ModulrCloud" },
      { label: "Linktree", href: "https://linktr.ee/modulr.cloud" },
      { label: "Telegram", href: "https://t.me/Modulr_Robotics" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/team" },
      { label: "Research", href: "/research" },
      { label: "News", href: "/news" },
      { label: "Careers", href: "/careers" },
      { label: "Roadmap", href: "/roadmap" },
      { label: "Brand & Press Kit", href: "#" },
    ],
  },
];

/* ───────────────────────── CARD VISUAL CONFIGS (same as listing) ───────────────────────── */
type CardVisual = {
  bg: string;
  dark: boolean;
  overlayText?: string;
  overlayTextSize?: number;
  pattern?: string;
  svg?: React.ReactNode;
};

const cardVisuals: CardVisual[] = [
  {
    bg: "linear-gradient(145deg, #4a3f8a 0%, #6e5fa8 20%, #a18595 40%, #c49b7a 60%, #8a7bb5 80%, #5f6fb0 100%)",
    dark: true,
    pattern: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.15'/%3E%3C/svg%3E\")",
  },
  {
    bg: "linear-gradient(160deg, #1a1a2e 0%, #16213e 40%, #0f3460 70%, #1a1a2e 100%)",
    dark: true,
    svg: (
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.12 }} viewBox="0 0 400 400" preserveAspectRatio="none">
        {Array.from({ length: 20 }, (_, i) => (
          <ellipse key={i} cx="200" cy="200" rx={40 + i * 16} ry={30 + i * 12} fill="none" stroke="#fff" strokeWidth="0.5" />
        ))}
      </svg>
    ),
  },
  {
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
    bg: "linear-gradient(135deg, #1a3c34 0%, #2d6a4f 25%, #d4a373 55%, #c08552 80%, #8b6914 100%)",
    dark: true,
    pattern: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.14'/%3E%3C/svg%3E\")",
  },
];

const noiseOverlaySvg = "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.25'/%3E%3C/svg%3E\")";

/* ───────────────────────── ARTICLE BODY RENDERER ───────────────────────── */
function ArticleBody({ body }: { body: ResearchPost["body"] }) {
  if (!body || body.length === 0) return null;
  return (
    <div>
      {body.map((block, i) => {
        switch (block.kind) {
          case "p":
            return (
              <p key={i} style={{
                fontSize: 18,
                lineHeight: 1.75,
                color: "rgba(0,0,0,0.72)",
                marginBottom: 28,
                letterSpacing: "-0.003em",
              }}>
                {block.text}
              </p>
            );
          case "h2":
            return (
              <h2 key={i} style={{
                fontSize: 28,
                fontWeight: 600,
                color: T.text,
                marginTop: 48,
                marginBottom: 20,
                letterSpacing: "-0.03em",
                lineHeight: 1.2,
              }}>
                {block.text}
              </h2>
            );
          case "ul":
            return (
              <ul key={i} style={{
                paddingLeft: 24,
                marginBottom: 28,
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}>
                {block.items.map((item, j) => (
                  <li key={j} style={{
                    fontSize: 17,
                    lineHeight: 1.65,
                    color: "rgba(0,0,0,0.68)",
                  }}>
                    {item}
                  </li>
                ))}
              </ul>
            );
          case "blockquote":
            return (
              <blockquote key={i} style={{
                borderLeft: "3px solid #000",
                paddingLeft: 24,
                paddingTop: 4,
                paddingBottom: 4,
                marginTop: 36,
                marginBottom: 36,
                marginLeft: 0,
                marginRight: 0,
              }}>
                <p style={{
                  fontSize: 22,
                  fontWeight: 500,
                  lineHeight: 1.5,
                  color: "rgba(0,0,0,0.82)",
                  fontStyle: "italic",
                  letterSpacing: "-0.01em",
                }}>
                  {block.text}
                </p>
              </blockquote>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}

/* ───────────────────────── RELATED CARD ───────────────────────── */
function RelatedCard({ post, visualIdx }: { post: ResearchPost; visualIdx: number }) {
  const visual = cardVisuals[visualIdx % cardVisuals.length];
  return (
    <Link href={`/research/${post.slug}`} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
      <div style={{
        position: "relative",
        height: 220,
        overflow: "hidden",
        borderRadius: T.radiusXl,
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
      }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
          (e.currentTarget as HTMLDivElement).style.boxShadow = "0 12px 40px rgba(0,0,0,0.12)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
          (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
        }}
      >
        <div style={{ position: "absolute", inset: 0, background: visual.bg }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: noiseOverlaySvg, backgroundSize: "256px 256px", mixBlendMode: "overlay", opacity: 0.7 }} />
        {visual.pattern && <div style={{ position: "absolute", inset: 0, backgroundImage: visual.pattern, backgroundSize: "400px 400px" }} />}
        {visual.svg}

        {/* Category pill */}
        <div style={{ position: "absolute", top: 14, left: 14 }}>
          <div style={{
            padding: "4px 12px",
            borderRadius: T.radiusPill,
            background: "rgba(255,255,255,0.88)",
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.06em",
            textTransform: "uppercase" as const,
            color: T.text,
            backdropFilter: "blur(4px)",
          }}>
            {post.category}
          </div>
        </div>

        {/* Title */}
        <div style={{
          position: "absolute",
          bottom: 16,
          left: 16,
          right: 16,
        }}>
          <div style={{
            fontSize: 16,
            fontWeight: 600,
            color: "#fff",
            lineHeight: 1.3,
            textShadow: "0 2px 12px rgba(0,0,0,0.3)",
            letterSpacing: "-0.01em",
          }}>
            {post.title}
          </div>
        </div>
      </div>

      <div style={{ padding: "10px 4px 0" }}>
        <div style={{ fontSize: 13, color: T.muted2 }}>{post.date} · {post.readingMinutes} min read</div>
      </div>
    </Link>
  );
}

/* ───────────────────────── NAV LINKS ───────────────────────── */
const navLinks = [
  { label: "Robots", href: "/robots" },
  { label: "Web3", href: "/web3" },
  { label: "Research", href: "/research" },
  { label: "News", href: "/news" },
  { label: "Team", href: "/team" },
  { label: "Brand Kit", href: "/brand-kit" },
];

/* ───────────────────────── SHARED HEADER ───────────────────────── */
function PageHeader({ isMobileNavOpen, setIsMobileNavOpen }: { isMobileNavOpen: boolean; setIsMobileNavOpen: (v: boolean) => void }) {
  return (
    <header style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(255,255,255,0.82)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", borderBottom: sectionBorder }}>
      <div style={{ maxWidth: T.maxWFull, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
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
      <div className={`el-mobile-menu${isMobileNavOpen ? " open" : ""}`}>
        {navLinks.map((item) => (
          <Link key={item.label} href={item.href} onClick={() => setIsMobileNavOpen(false)} style={{ padding: "10px 0", fontSize: 15, color: item.href === "/research" ? T.text : T.muted, fontWeight: item.href === "/research" ? 600 : 400, textDecoration: "none" }}>
            {item.label}
          </Link>
        ))}
      </div>
    </header>
  );
}

/* ───────────────────────── PAGE ───────────────────────── */
export default function ElevenResearchArticlePage() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const params = useParams();
  const slug = typeof params.slug === "string" ? params.slug : "";
  const post = getResearchPost(slug);

  if (!post) {
    return (
      <div style={{ background: T.bg, color: T.text, minHeight: "100vh", display: "flex", flexDirection: "column", fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
        <PageHeader isMobileNavOpen={isMobileNavOpen} setIsMobileNavOpen={setIsMobileNavOpen} />
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16, padding: 40 }}>
          <h1 style={{ fontSize: 48, fontWeight: 500, letterSpacing: "-0.04em" }}>404</h1>
          <p style={{ fontSize: 17, color: T.muted }}>Research post not found</p>
          <Link href="/research" style={{ marginTop: 12, padding: "10px 24px", borderRadius: T.radiusPill, background: T.accent, color: T.accentFg, fontSize: 14, fontWeight: 600, textDecoration: "none" }}>
            ← Back to Research
          </Link>
        </div>
      </div>
    );
  }

  // Find the visual for this post
  const postIdx = researchPosts.findIndex((p) => p.slug === slug);
  const visual = cardVisuals[postIdx % cardVisuals.length];

  // Related posts (other posts excluding current)
  const related = researchPosts.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <div style={{ background: T.bg, color: T.text, fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <PageHeader isMobileNavOpen={isMobileNavOpen} setIsMobileNavOpen={setIsMobileNavOpen} />

      {/* HERO VISUAL — full-width gradient card */}
      <section style={{ padding: "0 24px", maxWidth: T.maxWFull, margin: "0 auto", paddingTop: 32 }}>
        <div style={{
          position: "relative",
          overflow: "hidden",
          borderRadius: T.radiusXl,
          minHeight: 400,
        }}>
          {/* Base gradient */}
          <div style={{ position: "absolute", inset: 0, background: visual.bg }} />
          {/* Noise grain overlay */}
          <div style={{ position: "absolute", inset: 0, backgroundImage: noiseOverlaySvg, backgroundSize: "256px 256px", mixBlendMode: "overlay", opacity: 0.7 }} />
          {/* Pattern */}
          {visual.pattern && <div style={{ position: "absolute", inset: 0, backgroundImage: visual.pattern, backgroundSize: "400px 400px" }} />}
          {/* SVG geometry */}
          {visual.svg}

          {/* Content overlay */}
          <div style={{
            position: "relative",
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            minHeight: 400,
            padding: "48px 48px 40px",
          }}>
            {/* Category + Tags row */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
              <span style={{
                padding: "5px 14px",
                borderRadius: T.radiusPill,
                background: "rgba(255,255,255,0.92)",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.06em",
                textTransform: "uppercase" as const,
                color: T.text,
              }}>
                {post.category}
              </span>
              {post.tags.map((tag) => (
                <span key={tag} style={{
                  padding: "5px 14px",
                  borderRadius: T.radiusPill,
                  background: "rgba(255,255,255,0.2)",
                  backdropFilter: "blur(8px)",
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                  color: "#fff",
                }}>
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 style={{
              fontSize: "clamp(32px, 5vw, 48px)",
              fontWeight: 600,
              color: "#fff",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              maxWidth: 700,
              textShadow: "0 2px 20px rgba(0,0,0,0.15)",
              marginBottom: 16,
            }}>
              {post.title}
            </h1>

            {/* Excerpt */}
            <p style={{
              fontSize: 17,
              color: "rgba(255,255,255,0.78)",
              lineHeight: 1.55,
              maxWidth: 560,
              marginBottom: 16,
            }}>
              {post.excerpt}
            </p>

            {/* Meta row */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              fontSize: 14,
              color: "rgba(255,255,255,0.6)",
            }}>
              <span>{post.date}</span>
              <span style={{ width: 3, height: 3, borderRadius: "50%", background: "rgba(255,255,255,0.4)" }} />
              <span>{post.readingMinutes} min read</span>
            </div>
          </div>
        </div>
      </section>

      {/* ARTICLE BODY */}
      <article style={{ maxWidth: T.maxW, margin: "0 auto", padding: "60px 24px 80px" }}>
        {/* Optional: Table of contents indicator */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 48,
          paddingBottom: 32,
          borderBottom: sectionBorder,
        }}>
          <div style={{
            width: 40,
            height: 40,
            borderRadius: 12,
            background: T.surface,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 18,
          }}>
            📄
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, letterSpacing: "-0.01em" }}>Research Article</div>
            <div style={{ fontSize: 13, color: T.muted2 }}>{post.category} · {post.readingMinutes} min read</div>
          </div>
        </div>

        {/* Body content */}
        <ArticleBody body={post.body} />

        {/* Divider */}
        <div style={{ height: 1, background: T.border, marginTop: 60, marginBottom: 40 }} />

        {/* Back link */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/research" style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            fontSize: 14,
            fontWeight: 500,
            color: T.muted,
            textDecoration: "none",
            transition: "color 0.2s",
          }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = T.text; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = T.muted as string; }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginTop: -1 }}>
              <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to Research
          </Link>

          {/* Share / copy link placeholder */}
          <button
            onClick={() => { navigator.clipboard?.writeText(window.location.href); }}
            style={{
              padding: "8px 16px",
              borderRadius: T.radiusPill,
              border: sectionBorder,
              background: "#fff",
              fontSize: 13,
              fontWeight: 500,
              color: T.muted,
              cursor: "pointer",
              transition: "all 0.2s",
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(0,0,0,0.2)";
              (e.currentTarget as HTMLButtonElement).style.color = T.text;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(0,0,0,0.08)";
              (e.currentTarget as HTMLButtonElement).style.color = T.muted as string;
            }}
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <rect x="5" y="5" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
              <path d="M3 11V3h8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
            Copy link
          </button>
        </div>
      </article>

      {/* RELATED POSTS */}
      {related.length > 0 && (
        <section style={{
          maxWidth: T.maxWFull,
          margin: "0 auto",
          padding: "0 24px 80px",
        }}>
          <div style={{
            borderTop: sectionBorder,
            paddingTop: 48,
          }}>
            <div style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              marginBottom: 32,
            }}>
              <h2 style={{
                fontSize: 28,
                fontWeight: 500,
                letterSpacing: "-0.03em",
              }}>
                More research
              </h2>
              <Link href="/research" style={{
                fontSize: 14,
                fontWeight: 500,
                color: T.muted,
                textDecoration: "none",
                transition: "color 0.2s",
              }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = T.text; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = T.muted as string; }}
              >
                View all →
              </Link>
            </div>

            <div className="el-g3">
              {related.map((rp, idx) => {
                const rIdx = researchPosts.findIndex((p) => p.slug === rp.slug);
                return <RelatedCard key={rp.slug} post={rp} visualIdx={rIdx} />;
              })}
            </div>
          </div>
        </section>
      )}

      {/* ════════════ FOOTER ════════════ */}
      <footer style={{ borderTop: sectionBorder, padding: "60px 24px 40px", background: "#fff" }}>
        <div style={{ maxWidth: T.maxWFull, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 40 }}>
            <span style={{ fontWeight: 700, fontSize: 18, letterSpacing: "-0.02em" }}>Modulr</span>
            <button style={{ padding: "6px 14px", borderRadius: 8, border: sectionBorder, background: "#fff", fontSize: 13, cursor: "pointer" }}>
              English
            </button>
          </div>
          <div className="el-g7">
            {footerCols.map((col) => (
              <div key={col.title}>
                <div style={{ fontSize: 13, fontWeight: 600, color: T.text, marginBottom: 12 }}>{col.title}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {col.links.map((link) => (
                    <Link key={link.label} href={link.href} target={link.href.startsWith("http") ? "_blank" : undefined} rel={link.href.startsWith("http") ? "noreferrer" : undefined} style={{ fontSize: 13, color: T.muted, textDecoration: "none", transition: "color 0.15s" }}>
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
