"use client";

import type { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LuxuryCursor from "@/components/LuxuryCursor";
import PageTransition from "@/components/PageTransition";

export default function StoreChrome({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main className="min-w-0">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
      <LuxuryCursor />
    </>
  );
}
