import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";
import { MODULR_LINKS } from "@/config/links";

export default function TechnologyOverviewPage() {
  return (
    <PageShell
      title="Technology Overview"
      subtitle="Discover the architecture and capabilities that power the Modulr network."
    >
      <section className="bg-section">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={MODULR_LINKS.DOCS}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition ring-premium btn-primary"
            >
              View Docs
            </a>
            <a
              href={MODULR_LINKS.GITHUB}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition ring-premium btn-secondary"
            >
              GitHub
            </a>
          </div>
        </div>
      </section>

      <section className="border-t border-hairline bg-section">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <Reveal>
            <h2 className="text-premium text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Pluggable <span className="text-gradient">Modular Pillars</span>
            </h2>
          </Reveal>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              {
                title: "AI Models & Apps",
                desc: "By leveraging real-time learning and autonomous decision-making, AI applications/models/agents enable robots to interpret environments, anticipate user needs, and execute tasks with greater precision and safety, creating seamless human-robot collaboration.",
              },
              {
                title: "Data Management",
                desc: "Data powers robotic intelligence through continuous learning, real-time insights, and adaptive decision-making. An ever-expanding dataset library and advanced analytics tools enable users to refine performance, optimize operations, and drive smarter, safer robotic behavior.",
              },
              {
                title: "Compute",
                desc: "Compute provides the power behind real-time responsiveness, advanced simulations, and precise control. Scalable cloud and edge resources ensure low latency, seamless connectivity, allowing users to operate complex robotic applications efficiently from anywhere.",
              },
            ].map((c, i) => (
              <Reveal
                key={c.title}
                delayMs={80 + i * 80}
                className="bg-card rounded-3xl p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-sm font-semibold text-white">{c.title}</div>
                    <p className="mt-2 text-sm leading-6 text-muted-2">{c.desc}</p>
                  </div>
                  <div className="mt-1 h-10 w-10 shrink-0 rounded-2xl border border-hairline bg-[linear-gradient(135deg,rgba(242,180,0,0.18),rgba(255,255,255,0.03))]" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

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
    </PageShell>
  );
}
