import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Explore our latest research, whitepapers, and technical documentation on robotics, AI, and decentralized systems.",
};

export default function ResearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
