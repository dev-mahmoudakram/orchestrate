import { getOppositeLocale } from "@/lib/i18n/locale";
import type { Locale } from "@/types/locale";

export const publicRoutes = [
  "/",
  "/about",
  "/services",
  "/projects",
  "/contact",
] as const;

export const adminRoutes = [
  "/admin/dashboard",
  "/admin/pages",
  "/admin/services",
  "/admin/projects",
  "/admin/sectors",
  "/admin/partners",
  "/admin/team",
  "/admin/messages",
  "/admin/translations",
  "/admin/settings",
  "/admin/users",
] as const;

export function localizePath(pathname: string, locale: Locale): string {
  const normalized = pathname === "" ? "/" : pathname;
  const withoutEnglishPrefix = normalized.replace(/^\/en(?=\/|$)/, "") || "/";

  if (locale === "en") {
    return withoutEnglishPrefix === "/" ? "/en" : `/en${withoutEnglishPrefix}`;
  }

  return withoutEnglishPrefix;
}

export function getAlternateLocalePath(pathname: string, currentLocale: Locale): string {
  return localizePath(pathname, getOppositeLocale(currentLocale));
}
