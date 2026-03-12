"use client";

import Link from "next/link";
import { useMemo, useState, useEffect, useRef } from "react";
import { SiteFooter } from "@/components/SiteFooter";
import { MODULR_ASSETS } from "@/config/assets";
import { ExampleMegaNav } from "@/components/example/ExampleMegaNav";
import { ScrollToTopButton } from "@/components/example/ScrollToTopButton";

const sidebarNav = [
  { label: "Home", href: "/example" },
  { label: "Research", href: "/example/research" },
  { label: "News", href: "/example/news", active: true },
  { label: "Careers", href: "/example/careers" },
  { label: "Technology", href: "/technology-overview" },
  { label: "Team", href: "/example/team" },
  { label: "Pricing", href: "/pricing" },
  { label: "For Business", href: "#" },
];

type RoboticsStory = { href: string; title: string; meta: string; image: string };

function sourceFromMeta(meta: string): string {
  const part = meta.split(" • ")[0]?.trim();
  return part || "Article";
}

function proxiedImage(src: string) {
  if (!src?.startsWith("http")) return src;
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
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash * 31 + input.charCodeAt(i)) >>> 0;
  }
  return hash;
}

function storyGradient(seed: string, theme: "dark" | "light"): string {
  const gradientsLight = [
    "radial-gradient(220px 140px at 20% 38%, rgba(66,155,255,0.96), transparent 62%), radial-gradient(260px 170px at 82% 34%, rgba(255,156,73,0.82), transparent 62%), #d8e2f5",
    "radial-gradient(230px 145px at 24% 44%, rgba(46,201,140,0.90), transparent 60%), radial-gradient(255px 165px at 78% 35%, rgba(69,128,255,0.78), transparent 62%), #d9e8ea",
    "radial-gradient(225px 140px at 26% 48%, rgba(255,118,70,0.88), transparent 60%), radial-gradient(255px 170px at 80% 35%, rgba(249,65,65,0.74), transparent 62%), #eadfe1",
    "radial-gradient(235px 150px at 24% 42%, rgba(133,103,255,0.86), transparent 62%), radial-gradient(255px 170px at 78% 35%, rgba(59,178,255,0.78), transparent 60%), #dde2f3",
    "radial-gradient(210px 132px at 20% 34%, rgba(37,128,255,0.94), transparent 62%), radial-gradient(270px 178px at 82% 38%, rgba(255,113,170,0.74), transparent 62%), #d8e0f1",
    "radial-gradient(220px 136px at 24% 40%, rgba(44,198,229,0.92), transparent 62%), radial-gradient(250px 168px at 80% 40%, rgba(255,195,82,0.78), transparent 62%), #dde8ef",
  ];
  const gradientsDark = [
    "radial-gradient(220px 140px at 24% 44%, rgba(65,127,255,0.70), transparent 62%), radial-gradient(250px 165px at 80% 36%, rgba(255,136,55,0.56), transparent 62%), #10131d",
    "radial-gradient(230px 145px at 24% 46%, rgba(56,198,143,0.66), transparent 60%), radial-gradient(250px 165px at 78% 34%, rgba(66,110,220,0.58), transparent 60%), #10181a",
    "radial-gradient(220px 132px at 26% 48%, rgba(224,96,58,0.66), transparent 60%), radial-gradient(250px 165px at 78% 36%, rgba(193,62,62,0.56), transparent 60%), #181215",
    "radial-gradient(230px 145px at 24% 44%, rgba(117,96,225,0.66), transparent 62%), radial-gradient(260px 170px at 78% 35%, rgba(54,136,216,0.56), transparent 60%), #10141d",
    "radial-gradient(220px 138px at 20% 36%, rgba(51,111,236,0.70), transparent 62%), radial-gradient(265px 175px at 82% 38%, rgba(230,88,145,0.52), transparent 62%), #111320",
    "radial-gradient(220px 136px at 24% 40%, rgba(46,166,198,0.68), transparent 62%), radial-gradient(255px 170px at 80% 40%, rgba(230,160,74,0.54), transparent 62%), #11181a",
  ];
  const list = theme === "dark" ? gradientsDark : gradientsLight;
  return list[hashValue(seed) % list.length];
}

