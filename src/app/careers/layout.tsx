import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Help us build the future of robotics. We're looking for talented individuals to join our mission.",
};

export default function CareersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
