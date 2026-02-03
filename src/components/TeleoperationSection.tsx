"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/cn";
import { SmartImage } from "@/components/SmartImage";
import { Reveal } from "@/components/Reveal";

function IconGlobe({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function IconBolt({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  );
}

function IconShield({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function IconChart({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 3v18h18" />
      <path d="M18 9l-5 5-4-4-3 3" />
    </svg>
  );
}

const features = [
  {
    icon: IconGlobe,
    title: "Remote Robot Control",
    desc: "Operate any robot from anywhere with real-time video streaming and precise control inputs.",
  },
  {
    icon: IconBolt,
    title: "Sub-500ms Latency",
    desc: "Enterprise-grade responsive control for manipulation, recovery, and intervention.",
  },
  {
    icon: IconShield,
    title: "Secure Connections",
    desc: "End-to-end encryption and zero-trust architecture protect every session.",
  },
  {
    icon: IconChart,
    title: "Session Analytics & Logs",
    desc: "Real-time feedback to debug issues, improve performance, and validate safe operation.",
  },
];

export function TeleoperationSection({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section ref={ref} className={cn("relative border-t border-hairline bg-black", className)}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(242,180,0,0.08),transparent)]" />

      <div className="relative mx-auto max-w-6xl px-6 py-24 md:py-32">
        <div className="mb-16 max-w-2xl">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--accent)] mb-4">
              Teleoperation
            </p>
          </Reveal>
          <Reveal delayMs={40}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white tracking-tight">
              A new standard of control
            </h2>
          </Reveal>
          <Reveal delayMs={80}>
            <p className="mt-5 text-white/50 text-lg leading-relaxed">
              Real-time robot operation built for enterprise reliability and security.
            </p>
          </Reveal>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-8">
          <div className="lg:col-span-2 space-y-4">
            {features.map((feature, i) => (
              <Reveal key={feature.title} delayMs={120 + i * 40}>
                <div className="group flex gap-4 p-4 rounded-xl border border-transparent hover:border-white/[0.08] hover:bg-white/[0.02] transition-colors">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-white/[0.04] border border-white/[0.06] grid place-items-center">
                    <feature.icon className="w-5 h-5 text-[var(--accent)]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white mb-1">{feature.title}</h3>
                    <p className="text-sm text-white/40 leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delayMs={200} className="lg:col-span-3">
            <motion.div className="relative" style={{ y }}>
              <div className="relative rounded-2xl overflow-hidden border border-white/[0.08] bg-black">
                <div className="aspect-[16/10]">
                  <SmartImage
                    src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&h=750&fit=crop"
                    alt="Teleoperation interface"
                    className="w-full h-full object-cover opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                </div>

                <div className="absolute bottom-0 inset-x-0 p-5">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />
                      <span className="text-white/70">Connected</span>
                    </div>
                    <div className="flex gap-3 text-white/50 text-xs font-mono">
                      <span>87ms</span>
                      <span>60fps</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -right-4 px-4 py-3 rounded-xl border border-white/[0.08] bg-black/90 backdrop-blur-sm">
                <p className="text-xl font-semibold text-white">99.9%</p>
                <p className="text-xs text-white/40">Uptime</p>
              </div>
            </motion.div>
          </Reveal>
        </div>

        <Reveal delayMs={280}>
          <div className="mt-16 flex flex-wrap gap-3">
            <a
              href="https://app.modulr.cloud"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--accent)] text-black font-medium text-sm hover:brightness-110 transition"
            >
              Launch App
              <span className="text-black/60">→</span>
            </a>
            <a
              href="https://modulr.gitbook.io/modulr.cloud"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/15 text-white/70 font-medium text-sm hover:bg-white/[0.04] transition"
            >
              Documentation
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
