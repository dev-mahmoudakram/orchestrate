import { defaultLocale, localeDirections, locales } from "@/lib/i18n/config";
import type { Direction, Locale } from "@/types/locale";

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getLocaleFromPathname(pathname: string): Locale {
  const firstSegment = pathname.split("/").filter(Boolean)[0];

  if (firstSegment === "en") {
    return "en";
  }

  return defaultLocale;
}

export function getDirection(locale: Locale): Direction {
  return localeDirections[locale];
}

export function getOppositeLocale(locale: Locale): Locale {
  return locale === "ar" ? "en" : "ar";
}
