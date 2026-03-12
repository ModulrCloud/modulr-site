"use client";

import { useState } from "react";
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

/* ───────────────────────── TEAM DATA ───────────────────────── */
const team = [
  {
    name: "Christopher Boggs",
    role: "Founder & CTO",
    bio: "18 years in aerospace, robotics, and electronics. Formerly leading a 30+ person team at Moog Space & Defense Group.",
    imageSrc: "https://cdn.prod.website-files.com/688b650d15ca6b144341e1f7/6893cb0277da80ca82befd55_Frame%201948754903%20(1).png",
  },
  {
    name: "Mack Lorden",
    role: "Chief Executive Officer",
    bio: "Scaled a GPU computing product to $40M in revenue within 6 months. Angel invested in 50+ web3 companies.",
    imageSrc: "https://cdn.prod.website-files.com/688b650d15ca6b144341e1f7/68ff8377f77cbae2fb3262d8_Mack%20Mono-p-2600.jpg",
  },
  {
    name: "Vlad Chernenko",
    role: "Lead Blockchain Developer",
    bio: "Top 1% TryHackMe cybersecurity expert. Secured major projects including Ethereum, MetaMask, and Aptos.",
    imageSrc: "/VladChernenko.jpg",
  },
  {
    name: "Kenneth Fox",
    role: "UX/UI & Full-Stack Engineer",
    bio: "A decade of full-stack mastery—from martech to fintech trading platforms and AI-powered healthcare SaaS.",
    imageSrc: "https://cdn.prod.website-files.com/688b650d15ca6b144341e1f7/68ff8a934ceeaa3d9b80c03d_Kenneth%20Fox%20Mono.jpg",
  },
  {
    name: "Michael Hart",
    role: "Chief Robotics Engineer",
    bio: "Ex-Amazon robotics expert. One of the core figures behind Amazon Scout autonomous delivery robot.",
    imageSrc: "https://cdn.prod.website-files.com/688b650d15ca6b144341e1f7/68b20a19cfaf0e6a7c807a26_Mike%20H.jpg",
  },
  {
    name: "Alexandre Pacheco",
    role: "Chief Robotics Advisor",
    bio: "Former NASA intern. PhD research supported by 12 peer-reviewed publications in swarm robotics.",
    imageSrc: "https://cdn.prod.website-files.com/688b650d15ca6b144341e1f7/68bc46c3dd2f680653b21718_telegram-cloud-photo-size-5-6183668341554661520-y.jpg",
  },
  {
    name: "Evan Kim",
    role: "Robotics Engineer",
    bio: "Computer Engineering from Virginia Tech. Experience in electronics repair, Kubernetes, and network storage.",
    imageSrc: "https://cdn.prod.website-files.com/688b650d15ca6b144341e1f7/691f7fcd2c1b34489edebd33_Evan%20Kim.jpg",
  },
  {
    name: "Rick Friedman",
    role: "Robotics Engineer",
    bio: "Former researcher at Virginia Tech's Bio-Inspired Science and Technology Lab. Built fully autonomous ground rovers end-to-end across software, electronics, and mechanical design.",
    imageSrc: "/rick_friedman.jpg",
  },
];

const values = [
  { title: "Safety first", desc: "Every system we build prioritizes human safety above all else. Our architecture enforces strict operational boundaries." },
  { title: "Move fast, ship often", desc: "We believe in rapid iteration and continuous delivery. Real-world feedback is the best way to improve." },
  { title: "Open by default", desc: "We publish our research, open-source our tools, and share what we learn with the wider community." },
  { title: "Build for operators", desc: "Technology should serve the people who use it daily. We design for ease of operation at every level." },
];

const stats = [
  { value: "8+", label: "Team members" },
  { value: "50+", label: "Years combined experience" },
  { value: "3", label: "Countries" },
  { value: "24/7", label: "Operations" },
];

const navLinks = [
  { label: "Robots", href: "/robots" },
  { label: "Web3", href: "/web3" },
  { label: "Research", href: "/research" },
  { label: "News", href: "/news" },
  { label: "Team", href: "/team" },
  { label: "Brand Kit", href: "/brand-kit" },
];

