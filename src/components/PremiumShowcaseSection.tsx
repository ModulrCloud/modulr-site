"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { MODULR_LINKS } from "@/config/links";

export function PremiumShowcaseSection() {
  const reduce = useReducedMotion();

  return (
    <section className="border-t border-hairline bg-section">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="grid gap-10 md:grid-cols-12 md:items-center">
          <div className="md:col-span-6">
            <Reveal>
              <div className="text-xs tracking-[0.22em] uppercase text-white/55">
                Experience
              </div>
            </Reveal>
            <Reveal delayMs={60}>
              <h2 className="mt-3 text-premium text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                A product that feels{" "}
                <span className="text-gradient">instant</span>
              </h2>
            </Reveal>
            <Reveal delayMs={110}>
              <p className="mt-5 text-sm leading-7 text-white/60 max-w-xl">
                Designed like a premium control surface: clear states, fast feedback, and
                safety-first guardrails. Everything you need to access and operate robots
                globally—without complexity.
              </p>
            </Reveal>
            <Reveal delayMs={150}>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={MODULR_LINKS.DEMO}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-white/90 ring-premium"
                >
                  Book a Demo
                </a>
                <Link
                  href="/technology-overview"
                  className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-sm px-5 py-2.5 text-sm font-semibold text-white/80 transition hover:bg-white/[0.06] hover:text-white ring-premium"
                >
                  Technology Overview
                </Link>
              </div>
            </Reveal>
          </div>

          <div className="md:col-span-6">
            <Reveal delayMs={90}>
              <motion.div
                className="relative overflow-hidden rounded-[28px] border border-hairline bg-black/40 p-6 shadow-glow"
                animate={
                  reduce
                    ? undefined
                    : { y: [0, -8, 0], transition: { duration: 7, repeat: Infinity } }
                }
              >
                <div className="pointer-events-none absolute inset-0 opacity-90 bg-[radial-gradient(900px_380px_at_80%_20%,rgba(242,180,0,0.10),transparent_60%)]" />
                <div className="relative">
                  <div className="text-xs tracking-[0.22em] uppercase text-white/45">
                    Operator cockpit
                  </div>
                  <div className="mt-4 grid grid-cols-12 gap-4">
                    <div className="col-span-7 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                      <div className="text-xs text-white/45">Latency</div>
                      <div className="mt-2 text-2xl font-semibold text-white">
                        120ms
                      </div>
                      <div className="mt-3 h-2 w-full rounded-full bg-white/10 overflow-hidden">
                        <div className="h-full w-[72%] rounded-full bg-[linear-gradient(90deg,var(--accent),rgba(255,255,255,0.2))]" />
                      </div>
                    </div>
                    <div className="col-span-5 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                      <div className="text-xs text-white/45">Safety</div>
                      <div className="mt-2 text-sm font-semibold text-white">
                        Guardrails on
                      </div>
                      <div className="mt-3 text-xs text-white/55">
                        Rate limits • E‑stop • Audit
                      </div>
                    </div>
                    <div className="col-span-12 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                      <div className="flex items-center justify-between text-xs text-white/45">
                        <span>Session</span>
                        <span className="text-white/60">$0.34/min</span>
                      </div>
                      <div className="mt-3 h-24 rounded-xl bg-[linear-gradient(135deg,rgba(242,180,0,0.10),rgba(255,255,255,0.03))]" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}




