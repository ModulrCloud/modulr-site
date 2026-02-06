"use client";

import { useCallback, useRef } from "react";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Reveal } from "@/components/Reveal";
import { SmartImage } from "@/components/SmartImage";
import { cn } from "@/lib/cn";
import { newsPosts } from "@/content/news";
import type { RoboticsStoryCard } from "@/lib/roboticsFeeds";
import { proxyImageUrl } from "@/lib/roboticsFeeds";

const FALLBACK_IMAGE = "/drones.png";

function Pill({ children, variant }: { children: string; variant: "a" | "b" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium backdrop-blur-sm",
        variant === "a"
          ? "bg-black/40 text-white/90 border border-white/10"
          : "bg-white/10 text-white/80 border border-white/5",
      )}
    >
      {children}
    </span>
  );
}

function ArrowIcon({ dir }: { dir: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
      <path
        d={dir === "left" ? "M14.5 6.5 9 12l5.5 5.5" : "M9.5 6.5 15 12l-5.5 5.5"}
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function sourceFromMeta(meta: string): string {
  const part = meta.split(" • ")[0]?.trim();
  return part || "Article";
}

type NewsPageContentProps = {
  stories?: RoboticsStoryCard[] | null;
};

export function NewsPageContent({ stories }: NewsPageContentProps) {
  const railRef = useRef<HTMLDivElement | null>(null);

  const scrollByCards = useCallback((dir: "left" | "right") => {
    const el = railRef.current;
    if (!el) return;
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    const amount = 380;
    el.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }, []);

  const useRss = stories != null && stories.length > 0;
  const featured = useRss ? stories[0] : newsPosts[0];
  const rest = useRss ? stories.slice(1) : newsPosts.slice(1);

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="pt-16 flex-1">
        <section className="relative overflow-hidden border-b border-hairline">
          <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
            <div className="max-w-3xl">
              <Reveal>
                <div className="text-xs tracking-[0.28em] uppercase text-white/45">
                  Newsroom
                </div>
              </Reveal>
              <Reveal delayMs={60}>
                <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white">
                  News & Updates
                </h1>
              </Reveal>
              <Reveal delayMs={100}>
                <p className="mt-6 text-lg text-white/60 max-w-2xl">
                  Stay up to date with the latest announcements, product updates,
                  and community stories.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Featured + Rail */}
        <section className="bg-section">
          <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
            <div className="grid grid-cols-12 gap-8">
              <div className="col-span-12 lg:col-span-5">
                <Reveal>
                  <div className="text-xs tracking-[0.22em] uppercase text-white/55">
                    Featured
                  </div>
                </Reveal>
                <Reveal delayMs={80}>
                  {useRss ? (
                    <a
                      href={(featured as RoboticsStoryCard).href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <article className="mt-6 rounded-[28px] border border-white/10 bg-white/[0.03] overflow-hidden group">
                        <div className="relative aspect-[16/10] overflow-hidden">
                          <SmartImage
                            src={
                              (featured as RoboticsStoryCard).image.startsWith(
                                "http",
                              )
                                ? proxyImageUrl(
                                    (featured as RoboticsStoryCard).image,
                                  )
                                : (featured as RoboticsStoryCard).image
                            }
                            alt={(featured as RoboticsStoryCard).title}
                            className="absolute inset-0 w-full h-full object-cover transition duration-500 group-hover:scale-105"
                            fallbackSrc={FALLBACK_IMAGE}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
                          <div className="absolute bottom-5 left-5 flex items-center gap-2">
                            <Pill variant="a">
                              {sourceFromMeta(
                                (featured as RoboticsStoryCard).meta,
                              )}
                            </Pill>
                          </div>
                        </div>
                        <div className="p-7">
                          <div className="text-xs text-white/55">
                            {(featured as RoboticsStoryCard).meta}
                          </div>
                          <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white group-hover:text-[var(--accent)] transition">
                            {(featured as RoboticsStoryCard).title}
                          </h3>
                          <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white group-hover:text-[var(--accent)] transition">
                            Read article{" "}
                            <span className="text-white/60 group-hover:translate-x-1 transition">
                              →
                            </span>
                          </div>
                        </div>
                      </article>
                    </a>
                  ) : (
                    <Link
                      href={`/news/${(featured as (typeof newsPosts)[0]).slug}`}
                      className="block"
                    >
                      <article className="mt-6 rounded-[28px] border border-white/10 bg-white/[0.03] overflow-hidden group">
                        <div className="relative aspect-[16/10] overflow-hidden">
                          <img
                            src={(featured as (typeof newsPosts)[0]).image}
                            alt={(featured as (typeof newsPosts)[0]).title}
                            className="absolute inset-0 w-full h-full object-cover transition duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
                          <div className="absolute bottom-5 left-5 flex items-center gap-2">
                            <Pill variant="a">
                              {(featured as (typeof newsPosts)[0]).category}
                            </Pill>
                            <Pill variant="b">
                              {(featured as (typeof newsPosts)[0]).type}
                            </Pill>
                          </div>
                        </div>
                        <div className="p-7">
                          <div className="text-xs text-white/55">
                            {(featured as (typeof newsPosts)[0]).date} •{" "}
                            {(featured as (typeof newsPosts)[0]).readingMinutes}{" "}
                            min read
                          </div>
                          <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white group-hover:text-[var(--accent)] transition">
                            {(featured as (typeof newsPosts)[0]).title}
                          </h3>
                          <p className="mt-3 text-sm leading-6 text-white/60">
                            {(featured as (typeof newsPosts)[0]).excerpt}
                          </p>
                          <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white group-hover:text-[var(--accent)] transition">
                            Read more{" "}
                            <span className="text-white/60 group-hover:translate-x-1 transition">
                              →
                            </span>
                          </div>
                        </div>
                      </article>
                    </Link>
                  )}
                </Reveal>
              </div>

              <div className="col-span-12 lg:col-span-7">
                <div className="flex items-center justify-between">
                  <div className="text-xs tracking-[0.22em] uppercase text-white/55">
                    Latest
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => scrollByCards("left")}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/70 hover:bg-white/[0.06] hover:text-white transition cursor-pointer"
                      aria-label="Previous"
                    >
                      <ArrowIcon dir="left" />
                    </button>
                    <button
                      type="button"
                      onClick={() => scrollByCards("right")}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/70 hover:bg-white/[0.06] hover:text-white transition cursor-pointer"
                      aria-label="Next"
                    >
                      <ArrowIcon dir="right" />
                    </button>
                  </div>
                </div>

                <div
                  ref={railRef}
                  className="mt-6 flex gap-4 overflow-x-auto pb-2 [scroll-snap-type:x_mandatory] mask-fade-x scrollbar-hide"
                  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                  {useRss
                    ? (rest as RoboticsStoryCard[]).map((s, i) => (
                        <a
                          key={`${s.href}-${i}`}
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="[scroll-snap-align:start] flex-shrink-0 w-[320px] sm:w-[360px]"
                        >
                          <article className="rounded-[22px] border border-white/10 bg-white/[0.03] overflow-hidden group h-full">
                            <div className="relative aspect-[16/9] overflow-hidden">
                              <SmartImage
                                src={
                                  s.image.startsWith("http")
                                    ? proxyImageUrl(s.image)
                                    : s.image
                                }
                                alt={s.title}
                                className="absolute inset-0 w-full h-full object-cover transition duration-500 group-hover:scale-105"
                                fallbackSrc={FALLBACK_IMAGE}
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
                              <div className="absolute bottom-3 left-3 flex items-center gap-2">
                                <Pill variant="a">
                                  {sourceFromMeta(s.meta)}
                                </Pill>
                              </div>
                            </div>
                            <div className="p-5">
                              <div className="text-xs text-white/55">
                                {s.meta}
                              </div>
                              <h4 className="mt-2 text-base font-semibold tracking-tight text-white group-hover:text-[var(--accent)] transition line-clamp-2">
                                {s.title}
                              </h4>
                              <div className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-white/70 group-hover:text-white transition">
                                Read article{" "}
                                <span className="group-hover:translate-x-1 transition">
                                  →
                                </span>
                              </div>
                            </div>
                          </article>
                        </a>
                      ))
                    : (rest as (typeof newsPosts)).map((c) => (
                        <Link
                          key={c.slug}
                          href={`/news/${c.slug}`}
                          className="[scroll-snap-align:start] flex-shrink-0 w-[320px] sm:w-[360px]"
                        >
                          <article className="rounded-[22px] border border-white/10 bg-white/[0.03] overflow-hidden group h-full">
                            <div className="relative aspect-[16/9] overflow-hidden">
                              <img
                                src={c.image}
                                alt={c.title}
                                className="absolute inset-0 w-full h-full object-cover transition duration-500 group-hover:scale-105"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
                              <div className="absolute bottom-3 left-3 flex items-center gap-2">
                                <Pill variant="a">{c.category}</Pill>
                              </div>
                            </div>
                            <div className="p-5">
                              <div className="text-xs text-white/55">
                                {c.date} • {c.readingMinutes} min read
                              </div>
                              <h4 className="mt-2 text-base font-semibold tracking-tight text-white group-hover:text-[var(--accent)] transition line-clamp-2">
                                {c.title}
                              </h4>
                              <p className="mt-2 text-sm leading-6 text-white/60 line-clamp-2">
                                {c.excerpt}
                              </p>
                              <div className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-white/70 group-hover:text-white transition">
                                Read more{" "}
                                <span className="group-hover:translate-x-1 transition">
                                  →
                                </span>
                              </div>
                            </div>
                          </article>
                        </Link>
                      ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
