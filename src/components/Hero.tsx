"use client";

import Link from "next/link";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[680px] w-full overflow-hidden bg-[#080808]">
      
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      {/* Dark Cinematic Overlay */}
      <div className="absolute inset-0 bg-black/45" />

      {/* Left Dark Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/35 to-transparent" />

      {/* Bottom Dark Gradient */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/75 to-transparent" />

      {/* Gold Atmospheric Glow */}
      <div className="absolute left-[-10%] top-[35%] h-[500px] w-[500px] rounded-full bg-[#d4af37]/10 blur-[140px]" />

      {/* Hero Content */}
      <div className="relative z-10 flex h-full w-full items-center px-6 sm:px-10 md:px-16 lg:px-24">
        
        <div className="max-w-[720px]">
          
        

                 </div>
      </div>

      {/* Bottom-Left CTA */}
      <div className="absolute bottom-10 left-6 z-20 sm:bottom-12 sm:left-10 md:bottom-14 md:left-16 lg:bottom-16 lg:left-24">
        <Link
          href="/shop"
          className="group relative inline-flex items-center justify-center overflow-hidden border border-[#d4af37] bg-[#d4af37] px-8 py-4 font-['Inter',sans-serif] text-[10px] font-semibold uppercase tracking-[0.25em] text-white transition-all duration-500 hover:bg-[#e4c04d] hover:shadow-[0_10px_40px_rgba(212,175,55,0.3)] sm:px-9 sm:py-[18px]"
        >
          {/* Shine Animation */}
          <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-700 group-hover:translate-x-full" />

          <span className="relative z-10">
            SHOP COLLECTION
          </span>
        </Link>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 right-6 z-20 hidden flex-col items-center gap-3 sm:flex">
        <span className="font-['Inter',sans-serif] text-[8px] uppercase tracking-[0.35em] text-white/60 [writing-mode:vertical-rl]">
          SCROLL
        </span>

        <div className="h-12 w-px bg-gradient-to-b from-[#d4af37] to-transparent" />

        <ArrowDown
          size={13}
          strokeWidth={1}
          className="text-[#d4af37]"
        />
      </div>

    </section>
  );
}