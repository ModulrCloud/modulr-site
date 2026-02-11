import type { Metadata } from "next";
import { getCachedStoriesForNews } from "@/lib/roboticsFeeds";
import { NewsPageContent } from "@/app/news/NewsPageContent";

export const metadata: Metadata = {
  title: "News",
  description:
    "Stay up to date with the latest stories in robotics & AI.",
};

export default async function NewsPage() {
  const stories = await getCachedStoriesForNews();
  return <NewsPageContent stories={stories ?? undefined} />;
}
