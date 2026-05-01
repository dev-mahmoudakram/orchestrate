"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import type { Locale } from "@/types/locale";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function text(value: FormDataEntryValue | null, maxLength: number) {
  return String(value ?? "").trim().slice(0, maxLength);
}

function contactRedirect(locale: Locale, state: "sent" | "error") {
  redirect(`${locale === "en" ? "/en/contact" : "/contact"}?contact=${state}`);
}

function localeFromForm(value: FormDataEntryValue | null): Locale {
  return value === "en" ? "en" : "ar";
}

export async function submitContactMessageAction(formData: FormData) {
  const locale = localeFromForm(formData.get("locale"));
  const honeypot = text(formData.get("website"), 120);

  if (honeypot) {
    contactRedirect(locale, "sent");
  }

  const name = text(formData.get("name"), 120);
  const company = text(formData.get("company"), 160);
  const email = text(formData.get("email"), 160).toLowerCase();
  const phone = text(formData.get("phone"), 40);
  const subject = text(formData.get("subject"), 180);
  const message = text(formData.get("message"), 2000);

  if (!name || !email || !subject || !message || !emailPattern.test(email)) {
    contactRedirect(locale, "error");
  }

  const requestHeaders = await headers();
  const forwardedFor = requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim();
  const ipAddress = forwardedFor || requestHeaders.get("x-real-ip") || null;
  const userAgent = requestHeaders.get("user-agent");

  try {
    await prisma.contactMessage.create({
      data: {
        name,
        company: company || null,
        email,
        phone: phone || null,
        subject,
        message,
        ipAddress,
        userAgent,
      },
    });
  } catch {
    contactRedirect(locale, "error");
  }

  contactRedirect(locale, "sent");
}
