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
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    if (typeof window === "undefined") return "light";
    return (localStorage.getItem("theme") as "dark" | "light" | null) ?? "light";
  });
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

  const bgColor = theme === "dark" ? "#000" : "#fff";
  const textColor = theme === "dark" ? "#fff" : "#000";
  const mutedTextColor = theme === "dark" ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)";
  const mutedTextColor2 = theme === "dark" ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)";
  const borderColor = theme === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
  const borderColor2 = theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";
  const cardBg = theme === "dark" ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.92)";
  const cardBorder = theme === "dark" ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.10)";
  const cardBorderHover = theme === "dark" ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.18)";
  const cardShadow =
    theme === "dark"
      ? "0 28px 90px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.04)"
      : "0 24px 70px rgba(0,0,0,0.10), 0 0 0 1px rgba(0,0,0,0.05)";
  const roleColor = theme === "dark" ? "rgba(242,180,0,0.92)" : "rgba(184,132,0,0.92)";

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
        background: bgColor,
        color: textColor,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        position: "relative",
      }}
    >
      {/* Subtle page background (adds depth in light theme) */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          background:
            theme === "dark"
              ? "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(242,180,0,0.08), transparent 50%), radial-gradient(ellipse 60% 40% at 50% 100%, rgba(242,180,0,0.05), transparent 50%)"
              : "radial-gradient(900px 520px at 22% 10%, rgba(242,180,0,0.10), transparent 60%), radial-gradient(800px 540px at 78% 20%, rgba(0,0,0,0.06), transparent 62%), radial-gradient(900px 560px at 50% 110%, rgba(0,0,0,0.05), transparent 65%)",
        }}
      />

      <div style={{ position: "relative", zIndex: 1 }}>
      {/* HEADER */}
      <header className="sticky top-0 z-50" style={{ background: theme === "dark" ? "rgba(0,0,0,0.85)" : "rgba(255,255,255,0.85)", backdropFilter: "blur(20px)", borderBottom: `1px solid ${borderColor}` }}>
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-3">
          <Link href="/example" className="flex items-center gap-3">
            <img src={MODULR_ASSETS.LOGO_MARK} alt="Modulr" style={{ height: 28, width: "auto" }} />
          </Link>
          <div className="flex items-center gap-3">
            <button onClick={() => setSearchOpen(true)} style={{ display: "flex", alignItems: "center", gap: 8, background: theme === "dark" ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)", border: `1px solid ${borderColor2}`, borderRadius: 8, padding: "6px 12px", color: theme === "dark" ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)", fontSize: 13, cursor: "pointer" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
              <span className="hidden sm:inline">Search</span>
              <kbd style={{ marginLeft: 4, padding: "2px 6px", borderRadius: 4, background: theme === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)", fontSize: 11 }}>⌘K</kbd>
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
                border: `1px solid ${borderColor2}`,
                color: theme === "dark" ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.7)",
                cursor: "pointer",
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
            <Link href="https://app.modulr.cloud" target="_blank" rel="noreferrer" style={{ background: theme === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)", border: `1px solid ${theme === "dark" ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)"}`, borderRadius: 20, padding: "8px 16px", color: theme === "dark" ? "#fff" : "#000", fontSize: 14, fontWeight: 500, textDecoration: "none" }}>
              Go to App
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
                  <Link key={item.label} href={item.href} style={{ display: "block", padding: "8px 0", color: item.active ? textColor : mutedTextColor, fontSize: 14, textDecoration: "none", fontWeight: item.active ? 500 : 400 }}>
                    {item.label}
                  </Link>
                ))}
              </nav>
            </aside>

            {/* CONTENT */}
            <div className="flex-1 space-y-16">
              {/* Hero */}
              <section>
                <div style={{ fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: mutedTextColor2, marginBottom: 12 }}>
                  Team
                </div>
                <h1 style={{ fontSize: 48, fontWeight: 600, color: textColor, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
                  Meet the Team
                </h1>
                <p style={{ marginTop: 16, fontSize: 18, color: mutedTextColor, maxWidth: 600, lineHeight: 1.7 }}>
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
                        background: cardBg,
                        border: `1px solid ${cardBorder}`,
                        boxShadow: cardShadow,
                        transition: "border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = cardBorderHover;
                        e.currentTarget.style.transform = "translateY(-2px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = cardBorder;
                        e.currentTarget.style.transform = "translateY(0px)";
                      }}
                    >
                      {/* Image */}
                      <div
                        style={{
                          position: "relative",
                          aspectRatio: "1",
                          overflow: "hidden",
                          background: theme === "dark" ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)",
                        }}
                      >
                        {member.imageSrc && (
                          <Image
                            src={member.imageSrc}
                            alt={member.name}
                            fill
                            style={{
                              objectFit: "cover",
                              filter: theme === "dark" ? "grayscale(100%) contrast(1.05)" : "grayscale(100%) contrast(1.08) brightness(0.98)",
                              transition: "filter 0.4s",
                            }}
                            className="group-hover:grayscale-0"
                          />
                        )}
                        <div
                          style={{
                            position: "absolute",
                            inset: 0,
                            background:
                              theme === "dark"
                                ? "linear-gradient(to top, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.22) 55%, transparent 82%)"
                                : "linear-gradient(to top, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.14) 58%, transparent 84%)",
                          }}
                        />
                      </div>
                      {/* Info */}
                      <div style={{ padding: 24 }}>
                        <h3 style={{ fontSize: 18, fontWeight: 650, color: textColor, letterSpacing: "-0.01em" }}>
                          {member.name}
                        </h3>
                        <div style={{ marginTop: 6, fontSize: 13, color: roleColor, fontWeight: 600 }}>
                          {member.role}
                        </div>
                        <p style={{ marginTop: 12, fontSize: 14, color: mutedTextColor, lineHeight: 1.65 }}>
                          {member.bio}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* CTA */}
              <section style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 24, paddingTop: 20 }}>
                <div>
                  <h2 style={{ fontSize: 22, fontWeight: 500, color: textColor }}>Want to join us?</h2>
                  <p style={{ marginTop: 6, fontSize: 15, color: mutedTextColor }}>
                    We&apos;re always looking for talented people.
                  </p>
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
    </div>
  );
}
