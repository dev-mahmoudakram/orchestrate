import { redirect } from "next/navigation";
import { compare } from "bcryptjs";

import { createAdminSession, readAdminSession, type AdminSession } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";
import { UserRole } from "@/lib/prisma/enums";

export type CurrentAdminUser = AdminSession & {
  isActive: boolean;
};

export async function getCurrentUser(): Promise<CurrentAdminUser | null> {
  const session = await readAdminSession();

  if (!session) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.userId,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isActive: true,
    },
  });

  if (!user?.isActive) {
    return null;
  }

  return {
    userId: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    isActive: user.isActive,
  };
}

export async function requireAdmin() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/admin/login");
  }

  return user;
}

export async function requireSuperAdmin() {
  const user = await requireAdmin();

  if (user.role !== UserRole.SUPER_ADMIN) {
    redirect("/admin/dashboard?error=forbidden");
  }

  return user;
}

export async function authenticateAdmin(email: string, password: string) {
  const normalizedEmail = email.trim().toLowerCase();

  if (!normalizedEmail || !password) {
    return { ok: false as const };
  }

  const user = await prisma.user.findUnique({
    where: {
      email: normalizedEmail,
    },
  });

  if (!user?.isActive) {
    return { ok: false as const };
  }

  const passwordMatches = await compare(password, user.passwordHash);

  if (!passwordMatches) {
    return { ok: false as const };
  }

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      lastLoginAt: new Date(),
    },
  });

  await createAdminSession({
    userId: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  });

  return { ok: true as const };
}
