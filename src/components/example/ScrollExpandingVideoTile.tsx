"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

function clamp(v: number, a: number, b: number) {
  return Math.max(a, Math.min(b, v));
}

export function ScrollExpandingVideoTile({
  theme,
  title = "Modulr Technology Preview",
  subtitle = "A quick look at our real‑time teleoperation stack",
  videoSrc = "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
  poster = "/vibrant-wires-bg.png",
  fadeTextOnFull = false,
}: {
  theme: "dark" | "light";
  title?: string;
  subtitle?: string;
  videoSrc?: string;
  poster?: string;
  fadeTextOnFull?: boolean;
}) {
  const reduce = useReducedMotion();
  const isDark = theme !== "light";

  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [canPlay, setCanPlay] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [headerOffsetPx, setHeaderOffsetPx] = useState(64);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    // Progress = 0 when section hits top, 1 when section fully scrolls past.
    // This makes the animation react immediately (no “stuck” dead-zone).
    offset: ["start start", "end start"],
  });

  // We want the “pin” effect: tile expands while section scrolls,
  // but it should feel like normal scrolling (shorter pinned distance, no plateau).
  // Important: reach “fully expanded” earlier, not only at the very end of the section.
  // Antigravity-style: the tile becomes fullscreen mid-way, then you keep scrolling.
  // Expand faster: hit fullscreen while you are still “in” the video moment.
  // (Previously it needed almost a full-screen worth of scrolling.)
  const p = useTransform(scrollYProgress, (v: number) => clamp(v / 0.38, 0, 1));

  // /example has a sticky header; when we “fullscreen” the tile it would otherwise sit under it.
  // We pin the viewport *below* the header and expand to fill the remaining space.
  useEffect(() => {
    const measure = () => {
      const header = document.querySelector<HTMLElement>('[data-example-header="true"]');
      if (!header) return;
      const h = Math.round(header.getBoundingClientRect().height);
      if (h > 0 && h < 180) setHeaderOffsetPx(h);
    };
    measure();
    window.addEventListener("resize", measure, { passive: true } as any);
    return () => window.removeEventListener("resize", measure as any);
  }, []);

  // Keep a “safe gutter” so the fully-expanded state still shows the tile boundaries
  // (Antigravity-style: it feels huge, but not bleeding into the page edges).
  const GUTTER_PX = 24;

  const clipPath = useTransform(p, (v) => {
    // Start: smaller tile (inset) with rounder corners; End: full tile.
    const top = 18 - v * 18; // 18% -> 0%
    const side = 14 - v * 14; // 14% -> 0%
    // Keep slight rounding even at full expansion (premium + visible boundary).
    const r = 54 - v * 26; // 54 -> 28
    return `inset(${top}% ${side}% round ${r}px)`;
  });

  const scale = useTransform(p, [0, 1], [0.98, 1]);
  const opacity = useTransform(p, [0, 0.08, 1], [0, 1, 1]);
  // Height is relative to the pinned viewport (which is 100vh - header).
  const tileHeight = useTransform(p, (v) => `${Math.round(62 + v * 38)}%`); // 62% -> 100%

  const titleY = useTransform(p, [0, 1], [16, 0]);
  // Previously we faded the title at full expansion (Antigravity-style).
  // Users may prefer keeping text visible even when fully expanded.
  const titleOpacity = fadeTextOnFull
    ? useTransform(p, [0, 0.25, 0.78, 1], [0, 1, 1, 0])
    : useTransform(p, [0, 0.25, 1], [0, 1, 1]);

  useEffect(() => {
    if (reduce) return;
    if (!canPlay) return;
    const el = videoRef.current;
    if (!el) return;
    el.play().catch(() => {
      // Autoplay might fail; we keep the poster + subtle UI overlay.
    });
  }, [reduce, canPlay]);

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        // Shorter pinned distance => feels less like you’re “stuck” inside the section.
        height: reduce ? "112vh" : "145vh",
        marginTop: 24,
        marginBottom: 24,
      }}
    >
      <div
        className="sticky w-full flex items-center justify-center"
        style={{
          top: headerOffsetPx,
          height: `calc(100vh - ${headerOffsetPx}px)`,
        }}
      >
        {/* Wrapper defines the safe gutter size (no MotionValue inside calc) */}
        <div
          style={{
            width: `calc(100vw - ${GUTTER_PX * 2}px)`,
            height: `calc(100% - ${GUTTER_PX * 2}px)`,
            maxWidth: 1600,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <motion.div
            style={{
              position: "relative",
              width: "100%",
              height: tileHeight,
              overflow: "hidden",
              background: isDark ? "rgba(0,0,0,0.85)" : "rgba(255,255,255,0.92)",
              clipPath,
              WebkitClipPath: clipPath as unknown as string,
              opacity,
              scale,
              transformOrigin: "center",
              willChange: "transform, clip-path, opacity",
              backfaceVisibility: "hidden",
              borderWidth: 1,
              borderStyle: "solid",
              borderColor: isDark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.10)",
              boxShadow: isDark
                ? "0 40px 140px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.05)"
                : "0 30px 110px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.05)",
            }}
          >
            {/* Video */}
            <div style={{ position: "absolute", inset: 0 }}>
              {videoError ? (
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: `url(${poster})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    filter: "saturate(1.05) contrast(1.05)",
                  }}
                />
              ) : (
                <video
                  ref={videoRef}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  poster={poster}
                  onCanPlay={() => setCanPlay(true)}
                  onError={() => setVideoError(true)}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    filter: "saturate(1.05) contrast(1.05)",
                  }}
                >
                  <source src={videoSrc} type="video/mp4" />
                </video>
              )}

              {/* Premium overlays */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: isDark
                    ? "linear-gradient(to top, rgba(0,0,0,0.78), rgba(0,0,0,0.32), rgba(0,0,0,0.08))"
                    : "linear-gradient(to top, rgba(255,255,255,0.70), rgba(255,255,255,0.24), rgba(255,255,255,0.05))",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "radial-gradient(900px 500px at 70% 60%, rgba(110,150,255,0.20), transparent 55%), radial-gradient(700px 500px at 20% 30%, rgba(242,180,0,0.18), transparent 55%)",
                  opacity: isDark ? 0.65 : 0.45,
                  mixBlendMode: isDark ? "screen" : "multiply",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(90deg, rgba(255,255,255,0.10) 0%, transparent 12%, transparent 88%, rgba(255,255,255,0.06) 100%)",
                  opacity: isDark ? 0.12 : 0.08,
                }}
              />
            </div>

            {/* Title */}
            <motion.div
              style={{
                position: "absolute",
                left: 36,
                bottom: 34,
                right: 120,
                y: titleY,
                opacity: titleOpacity,
              }}
            >
              <div style={{ minWidth: 0 }}>
                <div
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: isDark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.55)",
                    marginBottom: 10,
                  }}
                >
                  Technology
                </div>
                <div
                  style={{
                    fontSize: 36,
                    fontWeight: 600,
                    letterSpacing: "-0.03em",
                    color: isDark ? "#fff" : "#000",
                    lineHeight: 1.05,
                  }}
                >
                  {title}
                </div>
                <div style={{ marginTop: 12, fontSize: 15, color: isDark ? "rgba(255,255,255,0.70)" : "rgba(0,0,0,0.70)", maxWidth: 720 }}>
                  {subtitle}
                </div>
              </div>
            </motion.div>

            {/* “Play intro” chip - bottom right like Antigravity */}
            <div
              style={{
                position: "absolute",
                right: 28,
                bottom: 26,
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "12px 16px",
                borderRadius: 999,
                background: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)",
                border: `1px solid ${isDark ? "rgba(255,255,255,0.14)" : "rgba(0,0,0,0.12)"}`,
                backdropFilter: "blur(14px)",
                color: isDark ? "rgba(255,255,255,0.85)" : "rgba(0,0,0,0.75)",
              }}
            >
              <span style={{ width: 24, height: 24, borderRadius: 999, display: "inline-flex", alignItems: "center", justifyContent: "center", background: isDark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.08)" }}>
                ▶
              </span>
              <span style={{ fontSize: 13, fontWeight: 600 }}>Play intro</span>
            </div>

            {/* Inner highlight ring */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,
                pointerEvents: "none",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)",
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

