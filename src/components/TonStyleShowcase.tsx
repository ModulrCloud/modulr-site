"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { SmartImage } from "@/components/SmartImage";
import { cn } from "@/lib/cn";
import { MODULR_LINKS } from "@/config/links";
import { TextScramble } from "@/components/TextScramble";

/**
 * TON-style showcase section with large premium tiles featuring photos
 * Like ton.org/en/use - big rounded cards with images and CTAs
 * FULL-WIDTH version
 */

type Tile = {
  title: string;
  desc: string;
  image: string;
  href: string;
  cta: string;
  accent: string;
  size: "large" | "medium";
  /** When true, use minimal overlay so the image stays sharp (no blur/fade) */
  minimalOverlay?: boolean;
  hideCta?: boolean;
};

const tiles: Tile[] = [
  {
    title: "Built from Teleoperation Up",
    desc: "Modulr is solving a real pain point in robotics today: fragmented, custom-built operator interfaces that don’t scale. We’re standardizing robot control into a customizable yet intuitive UX while laying the foundation for a peer-to-peer network connecting robots, AI, data, and compute. This approach earned Modulr a place in NVIDIA’s Inception Program.",
    image: "/NVIDIA_3.jpeg",
    href: "/technology-overview",
    cta: "Learn More",
    accent: "rgba(242,180,0,0.25)",
    size: "large",
    minimalOverlay: true,
    hideCta: true,
  },
  {
    title: "Get Started with Teleoperation",
    desc: "Set up your first robotic system and connect it to the network in minutes. No extra hardware needed.",
    image: "/mining3.png",
    href: MODULR_LINKS.APP,
    cta: "Launch App",
    accent: "rgba(0,200,150,0.25)",
    size: "medium",
  },
  {
    title: "Long Term Vision",
    desc: "See the vision for a world where anyone can operate & earn from any robot, anywhere: a decentralized network connecting robots, AI, data, and compute.",
    image: "/modulr_vision_image.jpg",
    href: "/technology-overview",
    cta: "View Technology",
    accent: "rgba(242,180,0,0.25)",
    size: "medium",
  },
];

