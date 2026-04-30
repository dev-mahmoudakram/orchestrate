"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requireAdmin } from "@/lib/auth/auth";
import { prisma } from "@/lib/prisma";

function cleanOptionalValue(value: FormDataEntryValue | null) {
  const text = String(value ?? "").trim();
  return text.length > 0 ? text : null;
}

function cleanRequiredValue(value: FormDataEntryValue | null) {
  return String(value ?? "").trim();
}

function redirectWithError(error: string) {
  redirect(`/admin/translations?error=${encodeURIComponent(error)}`);
}

function revalidateTranslations() {
  revalidatePath("/admin/translations");
}

export async function createTranslationKeyAction(formData: FormData) {
  await requireAdmin();

  const key = cleanRequiredValue(formData.get("key"));
  const group = cleanRequiredValue(formData.get("group"));
  const ar = cleanRequiredValue(formData.get("ar"));
  const en = cleanOptionalValue(formData.get("en"));
  const description = cleanOptionalValue(formData.get("description"));

  if (!key || !group || !ar) {
    redirectWithError("missing-required-fields");
  }

  const existingKey = await prisma.translationKey.findUnique({
    where: {
      key,
    },
    select: {
      id: true,
    },
  });

  if (existingKey) {
    redirectWithError("duplicate-key");
  }

  await prisma.translationKey.create({
    data: {
      key,
      group,
      ar,
      en,
      description,
    },
  });

  revalidateTranslations();
  redirect(`/admin/translations?created=${encodeURIComponent(key)}`);
}

export async function updateTranslationKeyAction(formData: FormData) {
  await requireAdmin();

  const id = cleanRequiredValue(formData.get("id"));
  const group = cleanRequiredValue(formData.get("group"));
  const ar = cleanRequiredValue(formData.get("ar"));
  const en = cleanOptionalValue(formData.get("en"));
  const description = cleanOptionalValue(formData.get("description"));

  if (!id || !group || !ar) {
    redirectWithError("missing-required-fields");
  }

  await prisma.translationKey.update({
    where: {
      id,
    },
    data: {
      group,
      ar,
      en,
      description,
    },
  });

  revalidateTranslations();
  redirect("/admin/translations?updated=1");
}
