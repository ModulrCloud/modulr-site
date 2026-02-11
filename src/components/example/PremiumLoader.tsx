"use client";

import { MODULR_ASSETS } from "@/config/assets";
import { useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

type Theme = "dark" | "light";

export function PremiumLoader({
  theme,
  label = "Loading",
  sublabel = "Preparing your workspace",
}: {
  theme: Theme;
  label?: string;
  sublabel?: string;
}) {
  // Premium "reference-style" loader: glossy black base + right-side mesh cluster + centered badge.
  const reduce = useReducedMotion();

  const wrapRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const pointerRef = useRef<{ x: number; y: number; active: boolean; last: number }>({ x: 0, y: 0, active: false, last: 0 });

  const [size, setSize] = useState<{ w: number; h: number }>({ w: 1200, h: 700 });

  type Node = {
    bx: number; // base x
    by: number; // base y
    x: number;
    y: number;
    s: number; // seed 0..1
  };

  const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  useEffect(() => {
    const measure = () => {
      const w = Math.max(320, Math.floor(window.innerWidth));
      const h = Math.max(500, Math.floor(window.innerHeight));
      setSize({ w, h });
      // center pointer state on first paint / resize
      pointerRef.current.x = w * 0.5;
      pointerRef.current.y = h * 0.5;
      pointerRef.current.active = false;
      pointerRef.current.last = performance.now();
    };
    measure();
    window.addEventListener("resize", measure, { passive: true });
    return () => window.removeEventListener("resize", measure as any);
  }, []);

  useEffect(() => {
    if (reduce) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = clamp(window.devicePixelRatio || 1, 1, 2);
    canvas.width = Math.floor(size.w * dpr);
    canvas.height = Math.floor(size.h * dpr);
    canvas.style.width = `${size.w}px`;
    canvas.style.height = `${size.h}px`;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Mesh cluster lives in a right-side ellipse (like the reference image).
    const clusterCx = size.w * 0.72;
    const clusterCy = size.h * 0.58;
    const clusterRx = size.w * 0.23;
    const clusterRy = size.h * 0.30;

    const count = Math.round(clamp((size.w * size.h) / 3800, 280, 520));
    const nodes: Node[] = [];

    // Stratified-ish sampling inside ellipse for a "designed" cluster (not random field).
    for (let i = 0; i < count; i++) {
      const s = Math.random();
      const a = Math.random() * Math.PI * 2;
      const r = Math.sqrt(Math.random()); // densify center
      const bx = clusterCx + Math.cos(a) * r * clusterRx * (0.65 + 0.5 * s);
      const by = clusterCy + Math.sin(a) * r * clusterRy * (0.65 + 0.5 * (1 - s));
      nodes.push({ bx, by, x: bx, y: by, s });
    }

    const cellSize = 56;
    const grid = new Map<string, number[]>();
    const keyOf = (cx: number, cy: number) => `${cx},${cy}`;
    const R = Math.min(size.w, size.h) * 0.085; // connection radius
    const R2 = R * R;

    let t0 = performance.now();
    const tick = (now: number) => {
      rafRef.current = requestAnimationFrame(tick);

      // Pause when tab is backgrounded
      if (document.visibilityState !== "visible") return;

      const dt = clamp((now - t0) / 16.67, 0.5, 2);
      t0 = now;
      const time = now * 0.001;

      // Clear (no long trails; reference is crisp).
      ctx.clearRect(0, 0, size.w, size.h);

      grid.clear();

      // Parallax: the whole cluster subtly shifts with pointer (premium depth, not "glow").
      const age = now - pointerRef.current.last;
      const pointerLive = pointerRef.current.active && age < 1400;
      const tx = pointerLive ? (pointerRef.current.x - size.w * 0.5) * 0.03 : Math.sin(time * 0.6) * 10;
      const ty = pointerLive ? (pointerRef.current.y - size.h * 0.5) * 0.02 : Math.cos(time * 0.55) * 8;

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        // micro-motion: gentle breathing to avoid "dead" static feeling
        const amp = 2 + n.s * 6;
        const ph = n.s * Math.PI * 2;
        n.x = n.bx + tx + Math.sin(time * (0.65 + n.s * 0.75) + ph) * amp;
        n.y = n.by + ty + Math.cos(time * (0.55 + n.s * 0.7) + ph * 1.2) * amp;

        const gcx = Math.floor(n.x / cellSize);
        const gcy = Math.floor(n.y / cellSize);
        const k = keyOf(gcx, gcy);
        const arr = grid.get(k);
        if (arr) arr.push(i);
        else grid.set(k, [i]);
      }

      // Draw connections + points (brand yellow) — tuned to avoid "cheap neon glow".
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        const p = nodes[i];
        const gcx = Math.floor(p.x / cellSize);
        const gcy = Math.floor(p.y / cellSize);

        for (let gx = gcx - 1; gx <= gcx + 1; gx++) {
          for (let gy = gcy - 1; gy <= gcy + 1; gy++) {
            const ids = grid.get(keyOf(gx, gy));
            if (!ids) continue;
            for (let j = 0; j < ids.length; j++) {
              const idx = ids[j];
              if (idx <= i) continue;
              const q = nodes[idx];
              const dx = p.x - q.x;
              const dy = p.y - q.y;
              const d2 = dx * dx + dy * dy;
              if (d2 > R2) continue;

              const a = 1 - d2 / R2;
              // Fade slightly toward left to match reference (cluster "reads" on the right).
              const rightness = clamp((p.x - size.w * 0.45) / (size.w * 0.55), 0, 1);
              const alpha = (0.04 + a * 0.16) * (0.45 + 0.55 * rightness);
              ctx.strokeStyle = `rgba(242,180,0,${alpha})`;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(q.x, q.y);
              ctx.stroke();
            }
          }
        }

        // points
        const r = 0.7 + p.s * 1.5;
        const alpha = 0.22 + p.s * 0.55;
        ctx.globalAlpha = alpha;
        ctx.fillStyle = p.s > 0.86 ? "rgba(242,180,0,0.95)" : "rgba(242,180,0,0.65)";
        ctx.beginPath();
        ctx.ellipse(p.x, p.y, r * 1.25, r, p.s * 7 + time * 0.35, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // Soft falloff so mesh doesn't feel pasted.
      const fade = ctx.createRadialGradient(clusterCx + tx, clusterCy + ty, Math.min(clusterRx, clusterRy) * 0.2, clusterCx + tx, clusterCy + ty, Math.max(clusterRx, clusterRy) * 1.15);
      fade.addColorStop(0, "rgba(242,180,0,0.08)");
      fade.addColorStop(0.55, "rgba(242,180,0,0.03)");
      fade.addColorStop(1, "rgba(242,180,0,0)");
      ctx.fillStyle = fade;
      ctx.fillRect(0, 0, size.w, size.h);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [reduce, size.h, size.w]);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      pointerRef.current.x = e.clientX - r.left;
      pointerRef.current.y = e.clientY - r.top;
      pointerRef.current.active = true;
      pointerRef.current.last = performance.now();
    };
    const onLeave = () => {
      pointerRef.current.active = false;
    };
    el.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerleave", onLeave, { passive: true });
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  // Loader in Antigravity style: keep it premium-dark even in light theme.
  const palette = useMemo(() => {
    return {
      bg: "#000",
      text: "rgba(255,255,255,0.92)",
      muted: "rgba(255,255,255,0.68)",
      muted2: "rgba(255,255,255,0.45)",
      border: "rgba(255,255,255,0.10)",
      accent: "#f2b400",
    };
  }, [theme]);

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={label}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: palette.bg,
        color: palette.text,
        overflow: "hidden",
      }}
    >
      {/* canvas field */}
      <div
        ref={wrapRef}
        style={{
          position: "absolute",
          inset: 0,
        }}
      >
        {!reduce && (
          <canvas
            ref={canvasRef}
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              display: "block",
              opacity: 0.95,
            }}
          />
        )}
        {reduce && (
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(900px 560px at 72% 62%, rgba(242,180,0,0.18), transparent 60%), radial-gradient(760px 420px at 72% 62%, rgba(242,180,0,0.10), transparent 62%)",
              opacity: 0.95,
            }}
          />
        )}
      </div>

      {/* glossy shell/vignette */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(1200px 700px at 30% 15%, rgba(255,255,255,0.055), transparent 60%), radial-gradient(1100px 640px at 70% 18%, rgba(255,255,255,0.035), transparent 62%), linear-gradient(180deg, rgba(255,255,255,0.022), transparent 35%, rgba(0,0,0,0.72) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* subtle grain + scanlines (very low opacity, “expensive” texture) */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "repeating-linear-gradient(180deg, rgba(255,255,255,0.020) 0px, rgba(255,255,255,0.020) 1px, rgba(0,0,0,0) 2px, rgba(0,0,0,0) 4px), radial-gradient(1200px 700px at 60% 55%, rgba(0,0,0,0), rgba(0,0,0,0.55))",
          opacity: 0.20,
          mixBlendMode: "overlay",
          pointerEvents: "none",
        }}
      />

      {/* content */}
      <div
        style={{
          position: "relative",
          height: "100%",
          width: "100%",
          display: "grid",
          placeItems: "center",
          padding: 32,
        }}
      >
        <div style={{ textAlign: "center" }}>
          {/* glossy badge */}
          <div
            style={{
              width: 82,
              height: 82,
              borderRadius: 24,
              marginInline: "auto",
              display: "grid",
              placeItems: "center",
              background: "linear-gradient(180deg, rgba(255,255,255,0.085), rgba(255,255,255,0.030))",
              border: `1px solid rgba(255,255,255,0.11)`,
              boxShadow: "0 36px 130px rgba(0,0,0,0.78), inset 0 1px 0 rgba(255,255,255,0.09)",
              position: "relative",
              overflow: "hidden",
              backdropFilter: "blur(12px)",
            }}
          >
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: -40,
                background:
                  "radial-gradient(240px 140px at 30% 20%, rgba(255,255,255,0.18), transparent 60%), radial-gradient(220px 160px at 70% 0%, rgba(242,180,0,0.12), transparent 62%)",
                opacity: 0.95,
                pointerEvents: "none",
              }}
            />
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(110deg, transparent 0%, rgba(255,255,255,0.10) 45%, transparent 70%)",
                transform: "translateX(-140%)",
                animation: reduce ? "none" : "agSweep 2200ms ease-in-out infinite",
                pointerEvents: "none",
              }}
            />
            <img src={MODULR_ASSETS.LOGO_MARK} alt="" style={{ height: 44, filter: "brightness(1.1)" }} />
          </div>

          <div style={{ marginTop: 18 }}>
            <div
              style={{
                fontSize: 12,
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                color: palette.muted2,
              }}
            >
              {label}
            </div>
            <div style={{ marginTop: 10, fontSize: 14, color: palette.muted, lineHeight: 1.55 }}>
              {sublabel}
            </div>
            <div
              aria-hidden="true"
              style={{
                marginTop: 18,
                width: 320,
                maxWidth: "calc(100vw - 64px)",
                height: 1,
                background: "rgba(255,255,255,0.10)",
                marginInline: "auto",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "40%",
                  background: "linear-gradient(90deg, transparent, rgba(242,180,0,0.55), transparent)",
                  transform: "translateX(-120%)",
                  animation: reduce ? "none" : "agScan 1600ms ease-in-out infinite",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes agSweep {
          0% {
            transform: translateX(-140%);
          }
          50% {
            transform: translateX(140%);
          }
          100% {
            transform: translateX(140%);
          }
        }
        @keyframes agScan {
          0% {
            transform: translateX(-120%);
          }
          60% {
            transform: translateX(220%);
          }
          100% {
            transform: translateX(220%);
          }
        }
      `}</style>
    </div>
  );
}

