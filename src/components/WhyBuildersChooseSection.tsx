"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/cn";

/**
 * NEAR-like section:
 * - Left side: STICKY title that stays pinned while scrolling
 * - Right side: content panels that crossfade as user scrolls
 */

type NearPanel = {
  kicker: string;
  title: string;
  desc: string;
  theme: "mono" | "green" | "gold";
  backgroundImage?: string;
};

const panels: NearPanel[] = [
  {
    kicker: "Customizability",
    title: "Operate any robot with any interface",
    desc: "Modulr works across robot manufacturers and control inputs including keyboards, joysticks, VR/AR, haptics, and custom controllers. Teams can operate diverse fleets without rebuilding control systems for each new robot.",
    theme: "mono",
    backgroundImage: "/vibrant-wires-bg.png",
  },
  {
    kicker: "Coordination",
    title: "Designed for human-in-the-loop operations",
    desc: "Modulr helps teams coordinate live robot operations with safe interventions, clear handoffs, and detailed logs, so responsibility and oversight never get lost.",
    theme: "green",
    backgroundImage: "/coordination-bg.png",
  },
  {
    kicker: "Scale",
    title: "Built to grow with your organization",
    desc: "Easily add robots, deployments, and team members as your organization grows, while keeping operations consistent, safe, and manageable over time.",
    theme: "gold",
    backgroundImage: "/expansion-2.png",
  },
];

export function WhyBuildersChooseSection({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Opacity transforms for 3 panels
  const o0 = useTransform(scrollYProgress, [0, 0.25, 0.35], [1, 1, 0]);
  const o1 = useTransform(scrollYProgress, [0.3, 0.45, 0.65], [0, 1, 0]);
  const o2 = useTransform(scrollYProgress, [0.6, 0.75, 1], [0, 1, 1]);
  const opacities = [o0, o1, o2];

  return (
    <section className={cn("border-t border-hairline bg-section", className)}>
      {/* This container drives the scroll - needs to be tall */}
      <div ref={containerRef} className="relative min-h-[300vh]">
        {/* Sticky wrapper for both columns */}
        <div className="sticky top-0 min-h-screen">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-10 md:grid-cols-12 md:gap-16 pt-24 md:pt-32 pb-20">
              {/* LEFT: Sticky title (stays in place) */}
              <div className="md:col-span-5">
                <Reveal>
                  <div className="text-xs tracking-[0.22em] uppercase text-white/55">Why Modulr</div>
                </Reveal>
                <Reveal delayMs={60}>
                  <h2 className="mt-4 text-premium text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
                    Built for speed.{" "}
                    <span className="text-gradient">Built for operators.</span>
                  </h2>
                </Reveal>
                <Reveal delayMs={110}>
                  <p className="mt-6 max-w-sm text-sm leading-7 text-white/60">
                  Modulr is designed to be intuitive for first-time operators, yet powerful and customizable for advanced robotics teams.
                  </p>
                </Reveal>
                <Reveal delayMs={160}>
                  <div className="mt-10 flex flex-wrap gap-3">
                    <Link
                      href="/technology-overview"
                      className="inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition ring-premium btn-secondary"
                    >
                      Explore technology
                    </Link>
                  </div>
                </Reveal>

                {/* Scroll progress indicator */}
                <div className="mt-12 hidden md:flex items-center gap-3">
                  {panels.map((_, idx) => (
                    <motion.div
                      key={idx}
                      className="h-1 w-10 rounded-full bg-white/10 overflow-hidden"
                    >
                      <motion.div
                        className="h-full bg-[var(--accent)]"
                        style={{
                          scaleX: opacities[idx],
                          transformOrigin: "left",
                        }}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* RIGHT: Crossfading panels */}
              <div className="md:col-span-7 relative">
                <div className="relative h-[480px] md:h-[540px]">
                  {panels.map((p, idx) => (
                    <motion.div
                      key={p.title}
                      style={{ opacity: opacities[idx] }}
                      className="absolute inset-0"
                    >
                      <div className="h-full overflow-hidden rounded-[40px] border border-white/10 shadow-glow relative">
                        {/* Background: image or default */}
                        {p.backgroundImage ? (
                          <>
                            <div
                              className="absolute inset-0 rounded-[40px] bg-cover bg-center"
                              style={{ backgroundImage: `url(${p.backgroundImage})` }}
                            />
                            {/* Dark overlay for text readability */}
                            <div className="pointer-events-none absolute inset-0 rounded-[40px] bg-black/60" />
                            <div className="pointer-events-none absolute inset-0 rounded-[40px] bg-[linear-gradient(to_bottom,rgba(0,0,0,.35),rgba(0,0,0,.75))]" />
                          </>
                        ) : (
                          <>
                            <div className="absolute inset-0 rounded-[40px] bg-black/50" />
                            <div className="pointer-events-none absolute inset-0 rounded-[40px] opacity-[0.10] bg-[linear-gradient(transparent_0,transparent_23px,rgba(255,255,255,0.06)_24px),linear-gradient(90deg,transparent_0,transparent_23px,rgba(255,255,255,0.06)_24px)] [background-size:26px_26px]" />
                            <div className="pointer-events-none absolute inset-0 rounded-[40px] bg-[linear-gradient(to_bottom,rgba(0,0,0,.25),rgba(0,0,0,.70))]" />
                          </>
                        )}

                        {/* Content */}
                        <div className="relative h-full p-8 md:p-10 flex flex-col">
                          <div className="text-sm font-medium text-white/70">{p.kicker}</div>
                          <h3 className="mt-4 text-2xl md:text-3xl font-semibold tracking-tight text-white">
                            {p.title}
                          </h3>
                          <p className={cn("mt-4 max-w-lg text-sm leading-7", p.backgroundImage ? "text-white/95 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]" : "text-white/55")}>{p.desc}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
