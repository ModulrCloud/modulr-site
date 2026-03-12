"use client";

import Link from "next/link";
import { useState, useMemo, useRef, useEffect } from "react";
import { SiteFooter } from "@/components/SiteFooter";
import { MODULR_ASSETS } from "@/config/assets";
import { ExampleMegaNav } from "@/components/example/ExampleMegaNav";
import { researchCategories, researchPosts } from "@/content/research";
import { ScrollToTopButton } from "@/components/example/ScrollToTopButton";

/* ─────────────────────────────────────────────────────────────────────────────
   Research page in new design style
   ───────────────────────────────────────────────────────────────────────────── */

const sidebarNav = [
  { label: "Home", href: "/example" },
  { label: "Research", href: "/example/research", active: true },
  { label: "News", href: "/example/news" },
  { label: "Careers", href: "/example/careers" },
  { label: "Technology", href: "/technology-overview" },
  { label: "Team", href: "/example/team" },
  { label: "Pricing", href: "/pricing" },
  { label: "For Business", href: "#" },
];

/* Search data */
const searchIndex = [
  { title: "Home", href: "/example", category: "Navigation", keywords: ["main", "home"] },
  { title: "Research", href: "/example/research", category: "Navigation", keywords: ["papers", "publications"] },
  { title: "News", href: "/example/news", category: "Navigation", keywords: ["updates", "announcements"] },
  { title: "Careers", href: "/example/careers", category: "Navigation", keywords: ["jobs", "work"] },
  { title: "Team", href: "/example/team", category: "Navigation", keywords: ["people", "founders"] },
];

