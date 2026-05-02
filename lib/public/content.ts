import { prisma } from "@/lib/prisma";
import { Locale as PrismaLocale } from "@/lib/prisma/enums";
import type { Locale } from "@/types/locale";

function prismaLocale(locale: Locale) {
  return locale === "en" ? PrismaLocale.en : PrismaLocale.ar;
}

export function localized<T extends { locale: PrismaLocale }>(translations: T[], locale: Locale) {
  return (
    translations.find((translation) => translation.locale === prismaLocale(locale)) ??
    translations.find((translation) => translation.locale === PrismaLocale.ar) ??
    translations[0]
  );
}

export async function getPageContent(key: string, locale: Locale) {
  const page = await prisma.page.findFirst({
    where: {
      key,
      deletedAt: null,
      isPublished: true,
    },
    include: {
      translations: true,
    },
  });

  if (!page) {
    return null;
  }

  const translation = localized(page.translations, locale);

  if (!translation) {
    return null;
  }

  return {
    ...page,
    translation,
  };
}

export async function getPublishedSectors(locale: Locale) {
  const sectors = await prisma.sector.findMany({
    where: {
      deletedAt: null,
      isPublished: true,
    },
    include: {
      translations: true,
    },
    orderBy: [{ sortOrder: "asc" }, { updatedAt: "desc" }],
  });

  return sectors.map((sector) => ({ ...sector, translation: localized(sector.translations, locale) }));
}

export async function getPublishedServices(locale: Locale) {
  const services = await prisma.service.findMany({
    where: {
      deletedAt: null,
      isPublished: true,
    },
    include: {
      featuredImage: true,
      translations: true,
    },
    orderBy: [{ sortOrder: "asc" }, { updatedAt: "desc" }],
  });

  return services.map((service) => ({ ...service, translation: localized(service.translations, locale) }));
}

export async function getFeaturedProjects(locale: Locale) {
  const projects = await prisma.project.findMany({
    where: {
      deletedAt: null,
      isFeatured: true,
      isPublished: true,
    },
    include: {
      featuredImage: true,
      sector: {
        include: {
          translations: true,
        },
      },
      translations: true,
    },
    orderBy: [{ sortOrder: "asc" }, { updatedAt: "desc" }],
  });

  return projects.map((project) => ({
    ...project,
    sectorTranslation: project.sector ? localized(project.sector.translations, locale) : null,
    translation: localized(project.translations, locale),
  }));
}

export async function getPublishedProjects(locale: Locale, sectorSlug?: string) {
  const projects = await prisma.project.findMany({
    where: {
      deletedAt: null,
      isPublished: true,
      ...(sectorSlug
        ? {
            sector: {
              deletedAt: null,
              isPublished: true,
              slug: sectorSlug,
            },
          }
        : {}),
    },
    include: {
      featuredImage: true,
      sector: {
        include: {
          translations: true,
        },
      },
      translations: true,
    },
    orderBy: [{ isFeatured: "desc" }, { sortOrder: "asc" }, { updatedAt: "desc" }],
  });

  return projects.map((project) => ({
    ...project,
    sectorTranslation: project.sector ? localized(project.sector.translations, locale) : null,
    translation: localized(project.translations, locale),
  }));
}

export async function getPublishedPartners(locale: Locale) {
  const partners = await prisma.partner.findMany({
    where: {
      deletedAt: null,
      isPublished: true,
    },
    include: {
      logoMedia: true,
      translations: true,
    },
    orderBy: [{ sortOrder: "asc" }, { updatedAt: "desc" }],
  });

  return partners.map((partner) => ({ ...partner, translation: localized(partner.translations, locale) }));
}

export async function getPublishedTeam(locale: Locale) {
  const team = await prisma.teamMember.findMany({
    where: {
      deletedAt: null,
      isPublished: true,
    },
    include: {
      imageMedia: true,
      translations: true,
    },
    orderBy: [{ sortOrder: "asc" }, { updatedAt: "desc" }],
  });

  return team.map((member) => ({ ...member, translation: localized(member.translations, locale) }));
}
