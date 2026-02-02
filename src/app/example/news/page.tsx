"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { SiteFooter } from "@/components/SiteFooter";
import { MODULR_ASSETS } from "@/config/assets";
import { newsPosts } from "@/content/news";

const sidebarNav = [
  { label: "Home", href: "/example" },
  { label: "Research", href: "/research" },
  { label: "News", href: "/example/news", active: true },
  { label: "Careers", href: "/careers" },
  { label: "Technology", href: "/technology-overview" },
  { label: "Team", href: "/team" },
  { label: "Pricing", href: "/pricing" },
  { label: "For Business", href: "#" },
];

const categories = ["All", "Product", "Company", "Publication", "Update"];

/* Search data */
const searchIndex = [
  { title: "Home", href: "/example", category: "Navigation", keywords: ["main", "home", "start"] },
  { title: "Research", href: "/research", category: "Navigation", keywords: ["papers", "publications", "studies"] },
  { title: "News", href: "/example/news", category: "Navigation", keywords: ["updates", "announcements", "blog"] },
  { title: "Careers", href: "/careers", category: "Navigation", keywords: ["jobs", "work", "hiring", "positions"] },
  { title: "Technology Overview", href: "/technology-overview", category: "Navigation", keywords: ["tech", "platform", "architecture"] },
  { title: "Team", href: "/team", category: "Navigation", keywords: ["people", "founders", "employees"] },
  { title: "Pricing", href: "/pricing", category: "Navigation", keywords: ["cost", "plans", "subscription"] },
];

