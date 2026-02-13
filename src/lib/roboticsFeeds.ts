import Parser from "rss-parser";
import { unstable_cache } from "next/cache";

export type RoboticsStoryCard = {
  href: string;
  title: string;
  meta: string;
  image: string;
  featured?: boolean;
};

const FEEDS: { url: string; name: string; fallbackImage: string }[] = [
  {
    url: "https://www.therobotreport.com/feed/",
    name: "The Robot Report",
    fallbackImage: "https://images.unsplash.com/photo-1561557944-6e7860d2c758?w=800&h=500&fit=crop",
  },
  {
    url: "https://spectrum.ieee.org/rss/robotics/fulltext",
    name: "IEEE Spectrum",
    fallbackImage: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=500&fit=crop",
  },
  {
    url: "https://robohub.org/feed/",
    name: "Robohub",
    fallbackImage: "https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=800&h=500&fit=crop",
  },
];

const parser = new Parser({
  timeout: 10000,
  headers: {
    "User-Agent": "Modulr-Site/1.0 (Robotics News Aggregator)",
  },
  customFields: {
    item: [
      ["media:content", "media:content", { keepArray: true }],
      ["media:thumbnail", "media:thumbnail", { keepArray: true }],
      ["content:encoded", "content:encoded"],
      ["description", "description"],
    ],
  },
});

function isAbsoluteImageUrl(url: string): boolean {
  if (!url || typeof url !== "string") return false;
  const t = url.trim();
  return (t.startsWith("http://") || t.startsWith("https://")) && t.length > 10;
}

function resolveUrl(baseUrl: string, relative: string): string {
  try {
    if (relative.startsWith("http://") || relative.startsWith("https://")) return relative;
    const base = new URL(baseUrl);
    return new URL(relative, base.origin).href;
  } catch {
    return relative;
  }
}

function getImageFromItem(item: Parser.Item, fallback: string, itemLink?: string): string {
  const base = itemLink ?? item.link ?? "https://example.com";

  // 1. Enclosure (often used for featured image)
  const enclosure = item.enclosure;
  if (enclosure?.url) {
    const type = (enclosure as { type?: string }).type ?? "";
    const isImage =
      type.startsWith("image/") || /\.(jpg|jpeg|png|webp|gif)(\?|$)/i.test(enclosure.url);
    if (isImage) {
      const url = resolveUrl(base, enclosure.url);
      if (isAbsoluteImageUrl(url)) return url;
    }
  }

  // 2. Media RSS (media:content, media:thumbnail)
  const itemAny = item as Record<string, unknown>;
  const mediaContent = itemAny["media:content"];
  const mediaThumb = itemAny["media:thumbnail"];
  const media = Array.isArray(mediaContent) ? mediaContent[0] : mediaContent ?? mediaThumb;
  const mediaUrl =
    media && typeof media === "object" && media !== null && "$" in media
      ? (media as { $?: { url?: string } }).$?.url
      : undefined;
  if (mediaUrl) {
    const url = resolveUrl(base, mediaUrl);
    if (isAbsoluteImageUrl(url)) return url;
  }

  // 3. WordPress / Yoast featured image (first img in full HTML – prefer content:encoded over short content)
  const rawContent =
    itemAny["content:encoded"] ??
    itemAny["description"] ??
    item.content ??
    item.contentSnippet ??
    "";
  const content = typeof rawContent === "string" ? rawContent : "";
  const imgRegex = /<img[^>]+(?:src|data-src)=["']([^"']+)["']/i;
  const imgMatch = content.match(imgRegex);
  if (imgMatch && imgMatch[1]) {
    const url = resolveUrl(base, imgMatch[1]);
    if (isAbsoluteImageUrl(url)) return url;
  }

  // 4. Fallback: always return a valid image so the card is never blank
  return fallback;
}

