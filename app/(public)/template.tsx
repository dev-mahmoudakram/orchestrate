import type { ReactNode } from "react";

import { PublicShell } from "@/components/public/public-shell";
import { getTranslations } from "@/lib/i18n/translations";
import { prisma } from "@/lib/prisma";

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

export default async function PublicTemplate({ children }: { children: ReactNode }) {
  const [arLabels, enLabels, settings] = await Promise.all([
    getTranslations("ar"),
    getTranslations("en"),
    getPublicSettings(),
  ]);

  return (
    <PublicShell labelsByLocale={{ ar: arLabels, en: enLabels }} settings={settings}>
      {children}
    </PublicShell>
  );
}
