import Link from "next/link";

import { getAlternateLocalePath } from "@/lib/i18n/routes";
import type { Locale } from "@/types/locale";

type LanguageSwitcherProps = {
  currentLocale: Locale;
  currentPathname: string;
  labels?: {
    ar?: string;
    en?: string;
  };
};

export function LanguageSwitcher({ currentLocale, currentPathname, labels }: LanguageSwitcherProps) {
  const nextLocale = currentLocale === "ar" ? "en" : "ar";
  const label = nextLocale === "ar" ? labels?.ar ?? "العربية" : labels?.en ?? "English";

  return (
    <Link
      className="inline-flex min-h-10 items-center rounded-md border border-petrol/15 bg-white px-4 text-sm font-semibold text-petrol transition hover:border-orange hover:text-orange"
      href={getAlternateLocalePath(currentPathname, currentLocale)}
    >
      {label}
    </Link>
  );
}
