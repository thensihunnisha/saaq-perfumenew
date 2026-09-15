"use client";

import { useActionState } from "react";
import { loginAdmin, type AdminLoginState } from "@/app/admin/actions";

const initialState: AdminLoginState = {};

export default function AdminLoginForm() {
  const [state, formAction, pending] = useActionState(loginAdmin, initialState);

  return (
    <form action={formAction} className="mt-8 space-y-5">
      <label className="block">
        <span className="saaq-eyebrow text-[9px]">Email</span>
        <input
          type="email"
          name="email"
          autoComplete="username"
          required
          className="mt-3 h-12 w-full border border-white/15 bg-saaq-void px-4 font-sans text-sm text-saaq-ivory outline-none focus:border-saaq-gold"
        />
      </label>

      <label className="block">
        <span className="saaq-eyebrow text-[9px]">Password</span>
        <input
          type="password"
          name="password"
          autoComplete="current-password"
          required
          className="mt-3 h-12 w-full border border-white/15 bg-saaq-void px-4 font-sans text-sm text-saaq-ivory outline-none focus:border-saaq-gold"
        />
      </label>

      {state.error ? (
        <p className="border border-saaq-gold/25 bg-saaq-void px-4 py-3 font-sans text-sm text-saaq-ivory/80">
          {state.error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="saaq-btn saaq-transition mt-2 inline-flex h-12 w-full items-center justify-center border border-saaq-gold bg-saaq-gold font-sans text-[10px] uppercase tracking-[0.28em] text-saaq-black hover:bg-saaq-gold-deep disabled:opacity-60"
      >
        {pending ? "Signing in" : "Sign In"}
      </button>
    </form>
  );
}
