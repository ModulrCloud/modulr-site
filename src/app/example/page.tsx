"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion, useInView } from "framer-motion";
import { SiteFooter } from "@/components/SiteFooter";
import { MODULR_ASSETS } from "@/config/assets";
import { MODULR_LINKS } from "@/config/links";
import { researchPosts } from "@/content/research";
import { TonStyleShowcase } from "@/components/TonStyleShowcase";
import { CookieToast } from "@/components/CookieToast";
import { ExampleUseCasesStickySection } from "@/components/example/ExampleUseCasesStickySection";
import { AntigravityParticleTile } from "@/components/example/AntigravityParticleTile";
import { ScrollExpandingVideoTile } from "@/components/example/ScrollExpandingVideoTile";
import { ExampleMegaNav } from "@/components/example/ExampleMegaNav";
import { TeleopShowcase } from "@/components/example/TeleopShowcase";
import { ElevenInspiredSections } from "@/components/example/ElevenInspiredSections";

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
    // Premium real screenshot (requested)
    image: "/explorer.png",
  },
];

type RoboticsStory = {
  href: string;
  title: string;
  meta: string;
  image: string;
};

const NEWS_COMPARISON_STYLES = [
  {
    title: "Flash v2.5",
    subtitle: "Our lowest latency teleoperation model",
    light:
      "radial-gradient(340px 220px at 18% 78%, rgba(255,183,99,0.78), transparent 58%), radial-gradient(420px 250px at 44% 62%, rgba(86,196,223,0.82), transparent 62%), radial-gradient(340px 220px at 84% 20%, rgba(157,140,255,0.66), transparent 58%), #334265",
    dark:
      "radial-gradient(340px 220px at 18% 78%, rgba(255,168,82,0.62), transparent 58%), radial-gradient(420px 250px at 44% 62%, rgba(61,168,194,0.60), transparent 62%), radial-gradient(340px 220px at 84% 20%, rgba(125,108,232,0.52), transparent 58%), #1e2742",
  },
  {
    title: "Turbo v2.5",
    subtitle: "Balanced quality and latency",
    light:
      "radial-gradient(330px 220px at 52% 76%, rgba(252,124,99,0.74), transparent 58%), radial-gradient(360px 220px at 65% 38%, rgba(193,151,255,0.74), transparent 58%), radial-gradient(420px 260px at 18% 44%, rgba(77,132,255,0.82), transparent 64%), #254284",
    dark:
      "radial-gradient(330px 220px at 52% 76%, rgba(228,99,74,0.58), transparent 58%), radial-gradient(360px 220px at 65% 38%, rgba(160,120,228,0.56), transparent 58%), radial-gradient(420px 260px at 18% 44%, rgba(58,108,212,0.62), transparent 64%), #1c2f67",
  },
  {
    title: "Multilingual v2",
    subtitle: "Consistent quality across environments",
    light:
      "radial-gradient(320px 210px at 22% 30%, rgba(83,213,168,0.82), transparent 58%), radial-gradient(360px 240px at 74% 40%, rgba(87,138,255,0.74), transparent 60%), radial-gradient(260px 170px at 60% 85%, rgba(255,173,95,0.70), transparent 60%), #2b4d6d",
    dark:
      "radial-gradient(320px 210px at 22% 30%, rgba(58,181,138,0.62), transparent 58%), radial-gradient(360px 240px at 74% 40%, rgba(64,108,214,0.58), transparent 60%), radial-gradient(260px 170px at 60% 85%, rgba(229,142,68,0.52), transparent 60%), #1f374f",
  },
  {
    title: "Eleven v3",
    subtitle: "Most expressive operator-assist model",
    light:
      "radial-gradient(330px 220px at 24% 74%, rgba(255,140,92,0.76), transparent 58%), radial-gradient(370px 250px at 70% 32%, rgba(120,171,255,0.76), transparent 62%), radial-gradient(300px 190px at 84% 70%, rgba(226,110,168,0.66), transparent 58%), #3a3e73",
    dark:
      "radial-gradient(330px 220px at 24% 74%, rgba(229,108,62,0.58), transparent 58%), radial-gradient(370px 250px at 70% 32%, rgba(93,136,216,0.58), transparent 62%), radial-gradient(300px 190px at 84% 70%, rgba(190,88,140,0.50), transparent 58%), #2a2d59",
  },
] as const;

