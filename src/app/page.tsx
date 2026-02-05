import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Reveal } from "@/components/Reveal";
import { ModulrLogo } from "@/components/ModulrLogo";
import { JoinNetworkSection } from "@/components/JoinNetworkSection";
import { MODULR_LINKS } from "@/config/links";
import { PageIntro } from "@/components/PageIntro";
import { ParallaxTextSection } from "@/components/ParallaxTextSection";
import { AccessBentoSection } from "@/components/AccessBentoSection";
import { TrustedByMarquee } from "@/components/TrustedByMarquee";
import { StoriesSection } from "@/components/StoriesSection";
import { PremiumShowcaseSection } from "@/components/PremiumShowcaseSection";
import { UseCasesHorizontalScrollSection } from "@/components/UseCasesHorizontalScrollSection";
import { StickyHighlightsSection } from "@/components/StickyHighlightsSection";
import { SmartImage } from "@/components/SmartImage";
import { NumbersSection } from "@/components/NumbersSection";
import { HorizontalRailAutoSection } from "@/components/HorizontalRailAutoSection";
import { WhyBuildersChooseSection } from "@/components/WhyBuildersChooseSection";
import { BuiltDifferentSection } from "@/components/BuiltDifferentSection";
import { TonStyleShowcase } from "@/components/TonStyleShowcase";
import { TeleoperationSection } from "@/components/TeleoperationSection";

const ROADMAP_IMG =
  "https://cdn.prod.website-files.com/688b650d15ca6b144341e1f7/690bd13cd22e0860718d9af7_ROADMAP%20(website%20version).png";

const HERO_VIDEO_MP4 =
  "https://cdn.prod.website-files.com/688b650d15ca6b144341e1f7%2F689b4e755b6819dac8d89bd5_hero_bg_semsombra%20%281%29-transcode.mp4";
const HERO_VIDEO_WEBM =
  "https://cdn.prod.website-files.com/688b650d15ca6b144341e1f7%2F689b4e755b6819dac8d89bd5_hero_bg_semsombra%20%281%29-transcode.webm";
const HERO_POSTER =
  "https://cdn.prod.website-files.com/688b650d15ca6b144341e1f7%2F689b4e755b6819dac8d89bd5_hero_bg_semsombra%20%281%29-poster-00001.jpg";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <PageIntro />
      <SiteHeader />

      <main className="pt-16 flex-1">
        <section className="relative overflow-hidden border-b border-hairline min-h-[70vh] flex items-center">
          <div className="pointer-events-none absolute inset-0">
            <video
              className="absolute inset-0 h-full w-full object-cover opacity-[0.55]"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster={HERO_POSTER}
            >
              <source src={HERO_VIDEO_WEBM} type="video/webm" />
              <source src={HERO_VIDEO_MP4} type="video/mp4" />
            </video>

            <div className="absolute inset-0 bg-[radial-gradient(1400px_900px_at_50%_30%,rgba(242,180,0,0.15),transparent_55%),radial-gradient(1000px_700px_at_80%_70%,rgba(255,255,255,0.06),transparent_55%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,.25),rgba(0,0,0,.65),rgba(0,0,0,.88))]" />
          </div>

          <div className="relative mx-auto max-w-6xl px-6 py-24 md:py-32 w-full">
            <Reveal className="flex justify-center">
              <div className="text-[var(--accent)]">
                <ModulrLogo size="xl" />
              </div>
            </Reveal>

            <div className="mt-10 text-center">
              <Reveal delayMs={60}>
                <h1 className="text-premium text-4xl font-semibold leading-[1.03] tracking-tight text-white sm:text-6xl">
                  Access, Operate, and
                  <span className="block text-gradient">Monetize Robots Globally</span>
                </h1>
              </Reveal>
              <Reveal delayMs={140}>
                <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted sm:text-lg">
                  A real-time teleoperation platform built for enterprise performance and an open network economy—connecting robots, AI, data, and compute.
                </p>
              </Reveal>

              <Reveal
                delayMs={220}
                className="mt-9 flex flex-col justify-center gap-3 sm:flex-row sm:items-center"
              >
                <a
                  href={MODULR_LINKS.APP}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition ring-premium btn-primary"
                >
                  Launch App
                </a>
                <a
                  href={MODULR_LINKS.DEMO}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition ring-premium btn-secondary"
                >
                  Book a Demo
                </a>
              </Reveal>
            </div>
          </div>
        </section>

        <TrustedByMarquee />

        <TonStyleShowcase />
        
        <WhyBuildersChooseSection />
        
        <TeleoperationSection />

        
        
        
        <PremiumShowcaseSection />
        
        
        
        <UseCasesHorizontalScrollSection />
        
        
        
        
        
        <ParallaxTextSection />
        
        {/* <AccessBentoSection /> */}

        <BuiltDifferentSection />
        
        <StickyHighlightsSection />
        
        

        

{/*
        <section className="border-t border-hairline bg-section">
          <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
            <Reveal>
              <h2 className="text-premium text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Building The <span className="text-gradient">Global Robot Economy</span>
              </h2>
            </Reveal>
            <Reveal delayMs={120} className="mt-10">
              <div className="bg-card-2 rounded-3xl p-4 shadow-glow">
                <SmartImage
                  src={ROADMAP_IMG}
                  alt="Modulr Roadmap"
                  className="w-full rounded-2xl border border-hairline"
                />
              </div>
            </Reveal>
          </div>
        </section>
*/}

        <StoriesSection />

        {/* <HorizontalRailAutoSection /> */}

        

        

        <NumbersSection />

        

        <JoinNetworkSection />
      </main>

      <SiteFooter />
    </div>
  );
}
