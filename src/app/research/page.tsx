"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/cn";
import { researchCategories, researchPosts } from "@/content/research";

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M21 21l-4.35-4.35"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Tag({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-0.5 text-[10px] font-medium text-white/60 tracking-wider uppercase">
      {children}
    </span>
  );
}

export default function ResearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filtered = useMemo(() => {
    return researchPosts.filter((post) => {
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        q === "" ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.tags.some((t) => t.toLowerCase().includes(q));

      const matchesCategory =
        selectedCategory === "All" || post.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="pt-16 flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-hairline">
          <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
            <div className="max-w-3xl">
              <Reveal>
                <div className="text-xs tracking-[0.28em] uppercase text-white/45">
                  Research
                </div>
              </Reveal>
              <Reveal delayMs={60}>
                <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white">
                  Research & Publications
                </h1>
              </Reveal>
              <Reveal delayMs={100}>
                <p className="mt-6 text-lg text-white/60 max-w-2xl">
                  Explore our latest research, whitepapers, and technical documentation on robotics, AI, and decentralized systems.
                </p>
              </Reveal>
              <Reveal delayMs={140}>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href="mailto:hello@modulr.cloud"
                    className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-white/90 ring-premium"
                  >
                    Contact
                  </a>
                  <Link
                    href="/"
                    className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-sm px-5 py-2.5 text-sm font-semibold text-white/80 transition hover:bg-white/[0.06] hover:text-white ring-premium"
                  >
                    Home
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Search & Filter */}
        <section className="border-b border-hairline">
          <div className="mx-auto max-w-6xl px-6 py-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="relative flex-1 max-w-md">
                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
                <input
                  type="text"
                  placeholder="Search research…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-sm pl-12 pr-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-white/20 focus:bg-white/[0.05] transition"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {researchCategories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={cn(
                      "px-4 py-2 rounded-full text-sm font-medium transition cursor-pointer",
                      selectedCategory === cat
                        ? "bg-white text-black"
                        : "border border-white/10 bg-white/[0.03] text-white/70 hover:bg-white/[0.06] hover:text-white",
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Posts Grid */}
        <section>
          <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
            {filtered.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filtered.map((post, i) => (
                  <Reveal key={post.slug} delayMs={60 + i * 40}>
                    <Link href={`/research/${post.slug}`}>
                      <article className="group relative h-full rounded-[24px] border border-white/10 bg-white/[0.02] backdrop-blur-sm p-6 transition hover:bg-white/[0.04] hover:border-white/15 cursor-pointer">
                        <div className="inline-flex items-center rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/20 px-3 py-1 text-[10px] font-semibold text-[var(--accent)] tracking-wider uppercase mb-4">
                          {post.category}
                        </div>

                        <div className="flex items-center gap-3 text-xs text-white/50">
                          <span>{post.date}</span>
                          <span className="text-white/20">•</span>
                          <span>{post.readingMinutes} min read</span>
                        </div>

                        <h2 className="mt-4 text-xl font-semibold tracking-tight text-white group-hover:text-[var(--accent)] transition-colors">
                          {post.title}
                        </h2>

                        <p className="mt-3 text-sm text-white/60 leading-relaxed">
                          {post.excerpt}
                        </p>

                        <div className="mt-6 flex flex-wrap gap-2">
                          {post.tags.map((tag) => (
                            <Tag key={tag}>{tag}</Tag>
                          ))}
                        </div>

                        <div className="mt-6 flex items-center gap-2 text-sm text-white/60 group-hover:text-[var(--accent)] transition-colors">
                          <span>Read paper</span>
                          <span className="group-hover:translate-x-1 transition-transform">
                            →
                          </span>
                        </div>
                      </article>
                    </Link>
                  </Reveal>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-white/40 text-lg">No research found</div>
                <p className="mt-2 text-white/30 text-sm">Try adjusting your search</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
