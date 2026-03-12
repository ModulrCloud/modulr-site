"use client";

import { MODULR_LINKS } from "@/config/links";

export function TeleopShowcase({ theme }: { theme: "dark" | "light" }) {
  const isDark = theme === "dark";

  const sectionBg = isDark ? "#090a0d" : "#f3f3f4";
  const panelBg = isDark ? "#121318" : "#ececed";
  const panelBorder = isDark ? "rgba(255,255,255,0.08)" : "#dfdfe1";
  const textColor = isDark ? "#f7f7f9" : "#0b0b0d";
  const mutedText = isDark ? "rgba(247,247,249,0.74)" : "rgba(11,11,13,0.78)";
  const softText = isDark ? "rgba(247,247,249,0.56)" : "rgba(11,11,13,0.48)";
  const innerCard = isDark ? "#17181d" : "#f8f8f9";
  const innerBorder = isDark ? "rgba(255,255,255,0.10)" : "#dfdfe1";

  return (
    <section
      style={{
        borderTop: `1px solid ${isDark ? "rgba(255,255,255,0.09)" : "#e8e8ea"}`,
        background: sectionBg,
        padding: "94px 0",
      }}
    >
      <div className="mx-auto max-w-[1180px] px-6">
        <div className="grid items-start gap-8 md:grid-cols-[1fr_1fr]">
          <div>
            <h2
              style={{
                color: textColor,
                fontSize: "clamp(44px,5.8vw,72px)",
                lineHeight: 1.02,
                letterSpacing: "-0.04em",
                fontWeight: 500,
                maxWidth: 540,
              }}
            >
              Bringing
              <br />
              robot operations to life
            </h2>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={MODULR_LINKS.APP}
                target="_blank"
                rel="noreferrer"
                style={{
                  height: 48,
                  borderRadius: 999,
                  padding: "0 24px",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: isDark ? "#f8f8fb" : "#0b0b0d",
                  color: isDark ? "#0b0b0d" : "#f8f8fb",
                  fontSize: 29 / 2,
                  fontWeight: 500,
                  textDecoration: "none",
                  border: "1px solid transparent",
                }}
              >
                Launch app
              </a>
              <a
                href={MODULR_LINKS.DEMO}
                target="_blank"
                rel="noreferrer"
                style={{
                  height: 48,
                  borderRadius: 999,
                  padding: "0 24px",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: isDark ? "#1a1b21" : "#efeff0",
                  color: textColor,
                  fontSize: 29 / 2,
                  fontWeight: 460,
                  textDecoration: "none",
                  border: `1px solid ${isDark ? "rgba(255,255,255,0.12)" : "#d8d8da"}`,
                }}
              >
                Book a demo
              </a>
            </div>
          </div>

          <p
            style={{
              color: mutedText,
              fontSize: 32 / 2,
              lineHeight: 1.47,
              maxWidth: 560,
              marginTop: 8,
              paddingLeft: 8,
            }}
          >
            Powering enterprise robotics teams, operators, and developers.
            Modulr connects robots, AI, data, and compute into one real-time
            teleoperation platform built for scale and reliability.
          </p>
        </div>

        <div
          style={{
            marginTop: 44,
            borderRadius: 28,
            border: `1px solid ${panelBorder}`,
            background: panelBg,
            padding: "26px 26px 24px",
            boxShadow: isDark
              ? "inset 0 1px 0 rgba(255,255,255,0.03)"
              : "inset 0 1px 0 rgba(255,255,255,0.65)",
          }}
        >
          <div className="mb-8 flex flex-wrap justify-center gap-5 px-3">
            {[
              "Teleoperation",
              "Fleet Ops",
              "AI Assist",
              "Session Replay",
              "Explorer",
            ].map((tab, idx) => (
              <div
                key={tab}
                style={{
                  height: 44,
                  borderRadius: 999,
                  padding: "0 18px",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 31 / 2,
                  color: idx <= 1 ? textColor : softText,
                  background:
                    idx === 0
                      ? isDark
                        ? "#1c1d22"
                        : "#f8f8f9"
                      : idx === 1
                        ? isDark
                          ? "#22242b"
                          : "#e6e6e8"
                        : "transparent",
                  border:
                    idx === 0
                      ? `1px solid ${isDark ? "rgba(255,255,255,0.15)" : "#d8d8da"}`
                      : "1px solid transparent",
                  boxShadow:
                    idx === 0
                      ? isDark
                        ? "0 6px 14px rgba(0,0,0,0.3)"
                        : "0 4px 8px rgba(16,24,40,0.06)"
                      : "none",
                }}
              >
                {tab}
              </div>
            ))}
          </div>

          <div
            style={{
              borderRadius: 26,
              border: `1px solid ${innerBorder}`,
              background: innerCard,
              overflow: "hidden",
            }}
          >
            <div className="grid md:grid-cols-[1.02fr_1fr]">
              <div
                style={{
                  borderRight: `1px solid ${innerBorder}`,
                  padding: "16px 16px 0",
                }}
              >
                <div
                  style={{
                    height: 52,
                    borderRadius: 14,
                    background: isDark ? "#22242b" : "#eeedef",
                    border: `1px solid ${isDark ? "rgba(255,255,255,0.09)" : "#dbdbde"}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0 12px",
                  }}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      style={{
                        width: 18,
                        height: 18,
                        borderRadius: "50%",
                        background:
                          "conic-gradient(from 40deg, #5ed3ff, #ffab8c, #8aa8ff, #5ed3ff)",
                      }}
                    />
                    <span style={{ fontSize: 34 / 2, color: textColor, fontWeight: 500 }}>
                      robot-b348d465
                    </span>
                  </div>
                  <span
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: `1px solid ${isDark ? "rgba(255,255,255,0.13)" : "#d7d7db"}`,
                      color: textColor,
                      fontSize: 13,
                    }}
                  >
                    ▶
                  </span>
                </div>

                <div className="mt-2.5 space-y-0.5">
                  {[
                    ["robot-a0b53f04", "Warehouse Aisle 12"],
                    ["robot-7c91a88e", "Loading Dock 3"],
                    ["robot-e12f0d9b", "Inspection Zone"],
                    ["robot-fleet-alpha", "Charging Station"],
                  ].map(([name, desc]) => (
                    <div
                      key={name}
                      className="grid grid-cols-[1fr_auto] items-center gap-4 py-3"
                      style={{ borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "#ececef"}` }}
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          style={{
                            width: 20,
                            height: 20,
                            borderRadius: "50%",
                            background:
                              "conic-gradient(from 20deg, #6ed4ff, #ffb07f, #8aa5ff, #6ed4ff)",
                            opacity: 0.9,
                          }}
                        />
                        <span style={{ color: textColor, fontSize: 16 }}>{name}</span>
                      </div>
                      <span style={{ color: softText, fontSize: 16 }}>{desc}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between py-3.5">
                  <button
                    type="button"
                    style={{
                      height: 42,
                      borderRadius: 999,
                      padding: "0 16px",
                      border: `1px solid ${isDark ? "rgba(255,255,255,0.12)" : "#d8d8dc"}`,
                      background: isDark ? "#1b1c22" : "#f6f6f7",
                      color: textColor,
                      fontSize: 17,
                    }}
                  >
                    Explore live robot fleet
                  </button>
                  <div className="flex items-center gap-2 px-2 text-xl" style={{ color: softText }}>
                    <span>‹</span>
                    <span>›</span>
                  </div>
                </div>
              </div>

              <div style={{ padding: "16px 18px 0" }}>
                <div style={{ color: softText, fontSize: 15, marginBottom: 5 }}>
                  Live operator session
                </div>
                <p
                  style={{
                    color: textColor,
                    fontSize: 36 / 2,
                    lineHeight: 1.5,
                    letterSpacing: "-0.01em",
                  }}
                >
                  Session active on robot-b348d465. Video stream stable,
                  controls synchronized, and route planning optimized for
                  sub-500ms response.
                </p>
                <p
                  style={{
                    color: softText,
                    fontSize: 36 / 2,
                    lineHeight: 1.5,
                    letterSpacing: "-0.01em",
                  }}
                >
                  [operator note] Obstacle detected near waypoint C7.
                  [assist] Rerouting through lane B4 with autonomous slowdown.
                  [status] Battery healthy, uplink stable, mission continuing.
                </p>

                <div
                  className="mt-8 flex items-center justify-between pb-4"
                  style={{ borderTop: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "#ececef"}` }}
                >
                  <div className="flex items-center gap-2 pt-4" style={{ color: textColor }}>
                    <span style={{ fontSize: 16 }}>🇺🇸</span>
                    <span style={{ fontSize: 18 / 1.15 }}>English</span>
                    <span style={{ color: softText }}>⌄</span>
                  </div>
                  <button
                    type="button"
                    style={{
                      marginTop: 10,
                      height: 46,
                      borderRadius: 999,
                      padding: "0 20px",
                      border: "none",
                      background: isDark ? "#f6f6f8" : "#0b0b0d",
                      color: isDark ? "#0b0b0d" : "#fff",
                      fontSize: 17,
                      fontWeight: 500,
                    }}
                  >
                    Start
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 flex items-end justify-between gap-4 px-2">
            <div>
              <div style={{ color: textColor, fontSize: 37 / 2, fontWeight: 500 }}>
                Real-time Teleoperation
              </div>
              <div style={{ color: softText, fontSize: 31 / 2 }}>
                Operate robots in real time across warehouses, factories, and
                field environments.
              </div>
            </div>

            <a
              href={MODULR_LINKS.APP}
              target="_blank"
              rel="noreferrer"
              style={{
                height: 48,
                borderRadius: 999,
                padding: "0 24px",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                background: isDark ? "#1a1b21" : "#efeff0",
                color: textColor,
                fontSize: 32 / 2,
                fontWeight: 460,
                textDecoration: "none",
                border: `1px solid ${isDark ? "rgba(255,255,255,0.12)" : "#d8d8da"}`,
              }}
            >
              Launch app
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
