"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion, useInView } from "framer-motion";
import { SiteFooter } from "@/components/SiteFooter";
import { MODULR_ASSETS } from "@/config/assets";

const sidebarNav = [
  { label: "Home", href: "/example" },
  { label: "Research", href: "/example/research" },
  { label: "News", href: "/example/news" },
  { label: "Careers", href: "/example/careers" },
  { label: "Technology", href: "/technology-overview" },
  { label: "Team", href: "/example/team" },
  { label: "Pricing", href: "/pricing" },
  { label: "For Business", href: "#" },
];

const heroCard = {
  title: "Introducing Modulr Network",
  tag: "Product",
  readTime: "5 min read",
  gradient: "linear-gradient(135deg, #a8e6ff 0%, #d4f1ff 30%, #fff 60%, #ffe0f0 100%)",
};

const sideCards = [
  {
    title: "Real-time Teleoperation Demo",
    tag: "Product",
    readTime: "10 min read",
    gradient: "linear-gradient(135deg, #ffd6e8 0%, #ffe8f0 50%, #fff 100%)",
  },
  {
    title: "Modulr Go: Available Worldwide",
    tag: "Product",
    readTime: "3 min read",
    gradient: "linear-gradient(135deg, #e8e0ff 0%, #f0e8ff 50%, #fff 100%)",
  },
];

const recentNews = [
  { title: "Our approach to decentralized robotics", tag: "Company", date: "16 Jan 2026", color: "#b8f0b8" },
  { title: "Providers can now list robots on Modulr", tag: "Product", date: "17 Dec 2025", color: "#c8f8c8" },
  { title: "Introducing usage-based pricing", tag: "Product", date: "11 Dec 2025", color: "#a0e8d8" },
  { title: "Modulr for Healthcare", tag: "Product", date: "8 Jan 2026", color: "#ffd0a0" },
  { title: "Advancing Robotics with AI", tag: "Publication", date: "11 Dec 2025", color: "#ffe8a0" },
  { title: "Ten Years of Innovation", tag: "Company", date: "11 Dec 2025", color: "#f0f0f0" },
];

const trustedCompanies = [
  { name: "Company 1", logo: "https://cdn.brandfetch.io/idtu7CFTG5/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1764834273757" },
  { name: "Company 2", logo: "https://cdn.brandfetch.io/id6O2oGzv-/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1731911497387" },
  { name: "Company 3", logo: "https://cdn.brandfetch.io/idkFvHPM3p/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1757914702922" },
  { name: "Company 4", logo: "https://cdn.brandfetch.io/idchmboHEZ/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1727706672983" },
  { name: "Unitree", logo: "https://cdn.brandfetch.io/idR3duQxYl/theme/light/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1741166761598" },
  { name: "ANYbotics", logo: "https://cdn.brandfetch.io/id2S-kXbuK/theme/light/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1725611837013" },
];

const useCasesData = [
  {
    title: "Entertainment & Gaming",
    desc: "Control telepresence robots in theme parks, arcades, and immersive experiences from anywhere in the world.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&h=900&fit=crop",
    accent: "rgba(242,180,0,0.35)",
    stat: "10ms",
    statLabel: "Latency",
  },
  {
    title: "Defense & Security",
    desc: "Operate unmanned ground and aerial vehicles for reconnaissance, patrol, and hazardous environment inspection.",
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1400&h=900&fit=crop",
    accent: "rgba(0,200,150,0.35)",
    stat: "99.9%",
    statLabel: "Uptime",
  },
  {
    title: "Industrial Automation",
    desc: "Remotely manage robotic arms, AGVs, and factory floor equipment with sub-second latency.",
    image: "https://images.unsplash.com/photo-1565514020179-026b92b2ed6a?w=1400&h=900&fit=crop",
    accent: "rgba(120,100,255,0.35)",
    stat: "500+",
    statLabel: "Robots",
  },
  {
    title: "Space & Extreme Environments",
    desc: "Control rovers, orbital manipulators, and deep-sea exploration robots across vast distances.",
    image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1400&h=900&fit=crop",
    accent: "rgba(255,100,100,0.35)",
    stat: "∞",
    statLabel: "Range",
  },
  {
    title: "Healthcare & Medical",
    desc: "Enable surgeons and specialists to operate robotic surgery systems remotely.",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1400&h=900&fit=crop",
    accent: "rgba(0,180,220,0.35)",
    stat: "24/7",
    statLabel: "Access",
  },
];

const research = [
  { title: "Evaluating real-time control latency", tag: "Research", date: "18 Dec 2025", color: "#f8f8f8" },
  { title: "Assessing AI capabilities for robotic tasks", tag: "Research", date: "16 Dec 2025", gradient: "linear-gradient(135deg, #a8f0d8 0%, #78d8b8 50%, #48c898 100%)" },
  { title: "Accelerating biological research with robotics", tag: "Research", date: "16 Dec 2025", gradient: "linear-gradient(135deg, #ffd8a0 0%, #ffb888 50%, #ff9870 100%)" },
];

