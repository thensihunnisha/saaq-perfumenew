"use server";

import { redirect } from "next/navigation";
import { verifyAdminCredentials } from "@/lib/admin-session";
import { clearAdminSession, createAdminSession } from "@/lib/admin-auth";

export type AdminLoginState = {
  error?: string;
};

export async function loginAdmin(
  _previousState: AdminLoginState,
  formData: FormData
): Promise<AdminLoginState> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  if (!verifyAdminCredentials(email, password)) {
    return {
      error: "Invalid email or password.",
    };
  }

  const created = await createAdminSession();

  if (!created) {
    return {
      error: "Invalid email or password.",
    };
  }

  redirect("/admin");
}

export async function logoutAdmin() {
  await clearAdminSession();
  redirect("/admin/login");
}
