"use client";

import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/cn";
import { SmartImage } from "@/components/SmartImage";

type Item = {
  number: "01" | "02" | "03" | "04";
  title: string;
  subtitle: string;
  desc: string;
  image: string;
  accent: string;
};

const items: Item[] = [
  {
    number: "01",
    title: "Source global robot liquidity",
    subtitle: "Network",
    desc: "Modulr lets anyone rent or deploy robots globally for practical, real-world work. Need to deploy a robot to inspect a pipeline? Or what about a robot for construction site security? It's all possible through Modulr's peer-to-peer network.",
    image: "/drones.png",
    accent: "rgba(0,200,180,0.25)",
  },
  {
    number: "02",
    title: "Operate any robot, anywhere",
    subtitle: "Control",
    desc: "Connect to and control robots from anywhere in the world with near-zero latency, all while using your preferred interface: web browser, VR headset, gaming controller, or custom rig.",
    image: "/operate_any_robot3.png",
    accent: "rgba(242,180,0,0.25)",
  },
  {
    number: "03",
    title: "Plug-and-play robotics stack",
    subtitle: "Intelligence",
    desc: "For clients, no hardware or software engineering expertise is required. For partners, robotic systems can easily be added to the network for access to everything: teleoperation,AI models, compute, and data modules, and more.",
    image: "/python.png",
    accent: "rgba(120,100,255,0.25)",
  },
  {
    number: "04",
    title: "Earn from idle robots",
    subtitle: "Earnings",
    desc: "Turn downtime into revenue and data. List your robots on Modulr's marketplace and earn when others operate them. Or, outsource your robot data collection to qualified operators.",
    image: "/earnings.png",
    accent: "rgba(255,100,100,0.25)",
  },
];

export function MonetizeRobotsGlobally({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Horizontal scroll transform
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? ["0%", "0%"] : ["5%", "-75%"],
  );

  // Progress line
  const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Title reveal
  const titleOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
  const titleY = useTransform(scrollYProgress, [0, 0.1], [40, 0]);

  // Fade out at the end
  const fadeOut = useTransform(scrollYProgress, [0.85, 1], [1, 0]);

  const scrollHintOpacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    [1, 0.3, 0.3, 0],
  );

  const line = useMotionTemplate`linear-gradient(to right, color-mix(in oklab, var(--accent) 55%, transparent), rgba(255,255,255,0.30), transparent)`;

  return (
    <section className={cn("relative bg-section border-t border-hairline", className)}>
      <div ref={containerRef} className="relative h-[300vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black" />
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 50%, rgba(242,180,0,0.08) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(255,255,255,0.04) 0%, transparent 50%)",
              }}
            />
            <div className="absolute inset-0 k-noise opacity-[0.12]" />
          </div>

          <motion.div
            className="absolute top-0 left-0 right-0 z-10 pt-24 lg:pt-32"
            style={{ opacity: titleOpacity, y: titleY }}
          >
            <div className="mx-4 lg:mx-24">
              <div className="mx-auto w-full max-w-[1600px]">
                <div className="flex items-center gap-3 mb-6">
                  <span className="h-2 w-2 rounded-full bg-[var(--accent)] shadow-[0_0_0_8px_color-mix(in_oklab,var(--accent)_14%,transparent)]" />
                  <span className="text-xs uppercase tracking-[0.5em] text-white/55">
                    Platform
                  </span>
                </div>
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-white leading-[1.05] tracking-[-0.03em]">
                  Monetize robots.
                  <span className="text-white/50 font-light"> Globally.</span>
                </h2>
              </div>
            </div>
          </motion.div>

          <div className="absolute top-[calc(50%-2px)] left-0 right-0 z-0">
            <div className="mx-4 lg:mx-24">
              <div className="mx-auto w-full max-w-[1600px]">
                <div className="h-[1px] bg-white/5 relative">
                  <motion.div className="absolute top-0 left-0 h-full" style={{ width: lineWidth, background: line }} />
                </div>
              </div>
            </div>
          </div>

          <motion.div
            className="absolute top-1/2 left-0 -translate-y-1/2 flex gap-8 pl-4 lg:pl-24 pt-16"
            style={{ x, opacity: fadeOut }}
          >
            {items.map((item, index) => (
              <motion.div
                key={item.number}
                className="relative flex-shrink-0 w-[85vw] sm:w-[70vw] md:w-[50vw] lg:w-[40vw] xl:w-[32vw] h-[60vh] max-h-[480px]"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-10%" }}
              >
                <div className="relative h-full rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-sm overflow-hidden group">
                  <div className="relative h-[50%] overflow-hidden">
                    <SmartImage
                      src={item.image}
                      alt={item.title}
                      className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.05]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                    <div
                      className="pointer-events-none absolute inset-0 opacity-60"
                      style={{
                        background: `radial-gradient(600px 400px at 50% 100%, ${item.accent}, transparent 50%)`,
                      }}
                    />

                    <div className="absolute top-6 left-6 h-10 w-10 rounded-xl border border-white/15 bg-black/50 backdrop-blur grid place-items-center">
                      <span className="text-sm font-medium tracking-[0.15em] text-white/80">
                        {item.number}
                      </span>
                    </div>

                    <div className="absolute top-6 right-6 px-3 py-1.5 rounded-full border border-white/15 bg-black/50 backdrop-blur">
                      <span className="text-[10px] uppercase tracking-[0.25em] text-white/60">
                        {item.subtitle}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 lg:p-8 flex flex-col justify-between h-[50%]">
                    <div>
                      <h3 className="text-xl lg:text-2xl font-semibold text-white leading-tight tracking-[-0.02em]">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-sm text-white/50 leading-relaxed">{item.desc}</p>
                    </div>

                  </div>

                  <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div
                      className="absolute inset-0 rounded-3xl"
                      style={{
                        boxShadow:
                          "inset 0 0 80px color-mix(in oklab, var(--accent) 7%, transparent), 0 0 60px color-mix(in oklab, var(--accent) 5%, transparent)",
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}

            <div className="flex-shrink-0 w-[20vw]" />
          </motion.div>

          <motion.div className="absolute bottom-8 left-0 right-0 z-10 pointer-events-none" style={{ opacity: scrollHintOpacity }}>
            <div className="flex justify-center">
              <div className="flex items-center gap-3 text-xs text-white/30 uppercase tracking-[0.3em]">
                <span>Scroll to explore</span>
                <motion.span animate={{ x: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                  →
                </motion.span>
              </div>
            </div>
          </motion.div>

          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-y-0 left-0 w-8 md:w-16 lg:w-24 opacity-70 md:opacity-90 lg:opacity-100 bg-gradient-to-r from-black to-transparent" />
            <div className="absolute inset-y-0 right-0 w-8 md:w-16 lg:w-24 opacity-70 md:opacity-90 lg:opacity-100 bg-gradient-to-l from-black to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
