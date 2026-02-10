import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { MODULR_LINKS } from "@/config/links";

export const metadata: Metadata = {
  title: "Launch App",
  description:
    "Connect to and control robots from anywhere in the world with near-zero latency, all while using your preferred interface: web browser, VR headset, gaming controller, or custom rig.",
};

export default function LaunchAppPage() {
  return (
    <PageShell
      title="Launch App"
      subtitle="Connect to and control robots from anywhere in the world with near-zero latency, all while using your preferred interface: web browser, VR headset, gaming controller, or custom rig."
    >
      <section className="border-t border-hairline bg-section">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <div className="bg-card-2 rounded-3xl p-7 shadow-glow">
            <div className="grid gap-3 sm:grid-cols-2">
              <a
                href={MODULR_LINKS.DEMO}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition ring-premium btn-primary"
              >
                Book a Demo
              </a>
              <a
                href={MODULR_LINKS.DOCS}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition ring-premium btn-secondary"
              >
                View Docs
              </a>
            </div>

            <div className="mt-6 text-xs text-white/35">
              If you already have access, open the app at{" "}
              <a className="underline text-white/70" href={MODULR_LINKS.APP}>
                app.modulr.cloud
              </a>
              .
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}




