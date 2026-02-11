"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion, useInView } from "framer-motion";
import { SiteFooter } from "@/components/SiteFooter";
import { MODULR_ASSETS } from "@/config/assets";
import { MODULR_LINKS } from "@/config/links";
import { TonStyleShowcase } from "@/components/TonStyleShowcase";
import { CookieToast } from "@/components/CookieToast";
import { ExampleUseCasesStickySection } from "@/components/example/ExampleUseCasesStickySection";
import { AntigravityParticleTile } from "@/components/example/AntigravityParticleTile";
import { ScrollExpandingVideoTile } from "@/components/example/ScrollExpandingVideoTile";
import { ExampleMegaNav } from "@/components/example/ExampleMegaNav";

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
  title: "Robot Operation, at Scale.",
  description:
    "A real-time teleoperation platform built for enterprise performance and an open network economy—connecting robots, AI, data, and compute.",
  // Match the look of the main (/) hero: poster image + soft highlights + dark falloff.
  // Use a static poster here (instead of video) to keep the tile lightweight.
  poster:
    "https://cdn.prod.website-files.com/688b650d15ca6b144341e1f7%2F689b4e755b6819dac8d89bd5_hero_bg_semsombra%20%281%29-poster-00001.jpg",
  videoMp4:
    "https://cdn.prod.website-files.com/688b650d15ca6b144341e1f7%2F689b4e755b6819dac8d89bd5_hero_bg_semsombra%20%281%29-transcode.mp4",
  videoWebm:
    "https://cdn.prod.website-files.com/688b650d15ca6b144341e1f7%2F689b4e755b6819dac8d89bd5_hero_bg_semsombra%20%281%29-transcode.webm",
};

const sideCards = [
  {
    title: "Modulr Robotics",
    tag: "Dev track",
    readTime: "5 min read",
    // Reuse the same image as the "Long Term Vision" tile (requested)
    image: "/modulr_vision_image.jpg",
  },
  {
    title: "Modulr Blockchain",
    tag: "Dev track",
    readTime: "5 min read",
    // Abstract network lines read well as "blockchain"
    image: "/vibrant-wires-bg.png",
  },
];

