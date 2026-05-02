import { cookies } from "next/headers";
import { jwtVerify, SignJWT } from "jose";

import type { UserRole } from "@/lib/prisma/enums";

export const adminSessionCookieName = "orchestrate_admin_session";

export type AdminSession = {
  userId: string;
  email: string;
  name: string;
  role: UserRole;
};

const sessionDurationSeconds = 60 * 60 * 8;

function getSessionSecret() {
  const secret = process.env.AUTH_SECRET;

  if (!secret) {
    throw new Error("AUTH_SECRET is required.");
  }

  return new TextEncoder().encode(secret);
}

export async function createAdminSession(session: AdminSession) {
  const token = await new SignJWT({
    email: session.email,
    name: session.name,
    role: session.role,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(session.userId)
    .setIssuedAt()
    .setExpirationTime(`${sessionDurationSeconds}s`)
    .sign(getSessionSecret());

  const cookieStore = await cookies();

  cookieStore.set(adminSessionCookieName, token, {
    httpOnly: true,
    maxAge: sessionDurationSeconds,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(adminSessionCookieName);
}

export async function readAdminSession(): Promise<AdminSession | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(adminSessionCookieName)?.value;

  if (!token) {
    return null;
  }

  try {
    const { payload } = await jwtVerify(token, getSessionSecret());

    if (!payload.sub || !payload.email || !payload.name || !payload.role) {
      return null;
    }

    return {
      userId: payload.sub,
      email: String(payload.email),
      name: String(payload.name),
      role: payload.role as UserRole,
    };
  } catch {
    return null;
  }
}
