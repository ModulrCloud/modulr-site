import { getCachedStories } from "@/lib/roboticsFeeds";
import { NewsPageContent } from "@/app/news/NewsPageContent";

export default async function NewsPage() {
  const stories = await getCachedStories();
  return <NewsPageContent stories={stories ?? undefined} />;
}
