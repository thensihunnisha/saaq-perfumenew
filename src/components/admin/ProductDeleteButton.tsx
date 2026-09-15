"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type ProductDeleteButtonProps = {
  id: string;
  name: string;
};

export default function ProductDeleteButton({
  id,
  name,
}: ProductDeleteButtonProps) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function handleDelete() {
    if (!window.confirm(`Delete ${name}? This cannot be undone.`)) {
      return;
    }

    setPending(true);
    const response = await fetch(`/api/admin/products/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    setPending(false);

    if (!response.ok) {
      window.alert("Unable to delete this product.");
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
