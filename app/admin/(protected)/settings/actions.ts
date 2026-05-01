"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requireSuperAdmin } from "@/lib/auth/auth";
import { prisma } from "@/lib/prisma";

const path = "/admin/settings";
const keyPattern = /^[a-z0-9][a-z0-9._-]*$/;

function text(value: FormDataEntryValue | null, maxLength = 5000) {
  return String(value ?? "").trim().slice(0, maxLength);
}

function optionalText(value: FormDataEntryValue | null, maxLength = 5000) {
  const cleaned = text(value, maxLength);

  return cleaned.length > 0 ? cleaned : null;
}

function checked(formData: FormData, name: string) {
  return formData.get(name) === "on";
}

function normalizeKey(value: FormDataEntryValue | null) {
  return text(value, 160).toLowerCase();
}

function redirectWithError(error: string): never {
  redirect(`${path}?error=${encodeURIComponent(error)}`);
}

function redirectWithSuccess(saved: string): never {
  revalidatePath(path);
  redirect(`${path}?saved=${encodeURIComponent(saved)}`);
}

function settingData(formData: FormData) {
  const key = normalizeKey(formData.get("key"));
  const group = text(formData.get("group"), 80) || "general";

  if (!keyPattern.test(key)) {
    redirectWithError("invalid-key");
  }

  return {
    group,
    key,
    label: optionalText(formData.get("label"), 160),
    value: optionalText(formData.get("value")),
    isPublic: checked(formData, "isPublic"),
  };
}

function isUniqueError(error: unknown) {
  return typeof error === "object" && error !== null && "code" in error && error.code === "P2002";
}

export async function createSettingAction(formData: FormData) {
  await requireSuperAdmin();

  const data = settingData(formData);

  try {
    await prisma.siteSetting.create({ data });
  } catch (error) {
    if (isUniqueError(error)) {
      redirectWithError("duplicate-key");
    }

    throw error;
  }

  redirectWithSuccess(data.key);
}

export async function updateSettingAction(formData: FormData) {
  await requireSuperAdmin();

  const id = text(formData.get("id"), 120);
  const data = settingData(formData);

  if (!id) {
    redirectWithError("missing-id");
  }

  try {
    await prisma.siteSetting.update({
      where: { id },
      data,
    });
  } catch (error) {
    if (isUniqueError(error)) {
      redirectWithError("duplicate-key");
    }

    throw error;
  }

  redirectWithSuccess(data.key);
}

export async function deleteSettingAction(formData: FormData) {
  await requireSuperAdmin();

  const id = text(formData.get("id"), 120);

  if (!id) {
    redirectWithError("missing-id");
  }

  await prisma.siteSetting.delete({
    where: { id },
  });

  redirectWithSuccess("deleted");
}
