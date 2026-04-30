import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { localizePath } from "@/lib/i18n/routes";
import type { Locale } from "@/types/locale";

type PublicFooterProps = {
  currentLocale: Locale;
  labels: Record<string, string>;
  settings: Record<string, string>;
  siteName: string;
};

const quickLinks = [
  { key: "nav.about", path: "/about" },
  { key: "nav.services", path: "/services" },
  { key: "nav.projects", path: "/projects" },
  { key: "nav.contact", path: "/contact" },
];

export function PublicFooter({ currentLocale, labels, settings, siteName }: PublicFooterProps) {
  const addressKey = currentLocale === "ar" ? "contact.address.ar" : "contact.address.en";

  return (
    <footer className="bg-petrol py-12 text-white">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="inline-flex rounded-lg bg-white px-4 py-3">
              <Image alt={siteName} className="h-20 w-auto" height={118} src="/assets/logo.png" width={200} />
            </div>
            <p className="mt-5 max-w-md text-sm leading-7 text-white/70">
              {labels["footer.company_description"] ?? "Strategic consultancy for systemic impact."}
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-white">{labels["footer.quick_links"] ?? "Quick Links"}</h2>
            <nav aria-label="Footer navigation" className="mt-4 grid gap-3">
              {quickLinks.map((item) => (
                <Link
                  className="text-sm text-white/70 transition hover:text-white"
                  href={localizePath(item.path, currentLocale)}
                  key={item.path}
                >
                  {labels[item.key] ?? item.key}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-white">{labels["footer.contact"] ?? "Contact"}</h2>
            <div className="mt-4 grid gap-3 text-sm text-white/70">
              <a className="transition hover:text-white" href={`mailto:${settings["contact.email"] ?? "hello@orchestrate.local"}`}>
                {settings["contact.email"] ?? "hello@orchestrate.local"}
              </a>
              <span>{settings["contact.phone"] ?? "+966 00 000 0000"}</span>
              <span>{settings[addressKey] ?? settings["contact.address.en"] ?? "Riyadh, Saudi Arabia"}</span>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteName}. {labels["footer.rights"] ?? "All rights reserved."}
          </p>
          <div className="flex gap-4">
            {settings["social.linkedin"] ? (
              <a className="transition hover:text-white" href={settings["social.linkedin"]}>
                LinkedIn
              </a>
            ) : null}
            {settings["social.x"] ? (
              <a className="transition hover:text-white" href={settings["social.x"]}>
                X
              </a>
            ) : null}
          </div>
        </div>
      </Container>
    </footer>
  );
}