/* ═══════════════════════════════════════════════════════════════════════════ */

/* Search data for the site */
const searchIndex = [
  { title: "Home", href: "/example", category: "Navigation", keywords: ["main", "home", "start"] },
  { title: "Research", href: "/research", category: "Navigation", keywords: ["papers", "publications", "studies"] },
  { title: "News", href: "/example/news", category: "Navigation", keywords: ["updates", "announcements", "blog"] },
  { title: "Careers", href: "/careers", category: "Navigation", keywords: ["jobs", "work", "hiring", "positions"] },
  { title: "Technology Overview", href: "/technology-overview", category: "Navigation", keywords: ["tech", "platform", "architecture"] },
  { title: "Team", href: "/team", category: "Navigation", keywords: ["people", "founders", "employees"] },
  { title: "Pricing", href: "/pricing", category: "Navigation", keywords: ["cost", "plans", "subscription"] },
  { title: "API Documentation", href: "/docs/api", category: "Developer", keywords: ["rest", "endpoints", "reference"] },
  { title: "SDKs & Libraries", href: "/docs/sdk", category: "Developer", keywords: ["python", "typescript", "rust", "go"] },
  { title: "Teleoperation", href: "/technology-overview#teleoperation", category: "Technology", keywords: ["remote", "control", "robotics"] },
  { title: "Real-time Control", href: "/technology-overview#realtime", category: "Technology", keywords: ["latency", "speed", "response"] },
  { title: "Privacy Policy", href: "/privacy-policy", category: "Legal", keywords: ["data", "gdpr", "privacy"] },
];

