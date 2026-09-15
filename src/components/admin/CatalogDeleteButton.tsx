"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type CatalogDeleteButtonProps = {
  resource: "categories" | "collections";
  id: string;
  name: string;
};

export default function CatalogDeleteButton({
  resource,
  id,
  name,
}: CatalogDeleteButtonProps) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const singular = resource === "categories" ? "category" : "collection";

  async function handleDelete() {
    if (!window.confirm(`Delete ${name}? This cannot be undone.`)) {
      return;
    }

    setPending(true);
    const response = await fetch(`/api/admin/${resource}/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    const payload = (await response.json().catch(() => null)) as {
      message?: string;
    } | null;
    setPending(false);

    if (!response.ok) {
      window.alert(
        payload?.message || `Unable to delete this ${singular}.`
      );
      return;
    }

    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={pending}
      className="saaq-transition font-sans text-[10px] uppercase tracking-[0.22em] text-saaq-ivory/45 hover:text-saaq-gold disabled:opacity-60"
    >
      {pending ? "Deleting" : "Delete"}
    </button>
  );
}
