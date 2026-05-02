"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requireAdmin } from "@/lib/auth/auth";
import { canManageContent } from "@/lib/auth/permissions";
import { Prisma } from "@/lib/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { Locale } from "@/lib/prisma/enums";

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const keyPattern = /^[a-z0-9][a-z0-9._-]*$/;

function text(value: FormDataEntryValue | null) {
  return String(value ?? "").trim();
}

function optionalText(value: FormDataEntryValue | null) {
  const cleaned = text(value);
  return cleaned.length > 0 ? cleaned : null;
}

function optionalId(value: FormDataEntryValue | null) {
  return optionalText(value);
}

function sortOrder(value: FormDataEntryValue | null) {
  const parsed = Number.parseInt(String(value ?? "0"), 10);
  return Number.isFinite(parsed) ? parsed : 0;
}

function checked(formData: FormData, name: string) {
  return formData.get(name) === "on";
}

function normalizeSlug(value: FormDataEntryValue | null) {
  return text(value).toLowerCase();
}

function normalizeKey(value: FormDataEntryValue | null) {
  return text(value).toLowerCase();
}

function redirectWithError(path: string, error: string): never {
  redirect(`${path}?error=${encodeURIComponent(error)}`);
}

function redirectWithSuccess(path: string, saved: string): never {
  revalidatePath(path);
  redirect(`${path}?saved=${encodeURIComponent(saved)}`);
}

function isUniqueError(error: unknown) {
  return typeof error === "object" && error !== null && "code" in error && error.code === "P2002";
}

function handleCmsError(path: string, error: unknown): never {
  if (isUniqueError(error)) {
    redirectWithError(path, "duplicate-slug-or-key");
  }

  throw error;
}

async function requireContentManager() {
  const user = await requireAdmin();

  if (!canManageContent(user)) {
    redirect("/admin/dashboard?error=forbidden");
  }

  return user;
}

function validateSlug(path: string, slug: string) {
  if (!slug || !slugPattern.test(slug)) {
    redirectWithError(path, "invalid-slug");
  }
}

function validateKey(path: string, key: string) {
  if (!key || !keyPattern.test(key)) {
    redirectWithError(path, "invalid-key");
  }
}

function requireArabicTitle(path: string, title: string) {
  if (!title) {
    redirectWithError(path, "missing-arabic-title");
  }
}

function idFromForm(path: string, formData: FormData) {
  const id = text(formData.get("id"));

  if (!id) {
    redirectWithError(path, "missing-id");
  }

  return id;
}

function optionalJson(path: string, value: FormDataEntryValue | null) {
  const cleaned = text(value);

  if (!cleaned) {
    return Prisma.JsonNull;
  }

  try {
    return JSON.parse(cleaned) as Prisma.InputJsonValue;
  } catch {
    redirectWithError(path, "invalid-sections-json");
  }
}

function pageTranslation(path: string, formData: FormData, prefix: "ar" | "en") {
  return {
    title: text(formData.get(`${prefix}Title`)),
    summary: optionalText(formData.get(`${prefix}Summary`)),
    body: optionalText(formData.get(`${prefix}Body`)),
    sections: optionalJson(path, formData.get(`${prefix}Sections`)),
    seoTitle: optionalText(formData.get(`${prefix}SeoTitle`)),
    seoDescription: optionalText(formData.get(`${prefix}SeoDescription`)),
  };
}

function serviceTranslation(formData: FormData, prefix: "ar" | "en") {
  return {
    title: text(formData.get(`${prefix}Title`)),
    summary: optionalText(formData.get(`${prefix}Summary`)),
    body: optionalText(formData.get(`${prefix}Body`)),
    seoTitle: optionalText(formData.get(`${prefix}SeoTitle`)),
    seoDescription: optionalText(formData.get(`${prefix}SeoDescription`)),
  };
}

function sectorTranslation(formData: FormData, prefix: "ar" | "en") {
  return {
    title: text(formData.get(`${prefix}Title`)),
    summary: optionalText(formData.get(`${prefix}Summary`)),
  };
}

