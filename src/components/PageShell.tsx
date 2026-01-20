import type { ReactNode } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { cn } from "@/lib/cn";

export function PageShell({
  title,
  subtitle,
  children,
  className,
}: {
  title?: string;
  subtitle?: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className={cn("pt-16 flex-1", className)}>
        <section className="border-b border-hairline bg-section">
          <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
            <h1 className="text-premium text-3xl font-semibold tracking-tight text-white sm:text-5xl">
              {title}
            </h1>
            {subtitle ? (
              <p className="mt-5 max-w-3xl text-base leading-7 text-muted">{subtitle}</p>
            ) : null}
          </div>
        </section>

        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
