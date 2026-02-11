"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Theme = "dark" | "light";

type NavItem = {
  key: string;
  label: string;
  // if href provided, label itself can be a link; still can have a panel
  href?: string;
  panel?: {
    columns: Array<{
      title: string;
      items: Array<{
        title: string;
        desc?: string;
        href: string;
        badge?: string;
        icon?: React.ReactNode;
      }>;
    }>;
    right?: {
      title?: string;
      body: React.ReactNode;
    };
  };
};

function Chevron({ open, color }: { open: boolean; color: string }) {
  return (
    <span
      aria-hidden="true"
      style={{
        display: "inline-flex",
        marginLeft: 6,
        transform: open ? "rotate(180deg)" : "rotate(0deg)",
        transition: "transform 160ms ease",
        color,
      }}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M6 9l6 6 6-6" />
      </svg>
    </span>
  );
}

function IconBox({ icon, theme }: { icon: React.ReactNode; theme: Theme }) {
  const isDark = theme !== "light";
  return (
    <span
      aria-hidden="true"
      style={{
        width: 34,
        height: 34,
        borderRadius: 10,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)",
        border: `1px solid ${isDark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.08)"}`,
        flexShrink: 0,
      }}
    >
      {icon}
    </span>
  );
}

function DefaultIcon({ theme }: { theme: Theme }) {
  const isDark = theme !== "light";
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={isDark ? "rgba(255,255,255,0.75)" : "rgba(0,0,0,0.75)"} strokeWidth="2">
      <path d="M12 2l3 7 7 3-7 3-3 7-3-7-7-3 7-3 3-7z" />
    </svg>
  );
}

function FeaturedCard({
  theme,
  border,
  bg,
  muted,
  text,
  title,
  quote,
  desc,
  cta,
  imageSrc,
}: {
  theme: Theme;
  border: string;
  bg: string;
  muted: string;
  text: string;
  title: string;
  quote: string;
  desc: string;
  cta: string;
  imageSrc: string;
}) {
  const isDark = theme !== "light";
  return (
    <div style={{ borderRadius: 18, overflow: "hidden", border: `1px solid ${border}`, background: bg, position: "relative" }}>
      <div style={{ position: "relative", height: 148 }}>
        <Image
          src={imageSrc}
          alt=""
          fill
          sizes="360px"
          style={{
            objectFit: "cover",
            filter: isDark ? "grayscale(1) contrast(1.10) brightness(0.72)" : "grayscale(1) contrast(1.15) brightness(0.98)",
            transform: "scale(1.06)",
          }}
          priority={false}
        />
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            opacity: isDark ? 0.45 : 0.25,
            background:
              // subtle grain/specular texture (no glow)
              "radial-gradient(1000px 380px at 20% 10%, rgba(255,255,255,0.14), transparent 60%), radial-gradient(900px 420px at 75% 0%, rgba(255,255,255,0.10), transparent 55%), linear-gradient(135deg, rgba(242,180,0,0.10), transparent 55%)",
            mixBlendMode: isDark ? "screen" : "multiply",
            pointerEvents: "none",
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background: isDark
              ? "linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.70) 100%)"
              // light theme: avoid white wash; keep image feeling premium/inked
              : "linear-gradient(180deg, rgba(0,0,0,0.06) 0%, rgba(0,0,0,0.22) 100%)",
          }}
        />
      </div>

      <div style={{ padding: 18 }}>
        <div style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: muted }}>{title}</div>
        <div style={{ marginTop: 10, fontSize: 18, fontWeight: 600, color: text, lineHeight: 1.25 }}>{quote}</div>
        <div style={{ marginTop: 10, fontSize: 13, color: muted, lineHeight: 1.55 }}>{desc}</div>
        <div style={{ marginTop: 14, fontSize: 13, fontWeight: 600, color: text }}>{cta} →</div>
      </div>
    </div>
  );
}

