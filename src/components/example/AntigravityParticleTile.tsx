"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { MODULR_LINKS } from "@/config/links";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  s: number; // seed
};

function clamp(v: number, a: number, b: number) {
  return Math.max(a, Math.min(b, v));
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function AntigravityParticleTile({
  theme,
}: {
  theme: "dark" | "light";
}) {
  const reduce = useReducedMotion();
  const isDark = theme !== "light";

  const wrapRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const visibleRef = useRef(true);
  const pointerRef = useRef<{ x: number; y: number; active: boolean }>({
    x: 0,
    y: 0,
    active: false,
  });

  const [size, setSize] = useState<{ w: number; h: number }>({ w: 1200, h: 600 });

  // Particle count tuned for smoothness on MBPs
  const count = useMemo(() => (reduce ? 0 : 900), [reduce]);

  const bg = isDark ? "rgba(0,0,0,0.96)" : "rgba(7,7,10,0.96)"; // keep “premium dark tile” vibe even in light theme
  const border = isDark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.10)";
  const title = isDark ? "#fff" : "#fff";
  const muted = isDark ? "rgba(255,255,255,0.70)" : "rgba(255,255,255,0.72)";

  useEffect(() => {
    if (!wrapRef.current) return;

    const el = wrapRef.current;
    const ro = new ResizeObserver(() => {
      const r = el.getBoundingClientRect();
      setSize({ w: Math.max(320, Math.floor(r.width)), h: Math.max(260, Math.floor(r.height)) });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (reduce) return;
    if (!wrapRef.current) return;

    const io = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        visibleRef.current = Boolean(e?.isIntersecting);
      },
      { threshold: 0.05 }
    );
    io.observe(wrapRef.current);
    return () => io.disconnect();
  }, [reduce]);

  useEffect(() => {
    if (reduce) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Setup canvas
    const dpr = clamp(typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1, 1, 2);
    canvas.width = Math.floor(size.w * dpr);
    canvas.height = Math.floor(size.h * dpr);
    canvas.style.width = `${size.w}px`;
    canvas.style.height = `${size.h}px`;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Init particles
    const particles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      const s = Math.random();
      particles.push({
        x: Math.random() * size.w,
        y: Math.random() * size.h,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        s,
      });
    }

    // Spatial hash for connecting neighbors
    const cellSize = 28;
    const grid = new Map<string, number[]>();
    const keyOf = (cx: number, cy: number) => `${cx},${cy}`;

    let t0 = performance.now();

    const tick = (now: number) => {
      rafRef.current = requestAnimationFrame(tick);
      if (!visibleRef.current) return;

      const dt = clamp((now - t0) / 16.67, 0.5, 2);
      t0 = now;

      const time = now * 0.00035;
      const px = pointerRef.current.x;
      const py = pointerRef.current.y;
      const pActive = pointerRef.current.active;

      // Background clear (slight persistence for silk trails)
      ctx.fillStyle = isDark ? "rgba(0,0,0,0.25)" : "rgba(0,0,0,0.22)";
      ctx.fillRect(0, 0, size.w, size.h);

      grid.clear();

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Base flow field (smooth)
        const nx = p.x / size.w;
        const ny = p.y / size.h;
        const angle =
          Math.sin((ny * 3.2 + time) * Math.PI * 2) * 0.9 +
          Math.cos((nx * 2.7 - time * 0.9) * Math.PI * 2) * 0.7;

        const fx = Math.cos(angle) * 0.045;
        const fy = Math.sin(angle) * 0.045;

        p.vx += fx * dt;
        p.vy += fy * dt;

        // Cursor “figure” field: orbit + lissajous attractor
        if (pActive) {
          const dx = p.x - px;
          const dy = p.y - py;
          const d = Math.sqrt(dx * dx + dy * dy) + 1e-3;
          const influence = clamp(1 - d / 420, 0, 1);

          // Orbit force (perpendicular)
          const ox = -dy / d;
          const oy = dx / d;
          const orbit = (0.42 + p.s * 0.6) * influence;

          // Lissajous target (creates “figures” that breathe)
          const phase = time * 1.35 + p.s * Math.PI * 2;
          const a = 160 + 70 * Math.sin(time * 1.1);
          const b = 110 + 55 * Math.cos(time * 1.05);
          const tx = px + Math.sin(phase * 1.0) * a * (0.2 + 0.8 * influence);
          const ty = py + Math.sin(phase * 1.7 + 0.8) * b * (0.2 + 0.8 * influence);

          const ax = (tx - p.x) * (0.0009 + 0.0028 * influence);
          const ay = (ty - p.y) * (0.0009 + 0.0028 * influence);

          p.vx += (ox * orbit + ax) * dt;
          p.vy += (oy * orbit + ay) * dt;
        }

        // Friction & clamp speed for smoothness
        p.vx *= 0.985;
        p.vy *= 0.985;
        const sp = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        const maxSp = 1.2;
        if (sp > maxSp) {
          p.vx = (p.vx / sp) * maxSp;
          p.vy = (p.vy / sp) * maxSp;
        }

        p.x += p.vx * 7.2 * dt;
        p.y += p.vy * 7.2 * dt;

        // Wrap edges
        if (p.x < -20) p.x = size.w + 20;
        if (p.x > size.w + 20) p.x = -20;
        if (p.y < -20) p.y = size.h + 20;
        if (p.y > size.h + 20) p.y = -20;

        const cx = Math.floor(p.x / cellSize);
        const cy = Math.floor(p.y / cellSize);
        const k = keyOf(cx, cy);
        const arr = grid.get(k);
        if (arr) arr.push(i);
        else grid.set(k, [i]);
      }

      // Draw connections + points (brand yellow)
      const dot = "rgba(242,180,0,0.92)";
      const dotDim = "rgba(242,180,0,0.56)";

      ctx.lineWidth = 1;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const cx = Math.floor(p.x / cellSize);
        const cy = Math.floor(p.y / cellSize);

        // Neighbors: 3x3 cells
        for (let gx = cx - 1; gx <= cx + 1; gx++) {
          for (let gy = cy - 1; gy <= cy + 1; gy++) {
            const ids = grid.get(keyOf(gx, gy));
            if (!ids) continue;
            for (let j = 0; j < ids.length; j++) {
              const idx = ids[j];
              if (idx <= i) continue;
              const q = particles[idx];
              const dx = p.x - q.x;
              const dy = p.y - q.y;
              const d2 = dx * dx + dy * dy;
              if (d2 > 2200) continue; // ~47px
              const a = 1 - d2 / 2200;
              ctx.strokeStyle = `rgba(242,180,0,${0.10 + a * 0.18})`;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(q.x, q.y);
              ctx.stroke();
            }
          }
        }

        // Point (small “capsule” like Antigravity)
        const sp = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        const r = 0.8 + sp * 0.35;
        const alpha = 0.45 + p.s * 0.45;
        ctx.fillStyle = p.s > 0.82 ? dot : dotDim;
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.ellipse(p.x, p.y, r * 1.35, r, (p.s + time) * 2, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;

      // Cursor glow
      if (pActive) {
        const g = ctx.createRadialGradient(px, py, 0, px, py, 260);
        g.addColorStop(0, "rgba(242,180,0,0.18)");
        g.addColorStop(0.35, "rgba(242,180,0,0.07)");
        g.addColorStop(1, "rgba(242,180,0,0)");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, size.w, size.h);
      }

      // Subtle vignette
      const vg = ctx.createRadialGradient(size.w * 0.5, size.h * 0.55, 0, size.w * 0.5, size.h * 0.55, Math.max(size.w, size.h) * 0.75);
      vg.addColorStop(0, "rgba(0,0,0,0)");
      vg.addColorStop(1, "rgba(0,0,0,0.75)");
      ctx.fillStyle = vg;
      ctx.fillRect(0, 0, size.w, size.h);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [count, reduce, size.h, size.w, isDark]);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      pointerRef.current.x = e.clientX - r.left;
      pointerRef.current.y = e.clientY - r.top;
      pointerRef.current.active = true;
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

  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
      style={{
        borderRadius: 34,
        border: `1px solid ${border}`,
        background: bg,
        overflow: "hidden",
        position: "relative",
        boxShadow: isDark
          ? "0 30px 120px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.04)"
          : "0 30px 120px rgba(0,0,0,0.40), 0 0 0 1px rgba(255,255,255,0.04)",
      }}
    >
      {/* Canvas field */}
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
            }}
          />
        )}

        {/* Fallback when reduced motion */}
        {reduce && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(900px 500px at 70% 60%, rgba(242,180,0,0.18), transparent 60%), radial-gradient(900px 500px at 30% 25%, rgba(242,180,0,0.12), transparent 60%)",
              opacity: 0.9,
            }}
          />
        )}
      </div>

      {/* Foreground content */}
      <div
        style={{
          position: "relative",
          display: "grid",
          gridTemplateColumns: "minmax(280px, 520px) 1fr",
          gap: 24,
          padding: "56px 56px",
          alignItems: "center",
        }}
      >
        <div style={{ minWidth: 0 }}>
          <div
            style={{
              fontSize: 52,
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              fontWeight: 500,
              color: title,
              maxWidth: 520,
            }}
          >
            Teleoperation
            <br />
            for Real‑World Scale
            <span
              style={{
                display: "inline-block",
                width: 4,
                height: 44,
                borderRadius: 999,
                marginLeft: 10,
                transform: "translateY(6px)",
                background:
                  "linear-gradient(180deg, rgba(242,180,0,1), rgba(255,211,106,1))",
                boxShadow: "0 0 0 1px rgba(255,255,255,0.10)",
                opacity: 0.95,
              }}
            />
          </div>

          <p style={{ marginTop: 18, fontSize: 15, color: muted, maxWidth: 520, lineHeight: 1.7 }}>
            Run enterprise‑grade real‑time robot operations in the{" "}
            <span style={{ color: "rgba(255,255,255,0.92)" }}>Modulr Teleop App</span>, and verify activity on-chain via
            the{" "}
            <span style={{ color: "rgba(255,255,255,0.92)" }}>Modulr Explorer</span> — built for an open network
            economy connecting robots, AI, data, and compute.
          </p>

          <div style={{ marginTop: 22, display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a
              href={MODULR_LINKS.APP}
              target="_blank"
              rel="noreferrer"
              style={{
                height: 44,
                padding: "0 18px",
                borderRadius: 999,
                background: "rgba(255,255,255,0.95)",
                color: "#000",
                fontSize: 14,
                fontWeight: 600,
                border: "none",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Launch app
            </a>
            <a
              href="https://testnet.explorer.modulr.cloud"
              target="_blank"
              rel="noreferrer"
              style={{
                height: 44,
                padding: "0 18px",
                borderRadius: 999,
                background: "rgba(255,255,255,0.10)",
                color: "rgba(255,255,255,0.92)",
                fontSize: 14,
                fontWeight: 600,
                border: "1px solid rgba(255,255,255,0.14)",
                cursor: "pointer",
                backdropFilter: "blur(10px)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Explorer
            </a>
          </div>
        </div>

        {/* Right column intentionally left “empty” to let particles breathe */}
        <div style={{ minHeight: 260 }} />
      </div>

      {/* Rounded mask highlight */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 34,
          pointerEvents: "none",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)",
        }}
      />
    </motion.section>
  );
}

