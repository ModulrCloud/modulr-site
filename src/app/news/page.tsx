"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

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

/* ───────────────────────── MODULR ANNOUNCEMENTS ───────────────────────── */
const modulrUpdates = [
  {
    title: "Modulr launches mainnet and $MDR token with multi-chain interoperability",
    gradient: "linear-gradient(145deg, #2d1117 0%, #4a1942 30%, #6b2152 60%, #8b3a62 100%)",
    pattern: "repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(255,255,255,0.04) 8px, rgba(255,255,255,0.04) 9px)",
    image: null as string | null,
    category: "Product",
    date: "2026",
  },
  {
    title: "Modulr and University of Oxford join forces on next-gen autonomous robotics research",
    gradient: "linear-gradient(145deg, #002147 0%, #003366 30%, #1a5276 60%, #2e86c1 100%)",
    pattern: "radial-gradient(circle at 30% 60%, rgba(255,255,255,0.06) 0%, transparent 50%)",
    image: "/Modulr_Oxford.jpeg",
    category: "Company",
    date: "2026",
  },
  {
    title: "Modulr partners with NVIDIA Inception to accelerate enterprise robotics",
    gradient: "linear-gradient(145deg, #0c4a6e 0%, #0369a1 25%, #3b82f6 50%, #f59e0b 80%, #f97316 100%)",
    pattern: "radial-gradient(circle at 70% 40%, rgba(255,255,255,0.08) 0%, transparent 50%)",
    image: "/NVIDIA_3.jpeg",
    category: "Company",
    date: "2026",
  },
];

/* gradient palette for card visuals */
const cardGradients = [
  "linear-gradient(135deg, #667eea, #764ba2)",
  "linear-gradient(145deg, #1a0a3e, #4338ca, #6366f1)",
  "linear-gradient(135deg, #f59e0b, #f97316, #ef4444)",
  "linear-gradient(135deg, #059669, #10b981, #34d399)",
  "linear-gradient(145deg, #0284c7, #0ea5e9, #38bdf8)",
  "linear-gradient(135deg, #be185d, #ec4899, #f9a8d4)",
  "linear-gradient(135deg, #7c3aed, #a78bfa, #c4b5fd)",
  "linear-gradient(145deg, #d97706, #fbbf24, #fde68a)",
];

const categories = ["All", "Product", "Company", "Developer", "Research"];

type NewsItem = {
  href: string;
  title: string;
  meta: string;
  image: string;
  category?: string;
};

/** Infer category from the RSS source name embedded in meta */
function inferCategory(meta: string): string {
  const m = meta.toLowerCase();
  if (m.includes("ieee") || m.includes("robohub")) return "Research";
  if (m.includes("robot report")) return "Developer";
  return "Developer";
}

const navLinks = [
  { label: "Robots", href: "/robots" },
  { label: "Web3", href: "/web3" },
  { label: "Research", href: "/research" },
  { label: "News", href: "/news" },
  { label: "Team", href: "/team" },
  { label: "Brand Kit", href: "/brand-kit" },
];