export default function ExampleResearchPage() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filterQuery, setFilterQuery] = useState("");
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
  const cardBg = theme === "dark" ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)";
  const cardBorder = theme === "dark" ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)";
  const cardBorderHover = theme === "dark" ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)";
  const inputBg = theme === "dark" ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)";

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

  const filteredPosts = useMemo(() => {
    return researchPosts.filter((post) => {
      const q = filterQuery.trim().toLowerCase();
      const matchesSearch =
        q === "" ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q);
      const matchesCategory =
        selectedCategory === "All" || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [filterQuery, selectedCategory]);

  return (
    <div
      className="min-h-screen"
      style={{
        background: bgColor,
        color: textColor,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        transition: "background 0.3s, color 0.3s",
      }}
    >
      {/* HEADER */}
      <header
        className="sticky top-0 z-50"
        style={{
          background: theme === "dark" ? "rgba(0,0,0,0.85)" : "rgba(255,255,255,0.85)",
          backdropFilter: "blur(20px)",
          borderBottom: `1px solid ${borderColor}`,
        }}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-3">
          <div className="flex items-center gap-6">
            <Link href="/example" className="flex items-center gap-3">
              <img src={MODULR_ASSETS.LOGO_MARK} alt="Modulr" style={{ height: 28, width: "auto" }} />
            </Link>
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
                border: `1px solid ${borderColor2}`,
                borderRadius: 8,
                padding: "6px 12px",
                color: theme === "dark" ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)",
                fontSize: 13,
                cursor: "pointer",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
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
      </header>

      {/* MAIN */}
      <main className="flex-1">
        <div className="mx-auto max-w-[1400px] px-6 py-10">
          <div className="flex gap-8">
            {/* SIDEBAR */}
            <aside className="hidden w-[160px] flex-shrink-0 lg:block">
              <nav className="sticky top-24 space-y-1">
                {sidebarNav.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    style={{
                      display: "block",
                      padding: "8px 0",
                      color: item.active ? textColor : mutedTextColor,
                      fontSize: 14,
                      textDecoration: "none",
                      fontWeight: item.active ? 500 : 400,
                    }}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </aside>

            {/* CONTENT */}
            <div className="flex-1 space-y-12">
              {/* Hero */}
              <section>
                <div style={{ fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: mutedTextColor2, marginBottom: 12 }}>
                  Research
                </div>
                <h1 style={{ fontSize: 48, fontWeight: 600, color: textColor, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
                  Research &<br />Publications
                </h1>
                <p style={{ marginTop: 16, fontSize: 18, color: mutedTextColor, maxWidth: 600, lineHeight: 1.7 }}>
                  Explore our latest research, whitepapers, and technical documentation on robotics, AI, and decentralized systems.
                </p>
              </section>

              {/* Filter */}
              <section style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
                <div style={{ position: "relative", flex: 1, minWidth: 200, maxWidth: 320 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={mutedTextColor2} strokeWidth="2" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }}>
                    <circle cx="11" cy="11" r="8" />
                    <path d="M21 21l-4.35-4.35" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search research..."
                    value={filterQuery}
                    onChange={(e) => setFilterQuery(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "10px 12px 10px 40px",
                      background: inputBg,
                      border: `1px solid ${borderColor2}`,
                      borderRadius: 10,
                      color: textColor,
                      fontSize: 14,
                      outline: "none",
                    }}
                  />
                </div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {researchCategories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      style={{
                        padding: "8px 14px",
                        borderRadius: 20,
                        background: selectedCategory === cat
                          ? (theme === "dark" ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.06)")
                          : inputBg,
                        border: `1px solid ${borderColor2}`,
                        color: selectedCategory === cat ? textColor : mutedTextColor,
                        fontSize: 13,
                        cursor: "pointer",
                      }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </section>

              {/* Posts grid */}
              <section>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {filteredPosts.map((post) => (
                    <Link
                      key={post.slug}
                      href={`/research/${post.slug}`}
                      className="group block"
                      style={{
                        padding: 24,
                        borderRadius: 16,
                        background: cardBg,
                        border: `1px solid ${cardBorder}`,
                        transition: "border-color 0.2s, transform 0.2s",
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.borderColor = cardBorderHover; e.currentTarget.style.transform = "translateY(-2px)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.borderColor = cardBorder; e.currentTarget.style.transform = "translateY(0)"; }}
                    >
                      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                        <span style={{ padding: "4px 10px", borderRadius: 12, background: theme === "dark" ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)", fontSize: 11, color: mutedTextColor, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                          {post.category}
                        </span>
                      </div>
                      <h3 style={{ fontSize: 17, fontWeight: 500, color: textColor, lineHeight: 1.4, marginBottom: 8 }}>
                        {post.title}
                      </h3>
                      <p style={{ fontSize: 14, color: mutedTextColor, lineHeight: 1.6, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                        {post.excerpt}
                      </p>
                      <div style={{ marginTop: 16, fontSize: 12, color: mutedTextColor2 }}>
                        {post.date} · {post.readingMinutes} min read
                      </div>
                    </Link>
                  ))}
                </div>
                {filteredPosts.length === 0 && (
                  <div style={{ textAlign: "center", padding: 48, color: mutedTextColor2 }}>
                    No research posts found matching your criteria.
                  </div>
                )}
              </section>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />

      {/* SCROLL TO TOP */}
      <ScrollToTopButton theme={theme} />

      {/* SEARCH MODAL */}
      {searchOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 100, display: "flex", alignItems: "flex-start", justifyContent: "center", paddingTop: 100 }}>
          <div onClick={() => { setSearchOpen(false); setSearchQuery(""); }} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.8)", backdropFilter: "blur(8px)" }} />
          <div style={{ position: "relative", width: "100%", maxWidth: 560, margin: "0 24px", background: theme === "dark" ? "rgba(24,24,24,0.98)" : "rgba(255,255,255,0.98)", border: `1px solid ${borderColor2}`, borderRadius: 16, overflow: "hidden", boxShadow: theme === "dark" ? "0 24px 80px rgba(0,0,0,0.5)" : "0 24px 80px rgba(0,0,0,0.18)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px 20px", borderBottom: `1px solid ${borderColor}` }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={mutedTextColor2} strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
              <input ref={searchInputRef} type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={{ flex: 1, background: "transparent", border: "none", outline: "none", fontSize: 16, color: textColor }} />
              <kbd style={{ padding: "4px 8px", borderRadius: 6, background: inputBg, fontSize: 12, color: mutedTextColor }}>ESC</kbd>
            </div>
            <div style={{ maxHeight: 400, overflowY: "auto" }}>
              {searchQuery.length === 0 ? (
                <div style={{ padding: "32px 20px", textAlign: "center", color: mutedTextColor2, fontSize: 14 }}>Start typing to search...</div>
              ) : filteredResults.length === 0 ? (
                <div style={{ padding: "32px 20px", textAlign: "center", color: mutedTextColor2, fontSize: 14 }}>No results found</div>
              ) : (
                <div style={{ padding: "8px 0" }}>
                  {filteredResults.map((item) => (
                    <Link key={item.href} href={item.href} onClick={() => { setSearchOpen(false); setSearchQuery(""); }} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 20px", color: textColor, textDecoration: "none" }}>
                      <div>
                        <div style={{ fontSize: 15, fontWeight: 500 }}>{item.title}</div>
                        <div style={{ marginTop: 2, fontSize: 12, color: mutedTextColor2 }}>{item.category}</div>
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
