import { prisma } from "@/lib/prisma";
import type { Locale } from "@/types/locale";

export type TranslationDictionary = Record<string, string>;

export async function getTranslations(locale: Locale): Promise<TranslationDictionary> {
  const translationKeys = await prisma.translationKey.findMany({
    orderBy: [{ group: "asc" }, { key: "asc" }],
  });

  return translationKeys.reduce<TranslationDictionary>((dictionary, translationKey) => {
    const value = locale === "en" ? translationKey.en : translationKey.ar;
    dictionary[translationKey.key] = value?.trim() || translationKey.ar?.trim() || translationKey.key;
    return dictionary;
  }, {});
}

export async function translate(key: string, locale: Locale) {
  const translations = await getTranslations(locale);
  return translations[key] ?? key;
}

export const t = translate;

export async function getTranslationGroups() {
  const groups = await prisma.translationKey.findMany({
    distinct: ["group"],
    orderBy: {
      group: "asc",
    },
    select: {
      group: true,
    },
  });

  return groups.map((item) => item.group);
}
