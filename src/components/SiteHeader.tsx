"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ModulrLogo } from "@/components/ModulrLogo";
import { cn } from "@/lib/cn";
import { MODULR_LINKS } from "@/config/links";

const nav = [
  { label: "Home", href: "/" },
  { label: "Research", href: "/research" },
  { label: "News", href: "/news" },
  { label: "Careers", href: "/careers" },
  { label: "Technology", href: "/technology-overview" },
  { label: "Team", href: "/team" },
  { label: "Pricing", href: "/pricing" },
];

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path
        d="M4 7h16M4 12h16M4 17h16"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-[60] transition-all duration-300",
          scrolled ? "bg-black/80 backdrop-blur-xl" : "bg-black/40 backdrop-blur-md",
        )}
      >
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex h-16 items-center justify-between gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[var(--accent)] ring-premium rounded"
              aria-label="Modulr home"
            >
              <ModulrLogo />
            </Link>

            <nav className="hidden md:flex items-center gap-6 text-sm font-semibold">
              {nav.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "rounded ring-premium transition",
                      active ? "text-white" : "text-white/70 hover:text-white",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-2">
              <a
                href={MODULR_LINKS.APP}
                target="_blank"
                rel="noreferrer"
                className="hidden sm:inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold transition ring-premium btn-primary"
              >
                Launch App
              </a>

              <button
                type="button"
                onClick={() => setMobileOpen((v) => !v)}
                className="md:hidden inline-flex items-center justify-center rounded-full border border-hairline bg-white/5 px-3 py-2 text-white/85 ring-premium"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            className="fixed inset-0 z-[70] md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black/70"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              className="absolute right-3 top-3 left-3 rounded-2xl border border-hairline bg-black/85 backdrop-blur-2xl overflow-hidden"
              initial={{ y: -8, scale: 0.98, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: -8, scale: 0.98, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="text-[var(--accent)]">
                    <ModulrLogo wordmark />
                  </div>
                  <button
                    type="button"
                    onClick={() => setMobileOpen(false)}
                    className="inline-flex items-center justify-center rounded-full border border-hairline bg-white/5 px-3 py-2 text-white/85 ring-premium"
                    aria-label="Close menu"
                  >
                    <CloseIcon className="h-5 w-5" />
                  </button>
                </div>

                <div className="mt-4 grid gap-1">
                  {nav.map((item) => {
                    const active = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "rounded-xl px-3 py-3 text-sm font-semibold ring-premium transition",
                          active ? "bg-white/8 text-white" : "text-white/80 hover:bg-white/6 hover:text-white",
                        )}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </div>

                <div className="mt-4">
                  <a
                    href={MODULR_LINKS.APP}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex w-full items-center justify-center rounded-full px-4 py-3 text-sm font-semibold transition ring-premium btn-primary"
                  >
                    Launch App
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
