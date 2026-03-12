import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { PointerGlow } from "@/components/PointerGlow";
import { CookieToast } from "@/components/CookieToast";

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
    default: "Modulr — The Open Network for Robotics, AI, Data, and Compute",
    template: "%s — Modulr",
  },
  description: "Powering the global robot economy.",
  metadataBase: new URL("https://www.modulr.cloud"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Modulr — The Open Network for Robotics, AI, Data, and Compute",
    description: "Powering the global robot economy.",
    type: "website",
    url: "https://www.modulr.cloud/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Modulr — The Open Network for Robotics, AI, Data, and Compute",
    description: "Powering the global robot economy.",
  },
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
  },
};

export const viewport: Viewport = {
  // Default theme is light; pages can still toggle via html[data-theme].
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-theme="light">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-white/15 selection:text-white`}
      >
        <PointerGlow />
        <div id="app-root">{children}</div>
        <CookieToast />
      </body>
    </html>
  );
}