function storyTone(seed: string, theme: "dark" | "light"): string {
  const tonesLight = [
    "linear-gradient(145deg, rgba(9,18,36,0.16), rgba(255,255,255,0.04) 52%, rgba(8,10,16,0.14))",
    "linear-gradient(145deg, rgba(18,24,44,0.14), rgba(255,255,255,0.08) 48%, rgba(18,24,44,0.18))",
    "radial-gradient(420px 260px at 50% 100%, rgba(8,14,26,0.20), transparent 60%)",
  ];
  const tonesDark = [
    "linear-gradient(145deg, rgba(255,255,255,0.05), rgba(0,0,0,0.30) 56%, rgba(0,0,0,0.56))",
    "linear-gradient(145deg, rgba(255,255,255,0.03), rgba(0,0,0,0.24) 48%, rgba(0,0,0,0.52))",
    "radial-gradient(500px 300px at 50% 100%, rgba(0,0,0,0.55), transparent 60%)",
  ];
  const list = theme === "dark" ? tonesDark : tonesLight;
  return list[hashValue(seed + "-tone") % list.length];
}

/* Search data */
const searchIndex = [
  { title: "Home", href: "/example", category: "Navigation", keywords: ["main", "home", "start"] },
  { title: "Research", href: "/example/research", category: "Navigation", keywords: ["papers", "publications", "studies"] },
  { title: "News", href: "/example/news", category: "Navigation", keywords: ["updates", "announcements", "blog"] },
  { title: "Careers", href: "/example/careers", category: "Navigation", keywords: ["jobs", "work", "hiring", "positions"] },
  { title: "Technology Overview", href: "/technology-overview", category: "Navigation", keywords: ["tech", "platform", "architecture"] },
  { title: "Team", href: "/example/team", category: "Navigation", keywords: ["people", "founders", "employees"] },
  { title: "Pricing", href: "/pricing", category: "Navigation", keywords: ["cost", "plans", "subscription"] },
];

