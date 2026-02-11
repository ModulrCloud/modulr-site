"use client";

import { cubicBezier, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState, type ReactNode } from "react";

export default function ExampleLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduce = useReducedMotion();

  // Avalanche-style overlay: new page slides up over the current one.
  // We render a short-lived fixed overlay that animates in, while keeping the real page in-flow underneath.
  // This preserves `window` scrolling + sticky behavior in pages (we avoid turning the whole segment into a scroll container).
  const [overlayOn, setOverlayOn] = useState(false);

  useEffect(() => {
    if (reduce) return;
    setOverlayOn(true);
    const t = window.setTimeout(() => setOverlayOn(false), 520);
    return () => window.clearTimeout(t);
  }, [pathname, reduce]);

  useEffect(() => {
    if (!overlayOn) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [overlayOn]);

  const overlayTransition = useMemo(() => {
    return reduce ? { duration: 0 } : { duration: 0.52, ease: cubicBezier(0.22, 1, 0.36, 1) };
  }, [reduce]);

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* Stable backdrop for the segment (prevents any theme-flash during overlay). */}
      <div aria-hidden="true" style={{ position: "fixed", inset: 0, background: "var(--background)", zIndex: -1 }} />

      {/* Real page (in-flow) */}
      <div style={{ opacity: overlayOn ? 0 : 1, transition: reduce ? "none" : "opacity 160ms ease-out" }}>{children}</div>

      {/* Overlay page (fixed) */}
      {overlayOn && (
        <>
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.12 }}
            exit={{ opacity: 0 }}
            transition={reduce ? { duration: 0 } : { duration: 0.18 }}
            style={{
              position: "fixed",
              inset: 0,
              background: "#000",
              pointerEvents: "none",
              zIndex: 9998,
            }}
          />
          <motion.div
            key={`overlay:${pathname}`}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={overlayTransition}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9999,
              background: "var(--background)",
              borderTopLeftRadius: 28,
              borderTopRightRadius: 28,
              boxShadow: "0 -30px 120px rgba(0,0,0,0.25), 0 0 0 1px rgba(0,0,0,0.06)",
              overflow: "hidden",
              willChange: "transform",
            }}
          >
            {children}
          </motion.div>
        </>
      )}
    </div>
  );
}

