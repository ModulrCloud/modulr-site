"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

type UseCase = {
  title: string;
  desc: string;
  image: string;
  stat: string;
  statLabel: string;
};

const USE_CASES: UseCase[] = [
  {
    title: "Entertainment & Gaming",
    desc: "Control telepresence robots in theme parks, arcades, and immersive experiences from anywhere in the world.",
    image: "/entertainment-gaming.png",
    stat: "10ms",
    statLabel: "Latency",
  },
  {
    title: "Defense & Security",
    desc: "Operate unmanned ground and aerial vehicles for reconnaissance, patrol, and hazardous environment inspection with military‑grade reliability.",
    image: "/defense_robots.jpg",
    stat: "99.9%",
    statLabel: "Uptime",
  },
  {
    title: "Industrial Automation",
    desc: "Remotely manage robotic arms, AGVs, and factory floor equipment with sub‑second latency. Scale operations without physical presence.",
    image: "/agriculture-industrial.png",
    stat: "500+",
    statLabel: "Robots",
  },
  {
    title: "Space & Extreme Environments",
    desc: "Control rovers, orbital manipulators, and deep‑sea exploration robots across vast distances with real‑time feedback loops.",
    image: "/drones.png",
    stat: "∞",
    statLabel: "Range",
  },
];

function clamp01(v: number) {
  return Math.max(0, Math.min(1, v));
}

