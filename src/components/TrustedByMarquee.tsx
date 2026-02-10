"use client";

import { cn } from "@/lib/cn";

/**
 * Trusted By marquee with real company logos from Brandfetch
 */

type Company = {
  name: string;
  logo: string;
};

const companies: Company[] = [
  {
    name: "IRYS",
    logo: "https://cdn.brandfetch.io/idkFvHPM3p/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1757914702922",
  },
  {
    name: "Inflectiv AI",
    logo: "/trusted-inflectiv-ai.png",
  },
  {
    name: "NVIDIA Inception",
    logo: "https://cdn.brandfetch.io/idXoj5DuCE/theme/light/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1725526926970",
  },
  {
    name: "RoboX",
    logo: "/robox-logo-white.png",
  },
  /*{
    name: "Oxford University",
    logo: "https://cdn.brandfetch.io/idkDJyXvmW/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1719305229674",
  },*/
  {
    name: "Paal AI",
    logo: "./paal-ai-logo.webp",
  },
];

export function TrustedByMarquee({ className }: { className?: string }) {
  return (
    <section className={cn("border-t border-b border-hairline bg-black overflow-hidden", className)}>
      <div className="mx-auto max-w-7xl px-6 py-5">
        <div className="flex items-center gap-3 text-xs tracking-[0.22em] uppercase text-white/45">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]/80 shadow-[0_0_14px_rgba(242,180,0,0.35)]" />
          Trusted By
        </div>
      </div>

      <div className="relative pb-6">
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-black to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-black to-transparent" />

        <div className="flex animate-marquee-slow py-3">
          {[0, 1].map((setIndex) => (
            <div key={setIndex} className="flex shrink-0 items-center gap-20 px-10">
              {companies.map((company, i) => (
                <div
                  key={`${setIndex}-${i}`}
                  className="flex shrink-0 items-center opacity-50 hover:opacity-90 transition-opacity"
                  title={company.name}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="h-5 w-auto min-w-[120px] object-contain"
                    style={{ filter: "brightness(0) invert(1)" }}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
