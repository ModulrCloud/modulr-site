import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { PointerGlow } from "@/components/PointerGlow";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Modulr - Robot Operation, at Scale",
    template: "Modulr - %s",
  },
  description: "A real-time teleoperation platform built for enterprise performance and an open network economy—connecting robots, AI, data, and compute.",
  metadataBase: new URL("https://www.modulr.cloud"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Modulr - Robot Operation, at Scale",
    description: "A real-time teleoperation platform built for enterprise performance and an open network economy—connecting robots, AI, data, and compute.",
    type: "website",
    url: "https://www.modulr.cloud/",
    siteName: "Modulr",
    images: [
      {
        url: "/Modulr_Social_Preview.png",
        width: 1200,
        height: 630,
        alt: "Modulr - Robot Operation, at Scale",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Modulr - Robot Operation, at Scale",
    description: "A real-time teleoperation platform built for enterprise performance and an open network economy—connecting robots, AI, data, and compute.",
    images: ["/Modulr_Social_Preview.png"],
  },
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#050506",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-white/15 selection:text-white`}
      >
        <PointerGlow />
        <div id="app-root">{children}</div>
      </body>
    </html>
  );
}