export default function ExampleNewsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const footerRef = useRef<HTMLDivElement>(null);
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

  const filteredPosts =
    activeCategory === "All"
      ? newsPosts
      : newsPosts.filter((p) => p.category === activeCategory || p.type === activeCategory);

  const featured = newsPosts[0];

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

      {/* ───────────────────────────── MAIN ───────────────────────────── */}
      <main className="mx-auto max-w-[1400px] px-6 py-10">
        <div className="flex gap-8">
          {/* ─────────────── LEFT SIDEBAR ─────────────── */}
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
                    fontWeight: item.active ? 500 : 400,
                    textDecoration: "none",
                    transition: "color 0.15s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = item.active ? "#fff" : "rgba(255,255,255,0.6)")}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </aside>

          {/* ─────────────── CONTENT ─────────────── */}
          <div className="flex-1 space-y-12">
            {/* Page header */}
            <div>
              <div
                style={{
                  fontSize: 11,
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.4)",
                  marginBottom: 12,
                }}
              >
                Newsroom
              </div>
              <h1
                style={{
                  fontSize: 48,
                  fontWeight: 400,
                  color: "#fff",
                  letterSpacing: "-0.03em",
                  lineHeight: 1.1,
                }}
              >
                News & Updates
              </h1>
              <p
                style={{
                  marginTop: 16,
                  fontSize: 17,
                  color: "rgba(255,255,255,0.55)",
                  maxWidth: 560,
                  lineHeight: 1.6,
                }}
              >
                Stay up to date with the latest announcements, product updates, and community stories from Modulr.
              </p>
            </div>

            {/* Category filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    padding: "8px 16px",
                    borderRadius: 20,
                    fontSize: 13,
                    fontWeight: 500,
                    border: "1px solid",
                    borderColor: activeCategory === cat ? "rgba(242,180,0,0.5)" : "rgba(255,255,255,0.12)",
                    background: activeCategory === cat ? "rgba(242,180,0,0.15)" : "rgba(255,255,255,0.04)",
                    color: activeCategory === cat ? "#f2b400" : "rgba(255,255,255,0.7)",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Featured post */}
            <section>
              <div
                style={{
                  fontSize: 11,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.4)",
                  marginBottom: 16,
                }}
              >
                Featured
              </div>
              <Link
                href={`/news/${featured.slug}`}
                className="group block overflow-hidden"
                style={{
                  borderRadius: 20,
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div className="grid lg:grid-cols-2 gap-0">
                  <div style={{ position: "relative", aspectRatio: "16/10", overflow: "hidden" }}>
                    <Image
                      src={featured.image}
                      alt={featured.title}
                      fill
                      style={{ objectFit: "cover", transition: "transform 0.5s" }}
                      className="group-hover:scale-105"
                    />
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(to right, transparent, rgba(0,0,0,0.6))",
                      }}
                    />
                  </div>
                  <div style={{ padding: "40px 36px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                    <div className="flex items-center gap-3" style={{ marginBottom: 16 }}>
                      <span
                        style={{
                          padding: "4px 10px",
                          borderRadius: 6,
                          fontSize: 11,
                          fontWeight: 600,
                          textTransform: "uppercase",
                          letterSpacing: "0.1em",
                          background: "rgba(242,180,0,0.15)",
                          color: "#f2b400",
                        }}
                      >
                        {featured.category}
                      </span>
                      <span style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>
                        {featured.date} · {featured.readingMinutes} min read
                      </span>
                    </div>
                    <h2
                      style={{
                        fontSize: 28,
                        fontWeight: 500,
                        color: "#fff",
                        lineHeight: 1.3,
                        transition: "color 0.2s",
                      }}
                      className="group-hover:text-[#f2b400]"
                    >
                      {featured.title}
                    </h2>
                    <p
                      style={{
                        marginTop: 14,
                        fontSize: 15,
                        color: "rgba(255,255,255,0.55)",
                        lineHeight: 1.7,
                      }}
                    >
                      {featured.excerpt}
                    </p>
                    <div
                      style={{
                        marginTop: 24,
                        fontSize: 14,
                        fontWeight: 500,
                        color: "#fff",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 8,
                      }}
                    >
                      Read article
                      <span style={{ transition: "transform 0.2s" }} className="group-hover:translate-x-1">
                        →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </section>

            {/* All posts grid */}
            <section>
              <div
                style={{
                  fontSize: 11,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.4)",
                  marginBottom: 20,
                }}
              >
                All posts
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredPosts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/news/${post.slug}`}
                    className="group block overflow-hidden"
                    style={{
                      borderRadius: 16,
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(255,255,255,0.06)",
                      transition: "border-color 0.2s, background 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                      e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                      e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                    }}
                  >
                    <div style={{ position: "relative", aspectRatio: "16/10", overflow: "hidden" }}>
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        style={{ objectFit: "cover", transition: "transform 0.5s" }}
                        className="group-hover:scale-105"
                      />
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
                        }}
                      />
                      <div style={{ position: "absolute", bottom: 12, left: 12 }}>
                        <span
                          style={{
                            padding: "4px 8px",
                            borderRadius: 5,
                            fontSize: 10,
                            fontWeight: 600,
                            textTransform: "uppercase",
                            letterSpacing: "0.08em",
                            background: "rgba(0,0,0,0.6)",
                            backdropFilter: "blur(8px)",
                            color: "rgba(255,255,255,0.9)",
                            border: "1px solid rgba(255,255,255,0.1)",
                          }}
                        >
                          {post.category}
                        </span>
                      </div>
                    </div>
                    <div style={{ padding: "18px 18px 22px" }}>
                      <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginBottom: 8 }}>
                        {post.date} · {post.readingMinutes} min read
                      </div>
                      <h3
                        style={{
                          fontSize: 16,
                          fontWeight: 500,
                          color: "#fff",
                          lineHeight: 1.4,
                          transition: "color 0.2s",
                        }}
                        className="group-hover:text-[#f2b400]"
                      >
                        {post.title}
                      </h3>
                      <p
                        style={{
                          marginTop: 8,
                          fontSize: 13,
                          color: "rgba(255,255,255,0.5)",
                          lineHeight: 1.6,
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {post.excerpt}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>

      <div ref={footerRef}>
        <SiteFooter />
      </div>

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
          <div
            onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
            style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.8)", backdropFilter: "blur(8px)" }}
          />
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
            <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px 20px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ flex: 1, background: "transparent", border: "none", outline: "none", fontSize: 16, color: "#fff" }}
              />
              <kbd style={{ padding: "4px 8px", borderRadius: 6, background: "rgba(255,255,255,0.08)", fontSize: 12, color: "rgba(255,255,255,0.5)" }}>ESC</kbd>
            </div>
            <div style={{ maxHeight: 400, overflowY: "auto" }}>
              {searchQuery.length === 0 ? (
                <div style={{ padding: "32px 20px", textAlign: "center", color: "rgba(255,255,255,0.4)", fontSize: 14 }}>
                  Start typing to search...
                </div>
              ) : filteredResults.length === 0 ? (
                <div style={{ padding: "32px 20px", textAlign: "center", color: "rgba(255,255,255,0.4)", fontSize: 14 }}>
                  No results found
                </div>
              ) : (
                <div style={{ padding: "8px 0" }}>
                  {filteredResults.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
                      style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 20px", color: "#fff", textDecoration: "none" }}
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
        .group-hover\\:text-\\[\\#f2b400\\]:hover {
          color: #f2b400;
        }
      `}</style>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/* TRIANGLE LOADER                                                              */
/* ═══════════════════════════════════════════════════════════════════════════ */

function PageLoader() {
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
      <div style={{ textAlign: "center", position: "relative" }}>
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
            zIndex: -1,
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
