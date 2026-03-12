"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Smooth animated number counter that counts up when it enters the viewport.
 *
 * Usage:
 *   <AnimatedCounter end={12400} suffix="+" duration={1800} />
 */
export function AnimatedCounter({
  end,
  start = 0,
  duration = 1600,
  suffix = "",
  prefix = "",
  decimals = 0,
  className,
  style,
}: {
  end: number;
  start?: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const [value, setValue] = useState(start);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            const startTime = performance.now();

            const animate = (now: number) => {
              const elapsed = now - startTime;
              const progress = Math.min(elapsed / duration, 1);
              // ease-out cubic
              const eased = 1 - Math.pow(1 - progress, 3);
              const current = start + (end - start) * eased;
              setValue(current);
              if (progress < 1) {
                requestAnimationFrame(animate);
              } else {
                setValue(end);
              }
            };

            requestAnimationFrame(animate);
            io.unobserve(el);
          }
        }
      },
      { threshold: 0.2 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [start, end, duration]);

  const formatted = decimals > 0
    ? value.toFixed(decimals)
    : Math.round(value).toLocaleString();

  return (
    <span ref={ref} className={className} style={style}>
      {prefix}{formatted}{suffix}
    </span>
  );
}
