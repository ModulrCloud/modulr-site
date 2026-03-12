"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

function useMobileNav() {
  const [open, setOpen] = useState(false);
  return { open, toggle: () => setOpen((p) => !p), close: () => setOpen(false) };
}

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
  radiusLg: 24,
  radiusXl: 32,
  radiusPill: 999,
  maxW: 1200,
};

const sectionBorder = `1px solid ${T.border}`;

/* ───────────────────────── NAV ITEMS ───────────────────────── */
const navItems = [
  { label: "Robots", href: "/eleven/robots" },
  { label: "Web3", href: "/eleven/web3" },
  { label: "Research", href: "/eleven/research" },
  { label: "News", href: "/eleven/news" },
  { label: "Team", href: "/eleven/team" },
  { label: "Brand Kit", href: "/eleven/brand-kit" },
];

/* ───────────────────────── USE CASE DATA ───────────────────────── */
const useCases = [
  {
    title: "Industrial Automation",
    desc: ", remotely managing robotic arms, AGVs, and factory floor equipment with sub-second latency — scaling operations without physical presence.",
    gradient: "linear-gradient(145deg, #f97316, #ea580c, #c2410c)",
    chatMessages: [
      { from: "user", text: "Status of Unit 7 on factory floor?" },
      { from: "agent", text: "Unit 7 is operational. Task: palletizing. Cycle time: 12s. No alerts." },
      { from: "agent", text: "Battery: 94%. Next scheduled maintenance: 14h." },
    ],
  },
  {
    title: "Entertainment & Gaming",
    desc: ", controlling real robots in fighting arenas, race courses, and immersive experiences from anywhere in the world.",
    gradient: "linear-gradient(145deg, #2d6a4f, #52b788, #40c057)",
    chatMessages: [
      { from: "user", text: "Ready to start the match?" },
      { from: "agent", text: "Arena clear. Both robots calibrated. Countdown initiating..." },
    ],
  },
  {
    title: "Defense & Security",
    desc: ", operating unmanned ground and aerial vehicles for reconnaissance, patrol, and hazardous environment inspection with military-grade reliability.",
    gradient: "linear-gradient(145deg, #1a365d, #2d5aa0, #3b82f6)",
    chatMessages: [
      { from: "agent", text: "Perimeter sweep complete. Sector B clear." },
      { from: "user", text: "Move to waypoint Charlie for detailed inspection." },
      { from: "agent", text: "Navigating to waypoint Charlie. ETA: 2 min." },
    ],
  },
  {
    title: "Healthcare & Medical",
    desc: ", enabling surgeons and specialists to operate robotic surgery systems and assistive devices remotely, expanding access to expertise.",
    gradient: "linear-gradient(145deg, #be185d, #9333ea, #4f46e5)",
    chatMessages: [
      { from: "user", text: "Initiating remote-assisted procedure." },
      { from: "agent", text: "Haptic feedback active. Latency: 18ms. All vitals nominal." },
    ],
  },
  {
    title: "Space & Extreme Environments",
    desc: ", controlling rovers, orbital manipulators, and deep-sea exploration robots with real-time feedback loops across vast distances.",
    gradient: "linear-gradient(145deg, #1e3a5f, #3b82f6, #f59e0b)",
    chatMessages: [
      { from: "user", text: "Begin soil sample collection at coordinates 34.2N" },
      { from: "agent", text: "Rover arm extending. Sample drill engaged. Telemetry stable." },
    ],
  },
];

/* ───────────────────────── PLATFORM FEATURES ───────────────────────── */
const platformFeatures = [
  { title: "Connect to any robot with the Modulr agent", desc: "Get your robots on the network without rebuilding from scratch. Integrate your existing systems with the Modulr agent so they're ready for scalable, remote operation." },
  { title: "Real-time teleoperation with sub-500ms latency", desc: "Operate any robot from anywhere with real-time video streaming, precise control inputs, and enterprise-grade responsive control for manipulation, recovery, and intervention." },
  { title: "Deploy and scale with zero infrastructure overhead", desc: "No custom integrations or hardware expertise required. Robots, AI models, compute, and data modules connect instantly through Modulr's plug-and-play stack." },
];

/* ───────────────────────── WORKFLOW / HOW IT WORKS ───────────────────────── */
const howItWorks = [
  { title: "Connect your robot", desc: "Install the Modulr agent on your robot. It supports ROS, custom protocols, and all major hardware platforms. One-line setup." },
  { title: "Configure access & controls", desc: "Define who can operate, when, and under what safety rules. Set up input mappings, video streams, and emergency stops." },
  { title: "Go live on the network", desc: "Your robot becomes discoverable. Operators can connect, control, and complete tasks — you earn per session or per minute." },
];

/* ───────────────────────── CAPABILITIES ───────────────────────── */
const capabilities = [
  { title: "Multi-input support", desc: "Keyboard, joystick, VR headset, haptic gloves — operators choose their preferred interface." },
  { title: "Fleet management", desc: "Register, monitor, and orchestrate robots at scale. Real-time health, geolocation, and task assignment." },
  { title: "Session analytics", desc: "Every session is logged with detailed telemetry, operator identity, and timestamped actions for full traceability." },
  { title: "Safety guardrails", desc: "End-to-end encryption, zero-trust architecture, rate limits, and hardware-level emergency stops on every session." },
];

