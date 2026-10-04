"use client";

import { FormEvent, useState } from "react";
import { getNewsletterMailto } from "@/config/contact";
import { cn } from "@/lib/cn";

type NewsletterFormProps = {
  className?: string;
  inputLabel?: string;
  buttonLabel?: string;
  heading?: string;
  tone?: "dark" | "light";
};

export default function NewsletterForm({
  className,
  inputLabel = "Your email",
  buttonLabel = "Join SAAQ",
  heading,
  tone = "dark",
}: NewsletterFormProps) {
  const light = tone === "light";
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextEmail = email.trim().toLowerCase();

    if (!nextEmail) {
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ email: nextEmail }),
      });
      const payload = (await response.json()) as {
        success?: boolean;
        message?: string;
      };

      if (response.status === 400) {
        setStatus("error");
        setMessage(payload.message || "Enter a valid email.");
        return;
      }

      if (!response.ok || !payload.success) {
        throw new Error(payload.message || "Unable to join the list.");
      }

      setStatus("success");
      setMessage(payload.message || "You are on the list. Welcome to SAAQ.");
      setEmail("");
    } catch (error) {
      const fallback = getNewsletterMailto(nextEmail);

      try {
        window.location.assign(fallback);
        setStatus("success");
        setMessage("Opening your email to finish joining the SAAQ list.");
        setEmail("");
      } catch {
        setStatus("error");
        setMessage(
          error instanceof Error
            ? error.message
            : "Unable to join the list right now."
        );
      }
    }
  };

  return (
    <div className={className}>
      {heading ? (
        <p
          className={cn(
            "font-sans text-[10px] uppercase tracking-[0.28em]",
            light ? "text-saaq-black/60" : "text-saaq-ivory/70"
          )}
        >
          {heading}
        </p>
      ) : null}
      {status === "success" ? (
        <p className="mt-4 font-sans text-sm text-saaq-gold">{message}</p>
      ) : (
        <form
          onSubmit={handleSubmit}
          className={cn(
            "flex flex-col sm:flex-row",
            light ? "border border-saaq-black/15" : "border border-white/15",
            heading ? "mt-4" : ""
          )}
        >
          <input
            type="email"
            required
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              if (status === "error") {
                setStatus("idle");
                setMessage("");
              }
            }}
            placeholder={inputLabel}
            aria-label={inputLabel}
            autoComplete="email"
            disabled={status === "loading"}
            className={cn(
              "min-w-0 flex-1 bg-transparent px-4 py-3 font-sans text-sm outline-none disabled:opacity-60",
              light
                ? "text-saaq-black placeholder:text-saaq-black/35"
                : "text-saaq-ivory placeholder:text-saaq-ivory/30"
            )}
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="saaq-transition bg-saaq-gold px-5 py-3 font-sans text-[10px] uppercase tracking-[0.2em] text-saaq-black hover:bg-saaq-gold-deep disabled:opacity-70 sm:py-0"
          >
            {status === "loading" ? "Joining" : buttonLabel}
          </button>
        </form>
      )}
      {status === "error" && message ? (
        <p className="mt-3 font-sans text-sm text-saaq-gold">{message}</p>
      ) : null}
    </div>
  );
}
