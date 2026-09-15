import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  ADMIN_SESSION_COOKIE,
  adminSessionCookieOptions,
  createAdminSessionToken,
  verifyAdminSessionToken,
  type AdminSession,
} from "@/lib/admin-session";

export {
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_MAX_AGE,
  ADMIN_SESSION_PATH,
  createAdminSessionToken,
  verifyAdminCredentials,
  verifyAdminSessionToken,
} from "@/lib/admin-session";
export type { AdminSession } from "@/lib/admin-session";

async function expireAdminCookie(path: string) {
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_SESSION_COOKIE, "", {
    ...adminSessionCookieOptions(),
    path,
    maxAge: 0,
  });
}

export async function createAdminSession(): Promise<boolean> {
  const token = createAdminSessionToken();

  if (!token) {
    return false;
  }

  const cookieStore = await cookies();
  await expireAdminCookie("/admin");
  cookieStore.set(
    ADMIN_SESSION_COOKIE,
    token,
    adminSessionCookieOptions()
  );
  return true;
}

export async function clearAdminSession() {
  await expireAdminCookie("/");
  await expireAdminCookie("/admin");
}

export async function getAdminSession(): Promise<AdminSession | null> {
  const cookieStore = await cookies();
  return verifyAdminSessionToken(
    cookieStore.get(ADMIN_SESSION_COOKIE)?.value
  );
}

export async function requireAdmin() {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  return session;
}