export default function ElevenNewsPage() {
  const [stories, setStories] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  useEffect(() => {
    fetch("/api/robotics-news?limit=15")
      .then((r) => r.json())
      .then((data: { stories: NewsItem[] }) => {
        const tagged = (data.stories ?? []).map((s) => ({
          ...s,
          category: inferCategory(s.meta),
        }));
        setStories(tagged);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  /* ── filtered views ── */
  const filteredAnnouncements = activeCategory === "All"
    ? modulrUpdates
    : modulrUpdates.filter((p) => p.category === activeCategory);

  const filteredStories = activeCategory === "All"
    ? stories
    : stories.filter((s) => s.category === activeCategory);

  return (
    <div style={{ background: T.bg, color: T.text, fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      {/* HEADER */}
      <header style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(255,255,255,0.82)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", borderBottom: sectionBorder }}>
        <div style={{ maxWidth: T.maxW, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, fontWeight: 700, fontSize: 18, color: T.text, textDecoration: "none", letterSpacing: "-0.02em" }}><Image src="/Modulr_logo.png" alt="Modulr" width={28} height={28} style={{ objectFit: "contain" }} unoptimized />Modulr</Link>
            <nav className="el-desktop-only" style={{ gap: 4 }}>
              {navLinks.map((item) => (
                <Link key={item.label} href={item.href} style={{ padding: "6px 12px", fontSize: 14, color: item.href === "/news" ? T.text : T.muted, fontWeight: item.href === "/news" ? 600 : 400, textDecoration: "none", borderRadius: 8 }}>
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
            <Link key={item.label} href={item.href} onClick={() => setIsMobileNavOpen(false)} style={{ padding: "10px 0", fontSize: 15, color: item.href === "/news" ? T.text : T.muted, fontWeight: item.href === "/news" ? 600 : 400, textDecoration: "none" }}>
              {item.label}
            </Link>
          ))}
        </div>
      </header>

      {/* HERO */}
      <section style={{ padding: "clamp(60px, 8vw, 120px) 24px 40px", maxWidth: T.maxW, margin: "0 auto" }}>
        <h1 style={{ fontSize: "clamp(40px, 6vw, 64px)", fontWeight: 500, letterSpacing: "-0.04em", lineHeight: 1.06, marginBottom: 16 }}>
          Blog
        </h1>
        <p style={{ fontSize: 17, color: T.muted, maxWidth: 560, lineHeight: 1.6 }}>
          The latest news, product updates, and stories from the team.
        </p>
      </section>

      {/* CATEGORY PILLS */}
      <section style={{ padding: "0 24px 40px", maxWidth: T.maxW, margin: "0 auto" }}>
        <div style={{ display: "flex", gap: 8, overflowX: "auto", WebkitOverflowScrolling: "touch", paddingBottom: 4 }} className="scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: "8px 18px",
                borderRadius: T.radiusPill,
                border: activeCategory === cat ? `1px solid ${T.text}` : sectionBorder,
                background: activeCategory === cat ? T.text : "#fff",
                color: activeCategory === cat ? T.accentFg : T.muted,
                fontSize: 14,
                fontWeight: 500,
                cursor: "pointer",
                transition: "all 0.15s",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* ════════════ MODULR ANNOUNCEMENTS ════════════ */}
      {filteredAnnouncements.length > 0 && (
      <section style={{ padding: "0 24px 60px", maxWidth: T.maxW, margin: "0 auto" }}>
        <h2 style={{ fontSize: 24, fontWeight: 500, marginBottom: 24 }}>Modulr Announcements</h2>
        <div className="el-g3" style={{ gap: 20 }}>
          {filteredAnnouncements.map((post) => (
            <div key={post.title} style={{ borderRadius: T.radiusXl, overflow: "hidden", border: sectionBorder, cursor: "default" }}>
              <div style={{ height: 220, position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", inset: 0, background: post.gradient }} />
                <div style={{ position: "absolute", inset: 0, background: post.pattern }} />
                {post.image && (
                  <Image src={post.image} alt="" fill style={{ objectFit: "cover", opacity: 0.7 }} unoptimized />
                )}
              </div>
              <div style={{ padding: "18px 20px 22px" }}>
                <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                  <span style={{ padding: "3px 10px", borderRadius: T.radiusPill, background: T.surface, fontSize: 11, fontWeight: 600, color: T.muted }}>{post.category}</span>
                  <span style={{ fontSize: 11, color: T.muted2, display: "flex", alignItems: "center" }}>{post.date}</span>
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 600, lineHeight: 1.35, color: T.text }}>{post.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>
      )}

      {/* FEATURED POST */}
      {filteredStories.length > 0 && (
        <section style={{ padding: "0 24px 60px", maxWidth: T.maxW, margin: "0 auto" }}>
          <Link href={filteredStories[0].href} target="_blank" rel="noreferrer" style={{ textDecoration: "none", color: "inherit" }}>
            <div className="el-g-split-wide" style={{ borderRadius: T.radiusXl, overflow: "hidden", cursor: "pointer", transition: "box-shadow 0.2s" }}>
              <div style={{ background: cardGradients[0], minHeight: 380, position: "relative", overflow: "hidden" }}>
                {/* Blurred image backdrop */}
                <img src={filteredStories[0].image} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "blur(30px) saturate(1.6)", opacity: 0.5, transform: "scale(1.2)" }} />
                <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.15)" }} />
                <div style={{ position: "absolute", left: 24, bottom: 24 }}>
                  <span style={{ padding: "6px 14px", borderRadius: T.radiusPill, background: "rgba(255,255,255,0.9)", fontSize: 12, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" as const, color: T.text }}>Featured</span>
                </div>
              </div>
              <div style={{ padding: "40px 32px", background: T.surface, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <div style={{ fontSize: 12, color: T.muted2, marginBottom: 12 }}>{filteredStories[0].meta}</div>
                <h2 style={{ fontSize: 28, fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.2, marginBottom: 12 }}>{filteredStories[0].title}</h2>
                <div style={{ fontSize: 14, fontWeight: 500, color: T.text }}>Read article →</div>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* ALL POSTS GRID */}
      <section style={{ padding: "0 24px 80px", maxWidth: T.maxW, margin: "0 auto" }}>
        <h2 style={{ fontSize: 24, fontWeight: 500, marginBottom: 32 }}>Industry News</h2>
        {loading ? (
          <p style={{ fontSize: 14, color: T.muted }}>Loading news...</p>
        ) : filteredStories.length <= 1 ? (
          <p style={{ fontSize: 14, color: T.muted }}>{activeCategory === "All" ? "No stories available." : `No stories found for "${activeCategory}".`}</p>
        ) : (
          <div className="el-g3" style={{ gap: 20 }}>
            {filteredStories.slice(1).map((story, idx) => (
              <Link key={story.title + idx} href={story.href} target="_blank" rel="noreferrer" style={{ textDecoration: "none", color: "inherit" }}>
                <div style={{ borderRadius: T.radiusXl, overflow: "hidden", border: sectionBorder, transition: "box-shadow 0.2s", cursor: "pointer", height: "100%" }}>
                  <div style={{ height: 200, position: "relative", overflow: "hidden" }}>
                    <div style={{ position: "absolute", inset: 0, background: cardGradients[(idx + 1) % cardGradients.length] }} />
                    <img src={story.image} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "blur(20px) saturate(1.4)", opacity: 0.4, transform: "scale(1.15)" }} />
                    <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.05)" }} />
                  </div>
                  <div style={{ padding: "18px 20px 22px" }}>
                    <div style={{ fontSize: 11, color: T.muted2, marginBottom: 6 }}>{story.meta}</div>
                    <h3 style={{ fontSize: 16, fontWeight: 600, lineHeight: 1.35, color: T.text }}>{story.title}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* ════════════ FOOTER ════════════ */}
      <footer style={{ borderTop: sectionBorder, padding: "60px 24px 40px", background: "#fff" }}>
        <div style={{ maxWidth: T.maxW, margin: "0 auto" }}>
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
