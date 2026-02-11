"use client";

import { useEffect, useMemo, useState } from "react";
import { useReducedMotion } from "framer-motion";

function clamp01(v: number) {
  return Math.max(0, Math.min(1, v));
}

function buildScramble(target: string, progress: number, alphabet: string) {
  const p = clamp01(progress);
  const revealCount = Math.floor(target.length * p);
  let out = "";
  for (let i = 0; i < target.length; i++) {
    const ch = target[i];
    if (ch === " " || ch === "\n" || ch === "\t") {
      out += ch;
      continue;
    }
    if (i < revealCount) {
      out += ch;
      continue;
    }
    out += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return out;
}

export function TextScramble({
  text,
  start,
  delayMs = 0,
  durationMs = 900,
  alphabet,
  className,
  style,
}: {
  text: string;
  start: boolean;
  delayMs?: number;
  durationMs?: number;
  alphabet?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const reducedMotion = useReducedMotion();
  const [display, setDisplay] = useState(text);

  const alpha = useMemo(
    () => alphabet ?? "$@%#&*+=-_/\\[]{}()<>!?;:~^0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    [alphabet],
  );

  useEffect(() => {
    if (reducedMotion) {
      setDisplay(text);
      return;
    }
    if (!start) return;

    let raf = 0;
    let timeout = 0;
    let t0 = 0;

    const run = () => {
      const step = (t: number) => {
        if (!t0) t0 = t;
        const p = clamp01((t - t0) / durationMs);
        setDisplay(buildScramble(text, p, alpha));
        if (p < 1) raf = window.requestAnimationFrame(step);
        else setDisplay(text);
      };
      raf = window.requestAnimationFrame(step);
    };

    timeout = window.setTimeout(run, delayMs);
    return () => {
      window.clearTimeout(timeout);
      window.cancelAnimationFrame(raf);
    };
  }, [alpha, delayMs, durationMs, reducedMotion, start, text]);

  return (
    <span className={className} style={style} aria-label={text}>
      <span aria-hidden="true">{display}</span>
    </span>
  );
}