export function ExampleUseCasesStickySection({
  theme,
}: {
  theme: "dark" | "light";
}) {
  // Match the “second screenshot” structure, but stay theme-aware for /example theme toggle.
  const isDark = theme !== "light";
  const reduce = useReducedMotion();
  const containerRef = useRef<HTMLDivElement | null>(null);

  const cardCount = USE_CASES.length;
  const sectionHeightVh = 100 + cardCount * 100;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const [active, setActive] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next = Math.min(cardCount - 1, Math.max(0, Math.floor(v * cardCount)));
    setActive(next);
  });

  // scroll hint fades out when entering last segment
  const hintOpacity = useTransform(
    scrollYProgress,
    [0, 0.08, (cardCount - 1) / cardCount, 1],
    [0, 1, 1, 0],
  );

  const bars = useMemo(() => new Array(cardCount).fill(0), [cardCount]);

  const textColor = isDark ? "#fff" : "#000";
  const muted = isDark ? "rgba(255,255,255,0.65)" : "rgba(0,0,0,0.62)";
  const hairline = isDark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.10)";
  const accent = "#f2b400";
  const bg = isDark ? "#000" : "#fff";
  // Use-cases card should stay readable in light theme: keep white text + dark scrim on media.
  const cardText = "#fff";
  const cardMuted = "rgba(255,255,255,0.74)";
  const cardHairline = "rgba(255,255,255,0.14)";

  return (
    <section
      ref={containerRef}
      style={{
        position: "relative",
        height: `${sectionHeightVh}vh`,
        background: bg,
        borderTop: `1px solid ${hairline}`,
      }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Background glow */}
        <div
          className="absolute inset-0"
          style={{
            background: isDark
              ? "radial-gradient(1000px 600px at 70% 65%, rgba(242,180,0,0.12), transparent 60%), radial-gradient(900px 500px at 25% 20%, rgba(255,255,255,0.06), transparent 60%), linear-gradient(to bottom, #000, #050508, #000)"
              : "radial-gradient(1000px 600px at 70% 65%, rgba(242,180,0,0.10), transparent 60%), radial-gradient(900px 500px at 25% 20%, rgba(0,0,0,0.05), transparent 60%), linear-gradient(to bottom, #fff, #fafafa, #fff)",
          }}
        />
        <div className="absolute inset-0 k-noise" style={{ opacity: isDark ? 0.10 : 0.06 }} />

        {/* Giant title */}
        <div className="absolute top-0 left-0 right-0 z-20 pt-10 md:pt-14 pointer-events-none">
          <div className="px-6 md:px-12">
            <div
              style={{
                fontFamily: "system-ui",
                fontWeight: 900,
                lineHeight: 0.85,
                letterSpacing: "-0.04em",
                textTransform: "uppercase",
                fontSize: "clamp(64px, 12vw, 180px)",
              }}
            >
              <span
                style={{
                  color: "transparent",
                  WebkitTextStroke: isDark
                    ? "2px rgba(255,255,255,0.18)"
                    : "2px rgba(0,0,0,0.14)",
                }}
              >
                USE
              </span>{" "}
              <span
                style={{
                  display: "inline-block",
                  backgroundImage: isDark
                    ? "linear-gradient(90deg, #fff 0%, #fff 55%, #f2b400 100%)"
                    : "linear-gradient(90deg, #000 0%, #000 55%, #f2b400 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  color: "transparent",
                }}
              >
                CASES
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="absolute inset-0 flex items-center justify-center pt-28 md:pt-32">
          <div className="relative w-full max-w-[1600px] mx-auto px-6 md:px-12">
            <div className="grid gap-8 lg:grid-cols-12 lg:gap-12 items-center">
              {/* Left */}
              <div className="lg:col-span-4 relative z-10">
                <div className="space-y-10">
                  <div>
                    <div
                      style={{
                        fontSize: 11,
                        letterSpacing: "0.28em",
                        textTransform: "uppercase",
                        color: isDark ? "rgba(255,255,255,0.38)" : "rgba(0,0,0,0.40)",
                        marginBottom: 14,
                      }}
                    >
                      Remote Teleoperation
                    </div>
                    <p
                      style={{
                        fontSize: 18,
                        lineHeight: 1.7,
                        color: muted,
                        maxWidth: 420,
                      }}
                    >
                      From agriculture to space exploration, Modulr powers real‑time robotic control in the most demanding environments.
                    </p>
                  </div>

                  {/* Progress bars (like your screenshot) */}
                  <div className="flex flex-col gap-3">
                    {bars.map((_, idx) => {
                      const seg = 1 / cardCount;
                      const start = idx * seg;
                      const end = (idx + 1) * seg;
                      const fill = useTransform(scrollYProgress, (v: number) =>
                        clamp01((v - start) / (end - start)),
                      );

                      return (
                        <div
                          key={idx}
                          style={{
                            position: "relative",
                            height: 4,
                            width: 96,
                            borderRadius: 999,
                            background: isDark
                              ? "rgba(255,255,255,0.16)"
                              : "rgba(0,0,0,0.12)",
                            overflow: "hidden",
                          }}
                        >
                          <motion.div
                            style={{
                              position: "absolute",
                              inset: 0,
                              background: accent,
                              borderRadius: 999,
                              scaleX: fill,
                              transformOrigin: "left",
                              opacity: idx === active ? 1 : 0.75,
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right card */}
              <div className="lg:col-span-8 relative">
                <div className="relative h-[52vh] md:h-[56vh] lg:h-[60vh]">
                  <AnimatePresence mode="wait">
                    <motion.article
                      key={active}
                      initial={reduce ? { opacity: 1 } : { opacity: 0, y: 18, scale: 0.99 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={reduce ? { opacity: 1 } : { opacity: 0, y: -14, scale: 0.995 }}
                      transition={{ duration: 0.32, ease: [0.2, 0.8, 0.2, 1] }}
                      style={{
                        position: "absolute",
                        inset: 0,
                        overflow: "hidden",
                        borderRadius: 28,
                        border: `1px solid ${hairline}`,
                        background: isDark ? "rgba(0,0,0,0.55)" : "rgba(0,0,0,0.18)",
                        boxShadow:
                          isDark
                            ? "0 0 0 1px rgba(255,255,255,0.04), 0 30px 120px rgba(0,0,0,0.55)"
                            : "0 0 0 1px rgba(0,0,0,0.04), 0 30px 120px rgba(0,0,0,0.12)",
                      }}
                    >
                      <div className="absolute inset-0">
                        <Image
                          src={USE_CASES[active].image}
                          alt={USE_CASES[active].title}
                          fill
                          sizes="(max-width: 1024px) 100vw, 60vw"
                          style={{
                            objectFit: "cover",
                            // Counter the light overlay so photos don't look foggy.
                            filter: isDark ? "none" : "saturate(1.06) contrast(1.10) brightness(0.86)",
                          }}
                        />
                        <div
                          className="absolute inset-0"
                          style={{
                            background: isDark
                              ? "linear-gradient(to top, rgba(0,0,0,0.88), rgba(0,0,0,0.60), rgba(0,0,0,0.25))"
                              // Light theme: darker scrim so text is always readable on bright photos.
                              : "linear-gradient(to top, rgba(0,0,0,0.86), rgba(0,0,0,0.52), rgba(0,0,0,0.12))",
                          }}
                        />
                        {!isDark && (
                          <div
                            className="absolute inset-0"
                            style={{
                              background:
                                "radial-gradient(900px 560px at 20% 22%, rgba(0,0,0,0.70), rgba(0,0,0,0.22) 55%, transparent 78%)",
                              opacity: 0.95,
                            }}
                          />
                        )}
                        <div
                          className="pointer-events-none absolute inset-0"
                          style={{
                            background:
                              "radial-gradient(900px 600px at 70% 70%, rgba(242,180,0,0.20), transparent 55%)",
                            opacity: isDark ? 0.85 : 0.55,
                          }}
                        />
                      </div>

                      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 lg:p-12">
                        <div className="mb-6 inline-flex self-start items-center gap-3">
                          <div
                            style={{
                              borderRadius: 16,
                              border: `1px solid ${isDark ? "rgba(255,255,255,0.14)" : cardHairline}`,
                              background: isDark ? "rgba(0,0,0,0.55)" : "rgba(0,0,0,0.42)",
                              backdropFilter: "blur(10px)",
                              padding: "10px 14px",
                              display: "inline-flex",
                              alignItems: "baseline",
                              gap: 10,
                            }}
                          >
                            <div style={{ fontSize: 20, fontWeight: 800, color: cardText }}>
                              {USE_CASES[active].stat}
                            </div>
                            <div
                              style={{
                                fontSize: 10,
                                letterSpacing: "0.2em",
                                textTransform: "uppercase",
                                color: isDark ? "rgba(255,255,255,0.45)" : "rgba(255,255,255,0.55)",
                              }}
                            >
                              {USE_CASES[active].statLabel}
                            </div>
                          </div>
                        </div>

                        <h3
                          style={{
                            fontSize: 34,
                            fontWeight: 700,
                            color: cardText,
                            letterSpacing: "-0.02em",
                            textShadow: "0 1px 0 rgba(0,0,0,0.35), 0 18px 56px rgba(0,0,0,0.45)",
                          }}
                        >
                          {USE_CASES[active].title}
                        </h3>
                        <p
                          style={{
                            marginTop: 12,
                            fontSize: 15,
                            lineHeight: 1.75,
                            color: isDark ? muted : cardMuted,
                            maxWidth: 640,
                            textShadow: "0 1px 0 rgba(0,0,0,0.30), 0 18px 56px rgba(0,0,0,0.42)",
                          }}
                        >
                          {USE_CASES[active].desc}
                        </p>

                        <div style={{ marginTop: 22, display: "inline-flex", alignItems: "center", gap: 12 }}>
                          <span
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              justifyContent: "center",
                              borderRadius: 999,
                              border: `1px solid ${isDark ? "rgba(255,255,255,0.14)" : cardHairline}`,
                              background: "rgba(255,255,255,0.08)",
                              padding: "10px 18px",
                              fontSize: 14,
                              fontWeight: 600,
                              color: cardText,
                              backdropFilter: "blur(10px)",
                            }}
                          >
                            Learn More
                          </span>
                          <span style={{ color: isDark ? "rgba(255,255,255,0.50)" : "rgba(255,255,255,0.55)", fontSize: 18 }}>→</span>
                        </div>
                      </div>
                    </motion.article>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-8 left-0 right-0 z-10 flex justify-center pointer-events-none"
          style={{ opacity: hintOpacity }}
          initial={false}
        >
          <motion.div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontSize: 11,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: isDark ? "rgba(255,255,255,0.28)" : "rgba(0,0,0,0.28)",
            }}
            animate={reduce ? undefined : { y: [0, 8, 0] }}
            transition={reduce ? undefined : { duration: 2, repeat: Infinity }}
          >
            Scroll to explore <span>↓</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

