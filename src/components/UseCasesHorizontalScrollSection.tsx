"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useInView,
} from "framer-motion";
import { SmartImage } from "@/components/SmartImage";
import { cn } from "@/lib/cn";

type UseCase = {
  title: string;
  desc: string;
  image: string;
  accent: string;
  stat: string;
  statLabel: string;
};

const useCases: UseCase[] = [
  
  {
    title: "Industrial Automation",
    desc: "Remotely manage robotic arms, AGVs, and factory floor equipment with sub-second latency. Scale operations without physical presence.",
    image: "/agriculture-industrial.png",
    accent: "rgba(120,100,255,0.35)",
    stat: "Unlimited",
    statLabel: "Robots",
  },
  
  {
    title: "Entertainment & Gaming",
    desc: "Control real robots in fighting arenas, race courses, arcades, and immersive experiences from anywhere in the world. Think: Real Steel, AR/VR, drone racing, and more.",
    image: "/entertainment-gaming.png",
    accent: "rgba(0,200,150,0.35)",
    stat: "Ultra-low",
    statLabel: "Latency",
  },
  {
    title: "Defense & Security",
    desc: "Operate unmanned ground and aerial vehicles for reconnaissance, patrol, and hazardous environment inspection with military-grade reliability.",
    image: "/defense_robots.jpg",
    accent: "rgba(242,180,0,0.35)",
    stat: "99.9%",
    statLabel: "Uptime",
  },
  
  {
    title: "Space & Extreme Environments",
    desc: "Control rovers, orbital manipulators, and deep-sea exploration robots with real-time feedback loops across vast distances.",
    image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1400&h=900&fit=crop",
    accent: "rgba(255,100,100,0.35)",
    stat: "∞",
    statLabel: "Range",
  },
  {
    title: "Healthcare & Medical",
    desc: "Enable surgeons and specialists to operate robotic surgery systems and assistive devices remotely, expanding access to expertise.",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1400&h=900&fit=crop",
    accent: "rgba(0,180,220,0.35)",
    stat: "24/7",
    statLabel: "Access",
  },
];