export function TonStyleShowcase({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const [isDark, setIsDark] = useState(true);
  const [isMd, setIsMd] = useState(false);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  // Re-trigger on every entry (requested): when you scroll away and come back, scramble runs again.
  const headingInView = useInView(headingRef, { margin: "-35% 0px -35% 0px", once: false });
  
  useEffect(() => {
    // Get theme from data-theme attribute on document
    const checkTheme = () => {
      const theme = document.documentElement.getAttribute('data-theme');
      setIsDark(theme !== 'light');
    };
    
    const checkSize = () => {
      setIsMd(window.innerWidth >= 768);
    };
    
    checkTheme();
    checkSize();
    
    // Watch for theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });
    
    window.addEventListener('resize', checkSize);
    
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', checkSize);
    };
  }, []);

  return (
    <section 
      className={cn("border-t border-hairline", className)}
      style={{
        background: isDark ? "#000" : "#fff",
        borderTopColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
        transition: "background 0.3s, border-color 0.3s",
      }}
    >
      {/* Header - constrained */}
      <div className="mx-auto max-w-7xl px-6 pt-20 md:pt-28">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-14">
          <Reveal>
            <div>
              <div style={{ fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: isDark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.55)" }}>
                Discover
              </div>
              <h2
                ref={headingRef}
                className="mt-3 text-premium text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl"
                style={{ color: isDark ? "#fff" : "#000" }}
              >
                <TextScramble text="A New " start={headingInView} delayMs={80} durationMs={720} />
                <span className="text-gradient">
                  <TextScramble text="Robotics Paradigm" start={headingInView} delayMs={130} durationMs={980} />
                </span>
              </h2>
            </div>
          </Reveal>
          {/* <Reveal delayMs={80}>
            <p className="max-w-md text-sm leading-7 text-white/60">
              Everything you need to build, deploy, and scale robotic operations
              on a global network.
            </p>
          </Reveal> */}
        </div>
      </div>

      {/* Cards - FULL WIDTH with subtle edge padding */}
      <div className="px-4 md:px-8 pb-20 md:pb-28">
        <div className="grid gap-5 md:grid-cols-2">
          {tiles.map((tile, i) => (
            <Reveal
              key={tile.title}
              delayMs={60 + i * 50}
              className={tile.size === "large" ? "md:col-span-2" : ""}
            >
              <Link href={tile.href} className="group block">
                <motion.article
                  className={cn(
                    "relative overflow-hidden rounded-[32px] md:rounded-[48px]",
                    tile.size === "large"
                      ? "md:flex md:items-stretch min-h-[400px] md:min-h-[520px]"
                      : "min-h-[380px] md:min-h-[440px]"
                  )}
                  style={{
                    border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
                    // Keep the card glass subtle; image drives the look.
                    background: isDark ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.25)",
                  }}
                  whileHover={reduce ? undefined : { y: -6, scale: 1.003 }}
                  transition={{ duration: 0.28, ease: [0.2, 0.8, 0.2, 1] }}
                >
                  {/* Image section */}
                  <div
                    className={cn(
                      "absolute inset-0 overflow-hidden",
                      tile.size === "large" ? "md:relative md:w-[60%]" : ""
                    )}
                  >
                    <SmartImage
                      src={tile.image}
                      alt={tile.title}
                      className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                    />
                    {/* Overlays - minimal when tile.minimalOverlay to keep image sharp */}
                    {!tile.minimalOverlay && (
                      <>
                        <div
                          className="absolute inset-0"
                          style={{
                            background: tile.size === "large"
                              ? isDark 
                                ? isMd
                                  ? "linear-gradient(to right, transparent, rgba(0,0,0,0.4), #000)"
                                  : "linear-gradient(to top, #000, rgba(0,0,0,0.6), rgba(0,0,0,0.3))"
                                : isMd
                                  // Light theme: avoid white wash (“fog”). Use a dark vignette overlay for contrast.
                                  ? "linear-gradient(to right, transparent, rgba(0,0,0,0.22), rgba(0,0,0,0.60))"
                                  : "linear-gradient(to top, rgba(0,0,0,0.72), rgba(0,0,0,0.38), rgba(0,0,0,0.12))"
                              : isDark
                                ? "linear-gradient(to top, rgba(0,0,0,0.92), rgba(0,0,0,0.60), rgba(0,0,0,0.28))"
                                : "linear-gradient(to top, rgba(0,0,0,0.88), rgba(0,0,0,0.52), rgba(0,0,0,0.20))"
                          }}
                        />
                        {/* Extra top-left scrim for medium tiles to keep headings readable on bright photos */}
                        {tile.size !== "large" && (
                          <div
                            className="absolute inset-0"
                            style={{
                              background:
                                "radial-gradient(900px 520px at 18% 18%, rgba(0,0,0,0.78), rgba(0,0,0,0.34) 52%, transparent 74%)",
                              opacity: 0.95,
                            }}
                          />
                        )}
                        <div
                          className="pointer-events-none absolute inset-0"
                          style={{
                            background: `radial-gradient(1000px 600px at 30% 70%, ${tile.accent}, transparent 55%)`,
                            opacity: isDark ? 0.50 : 0.22,
                          }}
                        />
                      </>
                    )}
                    {tile.minimalOverlay && (
                      <div 
                        className="absolute inset-0" 
                        style={{
                          background: isDark 
                            ? "linear-gradient(to right, transparent 0%, transparent 30%, transparent 60%, rgba(0,0,0,0.45) 100%)"
                            // Light theme: keep image crisp; only add a subtle dark edge so text stays readable.
                            : "linear-gradient(to right, transparent 0%, transparent 40%, rgba(0,0,0,0.18) 75%, rgba(0,0,0,0.45) 100%)"
                        }}
                      />
                    )}
                  </div>

                  {/* Content section */}
                  <div
                    className={cn(
                      "relative flex flex-col justify-end p-8 md:p-12",
                      tile.size === "large"
                        ? "md:w-[40%] md:justify-center h-full"
                        : "h-full"
                    )}
                  >
                    {/* Content scrim: local contrast behind text without making the whole photo muddy */}
                    {tile.size !== "large" && (
                      <div
                        className="pointer-events-none absolute inset-0"
                        style={{
                          background:
                            "radial-gradient(820px 520px at 18% 22%, rgba(0,0,0,0.72), rgba(0,0,0,0.26) 56%, transparent 78%)",
                          opacity: 0.95,
                        }}
                      />
                    )}
                    {/* Accent glow behind content */}
                    <div
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background: `radial-gradient(600px 400px at 80% 50%, ${tile.accent}, transparent 50%)`,
                        opacity: isDark ? 0.30 : 0.18,
                      }}
                    />

                    <div className="relative">
                      <h3
                        className={cn(
                          "font-semibold tracking-tight group-hover:text-[var(--accent)] transition",
                          tile.size === "large"
                            ? "text-3xl md:text-4xl lg:text-5xl"
                            : "text-2xl md:text-3xl"
                        )}
                        // In light theme, the large tile has a bright content column (no photo behind),
                        // so we switch to dark text there for readability.
                        style={{
                          color: !isDark && tile.size === "large" ? "#000" : "#fff",
                          textShadow:
                            tile.size === "large"
                              ? "none"
                              : "0 1px 0 rgba(0,0,0,0.35), 0 18px 46px rgba(0,0,0,0.42)",
                        }}
                      >
                        {tile.title}
                      </h3>
                      <p
                        className={cn(
                          "mt-4 leading-7",
                          tile.size === "large"
                            ? "text-base md:text-lg max-w-lg"
                            : "text-sm max-w-md"
                        )}
                        style={{
                          color: !isDark && tile.size === "large"
                            ? "rgba(0,0,0,0.62)"
                            : "rgba(255,255,255,0.74)",
                          textShadow:
                            tile.size === "large"
                              ? "none"
                              : "0 1px 0 rgba(0,0,0,0.32), 0 18px 46px rgba(0,0,0,0.40)",
                        }}
                      >
                        {tile.desc}
                      </p>
                      {!tile.hideCta && (
                        <div className="mt-8 inline-flex items-center gap-4">
                          <span
                            className={cn(
                              "inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 font-semibold text-white transition group-hover:bg-white/10 group-hover:border-[var(--accent)]/40",
                              tile.size === "large"
                                ? "px-7 py-3.5 text-base"
                                : "px-5 py-2.5 text-sm"
                            )}
                          >
                            {tile.cta}
                          </span>
                          <span className="text-white/50 group-hover:text-white transition group-hover:translate-x-2 text-xl">
                            →
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Hover ring */}
                  <div 
                    className="pointer-events-none absolute inset-0 rounded-[32px] md:rounded-[48px] transition" 
                    style={{ 
                      boxShadow: `inset 0 0 0 1px ${isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}`,
                    }}
                  />
                </motion.article>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
