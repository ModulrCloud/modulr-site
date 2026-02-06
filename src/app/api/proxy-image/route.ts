import { NextRequest, NextResponse } from "next/server";

const ALLOWED_HOSTS = [
  "www.therobotreport.com",
  "therobotreport.com",
  "spectrum.ieee.org",
  "robohub.org",
];

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");
  if (!url || typeof url !== "string") {
    return NextResponse.json({ error: "Missing url" }, { status: 400 });
  }

  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return NextResponse.json({ error: "Invalid url" }, { status: 400 });
  }

  if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
    return NextResponse.json({ error: "Invalid protocol" }, { status: 400 });
  }

  if (!ALLOWED_HOSTS.includes(parsed.hostname)) {
    return NextResponse.json({ error: "Host not allowed" }, { status: 403 });
  }

  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; Modulr-Site/1.0; +https://modulr.cloud)",
        Accept: "image/*",
      },
      next: { revalidate: 86400 },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `Upstream returned ${res.status}` },
        { status: res.status === 404 ? 404 : 502 },
      );
    }

    const contentType =
      res.headers.get("content-type") || "image/jpeg";
    const body = res.body;

    if (!body) {
      return NextResponse.json({ error: "No body" }, { status: 502 });
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
    return NextResponse.json(
      { error: "Failed to fetch image" },
      { status: 502 },
    );
  }
}
