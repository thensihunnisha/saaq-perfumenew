"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

type CatalogNameFormProps = {
  resource: "categories" | "collections";
  itemId?: string;
  initialName?: string;
  submitLabel: string;
};

export default function CatalogNameForm({
  resource,
  itemId,
  initialName = "",
  submitLabel,
}: CatalogNameFormProps) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setPending(true);

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const response = await fetch(
      itemId ? `/api/admin/${resource}/${itemId}` : `/api/admin/${resource}`,
      {
        method: itemId ? "PUT" : "POST",
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ name }),
      }
    );
    const payload = (await response.json().catch(() => null)) as {
      message?: string;
    } | null;

    setPending(false);

    if (!response.ok) {
      setError(payload?.message || "Unable to save this record.");
      return;
    }

    router.push(`/admin/${resource}`);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 max-w-xl space-y-5">
      <label className="block">
        <span className="saaq-eyebrow text-[9px]">Name</span>
        <input
          name="name"
          required
          defaultValue={initialName}
          className="mt-3 h-12 w-full border border-white/15 bg-saaq-void px-4 font-sans text-sm text-saaq-ivory outline-none focus:border-saaq-gold"
        />
      </label>

      {error ? (
        <p className="border border-saaq-gold/25 bg-saaq-void px-4 py-3 font-sans text-sm text-saaq-ivory/80">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="saaq-btn saaq-transition inline-flex h-12 items-center justify-center border border-saaq-gold bg-saaq-gold px-8 font-sans text-[10px] uppercase tracking-[0.28em] text-saaq-black hover:bg-saaq-gold-deep disabled:opacity-60"
      >
        {pending ? "Saving" : submitLabel}
      </button>
    </form>
  );
}
