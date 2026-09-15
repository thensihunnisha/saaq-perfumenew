const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

type ExpressMethod = "GET" | "POST" | "PUT" | "DELETE";

export async function expressAdminRequest(
  path: string,
  method: ExpressMethod,
  body?: unknown
) {
  const secret = process.env.ADMIN_API_SECRET;

  if (!secret) {
    throw new Error("ADMIN_API_SECRET is not set");
  }

  return fetch(`${API_URL}${path}`, {
    method,
    headers: {
      "content-type": "application/json",
      "x-admin-secret": secret,
    },
    body: body === undefined ? undefined : JSON.stringify(body),
    cache: "no-store",
  });
}
