"use client";

import { use } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { useState } from "react";
import { careerPosts } from "@/content/careers";

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

type Props = {
  params: Promise<{ slug: string }>;
};

export default function CareerPostPage({ params }: Props) {
  const { slug } = use(params);
  const post = careerPosts.find((p) => p.slug === slug);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  if (!post) notFound();

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

      {/* ═══ BREADCRUMB ═══ */}
      <section style={{ padding: "32px 24px 0", maxWidth: 900, margin: "0 auto" }}>
        <Link href="/careers" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 14, color: T.muted, textDecoration: "none", transition: "color 0.15s" }}>
          ← All positions
        </Link>
      </section>

      {/* ═══ JOB HEADER ═══ */}
      <section style={{ padding: "24px 24px 40px", maxWidth: 900, margin: "0 auto" }}>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8, marginBottom: 16 }}>
          <span style={{ padding: "3px 10px", borderRadius: T.radiusPill, background: "rgba(242,180,0,0.1)", border: "1px solid rgba(242,180,0,0.2)", color: "#b8860b", fontSize: 11, fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase" }}>
            {post.department}
          </span>
          <span style={{ padding: "3px 10px", borderRadius: T.radiusPill, background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.18)", color: "#059669", fontSize: 11, fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase" }}>
            {post.type}
          </span>
        </div>
        <h1 style={{ fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 20 }}>
          {post.title}
        </h1>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 20, fontSize: 14, color: T.muted, marginBottom: 28 }}>
          <span>{post.location}</span>
          <span>{post.level}</span>
          {post.salary && <span>{post.salary}</span>}
          <span>Posted {post.posted}</span>
        </div>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <a href={`mailto:careers@modulr.cloud?subject=Application: ${post.title}`} style={{ padding: "12px 28px", borderRadius: T.radiusPill, background: T.accent, color: T.accentFg, fontSize: 14, fontWeight: 600, textDecoration: "none" }}>
            Apply Now
          </a>
          <button
            onClick={() => { navigator.clipboard?.writeText(window.location.href); }}
            style={{ padding: "12px 28px", borderRadius: T.radiusPill, border: sectionBorder, background: "#fff", color: T.text, fontSize: 14, fontWeight: 500, cursor: "pointer" }}
          >
            Share Position
          </button>
        </div>
      </section>

      {/* ═══ CONTENT ═══ */}
      <section style={{ borderTop: sectionBorder, padding: "60px 24px 80px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr", gap: 48 }} className="career-detail-grid">
          {/* Main content */}
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 600, marginBottom: 16 }}>About the Role</h2>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: T.muted, marginBottom: 12 }}>{post.excerpt}</p>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: T.muted }}>
              At Modulr, we&apos;re building the open network for the robot economy. This role is critical to our mission of enabling real-time teleoperation of robotic systems anywhere in the world.
            </p>

            <h3 style={{ fontSize: 18, fontWeight: 600, marginTop: 40, marginBottom: 16 }}>What You&apos;ll Do</h3>
            <ul style={{ display: "flex", flexDirection: "column", gap: 10, paddingLeft: 0, listStyle: "none" }}>
              {[
                "Design and implement core systems for the Modulr Network",
                "Collaborate with cross-functional teams including robotics and blockchain engineers",
                "Write clean, maintainable, and well-tested code",
                "Participate in architecture discussions and code reviews",
                "Contribute to open-source projects when applicable",
              ].map((item) => (
                <li key={item} style={{ display: "flex", gap: 10, fontSize: 15, lineHeight: 1.6, color: T.muted }}>
                  <span style={{ color: T.gold, fontWeight: 700, flexShrink: 0 }}>•</span>
                  {item}
                </li>
              ))}
            </ul>

            <h3 style={{ fontSize: 18, fontWeight: 600, marginTop: 40, marginBottom: 16 }}>What We&apos;re Looking For</h3>
            <ul style={{ display: "flex", flexDirection: "column", gap: 10, paddingLeft: 0, listStyle: "none" }}>
              {[
                "3+ years of professional experience in a relevant field",
                "Strong problem-solving skills and attention to detail",
                "Excellent communication skills",
                "Passion for robotics, blockchain, or distributed systems",
                "Self-motivated with ability to work in a fast-paced environment",
              ].map((item) => (
                <li key={item} style={{ display: "flex", gap: 10, fontSize: 15, lineHeight: 1.6, color: T.muted }}>
                  <span style={{ color: T.gold, fontWeight: 700, flexShrink: 0 }}>•</span>
                  {item}
                </li>
              ))}
            </ul>

            <h3 style={{ fontSize: 18, fontWeight: 600, marginTop: 40, marginBottom: 16 }}>Nice to Have</h3>
            <ul style={{ display: "flex", flexDirection: "column", gap: 10, paddingLeft: 0, listStyle: "none" }}>
              {[
                "Experience with real-time systems or low-latency applications",
                "Contributions to open-source projects",
                "Experience in startups or early-stage companies",
              ].map((item) => (
                <li key={item} style={{ display: "flex", gap: 10, fontSize: 15, lineHeight: 1.6, color: T.muted }}>
                  <span style={{ color: T.gold, fontWeight: 700, flexShrink: 0 }}>•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Sidebar */}
          <div>
            <div style={{ borderRadius: T.radius, border: sectionBorder, background: T.surface, padding: "28px 24px", position: "sticky", top: 88 }}>
              <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 20 }}>Position Details</h3>
              <dl style={{ display: "flex", flexDirection: "column", gap: 16, fontSize: 14 }}>
                {[
                  { label: "Department", value: post.department },
                  { label: "Location", value: post.location },
                  { label: "Employment Type", value: post.type },
                  { label: "Level", value: post.level },
                  ...(post.salary ? [{ label: "Compensation", value: post.salary }] : []),
                ].map((item) => (
                  <div key={item.label}>
                    <dt style={{ color: T.muted2, fontSize: 12, marginBottom: 2 }}>{item.label}</dt>
                    <dd style={{ color: T.text, fontWeight: 500 }}>{item.value}</dd>
                  </div>
                ))}
              </dl>
              <div style={{ marginTop: 24, paddingTop: 20, borderTop: sectionBorder }}>
                <a href={`mailto:careers@modulr.cloud?subject=Application: ${post.title}`} style={{ display: "block", width: "100%", textAlign: "center", padding: "12px 0", borderRadius: T.radiusPill, background: T.accent, color: T.accentFg, fontSize: 14, fontWeight: 600, textDecoration: "none" }}>
                  Apply Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer style={{ borderTop: sectionBorder, padding: "60px 24px 40px", background: "#fff" }}>
        <div style={{ maxWidth: T.maxW, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 40 }}>
            <span style={{ fontWeight: 700, fontSize: 18, letterSpacing: "-0.02em" }}>Modulr</span>
          </div>
          <div style={{ marginTop: 24, paddingTop: 24, borderTop: sectionBorder, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <span style={{ fontSize: 12, color: T.muted2 }}>© {new Date().getFullYear()} Modulr. All rights reserved.</span>
            <Link href="/careers" style={{ fontSize: 13, color: T.muted, textDecoration: "none" }}>← Back to all positions</Link>
          </div>
        </div>
      </footer>

      <style>{`
        @media (min-width: 768px) {
          .career-detail-grid {
            grid-template-columns: 1fr 280px !important;
          }
        }
      `}</style>
    </div>
  );
}
