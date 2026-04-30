import { headers } from "next/headers";
import type { ReactNode } from "react";

import { PublicFooter } from "@/components/public/public-footer";
import { PublicHeader } from "@/components/public/public-header";
import { defaultLocale } from "@/lib/i18n/config";
import { isLocale } from "@/lib/i18n/locale";
import { getTranslations } from "@/lib/i18n/translations";
import { prisma } from "@/lib/prisma";
import type { Locale } from "@/types/locale";

async function getPublicSettings() {
  const settings = await prisma.siteSetting.findMany({
    where: {
      isPublic: true,
    },
    select: {
      key: true,
      value: true,
    },
  });

  return settings.reduce<Record<string, string>>((dictionary, setting) => {
    if (setting.value) {
      dictionary[setting.key] = setting.value;
    }

    return dictionary;
  }, {});
}

export default async function PublicLayout({ children }: { children: ReactNode }) {
  const requestHeaders = await headers();
  const headerLocale = requestHeaders.get("x-orchestrate-locale") ?? defaultLocale;
  const currentLocale: Locale = isLocale(headerLocale) ? headerLocale : defaultLocale;
  const currentPathname = requestHeaders.get("x-orchestrate-pathname") ?? (currentLocale === "en" ? "/en" : "/");
  const [labels, settings] = await Promise.all([getTranslations(currentLocale), getPublicSettings()]);
  const siteName = currentLocale === "ar" ? settings["site.name.ar"] ?? "تناغم الابتكار" : settings["site.name.en"] ?? "Orchestrate Innovation";

  return (
    <>
      <PublicHeader currentLocale={currentLocale} currentPathname={currentPathname} labels={labels} siteName={siteName} />
      {children}
      <PublicFooter currentLocale={currentLocale} labels={labels} settings={settings} siteName={siteName} />
    </>
  );
}
