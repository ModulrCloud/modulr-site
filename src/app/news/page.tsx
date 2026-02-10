import { getCachedStoriesForNews } from "@/lib/roboticsFeeds";
import { NewsPageContent } from "@/app/news/NewsPageContent";

export default async function NewsPage() {
  const stories = await getCachedStoriesForNews();
  return <NewsPageContent stories={stories ?? undefined} />;
}