function projectTranslation(formData: FormData, prefix: "ar" | "en") {
  return {
    title: text(formData.get(`${prefix}Title`)),
    summary: optionalText(formData.get(`${prefix}Summary`)),
    challenge: optionalText(formData.get(`${prefix}Challenge`)),
    approach: optionalText(formData.get(`${prefix}Approach`)),
    results: optionalText(formData.get(`${prefix}Results`)),
    body: optionalText(formData.get(`${prefix}Body`)),
    seoTitle: optionalText(formData.get(`${prefix}SeoTitle`)),
    seoDescription: optionalText(formData.get(`${prefix}SeoDescription`)),
  };
}

function partnerTranslation(formData: FormData, prefix: "ar" | "en") {
  return {
    name: text(formData.get(`${prefix}Name`)),
    description: optionalText(formData.get(`${prefix}Description`)),
  };
}

function teamTranslation(formData: FormData, prefix: "ar" | "en") {
  return {
    name: text(formData.get(`${prefix}Name`)),
    position: optionalText(formData.get(`${prefix}Position`)),
    bio: optionalText(formData.get(`${prefix}Bio`)),
  };
}

export async function createPageAction(formData: FormData) {
  const path = "/admin/pages";
  await requireContentManager();

  const key = normalizeKey(formData.get("key"));
  const slug = normalizeSlug(formData.get("slug"));
  const ar = pageTranslation(path, formData, "ar");
  const en = pageTranslation(path, formData, "en");

  validateKey(path, key);
  validateSlug(path, slug);
  requireArabicTitle(path, ar.title);

  try {
    await prisma.page.create({
      data: {
        key,
        slug,
        isPublished: checked(formData, "isPublished"),
        sortOrder: sortOrder(formData.get("sortOrder")),
        translations: {
          create: [
            { locale: Locale.ar, ...ar },
            { locale: Locale.en, ...en },
          ],
        },
      },
    });
  } catch (error) {
    handleCmsError(path, error);
  }

  redirectWithSuccess(path, slug);
}

export async function updatePageAction(formData: FormData) {
  const path = "/admin/pages";
  await requireContentManager();

  const id = idFromForm(path, formData);
  const key = normalizeKey(formData.get("key"));
  const slug = normalizeSlug(formData.get("slug"));
  const ar = pageTranslation(path, formData, "ar");
  const en = pageTranslation(path, formData, "en");

  validateKey(path, key);
  validateSlug(path, slug);
  requireArabicTitle(path, ar.title);

  try {
    await prisma.$transaction([
      prisma.page.update({
        where: { id },
        data: {
          key,
          slug,
          isPublished: checked(formData, "isPublished"),
          sortOrder: sortOrder(formData.get("sortOrder")),
        },
      }),
      prisma.pageTranslation.upsert({
        where: { pageId_locale: { pageId: id, locale: Locale.ar } },
        create: { pageId: id, locale: Locale.ar, ...ar },
        update: ar,
      }),
      prisma.pageTranslation.upsert({
        where: { pageId_locale: { pageId: id, locale: Locale.en } },
        create: { pageId: id, locale: Locale.en, ...en },
        update: en,
      }),
    ]);
  } catch (error) {
    handleCmsError(path, error);
  }

  redirectWithSuccess(path, slug);
}

export async function deletePageAction(formData: FormData) {
  const path = "/admin/pages";
  await requireContentManager();
  const id = idFromForm(path, formData);

  await prisma.page.update({
    where: { id },
    data: { deletedAt: new Date(), isPublished: false },
  });

  redirectWithSuccess(path, "deleted");
}

export async function createServiceAction(formData: FormData) {
  const path = "/admin/services";
  await requireContentManager();

  const slug = normalizeSlug(formData.get("slug"));
  const ar = serviceTranslation(formData, "ar");
  const en = serviceTranslation(formData, "en");

  validateSlug(path, slug);
  requireArabicTitle(path, ar.title);

  try {
    await prisma.service.create({
      data: {
        slug,
        icon: optionalText(formData.get("icon")),
        featuredImageId: optionalId(formData.get("featuredImageId")),
        isPublished: checked(formData, "isPublished"),
        sortOrder: sortOrder(formData.get("sortOrder")),
        translations: {
          create: [
            { locale: Locale.ar, ...ar },
            { locale: Locale.en, ...en },
          ],
        },
      },
    });
  } catch (error) {
    handleCmsError(path, error);
  }

  redirectWithSuccess(path, slug);
}