function formatMeta(source: string, dateStr?: string): string {
  if (!dateStr) return source;
  try {
    const d = new Date(dateStr);
    const relative = getRelativeTime(d);
    return `${source} • ${relative}`;
  } catch {
    return source;
  }
}

function getRelativeTime(d: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} wk ago`;
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

/** Fetch RSS XML with no caching so feeds always can update (avoids Next.js and any HTTP cache). */
async function fetchFeedXml(url: string): Promise<string> {
  const res = await fetch(url, {
    cache: "no-store",
    headers: {
      "User-Agent": "Modulr-Site/1.0 (Robotics News Aggregator)",
      Accept: "application/rss+xml, application/xml, text/xml",
    },
    next: { revalidate: 0 },
  });
  if (!res.ok) throw new Error(`Feed ${url} returned ${res.status}`);
  return res.text();
}

export async function fetchRoboticsStories(limit = 3): Promise<RoboticsStoryCard[]> {
  const all: { item: Parser.Item; source: string; fallbackImage: string }[] = [];

  for (const feed of FEEDS) {
    try {
      const xml = await fetchFeedXml(feed.url);
      const result = await parser.parseString(xml);
      const items = (result.items ?? []).slice(0, 5);
      for (const item of items) {
        if (item.link && item.title) {
          all.push({
            item,
            source: feed.name,
            fallbackImage: feed.fallbackImage,
          });
        }
      }
    } catch (err) {
      console.warn(`[roboticsFeeds] Failed to fetch ${feed.name}:`, err);
    }
  }

  all.sort((a, b) => {
    const dateA = a.item.pubDate ? new Date(a.item.pubDate).getTime() : 0;
    const dateB = b.item.pubDate ? new Date(b.item.pubDate).getTime() : 0;
    return dateB - dateA;
  });

  // Use actual article images from the feed; fall back to feed fallback only when extraction fails.
  // Next.js Image (with remotePatterns) will proxy these server-side so hotlinking blocks are avoided.
  return all.slice(0, limit).map(({ item, source, fallbackImage }, i) => ({
    href: item.link!,
    title: item.title!.replace(/<[^>]+>/g, "").trim(),
    meta: formatMeta(source, item.pubDate),
    image: getImageFromItem(item, fallbackImage, item.link),
    featured: i === 0,
  }));
}

/** Production cache: 6 hours so feed updates without hammering RSS sources. */
const REVALIDATE_SECONDS = 6 * 60 * 60; // 6 hours

const getCachedStoriesImpl = unstable_cache(
  async () => {
    try {
      return await fetchRoboticsStories(3);
    } catch {
      return undefined;
    }
  },
  ["robotics-stories-v4"],
  { revalidate: REVALIDATE_SECONDS },
);

const getCachedStoriesForNewsImpl = unstable_cache(
  async () => {
    try {
      return await fetchRoboticsStories(10);
    } catch {
      return undefined;
    }
  },
  ["robotics-stories-news-v4"],
  { revalidate: REVALIDATE_SECONDS },
);

/** Cached stories for homepage (e.g. StoriesSection). In dev, bypasses cache so stories update every load. */
export async function getCachedStories() {
  if (process.env.NODE_ENV === "development") {
    try {
      return await fetchRoboticsStories(3);
    } catch {
      return undefined;
    }
  }
  return getCachedStoriesImpl();
}

/** Cached stories for News page: 10 total (1 featured + 9 in Latest rail). In dev, bypasses cache so stories update every load. */
export async function getCachedStoriesForNews() {
  if (process.env.NODE_ENV === "development") {
    try {
      return await fetchRoboticsStories(10);
    } catch {
      return undefined;
    }
  }
  return getCachedStoriesForNewsImpl();
}

/** Proxied image URL so external feed images load (avoids hotlinking blocks). */
export function proxyImageUrl(externalUrl: string): string {
  return `/api/proxy-image?url=${encodeURIComponent(externalUrl)}`;
}
