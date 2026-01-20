"use client";

import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { SmartImage } from "@/components/SmartImage";
import { cn } from "@/lib/cn";

/**
 * Auto-scrolling marquee rail with cards.
 * Uses pure CSS animation for smooth infinite loop.
 */

type Card = {
  title: string;
  href: string;
  image: string;
  pill: string;
};

const cards: Card[] = [
  {
    title: "From idea to teleoperation",
    href: "/technology-overview",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=500&fit=crop",
    pill: "Highlights",
  },
  {
    title: "Built for real teams",
    href: "/team",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=500&fit=crop",
    pill: "Company",
  },
  {
    title: "Own your operations",
    href: "/pricing",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=500&fit=crop",
    pill: "Billing",
  },
  {
    title: "Network: access, operate, earn",
    href: "/",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=500&fit=crop",
    pill: "Network",
  },
];

export function HorizontalRailAutoSection({ className }: { className?: string }) {
  // Double the cards for seamless loop
  const list = [...cards, ...cards];

  return (
    <section className={cn("border-t border-hairline bg-section overflow-hidden", className)}>
      <div className="mx-auto max-w-6xl px-6 pt-14 pb-6 md:pt-20 md:pb-8">
        <div className="flex items-end justify-between gap-6">
          <Reveal>
            <div>
              <div className="text-xs tracking-[0.22em] uppercase text-white/55">
                Explore
              </div>
              <h2 className="mt-3 text-premium text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                Scrollable media rail
              </h2>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Full-width marquee container */}
      <div className="relative">
        {/* Fade masks */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-[var(--bg-section)] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-[var(--bg-section)] to-transparent" />

        {/* Marquee track - CSS animation */}
        <div className="flex w-max animate-rail-scroll hover:[animation-play-state:paused]">
          {list.map((c, i) => (
            <Link
              key={`${c.href}-${c.title}-${i}`}
              href={c.href}
              className="mx-3 flex-shrink-0 w-[300px] sm:w-[340px] group"
            >
              <article className="overflow-hidden rounded-[28px] border border-hairline bg-white/[0.02] transition hover:bg-white/[0.04] hover:-translate-y-1">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <SmartImage
                    src={c.image}
                    alt={c.title}
                    className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                  <div className="absolute left-4 bottom-4 inline-flex items-center rounded-full border border-white/10 bg-black/40 px-3 py-1 text-[10px] font-semibold tracking-[0.18em] uppercase text-white/85">
                    {c.pill}
                  </div>
                </div>
                <div className="p-5">
                  <div className="text-base font-semibold tracking-tight text-white group-hover:text-[var(--accent)] transition">
                    {c.title}
                  </div>
                  <div className="mt-3 text-sm text-white/60 group-hover:text-white transition">
                    Learn more{" "}
                    <span className="group-hover:translate-x-0.5 inline-block transition">→</span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 pt-4 pb-14 md:pb-20">
        <div className="text-xs text-white/35">Hover to pause • Click to explore</div>
      </div>
    </section>
  );
}