const recentNews = [
  {
    title: "Our approach to decentralized robotics",
    tag: "Company",
    date: "16 Jan 2026",
    media: { type: "video" as const, src: "https://cdn.modulr.cloud/videos/robot-arm-assembly.mp4", poster: "/robot_touching_human.png" },
  },
  { title: "Providers can now list robots on Modulr", tag: "Product", date: "17 Dec 2025", media: { type: "image" as const, src: "/operate_any_robot3.png" } },
  { title: "Introducing usage-based pricing", tag: "Product", date: "11 Dec 2025", media: { type: "image" as const, src: "/earnings.png" } },
  { title: "Modulr for Healthcare", tag: "Product", date: "8 Jan 2026", media: { type: "image" as const, src: "/agriculture-industrial.png" } },
  { title: "Advancing Robotics with AI", tag: "Publication", date: "11 Dec 2025", media: { type: "image" as const, src: "/defense_robots.jpg" } },
  { title: "Ten Years of Innovation", tag: "Company", date: "11 Dec 2025", media: { type: "image" as const, src: "/vibrant-wires-bg.png" } },
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
  {
    title: "Evaluating real-time control latency",
    tag: "Research",
    date: "18 Dec 2025",
    media: { type: "image" as const, src: "/coordination-bg.png" },
  },
  {
    title: "Assessing AI capabilities for robotic tasks",
    tag: "Research",
    date: "16 Dec 2025",
    media: { type: "image" as const, src: "/robot arms.png" },
  },
  {
    title: "Accelerating biological research with robotics",
    tag: "Research",
    date: "16 Dec 2025",
    media: { type: "image" as const, src: "/modulr_vision_image.jpg" },
  },
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
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    if (typeof window === "undefined") return "light";
    return (localStorage.getItem("theme") as "dark" | "light" | null) ?? "light";
  });
  const footerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

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

  // Parallax scroll effect - removed to avoid TypeScript issues
  // const { scrollY } = useScroll();
  // const heroY = useTransform(scrollY, [0, 500], [0, 100]);
  // const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.3]);

  const bgColor = theme === "dark" ? "#000" : "#fff";
  const textColor = theme === "dark" ? "#fff" : "#000";
  const mutedTextColor = theme === "dark" ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)";
  const mutedTextColor2 = theme === "dark" ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)";
  const mutedTextColor3 = theme === "dark" ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)";
  const borderColor = theme === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
  const borderColor2 = theme === "dark" ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)";
  const borderColor3 = theme === "dark" ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)";
  const cardBg = theme === "dark" ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)";
  const cardBg2 = theme === "dark" ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)";
  const inputBg = theme === "dark" ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)";
  const buttonBg = theme === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";

  return (
    <div
      className="min-h-screen animate-fadeIn"
      style={{
        background: bgColor,
        color: textColor,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        transition: "background 0.3s, color 0.3s",
        position: "relative",
        // IMPORTANT: keep sticky sections (Use Cases) working.
        // Any non-visible overflow on a scrolling ancestor can break `position: sticky` in some browsers.
      }}
    >
      {/* Animated background gradient */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: theme === "dark"
            ? "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(242,180,0,0.08), transparent 50%), radial-gradient(ellipse 60% 40% at 50% 100%, rgba(242,180,0,0.05), transparent 50%)"
            : "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(242,180,0,0.05), transparent 50%), radial-gradient(ellipse 60% 40% at 50% 100%, rgba(242,180,0,0.03), transparent 50%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      
      {/* Content wrapper */}
      <div style={{ position: "relative", zIndex: 1 }}>
      {/* ───────────────────────────── HEADER ───────────────────────────── */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
        className="sticky top-0 z-50"
        data-example-header="true"
        style={{
          background: theme === "dark" ? "rgba(0,0,0,0.85)" : "rgba(255,255,255,0.85)",
          backdropFilter: "blur(20px)",
          borderBottom: borderColor,
          transition: "background 0.3s, border-color 0.3s",
          boxShadow: theme === "dark"
            ? "0 1px 0 rgba(255,255,255,0.05)"
            : "0 1px 0 rgba(0,0,0,0.05)",
        }}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-3">
          <div className="flex items-center gap-6">
            <Link href="/example" className="flex items-center gap-3">
              <img src={MODULR_ASSETS.LOGO_MARK} alt="Modulr" style={{ height: 28, width: "auto" }} />
            </Link>

            {/* CLICKUP-STYLE MEGA NAV */}
            <ExampleMegaNav theme={theme} />
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setSearchOpen(true)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: theme === "dark" ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
                border: `1px solid ${theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
                borderRadius: 8,
                padding: "6px 12px",
                color: theme === "dark" ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)",
                fontSize: 13,
                cursor: "pointer",
                transition: "border-color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = theme === "dark" ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)")}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <span className="hidden sm:inline">Search</span>
              <kbd style={{ marginLeft: 4, padding: "2px 6px", borderRadius: 4, background: theme === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)", fontSize: 11, fontFamily: "inherit" }}>⌘K</kbd>
            </button>
            <button
              onClick={toggleTheme}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 36,
                height: 36,
                borderRadius: 8,
                background: theme === "dark" ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
                border: `1px solid ${theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
                color: theme === "dark" ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.7)",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="5" />
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>
            <Link
              href="https://testnet.explorer.modulr.cloud"
              target="_blank"
              rel="noreferrer"
              style={{
                background: theme === "dark" ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)",
                border: `1px solid ${theme === "dark" ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)"}`,
                borderRadius: 20,
                padding: "8px 16px",
                color: theme === "dark" ? "rgba(255,255,255,0.86)" : "rgba(0,0,0,0.86)",
                fontSize: 14,
                fontWeight: 500,
                textDecoration: "none",
              }}
            >
              Explorer
            </Link>
            <Link
              href="https://app.modulr.cloud"
              target="_blank"
              rel="noreferrer"
              style={{
                background: theme === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
                border: `1px solid ${theme === "dark" ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)"}`,
                borderRadius: 20,
                padding: "8px 16px",
                color: theme === "dark" ? "#fff" : "#000",
                fontSize: 14,
                fontWeight: 500,
                textDecoration: "none",
              }}
            >
              Go to App
            </Link>
          </div>
        </div>
      </motion.header>

      {/* ───────────────────────────── MAIN CONTENT ───────────────────────────── */}
      <div className="mx-auto max-w-[1400px] px-6 py-10">
        <div className="flex gap-8">
          {/* LEFT SIDEBAR */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden w-[160px] flex-shrink-0 lg:block"
          >
            <nav className="sticky top-24 space-y-1">
              {sidebarNav.map((item, idx) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + idx * 0.05 }}
                >
                  <Link
                    href={item.href}
                    style={{
                      display: "block",
                      padding: "8px 0",
                      color: mutedTextColor,
                      fontSize: 14,
                      textDecoration: "none",
                      transition: "color 0.15s, transform 0.15s",
                      position: "relative",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = textColor;
                      e.currentTarget.style.transform = "translateX(4px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = mutedTextColor;
                      e.currentTarget.style.transform = "translateX(0)";
                    }}
                  >
                    {item.label}
                    {/* Active indicator */}
                    {item.href === "/example" && (
                      <motion.div
                        layoutId="activeIndicator"
                        style={{
                          position: "absolute",
                          left: -12,
                          top: "50%",
                          transform: "translateY(-50%)",
                          width: 2,
                          height: 16,
                          background: "#f2b400",
                          borderRadius: 1,
                        }}
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.aside>

          {/* CONTENT */}
          <div className="flex-1 space-y-20 min-w-0">
            {/* HERO + SIDE CARDS */}
            <section className="grid gap-6 lg:grid-cols-[1fr_320px]">
              {/* Hero card */}
              <div className="min-w-0">
                <Link href="#" className="group block">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
                    style={{
                      borderRadius: 16,
                      overflow: "hidden",
                      background: "#000",
                      aspectRatio: "16/9",
                      position: "relative",
                      border: `1px solid ${borderColor}`,
                    }}
                    whileHover={{ scale: 1.01, transition: { duration: 0.3 } }}
                  >
                    {/* Main-page-like hero background (video + highlights + falloff) */}
                    <video
                      className="absolute inset-0 h-full w-full object-cover"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="auto"
                      poster={heroCard.poster}
                      style={{
                        opacity: 0.58,
                        transform: "scale(1.02)",
                        pointerEvents: "none",
                      }}
                    >
                      <source src={heroCard.videoWebm} type="video/webm" />
                      <source src={heroCard.videoMp4} type="video/mp4" />
                    </video>
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "radial-gradient(1400px 900px at 50% 30%, rgba(242,180,0,0.15), transparent 55%), radial-gradient(1000px 700px at 80% 70%, rgba(255,255,255,0.06), transparent 55%)",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(to bottom, rgba(0,0,0,.15), rgba(0,0,0,.55), rgba(0,0,0,.86))",
                      }}
                    />

                    {/* Logo: keep perfectly centered (avoid framer overwriting translate transform on hover) */}
                    <div
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      <motion.div
                        style={{
                          width: 80,
                          height: 80,
                          // Requested: keep it black (not grey) even in light theme (match dark-theme look).
                          background: "rgba(0,0,0,0.72)",
                          backdropFilter: "blur(20px)",
                          borderRadius: 18,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          boxShadow: "0 10px 36px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.10)",
                          border: "1px solid rgba(255,255,255,0.10)",
                        }}
                        whileHover={{ scale: 1.08, rotate: 4, transition: { duration: 0.22 } }}
                      >
                        <img src={MODULR_ASSETS.LOGO_MARK} alt="" style={{ height: 36, filter: "brightness(1.15)" }} />
                      </motion.div>
                    </div>
                  </motion.div>
                </Link>

                <motion.h1 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  style={{ marginTop: 20, fontSize: 32, fontWeight: 400, color: textColor, letterSpacing: "-0.02em" }}
                >
                  {heroCard.title}
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  style={{ marginTop: 10, fontSize: 14, color: mutedTextColor, lineHeight: 1.6, maxWidth: 780 }}
                >
                  {heroCard.description}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.28 }}
                  style={{ marginTop: 14, display: "flex", gap: 10, flexWrap: "wrap" }}
                >
                  <a
                    href={MODULR_LINKS.APP}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      height: 42,
                      padding: "0 16px",
                      borderRadius: 999,
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "#f2b400",
                      color: "#130b00",
                      fontSize: 14,
                      fontWeight: 650,
                      letterSpacing: "-0.01em",
                      boxShadow: "0 10px 24px rgba(242,180,0,0.18), 0 0 0 1px rgba(0,0,0,0.12)",
                      transition: "transform 0.18s ease, filter 0.18s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.filter = "brightness(0.97)")}
                    onMouseLeave={(e) => (e.currentTarget.style.filter = "none")}
                  >
                    Launch app
                  </a>
                  <a
                    href={MODULR_LINKS.DEMO}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      height: 42,
                      padding: "0 16px",
                      borderRadius: 999,
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: theme === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)",
                      color: textColor,
                      fontSize: 14,
                      fontWeight: 650,
                      letterSpacing: "-0.01em",
                      border: `1px solid ${theme === "dark" ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.10)"}`,
                      boxShadow: theme === "dark" ? "0 10px 30px rgba(0,0,0,0.35)" : "0 10px 26px rgba(0,0,0,0.12)",
                      transition: "transform 0.18s ease, background 0.18s ease",
                      backdropFilter: "blur(10px)",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-1px)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0px)")}
                  >
                    Book a demo
                  </a>
                </motion.div>
              </div>

              {/* Side cards column */}
              <div className="space-y-6 flex-shrink-0">
                {sideCards.map((card, idx) => (
                  <Link key={card.title} href="#" className="group block">
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 + idx * 0.1 }}
                      style={{
                        borderRadius: 14,
                        overflow: "hidden",
                        background: theme === "dark" ? "#050506" : "#ffffff",
                        aspectRatio: "4/3",
                        position: "relative",
                        border: `1px solid ${borderColor}`,
                      }}
                      whileHover={{ scale: 1.02, y: -4, transition: { duration: 0.3 } }}
                    >
                      {/* Thematic media (kept consistent + premium) */}
                      <Image
                        src={(card as any).image}
                        alt=""
                        fill
                        sizes="320px"
                        style={{
                          objectFit: "cover",
                          // Keep both tiles visually consistent (monochrome), but still readable in light theme.
                          filter: theme === "dark"
                            ? "grayscale(1) contrast(1.08) brightness(0.88)"
                            : "grayscale(1) contrast(1.14) brightness(0.98)",
                          opacity: theme === "dark" ? 0.74 : 0.82,
                          transform: "scale(1.02)",
                        }}
                      />
                      <div
                        aria-hidden="true"
                        style={{
                          position: "absolute",
                          inset: 0,
                          background: theme === "dark"
                            ? "linear-gradient(180deg, rgba(0,0,0,0.25), rgba(0,0,0,0.72))"
                            // Light theme: avoid white wash; use a subtle dark vignette instead.
                            : "linear-gradient(180deg, rgba(0,0,0,0.06), rgba(0,0,0,0.28))",
                        }}
                      />

                      {/* Shimmer effect */}
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)",
                          transform: "translateX(-100%)",
                          transition: "transform 0.6s",
                        }}
                        className="group-hover:translate-x-full"
                      />
                      
                    </motion.div>
                    <motion.h2
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.3 + idx * 0.1 }}
                      style={{ marginTop: 14, fontSize: 18, fontWeight: 400, color: textColor }}
                    >
                      {card.title}
                    </motion.h2>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.4 + idx * 0.1 }}
                      style={{ marginTop: 6, fontSize: 13, color: mutedTextColor2 }}
                    >
                      {card.tag} · {card.readTime}
                    </motion.p>
                  </Link>
                ))}
              </div>
            </section>

            {/* ANTIGRAVITY-STYLE INTERACTIVE TILE */}
            <AntigravityParticleTile theme={theme} />

            {/* ANTIGRAVITY-STYLE SCROLL EXPANDING VIDEO TILE */}
            <ScrollExpandingVideoTile
              theme={theme}
              title="Modulr Technology Preview"
              subtitle="Scroll to expand — see how our network orchestrates real‑time teleoperation."
            />

            {/* TRUSTED BY - Animated marquee */}
            <TrustedByMarquee theme={theme} />
          </div>
        </div>
      </div>

      {/* TON STYLE SHOWCASE TILES */}
      <div data-theme={theme} style={{ 
        "--text-color": theme === "dark" ? "#fff" : "#000",
        "--muted-text": theme === "dark" ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)",
        "--bg-section": theme === "dark" ? "#000" : "#fff",
        "--border-hairline": theme === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
      } as React.CSSProperties}>
        <TonStyleShowcase />
      </div>

      {/* MAIN CONTENT CONTINUED */}
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
                    color: mutedTextColor,
                    fontSize: 14,
                    textDecoration: "none",
                    transition: "color 0.15s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = textColor)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = mutedTextColor)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </aside>

          {/* CONTENT */}
          <div className="flex-1 space-y-20 min-w-0">
            {/* RECENT NEWS */}
            <section>
              <div className="mb-8 flex items-center justify-between">
                <h2 style={{ fontSize: 20, fontWeight: 400, color: textColor }}>Recent news</h2>
                <Link href="/example/news" style={{ fontSize: 14, color: mutedTextColor, textDecoration: "none" }}>View more</Link>
              </div>
              <div className="grid gap-8 lg:grid-cols-2">
                <div className="space-y-6">
                  {recentNews.slice(0, 3).map((item, idx) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                    >
                      <Link href="#" className="group flex gap-5">
                        <motion.div
                          style={{
                            width: 140,
                            height: 100,
                            borderRadius: 12,
                            background: theme === "dark" ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)",
                            flexShrink: 0,
                            position: "relative",
                            overflow: "hidden",
                            border: `1px solid ${borderColor}`,
                          }}
                          whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                        >
                          {/* Mock media */}
                          {"media" in item && (item as any).media?.type === "image" ? (
                            <Image src={(item as any).media.src} alt="" fill sizes="140px" style={{ objectFit: "cover" }} />
                          ) : null}
                          {"media" in item && (item as any).media?.type === "video" ? (
                            <video
                              autoPlay
                              muted
                              loop
                              playsInline
                              preload="metadata"
                              poster={(item as any).media.poster}
                              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                            >
                              <source src={(item as any).media.src} type="video/mp4" />
                            </video>
                          ) : null}
                          <div
                            aria-hidden="true"
                            style={{
                              position: "absolute",
                              inset: 0,
                              background: theme === "dark" ? "linear-gradient(to top, rgba(0,0,0,0.45), transparent)" : "linear-gradient(to top, rgba(0,0,0,0.12), transparent)",
                            }}
                          />
                          {/* Shimmer effect */}
                          <div
                            style={{
                              position: "absolute",
                              inset: 0,
                              background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)",
                              transform: "translateX(-100%)",
                              transition: "transform 0.6s",
                            }}
                            className="group-hover:translate-x-full"
                          />
                        </motion.div>
                        <div>
                          <h3 style={{ fontSize: 17, fontWeight: 400, color: textColor, lineHeight: 1.4, transition: "color 0.2s" }} className="group-hover:text-[var(--accent)]">
                            {item.title}
                          </h3>
                          <p style={{ marginTop: 8, fontSize: 13, color: mutedTextColor2 }}>{item.tag} · {item.date}</p>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
                <div className="space-y-6">
                  {recentNews.slice(3, 6).map((item, idx) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.5, delay: (idx + 3) * 0.1 }}
                    >
                      <Link href="#" className="group flex gap-5">
                        <motion.div
                          style={{
                            width: 140,
                            height: 100,
                            borderRadius: 12,
                            background: theme === "dark" ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)",
                            flexShrink: 0,
                            position: "relative",
                            overflow: "hidden",
                            border: `1px solid ${borderColor}`,
                          }}
                          whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                        >
                          {/* Mock media */}
                          {"media" in item && (item as any).media?.type === "image" ? (
                            <Image src={(item as any).media.src} alt="" fill sizes="140px" style={{ objectFit: "cover" }} />
                          ) : null}
                          {"media" in item && (item as any).media?.type === "video" ? (
                            <video
                              autoPlay
                              muted
                              loop
                              playsInline
                              preload="metadata"
                              poster={(item as any).media.poster}
                              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                            >
                              <source src={(item as any).media.src} type="video/mp4" />
                            </video>
                          ) : null}
                          <div
                            aria-hidden="true"
                            style={{
                              position: "absolute",
                              inset: 0,
                              background: theme === "dark" ? "linear-gradient(to top, rgba(0,0,0,0.45), transparent)" : "linear-gradient(to top, rgba(0,0,0,0.12), transparent)",
                            }}
                          />
                          {/* Shimmer effect */}
                          <div
                            style={{
                              position: "absolute",
                              inset: 0,
                              background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)",
                              transform: "translateX(-100%)",
                              transition: "transform 0.6s",
                            }}
                            className="group-hover:translate-x-full"
                          />
                        </motion.div>
                        <div>
                          <h3 style={{ fontSize: 17, fontWeight: 400, color: textColor, lineHeight: 1.4, transition: "color 0.2s" }} className="group-hover:text-[var(--accent)]">
                            {item.title}
                          </h3>
                          <p style={{ marginTop: 8, fontSize: 13, color: mutedTextColor2 }}>{item.tag} · {item.date}</p>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* LATEST RESEARCH */}
            <section>
              <div className="mb-8 flex items-center justify-between">
                <h2 style={{ fontSize: 20, fontWeight: 400, color: textColor }}>Latest research</h2>
                <Link href="/research" style={{ fontSize: 14, color: mutedTextColor, textDecoration: "none" }}>View all</Link>
              </div>
              <div className="grid gap-6 lg:grid-cols-3">
                {research.map((item, idx) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                  >
                    <Link href="#" className="group block">
                      <motion.div
                        style={{
                          borderRadius: 14,
                          overflow: "hidden",
                          aspectRatio: "4/3",
                          background: theme === "dark" ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)",
                          position: "relative",
                          border: `1px solid ${borderColor}`,
                        }}
                        whileHover={{ scale: 1.03, y: -4, transition: { duration: 0.3 } }}
                      >
                        {"media" in item && (item as any).media?.type === "image" ? (
                          <Image src={(item as any).media.src} alt="" fill sizes="(max-width: 1024px) 100vw, 33vw" style={{ objectFit: "cover", opacity: theme === "dark" ? 0.72 : 0.82 }} />
                        ) : null}
                        {"media" in item && (item as any).media?.type === "video" ? (
                          <video
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="metadata"
                            poster={(item as any).media.poster}
                            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: theme === "dark" ? 0.72 : 0.82 }}
                          >
                            <source src={(item as any).media.src} type="video/mp4" />
                          </video>
                        ) : null}
                        <div
                          aria-hidden="true"
                          style={{
                            position: "absolute",
                            inset: 0,
                            background: theme === "dark"
                              ? "linear-gradient(to top, rgba(0,0,0,0.72), rgba(0,0,0,0.18), rgba(0,0,0,0.12))"
                              : "linear-gradient(to top, rgba(255,255,255,0.55), rgba(255,255,255,0.16), rgba(255,255,255,0.10))",
                          }}
                        />
                        {/* Animated gradient overlay */}
                        <div
                          style={{
                            position: "absolute",
                            inset: 0,
                            background: "linear-gradient(135deg, rgba(242,180,0,0.15) 0%, transparent 50%)",
                            opacity: 0,
                            transition: "opacity 0.4s",
                          }}
                          className="group-hover:opacity-100"
                        />
                        
                        {/* Glassmorphism icon */}
                        <motion.div
                          style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: 48,
                            height: 48,
                            background: theme === "dark"
                              ? "rgba(255,255,255,0.2)"
                              : "rgba(255,255,255,0.8)",
                            backdropFilter: "blur(10px)",
                            borderRadius: 12,
                            boxShadow: theme === "dark"
                              ? "0 4px 16px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.1)"
                              : "0 4px 16px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.05)",
                          }}
                          whileHover={{ scale: 1.2, rotate: 10, transition: { duration: 0.3 } }}
                        />
                      </motion.div>
                      <h3 style={{ marginTop: 14, fontSize: 17, fontWeight: 400, color: textColor, lineHeight: 1.4, transition: "color 0.2s" }} className="group-hover:text-[var(--accent)]">
                        {item.title}
                      </h3>
                      <p style={{ marginTop: 6, fontSize: 13, color: mutedTextColor2 }}>{item.tag} · {item.date}</p>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* FOR BUSINESS */}
            <section>
              <div className="mb-8 flex items-center justify-between">
                <h2 style={{ fontSize: 20, fontWeight: 400, color: textColor }}>Modulr for Business</h2>
                <Link href="#" style={{ fontSize: 14, color: mutedTextColor, textDecoration: "none" }}>View all</Link>
              </div>
              <div className="grid gap-6 lg:grid-cols-3">
                {[
                  { title: "Enterprise solutions", media: { type: "image" as const, src: "/scale-bg.png" } },
                  { title: "Robotics at scale", media: { type: "video" as const, src: "https://cdn.modulr.cloud/videos/robot-arm-assembly.mp4", poster: "/robot_touching_human.png" } },
                  { title: "Custom integrations", media: { type: "image" as const, src: "/vibrant-wires-bg.png" } },
                ].map((item) => (
                  <Link key={item.title} href="#" className="group block">
                    <div
                      style={{
                        borderRadius: 14,
                        overflow: "hidden",
                        aspectRatio: "16/9",
                        background: theme === "dark" ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)",
                        border: `1px solid ${borderColor}`,
                        position: "relative",
                      }}
                    >
                      {item.media.type === "image" ? (
                        <Image src={item.media.src} alt="" fill sizes="(max-width: 1024px) 100vw, 33vw" style={{ objectFit: "cover", opacity: theme === "dark" ? 0.78 : 0.86 }} />
                      ) : (
                        <video
                          autoPlay
                          muted
                          loop
                          playsInline
                          preload="metadata"
                          poster={item.media.poster}
                          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: theme === "dark" ? 0.78 : 0.86 }}
                        >
                          <source src={item.media.src} type="video/mp4" />
                        </video>
                      )}
                      <div
                        aria-hidden="true"
                        style={{
                          position: "absolute",
                          inset: 0,
                          background: theme === "dark"
                            ? "linear-gradient(to top, rgba(0,0,0,0.65), rgba(0,0,0,0.20), rgba(0,0,0,0.10))"
                            : "linear-gradient(to top, rgba(255,255,255,0.55), rgba(255,255,255,0.18), rgba(255,255,255,0.10))",
                        }}
                      />
                      <div
                        aria-hidden="true"
                        style={{
                          position: "absolute",
                          inset: 0,
                          opacity: 0,
                          transition: "opacity 0.35s",
                          background: "linear-gradient(135deg, rgba(242,180,0,0.18), transparent 55%)",
                        }}
                        className="group-hover:opacity-100"
                      />
                    </div>
                    <h3 style={{ marginTop: 14, fontSize: 17, fontWeight: 400, color: textColor }}>{item.title}</h3>
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* ═══════════ USE CASES SECTION (same as Home) ═══════════ */}
      <ExampleUseCasesStickySection theme={theme} />

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
                    color: mutedTextColor,
                    fontSize: 14,
                    textDecoration: "none",
                    transition: "color 0.15s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = textColor)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = mutedTextColor)}
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
                <h2 style={{ fontSize: 20, fontWeight: 400, color: textColor }}>Ecosystem</h2>
                <Link href="#" style={{ fontSize: 14, color: mutedTextColor, textDecoration: "none" }}>View all</Link>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {[
                  { title: "Research", desc: "Leading robotics labs", icon: <ResearchIcon theme={theme} /> },
                  { title: "Infrastructure", desc: "Cloud & edge computing", icon: <InfraIcon theme={theme} /> },
                  { title: "Hardware", desc: "Robotic platforms & OEMs", icon: <HardwareIcon theme={theme} /> },
                  { title: "Academia", desc: "Universities & research", icon: <AcademiaIcon theme={theme} /> },
                ].map((item, idx) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                  >
                    <EcosystemCard
                      title={item.title}
                      desc={item.desc}
                      icon={item.icon}
                      theme={theme}
                    />
                  </motion.div>
                ))}
              </div>
            </section>

            {/* DEVELOPER RESOURCES - Terminal-style cards */}
            <section>
              <div className="mb-8 flex items-center justify-between">
                <h2 style={{ fontSize: 20, fontWeight: 400, color: textColor }}>For Developers</h2>
                <Link href="#" style={{ fontSize: 14, color: mutedTextColor, textDecoration: "none" }}>Documentation</Link>
              </div>
              <div className="grid gap-4 lg:grid-cols-3">
                {[
                  { title: "API Reference", cmd: "curl api.modulr.cloud/v1", desc: "RESTful APIs and WebSocket endpoints", accent: "#22d3ee" },
                  { title: "SDK Libraries", cmd: "npm install @modulr/sdk", desc: "Python, TypeScript, Rust, and Go", accent: "#a78bfa" },
                  { title: "Quick Start", cmd: "npx create-modulr-app", desc: "Production-ready starter templates", accent: "#f2b400" },
                ].map((item, idx) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    whileHover={{ y: -4, transition: { duration: 0.3 } }}
                  >
                    <Link
                      href="#"
                      className="group block"
                      style={{
                        borderRadius: 16,
                        background: theme === "dark" ? "#0a0a0a" : "#fafafa",
                        border: borderColor,
                        overflow: "hidden",
                        transition: "border-color 0.2s, transform 0.2s",
                        position: "relative",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = borderColor2;
                        // Add glow effect
                        const glow = e.currentTarget.querySelector(".terminal-glow") as HTMLElement;
                        if (glow) glow.style.opacity = "1";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = borderColor;
                        const glow = e.currentTarget.querySelector(".terminal-glow") as HTMLElement;
                        if (glow) glow.style.opacity = "0";
                      }}
                    >
                      {/* Glow effect */}
                      <div
                        className="terminal-glow"
                        style={{
                          position: "absolute",
                          inset: 0,
                          background: `radial-gradient(circle at 50% 0%, ${item.accent}20, transparent 70%)`,
                          opacity: 0,
                          transition: "opacity 0.3s",
                          pointerEvents: "none",
                        }}
                      />
                      
                      {/* Terminal header */}
                      <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 14px", background: cardBg2, borderBottom: borderColor, position: "relative", zIndex: 1 }}>
                        <motion.div
                          style={{ width: 8, height: 8, borderRadius: "50%", background: "#ff5f56" }}
                          whileHover={{ scale: 1.2 }}
                        />
                        <motion.div
                          style={{ width: 8, height: 8, borderRadius: "50%", background: "#ffbd2e" }}
                          whileHover={{ scale: 1.2 }}
                        />
                        <motion.div
                          style={{ width: 8, height: 8, borderRadius: "50%", background: "#27ca40" }}
                          whileHover={{ scale: 1.2 }}
                        />
                        <span style={{ marginLeft: 8, fontSize: 11, color: mutedTextColor3 }}>terminal</span>
                      </div>
                      {/* Command */}
                      <div style={{ padding: "16px 14px", fontFamily: "monospace", fontSize: 13, position: "relative", zIndex: 1 }}>
                        <span style={{ color: item.accent }}>$</span>{" "}
                        <span style={{ color: theme === "dark" ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.8)" }}>{item.cmd}</span>
                      </div>
                      {/* Info */}
                      <div style={{ padding: "0 14px 20px", position: "relative", zIndex: 1 }}>
                        <h3 style={{ fontSize: 16, fontWeight: 600, color: textColor, transition: "color 0.2s" }} className="group-hover:text-[var(--accent)]">
                          {item.title}
                        </h3>
                        <p style={{ marginTop: 6, fontSize: 13, color: mutedTextColor2 }}>{item.desc}</p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* MINIMAL CTA */}
            <section style={{ paddingTop: 20, paddingBottom: 40 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 24 }}>
                <div>
                  <h2 style={{ fontSize: 22, fontWeight: 400, color: textColor, letterSpacing: "-0.01em" }}>
                    Start building today
                  </h2>
                  <p style={{ marginTop: 6, fontSize: 15, color: mutedTextColor2 }}>
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
      {showScrollTop && (
        <button
        onClick={scrollToTop}
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          width: 44,
          height: 44,
          borderRadius: "50%",
          background: theme === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
          border: `1px solid ${theme === "dark" ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)"}`,
          color: theme === "dark" ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.7)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: showScrollTop ? 1 : 0,
          pointerEvents: showScrollTop ? "auto" : "none",
          transition: "opacity 0.3s, background 0.2s, border-color 0.2s, color 0.2s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = theme === "dark" ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)";
          e.currentTarget.style.borderColor = theme === "dark" ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = theme === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
          e.currentTarget.style.borderColor = theme === "dark" ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)";
        }}
        aria-label="Scroll to top"
      >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </button>
      )}

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
              background: theme === "dark" ? "rgba(0,0,0,0.8)" : "rgba(0,0,0,0.4)",
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
              background: theme === "dark" ? "rgba(24,24,24,0.98)" : "rgba(255,255,255,0.98)",
              border: `1px solid ${borderColor2}`,
              borderRadius: 16,
              overflow: "hidden",
              boxShadow: theme === "dark" ? "0 24px 80px rgba(0,0,0,0.5)" : "0 24px 80px rgba(0,0,0,0.1)",
            }}
          >
            {/* Search input */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px 20px", borderBottom: borderColor }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={mutedTextColor3} strokeWidth="2">
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
                  color: textColor,
                }}
              />
              <kbd style={{ padding: "4px 8px", borderRadius: 6, background: buttonBg, fontSize: 12, color: mutedTextColor2 }}>ESC</kbd>
            </div>
            {/* Results */}
            <div style={{ maxHeight: 400, overflowY: "auto" }}>
              {searchQuery.length === 0 ? (
                <div style={{ padding: "32px 20px", textAlign: "center", color: mutedTextColor3, fontSize: 14 }}>
                  Start typing to search...
                </div>
              ) : filteredResults.length === 0 ? (
                <div style={{ padding: "32px 20px", textAlign: "center", color: mutedTextColor3, fontSize: 14 }}>
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
                        color: textColor,
                        textDecoration: "none",
                        transition: "background 0.15s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = cardBg2)}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      <div>
                        <div style={{ fontSize: 15, fontWeight: 500 }}>{item.title}</div>
                        <div style={{ marginTop: 2, fontSize: 12, color: mutedTextColor3 }}>{item.category}</div>
                      </div>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={mutedTextColor2} strokeWidth="2">
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    </Link>
                  ))}
                </div>
              )}
            </div>
            {/* Footer */}
            <div style={{ padding: "12px 20px", borderTop: borderColor, display: "flex", justifyContent: "space-between", fontSize: 12, color: mutedTextColor3 }}>
              <span>Navigate with ↑↓ · Select with ↵</span>
              <span>Powered by Modulr Search</span>
            </div>
          </div>
        </div>
      )}

      {/* COOKIE TOAST */}
      <CookieToast theme={theme} />
      </div>
    </div>
  );
}

