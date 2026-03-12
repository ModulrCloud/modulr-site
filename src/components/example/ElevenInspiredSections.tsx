"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MODULR_LINKS } from "@/config/links";

export function ElevenInspiredSections({ theme }: { theme: "dark" | "light" }) {
  const isDark = theme === "dark";
  const pageBg = isDark ? "#0a0a0b" : "#f3f3f5";
  const panelBg = isDark ? "#111214" : "#efeff0";
  const panelBgSoft = isDark ? "#131418" : "#f6f6f7";
  const border = isDark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.10)";
  const innerBorder = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
  const text = isDark ? "#f5f5f6" : "#111215";
  const muted = isDark ? "rgba(255,255,255,0.62)" : "rgba(0,0,0,0.58)";
  const soft = isDark ? "rgba(255,255,255,0.42)" : "rgba(0,0,0,0.42)";
  const panelRadius = 28;
  const tileRadius = 20;
  const panelPadding = 24;
  const pillHeight = 44;

  return (
    <div style={{ background: pageBg }}>
      <section style={{ borderTop: `1px solid ${innerBorder}`, padding: "82px 0 64px" }}>
        <div className="mx-auto max-w-[1400px] px-6">
          <div
            style={{
              borderRadius: panelRadius,
              border: `1px solid ${border}`,
              background: panelBg,
              padding: panelPadding,
            }}
          >
            <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr] lg:items-start">
              <div>
                <div style={{ color: soft, fontSize: 14 }}>Modulr Agents</div>
                <h2 style={{ marginTop: 12, color: text, fontSize: 70 / 2, lineHeight: 1.06, letterSpacing: "-0.03em", fontWeight: 520 }}>
                  Deploy agents that watch,
                  <br />
                  decide, and take action
                </h2>
                <a
                  href={MODULR_LINKS.DEMO}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    marginTop: 24,
                    height: pillHeight,
                    borderRadius: 999,
                    padding: "0 22px",
                    display: "inline-flex",
                    alignItems: "center",
                    textDecoration: "none",
                    fontSize: 20 / 1.15,
                    color: isDark ? "#0e1014" : "#fff",
                    background: isDark ? "#f3f3f5" : "#0f1218",
                  }}
                >
                  Learn more
                </a>
              </div>
              <p style={{ color: muted, fontSize: 19 / 1.15, lineHeight: 1.65 }}>
                Configure and monitor natural, human-in-the-loop robot operations across
                fulfillment, industrial, and field environments with low-latency control.
              </p>
            </div>

            <div className="mt-7 grid gap-4 lg:grid-cols-2">
              <div
                style={{
                  minHeight: 420,
                  borderRadius: tileRadius,
                  border: `1px solid ${innerBorder}`,
                  overflow: "hidden",
                  background:
                    "radial-gradient(900px 450px at 80% 0%, rgba(90,145,255,0.55), transparent 48%), radial-gradient(680px 480px at 20% 80%, rgba(242,180,0,0.45), transparent 56%), radial-gradient(740px 500px at 0% 0%, rgba(58,198,120,0.50), rgba(0,0,0,0.12))",
                  position: "relative",
                  padding: 20,
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    right: 18,
                    top: 18,
                    borderRadius: 999,
                    border: "1px solid rgba(255,255,255,0.35)",
                    color: "#fff",
                    fontSize: 13,
                    padding: "5px 12px",
                  }}
                >
                  Job #EL4543490
                </div>
                <div
                  style={{
                    position: "absolute",
                    left: 20,
                    top: 106,
                    borderRadius: 16,
                    background: "rgba(255,255,255,0.94)",
                    color: "#121318",
                    maxWidth: 280,
                    padding: "11px 14px",
                    fontSize: 15,
                    lineHeight: 1.45,
                    boxShadow: "0 16px 45px rgba(0,0,0,0.20)",
                  }}
                >
                  Sure. Can you share your order number and robot ID?
                </div>
                <div
                  style={{
                    position: "absolute",
                    left: 18,
                    bottom: 86,
                    borderRadius: 999,
                    background: "rgba(255,255,255,0.9)",
                    color: "rgba(0,0,0,0.50)",
                    fontSize: 14,
                    padding: "8px 12px",
                  }}
                >
                  ... thinking
                </div>
                <div style={{ position: "absolute", left: 20, right: 20, bottom: 18, color: "rgba(255,255,255,0.88)" }}>
                  <div style={{ fontSize: 30 / 2, fontWeight: 520 }}>Omnichannel robot agents</div>
                  <p style={{ marginTop: 8, fontSize: 16 / 1.05, lineHeight: 1.55 }}>
                    Agents read telemetry, detect anomalies, and coordinate actions across app, web, and ops consoles.
                  </p>
                </div>
              </div>

              <div
                style={{
                  minHeight: 420,
                  borderRadius: tileRadius,
                  border: `1px solid ${innerBorder}`,
                  overflow: "hidden",
                  background: panelBgSoft,
                  padding: 18,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    borderRadius: 18,
                    border: `1px solid ${innerBorder}`,
                    background: isDark ? "#15171e" : "#ffffff",
                    padding: 14,
                  }}
                >
                  <div style={{ color: muted, fontSize: 13 }}>Success rate</div>
                  <div style={{ marginTop: 2, color: text, fontSize: 26 / 1.2, fontWeight: 560 }}>87.3%</div>
                  <div
                    style={{
                      marginTop: 12,
                      height: 165,
                      borderRadius: 12,
                      border: `1px solid ${innerBorder}`,
                      background:
                        "linear-gradient(180deg, rgba(80,130,255,0.10), rgba(80,130,255,0.04)), repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(120,120,120,0.12) 40px)",
                      position: "relative",
                    }}
                  >
                    <svg viewBox="0 0 400 160" style={{ position: "absolute", inset: 8, width: "calc(100% - 16px)", height: "calc(100% - 16px)" }}>
                      <path d="M0 82 C40 70, 60 95, 95 78 C125 62, 148 88, 182 72 C210 58, 246 83, 280 66 C320 52, 352 79, 390 68" stroke="#e16a3d" strokeWidth="2.5" fill="none" />
                      <path d="M0 104 C40 94, 60 120, 95 96 C125 84, 148 110, 182 92 C210 84, 246 109, 280 96 C320 88, 352 112, 390 106" stroke="#446ddb" strokeWidth="2.5" fill="none" />
                    </svg>
                  </div>
                </div>
                <div className="mt-auto">
                  <div style={{ marginTop: 14, color: text, fontSize: 32 / 2, fontWeight: 520 }}>Analytics</div>
                  <p style={{ marginTop: 8, color: muted, fontSize: 16 / 1.1, lineHeight: 1.6 }}>
                    Track completion rates, intervention counts, and customer outcomes to continuously optimize workflows.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {[
                ["Testing", "Simulate real-world robot conversations to validate behavior before rollout."],
                ["Guardrails", "Policy constraints keep decisions aligned with safety and operational rules."],
                ["Workflows", "Connect business logic to robots with explicit handoffs and rollback states."],
              ].map(([title, desc]) => (
                <div key={title} style={{ borderRadius: tileRadius - 2, border: `1px solid ${innerBorder}`, background: panelBgSoft, padding: 18, minHeight: 145 }}>
                  <div style={{ color: text, fontSize: 32 / 2, fontWeight: 520 }}>{title}</div>
                  <p style={{ marginTop: 8, color: muted, fontSize: 16 / 1.1, lineHeight: 1.58 }}>{desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
              <div style={{ color: muted, fontSize: 15 }}>
                <strong style={{ color: text, fontWeight: 540 }}>Meesho ↗</strong> &nbsp;
                Delivering real-time multilingual customer support with voice agents
              </div>
              <a
                href={MODULR_LINKS.APP}
                target="_blank"
                rel="noreferrer"
                style={{
                  height: pillHeight,
                  borderRadius: 999,
                  padding: "0 20px",
                  border: `1px solid ${border}`,
                  display: "inline-flex",
                  alignItems: "center",
                  textDecoration: "none",
                  color: text,
                  background: panelBgSoft,
                }}
              >
                Get started
              </a>
            </div>
          </div>
        </div>
      </section>

      <section style={{ borderTop: `1px solid ${innerBorder}`, padding: "86px 0 76px" }}>
        <div className="mx-auto max-w-[1400px] px-6">
          <h2 style={{ color: text, fontSize: 72 / 2, lineHeight: 1.08, textAlign: "center", letterSpacing: "-0.03em", fontWeight: 520 }}>
            A wide set of Robot AI
            <br />
            products for your startup
          </h2>

          <div className="mx-auto mt-12 max-w-[1100px]">
            <div style={{ borderTop: `1px dashed ${innerBorder}`, padding: "22px 0" }} />
            <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-start">
              <div>
                <h3 style={{ color: text, fontSize: 48 / 2, lineHeight: 1.22, fontWeight: 520 }}>
                  Modulr Agents for support,
                  <br />
                  sales, and engagement
                </h3>
                <p style={{ marginTop: 10, color: muted, fontSize: 18 / 1.12, lineHeight: 1.64, maxWidth: 700 }}>
                  Launch intelligent robot-aware agents that handle customer inquiries, qualify leads, and provide 24/7 support.
                  Deploy across phone lines, websites, or apps with multilingual support built-in.
                </p>
              </div>
              <div
                style={{
                  borderRadius: tileRadius,
                  border: `1px solid ${innerBorder}`,
                  background:
                    "radial-gradient(800px 420px at 15% 0%, rgba(109,189,255,0.45), transparent 56%), linear-gradient(160deg, #63baf1 0%, #4a74d9 58%, #4a61b8 100%)",
                  minHeight: 360,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    left: "50%",
                    transform: "translateX(-50%)",
                    top: 22,
                    width: "78%",
                    borderRadius: 16,
                    border: "1px solid rgba(255,255,255,0.42)",
                    background: "rgba(255,255,255,0.85)",
                    boxShadow: "0 20px 45px rgba(0,0,0,0.16)",
                    padding: 12,
                  }}
                >
                  <div style={{ color: "rgba(0,0,0,0.42)", fontSize: 12 }}>Listening</div>
                  <div style={{ marginTop: 10, borderRadius: 12, background: "#e8edf6", padding: 8, fontSize: 12, color: "#394250" }}>
                    Hi there, welcome to Modulr documentation.
                    How can I help you?
                  </div>
                  <div style={{ marginTop: 8, borderRadius: 12, background: "#0f1116", color: "#fff", padding: 8, fontSize: 12 }}>
                    Hi, I&apos;m wondering how Modulr pricing compares to other robotics platforms.
                  </div>
                </div>
              </div>
            </div>

            {[
              "Emotional & expressive voices",
              "Text to Speech & Speech to Text in 70+ languages",
              "Modulr sound effects",
              "Modulr Music: Create studio-quality tracks from text prompts",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center justify-between"
                style={{ borderTop: `1px dashed ${innerBorder}`, padding: "18px 0" }}
              >
                <span style={{ color: text, fontSize: 44 / 2, lineHeight: 1.28 }}>{item}</span>
                <span style={{ color: muted, fontSize: 44 / 2, lineHeight: 1 }}>+</span>
              </div>
            ))}
            <div style={{ borderTop: `1px dashed ${innerBorder}` }} />
          </div>
        </div>
      </section>

      <section style={{ borderTop: `1px solid ${innerBorder}`, padding: "70px 0 84px" }}>
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              [
                "Instant generation",
                "Start generating and get first samples within seconds, speeding up your selection and workflow.",
              ],
              [
                "Precise control",
                "Add nuance through detailed prompts, tailoring each agent and action to your scene.",
              ],
              [
                "Royalty free",
                "Use generated assets in your projects worry-free, with no extra licensing complexity.",
              ],
              [
                "Highest quality output",
                "Enjoy clear, high-fidelity outputs that make interactions feel realistic and premium.",
              ],
            ].map(([title, desc], idx) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.42, delay: idx * 0.06 }}
                style={{
                  borderRadius: tileRadius,
                  border: `1px solid ${innerBorder}`,
                  background: panelBgSoft,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: 180,
                    borderBottom: `1px solid ${innerBorder}`,
                    background:
                      idx === 0
                        ? "radial-gradient(150px 100px at 30% 40%, rgba(89,183,255,0.9), transparent 60%), radial-gradient(220px 150px at 78% 35%, rgba(255,173,85,0.75), transparent 60%), #f0f1f3"
                        : idx === 1
                          ? "linear-gradient(145deg, #ffffff 0%, #f4f5f7 100%)"
                          : idx === 2
                            ? "radial-gradient(140px 90px at 28% 48%, rgba(255,128,93,0.78), transparent 58%), radial-gradient(200px 120px at 75% 50%, rgba(248,67,67,0.76), transparent 60%), #efeef2"
                            : "linear-gradient(155deg, #dcf6ea 0%, #8ae9c4 45%, #5fc9a8 100%)",
                    position: "relative",
                  }}
                />
                <div style={{ padding: 16 }}>
                  <div style={{ color: text, fontSize: 40 / 2, lineHeight: 1.2, fontWeight: 520 }}>{title}</div>
                  <p style={{ marginTop: 8, color: muted, fontSize: 17 / 1.1, lineHeight: 1.56 }}>{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

