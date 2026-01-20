"use client";

import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/cn";

export type ContentTile = {
  href: string;
  title: string;
  eyebrow?: string;
  meta?: string;
  image: string;
};

export function ContentTilesSection({
  title,
  viewAllHref,
  viewAllLabel = "View all",
  items,
  className,
}: {
  title: string;
  viewAllHref: string;
  viewAllLabel?: string;
  items: ContentTile[];
  className?: string;
}) {
  return (
    <section className={cn("border-t border-hairline bg-section", className)}>
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="flex items-end justify-between gap-6">
          <Reveal>
            <h2 className="text-premium text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              {title}
            </h2>
          </Reveal>
          <Reveal delayMs={60}>
            <Link
              href={viewAllHref}
              className="text-sm text-white/60 hover:text-white transition ring-premium rounded"
            >
              {viewAllLabel}
            </Link>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {items.map((it, i) => (
            <Reveal key={it.href} delayMs={80 + i * 60}>
              <Link href={it.href} className="group block">
                <article className="overflow-hidden rounded-3xl border border-hairline bg-white/[0.02] transition hover:bg-white/[0.04] hover:-translate-y-1">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={it.image}
                      alt={it.title}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                    {it.eyebrow ? (
                      <div className="absolute left-4 bottom-4 inline-flex items-center rounded-full border border-white/10 bg-black/40 px-3 py-1 text-[10px] font-semibold tracking-[0.18em] uppercase text-white/80">
                        {it.eyebrow}
                      </div>
                    ) : null}
                  </div>

                  <div className="p-6">
                    {it.meta ? (
                      <div className="text-xs text-white/45">{it.meta}</div>
                    ) : null}
                    <h3 className="mt-2 text-lg font-semibold tracking-tight text-white group-hover:text-[var(--accent)] transition">
                      {it.title}
                    </h3>
                    <div className="mt-4 inline-flex items-center gap-2 text-sm text-white/60 group-hover:text-white transition">
                      Read <span className="group-hover:translate-x-0.5 transition">→</span>
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




