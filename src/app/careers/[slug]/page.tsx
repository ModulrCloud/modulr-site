import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { careerPosts } from "@/content/careers";
import { CareerPostClient } from "./CareerPostClient";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = careerPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function CareerPostPage({ params }: Props) {
  const { slug } = await params;
  const post = careerPosts.find((p) => p.slug === slug);
  if (!post) notFound();
  return <CareerPostClient post={post} />;
}