/* ───────────────────────── CUSTOMIZATION ───────────────────────── */
const customCards = [
  {
    kicker: "Plug-and-play robotics stack",
    title: "No hardware or software engineering expertise required",
    desc: "For clients, it's zero-setup. For partners, robotic systems can easily be added to the network for access to teleoperation, AI models, compute, and data modules.",
    gradient: "linear-gradient(135deg, #e0f2fe 0%, #bae6fd 50%, #7dd3fc 100%)",
  },
  {
    kicker: "Earn from idle robots",
    title: "Turn downtime into revenue and data",
    desc: "List your robots on Modulr's marketplace and earn when others operate them. Or outsource your robot data collection to qualified operators worldwide.",
    gradient: "linear-gradient(135deg, #fef3c7 0%, #fde68a 50%, #fbbf24 100%)",
  },
  {
    kicker: "Operate any robot, anywhere",
    title: "Connect to and control robots from anywhere in the world",
    desc: "Near-zero latency using your preferred interface: web browser, VR headset, gaming controller, or custom rig. All with built-in safety and compliance.",
    gradient: "linear-gradient(135deg, #ede9fe 0%, #ddd6fe 50%, #c4b5fd 100%)",
  },
];

/* ───────────────────────── DEV TOOLS ───────────────────────── */
const devTools = [
  { title: "Modulr SDK", desc: "Python, TypeScript, Rust — plug into your existing stack with full type safety and auto-generated bindings." },
  { title: "Sub-500ms latency", desc: "WebRTC-based real-time streams with end-to-end encryption. Optimized for global operation." },
  { title: "Any robot, any protocol", desc: "ROS 2, gRPC, REST, custom — the Modulr agent abstracts hardware differences into a unified control API." },
  { title: "Fleet & session APIs", desc: "Register robots, manage fleets, track sessions, and automate task assignment programmatically." },
];

/* ───────────────────────── FAQ ───────────────────────── */
const faqs = [
  { q: "What types of robots does Modulr support?", a: "Modulr supports any robot that can run our lightweight agent — robotic arms, AGVs, drones, humanoids, rovers, and more. If it has a compute unit, it can connect." },
  { q: "How does teleoperation latency work?", a: "We use WebRTC-based peer-to-peer connections with global relay infrastructure. Typical end-to-end latency is under 500ms, often under 200ms for same-region operations." },
  { q: "Is my robot data secure?", a: "Yes. All sessions use end-to-end encryption with zero-trust architecture. Every action is logged and auditable. We support SOC 2, HIPAA, and GDPR compliance." },
  { q: "Can I earn revenue from my robots?", a: "Absolutely. List your robots on the Modulr marketplace. Operators pay per session or per minute, and you earn directly. Idle robots become revenue-generating assets." },
  { q: "What input methods are supported?", a: "Keyboard, mouse, joystick, gamepad, VR headset, haptic gloves, and custom input rigs. We provide a unified input abstraction layer." },
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
      { label: "X (Twitter)", href: "https://twitter.com/aspect_build" },
      { label: "LinkedIn", href: "#" },
      { label: "GitHub", href: "https://github.com/aspect-build" },
      { label: "YouTube", href: "#" },
      { label: "Discord", href: "#" },
      { label: "Telegram", href: "#" },
      { label: "Reddit", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/eleven/team" },
      { label: "Research", href: "/eleven/research" },
      { label: "News", href: "/eleven/news" },
      { label: "Careers", href: "/careers" },
      { label: "Roadmap", href: "/roadmap" },
      { label: "Brand & Press Kit", href: "#" },
    ],
  },
];

/* ═══════════════════════════════════════════════════════════════════
   PAGE COMPONENT
   ═══════════════════════════════════════════════════════════════════ */
