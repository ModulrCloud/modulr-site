import type { ReactNode } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { cn } from "@/lib/cn";

export function PageShell({
  title,
  subtitle,
  actions,
  children,
  className,
  compactHeader,
}: {
  title?: string;
  subtitle?: string;
  /** Rendered below the subtitle in the same header section (e.g. buttons) */
  actions?: ReactNode;
  children?: ReactNode;
  className?: string;
  /** When true, reduces bottom padding of the header for a tighter gap to the next section */
  compactHeader?: boolean;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className={cn("pt-16 flex-1", className)}>
        <section className="border-b border-hairline bg-section">
          <div
            className={cn(
              "mx-auto max-w-6xl px-6 pt-16 md:pt-20",
              compactHeader ? "pb-8 md:pb-12" : "pb-16 md:pb-20",
            )}
          >
            <h1 className="text-premium text-3xl font-semibold tracking-tight text-white sm:text-5xl">
              {title}
            </h1>
            {subtitle ? (
              <p className="mt-5 max-w-3xl text-base leading-7 text-muted">{subtitle}</p>
            ) : null}
            {actions ? (
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                {actions}
              </div>
            ) : null}
          </div>
        </section>

        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
