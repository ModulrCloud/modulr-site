import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Reveal } from "@/components/Reveal";
import { getResearchPost } from "@/content/research";

function Pill({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium text-white/70">
      {children}
    </span>
  );
}

type ResearchPostResolved = NonNullable<ReturnType<typeof getResearchPost>>;

function Body({ body }: { body: ResearchPostResolved["body"] }) {
  if (!body) return null;
  return (
    <div className="prose prose-invert prose-lg max-w-none">
      {body.map((block, i) => {
        switch (block.kind) {
          case "p":
            return (
              <p key={i} className="text-white/70 leading-relaxed mb-6">
                {block.text}
              </p>
            );
          case "h2":
            return (
              <h2 key={i} className="text-2xl font-semibold text-white mt-10 mb-4">
                {block.text}
              </h2>
            );
          case "ul":
            return (
              <ul key={i} className="list-disc pl-6 space-y-2 mb-6 text-white/70">
                {block.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            );
          case "blockquote":
            return (
              <blockquote
                key={i}
                className="border-l-2 border-[var(--accent)] pl-6 py-2 my-8 text-xl text-white/80 italic"
              >
                {block.text}
              </blockquote>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}

export default async function ResearchArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getResearchPost(slug);
  if (!post) notFound();

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="pt-16 flex-1">
        <section className="border-b border-hairline bg-section">
          <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
            <Reveal>
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/20 px-3 py-1 text-[10px] font-semibold text-[var(--accent)] tracking-wider uppercase">
                  {post.category}
                </span>
                {post.tags.slice(0, 3).map((t) => (
                  <Pill key={t}>{t}</Pill>
                ))}
              </div>
            </Reveal>
            <Reveal delayMs={60}>
              <h1 className="mt-5 text-premium text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                {post.title}
              </h1>
            </Reveal>
            <Reveal delayMs={120}>
              <p className="mt-5 max-w-3xl text-base leading-7 text-muted">
                {post.excerpt}
              </p>
            </Reveal>
            <Reveal delayMs={160}>
              <div className="mt-6 text-sm text-white/50">
                {post.date} • {post.readingMinutes} min read
              </div>
            </Reveal>
          </div>
        </section>

        <section className="bg-section">
          <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
            <Reveal delayMs={140}>
              <Body body={post.body} />
            </Reveal>
            <Reveal delayMs={220}>
              <div className="mt-14 pt-8 border-t border-hairline">
                <Link
                  href="/research"
                  className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition ring-premium rounded"
                >
                  <span>←</span>
                  <span>Back to Research</span>
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}


