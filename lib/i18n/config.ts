import type { Direction, Locale } from "@/types/locale";

export const defaultLocale: Locale = "ar";
export const locales: Locale[] = ["ar", "en"];

export const localeDirections: Record<Locale, Direction> = {
  ar: "rtl",
  en: "ltr",
};

export const localeLabels: Record<Locale, string> = {
  ar: "العربية",
  en: "English",
};
