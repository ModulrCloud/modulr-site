"use client";

import { cn } from "@/lib/cn";
import { MODULR_ASSETS } from "@/config/assets";

export function ModulrLogo({
  className,
  wordmark = false,
  variant = "mark",
}: {
  className?: string;
  wordmark?: boolean;
  variant?: "mark" | "footer";
}) {
  const src = variant === "footer" ? MODULR_ASSETS.LOGO_FOOTER : MODULR_ASSETS.LOGO_MARK;

  return (
    <div className={cn("inline-flex items-center gap-2", className)}>
      <img
        src={src}
        alt="Modulr"
        className={cn(
          "object-contain",
          variant === "footer" ? "h-7 w-auto" : "h-7 w-auto max-w-[140px]",
        )}
        loading="eager"
      />
      {wordmark ? (
        <span className="text-sm font-semibold tracking-[0.26em] uppercase text-white/85">
          Modulr
        </span>
      ) : null}
    </div>
  );
}


