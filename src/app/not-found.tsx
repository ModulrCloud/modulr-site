import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="pt-16 flex-1">
        <section className="bg-section">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <div className="overflow-hidden rounded-[32px] border border-hairline bg-black/35 shadow-glow">
              <div className="relative p-10 md:p-14">
                <div className="pointer-events-none absolute inset-0 opacity-90 bg-[radial-gradient(900px_380px_at_80%_20%,rgba(242,180,0,0.12),transparent_60%),radial-gradient(700px_420px_at_20%_70%,rgba(255,255,255,0.06),transparent_60%)]" />
                <div className="relative">
                  <div className="text-xs tracking-[0.28em] uppercase text-white/45">
                    Error 404
                  </div>
                  <h1 className="mt-4 text-premium text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white">
                    Page not found
                  </h1>
                  <p className="mt-6 max-w-xl text-base leading-7 text-muted">
                    The page you’re looking for doesn’t exist or has been moved.
                  </p>

                  <div className="mt-10 flex flex-wrap gap-3">
                    <Link
                      href="/"
                      className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition ring-premium btn-primary"
                    >
                      Go home
                    </Link>
                    <Link
                      href="/news"
                      className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition ring-premium btn-secondary"
                    >
                      Latest announcements
                    </Link>
                    <Link
                      href="/research"
                      className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition ring-premium btn-secondary"
                    >
                      Research
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}


