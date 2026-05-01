"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requireAdmin } from "@/lib/auth/auth";
import { canManageContent } from "@/lib/auth/permissions";
import { saveUploadedImage } from "@/lib/media/storage";
import { prisma } from "@/lib/prisma";

function text(value: FormDataEntryValue | null) {
  return String(value ?? "").trim();
}

function optionalText(value: FormDataEntryValue | null) {
  const cleaned = text(value);
  return cleaned.length > 0 ? cleaned : null;
}

async function requireMediaManager() {
  const user = await requireAdmin();

  if (!canManageContent(user)) {
    redirect("/admin/dashboard?error=forbidden");
  }
}

function redirectWithError(error: string): never {
  redirect(`/admin/media?error=${encodeURIComponent(error)}`);
}

function redirectWithSuccess(saved: string): never {
  revalidatePath("/admin/media");
  redirect(`/admin/media?saved=${encodeURIComponent(saved)}`);
}

export async function uploadMediaAction(formData: FormData) {
  await requireMediaManager();

  const file = formData.get("file");

  if (!(file instanceof File)) {
    redirectWithError("missing-file");
  }

  try {
    const uploaded = await saveUploadedImage(file);

    await prisma.media.create({
      data: {
        ...uploaded,
        altAr: optionalText(formData.get("altAr")),
        altEn: optionalText(formData.get("altEn")),
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      redirectWithError(error.message);
    }

    throw error;
  }

  redirectWithSuccess(file.name || "uploaded");
}

export async function updateMediaAction(formData: FormData) {
  await requireMediaManager();

  const id = text(formData.get("id"));

  if (!id) {
    redirectWithError("missing-id");
  }

  await prisma.media.update({
    where: { id },
    data: {
      altAr: optionalText(formData.get("altAr")),
      altEn: optionalText(formData.get("altEn")),
    },
  });

  redirectWithSuccess("updated");
}
