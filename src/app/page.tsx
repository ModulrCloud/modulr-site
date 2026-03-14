"use client";

import { useState, useRef, useEffect, lazy, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { ModulrFooter } from "@/components/ModulrFooter";
import { Reveal } from "@/components/Reveal";
import { Tilt3D } from "@/components/Tilt3D";
import { Reveal3D } from "@/components/Reveal3D";
import { FloatingOrbs } from "@/components/FloatingOrbs";

/* ── Mobile nav state hook ── */
function useMobileNav() {
  const [open, setOpen] = useState(false);
  return { open, toggle: () => setOpen((p) => !p), close: () => setOpen(false) };
}

const HeroScene3D = lazy(() => import("@/components/scenes/HeroScene3D"));

/* ───────────────────────── DESIGN TOKENS ───────────────────────── */
const T = {
  bg: "#ffffff",
  text: "#000000",
  muted: "rgba(0,0,0,0.55)",
  muted2: "rgba(0,0,0,0.38)",
  border: "rgba(0,0,0,0.08)",
  borderStrong: "rgba(0,0,0,0.12)",
  surface: "#f5f5f7",
  surfaceHover: "#ebebed",
  accent: "#000",
  accentFg: "#fff",
  radius: 16,
  radiusLg: 24,
  radiusXl: 32,
  radiusPill: 999,
  maxW: 1200,
  sectionPy: "clamp(80px, 10vw, 140px)",
};

/* ───────────────────────── NAV ITEMS ───────────────────────── */
const navItems = [
  { label: "Robots", href: "/robots" },
  { label: "Web3", href: "/web3" },
  { label: "Research", href: "/research" },
  { label: "News", href: "/news" },
  { label: "Team", href: "/team" },
  { label: "Brand Kit", href: "/brand-kit" },
];

/* ───────────────────────── TRUSTED LOGOS ───────────────────────── */
const trustedLogos = [
  { name: "IRYS", logo: "https://cdn.brandfetch.io/idkFvHPM3p/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1757914702922" },
  { name: "NVIDIA Inception", logo: "https://cdn.brandfetch.io/idXoj5DuCE/theme/light/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1725526926970" },
  { name: "RoboX", logo: "/robox-logo-white.png" },
  { name: "University of Oxford", logo: "/University_of_Oxford.svg" },
  { name: "Paal AI", logo: "/paal-ai-logo.webp" },
  { name: "Unitree", logo: "https://cdn.brandfetch.io/idR3duQxYl/theme/light/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1741166761598" },
  { name: "ANYbotics", logo: "https://cdn.brandfetch.io/id2S-kXbuK/theme/light/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1725611837013" },
];

/* ───────────────────────── TELEOPERATION FEATURES ───────────────────────── */
const teleopFeatures = [
  { title: "Remote Robot Control", desc: "Operate any robot from anywhere with real-time video streaming and precise control inputs.", icon: "globe" },
  { title: "Sub-500ms Latency", desc: "Enterprise-grade responsive control for manipulation, recovery, and intervention.", icon: "bolt" },
  { title: "Secure Connections", desc: "End-to-end encryption and zero-trust architecture protect every session.", icon: "shield" },
  { title: "Session Analytics & Logs", desc: "Real-time feedback to debug issues, improve performance, and validate safe operation.", icon: "chart" },
];


/* ───────────────────────── PLATFORM CARDS ───────────────────────── */
const platformCards = [
  { number: "01", subtitle: "Network", title: "Source global robot liquidity", desc: "Modulr lets anyone rent or deploy robots globally for practical, real-world work. Need a robot to inspect a pipeline or provide construction site security? It's all possible through Modulr's peer-to-peer network.", gradient: "linear-gradient(135deg, #fef3c7, #fde68a, #fbbf24)" },
  { number: "02", subtitle: "Control", title: "Operate any robot, anywhere", desc: "Connect to and control robots from anywhere in the world with near-zero latency, using your preferred interface: web browser, VR headset, gaming controller, or custom rig.", gradient: "linear-gradient(135deg, #d1fae5, #a7f3d0, #6ee7b7)" },
  { number: "03", subtitle: "Intelligence", title: "Plug-and-play robotics stack", desc: "No hardware or software expertise required for clients. Partners can easily add robotic systems to access everything: teleoperation, AI models, compute, data modules, and more.", gradient: "linear-gradient(135deg, #e0e7ff, #c7d2fe, #a5b4fc)" },
  { number: "04", subtitle: "Earnings", title: "Earn from idle robots", desc: "Turn downtime into revenue and data. List your robots on Modulr's marketplace and earn when others operate them. Outsource data collection to qualified operators.", gradient: "linear-gradient(135deg, #fce7f3, #f9a8d4, #f472b6)" },
];

/* ─── Re-export shared overlay ─── */
import { AbstractOverlay } from "@/components/AbstractOverlay";

/* ───────────────────────── USE CASES ───────────────────────── */
const useCases = [
  { title: "Industrial Automation", desc: "Remotely manage robotic arms, AGVs, and factory floor equipment with sub-second latency. Scale operations without physical presence.", gradient: "linear-gradient(145deg, #f97316, #ea580c, #c2410c)" },
  { title: "Entertainment & Gaming", desc: "Control real robots in fighting arenas, race courses, arcades, and immersive experiences from anywhere in the world.", gradient: "linear-gradient(145deg, #2d6a4f, #52b788, #40c057)" },
  { title: "Defense & Security", desc: "Operate unmanned ground and aerial vehicles for reconnaissance, patrol, and hazardous environment inspection with military-grade reliability.", gradient: "linear-gradient(145deg, #1a365d, #2d5aa0, #3b82f6)" },
  { title: "Healthcare & Medical", desc: "Enable surgeons and specialists to operate robotic surgery systems and assistive devices remotely, expanding access to expertise.", gradient: "linear-gradient(145deg, #be185d, #9333ea, #4f46e5)" },
  { title: "Space & Extreme Environments", desc: "Control rovers, orbital manipulators, and deep-sea exploration robots with real-time feedback loops across vast distances.", gradient: "linear-gradient(145deg, #1e3a5f, #3b82f6, #f59e0b)" },
];

/* ───────────────────────── ROADMAP (DUAL TRACK) ───────────────────────── */
const roadmapDates = ["Q4 2025", "Q1 2026", "Q2 2026", "Q3 2026", "Q4 2026"];

const roadmapRobotics = [
  { date: "Q4 2025", title: "Teleoperation Protocol", items: ["Finalize P2P teleoperation protocol", "User dashboard & operator console", "First robot demos for partners"] },
  { date: "Q1 2026", title: "SDK & Partner Onboarding", items: ["SDK development (Python, TS, Rust)", "Matchmaking: real-time robot demos", "Partner & user expansion campaigns"] },
  { date: "Q2 2026", title: "Custom Robots", items: ["Begin production of Modulr custom robots", "Switchboard: discovery map for providers", "Fleet management beta"] },
  { date: "Q3 2026", title: "Games Arena", items: ["Unveil the Modulr Games Arena", "Alpha/beta testing for robot games", "Teleop expansion (retail, entertainment)"] },
  { date: "Q4 2026", title: "Global Rollout", items: ["Physical robot games hosted worldwide", "Rollout of Modulr robots at scale", "Co-chain: Modulr.AI, Modulr.Gaming"] },
];

const roadmapWeb3 = [
  { date: "Q4 2025", title: "Devnet & Testnet", items: ["Launch Modulr devnet/testnet", "Create blockchain explorer", "Early contributor rewards program"] },
  { date: "Q1 2026", title: "Validator Network", items: ["Validator/node onboarding", "Blockchain integration with payments", "Governance framework launch"] },
  { date: "Q2 2026", title: "Mainnet Launch", items: ["Modulr mainnet launch", "Data marketplace beta", "Staking & compute credits live"] },
  { date: "Q3 2026", title: "Multi-chain", items: ["$MDR interoperability (Eth, Base, Solana)", "Smart contract SLAs for robot ops", "Digital twin registry expansion"] },
  { date: "Q4 2026", title: "Ecosystem Scale", items: ["Decentralized GPU compute scaling", "Cross-chain robot payments", "Full ecosystem autonomy"] },
];

/* ───────────────────────── SAFETY ───────────────────────── */
const safetyItems = [
  { title: "Secure Sessions", desc: "End-to-end encrypted connections, zero-trust architecture, and hardware-level emergency stops protect every operation." },
  { title: "Accountability & Audit", desc: "Every session is logged with detailed telemetry, operator identity, and timestamped actions for full traceability." },
  { title: "Safety Guardrails", desc: "Rate limits, geofencing, collision avoidance zones, and configurable safety policies ensure robots operate within defined boundaries." },
];

/* ───────────────────────── LATEST UPDATES ───────────────────────── */
const latestUpdates: { title: string; gradient: string; pattern: string; overlayText: string | null; overlaySubtext?: string; image?: string }[] = [
  {
    title: "Modulr launches mainnet and $MDR token with multi-chain interoperability",
    gradient: "linear-gradient(145deg, #2d1117 0%, #4a1942 30%, #6b2152 60%, #8b3a62 100%)",
    pattern: "repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(255,255,255,0.04) 8px, rgba(255,255,255,0.04) 9px)",
    overlayText: null,
  },
  {
    title: "Modulr and University of Oxford join forces on next-gen autonomous robotics research",
    gradient: "linear-gradient(145deg, #002147 0%, #003366 30%, #1a5276 60%, #2e86c1 100%)",
    pattern: "radial-gradient(circle at 30% 60%, rgba(255,255,255,0.06) 0%, transparent 50%)",
    overlayText: null,
    image: "/Modulr_Oxford.jpeg",
  },
  {
    title: "Modulr partners with NVIDIA Inception to accelerate enterprise robotics",
    gradient: "linear-gradient(145deg, #0c4a6e 0%, #0369a1 25%, #3b82f6 50%, #f59e0b 80%, #f97316 100%)",
    pattern: "radial-gradient(circle at 70% 40%, rgba(255,255,255,0.08) 0%, transparent 50%)",
    overlayText: null,
    image: "/NVIDIA_3.jpeg",
  },
];


/* ───────────────────────── NETWORK STATS ───────────────────────── */
const networkStats = [
  { label: "Robots connected", value: "1,200+" },
  { label: "Countries", value: "60+" },
  { label: "Operators", value: "340+" },
  { label: "Avg latency", value: "120ms" },
];

/* ═══════════════════════════════════════════════════════════════════
   PAGE COMPONENT
   ═══════════════════════════════════════════════════════════════════ */
export default function HomePage() {
  const [activeRoadmapIdx, setActiveRoadmapIdx] = useState(roadmapDates.length - 1);
  const timelineRef = useRef<HTMLDivElement>(null);
  const platformSectionRef = useRef<HTMLElement | null>(null);
  const [platformLeadOffset, setPlatformLeadOffset] = useState(0);
  const mobileNav = useMobileNav();


  useEffect(() => {
    let raf = 0;

    const update = () => {
      raf = 0;
      const el = platformSectionRef.current;
      if (!el || typeof window === "undefined") return;

      if (window.innerWidth <= 1024) {
        setPlatformLeadOffset(0);
        return;
      }

      const rect = el.getBoundingClientRect();
      const viewportH = window.innerHeight;
      const start = viewportH * 0.32;
      const end = -rect.height * 0.42;
      const rawProgress = (start - rect.top) / (start - end);
      const progress = Math.max(0, Math.min(1, rawProgress));
      const delayedProgress = Math.max(0, Math.min(1, (progress - 0.1) / 0.9));
      const easedProgress = delayedProgress * delayedProgress * (3 - 2 * delayedProgress);
      setPlatformLeadOffset(easedProgress * 710);
    };

    const requestUpdate = () => {
      if (!raf) raf = window.requestAnimationFrame(update);
    };

    requestUpdate();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  const sectionBorder = `1px solid ${T.border}`;

  return (
    <div style={{ background: T.bg, color: T.text, fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', paddingTop: 64 }}>
      {/* ════════════ HEADER ════════════ */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: "rgba(255,255,255,0.82)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: sectionBorder,
        }}
      >
        <div style={{ maxWidth: T.maxW, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, fontWeight: 700, fontSize: 18, color: T.text, textDecoration: "none", letterSpacing: "-0.02em" }}>
              <Image src="/Modulr_logo.png" alt="Modulr" width={28} height={28} style={{ objectFit: "contain" }} unoptimized />
              Modulr
            </Link>
            <nav className="el-desktop-only" style={{ gap: 4 }}>
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  style={{
                    padding: "6px 12px",
                    fontSize: 14,
                    color: T.muted,
                    textDecoration: "none",
                    borderRadius: 8,
                    transition: "color 0.15s, background 0.15s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = T.text; e.currentTarget.style.background = T.surface; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = T.muted; e.currentTarget.style.background = "transparent"; }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Link href="https://testnet.explorer.modulr.cloud/" target="_blank" rel="noreferrer" className="el-desktop-only" style={{ padding: "8px 18px", fontSize: 14, fontWeight: 500, color: T.text, textDecoration: "none", borderRadius: T.radiusPill, border: sectionBorder, background: "#fff" }}>
              Explorer
            </Link>
            <Link href="https://app.modulr.cloud/" target="_blank" rel="noreferrer" style={{ padding: "8px 18px", fontSize: 14, fontWeight: 600, color: T.accentFg, background: T.accent, borderRadius: T.radiusPill, textDecoration: "none" }}>
              Open App
            </Link>
            <button className="el-mobile-only" onClick={mobileNav.toggle} style={{ width: 40, height: 40, border: "none", background: "none", cursor: "pointer", alignItems: "center", justifyContent: "center" }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d={mobileNav.open ? "M5 5l10 10M15 5L5 15" : "M3 5h14M3 10h14M3 15h14"} stroke={T.text} strokeWidth="1.5" strokeLinecap="round" /></svg>
            </button>
          </div>
        </div>
        {/* Mobile nav menu */}
        <div className={`el-mobile-menu${mobileNav.open ? " open" : ""}`}>
          {navItems.map((item) => (
            <Link key={item.label} href={item.href} onClick={mobileNav.close} style={{ padding: "10px 8px", fontSize: 15, color: T.muted, textDecoration: "none" }}>
              {item.label}
            </Link>
          ))}
              </div>
      </header>

      {/* ════════════ HERO ════════════ */}
      <section style={{ padding: `${T.sectionPy} 24px 60px`, maxWidth: T.maxW, margin: "0 auto", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", position: "relative", overflow: "visible" }}>
        <FloatingOrbs variant="gold" count={4} bleedX={260} bleedY={180} />
        <Reveal3D variant="zoom">
          <h1 className="text-shimmer" style={{ fontSize: "clamp(48px, 7vw, 80px)", fontWeight: 500, letterSpacing: "-0.04em", lineHeight: 1.02, maxWidth: 800, position: "relative", zIndex: 1 }}>
          Robot Operation<br />at Scale
                  </h1>
        </Reveal3D>
        <Reveal3D variant="rise" delayMs={150}>
          <p style={{ marginTop: 24, fontSize: 17, color: T.muted, maxWidth: 640, lineHeight: 1.6 }}>
          A real-time robot operations platform built for enterprise performance and an open network economy—connecting robots, AI, data, and compute.
          </p>
        </Reveal3D>
        <Reveal3D variant="pop" delayMs={300}>
          <div style={{ marginTop: 32, display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
            <Link href="https://app.modulr.cloud" style={{ display: "inline-flex", alignItems: "center", height: 48, padding: "0 24px", background: T.accent, color: T.accentFg, borderRadius: T.radiusPill, fontSize: 15, fontWeight: 600, textDecoration: "none" }}>
              Launch App
            </Link>
            <Link href="https://calendly.com/d/cxn4-g4x-5sh/modulr-20min-product-demo" style={{ display: "inline-flex", alignItems: "center", height: 48, padding: "0 24px", background: T.surface, color: T.text, borderRadius: T.radiusPill, fontSize: 15, fontWeight: 500, textDecoration: "none", border: sectionBorder }}>
              Book a Demo
            </Link>
          </div>
        </Reveal3D>
      </section>

      {/* ════════════ 3D VISUAL ════════════ */}
      <section style={{ maxWidth: T.maxW, margin: "0 auto", padding: "0 24px 80px" }}>
        <Reveal3D variant="pop">
          <div className="depth-shadow" style={{ borderRadius: T.radiusXl, border: sectionBorder, background: T.surface, overflow: "hidden", height: "clamp(400px, 50vh, 560px)" }}>
            <Suspense fallback={<div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: T.muted, fontSize: 14 }}>Loading 3D…</div>}>
              <HeroScene3D />
            </Suspense>
          </div>
        </Reveal3D>
      </section>

      {/* ════════════ TRUSTED BY ════════════ */}
      <section style={{ padding: "64px 24px 72px" }}>
        <div style={{ maxWidth: T.maxW, margin: "0 auto" }}>
          <Reveal>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap", marginBottom: 28 }}>
              <h2 style={{ fontSize: 20, fontWeight: 500, color: T.text }}>Trusted by leading developers and enterprises</h2>
              <Link href="/research" className="link-underline" style={{ fontSize: 14, color: T.muted, textDecoration: "none" }}>Read all stories</Link>
            </div>
          </Reveal>
          <div
            className="mask-fade-x"
            style={{
              position: "relative",
              overflow: "hidden",
              padding: "12px 0",
            }}
          >
            <div
              className="animate-marquee-slow"
              style={{
                display: "flex",
                alignItems: "center",
                width: "max-content",
                gap: 0,
              }}
            >
              {[...trustedLogos, ...trustedLogos].map((company, i) => (
                <div
                  key={`${company.name}-${i}`}
                  title={company.name}
                  style={{
                    flex: "0 0 auto",
                    minWidth: "clamp(160px, 16vw, 210px)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "20px 28px",
                    borderTop: sectionBorder,
                    borderBottom: sectionBorder,
                    borderRight: sectionBorder,
                    background: "color-mix(in oklab, var(--background) 96%, white 4%)",
                    transition: "background 0.2s ease, opacity 0.2s ease",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "color-mix(in oklab, var(--background) 92%, white 8%)";
                    (e.currentTarget.querySelector("img") as HTMLElement).style.opacity = "0.8";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "color-mix(in oklab, var(--background) 96%, white 4%)";
                    (e.currentTarget.querySelector("img") as HTMLElement).style.opacity = "0.48";
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={company.logo}
                    alt={company.name}
                    style={{
                      height: 24,
                      width: "auto",
                      maxWidth: 132,
                      objectFit: "contain",
                      filter: "brightness(0)",
                      opacity: 0.48,
                      transition: "opacity 0.2s ease",
                    }}
                  />
                </div>
              ))}
            </div>
            <div
              aria-hidden="true"
              style={{
                pointerEvents: "none",
                position: "absolute",
                inset: 0,
                background: [
                  "linear-gradient(90deg, var(--background) 0%, rgba(255,255,255,0) 12%)",
                  "linear-gradient(270deg, var(--background) 0%, rgba(255,255,255,0) 12%)",
                ].join(", "),
              }}
            />
          </div>
        </div>
      </section>

      {/* ════════════ A NEW ROBOTICS PARADIGM ════════════ */}
      <div className="section-divider" style={{ maxWidth: T.maxW, margin: "0 auto" }} />
      <section
        style={{
          padding: `${T.sectionPy} 0`,
          width: "100vw",
          marginLeft: "calc(50% - 50vw)",
          marginRight: "calc(50% - 50vw)",
        }}
      >
        <div style={{ maxWidth: T.maxW, margin: "0 auto", padding: "0 24px" }}>
          <Reveal>
            <div style={{ marginBottom: 48 }}>
              <div style={{ fontSize: 13, color: T.muted2, marginBottom: 8 }}>Discover</div>
              <h2 style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 500, letterSpacing: "-0.03em", lineHeight: 1.08 }}>
                A New Robotics Paradigm
              </h2>
              <p style={{ marginTop: 16, fontSize: 16, color: T.muted, maxWidth: 640, lineHeight: 1.65 }}>
                Built for today&apos;s operators and tomorrow&apos;s decentralized machine economy. Modular controls, real-time network telemetry, and enterprise-grade governance in one stack.
              </p>
            </div>
          </Reveal>
        </div>
        <Reveal3D variant="pop" delayMs={80}>
          <Link
            href="https://app.modulr.cloud"
            className="depth-shadow card-shine"
            style={{
              position: "relative",
              display: "block",
              minHeight: 520,
              borderRadius: 0,
              overflow: "hidden",
              border: sectionBorder,
              textDecoration: "none",
              color: "inherit",
              background: "#101114",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                opacity: 1,
              }}
            >
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center center",
                }}
              >
                <source src="/Robot_Video_2.mp4" type="video/mp4" />
              </video>
            </div>
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: [
                  "linear-gradient(90deg, rgba(10,12,18,0.46) 0%, rgba(10,12,18,0.18) 34%, rgba(10,12,18,0.06) 58%, rgba(10,12,18,0.18) 100%)",
                  "linear-gradient(180deg, rgba(8,10,16,0.08) 0%, rgba(8,10,16,0.12) 56%, rgba(8,10,16,0.42) 100%)",
                ].join(", "),
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
                backgroundSize: "108px 108px",
                opacity: 0.12,
              }}
            />

            <div
              style={{
                position: "relative",
                zIndex: 2,
                minHeight: 520,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "28px 28px 24px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", gap: 20, alignItems: "flex-start" }}>
                <div style={{ maxWidth: 420 }}>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 500,
                      lineHeight: 1.35,
                      color: "rgba(255,255,255,0.9)",
                      textShadow: "0 2px 14px rgba(0,0,0,0.28)",
                    }}
                  >
                    Modulr unifies teleoperation, fleet visibility,
                    <br />
                    and network coordination in one layer.
                  </div>
                </div>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.14)",
                    color: "#fff",
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17L17 7" />
                    <path d="M8 7h9v9" />
                  </svg>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "space-between",
                  gap: 20,
                  flexWrap: "wrap",
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: "clamp(28px, 3.8vw, 42px)",
                      fontWeight: 520,
                      letterSpacing: "-0.04em",
                      lineHeight: 1.06,
                      color: "#fff",
                      maxWidth: 520,
                      textShadow: "0 4px 24px rgba(0,0,0,0.28)",
                    }}
                  >
                    A new operating paradigm
                    <br />
                    for global robotics
                  </div>
                  <div
                    style={{
                      marginTop: 14,
                      display: "flex",
                      gap: 8,
                      flexWrap: "wrap",
                    }}
                  >
                    {["Teleoperation", "Operator Console"].map((item) => (
                      <span
                        key={item}
                        style={{
                          padding: "7px 12px",
                          borderRadius: 999,
                          border: "1px solid rgba(255,255,255,0.14)",
                          background: "rgba(255,255,255,0.06)",
                          color: "rgba(255,255,255,0.78)",
                          fontSize: 12,
                          lineHeight: 1,
                          backdropFilter: "blur(10px)",
                          WebkitBackdropFilter: "blur(10px)",
                        }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "10px 16px",
                    borderRadius: 999,
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.14)",
                    color: "#fff",
                    fontSize: 13,
                    fontWeight: 600,
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                  }}
                >
                  Global operations
                </div>
              </div>
            </div>
          </Link>
        </Reveal3D>
      </section>

      {/* ════════════ PLATFORM CARDS (Monetize robots. Globally.) ════════════ */}
      <div className="section-divider" style={{ maxWidth: T.maxW, margin: "0 auto" }} />
      <section ref={platformSectionRef} style={{ padding: `${T.sectionPy} 24px`, maxWidth: T.maxW, margin: "0 auto" }}>
        <div className="el-g-platform-sticky">
          <div
            style={{
              position: "sticky",
              top: 112,
              alignSelf: "start",
              transform: `translateY(${platformLeadOffset}px)`,
              willChange: "transform",
            }}
          >
            <Reveal3D variant="slide-left">
              <div>
              <div style={{ fontSize: 13, color: T.muted2, marginBottom: 10 }}>Monetization</div>
              <h2 style={{ fontSize: "clamp(34px, 4.8vw, 56px)", fontWeight: 500, letterSpacing: "-0.04em", lineHeight: 1.02, maxWidth: 420 }}>
                Monetize robots.
                <br />
                <span style={{ color: T.muted }}>Globally.</span>
              </h2>
              <p style={{ marginTop: 18, fontSize: 16, color: T.muted, maxWidth: 430, lineHeight: 1.7 }}>
                From sourcing global robot liquidity to earning from idle assets, everything you need
                to build a robotics business on one platform.
              </p>
              </div>
            </Reveal3D>
          </div>

          <div>
            {platformCards.map((card, idx) => (
              <Reveal3D key={`platform-${card.number}`} variant="rise" delayMs={idx * 80}>
                <div
                  style={{
                    padding: idx === 0 ? "0 0 34px" : "34px 0",
                    borderTop: idx === 0 ? "none" : sectionBorder,
                  }}
                >
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "minmax(0, 1fr) auto",
                      gap: 20,
                      alignItems: "start",
                    }}
                  >
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
                        <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", color: T.muted2 }}>{card.number}</span>
                        <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", color: T.muted2, textTransform: "uppercase" }}>{card.subtitle}</span>
                      </div>
                      <h3 style={{ fontSize: "clamp(28px, 3.2vw, 40px)", fontWeight: 500, letterSpacing: "-0.03em", lineHeight: 1.12 }}>
                        {card.title}
                      </h3>
                      <p style={{ marginTop: 14, maxWidth: 620, fontSize: 16, color: T.muted, lineHeight: 1.72 }}>
                        {card.desc}
                      </p>
                    </div>

                    <div
                      style={{
                        width: 54,
                        height: 54,
                        borderRadius: "50%",
                        border: sectionBorder,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: T.text,
                        flexShrink: 0,
                        marginTop: 4,
                        background: "#fff",
                      }}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M7 17L17 7" />
                        <path d="M8 7h9v9" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Reveal3D>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ TELEOPERATION SECTION ════════════ */}
      <div className="section-divider" style={{ maxWidth: T.maxW, margin: "0 auto" }} />
      <section style={{ padding: `${T.sectionPy} 24px`, maxWidth: T.maxW, margin: "0 auto", position: "relative", overflow: "visible" }}>
        <FloatingOrbs variant="blue" count={3} bleedX={260} />
        <Reveal3D variant="slide-left">
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 48, flexWrap: "wrap", gap: 20 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <span className="pulse-dot" />
                <span style={{ fontSize: 13, color: T.muted2 }}>Teleoperation</span>
              </div>
              <h2 style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 500, letterSpacing: "-0.03em", lineHeight: 1.08 }}>
                A new standard<br />of control
              </h2>
            </div>
            <Link href="https://app.modulr.cloud" target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", height: 44, padding: "0 22px", background: T.accent, color: T.accentFg, borderRadius: T.radiusPill, fontSize: 14, fontWeight: 600, textDecoration: "none" }}>
              Launch App
            </Link>
          </div>
        </Reveal3D>
        <Reveal3D variant="rise" delayMs={100}>
          <p style={{ fontSize: 16, color: T.muted, maxWidth: 720, lineHeight: 1.65, marginBottom: 48 }}>
            Real-time robot operation built for enterprise reliability and security. Operate any robot from anywhere with precise control inputs, real-time video streaming, and sub-500ms latency.
          </p>
        </Reveal3D>

        {/* Feature cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16, marginBottom: 40 }}>
          {teleopFeatures.map((f, fIdx) => (
            <Reveal3D key={f.title} delayMs={fIdx * 100} variant="pop">
            <Tilt3D intensity={10} scale={1.03} style={{ borderRadius: T.radiusXl, height: "100%" }}>
            <div className="depth-shadow" style={{ padding: 24, borderRadius: T.radiusXl, border: sectionBorder, background: T.surface, minHeight: 200, display: "flex", flexDirection: "column", height: "100%" }}>
              <div style={{ width: 48, height: 48, borderRadius: 14, background: "#fff", border: sectionBorder, display: "flex", alignItems: "center", justifyContent: "center", color: T.text, marginBottom: "auto" }}>
                {f.icon === "globe" && <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>}
                {f.icon === "bolt" && <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>}
                {f.icon === "shield" && <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" /></svg>}
                {f.icon === "chart" && <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 3v18h18" /><path d="M18 9l-5 5-4-4-3 3" /></svg>}
              </div>
              <div style={{ marginTop: 24 }}>
                <div style={{ fontSize: 18, fontWeight: 600, color: T.text, marginBottom: 8 }}>{f.title}</div>
                <p style={{ fontSize: 14, color: T.muted, lineHeight: 1.55 }}>{f.desc}</p>
              </div>
            </div>
            </Tilt3D>
            </Reveal3D>
          ))}
        </div>

        {/* Operator cockpit mockup */}
        <div style={{ borderRadius: T.radiusXl, border: sectionBorder, background: T.surface, padding: 24 }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", color: T.muted2, marginBottom: 16 }}>OPERATOR COCKPIT</div>
          <div className="el-g3" style={{ marginBottom: 16 }}>
            <div style={{ padding: 20, borderRadius: T.radius, background: "#fff", border: sectionBorder }}>
              <div style={{ fontSize: 12, color: T.muted2, marginBottom: 6 }}>Latency (avg)</div>
              <div style={{ fontSize: 28, fontWeight: 700, color: T.text }}>220ms</div>
              <div style={{ marginTop: 8, height: 4, borderRadius: 2, background: T.border, overflow: "hidden" }}>
                <div style={{ height: "100%", width: "72%", borderRadius: 2, background: "linear-gradient(90deg, #f2b400, rgba(0,0,0,0.15))" }} />
              </div>
            </div>
            <div style={{ padding: 20, borderRadius: T.radius, background: "#fff", border: sectionBorder }}>
              <div style={{ fontSize: 12, color: T.muted2, marginBottom: 6 }}>Safety</div>
              <div style={{ fontSize: 16, fontWeight: 600, color: T.text }}>Guardrails on</div>
              <div style={{ marginTop: 8, fontSize: 12, color: T.muted2 }}>Rate limits • E-stop • Audit</div>
            </div>
            <div style={{ padding: 20, borderRadius: T.radius, background: "#fff", border: sectionBorder }}>
              <div style={{ fontSize: 12, color: T.muted2, marginBottom: 6 }}>Session cost</div>
              <div style={{ fontSize: 16, fontWeight: 600, color: T.text }}>$1.34/min</div>
              <div style={{ marginTop: 8, fontSize: 12, color: T.muted2 }}>Pay-per-use pricing</div>
            </div>
          </div>
          <div className="el-g2" style={{ gap: 16 }}>
            {networkStats.map((s) => (
              <div key={s.label} style={{ padding: "16px 20px", borderRadius: T.radius, background: "#fff", border: sectionBorder, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 14, color: T.muted }}>{s.label}</span>
                <span style={{ fontSize: 20, fontWeight: 700, color: T.text }}>{s.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 24, display: "flex", gap: 12 }}>
          <Link href="https://app.modulr.cloud" target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", height: 44, padding: "0 22px", background: T.accent, color: T.accentFg, borderRadius: T.radiusPill, fontSize: 14, fontWeight: 600, textDecoration: "none" }}>
            Launch App →
          </Link>
          <Link href="https://docs.modulr.cloud" target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", height: 44, padding: "0 22px", borderRadius: T.radiusPill, fontSize: 14, fontWeight: 500, textDecoration: "none", border: sectionBorder, color: T.text }}>
            Documentation
          </Link>
        </div>
      </section>

      {/* ════════════ HOW IT WORKS ════════════ */}
      <div className="section-divider" style={{ maxWidth: T.maxW, margin: "0 auto" }} />
      <section style={{ padding: `${T.sectionPy} 24px`, maxWidth: T.maxW, margin: "0 auto" }}>
        <Reveal3D variant="slide-right">
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 48, flexWrap: "wrap", gap: 20 }}>
            <div>
              <div style={{ fontSize: 13, color: T.muted2, marginBottom: 8 }}>How it works</div>
              <h2 style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 500, letterSpacing: "-0.03em", lineHeight: 1.08 }}>
                One platform to operate<br />and monetize robots
              </h2>
            </div>
            <Link href="https://docs.modulr.cloud" target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", height: 44, padding: "0 22px", background: T.accent, color: T.accentFg, borderRadius: T.radiusPill, fontSize: 14, fontWeight: 600, textDecoration: "none" }}>
              Learn more
            </Link>
          </div>
        </Reveal3D>
        <Reveal3D variant="rise" delayMs={100}>
          <p style={{ fontSize: 16, color: T.muted, maxWidth: 720, lineHeight: 1.65, marginBottom: 40 }}>
            Whether you&apos;re a robotics team looking for better internal controls, or an operator looking to rent and operate robots for your business — Modulr connects both sides seamlessly.
          </p>
        </Reveal3D>

        {/* Main showcase grid */}
        <div className="el-g-split-wide" style={{ marginBottom: 16 }}>
          {/* Left: Operator session mockup */}
          <Reveal3D variant="slide-left" delayMs={0}>
          <div style={{
            borderRadius: T.radiusXl,
            overflow: "hidden",
            background: "linear-gradient(145deg, #1a4d2e, #2d6a4f, #52b788, #f2b400)",
            padding: "32px 28px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            minHeight: 380,
            position: "relative",
          }}>
            {/* Floating chat-like session messages */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
              <div style={{ alignSelf: "flex-end", background: "rgba(255,255,255,0.85)", borderRadius: "16px 16px 4px 16px", padding: "10px 16px", maxWidth: "70%", fontSize: 14, color: "#1a1a1a" }}>
                I need a robot for warehouse inspection
              </div>
              <div style={{ alignSelf: "flex-start", background: "rgba(0,0,0,0.5)", borderRadius: "16px 16px 16px 4px", padding: "10px 16px", maxWidth: "70%", fontSize: 14, color: "#fff", backdropFilter: "blur(8px)" }}>
                3 robots available in your zone. Connecting you to Unit-892.
              </div>
              <div style={{ alignSelf: "flex-end", background: "rgba(255,255,255,0.85)", borderRadius: "16px 16px 4px 16px", padding: "10px 16px", maxWidth: "70%", fontSize: 14, color: "#1a1a1a" }}>
                Start teleoperation session
              </div>
              <div style={{ alignSelf: "flex-start", background: "rgba(0,0,0,0.5)", borderRadius: "16px 16px 16px 4px", padding: "10px 16px", maxWidth: "70%", fontSize: 14, color: "#fff", backdropFilter: "blur(8px)" }}>
                Session active. Latency: 120ms. All safety guardrails on.
              </div>
              <div style={{ alignSelf: "flex-start", display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(52,211,153,0.9)", borderRadius: 12, padding: "6px 14px", fontSize: 13, fontWeight: 600, color: "#fff", width: "fit-content" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5" /></svg>
                Session completed
              </div>
            </div>
            <div style={{ marginTop: "auto" }}>
              <h3 style={{ fontSize: 22, fontWeight: 700, color: "#fff", marginBottom: 6 }}>Seamless robot matching</h3>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.82)", lineHeight: 1.5 }}>
                Discover available robots, connect instantly, and operate with real-time feedback — all through one interface.
              </p>
            </div>
          </div>
          </Reveal3D>

          {/* Right: Analytics card */}
          <Reveal3D variant="slide-right" delayMs={150}>
          <div style={{ borderRadius: T.radiusXl, border: sectionBorder, background: "#fff", padding: 24, display: "flex", flexDirection: "column" }}>
            <h4 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>Success rate</h4>
            <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 16 }}>94.7%</div>
            {/* Simple chart mockup */}
            <div style={{ flex: 1, position: "relative", minHeight: 140, marginBottom: 12 }}>
              <svg width="100%" height="100%" viewBox="0 0 300 120" preserveAspectRatio="none" style={{ overflow: "visible" }}>
                {/* Grid lines */}
                <line x1="0" y1="0" x2="300" y2="0" stroke={T.border} strokeWidth="0.5" />
                <line x1="0" y1="40" x2="300" y2="40" stroke={T.border} strokeWidth="0.5" />
                <line x1="0" y1="80" x2="300" y2="80" stroke={T.border} strokeWidth="0.5" />
                <line x1="0" y1="120" x2="300" y2="120" stroke={T.border} strokeWidth="0.5" />
                {/* Success line (orange) */}
                <polyline points="0,30 60,25 120,20 180,18 240,12 300,8" fill="none" stroke="#f97316" strokeWidth="2" />
                <circle cx="300" cy="8" r="4" fill="#f97316" />
                {/* Baseline (blue) */}
                <polyline points="0,60 60,55 120,58 180,52 240,48 300,45" fill="none" stroke="#3b82f6" strokeWidth="2" />
                <circle cx="300" cy="45" r="4" fill="#3b82f6" />
                {/* Shaded area */}
                <linearGradient id="blueShade" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#3b82f6" stopOpacity="0.08"/><stop offset="100%" stopColor="#3b82f6" stopOpacity="0"/></linearGradient>
                <polygon points="0,60 60,55 120,58 180,52 240,48 300,45 300,120 0,120" fill="url(#blueShade)" />
              </svg>
              <div style={{ position: "absolute", top: 0, left: 0, fontSize: 10, color: T.muted2 }}>100%</div>
            </div>
            <div style={{ display: "flex", gap: 16, fontSize: 12 }}>
              <span style={{ display: "flex", alignItems: "center", gap: 4 }}><span style={{ width: 8, height: 8, borderRadius: "50%", background: "#f97316" }} />94.7%</span>
              <span style={{ display: "flex", alignItems: "center", gap: 4 }}><span style={{ width: 8, height: 8, borderRadius: "50%", background: "#3b82f6" }} />Baseline</span>
              <span style={{ marginLeft: "auto", color: T.muted2 }}>Last 30 days</span>
            </div>
            <div style={{ borderTop: sectionBorder, marginTop: 16, paddingTop: 16 }}>
              <h4 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>Analytics</h4>
              <p style={{ fontSize: 13, color: T.muted, lineHeight: 1.5 }}>Track session success rates, fleet utilization, and operator performance in real-time.</p>
            </div>
          </div>
          </Reveal3D>
        </div>

        {/* Bottom row: 3 feature cards */}
        <div className="el-g3" style={{ marginBottom: 16 }}>
          {[
            { icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>, title: "Fleet Controls", desc: "Register, monitor and orchestrate your entire robot fleet from a single dashboard." },
            { icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>, title: "Safety Guardrails", desc: "Rate limits, geofencing, collision zones, and hardware e-stops on every session." },
            { icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" /></svg>, title: "Multi-operator", desc: "Handle shift handoffs, session transfers, and concurrent access with role-based permissions." },
          ].map((card, ci) => (
            <Reveal3D key={card.title} delayMs={ci * 100}>
            <Tilt3D intensity={10} scale={1.03} style={{ borderRadius: T.radiusXl, height: "100%" }}>
            <div className="glass-3d" style={{ borderRadius: T.radiusXl, border: sectionBorder, background: "#fff", padding: 24, height: "100%" }}>
              <div style={{ color: T.text, marginBottom: 20 }}>{card.icon}</div>
              <h4 style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>{card.title}</h4>
              <p style={{ fontSize: 13, color: T.muted, lineHeight: 1.55 }}>{card.desc}</p>
            </div>
            </Tilt3D>
            </Reveal3D>
          ))}
        </div>

        {/* Customer story bar */}
        <div style={{ borderRadius: T.radiusXl, border: sectionBorder, background: "#fff", padding: "16px 24px", display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ display: "flex", gap: 6 }}>
            {["R", "M", "O"].map((letter, i) => (
              <div key={letter} style={{ width: 32, height: 32, borderRadius: "50%", background: i === 2 ? T.accent : T.surface, color: i === 2 ? T.accentFg : T.text, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600, border: sectionBorder }}>
                {letter}
              </div>
            ))}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 600 }}>Oxford Robotics Institute <span style={{ fontSize: 11, color: T.muted2 }}>↗</span></div>
            <div style={{ fontSize: 13, color: T.muted }}>Deploying autonomous inspection robots across 3 campuses</div>
          </div>
          <Link href="https://app.modulr.cloud" target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", height: 36, padding: "0 18px", background: T.accent, color: T.accentFg, borderRadius: T.radiusPill, fontSize: 13, fontWeight: 600, textDecoration: "none", flexShrink: 0 }}>
            Get started
          </Link>
        </div>
      </section>

      {/* ════════════ ROBOTIC FULLSCREEN SHOWCASE ════════════ */}
      <section
        style={{
          position: "relative",
          minHeight: "100vh",
          overflow: "hidden",
          background: "#050506",
          width: "100vw",
          marginLeft: "calc(50% - 50vw)",
          marginRight: "calc(50% - 50vw)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: [
              "radial-gradient(620px 320px at 50% 18%, rgba(242,180,0,0.14), transparent 60%)",
              "radial-gradient(460px 260px at 24% 30%, rgba(99,102,241,0.14), transparent 60%)",
              "radial-gradient(420px 220px at 78% 28%, rgba(236,72,153,0.10), transparent 60%)",
              "linear-gradient(180deg, rgba(5,5,6,0.3) 0%, rgba(5,5,6,0.04) 22%, rgba(5,5,6,0.24) 100%)",
            ].join(", "),
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.16,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "120px 120px",
            maskImage: "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.8) 20%, rgba(0,0,0,0.8) 80%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.8) 20%, rgba(0,0,0,0.8) 80%, transparent 100%)",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
          }}
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center center",
            }}
          >
            <source src="/Robot_Video.mp4" type="video/mp4" />
          </video>
        </div>

        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              [
                "linear-gradient(180deg, rgba(5,5,6,0.86) 0%, rgba(5,5,6,0.46) 24%, rgba(5,5,6,0.18) 52%, rgba(5,5,6,0.72) 100%)",
                "radial-gradient(circle at 50% 42%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.12) 38%, rgba(0,0,0,0.42) 100%)",
              ].join(", "),
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 1,
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            width: "100%",
            padding: "clamp(72px, 9vw, 112px) 24px 36px",
          }}
        >
          <div style={{ width: "100%", maxWidth: T.maxW, margin: "0 auto" }}>
            <Reveal3D variant="zoom">
              <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto" }}>
                <h2
                  style={{
                    fontSize: "clamp(34px, 4.8vw, 62px)",
                    fontWeight: 480,
                    letterSpacing: "-0.05em",
                    lineHeight: 0.98,
                    color: "#fff",
                    textWrap: "balance",
                    textShadow: "0 10px 28px rgba(0,0,0,0.28)",
                  }}
                >
                  Say hi to your
                  <br />
                  personal robot
                </h2>
                <p
                  style={{
                    margin: "18px auto 0",
                    maxWidth: 500,
                    fontSize: 15,
                    lineHeight: 1.55,
                    color: "rgba(255,255,255,0.62)",
                    textShadow: "0 6px 18px rgba(0,0,0,0.22)",
                  }}
                >
                  Premium telepresence for the next generation of human-robot interaction.
                </p>
                <div style={{ marginTop: 24, display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                  <Link
                    href="https://app.modulr.cloud"
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      height: 44,
                      padding: "0 20px",
                      borderRadius: 999,
                      background: "#fff",
                      color: "#111318",
                      fontSize: 14,
                      fontWeight: 600,
                      textDecoration: "none",
                      boxShadow: "0 12px 34px rgba(0,0,0,0.18)",
                    }}
                  >
                    Launch App
                  </Link>
                </div>
              </div>
            </Reveal3D>
          </div>
        </div>
      </section>

      {/* ════════════ DEVELOPER SDK ════════════ */}
      <div className="section-divider" style={{ maxWidth: T.maxW, margin: "0 auto" }} />
      <section style={{ padding: `${T.sectionPy} 24px`, maxWidth: T.maxW, margin: "0 auto" }}>
        <Reveal3D variant="flip">
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 48, flexWrap: "wrap", gap: 20 }}>
            <div>
              <div style={{ fontSize: 13, color: T.muted2, marginBottom: 8 }}>For Developers</div>
              <h2 style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 500, letterSpacing: "-0.03em", lineHeight: 1.08 }}>
                Build anything with<br />powerful APIs &amp; SDK
              </h2>
            </div>
            <Link href="https://docs.modulr.cloud" target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", height: 44, padding: "0 22px", background: T.accent, color: T.accentFg, borderRadius: T.radiusPill, fontSize: 14, fontWeight: 600, textDecoration: "none" }}>
              Explore docs
            </Link>
          </div>
        </Reveal3D>

        {/* Teleoperation API */}
        <Reveal3D variant="slide-left">
        <div style={{ borderRadius: T.radiusXl, border: sectionBorder, overflow: "hidden", marginBottom: 20 }}>
          <div className="el-g-split-code">
            <div style={{ padding: "32px 28px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <h3 style={{ fontSize: 22, fontWeight: 600, marginBottom: 12 }}>Teleoperation API</h3>
              <p style={{ fontSize: 14, color: T.muted, lineHeight: 1.65, marginBottom: 24 }}>
                Connect to and control any robot with real-time video, audio, and control streams. Supports WebRTC, custom protocols, and hardware integrations.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600 }}>WebRTC Streams</div>
                  <div style={{ fontSize: 13, color: T.muted, marginTop: 2 }}>Sub-500ms end-to-end latency</div>
                </div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600 }}>Multi-Input</div>
                  <div style={{ fontSize: 13, color: T.muted, marginTop: 2 }}>Keyboard, joystick, VR, haptic</div>
                </div>
              </div>
            </div>
            <div style={{ padding: 28, background: "#f8f5f0", fontFamily: "var(--font-geist-mono), monospace", fontSize: 13, lineHeight: 2, overflow: "auto", borderLeft: sectionBorder }}>
              <div><span style={{ color: "#cf222e" }}>import</span> {"{"} ModulrClient {"}"} <span style={{ color: "#cf222e" }}>from</span> <span style={{ color: "#0a3069" }}>&quot;@modulr/sdk&quot;</span>;</div>
              <br />
              <div><span style={{ color: "#cf222e" }}>const</span> <span style={{ color: "#1a7f37" }}>client</span> = <span style={{ color: "#cf222e" }}>new</span> <span style={{ color: "#8250df" }}>ModulrClient</span>({"{"}</div>
              <div style={{ paddingLeft: 16 }}>apiKey: <span style={{ color: "#0a3069" }}>&quot;YOUR_API_KEY&quot;</span>,</div>
              <div>{"}"});</div>
              <br />
              <div><span style={{ color: "#cf222e" }}>const</span> <span style={{ color: "#1a7f37" }}>session</span> = <span style={{ color: "#cf222e" }}>await</span> client.<span style={{ color: "#8250df" }}>connect</span>({"{"}</div>
              <div style={{ paddingLeft: 16 }}>robotId: <span style={{ color: "#0a3069" }}>&quot;robot-8847&quot;</span>,</div>
              <div style={{ paddingLeft: 16 }}>stream: <span style={{ color: "#0a3069" }}>&quot;webrtc&quot;</span>,</div>
              <div>{"}"});</div>
            </div>
          </div>
        </div>
        </Reveal3D>

        {/* Fleet Management API */}
        <Reveal3D variant="slide-right" delayMs={100}>
        <div style={{ borderRadius: T.radiusXl, border: sectionBorder, overflow: "hidden", marginBottom: 20 }}>
          <div className="el-g-split-code">
            <div style={{ padding: "32px 28px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <h3 style={{ fontSize: 22, fontWeight: 600, marginBottom: 12 }}>Fleet Management API</h3>
              <p style={{ fontSize: 14, color: T.muted, lineHeight: 1.65, marginBottom: 24 }}>
                Register, monitor, and orchestrate robots at scale. Real-time health, geolocation, and task assignment across your entire fleet.
              </p>
              <div>
                <div style={{ fontSize: 15, fontWeight: 600 }}>Modulr Fleet SDK</div>
                <div style={{ fontSize: 13, color: T.muted, marginTop: 2 }}>Python, TypeScript, Rust — plug into your existing stack</div>
              </div>
            </div>
            {/* Diagonal comparison visual */}
            <div style={{ position: "relative", overflow: "hidden", borderLeft: sectionBorder, background: T.surface, minHeight: 240 }}>
              {[
                { label: "Modulr SDK", size: 32, weight: 800, top: "18%", left: "12%", opacity: 0.85, color: T.text },
                { label: "ROS 2", size: 22, weight: 500, top: "42%", left: "45%", opacity: 0.25, color: T.muted2 },
                { label: "gRPC Native", size: 18, weight: 500, top: "62%", left: "30%", opacity: 0.18, color: T.muted2 },
                { label: "REST API", size: 16, weight: 400, top: "78%", left: "55%", opacity: 0.14, color: T.muted2 },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{
                    position: "absolute",
                    top: item.top,
                    left: item.left,
                    fontSize: item.size,
                    fontWeight: item.weight,
                    color: item.color,
                    opacity: item.opacity,
                    transform: "rotate(-12deg)",
                    whiteSpace: "nowrap",
                    letterSpacing: "-0.02em",
                    transition: "opacity 0.3s",
                  }}
                >
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        </div>
        </Reveal3D>

        {/* Blockchain / Network API */}
        <Reveal3D variant="flip" delayMs={100}>
        <div style={{ borderRadius: T.radiusXl, border: sectionBorder, overflow: "hidden" }}>
          <div className="el-g-split-code">
            <div style={{ padding: "32px 28px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <h3 style={{ fontSize: 22, fontWeight: 600, marginBottom: 12 }}>Network &amp; Token API</h3>
              <p style={{ fontSize: 14, color: T.muted, lineHeight: 1.65, marginBottom: 24 }}>
                Interact with the Modulr blockchain — query balances, submit transactions, manage staking, and access the data marketplace programmatically.
              </p>
              <div>
                <div style={{ fontSize: 15, fontWeight: 600 }}>$MDR Token</div>
                <div style={{ fontSize: 13, color: T.muted, marginTop: 2 }}>Multi-chain: Ethereum, Base, Solana compatible</div>
              </div>
            </div>
            <div style={{ padding: 28, background: "#f8f5f0", fontFamily: "var(--font-geist-mono), monospace", fontSize: 13, lineHeight: 2, overflow: "auto", borderLeft: sectionBorder }}>
              <div><span style={{ color: "#cf222e" }}>const</span> <span style={{ color: "#1a7f37" }}>balance</span> = <span style={{ color: "#cf222e" }}>await</span> client.network</div>
              <div style={{ paddingLeft: 16 }}>.<span style={{ color: "#8250df" }}>getBalance</span>(<span style={{ color: "#0a3069" }}>&quot;0x8f3a…c721&quot;</span>);</div>
              <br />
              <div><span style={{ color: "#6a737d" }}>{"// Stake tokens"}</span></div>
              <div><span style={{ color: "#cf222e" }}>await</span> client.staking.<span style={{ color: "#8250df" }}>stake</span>({"{"}</div>
              <div style={{ paddingLeft: 16 }}>amount: <span style={{ color: "#0a3069" }}>&quot;10000&quot;</span>,</div>
              <div style={{ paddingLeft: 16 }}>validator: <span style={{ color: "#0a3069" }}>&quot;modulr-val-01&quot;</span>,</div>
              <div>{"}"});</div>
              <br />
              <div><span style={{ color: "#6a737d" }}>{"// Browse data marketplace"}</span></div>
              <div><span style={{ color: "#cf222e" }}>const</span> <span style={{ color: "#1a7f37" }}>datasets</span> = <span style={{ color: "#cf222e" }}>await</span> client</div>
              <div style={{ paddingLeft: 16 }}>.marketplace.<span style={{ color: "#8250df" }}>search</span>(<span style={{ color: "#0a3069" }}>&quot;lidar&quot;</span>);</div>
            </div>
          </div>
        </div>
        </Reveal3D>
      </section>

      {/* ════════════ USE CASES ════════════ */}
      <div className="section-divider" style={{ maxWidth: T.maxW, margin: "0 auto" }} />
      <section style={{ padding: `${T.sectionPy} 24px`, maxWidth: T.maxW, margin: "0 auto" }}>
        <Reveal3D variant="zoom">
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontSize: 13, color: T.muted2, marginBottom: 8 }}>Remote Teleoperation</div>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 500, letterSpacing: "-0.03em" }}>
              Use Cases
            </h2>
            <p style={{ marginTop: 12, fontSize: 16, color: T.muted, maxWidth: 640, lineHeight: 1.65 }}>
              From agriculture to space exploration, Modulr powers real-time robotic control in the most demanding environments.
            </p>
          </div>
        </Reveal3D>
        {/* Masonry-like asymmetric grid */}
        <div className="el-g-masonry">
          {/* Tall left card — Industrial Automation */}
          <Tilt3D intensity={6} style={{ gridRow: "1 / 3", borderRadius: T.radiusXl }}>
          <div className="depth-shadow" style={{ borderRadius: T.radiusXl, overflow: "hidden", position: "relative", minHeight: 380, background: useCases[0].gradient, cursor: "pointer", height: "100%" }}>
            <div style={{ position: "absolute", top: 16, left: 16, zIndex: 2 }}>
              <div style={{ padding: "4px 10px", background: "rgba(255,255,255,0.9)", borderRadius: 4, fontSize: 10, fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase" }}>Industry</div>
            </div>
            {/* Robotic arm illustration */}
            <div style={{ position: "absolute", top: "10%", left: "50%", transform: "translateX(-50%)", opacity: 0.35 }}>
              <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
                {/* Base */}
                <rect x="75" y="165" width="50" height="20" rx="4" stroke="#fff" strokeWidth="2" />
                <rect x="90" y="145" width="20" height="22" stroke="#fff" strokeWidth="1.5" />
                {/* Lower arm */}
                <line x1="100" y1="145" x2="60" y2="95" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="100" cy="145" r="5" stroke="#fff" strokeWidth="1.5" />
                {/* Upper arm */}
                <line x1="60" y1="95" x2="110" y2="50" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
                <circle cx="60" cy="95" r="4" stroke="#fff" strokeWidth="1.5" />
                {/* Wrist */}
                <line x1="110" y1="50" x2="140" y2="45" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="110" cy="50" r="3" stroke="#fff" strokeWidth="1.5" />
                {/* Gripper */}
                <line x1="140" y1="45" x2="155" y2="35" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="140" y1="45" x2="155" y2="55" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
                {/* Arc ranges */}
                <path d="M 55 140 A 50 50 0 0 1 15 100" stroke="#fff" strokeWidth="0.5" strokeDasharray="3 3" />
                <path d="M 130 55 A 30 30 0 0 0 135 25" stroke="#fff" strokeWidth="0.5" strokeDasharray="3 3" />
              </svg>
            </div>
            <div style={{ position: "absolute", left: 20, right: 20, bottom: 20, zIndex: 2 }}>
              <p style={{ color: "#fff", fontSize: 18, fontWeight: 600, lineHeight: 1.3, marginBottom: 6 }}>{useCases[0].title}</p>
              <p style={{ color: "rgba(255,255,255,0.82)", fontSize: 14, lineHeight: 1.5 }}>{useCases[0].desc}</p>
            </div>
          </div>
          </Tilt3D>

          {/* Middle top card — Entertainment */}
          <Tilt3D intensity={8} style={{ borderRadius: T.radiusXl }}>
          <div className="depth-shadow" style={{ borderRadius: T.radiusXl, overflow: "hidden", position: "relative", minHeight: 280, background: useCases[1].gradient, cursor: "pointer", height: "100%" }}>
            {/* Gamepad / Arena illustration */}
            <div style={{ position: "absolute", top: "12%", left: "50%", transform: "translateX(-50%)", opacity: 0.32 }}>
              <svg width="200" height="140" viewBox="0 0 200 140" fill="none">
                {/* Arena circle */}
                <circle cx="100" cy="70" r="55" stroke="#fff" strokeWidth="1" strokeDasharray="4 3" />
                <circle cx="100" cy="70" r="35" stroke="#fff" strokeWidth="1.5" />
                {/* Center cross */}
                <line x1="100" y1="45" x2="100" y2="95" stroke="#fff" strokeWidth="0.5" />
                <line x1="75" y1="70" x2="125" y2="70" stroke="#fff" strokeWidth="0.5" />
                {/* Robot 1 - left */}
                <rect x="72" y="60" width="12" height="16" rx="2" stroke="#fff" strokeWidth="1.5" />
                <circle cx="78" cy="57" r="3" stroke="#fff" strokeWidth="1" />
                {/* Robot 2 - right */}
                <rect x="116" y="62" width="12" height="16" rx="2" stroke="#fff" strokeWidth="1.5" />
                <circle cx="122" cy="59" r="3" stroke="#fff" strokeWidth="1" />
                {/* Signal waves */}
                <path d="M 56 50 A 20 20 0 0 0 56 30" stroke="#fff" strokeWidth="0.8" />
                <path d="M 52 50 A 24 24 0 0 0 52 26" stroke="#fff" strokeWidth="0.5" />
                <path d="M 144 50 A 20 20 0 0 1 144 30" stroke="#fff" strokeWidth="0.8" />
              </svg>
            </div>
            <div style={{ position: "absolute", left: 20, right: 20, bottom: 20, zIndex: 2 }}>
              <p style={{ color: "#fff", fontSize: 16, fontWeight: 600, lineHeight: 1.3, marginBottom: 4 }}>{useCases[1].title}</p>
              <p style={{ color: "rgba(255,255,255,0.82)", fontSize: 13, lineHeight: 1.5 }}>{useCases[1].desc}</p>
            </div>
          </div>
          </Tilt3D>

          {/* Middle bottom — Defense */}
          <Tilt3D intensity={8} style={{ borderRadius: T.radiusXl }}>
          <div className="depth-shadow" style={{ borderRadius: T.radiusXl, overflow: "hidden", position: "relative", minHeight: 120, background: useCases[2].gradient, cursor: "pointer", height: "100%" }}>
            {/* Shield / radar illustration */}
            <div style={{ position: "absolute", top: "50%", right: 24, transform: "translateY(-50%)", opacity: 0.3 }}>
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                <path d="M 40 8 L 68 22 L 68 48 C 68 60 54 70 40 76 C 26 70 12 60 12 48 L 12 22 Z" stroke="#fff" strokeWidth="1.5" />
                <path d="M 40 18 L 58 28 L 58 46 C 58 54 48 62 40 66 C 32 62 22 54 22 46 L 22 28 Z" stroke="#fff" strokeWidth="0.5" strokeDasharray="3 3" />
                <circle cx="40" cy="40" r="6" stroke="#fff" strokeWidth="1" />
                <circle cx="40" cy="40" r="2" fill="#fff" />
              </svg>
            </div>
            <div style={{ position: "absolute", left: 20, right: 20, bottom: 16, zIndex: 2 }}>
              <p style={{ color: "#fff", fontSize: 15, fontWeight: 600, lineHeight: 1.3 }}>{useCases[2].title}</p>
            </div>
          </div>
          </Tilt3D>

          {/* Right tall card — Healthcare */}
          <Tilt3D intensity={6} style={{ gridRow: "1 / 3", borderRadius: T.radiusXl }}>
          <div className="depth-shadow" style={{ borderRadius: T.radiusXl, overflow: "hidden", position: "relative", minHeight: 280, background: useCases[3].gradient, cursor: "pointer", height: "100%" }}>
            {/* Medical cross + precision instrument illustration */}
            <div style={{ position: "absolute", top: "10%", left: "50%", transform: "translateX(-50%)", opacity: 0.32 }}>
              <svg width="160" height="160" viewBox="0 0 160 160" fill="none">
                {/* Concentric precision rings */}
                <circle cx="80" cy="80" r="60" stroke="#fff" strokeWidth="0.5" strokeDasharray="3 5" />
                <circle cx="80" cy="80" r="42" stroke="#fff" strokeWidth="1" />
                <circle cx="80" cy="80" r="24" stroke="#fff" strokeWidth="1.5" />
                {/* Cross */}
                <rect x="72" y="56" width="16" height="48" rx="2" stroke="#fff" strokeWidth="1.5" />
                <rect x="56" y="72" width="48" height="16" rx="2" stroke="#fff" strokeWidth="1.5" />
                {/* Pulse line at bottom */}
                <path d="M 20 130 L 50 130 L 58 118 L 66 142 L 74 122 L 82 134 L 88 130 L 140 130" stroke="#fff" strokeWidth="1" strokeLinecap="round" />
                {/* Small crosshair marks */}
                <line x1="80" y1="14" x2="80" y2="24" stroke="#fff" strokeWidth="0.5" />
                <line x1="80" y1="136" x2="80" y2="146" stroke="#fff" strokeWidth="0.5" />
                <line x1="14" y1="80" x2="24" y2="80" stroke="#fff" strokeWidth="0.5" />
                <line x1="136" y1="80" x2="146" y2="80" stroke="#fff" strokeWidth="0.5" />
              </svg>
            </div>
            <div style={{ position: "absolute", left: 20, right: 20, bottom: 20, zIndex: 2 }}>
              <p style={{ color: "#fff", fontSize: 15, fontWeight: 600, lineHeight: 1.3, marginBottom: 4 }}>{useCases[3].title}</p>
              <p style={{ color: "rgba(255,255,255,0.82)", fontSize: 13, lineHeight: 1.5 }}>{useCases[3].desc}</p>
            </div>
          </div>
          </Tilt3D>
        </div>

        {/* Full-width Space card */}
        <Tilt3D intensity={4} scale={1.01} style={{ borderRadius: T.radiusXl, marginTop: 12 }}>
        <div className="depth-shadow" style={{ borderRadius: T.radiusXl, overflow: "hidden", position: "relative", minHeight: 180, background: useCases[4].gradient, cursor: "pointer" }}>
          {/* Space / satellite illustration */}
          <div style={{ position: "absolute", top: "50%", right: 60, transform: "translateY(-50%)", opacity: 0.3 }}>
            <svg width="180" height="120" viewBox="0 0 180 120" fill="none">
              {/* Planet */}
              <circle cx="40" cy="60" r="28" stroke="#fff" strokeWidth="1.5" />
              <ellipse cx="40" cy="60" rx="38" ry="12" stroke="#fff" strokeWidth="0.5" strokeDasharray="3 3" />
              {/* Orbit path */}
              <ellipse cx="100" cy="60" rx="70" ry="40" stroke="#fff" strokeWidth="0.5" strokeDasharray="4 4" />
              {/* Satellite body */}
              <rect x="145" y="25" width="14" height="10" rx="2" stroke="#fff" strokeWidth="1.5" />
              {/* Solar panels */}
              <rect x="125" y="27" width="18" height="6" stroke="#fff" strokeWidth="1" />
              <rect x="161" y="27" width="18" height="6" stroke="#fff" strokeWidth="1" />
              {/* Signal beams */}
              <line x1="152" y1="35" x2="145" y2="50" stroke="#fff" strokeWidth="0.5" strokeDasharray="2 2" />
              <line x1="152" y1="35" x2="160" y2="50" stroke="#fff" strokeWidth="0.5" strokeDasharray="2 2" />
              {/* Stars */}
              <circle cx="20" cy="15" r="1" fill="#fff" />
              <circle cx="90" cy="10" r="1.5" fill="#fff" />
              <circle cx="160" cy="90" r="1" fill="#fff" />
              <circle cx="130" cy="100" r="1.5" fill="#fff" />
              <circle cx="60" cy="105" r="1" fill="#fff" />
            </svg>
          </div>
          <div style={{ position: "absolute", left: 24, bottom: 24, right: "45%", zIndex: 2 }}>
            <p style={{ color: "#fff", fontSize: 18, fontWeight: 600, lineHeight: 1.3, marginBottom: 6 }}>{useCases[4].title}</p>
            <p style={{ color: "rgba(255,255,255,0.82)", fontSize: 14, lineHeight: 1.5 }}>{useCases[4].desc}</p>
          </div>
        </div>
        </Tilt3D>
      </section>

      {/* ════════════ ROADMAP (DUAL TRACK) ════════════ */}
      <div className="section-divider" style={{ maxWidth: T.maxW, margin: "0 auto" }} />
      <section style={{ padding: `${T.sectionPy} 24px`, maxWidth: T.maxW, margin: "0 auto" }}>
        <Reveal>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 500, letterSpacing: "-0.03em", marginBottom: 16 }}>
            Building the global<br />robot economy
                </h2>
          <p style={{ fontSize: 16, color: T.muted, maxWidth: 680, lineHeight: 1.65, marginBottom: 48 }}>
            From devnet to mainnet, from campus tours to global robot games — our roadmap is designed to expand the Modulr network across robotics, Web3, and entertainment.
          </p>
        </Reveal>

        {/* Timeline header */}
        <div ref={timelineRef} style={{ overflowX: "auto", paddingBottom: 20, marginBottom: 32 }}>
          <div style={{ display: "flex", gap: 0, minWidth: "fit-content", position: "relative" }}>
            <div style={{ position: "absolute", top: 8, left: 0, right: 0, height: 2, background: T.border }} />
            {roadmapDates.map((date, i) => (
              <button
                key={date}
                onClick={() => setActiveRoadmapIdx(i)}
                style={{
                  flex: "0 0 200px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  padding: "0 12px",
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <div style={{
                  width: 16, height: 16, borderRadius: "50%",
                  border: `2px solid ${activeRoadmapIdx === i ? "#f2b400" : T.border}`,
                  background: activeRoadmapIdx === i ? "#f2b400" : "#fff",
                  marginBottom: 12, transition: "all 0.2s", position: "relative", zIndex: 1,
                }} />
                <div style={{ fontSize: 16, fontWeight: activeRoadmapIdx === i ? 700 : 500, color: activeRoadmapIdx === i ? T.text : T.muted2, marginBottom: 4, transition: "color 0.2s" }}>
                  {date}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Dual track detail */}
        <div className="el-g2" style={{ gap: 16, marginBottom: 32 }}>
          {/* Robotics track */}
          <div style={{ borderRadius: T.radiusXl, border: sectionBorder, padding: 24, background: T.surface }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f2b400" strokeWidth="2"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="8.5" cy="16" r="1.5"/><circle cx="15.5" cy="16" r="1.5"/><path d="M12 3v4"/><path d="M8 7h8"/><circle cx="12" cy="3" r="1"/></svg>
              <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", color: "#f2b400" }}>ROBOTICS</span>
              <span style={{ marginLeft: "auto", padding: "2px 10px", borderRadius: T.radiusPill, background: "rgba(242,180,0,0.1)", color: "#f2b400", fontSize: 11, fontWeight: 600 }}>{roadmapDates[activeRoadmapIdx]}</span>
            </div>
            <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 12 }}>{roadmapRobotics[activeRoadmapIdx].title}</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {roadmapRobotics[activeRoadmapIdx].items.map((item) => (
                <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#f2b400", marginTop: 6, flexShrink: 0 }} />
                  <span style={{ fontSize: 14, color: T.muted, lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Web3 track */}
          <div style={{ borderRadius: T.radiusXl, border: `1px solid rgba(99,102,241,0.15)`, padding: 24, background: "linear-gradient(135deg, rgba(99,102,241,0.03), transparent)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>
              <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", color: "#6366f1" }}>WEB3</span>
              <span style={{ marginLeft: "auto", padding: "2px 10px", borderRadius: T.radiusPill, background: "rgba(99,102,241,0.1)", color: "#6366f1", fontSize: 11, fontWeight: 600 }}>{roadmapDates[activeRoadmapIdx]}</span>
            </div>
            <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 12 }}>{roadmapWeb3[activeRoadmapIdx].title}</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {roadmapWeb3[activeRoadmapIdx].items.map((item) => (
                <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#6366f1", marginTop: 6, flexShrink: 0 }} />
                  <span style={{ fontSize: 14, color: T.muted, lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Link href="https://modulr.gitbook.io/modulr.cloud" target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 14, fontWeight: 500, color: T.text, textDecoration: "none" }}>
          View full roadmap <span>→</span>
        </Link>
      </section>

      {/* ════════════ SAFETY ════════════ */}
      <div className="section-divider" style={{ maxWidth: T.maxW, margin: "0 auto" }} />
      <section style={{ padding: `${T.sectionPy} 24px`, maxWidth: T.maxW, margin: "0 auto" }}>
        <Reveal3D variant="slide-left">
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 48, flexWrap: "wrap", gap: 20 }}>
            <h2 style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 500, letterSpacing: "-0.03em" }}>Safety, built in</h2>
            <Link href="#" style={{ display: "inline-flex", alignItems: "center", height: 44, padding: "0 22px", background: T.accent, color: T.accentFg, borderRadius: T.radiusPill, fontSize: 14, fontWeight: 600, textDecoration: "none" }}>
              Learn more
            </Link>
          </div>
        </Reveal3D>
        <div className="el-g3">
          {safetyItems.map((item, i) => (
            <Reveal3D key={item.title} delayMs={i * 120} variant="pop">
            <Tilt3D intensity={8} scale={1.02} style={{ borderRadius: T.radiusXl, height: "100%" }}>
            <div className="depth-shadow" style={{ borderRadius: T.radiusXl, border: sectionBorder, background: T.surface, overflow: "hidden", height: "100%" }}>
              {/* Geometric SVG illustration area */}
              <div style={{ height: 220, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
                {i === 0 && (
                  <svg width="180" height="180" viewBox="0 0 180 180" fill="none">
                    <ellipse cx="90" cy="90" rx="70" ry="35" stroke={T.text} strokeWidth="1" strokeDasharray="3 3" opacity="0.3" />
                    <ellipse cx="90" cy="90" rx="70" ry="35" stroke={T.text} strokeWidth="1" strokeDasharray="3 3" opacity="0.3" transform="rotate(60 90 90)" />
                    <ellipse cx="90" cy="90" rx="70" ry="35" stroke={T.text} strokeWidth="1" strokeDasharray="3 3" opacity="0.3" transform="rotate(120 90 90)" />
                    <ellipse cx="90" cy="90" rx="50" ry="25" stroke={T.text} strokeWidth="1" opacity="0.5" />
                    <ellipse cx="90" cy="90" rx="50" ry="25" stroke={T.text} strokeWidth="1" opacity="0.5" transform="rotate(60 90 90)" />
                    <ellipse cx="90" cy="90" rx="50" ry="25" stroke={T.text} strokeWidth="1" opacity="0.5" transform="rotate(120 90 90)" />
                    <circle cx="90" cy="90" r="3" fill={T.text} opacity="0.5" />
                  </svg>
                )}
                {i === 1 && (
                  <svg width="180" height="180" viewBox="0 0 180 180" fill="none">
                    <rect x="55" y="40" width="70" height="70" stroke={T.text} strokeWidth="1" strokeDasharray="3 3" opacity="0.25" />
                    <rect x="35" y="65" width="70" height="70" stroke={T.text} strokeWidth="1" opacity="0.45" />
                    <line x1="35" y1="65" x2="55" y2="40" stroke={T.text} strokeWidth="1" strokeDasharray="3 3" opacity="0.25" />
                    <line x1="105" y1="65" x2="125" y2="40" stroke={T.text} strokeWidth="1" strokeDasharray="3 3" opacity="0.25" />
                    <line x1="35" y1="135" x2="55" y2="110" stroke={T.text} strokeWidth="1" strokeDasharray="3 3" opacity="0.25" />
                    <line x1="105" y1="135" x2="125" y2="110" stroke={T.text} strokeWidth="1" opacity="0.45" />
                    <line x1="35" y1="88" x2="105" y2="88" stroke={T.text} strokeWidth="0.5" strokeDasharray="2 2" opacity="0.15" />
                    <line x1="35" y1="112" x2="105" y2="112" stroke={T.text} strokeWidth="0.5" strokeDasharray="2 2" opacity="0.15" />
                    <line x1="58" y1="65" x2="58" y2="135" stroke={T.text} strokeWidth="0.5" strokeDasharray="2 2" opacity="0.15" />
                    <line x1="82" y1="65" x2="82" y2="135" stroke={T.text} strokeWidth="0.5" strokeDasharray="2 2" opacity="0.15" />
                  </svg>
                )}
                {i === 2 && (
                  <svg width="180" height="180" viewBox="0 0 180 180" fill="none">
                    <circle cx="90" cy="90" r="80" stroke={T.text} strokeWidth="1" strokeDasharray="3 3" opacity="0.2" />
                    <circle cx="90" cy="90" r="65" stroke={T.text} strokeWidth="1" strokeDasharray="3 3" opacity="0.25" />
                    <circle cx="90" cy="90" r="50" stroke={T.text} strokeWidth="1" opacity="0.35" />
                    <circle cx="90" cy="90" r="35" stroke={T.text} strokeWidth="1" opacity="0.45" />
                    <circle cx="90" cy="90" r="20" stroke={T.text} strokeWidth="1.5" opacity="0.55" />
                    <circle cx="90" cy="90" r="6" fill={T.text} opacity="0.5" />
                    <circle cx="90" cy="10" r="3" fill={T.text} opacity="0.3" />
                    <circle cx="155" cy="90" r="2.5" fill={T.text} opacity="0.3" />
                    <circle cx="30" cy="120" r="2" fill={T.text} opacity="0.25" />
                    <path d="M 90 10 A 80 80 0 0 1 170 90" stroke={T.text} strokeWidth="1" fill="none" opacity="0.3" />
                    <path d="M 170 90 A 80 80 0 0 1 90 170" stroke={T.text} strokeWidth="1" strokeDasharray="4 4" fill="none" opacity="0.18" />
                  </svg>
                )}
              </div>
              <div style={{ padding: "0 24px 24px" }}>
                <div style={{ fontSize: 18, fontWeight: 600, color: T.text, marginBottom: 8 }}>{item.title}</div>
                <p style={{ fontSize: 14, color: T.muted, lineHeight: 1.55 }}>{item.desc}</p>
              </div>
            </div>
            </Tilt3D>
            </Reveal3D>
          ))}
          </div>
        </section>

      {/* ════════════ LATEST UPDATES ════════════ */}
      <section style={{ borderTop: sectionBorder, padding: `${T.sectionPy} 24px`, maxWidth: T.maxW, margin: "0 auto" }}>
        <Reveal3D variant="slide-right">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32 }}>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 500, letterSpacing: "-0.03em" }}>Latest updates</h2>
            <Link href="/news" className="link-underline" style={{ fontSize: 14, color: T.muted, textDecoration: "none" }}>All posts</Link>
          </div>
        </Reveal3D>
        <div className="el-g3">
          {latestUpdates.map((post, i) => (
            <Reveal3D key={post.title} delayMs={i * 120} variant="flip">
            <Tilt3D intensity={8} scale={1.02} style={{ borderRadius: T.radiusXl }}>
            <div style={{ cursor: "pointer" }}>
              <div className="card-shine depth-shadow" style={{
                borderRadius: T.radiusXl,
                overflow: "hidden",
                position: "relative",
                height: 320,
                marginBottom: 16,
              }}>
                {/* Base gradient */}
                <div style={{ position: "absolute", inset: 0, background: post.gradient }} />
                {/* Pattern overlay */}
                <div style={{ position: "absolute", inset: 0, backgroundImage: post.pattern, opacity: 0.8 }} />
                
                {/* Image overlay if present */}
                {post.image && (
                  <div style={{ position: "absolute", inset: 0 }}>
                    <Image src={post.image} alt={post.title} fill style={{ objectFit: "cover" }} />
                  </div>
                )}

                {/* Overlay text if present */}
                {post.overlayText && (
                  <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24 }}>
                    <div style={{
                      color: "#fff",
                      fontSize: post.overlayText.length < 10 ? 72 : 26,
                      fontWeight: post.overlayText.length < 10 ? 800 : 600,
                      textAlign: "center",
                      lineHeight: 1.15,
                      whiteSpace: "pre-line",
                      textShadow: "0 2px 12px rgba(0,0,0,0.3)",
                    }}>
                      {post.overlayText}
                    </div>
                    {post.overlaySubtext && (
                      <div style={{ marginTop: 8, color: "rgba(255,255,255,0.8)", fontSize: 16, fontWeight: 500 }}>
                        {post.overlaySubtext}
                      </div>
                    )}
                  </div>
                )}
              </div>
              <p style={{ fontSize: 16, fontWeight: 500, lineHeight: 1.4, color: T.text }}>{post.title}</p>
            </div>
            </Tilt3D>
            </Reveal3D>
          ))}
        </div>
      </section>

      <ModulrFooter showCta />
    </div>
  );
}
