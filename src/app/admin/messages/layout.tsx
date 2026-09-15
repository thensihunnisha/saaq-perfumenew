import type { ReactNode } from "react";
import { requireAdmin } from "@/lib/admin-auth";

export default async function AdminMessagesLayout({
  children,
}: {
  children: ReactNode;
}) {
  await requireAdmin();
  return children;
}
