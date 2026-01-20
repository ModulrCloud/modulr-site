import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";
import { MODULR_LINKS } from "@/config/links";

export default function PricingPage() {
  return (
    <PageShell title="Pricing & Billing">
      <section className="bg-section">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <Reveal className="bg-card-2 rounded-3xl p-6 shadow-glow">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-muted-2">Interested in Learning More?</p>
              <a
                href={MODULR_LINKS.DEMO}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition ring-premium btn-primary"
              >
                Book a Demo
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-hairline bg-section">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <div className="grid gap-4">
            <Reveal className="bg-card rounded-3xl p-6">
              <h2 className="text-premium text-xl font-semibold text-white">
                Usage-Based Pricing
              </h2>
              <p className="mt-3 text-sm leading-6 text-muted-2">
                Modulr is a SaaS platform that provides access to robots, compute, storage,
                and AI services through an open marketplace. Users are always shown{" "}
                <strong className="text-white/85">
                  clear, upfront pricing in their selected local currency
                </strong>{" "}
                before using any service. There are no hidden fees and no blind spending.
              </p>
            </Reveal>

            <Reveal delayMs={80} className="bg-card rounded-3xl p-6">
              <h3 className="text-sm font-semibold text-white">How Billing Works</h3>
              <p className="mt-3 text-sm leading-6 text-muted-2">
                All payments on Modulr are made using standard fiat currencies (such as
                USD, EUR, GBP, and others). Modulr uses a credit system (internally these
                credits are called "MTR") to track service usage across the platform.
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted-2">
                <li>clear pricing in fiat currencies</li>
                <li>consistent usage tracking</li>
                <li>flexible marketplace pricing set by providers</li>
              </ul>
            </Reveal>

            <Reveal delayMs={140} className="bg-card rounded-3xl p-6">
              <h3 className="text-sm font-semibold text-white">Adding Balance to Your Account</h3>
              <p className="mt-3 text-sm leading-6 text-muted-2">
                Before using any Modulr services (like remote teleoperation), users will
                first add balance to their Modulr account in their selected currency.
              </p>
              <p className="mt-4 text-sm text-muted-2">Common balance packages include:</p>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-2">
                <li>$20 USD</li>
                <li>$50 USD</li>
                <li>$100 USD</li>
              </ul>
            </Reveal>

            <Reveal delayMs={200} className="bg-card rounded-3xl p-6">
              <h3 className="text-sm font-semibold text-white">Service Pricing</h3>
              <p className="mt-3 text-sm leading-6 text-muted-2">
                Service pricing on Modulr is set by independent providers. Pricing may vary
                based on:
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted-2">
                <li>robot type and availability</li>
                <li>session duration</li>
                <li>compute, storage, and AI resources used</li>
              </ul>
            </Reveal>

            <Reveal delayMs={260} className="bg-card rounded-3xl p-6">
              <h3 className="text-sm font-semibold text-white">Payments</h3>
              <p className="mt-3 text-sm leading-6 text-muted-2">
                Payments are processed securely within the Modulr application after sign-in.
                Modulr does not store or process payment card information directly. Payments
                are handled by trusted third-party payment providers.
              </p>
            </Reveal>

            <Reveal delayMs={320} className="bg-card rounded-3xl p-6">
              <h3 className="text-sm font-semibold text-white">Refund Policy</h3>
              <p className="mt-3 text-sm leading-6 text-muted-2">
                <strong className="text-white/85">
                  All balance additions are final and non-refundable
                </strong>
                .
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted-2">
                <li>Internal usage units (MTR) have no cash value</li>
                <li>Balances can only be used to access Modulr services</li>
                <li>
                  Accounts may be temporarily restricted if payments are disputed or reversed
                </li>
              </ul>
            </Reveal>

            <Reveal delayMs={380} className="bg-card rounded-3xl p-6">
              <h3 className="text-sm font-semibold text-white">Early Access</h3>
              <p className="mt-3 text-sm leading-6 text-muted-2">
                Modulr is under active development. Features, services, and pricing models may
                evolve as the platform grows.
              </p>
            </Reveal>

            <Reveal delayMs={440} className="bg-card rounded-3xl p-6">
              <h3 className="text-sm font-semibold text-white">Questions?</h3>
              <p className="mt-3 text-sm leading-6 text-muted-2">
                For billing or pricing questions, contact{" "}
                <a className="text-white/85 underline" href="mailto:support@modulr.cloud">
                  support@modulr.cloud
                </a>
                .
              </p>
            </Reveal>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