export async function updateServiceAction(formData: FormData) {
  const path = "/admin/services";
  await requireContentManager();

  const id = idFromForm(path, formData);
  const slug = normalizeSlug(formData.get("slug"));
  const ar = serviceTranslation(formData, "ar");
  const en = serviceTranslation(formData, "en");

  validateSlug(path, slug);
  requireArabicTitle(path, ar.title);

  try {
    await prisma.$transaction([
      prisma.service.update({
        where: { id },
        data: {
          slug,
          icon: optionalText(formData.get("icon")),
          featuredImageId: optionalId(formData.get("featuredImageId")),
          isPublished: checked(formData, "isPublished"),
          sortOrder: sortOrder(formData.get("sortOrder")),
        },
      }),
      prisma.serviceTranslation.upsert({
        where: { serviceId_locale: { serviceId: id, locale: Locale.ar } },
        create: { serviceId: id, locale: Locale.ar, ...ar },
        update: ar,
      }),
      prisma.serviceTranslation.upsert({
        where: { serviceId_locale: { serviceId: id, locale: Locale.en } },
        create: { serviceId: id, locale: Locale.en, ...en },
        update: en,
      }),
    ]);
  } catch (error) {
    handleCmsError(path, error);
  }

  redirectWithSuccess(path, slug);
}

export async function deleteServiceAction(formData: FormData) {
  const path = "/admin/services";
  await requireContentManager();
  const id = idFromForm(path, formData);

  await prisma.service.update({
    where: { id },
    data: { deletedAt: new Date(), isPublished: false },
  });

  redirectWithSuccess(path, "deleted");
}

export async function createSectorAction(formData: FormData) {
  const path = "/admin/sectors";
  await requireContentManager();

  const slug = normalizeSlug(formData.get("slug"));
  const ar = sectorTranslation(formData, "ar");
  const en = sectorTranslation(formData, "en");

  validateSlug(path, slug);
  requireArabicTitle(path, ar.title);

  try {
    await prisma.sector.create({
      data: {
        slug,
        icon: optionalText(formData.get("icon")),
        isPublished: checked(formData, "isPublished"),
        sortOrder: sortOrder(formData.get("sortOrder")),
        translations: {
          create: [
            { locale: Locale.ar, ...ar },
            { locale: Locale.en, ...en },
          ],
        },
      },
    });
  } catch (error) {
    handleCmsError(path, error);
  }

  redirectWithSuccess(path, slug);
}

export async function updateSectorAction(formData: FormData) {
  const path = "/admin/sectors";
  await requireContentManager();

  const id = idFromForm(path, formData);
  const slug = normalizeSlug(formData.get("slug"));
  const ar = sectorTranslation(formData, "ar");
  const en = sectorTranslation(formData, "en");

  validateSlug(path, slug);
  requireArabicTitle(path, ar.title);

  try {
    await prisma.$transaction([
      prisma.sector.update({
        where: { id },
        data: {
          slug,
          icon: optionalText(formData.get("icon")),
          isPublished: checked(formData, "isPublished"),
          sortOrder: sortOrder(formData.get("sortOrder")),
        },
      }),
      prisma.sectorTranslation.upsert({
        where: { sectorId_locale: { sectorId: id, locale: Locale.ar } },
        create: { sectorId: id, locale: Locale.ar, ...ar },
        update: ar,
      }),
      prisma.sectorTranslation.upsert({
        where: { sectorId_locale: { sectorId: id, locale: Locale.en } },
        create: { sectorId: id, locale: Locale.en, ...en },
        update: en,
      }),
    ]);
  } catch (error) {
    handleCmsError(path, error);
  }

  redirectWithSuccess(path, slug);
}

