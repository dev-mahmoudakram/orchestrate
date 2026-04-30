import { translate } from "@/lib/i18n/translations";
import type { Locale } from "@/types/locale";

const publicNavigationKeys = [
  ["home", "nav.home"],
  ["about", "nav.about"],
  ["services", "nav.services"],
  ["projects", "nav.projects"],
  ["contact", "nav.contact"],
] as const;

const publicButtonKeys = [
  ["contact", "button.contact"],
  ["learnMore", "button.learnMore"],
  ["viewProjects", "button.viewProjects"],
] as const;

export async function getPublicNavigationLabels(locale: Locale) {
  return Object.fromEntries(
    await Promise.all(
      publicNavigationKeys.map(async ([name, key]) => [name, await translate(key, locale)]),
    ),
  ) as Record<(typeof publicNavigationKeys)[number][0], string>;
}

export async function getPublicButtonLabels(locale: Locale) {
  return Object.fromEntries(
    await Promise.all(publicButtonKeys.map(async ([name, key]) => [name, await translate(key, locale)])),
  ) as Record<(typeof publicButtonKeys)[number][0], string>;
}

export async function getFooterRightsLabel(locale: Locale) {
  return translate("footer.rights", locale);
}
