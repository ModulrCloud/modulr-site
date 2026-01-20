export type NewsPost = {
  slug: string;
  category: string;
  type: string;
  date: string;
  readingMinutes: number;
  title: string;
  excerpt: string;
  image: string;
  body: Array<
    | { kind: "p"; text: string }
    | { kind: "h2"; text: string }
    | { kind: "ul"; items: string[] }
    | { kind: "blockquote"; text: string }
  >;
};

export const newsPosts: NewsPost[] = [
  {
    slug: "product-demo",
    category: "Product",
    type: "Announcement",
    date: "Jan 2026",
    readingMinutes: 2,
    title: "Product demo: a glimpse at real-time teleoperation",
    excerpt:
      "See how near‑real‑time control feels in the browser—plus what’s coming next for providers and operators.",
    image:
      "https://ton.org/images/home-page/builder-success/notcoin-1.jpg",
    body: [
      { kind: "p", text: "Modulr is built for real-world control. The demo focuses on latency, safety controls, and operator UX." },
      { kind: "h2", text: "What you’ll see" },
      { kind: "ul", items: ["Browser-first teleoperation", "Near-zero perceived latency", "Session pricing upfront"] },
    ],
  },
  {
    slug: "providers",
    category: "Marketplace",
    type: "Update",
    date: "Jan 2026",
    readingMinutes: 3,
    title: "Providers: earn from idle robots with Modulr",
    excerpt:
      "Turn downtime into revenue by listing robots, compute, or AI modules—set pricing, availability, and constraints.",
    image:
      "https://ton.org/images/feature-cards/community.jpg",
    body: [
      { kind: "p", text: "Providers control pricing and availability. Users see costs before starting a session—no surprises." },
      { kind: "blockquote", text: "Make idle robots discoverable, rentable, and operable from anywhere." },
    ],
  },
  {
    slug: "pricing",
    category: "Billing",
    type: "Deep dive",
    date: "Dec 2025",
    readingMinutes: 4,
    title: "Pricing & billing: usage-based, upfront, transparent",
    excerpt:
      "How Modulr pricing works, why we keep it clear in local fiat currencies, and what providers can customize.",
    image:
      "https://ton.org/images/wallet-features/own-your-play.jpg",
    body: [
      { kind: "p", text: "Users always see estimated costs before sessions begin. Providers set marketplace pricing." },
      { kind: "h2", text: "No blind spending" },
      { kind: "p", text: "Consumption is deducted from existing balance, giving users full control." },
    ],
  },
];

export function getNewsPost(slug: string) {
  return newsPosts.find((p) => p.slug === slug);
}