export async function deleteSectorAction(formData: FormData) {
  const path = "/admin/sectors";
  await requireContentManager();
  const id = idFromForm(path, formData);

  await prisma.sector.update({
    where: { id },
    data: { deletedAt: new Date(), isPublished: false },
  });

  redirectWithSuccess(path, "deleted");
}

export async function createProjectAction(formData: FormData) {
  const path = "/admin/projects";
  await requireContentManager();

  const slug = normalizeSlug(formData.get("slug"));
  const ar = projectTranslation(formData, "ar");
  const en = projectTranslation(formData, "en");
  const sectorId = optionalText(formData.get("sectorId"));

  validateSlug(path, slug);
  requireArabicTitle(path, ar.title);

  try {
    await prisma.project.create({
      data: {
        slug,
        sectorId,
        featuredImageId: optionalId(formData.get("featuredImageId")),
        isFeatured: checked(formData, "isFeatured"),
        isPublished: checked(formData, "isPublished"),
        sortOrder: sortOrder(formData.get("sortOrder")),
        translations: {
          create: [
            { locale: Locale.ar, ...ar },
            { locale: Locale.en, ...en },
          ],
        },
      },
    });
  } catch (error) {
    handleCmsError(path, error);
  }

  redirectWithSuccess(path, slug);
}

export async function updateProjectAction(formData: FormData) {
  const path = "/admin/projects";
  await requireContentManager();

  const id = idFromForm(path, formData);
  const slug = normalizeSlug(formData.get("slug"));
  const ar = projectTranslation(formData, "ar");
  const en = projectTranslation(formData, "en");
  const sectorId = optionalText(formData.get("sectorId"));

  validateSlug(path, slug);
  requireArabicTitle(path, ar.title);

  try {
    await prisma.$transaction([
      prisma.project.update({
        where: { id },
        data: {
          slug,
          sectorId,
          featuredImageId: optionalId(formData.get("featuredImageId")),
          isFeatured: checked(formData, "isFeatured"),
          isPublished: checked(formData, "isPublished"),
          sortOrder: sortOrder(formData.get("sortOrder")),
        },
      }),
      prisma.projectTranslation.upsert({
        where: { projectId_locale: { projectId: id, locale: Locale.ar } },
        create: { projectId: id, locale: Locale.ar, ...ar },
        update: ar,
      }),
      prisma.projectTranslation.upsert({
        where: { projectId_locale: { projectId: id, locale: Locale.en } },
        create: { projectId: id, locale: Locale.en, ...en },
        update: en,
      }),
    ]);
  } catch (error) {
    handleCmsError(path, error);
  }

  redirectWithSuccess(path, slug);
}

export async function deleteProjectAction(formData: FormData) {
  const path = "/admin/projects";
  await requireContentManager();
  const id = idFromForm(path, formData);

  await prisma.project.update({
    where: { id },
    data: { deletedAt: new Date(), isPublished: false },
  });

  redirectWithSuccess(path, "deleted");
}

export async function createPartnerAction(formData: FormData) {
  const path = "/admin/partners";
  await requireContentManager();

  const slug = normalizeSlug(formData.get("slug"));
  const ar = partnerTranslation(formData, "ar");
  const en = partnerTranslation(formData, "en");

  validateSlug(path, slug);
  requireArabicTitle(path, ar.name);

  try {
    await prisma.partner.create({
      data: {
        slug,
        websiteUrl: optionalText(formData.get("websiteUrl")),
        logoMediaId: optionalId(formData.get("logoMediaId")),
        isPublished: checked(formData, "isPublished"),
        sortOrder: sortOrder(formData.get("sortOrder")),
        translations: {
          create: [
            { locale: Locale.ar, ...ar },
            { locale: Locale.en, ...en },
          ],
        },
      },
    });
  } catch (error) {
    handleCmsError(path, error);
  }

  redirectWithSuccess(path, slug);
}

