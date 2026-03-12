"use client";

import { motion } from "framer-motion";
import Link from "next/link";

type UseCase = {
  title: string;
  desc: string;
  stat: string;
  statLabel: string;
  accent: string;
};

const USE_CASES: UseCase[] = [
  {
    title: "Entertainment & Gaming",
    desc: "Control telepresence robots in theme parks, arcades, and immersive experiences from anywhere in the world.",
    stat: "10ms",
    statLabel: "Latency",
    accent: "radial-gradient(220px 140px at 28% 42%, rgba(96,175,255,0.82), transparent 62%), radial-gradient(260px 160px at 78% 35%, rgba(255,175,95,0.68), transparent 62%), #eff1f5",
  },
  {
    title: "Defense & Security",
    desc: "Operate unmanned ground and aerial vehicles for reconnaissance, patrol, and hazardous environment inspection with military‑grade reliability.",
    stat: "99.9%",
    statLabel: "Uptime",
    accent: "radial-gradient(220px 140px at 30% 46%, rgba(98,230,170,0.78), transparent 62%), radial-gradient(260px 160px at 76% 35%, rgba(90,150,255,0.62), transparent 60%), #eef2f1",
  },
  {
    title: "Industrial Automation",
    desc: "Remotely manage robotic arms, AGVs, and factory floor equipment with sub‑second latency. Scale operations without physical presence.",
    stat: "500+",
    statLabel: "Robots",
    accent: "radial-gradient(230px 150px at 28% 48%, rgba(255,146,93,0.76), transparent 58%), radial-gradient(260px 160px at 78% 34%, rgba(248,82,82,0.66), transparent 60%), #f3efef",
  },
  {
    title: "Space & Extreme Environments",
    desc: "Control rovers, orbital manipulators, and deep‑sea exploration robots across vast distances with real‑time feedback loops.",
    stat: "∞",
    statLabel: "Range",
    accent: "radial-gradient(240px 160px at 30% 40%, rgba(145,132,255,0.74), transparent 62%), radial-gradient(260px 160px at 76% 35%, rgba(98,190,255,0.62), transparent 60%), #eceef5",
  },
];

export function ExampleUseCasesStickySection({
  theme,
}: {
  theme: "dark" | "light";
}) {
  const isDark = theme === "dark";
  const textColor = isDark ? "#f4f4f5" : "#111215";
  const muted = isDark ? "rgba(255,255,255,0.62)" : "rgba(0,0,0,0.58)";
  const soft = isDark ? "rgba(255,255,255,0.42)" : "rgba(0,0,0,0.42)";
  const panelBg = isDark ? "#111214" : "#efeff0";
  const tileBg = isDark ? "#15161a" : "#f7f7f8";
  const panelBorder = isDark ? "rgba(255,255,255,0.11)" : "rgba(0,0,0,0.10)";
  const tileBorder = isDark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.09)";

  return (
    <section
      style={{
        borderTop: `1px solid ${tileBorder}`,
        padding: "82px 0 76px",
        background: isDark ? "#0a0a0b" : "#f3f3f5",
      }}
    >
      <div className="mx-auto max-w-[1400px] px-6">
        <div
          style={{
            borderRadius: 28,
            border: `1px solid ${panelBorder}`,
            background: panelBg,
            padding: 24,
          }}
        >
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div style={{ fontSize: 13, color: soft }}>Use cases</div>
              <h2 style={{ marginTop: 8, fontSize: 52 / 2, lineHeight: 1.08, letterSpacing: "-0.03em", color: textColor, fontWeight: 520 }}>
                Real deployments across industries
              </h2>
              <p style={{ marginTop: 10, fontSize: 15, lineHeight: 1.7, color: muted, maxWidth: 740 }}>
                Modulr powers teleoperation workflows from entertainment to heavy industry with consistent low-latency control and enterprise safety.
              </p>
            </div>
            <Link
              href="/robots"
              style={{
                height: 44,
                borderRadius: 999,
                border: `1px solid ${tileBorder}`,
                background: tileBg,
                color: textColor,
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                padding: "0 16px",
                fontSize: 14,
              }}
            >
              Explore use cases
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {USE_CASES.map((item, idx) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.42, delay: idx * 0.06 }}
                style={{
                  borderRadius: 20,
                  border: `1px solid ${tileBorder}`,
                  background: tileBg,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: 150,
                    borderBottom: `1px solid ${tileBorder}`,
                    background: item.accent,
                  }}
                />
                <div style={{ padding: 16 }}>
                  <div className="mb-2 inline-flex items-center gap-2 rounded-full border px-2.5 py-1" style={{ borderColor: tileBorder, color: muted, fontSize: 11 }}>
                    <strong style={{ color: textColor }}>{item.stat}</strong>
                    <span>{item.statLabel}</span>
                  </div>
                  <h3 style={{ fontSize: 18, lineHeight: 1.3, color: textColor, fontWeight: 520 }}>{item.title}</h3>
                  <p style={{ marginTop: 8, fontSize: 14, lineHeight: 1.6, color: muted }}>{item.desc}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

