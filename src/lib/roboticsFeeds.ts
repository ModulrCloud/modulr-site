import { unstable_cache } from "next/cache";

export type RoboticsStoryCard = {
  href: string;
  title: string;
  meta: string; // e.g. "IEEE Spectrum • 2 days ago"
  image: string; // external url or proxied url
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

const ALLOWED_IMAGE_HOSTS = new Set([
  "www.therobotreport.com",
  "therobotreport.com",
  "spectrum.ieee.org",
  "robohub.org",
  "i0.wp.com",
  "i1.wp.com",
  "i2.wp.com",
  "c0.wp.com",
  "c1.wp.com",
  "c2.wp.com",
  "secure.gravatar.com",
  "www.gravatar.com",
  // always ok (already in next.config remotePatterns)
  "images.unsplash.com",
]);

function stripHtml(s: string) {
  return s.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}

function decodeEntities(s: string) {
  // minimal decode good enough for feed titles; avoids pulling a dependency
  return s
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ");
}

function getTag(itemXml: string, tag: string): string | undefined {
  const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i");
  const m = itemXml.match(re);
  if (!m?.[1]) return undefined;
  return m[1].trim();
}

function getAttr(xml: string, tag: string, attr: string): string | undefined {
  const re = new RegExp(`<${tag}[^>]*\\b${attr}=["']([^"']+)["'][^>]*\\/?>`, "i");
  const m = xml.match(re);
  return m?.[1]?.trim();
}

function resolveUrl(base: string, maybeRelative: string): string {
  try {
    if (maybeRelative.startsWith("http://") || maybeRelative.startsWith("https://")) return maybeRelative;
    return new URL(maybeRelative, base).href;
  } catch {
    return maybeRelative;
  }
}

function isAbsUrl(u: string | undefined): u is string {
  if (!u) return false;
  const t = u.trim();
  return (t.startsWith("http://") || t.startsWith("https://")) && t.length > 10;
}

function imageFromItem(itemXml: string, fallback: string, link?: string): string {
  const base = link ?? "https://example.com";

  // enclosure url
  const encUrl = getAttr(itemXml, "enclosure", "url");
  if (isAbsUrl(encUrl) && /\.(png|jpe?g|webp|gif)(\\?|$)/i.test(encUrl)) return resolveUrl(base, encUrl);

  // media:content / media:thumbnail
  const mediaUrl =
    getAttr(itemXml, "media:content", "url") ??
    getAttr(itemXml, "media:thumbnail", "url");
  if (isAbsUrl(mediaUrl)) return resolveUrl(base, mediaUrl);

  // first <img src=...> in description / content:encoded
  const raw =
    getTag(itemXml, "content:encoded") ??
    getTag(itemXml, "description") ??
    "";
  const imgMatch = raw.match(/<img[^>]+(?:src|data-src)=["']([^"']+)["']/i);
  if (imgMatch?.[1]) {
    const u = resolveUrl(base, imgMatch[1]);
    if (isAbsUrl(u)) return u;
  }

  return fallback;
}

function sanitizeImageUrl(url: string, fallback: string): string {
  if (!isAbsUrl(url)) return fallback;
  try {
    const host = new URL(url).hostname;
    if (ALLOWED_IMAGE_HOSTS.has(host)) return url;
    return fallback;
  } catch {
    return fallback;
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

function formatMeta(source: string, dateStr?: string): string {
  if (!dateStr) return source;
  try {
    return `${source} • ${getRelativeTime(new Date(dateStr))}`;
  } catch {
    return source;
  }
}

function parseRssItems(xml: string): string[] {
  // keep it simple; good enough for the selected feeds
  const items: string[] = [];
  const re = /<item\b[^>]*>([\s\S]*?)<\/item>/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(xml))) {
    if (m[1]) items.push(m[1]);
    if (items.length > 12) break;
  }
  return items;
}

export function proxyImageUrl(externalUrl: string): string {
  return `/api/proxy-image?url=${encodeURIComponent(externalUrl)}`;
}

export async function fetchRoboticsStories(limit = 6): Promise<RoboticsStoryCard[]> {
  const all: { href: string; title: string; pubDate?: string; image: string; source: string }[] = [];

  for (const feed of FEEDS) {
    try {
      const res = await fetch(feed.url, {
        // keep runtime compatible; caching handled by unstable_cache wrappers
        headers: { "User-Agent": "Modulr-Site/1.0 (Robotics News Aggregator)" },
      });
      const xml = await res.text();
      const items = parseRssItems(xml);

      for (const itemXml of items) {
        const titleRaw = getTag(itemXml, "title");
        const linkRaw = getTag(itemXml, "link");
        if (!titleRaw || !linkRaw) continue;

        const href = stripHtml(decodeEntities(linkRaw));
        const title = stripHtml(decodeEntities(titleRaw));
        const pubDate = getTag(itemXml, "pubDate");
        const image = sanitizeImageUrl(
          imageFromItem(itemXml, feed.fallbackImage, href),
          feed.fallbackImage,
        );

        all.push({ href, title, pubDate, image, source: feed.name });
      }
    } catch (err) {
      console.warn(`[roboticsFeeds] Failed to fetch ${feed.name}:`, err);
    }
  }

  all.sort((a, b) => {
    const da = a.pubDate ? new Date(a.pubDate).getTime() : 0;
    const db = b.pubDate ? new Date(b.pubDate).getTime() : 0;
    return db - da;
  });

  return all.slice(0, limit).map((s, i) => ({
    href: s.href,
    title: s.title,
    meta: formatMeta(s.source, s.pubDate),
    image: s.image,
    featured: i === 0,
  }));
}

export const getCachedStoriesForNews = unstable_cache(
  async () => {
    try {
      return await fetchRoboticsStories(10);
    } catch {
      return undefined;
    }
  },
  ["robotics-stories-news-lite-v1"],
  { revalidate: 60 * 60 * 12 },
);

