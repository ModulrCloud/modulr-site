"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { SiteFooter } from "@/components/SiteFooter";
import { MODULR_ASSETS } from "@/config/assets";

/* ─────────────────────────────────────────────────────────────────────────────
   Team page in new design style
   ───────────────────────────────────────────────────────────────────────────── */

const sidebarNav = [
  { label: "Home", href: "/example" },
  { label: "Research", href: "/example/research" },
  { label: "News", href: "/example/news" },
  { label: "Careers", href: "/example/careers" },
  { label: "Technology", href: "/technology-overview" },
  { label: "Team", href: "/example/team", active: true },
  { label: "Pricing", href: "/pricing" },
  { label: "For Business", href: "#" },
];

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
    imageSrc: "https://cdn.prod.website-files.com/688b650d15ca6b144341e1f7/6893cb16c3a320231f3ad9ae_Frame%201948754903%20(2).png",
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
];

/* Search data */
const searchIndex = [
  { title: "Home", href: "/example", category: "Navigation", keywords: ["main", "home"] },
  { title: "Research", href: "/example/research", category: "Navigation", keywords: ["papers"] },
  { title: "News", href: "/example/news", category: "Navigation", keywords: ["updates"] },
  { title: "Team", href: "/example/team", category: "Navigation", keywords: ["people", "founders"] },
];

export default function ExampleTeamPage() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

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

  return (
    <div
      className="min-h-screen"
      style={{
        background: "#000",
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      }}
    >
      {/* HEADER */}
      <header className="sticky top-0 z-50" style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-3">
          <Link href="/example" className="flex items-center gap-3">
            <img src={MODULR_ASSETS.LOGO_MARK} alt="Modulr" style={{ height: 28, width: "auto" }} />
          </Link>
          <div className="flex items-center gap-3">
            <button onClick={() => setSearchOpen(true)} style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "6px 12px", color: "rgba(255,255,255,0.5)", fontSize: 13, cursor: "pointer" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
              <span className="hidden sm:inline">Search</span>
              <kbd style={{ marginLeft: 4, padding: "2px 6px", borderRadius: 4, background: "rgba(255,255,255,0.08)", fontSize: 11 }}>⌘K</kbd>
            </button>
            <Link href="#" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 20, padding: "8px 16px", color: "#fff", fontSize: 14, fontWeight: 500, textDecoration: "none" }}>
              Sign in
            </Link>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="flex-1">
        <div className="mx-auto max-w-[1400px] px-6 py-10">
          <div className="flex gap-8">
            {/* SIDEBAR */}
            <aside className="hidden w-[160px] flex-shrink-0 lg:block">
              <nav className="sticky top-24 space-y-1">
                {sidebarNav.map((item) => (
                  <Link key={item.label} href={item.href} style={{ display: "block", padding: "8px 0", color: item.active ? "#fff" : "rgba(255,255,255,0.6)", fontSize: 14, textDecoration: "none", fontWeight: item.active ? 500 : 400 }}>
                    {item.label}
                  </Link>
                ))}
              </nav>
            </aside>

            {/* CONTENT */}
            <div className="flex-1 space-y-16">
              {/* Hero */}
              <section>
                <div style={{ fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 12 }}>
                  Team
                </div>
                <h1 style={{ fontSize: 48, fontWeight: 600, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
                  Meet the Team
                </h1>
                <p style={{ marginTop: 16, fontSize: 18, color: "rgba(255,255,255,0.6)", maxWidth: 600, lineHeight: 1.7 }}>
                  World-class engineers, researchers, and operators building the future of robotics.
                </p>
              </section>

              {/* Team grid */}
              <section>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {team.map((member) => (
                    <div
                      key={member.name}
                      className="group"
                      style={{
                        borderRadius: 20,
                        overflow: "hidden",
                        background: "rgba(255,255,255,0.02)",
                        border: "1px solid rgba(255,255,255,0.06)",
                        transition: "border-color 0.3s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)")}
                      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)")}
                    >
                      {/* Image */}
                      <div style={{ position: "relative", aspectRatio: "1", overflow: "hidden", background: "rgba(255,255,255,0.03)" }}>
                        {member.imageSrc && (
                          <Image
                            src={member.imageSrc}
                            alt={member.name}
                            fill
                            style={{ objectFit: "cover", filter: "grayscale(100%)", transition: "filter 0.4s" }}
                            className="group-hover:grayscale-0"
                          />
                        )}
                        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 50%)" }} />
                      </div>
                      {/* Info */}
                      <div style={{ padding: 24 }}>
                        <h3 style={{ fontSize: 18, fontWeight: 600, color: "#fff" }}>{member.name}</h3>
                        <div style={{ marginTop: 4, fontSize: 13, color: "rgba(242,180,0,0.9)", fontWeight: 500 }}>{member.role}</div>
                        <p style={{ marginTop: 12, fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>{member.bio}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* CTA */}
              <section style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 24, paddingTop: 20 }}>
                <div>
                  <h2 style={{ fontSize: 22, fontWeight: 400, color: "#fff" }}>Want to join us?</h2>
                  <p style={{ marginTop: 6, fontSize: 15, color: "rgba(255,255,255,0.5)" }}>We&apos;re always looking for talented people.</p>
                </div>
                <Link href="/example/careers" style={{ display: "inline-flex", alignItems: "center", borderRadius: 10, background: "#f2b400", color: "#000", padding: "10px 22px", fontSize: 14, fontWeight: 600, textDecoration: "none" }}>
                  View Open Positions
                </Link>
              </section>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />

      {/* SEARCH MODAL */}
      {searchOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 100, display: "flex", alignItems: "flex-start", justifyContent: "center", paddingTop: 100 }}>
          <div onClick={() => { setSearchOpen(false); setSearchQuery(""); }} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.8)", backdropFilter: "blur(8px)" }} />
          <div style={{ position: "relative", width: "100%", maxWidth: 560, margin: "0 24px", background: "rgba(24,24,24,0.98)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, overflow: "hidden", boxShadow: "0 24px 80px rgba(0,0,0,0.5)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px 20px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
              <input ref={searchInputRef} type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={{ flex: 1, background: "transparent", border: "none", outline: "none", fontSize: 16, color: "#fff" }} />
              <kbd style={{ padding: "4px 8px", borderRadius: 6, background: "rgba(255,255,255,0.08)", fontSize: 12, color: "rgba(255,255,255,0.5)" }}>ESC</kbd>
            </div>
            <div style={{ maxHeight: 400, overflowY: "auto" }}>
              {searchQuery.length === 0 ? (
                <div style={{ padding: "32px 20px", textAlign: "center", color: "rgba(255,255,255,0.4)", fontSize: 14 }}>Start typing to search...</div>
              ) : filteredResults.length === 0 ? (
                <div style={{ padding: "32px 20px", textAlign: "center", color: "rgba(255,255,255,0.4)", fontSize: 14 }}>No results found</div>
              ) : (
                <div style={{ padding: "8px 0" }}>
                  {filteredResults.map((item) => (
                    <Link key={item.href} href={item.href} onClick={() => { setSearchOpen(false); setSearchQuery(""); }} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 20px", color: "#fff", textDecoration: "none" }}>
                      <div>
                        <div style={{ fontSize: 15, fontWeight: 500 }}>{item.title}</div>
                        <div style={{ marginTop: 2, fontSize: 12, color: "rgba(255,255,255,0.4)" }}>{item.category}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
