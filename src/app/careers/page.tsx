"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/cn";
import { careerDepartments, careerPosts } from "@/content/careers";

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

function TypeBadge({ type }: { type: string }) {
  const colors: Record<string, string> = {
    "Full-time": "bg-green-500/15 text-green-400 border-green-500/20",
    "Part-time": "bg-blue-500/15 text-blue-400 border-blue-500/20",
    Contract: "bg-orange-500/15 text-orange-400 border-orange-500/20",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-medium tracking-wider uppercase",
        colors[type] ?? "bg-white/10 text-white/70 border-white/10"
      )}
    >
      {type}
    </span>
  );
}

export default function CareersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All");

  const filtered = useMemo(() => {
    return careerPosts.filter((post) => {
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        q === "" ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.department.toLowerCase().includes(q) ||
        post.location.toLowerCase().includes(q);

      const matchesDepartment =
        selectedDepartment === "All" || post.department === selectedDepartment;

      return matchesSearch && matchesDepartment;
    });
  }, [searchQuery, selectedDepartment]);

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
                  Careers
                </div>
              </Reveal>
              <Reveal delayMs={60}>
                <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white">
                  Join Our Team
                </h1>
              </Reveal>
              <Reveal delayMs={100}>
                <p className="mt-6 text-lg text-white/60 max-w-2xl">
                  Help us build the future of robotics. We're looking for talented individuals to join our mission.
                </p>
              </Reveal>
              <Reveal delayMs={140}>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href="mailto:careers@modulr.cloud"
                    className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-white/90 ring-premium"
                  >
                    Contact HR
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
                  placeholder="Search positions…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-sm pl-12 pr-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-white/20 focus:bg-white/[0.05] transition"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {careerDepartments.map((dept) => (
                  <button
                    key={dept}
                    type="button"
                    onClick={() => setSelectedDepartment(dept)}
                    className={cn(
                      "px-4 py-2 rounded-full text-sm font-medium transition cursor-pointer",
                      selectedDepartment === dept
                        ? "bg-white text-black"
                        : "border border-white/10 bg-white/[0.03] text-white/70 hover:bg-white/[0.06] hover:text-white"
                    )}
                  >
                    {dept}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Positions Grid */}
        <section>
          <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
            {filtered.length > 0 ? (
              <div className="grid gap-4">
                {filtered.map((post, i) => (
                  <Reveal key={post.slug} delayMs={40 + i * 30}>
                    <Link href={`/careers/${post.slug}`}>
                      <article className="group relative rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm p-6 md:p-8 transition hover:bg-white/[0.04] hover:border-white/15 cursor-pointer">
                        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-3 mb-3">
                              <span className="inline-flex items-center rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/20 px-3 py-1 text-[10px] font-semibold text-[var(--accent)] tracking-wider uppercase">
                                {post.department}
                              </span>
                              <TypeBadge type={post.type} />
                              <span className="text-xs text-white/40">
                                {post.level}
                              </span>
                            </div>

                            <h2 className="text-xl font-semibold tracking-tight text-white group-hover:text-[var(--accent)] transition-colors">
                              {post.title}
                            </h2>

                            <p className="mt-3 text-sm text-white/60 leading-relaxed max-w-2xl">
                              {post.excerpt}
                            </p>

                            <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-white/50">
                              <span className="flex items-center gap-1.5">
                                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none">
                                  <path
                                    d="M12 21c-4.97 0-9-4.03-9-9s4.03-9 9-9 9 4.03 9 9-4.03 9-9 9z"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                  />
                                  <path
                                    d="M12 6v6l4 2"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                  />
                                </svg>
                                {post.posted}
                              </span>
                              <span className="flex items-center gap-1.5">
                                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none">
                                  <path
                                    d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                  />
                                  <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5" />
                                </svg>
                                {post.location}
                              </span>
                              {post.salary && (
                                <span className="flex items-center gap-1.5">
                                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none">
                                    <path
                                      d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"
                                      stroke="currentColor"
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                  {post.salary}
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-2 text-sm text-white/60 group-hover:text-[var(--accent)] transition-colors shrink-0">
                            <span>Apply</span>
                            <span className="group-hover:translate-x-1 transition-transform">
                              →
                            </span>
                          </div>
                        </div>
                      </article>
                    </Link>
                  </Reveal>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-white/40 text-lg">No positions found</div>
                <p className="mt-2 text-white/30 text-sm">
                  Try adjusting your search or filters
                </p>
              </div>
            )}

            {/* Open application CTA */}
            <Reveal delayMs={200} className="mt-16">
              <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 md:p-12 text-center">
                <h3 className="text-2xl font-semibold text-white">
                  Don't see a perfect fit?
                </h3>
                <p className="mt-3 text-white/60 max-w-lg mx-auto">
                  We're always looking for exceptional talent. Send us your resume and tell us how you'd like to contribute to the robot economy.
                </p>
                <a
                  href="mailto:careers@modulr.cloud?subject=Open Application"
                  className="inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-black transition hover:brightness-95 ring-premium mt-6"
                >
                  Send Open Application
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
