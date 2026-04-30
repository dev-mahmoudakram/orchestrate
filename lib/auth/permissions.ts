import { UserRole } from "@/lib/generated/prisma/client";

export type PermissionUser = {
  role: UserRole;
};

export function canManageUsers(user: PermissionUser) {
  return user.role === UserRole.SUPER_ADMIN;
}

export function canManageContent(user: PermissionUser) {
  return user.role === UserRole.SUPER_ADMIN || user.role === UserRole.ADMIN;
}

export function canManageSettings(user: PermissionUser) {
  return user.role === UserRole.SUPER_ADMIN;
}