export function ExampleMegaNav({ theme }: { theme: Theme }) {
  const isDark = theme !== "light";
  // Dropdown panel follows page theme (requested).
  const panelTheme: Theme = theme;
  const [open, setOpen] = useState<string | null>(null);
  const [headerHeight, setHeaderHeight] = useState(64);
  const closeTimer = useRef<number | null>(null);

  const colors = useMemo(() => {
    const panelIsDark = panelTheme !== "light";
    const panel = {
      text: panelIsDark ? "rgba(255,255,255,0.88)" : "rgba(0,0,0,0.86)",
      muted: panelIsDark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.55)",
      border: panelIsDark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.10)",
      hoverBg: panelIsDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
      // glossy surfaces (no glow)
      bg: panelIsDark ? "linear-gradient(180deg, #0b0c0e 0%, #07080a 100%)" : "linear-gradient(180deg, #ffffff 0%, #f6f7f9 100%)",
      cardBg: panelIsDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)",
      cardBg2: panelIsDark ? "linear-gradient(180deg, rgba(255,255,255,0.045), rgba(255,255,255,0.02))" : "linear-gradient(180deg, rgba(0,0,0,0.02), rgba(0,0,0,0.01))",
    };
    return {
      text: isDark ? "rgba(255,255,255,0.86)" : "rgba(0,0,0,0.86)",
      muted: isDark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.55)",
      border: isDark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.10)",
      // Panel palette (always black)
      panelBg: panel.bg,
      panelBorder: panel.border,
      panelText: panel.text,
      panelMuted: panel.muted,
      panelHoverBg: panel.hoverBg,
      panelCardBg: panel.cardBg,
      panelCardBg2: panel.cardBg2,
      hoverBg: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
      accent: "#f2b400",
    };
  }, [isDark, panelTheme]);

  const nav: NavItem[] = useMemo(
    () => [
      {
        key: "product",
        label: "Product",
        panel: {
          columns: [
            {
              title: "AI Platform",
              items: [
                        { title: "Platform Overview", desc: "The converged AI workspace", href: "/technology-overview", icon: <DefaultIcon theme={panelTheme} /> },
                        { title: "Super Agents", desc: "Delegate your work entirely", href: "/example", badge: "New", icon: <DefaultIcon theme={panelTheme} /> },
                        { title: "Brain MAX", desc: "One AI app to rule them all", href: "/example", icon: <DefaultIcon theme={panelTheme} /> },
              ],
            },
            {
              title: "Features",
              items: [
                        { title: "Teleoperation", desc: "Real-time remote control", href: "/technology-overview#teleoperation", icon: <DefaultIcon theme={panelTheme} /> },
                        { title: "Network Orchestration", desc: "Route tasks across operators", href: "/example", icon: <DefaultIcon theme={panelTheme} /> },
                        { title: "Enterprise Search", desc: "Find anything instantly", href: "/example", icon: <DefaultIcon theme={panelTheme} /> },
              ],
            },
            {
              title: "Resources",
              items: [
                { title: "Pricing", href: "/pricing" },
                { title: "Newsroom", href: "/example/news" },
                { title: "Research", href: "/example/research" },
              ],
            },
          ],
          right: {
            title: "Customer stories",
            body: (
              <FeaturedCard
                        theme={panelTheme}
                        border={colors.panelBorder}
                        bg={colors.panelCardBg}
                        muted={colors.panelMuted}
                        text={colors.panelText}
                title="Featured"
                quote="“Modulr reduces remote operation latency by 50%”"
                desc="See how teams coordinate fleets of robots with real-time orchestration."
                cta="Read the story"
                // Less “stocky”: use our branded premium visual.
                imageSrc="/modulr_vision_image.jpg"
              />
            ),
          },
        },
      },
      {
        key: "solutions",
        label: "Solutions",
        panel: {
          columns: [
            {
              title: "Teams",
              items: [
                { title: "Operations", href: "/example", desc: "Control robots at scale" },
                { title: "R&D", href: "/example/research", desc: "Faster iteration loops" },
                { title: "IT", href: "/technology-overview", desc: "Secure connectivity" },
              ],
            },
            {
              title: "Companies",
              items: [
                { title: "Enterprise", href: "/pricing", desc: "Compliance & governance" },
                { title: "Startup", href: "/example", desc: "Launch quickly" },
                { title: "Education", href: "/example", desc: "Labs & training" },
              ],
            },
            {
              title: "Use cases",
              items: [
                { title: "Teleoperation", href: "/technology-overview#teleoperation" },
                { title: "Fleet Coordination", href: "/example" },
                { title: "Industrial Automation", href: "/example" },
              ],
            },
          ],
        },
      },
      {
        key: "learn",
        label: "Learn",
        panel: {
          columns: [
            {
              title: "Learn",
              items: [
                { title: "University", href: "/example", desc: "Guided learning paths" },
                { title: "Demos", href: "/example", desc: "Hands-on examples" },
                { title: "Video tutorials", href: "/example", desc: "Short walkthroughs" },
                { title: "Webinars", href: "/example", desc: "Live sessions" },
              ],
            },
            {
              title: "Discover",
              items: [
                { title: "Blog", href: "/news", desc: "Announcements & updates" },
                { title: "Customer stories", href: "/example", desc: "What teams build" },
                { title: "Guides", href: "/example", desc: "Best practices" },
              ],
            },
            {
              title: "Support",
              items: [
                { title: "24/7 Support", href: "/example", desc: "We’ve got you" },
                { title: "Professional services", href: "/example", desc: "Implementation help" },
                { title: "Premium support", href: "/example", desc: "White-glove SLA" },
              ],
            },
          ],
          right: {
            body: (
              <div
                style={{
                  borderRadius: 18,
                  padding: 18,
                  border: `1px solid ${colors.panelBorder}`,
                  // No glow; keep it neutral and glossy.
                  background: colors.panelCardBg2,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div style={{ position: "absolute", inset: 0, opacity: 0.9 }}>
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    poster="/robot_touching_human.png"
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      opacity: panelTheme !== "light" ? 0.22 : 0.14,
                    }}
                  >
                    <source src="https://cdn.modulr.cloud/videos/robot-arm-assembly.mp4" type="video/mp4" />
                  </video>
                </div>
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      panelTheme !== "light"
                        ? "linear-gradient(180deg, rgba(11,12,14,0.22) 0%, rgba(11,12,14,0.94) 100%)"
                        : "linear-gradient(180deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.92) 100%)",
                  }}
                />
                <div style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: colors.panelMuted }}>
                  New
                </div>
                <div style={{ marginTop: 10, fontSize: 18, fontWeight: 650, color: colors.panelText, lineHeight: 1.25 }}>
                  Watch a 90‑second robotics intro
                </div>
                <div style={{ marginTop: 10, fontSize: 13, color: colors.panelMuted, lineHeight: 1.55 }}>
                  Learn the core primitives: low latency, secure control plane, and operator marketplace.
                </div>
                <div style={{ marginTop: 14, fontSize: 13, fontWeight: 600, color: colors.panelText }}>
                  Watch demo →
                </div>
              </div>
            ),
          },
        },
      },
      { key: "pricing", label: "Pricing", href: "/pricing" },
    ],
    [colors.muted, colors.panelBorder, colors.panelCardBg, colors.panelCardBg2, colors.panelMuted, colors.panelText, colors.text, isDark, panelTheme],
  );

  const active = nav.find((n) => n.key === open);

  const scheduleClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpen(null), 120);
  };

  const cancelClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = null;
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const measure = () => {
      const header = document.querySelector<HTMLElement>('[data-example-header="true"]');
      if (!header) return;
      const h = Math.round(header.getBoundingClientRect().height);
      if (h > 0 && h < 180) setHeaderHeight(h);
    };
    measure();
    window.addEventListener("resize", measure, { passive: true } as any);
    return () => window.removeEventListener("resize", measure as any);
  }, []);

  return (
    <div
      onMouseLeave={scheduleClose}
      onMouseEnter={cancelClose}
      style={{ position: "relative" }}
      className="hidden md:block"
    >
      <nav style={{ display: "flex", alignItems: "center", gap: 18 }}>
        {nav.map((item) => {
          const isOpen = open === item.key;
          const triggerColor = isOpen ? colors.text : colors.muted;
          const trigger = (
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "8px 10px",
                borderRadius: 10,
                fontSize: 13,
                fontWeight: 500,
                color: triggerColor,
                background: isOpen ? colors.hoverBg : "transparent",
                border: `1px solid ${isOpen ? colors.border : "transparent"}`,
                transition: "background 160ms ease, border-color 160ms ease, color 160ms ease",
                cursor: "default",
                userSelect: "none",
              }}
              onMouseEnter={() => setOpen(item.panel ? item.key : null)}
            >
              {item.label}
              {item.panel ? <Chevron open={isOpen} color={triggerColor} /> : null}
            </span>
          );

          if (item.href && !item.panel) {
            return (
              <Link key={item.key} href={item.href} style={{ textDecoration: "none" }}>
                {trigger}
              </Link>
            );
          }

          return (
            <div key={item.key} style={{ position: "relative" }}>
              {item.href ? (
                <Link href={item.href} style={{ textDecoration: "none" }}>
                  {trigger}
                </Link>
              ) : (
                trigger
              )}
            </div>
          );
        })}
      </nav>

      {/* Mega panel */}
      <AnimatePresence>
        {active?.panel ? (
          <>
            {/* Subtle focus overlay (non-interactive so hover doesn't break) */}
            <motion.div
              key="mega-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: panelTheme !== "light" ? 0.58 : 0.18 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              aria-hidden="true"
              style={{
                position: "fixed",
                inset: 0,
                pointerEvents: "none",
                zIndex: 59,
                // Keep focus, but no glowy vignette.
                background: panelTheme !== "light" ? "rgba(0,0,0,0.62)" : "rgba(0,0,0,0.10)",
              }}
            />

            {/* Outer wrapper controls viewport centering (so motion's transform can't override it) */}
            <div
              style={{
                position: "fixed",
                left: "50vw",
                transform: "translateX(-50%)",
                top: headerHeight + 10,
                width: "min(1120px, calc(100vw - 48px))",
                zIndex: 60,
              }}
            >
              <motion.div
                key={`mega-${active.key}`}
                initial={{ opacity: 0, y: -10, scale: 0.985, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -8, scale: 0.99, filter: "blur(10px)" }}
                transition={{ duration: 0.22, ease: [0.2, 0.8, 0.2, 1] }}
                style={{ willChange: "transform, opacity, filter" }}
              >
                <div
                style={{
                  borderRadius: 18,
                  border: `1px solid ${colors.panelBorder}`,
                  background: colors.panelBg,
                  boxShadow: panelTheme !== "light" ? "0 40px 120px rgba(0,0,0,0.65)" : "0 30px 90px rgba(0,0,0,0.14)",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    inset: 0,
                    pointerEvents: "none",
                    // keep it clean: no extra highlight layer
                    boxShadow: "none",
                  }}
                />

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: active.panel.right ? "1fr 1fr 1fr 360px" : "1fr 1fr 1fr",
                    gap: 26,
                    padding: 22,
                    position: "relative",
                  }}
                >
                  {active.panel.columns.map((col) => (
                    <div key={col.title} style={{ minWidth: 0 }}>
                      <div
                        style={{
                          fontSize: 11,
                          letterSpacing: "0.18em",
                          textTransform: "uppercase",
                          color: colors.panelMuted,
                          marginBottom: 12,
                        }}
                      >
                        {col.title}
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                        {col.items.map((it) => (
                          <Link
                            key={it.title}
                            href={it.href}
                            onClick={() => setOpen(null)}
                            style={{
                              textDecoration: "none",
                              borderRadius: 12,
                              padding: it.desc ? "10px 10px" : "8px 10px",
                              display: "flex",
                              gap: 12,
                              alignItems: it.desc ? "flex-start" : "center",
                              color: colors.panelText,
                              background: "transparent",
                              transition: "background 140ms ease, transform 140ms ease",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = colors.panelHoverBg;
                              e.currentTarget.style.transform = "translateY(-1px)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = "transparent";
                              e.currentTarget.style.transform = "translateY(0px)";
                            }}
                          >
                            {it.icon ? <IconBox icon={it.icon} theme={panelTheme} /> : null}
                            <div style={{ minWidth: 0 }}>
                              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                <div style={{ fontSize: 14, fontWeight: 600, lineHeight: 1.2 }}>{it.title}</div>
                                {it.badge ? (
                                  <span
                                    style={{
                                      fontSize: 10,
                                      fontWeight: 700,
                                      letterSpacing: "0.1em",
                                      textTransform: "uppercase",
                                      padding: "3px 7px",
                                      borderRadius: 999,
                                      background: "rgba(242,180,0,0.18)",
                                      color: colors.accent,
                                      border: "1px solid rgba(242,180,0,0.35)",
                                    }}
                                  >
                                    {it.badge}
                                  </span>
                                ) : null}
                              </div>
                              {it.desc ? (
                                <div style={{ marginTop: 4, fontSize: 12, color: colors.panelMuted, lineHeight: 1.45 }}>{it.desc}</div>
                              ) : null}
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}

                  {active.panel.right ? (
                    <div style={{ minWidth: 0 }}>{active.panel.right.body}</div>
                  ) : null}
                </div>

                {/* Bottom hairline */}
                <div style={{ height: 1, background: colors.panelBorder }} />
                <div style={{ padding: "10px 16px", display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
                  <div style={{ fontSize: 12, color: colors.panelMuted }}>
                    Explore more in <span style={{ color: colors.panelText, fontWeight: 600 }}>{active.label}</span>
                  </div>
                </div>
              </div>
              </motion.div>
            </div>
          </>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

