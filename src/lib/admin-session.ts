import { createHmac, timingSafeEqual } from "node:crypto";

export const ADMIN_SESSION_COOKIE = "saaq_admin_session";
export const ADMIN_SESSION_MAX_AGE = 60 * 60 * 12;
export const ADMIN_SESSION_PATH = "/";

export type AdminSession = {
  sub: "admin";
  exp: number;
};

function readEnv(name: string): string {
  return process.env[name]?.trim() ?? "";
}

function getSessionSecret(): string | null {
  const secret = readEnv("ADMIN_SESSION_SECRET");
  return secret.length >= 16 ? secret : null;
}

function hmac(value: string, secret: string): Buffer {
  return createHmac("sha256", secret).update(value).digest();
}

function digestEqual(left: Buffer, right: Buffer): boolean {
  if (left.length !== right.length) {
    return false;
  }

  return timingSafeEqual(left, right);
}

function stringsMatch(left: string, right: string, secret: string): boolean {
  return digestEqual(hmac(left, secret), hmac(right, secret));
}

export function verifyAdminCredentials(
  email: string,
  password: string
): boolean {
  const secret = getSessionSecret();
  const expectedEmail = readEnv("ADMIN_EMAIL").toLowerCase();
  const expectedPassword = readEnv("ADMIN_PASSWORD");

  if (!secret || !expectedEmail || !expectedPassword) {
    return false;
  }

  const emailMatches = stringsMatch(
    email.trim().toLowerCase(),
    expectedEmail,
    secret
  );
  const passwordMatches = stringsMatch(password, expectedPassword, secret);

  return emailMatches && passwordMatches;
}

export function createAdminSessionToken(): string | null {
  const secret = getSessionSecret();

  if (!secret) {
    return null;
  }

  const payload: AdminSession = {
    sub: "admin",
    exp: Date.now() + ADMIN_SESSION_MAX_AGE * 1000,
  };
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = hmac(body, secret).toString("base64url");

  return `${body}.${signature}`;
}

export function verifyAdminSessionToken(
  token: string | undefined
): AdminSession | null {
  const secret = getSessionSecret();

  if (!secret || !token) {
    return null;
  }

  const [body, signature] = token.split(".");

  if (!body || !signature) {
    return null;
  }

  const expected = hmac(body, secret);
  const provided = Buffer.from(signature, "base64url");

  if (!digestEqual(provided, expected)) {
    return null;
  }

  try {
    const payload = JSON.parse(
      Buffer.from(body, "base64url").toString("utf8")
    ) as AdminSession;

    if (payload.sub !== "admin" || typeof payload.exp !== "number") {
      return null;
    }

    if (payload.exp <= Date.now()) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

export function adminSessionCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: ADMIN_SESSION_PATH,
    maxAge: ADMIN_SESSION_MAX_AGE,
  };
}
