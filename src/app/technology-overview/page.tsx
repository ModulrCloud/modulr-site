import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Reveal } from "@/components/Reveal";
import { HowItWorks } from "@/components/HowItWorks";
import { MODULR_LINKS } from "@/config/links";

export const metadata: Metadata = {
  title: "Technology",
  description:
    "Discover the architecture and capabilities that power the Modulr network.",
};

export default function TechnologyOverviewPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="pt-16 flex-1">
        {/* Hero - same style as Research, News, Careers */}
        <section className="relative overflow-hidden border-b border-hairline">
          <div className="mx-auto max-w-6xl px-6 pt-16 md:pt-24 pb-8 md:pb-12">
            <div className="max-w-3xl">
              <Reveal>
                <div className="text-xs tracking-[0.28em] uppercase text-white/45">
                  Technology
                </div>
              </Reveal>
              <Reveal delayMs={60}>
                <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white">
                  Technology Overview
                </h1>
              </Reveal>
              <Reveal delayMs={100}>
                <p className="mt-6 text-lg text-white/60 max-w-2xl">
                  Discover the architecture and capabilities that power the Modulr network.
                </p>
              </Reveal>
              <Reveal delayMs={140}>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href={MODULR_LINKS.DEMO}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-white/90 ring-premium"
                  >
                    Book a Demo
                  </a>
                  <a
                    href={MODULR_LINKS.GITHUB}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-sm px-5 py-2.5 text-sm font-semibold text-white/80 transition hover:bg-white/[0.06] hover:text-white ring-premium"
                  >
                    GitHub
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <HowItWorks compactTop />

      <section className="border-t border-hairline bg-section">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <div className="mb-12 md:mb-14">
            <Reveal>
              <div className="text-xs tracking-[0.22em] uppercase text-white/55">
                The Modulr Network
              </div>
            </Reveal>
            <Reveal delayMs={60}>
              <h2 className="mt-3 text-premium text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Beyond teleoperation: <span className="text-gradient">three vital services</span>
              </h2>
            </Reveal>
            <Reveal delayMs={110}>
              <p className="mt-5 text-sm leading-7 text-white/60 max-w-2xl">
                The network connects every robot to AI, data, and compute so teams can operate with intelligence, learn from real-world data, and run at the lowest latency possible.
              </p>
            </Reveal>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                kicker: "Intelligence",
                title: "AI apps, models & agents",
                desc: "Real-time learning and autonomous decision-making let robots interpret environments, anticipate needs, and execute tasks with precision and safety. Deploy the models and agents that make human-robot collaboration seamless.",
                accent: "rgba(242,180,0,0.12)",
              },
              {
                kicker: "Data",
                title: "Data services",
                desc: "Collection, management, storage, and analytics power robotic intelligence. Use an expanding dataset library and tools to refine performance, optimize operations, and drive smarter, safer behavior across your fleet.",
                accent: "rgba(0,200,180,0.12)",
              },
              {
                kicker: "Performance",
                title: "Compute",
                desc: "Low-latency compute is what makes real-time control possible. Scalable cloud and edge resources keep latency as low as it can go so you can operate complex applications from anywhere, without compromise.",
                accent: "rgba(120,100,255,0.12)",
              },
            ].map((c, i) => (
              <Reveal
                key={c.title}
                delayMs={80 + i * 60}
                className="group relative overflow-hidden rounded-2xl border border-white/15 bg-white/[0.03] p-6 md:p-8 flex flex-col shadow-[0_0_0_1px_rgba(255,255,255,0.06)]"
              >
                <div
                  className="pointer-events-none absolute top-0 right-0 w-32 h-32 rounded-full opacity-100 blur-2xl transition-opacity group-hover:opacity-80"
                  style={{ background: c.accent, transform: "translate(30%, -30%)" }}
                />
                <div className="relative">
                  <div className="text-xs tracking-[0.2em] uppercase text-white/60 mb-2">
                    {c.kicker}
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight text-white">
                    {c.title}
                  </h3>
                  <p className="mt-4 text-sm leading-6 text-white/60">
                    {c.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
{/*
      <section className="border-t border-hairline bg-section">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <Reveal>
            <div className="text-xs tracking-[0.22em] uppercase text-white/55">
              App in action
            </div>
          </Reveal>
          <Reveal delayMs={60}>
            <h2 className="mt-3 text-premium text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              See the <span className="text-gradient">user experience</span>
            </h2>
          </Reveal>
          <Reveal delayMs={110}>
            <p className="mt-4 text-sm leading-7 text-white/60 max-w-2xl">
              Click any image to view it full-size. Cycle through with the arrows or close with the X or by clicking outside.
            </p>
          </Reveal>

          <Reveal delayMs={120}>
            <AppGallery />
          </Reveal>
        </div>
      </section>
*/}
      <section className="border-t border-hairline bg-section">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <Reveal>
            <div className="text-xs tracking-[0.18em] uppercase text-white/45">
              Our Technology Vision
            </div>
          </Reveal>
          <Reveal delayMs={100} className="mt-6 bg-card-2 rounded-3xl p-7 shadow-glow">
            <p className="text-base leading-7 text-white/80">
              <em>
                ''To build the kind of world where robots can improve individual lives and
                entire industries, we need to establish a universal connection layer between
                all of the moving parts. This is Modulr's vision—a decentralized,
                peer-to-peer, modular network that makes robotics accessible to everyone.''
              </em>{" "}
              <span className="text-white/55">- Christopher Boggs</span>
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-hairline bg-section">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <Reveal>
            <h2 className="text-premium text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              A look toward the future:{" "}
              <span className="text-gradient">A Modulr Ecosystem of Co-Chains</span>
            </h2>
          </Reveal>

          <div className="mt-10 grid gap-4 md:grid-cols-12">
            <Reveal className="md:col-span-12 bg-card-2 rounded-3xl p-7 shadow-glow">
              <div className="text-xs tracking-[0.18em] uppercase text-white/45">
                Modulr.Robotics
              </div>
              <div className="mt-3 text-lg font-semibold text-white">The robotics chain</div>
              <p className="mt-3 text-sm leading-6 text-muted-2">
                Built to coordinate real-world machines with real-time control, job
                execution, and reward flows. Perfect for fleets, swarms, or any physical
                system that needs trust, precision, and payout on real output.
              </p>
            </Reveal>

            {[
              ["Modulr.AI", "A fast, flexible AI layer made of small task-specific models. A hypervisor routes requests to the right one, more efficient, easier to update, and hardware-friendly."],
              ["Modulr.Web", "A Web 4.0 system replacing bulky webpages with modular updates. No cookies. Includes naming (UnaS) and age/content verification tools."],
              ["Modulr.Store", "A failsafe for your assets. Set rules for transfers if inactive, freeze hacked wallets instantly, and cap withdrawals to stay in control."],
              ["Modulr.Social", "Decentralized streaming built for low-latency interaction, perfect for creators, educators, and realtime events."],
              ["Modulr.Code", "Code, track, and earn. Developers get rewarded for real contributions. Includes bounties and built-in chat for smoother collaboration."],
              ["Modulr.Database", "Decentralized SQL-style databases, public or private. Great for storing everything from media libraries to logistics and inventory data."],
              ["Modulr.Chat", "A private, decentralized chat layer. DM, create groups, or run entire communities, without centralized control."],
              ["Modulr.Game", "Real-time multiplayer and simulation support. Live gaming, shared physics, and global state changes built into the chain."],
            ].map(([title, desc], i) => (
              <Reveal
                key={title}
                delayMs={60 + i * 50}
                className="md:col-span-6 bg-card rounded-3xl p-6"
              >
                <div className="text-sm font-semibold text-white">{title}</div>
                <p className="mt-2 text-sm leading-6 text-muted-2">{desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      </main>

      <SiteFooter />
    </div>
  );
}
