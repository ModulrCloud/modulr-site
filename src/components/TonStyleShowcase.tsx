"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { SmartImage } from "@/components/SmartImage";
import { MODULR_LINKS } from "@/config/links";

/**
 * Reworked into ElevenLabs-like clean product section
 */

type Tile = {
  title: string;
  desc: string;
  image: string;
  visual: string;
  href: string;
  cta: string;
};

const tiles: Tile[] = [
  {
    title: "Operator Console",
    desc: "Control robots, monitor missions, and manage handoffs in one unified interface.",
    image: "/NVIDIA_3.jpeg",
    visual:
      "radial-gradient(220px 140px at 25% 45%, rgba(101,187,255,0.86), transparent 60%), radial-gradient(240px 150px at 78% 35%, rgba(255,176,96,0.72), transparent 62%), #eff1f5",
    href: "/technology-overview",
    cta: "Learn more",
  },
  {
    title: "Fleet Orchestration",
    desc: "Coordinate dozens of robots with policy-based routing and instant intervention controls.",
    image: "/mining3.png",
    visual:
      "radial-gradient(220px 140px at 30% 46%, rgba(99,226,176,0.80), transparent 60%), radial-gradient(250px 155px at 76% 35%, rgba(98,152,255,0.62), transparent 60%), #eef2f1",
    href: MODULR_LINKS.APP,
    cta: "Launch app",
  },
  {
    title: "Network Intelligence",
    desc: "Turn telemetry into operational insights with low-latency analytics and replay.",
    image: "/modulr_vision_image.jpg",
    visual:
      "radial-gradient(220px 130px at 28% 48%, rgba(255,143,91,0.76), transparent 60%), radial-gradient(240px 150px at 76% 35%, rgba(248,85,85,0.66), transparent 60%), #f3efef",
    href: "/technology-overview",
    cta: "View technology",
  },
];

