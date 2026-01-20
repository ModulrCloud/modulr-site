"use client";

import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { SmartImage } from "@/components/SmartImage";

type StoryCard = {
  href: string;
  title: string;
  meta: string;
  image: string;
  featured?: boolean;
};

const stories: StoryCard[] = [
  {
    href: "/news/product-demo",
    title: "Reading the mind of an AI",
    meta: "Story • 2 min read",
    image:
      "https://ton.org/images/wallet-features/free-to-use.jpg",
    featured: true,
  },
  {
    href: "/news/providers",
    title: "Creative work with real-time robotics",
    meta: "Story • 3 min read",
    image:
      "https://ton.org/images/feature-cards/community.jpg",
  },
  {
    href: "/news/community",
    title: "Medical research with teleoperation",
    meta: "Story • 2 min read",
    image:
      "https://ton.org/images/wallet-features/own-your-play.jpg",
  },
];

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path
        d="M10 8.5v7l6-3.5-6-3.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function StoriesSection() {
  return (
    <section className="border-t border-hairline bg-section">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="flex items-end justify-between gap-6">
          <Reveal>
            <div>
              <div className="text-xs tracking-[0.22em] uppercase text-white/55">
                Stories
              </div>
              <h2 className="mt-3 text-premium text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                Built for humans
              </h2>
            </div>
          </Reveal>
          <Reveal delayMs={60}>
            <Link
              href="/news"
              className="text-sm text-white/60 hover:text-white transition ring-premium rounded"
            >
              View all
            </Link>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-12 md:grid-rows-2 md:auto-rows-[minmax(0,1fr)]">
          {stories.map((s, i) => (
            <Reveal
              key={s.href}
              delayMs={80 + i * 60}
              className={
                s.featured
                  ? "md:col-span-8 md:row-span-2"
                  : "md:col-span-4"
              }
            >
              <Link href={s.href} className="group block">
                <article className="h-full overflow-hidden rounded-[28px] border border-hairline bg-white/[0.02] transition hover:bg-white/[0.04] hover:-translate-y-1 flex flex-col">
                  <div
                    className={
                      s.featured
                        ? "relative flex-1 min-h-[320px] md:min-h-[520px] overflow-hidden"
                        : "relative flex-1 min-h-[240px] overflow-hidden"
                    }
                  >
                    <SmartImage
                      src={s.image}
                      alt={s.title}
                      className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.05]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                    {s.featured ? (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/45 px-4 py-3 text-white/90 backdrop-blur-sm">
                          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white">
                            <PlayIcon />
                          </span>
                          <span className="text-sm font-semibold tracking-tight">Watch demo</span>
                        </div>
                      </div>
                    ) : null}
                  </div>

                  <div className="p-6">
                    <div className="text-xs text-white/45">{s.meta}</div>
                    <h3 className="mt-2 text-lg font-semibold tracking-tight text-white group-hover:text-[var(--accent)] transition">
                      {s.title}
                    </h3>
                    <div className="mt-4 inline-flex items-center gap-2 text-sm text-white/60 group-hover:text-white transition">
                      Open story <span className="group-hover:translate-x-0.5 transition">→</span>
                    </div>
                  </div>
                </article>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
