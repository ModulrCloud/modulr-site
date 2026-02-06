"use client";

import { useState, useCallback, useEffect } from "react";
import { cn } from "@/lib/cn";

export type AppGalleryItem = { src: string; alt: string };

const GALLERY_ITEMS: AppGalleryItem[] = [
  { src: "/app-gallery/3-teleop-control.png", alt: "Live teleoperation with movement control" },
  { src: "/app-gallery/2-robot-detail.png", alt: "Robot detail and configuration" },
  { src: "/app-gallery/5-partner-dashboard.png", alt: "Partner dashboard and earnings" },
  { src: "/app-gallery/1-stats-sessions.png", alt: "Your stats and recent sessions" },
  { src: "/app-gallery/4-connection-diagnostic.png", alt: "Connection diagnostic settings" },
];

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path d="M18 6 6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronLeftIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8" aria-hidden="true">
      <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8" aria-hidden="true">
      <path d="m9 18 6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function AppGallery() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const goPrev = useCallback(() => {
    setOpenIndex((i) => (i === null ? null : i === 0 ? GALLERY_ITEMS.length - 1 : i - 1));
  }, []);
  const goNext = useCallback(() => {
    setOpenIndex((i) => (i === null ? null : (i + 1) % GALLERY_ITEMS.length));
  }, []);
  const close = useCallback(() => setOpenIndex(null), []);

  useEffect(() => {
    if (openIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [openIndex, close, goPrev, goNext]);

  return (
    <>
      <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
        {GALLERY_ITEMS.map((item, i) => (
          <button
            key={item.src}
            type="button"
            onClick={() => setOpenIndex(i)}
            className="group relative aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] text-left transition hover:border-white/20 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 focus:ring-offset-[var(--bg)]"
          >
            <img
              src={item.src}
              alt={item.alt}
              className="h-full w-full object-cover object-top transition group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/5" />
          </button>
        ))}
      </div>

      {openIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4"
          onClick={(e) => e.target === e.currentTarget && close()}
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
        >
          <button
            type="button"
            onClick={close}
            className="absolute left-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
            aria-label="Close"
          >
            <CloseIcon />
          </button>

          {GALLERY_ITEMS.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); goPrev(); }}
                className="absolute left-2 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] sm:left-4"
                aria-label="Previous image"
              >
                <ChevronLeftIcon />
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); goNext(); }}
                className="absolute right-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                aria-label="Next image"
              >
                <ChevronRightIcon />
              </button>
            </>
          )}

          <div
            className="flex max-h-full max-w-full items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={GALLERY_ITEMS[openIndex].src}
              alt={GALLERY_ITEMS[openIndex].alt}
              className="max-h-[90vh] max-w-full object-contain"
            />
          </div>

          {GALLERY_ITEMS.length > 1 && (
            <div className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 text-xs text-white/60">
              {openIndex + 1} / {GALLERY_ITEMS.length}
            </div>
          )}
        </div>
      )}
    </>
  );
}
