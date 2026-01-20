"use client";

import { useEffect } from "react";

export function PointerGlow() {
  useEffect(() => {
    const root = document.documentElement;
    let raf = 0;
    let x = window.innerWidth * 0.5;
    let y = window.innerHeight * 0.35;

    const reduce =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;

    const update = () => {
      raf = 0;
      root.style.setProperty("--mx", `${x}px`);
      root.style.setProperty("--my", `${y}px`);
    };

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (reduce) return;
      if (!raf) raf = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}




