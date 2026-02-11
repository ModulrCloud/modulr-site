"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { SmartImage } from "@/components/SmartImage";
import { cn } from "@/lib/cn";
import { MODULR_LINKS } from "@/config/links";

type Tile = {
  title: string;
  desc: string;
  image: string;
  href: string;
  cta: string;
  accent: string;
  size: "large" | "medium";
  /** When true, use minimal overlay so the image stays sharp (no blur/fade) */
  minimalOverlay?: boolean;
  hideCta?: boolean;
};

const tiles: Tile[] = [
  {
    title: "Built from Teleoperation Up",
    desc: "Modulr is solving a real pain point in robotics today: fragmented, custom-built operator interfaces that don't scale. We're standardizing robot control into a customizable yet intuitive UX while laying the foundation for a peer-to-peer network connecting robots, AI, data, and compute. This approach earned Modulr a place in NVIDIA's Inception Program.",
    image: "/NVIDIA_3.jpeg",
    href: "/technology-overview",
    cta: "Learn More",
    accent: "rgba(242,180,0,0.25)",
    size: "large",
    minimalOverlay: true,
    hideCta: true,
  },
  {
    title: "Get Started with Teleoperation",
    desc: "Set up your first robotic system and connect it to the network in minutes. No extra hardware needed.",
    image: "/mining3.png",
    href: MODULR_LINKS.APP,
    cta: "Launch App",
    accent: "rgba(0,200,150,0.25)",
    size: "medium",
  },
  {
    title: "Long Term Vision",
    desc: "See the vision for a world where anyone can operate & earn from any robot, anywhere: a decentralized network connecting robots, AI, data, and compute.",
    image: "/modulr_vision_image.jpg",
    href: "/technology-overview",
    cta: "View Technology",
    accent: "rgba(242,180,0,0.25)",
    size: "medium",
  },
];

export function DiscoverNewParadigm({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <section className={cn("border-t border-hairline bg-section", className)}>
      <div className="mx-auto max-w-7xl px-6 pt-20 md:pt-28">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-14">
          <Reveal>
            <div>
              <div className="text-xs tracking-[0.22em] uppercase text-white/55">
                Discover
              </div>
              <h2 className="mt-3 text-premium text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
              A New  {" "}
                <span className="text-gradient">Robotics Paradigm</span>
              </h2>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="px-4 md:px-8 pb-20 md:pb-28">
        <div className="grid gap-5 md:grid-cols-2">
          {tiles.map((tile, i) => (
            <Reveal
              key={tile.title}
              delayMs={60 + i * 50}
              className={tile.size === "large" ? "md:col-span-2" : ""}
            >
              <Link href={tile.href} className="group block">
                <motion.article
                  className={cn(
                    "relative overflow-hidden rounded-[32px] md:rounded-[48px] border border-white/10 bg-black/40",
                    tile.size === "large"
                      ? "md:flex md:items-stretch min-h-[400px] md:min-h-[520px]"
                      : "min-h-[380px] md:min-h-[440px]"
                  )}
                  whileHover={reduce ? undefined : { y: -6, scale: 1.003 }}
                  transition={{ duration: 0.28, ease: [0.2, 0.8, 0.2, 1] }}
                >
                  {/* Mobile only (large tile): stacked image then separate text block — avoids image text conflicting with paragraph */}
                  {tile.size === "large" && (
                    <div className="flex flex-col md:hidden">
                      <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden">
                        <SmartImage
                          src={tile.image}
                          alt={tile.title}
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                      </div>
                      <div className="border-t border-white/10 bg-black/95 px-6 py-6">
                        <h3 className="text-2xl font-semibold tracking-tight text-white">
                          {tile.title}
                        </h3>
                        <p className="mt-3 text-sm leading-7 text-white/80">
                          {tile.desc}
                        </p>
                        {!tile.hideCta && (
                          <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)]">
                            <span>{tile.cta}</span>
                            <span className="transition group-hover:translate-x-0.5">→</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Desktop large tile: wrapper so image + text only show at md+ (left column image, right column text) */}
                  {tile.size === "large" && (
                    <div className="hidden md:flex md:items-stretch flex-1 w-full min-h-0">
                      <div className="relative w-[55%] shrink-0 overflow-hidden">
                        <SmartImage
                          src={tile.image}
                          alt={tile.title}
                          className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                        />
                        <div className="absolute inset-0 md:bg-none bg-gradient-to-r from-transparent from-30% via-transparent via-60% to-black/45" />
                      </div>
                      <div className="relative flex w-[45%] shrink-0 flex-col justify-center bg-black/95 border-l border-white/10 p-8 md:p-12">
                        <div
                          className="pointer-events-none absolute inset-0 opacity-30"
                          style={{
                            background: `radial-gradient(600px 400px at 80% 50%, ${tile.accent}, transparent 50%)`,
                          }}
                        />
                        <div className="relative">
                          <h3 className="text-3xl font-semibold tracking-tight text-white group-hover:text-[var(--accent)] transition md:text-4xl lg:text-5xl">
                            {tile.title}
                          </h3>
                          <p className="mt-4 text-base leading-7 text-white/60 md:text-lg max-w-lg">
                            {tile.desc}
                          </p>
                          {!tile.hideCta && (
                            <div className="mt-8 inline-flex items-center gap-4">
                              <span className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-base font-semibold text-white transition group-hover:bg-white/10 group-hover:border-[var(--accent)]/40">
                                {tile.cta}
                              </span>
                              <span className="text-xl text-white/50 transition group-hover:translate-x-2 group-hover:text-white">
                                →
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Medium tiles + mobile layout for medium: image with overlay text (unchanged) */}
                  {tile.size !== "large" && (
                    <>
                      <div className="absolute inset-0 overflow-hidden">
                        <SmartImage
                          src={tile.image}
                          alt={tile.title}
                          className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                        />
                        <>
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />
                          <div
                            className="pointer-events-none absolute inset-0 opacity-50"
                            style={{
                              background: `radial-gradient(1000px 600px at 30% 70%, ${tile.accent}, transparent 55%)`,
                            }}
                          />
                        </>
                      </div>

                      <div className="relative flex h-full flex-col justify-end p-8 md:p-12">
                        <div
                          className="pointer-events-none absolute inset-0 opacity-30"
                          style={{
                            background: `radial-gradient(600px 400px at 80% 50%, ${tile.accent}, transparent 50%)`,
                          }}
                        />
                        <div className="relative">
                          <h3 className="text-2xl font-semibold tracking-tight text-white transition group-hover:text-[var(--accent)] md:text-3xl">
                            {tile.title}
                          </h3>
                          <p className="mt-4 text-sm leading-7 text-white/60 max-w-md">
                            {tile.desc}
                          </p>
                          {!tile.hideCta && (
                            <div className="mt-8 inline-flex items-center gap-4">
                              <span className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition group-hover:bg-white/10 group-hover:border-[var(--accent)]/40">
                                {tile.cta}
                              </span>
                              <span className="text-xl text-white/50 transition group-hover:translate-x-2 group-hover:text-white">
                                →
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </>
                  )}

                  <div className="pointer-events-none absolute inset-0 rounded-[32px] md:rounded-[48px] ring-1 ring-inset ring-white/5 group-hover:ring-[var(--accent)]/30 transition" />
                </motion.article>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
