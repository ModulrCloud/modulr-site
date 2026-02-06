"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const YEAR = new Date().getFullYear().toString();

export function PageIntro() {
  const [isVisible, setIsVisible] = useState(true);
  const [phase, setPhase] = useState<"loading" | "reveal" | "done">("loading");

  useEffect(() => {
    const loadingTimer = setTimeout(() => setPhase("reveal"), 1600);
    const revealTimer = setTimeout(() => {
      setPhase("done");
      setIsVisible(false);
    }, 2500);

    return () => {
      clearTimeout(loadingTimer);
      clearTimeout(revealTimer);
    };
  }, []);

  if (!isVisible && phase === "done") return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[100] pointer-events-none"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <motion.div
            className="absolute inset-0 bg-black"
            initial={{ y: 0 }}
            animate={phase === "reveal" ? { y: "-100%" } : { y: 0 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
                backgroundSize: "64px 64px",
              }}
            />

            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.1, delay: 0.2 }}
              style={{
                backgroundImage: "radial-gradient(ellipse 40% 25% at 50% 50%, rgba(242,180,0,0.10) 0%, transparent 70%)",
              }}
            />

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <motion.div
                  className="overflow-hidden"
                  initial={{ opacity: 0 }}
                  animate={phase === "loading" ? { opacity: 1 } : { opacity: 0, scale: 1.05, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.h1
                    className="text-2xl md:text-4xl lg:text-5xl font-light tracking-[0.15em] uppercase text-white"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    Powering the future
                  </motion.h1>
                </motion.div>

                <motion.div
                  className="mt-10 flex justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  <div className="relative w-32 h-[1px] bg-white/10 overflow-hidden">
                    <motion.div
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-white/60 via-[var(--accent)]/70 to-white/60"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1.2, delay: 0.5, ease: "easeInOut" }}
                    />
                  </div>
                </motion.div>
              </div>
            </div>

            <motion.div
              className="absolute top-6 left-6 flex items-center gap-2"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] shadow-[0_0_10px_rgba(242,180,0,0.55)]" />
              <span className="text-[10px] tracking-[0.3em] uppercase text-white/30">Loading</span>
            </motion.div>

            <motion.div
              className="absolute bottom-6 right-6"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <span className="text-[10px] tracking-[0.3em] uppercase text-white/30">{YEAR}</span>
            </motion.div>
          </motion.div>

          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-[var(--accent)]/6 to-transparent"
            initial={{ y: "100%" }}
            animate={phase === "reveal" ? { y: "-100%" } : { y: "100%" }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.76, 0, 0.24, 1] }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
