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
  gold: "#f2b400",
  radius: 16,
  radiusLg: 24,
  radiusXl: 32,
  radiusPill: 999,
  maxW: 1200,
  sectionPy: "clamp(80px, 10vw, 140px)",
};

const sectionBorder = `1px solid ${T.border}`;

/* ───────────────────────── NAV ITEMS ───────────────────────── */
const navItems = [
  { label: "Robots", href: "/robots" },
  { label: "Web3", href: "/web3" },
  { label: "Research", href: "/research" },
  { label: "News", href: "/news" },
  { label: "Team", href: "/team" },
  { label: "Brand Kit", href: "/brand-kit" },
];

/* ───────────────────────── HERO FEATURES GRID ───────────────────────── */
const heroFeatures = [
  { name: "Data Marketplace", desc: "Buy & sell robot telemetry, sensor recordings, and training datasets", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4.03 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/></svg> },
  { name: "Staking & Validation", desc: "Secure the network and earn proportional rewards", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg> },
  { name: "Governance", desc: "Vote on protocol upgrades and network parameters", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/><path d="M9 15l2 2 4-4"/></svg> },
  { name: "Compute Credits", desc: "Distributed GPU/TPU resources for AI training", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M9 9h6v6H9z"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3"/></svg> },
  { name: "Multi-chain Bridge", desc: "Interoperability with Ethereum, Base, and Solana", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg> },
  { name: "Instant Payments", desc: "Sub-2-second settlement with zero intermediaries", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg> },
  { name: "Smart Contract SLAs", desc: "Automated service-level agreements for robot operations", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg> },
  { name: "Data Sovereignty", desc: "Full control over your telemetry — share, sell, or keep private", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/><circle cx="12" cy="16" r="1"/></svg> },
];

/* ───────────────────────── BUILD/STAKE/GOVERN TABS ───────────────────────── */
const bsgTabs = [
  {
    tab: "Build",
    title: "Build on the decentralized robot economy",
    desc: "Use Modulr's APIs, SDKs, and smart contracts to create applications that interact with robots, trade data, and manage compute resources — all secured by the blockchain.",
    features: ["TypeScript & Python SDKs", "Smart contract templates", "Data marketplace API", "WebSocket real-time feeds"],
    code: `import { Modulr } from '@modulr/sdk';\n\nconst client = new Modulr({\n  network: 'mainnet',\n  apiKey: process.env.MODULR_KEY\n});\n\n// Purchase training data\nconst dataset = await client.data.purchase({\n  id: 'lidar-warehouse-v3',\n  price: 500 // MDR tokens\n});\n\nconsole.log('Dataset acquired:', dataset.name);`,
  },
  {
    tab: "Stake",
    title: "Stake MDR to secure the network and earn rewards",
    desc: "Validators stake MDR tokens to secure robot operations, verify data integrity, and ensure session safety. In return, they earn a proportional share of all network fees.",
    features: ["12.4% estimated APY", "Minimum stake: 1,000 MDR", "Auto-compounding rewards", "Slashing protection"],
    code: `import { Modulr } from '@modulr/sdk';\n\nconst client = new Modulr({ network: 'mainnet' });\n\n// Stake tokens as validator\nconst stake = await client.staking.stake({\n  amount: 10_000,  // MDR tokens\n  validator: 'validator-node-42',\n  autoCompound: true\n});\n\nconsole.log('Staked:', stake.amount, 'MDR');\nconsole.log('Est. APY:', stake.estimatedAPY);`,
  },
  {
    tab: "Govern",
    title: "Shape the future of the protocol with on-chain governance",
    desc: "Every MDR holder can propose and vote on protocol changes — fee structures, safety standards, network upgrades, and more. One token, one voice.",
    features: ["On-chain proposal system", "Transparent voting", "Time-locked execution", "Community treasury"],
    code: `import { Modulr } from '@modulr/sdk';\n\nconst client = new Modulr({ network: 'mainnet' });\n\n// Vote on active proposal\nconst vote = await client.governance.vote({\n  proposalId: 48,\n  vote: 'YES',\n  weight: 5000 // MDR voting power\n});\n\nconsole.log('Voted on:', vote.proposal.title);\nconsole.log('Current tally:', vote.tally);`,
  },
];