export default function ExampleNewsPage() {
  const [activeSource, setActiveSource] = useState("All");
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [stories, setStories] = useState<RoboticsStory[]>([]);
  const [storiesStatus, setStoriesStatus] = useState<"idle" | "loading" | "ready" | "error">("idle");
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    if (typeof window === "undefined") return "light";
    return (localStorage.getItem("theme") as "dark" | "light" | null) ?? "light";
  });
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
        const res = await fetch("/api/robotics-news?limit=12", { cache: "no-store" });
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

  const bgColor = theme === "dark" ? "#000" : "#fff";
  const textColor = theme === "dark" ? "#fff" : "#000";
  const mutedTextColor = theme === "dark" ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)";
  const mutedTextColor2 = theme === "dark" ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)";
  const mutedTextColor3 = theme === "dark" ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)";
  const borderColor = theme === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
  const borderColor2 = theme === "dark" ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)";
  const cardBg = theme === "dark" ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)";
  const cardBg2 = theme === "dark" ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)";
  const blogSurface = theme === "dark" ? "#111214" : "#efeff0";
  const blogTile = theme === "dark" ? "#15161a" : "#f7f7f8";
  const blogBorder = theme === "dark" ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.10)";

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

  const sources = useMemo(() => {
    const set = new Set<string>();
    for (const s of stories) set.add(sourceFromMeta(s.meta));
    return ["All", ...Array.from(set)];
  }, [stories]);

  const filteredStories = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return stories.filter((s) => {
      if (activeSource !== "All" && sourceFromMeta(s.meta) !== activeSource) return false;
      if (q && !s.title.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [activeSource, searchQuery, stories]);

  const featured = filteredStories[0] ?? stories[0];
  const rest = featured ? filteredStories.slice(1) : [];

  return (
    <div
      className="min-h-screen animate-fadeIn"
      style={{
        background: bgColor,
        color: textColor,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        transition: "background 0.3s, color 0.3s",
      }}
    >
      {/* ───────────────────────────── HEADER ───────────────────────────── */}
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
                    color: item.active ? textColor : mutedTextColor,
                    fontSize: 14,
                    fontWeight: item.active ? 500 : 400,
                    textDecoration: "none",
                    transition: "color 0.15s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = textColor)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = item.active ? textColor : mutedTextColor)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </aside>

          {/* ─────────────── CONTENT ─────────────── */}
          <div className="flex-1 space-y-12 max-w-[980px]">
            {/* Page header */}
            <div>
              <div
                style={{
                  fontSize: 11,
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: mutedTextColor3,
                  marginBottom: 12,
                }}
              >
                Newsroom
              </div>
              <h1
                style={{
                  fontSize: 54,
                  fontWeight: 520,
                  color: textColor,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.05,
                }}
              >
                News & Updates
              </h1>
              <p
                style={{
                  marginTop: 14,
                  fontSize: 18,
                  color: mutedTextColor,
                  maxWidth: 620,
                  lineHeight: 1.62,
                }}
              >
                Stay up to date with the latest announcements, product updates, and community stories from Modulr.
              </p>
            </div>

            {/* Category filters */}
            <div className="flex flex-wrap gap-2">
              {sources.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveSource(cat)}
                  style={{
                    padding: "8px 16px",
                    borderRadius: 28,
                    fontSize: 13,
                    fontWeight: 500,
                    border: "1px solid",
                    borderColor: activeSource === cat ? "rgba(242,180,0,0.5)" : borderColor2,
                    background: activeSource === cat ? "rgba(242,180,0,0.15)" : blogTile,
                    color: activeSource === cat ? "#f2b400" : mutedTextColor,
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
              {featured ? (
                <div className="mb-7 grid gap-5 lg:grid-cols-[0.35fr_0.65fr] lg:items-center">
                  <div>
                    <div style={{ fontSize: 12, color: mutedTextColor2, textTransform: "uppercase", letterSpacing: "0.16em" }}>
                      Product
                    </div>
                    <h2 style={{ marginTop: 8, color: textColor, fontSize: 42 / 1.05, lineHeight: 1.1, letterSpacing: "-0.02em", fontWeight: 520 }}>
                      {featured.title}
                    </h2>
                    <a
                      href={featured.href}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        marginTop: 18,
                        height: 44,
                        borderRadius: 999,
                        padding: "0 18px",
                        display: "inline-flex",
                        alignItems: "center",
                        textDecoration: "none",
                        color: theme === "dark" ? "#0f1218" : "#fff",
                        background: theme === "dark" ? "#f4f4f6" : "#0f1218",
                        fontSize: 14,
                        fontWeight: 600,
                      }}
                    >
                      Read article
                    </a>
                  </div>
                  <div style={{ borderRadius: 30, overflow: "hidden", border: `1px solid ${blogBorder}`, position: "relative", aspectRatio: "16/9", background: storyGradient(featured.title, theme) }}>
                    <img
                      src={proxiedImage(featured.image)}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        filter: theme === "dark" ? "blur(7px) saturate(1.45) contrast(1.12)" : "blur(8px) saturate(1.42) contrast(1.12)",
                        transform: "scale(1.09)",
                        opacity: theme === "dark" ? 0.68 : 0.62,
                      }}
                    />
                    <div style={{ position: "absolute", inset: 0, background: storyTone(featured.title + featured.meta, theme) }} />
                    <div style={{ position: "absolute", left: 18, top: 16 }}>
                      <span style={{ padding: "5px 12px", borderRadius: 999, background: "rgba(255,255,255,0.88)", color: "#101217", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                        Product
                      </span>
                    </div>
                    <div style={{ position: "absolute", left: 20, right: 20, bottom: 22, textAlign: "center", color: "#fff", fontSize: 64 / 1.4, lineHeight: 1.04, letterSpacing: "-0.02em", fontWeight: 500, textShadow: "0 2px 22px rgba(0,0,0,0.48), 0 1px 2px rgba(0,0,0,0.55)" }}>
                      {featured.title}
                    </div>
                  </div>
                </div>
              ) : null}
            </section>

            {/* All posts grid */}
            <section>
              <div
                style={{
                  fontSize: 11,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: mutedTextColor3,
                  marginBottom: 20,
                }}
              >
                All posts
              </div>
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {rest.map((post, idx) => (
                  <a
                    key={post.href}
                    href={post.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group block overflow-hidden"
                    style={{
                      borderRadius: 20,
                      background: blogTile,
                      border: `1px solid ${blogBorder}`,
                      transition: "border-color 0.2s, background 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = borderColor2;
                      e.currentTarget.style.background = cardBg2;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = blogBorder;
                      e.currentTarget.style.background = blogTile;
                    }}
                  >
                    <div
                      style={{
                        aspectRatio: "16/10",
                        borderBottom: `1px solid ${blogBorder}`,
                        background: storyGradient(post.title + post.meta, theme),
                        position: "relative",
                        overflow: "hidden",
                      }}
                    >
                      <img
                        src={proxiedImage(post.image)}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        referrerPolicy="no-referrer"
                        style={{
                          position: "absolute",
                          inset: 0,
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          filter: theme === "dark"
                            ? "blur(8px) saturate(1.4) contrast(1.10)"
                            : "blur(9px) saturate(1.36) contrast(1.08)",
                          transform: "scale(1.09)",
                          opacity: theme === "dark" ? 0.62 : 0.56,
                        }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background: storyTone(post.title + post.meta, theme),
                        }}
                      />
                      <div style={{ position: "absolute", bottom: 12, left: 12 }}>
                        <span
                          style={{
                            padding: "4px 8px",
                            borderRadius: 999,
                            fontSize: 10,
                            fontWeight: 600,
                            textTransform: "uppercase",
                            letterSpacing: "0.08em",
                            background: theme === "dark" ? "rgba(0,0,0,0.40)" : "rgba(255,255,255,0.70)",
                            color: theme === "dark" ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.72)",
                            border: `1px solid ${theme === "dark" ? "rgba(255,255,255,0.14)" : "rgba(0,0,0,0.10)"}`,
                          }}
                        >
                          {sourceFromMeta(post.meta)}
                        </span>
                      </div>
                    </div>
                    <div style={{ padding: "16px 16px 20px" }}>
                      <div style={{ fontSize: 12, color: mutedTextColor3, marginBottom: 8 }}>
                        {post.meta}
                      </div>
                      {idx % 3 === 0 && (
                        <div style={{ fontSize: 11, color: mutedTextColor2, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 7 }}>
                          Featured story
                        </div>
                      )}
                      <h3
                        style={{
                          fontSize: 17,
                          fontWeight: 520,
                          color: textColor,
                          lineHeight: 1.34,
                          letterSpacing: "-0.01em",
                          transition: "color 0.2s",
                        }}
                        className="group-hover:text-[#f2b400]"
                      >
                        {post.title}
                      </h3>
                    </div>
                  </a>
                ))}
                {rest.length === 0 && storiesStatus !== "loading" && (
                  <div style={{ fontSize: 14, color: mutedTextColor2 }}>
                    {storiesStatus === "error" ? "Failed to load the news feed." : "No stories match your filters."}
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
      </main>

      <div ref={footerRef}>
        <SiteFooter />
      </div>

      {/* SCROLL TO TOP */}
      <ScrollToTopButton theme={theme} />

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
              background: theme === "dark" ? "rgba(24,24,24,0.98)" : "rgba(255,255,255,0.98)",
              border: `1px solid ${theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
              borderRadius: 16,
              overflow: "hidden",
              boxShadow: theme === "dark" ? "0 24px 80px rgba(0,0,0,0.5)" : "0 24px 80px rgba(0,0,0,0.18)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px 20px", borderBottom: `1px solid ${borderColor}` }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={mutedTextColor3} strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ flex: 1, background: "transparent", border: "none", outline: "none", fontSize: 16, color: textColor }}
              />
              <kbd style={{ padding: "4px 8px", borderRadius: 6, background: theme === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)", fontSize: 12, color: mutedTextColor2 }}>ESC</kbd>
            </div>
            <div style={{ maxHeight: 400, overflowY: "auto" }}>
              {searchQuery.length === 0 ? (
                <div style={{ padding: "32px 20px", textAlign: "center", color: mutedTextColor3, fontSize: 14 }}>
                  Start typing to search...
                </div>
              ) : filteredResults.length === 0 ? (
                <div style={{ padding: "32px 20px", textAlign: "center", color: mutedTextColor3, fontSize: 14 }}>
                  No results found
                </div>
              ) : (
                <div style={{ padding: "8px 0" }}>
                  {filteredResults.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
                      style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 20px", color: textColor, textDecoration: "none" }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = theme === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)")}
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
