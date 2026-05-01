import type { Metadata } from "next";

import { brand } from "@/lib/constants/brand";
import { Locale as PrismaLocale } from "@/lib/generated/prisma/client";
import { localizePath } from "@/lib/i18n/routes";
import { localized } from "@/lib/public/content";
import { prisma } from "@/lib/prisma";
import type { Locale } from "@/types/locale";

const defaultSiteUrl = "http://localhost:3000";
const defaultDescription =
  "Orchestrate Innovation is a strategic consultancy designing systemic solutions for institutions, government entities, and social-impact sectors.";
const fallbackOgImage = "/web-app-manifest-512x512.png";

type SeoSource = {
  title?: string | null;
  summary?: string | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
};

type PublicMetadataOptions = {
  description?: string | null;
  image?: string | null;
  locale: Locale;
  path: string;
  title?: string | null;
  type?: "website" | "article";
};

export function getSiteUrl() {
  const rawUrl = process.env.NEXT_PUBLIC_SITE_URL || defaultSiteUrl;

  try {
    const url = new URL(rawUrl);
    url.pathname = url.pathname.replace(/\/+$/, "");

    return url.toString().replace(/\/+$/, "");
  } catch {
    return defaultSiteUrl;
  }
}

export function absoluteUrl(path = "/") {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  return `${getSiteUrl()}${normalizedPath}`;
}

export function absoluteMediaUrl(path?: string | null) {
  return absoluteUrl(path || fallbackOgImage);
}

export function localizedCanonicalPath(basePath: string, locale: Locale) {
  return localizePath(basePath, locale);
}

export function localizedAlternateUrls(basePath: string) {
  return {
    "ar-SA": absoluteUrl(localizePath(basePath, "ar")),
    "en-US": absoluteUrl(localizePath(basePath, "en")),
    "x-default": absoluteUrl(localizePath(basePath, "ar")),
  };
}

export function localizedOpenGraphLocale(locale: Locale) {
  return locale === "ar" ? "ar_SA" : "en_US";
}

export function resolveSeoTitle(source: SeoSource | null | undefined, locale: Locale) {
  return source?.seoTitle || source?.title || (locale === "ar" ? brand.nameAr : brand.nameEn);
}

export function resolveSeoDescription(source: SeoSource | null | undefined) {
  return source?.seoDescription || source?.summary || defaultDescription;
}

export function buildPublicMetadata({
  description,
  image,
  locale,
  path,
  title,
  type = "website",
}: PublicMetadataOptions): Metadata {
  const canonicalPath = localizedCanonicalPath(path, locale);
  const resolvedTitle = title || (locale === "ar" ? brand.nameAr : brand.nameEn);
  const resolvedDescription = description || defaultDescription;
  const resolvedImage = absoluteMediaUrl(image);
  const canonicalUrl = absoluteUrl(canonicalPath);

  return {
    title: resolvedTitle,
    description: resolvedDescription,
    alternates: {
      canonical: canonicalUrl,
      languages: localizedAlternateUrls(path),
    },
    openGraph: {
      title: resolvedTitle,
      description: resolvedDescription,
      type,
      url: canonicalUrl,
      siteName: brand.nameEn,
      locale: localizedOpenGraphLocale(locale),
      images: [
        {
          url: resolvedImage,
          width: 1200,
          height: 630,
          alt: resolvedTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description: resolvedDescription,
      images: [resolvedImage],
    },
  };
}

export async function getPageSeoMetadata(pageKey: string, locale: Locale, path: string): Promise<Metadata> {
  const page = await prisma.page.findFirst({
    where: {
      key: pageKey,
      deletedAt: null,
      isPublished: true,
    },
    include: {
      translations: true,
    },
  });
  const translation = page ? localized(page.translations, locale) : null;

  return buildPublicMetadata({
    description: resolveSeoDescription(translation),
    locale,
    path,
    title: resolveSeoTitle(translation, locale),
  });
}

export async function getProjectSeoMetadata(slug: string, locale: Locale): Promise<Metadata> {
  const project = await prisma.project.findFirst({
    where: {
      deletedAt: null,
      isPublished: true,
      slug,
    },
    include: {
      featuredImage: true,
      translations: true,
    },
  });
  const translation = project ? localized(project.translations, locale) : null;

  return buildPublicMetadata({
    description: resolveSeoDescription(translation),
    image: project?.featuredImage?.url,
    locale,
    path: `/projects/${slug}`,
    title: resolveSeoTitle(translation, locale),
    type: "article",
  });
}

export async function getPublishedProjectSitemapItems() {
  return prisma.project.findMany({
    where: {
      deletedAt: null,
      isPublished: true,
      translations: {
        some: {
          locale: PrismaLocale.ar,
        },
      },
    },
    orderBy: [{ sortOrder: "asc" }, { updatedAt: "desc" }],
    select: {
      slug: true,
      updatedAt: true,
    },
  });
}
