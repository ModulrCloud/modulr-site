"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { SmartImage } from "@/components/SmartImage";
import { cn } from "@/lib/cn";

/**
 * TON-style showcase section with large premium tiles featuring photos
 * Like ton.org/en/use - big rounded cards with images and CTAs
 * FULL-WIDTH version
 */

type Tile = {
  title: string;
  desc: string;
  image: string;
  href: string;
  cta: string;
  accent: string;
  size: "large" | "medium";
};

const tiles: Tile[] = [
  {
    title: "Explore Modulr Network",
    desc: "Connect robots, operators, and AI systems in one decentralized network. Access, operate, and earn from anywhere.",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&h=800&fit=crop",
    href: "/technology-overview",
    cta: "Learn More",
    accent: "rgba(242,180,0,0.25)",
    size: "large",
  },
  {
    title: "Get Started with Teleoperation",
    desc: "Set up your first robotic system and connect it to the network in minutes. No extra hardware needed.",
    image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&h=600&fit=crop",
    href: "/pricing",
    cta: "Explore Plans",
    accent: "rgba(0,200,150,0.25)",
    size: "medium",
  },
  {
    title: "Meet the Team",
    desc: "World-class engineers, researchers, and operators building the future of robotics.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop",
    href: "/team",
    cta: "View Team",
    accent: "rgba(120,100,255,0.25)",
    size: "medium",
  },
];

export function TonStyleShowcase({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <section className={cn("border-t border-hairline bg-section", className)}>
      {/* Header - constrained */}
      <div className="mx-auto max-w-7xl px-6 pt-20 md:pt-28">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-14">
          <Reveal>
            <div>
              <div className="text-xs tracking-[0.22em] uppercase text-white/55">
                Discover
              </div>
              <h2 className="mt-3 text-premium text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                The Modulr{" "}
                <span className="text-gradient">Ecosystem</span>
              </h2>
            </div>
          </Reveal>
          <Reveal delayMs={80}>
            <p className="max-w-md text-sm leading-7 text-white/60">
              Everything you need to build, deploy, and scale robotic operations
              on a global network.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Cards - FULL WIDTH with subtle edge padding */}
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
                  {/* Image section */}
                  <div
                    className={cn(
                      "absolute inset-0 overflow-hidden",
                      tile.size === "large" ? "md:relative md:w-[60%]" : ""
                    )}
                  >
                    <SmartImage
                      src={tile.image}
                      alt={tile.title}
                      className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                    />
                    {/* Overlays */}
                    <div
                      className={cn(
                        "absolute inset-0",
                        tile.size === "large"
                          ? "bg-gradient-to-t from-black via-black/60 to-black/30 md:bg-gradient-to-r md:from-transparent md:via-black/40 md:to-black"
                          : "bg-gradient-to-t from-black via-black/70 to-black/30"
                      )}
                    />
                    <div
                      className="pointer-events-none absolute inset-0 opacity-50"
                      style={{
                        background: `radial-gradient(1000px 600px at 30% 70%, ${tile.accent}, transparent 55%)`,
                      }}
                    />
                  </div>

                  {/* Content section */}
                  <div
                    className={cn(
                      "relative flex flex-col justify-end p-8 md:p-12",
                      tile.size === "large"
                        ? "md:w-[40%] md:justify-center h-full"
                        : "h-full"
                    )}
                  >
                    {/* Accent glow behind content */}
                    <div
                      className="pointer-events-none absolute inset-0 opacity-30"
                      style={{
                        background: `radial-gradient(600px 400px at 80% 50%, ${tile.accent}, transparent 50%)`,
                      }}
                    />

                    <div className="relative">
                      <h3
                        className={cn(
                          "font-semibold tracking-tight text-white group-hover:text-[var(--accent)] transition",
                          tile.size === "large"
                            ? "text-3xl md:text-4xl lg:text-5xl"
                            : "text-2xl md:text-3xl"
                        )}
                      >
                        {tile.title}
                      </h3>
                      <p
                        className={cn(
                          "mt-4 leading-7 text-white/60",
                          tile.size === "large"
                            ? "text-base md:text-lg max-w-lg"
                            : "text-sm max-w-md"
                        )}
                      >
                        {tile.desc}
                      </p>
                      <div className="mt-8 inline-flex items-center gap-4">
                        <span
                          className={cn(
                            "inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 font-semibold text-white transition group-hover:bg-white/10 group-hover:border-[var(--accent)]/40",
                            tile.size === "large"
                              ? "px-7 py-3.5 text-base"
                              : "px-5 py-2.5 text-sm"
                          )}
                        >
                          {tile.cta}
                        </span>
                        <span className="text-white/50 group-hover:text-white transition group-hover:translate-x-2 text-xl">
                          →
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Hover ring */}
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
