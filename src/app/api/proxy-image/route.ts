import { NextRequest, NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";

const ALLOWED_HOSTS = [
  "www.therobotreport.com",
  "therobotreport.com",
  "spectrum.ieee.org",
  "robohub.org",
  // Common WordPress image CDNs used by feeds
  "i0.wp.com",
  "i1.wp.com",
  "i2.wp.com",
  "c0.wp.com",
  "c1.wp.com",
  "c2.wp.com",
  "secure.gravatar.com",
  "www.gravatar.com",
];

let fallbackBytesPromise: Promise<Uint8Array> | null = null;
async function getFallbackBytes() {
  if (!fallbackBytesPromise) {
    fallbackBytesPromise = fs.readFile(path.join(process.cwd(), "public", "drones.png"));
  }
  return fallbackBytesPromise;
}

async function fallbackImage() {
  try {
    const bytes = await getFallbackBytes();
    // Ensure we hand NextResponse a plain ArrayBuffer (not SharedArrayBuffer).
    const ab = Uint8Array.from(bytes).buffer;
    return new NextResponse(ab, {
      status: 200,
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=86400, s-maxage=86400",
      },
    });
  } catch {
    // last-resort: 1x1 transparent GIF
    const gif = Buffer.from("R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==", "base64");
    const ab = Uint8Array.from(gif).buffer;
    return new NextResponse(ab, {
      status: 200,
      headers: {
        "Content-Type": "image/gif",
        "Cache-Control": "public, max-age=86400, s-maxage=86400",
      },
    });
  }
}

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");
  if (!url || typeof url !== "string") {
    return await fallbackImage();
  }

  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return await fallbackImage();
  }

  if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
    return await fallbackImage();
  }

  if (!ALLOWED_HOSTS.includes(parsed.hostname)) {
    // Keep SSRF-safe, but don't break UI: return a premium fallback image.
    return await fallbackImage();
  }

  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; Modulr-Site/1.0; +https://modulr.cloud)",
        Accept: "image/*",
      },
      next: { revalidate: 86400 },
    });

    if (!res.ok) {
      return await fallbackImage();
    }

    const contentType = res.headers.get("content-type") || "image/jpeg";
    const body = res.body;

    if (!body) {
      return await fallbackImage();
    }

    return new NextResponse(body, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400, s-maxage=86400",
      },
    });
  } catch (e) {
    console.warn("[proxy-image]", url, e);
    return await fallbackImage();
  }
}