/* ───────────────────────── PROTOCOL TECH TABS ───────────────────────── */
const protocolTabs = [
  { name: "Consensus", label: "WASM Runtime", desc: "Modulr uses a custom WASM-based consensus engine optimized for high-throughput robot telemetry. Validators run lightweight nodes that achieve finality in 1.2 seconds.", metric: "1.2s", metricLabel: "Block finality", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"/><line x1="12" y1="22" x2="12" y2="15.5"/><line x1="22" y1="8.5" x2="12" y2="15.5"/><line x1="2" y1="8.5" x2="12" y2="15.5"/></svg> },
  { name: "Smart Contracts", label: "SLA Engine", desc: "Deploy programmable service-level agreements for robot operations. Define uptime guarantees, performance benchmarks, and automated penalty/reward logic — all enforced on-chain.", metric: "12K+", metricLabel: "Contracts deployed", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8M16 17H8M10 9H8"/></svg> },
  { name: "Bridge", label: "Cross-chain", desc: "Seamlessly move MDR tokens and data NFTs between Modulr, Ethereum, Base, and Solana. Trustless bridge with cryptographic verification at every step.", metric: "4", metricLabel: "Connected chains", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg> },
  { name: "Storage", label: "Decentralized", desc: "Robot telemetry, training data, and simulation environments are stored on a decentralized storage layer with redundancy, content addressing, and automatic replication.", metric: "2.4PB", metricLabel: "Data stored", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4.03 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/></svg> },
  { name: "Compute", label: "GPU Cluster", desc: "Access distributed GPU/TPU compute for AI model training, real-time inference, and physics simulation. Pay-per-use with no vendor lock-in.", metric: "50K+", metricLabel: "GPU hours/day", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M9 9h6v6H9z"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3"/></svg> },
];

/* ───────────────────────── WORKSPACE CARDS ───────────────────────── */
const workspaceCards = [
  { title: "Unified protocol", desc: "Session payments, data trades, staking, governance, and compute credits — all managed through a single protocol layer, not fragmented across vendors.", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg> },
  { title: "Explorer & dashboard", desc: "Monitor network health, track transactions, inspect validator performance, and audit every session — all from a browser-based interface.", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg> },
  { title: "Templates & automation", desc: "Skip complex setup with pre-built smart contract templates for common robot operation patterns: rental SLAs, data bounties, compute auctions.", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg> },
  { title: "Permissions & compliance", desc: "Role-based access control, multi-sig wallets, audit logs, and regulatory compliance tools — ready for enterprise deployment.", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
];

/* ───────────────────────── ECOSYSTEM QUOTES ───────────────────────── */
const ecosystemQuotes = [
  { quote: "Modulr's decentralized approach to robot data and payments eliminates the vendor lock-in we've struggled with for years.", metric: "90%", metricLabel: "Faster settlement", company: "RoboFleet Inc." },
  { quote: "The on-chain audit trail gives us complete transparency into every robot session — something no centralized platform could offer.", metric: "100%", metricLabel: "Audit coverage", company: "SafeBot Labs" },
  { quote: "Being able to stake MDR and earn from network validation is a game-changer for our idle compute infrastructure.", metric: "12.4%", metricLabel: "Staking APY", company: "CloudMesh" },
];

/* ───────────────────────── COMPARISON ───────────────────────── */
const comparisonRows = [
  { feature: "Payment Settlement", traditional: "3-5 business days", modulr: "< 2 seconds" },
  { feature: "Data Ownership", traditional: "Platform-controlled", modulr: "Owner-controlled" },
  { feature: "Vendor Lock-in", traditional: "High", modulr: "None" },
  { feature: "Audit Trail", traditional: "Internal logs", modulr: "On-chain, immutable" },
  { feature: "Global Access", traditional: "Region-restricted", modulr: "Permissionless" },
  { feature: "Governance", traditional: "Corporate decisions", modulr: "Token holder voting" },
];

/* ───────────────────────── ROADMAP ───────────────────────── */
const roadmapItems = [
  { date: "Q4 2025", title: "Devnet & Testnet", items: ["Launch Modulr devnet/testnet", "Create blockchain explorer", "Early contributor rewards program"], done: true },
  { date: "Q1 2026", title: "Validator Network", items: ["Validator/node onboarding", "Blockchain integration with payments", "Governance framework launch"], done: true },
  { date: "Q2 2026", title: "Mainnet Launch", items: ["Modulr mainnet launch", "Data marketplace beta", "Staking & compute credits live"], done: false },
  { date: "Q3 2026", title: "Multi-chain", items: ["$MDR interoperability (Eth, Base, Solana)", "Smart contract SLAs for robot ops", "Digital twin registry expansion"], done: false },
  { date: "Q4 2026", title: "Ecosystem Scale", items: ["Decentralized GPU compute scaling", "Cross-chain robot payments", "Full ecosystem autonomy"], done: false },
];

/* ───────────────────────── SECURITY ───────────────────────── */
const securityFeatures = [
  { title: "End-to-end encryption", desc: "All robot sessions use TLS 1.3 and WebRTC DTLS. Control signals and video feeds are encrypted at every hop." },
  { title: "Zero-knowledge proofs", desc: "Verify robot data authenticity and session compliance without exposing raw telemetry. Privacy by design." },
  { title: "On-chain audit trail", desc: "Every session, payment, and governance vote is permanently recorded on the Modulr blockchain." },
  { title: "Hardware emergency stops", desc: "Physical emergency stop buttons on every robot, backed by protocol-level kill switches." },
];

/* ───────────────────────── FAQ ───────────────────────── */
const faqs = [
  { q: "What is the MDR token?", a: "MDR is the native utility token of the Modulr network. It's used for session payments, staking, governance voting, and compute credits. MDR will be available on Ethereum, Base, and Solana." },
  { q: "How does staking work?", a: "Validators stake MDR tokens to secure the network. In return, they earn a share of network fees proportional to their stake. Current estimated APY is 12.4%. Minimum stake: 1,000 MDR." },
  { q: "When is mainnet launching?", a: "Mainnet is targeted for Q2 2026. The testnet and explorer are already live. Early contributors can participate in the rewards program now." },
  { q: "Is Modulr compatible with other blockchains?", a: "Yes. Starting Q3 2026, MDR will be bridgeable to Ethereum, Base, and Solana. Smart contract SLAs for robot operations will be cross-chain compatible." },
  { q: "How do I become a validator?", a: "Install the Modulr validator client, stake the minimum MDR amount, and register your node. Full documentation is available at docs.modulr.cloud." },
  { q: "What is ElevenCreative vs ElevenAgents equivalent?", a: "Modulr has two core tracks: Robotics (hardware fleet management, teleoperation, AI models) and Web3 (blockchain payments, staking, governance, data marketplace). Together they form the full Modulr ecosystem." },
  { q: "How does the data marketplace work?", a: "Robot operators can list datasets (LiDAR scans, manipulation recordings, navigation logs) on the marketplace. Buyers pay in MDR tokens, and data is verified on-chain before delivery." },
  { q: "Are APIs available?", a: "Yes. All Modulr capabilities — including data marketplace, staking, governance, and compute credits — are available via REST APIs and TypeScript/Python SDKs." },
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

const glossyUseCases = [
  {
    title: "Fleet Support",
    desc: "Always-on support flows for robot operators, field teams, and customers with live context from the Modulr network.",
    kind: "support",
  },
  {
    title: "Mission Scheduling",
    desc: "Coordinate teleoperation windows, maintenance handoffs, and deployment queues across fleets and time zones.",
    kind: "schedule",
  },
  {
    title: "Simulation Training",
    desc: "Run guided rehearsal sessions for operators, model evaluators, and safety teams before real-world rollout.",
    kind: "training",
  },
  {
    title: "Marketplace Concierge",
    desc: "Guide buyers through dataset selection, provenance checks, and secure MDR settlement in one flow.",
    kind: "market",
  },
  {
    title: "Validator Operations",
    desc: "Monitor node health, reward flow, and network state with human-readable execution summaries.",
    kind: "validator",
  },
  {
    title: "Cross-chain Settlement",
    desc: "Bridge robot revenue, staking rewards, and treasury assets across Modulr, Ethereum, Base, and Solana.",
    kind: "bridge",
  },
];

function UseCaseVisual({ kind }: { kind: string }) {
  if (kind === "support") {
    return (
      <div style={{ position: "relative", height: 320, borderRadius: 28, overflow: "hidden", background: "linear-gradient(180deg, #ddefff 0%, #bfe1ff 45%, #11163e 100%)" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.06 }}>
          <svg width="100%" height="100%" viewBox="0 0 320 320" preserveAspectRatio="none">
            {Array.from({ length: 9 }, (_, i) => (
              <path key={i} d={`M0 ${i * 42} Q80 ${i * 42 - 18} 160 ${i * 42} T320 ${i * 42}`} fill="none" stroke="#000" strokeWidth="1" />
            ))}
          </svg>
        </div>
        <div style={{ position: "absolute", left: "50%", top: 24, transform: "translateX(-50%)", width: 188, height: 260, borderRadius: 32, border: "6px solid #0d0d0f", background: "linear-gradient(180deg, rgba(255,255,255,0.14), rgba(255,255,255,0.02))", boxShadow: "0 24px 50px rgba(0,0,0,0.22)" }}>
          <div style={{ position: "absolute", top: 10, left: "50%", transform: "translateX(-50%)", width: 70, height: 16, borderRadius: 999, background: "#000" }} />
          <div style={{ padding: "42px 18px 18px" }}>
            <div style={{ textAlign: "center", fontSize: 12, color: "rgba(0,0,0,0.55)", marginBottom: 4 }}>00:07</div>
            <div style={{ textAlign: "center", fontSize: 23, fontWeight: 500, color: "#111", marginBottom: 56 }}>Support</div>
            <div style={{ marginLeft: 18, marginBottom: 14, maxWidth: 116, padding: "12px 14px", borderRadius: 20, background: "#000", color: "#fff", fontSize: 11, lineHeight: 1.3 }}>
              Hey, my robot&apos;s frozen. Nothing&apos;s working.
            </div>
            <div style={{ marginRight: 10, marginBottom: 12, padding: "12px 14px", borderRadius: 18, background: "rgba(255,255,255,0.78)", backdropFilter: "blur(16px)", color: "#2d2d34", fontSize: 11, lineHeight: 1.3 }}>
              Ok. Let me check validator and session status real quick.
            </div>
            <div style={{ marginRight: 24, padding: "12px 14px", borderRadius: 18, background: "rgba(255,255,255,0.78)", backdropFilter: "blur(16px)", color: "#2d2d34", fontSize: 11, lineHeight: 1.3 }}>
              Syncing fleet logs and payment receipts...
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (kind === "schedule") {
    return (
      <div style={{ position: "relative", height: 320, borderRadius: 28, overflow: "hidden", background: "linear-gradient(180deg, #8ecbf5 0%, #bfe5ff 45%, #d8efff 100%)" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 50% 85%, rgba(255,255,255,0.4), transparent 40%)" }} />
        <div style={{ position: "absolute", inset: 0, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridTemplateRows: "52px repeat(3, 1fr)" }}>
          {Array.from({ length: 12 }, (_, i) => (
            <div key={i} style={{ borderRight: i % 3 === 2 ? "none" : "1px solid rgba(255,255,255,0.35)", borderBottom: i >= 9 ? "none" : "1px solid rgba(255,255,255,0.35)" }} />
          ))}
        </div>
        <div style={{ position: "absolute", top: 14, left: 18, right: 18, display: "flex", justifyContent: "space-between", fontSize: 13, color: "rgba(255,255,255,0.9)" }}>
          <span>Mon. June 5</span>
          <span>Tue. June 5</span>
          <span>Wed. June 6</span>
        </div>
        <div style={{ position: "absolute", left: 28, bottom: 94, display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 24, height: 24, borderRadius: "50%", background: "rgba(255,255,255,0.75)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "rgba(0,0,0,0.55)" }}>J</div>
          <div style={{ padding: "10px 14px", borderRadius: 18, background: "rgba(255,255,255,0.16)", color: "#fff", fontSize: 12, backdropFilter: "blur(14px)" }}>
            Yep, that works.
          </div>
        </div>
        <div style={{ position: "absolute", left: 28, bottom: 38, display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 24, height: 24, borderRadius: "50%", background: "rgba(255,255,255,0.55)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "radial-gradient(circle, #fff, rgba(255,255,255,0.2))" }} />
          </div>
          <div style={{ maxWidth: 210, color: "#fff", fontSize: 12, lineHeight: 1.35 }}>
            Great, thanks. We&apos;ll route the teleop team and reserve compute capacity for that slot.
          </div>
        </div>
        <div style={{ position: "absolute", left: 20, bottom: 18, width: 44, height: 44, borderRadius: "50%", background: "rgba(255,255,255,0.85)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 10px 24px rgba(0,0,0,0.08)" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.8"><path d="M4 10v4a4 4 0 004 4h2l4 3V7l-4 3H8a4 4 0 00-4 4z" /><path d="M19 9l2 2-2 2" /><path d="M21 9l-2 2 2 2" /></svg>
        </div>
      </div>
    );
  }

  if (kind === "training") {
    return (
      <div style={{ position: "relative", height: 320, borderRadius: 28, overflow: "hidden", background: "linear-gradient(180deg, #4ba9e8 0%, #85bef2 48%, #ded7f6 100%)" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 30% 80%, rgba(255,180,160,0.24), transparent 28%)" }} />
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 72, borderBottom: "1px solid rgba(255,255,255,0.35)" }} />
        <div style={{ position: "absolute", top: 26, left: 0, right: 0, textAlign: "center", color: "#fff" }}>
          <div style={{ fontSize: 15, fontWeight: 600 }}>Training Session</div>
          <div style={{ fontSize: 12, opacity: 0.8 }}>Warehouse emergency roleplay</div>
        </div>
        <div style={{ position: "absolute", top: 112, left: 0, right: 0, textAlign: "center", color: "#fff", fontSize: 19, fontWeight: 500 }}>00:12</div>
        <div style={{ position: "absolute", top: 150, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 12 }}>
          <div style={{ width: 52, height: 52, borderRadius: "50%", background: "rgba(255,255,255,0.18)", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(12px)" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8"><path d="M12 17a4 4 0 004-4V7a4 4 0 10-8 0v6a4 4 0 004 4z" /><path d="M19 11v2a7 7 0 01-14 0v-2" /><path d="M12 19v3" /></svg>
          </div>
          <div style={{ padding: "0 22px", height: 52, borderRadius: 999, background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 14, fontWeight: 500, backdropFilter: "blur(12px)" }}>
            End Session
          </div>
        </div>
        <div style={{ position: "absolute", left: 28, right: 28, bottom: 34, display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
            <div style={{ width: 24, height: 24, borderRadius: "50%", background: "rgba(255,210,200,0.8)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "#fff" }}>A</div>
            <div style={{ color: "#fff", fontSize: 12, lineHeight: 1.35, maxWidth: 210 }}>Ok, I am here to help. Can you tell me your location?</div>
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
            <div style={{ width: 24, height: 24, borderRadius: "50%", background: "rgba(255,255,255,0.14)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.2"><circle cx="12" cy="12" r="9" /><path d="M3 12h18" /><path d="M12 3a15 15 0 010 18" /><path d="M12 3a15 15 0 000 18" /></svg>
            </div>
            <div style={{ color: "#fff", fontSize: 12, lineHeight: 1.35, maxWidth: 236 }}>Uh-yes, I&apos;m near dock gate 3, in front of the charging station.</div>
          </div>
        </div>
      </div>
    );
  }

  if (kind === "market") {
    return (
      <div style={{ position: "relative", height: 320, borderRadius: 28, overflow: "hidden", background: "linear-gradient(180deg, #eef3ff 0%, #dfeaff 55%, #f7f7fb 100%)" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.07 }}>
          <svg width="100%" height="100%" viewBox="0 0 320 320" preserveAspectRatio="none">
            {Array.from({ length: 8 }, (_, i) => (
              <path key={i} d={`M0 ${i * 44} Q90 ${i * 44 - 18} 160 ${i * 44} T320 ${i * 44}`} fill="none" stroke="#000" strokeWidth="1" />
            ))}
          </svg>
        </div>
        <div style={{ position: "absolute", inset: 24, borderRadius: 24, background: "rgba(255,255,255,0.78)", backdropFilter: "blur(18px)", border: "1px solid rgba(255,255,255,0.65)", boxShadow: "0 18px 50px rgba(0,0,0,0.06)" }}>
          <div style={{ padding: 18, display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ fontSize: 13, fontWeight: 600 }}>Dataset Marketplace</div>
              <div style={{ fontSize: 11, color: T.muted2 }}>Live prices in MDR</div>
            </div>
            {[
              ["warehouse-lidar-v3", "500 MDR"],
              ["manipulation-demos-v2", "220 MDR"],
              ["sim-kitchen-env-v4", "1,200 MDR"],
            ].map(([name, price]) => (
              <div key={name} style={{ padding: "12px 14px", borderRadius: 16, background: "#fff", border: sectionBorder, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{name}</div>
                  <div style={{ fontSize: 11, color: T.muted }}>Verified provenance</div>
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: T.gold }}>{price}</div>
              </div>
            ))}
            <div style={{ marginTop: 8, padding: "12px 14px", borderRadius: 16, background: "#0f1116", color: "#fff", fontSize: 12, lineHeight: 1.45 }}>
              Purchase confirmed. Access keys issued and audit trail anchored on-chain.
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (kind === "validator") {
    return (
      <div style={{ position: "relative", height: 320, borderRadius: 28, overflow: "hidden", background: "linear-gradient(180deg, #e9eefb 0%, #dee7ff 48%, #eef2ff 100%)" }}>
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="240" height="240" viewBox="0 0 240 240" fill="none" style={{ opacity: 0.18 }}>
            <circle cx="120" cy="120" r="72" stroke={T.text} strokeWidth="1.2" />
            <ellipse cx="120" cy="120" rx="72" ry="26" stroke={T.text} strokeWidth="0.8" strokeDasharray="4 4" />
            <ellipse cx="120" cy="120" rx="28" ry="72" stroke={T.text} strokeWidth="0.8" strokeDasharray="4 4" />
            <line x1="48" y1="120" x2="192" y2="120" stroke={T.text} strokeWidth="0.8" />
            <line x1="120" y1="48" x2="120" y2="192" stroke={T.text} strokeWidth="0.8" />
            <circle cx="86" cy="82" r="4" fill={T.gold} />
            <circle cx="152" cy="94" r="4" fill={T.gold} />
            <circle cx="102" cy="156" r="4" fill={T.gold} />
            <circle cx="162" cy="148" r="4" fill={T.gold} />
          </svg>
        </div>
        <div style={{ position: "absolute", inset: 22, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div style={{ alignSelf: "flex-start", padding: "6px 12px", borderRadius: 999, background: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.55)", fontSize: 12, fontWeight: 500 }}>
            847 validators active
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10 }}>
            {[
              ["Block time", "1.2s"],
              ["Rewards", "12.4% APY"],
              ["Nodes", "40+ countries"],
              ["Uptime", "99.99%"],
            ].map(([label, value]) => (
              <div key={label} style={{ padding: "14px", borderRadius: 16, background: "rgba(255,255,255,0.72)", border: "1px solid rgba(255,255,255,0.55)", backdropFilter: "blur(16px)" }}>
                <div style={{ fontSize: 11, color: T.muted2, marginBottom: 4 }}>{label}</div>
                <div style={{ fontSize: 17, fontWeight: 700 }}>{value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: "relative", height: 320, borderRadius: 28, overflow: "hidden", background: "linear-gradient(180deg, #ebf1ff 0%, #dde8ff 45%, #f1efff 100%)" }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.08 }}>
        <svg width="100%" height="100%" viewBox="0 0 320 320" preserveAspectRatio="none">
          {Array.from({ length: 8 }, (_, i) => (
            <path key={i} d={`M0 ${i * 44} Q90 ${i * 44 + 18} 160 ${i * 44} T320 ${i * 44}`} fill="none" stroke="#000" strokeWidth="1" />
          ))}
        </svg>
      </div>
      <div style={{ position: "absolute", left: 26, right: 26, top: 30, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", borderRadius: 18, background: "rgba(255,255,255,0.74)", border: "1px solid rgba(255,255,255,0.55)", backdropFilter: "blur(16px)" }}>
        <div style={{ fontSize: 13, fontWeight: 600 }}>Bridge Settlement</div>
        <div style={{ fontSize: 11, color: "#10B981", fontWeight: 600 }}>Live</div>
      </div>
      <div style={{ position: "absolute", left: 38, right: 38, top: 108, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {["ETH", "MDR", "SOL"].map((token, i) => (
          <div key={token} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
            <div style={{ width: i === 1 ? 62 : 52, height: i === 1 ? 62 : 52, borderRadius: "50%", background: i === 1 ? `linear-gradient(135deg, ${T.gold}, #c89200)` : i === 0 ? "linear-gradient(135deg, #627eea, #3b4874)" : "linear-gradient(135deg, #9945FF, #14F195)", color: i === 1 ? "#000" : "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, boxShadow: "0 10px 24px rgba(0,0,0,0.08)" }}>
              {token}
            </div>
            <div style={{ fontSize: 11, color: T.muted2 }}>{token === "MDR" ? "Modulr" : token === "ETH" ? "Ethereum" : "Solana"}</div>
          </div>
        ))}
      </div>
      <svg width="100%" height="100%" viewBox="0 0 320 320" style={{ position: "absolute", inset: 0, opacity: 0.2 }}>
        <line x1="88" y1="138" x2="160" y2="138" stroke="#000" strokeWidth="1.2" strokeDasharray="5 5" />
        <line x1="160" y1="138" x2="232" y2="138" stroke="#000" strokeWidth="1.2" strokeDasharray="5 5" />
      </svg>
      <div style={{ position: "absolute", left: 26, right: 26, bottom: 30, padding: "14px 16px", borderRadius: 18, background: "rgba(255,255,255,0.76)", border: "1px solid rgba(255,255,255,0.55)", backdropFilter: "blur(16px)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 13, fontWeight: 500 }}>1.0 ETH -&gt; 2,480 MDR -&gt; 12 SOL</span>
        <span style={{ fontSize: 12, fontWeight: 700, color: "#10B981" }}>Verified</span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   PAGE COMPONENT
   ═══════════════════════════════════════════════════════════════════ */
export default function Web3Page() {
  const [activeRoadmapIdx, setActiveRoadmapIdx] = useState(2);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [mobileNav, setMobileNav] = useState(false);
  const [bsgTab, setBsgTab] = useState(0);
  const [protoTab, setProtoTab] = useState(0);
  const [globeTilt, setGlobeTilt] = useState({ x: 0, y: 0 });

  /* Auto-rotate Build/Stake/Govern tabs */
  useEffect(() => {
    const id = setInterval(() => setBsgTab((p) => (p + 1) % bsgTabs.length), 6000);
    return () => clearInterval(id);
  }, []);

  /* Auto-rotate Protocol tech tabs */
  useEffect(() => {
    const id = setInterval(() => setProtoTab((p) => (p + 1) % protocolTabs.length), 5000);
    return () => clearInterval(id);
  }, []);

  const activeBsg = bsgTabs[bsgTab];
  const activeProto = protocolTabs[protoTab];
  const updateGlobeTilt = (clientX: number, clientY: number, rect: DOMRect) => {
    const x = (clientX - rect.left) / rect.width - 0.5;
    const y = (clientY - rect.top) / rect.height - 0.5;
    setGlobeTilt({ x, y });
  };

  return (
    <div style={{ background: T.bg, color: T.text, fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>

      {/* ════════════ HEADER ════════════ */}
      <header style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(255,255,255,0.82)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", borderBottom: sectionBorder }}>
        <div style={{ maxWidth: T.maxW, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, fontWeight: 700, fontSize: 18, color: T.text, textDecoration: "none", letterSpacing: "-0.02em" }}><Image src="/Modulr_logo.png" alt="Modulr" width={28} height={28} style={{ objectFit: "contain" }} unoptimized />Modulr</Link>
            <nav className="el-desktop-only" style={{ gap: 4 }}>
              {navItems.map((item) => (
                <Link key={item.label} href={item.href} style={{ padding: "6px 12px", fontSize: 14, color: item.href === "/web3" ? T.text : T.muted, fontWeight: item.href === "/web3" ? 600 : 400, textDecoration: "none", borderRadius: 8 }}>
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Link href="https://testnet.explorer.modulr.cloud/" target="_blank" rel="noreferrer" className="el-desktop-only" style={{ padding: "8px 18px", fontSize: 14, fontWeight: 500, color: T.text, textDecoration: "none", borderRadius: T.radiusPill, border: sectionBorder, background: "#fff" }}>Explorer</Link>
            <Link href="https://app.modulr.cloud/" target="_blank" rel="noreferrer" style={{ padding: "8px 18px", fontSize: 14, fontWeight: 600, color: T.accentFg, background: T.accent, borderRadius: T.radiusPill, textDecoration: "none" }}>Open App</Link>
            <button className="el-mobile-only" onClick={() => setMobileNav(!mobileNav)} style={{ background: "none", border: "none", padding: 8, cursor: "pointer" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={T.text} strokeWidth="2" strokeLinecap="round"><path d={mobileNav ? "M6 6l12 12M6 18L18 6" : "M4 7h16M4 12h16M4 17h16"} /></svg>
            </button>
          </div>
        </div>
        <div className={`el-mobile-menu${mobileNav ? " open" : ""}`}>
          {navItems.map((item) => (
            <Link key={item.label} href={item.href} onClick={() => setMobileNav(false)} style={{ padding: "10px 0", fontSize: 15, fontWeight: item.href === "/web3" ? 600 : 400, color: item.href === "/web3" ? T.text : T.muted, textDecoration: "none" }}>
              {item.label}
            </Link>
          ))}
        </div>
      </header>

      {/* ════════════ HERO ════════════ */}
      <section style={{ position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 0%, rgba(111,180,255,0.08) 0%, transparent 70%)" }} />

        <div style={{ position: "relative", maxWidth: T.maxW, margin: "0 auto", padding: "80px 24px 40px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>

          {/* Schematic web3 illustrations grid */}
          <div style={{ width: "100%", maxWidth: 900, marginBottom: 48, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }} className="el-g4">

            {/* 1. Staking */}
            <div style={{ padding: "28px 16px", borderRadius: T.radiusXl, border: sectionBorder, background: "rgba(255,255,255,0.7)", backdropFilter: "blur(24px)", display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
              <svg width="120" height="100" viewBox="0 0 200 200" fill="none" style={{ opacity: 0.55 }}>
                <path d="M100 20 L160 55 L160 145 L100 180 L40 145 L40 55 Z" stroke="#000" strokeWidth="2" fill="none" />
                <path d="M100 20 L100 100 L40 145 M100 100 L160 145" stroke="#000" strokeWidth="1" opacity="0.3" />
                <circle cx="100" cy="100" r="16" stroke="#000" strokeWidth="2" fill="#fff" />
                <circle cx="100" cy="100" r="6" fill="#000" opacity="0.8" />
                <circle cx="100" cy="20" r="6" fill="#000" opacity="0.8" />
                <circle cx="160" cy="55" r="6" fill="#000" opacity="0.8" />
                <circle cx="160" cy="145" r="6" fill="#000" opacity="0.8" />
                <circle cx="100" cy="180" r="6" fill="#000" opacity="0.8" />
                <circle cx="40" cy="145" r="6" fill="#000" opacity="0.8" />
                <circle cx="40" cy="55" r="6" fill="#000" opacity="0.8" />
                <circle cx="100" cy="100" r="40" stroke="#000" strokeWidth="0.5" strokeDasharray="4 4" opacity="0.4" />
              </svg>
              <div style={{ fontSize: 12, fontWeight: 600, color: T.muted, letterSpacing: "0.05em", textTransform: "uppercase" }}>Staking</div>
            </div>

            {/* 2. Governance */}
            <div style={{ padding: "28px 16px", borderRadius: T.radiusXl, border: sectionBorder, background: "rgba(255,255,255,0.7)", backdropFilter: "blur(24px)", display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
              <svg width="120" height="100" viewBox="0 0 200 200" fill="none" style={{ opacity: 0.6 }}>
                <rect x="40" y="30" width="120" height="140" rx="8" stroke="#000" strokeWidth="2" fill="none" />
                <line x1="60" y1="60" x2="140" y2="60" stroke="#000" strokeWidth="2" strokeLinecap="round" />
                <line x1="60" y1="80" x2="110" y2="80" stroke="#000" strokeWidth="2" strokeLinecap="round" />
                <rect x="60" y="110" width="80" height="40" rx="4" stroke="#000" strokeWidth="1" strokeDasharray="4 4" fill="none" opacity="0.6" />
                <path d="M80 130 L95 140 L125 115" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="160" cy="30" r="16" stroke="#000" strokeWidth="2" fill="#fff" />
                <circle cx="160" cy="30" r="6" fill="#10B981" opacity="0.8" />
              </svg>
              <div style={{ fontSize: 12, fontWeight: 600, color: T.muted, letterSpacing: "0.05em", textTransform: "uppercase" }}>Governance</div>
            </div>

            {/* 3. Compute */}
            <div style={{ padding: "28px 16px", borderRadius: T.radiusXl, border: sectionBorder, background: "rgba(255,255,255,0.7)", backdropFilter: "blur(24px)", display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
              <svg width="120" height="100" viewBox="0 0 200 200" fill="none" style={{ opacity: 0.6 }}>
                <rect x="50" y="50" width="100" height="100" rx="12" stroke="#000" strokeWidth="2" fill="none" />
                <rect x="70" y="70" width="60" height="60" rx="6" stroke="#000" strokeWidth="2" fill="none" />
                {[1,2,3,4].map(i => <line key={`t${i}`} x1={65 + i*14} y1="50" x2={65 + i*14} y2="35" stroke="#000" strokeWidth="2" strokeLinecap="round" />)}
                {[1,2,3,4].map(i => <line key={`b${i}`} x1={65 + i*14} y1="150" x2={65 + i*14} y2="165" stroke="#000" strokeWidth="2" strokeLinecap="round" />)}
                {[1,2,3,4].map(i => <line key={`l${i}`} x1="50" y1={65 + i*14} x2="35" y2={65 + i*14} stroke="#000" strokeWidth="2" strokeLinecap="round" />)}
                {[1,2,3,4].map(i => <line key={`r${i}`} x1="150" y1={65 + i*14} x2="165" y2={65 + i*14} stroke="#000" strokeWidth="2" strokeLinecap="round" />)}
                <circle cx="100" cy="100" r="12" stroke="#000" strokeWidth="1" strokeDasharray="2 2" opacity="0.6" />
                <circle cx="100" cy="100" r="4" fill="#000" opacity="0.8" />
              </svg>
              <div style={{ fontSize: 12, fontWeight: 600, color: T.muted, letterSpacing: "0.05em", textTransform: "uppercase" }}>Compute</div>
            </div>

            {/* 4. Data Market */}
            <div style={{ padding: "28px 16px", borderRadius: T.radiusXl, border: sectionBorder, background: "rgba(255,255,255,0.7)", backdropFilter: "blur(24px)", display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
              <svg width="120" height="100" viewBox="0 0 200 200" fill="none" style={{ opacity: 0.6 }}>
                <ellipse cx="100" cy="50" rx="50" ry="16" stroke="#000" strokeWidth="2" fill="none" />
                <path d="M50 50 v40 c0 8.8 22.4 16 50 16 s50 -7.2 50 -16 v-40" stroke="#000" strokeWidth="2" fill="none" />
                <path d="M50 90 v40 c0 8.8 22.4 16 50 16 s50 -7.2 50 -16 v-40" stroke="#000" strokeWidth="2" fill="none" />
                <path d="M50 130 v40 c0 8.8 22.4 16 50 16 s50 -7.2 50 -16 v-40" stroke="#000" strokeWidth="2" fill="none" />
                <circle cx="150" cy="90" r="16" fill="#fff" stroke="#000" strokeWidth="2" />
                <path d="M142 90 l6 6 l10 -10" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="50" cy="130" r="12" fill="#fff" stroke="#000" strokeWidth="1" strokeDasharray="2 2" />
                <circle cx="50" cy="130" r="4" fill="#000" opacity="0.6" />
              </svg>
              <div style={{ fontSize: 12, fontWeight: 600, color: T.muted, letterSpacing: "0.05em", textTransform: "uppercase" }}>Data Market</div>
            </div>

          </div>

          <h1 style={{ fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 500, letterSpacing: "-0.04em", lineHeight: 1.08, marginBottom: 20, maxWidth: 800 }}>
            The decentralized layer for<br />robot operations
          </h1>
          <p style={{ fontSize: 17, color: T.muted, maxWidth: 680, lineHeight: 1.6, marginBottom: 32 }}>
            Trusted settlement, global validator coverage, and verifiable data ownership for robotics teams building at production scale.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
            <Link href="https://testnet.explorer.modulr.cloud/" target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", height: 48, padding: "0 28px", background: T.accent, color: T.accentFg, borderRadius: T.radiusPill, fontSize: 15, fontWeight: 600, textDecoration: "none" }}>
              Explore Testnet
            </Link>
            <Link href="https://docs.modulr.cloud" target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", height: 48, padding: "0 28px", background: "#fff", color: T.text, borderRadius: T.radiusPill, fontSize: 15, fontWeight: 500, textDecoration: "none", border: sectionBorder }}>
              Read Docs
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════ STATS BAR ════════════ */}
      <section style={{ maxWidth: T.maxW, margin: "0 auto", padding: "0 24px 60px" }}>
        <div className="el-g4" style={{ gap: 16 }}>
          {[
            { label: "Transactions", value: "2.4M+" },
            { label: "Validators", value: "847" },
            { label: "Block Time", value: "1.2s" },
            { label: "Total Value Locked", value: "$18.2M" },
          ].map((s) => (
            <div key={s.label} style={{ padding: "24px 20px", borderRadius: T.radiusLg, border: sectionBorder, background: "#fff", textAlign: "center" }}>
              <div style={{ fontSize: "clamp(24px, 3vw, 32px)", fontWeight: 700, color: T.text, letterSpacing: "-0.03em" }}>{s.value}</div>
              <div style={{ fontSize: 13, color: T.muted, marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════ USE CASE TILES — glossy showcase ════════════ */}
      <section style={{ borderTop: sectionBorder, padding: `${T.sectionPy} 0 0` }}>
        <div style={{ maxWidth: T.maxW, margin: "0 auto", padding: "0 24px", textAlign: "center", marginBottom: 48 }}>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 500, letterSpacing: "-0.03em", marginBottom: 12 }}>
            Built for real robot operations
          </h2>
          <p style={{ fontSize: "clamp(15px, 2vw, 17px)", color: T.muted, maxWidth: 720, margin: "0 auto", lineHeight: 1.6 }}>
            Premium modular workflows for fleet support, scheduling, simulation, validator ops, data commerce, and cross-chain settlement.
          </p>
        </div>
        <div style={{ overflowX: "auto", padding: "0 24px 60px", scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}>
          <div style={{ display: "grid", gridAutoFlow: "column", gridAutoColumns: "minmax(340px, 1fr)", gap: 26, minWidth: "max-content" }}>
            {glossyUseCases.map((card) => (
              <div key={card.title} style={{ width: 340 }}>
                <UseCaseVisual kind={card.kind} />
                <div style={{ paddingTop: 18 }}>
                  <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{card.title}</h3>
                  <p style={{ fontSize: 15, color: T.muted, lineHeight: 1.52 }}>{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ QUOTE ════════════ */}
      <section style={{ padding: `40px 24px ${T.sectionPy}`, maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
        <blockquote style={{ fontSize: "clamp(18px, 2.5vw, 22px)", fontWeight: 400, lineHeight: 1.7, color: T.text, fontStyle: "italic", margin: 0 }}>
          &ldquo;Modulr&apos;s decentralized approach to robot data and payments eliminates the vendor lock-in we&apos;ve struggled with for years. The on-chain audit trail is a game-changer.&rdquo;
        </blockquote>
        <div style={{ marginTop: 20, fontSize: 14, color: T.muted }}>
          <span style={{ fontWeight: 600, color: T.text }}>CTO</span> · RoboFleet Inc.
        </div>
      </section>

      {/* ════════════ CROSS-CHAIN — ElevenAgents-style 2-col ════════════ */}
      <section style={{ borderTop: `1px dotted ${T.border}` }}>
        <div style={{ maxWidth: T.maxW, margin: "0 auto", padding: `${T.sectionPy} 24px` }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: T.muted, letterSpacing: "0.04em", marginBottom: 60 }}>Cross-chain Protocol</div>

          <div className="el-g-split" style={{ gap: 60, alignItems: "flex-start" }}>
            {/* Left — text + interactive bullet points */}
            <div>
              <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 500, letterSpacing: "-0.03em", lineHeight: 1.12, marginBottom: 40 }}>
                Move assets and data across chains with trustless verification
              </h2>

              {[
                { title: "Cross-chain interoperability", desc: "Move tokens, data NFTs, and smart contract state between Modulr, Ethereum, Base, Solana, and Arbitrum — with cryptographic proof at every step." },
                { title: "Trustless bridge protocol", desc: "No centralized custodians. The Modulr bridge uses light client verification and ZK proofs to ensure assets are always backed 1:1." },
                { title: "Sub-second finality", desc: "1.2-second block finality means your transactions settle before you can blink. Built for the real-time demands of robot operations." },
              ].map((item, i) => (
                <div key={item.title} style={{ borderTop: `1px solid ${T.border}`, padding: "20px 0" }}>
                  <h4 style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>{item.title}</h4>
                  <p style={{ fontSize: 14, color: T.muted, lineHeight: 1.6, maxWidth: 480 }}>{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Right — gradient visual with bridge mockup */}
            <div style={{ position: "relative", borderRadius: T.radiusXl, overflow: "hidden", background: "linear-gradient(145deg, #e8f0ff, #dde8ff, #ece4ff)", minHeight: 480, display: "flex", flexDirection: "column" }}>
              {/* Subtle wavy pattern */}
              <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.06 }} viewBox="0 0 600 600" preserveAspectRatio="none">
                {[0,1,2,3,4,5,6,7,8].map(i => (
                  <path key={i} d={`M0 ${60 + i * 60} Q150 ${40 + i * 60 + (i % 2 === 0 ? 20 : -20)} 300 ${60 + i * 60} T600 ${60 + i * 60}`} fill="none" stroke="#000" strokeWidth="1" />
                ))}
              </svg>

              {/* Bridge UI mockup */}
              <div style={{ position: "relative", zIndex: 2, padding: "clamp(24px, 3vw, 36px)", flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                {/* Listening indicator */}
                <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", borderRadius: T.radiusPill, background: "rgba(255,255,255,0.7)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.5)", alignSelf: "flex-start", marginBottom: 24 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#10B981" }} />
                  <span style={{ fontSize: 13, fontWeight: 500, color: T.text }}>Bridge Active</span>
                </div>

                {/* From */}
                <div style={{ background: "rgba(255,255,255,0.65)", backdropFilter: "blur(20px)", borderRadius: 16, padding: "16px 18px", marginBottom: 8, border: "1px solid rgba(255,255,255,0.5)" }}>
                  <div style={{ fontSize: 11, color: T.muted2, marginBottom: 8 }}>From</div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg, #627eea, #3b4874)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 700, color: "#fff" }}>E</div>
                      <span style={{ fontSize: 14, fontWeight: 500 }}>Ethereum</span>
                    </div>
                    <span style={{ fontSize: 20, fontWeight: 600, fontFamily: "var(--font-geist-mono), monospace" }}>1.0 ETH</span>
                  </div>
                </div>

                {/* Arrow */}
                <div style={{ display: "flex", justifyContent: "center", margin: "4px 0" }}>
                  <div style={{ width: 32, height: 32, borderRadius: 10, background: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M8 3v10M5 10l3 3 3-3" stroke={T.text} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                </div>

                {/* To */}
                <div style={{ background: "rgba(255,255,255,0.65)", backdropFilter: "blur(20px)", borderRadius: 16, padding: "16px 18px", marginBottom: 16, border: "1px solid rgba(255,255,255,0.5)" }}>
                  <div style={{ fontSize: 11, color: T.muted2, marginBottom: 8 }}>To</div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 28, height: 28, borderRadius: "50%", background: `linear-gradient(135deg, ${T.gold}, #c89200)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 700, color: "#000" }}>M</div>
                      <span style={{ fontSize: 14, fontWeight: 500 }}>Modulr</span>
                    </div>
                    <span style={{ fontSize: 20, fontWeight: 600, color: T.gold, fontFamily: "var(--font-geist-mono), monospace" }}>2,480 MDR</span>
                  </div>
                </div>

                {/* Details */}
                <div style={{ background: "rgba(255,255,255,0.5)", borderRadius: 12, padding: "10px 14px", fontSize: 12, color: T.muted, marginBottom: 12, display: "flex", flexDirection: "column", gap: 4 }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}><span>Bridge Fee</span><span style={{ color: T.text, fontWeight: 500 }}>0.1%</span></div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}><span>Est. Time</span><span style={{ color: "#10B981", fontWeight: 500 }}>~2 min</span></div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}><span>Verification</span><span style={{ color: "#10B981", fontWeight: 500 }}>Trustless ZK</span></div>
                </div>

                {/* Button */}
                <div style={{ padding: "14px", borderRadius: 12, background: T.accent, color: T.accentFg, textAlign: "center", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
                  Bridge Tokens
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ GLOBE — large interactive section ════════════ */}
      <section style={{ borderTop: `1px dotted ${T.border}`, background: "#f8f9fb" }}>
        <div style={{ maxWidth: T.maxW, margin: "0 auto", padding: `${T.sectionPy} 24px` }}>
          <div className="el-g-split" style={{ gap: 48, alignItems: "start", marginBottom: 34 }}>
            <div>
              <h2 style={{ fontSize: "clamp(40px, 5.2vw, 74px)", fontWeight: 500, letterSpacing: "-0.045em", lineHeight: 1.04, marginBottom: 16 }}>
                Global by default and decentralized by design
              </h2>
              <p style={{ fontSize: "clamp(16px, 2vw, 20px)", color: T.muted, lineHeight: 1.6, maxWidth: 560 }}>
                Support global robot fleets with validator coverage across regions, chain-native settlement, and autonomous failover. One protocol, worldwide resilience.
              </p>
            </div>
            <div style={{ maxWidth: 320, borderLeft: `1px dotted ${T.border}`, paddingLeft: 20 }}>
              <p style={{ fontSize: 16, lineHeight: 1.45, margin: 0 }}>
                &ldquo;A decentralized infrastructure layer changed how we scale robotics globally without regional lock-in.&rdquo;
              </p>
              <div style={{ marginTop: 14, fontSize: 13, color: T.muted }}>
                <span style={{ fontWeight: 600, color: T.text }}>Gabe Jacobs</span>
                <div>Product Manager at Chess.com</div>
              </div>
            </div>
          </div>

          <div
            style={{ position: "relative", borderRadius: 36, minHeight: 720, border: sectionBorder, background: "linear-gradient(180deg, #fafbfd 0%, #f2f4f8 100%)", overflow: "hidden", perspective: 1200 }}
            onMouseMove={(e) => updateGlobeTilt(e.clientX, e.clientY, e.currentTarget.getBoundingClientRect())}
            onMouseLeave={() => setGlobeTilt({ x: 0, y: 0 })}
            onTouchMove={(e) => {
              const t = e.touches[0];
              updateGlobeTilt(t.clientX, t.clientY, e.currentTarget.getBoundingClientRect());
            }}
            onTouchEnd={() => setGlobeTilt({ x: 0, y: 0 })}
          >
            <div style={{ position: "absolute", inset: 0, opacity: 0.04 }}>
              <svg width="100%" height="100%" viewBox="0 0 1200 720" preserveAspectRatio="none">
                {Array.from({ length: 18 }, (_, i) => (
                  <path key={i} d={`M0 ${28 + i * 42} Q220 ${4 + i * 42} 600 ${28 + i * 42} T1200 ${28 + i * 42}`} fill="none" stroke="#000" strokeWidth="1" />
                ))}
              </svg>
            </div>

            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: `translate(-50%, -46%) rotateX(${-globeTilt.y * 12}deg) rotateY(${globeTilt.x * 14}deg)`,
                transformStyle: "preserve-3d",
                transition: "transform 120ms ease-out",
                width: "min(92vw, 820px)",
                maxWidth: 820,
              }}
            >
              <div className="globe-spin-3d" style={{ width: "100%", height: "100%" }}>
              <svg width="100%" height="100%" viewBox="0 0 820 820" fill="none">
                <defs>
                  <radialGradient id="globeCore" cx="0.5" cy="0.5" r="0.5">
                    <stop offset="0%" stopColor="rgba(110,182,255,0.32)" />
                    <stop offset="62%" stopColor="rgba(120,160,255,0.14)" />
                    <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                  </radialGradient>
                  <radialGradient id="globeWarm" cx="0.5" cy="0.5" r="0.5">
                    <stop offset="0%" stopColor="rgba(255,170,150,0.25)" />
                    <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                  </radialGradient>
                </defs>

                <circle cx="410" cy="410" r="300" fill="url(#globeCore)" />
                <circle cx="500" cy="480" r="160" fill="url(#globeWarm)" />

                <circle cx="410" cy="410" r="312" stroke={T.text} strokeWidth="1.2" opacity="0.14" />
                <circle cx="410" cy="410" r="282" stroke={T.text} strokeWidth="1" opacity="0.1" />
                <circle cx="410" cy="410" r="252" stroke={T.text} strokeWidth="1" opacity="0.08" />
                <ellipse cx="410" cy="518" rx="198" ry="64" fill="rgba(0,0,0,0.05)" />

                {/* Rotating horizontal lines */}
                <g className="globe-rotate-y">
                  {[0.2, 0.35, 0.5, 0.65, 0.8].map((k, i) => (
                    <ellipse key={`lat-${i}`} cx="410" cy="410" rx="312" ry={312 * (1 - k)} stroke={T.text} strokeWidth="0.8" opacity={0.11 - i * 0.012} />
                  ))}
                  {[0.22, 0.4, 0.58, 0.76].map((k, i) => (
                    <ellipse key={`latd-${i}`} cx="410" cy={410 + (i - 1.5) * 54} rx={286} ry={54 * k} stroke={T.text} strokeWidth="0.7" opacity="0.07" strokeDasharray="6 6" />
                  ))}
                  <line x1="98" y1="410" x2="722" y2="410" stroke={T.text} strokeWidth="0.7" opacity="0.07" />
                </g>

                {/* Rotating vertical lines */}
                <g className="globe-rotate-y-fast">
                  {[0.2, 0.35, 0.5, 0.65, 0.8].map((k, i) => (
                    <ellipse key={`lon-${i}`} cx="410" cy="410" rx={312 * (1 - k)} ry="312" stroke={T.text} strokeWidth="0.8" opacity={0.11 - i * 0.012} />
                  ))}
                  <ellipse cx="410" cy="410" rx="190" ry="312" stroke={T.text} strokeWidth="0.7" opacity="0.08" transform="rotate(24 410 410)" />
                  <ellipse cx="410" cy="410" rx="190" ry="312" stroke={T.text} strokeWidth="0.7" opacity="0.08" transform="rotate(-24 410 410)" />
                  <line x1="410" y1="98" x2="410" y2="722" stroke={T.text} strokeWidth="0.7" opacity="0.07" />
                </g>

                {/* Rotating points & connections */}
                <g className="globe-rotate-y-points">
                  {[
                    [278, 286], [532, 308], [330, 504], [520, 502], [248, 422], [590, 430], [408, 250], [434, 586], [360, 352], [464, 366]
                  ].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="6" fill={T.text} opacity="0.18" />)}

                  <line x1="278" y1="286" x2="408" y2="250" stroke={T.text} strokeWidth="0.8" opacity="0.11" strokeDasharray="4 5" />
                  <line x1="408" y1="250" x2="532" y2="308" stroke={T.text} strokeWidth="0.8" opacity="0.11" strokeDasharray="4 5" />
                  <line x1="532" y1="308" x2="590" y2="430" stroke={T.text} strokeWidth="0.8" opacity="0.11" strokeDasharray="4 5" />
                  <line x1="248" y1="422" x2="278" y2="286" stroke={T.text} strokeWidth="0.8" opacity="0.11" strokeDasharray="4 5" />
                  <line x1="330" y1="504" x2="520" y2="502" stroke={T.text} strokeWidth="0.8" opacity="0.11" strokeDasharray="4 5" />
                  <line x1="520" y1="502" x2="434" y2="586" stroke={T.text} strokeWidth="0.8" opacity="0.11" strokeDasharray="4 5" />
                </g>

                <circle cx="410" cy="410" r="10" fill={T.gold} opacity="0.5" />
                <circle cx="410" cy="410" r="20" stroke={T.gold} strokeWidth="1.2" opacity="0.24" />
              </svg>
              </div>
            </div>

            <div style={{ position: "absolute", top: "14%", left: "9%", display: "flex", alignItems: "center", gap: 8, padding: "8px 16px", borderRadius: T.radiusPill, background: "#fff", border: sectionBorder, boxShadow: "0 6px 16px rgba(0,0,0,0.05)" }}>
              <div style={{ width: 20, height: 20, borderRadius: "50%", background: "linear-gradient(135deg, #4f46e5, #60a5fa)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, fontWeight: 700, color: "#fff" }}>D</div>
              <span style={{ fontSize: 13, fontWeight: 500 }}>Germany</span>
            </div>
            <div style={{ position: "absolute", top: "30%", right: "7%", display: "flex", alignItems: "center", gap: 8, padding: "8px 16px", borderRadius: T.radiusPill, background: "#fff", border: sectionBorder, boxShadow: "0 6px 16px rgba(0,0,0,0.05)" }}>
              <div style={{ width: 20, height: 20, borderRadius: "50%", background: "linear-gradient(135deg, #ef4444, #f59e0b)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, fontWeight: 700, color: "#fff" }}>J</div>
              <span style={{ fontSize: 13, fontWeight: 500 }}>Japan</span>
            </div>
            <div style={{ position: "absolute", bottom: "30%", right: "10%", display: "flex", alignItems: "center", gap: 8, padding: "8px 16px", borderRadius: T.radiusPill, background: "#fff", border: sectionBorder, boxShadow: "0 6px 16px rgba(0,0,0,0.05)" }}>
              <div style={{ width: 20, height: 20, borderRadius: "50%", background: "linear-gradient(135deg, #22c55e, #16a34a)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, fontWeight: 700, color: "#fff" }}>P</div>
              <span style={{ fontSize: 13, fontWeight: 500 }}>Portugal</span>
            </div>
            <div style={{ position: "absolute", bottom: "18%", left: "13%", display: "flex", alignItems: "center", gap: 8, padding: "8px 16px", borderRadius: T.radiusPill, background: "#fff", border: sectionBorder, boxShadow: "0 6px 16px rgba(0,0,0,0.05)" }}>
              <div style={{ width: 20, height: 20, borderRadius: "50%", background: "linear-gradient(135deg, #0ea5e9, #0284c7)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, fontWeight: 700, color: "#fff" }}>U</div>
              <span style={{ fontSize: 13, fontWeight: 500 }}>United States</span>
            </div>

            <div style={{ position: "absolute", bottom: 22, right: 22, background: "#fff", borderRadius: T.radiusLg, border: sectionBorder, minWidth: 220, boxShadow: "0 6px 20px rgba(0,0,0,0.06)", overflow: "hidden" }}>
              {[
                { chain: "Germany", color: "#4f46e5" },
                { chain: "Japan", color: "#ef4444" },
                { chain: "Portugal", color: "#16a34a" },
                { chain: "United States", color: "#0284c7" },
                { chain: "United Arab Emirates", color: T.gold },
              ].map((c) => (
                <div key={c.chain} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", fontSize: 13, borderBottom: `1px solid ${T.border}` }}>
                  <div style={{ width: 16, height: 16, borderRadius: "50%", background: c.color }} />
                  {c.chain}
                </div>
              ))}
              <div style={{ padding: "10px 14px", fontSize: 12, color: T.muted, fontWeight: 500, background: "#fafafa" }}>
                View global coverage map
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ DATA & STAKING — ElevenAgents-style 2-col ════════════ */}
      <section style={{ borderTop: `1px dotted ${T.border}`, background: T.surface }}>
        <div style={{ maxWidth: T.maxW, margin: "0 auto", padding: `${T.sectionPy} 24px` }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: T.muted, letterSpacing: "0.04em", marginBottom: 60 }}>Fully customizable</div>

          {/* Sub-section 1: Data marketplace */}
          <div className="el-g-split" style={{ gap: 48, alignItems: "center", marginBottom: 80 }}>
            <div>
              <h3 style={{ fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 600, letterSpacing: "-0.02em", marginBottom: 16, lineHeight: 1.2 }}>Own your telemetry, monetize your data</h3>
              <p style={{ fontSize: 15, color: T.muted, lineHeight: 1.65, marginBottom: 28, maxWidth: 480 }}>
                Robot operators retain full control of sensor data, LiDAR scans, and training recordings. List datasets on the decentralized marketplace with your own pricing, licensing, and access controls.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {["Full data ownership — no platform lock-in", "On-chain provenance and audit trail", "Sub-2-second settlement in MDR tokens"].map((f) => (
                  <div key={f} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, fontWeight: 500 }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 8l3 3 5-5" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    {f}
                  </div>
                ))}
              </div>
            </div>

            {/* Visual — gradient mockup */}
            <div style={{ position: "relative", borderRadius: T.radiusXl, overflow: "hidden", background: "linear-gradient(145deg, #e8f0ff, #dde8ff, #f0e8ff)", border: sectionBorder, minHeight: 380, padding: 24, display: "flex", flexDirection: "column", justifyContent: "center" }}>
              {/* Wavy bg */}
              <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.04 }} viewBox="0 0 400 400" preserveAspectRatio="none">
                {[0,1,2,3,4,5,6].map(i => (
                  <path key={i} d={`M0 ${50 + i * 50} Q100 ${30 + i * 50 + (i % 2 === 0 ? 20 : -20)} 200 ${50 + i * 50} T400 ${50 + i * 50}`} fill="none" stroke="#000" strokeWidth="1" />
                ))}
              </svg>
              <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  { name: "warehouse-lidar-v3", size: "2.4 GB · 847 samples", price: "500 MDR" },
                  { name: "manipulation-demos-v2", size: "890 MB · 12K trajectories", price: "220 MDR" },
                  { name: "sim-kitchen-env-v4", size: "5.1 GB · Physics sim", price: "1,200 MDR" },
                ].map((d) => (
                  <div key={d.name} style={{ background: "rgba(255,255,255,0.7)", backdropFilter: "blur(16px)", borderRadius: 14, padding: "14px 16px", border: "1px solid rgba(255,255,255,0.5)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 2 }}>{d.name}</div>
                      <div style={{ fontSize: 11, color: T.muted }}>{d.size} · Verified</div>
                    </div>
                    <span style={{ fontSize: 14, fontWeight: 700, color: T.gold }}>{d.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sub-section 2: Staking & validation */}
          <div className="el-g-split" style={{ gap: 48, alignItems: "center" }}>
            {/* Visual — gradient mockup (left) */}
            <div style={{ position: "relative", borderRadius: T.radiusXl, overflow: "hidden", background: "linear-gradient(145deg, #f5f0ff, #ece4ff, #e8ecff)", border: sectionBorder, minHeight: 380, padding: 24, display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.04 }} viewBox="0 0 400 400" preserveAspectRatio="none">
                {[0,1,2,3,4,5,6].map(i => (
                  <path key={i} d={`M0 ${50 + i * 50} Q100 ${30 + i * 50 + (i % 2 === 0 ? -15 : 15)} 200 ${50 + i * 50} T400 ${50 + i * 50}`} fill="none" stroke="#000" strokeWidth="1" />
                ))}
              </svg>
              <div style={{ position: "relative", zIndex: 2 }}>
                {/* Staking dashboard mockup */}
                <div style={{ background: "rgba(255,255,255,0.7)", backdropFilter: "blur(16px)", borderRadius: 16, padding: "20px", border: "1px solid rgba(255,255,255,0.5)", marginBottom: 12 }}>
                  <div style={{ fontSize: 12, color: T.muted2, marginBottom: 10 }}>Your Staking Position</div>
                  <div style={{ fontSize: 36, fontWeight: 700, letterSpacing: "-0.03em", color: T.text, marginBottom: 2 }}>10,000 MDR</div>
                  <div style={{ fontSize: 13, color: "#10B981", fontWeight: 500 }}>+1,240 MDR earned · 12.4% APY</div>
                  <div style={{ display: "flex", alignItems: "flex-end", gap: 2, height: 40, marginTop: 16 }}>
                    {[30,38,35,42,50,48,55,60,58,65,62,70,68,75,72,80].map((h, i) => (
                      <div key={i} style={{ flex: 1, height: `${h}%`, borderRadius: 2, background: `rgba(242,180,0,${0.2 + (h / 100) * 0.5})` }} />
                    ))}
                  </div>
                </div>
                <div style={{ background: "rgba(255,255,255,0.7)", backdropFilter: "blur(16px)", borderRadius: 14, padding: "14px 16px", border: "1px solid rgba(255,255,255,0.5)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 13, fontWeight: 500 }}>Auto-compounding</span>
                  <div style={{ width: 36, height: 20, borderRadius: 10, background: "#10B981", position: "relative" }}>
                    <div style={{ width: 16, height: 16, borderRadius: "50%", background: "#fff", position: "absolute", top: 2, right: 2 }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Text (right) */}
            <div>
              <h3 style={{ fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 600, letterSpacing: "-0.02em", marginBottom: 16, lineHeight: 1.2 }}>Stake to validate, earn proportional rewards</h3>
              <p style={{ fontSize: 15, color: T.muted, lineHeight: 1.65, marginBottom: 28, maxWidth: 480 }}>
                Validators stake MDR tokens to secure robot operations, verify data integrity, and ensure session safety. Auto-compounding rewards make staking effortless.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {["12.4% estimated APY", "Minimum stake: 1,000 MDR", "Slashing protection built-in", "Auto-compounding rewards"].map((f) => (
                  <div key={f} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, fontWeight: 500 }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 8l3 3 5-5" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    {f}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ════════════ FULL-WIDTH EXPLORER MOCKUP (like Studio UI section) ════════════ */}
      <section style={{ padding: `0 24px ${T.sectionPy}`, maxWidth: T.maxW, margin: "0 auto" }}>
        <div className="el-g-split" style={{ gap: 48, alignItems: "center", marginBottom: 48 }}>
          <div>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 500, letterSpacing: "-0.03em", marginBottom: 12 }}>
              Modulr Explorer
            </h2>
            <p style={{ fontSize: "clamp(15px, 2vw, 17px)", color: T.muted, maxWidth: 480, lineHeight: 1.6, marginBottom: 24 }}>
              Browse transactions, blocks, validators, and smart contracts in real-time. Everything on-chain, transparent, and auditable.
            </p>
            <Link href="https://testnet.explorer.modulr.cloud/" target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 14, fontWeight: 600, color: T.text, textDecoration: "none" }}>
              Open Explorer
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
          </div>
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
            {[
              { value: "892,401", label: "Latest Block" },
              { value: "1.2s", label: "Block Time" },
              { value: "847", label: "Active Validators" },
            ].map((s) => (
              <div key={s.label} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "clamp(20px, 3vw, 28px)", fontWeight: 700, letterSpacing: "-0.02em" }}>{s.value}</div>
                <div style={{ fontSize: 12, color: T.muted2 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Glossy explorer dashboard mockup */}
        <div style={{ borderRadius: T.radiusXl, overflow: "hidden", border: sectionBorder, background: "#0e1117", padding: 0, position: "relative" }}>
          {/* Window chrome */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "14px 20px", borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}>
            <div style={{ display: "flex", gap: 6 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f57" }} />
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ffbd2e" }} />
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#28c940" }} />
            </div>
            <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "4px 16px", borderRadius: 8, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.06)", fontSize: 12, color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-geist-mono), monospace" }}>
                <svg width="10" height="10" viewBox="0 0 16 16" fill="none"><rect x="1" y="1" width="14" height="14" rx="3" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/></svg>
                explorer.modulr.cloud
              </div>
            </div>
          </div>

          {/* Dashboard content */}
          <div style={{ padding: "24px 28px", display: "grid", gridTemplateColumns: "280px 1fr", gap: 20, minHeight: 420 }} className="explorer-grid">
            {/* Sidebar */}
            <div style={{ borderRight: "1px solid rgba(255,255,255,0.06)", paddingRight: 20 }}>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>Network</div>
              {["Overview", "Blocks", "Transactions", "Validators", "Contracts", "Data Market"].map((item, i) => (
                <div key={item} style={{ padding: "8px 12px", borderRadius: 8, fontSize: 13, color: i === 0 ? "#fff" : "rgba(255,255,255,0.4)", background: i === 0 ? "rgba(255,255,255,0.06)" : "transparent", marginBottom: 2, fontWeight: i === 0 ? 500 : 400 }}>
                  {item}
                </div>
              ))}
              <div style={{ height: 1, background: "rgba(255,255,255,0.06)", margin: "12px 0" }} />
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>Your Wallet</div>
              {["Staking", "Governance", "Data Assets"].map((item) => (
                <div key={item} style={{ padding: "8px 12px", borderRadius: 8, fontSize: 13, color: "rgba(255,255,255,0.4)", marginBottom: 2 }}>
                  {item}
                </div>
              ))}
            </div>

            {/* Main content */}
            <div>
              {/* Top metrics row */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 20 }} className="explorer-metrics">
                {[
                  { label: "Block Height", value: "#892,401", color: "#4ade80" },
                  { label: "TPS", value: "12,400", color: "#3b82f6" },
                  { label: "Total Staked", value: "8.4M MDR", color: "#f2b400" },
                  { label: "Data Trades", value: "1.2M", color: "#a78bfa" },
                ].map((m) => (
                  <div key={m.label} style={{ padding: "14px 16px", borderRadius: 12, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginBottom: 4 }}>{m.label}</div>
                    <div style={{ fontSize: 18, fontWeight: 600, color: m.color, fontFamily: "var(--font-geist-mono), monospace" }}>{m.value}</div>
                  </div>
                ))}
              </div>

              {/* Recent blocks table */}
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>Recent Blocks</div>
              <div style={{ borderRadius: 12, border: "1px solid rgba(255,255,255,0.05)", overflow: "hidden" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", padding: "8px 14px", background: "rgba(255,255,255,0.02)", fontSize: 11, color: "rgba(255,255,255,0.3)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <span>Block</span><span>Transactions</span><span>Validator</span><span>Time</span>
                </div>
                {[
                  { block: "#892,401", txs: "18", validator: "modulr-val-07", time: "1s ago" },
                  { block: "#892,400", txs: "24", validator: "modulr-val-12", time: "2s ago" },
                  { block: "#892,399", txs: "11", validator: "modulr-val-03", time: "4s ago" },
                  { block: "#892,398", txs: "31", validator: "modulr-val-19", time: "5s ago" },
                  { block: "#892,397", txs: "16", validator: "modulr-val-08", time: "6s ago" },
                  { block: "#892,396", txs: "22", validator: "modulr-val-01", time: "8s ago" },
                ].map((b, i) => (
                  <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", padding: "10px 14px", fontSize: 12.5, fontFamily: "var(--font-geist-mono), monospace", borderBottom: i < 5 ? "1px solid rgba(255,255,255,0.03)" : "none" }}>
                    <span style={{ color: "#3b82f6" }}>{b.block}</span>
                    <span style={{ color: "rgba(255,255,255,0.5)" }}>{b.txs} txs</span>
                    <span style={{ color: "rgba(255,255,255,0.4)" }}>{b.validator}</span>
                    <span style={{ color: "rgba(255,255,255,0.3)" }}>{b.time}</span>
                  </div>
                ))}
              </div>

              {/* Bottom chart placeholder */}
              <div style={{ marginTop: 16, display: "flex", alignItems: "flex-end", gap: 2, height: 60, padding: "0 4px" }}>
                {Array.from({length: 40}, (_, i) => {
                  const h = 20 + Math.sin(i * 0.3) * 15 + Math.cos(i * 0.7) * 10 + (i / 40) * 20;
                  return <div key={i} style={{ flex: 1, height: `${h}%`, borderRadius: 2, background: `rgba(59,130,246,${0.15 + (h / 100) * 0.35})` }} />;
                })}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "rgba(255,255,255,0.2)", padding: "4px 4px 0", fontFamily: "var(--font-geist-mono), monospace" }}>
                <span>24h ago</span><span>Now</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ 2-COLUMN PRODUCT MOCKUPS ════════════ */}
      <section style={{ borderTop: sectionBorder, padding: `${T.sectionPy} 24px`, maxWidth: T.maxW, margin: "0 auto" }}>
        <div className="el-g-split" style={{ gap: 8, alignItems: "stretch" }}>
          {/* Left — Compute Terminal */}
          <div style={{ position: "relative", borderRadius: T.radiusXl, overflow: "hidden", minHeight: 480, background: "#0e1117", display: "flex", flexDirection: "column" }}>
            <div style={{ padding: 16, display: "flex", flexDirection: "column", height: "100%" }}>
              {/* Top bar */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#ff5f57" }} />
                  <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#ffbd2e" }} />
                  <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#28c940" }} />
                </div>
                <div style={{ display: "flex", gap: 10, fontSize: 10, color: "rgba(255,255,255,0.2)" }}>
                  <span style={{ padding: "2px 8px", borderRadius: 4, background: "rgba(255,255,255,0.04)", borderBottom: "1px solid #10b981", color: "rgba(255,255,255,0.5)" }}>Compute</span>
                  <span style={{ padding: "2px 8px" }}>Logs</span>
                  <span style={{ padding: "2px 8px" }}>Config</span>
                </div>
              </div>
              {/* GPU utilization dashboard */}
              <div style={{ padding: 14, borderRadius: 10, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)", marginBottom: 10 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                  <span style={{ fontSize: 11, fontWeight: 500, color: "rgba(255,255,255,0.5)" }}>GPU Cluster Status</span>
                  <span style={{ fontSize: 9, color: "#4ade80", fontWeight: 600, padding: "2px 6px", borderRadius: 4, background: "rgba(74,222,128,0.1)" }}>● ONLINE</span>
                </div>
                {/* GPU meter bars */}
                {[
                  { name: "A100-40GB #0", usage: 87, temp: "68°C" },
                  { name: "A100-40GB #1", usage: 72, temp: "61°C" },
                  { name: "A100-40GB #2", usage: 93, temp: "73°C" },
                  { name: "A100-40GB #3", usage: 45, temp: "52°C" },
                ].map((gpu) => (
                  <div key={gpu.name} style={{ marginBottom: 6 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 9, color: "rgba(255,255,255,0.3)", marginBottom: 3 }}>
                      <span style={{ fontFamily: "var(--font-geist-mono), monospace" }}>{gpu.name}</span>
                      <span>{gpu.usage}% · {gpu.temp}</span>
                    </div>
                    <div style={{ height: 4, borderRadius: 2, background: "rgba(255,255,255,0.04)" }}>
                      <div style={{ width: `${gpu.usage}%`, height: "100%", borderRadius: 2, background: gpu.usage > 85 ? "linear-gradient(90deg, #10b981, #f2b400)" : "#10b981", opacity: 0.6 }} />
                    </div>
                  </div>
                ))}
              </div>
              {/* Terminal output */}
              <div style={{ flex: 1, padding: 12, borderRadius: 10, background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.03)", fontFamily: "var(--font-geist-mono), monospace", fontSize: 10, lineHeight: 1.8, color: "rgba(255,255,255,0.35)", overflow: "hidden" }}>
                <div><span style={{ color: "#4ade80" }}>$</span> modulr compute deploy --model llama-70b</div>
                <div style={{ color: "rgba(255,255,255,0.2)" }}>Provisioning 4x A100 cluster...</div>
                <div style={{ color: "rgba(255,255,255,0.2)" }}>Pulling container image: modulr/inference:v2.8</div>
                <div style={{ color: "#4ade80" }}>✓ Cluster online — 4 nodes, 160GB VRAM</div>
                <div style={{ color: "rgba(255,255,255,0.2)" }}>Deploying inference endpoint...</div>
                <div style={{ color: "#4ade80" }}>✓ Endpoint live: https://api.modulr.cloud/infer</div>
                <div><span style={{ color: "#4ade80" }}>$</span> modulr compute status</div>
                <div style={{ color: "rgba(255,255,255,0.2)" }}>Latency: 12ms · Throughput: 1.2K tok/s</div>
                <div style={{ color: "#f2b400" }}>Cost: 0.004 MDR/request (est. 48 MDR/day)</div>
                <div><span style={{ color: "#4ade80" }}>$</span> <span style={{ opacity: 0.5, animation: "blink 1.2s infinite" }}>▊</span></div>
              </div>
            </div>
            {/* Label */}
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "48px 20px 20px", background: "linear-gradient(to top, #0e1117 20%, transparent)" }}>
              <span style={{ color: "#fff", fontSize: "clamp(16px, 2.5vw, 20px)", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 8 }}>
                Decentralized Compute
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M4 12l8-8M6 4h6v6" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
            </div>
          </div>

          {/* Right — Bridge UI */}
          <div style={{ position: "relative", borderRadius: T.radiusXl, overflow: "hidden", minHeight: 480, background: "#0e1117", display: "flex", flexDirection: "column" }}>
            <div style={{ padding: 16, display: "flex", flexDirection: "column", height: "100%" }}>
              {/* Top bar */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#ff5f57" }} />
                  <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#ffbd2e" }} />
                  <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#28c940" }} />
                </div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.2)", fontFamily: "var(--font-geist-mono), monospace" }}>bridge.modulr.cloud</div>
              </div>
              {/* Bridge swap UI */}
              <div style={{ padding: 16, borderRadius: 12, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)", marginBottom: 10 }}>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", marginBottom: 10 }}>From</div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 12px", borderRadius: 8, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 24, height: 24, borderRadius: "50%", background: "linear-gradient(135deg, #627eea, #3b4874)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, fontWeight: 700, color: "#fff" }}>E</div>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 500, color: "rgba(255,255,255,0.7)" }}>Ethereum</div>
                      <div style={{ fontSize: 9, color: "rgba(255,255,255,0.2)" }}>Balance: 2.45 ETH</div>
                    </div>
                  </div>
                  <div style={{ fontSize: 18, fontWeight: 600, color: "#fff", fontFamily: "var(--font-geist-mono), monospace" }}>1.0</div>
                </div>
                {/* Swap arrow */}
                <div style={{ display: "flex", justifyContent: "center", margin: "8px 0" }}>
                  <div style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M8 3v10M5 10l3 3 3-3" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                </div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", marginBottom: 10 }}>To</div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 12px", borderRadius: 8, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 24, height: 24, borderRadius: "50%", background: "linear-gradient(135deg, #f2b400, #c89200)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, fontWeight: 700, color: "#000" }}>M</div>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 500, color: "rgba(255,255,255,0.7)" }}>Modulr Network</div>
                      <div style={{ fontSize: 9, color: "rgba(255,255,255,0.2)" }}>Balance: 24,800 MDR</div>
                    </div>
                  </div>
                  <div style={{ fontSize: 18, fontWeight: 600, color: "#f2b400", fontFamily: "var(--font-geist-mono), monospace" }}>2,480</div>
                </div>
              </div>
              {/* Transaction details */}
              <div style={{ padding: "10px 14px", borderRadius: 10, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)", marginBottom: 10, fontSize: 10, color: "rgba(255,255,255,0.3)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}><span>Rate</span><span style={{ color: "rgba(255,255,255,0.5)" }}>1 ETH = 2,480 MDR</span></div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}><span>Bridge Fee</span><span style={{ color: "rgba(255,255,255,0.5)" }}>0.1%</span></div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}><span>Est. Time</span><span style={{ color: "#4ade80" }}>~2 min</span></div>
                <div style={{ display: "flex", justifyContent: "space-between" }}><span>Verification</span><span style={{ color: "#4ade80" }}>Trustless ZK</span></div>
              </div>
              {/* Bridge button */}
              <div style={{ padding: "12px", borderRadius: 10, background: "linear-gradient(135deg, #f2b400, #e0a800)", textAlign: "center", fontSize: 13, fontWeight: 600, color: "#000", cursor: "pointer" }}>
                Bridge Tokens
              </div>
              {/* Recent transactions */}
              <div style={{ marginTop: 10, flex: 1 }}>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", marginBottom: 6 }}>Recent Transfers</div>
                {[
                  { from: "ETH", to: "MDR", amount: "0.5 ETH → 1,240 MDR", time: "2m ago", status: "✓" },
                  { from: "SOL", to: "MDR", amount: "12 SOL → 480 MDR", time: "8m ago", status: "✓" },
                  { from: "MDR", to: "BASE", amount: "500 MDR → 0.2 ETH", time: "14m ago", status: "✓" },
                ].map((tx, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "6px 0", borderTop: i > 0 ? "1px solid rgba(255,255,255,0.03)" : "none" }}>
                    <span style={{ fontSize: 9, color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-geist-mono), monospace" }}>{tx.amount}</span>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 9, color: "rgba(255,255,255,0.2)" }}>
                      <span>{tx.time}</span>
                      <span style={{ color: "#4ade80" }}>{tx.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Label */}
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "48px 20px 20px", background: "linear-gradient(to top, #0e1117 20%, transparent)" }}>
              <span style={{ color: "#fff", fontSize: "clamp(16px, 2.5vw, 20px)", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 8 }}>
                Cross-chain Bridge
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M4 12l8-8M6 4h6v6" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ FEATURE GRID ════════════ */}
      <section style={{ borderTop: sectionBorder, padding: `${T.sectionPy} 24px`, maxWidth: T.maxW, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 500, letterSpacing: "-0.03em", marginBottom: 12 }}>
            The decentralized platform to power the robot economy
          </h2>
          <p style={{ fontSize: "clamp(15px, 2vw, 17px)", color: T.muted, maxWidth: 680, margin: "0 auto", lineHeight: 1.6 }}>
            Modulr Web3 is a single protocol to trade data, stake tokens, govern the network, and pay for robot operations. Powering thousands of validators, operators, and developers worldwide.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 12 }}>
          {heroFeatures.map((f) => (
            <div
              key={f.name}
              style={{
                padding: "20px 22px",
                borderRadius: T.radiusLg,
                border: sectionBorder,
                background: "#fff",
                cursor: "default",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = T.surface; (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(0,0,0,0.14)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = "#fff"; (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(0,0,0,0.08)"; }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: T.surface, border: sectionBorder, display: "flex", alignItems: "center", justifyContent: "center", color: T.text, flexShrink: 0 }}>
                  {f.icon}
                </div>
                <div style={{ fontSize: 15, fontWeight: 600 }}>{f.name}</div>
              </div>
              <p style={{ fontSize: 13, color: T.muted, lineHeight: 1.55, marginLeft: 48 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════ BUILD / STAKE / GOVERN — Interactive tabs (like Create/Edit/Localize) ════════════ */}
      <section style={{ borderTop: sectionBorder, background: T.surface }}>
        <div style={{ maxWidth: T.maxW, margin: "0 auto", padding: `${T.sectionPy} 24px` }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 500, letterSpacing: "-0.03em", marginBottom: 12 }}>
              Build, stake, and govern with Modulr Web3
            </h2>
            <p style={{ fontSize: "clamp(15px, 2vw, 17px)", color: T.muted, maxWidth: 640, margin: "0 auto", lineHeight: 1.6 }}>
              Integrate blockchain capabilities into robot operations, earn rewards as a validator, and participate in decentralized protocol governance.
            </p>
          </div>

          {/* Tab buttons */}
          <div style={{ display: "flex", justifyContent: "center", gap: 4, marginBottom: 40 }}>
            {bsgTabs.map((t, i) => (
              <button
                key={t.tab}
                onClick={() => setBsgTab(i)}
                style={{
                  padding: "10px 28px",
                  fontSize: 15,
                  fontWeight: bsgTab === i ? 600 : 400,
                  color: bsgTab === i ? T.accentFg : T.text,
                  background: bsgTab === i ? T.accent : "#fff",
                  border: bsgTab === i ? "none" : sectionBorder,
                  borderRadius: T.radiusPill,
                  cursor: "pointer",
                  transition: "all 0.25s",
                }}
              >
                {t.tab}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="el-g-split" style={{ gap: 48, alignItems: "flex-start" }}>
            {/* Left — text */}
            <div>
              <h3 style={{ fontSize: "clamp(22px, 3vw, 30px)", fontWeight: 600, letterSpacing: "-0.02em", marginBottom: 16, lineHeight: 1.2 }}>
                {activeBsg.title}
              </h3>
              <p style={{ fontSize: 15, color: T.muted, lineHeight: 1.65, marginBottom: 28 }}>
                {activeBsg.desc}
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {activeBsg.features.map((f) => (
                  <div key={f} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, fontWeight: 500 }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 8l3 3 5-5" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    {f}
                  </div>
                ))}
              </div>
            </div>

            {/* Right — code mockup */}
            <div style={{ borderRadius: T.radiusXl, overflow: "hidden", border: sectionBorder, background: "#1a1a1a", minHeight: 320 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "14px 18px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f57" }} />
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ffbd2e" }} />
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#28c940" }} />
                <span style={{ marginLeft: 12, fontSize: 12, color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-geist-mono), monospace" }}>app.ts</span>
              </div>
              <pre style={{ padding: "20px 22px", margin: 0, fontFamily: "var(--font-geist-mono), monospace", fontSize: 12.5, lineHeight: 1.8, color: "rgba(255,255,255,0.7)", overflowX: "auto", whiteSpace: "pre" }}>
                {activeBsg.code}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ QUOTE 2 ════════════ */}
      <section style={{ padding: `40px 24px`, maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
        <blockquote style={{ fontSize: "clamp(18px, 2.5vw, 22px)", fontWeight: 400, lineHeight: 1.7, color: T.text, fontStyle: "italic", margin: 0 }}>
          &ldquo;Being able to stake MDR and earn from network validation is a game-changer for our idle compute infrastructure. We went from zero utilization to 12% APY overnight.&rdquo;
        </blockquote>
        <div style={{ marginTop: 20, fontSize: 14, color: T.muted }}>
          <span style={{ fontWeight: 600, color: T.text }}>VP of Engineering</span> · CloudMesh
        </div>
      </section>

      {/* ════════════ PROTOCOL TECH SHOWCASE (like best-in-class models) ════════════ */}
      <section style={{ borderTop: sectionBorder, padding: `${T.sectionPy} 24px`, maxWidth: T.maxW, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 500, letterSpacing: "-0.03em", marginBottom: 12 }}>
            Built on best-in-class protocol technology
          </h2>
          <p style={{ fontSize: "clamp(15px, 2vw, 17px)", color: T.muted, maxWidth: 640, margin: "0 auto", lineHeight: 1.6 }}>
            Every layer of the Modulr protocol is purpose-built for high-throughput robot operations, from consensus to storage.
          </p>
        </div>

        {/* Tab pills row */}
        <div style={{ display: "flex", gap: 6, marginBottom: 40, overflowX: "auto", paddingBottom: 4 }}>
          {protocolTabs.map((t, i) => (
            <button
              key={t.name}
              onClick={() => setProtoTab(i)}
              style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "10px 20px",
                fontSize: 14,
                fontWeight: protoTab === i ? 600 : 400,
                color: protoTab === i ? T.text : T.muted,
                background: protoTab === i ? T.surface : "transparent",
                border: protoTab === i ? sectionBorder : "1px solid transparent",
                borderRadius: T.radiusPill,
                cursor: "pointer",
                transition: "all 0.2s",
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              {t.icon}
              {t.name}
            </button>
          ))}
        </div>

        {/* Active tab content */}
        <div style={{ borderRadius: T.radiusXl, border: sectionBorder, overflow: "hidden", background: "#fff" }}>
          <div className="el-g-split" style={{ gap: 0 }}>
            {/* Left info panel */}
            <div style={{ padding: "clamp(32px, 4vw, 48px)", borderRight: sectionBorder }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 14px", borderRadius: T.radiusPill, background: "rgba(242,180,0,0.08)", border: "1px solid rgba(242,180,0,0.15)", marginBottom: 20, fontSize: 11, fontWeight: 600, color: T.gold, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                {activeProto.label}
              </div>
              <h3 style={{ fontSize: "clamp(22px, 3vw, 28px)", fontWeight: 600, letterSpacing: "-0.02em", marginBottom: 16, lineHeight: 1.25 }}>
                {activeProto.name}
              </h3>
              <p style={{ fontSize: 15, color: T.muted, lineHeight: 1.65, marginBottom: 32 }}>
                {activeProto.desc}
              </p>
              <Link href="https://docs.modulr.cloud" target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 14, fontWeight: 600, color: T.text, textDecoration: "none" }}>
                Learn more
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
            </div>

            {/* Right metric panel */}
            <div style={{ padding: "clamp(32px, 4vw, 48px)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", minHeight: 300, background: T.surface, position: "relative", overflow: "hidden" }}>
              {/* Decorative rings */}
              <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.08 }} viewBox="0 0 300 300" preserveAspectRatio="xMidYMid meet">
                {[40, 70, 100, 130].map((r, i) => (
                  <circle key={i} cx="150" cy="150" r={r} fill="none" stroke="#000" strokeWidth="0.5" strokeDasharray={`${3 + i} ${6 + i * 2}`}>
                    <animateTransform attributeName="transform" type="rotate" from={`0 150 150`} to={`${i % 2 === 0 ? 360 : -360} 150 150`} dur={`${25 + i * 10}s`} repeatCount="indefinite" />
                  </circle>
                ))}
              </svg>
              <div style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
                <div style={{ fontSize: "clamp(56px, 8vw, 80px)", fontWeight: 700, letterSpacing: "-0.04em", color: T.text, lineHeight: 1 }}>
                  {activeProto.metric}
                </div>
                <div style={{ fontSize: 15, color: T.muted, marginTop: 8 }}>{activeProto.metricLabel}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ EVERYTHING IN ONE PROTOCOL (like workspace cards) ════════════ */}
      <section style={{ borderTop: sectionBorder, padding: `${T.sectionPy} 24px`, maxWidth: T.maxW, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 500, letterSpacing: "-0.03em", marginBottom: 12 }}>
            Everything in one decentralized protocol
          </h2>
          <p style={{ fontSize: "clamp(15px, 2vw, 17px)", color: T.muted, maxWidth: 640, margin: "0 auto", lineHeight: 1.6 }}>
            From data trades to governance votes — manage the full robot economy from a single, composable protocol stack.
          </p>
        </div>

        <div className="el-g2" style={{ gap: 16 }}>
          {workspaceCards.map((c) => (
            <div key={c.title} style={{ padding: "clamp(28px, 3vw, 40px)", borderRadius: T.radiusXl, border: sectionBorder, background: "#fff" }}>
              <div style={{ width: 48, height: 48, borderRadius: 14, background: T.surface, border: sectionBorder, display: "flex", alignItems: "center", justifyContent: "center", color: T.text, marginBottom: 20 }}>
                {c.icon}
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 10 }}>{c.title}</h3>
              <p style={{ fontSize: 15, color: T.muted, lineHeight: 1.6 }}>{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════ $MDR TOKEN ════════════ */}
      <section style={{ borderTop: sectionBorder, background: T.surface }}>
        <div style={{ maxWidth: T.maxW, margin: "0 auto", padding: `${T.sectionPy} 24px` }}>
          <div className="el-g-split" style={{ gap: 60, alignItems: "center" }}>
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 14px", borderRadius: T.radiusPill, background: "rgba(242,180,0,0.08)", border: "1px solid rgba(242,180,0,0.15)", marginBottom: 24, fontSize: 12, fontWeight: 600, color: T.gold, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                $MDR Token
              </div>
              <h2 style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 500, letterSpacing: "-0.04em", lineHeight: 1.08, marginBottom: 20 }}>
                The fuel of the<br />robot economy
              </h2>
              <p style={{ fontSize: "clamp(15px, 2vw, 17px)", color: T.muted, lineHeight: 1.65, marginBottom: 36, maxWidth: 480 }}>
                MDR powers every interaction on the Modulr network — from session payments and data trades to validator staking and governance voting.
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <Link href="https://testnet.explorer.modulr.cloud/" target="_blank" rel="noreferrer" style={{ padding: "10px 24px", borderRadius: T.radiusPill, background: T.accent, color: T.accentFg, fontSize: 14, fontWeight: 600, textDecoration: "none" }}>
                  View on Explorer
                </Link>
                <Link href="https://docs.modulr.cloud" target="_blank" rel="noreferrer" style={{ padding: "10px 24px", borderRadius: T.radiusPill, background: "#fff", color: T.text, border: sectionBorder, fontSize: 14, fontWeight: 500, textDecoration: "none" }}>
                  Tokenomics
                </Link>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { title: "Pay for sessions", desc: "Native payment for teleoperation, fleet rentals, and data.", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg> },
                { title: "Stake to validate", desc: "Secure the network and earn proportional rewards.", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
                { title: "Governance", desc: "Vote on upgrades, fees, and safety standards.", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/><path d="M9 15l2 2 4-4"/></svg> },
                { title: "Compute credits", desc: "Purchase GPU/TPU compute for AI training.", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg> },
                { title: "Data marketplace", desc: "Buy and sell robot telemetry and training data.", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4.03 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/></svg> },
              ].map((u) => (
                <div key={u.title} style={{ display: "flex", gap: 14, alignItems: "flex-start", padding: "16px 18px", borderRadius: 14, background: "#fff", border: sectionBorder }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: T.surface, border: sectionBorder, display: "flex", alignItems: "center", justifyContent: "center", color: T.text, flexShrink: 0 }}>
                    {u.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 2 }}>{u.title}</div>
                    <div style={{ fontSize: 13, color: T.muted, lineHeight: 1.5 }}>{u.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ BENTO GRID — Core capabilities ════════════ */}
      <section style={{ borderTop: sectionBorder, padding: `${T.sectionPy} 24px`, maxWidth: T.maxW, margin: "0 auto" }}>
        <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 500, letterSpacing: "-0.03em", marginBottom: 8 }}>
          Network Infrastructure
        </h2>
        <p style={{ fontSize: "clamp(15px, 2vw, 17px)", color: T.muted, maxWidth: 640, marginBottom: 48, lineHeight: 1.6 }}>
          Everything you need to build, operate, and monetize in the decentralized robot economy.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 16 }}>
          {/* === 1. Data Marketplace === */}
          <div className="bento-wide" style={{ gridColumn: "span 7", borderRadius: T.radiusXl, border: sectionBorder, overflow: "hidden", background: "#fff", display: "flex", flexDirection: "column" }}>
            <div style={{ padding: "clamp(24px, 3vw, 36px)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: T.surface, border: sectionBorder, display: "flex", alignItems: "center", justifyContent: "center", color: T.text }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4.03 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/></svg>
                </div>
                <div>
                  <div style={{ fontSize: 18, fontWeight: 600 }}>Data Marketplace</div>
                  <div style={{ fontSize: 13, color: T.muted2 }}>1.2M+ datasets available</div>
                </div>
              </div>
              <p style={{ fontSize: 15, color: T.muted, lineHeight: 1.6, maxWidth: 440 }}>
                Buy and sell high-quality robot training data, sensor recordings, and simulation environments. All data is verified, timestamped, and priced transparently on-chain.
              </p>
            </div>
            <div style={{ margin: "0 clamp(16px, 2vw, 24px) clamp(16px, 2vw, 24px)", padding: "16px 18px", borderRadius: 14, background: "#1a1a1a", flex: 1 }}>
              <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "rgba(255,255,255,0.15)" }} />
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "rgba(255,255,255,0.15)" }} />
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "rgba(255,255,255,0.15)" }} />
              </div>
              <div style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: 12, lineHeight: 1.8, color: "rgba(255,255,255,0.5)" }}>
                <div><span style={{ color: "#10B981" }}>$</span> modulr data list --type lidar</div>
                <div style={{ color: "rgba(255,255,255,0.3)" }}>Found 2,341 datasets matching &quot;lidar&quot;</div>
                <div style={{ color: "rgba(255,255,255,0.3)" }}>├── warehouse-scan-v3 &nbsp;&nbsp; 500 MDR &nbsp; ✓ verified</div>
                <div style={{ color: "rgba(255,255,255,0.3)" }}>├── outdoor-nav-2026 &nbsp;&nbsp;&nbsp; 320 MDR &nbsp; ✓ verified</div>
                <div style={{ color: "rgba(255,255,255,0.3)" }}>└── manipulation-hd &nbsp;&nbsp;&nbsp; 780 MDR &nbsp; ✓ verified</div>
              </div>
            </div>
          </div>

          {/* === 2. Staking === */}
          <div className="bento-narrow" style={{ gridColumn: "span 5", borderRadius: T.radiusXl, border: sectionBorder, overflow: "hidden", background: "#fff", padding: "clamp(24px, 3vw, 36px)", display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: T.surface, border: sectionBorder, display: "flex", alignItems: "center", justifyContent: "center", color: T.text }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>
              </div>
              <div>
                <div style={{ fontSize: 18, fontWeight: 600 }}>Staking</div>
                <div style={{ fontSize: 13, color: T.muted2 }}>Secure the network</div>
              </div>
            </div>
            <div style={{ fontSize: "clamp(48px, 6vw, 72px)", fontWeight: 700, letterSpacing: "-0.04em", color: T.text, marginBottom: 4 }}>12.4%</div>
            <div style={{ fontSize: 14, color: T.muted, marginBottom: 20 }}>Estimated APY for validators</div>
            <div style={{ flex: 1 }} />
            <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 60 }}>
              {[35,42,38,55,62,48,70,65,78,72,80,85,75,90,82,88,92,86,95,88].map((h, i) => (
                <div key={i} style={{ flex: 1, height: `${h}%`, borderRadius: 3, background: `rgba(242,180,0,${0.15 + (h / 100) * 0.5})` }} />
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontSize: 11, color: T.muted2 }}>
              <span>Jan</span>
              <span>Now</span>
            </div>
          </div>

          {/* === 3. Governance === */}
          <div className="bento-narrow" style={{ gridColumn: "span 5", borderRadius: T.radiusXl, border: sectionBorder, overflow: "hidden", background: "#fff", padding: "clamp(24px, 3vw, 36px)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: T.surface, border: sectionBorder, display: "flex", alignItems: "center", justifyContent: "center", color: T.text }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
              </div>
              <div>
                <div style={{ fontSize: 18, fontWeight: 600 }}>Governance</div>
                <div style={{ fontSize: 13, color: T.muted2 }}>847 active validators</div>
              </div>
            </div>
            <p style={{ fontSize: 14, color: T.muted, lineHeight: 1.6, marginBottom: 20 }}>
              Vote on protocol upgrades, fee structures, safety policies, and network parameters. True decentralized governance — one token, one voice.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                { id: "#48", title: "New safety standard", status: "VOTING", color: T.gold },
                { id: "#47", title: "Increase fleet cap", status: "PASSED", color: "#10B981" },
                { id: "#46", title: "Fee reduction Q2", status: "PASSED", color: "#10B981" },
              ].map((p) => (
                <div key={p.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", borderRadius: 10, background: T.surface, border: sectionBorder }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 12, fontFamily: "var(--font-geist-mono), monospace", color: T.muted2 }}>{p.id}</span>
                    <span style={{ fontSize: 13, fontWeight: 500 }}>{p.title}</span>
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 600, color: p.color, letterSpacing: "0.05em" }}>{p.status}</span>
                </div>
              ))}
            </div>
          </div>

          {/* === 4. Compute Credits === */}
          <div className="bento-wide" style={{ gridColumn: "span 7", borderRadius: T.radiusXl, border: sectionBorder, overflow: "hidden", background: "#fff", display: "flex", flexDirection: "column" }}>
            <div style={{ padding: "clamp(24px, 3vw, 36px)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: T.surface, border: sectionBorder, display: "flex", alignItems: "center", justifyContent: "center", color: T.text }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M9 9h6v6H9z"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3"/></svg>
                </div>
                <div>
                  <div style={{ fontSize: 18, fontWeight: 600 }}>Compute Credits</div>
                  <div style={{ fontSize: 13, color: T.muted2 }}>50K+ GPU hours/day</div>
                </div>
              </div>
              <p style={{ fontSize: 15, color: T.muted, lineHeight: 1.6, maxWidth: 440 }}>
                Access distributed GPU/TPU compute for robot AI model training, inference, and real-time simulation. No centralized cloud vendor lock-in.
              </p>
            </div>
            <div style={{ margin: "0 clamp(16px, 2vw, 24px) clamp(16px, 2vw, 24px)", padding: "16px 18px", borderRadius: 14, background: T.surface, border: sectionBorder, flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12, fontSize: 12, color: T.muted2 }}>
                <span>GPU Cluster Utilization</span>
                <span style={{ color: "#10B981", fontWeight: 600 }}>87% active</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(16, 1fr)", gap: 4 }}>
                {Array.from({ length: 48 }, (_, i) => {
                  const active = i % 7 !== 3 && i % 11 !== 5;
                  return <div key={i} style={{ aspectRatio: "1", borderRadius: 4, background: active ? `rgba(242,180,0,${0.2 + (i % 5) * 0.1})` : "rgba(0,0,0,0.04)", border: active ? "1px solid rgba(242,180,0,0.15)" : sectionBorder }} />;
                })}
              </div>
              <div style={{ display: "flex", gap: 16, marginTop: 12, fontSize: 11, color: T.muted2 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}><div style={{ width: 8, height: 8, borderRadius: 2, background: "rgba(242,180,0,0.45)" }} /> Active</div>
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}><div style={{ width: 8, height: 8, borderRadius: 2, background: "rgba(0,0,0,0.04)", border: sectionBorder }} /> Available</div>
              </div>
            </div>
          </div>

          {/* === 5. Multi-chain === */}
          <div className="bento-third" style={{ gridColumn: "span 4", borderRadius: T.radiusXl, border: sectionBorder, overflow: "hidden", background: "#fff", padding: "clamp(24px, 3vw, 36px)" }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: T.surface, border: sectionBorder, display: "flex", alignItems: "center", justifyContent: "center", color: T.text, marginBottom: 16 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>
            </div>
            <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>Multi-chain</div>
            <p style={{ fontSize: 14, color: T.muted, lineHeight: 1.6, marginBottom: 20 }}>Bridge to Ethereum, Base, and Solana for cross-chain payments and DeFi integrations.</p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {["Ethereum", "Base", "Solana"].map((chain) => (
                <div key={chain} style={{ padding: "6px 14px", borderRadius: T.radiusPill, background: T.surface, border: sectionBorder, fontSize: 12, fontWeight: 500 }}>{chain}</div>
              ))}
            </div>
          </div>

          {/* === 6. Instant payments === */}
          <div className="bento-third" style={{ gridColumn: "span 4", borderRadius: T.radiusXl, border: sectionBorder, overflow: "hidden", background: "#fff", padding: "clamp(24px, 3vw, 36px)" }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: T.surface, border: sectionBorder, display: "flex", alignItems: "center", justifyContent: "center", color: T.text, marginBottom: 16 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
            </div>
            <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>Instant payments</div>
            <p style={{ fontSize: 14, color: T.muted, lineHeight: 1.6, marginBottom: 20 }}>Pay per session, per minute, or per task. Settlements in under 2 seconds with zero intermediaries.</p>
            <div style={{ fontSize: 32, fontWeight: 700, color: T.text, letterSpacing: "-0.03em" }}>{"<"} 2s</div>
            <div style={{ fontSize: 12, color: T.muted2, marginTop: 4 }}>Settlement finality</div>
          </div>

          {/* === 7. Data sovereignty === */}
          <div className="bento-third" style={{ gridColumn: "span 4", borderRadius: T.radiusXl, border: sectionBorder, overflow: "hidden", background: "#fff", padding: "clamp(24px, 3vw, 36px)" }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: T.surface, border: sectionBorder, display: "flex", alignItems: "center", justifyContent: "center", color: T.text, marginBottom: 16 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/><circle cx="12" cy="16" r="1"/></svg>
            </div>
            <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>Data sovereignty</div>
            <p style={{ fontSize: 14, color: T.muted, lineHeight: 1.6 }}>Robot owners retain full control of their telemetry. Choose what to share, sell, or keep private — no platform lock-in.</p>
          </div>
        </div>
      </section>

      {/* ════════════ SHOWCASE CARDS — Light ════════════ */}
      <section style={{ padding: `0 24px`, maxWidth: T.maxW, margin: "0 auto" }}>
        {/* Masonry grid */}
        <div className="el-g-masonry">
          {/* Left tall — Data Marketplace */}
          <div style={{ gridRow: "1 / 3", borderRadius: T.radiusXl, overflow: "hidden", position: "relative", minHeight: 420, background: "linear-gradient(145deg, #f8f8fa, #f0f0f4, #eaeaef)", border: sectionBorder, cursor: "pointer" }}>
            <div style={{ position: "absolute", top: 16, left: 16, zIndex: 2 }}>
              <div style={{ padding: "4px 10px", background: "rgba(0,0,0,0.06)", borderRadius: 4, fontSize: 10, fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", color: T.text }}>Marketplace</div>
            </div>
            {/* Database illustration */}
            <div style={{ position: "absolute", top: "10%", left: "50%", transform: "translateX(-50%)", opacity: 0.14 }}>
              <svg width="200" height="180" viewBox="0 0 200 180" fill="none">
                <ellipse cx="100" cy="30" rx="60" ry="16" stroke={T.text} strokeWidth="1.5" />
                <path d="M40 30v40c0 8.84 26.86 16 60 16s60-7.16 60-16V30" stroke={T.text} strokeWidth="1.5" />
                <ellipse cx="100" cy="70" rx="60" ry="16" stroke={T.text} strokeWidth="0.5" strokeDasharray="3 3" />
                <path d="M40 70v40c0 8.84 26.86 16 60 16s60-7.16 60-16V70" stroke={T.text} strokeWidth="1.5" />
                <ellipse cx="100" cy="110" rx="60" ry="16" stroke={T.text} strokeWidth="0.5" strokeDasharray="3 3" />
                <path d="M40 110v30c0 8.84 26.86 16 60 16s60-7.16 60-16v-30" stroke={T.text} strokeWidth="1" />
                <line x1="30" y1="60" x2="10" y2="40" stroke={T.text} strokeWidth="0.8" />
                <line x1="170" y1="60" x2="190" y2="40" stroke={T.text} strokeWidth="0.8" />
                <circle cx="10" cy="40" r="3" stroke={T.text} strokeWidth="0.8" />
                <circle cx="190" cy="40" r="3" stroke={T.text} strokeWidth="0.8" />
              </svg>
            </div>
            <div style={{ position: "absolute", left: 16, right: 16, bottom: 16, zIndex: 2, display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ padding: "10px 14px", borderRadius: 14, background: "rgba(0,0,0,0.04)", backdropFilter: "blur(8px)", fontSize: 13, color: T.text, maxWidth: "90%", lineHeight: 1.4 }}>
                Dataset &quot;warehouse-lidar-v3&quot; purchased for 500 MDR.
              </div>
              <div style={{ padding: "10px 14px", borderRadius: 14, background: "rgba(0,0,0,0.04)", backdropFilter: "blur(8px)", fontSize: 13, color: T.text, maxWidth: "80%", alignSelf: "flex-end", lineHeight: 1.4 }}>
                2.4 GB transferred. Validation complete.
              </div>
              <div style={{ padding: "10px 14px", borderRadius: 14, background: "rgba(0,0,0,0.04)", backdropFilter: "blur(8px)", fontSize: 13, color: T.text, maxWidth: "88%", lineHeight: 1.4 }}>
                Training pipeline started with new data. ETA: 12 min.
              </div>
            </div>
          </div>

          {/* Middle top — Staking */}
          <div style={{ borderRadius: T.radiusXl, overflow: "hidden", position: "relative", minHeight: 280, background: "linear-gradient(145deg, #f6f4f0, #efece6, #e8e4dc)", border: sectionBorder, cursor: "pointer" }}>
            {/* Shield illustration */}
            <div style={{ position: "absolute", top: "12%", left: "50%", transform: "translateX(-50%)", opacity: 0.14 }}>
              <svg width="160" height="140" viewBox="0 0 160 140" fill="none">
                <path d="M80 10 L130 35 V75 C130 100 108 120 80 130 C52 120 30 100 30 75 V35 Z" stroke={T.text} strokeWidth="1.5" />
                <path d="M80 25 L118 45 V75 C118 95 100 110 80 118 C60 110 42 95 42 75 V45 Z" stroke={T.text} strokeWidth="0.5" strokeDasharray="3 3" />
                <path d="M65 72 L76 83 L98 61" stroke={T.text} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="80" cy="75" r="30" stroke={T.text} strokeWidth="0.5" strokeDasharray="4 4" />
              </svg>
            </div>
            <div style={{ position: "absolute", left: 16, right: 16, bottom: 16, zIndex: 2, display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ padding: "10px 14px", borderRadius: 14, background: "rgba(0,0,0,0.04)", backdropFilter: "blur(8px)", fontSize: 13, color: T.text, maxWidth: "85%", lineHeight: 1.4 }}>
                Staked 10,000 MDR to validator-node-42.
              </div>
              <div style={{ padding: "10px 14px", borderRadius: 14, background: "rgba(0,0,0,0.04)", backdropFilter: "blur(8px)", fontSize: 13, color: T.text, maxWidth: "80%", alignSelf: "flex-end", lineHeight: 1.4 }}>
                +256 MDR rewards auto-compounded. APY: 12.4%
              </div>
            </div>
          </div>

          {/* Middle bottom — Governance */}
          <div style={{ borderRadius: T.radiusXl, overflow: "hidden", position: "relative", minHeight: 140, background: "linear-gradient(145deg, #f4f4f8, #ececf2, #e4e4ec)", border: sectionBorder, cursor: "pointer" }}>
            <div style={{ position: "absolute", top: "50%", right: 24, transform: "translateY(-50%)", opacity: 0.12 }}>
              <svg width="70" height="70" viewBox="0 0 70 70" fill="none">
                <rect x="12" y="25" width="46" height="35" rx="4" stroke={T.text} strokeWidth="1.5" />
                <rect x="28" y="20" width="14" height="10" rx="2" stroke={T.text} strokeWidth="1" />
                <line x1="12" y1="42" x2="58" y2="42" stroke={T.text} strokeWidth="0.5" />
                <rect x="25" y="30" width="20" height="5" rx="1" stroke={T.text} strokeWidth="0.8" fill="rgba(0,0,0,0.04)" />
              </svg>
            </div>
            <div style={{ position: "absolute", left: 16, right: 16, bottom: 14, zIndex: 2 }}>
              <p style={{ color: T.text, fontSize: 15, fontWeight: 600, lineHeight: 1.3 }}>Governance</p>
            </div>
          </div>

          {/* Right tall — Smart Contracts */}
          <div style={{ gridRow: "1 / 3", borderRadius: T.radiusXl, overflow: "hidden", position: "relative", minHeight: 380, background: "linear-gradient(145deg, #f4f6f5, #eceeec, #e4e8e6)", border: sectionBorder, cursor: "pointer" }}>
            <div style={{ position: "absolute", top: 16, left: 16, zIndex: 2 }}>
              <div style={{ padding: "4px 10px", background: "rgba(0,0,0,0.06)", borderRadius: 4, fontSize: 10, fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", color: T.text }}>SLA Engine</div>
            </div>
            {/* Contract / code illustration */}
            <div style={{ position: "absolute", top: "10%", left: "50%", transform: "translateX(-50%)", opacity: 0.14 }}>
              <svg width="160" height="160" viewBox="0 0 160 160" fill="none">
                <rect x="30" y="10" width="100" height="140" rx="6" stroke={T.text} strokeWidth="1.5" />
                <line x1="50" y1="35" x2="110" y2="35" stroke={T.text} strokeWidth="0.8" />
                <line x1="50" y1="50" x2="95" y2="50" stroke={T.text} strokeWidth="0.8" />
                <line x1="50" y1="65" x2="105" y2="65" stroke={T.text} strokeWidth="0.8" />
                <line x1="50" y1="80" x2="80" y2="80" stroke={T.text} strokeWidth="0.8" />
                <line x1="50" y1="95" x2="100" y2="95" stroke={T.text} strokeWidth="0.8" />
                <line x1="50" y1="110" x2="90" y2="110" stroke={T.text} strokeWidth="0.8" />
                <path d="M37 33 L42 38 L48 30" stroke={T.text} strokeWidth="1" strokeLinecap="round" />
                <path d="M37 48 L42 53 L48 45" stroke={T.text} strokeWidth="1" strokeLinecap="round" />
                <path d="M37 63 L42 68 L48 60" stroke={T.text} strokeWidth="1" strokeLinecap="round" />
                <rect x="37" y="78" width="8" height="8" rx="1" stroke={T.text} strokeWidth="0.8" />
                <rect x="37" y="93" width="8" height="8" rx="1" stroke={T.text} strokeWidth="0.8" />
                <circle cx="110" cy="130" r="14" stroke={T.text} strokeWidth="1" />
                <circle cx="110" cy="130" r="8" stroke={T.text} strokeWidth="0.5" strokeDasharray="2 2" />
                <path d="M106 130 L109 133 L115 127" stroke={T.text} strokeWidth="1" strokeLinecap="round" />
              </svg>
            </div>
            <div style={{ position: "absolute", left: 16, right: 16, bottom: 16, zIndex: 2, display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ padding: "10px 14px", borderRadius: 14, background: "rgba(0,0,0,0.04)", backdropFilter: "blur(8px)", fontSize: 13, color: T.text, maxWidth: "92%", lineHeight: 1.4 }}>
                SLA contract deployed. Uptime guarantee: 99.9%.
              </div>
              <div style={{ padding: "10px 14px", borderRadius: 14, background: "rgba(0,0,0,0.04)", backdropFilter: "blur(8px)", fontSize: 13, color: T.text, maxWidth: "82%", alignSelf: "flex-end", lineHeight: 1.4 }}>
                Penalty clause triggered. 200 MDR refunded automatically.
              </div>
              <div style={{ padding: "10px 14px", borderRadius: 14, background: "rgba(0,0,0,0.04)", backdropFilter: "blur(8px)", fontSize: 13, color: T.text, maxWidth: "88%", lineHeight: 1.4 }}>
                All 12 conditions verified on-chain. Contract finalized.
              </div>
            </div>
          </div>
        </div>

        {/* Full-width Cross-chain Bridge card */}
        <div style={{ borderRadius: T.radiusXl, overflow: "hidden", position: "relative", minHeight: 200, background: "linear-gradient(145deg, #f4f4f8, #ececf2, #e6e6ee)", border: sectionBorder, cursor: "pointer", marginTop: 12 }}>
          <div style={{ position: "absolute", top: "50%", right: 60, transform: "translateY(-50%)", opacity: 0.12 }}>
            <svg width="240" height="120" viewBox="0 0 240 120" fill="none">
              <circle cx="30" cy="60" r="16" stroke={T.text} strokeWidth="1.5" />
              <text x="30" y="64" fill={T.text} fontSize="8" fontWeight="600" textAnchor="middle" fontFamily="var(--font-geist-mono),monospace">ETH</text>
              <circle cx="120" cy="60" r="20" stroke={T.text} strokeWidth="2" />
              <text x="120" y="64" fill={T.text} fontSize="9" fontWeight="700" textAnchor="middle" fontFamily="var(--font-geist-mono),monospace">MDR</text>
              <circle cx="210" cy="60" r="16" stroke={T.text} strokeWidth="1.5" />
              <text x="210" y="64" fill={T.text} fontSize="8" fontWeight="600" textAnchor="middle" fontFamily="var(--font-geist-mono),monospace">SOL</text>
              <circle cx="75" cy="110" r="12" stroke={T.text} strokeWidth="1" />
              <text x="75" y="113" fill={T.text} fontSize="7" textAnchor="middle" fontFamily="var(--font-geist-mono),monospace">BASE</text>
              <circle cx="165" cy="110" r="12" stroke={T.text} strokeWidth="1" />
              <text x="165" y="113" fill={T.text} fontSize="7" textAnchor="middle" fontFamily="var(--font-geist-mono),monospace">ARB</text>
              <line x1="46" y1="60" x2="100" y2="60" stroke={T.text} strokeWidth="0.8" strokeDasharray="4 4" />
              <line x1="140" y1="60" x2="194" y2="60" stroke={T.text} strokeWidth="0.8" strokeDasharray="4 4" />
              <line x1="108" y1="77" x2="85" y2="100" stroke={T.text} strokeWidth="0.5" strokeDasharray="3 3" />
              <line x1="132" y1="77" x2="155" y2="100" stroke={T.text} strokeWidth="0.5" strokeDasharray="3 3" />
              <line x1="42" y1="72" x2="66" y2="100" stroke={T.text} strokeWidth="0.5" strokeDasharray="3 3" />
              <line x1="198" y1="72" x2="174" y2="100" stroke={T.text} strokeWidth="0.5" strokeDasharray="3 3" />
            </svg>
          </div>
          <div style={{ position: "absolute", left: 24, bottom: 24, right: "45%", zIndex: 2, display: "flex", flexDirection: "column", gap: 8 }}>
            <p style={{ color: T.text, fontSize: 20, fontWeight: 600, lineHeight: 1.3, marginBottom: 4 }}>Cross-chain Bridge</p>
            <div style={{ padding: "10px 14px", borderRadius: 14, background: "rgba(0,0,0,0.04)", backdropFilter: "blur(8px)", fontSize: 13, color: T.text, maxWidth: "95%", lineHeight: 1.4 }}>
              Bridging 1,000 MDR from Ethereum to Solana. Estimated: 0.4s.
            </div>
            <div style={{ padding: "10px 14px", borderRadius: 14, background: "rgba(0,0,0,0.04)", backdropFilter: "blur(8px)", fontSize: 13, color: T.text, maxWidth: "80%", lineHeight: 1.4 }}>
              Transfer confirmed. Cryptographic proof verified.
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ 2-COLUMN LIGHT CARDS ════════════ */}
      <section style={{ padding: `12px 24px ${T.sectionPy}`, maxWidth: T.maxW, margin: "0 auto" }}>
        <div className="el-g-split" style={{ gap: 12 }}>
          {/* Compute Network */}
          <div style={{ borderRadius: T.radiusXl, overflow: "hidden", position: "relative", minHeight: 320, background: "linear-gradient(145deg, #f4f6f5, #ecf0ee, #e4eae8)", border: sectionBorder, cursor: "pointer" }}>
            <div style={{ position: "absolute", top: "8%", left: "50%", transform: "translateX(-50%)", opacity: 0.12 }}>
              <svg width="180" height="140" viewBox="0 0 180 140" fill="none">
                <rect x="50" y="30" width="80" height="80" rx="6" stroke={T.text} strokeWidth="1.5" />
                <rect x="65" y="45" width="50" height="50" rx="3" stroke={T.text} strokeWidth="1" />
                {[0,1,2,3,4].map(i => <line key={`t${i}`} x1={65+i*12.5} y1="30" x2={65+i*12.5} y2="18" stroke={T.text} strokeWidth="1" />)}
                {[0,1,2,3,4].map(i => <line key={`b${i}`} x1={65+i*12.5} y1="110" x2={65+i*12.5} y2="122" stroke={T.text} strokeWidth="1" />)}
                {[0,1,2,3,4].map(i => <line key={`l${i}`} x1="50" y1={45+i*12.5} x2="38" y2={45+i*12.5} stroke={T.text} strokeWidth="1" />)}
                {[0,1,2,3,4].map(i => <line key={`r${i}`} x1="130" y1={45+i*12.5} x2="142" y2={45+i*12.5} stroke={T.text} strokeWidth="1" />)}
                <circle cx="90" cy="70" r="12" stroke={T.text} strokeWidth="0.8" />
                <circle cx="90" cy="70" r="6" fill={T.text} opacity="0.06" />
              </svg>
            </div>
            <div style={{ position: "absolute", left: 16, right: 16, bottom: 16, zIndex: 2, display: "flex", flexDirection: "column", gap: 8 }}>
              <p style={{ color: T.text, fontSize: 18, fontWeight: 600, lineHeight: 1.3, marginBottom: 2 }}>Compute Network</p>
              <div style={{ padding: "10px 14px", borderRadius: 14, background: "rgba(0,0,0,0.04)", backdropFilter: "blur(8px)", fontSize: 13, color: T.text, maxWidth: "92%", lineHeight: 1.4 }}>
                4x A100 cluster provisioned. 160GB VRAM online.
              </div>
              <div style={{ padding: "10px 14px", borderRadius: 14, background: "rgba(0,0,0,0.04)", backdropFilter: "blur(8px)", fontSize: 13, color: T.text, maxWidth: "80%", alignSelf: "flex-end", lineHeight: 1.4 }}>
                Inference endpoint live. Latency: 12ms.
              </div>
            </div>
          </div>

          {/* Validator Network */}
          <div style={{ borderRadius: T.radiusXl, overflow: "hidden", position: "relative", minHeight: 320, background: "linear-gradient(145deg, #f4f4f8, #ececf4, #e4e4ee)", border: sectionBorder, cursor: "pointer" }}>
            <div style={{ position: "absolute", top: "8%", left: "50%", transform: "translateX(-50%)", opacity: 0.12 }}>
              <svg width="180" height="140" viewBox="0 0 180 140" fill="none">
                <circle cx="90" cy="70" r="50" stroke={T.text} strokeWidth="1.5" />
                <ellipse cx="90" cy="70" rx="50" ry="20" stroke={T.text} strokeWidth="0.5" strokeDasharray="3 3" />
                <ellipse cx="90" cy="70" rx="20" ry="50" stroke={T.text} strokeWidth="0.5" strokeDasharray="3 3" />
                <line x1="40" y1="70" x2="140" y2="70" stroke={T.text} strokeWidth="0.5" />
                <line x1="90" y1="20" x2="90" y2="120" stroke={T.text} strokeWidth="0.5" />
                <circle cx="55" cy="50" r="3" fill={T.text} opacity="0.15" />
                <circle cx="125" cy="55" r="3" fill={T.text} opacity="0.15" />
                <circle cx="70" cy="90" r="3" fill={T.text} opacity="0.15" />
                <circle cx="115" cy="85" r="3" fill={T.text} opacity="0.15" />
                <circle cx="90" cy="35" r="3" fill={T.text} opacity="0.15" />
                <circle cx="90" cy="105" r="3" fill={T.text} opacity="0.15" />
              </svg>
            </div>
            <div style={{ position: "absolute", left: 16, right: 16, bottom: 16, zIndex: 2, display: "flex", flexDirection: "column", gap: 8 }}>
              <p style={{ color: T.text, fontSize: 18, fontWeight: 600, lineHeight: 1.3, marginBottom: 2 }}>Validator Network</p>
              <div style={{ padding: "10px 14px", borderRadius: 14, background: "rgba(0,0,0,0.04)", backdropFilter: "blur(8px)", fontSize: 13, color: T.text, maxWidth: "90%", lineHeight: 1.4 }}>
                847 validators active across 40 countries.
              </div>
              <div style={{ padding: "10px 14px", borderRadius: 14, background: "rgba(0,0,0,0.04)", backdropFilter: "blur(8px)", fontSize: 13, color: T.text, maxWidth: "82%", alignSelf: "flex-end", lineHeight: 1.4 }}>
                Block #892,401 validated. Finality: 1.2s.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ ECOSYSTEM TESTIMONIALS (like "Powering world's leading companies") ════════════ */}
      <section style={{ borderTop: sectionBorder, background: T.surface }}>
        <div style={{ maxWidth: T.maxW, margin: "0 auto", padding: `${T.sectionPy} 24px` }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 500, letterSpacing: "-0.03em", marginBottom: 12 }}>
              Powering the next generation of robot infrastructure
            </h2>
            <p style={{ fontSize: "clamp(15px, 2vw, 17px)", color: T.muted, maxWidth: 600, margin: "0 auto", lineHeight: 1.6 }}>
              See how teams are building on Modulr&apos;s decentralized protocol.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {ecosystemQuotes.map((q, i) => (
              <div key={i} className="el-g-split" style={{ gap: 0, borderRadius: T.radiusXl, border: sectionBorder, overflow: "hidden", background: "#fff" }}>
                <div style={{ padding: "clamp(28px, 3vw, 40px)", flex: 1 }}>
                  <blockquote style={{ fontSize: "clamp(16px, 2vw, 19px)", fontWeight: 400, lineHeight: 1.6, margin: 0, marginBottom: 20, color: T.text }}>
                    &ldquo;{q.quote}&rdquo;
                  </blockquote>
                  <div style={{ fontSize: 14, fontWeight: 600, color: T.muted }}>{q.company}</div>
                </div>
                <div style={{ padding: "clamp(28px, 3vw, 40px)", background: T.surface, borderLeft: sectionBorder, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", minWidth: 200 }}>
                  <div style={{ fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 700, letterSpacing: "-0.04em", color: T.text, lineHeight: 1 }}>{q.metric}</div>
                  <div style={{ fontSize: 14, color: T.muted, marginTop: 6 }}>{q.metricLabel}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ TRADITIONAL VS MODULR ════════════ */}
      <section style={{ borderTop: sectionBorder, padding: `${T.sectionPy} 24px`, maxWidth: T.maxW, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 500, letterSpacing: "-0.03em", marginBottom: 12 }}>
            Traditional infrastructure vs Modulr
          </h2>
          <p style={{ fontSize: "clamp(15px, 2vw, 17px)", color: T.muted, maxWidth: 600, margin: "0 auto", lineHeight: 1.6 }}>
            See why decentralized infrastructure is the future of robot operations.
          </p>
        </div>
        <div style={{ borderRadius: T.radiusXl, overflow: "hidden", border: sectionBorder, background: "#fff", overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 15, minWidth: 580 }}>
            <thead>
              <tr style={{ borderBottom: `2px solid ${T.border}` }}>
                <th style={{ textAlign: "left", padding: "16px 20px", fontWeight: 600, fontSize: 13, color: T.muted2, textTransform: "uppercase", letterSpacing: "0.08em" }}>Feature</th>
                <th style={{ textAlign: "left", padding: "16px 20px", fontWeight: 600, fontSize: 13, color: T.muted2, textTransform: "uppercase", letterSpacing: "0.08em" }}>Traditional</th>
                <th style={{ textAlign: "left", padding: "16px 20px", fontWeight: 600, fontSize: 13, color: T.text, textTransform: "uppercase", letterSpacing: "0.08em" }}>Modulr</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, i) => (
                <tr key={row.feature} style={{ borderBottom: i < comparisonRows.length - 1 ? sectionBorder : "none" }}>
                  <td style={{ padding: "14px 20px", fontWeight: 500 }}>{row.feature}</td>
                  <td style={{ padding: "14px 20px", color: T.muted }}>{row.traditional}</td>
                  <td style={{ padding: "14px 20px", fontWeight: 600 }}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M4 8l3 3 5-5" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      {row.modulr}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ════════════ AVAILABLE EVERYWHERE (like web/mobile/API section) ════════════ */}
      <section style={{ borderTop: sectionBorder, padding: `${T.sectionPy} 24px`, maxWidth: T.maxW, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 500, letterSpacing: "-0.03em", marginBottom: 12 }}>
            Available on the web, CLI, and via APIs or SDKs
          </h2>
          <p style={{ fontSize: "clamp(15px, 2vw, 17px)", color: T.muted, maxWidth: 640, margin: "0 auto", lineHeight: 1.6 }}>
            Interact with the Modulr network from any environment — browser, terminal, or your own application.
          </p>
        </div>

        <div className="el-g3" style={{ gap: 16 }}>
          {/* Explorer */}
          <div style={{ borderRadius: T.radiusXl, border: sectionBorder, overflow: "hidden", background: "#fff", display: "flex", flexDirection: "column" }}>
            <div style={{ padding: "clamp(28px, 3vw, 36px)", flex: 1 }}>
              <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>Blockchain Explorer</h3>
              <p style={{ fontSize: 14, color: T.muted, lineHeight: 1.6, marginBottom: 20 }}>Browse transactions, blocks, validators, and smart contracts in a visual, real-time interface.</p>
              <Link href="https://testnet.explorer.modulr.cloud/" target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 14, fontWeight: 600, color: T.text, textDecoration: "none" }}>
                Open Explorer
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
            </div>
            <div style={{ margin: "0 16px 16px", borderRadius: 14, background: T.surface, border: sectionBorder, padding: "20px", minHeight: 120 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#10B981" }} />
                <span style={{ fontSize: 11, fontFamily: "var(--font-geist-mono), monospace", color: T.muted2 }}>explorer.modulr.cloud</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 12, fontFamily: "var(--font-geist-mono), monospace", color: T.muted }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}><span>Block #892,401</span><span>1.2s ago</span></div>
                <div style={{ display: "flex", justifyContent: "space-between" }}><span>18 transactions</span><span>3 validators</span></div>
              </div>
            </div>
          </div>

          {/* APIs & SDKs */}
          <div style={{ borderRadius: T.radiusXl, border: sectionBorder, overflow: "hidden", background: "#fff", display: "flex", flexDirection: "column" }}>
            <div style={{ padding: "clamp(28px, 3vw, 36px)", flex: 1 }}>
              <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>APIs &amp; SDKs</h3>
              <p style={{ fontSize: 14, color: T.muted, lineHeight: 1.6, marginBottom: 20 }}>Integrate Modulr directly into your product with TypeScript and Python SDKs, REST APIs, and WebSocket feeds.</p>
              <Link href="https://docs.modulr.cloud" target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 14, fontWeight: 600, color: T.text, textDecoration: "none" }}>
                API Reference
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
            </div>
            <div style={{ margin: "0 16px 16px", borderRadius: 14, background: "#1a1a1a", padding: "16px 18px", minHeight: 120 }}>
              <div style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: 12, lineHeight: 1.8, color: "rgba(255,255,255,0.5)" }}>
                <div style={{ color: "rgba(255,255,255,0.3)" }}>// TypeScript SDK</div>
                <div><span style={{ color: "#c084fc" }}>import</span> {"{"} Modulr {"}"} <span style={{ color: "#c084fc" }}>from</span> <span style={{ color: "#fbbf24" }}>&apos;@modulr/sdk&apos;</span>;</div>
                <div><span style={{ color: "#c084fc" }}>const</span> client = <span style={{ color: "#c084fc" }}>new</span> <span style={{ color: "#38bdf8" }}>Modulr</span>();</div>
              </div>
            </div>
          </div>

          {/* CLI */}
          <div style={{ borderRadius: T.radiusXl, border: sectionBorder, overflow: "hidden", background: "#fff", display: "flex", flexDirection: "column" }}>
            <div style={{ padding: "clamp(28px, 3vw, 36px)", flex: 1 }}>
              <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>Modulr CLI</h3>
              <p style={{ fontSize: 14, color: T.muted, lineHeight: 1.6, marginBottom: 20 }}>Manage validators, stake tokens, submit proposals, and interact with the data marketplace from your terminal.</p>
              <Link href="https://docs.modulr.cloud" target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 14, fontWeight: 600, color: T.text, textDecoration: "none" }}>
                Install CLI
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
            </div>
            <div style={{ margin: "0 16px 16px", borderRadius: 14, background: "#1a1a1a", padding: "16px 18px", minHeight: 120 }}>
              <div style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: 12, lineHeight: 1.8, color: "rgba(255,255,255,0.5)" }}>
                <div><span style={{ color: "#10B981" }}>$</span> npm install -g @modulr/cli</div>
                <div><span style={{ color: "#10B981" }}>$</span> modulr validator status</div>
                <div style={{ color: "rgba(255,255,255,0.3)" }}>✓ Node online · 12,400 MDR staked</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ ROADMAP ════════════ */}
      <section style={{ borderTop: sectionBorder, padding: `${T.sectionPy} 24px`, maxWidth: T.maxW, margin: "0 auto" }}>
        <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 500, letterSpacing: "-0.03em", marginBottom: 48 }}>
          Web3 Roadmap
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 0, position: "relative" }}>
          <div style={{ position: "absolute", top: 0, bottom: 0, left: 19, width: 2, background: T.border }} />
          {roadmapItems.map((item, idx) => (
            <div key={item.date} onClick={() => setActiveRoadmapIdx(idx)} style={{ display: "flex", gap: 24, padding: "20px 0", cursor: "pointer", position: "relative" }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: item.done ? "#10B981" : activeRoadmapIdx === idx ? T.accent : "#fff", border: item.done ? "none" : `2px solid ${activeRoadmapIdx === idx ? T.accent : T.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, zIndex: 2, transition: "all 0.2s" }}>
                {item.done ? (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 8l3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                ) : (
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: activeRoadmapIdx === idx ? "#fff" : T.border }} />
                )}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 8, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: item.done ? "#10B981" : T.muted2, fontFamily: "var(--font-geist-mono), monospace" }}>{item.date}</span>
                  <span style={{ fontSize: 18, fontWeight: 600 }}>{item.title}</span>
                </div>
                {activeRoadmapIdx === idx && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 8, paddingTop: 4 }}>
                    {item.items.map((it, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 14px", borderRadius: 10, background: T.surface, border: sectionBorder, fontSize: 14 }}>
                        {item.done && <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M4 8l3 3 5-5" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                        {it}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════ ENTERPRISE LAYERED VISUAL ════════════ */}
      <section style={{ borderTop: sectionBorder, background: T.surface }}>
        <div style={{ maxWidth: T.maxW, margin: "0 auto", padding: `${T.sectionPy} 24px` }}>
          <div style={{ textAlign: "center", marginBottom: 16 }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: T.gold, letterSpacing: "0.04em" }}>Enterprise ready</span>
          </div>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 500, letterSpacing: "-0.03em", textAlign: "center", marginBottom: 56 }}>
            Enterprise-grade security and infrastructure
          </h2>

          <div className="el-g-split" style={{ gap: 48, alignItems: "center" }}>
            {/* Layered visual — security layers */}
            <div style={{ position: "relative", borderRadius: T.radiusXl, overflow: "hidden", background: "linear-gradient(145deg, #eceef4, #f0f2f8)", border: sectionBorder, minHeight: 420, display: "flex", alignItems: "center", justifyContent: "center" }}>
              {/* Background grid */}
              <svg width="280" height="240" viewBox="0 0 280 240" fill="none" style={{ position: "absolute", opacity: 0.06 }}>
                {[0,1,2,3,4,5,6].map(i => <line key={`h${i}`} x1="0" y1={i*40} x2="280" y2={i*40} stroke={T.text} strokeWidth="0.5" />)}
                {[0,1,2,3,4,5,6,7].map(i => <line key={`v${i}`} x1={i*40} y1="0" x2={i*40} y2="240" stroke={T.text} strokeWidth="0.5" />)}
              </svg>
              {/* Shield layers */}
              <svg width="220" height="220" viewBox="0 0 220 220" fill="none" style={{ position: "relative", zIndex: 1 }}>
                {/* Outer shield */}
                <path d="M110 20 L180 55 V120 C180 160 150 190 110 200 C70 190 40 160 40 120 V55 Z" stroke={T.text} strokeWidth="1.2" opacity="0.15" fill="none" />
                {/* Middle shield */}
                <path d="M110 40 L165 68 V120 C165 152 142 175 110 183 C78 175 55 152 55 120 V68 Z" stroke={T.text} strokeWidth="1" opacity="0.25" fill="none" strokeDasharray="4 4" />
                {/* Inner shield */}
                <path d="M110 60 L150 80 V120 C150 144 134 160 110 166 C86 160 70 144 70 120 V80 Z" stroke={T.text} strokeWidth="1.2" opacity="0.35" fill="none" />
                {/* Checkmark */}
                <path d="M92 118 L105 131 L130 106" stroke={T.gold} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
                {/* Lock icon */}
                <rect x="99" y="140" width="22" height="16" rx="3" stroke={T.text} strokeWidth="1" opacity="0.3" />
                <path d="M104 140v-6a6 6 0 0112 0v6" stroke={T.text} strokeWidth="1" opacity="0.3" fill="none" />
                <circle cx="110" cy="149" r="2" fill={T.text} opacity="0.3" />
                {/* Corner indicators */}
                <circle cx="40" cy="55" r="3" fill={T.gold} opacity="0.3" />
                <circle cx="180" cy="55" r="3" fill={T.gold} opacity="0.3" />
                <circle cx="110" cy="200" r="3" fill={T.gold} opacity="0.3" />
              </svg>
            </div>

            {/* Side descriptions */}
            <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
              {[
                { title: "Enterprise-level data protection", desc: "Data is encrypted in transit and at rest with TLS 1.3 and AES-256. Full support for SOC 2, GDPR compliance. Zero-retention modes available." },
                { title: "Zero-knowledge verification", desc: "Verify robot session compliance and data authenticity without exposing raw telemetry. Privacy-preserving proofs built into the protocol." },
                { title: "On-chain audit trail", desc: "Every transaction, vote, and session is permanently recorded and publicly verifiable. Complete transparency without compromising privacy." },
              ].map((item) => (
                <div key={item.title}>
                  <h4 style={{ fontSize: 17, fontWeight: 600, marginBottom: 8 }}>{item.title}</h4>
                  <p style={{ fontSize: 14, color: T.muted, lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ QUOTE 3 ════════════ */}
      <section style={{ padding: `40px 24px`, maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
        <blockquote style={{ fontSize: "clamp(18px, 2.5vw, 22px)", fontWeight: 400, lineHeight: 1.7, color: T.text, fontStyle: "italic", margin: 0 }}>
          &ldquo;The on-chain audit trail gives us complete transparency into every robot session — something no centralized platform could ever offer.&rdquo;
        </blockquote>
        <div style={{ marginTop: 20, fontSize: 14, color: T.muted }}>
          <span style={{ fontWeight: 600, color: T.text }}>Head of Compliance</span> · SafeBot Labs
        </div>
      </section>

      {/* ════════════ SECURITY ════════════ */}
      <section style={{ borderTop: sectionBorder, padding: `${T.sectionPy} 24px`, maxWidth: T.maxW, margin: "0 auto" }}>
        <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 500, letterSpacing: "-0.03em", marginBottom: 8 }}>
          Enterprise-grade security and infrastructure at scale
        </h2>
        <p style={{ fontSize: "clamp(15px, 2vw, 17px)", color: T.muted, maxWidth: 640, marginBottom: 48, lineHeight: 1.6 }}>
          Built for mission-critical robot operations with multiple layers of protection.
        </p>

        <div className="el-g2">
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {securityFeatures.map((f, i) => (
              <div key={f.title} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: T.surface, border: sectionBorder, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 16, fontWeight: 700, color: T.muted2 }}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div>
                  <h3 style={{ fontSize: 17, fontWeight: 600, marginBottom: 4 }}>{f.title}</h3>
                  <p style={{ fontSize: 15, color: T.muted, lineHeight: 1.6 }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Security visual */}
          <div style={{ borderRadius: T.radiusXl, background: T.surface, border: sectionBorder, padding: "clamp(32px, 4vw, 48px)", minHeight: 380, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
            <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.12 }} viewBox="0 0 400 400" preserveAspectRatio="xMidYMid meet">
              {[60, 100, 140, 180, 220].map((r, i) => (
                <circle key={i} cx="200" cy="200" r={r} fill="none" stroke="rgba(0,0,0,0.3)" strokeWidth="0.5" strokeDasharray={`${4 + i * 2} ${8 + i * 3}`}>
                  <animateTransform attributeName="transform" type="rotate" from={`0 200 200`} to={`${i % 2 === 0 ? 360 : -360} 200 200`} dur={`${20 + i * 8}s`} repeatCount="indefinite" />
                </circle>
              ))}
            </svg>
            <div style={{ textAlign: "center", position: "relative", zIndex: 2 }}>
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none" style={{ margin: "0 auto 24px" }}>
                <path d="M40 5L10 20v20c0 17.5 12.5 32.5 30 37.5 17.5-5 30-20 30-37.5V20L40 5z" stroke="rgba(0,0,0,0.2)" strokeWidth="2" fill="rgba(0,0,0,0.02)" />
                <path d="M32 40l5 5 11-11" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div style={{ fontSize: 20, fontWeight: 600, color: T.text, marginBottom: 8 }}>SOC 2 · HIPAA · GDPR</div>
              <div style={{ fontSize: 13, color: T.muted, marginBottom: 24 }}>Enterprise-grade compliance</div>
              <div style={{ display: "flex", justifyContent: "center", gap: 24, flexWrap: "wrap" }}>
                {[
                  { label: "Encrypted", value: "TLS 1.3" },
                  { label: "Uptime", value: "99.99%" },
                  { label: "Audit", value: "On-chain" },
                ].map((s) => (
                  <div key={s.label} style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 16, fontWeight: 600, color: T.text }}>{s.value}</div>
                    <div style={{ fontSize: 11, color: T.muted2 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ CTA ════════════ */}
      <section style={{ borderTop: sectionBorder, padding: "80px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 500, letterSpacing: "-0.04em", marginBottom: 16 }}>
            Join the network
          </h2>
          <p style={{ fontSize: "clamp(15px, 2vw, 18px)", color: T.muted, maxWidth: 560, margin: "0 auto 40px", lineHeight: 1.6 }}>
            Whether you&apos;re a validator, robot owner, data provider, or developer — the Modulr network is open and growing.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
            <Link href="https://app.modulr.cloud/" target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", height: 52, padding: "0 32px", background: T.accent, color: T.accentFg, borderRadius: T.radiusPill, fontSize: 15, fontWeight: 600, textDecoration: "none" }}>
              Launch App
            </Link>
            <Link href="https://testnet.explorer.modulr.cloud/" target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", height: 52, padding: "0 32px", background: T.surface, color: T.text, borderRadius: T.radiusPill, fontSize: 15, fontWeight: 500, textDecoration: "none", border: sectionBorder }}>
              Explorer
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════ FAQ ════════════ */}
      <section style={{ borderTop: sectionBorder, padding: `${T.sectionPy} 24px`, maxWidth: 760, margin: "0 auto" }}>
        <h2 style={{ fontSize: "clamp(28px, 3.5vw, 40px)", fontWeight: 500, letterSpacing: "-0.03em", marginBottom: 40, textAlign: "center" }}>Frequently asked questions</h2>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {faqs.map((faq, idx) => (
            <div key={idx} style={{ borderBottom: sectionBorder }}>
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 0", background: "none", border: "none", cursor: "pointer", textAlign: "left", fontSize: "clamp(14px, 2vw, 16px)", fontWeight: 500, color: T.text }}
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

      {/* Bento grid + showcase responsive styles */}
      <style>{`
        @keyframes blink { 0%,50% { opacity: 1; } 51%,100% { opacity: 0; } }
        @keyframes globeSpin3d {
          0% { transform: rotateY(0deg) rotateX(8deg); }
          100% { transform: rotateY(360deg) rotateX(8deg); }
        }
        @keyframes rotateY {
          from { transform: rotateY(0deg); }
          to { transform: rotateY(360deg); }
        }
        @keyframes rotateYFast {
          from { transform: rotateY(0deg); }
          to { transform: rotateY(360deg); }
        }
        @keyframes rotateYPoints {
          from { transform: rotateY(0deg); }
          to { transform: rotateY(360deg); }
        }
        .globe-spin-3d {
          transform-style: preserve-3d;
          will-change: transform;
        }
        .globe-rotate-y {
          transform-origin: 410px 410px;
          animation: rotateY 20s linear infinite;
        }
        .globe-rotate-y-fast {
          transform-origin: 410px 410px;
          animation: rotateYFast 14s linear infinite;
        }
        .globe-rotate-y-points {
          transform-origin: 410px 410px;
          animation: rotateYPoints 24s linear infinite;
        }
        @media (max-width: 768px) {
          .bento-wide, .bento-narrow, .bento-third {
            grid-column: span 12 !important;
          }
          .hero-metrics-row {
            grid-template-columns: 1fr !important;
          }
          .showcase-3col {
            grid-template-columns: 1fr !important;
          }
          .explorer-grid {
            grid-template-columns: 1fr !important;
          }
          .explorer-metrics {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .globe-spin-3d {
            animation-duration: 18s;
          }
        }
        @media (min-width: 769px) and (max-width: 1024px) {
          .bento-wide { grid-column: span 12 !important; }
          .bento-narrow { grid-column: span 6 !important; }
          .bento-third { grid-column: span 6 !important; }
          .explorer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
