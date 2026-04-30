"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { PublicFooter } from "@/components/public/public-footer";
import { PublicHeader } from "@/components/public/public-header";
import { getLocaleFromPathname } from "@/lib/i18n/locale";
import type { Locale } from "@/types/locale";

type PublicShellProps = {
  children: ReactNode;
  labelsByLocale: Record<Locale, Record<string, string>>;
  settings: Record<string, string>;
};

export function PublicShell({ children, labelsByLocale, settings }: PublicShellProps) {
  const pathname = usePathname();
  const currentLocale = getLocaleFromPathname(pathname);
  const labels = labelsByLocale[currentLocale];
  const siteName =
    currentLocale === "ar"
      ? settings["site.name.ar"] ?? "تناغم الابتكار"
      : settings["site.name.en"] ?? "Orchestrate Innovation";

  return (
    <>
      <PublicHeader currentLocale={currentLocale} currentPathname={pathname} labels={labels} siteName={siteName} />
      {children}
      <PublicFooter currentLocale={currentLocale} labels={labels} settings={settings} siteName={siteName} />
    </>
  );
}