export function TonStyleShowcase({ className }: { className?: string }) {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const checkTheme = () => {
      const theme = document.documentElement.getAttribute('data-theme');
      setIsDark(theme !== 'light');
    };
    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    return () => {
      observer.disconnect();
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
      <div className="mx-auto max-w-[1400px] px-6 pt-20 pb-20">
        <div
          style={{
            borderRadius: 28,
            border: `1px solid ${isDark ? "rgba(255,255,255,0.11)" : "rgba(0,0,0,0.10)"}`,
            background: isDark ? "#111214" : "#efeff0",
            padding: 24,
          }}
        >
          <div className="mb-9 grid gap-7 lg:grid-cols-[1fr_0.95fr] lg:items-end">
            <div>
              <div style={{ fontSize: 13, color: isDark ? "rgba(255,255,255,0.42)" : "rgba(0,0,0,0.42)" }}>
                Discover
              </div>
              <h2
                className="mt-2 text-3xl sm:text-4xl md:text-[56px]"
                style={{ color: isDark ? "#fff" : "#000", letterSpacing: "-0.03em", lineHeight: 1.04, fontWeight: 520 }}
              >
                A New Robotics Paradigm
              </h2>
            </div>
            <div>
            <p style={{ color: isDark ? "rgba(255,255,255,0.62)" : "rgba(0,0,0,0.58)", maxWidth: 620, lineHeight: 1.65, fontSize: 15 }}>
              Built for today&apos;s operators and tomorrow&apos;s decentralized machine economy.
              Modular controls, real-time network telemetry, and enterprise-grade governance in one stack.
            </p>
            <div className="mt-4 flex gap-2.5">
              <Link
                href={MODULR_LINKS.APP}
                style={{
                  height: 42,
                  borderRadius: 999,
                  padding: "0 14px",
                  display: "inline-flex",
                  alignItems: "center",
                  textDecoration: "none",
                  fontSize: 13,
                  fontWeight: 560,
                  color: isDark ? "#101217" : "#fff",
                  background: isDark ? "#f4f4f6" : "#0f1218",
                }}
              >
                Launch app
              </Link>
              <Link
                href="/technology-overview"
                style={{
                  height: 42,
                  borderRadius: 999,
                  padding: "0 14px",
                  display: "inline-flex",
                  alignItems: "center",
                  textDecoration: "none",
                  fontSize: 13,
                  color: isDark ? "#fff" : "#000",
                  border: `1px solid ${isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.10)"}`,
                  background: isDark ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.6)",
                }}
              >
                Book demo
              </Link>
            </div>
        </div>
      </div>

          <div
            style={{
              borderRadius: 22,
              border: `1px solid ${isDark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.09)"}`,
              background: isDark ? "#15161a" : "#f7f7f8",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                padding: "12px 14px",
                borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.09)"}`,
                display: "flex",
                gap: 8,
                flexWrap: "wrap",
              }}
            >
              {["Operator Console", "Fleet Ops", "Network Intelligence"].map((tab, idx) => (
                <span
                  key={tab}
                  style={{
                    height: 30,
                    borderRadius: 999,
                    padding: "0 12px",
                    display: "inline-flex",
                    alignItems: "center",
                    fontSize: 12,
                    color: idx === 0 ? (isDark ? "#0f1116" : "#fff") : (isDark ? "rgba(255,255,255,0.66)" : "rgba(0,0,0,0.60)"),
                    background: idx === 0 ? (isDark ? "#f4f4f6" : "#0f1218") : "transparent",
                    border: `1px solid ${idx === 0 ? "transparent" : (isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.10)")}`,
                  }}
                >
                  {tab}
                </span>
              ))}
            </div>

            <div className="grid gap-4 p-4 lg:grid-cols-12">
              <Link href={tiles[0].href} className="group block lg:col-span-8">
                <article style={{ borderRadius: 18, overflow: "hidden", border: `1px solid ${isDark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.09)"}` }}>
                  <div style={{ position: "relative", minHeight: 380 }}>
                    <SmartImage
                      src={tiles[0].image}
                      alt={tiles[0].title}
                      className="absolute inset-0 h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.03]"
                    />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg, rgba(0,0,0,0.22), rgba(0,0,0,0.64))" }} />
                    <div style={{ position: "absolute", top: 14, left: 14 }}>
                      <span style={{ padding: "4px 10px", borderRadius: 999, fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", background: "rgba(255,255,255,0.88)", color: "#0e1118" }}>
                        Platform
                      </span>
                    </div>
                    <div style={{ position: "absolute", left: 18, right: 18, bottom: 18 }}>
                      <h3 style={{ color: "#fff", fontSize: 56 / 1.12, lineHeight: 1.04, letterSpacing: "-0.03em" }}>{tiles[0].title}</h3>
                      <p style={{ marginTop: 8, color: "rgba(255,255,255,0.82)", fontSize: 15, lineHeight: 1.58, maxWidth: 640 }}>
                        {tiles[0].desc}
                      </p>
                    </div>
                  </div>
                </article>
              </Link>

              <div className="space-y-4 lg:col-span-4">
                {tiles.slice(1).map((tile, i) => (
                  <motion.article
                    key={tile.title}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.42, delay: i * 0.08 }}
                    style={{
                      borderRadius: 16,
                      border: `1px solid ${isDark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.09)"}`,
                      background: isDark ? "#171920" : "#f8f8fa",
                      overflow: "hidden",
                      }}
                  >
                    <div style={{ position: "relative", height: 140 }}>
                      <SmartImage
                        src={tile.image}
                        alt={tile.title}
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(165deg, rgba(0,0,0,0.26), rgba(0,0,0,0.56))" }} />
                    </div>
                    <div style={{ padding: 14 }}>
                      <h3 style={{ color: isDark ? "#fff" : "#000", fontSize: 18, lineHeight: 1.28, fontWeight: 520 }}>{tile.title}</h3>
                      <p style={{ marginTop: 7, color: isDark ? "rgba(255,255,255,0.62)" : "rgba(0,0,0,0.58)", fontSize: 13, lineHeight: 1.58 }}>
                        {tile.desc}
                      </p>
                    </div>
                  </motion.article>
                ))}
              </div>
                    </div>
                  </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
            <div style={{ color: isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)", fontSize: 14 }}>
              Backed by NVIDIA Inception. Built for enterprise robotics teams.
            </div>
            <div className="flex gap-2.5">
              <Link
                href={MODULR_LINKS.APP}
                style={{
                  height: 44,
                  borderRadius: 999,
                  padding: "0 16px",
                  display: "inline-flex",
                  alignItems: "center",
                  textDecoration: "none",
                  fontSize: 14,
                  fontWeight: 560,
                  color: isDark ? "#101217" : "#fff",
                  background: isDark ? "#f4f4f6" : "#0f1218",
                }}
              >
                Launch app
              </Link>
              <Link
                href="/technology-overview"
                style={{
                  height: 44,
                  borderRadius: 999,
                  padding: "0 16px",
                  display: "inline-flex",
                  alignItems: "center",
                  textDecoration: "none",
                  fontSize: 14,
                  color: isDark ? "#fff" : "#000",
                  border: `1px solid ${isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.10)"}`,
                  background: isDark ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.6)",
                }}
              >
                Read vision
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
