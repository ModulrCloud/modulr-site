"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/cn";

const steps = [
  {
    title: "Access",
    desc: "Discover robots and services globally with clear pricing and constraints.",
  },
  {
    title: "Operate",
    desc: "Control in the browser with real-time feedback and safety-first guardrails.",
  },
  {
    title: "Earn",
    desc: "Turn idle robots into revenue with scheduling, billing, and payouts.",
  },
];

export function StickyHighlightsSection({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const glowY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-10%", "10%"]);

  return (
    <section ref={ref} className={cn("border-t border-hairline bg-section", className)}>
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="md:sticky md:top-24">
              <Reveal>
                <div className="text-xs tracking-[0.22em] uppercase text-white/55">
                  Flow
                </div>
              </Reveal>
              <Reveal delayMs={60}>
                <h2 className="mt-3 text-premium text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  Like Apple—clear, guided, <span className="text-gradient">premium</span>
                </h2>
              </Reveal>
              <Reveal delayMs={110}>
                <p className="mt-5 text-sm leading-7 text-white/60">
                  A scroll-friendly product narrative: minimal text, strong hierarchy, and
                  motion that supports comprehension.
                </p>
              </Reveal>

              <div className="mt-8 grid gap-3">
                {steps.map((s, i) => (
                  <Reveal key={s.title} delayMs={140 + i * 60}>
                    <div className="rounded-2xl border border-hairline bg-white/[0.02] p-5">
                      <div className="text-sm font-semibold text-white">
                        <span className="text-[var(--accent)]">{String(i + 1).padStart(2, "0")}</span>{" "}
                        {s.title}
                      </div>
                      <div className="mt-2 text-sm leading-6 text-white/60">{s.desc}</div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>

          <div className="md:col-span-7">
            <Reveal delayMs={90}>
              <div className="relative overflow-hidden rounded-[32px] border border-hairline bg-black/40 shadow-glow">
                <motion.div
                  className="pointer-events-none absolute inset-0 opacity-90"
                  style={{
                    y: glowY,
                    background:
                      "radial-gradient(900px 420px at 80% 25%, rgba(242,180,0,0.12), transparent 60%), radial-gradient(700px 420px at 20% 70%, rgba(255,255,255,0.06), transparent 60%)",
                  }}
                />
                <div className="relative p-7 md:p-10">
                  <div className="text-xs tracking-[0.22em] uppercase text-white/45">
                    Motion-backed clarity
                  </div>
                  <div className="mt-6 grid gap-4">
                    {steps.map((s, i) => (
                      <div
                        key={s.title}
                        className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
                      >
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-semibold text-white">{s.title}</div>
                          <div className="text-xs text-white/45">Step {i + 1}</div>
                        </div>
                        <div className="mt-3 text-sm leading-6 text-white/60">{s.desc}</div>
                        <div className="mt-5 h-2 w-full rounded-full bg-white/10 overflow-hidden">
                          <div
                            className={cn(
                              "h-full rounded-full bg-[linear-gradient(90deg,var(--accent),rgba(255,255,255,0.15))]",
                              i === 0 ? "w-[36%]" : i === 1 ? "w-[66%]" : "w-[88%]",
                            )}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}




