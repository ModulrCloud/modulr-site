"use client";

import Image from "next/image";
import { cn } from "@/lib/cn";
import { MODULR_ASSETS } from "@/config/assets";

const sizeConfig = {
  default: { height: 28, width: 140, className: "h-7 w-auto" },
  large: { height: 64, width: 280, className: "h-16 w-auto" },
  xl: { height: 96, width: 400, className: "h-24 w-auto" },
  footer: { height: 28, width: 140, className: "h-7 w-auto" },
};

export function ModulrLogo({
  className,
  wordmark = false,
  variant = "mark",
  size = "default",
}: {
  className?: string;
  wordmark?: boolean;
  variant?: "mark" | "footer";
  size?: "default" | "large" | "xl";
}) {
  const src =
    variant === "footer"
      ? MODULR_ASSETS.LOGO_FOOTER
      : variant === "mark" && size === "xl"
        ? MODULR_ASSETS.LOGO_HERO
        : MODULR_ASSETS.LOGO_MARK;
  const config = variant === "footer" ? sizeConfig.footer : sizeConfig[size];

  return (
    <div className={cn("inline-flex items-center gap-2", className)}>
      <Image
        src={src}
        alt="Modulr"
        width={config.width}
        height={config.height}
        className={cn("object-contain", config.className)}
        priority
        unoptimized
      />
      {wordmark && (
        <span className="text-sm font-semibold tracking-[0.26em] uppercase text-white/85">
          Modulr
        </span>
      )}
    </div>
  );
}


