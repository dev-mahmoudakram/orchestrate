"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requireAdmin } from "@/lib/auth/auth";
import { canManageContent } from "@/lib/auth/permissions";
import { MessageStatus } from "@/lib/generated/prisma/client";
import { prisma } from "@/lib/prisma";

type MessageFilter = "all" | "unread" | "read" | "archived";

function text(value: FormDataEntryValue | null) {
  return String(value ?? "").trim();
}

function returnPath(formData: FormData) {
  const status = text(formData.get("status")) as MessageFilter;
  const safeStatus: MessageFilter = ["all", "unread", "read", "archived"].includes(status) ? status : "all";

  return safeStatus === "all" ? "/admin/messages?updated=1" : `/admin/messages?status=${safeStatus}&updated=1`;
}

async function requireMessageManager() {
  const user = await requireAdmin();

  if (!canManageContent(user)) {
    redirect("/admin/dashboard?error=forbidden");
  }
}

async function updateMessageStatus(formData: FormData, status: MessageStatus) {
  await requireMessageManager();

  const id = text(formData.get("id"));

  if (!id) {
    redirect("/admin/messages?error=missing-id");
  }

  try {
    await prisma.contactMessage.update({
      where: { id },
      data: { status },
    });
  } catch {
    redirect("/admin/messages?error=update-failed");
  }

  revalidatePath("/admin/messages");
  redirect(returnPath(formData));
}

export async function markMessageReadAction(formData: FormData) {
  await updateMessageStatus(formData, MessageStatus.READ);
}

export async function markMessageUnreadAction(formData: FormData) {
  await updateMessageStatus(formData, MessageStatus.UNREAD);
}

export async function archiveMessageAction(formData: FormData) {
  await updateMessageStatus(formData, MessageStatus.ARCHIVED);
}
