"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { LottiePlayer } from "@/components/LottiePlayer";
import { cn } from "@/lib/cn";

const LOTTIE_MAIN =
  "https://cdn.prod.website-files.com/688b650d15ca6b144341e1f7/6893a688e2f0fc756b7d9739_ilustra1.json";
const LOTTIE_TELEOP =
  "https://cdn.prod.website-files.com/688b650d15ca6b144341e1f7/6894f6a5d57083f7fcc2f9ab_ilustra_f1.json";
const LOTTIE_STACK =
  "https://cdn.prod.website-files.com/688b650d15ca6b144341e1f7/6893ac0f5ddb749ae17e89bd_ilustra3.json";
const LOTTIE_EARN =
  "https://cdn.prod.website-files.com/688b650d15ca6b144341e1f7/6893c46da4ffaea92417d390_ilustra5.json";

function Card({
  className,
  children,
  hover = true,
}: {
  className?: string;
  children: React.ReactNode;
  hover?: boolean;
}) {
  const reduce = useReducedMotion();
  const Hover = hover && !reduce;

  return (
    <motion.div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-hairline",
        "bg-[linear-gradient(180deg,rgba(0,0,0,0.78),rgba(0,0,0,0.28))]",
        "shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_24px_84px_rgba(0,0,0,0.45)]",
        className,
      )}
      whileHover={
        Hover
          ? {
              y: -6,
              scale: 1.01,
              transition: { duration: 0.22, ease: [0.2, 0.8, 0.2, 1] },
            }
          : undefined
      }
    >
      {/* subtle glow */}
      <div className="pointer-events-none absolute inset-0 opacity-80 bg-[radial-gradient(900px_420px_at_80%_25%,rgba(242,180,0,0.10),transparent_60%)]" />
      {children}
    </motion.div>
  );
}

export function AccessBentoSection() {
  const reduce = useReducedMotion();

  return (
    <section className="bg-section">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="text-center">
          <Reveal>
            <h2 className="text-premium text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Where anyone can{" "}
              <span className="text-gradient">Access, Operate,</span> and{" "}
              <span className="text-gradient">EARN from Robots</span>
            </h2>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-12">
          {/* BIG card */}
          <Reveal className="md:col-span-12">
            <Card className="p-7 md:py-10 md:pl-10 md:pr-0">
              <div className="grid gap-10 md:grid-cols-12 md:items-center">
                <div className="md:col-span-6">
                  <h3 className="text-premium text-xl font-semibold text-white">
                    The Open Network For Anything Robotics
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-white/55">
                    Modulr lets anyone rent or deploy robots globally for practical, real-world
                    work. It’s powered by an open network that brings robots, AI, data, and
                    compute into one seamless interface that anyone can use.
                  </p>
                </div>

                <div className="md:col-span-6 md:flex md:justify-end">
                  <motion.div
                    className="relative h-[220px] w-full md:h-[300px] md:w-[760px] md:max-w-full md:-translate-y-6 lg:-translate-y-8"
                    animate={
                      reduce
                        ? undefined
                        : { y: [0, -6, 0], transition: { duration: 6, repeat: Infinity } }
                    }
                  >
                    <LottiePlayer
                      src={LOTTIE_MAIN}
                      className="h-full w-full opacity-95"
                      preserveAspectRatio="xMaxYMid meet"
                      loop={false}
                      autoplay
                      hoverReplay
                      speed={1}
                      ariaLabel="Robotics network illustration"
                    />
                  </motion.div>
                </div>
              </div>
            </Card>
          </Reveal>

          {/* small bento cards */}
          {[
            {
              title: "Real-Time Teleoperation",
              desc: "Connect to and control robots from anywhere in the world with near-zero latency, all from your web browser.",
              lottie: LOTTIE_TELEOP,
            },
            {
              title: "Plug-and-Play Robotics Stack",
              desc: "Robots, AI models, compute, and data modules connect instantly—no custom integrations or hardware expertise required.",
              lottie: LOTTIE_STACK,
            },
            {
              title: "Earn From Idle Robots",
              desc: "Robots no longer sit idle. Modulr makes them discoverable, rentable, and operable from anywhere, turning downtime into revenue.",
              lottie: LOTTIE_EARN,
            },
          ].map(({ title, desc, lottie }, i) => (
            <Reveal key={title} delayMs={80 + i * 80} className="md:col-span-4">
              <Card className="p-6">
                <motion.div
                  className="h-[150px] w-full"
                  animate={
                    reduce
                      ? undefined
                      : { y: [0, -5, 0], transition: { duration: 7 + i, repeat: Infinity } }
                  }
                >
                  <LottiePlayer
                    src={lottie}
                    className="h-full w-full"
                    loop={false}
                    autoplay
                    hoverReplay
                    speed={1}
                    ariaLabel={`${title} illustration`}
                  />
                </motion.div>
                <div className="mt-5 text-sm font-semibold text-white">{title}</div>
                <p className="mt-2 text-sm leading-6 text-white/55">{desc}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}


