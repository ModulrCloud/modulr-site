import { NextResponse } from "next/server";
import { getCachedStoriesForNews } from "@/lib/roboticsFeeds";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const limitParam = searchParams.get("limit");
  const limit = Math.max(1, Math.min(20, Number(limitParam ?? "10") || 10));

  const stories = await getCachedStoriesForNews();
  const sliced = (stories ?? []).slice(0, limit);

  return NextResponse.json({ stories: sliced }, { status: 200 });
}