export default function RobotsPage() {
  const [activeUseCase, setActiveUseCase] = useState(0);
  const [activePlatform, setActivePlatform] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const mobileNav = useMobileNav();

  /* Auto-rotate use cases */
  useEffect(() => {
    const id = setInterval(() => {
      setActiveUseCase((p) => (p + 1) % useCases.length);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  /* Scroll slider on activeUseCase change */
  useEffect(() => {
    if (sliderRef.current) {
      const cardW = 380;
      sliderRef.current.scrollTo({ left: activeUseCase * (cardW + 20), behavior: "smooth" });
    }
  }, [activeUseCase]);

  return (
    <div style={{ background: T.bg, color: T.text, fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>

      {/* ════════════ HEADER ════════════ */}
      <header style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(255,255,255,0.82)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", borderBottom: sectionBorder }}>
        <div style={{ maxWidth: T.maxW, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
            <Link href="/eleven" style={{ display: "flex", alignItems: "center", gap: 10, fontWeight: 700, fontSize: 18, color: T.text, textDecoration: "none", letterSpacing: "-0.02em" }}><Image src="/Modulr_logo.png" alt="Modulr" width={28} height={28} style={{ objectFit: "contain" }} unoptimized />Modulr</Link>
            <nav className="el-desktop-only" style={{ gap: 4 }}>
              {navItems.map((item) => (
                <Link key={item.label} href={item.href} style={{ padding: "6px 12px", fontSize: 14, color: item.href === "/eleven/robots" ? T.text : T.muted, fontWeight: item.href === "/eleven/robots" ? 600 : 400, textDecoration: "none", borderRadius: 8 }}>
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Link href="https://testnet.explorer.modulr.cloud/" target="_blank" rel="noreferrer" className="el-desktop-only" style={{ padding: "8px 18px", fontSize: 14, fontWeight: 500, color: T.text, textDecoration: "none", borderRadius: T.radiusPill, border: sectionBorder, background: "#fff" }}>Explorer</Link>
            <Link href="https://app.modulr.cloud/" target="_blank" rel="noreferrer" style={{ padding: "8px 18px", fontSize: 14, fontWeight: 600, color: T.accentFg, background: T.accent, borderRadius: T.radiusPill, textDecoration: "none" }}>Open App</Link>
            <button className="el-mobile-only" onClick={mobileNav.toggle} style={{ width: 40, height: 40, border: "none", background: "none", cursor: "pointer", alignItems: "center", justifyContent: "center" }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d={mobileNav.open ? "M5 5l10 10M15 5L5 15" : "M3 5h14M3 10h14M3 15h14"} stroke={T.text} strokeWidth="1.5" strokeLinecap="round" /></svg>
            </button>
          </div>
        </div>
        <div className={`el-mobile-menu${mobileNav.open ? " open" : ""}`}>
          {navItems.map((item) => (
            <Link key={item.label} href={item.href} onClick={mobileNav.close} style={{ padding: "10px 8px", fontSize: 15, fontWeight: item.href === "/eleven/robots" ? 600 : 400, color: item.href === "/eleven/robots" ? T.text : T.muted, textDecoration: "none" }}>
              {item.label}
            </Link>
          ))}
        </div>
      </header>

      {/* ════════════ HERO ════════════ */}
      <section style={{ position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 0%, rgba(242,180,0,0.12) 0%, transparent 70%)" }} />

        <div style={{ position: "relative", maxWidth: T.maxW, margin: "0 auto", padding: "80px 24px 40px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>

          {/* Schematic robot illustrations grid */}
          <div style={{ width: "100%", maxWidth: 900, marginBottom: 48, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }} className="el-g4">

            {/* Spot — quadruped robot dog (side view, Spot style) */}
            <div style={{ padding: "28px 16px", borderRadius: T.radiusXl, border: sectionBorder, background: "rgba(255,255,255,0.7)", backdropFilter: "blur(24px)", display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
              <svg width="150" height="110" viewBox="0 0 300 200" fill="none" style={{ opacity: 0.6 }}>
                {/* ═══ BODY — rounded rectangle (Spot shape) ═══ */}
                <rect x="50" y="46" width="195" height="34" rx="12" ry="12" stroke="#1a1a1a" strokeWidth="2.2" fill="none"/>

                {/* ═══ HEAD — thick cylindrical sensor head (LEFT side = front) ═══ */}
                {/* Neck connecting body to head */}
                <path d="M55,52 L48,50 L48,76 L55,74" stroke="#1a1a1a" strokeWidth="1.8" fill="none"/>
                {/* Head block — chunky rounded shape */}
                <path d="M48,44 L28,44 Q20,44 20,52 L20,74 Q20,82 28,82 L48,82 Z" stroke="#1a1a1a" strokeWidth="2.2" fill="none"/>
                {/* Flat front face line */}
                <line x1="20" y1="50" x2="20" y2="76" stroke="#1a1a1a" strokeWidth="2.2"/>
                {/* Sensor panel on front face */}
                <rect x="21" y="52" width="5" height="5" rx="1" stroke="#1a1a1a" strokeWidth="1" opacity="0.5"/>
                <rect x="21" y="60" width="5" height="5" rx="1" stroke="#1a1a1a" strokeWidth="1" opacity="0.5"/>
                <rect x="21" y="68" width="5" height="5" rx="1" stroke="#1a1a1a" strokeWidth="1" opacity="0.35"/>
                {/* Top detail on head */}
                <line x1="32" y1="44" x2="42" y2="44" stroke="#1a1a1a" strokeWidth="1.2" opacity="0.25"/>

                {/* Handle on top */}
                <path d="M125,46 L125,40 Q125,36 129,36 L166,36 Q170,36 170,40 L170,46" stroke="#1a1a1a" strokeWidth="1.4" fill="none"/>

                {/* Panel line */}
                <line x1="72" y1="63" x2="230" y2="63" stroke="#1a1a1a" strokeWidth="0.5" opacity="0.15"/>
                {/* Vent slots */}
                {[54,58,62,66,70].map(y=><line key={`v${y}`} x1="78" y1={y} x2="88" y2={y} stroke="#1a1a1a" strokeWidth="0.7" opacity="0.13"/>)}
                {/* Detail panel */}
                <rect x="140" y="54" width="38" height="12" rx="2" stroke="#1a1a1a" strokeWidth="0.7" opacity="0.18"/>
                {/* LEDs at rear (right side) */}
                <circle cx="237" cy="57" r="1" fill="#1a1a1a" opacity="0.15"/>
                <circle cx="237" cy="61" r="1" fill="#1a1a1a" opacity="0.15"/>
                <circle cx="237" cy="65" r="1" fill="#1a1a1a" opacity="0.15"/>

                {/* ═══ FAR FRONT LEG (behind body, visible) ═══ */}
                <circle cx="213" cy="86" r="7" stroke="#1a1a1a" strokeWidth="1.5" fill="none" opacity="0.3"/>
                <path d="M213,93 L218,124" stroke="#1a1a1a" strokeWidth="5" strokeLinecap="round" opacity="0.3"/>
                <circle cx="218" cy="124" r="4.5" stroke="#1a1a1a" strokeWidth="1.3" opacity="0.3"/>
                <path d="M218,128 L204,160" stroke="#1a1a1a" strokeWidth="4" strokeLinecap="round" opacity="0.3"/>
                <circle cx="204" cy="160" r="2.5" fill="#1a1a1a" opacity="0.12"/>

                {/* ═══ FAR REAR LEG (behind body, visible) ═══ */}
                <circle cx="82" cy="86" r="7" stroke="#1a1a1a" strokeWidth="1.5" fill="none" opacity="0.3"/>
                <path d="M82,93 L87,124" stroke="#1a1a1a" strokeWidth="5" strokeLinecap="round" opacity="0.3"/>
                <circle cx="87" cy="124" r="4.5" stroke="#1a1a1a" strokeWidth="1.3" opacity="0.3"/>
                <path d="M87,128 L73,160" stroke="#1a1a1a" strokeWidth="4" strokeLinecap="round" opacity="0.3"/>
                <circle cx="73" cy="160" r="2.5" fill="#1a1a1a" opacity="0.12"/>

                {/* ═══ NEAR FRONT LEG — knee bends BACKWARD ═══ */}
                <circle cx="207" cy="86" r="8" stroke="#1a1a1a" strokeWidth="2" fill="none"/>
                <circle cx="207" cy="86" r="3" stroke="#1a1a1a" strokeWidth="0.8" opacity="0.25"/>
                {/* Upper leg */}
                <path d="M207,94 L212,126" stroke="#1a1a1a" strokeWidth="6" strokeLinecap="round"/>
                {/* Knee */}
                <circle cx="212" cy="126" r="5" stroke="#1a1a1a" strokeWidth="1.8"/>
                <circle cx="212" cy="126" r="2" stroke="#1a1a1a" strokeWidth="0.7" opacity="0.25"/>
                {/* Lower leg — backward */}
                <path d="M212,131 L198,162" stroke="#1a1a1a" strokeWidth="4.5" strokeLinecap="round"/>
                {/* Foot */}
                <circle cx="198" cy="162" r="3" fill="#1a1a1a" opacity="0.2"/>

                {/* ═══ NEAR REAR LEG — knee bends BACKWARD ═══ */}
                <circle cx="88" cy="86" r="8" stroke="#1a1a1a" strokeWidth="2" fill="none"/>
                <circle cx="88" cy="86" r="3" stroke="#1a1a1a" strokeWidth="0.8" opacity="0.25"/>
                {/* Upper leg */}
                <path d="M88,94 L93,126" stroke="#1a1a1a" strokeWidth="6" strokeLinecap="round"/>
                {/* Knee */}
                <circle cx="93" cy="126" r="5" stroke="#1a1a1a" strokeWidth="1.8"/>
                <circle cx="93" cy="126" r="2" stroke="#1a1a1a" strokeWidth="0.7" opacity="0.25"/>
                {/* Lower leg — backward */}
                <path d="M93,131 L79,162" stroke="#1a1a1a" strokeWidth="4.5" strokeLinecap="round"/>
                {/* Foot */}
                <circle cx="79" cy="162" r="3" fill="#1a1a1a" opacity="0.2"/>

                {/* Ground line */}
                <line x1="40" y1="172" x2="260" y2="172" stroke="#1a1a1a" strokeWidth="0.5" opacity="0.08" strokeDasharray="4 3"/>
              </svg>
              <div style={{ fontSize: 12, fontWeight: 600, color: T.muted, letterSpacing: "0.05em", textTransform: "uppercase" }}>Quadruped</div>
            </div>

            {/* Humanoid — detailed */}
            <div style={{ padding: "28px 16px", borderRadius: T.radiusXl, border: sectionBorder, background: "rgba(255,255,255,0.7)", backdropFilter: "blur(24px)", display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
              <svg width="120" height="100" viewBox="0 0 200 260" fill="none" style={{ opacity: 0.6 }}>
                <path d="M82 12 h36 q8 0 8 8 v22 q0 8 -8 8 H82 q-8 0 -8 -8 V20 q0 -8 8 -8z" stroke="#000" strokeWidth="2.5" fill="none"/>
                <line x1="84" y1="28" x2="116" y2="28" stroke="#000" strokeWidth="2" strokeLinecap="round"/>
                <path d="M86 50 h28" stroke="#000" strokeWidth="1" opacity="0.25"/>
                <rect x="92" y="50" width="16" height="12" rx="4" stroke="#000" strokeWidth="1.5"/>
                <line x1="96" y1="52" x2="96" y2="60" stroke="#000" strokeWidth="0.6" opacity="0.3"/>
                <line x1="104" y1="52" x2="104" y2="60" stroke="#000" strokeWidth="0.6" opacity="0.3"/>
                <path d="M66 62 h68 q6 0 6 6 v50 q0 4 -4 4 H64 q-4 0 -4 -4 V68 q0 -6 6 -6z" stroke="#000" strokeWidth="2.5" fill="none"/>
                <rect x="80" y="72" width="40" height="20" rx="3" stroke="#000" strokeWidth="1" opacity="0.3"/>
                <circle cx="100" cy="82" r="5" stroke="#000" strokeWidth="0.8" opacity="0.25" strokeDasharray="2 2"/>
                <line x1="100" y1="92" x2="100" y2="118" stroke="#000" strokeWidth="0.6" opacity="0.2"/>
                <line x1="66" y1="80" x2="72" y2="80" stroke="#000" strokeWidth="0.6" opacity="0.2"/>
                <line x1="128" y1="80" x2="134" y2="80" stroke="#000" strokeWidth="0.6" opacity="0.2"/>
                <circle cx="60" cy="68" r="6" stroke="#000" strokeWidth="1.5"/>
                <path d="M54 68 L42 95" stroke="#000" strokeWidth="2.5" strokeLinecap="round"/>
                <circle cx="42" cy="95" r="4.5" stroke="#000" strokeWidth="1.2"/>
                <path d="M42 99 L36 124" stroke="#000" strokeWidth="2" strokeLinecap="round"/>
                <rect x="30" y="124" width="12" height="8" rx="3" stroke="#000" strokeWidth="1.5"/>
                <circle cx="140" cy="68" r="6" stroke="#000" strokeWidth="1.5"/>
                <path d="M146 68 L158 95" stroke="#000" strokeWidth="2.5" strokeLinecap="round"/>
                <circle cx="158" cy="95" r="4.5" stroke="#000" strokeWidth="1.2"/>
                <path d="M158 99 L164 124" stroke="#000" strokeWidth="2" strokeLinecap="round"/>
                <rect x="158" y="124" width="12" height="8" rx="3" stroke="#000" strokeWidth="1.5"/>
                <rect x="72" y="122" width="56" height="16" rx="4" stroke="#000" strokeWidth="2" fill="none"/>
                <line x1="100" y1="126" x2="100" y2="134" stroke="#000" strokeWidth="0.6" opacity="0.3"/>
                <circle cx="84" cy="142" r="5" stroke="#000" strokeWidth="1.5"/>
                <path d="M84 147 L78 180" stroke="#000" strokeWidth="2.5" strokeLinecap="round"/>
                <circle cx="78" cy="180" r="4" stroke="#000" strokeWidth="1.2"/>
                <path d="M78 184 L82 215" stroke="#000" strokeWidth="2" strokeLinecap="round"/>
                <path d="M72 215 h18 q4 0 4 3 v4 q0 2 -3 2 H72 q-3 0 -3 -2 v-4 q0 -3 4 -3z" stroke="#000" strokeWidth="1.5" fill="none"/>
                <circle cx="116" cy="142" r="5" stroke="#000" strokeWidth="1.5"/>
                <path d="M116 147 L122 180" stroke="#000" strokeWidth="2.5" strokeLinecap="round"/>
                <circle cx="122" cy="180" r="4" stroke="#000" strokeWidth="1.2"/>
                <path d="M122 184 L118 215" stroke="#000" strokeWidth="2" strokeLinecap="round"/>
                <path d="M108 215 h18 q4 0 4 3 v4 q0 2 -3 2 H108 q-3 0 -3 -2 v-4 q0 -3 4 -3z" stroke="#000" strokeWidth="1.5" fill="none"/>
                <line x1="175" y1="12" x2="175" y2="224" stroke="#000" strokeWidth="0.5" opacity="0.12" strokeDasharray="4 3"/>
                <line x1="172" y1="12" x2="178" y2="12" stroke="#000" strokeWidth="0.5" opacity="0.12"/>
                <line x1="172" y1="224" x2="178" y2="224" stroke="#000" strokeWidth="0.5" opacity="0.12"/>
              </svg>
              <div style={{ fontSize: 12, fontWeight: 600, color: T.muted, letterSpacing: "0.05em", textTransform: "uppercase" }}>Humanoid</div>
            </div>

            {/* Drone — detailed top-down */}
            <div style={{ padding: "28px 16px", borderRadius: T.radiusXl, border: sectionBorder, background: "rgba(255,255,255,0.7)", backdropFilter: "blur(24px)", display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
              <svg width="120" height="100" viewBox="0 0 240 200" fill="none" style={{ opacity: 0.6 }}>
                <path d="M95 80 h50 q10 0 10 10 v20 q0 10 -10 10 H95 q-10 0 -10 -10 V90 q0 -10 10 -10z" stroke="#000" strokeWidth="2.5" fill="none"/>
                <rect x="105" y="88" width="30" height="8" rx="2" stroke="#000" strokeWidth="0.8" opacity="0.3"/>
                <circle cx="120" cy="100" r="6" stroke="#000" strokeWidth="1" opacity="0.25" strokeDasharray="2 2"/>
                <circle cx="120" cy="118" r="4" stroke="#000" strokeWidth="1.5"/>
                <circle cx="120" cy="118" r="1.5" fill="#000" opacity="0.3"/>
                <path d="M90 86 L50 50" stroke="#000" strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M150 86 L190 50" stroke="#000" strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M90 114 L50 150" stroke="#000" strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M150 114 L190 150" stroke="#000" strokeWidth="2.5" strokeLinecap="round"/>
                <circle cx="50" cy="50" r="6" stroke="#000" strokeWidth="2" fill="none"/>
                <circle cx="190" cy="50" r="6" stroke="#000" strokeWidth="2" fill="none"/>
                <circle cx="50" cy="150" r="6" stroke="#000" strokeWidth="2" fill="none"/>
                <circle cx="190" cy="150" r="6" stroke="#000" strokeWidth="2" fill="none"/>
                <circle cx="50" cy="50" r="22" stroke="#000" strokeWidth="1" strokeDasharray="4 3" opacity="0.35"/>
                <circle cx="190" cy="50" r="22" stroke="#000" strokeWidth="1" strokeDasharray="4 3" opacity="0.35"/>
                <circle cx="50" cy="150" r="22" stroke="#000" strokeWidth="1" strokeDasharray="4 3" opacity="0.35"/>
                <circle cx="190" cy="150" r="22" stroke="#000" strokeWidth="1" strokeDasharray="4 3" opacity="0.35"/>
                <line x1="32" y1="50" x2="68" y2="50" stroke="#000" strokeWidth="0.8" opacity="0.2"/>
                <line x1="50" y1="32" x2="50" y2="68" stroke="#000" strokeWidth="0.8" opacity="0.2"/>
                <line x1="172" y1="50" x2="208" y2="50" stroke="#000" strokeWidth="0.8" opacity="0.2"/>
                <line x1="190" y1="32" x2="190" y2="68" stroke="#000" strokeWidth="0.8" opacity="0.2"/>
                <path d="M100 120 L96 140 L90 140" stroke="#000" strokeWidth="1.2" strokeLinecap="round" opacity="0.45"/>
                <path d="M140 120 L144 140 L150 140" stroke="#000" strokeWidth="1.2" strokeLinecap="round" opacity="0.45"/>
                <line x1="120" y1="80" x2="120" y2="72" stroke="#000" strokeWidth="1" opacity="0.4"/>
                <circle cx="120" cy="70" r="2" stroke="#000" strokeWidth="0.8" opacity="0.4"/>
                <circle cx="46" cy="46" r="1.5" fill="#10B981" opacity="0.6"/>
                <circle cx="194" cy="46" r="1.5" fill="#EF4444" opacity="0.6"/>
              </svg>
              <div style={{ fontSize: 12, fontWeight: 600, color: T.muted, letterSpacing: "0.05em", textTransform: "uppercase" }}>Aerial</div>
            </div>

            {/* Industrial Robot Arm — detailed */}
            <div style={{ padding: "28px 16px", borderRadius: T.radiusXl, border: sectionBorder, background: "rgba(255,255,255,0.7)", backdropFilter: "blur(24px)", display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
              <svg width="120" height="100" viewBox="0 0 220 220" fill="none" style={{ opacity: 0.6 }}>
                <ellipse cx="100" cy="200" rx="50" ry="12" stroke="#000" strokeWidth="2" fill="none"/>
                <ellipse cx="100" cy="196" rx="50" ry="12" stroke="#000" strokeWidth="0.6" opacity="0.15"/>
                {[65,85,115,135].map(x=><circle key={x} cx={x} cy="200" r="2" stroke="#000" strokeWidth="0.8" opacity="0.3"/>)}
                <rect x="82" y="172" width="36" height="28" rx="4" stroke="#000" strokeWidth="2.5" fill="none"/>
                <line x1="88" y1="178" x2="112" y2="178" stroke="#000" strokeWidth="0.6" opacity="0.2"/>
                <rect x="92" y="182" width="16" height="8" rx="2" stroke="#000" strokeWidth="0.6" opacity="0.25"/>
                <circle cx="100" cy="168" r="10" stroke="#000" strokeWidth="2.5"/>
                <circle cx="100" cy="168" r="3" stroke="#000" strokeWidth="1" opacity="0.3"/>
                <path d="M100 158 L70 100" stroke="#000" strokeWidth="4" strokeLinecap="round"/>
                <rect x="78" y="118" width="14" height="32" rx="3" stroke="#000" strokeWidth="1" opacity="0.2" transform="rotate(-28 85 134)"/>
                <circle cx="70" cy="100" r="8" stroke="#000" strokeWidth="2"/>
                <circle cx="70" cy="100" r="2.5" stroke="#000" strokeWidth="0.8" opacity="0.3"/>
                <path d="M70 92 L130 52" stroke="#000" strokeWidth="3.5" strokeLinecap="round"/>
                <path d="M95 74 L100 70" stroke="#000" strokeWidth="0.6" opacity="0.25"/>
                <circle cx="130" cy="52" r="6" stroke="#000" strokeWidth="1.8"/>
                <circle cx="130" cy="52" r="2" stroke="#000" strokeWidth="0.6" opacity="0.3"/>
                <path d="M136 52 L158 44" stroke="#000" strokeWidth="2.5" strokeLinecap="round"/>
                <rect x="156" y="36" width="8" height="16" rx="2" stroke="#000" strokeWidth="1.5" fill="none"/>
                <path d="M164 38 L176 32" stroke="#000" strokeWidth="2" strokeLinecap="round"/>
                <path d="M164 50 L176 56" stroke="#000" strokeWidth="2" strokeLinecap="round"/>
                <path d="M176 32 L180 34" stroke="#000" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M176 56 L180 54" stroke="#000" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M60 160 A 80 80 0 0 1 20 100" stroke="#000" strokeWidth="0.5" strokeDasharray="4 4" opacity="0.12"/>
                <path d="M20 100 A 80 80 0 0 1 60 40" stroke="#000" strokeWidth="0.5" strokeDasharray="4 4" opacity="0.12"/>
                <path d="M140 58 A 30 30 0 0 0 150 30" stroke="#000" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.12"/>
                <path d="M96 168 Q80 150 82 130 Q84 115 76 105" stroke="#000" strokeWidth="0.7" opacity="0.15" fill="none"/>
              </svg>
              <div style={{ fontSize: 12, fontWeight: 600, color: T.muted, letterSpacing: "0.05em", textTransform: "uppercase" }}>Industrial</div>
            </div>
          </div>

          <h1 style={{ fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 500, letterSpacing: "-0.04em", lineHeight: 1.08, marginBottom: 20, maxWidth: 800 }}>
            The open network for<br />robot operations
          </h1>
          <p style={{ fontSize: 17, color: T.muted, maxWidth: 680, lineHeight: 1.6, marginBottom: 32 }}>
            Connect, control, and monetize robots globally. Modulr lets anyone rent or deploy robots for practical, real-world work — powered by an open network that brings robots, AI, data, and compute into one seamless interface.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
            <Link href="https://app.modulr.cloud/" target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", height: 48, padding: "0 28px", background: T.accent, color: T.accentFg, borderRadius: T.radiusPill, fontSize: 15, fontWeight: 600, textDecoration: "none" }}>
              Launch App
            </Link>
            <Link href="https://calendly.com/d/cxn4-g4x-5sh/modulr-20min-product-demo" target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", height: 48, padding: "0 28px", background: "#fff", color: T.text, borderRadius: T.radiusPill, fontSize: 15, fontWeight: 500, textDecoration: "none", border: sectionBorder }}>
              Book a Demo
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════ USE CASES SLIDER ════════════ */}
      <section style={{ borderTop: sectionBorder, padding: "80px 0" }}>
        <div style={{ maxWidth: T.maxW, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 500, letterSpacing: "-0.03em" }}>
              Use Cases
            </h2>
            <p style={{ marginTop: 8, fontSize: 16, color: T.muted, maxWidth: 640, lineHeight: 1.65 }}>
              From factory floors to space exploration, Modulr powers real-time robotic control in the most demanding environments.
            </p>
          </div>
          <div
            ref={sliderRef}
            style={{
              display: "flex",
              gap: 20,
              overflowX: "auto",
              scrollSnapType: "x mandatory",
              paddingBottom: 8,
              scrollbarWidth: "none",
            }}
          >
            {useCases.map((uc, idx) => (
              <div
                key={uc.title}
                onClick={() => setActiveUseCase(idx)}
                style={{
                  minWidth: "min(380px, 85vw)",
                  maxWidth: "min(380px, 85vw)",
                  scrollSnapAlign: "start",
                  cursor: "pointer",
                  opacity: activeUseCase === idx ? 1 : 0.6,
                  transform: activeUseCase === idx ? "scale(1)" : "scale(0.97)",
                  transition: "all 0.4s ease",
                }}
              >
                <div style={{
                  position: "relative",
                  height: 440,
                  borderRadius: T.radiusXl,
                  overflow: "hidden",
                  background: uc.gradient,
                }}>
                  <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.08 }} viewBox="0 0 400 440" preserveAspectRatio="none">
                    {Array.from({ length: 15 }, (_, i) => (
                      <path key={i} d={`M 0 ${20 + i * 28} Q 100 ${8 + i * 28} 200 ${20 + i * 28} T 400 ${20 + i * 28}`} fill="none" stroke="#fff" strokeWidth="1" />
                    ))}
                  </svg>

                  <div style={{ position: "absolute", bottom: 20, left: 20, right: 20, display: "flex", flexDirection: "column", gap: 8 }}>
                    {uc.chatMessages.map((msg, mi) => (
                      <div key={mi} style={{
                        alignSelf: msg.from === "user" ? "flex-end" : "flex-start",
                        background: msg.from === "user" ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.3)",
                        backdropFilter: "blur(12px)",
                        borderRadius: 16,
                        padding: "10px 14px",
                        maxWidth: "80%",
                        fontSize: 13,
                        color: "#fff",
                        lineHeight: 1.4,
                      }}>
                        {msg.text}
                      </div>
                    ))}
                  </div>

                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, padding: "24px 24px 0" }}>
                    <div style={{ fontSize: 28, fontWeight: 600, color: "#fff", letterSpacing: "-0.02em" }}>{uc.title}</div>
                  </div>
                </div>

                <p style={{ marginTop: 16, fontSize: 15, color: T.muted, lineHeight: 1.55, paddingRight: 16 }}>
                  <strong style={{ color: T.text }}>{uc.title}</strong>{uc.desc}
                </p>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 32 }}>
            <button
              onClick={() => setActiveUseCase((p) => Math.max(0, p - 1))}
              style={{ width: 40, height: 40, borderRadius: "50%", border: sectionBorder, background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 12L6 8l4-4" stroke={T.text} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <button
              onClick={() => setActiveUseCase((p) => Math.min(useCases.length - 1, p + 1))}
              style={{ width: 40, height: 40, borderRadius: "50%", border: sectionBorder, background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke={T.text} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>
        </div>
      </section>

      {/* ════════════ PLATFORM FEATURES ════════════ */}
      <section style={{ borderTop: sectionBorder, padding: "80px 24px", background: T.surface }}>
        <div style={{ maxWidth: T.maxW, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(28px, 3.5vw, 40px)", fontWeight: 500, letterSpacing: "-0.03em", marginBottom: 8 }}>Real-Time Teleoperation</h2>
          <p style={{ fontSize: 17, color: T.muted, maxWidth: 640, marginBottom: 48, lineHeight: 1.6 }}>
            Operate any robot from anywhere with real-time video streaming, precise control, and enterprise-grade safety guardrails.
          </p>

          <div className="el-g-split" style={{ gap: 48, alignItems: "start" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {platformFeatures.map((f, idx) => (
                <div
                  key={idx}
                  onClick={() => setActivePlatform(idx)}
                  style={{ borderBottom: sectionBorder, padding: "24px 0", cursor: "pointer" }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <h3 style={{ fontSize: 17, fontWeight: activePlatform === idx ? 600 : 500, color: activePlatform === idx ? T.text : T.muted, transition: "all 0.3s" }}>
                      {f.title}
                    </h3>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ transform: activePlatform === idx ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.3s" }}>
                      <path d="M4 6l4 4 4-4" stroke={T.text} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div style={{ maxHeight: activePlatform === idx ? 200 : 0, overflow: "hidden", transition: "max-height 0.4s ease" }}>
                    <p style={{ fontSize: 15, color: T.muted, lineHeight: 1.6, paddingTop: 12 }}>{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Visual — operator cockpit screenshot */}
            <div style={{
              borderRadius: T.radiusXl,
              overflow: "hidden",
              background: "#000",
              minHeight: 400,
              position: "relative",
              border: sectionBorder,
            }}>
              <Image 
                src="/session-history-screenshot.png" 
                alt="Modulr Operator Cockpit Session History" 
                fill 
                style={{ objectFit: "cover", objectPosition: "left top" }} 
              />
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ HOW IT WORKS ════════════ */}
      <section style={{ borderTop: sectionBorder, padding: "80px 24px" }}>
        <div style={{ maxWidth: T.maxW, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(28px, 3.5vw, 40px)", fontWeight: 500, letterSpacing: "-0.03em", marginBottom: 8 }}>How it works</h2>
          <p style={{ fontSize: 20, fontWeight: 500, color: T.text, marginBottom: 48 }}>Three steps to go live</p>

          <div className="el-g3" style={{ gap: 20 }}>
            {howItWorks.map((step, i) => (
              <div key={step.title} style={{ padding: 32, borderRadius: T.radiusXl, border: sectionBorder, background: "#fff" }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: i === 0 ? T.accent : T.surface, color: i === 0 ? "#fff" : T.text, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 700, marginBottom: 20, border: i === 0 ? "none" : sectionBorder }}>
                  {i + 1}
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 10, letterSpacing: "-0.01em" }}>{step.title}</h3>
                <p style={{ fontSize: 14, color: T.muted, lineHeight: 1.6 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ CAPABILITIES ════════════ */}
      <section style={{ borderTop: sectionBorder, padding: "80px 24px", background: T.surface }}>
        <div style={{ maxWidth: T.maxW, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(28px, 3.5vw, 40px)", fontWeight: 500, letterSpacing: "-0.03em", marginBottom: 48 }}>Built for operators</h2>
          <div className="el-g4" style={{ gap: 20 }}>
            {capabilities.map((cap) => (
              <div key={cap.title} style={{ padding: 24, borderRadius: T.radiusLg, border: sectionBorder, background: "#fff" }}>
                <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{cap.title}</h3>
                <p style={{ fontSize: 14, color: T.muted, lineHeight: 1.6 }}>{cap.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ FULLY CUSTOMIZABLE ════════════ */}
      <section style={{ borderTop: sectionBorder, padding: "80px 24px" }}>
        <div style={{ maxWidth: T.maxW, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(28px, 3.5vw, 40px)", fontWeight: 500, letterSpacing: "-0.03em", marginBottom: 8 }}>The Modulr advantage</h2>
          <p style={{ fontSize: 17, color: T.muted, marginBottom: 48 }}>Why operators and robot owners choose Modulr</p>

          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {customCards.map((card) => (
              <div key={card.kicker} className="el-g-platform-inner" style={{ borderRadius: T.radiusXl, overflow: "hidden", border: sectionBorder, background: "#fff" }}>
                <div className="el-card-inner-text" style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: T.muted, textTransform: "uppercase" as const, letterSpacing: "0.06em", marginBottom: 12 }}>{card.kicker}</div>
                  <h3 style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.3, marginBottom: 12 }}>{card.title}</h3>
                  <p style={{ fontSize: 15, color: T.muted, lineHeight: 1.6 }}>{card.desc}</p>
                </div>
                <div style={{ background: card.gradient, minHeight: 260, position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", inset: 0, background: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.15'/%3E%3C/svg%3E\")", backgroundSize: "256px 256px", mixBlendMode: "overlay" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ DEVELOPER TOOLKIT ════════════ */}
      <section style={{ borderTop: sectionBorder, padding: "80px 24px", background: T.surface }}>
        <div style={{ maxWidth: T.maxW, margin: "0 auto" }}>
          <div style={{ maxWidth: 500, marginBottom: 48 }}>
            <h2 style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em", marginBottom: 8, lineHeight: 1.3 }}>Complete developer toolkit for connecting and operating robots at scale</h2>
          </div>
          <div className="el-g4" style={{ gap: 20 }}>
            {devTools.map((tool) => (
              <div key={tool.title} style={{ padding: 24, borderRadius: T.radiusLg, border: sectionBorder, background: "#fff" }}>
                <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{tool.title}</h3>
                <p style={{ fontSize: 14, color: T.muted, lineHeight: 1.6 }}>{tool.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 12, marginTop: 32 }}>
            <Link href="https://docs.modulr.cloud" target="_blank" rel="noreferrer" style={{ padding: "8px 20px", borderRadius: T.radiusPill, background: T.accent, color: T.accentFg, fontSize: 14, fontWeight: 600, textDecoration: "none" }}>Documentation</Link>
            <Link href="https://docs.modulr.cloud" target="_blank" rel="noreferrer" style={{ padding: "8px 20px", borderRadius: T.radiusPill, border: sectionBorder, background: "#fff", color: T.text, fontSize: 14, fontWeight: 500, textDecoration: "none" }}>API Reference</Link>
          </div>
        </div>
      </section>

      {/* ════════════ FAQ ════════════ */}
      <section style={{ borderTop: sectionBorder, padding: "80px 24px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(28px, 3.5vw, 40px)", fontWeight: 500, letterSpacing: "-0.03em", marginBottom: 40, textAlign: "center" }}>Frequently asked questions</h2>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {faqs.map((faq, idx) => (
              <div key={idx} style={{ borderBottom: sectionBorder }}>
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 0", background: "none", border: "none", cursor: "pointer", textAlign: "left", fontSize: 16, fontWeight: 500, color: T.text }}
                >
                  {faq.q}
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ transform: openFaq === idx ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.3s", flexShrink: 0, marginLeft: 12 }}>
                    <path d="M4 6l4 4 4-4" stroke={T.text} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <div style={{ maxHeight: openFaq === idx ? 200 : 0, overflow: "hidden", transition: "max-height 0.4s ease" }}>
                  <p style={{ fontSize: 15, color: T.muted, lineHeight: 1.6, paddingBottom: 20 }}>{faq.a}</p>
                </div>
              </div>
            ))}
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
