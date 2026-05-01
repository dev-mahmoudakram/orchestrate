"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { hash } from "bcryptjs";

import { requireSuperAdmin } from "@/lib/auth/auth";
import { UserRole } from "@/lib/generated/prisma/client";
import { prisma } from "@/lib/prisma";

const path = "/admin/users";
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function text(value: FormDataEntryValue | null, maxLength = 500) {
  return String(value ?? "").trim().slice(0, maxLength);
}

function checked(formData: FormData, name: string) {
  return formData.get(name) === "on";
}

function redirectWithError(error: string): never {
  redirect(`${path}?error=${encodeURIComponent(error)}`);
}

function redirectWithSuccess(saved: string): never {
  revalidatePath(path);
  redirect(`${path}?saved=${encodeURIComponent(saved)}`);
}

function normalizeEmail(value: FormDataEntryValue | null) {
  return text(value, 180).toLowerCase();
}

function roleFromForm(value: FormDataEntryValue | null) {
  return value === UserRole.SUPER_ADMIN ? UserRole.SUPER_ADMIN : UserRole.ADMIN;
}

function isUniqueError(error: unknown) {
  return typeof error === "object" && error !== null && "code" in error && error.code === "P2002";
}

function validateNameEmail(name: string, email: string) {
  if (!name) {
    redirectWithError("missing-name");
  }

  if (!emailPattern.test(email)) {
    redirectWithError("invalid-email");
  }
}

export async function createUserAction(formData: FormData) {
  await requireSuperAdmin();

  const name = text(formData.get("name"), 160);
  const email = normalizeEmail(formData.get("email"));
  const password = text(formData.get("password"), 200);
  const role = roleFromForm(formData.get("role"));

  validateNameEmail(name, email);

  if (password.length < 8) {
    redirectWithError("weak-password");
  }

  try {
    await prisma.user.create({
      data: {
        name,
        email,
        passwordHash: await hash(password, 12),
        role,
        isActive: checked(formData, "isActive"),
      },
    });
  } catch (error) {
    if (isUniqueError(error)) {
      redirectWithError("duplicate-email");
    }

    throw error;
  }

  redirectWithSuccess(email);
}

export async function updateUserAction(formData: FormData) {
  const currentUser = await requireSuperAdmin();
  const id = text(formData.get("id"), 120);
  const name = text(formData.get("name"), 160);
  const email = normalizeEmail(formData.get("email"));
  const password = text(formData.get("password"), 200);
  let role = roleFromForm(formData.get("role"));
  let isActive = checked(formData, "isActive");

  if (!id) {
    redirectWithError("missing-id");
  }

  validateNameEmail(name, email);

  if (id === currentUser.userId) {
    role = UserRole.SUPER_ADMIN;
    isActive = true;
  }

  if (password && password.length < 8) {
    redirectWithError("weak-password");
  }

  try {
    await prisma.user.update({
      where: { id },
      data: {
        name,
        email,
        role,
        isActive,
        ...(password ? { passwordHash: await hash(password, 12) } : {}),
      },
    });
  } catch (error) {
    if (isUniqueError(error)) {
      redirectWithError("duplicate-email");
    }

    throw error;
  }

  redirectWithSuccess(email);
}

export async function deactivateUserAction(formData: FormData) {
  const currentUser = await requireSuperAdmin();
  const id = text(formData.get("id"), 120);

  if (!id) {
    redirectWithError("missing-id");
  }

  if (id === currentUser.userId) {
    redirectWithError("cannot-deactivate-self");
  }

  await prisma.user.update({
    where: { id },
    data: { isActive: false },
  });

  redirectWithSuccess("deactivated");
}

export async function activateUserAction(formData: FormData) {
  await requireSuperAdmin();

  const id = text(formData.get("id"), 120);

  if (!id) {
    redirectWithError("missing-id");
  }

  await prisma.user.update({
    where: { id },
    data: { isActive: true },
  });

  redirectWithSuccess("activated");
}
