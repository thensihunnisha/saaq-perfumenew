import type { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";
import AdminLoginForm from "@/components/admin/AdminLoginForm";
import { getAdminSession } from "@/lib/admin-auth";

export const metadata: Metadata = {
  title: "Admin Sign In | SAAQ PERFUME",
  description: "Sign in to the SAAQ Perfume administration panel.",
};

export default async function AdminLoginPage() {
  const session = await getAdminSession();

  if (session) {
    redirect("/admin");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-saaq-void px-4 py-16">
      <div className="w-full max-w-md border border-saaq-gold/20 bg-saaq-black p-8 sm:p-10">
        <div className="flex flex-col items-center text-center">
          <span className="relative flex h-16 w-16 items-center justify-center">
            <span className="absolute inset-0 rounded-full border border-saaq-gold/40" />
            <span className="relative h-14 w-14 overflow-hidden rounded-full border border-saaq-gold/70 bg-saaq-black">
              <Image
                src="/images/logo/saaq-logo.jpeg"
                alt="SAAQ"
                fill
                sizes="56px"
                className="object-cover"
              />
            </span>
          </span>
          <p className="saaq-eyebrow mt-6">SAAQ Perfume</p>
          <h1 className="mt-4 font-display text-4xl text-saaq-ivory">
            Sign In
          </h1>
          <p className="saaq-body mt-4 max-w-sm">
            Enter your administrator credentials to continue.
          </p>
        </div>

        <AdminLoginForm />
      </div>
    </div>
  );
}
