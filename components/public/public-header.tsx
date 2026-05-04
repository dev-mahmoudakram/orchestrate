import Image from "next/image";
import Link from "next/link";

import { LanguageSwitcher } from "@/components/public/language-switcher";
import { MobileMenu } from "@/components/public/mobile-menu";
import { Container } from "@/components/ui/container";
import { localizePath } from "@/lib/i18n/routes";
import type { Locale } from "@/types/locale";

type PublicHeaderProps = {
  currentLocale: Locale;
  currentPathname: string;
  labels: Record<string, string>;
  siteName: string;
};

const navItems = [
  { key: "nav.home", path: "/" },
  { key: "nav.about", path: "/about" },
  { key: "nav.services", path: "/services" },
  { key: "nav.projects", path: "/projects" },
  { key: "nav.contact", path: "/contact" },
];

function normalizedBasePath(pathname: string) {
  return pathname.replace(/^\/en(?=\/|$)/, "") || "/";
}

export function PublicHeader({ currentLocale, currentPathname, labels, siteName }: PublicHeaderProps) {
  const basePath = normalizedBasePath(currentPathname);
  const localizedNavItems = navItems.map((item) => ({
    href: localizePath(item.path, currentLocale),
    label: labels[item.key] ?? item.key,
    isActive: item.path === "/" ? basePath === "/" : basePath.startsWith(item.path),
  }));
  const ctaHref = localizePath("/contact", currentLocale);
  const ctaLabel = labels["nav.cta"] ?? labels["button.contact"] ?? "Start";

  return (
    <header className="sticky top-0 z-40 border-b border-petrol/10 bg-white/92 backdrop-blur-md">
      <Container className="relative flex min-h-18 items-center justify-between gap-5 py-3">
        <Link className="flex shrink-0 items-center text-petrol" href={localizePath("/", currentLocale)}>
          <Image alt={siteName} className="h-14 w-auto" height={95} priority quality={58} sizes="160px" src="/assets/logo.png" width={160} />
        </Link>

        <nav aria-label="Primary navigation" className="hidden items-center rounded-full border border-petrol/10 bg-soft px-2 py-1 lg:flex">
          {localizedNavItems.map((item) => (
            <Link
              aria-current={item.isActive ? "page" : undefined}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                item.isActive ? "bg-white text-orange shadow-sm" : "text-petrol/70 hover:bg-white hover:text-petrol"
              }`}
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher
            currentLocale={currentLocale}
            currentPathname={currentPathname}
            labels={{ ar: labels["nav.language_ar"], en: labels["nav.language_en"] }}
          />
          <Link
            className="inline-flex min-h-10 items-center rounded-md bg-orange px-4 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#d76719]"
            href={ctaHref}
          >
            {ctaLabel}
          </Link>
        </div>

        <MobileMenu
          ctaHref={ctaHref}
          ctaLabel={ctaLabel}
          currentLocale={currentLocale}
          currentPathname={currentPathname}
          languageLabels={{ ar: labels["nav.language_ar"], en: labels["nav.language_en"] }}
          menuLabel={currentLocale === "ar" ? "القائمة" : "Menu"}
          navItems={localizedNavItems}
        />
      </Container>
    </header>
  );
}
