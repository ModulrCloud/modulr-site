"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

type Props = {
  src: string;
  className?: string;
  loop?: boolean;
  autoplay?: boolean;
  hoverReplay?: boolean;
  speed?: number;
  ariaLabel?: string;
  preserveAspectRatio?: string;
};

export function LottiePlayer({
  src,
  className,
  loop = false,
  autoplay = true,
  hoverReplay = true,
  speed = 1,
  ariaLabel,
  preserveAspectRatio = "xMidYMid meet",
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<ReturnType<typeof import("lottie-web").default.loadAnimation> | null>(null);

  useEffect(() => {
    let cancelled = false;
    let cleanup: (() => void) | null = null;

    (async () => {
      const el = containerRef.current;
      if (!el) return;

      const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
      const lottie = (await import("lottie-web")).default;
      if (cancelled) return;

      el.innerHTML = "";

      const anim = lottie.loadAnimation({
        container: el,
        renderer: "svg",
        loop: reduce ? false : loop,
        autoplay: reduce ? false : autoplay,
        path: src,
        rendererSettings: { preserveAspectRatio },
      });
      anim.setSpeed(speed);
      animRef.current = anim;

      if (hoverReplay && !reduce) {
        const onEnter = () => {
          animRef.current?.stop();
          animRef.current?.play();
        };
        el.addEventListener("pointerenter", onEnter, { passive: true });
        cleanup = () => el.removeEventListener("pointerenter", onEnter);
      }

      if (reduce) anim.goToAndStop(0, true);
    })();

    return () => {
      cancelled = true;
      cleanup?.();
      animRef.current?.destroy();
      animRef.current = null;
    };
  }, [autoplay, hoverReplay, loop, preserveAspectRatio, speed, src]);

  return (
    <div
      ref={containerRef}
      className={cn("select-none", className)}
      role={ariaLabel ? "img" : undefined}
      aria-label={ariaLabel}
    />
  );
}
