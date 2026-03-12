"use client";

import { motion } from "framer-motion";
import { MODULR_LINKS } from "@/config/links";

export function OperationsConsoleShowcase({ theme }: { theme: "dark" | "light" }) {
  const isDark = theme === "dark";
  const bg = isDark ? "#000" : "#fff";
  const panel = isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)";
  const border = isDark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.10)";
  const innerBorder = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
  const text = isDark ? "#f4f4f5" : "#0e1013";
  const muted = isDark ? "rgba(255,255,255,0.60)" : "rgba(0,0,0,0.58)";
  const soft = isDark ? "rgba(255,255,255,0.44)" : "rgba(0,0,0,0.44)";

  return (
    <section style={{ borderTop: `1px solid ${innerBorder}`, background: bg, padding: "78px 0 70px" }}>
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="grid gap-6 lg:grid-cols-[1.04fr_1fr] lg:items-end">
          <div>
            <div style={{ fontSize: 11, letterSpacing: "0.24em", textTransform: "uppercase", color: soft }}>
              Mission Control
            </div>
            <h2 style={{ marginTop: 12, color: text, fontSize: 54 / 2, fontWeight: 520, letterSpacing: "-0.03em", lineHeight: 1.05 }}>
              One console for every robot operation
            </h2>
          </div>
          <div style={{ color: muted, fontSize: 16, lineHeight: 1.75, maxWidth: 560 }}>
            Dispatch sessions, monitor latency, and hand off control without leaving your flow.
            Built for teams running dozens of missions in parallel with clear operator ownership.
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-90px" }}
          transition={{ duration: 0.52 }}
          style={{
            marginTop: 28,
            borderRadius: 28,
            border: `1px solid ${border}`,
            background: panel,
            padding: 14,
            boxShadow: isDark ? "0 34px 90px rgba(0,0,0,0.55)" : "0 20px 55px rgba(0,0,0,0.10)",
          }}
        >
          <div
            style={{
              borderRadius: 22,
              border: `1px solid ${innerBorder}`,
              overflow: "hidden",
              background: isDark ? "#111217" : "#f4f4f6",
            }}
          >
            <div
              style={{
                padding: "12px 14px",
                borderBottom: `1px solid ${innerBorder}`,
                display: "flex",
                gap: 8,
                flexWrap: "wrap",
              }}
            >
              {["Live sessions", "Queue", "Incidents", "Replay", "Audit log"].map((tab, idx) => (
                <span
                  key={tab}
                  style={{
                    height: 30,
                    borderRadius: 999,
                    padding: "0 12px",
                    display: "inline-flex",
                    alignItems: "center",
                    fontSize: 13,
                    color: idx === 0 ? (isDark ? "#101217" : "#fff") : muted,
                    background: idx === 0 ? (isDark ? "#f3f3f5" : "#0d1118") : "transparent",
                    border: `1px solid ${idx === 0 ? "transparent" : innerBorder}`,
                  }}
                >
                  {tab}
                </span>
              ))}
            </div>

            <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
              <div style={{ borderRight: `1px solid ${innerBorder}`, padding: 14 }}>
                <div style={{ borderRadius: 14, border: `1px solid ${innerBorder}`, overflow: "hidden" }}>
                  {[
                    ["robot-b348d465", "Warehouse East", "operator: v.chernenko", "118ms"],
                    ["robot-7c91a88e", "Dock Door 3", "operator: a.zhou", "124ms"],
                    ["robot-a0b53f04", "Aisle 12", "operator: m.romanov", "96ms"],
                    ["robot-e12f0d9b", "Inspection Zone", "operator: s.kim", "141ms"],
                  ].map(([name, zone, owner, latency], idx) => (
                    <div
                      key={name}
                      style={{
                        padding: "12px 12px",
                        borderBottom: idx === 3 ? "none" : `1px solid ${innerBorder}`,
                        background: idx === 0 ? (isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)") : "transparent",
                      }}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <div style={{ color: text, fontSize: 14, fontWeight: 520 }}>{name}</div>
                          <div style={{ color: soft, fontSize: 12, marginTop: 2 }}>{zone}</div>
                        </div>
                        <span
                          style={{
                            borderRadius: 999,
                            border: `1px solid ${innerBorder}`,
                            padding: "3px 10px",
                            fontSize: 12,
                            color: muted,
                          }}
                        >
                          {latency}
                        </span>
                      </div>
                      <div style={{ color: muted, fontSize: 12, marginTop: 6 }}>{owner}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ padding: 14 }}>
                <div
                  style={{
                    borderRadius: 14,
                    border: `1px solid ${innerBorder}`,
                    padding: 14,
                    background: isDark ? "#151720" : "#f9f9fb",
                  }}
                >
                  <div style={{ color: soft, fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                    Active handoff
                  </div>
                  <div style={{ marginTop: 8, color: text, fontSize: 20 / 1.05, fontWeight: 520 }}>
                    Shift transfer in progress
                  </div>
                  <p style={{ marginTop: 10, color: muted, fontSize: 14, lineHeight: 1.7 }}>
                    Control rights are moving from the remote night team to on-site operators.
                    Safety constraints remain locked and telemetry stream stays uninterrupted.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-8">
                    {[
                      ["Open sessions", "24"],
                      ["Queued tasks", "58"],
                      ["Interventions", "2"],
                    ].map(([label, value]) => (
                      <div key={label}>
                        <div style={{ color: text, fontSize: 26 / 1.2, fontWeight: 650 }}>{value}</div>
                        <div style={{ color: soft, fontSize: 12 }}>{label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <p style={{ color: soft, fontSize: 14 }}>Designed for live operations, not static dashboards.</p>
          <div className="flex items-center gap-2.5">
            <a
              href={MODULR_LINKS.APP}
              target="_blank"
              rel="noreferrer"
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
              Open control center
            </a>
            <a
              href={MODULR_LINKS.DEMO}
              target="_blank"
              rel="noreferrer"
              style={{
                height: 44,
                borderRadius: 999,
                padding: "0 16px",
                display: "inline-flex",
                alignItems: "center",
                textDecoration: "none",
                fontSize: 14,
                fontWeight: 500,
                color: text,
                border: `1px solid ${border}`,
                background: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)",
              }}
            >
              Talk to robotics team
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

