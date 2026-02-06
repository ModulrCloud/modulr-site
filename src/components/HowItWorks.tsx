"use client";

import { useRef } from "react";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/cn";

const ownerSteps = [
  {
    title: "Control any robot with one interface",
    desc: "Modulr supports any robot, any interface, any command. Add the Modulr agent to your robot, set your parameters, and you're live. No custom interfaces from scratch or one-off rules per robot.",
  },
  {
    title: "Empower teams & scale operations",
    desc: "Define who can access and operate each robot, when, and under what rules. Detailed logs, clear handoffs, and audit trails help engineers focus on solving the real issues instead of babysitting.",
  },
  {
    title: "Operate on your terms",
    desc: "Use custom controllers, AR/VR headsets, keyboards, joysticks, location/task presets, or any bespoke interface—even add custom ROS commands. Easily make the Modulr interface your own.",
  },
];

const clientSteps = [
  {
    title: "Discover & rent robots",
    desc: "Browse and discover robots and services on the network. See availability, pricing, and capabilities in one place. No need to buy a robot you don't need.",
  },
  {
    title: "Operate from anywhere",
    desc: "Connect and control from your browser, VR headset, or preferred interface. Real-time feedback and built-in safety guardrails are present in every session.",
  },
  {
    title: "Pay per use",
    desc: "Rent only what you need. Clear per-session or per-minute pricing; no lock-in. Ideal for infrequent, dangerous, or monotonous tasks. Let robots do the work for you—without having to buy.",
  },
];

export function HowItWorks({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);

  return (
    <section ref={ref} className={cn("border-t border-hairline bg-section", className)}>
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="mb-12 md:mb-14">
          <Reveal>
            <div className="text-xs tracking-[0.22em] uppercase text-white/55">
              How it works
            </div>
          </Reveal>
          <Reveal delayMs={60}>
            <h2 className="mt-3 text-premium text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              One platform to <span className="text-gradient">operate and monetize robots</span>
            </h2>
          </Reveal>
          <Reveal delayMs={110}>
            <p className="mt-5 text-sm leading-7 text-white/60 max-w-2xl">
              Whether you're a robotics team looking for better internal controls over your fleet, or an operator looking to rent and operate robots for your business—Modulr has you covered.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-6 md:grid-cols-2 md:gap-8 md:items-stretch">
          {/* Left: For robot owners */}
          <div className="md:sticky md:top-24 md:self-start">
            <Reveal delayMs={90}>
              <div className="h-full rounded-2xl border border-white/20 bg-white/[0.06] p-6 md:p-8 flex flex-col shadow-[0_0_0_1px_rgba(255,255,255,0.06)]">
                <div className="text-xs tracking-[0.2em] uppercase text-white/70 mb-1">
                  For partners & robot teams
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-white mt-1">
                  Full customizability for your fleet & team
                </h3>
                <div className="mt-6 space-y-3 flex-1">
                  {ownerSteps.map((s, i) => (
                    <div key={s.title} className="rounded-xl border border-white/15 bg-white/[0.01] p-5">
                      <div className="text-sm font-semibold text-white">
                        <span className="text-[var(--accent)]">{String(i + 1).padStart(2, "0")}</span>{" "}
                        {s.title}
                      </div>
                      <p className="mt-2 text-sm leading-6 text-white/60">{s.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right: For clients & operators — Modulr yellow theme, same card structure as left */}
          <div className="min-h-0">
            <Reveal delayMs={120}>
              <div className="relative overflow-hidden h-full rounded-2xl border border-[var(--accent)]/25 bg-black/50 flex flex-col">
                <div
                  className="pointer-events-none absolute inset-0 opacity-100"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(242,180,0,0.06) 0%, transparent 50%), radial-gradient(600px 400px at 80% 20%, rgba(242,180,0,0.08), transparent 50%)",
                  }}
                />
                <div className="relative p-6 md:p-8 flex flex-col flex-1 min-h-0">
                  <div className="text-xs tracking-[0.2em] uppercase text-[var(--accent)]/90 mb-1">
                    For clients & operators
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-white mt-1">
                    Discover, operate, pay per use
                  </h3>
                  <div className="mt-6 space-y-3 flex-1">
                    {clientSteps.map((s, i) => (
                      <div
                        key={s.title}
                        className="rounded-xl border border-[var(--accent)]/20 bg-white/[0.03] p-5"
                      >
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-semibold text-white">{s.title}</div>
                          <div className="text-xs text-white/45">Step {i + 1}</div>
                        </div>
                        <p className="mt-2 text-sm leading-6 text-white/60">{s.desc}</p>
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
