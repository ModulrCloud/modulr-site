"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

type Props = {
  src: string;
  alt: string;
  className?: string;
  fallbackClassName?: string;
};

export function SmartImage({ src, alt, className, fallbackClassName }: Props) {
  const [broken, setBroken] = useState(false);

  if (broken || !src) {
    return (
      <div
        className={cn(
          "h-full w-full bg-[radial-gradient(900px_420px_at_80%_25%,rgba(242,180,0,0.10),transparent_60%),linear-gradient(180deg,rgba(255,255,255,0.05),rgba(0,0,0,0.1))]",
          fallbackClassName,
        )}
        aria-hidden="true"
      />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={className}
      onError={() => setBroken(true)}
    />
  );
}




