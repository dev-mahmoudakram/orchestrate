"use server";

import { redirect } from "next/navigation";

import { authenticateAdmin } from "@/lib/auth/auth";

export async function loginAction(formData: FormData) {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const result = await authenticateAdmin(email, password);

  if (!result.ok) {
    redirect("/admin/login?error=invalid");
  }

  redirect("/admin/dashboard");
}
