"use client";

import { useEffect, useState, useRef } from "react";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/cn";

function useInViewRepeat() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [tick, setTick] = useState(0);
  const prev = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            if (!prev.current) setTick((x) => x + 1);
            prev.current = true;
            break;
          } else {
            prev.current = false;
          }
        }
      },
      { threshold: 0.25 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return { ref, tick };
}

function format(n: number) {
  return new Intl.NumberFormat(undefined).format(Math.round(n));
}

function Counter({ to, suffix = "", trigger }: { to: number; suffix?: string; trigger: number }) {
  const [v, setV] = useState(0);

  useEffect(() => {
    setV(0);
    const start = performance.now();
    const duration = 2200;
    let raf = 0;
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setV(to * eased);
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, trigger]);

  return <div className="tabular-nums">{format(v)}{suffix}</div>;
}

const stats = [
  { label: "Robots connected", to: 300, suffix: "+" },
  { label: "Countries", to: 10, suffix: "+" },
  { label: "Operators", to: 50, suffix: "+" },
  { label: "Avg latency", to: 200, suffix: "ms" },
];

export function NumbersSection({ className }: { className?: string }) {
  const { ref, tick } = useInViewRepeat();

  return (
    <section className={cn("border-t border-hairline bg-section", className)}>
      <div ref={ref} className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <Reveal>
          <div className="text-xs tracking-[0.22em] uppercase text-white/55">
            Network Stats
          </div>
        </Reveal>
        <Reveal delayMs={60}>
          <h2 className="mt-3 text-premium text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Proof that we're on <span className="text-gradient">the right track</span>
          </h2>
        </Reveal>

        <Reveal delayMs={110}>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-hairline bg-white/[0.02] p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.04)]"
              >
                <div className="text-3xl font-semibold tracking-tight text-white">
                  <Counter to={s.to} suffix={s.suffix} trigger={tick} />
                </div>
                <div className="mt-2 text-sm text-white/60">{s.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