export default function ElevenTeamPage() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
    <div style={{ background: T.bg, color: T.text, fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      {/* HEADER */}
      <header style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(255,255,255,0.82)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", borderBottom: sectionBorder }}>
        <div style={{ maxWidth: T.maxW, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, fontWeight: 700, fontSize: 18, color: T.text, textDecoration: "none", letterSpacing: "-0.02em" }}><Image src="/Modulr_logo.png" alt="Modulr" width={28} height={28} style={{ objectFit: "contain" }} unoptimized />Modulr</Link>
            <nav className="el-desktop-only" style={{ gap: 4 }}>
              {navLinks.map((item) => (
                <Link key={item.label} href={item.href} style={{ padding: "6px 12px", fontSize: 14, color: item.href === "/team" ? T.text : T.muted, fontWeight: item.href === "/team" ? 600 : 400, textDecoration: "none", borderRadius: 8 }}>
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
            <Link key={item.label} href={item.href} onClick={() => setIsMobileNavOpen(false)} style={{ padding: "10px 0", fontSize: 15, color: item.href === "/team" ? T.text : T.muted, fontWeight: item.href === "/team" ? 600 : 400, textDecoration: "none" }}>
              {item.label}
            </Link>
          ))}
        </div>
      </header>

      {/* HERO */}
      <section style={{ padding: "clamp(60px, 8vw, 120px) 24px 40px", maxWidth: T.maxW, margin: "0 auto" }}>
        <h1 style={{ fontSize: "clamp(40px, 6vw, 64px)", fontWeight: 500, letterSpacing: "-0.04em", lineHeight: 1.06, marginBottom: 16 }}>
          The people behind<br />the technology
        </h1>
        <p style={{ fontSize: 17, color: T.muted, maxWidth: 640, lineHeight: 1.6 }}>
          A small, focused team of engineers, researchers, and operators building the infrastructure for the next generation of robotics.
        </p>
      </section>

      {/* STATS ROW */}
      <section style={{ padding: "0 24px 60px", maxWidth: T.maxW, margin: "0 auto" }}>
        <div className="el-g4">
          {stats.map((s) => (
            <div key={s.label} style={{ padding: 28, borderRadius: T.radiusXl, border: sectionBorder, textAlign: "center" }}>
              <div style={{ fontSize: 36, fontWeight: 600, letterSpacing: "-0.03em" }}>{s.value}</div>
              <div style={{ fontSize: 14, color: T.muted, marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* TEAM GRID */}
      <section style={{ padding: "0 24px 80px", maxWidth: T.maxW, margin: "0 auto" }}>
        <h2 style={{ fontSize: 28, fontWeight: 500, letterSpacing: "-0.02em", marginBottom: 32 }}>Leadership & Engineering</h2>
        <div className="el-g3" style={{ gap: 20 }}>
          {team.map((member) => (
            <div key={member.name} style={{ borderRadius: T.radiusXl, border: sectionBorder, overflow: "hidden", transition: "box-shadow 0.2s" }}>
              <div style={{ height: 300, position: "relative", background: T.surface }}>
                <Image
                  src={member.imageSrc}
                  alt={member.name}
                  fill
                  style={{ objectFit: "cover", filter: member.name === "Vlad Chernenko" ? "grayscale(100%)" : undefined }}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  unoptimized={member.imageSrc.startsWith("http")}
                />
              </div>
              <div style={{ padding: "20px 24px 24px" }}>
                <h3 style={{ fontSize: 20, fontWeight: 600, letterSpacing: "-0.01em" }}>{member.name}</h3>
                <div style={{ fontSize: 14, color: T.muted, marginTop: 4, marginBottom: 12 }}>{member.role}</div>
                <p style={{ fontSize: 14, color: T.muted2, lineHeight: 1.55 }}>{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* OUR VALUES */}
      <section style={{ borderTop: sectionBorder, padding: "clamp(60px, 8vw, 120px) 24px", maxWidth: T.maxW, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 48, flexWrap: "wrap", gap: 20 }}>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 500, letterSpacing: "-0.03em" }}>What we believe in</h2>
          <Link href="#" style={{ display: "inline-flex", alignItems: "center", height: 44, padding: "0 22px", background: T.accent, color: T.accentFg, borderRadius: T.radiusPill, fontSize: 14, fontWeight: 600, textDecoration: "none" }}>
            Join the team
          </Link>
        </div>
        <div className="el-g2">
          {values.map((v, idx) => (
            <div key={v.title} style={{ padding: 32, borderRadius: T.radiusXl, border: sectionBorder, background: idx === 0 ? T.surface : "#fff" }}>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", color: T.muted2, marginBottom: 12 }}>{String(idx + 1).padStart(2, "0")}</div>
              <h3 style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em", marginBottom: 12 }}>{v.title}</h3>
              <p style={{ fontSize: 15, color: T.muted, lineHeight: 1.65 }}>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* JOIN CTA */}
      <section style={{ borderTop: sectionBorder, padding: "80px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: T.maxW, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 500, letterSpacing: "-0.03em", lineHeight: 1.08, marginBottom: 16 }}>
            Want to join us?
          </h2>
          <p style={{ fontSize: 16, color: T.muted, maxWidth: 480, margin: "0 auto 32px", lineHeight: 1.6 }}>
            We&apos;re always looking for talented engineers, researchers, and operators to help us build the future of robotics.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 12 }}>
            <Link href="/careers" style={{ display: "inline-flex", alignItems: "center", height: 48, padding: "0 24px", background: T.accent, color: T.accentFg, borderRadius: T.radiusPill, fontSize: 15, fontWeight: 600, textDecoration: "none" }}>
              View open positions
            </Link>
            <Link href="#" style={{ display: "inline-flex", alignItems: "center", height: 48, padding: "0 24px", background: T.surface, color: T.text, borderRadius: T.radiusPill, fontSize: 15, fontWeight: 500, textDecoration: "none", border: sectionBorder }}>
              Contact us
            </Link>
          </div>
                  </div>
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