function proxiedImage(src: string) {
  if (!src.startsWith("http")) return src;
  if (src.startsWith("/api/proxy-image?url=")) return src;
  try {
    const host = new URL(src).hostname;
    const shouldProxy =
      host === "www.therobotreport.com" ||
      host === "therobotreport.com" ||
      host === "spectrum.ieee.org" ||
      host === "robohub.org" ||
      host === "i0.wp.com" ||
      host === "i1.wp.com" ||
      host === "i2.wp.com" ||
      host === "c0.wp.com" ||
      host === "c1.wp.com" ||
      host === "c2.wp.com" ||
      host === "secure.gravatar.com" ||
      host === "www.gravatar.com";
    return shouldProxy ? `/api/proxy-image?url=${encodeURIComponent(src)}` : src;
  } catch {
    return src;
  }
}

function hashValue(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) hash = (hash * 31 + input.charCodeAt(i)) >>> 0;
  return hash;
}

function styleForStory(seed: string) {
  return NEWS_COMPARISON_STYLES[hashValue(seed) % NEWS_COMPARISON_STYLES.length];
}

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

const whyModulrPanels = [
  {
    kicker: "Customizability",
    title: "Operate any robot with any interface",
    desc: "Modulr works across robot manufacturers and control inputs including keyboards, joysticks, VR/AR, haptics, and custom controllers.",
    bg: "/vibrant-wires-bg.png",
  },
  {
    kicker: "Coordination",
    title: "Designed for human-in-the-loop operations",
    desc: "Coordinate live robot operations with safe interventions, clear handoffs, and detailed logs, so responsibility and oversight never get lost.",
    bg: "/coordination-bg.png",
  },
  {
    kicker: "Scale",
    title: "Built to grow with your organization",
    desc: "Easily add robots, deployments, and team members as your organization grows, while keeping operations consistent, safe, and manageable over time.",
    bg: "/expansion-2.png",
  },
];

/* teleopFeatures moved to <TeleopShowcase /> component */

