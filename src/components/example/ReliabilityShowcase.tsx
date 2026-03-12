"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function ReliabilityShowcase({ theme }: { theme: "dark" | "light" }) {
  const isDark = theme === "dark";
  const text = isDark ? "#f4f4f6" : "#0e1013";
  const muted = isDark ? "rgba(255,255,255,0.58)" : "rgba(0,0,0,0.58)";
  const soft = isDark ? "rgba(255,255,255,0.42)" : "rgba(0,0,0,0.42)";
  const border = isDark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.10)";
  const innerBorder = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";

  return (
    <section style={{ borderTop: `1px solid ${innerBorder}`, padding: "78px 0 74px" }}>
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div style={{ color: soft, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.24em" }}>
              Reliability Stack
            </div>
            <h2 style={{ marginTop: 10, color: text, fontSize: 54 / 2, fontWeight: 520, letterSpacing: "-0.03em" }}>
              Built to stay calm under pressure
            </h2>
          </div>
          <p style={{ color: muted, maxWidth: 560, lineHeight: 1.7, fontSize: 16 }}>
            Failover, safety policies, and observability are not add-ons.
            They are core primitives in the same flow where operators work.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-90px" }}
            transition={{ duration: 0.52 }}
            style={{
              borderRadius: 24,
              border: `1px solid ${border}`,
              overflow: "hidden",
              background: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
            }}
          >
            <div style={{ padding: 16, borderBottom: `1px solid ${innerBorder}` }}>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  borderRadius: 999,
                  border: `1px solid ${innerBorder}`,
                  padding: "5px 12px",
                  color: muted,
                  fontSize: 12,
                }}
              >
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 16px rgba(74,222,128,0.55)" }} />
                All systems healthy
              </span>
            </div>

            <div className="grid gap-0 md:grid-cols-3">
              {[
                {
                  title: "Policy Guard",
                  desc: "Hard limits on speed, zone, and actuator permissions.",
                  stat: "420",
                  statLabel: "active rules",
                },
                {
                  title: "Automatic Failover",
                  desc: "Session recovery to backup edge region in under 2 seconds.",
                  stat: "<2s",
                  statLabel: "failover",
                },
                {
                  title: "Forensic Replay",
                  desc: "Complete command + video timeline for audit and training.",
                  stat: "100%",
                  statLabel: "event trace",
                },
              ].map((item, idx) => (
                <div
                  key={item.title}
                  style={{
                    padding: 18,
                    borderRight: idx === 2 ? "none" : `1px solid ${innerBorder}`,
                    borderTop: idx > 0 ? `1px solid ${innerBorder}` : "none",
                  }}
                >
                  <div style={{ color: text, fontSize: 16, fontWeight: 520 }}>{item.title}</div>
                  <p style={{ marginTop: 8, color: muted, fontSize: 13, lineHeight: 1.65 }}>{item.desc}</p>
                  <div style={{ marginTop: 16, color: text, fontSize: 24 / 1.2, fontWeight: 650 }}>{item.stat}</div>
                  <div style={{ color: soft, fontSize: 12, marginTop: 3 }}>{item.statLabel}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-90px" }}
            transition={{ duration: 0.52, delay: 0.05 }}
            style={{
              borderRadius: 24,
              border: `1px solid ${border}`,
              background: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
              padding: 16,
            }}
          >
            <div style={{ color: soft, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Last 24 hours
            </div>
            <div style={{ marginTop: 8, color: text, fontSize: 22 / 1.1, fontWeight: 600 }}>
              Uptime and response window
            </div>

            <div className="mt-5 space-y-3">
              {[
                ["Platform uptime", "99.98%"],
                ["Median control RTT", "112ms"],
                ["Safety interventions", "3"],
                ["Session recoveries", "14"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  style={{
                    borderRadius: 12,
                    border: `1px solid ${innerBorder}`,
                    padding: "10px 12px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span style={{ color: muted, fontSize: 13 }}>{label}</span>
                  <span style={{ color: text, fontSize: 14, fontWeight: 560 }}>{value}</span>
                </div>
              ))}
            </div>

            <Link
              href="/robots"
              style={{
                marginTop: 14,
                display: "inline-flex",
                alignItems: "center",
                height: 40,
                borderRadius: 999,
                padding: "0 14px",
                textDecoration: "none",
                color: text,
                border: `1px solid ${border}`,
                background: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)",
                fontSize: 13,
              }}
            >
              See platform architecture
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

