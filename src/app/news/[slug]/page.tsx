import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Reveal } from "@/components/Reveal";
import { getNewsPost, type NewsPost } from "@/content/news";

function Pill({ children, variant }: { children: string; variant: "category" | "type" }) {
  return (
    <span
      className={
        variant === "category"
          ? "inline-flex items-center rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-3 py-1 text-xs font-medium text-[var(--accent)]"
          : "inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium text-white/70"
      }
    >
      {children}
    </span>
  );
}

function ArticleBody({ body }: { body: NewsPost["body"] }) {
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

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getNewsPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function NewsArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = getNewsPost(slug);
  if (!post) notFound();

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="pt-16 flex-1">
        {/* “Cinema” header */}
        <section className="relative">
          <Reveal>
            <div className="relative w-full h-[54vh] min-h-[420px] max-h-[720px] overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Dark overlay + film gradient */}
              <div className="absolute inset-0 bg-black/55" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                <div className="mx-auto max-w-6xl px-0">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <Pill variant="category">{post.category}</Pill>
                    <Pill variant="type">{post.type}</Pill>
                  </div>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-white max-w-4xl">
                    {post.title}
                  </h1>
                  <p className="mt-4 text-sm text-white/60">
                    {post.date} • {post.readingMinutes} min read
                  </p>
                </div>
              </div>

              {/* subtle vignette */}
              <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.75)]" />
            </div>
          </Reveal>
        </section>

        <section className="bg-section">
          <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
            <Reveal delayMs={120}>
              <p className="text-xl text-white/80 leading-relaxed mb-10 max-w-3xl">
                {post.excerpt}
              </p>
            </Reveal>

            <Reveal delayMs={160}>
              <div className="h-px w-full bg-white/10 mb-10" />
            </Reveal>

            <Reveal delayMs={200}>
              <ArticleBody body={post.body} />
            </Reveal>

            <Reveal delayMs={240}>
              <div className="mt-16 pt-8 border-t border-white/10">
                <Link
                  href="/news"
                  className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition ring-premium rounded"
                >
                  <span>←</span>
                  <span>Back to News</span>
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


