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
    name: "Company 1",
    logo: "https://cdn.brandfetch.io/idtu7CFTG5/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1764834273757",
  },
  {
    name: "Company 2",
    logo: "https://cdn.brandfetch.io/id6O2oGzv-/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1731911497387",
  },
  {
    name: "Company 3",
    logo: "https://cdn.brandfetch.io/idkFvHPM3p/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1757914702922",
  },
  {
    name: "Company 4",
    logo: "https://cdn.brandfetch.io/idchmboHEZ/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1727706672983",
  },
  {
    name: "Unitree",
    logo: "https://cdn.brandfetch.io/idR3duQxYl/theme/light/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1741166761598",
  },
  {
    name: "Company 6",
    logo: "https://cdn.brandfetch.io/idawOgYOsG/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1747149760488",
  },
  {
    name: "ANYbotics",
    logo: "https://cdn.brandfetch.io/id2S-kXbuK/theme/light/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1725611837013",
  },
  {
    name: "Company 8",
    logo: "https://cdn.brandfetch.io/idXoj5DuCE/theme/light/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1725526926970",
  },
  {
    name: "Company 9",
    logo: "https://cdn.brandfetch.io/idVm7L6xsv/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1767011211796",
  },
  {
    name: "Company 10",
    logo: "https://cdn.brandfetch.io/idDaJOFWN6/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1766819573685",
  },
];

export function TrustedByMarquee({ className }: { className?: string }) {
  // Triple the list for seamless loop
  const list = [...companies, ...companies, ...companies];

  return (
    <section className={cn("border-t border-b border-hairline bg-black overflow-hidden", className)}>
      <div className="mx-auto max-w-7xl px-6 py-5">
        <div className="flex items-center gap-3 text-xs tracking-[0.22em] uppercase text-white/45">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]/80 shadow-[0_0_14px_rgba(242,180,0,0.35)]" />
          Trusted By
        </div>
      </div>

      {/* Full-width marquee */}
      <div className="relative pb-6">
        {/* Fade masks */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-black to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-black to-transparent" />

        <div className="flex w-max animate-marquee-slow items-center gap-14 py-3">
          {list.map((company, i) => (
            <div
              key={`${company.name}-${i}`}
              className="flex items-center opacity-50 hover:opacity-90 transition-opacity duration-300"
              title={company.name}
            >
              <img
                src={company.logo}
                alt={company.name}
                className="h-5 w-auto object-contain"
                style={{
                  filter: "brightness(0) invert(1)",
                }}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
