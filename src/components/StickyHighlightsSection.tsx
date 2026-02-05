"use client";

import { useRef } from "react";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/cn";

const ownerSteps = [
  {
    title: "Connect with the Modulr agent",
    desc: "Get your robots on the network without rebuilding from scratch. Integrate your existing systems with the Modulr agent so they’re ready for scalable, remote operation—no more in-house solutions that don’t grow with you.",
  },
  {
    title: "Customize control over your fleet",
    desc: "Support any manufacturer, custom ROS commands, and the interfaces your team already uses. One platform that adapts to your stack so control is consistent and easy to use across the whole fleet.",
  },
  {
    title: "Set permissions and preferences",
    desc: "Define who can access and operate each robot, when, and under what rules. No more babysitting sessions—engineers stay focused on hard problems while operators and clients use the access you grant.",
  },
];

const clientSteps = [
  {
    title: "Discover",
    desc: "Browse and discover robots and services on the network. See availability, pricing, and capabilities in one place—no long procurement.",
  },
  {
    title: "Operate",
    desc: "Connect and control from your browser, VR headset, or preferred interface. Real-time feedback and built-in safety guardrails on every session.",
  },
  {
    title: "Pay per use",
    desc: "Rent only what you need. Clear per-session or per-minute pricing; no lock-in. Ideal for one-off inspections, demos, or scaling operations.",
  },
];

export function StickyHighlightsSection({ className }: { className?: string }) {
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
              Whether you're a robotics team looking for better internal controls over your own fleet, or an operator looking to rent and operate robots for your business—Modulr connects both sides.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-6 md:grid-cols-2 md:gap-8 md:items-stretch">
          {/* Left: For robot owners */}
          <div className="md:sticky md:top-24 md:self-start">
            <Reveal delayMs={90}>
              <div className="h-full rounded-2xl border border-hairline bg-white/[0.02] p-6 md:p-8 flex flex-col">
                <div className="text-xs tracking-[0.2em] uppercase text-white/50 mb-1">
                  For robot owners
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-white mt-1">
                  Customize full control over your robots
                </h3>
                <div className="mt-6 space-y-3 flex-1">
                  {ownerSteps.map((s, i) => (
                    <div key={s.title} className="rounded-xl border border-white/10 bg-black/20 p-5">
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




