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
  const containerRef = useRef<HTMLDivElement | null>(null);
  const animRef = useRef<any>(null);

  useEffect(() => {
    let cancelled = false;
    let cleanup: (() => void) | null = null;

    (async () => {
      const el = containerRef.current;
      if (!el) return;

      const reduce =
        window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;

      const lottie = (await import("lottie-web")).default;
      if (cancelled) return;

      // Ensure empty
      el.innerHTML = "";

      const anim = lottie.loadAnimation({
        container: el,
        renderer: "svg",
        loop: reduce ? false : loop,
        autoplay: reduce ? false : autoplay,
        path: src,
        rendererSettings: {
          preserveAspectRatio,
        },
      });
      anim.setSpeed(speed);
      animRef.current = anim;

      const onEnter = () => {
        if (!hoverReplay) return;
        if (!animRef.current) return;
        if (reduce) return;
        // replay from start
        animRef.current.stop();
        animRef.current.play();
      };

      if (hoverReplay) {
        el.addEventListener("pointerenter", onEnter, { passive: true });
        cleanup = () => el.removeEventListener("pointerenter", onEnter);
      }

      // If reduce-motion: draw first frame only.
      if (reduce) {
        anim.goToAndStop(0, true);
      }
    })();

    return () => {
      cancelled = true;
      cleanup?.();
      try {
        animRef.current?.destroy?.();
      } catch {}
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


