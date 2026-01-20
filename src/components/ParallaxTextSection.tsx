"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

export function ParallaxTextSection() {
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? ["0%", "0%"] : ["-18%", "18%"],
  );

  const textY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [48, -48]);
  const opacity = useTransform(scrollYProgress, [0.1, 0.3, 0.7, 0.9], [0, 1, 1, 0]);
  const scale = useTransform(
    scrollYProgress,
    [0.1, 0.4, 0.6, 0.9],
    reduceMotion ? [1, 1, 1, 1] : [0.96, 1, 1, 1.04],
  );
  const maskSize = useTransform(scrollYProgress, [0.15, 0.5], ["0%", "100%"]);

  return (
    <section className="relative bg-section overflow-hidden border-t border-hairline">
      <div ref={containerRef} className="relative h-[100svh]">
        <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
          {/* Parallax animated background */}
          <motion.div
            className="absolute inset-[-20%] w-[140%] h-[140%]"
            style={{ y: bgY }}
          >
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `
                  radial-gradient(ellipse 80% 60% at 50% 40%, rgba(242,180,0,0.20) 0%, transparent 54%),
                  radial-gradient(ellipse 70% 45% at 30% 60%, rgba(255,255,255,0.08) 0%, transparent 55%),
                  radial-gradient(ellipse 55% 40% at 70% 28%, rgba(242,180,0,0.10) 0%, transparent 52%),
                  radial-gradient(ellipse 110% 90% at 50% 100%, rgba(242,180,0,0.10) 0%, transparent 46%)
                `,
              }}
            />

            {/* Moving grid lines */}
            <motion.div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(90deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 110px)",
                y: useTransform(scrollYProgress, [0, 1], [0, -110]),
              }}
            />
            <motion.div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 110px)",
                x: useTransform(scrollYProgress, [0, 1], [0, -60]),
              }}
            />

            <div className="absolute inset-0 k-noise opacity-[0.15]" />
          </motion.div>

          <div className="absolute inset-0 bg-black/55" />

          {/* Text */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            style={{ opacity, scale }}
          >
            <motion.div className="relative" style={{ y: textY }}>
              <div className="relative text-center">
                {/* Outline */}
                <h2
                  className="text-[18vw] md:text-[14vw] lg:text-[12vw] font-black leading-[0.85] tracking-[-0.02em] uppercase"
                  style={{
                    color: "transparent",
                    WebkitTextStroke: "1px rgba(255,255,255,0.16)",
                    fontFamily: "var(--font-geist-sans), system-ui",
                  }}
                >
                  ROBOT
                  <br />
                  ECONOMY
                </h2>

                {/* Filled reveal */}
                <motion.div
                  className="absolute inset-0"
                  style={{
                    clipPath: useTransform(maskSize, (v) => {
                      const p = Number.parseFloat(v);
                      return `inset(0 ${100 - p}% 0 0)`;
                    }),
                  }}
                >
                  <h2
                    className="text-[18vw] md:text-[14vw] lg:text-[12vw] font-black leading-[0.85] tracking-[-0.02em] uppercase bg-gradient-to-r from-white via-white to-[var(--accent)] bg-clip-text text-transparent"
                    style={{ fontFamily: "var(--font-geist-sans), system-ui" }}
                  >
                    ROBOT
                    <br />
                    ECONOMY
                  </h2>
                </motion.div>
              </div>

              <motion.p
                className="mt-8 text-center text-sm md:text-base tracking-[0.2em] uppercase text-white/40"
                style={{
                  opacity: useTransform(
                    scrollYProgress,
                    [0.35, 0.5, 0.7, 0.85],
                    [0, 1, 1, 0],
                  ),
                }}
              >
                built for <span className="text-[var(--accent)]">teleoperation</span>
              </motion.p>
            </motion.div>
          </motion.div>

          {/* Vignette */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-60" />
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}


