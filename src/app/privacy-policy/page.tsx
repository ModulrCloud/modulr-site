import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "This Privacy Policy outlines how Modulr handles data and user activity within its decentralized operating infrastructure.",
};

const sections: Array<{ title: string; body: string }> = [
  {
    title: "On-Chain Operations",
    body: "Modulr is a blockchain-native platform. All activity, whether related to co-chains, job execution, or governance, is processed on-chain. This means transaction data such as wallet addresses and actions are inherently public and transparent. Modulr does not log or store additional metadata outside of this.",
  },
  {
    title: "Zero Collection of Personal Data",
    body: "Modulr does not request, collect, or store personally identifiable information (PII). You engage with the platform through your Web3 wallet, with no usernames, passwords, or emails required. User privacy is preserved by design.",
  },
  {
    title: "Integration with WalletConnect and Similar Tools",
    body: "When connecting to Modulr, you may use third-party tools like WalletConnect. While Modulr does not track or analyze your data, these integrations may use cookies or other technologies for connection purposes. Please refer to those services’ privacy policies for more information.",
  },
  {
    title: "Global Privacy Considerations",
    body: "Though we do not handle personal data, Modulr aligns with key principles of international privacy frameworks, including GDPR, CCPA, and other applicable regional standards. Our decentralized model inherently limits data exposure, ensuring compliance with privacy-first practices.",
  },
  {
    title: "Local Law Responsibility",
    body: "Users are responsible for ensuring that their use of Modulr complies with the laws and regulations of their jurisdiction. Modulr does not apply geo-restrictions but recommends all participants operate in accordance with local legal requirements.",
  },
  {
    title: "Security Commitments",
    body: "We apply best-practice security measures across our smart contracts and supporting infrastructure. Regular audits and reviews are part of our protocol development process. Users are solely responsible for managing the safety of their wallets, private keys, and device environments.",
  },
  {
    title: "No Commercial Exploitation of User Data",
    body: "Modulr does not share, monetize, or commercialize user data. We do not partner with data brokers or engage in targeted advertising practices.",
  },
  {
    title: "Immutable Ledger Records",
    body: "The decentralized nature of Modulr ensures that all transactions and updates to the network are permanent. Once submitted, data cannot be altered or removed, this is a fundamental principle of blockchain technology.",
  },
  {
    title: "Use of External Services",
    body: "Modulr may reference or integrate third-party websites and tools. We are not responsible for the privacy or data practices of these external entities. Always consult their privacy terms when engaging with external resources.",
  },
  {
    title: "Future Revisions",
    body: "As Modulr evolves, we may update this policy to reflect technical, legal, or community-driven changes. Any such updates will be posted with a revised effective date and made accessible on our website.",
  },
  {
    title: "Get in Touch",
    body: "For inquiries or concerns regarding this Privacy Policy, contact us via: Website: modulr.cloud • Telegram: https://t.me/modulrportal",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <PageShell
      title="Privacy Policy"
      subtitle="This Privacy Policy outlines how Modulr handles data and user activity within its decentralized operating infrastructure. Our commitment is to protect user privacy while ensuring transparency across all services and technologies we offer."
    >
      <section className="border-t border-hairline bg-section">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <div className="grid gap-4">
            {sections.map((s, i) => (
              <Reveal
                key={s.title}
                delayMs={60 + i * 50}
                className="bg-card rounded-3xl p-6"
              >
                <div className="text-sm font-semibold text-white">
                  {i + 1}. {s.title}
                </div>
                <p className="mt-3 text-sm leading-6 text-muted-2">{s.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}