export default function ExamplePage() {
  const [loading, setLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const footerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === "Escape") {
        setSearchOpen(false);
        setSearchQuery("");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const filteredResults = searchQuery.length > 0
    ? searchIndex.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.keywords.some(kw => kw.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return <TriangleLoader />;
  }

  return (
    <div
      className="min-h-screen animate-fadeIn"
      style={{
        background: "#000",
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      }}
    >
      {/* ───────────────────────────── HEADER ───────────────────────────── */}
      <header
        className="sticky top-0 z-50"
        style={{
          background: "rgba(0,0,0,0.85)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-3">
          <Link href="/example" className="flex items-center gap-3">
            <img src={MODULR_ASSETS.LOGO_MARK} alt="Modulr" style={{ height: 28, width: "auto" }} />
          </Link>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSearchOpen(true)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 8,
                padding: "6px 12px",
                color: "rgba(255,255,255,0.5)",
                fontSize: 13,
                cursor: "pointer",
                transition: "border-color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <span className="hidden sm:inline">Search</span>
              <kbd style={{ marginLeft: 4, padding: "2px 6px", borderRadius: 4, background: "rgba(255,255,255,0.08)", fontSize: 11, fontFamily: "inherit" }}>⌘K</kbd>
            </button>
            <Link
              href="#"
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: 20,
                padding: "8px 16px",
                color: "#fff",
                fontSize: 14,
                fontWeight: 500,
                textDecoration: "none",
              }}
            >
              Sign in
            </Link>
          </div>
        </div>
      </header>

      {/* ───────────────────────────── MAIN CONTENT ───────────────────────────── */}
      <div className="mx-auto max-w-[1400px] px-6 py-10">
        <div className="flex gap-8">
          {/* LEFT SIDEBAR */}
          <aside className="hidden w-[160px] flex-shrink-0 lg:block">
            <nav className="sticky top-24 space-y-1">
              {sidebarNav.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  style={{
                    display: "block",
                    padding: "8px 0",
                    color: "rgba(255,255,255,0.6)",
                    fontSize: 14,
                    textDecoration: "none",
                    transition: "color 0.15s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </aside>

          {/* CONTENT */}
          <div className="flex-1 space-y-20 min-w-0">
            {/* HERO + SIDE CARDS */}
            <section className="grid gap-6 lg:grid-cols-[1fr_320px]">
              {/* Hero card */}
              <div className="min-w-0">
                <Link href="#" className="group block">
                  <div
                    style={{
                      borderRadius: 16,
                      overflow: "hidden",
                      background: heroCard.gradient,
                      aspectRatio: "16/9",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 80,
                        height: 80,
                        background: "linear-gradient(135deg, #1a3a5c 0%, #2a4a6c 100%)",
                        borderRadius: 18,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
                      }}
                    >
                      <img src={MODULR_ASSETS.LOGO_MARK} alt="" style={{ height: 36, filter: "brightness(1.2)" }} />
                    </div>
                  </div>
                  <h1 style={{ marginTop: 20, fontSize: 32, fontWeight: 400, color: "#fff", letterSpacing: "-0.02em" }}>
                    {heroCard.title}
                  </h1>
                  <p style={{ marginTop: 8, fontSize: 14, color: "rgba(255,255,255,0.5)" }}>
                    {heroCard.tag} · {heroCard.readTime}
                  </p>
                </Link>
              </div>

              {/* Side cards column */}
              <div className="space-y-6 flex-shrink-0">
                {sideCards.map((card) => (
                  <Link key={card.title} href="#" className="group block">
                    <div style={{ borderRadius: 14, overflow: "hidden", background: card.gradient, aspectRatio: "4/3", position: "relative" }}>
                      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 48, height: 48, background: "#fff", borderRadius: 12, boxShadow: "0 4px 16px rgba(0,0,0,0.1)" }} />
                    </div>
                    <h2 style={{ marginTop: 14, fontSize: 18, fontWeight: 400, color: "#fff" }}>{card.title}</h2>
                    <p style={{ marginTop: 6, fontSize: 13, color: "rgba(255,255,255,0.5)" }}>{card.tag} · {card.readTime}</p>
                  </Link>
                ))}
              </div>
            </section>

            {/* TRUSTED BY - Animated marquee */}
            <TrustedByMarquee />

            {/* RECENT NEWS */}
            <section>
              <div className="mb-8 flex items-center justify-between">
                <h2 style={{ fontSize: 20, fontWeight: 400, color: "#fff" }}>Recent news</h2>
                <Link href="/example/news" style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>View more</Link>
              </div>
              <div className="grid gap-8 lg:grid-cols-2">
                <div className="space-y-6">
                  {recentNews.slice(0, 3).map((item) => (
                    <Link key={item.title} href="#" className="group flex gap-5">
                      <div style={{ width: 140, height: 100, borderRadius: 12, background: item.color, flexShrink: 0 }} />
                      <div>
                        <h3 style={{ fontSize: 17, fontWeight: 400, color: "#fff", lineHeight: 1.4 }}>{item.title}</h3>
                        <p style={{ marginTop: 8, fontSize: 13, color: "rgba(255,255,255,0.5)" }}>{item.tag} · {item.date}</p>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="space-y-6">
                  {recentNews.slice(3, 6).map((item) => (
                    <Link key={item.title} href="#" className="group flex gap-5">
                      <div style={{ width: 140, height: 100, borderRadius: 12, background: item.color, flexShrink: 0 }} />
                      <div>
                        <h3 style={{ fontSize: 17, fontWeight: 400, color: "#fff", lineHeight: 1.4 }}>{item.title}</h3>
                        <p style={{ marginTop: 8, fontSize: 13, color: "rgba(255,255,255,0.5)" }}>{item.tag} · {item.date}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </section>

            {/* LATEST RESEARCH */}
            <section>
              <div className="mb-8 flex items-center justify-between">
                <h2 style={{ fontSize: 20, fontWeight: 400, color: "#fff" }}>Latest research</h2>
                <Link href="/research" style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>View all</Link>
              </div>
              <div className="grid gap-6 lg:grid-cols-3">
                {research.map((item) => (
                  <Link key={item.title} href="#" className="group block">
                    <div style={{ borderRadius: 14, overflow: "hidden", aspectRatio: "4/3", background: item.gradient || item.color }} />
                    <h3 style={{ marginTop: 14, fontSize: 17, fontWeight: 400, color: "#fff", lineHeight: 1.4 }}>{item.title}</h3>
                    <p style={{ marginTop: 6, fontSize: 13, color: "rgba(255,255,255,0.5)" }}>{item.tag} · {item.date}</p>
                  </Link>
                ))}
              </div>
            </section>

            {/* FOR BUSINESS */}
            <section>
              <div className="mb-8 flex items-center justify-between">
                <h2 style={{ fontSize: 20, fontWeight: 400, color: "#fff" }}>Modulr for Business</h2>
                <Link href="#" style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>View all</Link>
              </div>
              <div className="grid gap-6 lg:grid-cols-3">
                {[
                  { title: "Enterprise solutions", gradient: "linear-gradient(135deg, #888 0%, #666 100%)" },
                  { title: "Robotics at scale", gradient: "linear-gradient(135deg, #ff6090 0%, #ff80a0 100%)" },
                  { title: "Custom integrations", gradient: "linear-gradient(135deg, #6080ff 0%, #80a0ff 100%)" },
                ].map((item) => (
                  <Link key={item.title} href="#" className="group block">
                    <div style={{ borderRadius: 14, overflow: "hidden", aspectRatio: "16/9", background: item.gradient }} />
                    <h3 style={{ marginTop: 14, fontSize: 17, fontWeight: 400, color: "#fff" }}>{item.title}</h3>
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* ═══════════ USE CASES SECTION ═══════════ */}
      <UseCasesSection />

      {/* ═══════════ CONTINUATION WITH SIDEBAR ═══════════ */}
      <div className="mx-auto max-w-[1400px] px-6 py-20">
        <div className="flex gap-8">
          {/* LEFT SIDEBAR (same as above) */}
          <aside className="hidden w-[160px] flex-shrink-0 lg:block">
            <nav className="sticky top-24 space-y-1">
              {sidebarNav.map((item) => (
                <Link
                  key={item.label + "-bottom"}
                  href={item.href}
                  style={{
                    display: "block",
                    padding: "8px 0",
                    color: "rgba(255,255,255,0.6)",
                    fontSize: 14,
                    textDecoration: "none",
                    transition: "color 0.15s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </aside>

          {/* CONTINUATION CONTENT */}
          <div className="flex-1 space-y-20">
            {/* ECOSYSTEM - with animated icons */}
            <section>
              <div className="mb-8 flex items-center justify-between">
                <h2 style={{ fontSize: 20, fontWeight: 400, color: "#fff" }}>Ecosystem</h2>
                <Link href="#" style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>View all</Link>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <EcosystemCard
                  title="Research"
                  desc="Leading robotics labs"
                  icon={<ResearchIcon />}
                />
                <EcosystemCard
                  title="Infrastructure"
                  desc="Cloud & edge computing"
                  icon={<InfraIcon />}
                />
                <EcosystemCard
                  title="Hardware"
                  desc="Robotic platforms & OEMs"
                  icon={<HardwareIcon />}
                />
                <EcosystemCard
                  title="Academia"
                  desc="Universities & research"
                  icon={<AcademiaIcon />}
                />
              </div>
            </section>

            {/* DEVELOPER RESOURCES - Terminal-style cards */}
            <section>
              <div className="mb-8 flex items-center justify-between">
                <h2 style={{ fontSize: 20, fontWeight: 400, color: "#fff" }}>For Developers</h2>
                <Link href="#" style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>Documentation</Link>
              </div>
              <div className="grid gap-4 lg:grid-cols-3">
                {[
                  { title: "API Reference", cmd: "curl api.modulr.cloud/v1", desc: "RESTful APIs and WebSocket endpoints", accent: "#22d3ee" },
                  { title: "SDK Libraries", cmd: "npm install @modulr/sdk", desc: "Python, TypeScript, Rust, and Go", accent: "#a78bfa" },
                  { title: "Quick Start", cmd: "npx create-modulr-app", desc: "Production-ready starter templates", accent: "#f2b400" },
                ].map((item) => (
                  <Link
                    key={item.title}
                    href="#"
                    className="group block"
                    style={{
                      borderRadius: 16,
                      background: "#0a0a0a",
                      border: "1px solid rgba(255,255,255,0.08)",
                      overflow: "hidden",
                      transition: "border-color 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)")}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
                  >
                    {/* Terminal header */}
                    <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 14px", background: "rgba(255,255,255,0.03)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#ff5f56" }} />
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#ffbd2e" }} />
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#27ca40" }} />
                      <span style={{ marginLeft: 8, fontSize: 11, color: "rgba(255,255,255,0.4)" }}>terminal</span>
                    </div>
                    {/* Command */}
                    <div style={{ padding: "16px 14px", fontFamily: "monospace", fontSize: 13 }}>
                      <span style={{ color: item.accent }}>$</span>{" "}
                      <span style={{ color: "rgba(255,255,255,0.8)" }}>{item.cmd}</span>
                    </div>
                    {/* Info */}
                    <div style={{ padding: "0 14px 20px" }}>
                      <h3 style={{ fontSize: 16, fontWeight: 600, color: "#fff" }}>{item.title}</h3>
                      <p style={{ marginTop: 6, fontSize: 13, color: "rgba(255,255,255,0.5)" }}>{item.desc}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {/* MINIMAL CTA */}
            <section style={{ paddingTop: 20, paddingBottom: 40 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 24 }}>
                <div>
                  <h2 style={{ fontSize: 22, fontWeight: 400, color: "#fff", letterSpacing: "-0.01em" }}>
                    Start building today
                  </h2>
                  <p style={{ marginTop: 6, fontSize: 15, color: "rgba(255,255,255,0.5)" }}>
                    Free tier available. No credit card required.
                  </p>
                </div>
                <div style={{ display: "flex", gap: 12 }}>
                  <Link
                    href="#"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 10,
                      background: "#f2b400",
                      color: "#000",
                      padding: "10px 22px",
                      fontSize: 14,
                      fontWeight: 600,
                      textDecoration: "none",
                    }}
                  >
                    Get Started
                  </Link>
                  <Link
                    href="#"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 10,
                      background: "transparent",
                      border: "1px solid rgba(255,255,255,0.15)",
                      color: "rgba(255,255,255,0.8)",
                      padding: "10px 22px",
                      fontSize: 14,
                      fontWeight: 500,
                      textDecoration: "none",
                    }}
                  >
                    Contact Sales
                  </Link>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div ref={footerRef}>
        <SiteFooter />
      </div>

      {/* SCROLL TO TOP BUTTON */}
      <button
        onClick={scrollToTop}
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          width: 44,
          height: 44,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.12)",
          color: "rgba(255,255,255,0.7)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: showScrollTop ? 1 : 0,
          pointerEvents: showScrollTop ? "auto" : "none",
          transition: "opacity 0.3s, background 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.12)")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.08)")}
        aria-label="Scroll to top"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </button>

      {/* SEARCH MODAL */}
      {searchOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            paddingTop: 100,
          }}
        >
          {/* Backdrop */}
          <div
            onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.8)",
              backdropFilter: "blur(8px)",
            }}
          />
          {/* Modal */}
          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: 560,
              margin: "0 24px",
              background: "rgba(24,24,24,0.98)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 16,
              overflow: "hidden",
              boxShadow: "0 24px 80px rgba(0,0,0,0.5)",
            }}
          >
            {/* Search input */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px 20px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search documentation, pages, features..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  flex: 1,
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  fontSize: 16,
                  color: "#fff",
                }}
              />
              <kbd style={{ padding: "4px 8px", borderRadius: 6, background: "rgba(255,255,255,0.08)", fontSize: 12, color: "rgba(255,255,255,0.5)" }}>ESC</kbd>
            </div>
            {/* Results */}
            <div style={{ maxHeight: 400, overflowY: "auto" }}>
              {searchQuery.length === 0 ? (
                <div style={{ padding: "32px 20px", textAlign: "center", color: "rgba(255,255,255,0.4)", fontSize: 14 }}>
                  Start typing to search...
                </div>
              ) : filteredResults.length === 0 ? (
                <div style={{ padding: "32px 20px", textAlign: "center", color: "rgba(255,255,255,0.4)", fontSize: 14 }}>
                  No results found for &quot;{searchQuery}&quot;
                </div>
              ) : (
                <div style={{ padding: "8px 0" }}>
                  {filteredResults.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "12px 20px",
                        color: "#fff",
                        textDecoration: "none",
                        transition: "background 0.15s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.05)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      <div>
                        <div style={{ fontSize: 15, fontWeight: 500 }}>{item.title}</div>
                        <div style={{ marginTop: 2, fontSize: 12, color: "rgba(255,255,255,0.4)" }}>{item.category}</div>
                      </div>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2">
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    </Link>
                  ))}
                </div>
              )}
            </div>
            {/* Footer */}
            <div style={{ padding: "12px 20px", borderTop: "1px solid rgba(255,255,255,0.08)", display: "flex", justifyContent: "space-between", fontSize: 12, color: "rgba(255,255,255,0.35)" }}>
              <span>Navigate with ↑↓ · Select with ↵</span>
              <span>Powered by Modulr Search</span>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/* USE CASES SECTION WITH SCROLL ANIMATION                                      */
/* ═══════════════════════════════════════════════════════════════════════════ */

function UseCasesSection() {
  const reduce = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const cardCount = useCasesData.length;

  return (
    <section
      ref={containerRef}
      style={{ height: `${100 + cardCount * 100}vh`, background: "#000", borderTop: "1px solid rgba(255,255,255,0.08)" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#050508] to-black" />

        {/* Giant title */}
        <div ref={titleRef} className="absolute top-0 left-0 right-0 z-20 pt-16 md:pt-24 pointer-events-none px-6 md:px-12">
          <motion.h2
            style={{ fontFamily: "system-ui", fontSize: "clamp(60px, 12vw, 180px)", fontWeight: 900, lineHeight: 0.85, letterSpacing: "-0.04em", textTransform: "uppercase" }}
            initial={{ y: 100, opacity: 0 }}
            animate={titleInView ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }}
            transition={{ duration: reduce ? 0 : 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <span style={{ color: "transparent", WebkitTextStroke: "2px rgba(255,255,255,0.15)" }}>USE</span>{" "}
            <span style={{ background: "linear-gradient(90deg, #fff, #f2b400)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>CASES</span>
          </motion.h2>
        </div>

        {/* Content grid */}
        <div className="absolute inset-0 flex items-center justify-center pt-32 md:pt-40">
          <div className="relative w-full max-w-[1600px] mx-auto px-6 md:px-12">
            <div className="grid gap-8 lg:grid-cols-12 lg:gap-12 items-center">
              {/* Left - info */}
              <div className="lg:col-span-4 relative z-10">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="space-y-8"
                >
                  <div>
                    <div style={{ fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", marginBottom: 12 }}>
                      Remote Teleoperation
                    </div>
                    <p style={{ fontSize: 18, lineHeight: 1.7, color: "rgba(255,255,255,0.7)", maxWidth: 400 }}>
                      From entertainment to space exploration — Modulr powers real-time robotic control in the most demanding environments.
                    </p>
                  </div>

                  {/* Scroll indicators */}
                  <div className="hidden lg:flex flex-col gap-2">
                    {useCasesData.map((_, idx) => (
                      <ScrollIndicator key={idx} index={idx} total={cardCount} scrollYProgress={scrollYProgress} />
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Right - cards */}
              <div className="lg:col-span-8 relative">
                <div className="relative h-[50vh] md:h-[55vh] lg:h-[60vh]">
                  {useCasesData.map((uc, idx) => (
                    <UseCaseCard key={uc.title} useCase={uc} index={idx} total={cardCount} scrollYProgress={scrollYProgress} reduce={reduce} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll hint - hides on last card */}
        <ScrollHint scrollYProgress={scrollYProgress} cardCount={cardCount} titleInView={titleInView} />

        {/* Vignette */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-y-0 left-0 w-16 md:w-24 bg-gradient-to-r from-black to-transparent" />
          <div className="absolute inset-y-0 right-0 w-16 md:w-24 bg-gradient-to-l from-black to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent" />
        </div>
      </div>
    </section>
  );
}

function ScrollHint({ scrollYProgress, cardCount, titleInView }: { scrollYProgress: any; cardCount: number; titleInView: boolean }) {
  // Hide when we reach the last card (around 80% through)
  const opacity = useTransform(scrollYProgress, [0, 0.1, (cardCount - 1) / cardCount, 1], [0, 1, 1, 0]);

  return (
    <motion.div
      className="absolute bottom-8 left-0 right-0 z-10 flex justify-center pointer-events-none"
      style={{ opacity: titleInView ? opacity : 0 }}
    >
      <motion.div
        style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", display: "flex", alignItems: "center", gap: 12 }}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Scroll to explore <span>↓</span>
      </motion.div>
    </motion.div>
  );
}

function ScrollIndicator({ index, total, scrollYProgress }: { index: number; total: number; scrollYProgress: any }) {
  const start = index / total;
  const end = (index + 1) / total;
  const opacity = useTransform(scrollYProgress, [start, start + 0.05, end - 0.05, end], [0.3, 1, 1, 0.3]);
  const scaleX = useTransform(scrollYProgress, [start, end], [0, 1]);

  return (
    <div style={{ position: "relative", height: 4, width: 80, borderRadius: 2, background: "rgba(255,255,255,0.1)", overflow: "hidden" }}>
      <motion.div style={{ position: "absolute", inset: 0, background: "#f2b400", borderRadius: 2, scaleX, transformOrigin: "left", opacity }} />
    </div>
  );
}

function UseCaseCard({ useCase, index, total, scrollYProgress, reduce }: { useCase: typeof useCasesData[0]; index: number; total: number; scrollYProgress: any; reduce: boolean | null }) {
  const start = index / total;
  const peak = (index + 0.5) / total;
  const end = (index + 1) / total;

  const opacity = useTransform(scrollYProgress, [start, start + 0.08, peak, end - 0.08, end], [0, 1, 1, 1, index === total - 1 ? 1 : 0]);
  const y = useTransform(scrollYProgress, [start, peak, end], reduce ? [0, 0, 0] : [60, 0, index === total - 1 ? 0 : -40]);
  const scale = useTransform(scrollYProgress, [start, peak, end], reduce ? [1, 1, 1] : [0.95, 1, index === total - 1 ? 1 : 0.98]);

  return (
    <motion.article
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        borderRadius: 28,
        border: "1px solid rgba(255,255,255,0.1)",
        background: "rgba(0,0,0,0.6)",
        opacity,
        y,
        scale,
        zIndex: total - index,
      }}
    >
      <div className="absolute inset-0">
        <Image src={useCase.image} alt={useCase.title} fill style={{ objectFit: "cover" }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
        <div className="pointer-events-none absolute inset-0" style={{ background: `radial-gradient(900px 600px at 70% 70%, ${useCase.accent}, transparent 55%)`, opacity: 0.6 }} />
      </div>

      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 lg:p-12">
        <div className="mb-6">
          <div style={{ display: "inline-flex", borderRadius: 16, border: "1px solid rgba(255,255,255,0.15)", background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)", padding: "12px 18px" }}>
            <div style={{ fontSize: 24, fontWeight: 700, color: "#fff" }}>{useCase.stat}</div>
            <div style={{ marginLeft: 12, fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", alignSelf: "center" }}>{useCase.statLabel}</div>
          </div>
        </div>
        <h3 style={{ fontSize: 28, fontWeight: 600, color: "#fff", letterSpacing: "-0.02em" }}>{useCase.title}</h3>
        <p style={{ marginTop: 12, fontSize: 15, lineHeight: 1.7, color: "rgba(255,255,255,0.6)", maxWidth: 500 }}>{useCase.desc}</p>
        <div style={{ marginTop: 20, display: "inline-flex", alignItems: "center", gap: 12 }}>
          <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", borderRadius: 24, border: "1px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.05)", backdropFilter: "blur(8px)", padding: "10px 20px", fontSize: 14, fontWeight: 500, color: "#fff" }}>
            Learn More
          </span>
          <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 18 }}>→</span>
        </div>
      </div>
    </motion.article>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/* TRIANGLE LOADER                                                              */
/* ═══════════════════════════════════════════════════════════════════════════ */

function TriangleLoader() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
    >
      <div style={{ textAlign: "center" }}>
        {/* Animated triangle */}
        <svg width="80" height="70" viewBox="0 0 80 70" fill="none" style={{ overflow: "visible" }}>
          <path
            d="M40 5 L75 65 L5 65 Z"
            stroke="url(#triangleGradient)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            style={{
              strokeDasharray: 220,
              strokeDashoffset: 220,
              animation: "drawTriangle 1.6s ease-out forwards",
            }}
          />
          <defs>
            <linearGradient id="triangleGradient" x1="5" y1="65" x2="75" y2="5">
              <stop offset="0%" stopColor="#f2b400" />
              <stop offset="50%" stopColor="#ffd36a" />
              <stop offset="100%" stopColor="#f2b400" />
            </linearGradient>
          </defs>
        </svg>

        {/* Glow effect */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 120,
            height: 120,
            background: "radial-gradient(circle, rgba(242,180,0,0.15), transparent 70%)",
            animation: "pulse 1.5s ease-in-out infinite",
          }}
        />

        <div
          style={{
            marginTop: 32,
            fontSize: 12,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.4)",
          }}
        >
          Loading
        </div>
      </div>

      <style jsx>{`
        @keyframes drawTriangle {
          0% {
            stroke-dashoffset: 220;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.6; transform: translate(-50%, -50%) scale(1.1); }
        }
      `}</style>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/* TRUSTED BY MARQUEE                                                           */
/* ═══════════════════════════════════════════════════════════════════════════ */

function TrustedByMarquee() {
  const logos = [
    "https://cdn.brandfetch.io/idtu7CFTG5/theme/dark/logo.svg",
    "https://cdn.brandfetch.io/id6O2oGzv-/theme/dark/logo.svg",
    "https://cdn.brandfetch.io/idkFvHPM3p/theme/dark/logo.svg",
    "https://cdn.brandfetch.io/idchmboHEZ/theme/dark/logo.svg",
    "https://cdn.brandfetch.io/idR3duQxYl/theme/light/logo.svg",
    "https://cdn.brandfetch.io/idawOgYOsG/theme/dark/logo.svg",
  ];

  return (
    <section style={{ position: "relative", overflow: "hidden", padding: "40px 0", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
      <div style={{ fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", textAlign: "center", marginBottom: 32 }}>
        Trusted by industry leaders
      </div>
      
      {/* Marquee container */}
      <div style={{ position: "relative", width: "100%", overflow: "hidden" }}>
        {/* Gradient masks */}
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 100, background: "linear-gradient(to right, #000, transparent)", zIndex: 2 }} />
        <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 100, background: "linear-gradient(to left, #000, transparent)", zIndex: 2 }} />
        
        {/* Scrolling content */}
        <div className="marquee-track" style={{ display: "flex", width: "fit-content" }}>
          {[...logos, ...logos, ...logos].map((logo, i) => (
            <div key={i} style={{ flexShrink: 0, padding: "0 48px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <img src={logo} alt="" style={{ height: 28, width: "auto", filter: "brightness(0) invert(1)", opacity: 0.5 }} />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .marquee-track {
          animation: marquee 30s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
      `}</style>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/* ECOSYSTEM CARD WITH ANIMATED ICON                                            */
/* ═══════════════════════════════════════════════════════════════════════════ */

function EcosystemCard({ title, desc, icon }: { title: string; desc: string; icon: React.ReactNode }) {
  return (
    <Link
      href="#"
      className="group block ecosystem-card"
      style={{
        padding: "24px",
        borderRadius: 16,
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.06)",
        transition: "border-color 0.3s, background 0.3s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
        e.currentTarget.style.background = "rgba(255,255,255,0.04)";
        // Trigger icon animation
        const iconEl = e.currentTarget.querySelector(".ecosystem-icon");
        if (iconEl) {
          const circle = iconEl.querySelector(".icon-circle");
          if (circle) {
            (circle as HTMLElement).style.strokeDashoffset = "0";
          }
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
        e.currentTarget.style.background = "rgba(255,255,255,0.02)";
        const iconEl = e.currentTarget.querySelector(".ecosystem-icon");
        if (iconEl) {
          const circle = iconEl.querySelector(".icon-circle");
          if (circle) {
            (circle as HTMLElement).style.strokeDashoffset = "113";
          }
        }
      }}
    >
      <div style={{ marginBottom: 16, width: 40, height: 40 }}>
        {icon}
      </div>
      <h3 style={{ fontSize: 15, fontWeight: 500, color: "#fff" }}>{title}</h3>
      <p style={{ marginTop: 6, fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.5 }}>{desc}</p>
    </Link>
  );
}

/* Animated Research Icon - microscope/lab */
function ResearchIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="ecosystem-icon">
      <circle cx="20" cy="20" r="18" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
      <circle cx="20" cy="20" r="18" stroke="url(#researchGrad)" strokeWidth="1" strokeDasharray="113" strokeDashoffset="113" className="icon-circle" style={{ transition: "stroke-dashoffset 0.8s ease-out" }} />
      <path d="M15 14v12M25 14v12M15 20h10" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round" className="icon-inner" style={{ transition: "stroke 0.3s" }} />
      <circle cx="20" cy="14" r="3" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" className="icon-inner" style={{ transition: "stroke 0.3s" }} />
      <defs>
        <linearGradient id="researchGrad" x1="0" y1="0" x2="40" y2="40">
          <stop offset="0%" stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#818cf8" />
        </linearGradient>
      </defs>
      <style>{`
        .ecosystem-card:hover .icon-inner { stroke: #a78bfa; }
      `}</style>
    </svg>
  );
}

/* Animated Infrastructure Icon - cloud/server */
function InfraIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="ecosystem-icon">
      <circle cx="20" cy="20" r="18" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
      <circle cx="20" cy="20" r="18" stroke="url(#infraGrad)" strokeWidth="1" strokeDasharray="113" strokeDashoffset="113" className="icon-circle" style={{ transition: "stroke-dashoffset 0.8s ease-out" }} />
      <rect x="12" y="16" width="16" height="4" rx="1" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" className="icon-inner" style={{ transition: "stroke 0.3s" }} />
      <rect x="12" y="22" width="16" height="4" rx="1" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" className="icon-inner" style={{ transition: "stroke 0.3s" }} />
      <circle cx="15" cy="18" r="1" fill="rgba(255,255,255,0.6)" className="icon-dot" style={{ transition: "fill 0.3s" }} />
      <circle cx="15" cy="24" r="1" fill="rgba(255,255,255,0.6)" className="icon-dot" style={{ transition: "fill 0.3s" }} />
      <defs>
        <linearGradient id="infraGrad" x1="0" y1="0" x2="40" y2="40">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
      </defs>
      <style>{`
        .ecosystem-card:hover .icon-inner { stroke: #22d3ee; }
        .ecosystem-card:hover .icon-dot { fill: #22d3ee; }
      `}</style>
    </svg>
  );
}

/* Animated Hardware Icon - robot/chip */
function HardwareIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="ecosystem-icon">
      <circle cx="20" cy="20" r="18" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
      <circle cx="20" cy="20" r="18" stroke="url(#hwGrad)" strokeWidth="1" strokeDasharray="113" strokeDashoffset="113" className="icon-circle" style={{ transition: "stroke-dashoffset 0.8s ease-out" }} />
      <rect x="14" y="14" width="12" height="12" rx="2" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" className="icon-inner" style={{ transition: "stroke 0.3s" }} />
      <path d="M17 11v3M20 11v3M23 11v3M17 26v3M20 26v3M23 26v3M11 17h3M11 20h3M11 23h3M26 17h3M26 20h3M26 23h3" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round" className="icon-pins" style={{ transition: "stroke 0.3s" }} />
      <defs>
        <linearGradient id="hwGrad" x1="0" y1="0" x2="40" y2="40">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#f97316" />
        </linearGradient>
      </defs>
      <style>{`
        .ecosystem-card:hover .icon-inner { stroke: #f59e0b; }
        .ecosystem-card:hover .icon-pins { stroke: #f59e0b; }
      `}</style>
    </svg>
  );
}

/* Animated Academia Icon - graduation cap/book */
function AcademiaIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="ecosystem-icon">
      <circle cx="20" cy="20" r="18" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
      <circle cx="20" cy="20" r="18" stroke="url(#acadGrad)" strokeWidth="1" strokeDasharray="113" strokeDashoffset="113" className="icon-circle" style={{ transition: "stroke-dashoffset 0.8s ease-out" }} />
      <path d="M20 13l8 4-8 4-8-4 8-4z" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinejoin="round" className="icon-inner" style={{ transition: "stroke 0.3s" }} />
      <path d="M12 17v6l8 4 8-4v-6" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="icon-inner" style={{ transition: "stroke 0.3s" }} />
      <defs>
        <linearGradient id="acadGrad" x1="0" y1="0" x2="40" y2="40">
          <stop offset="0%" stopColor="#34d399" />
          <stop offset="100%" stopColor="#10b981" />
        </linearGradient>
      </defs>
      <style>{`
        .ecosystem-card:hover .icon-inner { stroke: #34d399; }
      `}</style>
    </svg>
  );
}