export async function updatePartnerAction(formData: FormData) {
  const path = "/admin/partners";
  await requireContentManager();

  const id = idFromForm(path, formData);
  const slug = normalizeSlug(formData.get("slug"));
  const ar = partnerTranslation(formData, "ar");
  const en = partnerTranslation(formData, "en");

  validateSlug(path, slug);
  requireArabicTitle(path, ar.name);

  try {
    await prisma.$transaction([
      prisma.partner.update({
        where: { id },
        data: {
          slug,
          websiteUrl: optionalText(formData.get("websiteUrl")),
          logoMediaId: optionalId(formData.get("logoMediaId")),
          isPublished: checked(formData, "isPublished"),
          sortOrder: sortOrder(formData.get("sortOrder")),
        },
      }),
      prisma.partnerTranslation.upsert({
        where: { partnerId_locale: { partnerId: id, locale: Locale.ar } },
        create: { partnerId: id, locale: Locale.ar, ...ar },
        update: ar,
      }),
      prisma.partnerTranslation.upsert({
        where: { partnerId_locale: { partnerId: id, locale: Locale.en } },
        create: { partnerId: id, locale: Locale.en, ...en },
        update: en,
      }),
    ]);
  } catch (error) {
    handleCmsError(path, error);
  }

  redirectWithSuccess(path, slug);
}

export async function deletePartnerAction(formData: FormData) {
  const path = "/admin/partners";
  await requireContentManager();
  const id = idFromForm(path, formData);

  await prisma.partner.update({
    where: { id },
    data: { deletedAt: new Date(), isPublished: false },
  });

  redirectWithSuccess(path, "deleted");
}

export async function createTeamMemberAction(formData: FormData) {
  const path = "/admin/team";
  await requireContentManager();

  const slug = normalizeSlug(formData.get("slug"));
  const ar = teamTranslation(formData, "ar");
  const en = teamTranslation(formData, "en");

  validateSlug(path, slug);
  requireArabicTitle(path, ar.name);

  try {
    await prisma.teamMember.create({
      data: {
        slug,
        email: optionalText(formData.get("email")),
        linkedInUrl: optionalText(formData.get("linkedInUrl")),
        imageMediaId: optionalId(formData.get("imageMediaId")),
        isPublished: checked(formData, "isPublished"),
        sortOrder: sortOrder(formData.get("sortOrder")),
        translations: {
          create: [
            { locale: Locale.ar, ...ar },
            { locale: Locale.en, ...en },
          ],
        },
      },
    });
  } catch (error) {
    handleCmsError(path, error);
  }

  redirectWithSuccess(path, slug);
}

export async function updateTeamMemberAction(formData: FormData) {
  const path = "/admin/team";
  await requireContentManager();

  const id = idFromForm(path, formData);
  const slug = normalizeSlug(formData.get("slug"));
  const ar = teamTranslation(formData, "ar");
  const en = teamTranslation(formData, "en");

  validateSlug(path, slug);
  requireArabicTitle(path, ar.name);

  try {
    await prisma.$transaction([
      prisma.teamMember.update({
        where: { id },
        data: {
          slug,
          email: optionalText(formData.get("email")),
          linkedInUrl: optionalText(formData.get("linkedInUrl")),
          imageMediaId: optionalId(formData.get("imageMediaId")),
          isPublished: checked(formData, "isPublished"),
          sortOrder: sortOrder(formData.get("sortOrder")),
        },
      }),
      prisma.teamMemberTranslation.upsert({
        where: { teamMemberId_locale: { teamMemberId: id, locale: Locale.ar } },
        create: { teamMemberId: id, locale: Locale.ar, ...ar },
        update: ar,
      }),
      prisma.teamMemberTranslation.upsert({
        where: { teamMemberId_locale: { teamMemberId: id, locale: Locale.en } },
        create: { teamMemberId: id, locale: Locale.en, ...en },
        update: en,
      }),
    ]);
  } catch (error) {
    handleCmsError(path, error);
  }

  redirectWithSuccess(path, slug);
}

export async function deleteTeamMemberAction(formData: FormData) {
  const path = "/admin/team";
  await requireContentManager();
  const id = idFromForm(path, formData);

  await prisma.teamMember.update({
    where: { id },
    data: { deletedAt: new Date(), isPublished: false },
  });

  redirectWithSuccess(path, "deleted");
}
