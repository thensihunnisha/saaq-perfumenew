import type { ReactNode } from "react";
import { requireAdmin } from "@/lib/admin-auth";

export default async function AdminCustomersLayout({
  children,
}: {
  children: ReactNode;
}) {
  await requireAdmin();
  return children;
}