export function UseCasesHorizontalScrollSection({
  className,
}: {
  className?: string;
}) {
  const reduce = useReducedMotion();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const titleInView = useInView(titleRef, { once: true, margin: "0px 0px -20px 0px" });
  const [isLg, setIsLg] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1024px)");
    const set = () => setIsLg(mql.matches);
    set();
    mql.addEventListener("change", set);
    return () => mql.removeEventListener("change", set);
  }, []);
  const showTitle = isLg ? titleInView : true;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const cardCount = useCases.length;

  return (
    <section
      ref={containerRef}
      className={cn(
        "relative bg-black border-t border-hairline",
        className
      )}
      style={{ height: `${100 + cardCount * 100}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-[#050508] to-black" />
          <div className="absolute inset-0 k-noise opacity-[0.08]" />
        </div>

        {/* One title for all breakpoints: responsive font size + margin so it's always visible and never overlaps. */}
        <div className="flex flex-col h-full lg:contents">
          <div
            ref={titleRef}
            className="relative z-20 flex-shrink-0 overflow-visible pt-20 pb-6 md:pt-24 md:pb-8 px-6 md:px-12 pointer-events-none lg:absolute lg:top-0 lg:left-0 lg:right-0 lg:pt-24 lg:pb-0 lg:px-12"
          >
            <h2
              className="font-black leading-[0.85] tracking-[-0.04em] uppercase text-[14vw] sm:text-[11vw] md:text-[10vw] lg:text-[12vw]"
              style={{ fontFamily: "var(--font-geist-sans), system-ui" }}
            >
              <span
                className="text-transparent"
                style={{ WebkitTextStroke: "2px rgba(255,255,255,0.45)" }}
              >
                USE
              </span>{" "}
              <span className="bg-gradient-to-r from-white via-white to-[var(--accent)] bg-clip-text text-transparent">
                CASES
              </span>
            </h2>
          </div>

          <div className="flex-1 min-h-0 flex items-center justify-center px-6 md:px-12 pb-12 lg:pb-0 lg:absolute lg:inset-0 lg:pt-40 lg:flex-none lg:justify-center">
            <div className="relative w-full max-w-[1600px] mx-auto h-full lg:h-auto">
              <div className="grid gap-x-8 gap-y-2 lg:grid-cols-12 lg:gap-12 items-center h-full lg:h-auto">
                <div className="order-1 lg:order-none lg:col-span-4 relative z-10 mb-0">
                  <div className="space-y-8">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={
                        showTitle ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                      }
                      transition={{ duration: 0.8, delay: 0.3 }}
                    >
                      <div className="text-xs tracking-[0.28em] uppercase text-white/45 mb-3">
                        Remote Teleoperation
                      </div>
                      <p className="text-lg md:text-xl leading-8 text-white/70 max-w-md">
                        From agriculture to space exploration, Modulr powers
                        real-time robotic control in the most demanding
                        environments.
                      </p>
                    </motion.div>

                    <motion.div
                      className="hidden lg:flex flex-col gap-2"
                      initial={{ opacity: 0 }}
                      animate={showTitle ? { opacity: 1 } : { opacity: 0 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                    >
                      {useCases.map((_, idx) => (
                        <ScrollIndicator
                          key={idx}
                          index={idx}
                          total={cardCount}
                          scrollYProgress={scrollYProgress}
                        />
                      ))}
                    </motion.div>
                  </div>
                </div>

                <div className="order-2 lg:order-none lg:col-span-8 relative">
                  <div className="relative h-[50vh] md:h-[55vh] lg:h-[60vh]">
                    {useCases.map((uc, idx) => (
                      <UseCaseCard
                        key={uc.title}
                        useCase={uc}
                        index={idx}
                        total={cardCount}
                        scrollYProgress={scrollYProgress}
                        reduce={reduce}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <motion.div
          className="absolute bottom-8 left-0 right-0 z-10 flex justify-center pointer-events-none"
          initial={{ opacity: 0 }}
          animate={showTitle ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1 }}
        >
          <motion.div
            className="flex items-center gap-3 text-xs text-white/30 uppercase tracking-[0.3em]"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span>Scroll to explore</span>
            <span>↓</span>
          </motion.div>
        </motion.div>

        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-y-0 left-0 w-16 md:w-24 bg-gradient-to-r from-black to-transparent" />
          <div className="absolute inset-y-0 right-0 w-16 md:w-24 bg-gradient-to-l from-black to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent" />
        </div>
      </div>
    </section>
  );
}

function ScrollIndicator({
  index,
  total,
  scrollYProgress,
}: {
  index: number;
  total: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const start = index / total;
  const end = (index + 1) / total;

  const opacity = useTransform(scrollYProgress, [start, start + 0.05, end - 0.05, end], [0.4, 1, 1, 0.4]);
  const scaleX = useTransform(scrollYProgress, [start, end], [0, 1]);

  return (
    <div className="relative h-1.5 w-24 rounded-full bg-white/15 overflow-hidden">
      <motion.div
        className="absolute inset-y-0 left-0 w-full rounded-full bg-[var(--accent)]"
        style={{ scaleX, transformOrigin: "left", opacity }}
      />
    </div>
  );
}

function UseCaseCard({
  useCase,
  index,
  total,
  scrollYProgress,
  reduce,
}: {
  useCase: UseCase;
  index: number;
  total: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  reduce: boolean | null;
}) {
  const start = index / total;
  const peak = (index + 0.5) / total;
  const end = (index + 1) / total;

  const opacity = useTransform(
    scrollYProgress,
    [start, start + 0.08, peak, end - 0.08, end],
    [0, 1, 1, 1, index === total - 1 ? 1 : 0]
  );

  const y = useTransform(
    scrollYProgress,
    [start, peak, end],
    reduce ? [0, 0, 0] : [60, 0, index === total - 1 ? 0 : -40]
  );

  const scale = useTransform(
    scrollYProgress,
    [start, peak, end],
    reduce ? [1, 1, 1] : [0.95, 1, index === total - 1 ? 1 : 0.98]
  );

  const rotateX = useTransform(
    scrollYProgress,
    [start, peak, end],
    reduce ? [0, 0, 0] : [8, 0, index === total - 1 ? 0 : -3]
  );

  return (
    <motion.article
      className="absolute inset-0 overflow-hidden rounded-[28px] md:rounded-[40px] border border-white/10 bg-black/60"
      style={{
        opacity,
        y,
        scale,
        rotateX,
        transformPerspective: 1200,
        zIndex: total - index,
      }}
    >
      <div className="absolute inset-0">
        <SmartImage
          src={useCase.image}
          alt={useCase.title}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background: `radial-gradient(900px 600px at 70% 70%, ${useCase.accent}, transparent 55%)`,
          }}
        />
      </div>

      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 lg:p-12">
        <div className="mb-6 inline-flex self-start items-center gap-3">
          <div className="rounded-2xl border border-white/15 bg-black/50 backdrop-blur-sm px-5 py-3">
            <div className="text-2xl md:text-3xl font-bold text-white">
              {useCase.stat}
            </div>
            <div className="text-[10px] tracking-[0.2em] uppercase text-white/50">
              {useCase.statLabel}
            </div>
          </div>
        </div>

        <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-white">
          {useCase.title}
        </h3>
        <p className="mt-3 text-sm md:text-base leading-7 text-white/60 max-w-xl">
          {useCase.desc}
        </p>

      </div>

      <div
        className="pointer-events-none absolute inset-0 rounded-[28px] md:rounded-[40px]"
        style={{ boxShadow: `inset 0 0 120px ${useCase.accent}` }}
      />
      <div className="pointer-events-none absolute inset-0 rounded-[28px] md:rounded-[40px] ring-1 ring-inset ring-white/5" />
    </motion.article>
  );
}
