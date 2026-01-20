export type ResearchPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  tags: string[];
  readingMinutes: number;
  body: Array<
    | { kind: "p"; text: string }
    | { kind: "h2"; text: string }
    | { kind: "ul"; items: string[] }
    | { kind: "blockquote"; text: string }
  >;
};

export const researchPosts: ResearchPost[] = [
  {
    slug: "teleoperation-latency",
    title: "Teleoperation latency: what users perceive as “instant”",
    excerpt:
      "A practical look at end‑to‑end latency budgets for browser-based teleoperation and the UX thresholds that matter.",
    date: "Jan 2026",
    category: "Teleoperation",
    tags: ["Latency", "UX", "WebRTC"],
    readingMinutes: 6,
    body: [
      {
        kind: "p",
        text: "Remote control feels “real” only when latency stays below human perception thresholds. In practice, that depends on task type, camera motion, and control frequency.",
      },
      { kind: "h2", text: "What we measure" },
      {
        kind: "ul",
        items: [
          "Input → encode → transport → decode → render",
          "Control loop frequency and jitter",
          "Recovery behavior on packet loss",
        ],
      },
      {
        kind: "blockquote",
        text: "Low average latency isn’t enough—predictability (jitter) is what users feel.",
      },
    ],
  },
  {
    slug: "robot-marketplaces",
    title: "Market design for renting robots globally",
    excerpt:
      "Pricing, availability, trust, and dispute resolution for real-world work—how the marketplace needs to behave to scale.",
    date: "Jan 2026",
    category: "Marketplace",
    tags: ["Pricing", "Reputation", "Disputes"],
    readingMinutes: 5,
    body: [
      {
        kind: "p",
        text: "A robot marketplace is not an app store. Physical constraints, availability, and safety requirements shape everything.",
      },
      { kind: "h2", text: "What providers need" },
      {
        kind: "ul",
        items: ["Upfront pricing", "Clear scheduling", "Predictable payouts", "Abuse controls"],
      },
    ],
  },
  {
    slug: "modular-stack",
    title: "A modular robotics stack: robots, AI, data, compute",
    excerpt:
      "Why “plug-and-play” only works when interfaces are standardized—across robots, models, datasets, and compute targets.",
    date: "Dec 2025",
    category: "Architecture",
    tags: ["Modularity", "Interfaces", "Systems"],
    readingMinutes: 7,
    body: [
      {
        kind: "p",
        text: "Modularity is the only way to scale robotics: swap a robot, replace a model, or move compute to the edge without rewriting everything.",
      },
      { kind: "h2", text: "The key primitives" },
      {
        kind: "ul",
        items: ["Capability descriptors", "Deterministic execution envelopes", "Auditable telemetry"],
      },
    ],
  },
  {
    slug: "safety-boundaries",
    title: "Safety boundaries for remote operation",
    excerpt:
      "A safety-first approach to teleoperation: permissions, geofencing, rate limits, and operator accountability.",
    date: "Dec 2025",
    category: "Safety",
    tags: ["Safety", "Policy", "Controls"],
    readingMinutes: 8,
    body: [
      {
        kind: "p",
        text: "Teleoperation is powerful—and risky. Safety must be a product primitive, not a bolt-on.",
      },
      { kind: "h2", text: "Practical controls" },
      {
        kind: "ul",
        items: ["Hard limits", "Emergency stops", "Audit trails", "Operator verification (optional)"],
      },
    ],
  },
];

export const researchCategories = ["All", ...Array.from(new Set(researchPosts.map((p) => p.category)))];

export function getResearchPost(slug: string) {
  return researchPosts.find((p) => p.slug === slug);
}




