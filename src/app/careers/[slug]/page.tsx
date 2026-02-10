"use client";

import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Reveal } from "@/components/Reveal";
import { careerPosts } from "@/content/careers";

type Props = {
  params: Promise<{ slug: string }>;
};

export default function CareerPostPage({ params }: Props) {
  const { slug } = use(params);
  const post = careerPosts.find((p) => p.slug === slug);

  if (!post) notFound();

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="pt-16 flex-1">
        {/* Hero with gradient */}
        <section className="relative overflow-hidden border-b border-hairline">
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--accent)]/5 via-transparent to-transparent" />
          <div className="relative mx-auto max-w-4xl px-6 py-16 md:py-24">
            <Reveal>
              <Link
                href="/careers"
                className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition mb-6"
              >
                <span>←</span>
                <span>All positions</span>
              </Link>
            </Reveal>

            <Reveal delayMs={60}>
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="inline-flex items-center rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/20 px-3 py-1 text-[10px] font-semibold text-[var(--accent)] tracking-wider uppercase">
                  {post.department}
                </span>
                <span className="inline-flex items-center rounded-full bg-green-500/15 text-green-400 border border-green-500/20 px-2.5 py-0.5 text-[10px] font-medium tracking-wider uppercase">
                  {post.type}
                </span>
              </div>
            </Reveal>

            <Reveal delayMs={90}>
              <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-white">
                {post.title}
              </h1>
            </Reveal>

            <Reveal delayMs={120}>
              <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-white/60">
                <span>{post.location}</span>
                <span>{post.level}</span>
                {post.salary && <span>{post.salary}</span>}
                <span>Posted {post.posted}</span>
              </div>
            </Reveal>

            <Reveal delayMs={150}>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={`mailto:jobs@modulr.cloud?subject=Application: ${post.title}`}
                  className="inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-black transition hover:brightness-95 ring-premium"
                >
                  Apply Now
                </a>
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.03] px-6 py-3 text-sm font-semibold text-white/80 transition hover:bg-white/[0.06] hover:text-white ring-premium"
                >
                  Share Position
                </button>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Content */}
        <section className="border-b border-hairline">
          <div className="mx-auto max-w-4xl px-6 py-16 md:py-24">
            <div className="grid gap-12 md:grid-cols-3">
              {/* Main content */}
              <div className="md:col-span-2">
                <Reveal>
                  <h2 className="text-2xl font-semibold text-white mb-6">
                    About the Role
                  </h2>
                </Reveal>
                <Reveal delayMs={60}>
                  <div className="prose prose-invert prose-sm max-w-none">
                    <p className="text-white/70 leading-7">
                      {post.excerpt}
                    </p>
                    <p className="text-white/70 leading-7 mt-4">
                      At Modulr, we're building the open network for the robot economy. This role is critical to our mission of enabling real-time teleoperation of robotic systems anywhere in the world.
                    </p>

                    <h3 className="text-lg font-semibold text-white mt-8 mb-4">
                      What You'll Do
                    </h3>
                    <ul className="space-y-2 text-white/70">
                      <li>• Design and implement core systems for the Modulr Network</li>
                      <li>• Collaborate with cross-functional teams including robotics and blockchain engineers</li>
                      <li>• Write clean, maintainable, and well-tested code</li>
                      <li>• Participate in architecture discussions and code reviews</li>
                      <li>• Contribute to open-source projects when applicable</li>
                    </ul>

                    <h3 className="text-lg font-semibold text-white mt-8 mb-4">
                      What We're Looking For
                    </h3>
                    <ul className="space-y-2 text-white/70">
                      <li>• 3+ years of professional experience in a relevant field</li>
                      <li>• Strong problem-solving skills and attention to detail</li>
                      <li>• Excellent communication skills</li>
                      <li>• Passion for robotics, blockchain, or distributed systems</li>
                      <li>• Self-motivated with ability to work in a fast-paced environment</li>
                    </ul>

                    <h3 className="text-lg font-semibold text-white mt-8 mb-4">
                      Nice to Have
                    </h3>
                    <ul className="space-y-2 text-white/70">
                      <li>• Experience with real-time systems or low-latency applications</li>
                      <li>• Contributions to open-source projects</li>
                      <li>• Experience in startups or early-stage companies</li>
                    </ul>
                  </div>
                </Reveal>
              </div>

              {/* Sidebar */}
              <div className="md:col-span-1">
                <Reveal delayMs={80}>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sticky top-24">
                    <h3 className="text-sm font-semibold text-white mb-4">
                      Position Details
                    </h3>
                    <dl className="space-y-4 text-sm">
                      <div>
                        <dt className="text-white/40">Department</dt>
                        <dd className="text-white mt-1">{post.department}</dd>
                      </div>
                      <div>
                        <dt className="text-white/40">Location</dt>
                        <dd className="text-white mt-1">{post.location}</dd>
                      </div>
                      <div>
                        <dt className="text-white/40">Employment Type</dt>
                        <dd className="text-white mt-1">{post.type}</dd>
                      </div>
                      <div>
                        <dt className="text-white/40">Level</dt>
                        <dd className="text-white mt-1">{post.level}</dd>
                      </div>
                      {post.salary && (
                        <div>
                          <dt className="text-white/40">Compensation</dt>
                          <dd className="text-white mt-1">{post.salary}</dd>
                        </div>
                      )}
                    </dl>

                    <div className="mt-6 pt-6 border-t border-white/10">
                      <a
                        href={`mailto:modulr.cloud?subject=Application: ${post.title}`}
                        className="inline-flex w-full items-center justify-center rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-black transition hover:brightness-95 ring-premium"
                      >
                        Apply Now
                      </a>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