/* NOTE: Old Use Cases implementation removed.
   /example now uses `ExampleUseCasesStickySection` for the "USE CASES" section. */

/* ═══════════════════════════════════════════════════════════════════════════ */
/* TRUSTED BY MARQUEE                                                           */
/* ═══════════════════════════════════════════════════════════════════════════ */

function TrustedByMarquee({ theme }: { theme: "dark" | "light" }) {
  const logos = [
    // Keep in sync with homepage "TrustedByMarquee"
    "https://cdn.brandfetch.io/idkFvHPM3p/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1757914702922", // IRYS
    "https://cdn.brandfetch.io/idXoj5DuCE/theme/light/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1725526926970", // NVIDIA Inception
    "/robox-logo-white.png", // RoboX
    "https://cdn.brandfetch.io/idkDJyXvmW/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1719305229674", // Oxford University
    "/paal-ai-logo.webp", // Paal AI
  ];
  const borderColor = theme === "dark" ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)";
  const textColor = theme === "dark" ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.35)";

  return (
    <section style={{ position: "relative", overflow: "hidden", padding: "40px 0", borderTop: borderColor, borderBottom: borderColor }}>
      <div style={{ fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: textColor, textAlign: "center", marginBottom: 32 }}>
        Trusted by industry leaders
      </div>
      
      {/* Marquee container */}
      <div style={{ position: "relative", width: "100%", overflow: "hidden" }}>
        {/* Gradient masks */}
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 100, background: `linear-gradient(to right, ${theme === "dark" ? "#000" : "#fff"}, transparent)`, zIndex: 2 }} />
        <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 100, background: `linear-gradient(to left, ${theme === "dark" ? "#000" : "#fff"}, transparent)`, zIndex: 2 }} />
        
        {/* Scrolling content */}
        <div className="marquee-track" style={{ display: "flex", width: "fit-content" }}>
          {[...logos, ...logos, ...logos].map((logo, i) => (
            <div key={i} style={{ flexShrink: 0, padding: "0 48px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <img src={logo} alt="" style={{ height: 28, width: "auto", filter: theme === "dark" ? "brightness(0) invert(1)" : "brightness(0)", opacity: 0.5 }} />
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

function EcosystemCard({ title, desc, icon, theme }: { title: string; desc: string; icon: React.ReactNode; theme: "dark" | "light" }) {
  const textColor = theme === "dark" ? "#fff" : "#000";
  const mutedTextColor = theme === "dark" ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.45)";
  const cardBg = theme === "dark" ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)";
  const cardBgHover = theme === "dark" ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)";
  const borderColor = theme === "dark" ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)";
  const borderColorHover = theme === "dark" ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)";

  return (
    <Link
      href="#"
      className="group block ecosystem-card"
      style={{
        padding: "24px",
        borderRadius: 16,
        background: cardBg,
        border: `1px solid ${borderColor}`,
        transition: "border-color 0.3s, background 0.3s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = borderColorHover;
        e.currentTarget.style.background = cardBgHover;
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
        e.currentTarget.style.borderColor = borderColor;
        e.currentTarget.style.background = cardBg;
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
      <h3 style={{ fontSize: 15, fontWeight: 500, color: textColor }}>{title}</h3>
      <p style={{ marginTop: 6, fontSize: 13, color: mutedTextColor, lineHeight: 1.5 }}>{desc}</p>
    </Link>
  );
}

/* Animated Research Icon - microscope/lab */
function ResearchIcon({ theme }: { theme: "dark" | "light" }) {
  const baseRing = theme === "dark" ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.10)";
  const baseStroke = theme === "dark" ? "rgba(255,255,255,0.60)" : "rgba(0,0,0,0.58)";
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="ecosystem-icon">
      <circle cx="20" cy="20" r="18" stroke={baseRing} strokeWidth="1" />
      <circle cx="20" cy="20" r="18" stroke="url(#researchGrad)" strokeWidth="1" strokeDasharray="113" strokeDashoffset="113" className="icon-circle" style={{ transition: "stroke-dashoffset 0.8s ease-out" }} />
      <path d="M15 14v12M25 14v12M15 20h10" stroke={baseStroke} strokeWidth="1.5" strokeLinecap="round" className="icon-inner" style={{ transition: "stroke 0.3s" }} />
      <circle cx="20" cy="14" r="3" stroke={baseStroke} strokeWidth="1.5" className="icon-inner" style={{ transition: "stroke 0.3s" }} />
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
function InfraIcon({ theme }: { theme: "dark" | "light" }) {
  const baseRing = theme === "dark" ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.10)";
  const baseStroke = theme === "dark" ? "rgba(255,255,255,0.60)" : "rgba(0,0,0,0.58)";
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="ecosystem-icon">
      <circle cx="20" cy="20" r="18" stroke={baseRing} strokeWidth="1" />
      <circle cx="20" cy="20" r="18" stroke="url(#infraGrad)" strokeWidth="1" strokeDasharray="113" strokeDashoffset="113" className="icon-circle" style={{ transition: "stroke-dashoffset 0.8s ease-out" }} />
      <rect x="12" y="16" width="16" height="4" rx="1" stroke={baseStroke} strokeWidth="1.5" className="icon-inner" style={{ transition: "stroke 0.3s" }} />
      <rect x="12" y="22" width="16" height="4" rx="1" stroke={baseStroke} strokeWidth="1.5" className="icon-inner" style={{ transition: "stroke 0.3s" }} />
      <circle cx="15" cy="18" r="1" fill={baseStroke} className="icon-dot" style={{ transition: "fill 0.3s" }} />
      <circle cx="15" cy="24" r="1" fill={baseStroke} className="icon-dot" style={{ transition: "fill 0.3s" }} />
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
function HardwareIcon({ theme }: { theme: "dark" | "light" }) {
  const baseRing = theme === "dark" ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.10)";
  const baseStroke = theme === "dark" ? "rgba(255,255,255,0.60)" : "rgba(0,0,0,0.58)";
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="ecosystem-icon">
      <circle cx="20" cy="20" r="18" stroke={baseRing} strokeWidth="1" />
      <circle cx="20" cy="20" r="18" stroke="url(#hwGrad)" strokeWidth="1" strokeDasharray="113" strokeDashoffset="113" className="icon-circle" style={{ transition: "stroke-dashoffset 0.8s ease-out" }} />
      <rect x="14" y="14" width="12" height="12" rx="2" stroke={baseStroke} strokeWidth="1.5" className="icon-inner" style={{ transition: "stroke 0.3s" }} />
      <path d="M17 11v3M20 11v3M23 11v3M17 26v3M20 26v3M23 26v3M11 17h3M11 20h3M11 23h3M26 17h3M26 20h3M26 23h3" stroke={baseStroke} strokeWidth="1.5" strokeLinecap="round" className="icon-pins" style={{ transition: "stroke 0.3s" }} />
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
function AcademiaIcon({ theme }: { theme: "dark" | "light" }) {
  const baseRing = theme === "dark" ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.10)";
  const baseStroke = theme === "dark" ? "rgba(255,255,255,0.60)" : "rgba(0,0,0,0.58)";
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="ecosystem-icon">
      <circle cx="20" cy="20" r="18" stroke={baseRing} strokeWidth="1" />
      <circle cx="20" cy="20" r="18" stroke="url(#acadGrad)" strokeWidth="1" strokeDasharray="113" strokeDashoffset="113" className="icon-circle" style={{ transition: "stroke-dashoffset 0.8s ease-out" }} />
      <path d="M20 13l8 4-8 4-8-4 8-4z" stroke={baseStroke} strokeWidth="1.5" strokeLinejoin="round" className="icon-inner" style={{ transition: "stroke 0.3s" }} />
      <path d="M12 17v6l8 4 8-4v-6" stroke={baseStroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="icon-inner" style={{ transition: "stroke 0.3s" }} />
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

