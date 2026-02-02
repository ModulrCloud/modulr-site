"use client";

import Link from "next/link";
import { useState, useMemo, useRef, useEffect } from "react";
import { SiteFooter } from "@/components/SiteFooter";
import { MODULR_ASSETS } from "@/config/assets";
import { researchCategories, researchPosts } from "@/content/research";

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
        background: "#000",
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      }}
    >
      {/* HEADER */}
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
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
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
                  <Link
                    key={item.label}
                    href={item.href}
                    style={{
                      display: "block",
                      padding: "8px 0",
                      color: item.active ? "#fff" : "rgba(255,255,255,0.6)",
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
                <div style={{ fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 12 }}>
                  Research
                </div>
                <h1 style={{ fontSize: 48, fontWeight: 600, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
                  Research &<br />Publications
                </h1>
                <p style={{ marginTop: 16, fontSize: 18, color: "rgba(255,255,255,0.6)", maxWidth: 600, lineHeight: 1.7 }}>
                  Explore our latest research, whitepapers, and technical documentation on robotics, AI, and decentralized systems.
                </p>
              </section>

              {/* Filter */}
              <section style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
                <div style={{ position: "relative", flex: 1, minWidth: 200, maxWidth: 320 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }}>
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
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: 10,
                      color: "#fff",
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
                        background: selectedCategory === cat ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        color: selectedCategory === cat ? "#fff" : "rgba(255,255,255,0.6)",
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
                        background: "rgba(255,255,255,0.02)",
                        border: "1px solid rgba(255,255,255,0.06)",
                        transition: "border-color 0.2s, transform 0.2s",
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; e.currentTarget.style.transform = "translateY(0)"; }}
                    >
                      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                        <span style={{ padding: "4px 10px", borderRadius: 12, background: "rgba(255,255,255,0.06)", fontSize: 11, color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                          {post.category}
                        </span>
                      </div>
                      <h3 style={{ fontSize: 17, fontWeight: 500, color: "#fff", lineHeight: 1.4, marginBottom: 8 }}>
                        {post.title}
                      </h3>
                      <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.6, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                        {post.excerpt}
                      </p>
                      <div style={{ marginTop: 16, fontSize: 12, color: "rgba(255,255,255,0.4)" }}>
                        {post.date} · {post.readingMinutes} min read
                      </div>
                    </Link>
                  ))}
                </div>
                {filteredPosts.length === 0 && (
                  <div style={{ textAlign: "center", padding: 48, color: "rgba(255,255,255,0.4)" }}>
                    No research posts found matching your criteria.
                  </div>
                )}
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
