import type { MetadataRoute } from "next";

import {
  absoluteUrl,
  getPublishedProjectSitemapItems,
  localizedAlternateUrls,
  localizedCanonicalPath,
} from "@/lib/seo/metadata";
import type { Locale } from "@/types/locale";

const staticPublicPaths = ["/", "/about", "/services", "/projects", "/contact"] as const;
const locales: Locale[] = ["ar", "en"];

function sitemapEntry(path: string, locale: Locale, lastModified?: Date, priority = 0.7): MetadataRoute.Sitemap[number] {
  return {
    url: absoluteUrl(localizedCanonicalPath(path, locale)),
    lastModified: lastModified ?? new Date(),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority,
    alternates: {
      languages: localizedAlternateUrls(path),
    },
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getPublishedProjectSitemapItems();
  const staticEntries = staticPublicPaths.flatMap((path) =>
    locales.map((locale) => sitemapEntry(path, locale, undefined, path === "/" ? 1 : 0.8)),
  );
  const projectEntries = projects.flatMap((project) =>
    locales.map((locale) => sitemapEntry(`/projects/${project.slug}`, locale, project.updatedAt, 0.7)),
  );

  return [...staticEntries, ...projectEntries];
}
