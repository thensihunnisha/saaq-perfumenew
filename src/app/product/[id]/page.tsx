import Link from "next/link";

export default function ProductPage() {
  return (
    <main className="min-h-screen bg-[#0b0b0b] px-6 py-20 text-white">
      <div className="mx-auto max-w-6xl">
        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-[#a07f3c]">
          SAAQ PERFUME
        </p>

        <h1 className="font-serif text-5xl">
          Product Details
        </h1>

        <p className="mt-6 text-white/60">
          Product page is working.
        </p>

        <Link
          href="/shop"
          className="mt-8 inline-block border border-[#a07f3c] px-6 py-3 text-sm uppercase tracking-widest text-[#a07f3c] transition hover:bg-[#a07f3c] hover:text-black"
        >
          Back to Shop
        </Link>
      </div>
    </main>
  );
}