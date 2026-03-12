"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { careerDepartments, careerPosts } from "@/content/careers";

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
  gold: "#f2b400",
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

/* ───────────────────────── FOOTER ───────────────────────── */
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
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Docs", href: "https://modulr.gitbook.io/modulr.cloud" },
      { label: "Brand Kit", href: "/brand-kit" },
      { label: "Pricing", href: "/pricing" },
      { label: "Roadmap", href: "/roadmap" },
      { label: "Privacy Policy", href: "/privacy-policy" },
    ],
  },
  {
    title: "Community",
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
    ],
  },
];

function TypeBadge({ type }: { type: string }) {
  const colors: Record<string, { bg: string; text: string; border: string }> = {
    "Full-time": { bg: "rgba(16,185,129,0.08)", text: "#059669", border: "rgba(16,185,129,0.18)" },
    "Part-time": { bg: "rgba(59,130,246,0.08)", text: "#2563eb", border: "rgba(59,130,246,0.18)" },
    Contract: { bg: "rgba(245,158,11,0.08)", text: "#d97706", border: "rgba(245,158,11,0.18)" },
  };
  const c = colors[type] ?? { bg: T.surface, text: T.muted, border: T.border };
  return (
    <span style={{ display: "inline-flex", alignItems: "center", padding: "3px 10px", borderRadius: T.radiusPill, background: c.bg, color: c.text, border: `1px solid ${c.border}`, fontSize: 11, fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase" }}>
      {type}
    </span>
  );
}

export default function CareersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDept, setSelectedDept] = useState("All");
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const filtered = useMemo(() => {
    return careerPosts.filter((post) => {
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        q === "" ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.department.toLowerCase().includes(q) ||
        post.location.toLowerCase().includes(q);
      const matchesDept = selectedDept === "All" || post.department === selectedDept;
      return matchesSearch && matchesDept;
    });
  }, [searchQuery, selectedDept]);

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
      <section style={{ padding: "clamp(60px, 8vw, 120px) 24px 40px", maxWidth: T.maxW, margin: "0 auto" }}>
        <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: T.muted2, marginBottom: 16 }}>CAREERS</div>
        <h1 style={{ fontSize: "clamp(40px, 6vw, 64px)", fontWeight: 500, letterSpacing: "-0.04em", lineHeight: 1.06, marginBottom: 16 }}>
          Join the team building the<br />robot economy
        </h1>
        <p style={{ fontSize: 17, color: T.muted, maxWidth: 600, lineHeight: 1.6, marginBottom: 32 }}>
          We&apos;re looking for talented engineers, designers, and operators to help us create the open infrastructure that powers autonomous robotics worldwide.
        </p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <a href="mailto:careers@modulr.cloud" style={{ padding: "12px 28px", borderRadius: T.radiusPill, background: T.accent, color: T.accentFg, fontSize: 14, fontWeight: 600, textDecoration: "none", transition: "opacity 0.15s" }}>
            Contact HR
          </a>
          <Link href="/" style={{ padding: "12px 28px", borderRadius: T.radiusPill, border: sectionBorder, background: "#fff", color: T.text, fontSize: 14, fontWeight: 500, textDecoration: "none" }}>
            Learn about Modulr
          </Link>
        </div>
      </section>

      {/* ═══ STATS BAR ═══ */}
      <section style={{ borderTop: sectionBorder, borderBottom: sectionBorder, padding: "0 24px" }}>
        <div style={{ maxWidth: T.maxW, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 0 }}>
          {[
            { value: `${careerPosts.length}`, label: "Open Positions" },
            { value: "Remote-first", label: "Work Style" },
            { value: "5+", label: "Countries" },
            { value: "24/7", label: "Building" },
          ].map((stat, i) => (
            <div key={i} style={{ padding: "28px 0", borderLeft: i > 0 ? sectionBorder : "none", paddingLeft: i > 0 ? 24 : 0 }}>
              <div style={{ fontSize: 28, fontWeight: 600, letterSpacing: "-0.02em", color: T.text }}>{stat.value}</div>
              <div style={{ fontSize: 13, color: T.muted2, marginTop: 4 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ SEARCH & FILTER ═══ */}
      <section style={{ padding: "40px 24px 0", maxWidth: T.maxW, margin: "0 auto" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Search */}
          <div style={{ position: "relative", maxWidth: 440 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: T.muted2 }}>
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" />
              <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              placeholder="Search positions…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: "100%", padding: "12px 16px 12px 44px", borderRadius: 12, border: sectionBorder, background: T.surface, fontSize: 14, color: T.text, outline: "none" }}
            />
          </div>
          {/* Department pills */}
          <div style={{ display: "flex", gap: 8, overflowX: "auto", WebkitOverflowScrolling: "touch", paddingBottom: 4 }} className="scrollbar-hide">
            {careerDepartments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                style={{
                  padding: "8px 18px",
                  borderRadius: T.radiusPill,
                  border: selectedDept === dept ? `1px solid ${T.text}` : sectionBorder,
                  background: selectedDept === dept ? T.text : "#fff",
                  color: selectedDept === dept ? T.accentFg : T.muted,
                  fontSize: 14,
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "all 0.15s",
                  whiteSpace: "nowrap",
                }}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ POSITIONS LIST ═══ */}
      <section style={{ padding: "40px 24px 80px", maxWidth: T.maxW, margin: "0 auto" }}>
        {filtered.length > 0 ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {filtered.map((post) => (
              <Link key={post.slug} href={`/careers/${post.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
                <div style={{
                  padding: "24px 28px",
                  borderRadius: T.radius,
                  border: sectionBorder,
                  background: "#fff",
                  cursor: "pointer",
                  transition: "box-shadow 0.2s, border-color 0.2s",
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.06)"; e.currentTarget.style.borderColor = "rgba(0,0,0,0.15)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = T.border; }}
                >
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {/* Badges row */}
                    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8, marginBottom: 4 }}>
                      <span style={{ padding: "3px 10px", borderRadius: T.radiusPill, background: "rgba(242,180,0,0.1)", border: "1px solid rgba(242,180,0,0.2)", color: "#b8860b", fontSize: 11, fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase" }}>
                        {post.department}
                      </span>
                      <TypeBadge type={post.type} />
                      <span style={{ fontSize: 12, color: T.muted2 }}>{post.level}</span>
                    </div>
                    {/* Title */}
                    <h3 style={{ fontSize: 18, fontWeight: 600, letterSpacing: "-0.01em", color: T.text }}>{post.title}</h3>
                    {/* Excerpt */}
                    <p style={{ fontSize: 14, lineHeight: 1.6, color: T.muted, maxWidth: 700 }}>{post.excerpt}</p>
                    {/* Meta row */}
                    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 16, marginTop: 4, fontSize: 12, color: T.muted2 }}>
                      <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" /><circle cx="12" cy="9" r="2.5" /></svg>
                        {post.location}
                      </span>
                      {post.salary && (
                        <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                          {post.salary}
                        </span>
                      )}
                      <span>Posted {post.posted}</span>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 13, fontWeight: 500, color: T.muted, marginTop: 12 }}>
                    View position <span style={{ transition: "transform 0.2s" }}>→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "80px 24px" }}>
            <div style={{ fontSize: 18, color: T.muted }}>No positions found</div>
            <p style={{ fontSize: 14, color: T.muted2, marginTop: 8 }}>Try adjusting your search or filters</p>
          </div>
        )}

        {/* Open application CTA */}
        <div style={{ marginTop: 64, padding: "48px 40px", borderRadius: T.radiusXl, border: sectionBorder, background: T.surface, textAlign: "center" }}>
          <h3 style={{ fontSize: 24, fontWeight: 600, letterSpacing: "-0.02em" }}>Don&apos;t see a perfect fit?</h3>
          <p style={{ fontSize: 15, color: T.muted, maxWidth: 500, margin: "12px auto 24px", lineHeight: 1.6 }}>
            We&apos;re always looking for exceptional talent. Send us your resume and tell us how you&apos;d like to contribute to the robot economy.
          </p>
          <a href="mailto:careers@modulr.cloud?subject=Open Application" style={{ display: "inline-block", padding: "12px 28px", borderRadius: T.radiusPill, background: T.accent, color: T.accentFg, fontSize: 14, fontWeight: 600, textDecoration: "none" }}>
            Send Open Application
          </a>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer style={{ borderTop: sectionBorder, padding: "60px 24px 40px", background: "#fff" }}>
        <div style={{ maxWidth: T.maxW, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 40 }}>
            <span style={{ fontWeight: 700, fontSize: 18, letterSpacing: "-0.02em" }}>Modulr</span>
          </div>
          <div className="el-g7">
            {footerCols.map((col) => (
              <div key={col.title}>
                <div style={{ fontSize: 13, fontWeight: 600, color: T.text, marginBottom: 12 }}>{col.title}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {col.links.map((link) => (
                    <Link key={link.label} href={link.href} target={link.href.startsWith("http") ? "_blank" : undefined} rel={link.href.startsWith("http") ? "noreferrer" : undefined} style={{ fontSize: 13, color: T.muted, textDecoration: "none" }}>{link.label}</Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 48, paddingTop: 24, borderTop: sectionBorder, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <span style={{ fontSize: 12, color: T.muted2 }}>© {new Date().getFullYear()} Modulr. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
