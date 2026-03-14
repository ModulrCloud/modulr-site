"use client";

import { useMemo } from "react";

type OrbConfig = {
  size: number;
  x: string;
  y: string;
  gradient: string;
  duration: number;
  delay: number;
};

type FloatingOrbsProps = {
  variant?: "hero" | "gold" | "blue" | "purple";
  count?: number;
  bleedX?: number;
  bleedY?: number;
};

const palettes: Record<string, string[]> = {
  hero: [
    "radial-gradient(circle, rgba(242,180,0,0.15) 0%, rgba(242,180,0,0) 70%)",
    "radial-gradient(circle, rgba(99,102,241,0.12) 0%, rgba(99,102,241,0) 70%)",
    "radial-gradient(circle, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0) 70%)",
  ],
  gold: [
    "radial-gradient(circle, rgba(242,180,0,0.18) 0%, rgba(242,180,0,0) 70%)",
    "radial-gradient(circle, rgba(255,211,106,0.14) 0%, rgba(255,211,106,0) 70%)",
    "radial-gradient(circle, rgba(249,115,22,0.10) 0%, rgba(249,115,22,0) 70%)",
  ],
  blue: [
    "radial-gradient(circle, rgba(59,130,246,0.14) 0%, rgba(59,130,246,0) 70%)",
    "radial-gradient(circle, rgba(14,165,233,0.12) 0%, rgba(14,165,233,0) 70%)",
    "radial-gradient(circle, rgba(139,92,246,0.10) 0%, rgba(139,92,246,0) 70%)",
  ],
  purple: [
    "radial-gradient(circle, rgba(139,92,246,0.14) 0%, rgba(139,92,246,0) 70%)",
    "radial-gradient(circle, rgba(236,72,153,0.12) 0%, rgba(236,72,153,0) 70%)",
    "radial-gradient(circle, rgba(99,102,241,0.10) 0%, rgba(99,102,241,0) 70%)",
  ],
};

export function FloatingOrbs({ variant = "hero", count = 3, bleedX = 0, bleedY = 0 }: FloatingOrbsProps) {
  const orbs = useMemo<OrbConfig[]>(() => {
    const pal = palettes[variant] ?? palettes.hero;
    return Array.from({ length: count }, (_, i) => ({
      size: 200 + Math.random() * 300,
      x: `${10 + Math.random() * 80}%`,
      y: `${10 + Math.random() * 80}%`,
      gradient: pal[i % pal.length],
      duration: 12 + Math.random() * 10,
      delay: -Math.random() * 8,
    }));
  }, [variant, count]);

  return (
    <div
      style={{
        position: "absolute",
        top: bleedY ? -bleedY : 0,
        bottom: bleedY ? -bleedY : 0,
        left: bleedX ? -bleedX : 0,
        right: bleedX ? -bleedX : 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
      }}
      aria-hidden
    >
      {orbs.map((orb, i) => (
        <div
          key={i}
          className="floating-orb"
          style={{
            position: "absolute",
            left: orb.x,
            top: orb.y,
            width: orb.size,
            height: orb.size,
            borderRadius: "50%",
            background: orb.gradient,
            filter: "blur(40px)",
            transform: "translate(-50%,-50%) translate3d(0,0,0)",
            animationDuration: `${orb.duration}s`,
            animationDelay: `${orb.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
