import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";
import { SmartImage } from "@/components/SmartImage";

const ROADMAP_IMG =
  "https://cdn.prod.website-files.com/688b650d15ca6b144341e1f7/690bd13cd22e0860718d9af7_ROADMAP%20(website%20version).png";

export default function RoadmapPage() {
  return (
    <PageShell title="Roadmap">
      <section className="bg-section">
        <div className="mx-auto max-w-6xl px-6 pb-16 md:pb-24">
          <Reveal className="bg-card-2 rounded-3xl p-4 shadow-glow">
            <SmartImage
              src={ROADMAP_IMG}
              alt="Modulr Roadmap"
              className="w-full rounded-2xl border border-hairline"
            />
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}


