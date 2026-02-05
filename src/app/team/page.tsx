import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";

type TeamMember = {
  name: string;
  role: string;
  bio: string;
  imageSrc?: string;
};

const team: TeamMember[] = [
  {
    name: "Christopher Boggs",
    role: "Founder & Chief Technical Officer",
    bio: "Christopher, founder of Modulr, combines blockchain expertise with 18 years in aerospace, robotics, and electronics. Formerly leading a 30+ person team at Moog Space & Defense Group, he is now building a decentralized base layer to power next-generation robotics, automation, and modular applications.",
    imageSrc:
      "https://cdn.prod.website-files.com/688b650d15ca6b144341e1f7/6893cb0277da80ca82befd55_Frame%201948754903%20(1).png",
  },
  {
    name: "Mack Lorden",
    role: "Chief Executive Officer",
    bio: "Mack is an experienced strategic growth leader with over a decade of experience in web3, AI, and frontier tech. He scaled a GPU computing product to $40M in revenue within 6 months, launched a $3M web3 ecosystem, and has angel invested in/advised 50+ web3 companies. As CEO he is focused on building the base layer for the global robot economy.",
    imageSrc:
      "https://cdn.prod.website-files.com/688b650d15ca6b144341e1f7/68ff8377f77cbae2fb3262d8_Mack%20Mono-p-2600.jpg",
  },
  {
    name: "Vlad Chernenko",
    role: "Lead Blockchain Developer",
    bio: "Vlad, a top 1% TryHackMe cybersecurity expert, has secured major blockchain projects including Ethereum, MetaMask, and Aptos. With five years of experience in Python, Golang, and Node.js, he authored a perfect-scoring dissertation on smart contract execution and has served as a SOC analyst at MHP.",
    imageSrc:
      "https://cdn.prod.website-files.com/688b650d15ca6b144341e1f7/6893cb16c3a320231f3ad9ae_Frame%201948754903%20(2).png",
  },
  {
    name: "Kenneth Fox",
    role: "UX/UI & Full-Stack Engineer",
    bio: "Kenneth brings a decade of full-stack mastery—from early campaigns in martech to fintech trading platforms and AI-powered healthcare SaaS. He built advanced pipelines, multi-asset trading engines and multilingual SEO platforms; earlier, he scaled e-commerce ecosystems and marketing automation across global teams. Now he fuses intuitive UI/UX with deep backend engineering and AI integration to deliver product experiences that delight both users and customers.",
    imageSrc:
      "https://cdn.prod.website-files.com/688b650d15ca6b144341e1f7/68ff8a934ceeaa3d9b80c03d_Kenneth%20Fox%20Mono.jpg",
  },
  {
    name: "Michael Hart",
    role: "Chief Robotics Engineer",
    bio: "Michael, an ex-Amazon robotics expert, brings years of practical experience in engineering robotics. At Amazon he worked as a senior robotics engineer and was one of the core figures behind the development of the Amazon Scout, the company's flagship autonomous delivery robot. He studied at Imperial College and has been active in the robotics community through YouTube, GitHub, and his personal blog, where he shares projects and insights. At Modulr he is architecting core teleoperation functionality on the open network for robotics.",
    imageSrc:
      "https://cdn.prod.website-files.com/688b650d15ca6b144341e1f7/68b20a19cfaf0e6a7c807a26_Mike%20H.jpg",
  },
  {
    name: "Alexandre Pacheco",
    role: "Chief Robotics Advisor",
    bio: "Alexandre, a former NASA intern and active robotics researcher, specializes in swarm robotics and blockchain-powered coordination of robotic systems. His PhD research, supported by 12 peer-reviewed publications, and his strong academic ties with the Université Libre de Bruxelles, the University of Konstanz, and the University of the Azores, showcase his expertise. At Modulr, he contributes his knowledge in collective behavior and decentralized robotics to help develop the first decentralized marketplace for operating & earning from robotic systems.",
    imageSrc:
      "https://cdn.prod.website-files.com/688b650d15ca6b144341e1f7/68bc46c3dd2f680653b21718_telegram-cloud-photo-size-5-6183668341554661520-y.jpg",
  },
  {
    name: "Evan Kim",
    role: "Robotics Engineer",
    bio: "Evan Kim combines hands-on engineering experience with a Computer Engineering background from Virginia Tech. Previously he designed trailer components using SolidWorks at Great Dane. A Swiss Army knife for robotics, he has experience in electronics repair, BGA soldering, Kubernetes clusters, network storage server management and more. At Modulr, he is focused on building robot prototypes and R&D.",
    imageSrc:
      "https://cdn.prod.website-files.com/688b650d15ca6b144341e1f7/691f7fcd2c1b34489edebd33_Evan%20Kim.jpg",
  },
  {
    name: "Rick Friedman",
    role: "Robotics Engineer",
    bio: "Rick Friedman is a robotics engineering specialist and former researcher at Virginia Tech’s Bio-Inspired Science and Technology Lab. He has built fully autonomous ground rovers end-to-end, spanning software, electronics, mechanical design, and vehicle dynamics. Rick brings professional experience across industrial automation, mining technologies, and robotic agriculture, with a strong emphasis on deploying complete robotic systems in real-world environments. At Modulr, he is focused on end-to-end robotic system development and deployment.",
    imageSrc: "/rick_friedman.jpg",
  },
];

export default function TeamPage() {
  return (
    <PageShell
      title="Meet Our Team"
      subtitle="World-class engineers and operators building the future of robotics."
    >
      <section className="border-t border-hairline bg-section">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <Reveal>
            <h2 className="text-premium text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Our Team
            </h2>
          </Reveal>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {team.map((m, i) => (
              <Reveal
                key={m.name}
                delayMs={60 + i * 60}
                className="overflow-hidden rounded-3xl border border-hairline bg-black/35"
              >
                {m.imageSrc ? (
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={m.imageSrc}
                      alt={m.name}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover object-[center_35%]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
                  </div>
                ) : (
                  <div className="aspect-[16/10] bg-[radial-gradient(900px_420px_at_80%_25%,rgba(242,180,0,0.12),transparent_60%),linear-gradient(180deg,rgba(255,255,255,0.06),rgba(0,0,0,0.2))]" />
                )}

                <div className="p-6">
                  <div className="text-base font-semibold text-white">{m.name}</div>
                  <div className="mt-1 text-xs tracking-[0.18em] uppercase text-white/45">
                    {m.role}
                  </div>
                  <p className="mt-4 text-sm leading-6 text-white/60">{m.bio}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