const networkStats = [
  { label: "Robots connected", value: "1,200+" },
  { label: "Countries", value: "60+" },
  { label: "Operators", value: "340+" },
  { label: "Avg latency", value: "120ms" },
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
  const [stories, setStories] = useState<RoboticsStory[]>([]);
  const [storiesStatus, setStoriesStatus] = useState<"idle" | "loading" | "ready" | "error">("idle");
  const footerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setStoriesStatus("loading");
        const res = await fetch("/api/robotics-news?limit=6", { cache: "no-store" });
        const json = (await res.json()) as { stories?: RoboticsStory[] };
        if (cancelled) return;
        setStories(Array.isArray(json.stories) ? json.stories : []);
        setStoriesStatus("ready");
      } catch {
        if (cancelled) return;
        setStoriesStatus("error");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

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
  const premiumPageBg = theme === "dark" ? "#0a0a0b" : "#f3f3f5";
  const premiumPanelBg = theme === "dark" ? "#111214" : "#efeff0";
  const premiumTileBg = theme === "dark" ? "#15161a" : "#f7f7f8";
  const premiumPanelBorder = theme === "dark" ? "rgba(255,255,255,0.11)" : "rgba(0,0,0,0.10)";
  const premiumTileBorder = theme === "dark" ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.09)";
  const premiumPanelRadius = 28;
  const premiumTileRadius = 20;
  const premiumPanelPadding = 24;
  const premiumPillHeight = 44;

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
              <div
                style={{
                  borderRadius: premiumPanelRadius,
                  border: `1px solid ${premiumPanelBorder}`,
                  background: premiumPanelBg,
                  padding: premiumPanelPadding,
                }}
              >
              <div className="mb-8 flex items-center justify-between">
                <h2 style={{ fontSize: 26 / 1.05, fontWeight: 520, color: textColor, letterSpacing: "-0.02em" }}>Recent news</h2>
                <Link href="/example/news" style={{ fontSize: 14, color: mutedTextColor, textDecoration: "none" }}>View more</Link>
              </div>
              {stories.length > 0 ? (
                <div className="grid gap-4 lg:grid-cols-[1.12fr_0.88fr]">
                  <Link href={stories[0]?.href || "#"} target="_blank" rel="noreferrer" className="group block">
                    <motion.div
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.45 }}
                      style={{
                        position: "relative",
                        borderRadius: premiumTileRadius,
                        minHeight: 360,
                        overflow: "hidden",
                        border: `1px solid ${premiumTileBorder}`,
                        background: premiumTileBg,
                      }}
                    >
                      {(() => {
                        const style = styleForStory(`${stories[0].title}-${stories[0].meta}`);
                        return (
                          <>
                            <div
                              style={{
                                position: "absolute",
                                inset: 0,
                                background: theme === "dark" ? style.dark : style.light,
                              }}
                            />
                            <div
                              style={{
                                position: "absolute",
                                inset: 0,
                                background:
                                  "repeating-radial-gradient(circle at 0 0, rgba(255,255,255,0.10), rgba(255,255,255,0.10) 1px, transparent 1px, transparent 4px)",
                                mixBlendMode: "soft-light",
                                opacity: 0.22,
                              }}
                            />
                            <div style={{ position: "absolute", left: 18, top: 16 }}>
                              <h3 style={{ color: "rgba(255,255,255,0.96)", fontSize: 56 / 2, lineHeight: 1.08, letterSpacing: "-0.02em", fontWeight: 500 }}>
                                {style.title}
                              </h3>
                              <p style={{ marginTop: 6, color: "rgba(255,255,255,0.78)", fontSize: 16 / 1.05 }}>
                                {style.subtitle}
                              </p>
                            </div>
                          </>
                        );
                      })()}
                      <div style={{ position: "absolute", left: 18, right: 18, bottom: 16 }}>
                        <p style={{ marginTop: 8, color: "rgba(255,255,255,0.82)", fontSize: 13 }}>{stories[0].meta}</p>
                      </div>
                    </motion.div>
                  </Link>

                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                    {stories.slice(1, 4).map((item, idx) => (
                      <Link key={item.title} href={item.href} target="_blank" rel="noreferrer" className="group block">
                        <motion.div
                          initial={{ opacity: 0, y: 18 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: "-50px" }}
                          transition={{ duration: 0.45, delay: idx * 0.06 }}
                          style={{
                            borderRadius: premiumTileRadius - 2,
                            border: `1px solid ${premiumTileBorder}`,
                            background: premiumTileBg,
                            overflow: "hidden",
                          }}
                        >
                          <div style={{ position: "relative", height: 130 }}>
                            {(() => {
                              const style = styleForStory(`${item.title}-${item.meta}`);
                              return (
                                <>
                                  <div
                                    style={{
                                      position: "absolute",
                                      inset: 0,
                                      background: theme === "dark" ? style.dark : style.light,
                                    }}
                                  />
                                  <div
                                    style={{
                                      position: "absolute",
                                      inset: 0,
                                      background:
                                        "repeating-radial-gradient(circle at 0 0, rgba(255,255,255,0.10), rgba(255,255,255,0.10) 1px, transparent 1px, transparent 4px)",
                                      mixBlendMode: "soft-light",
                                      opacity: 0.2,
                                    }}
                                  />
                                  <div style={{ position: "absolute", left: 12, top: 10 }}>
                                    <div style={{ color: "rgba(255,255,255,0.95)", fontSize: 20 / 1.05, lineHeight: 1.08, letterSpacing: "-0.02em", fontWeight: 500 }}>
                                      {style.title}
                                    </div>
                                    <div style={{ marginTop: 3, color: "rgba(255,255,255,0.78)", fontSize: 11, lineHeight: 1.2 }}>
                                      {style.subtitle}
                                    </div>
                                  </div>
                                </>
                              );
                            })()}
                          </div>
                          <div style={{ padding: 14 }}>
                            <div style={{ color: textColor, fontSize: 16, lineHeight: 1.35, fontWeight: 510 }}>{item.title}</div>
                            <div style={{ marginTop: 6, color: mutedTextColor2, fontSize: 12 }}>{item.meta}</div>
                          </div>
                        </motion.div>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <div style={{ fontSize: 13, color: mutedTextColor2 }}>
                  {storiesStatus === "error" ? "Failed to load the news feed." : storiesStatus === "loading" ? "Loading news..." : "No stories available."}
                </div>
              )}
              </div>
            </section>

            {/* LATEST RESEARCH */}
            <section>
              <div
                style={{
                  borderRadius: premiumPanelRadius,
                  border: `1px solid ${premiumPanelBorder}`,
                  background: premiumPanelBg,
                  padding: premiumPanelPadding,
                }}
              >
              <div className="mb-8 flex items-center justify-between">
                <h2 style={{ fontSize: 26 / 1.05, fontWeight: 520, color: textColor, letterSpacing: "-0.02em" }}>Latest research</h2>
                <Link href="/example/research" style={{ fontSize: 14, color: mutedTextColor, textDecoration: "none" }}>View all</Link>
              </div>
              <div className="grid gap-6 lg:grid-cols-[1fr_1.06fr] lg:items-start">
                <Link href={`/research/${researchPosts[0]?.slug}`} className="group block">
                  <div
                    style={{
                      borderRadius: premiumTileRadius,
                      border: `1px solid ${premiumTileBorder}`,
                      background: premiumTileBg,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: 170,
                        borderBottom: `1px solid ${premiumTileBorder}`,
                        background:
                          "radial-gradient(520px 240px at 22% 35%, rgba(109,189,255,0.58), transparent 56%), radial-gradient(620px 290px at 80% 55%, rgba(242,180,0,0.42), transparent 58%)",
                      }}
                    />
                    <div style={{ padding: 18 }}>
                      <div style={{ fontSize: 12, color: mutedTextColor2, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                        {researchPosts[0]?.category}
                      </div>
                      <h3 style={{ marginTop: 10, color: textColor, fontSize: 22 / 1.05, lineHeight: 1.25, letterSpacing: "-0.01em" }}>
                        {researchPosts[0]?.title}
                      </h3>
                      <p style={{ marginTop: 9, color: mutedTextColor, fontSize: 14, lineHeight: 1.65 }}>
                        {researchPosts[0]?.excerpt}
                      </p>
                    </div>
                  </div>
                </Link>

                <div>
                  {researchPosts.slice(1, 5).map((post) => (
                    <Link key={post.slug} href={`/research/${post.slug}`} style={{ textDecoration: "none" }}>
                      <div
                        className="flex items-center justify-between"
                        style={{ borderTop: `1px dashed ${premiumTileBorder}`, padding: "16px 0" }}
                      >
                        <div>
                          <div style={{ color: textColor, fontSize: 34 / 2, lineHeight: 1.3 }}>{post.title}</div>
                          <div style={{ marginTop: 5, color: mutedTextColor2, fontSize: 12 }}>
                            {post.date} · {post.readingMinutes} min read
                          </div>
                        </div>
                        <span style={{ color: mutedTextColor2, fontSize: 34 / 2 }}>+</span>
                      </div>
                    </Link>
                  ))}
                  <div style={{ borderTop: `1px dashed ${premiumTileBorder}` }} />
                </div>
              </div>
              </div>
            </section>

            {/* Modulr for Business removed (requested) */}
          </div>
        </div>
      </div>

      {/* ═══════════ PORTED CONTENT FROM HOME (premium /example styling) ═══════════ */}
      <section
        style={{
          borderTop: `1px solid ${borderColor}`,
          padding: "82px 0 70px",
          background: premiumPageBg,
        }}
      >
        <div className="mx-auto max-w-[1400px] px-6">
          <div
            style={{
              borderRadius: premiumPanelRadius,
              border: `1px solid ${premiumPanelBorder}`,
              background: premiumPanelBg,
              padding: premiumPanelPadding,
            }}
          >
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div style={{ fontSize: 13, letterSpacing: "0.03em", color: mutedTextColor2 }}>Why Modulr</div>
                <h2 style={{ marginTop: 10, fontSize: 52 / 2, fontWeight: 520, color: textColor, letterSpacing: "-0.03em", lineHeight: 1.08 }}>
                  Built for speed. Built for operators.
                </h2>
                <p style={{ marginTop: 10, fontSize: 16 / 1.1, color: mutedTextColor, maxWidth: 760, lineHeight: 1.68 }}>
                  Modulr is intuitive for first-time operators, yet deeply customizable for advanced robotics teams running critical missions.
                </p>
              </div>
              <Link
                href="/technology-overview"
                style={{
                  height: premiumPillHeight,
                  borderRadius: 999,
                  padding: "0 16px",
                  border: `1px solid ${theme === "dark" ? "rgba(255,255,255,0.14)" : "rgba(0,0,0,0.12)"}`,
                  display: "inline-flex",
                  alignItems: "center",
                  fontSize: 14,
                  color: textColor,
                  textDecoration: "none",
                  background: theme === "dark" ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.6)",
                }}
              >
                Explore technology
              </Link>
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
              {whyModulrPanels.map((p, idx) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.45, delay: idx * 0.07 }}
                  style={{
                    borderRadius: premiumTileRadius,
                    border: `1px solid ${premiumTileBorder}`,
                    background: premiumTileBg,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      height: 132,
                      borderBottom: `1px solid ${theme === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
                      overflow: "hidden",
                    }}
                  >
                    <Image
                      src={p.bg}
                      alt=""
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      style={{
                        objectFit: "cover",
                        opacity: theme === "dark" ? 0.42 : 0.30,
                        filter: "grayscale(1) contrast(1.05)",
                      }}
                    />
                    <div
                      aria-hidden="true"
                      style={{
                        position: "absolute",
                        inset: 0,
                        background:
                          theme === "dark"
                            ? "linear-gradient(to bottom, rgba(0,0,0,0.35), rgba(0,0,0,0.58))"
                            : "linear-gradient(to bottom, rgba(255,255,255,0.22), rgba(255,255,255,0.65))",
                      }}
                    />
                  </div>
                  <div style={{ padding: 18 }}>
                    <div style={{ fontSize: 12, color: mutedTextColor2, fontWeight: 500 }}>{p.kicker}</div>
                    <div style={{ marginTop: 9, fontSize: 18, fontWeight: 520, color: textColor, lineHeight: 1.35 }}>
                      {p.title}
                    </div>
                    <div style={{ marginTop: 8, fontSize: 14 / 1.04, color: mutedTextColor, lineHeight: 1.64 }}>
                      {p.desc}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Teleoperation — ElevenLabs-inspired interactive showcase */}
      <TeleopShowcase theme={theme} />

      {/* Additional screenshot-inspired premium sections */}
      <ElevenInspiredSections theme={theme} />

      {/* Network stats (ported core content) */}
      <section
        style={{
          borderTop: `1px solid ${borderColor}`,
          padding: "82px 0 76px",
          background: premiumPageBg,
        }}
      >
        <div className="mx-auto max-w-[1400px] px-6">
          <div
            style={{
              borderRadius: premiumPanelRadius,
              border: `1px solid ${premiumPanelBorder}`,
              background: premiumPanelBg,
              padding: premiumPanelPadding,
            }}
          >
            <div className="grid gap-5 lg:grid-cols-[1fr_360px] lg:items-end">
              <div>
                <div style={{ fontSize: 13, color: mutedTextColor2 }}>Network stats</div>
                <h2 style={{ marginTop: 10, fontSize: 52 / 2, fontWeight: 520, color: textColor, letterSpacing: "-0.03em", lineHeight: 1.08 }}>
                  Proof that it feels real
                </h2>
                <p style={{ marginTop: 10, fontSize: 16 / 1.1, color: mutedTextColor, maxWidth: 720, lineHeight: 1.68 }}>
                  These numbers reflect live robot operations, global coverage, and low-latency control in production environments.
                </p>
              </div>
              <div
                style={{
                  borderRadius: premiumTileRadius - 2,
                  border: `1px solid ${premiumTileBorder}`,
                  background: premiumTileBg,
                  padding: 14,
                }}
              >
                <div style={{ color: mutedTextColor2, fontSize: 13 }}>Latency profile</div>
                <div style={{ marginTop: 10, height: 94, borderRadius: 10, border: `1px solid ${theme === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`, background: "linear-gradient(180deg, rgba(73,114,255,0.13), rgba(73,114,255,0.04))" }}>
                  <svg viewBox="0 0 320 70" style={{ width: "100%", height: "100%" }}>
                    <path d="M0 40 C30 33, 55 46, 82 37 C106 29, 132 41, 159 33 C182 27, 210 39, 236 31 C260 24, 290 35, 320 30" stroke="#4e6de6" strokeWidth="2.4" fill="none" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {networkStats.map((s) => (
                <div
                  key={s.label}
                  style={{
                    borderRadius: 16,
                    border: `1px solid ${premiumTileBorder}`,
                    background: premiumTileBg,
                    padding: 18,
                  }}
                >
                  <div style={{ fontSize: 28 / 1.05, fontWeight: 650, color: textColor, letterSpacing: "-0.02em" }}>{s.value}</div>
                  <div style={{ marginTop: 6, fontSize: 13, color: mutedTextColor2 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

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
            {/* APIs BUILT FOR PRODUCTION (inspired by /developers) */}
            <section>
              <div
                style={{
                  borderRadius: premiumPanelRadius,
                  border: `1px solid ${premiumPanelBorder}`,
                  background: premiumPanelBg,
                  padding: premiumPanelPadding,
                }}
              >
              <div className="mb-8 flex items-center justify-between">
                <h2 style={{ fontSize: 26 / 1.05, fontWeight: 520, color: textColor, letterSpacing: "-0.02em" }}>
                  APIs built for production
                </h2>
                <Link href="/technology-overview" style={{ fontSize: 14, color: mutedTextColor, textDecoration: "none" }}>
                  Explore architecture
                </Link>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[
                  { title: "Teleoperation API", desc: "Sub-150ms control channels for mission-critical robot sessions.", icon: <InfraIcon theme={theme} /> },
                  { title: "Fleet Management API", desc: "Dispatch, monitor, and coordinate robot fleets from one endpoint.", icon: <HardwareIcon theme={theme} /> },
                  { title: "Safety & Policy API", desc: "Declarative guardrails and automatic intervention hooks.", icon: <AcademiaIcon theme={theme} /> },
                  { title: "Session Replay API", desc: "Command and video timeline export for forensic-grade auditing.", icon: <ResearchIcon theme={theme} /> },
                  { title: "Voice Agent API", desc: "Natural operator copilots for support and incident response.", icon: <InfraIcon theme={theme} /> },
                  { title: "Analytics API", desc: "Operational metrics, latency profiling, and performance reports.", icon: <HardwareIcon theme={theme} /> },
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
              </div>
            </section>

            {/* SAFETY, BUILT IN (inspired by /safety) */}
            <section>
              <div
                style={{
                  borderRadius: premiumPanelRadius,
                  border: `1px solid ${premiumPanelBorder}`,
                  background: premiumPanelBg,
                  padding: premiumPanelPadding,
                }}
              >
              <div className="mb-8 flex items-center justify-between">
                <h2 style={{ fontSize: 26 / 1.05, fontWeight: 520, color: textColor, letterSpacing: "-0.02em" }}>
                  Safety, built in
                </h2>
                <Link href="/technology-overview" style={{ fontSize: 14, color: mutedTextColor, textDecoration: "none" }}>
                  Learn more
                </Link>
              </div>
              <div className="grid gap-4 lg:grid-cols-3">
                {[
                  {
                    title: "Moderation",
                    desc: "We actively monitor generated outputs and operational behavior to detect misuse early.",
                    visual:
                      "radial-gradient(140px 100px at 25% 40%, rgba(89,183,255,0.86), transparent 60%), radial-gradient(220px 140px at 78% 35%, rgba(255,173,85,0.72), transparent 60%), #f0f1f3",
                  },
                  {
                    title: "Accountability",
                    desc: "Operator actions are tracked end-to-end with secure audit trails and clear ownership.",
                    visual:
                      "linear-gradient(150deg, #ffffff 0%, #f1f3f7 100%)",
                  },
                  {
                    title: "Provenance",
                    desc: "Telemetry, commands, and generated media carry verifiable metadata where applicable.",
                    visual:
                      "radial-gradient(140px 90px at 28% 48%, rgba(255,128,93,0.78), transparent 58%), radial-gradient(200px 120px at 75% 50%, rgba(248,67,67,0.72), transparent 60%), #efeef2",
                  },
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
                        borderRadius: premiumTileRadius - 2,
                        background: premiumTileBg,
                        border: `1px solid ${premiumTileBorder}`,
                        overflow: "hidden",
                        transition: "border-color 0.2s, transform 0.2s",
                        position: "relative"
                      }}
                    >
                      <div
                        style={{
                          height: 168,
                          borderBottom: `1px solid ${premiumTileBorder}`,
                          background: item.visual,
                        }}
                      />
                      <div style={{ padding: "16px 16px 18px" }}>
                        <h3 style={{ fontSize: 32 / 2, fontWeight: 530, color: textColor, letterSpacing: "-0.01em" }}>
                          {item.title}
                        </h3>
                        <p style={{ marginTop: 8, fontSize: 14, lineHeight: 1.6, color: mutedTextColor }}>{item.desc}</p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
              </div>
            </section>

            {/* LATEST UPDATES (inspired by /blog) */}
            <section style={{ paddingTop: 20, paddingBottom: 40 }}>
              <div
                style={{
                  borderRadius: premiumPanelRadius,
                  border: `1px solid ${premiumPanelBorder}`,
                  background: premiumPanelBg,
                  padding: premiumPanelPadding,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: 24,
                }}
              >
                <div style={{ width: "100%" }}>
                  <div className="mb-7 flex flex-wrap items-end justify-between gap-3">
                    <div>
                      <div style={{ color: mutedTextColor2, fontSize: 13, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                        Latest updates
                      </div>
                      <h2 style={{ marginTop: 8, fontSize: 56 / 2, lineHeight: 1.1, fontWeight: 520, color: textColor, letterSpacing: "-0.02em" }}>
                        Platform, research, and product announcements
                      </h2>
                    </div>
                    <Link href="#" style={{ fontSize: 14, color: mutedTextColor, textDecoration: "none" }}>
                      All posts
                    </Link>
                  </div>

                  <div className="grid gap-4 lg:grid-cols-3">
                    {[
                      ["Introducing Modulr for Government", "Secure teleoperation for public infrastructure programs."],
                      ["Expressive Mode for Agents", "More natural voice agents for real customer conversations."],
                      ["$500M Series D milestone", "Accelerating global robotics and AI infrastructure roadmap."],
                    ].map(([title, desc], idx) => (
                      <div
                        key={title}
                        style={{
                          borderRadius: premiumTileRadius - 2,
                          border: `1px solid ${premiumTileBorder}`,
                          background: premiumTileBg,
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            height: 148,
                            borderBottom: `1px solid ${premiumTileBorder}`,
                            background:
                              idx === 0
                                ? "linear-gradient(145deg, #ece6ff 0%, #d7d1ff 45%, #cbc5ff 100%)"
                                : idx === 1
                                  ? "linear-gradient(145deg, #dff4ff 0%, #b9e7ff 45%, #9ad9ff 100%)"
                                  : "linear-gradient(145deg, #fff0d6 0%, #ffd596 45%, #ffc36e 100%)",
                          }}
                        />
                        <div style={{ padding: 16 }}>
                          <h3 style={{ color: textColor, fontSize: 18, lineHeight: 1.34, fontWeight: 520 }}>{title}</h3>
                          <p style={{ marginTop: 8, color: mutedTextColor, fontSize: 14, lineHeight: 1.6 }}>{desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ display: "flex", gap: 12, width: "100%" }}>
                  <Link
                    href="#"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: premiumPillHeight,
                      borderRadius: 999,
                      background: "#f2b400",
                      color: "#000",
                      padding: "0 22px",
                      fontSize: 14,
                      fontWeight: 600,
                      textDecoration: "none",
                    }}
                  >
                    Talk to sales
                  </Link>
                  <Link
                    href="#"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: premiumPillHeight,
                      borderRadius: 999,
                      background: premiumTileBg,
                      border: `1px solid ${premiumTileBorder}`,
                      color: textColor,
                      padding: "0 22px",
                      fontSize: 14,
                      fontWeight: 500,
                      textDecoration: "none",
                    }}
                  >
                    Create an AI agent
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
  const mutedTextColor = theme === "dark" ? "rgba(255,255,255,0.52)" : "rgba(0,0,0,0.52)";
  const cardBg = theme === "dark" ? "#15161a" : "#f7f7f8";
  const cardBgHover = theme === "dark" ? "#171920" : "#ffffff";
  const borderColor = theme === "dark" ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.09)";
  const borderColorHover = theme === "dark" ? "rgba(255,255,255,0.14)" : "rgba(0,0,0,0.13)";

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

