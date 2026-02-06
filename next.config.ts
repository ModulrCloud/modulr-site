import type { NextConfig } from "next";
import { fileURLToPath } from "url";

// Use config file location, not process.cwd(), because Next/Turbopack may infer a
// parent workspace root when multiple lockfiles exist.
const turbopackRoot = fileURLToPath(new URL(".", import.meta.url));

const nextConfig: NextConfig = {
  // Prevent Next/Turbopack from inferring a parent workspace root (monorepo-like)
  // and accidentally picking up sibling `middleware.ts`, lockfiles, etc.
  turbopack: {
    root: turbopackRoot,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.prod.website-files.com",
        port: "",
        pathname: "/**",
      },
      // RSS feed article images (proxied so they load despite hotlinking blocks)
      { protocol: "https", hostname: "www.therobotreport.com", port: "", pathname: "/**" },
      { protocol: "https", hostname: "spectrum.ieee.org", port: "", pathname: "/**" },
      { protocol: "https", hostname: "robohub.org", port: "", pathname: "/**" },
    ],
  },
};

export default nextConfig;


