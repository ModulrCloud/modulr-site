"use client";

import Link from "next/link";
import { ModulrLogo } from "@/components/ModulrLogo";
import { MODULR_LINKS } from "@/config/links";

function IconButton({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-hairline bg-white/5 text-white/80 hover:bg-white/10 hover:text-white transition ring-premium"
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      title={label}
    >
      {children}
    </a>
  );
}

function XBrandIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        fill="currentColor"
        d="M18.9 2H22l-6.8 7.8L23 22h-6.7l-5.3-6.7L5.2 22H2l7.3-8.4L1 2h6.9l4.8 6.1L18.9 2Zm-1.2 18h1.7L7.0 3.9H5.2L17.7 20Z"
      />
    </svg>
  );
}

function LinkedInBrandIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        fill="currentColor"
        d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.05-1.86-3.05-1.86 0-2.14 1.45-2.14 2.95v5.67H9.33V9h3.42v1.56h.05c.48-.9 1.66-1.86 3.41-1.86 3.65 0 4.33 2.4 4.33 5.53v6.22ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.56V9h3.56v11.45Z"
      />
    </svg>
  );
}

function GitHubBrandIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        fill="currentColor"
        d="M12 .5C5.73.5.66 5.58.66 11.86c0 4.87 3.16 9 7.55 10.46.55.1.75-.24.75-.53 0-.26-.01-.96-.02-1.88-3.07.67-3.72-1.48-3.72-1.48-.5-1.28-1.22-1.62-1.22-1.62-.99-.68.08-.66.08-.66 1.1.08 1.67 1.13 1.67 1.13.98 1.68 2.57 1.19 3.2.91.1-.71.38-1.19.69-1.46-2.45-.28-5.02-1.23-5.02-5.46 0-1.2.43-2.18 1.13-2.95-.11-.28-.49-1.4.11-2.92 0 0 .92-.3 3.02 1.13a10.5 10.5 0 0 1 2.75-.37c.93 0 1.87.13 2.75.37 2.1-1.43 3.02-1.13 3.02-1.13.6 1.52.22 2.64.11 2.92.7.77 1.13 1.75 1.13 2.95 0 4.24-2.58 5.18-5.04 5.46.39.33.74.99.74 2 0 1.45-.01 2.62-.01 2.98 0 .29.2.64.76.53 4.39-1.46 7.55-5.59 7.55-10.46C23.34 5.58 18.27.5 12 .5Z"
      />
    </svg>
  );
}

function TelegramBrandIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        fill="currentColor"
        d="M9.75 15.5 9.5 19.1c.36 0 .52-.15.71-.34l1.7-1.63 3.52 2.58c.65.36 1.11.17 1.28-.6l2.32-10.9c.21-.94-.34-1.31-.97-1.07L4.47 11.2c-.92.36-.91.88-.16 1.11l3.68 1.15 8.55-5.4c.4-.24.76-.11.46.16l-6.92 6.28-.33 1Z"
      />
    </svg>
  );
}

function LinkIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        fill="currentColor"
        d="M10.6 13.4a1 1 0 0 1 0-1.4l3.4-3.4a3 3 0 1 1 4.2 4.2l-2 2a3 3 0 0 1-4.2 0 1 1 0 1 1 1.4-1.4 1 1 0 0 0 1.4 0l2-2a1 1 0 0 0-1.4-1.4l-3.4 3.4a1 1 0 0 1-1.4 0Zm2.8-2.8a1 1 0 0 1 0 1.4l-3.4 3.4A3 3 0 0 1 5.8 11l2-2A3 3 0 0 1 12 9a1 1 0 0 1-1.4 1.4 1 1 0 0 0-1.4 0l-2 2a1 1 0 0 0 1.4 1.4l3.4-3.4a1 1 0 0 1 1.4 0Z"
      />
    </svg>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-hairline bg-section">
      <div className="mx-auto max-w-[1400px] px-6 py-14">
        <div className="grid gap-10 md:grid-cols-5 md:items-start">
          <div className="md:col-span-2">
            <Link href="/" className="rounded ring-premium inline-flex">
              <span className="text-[var(--accent)]">
                <ModulrLogo variant="footer" />
              </span>
            </Link>
            <p className="mt-3 max-w-md text-sm text-muted-2">
              The Open Network for Robotics, AI, Data, and Compute
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-2">
              <IconButton href={MODULR_LINKS.X} label="X">
                <XBrandIcon className="h-4 w-4" />
              </IconButton>
              <IconButton href={MODULR_LINKS.LINKEDIN} label="LinkedIn">
                <LinkedInBrandIcon className="h-4 w-4" />
              </IconButton>
              <IconButton href={MODULR_LINKS.GITHUB} label="GitHub">
                <GitHubBrandIcon className="h-4 w-4" />
              </IconButton>
              <IconButton href={MODULR_LINKS.LINKTREE} label="Linktree">
                <LinkIcon className="h-[18px] w-[18px]" />
              </IconButton>
              <IconButton href={MODULR_LINKS.TELEGRAM} label="Telegram">
                <TelegramBrandIcon className="h-4 w-4" />
              </IconButton>
              <IconButton href={MODULR_LINKS.DOCS} label="Docs">
                <LinkIcon className="h-[18px] w-[18px]" />
              </IconButton>
            </div>
          </div>

          <div className="md:justify-self-end">
            <div className="text-sm font-semibold text-white/80">Pages</div>
            <ul className="mt-4 space-y-2 text-sm text-white/55">
              <li>
                <Link className="hover:text-white ring-premium rounded" href="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className="hover:text-white ring-premium rounded" href="/research">
                  Research
                </Link>
              </li>
              <li>
                <Link className="hover:text-white ring-premium rounded" href="/news">
                  News
                </Link>
              </li>
              <li>
                <Link className="hover:text-white ring-premium rounded" href="/careers">
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-white ring-premium rounded"
                  href="/technology-overview"
                >
                  Technology
                </Link>
              </li>
              <li>
                <Link className="hover:text-white ring-premium rounded" href="/team">
                  Team
                </Link>
              </li>
              <li>
                <Link className="hover:text-white ring-premium rounded" href="/pricing">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:justify-self-end">
            <div className="text-sm font-semibold text-white/80">Links</div>
            <ul className="mt-4 space-y-2 text-sm text-white/55">
              <li>
                <a
                  className="hover:text-white ring-premium rounded"
                  href={MODULR_LINKS.DEMO}
                  target="_blank"
                  rel="noreferrer"
                >
                  Book a Demo
                </a>
              </li>
              <li>
                <a
                  className="hover:text-white ring-premium rounded"
                  href={MODULR_LINKS.APP}
                  target="_blank"
                  rel="noreferrer"
                >
                  Launch App
                </a>
              </li>
              <li>
                <a
                  className="hover:text-white ring-premium rounded"
                  href={MODULR_LINKS.DOCS}
                  target="_blank"
                  rel="noreferrer"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  className="hover:text-white ring-premium rounded"
                  href={MODULR_LINKS.GITHUB}
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>

          <div className="md:justify-self-end">
            <div className="text-sm font-semibold text-white/80">Legal</div>
            <ul className="mt-4 space-y-2 text-sm text-white/55">
              <li>
                <Link
                  className="hover:text-white ring-premium rounded"
                  href="/privacy-policy"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-hairline pt-6 text-xs text-white/35 sm:flex-row sm:items-center sm:justify-between">
          <div>Copyright © {new Date().getFullYear()} Modulr. All rights reserved.</div>
          <div className="text-white/25">Powering the global robot economy.</div>
        </div>
      </div>
    </footer>
  );
}
