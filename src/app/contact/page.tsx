
"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { Mail, Phone, MapPin,  ArrowUpRight } from "lucide-react";
import { FaInstagram } from "react-icons/fa";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-[#080808] text-white">
      {/* =========================================================
          HERO
      ========================================================= */}

      <section className="relative overflow-hidden border-b border-white/10 pt-[114px]">
        <div className="absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-[#d4af37]/5 blur-[120px]" />

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08),transparent_55%)]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-20 text-center sm:px-10 lg:px-16 lg:py-24">
          <p className="mb-5 text-[9px] uppercase tracking-[0.45em] text-[#d4af37]">
            SAAQ PERFUME
          </p>

          <h1 className="font-['Playfair_Display',serif] text-5xl leading-tight sm:text-6xl lg:text-7xl">
            Contact Us
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-white/45 sm:text-base">
            We would love to hear from you. Whether you have a question
            about our fragrances, your order, or simply want to discover
            more about SAAQ, our team is here for you.
          </p>

          <div className="mx-auto mt-8 h-px w-14 bg-[#d4af37]" />
        </div>
      </section>

      {/* =========================================================
          CONTACT CONTENT
      ========================================================= */}

      <section className="border-b border-white/10 bg-[#080808]">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 sm:px-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:px-16 lg:py-24">

          {/* =====================================================
              LEFT SIDE
          ===================================================== */}

          <div>
            <p className="mb-4 text-[9px] uppercase tracking-[0.4em] text-[#d4af37]">
              GET IN TOUCH
            </p>

            <h2 className="font-['Playfair_Display',serif] text-3xl leading-tight sm:text-4xl lg:text-5xl">
              Let&apos;s Start
              <br />
              a Conversation.
            </h2>

            <p className="mt-6 max-w-md text-sm leading-7 text-white/45">
              Our fragrance specialists are here to help you find your
              signature scent and answer any questions you may have.
            </p>

            {/* CONTACT DETAILS */}

            <div className="mt-10 space-y-7">

              {/* Email */}
              <div className="flex items-start gap-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-[#d4af37]/30 bg-[#0d0d0d]">
                  <Mail
                    size={16}
                    strokeWidth={1.2}
                    className="text-[#d4af37]"
                  />
                </div>

                <div>
                  <p className="text-[8px] uppercase tracking-[0.3em] text-white/30">
                    Email
                  </p>

                  <a
                    href="mailto:info@saaqperfume.com"
                    className="mt-1 block text-sm text-white/75 transition-colors hover:text-[#d4af37]"
                  >
                    info@saaqperfume.com
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-[#d4af37]/30 bg-[#0d0d0d]">
                  <Phone
                    size={16}
                    strokeWidth={1.2}
                    className="text-[#d4af37]"
                  />
                </div>

                <div>
                  <p className="text-[8px] uppercase tracking-[0.3em] text-white/30">
                    Phone
                  </p>

                  <a
                    href="tel:+971500000000"
                    className="mt-1 block text-sm text-white/75 transition-colors hover:text-[#d4af37]"
                  >
                    +971 50 000 0000
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-[#d4af37]/30 bg-[#0d0d0d]">
                  <MapPin
                    size={16}
                    strokeWidth={1.2}
                    className="text-[#d4af37]"
                  />
                </div>

                <div>
                  <p className="text-[8px] uppercase tracking-[0.3em] text-white/30">
                    Location
                  </p>

                  <p className="mt-1 text-sm leading-6 text-white/75">
                    United Arab Emirates
                  </p>
                </div>
              </div>

              {/* Instagram */}
              <div className="flex items-start gap-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-[#d4af37]/30 bg-[#0d0d0d]">
                  <FaInstagram
                    size={16}
                    strokeWidth={1.2}
                    className="text-[#d4af37]"
                  />
                </div>

                <div>
                  <p className="text-[8px] uppercase tracking-[0.3em] text-white/30">
                    Instagram
                  </p>

                  <a
                    href="#"
                    className="mt-1 block text-sm text-white/75 transition-colors hover:text-[#d4af37]"
                  >
                    @saaqperfume
                  </a>
                </div>
              </div>

            </div>

            {/* Decorative line */}
            <div className="mt-12 h-px w-16 bg-[#d4af37]" />

            <p className="mt-5 max-w-sm text-[10px] leading-5 text-white/25">
              SAAQ PERFUME
              <br />
              The Art of Signature Fragrance
              <br />
              UAE
            </p>
          </div>

          {/* =====================================================
              CONTACT FORM
          ===================================================== */}

          <div className="border border-white/10 bg-[#0d0d0d] p-6 sm:p-8 lg:p-10">

            <div className="mb-8">
              <p className="mb-2 text-[9px] uppercase tracking-[0.35em] text-[#d4af37]">
                SEND A MESSAGE
              </p>

              <h2 className="font-['Playfair_Display',serif] text-2xl sm:text-3xl">
                How Can We Help?
              </h2>
            </div>

            {submitted ? (
              <div className="flex min-h-[400px] flex-col items-center justify-center text-center">

                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#d4af37]/40">
                  <span className="text-xl text-[#d4af37]">✓</span>
                </div>

                <p className="mt-6 text-[9px] uppercase tracking-[0.35em] text-[#d4af37]">
                  MESSAGE SENT
                </p>

                <h3 className="mt-3 font-['Playfair_Display',serif] text-3xl">
                  Thank You
                </h3>

                <p className="mt-4 max-w-sm text-sm leading-6 text-white/40">
                  Thank you for contacting SAAQ. Our team will get back
                  to you as soon as possible.
                </p>

                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-7 border border-white/15 px-6 py-3 text-[9px] uppercase tracking-[0.25em] text-white/60 transition-colors hover:border-[#d4af37] hover:text-[#d4af37]"
                >
                  Send Another Message
                </button>

              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">

                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-[8px] uppercase tracking-[0.3em] text-white/35"
                  >
                    Your Name
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Enter your name"
                    className="h-12 w-full border border-white/10 bg-[#080808] px-4 text-sm text-white outline-none placeholder:text-white/20 transition-colors focus:border-[#d4af37]/60"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-[8px] uppercase tracking-[0.3em] text-white/35"
                  >
                    Email Address
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="Enter your email"
                    className="h-12 w-full border border-white/10 bg-[#080808] px-4 text-sm text-white outline-none placeholder:text-white/20 transition-colors focus:border-[#d4af37]/60"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-[8px] uppercase tracking-[0.3em] text-white/35"
                  >
                    Phone Number
                  </label>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+971"
                    className="h-12 w-full border border-white/10 bg-[#080808] px-4 text-sm text-white outline-none placeholder:text-white/20 transition-colors focus:border-[#d4af37]/60"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label
                    htmlFor="subject"
                    className="mb-2 block text-[8px] uppercase tracking-[0.3em] text-white/35"
                  >
                    Subject
                  </label>

                  <select
                    id="subject"
                    name="subject"
                    defaultValue=""
                    className="h-12 w-full border border-white/10 bg-[#080808] px-4 text-sm text-white/70 outline-none transition-colors focus:border-[#d4af37]/60"
                  >
                    <option value="" disabled>
                      Select a subject
                    </option>

                    <option value="order">
                      Order Enquiry
                    </option>

                    <option value="product">
                      Product Enquiry
                    </option>

                    <option value="delivery">
                      Delivery
                    </option>

                    <option value="returns">
                      Returns &amp; Exchange
                    </option>

                    <option value="other">
                      Other
                    </option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-[8px] uppercase tracking-[0.3em] text-white/35"
                  >
                    Message
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    placeholder="How can we help you?"
                    className="w-full resize-none border border-white/10 bg-[#080808] px-4 py-4 text-sm text-white outline-none placeholder:text-white/20 transition-colors focus:border-[#d4af37]/60"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="group flex w-full items-center justify-center gap-3 bg-[#d4af37] px-6 py-4 text-[9px] font-medium uppercase tracking-[0.3em] text-black transition-all duration-300 hover:bg-[#e4c45a] hover:shadow-[0_0_25px_rgba(212,175,55,0.15)]"
                >
                  Send Message

                  <ArrowUpRight
                    size={14}
                    strokeWidth={1.4}
                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </button>

                <p className="text-center text-[8px] uppercase tracking-[0.15em] text-white/20">
                  We usually respond within 24 hours
                </p>

              </form>
            )}
          </div>
        </div>
      </section>

      {/* =========================================================
          FAQ / HELP
      ========================================================= */}

      <section className="border-b border-white/10 bg-[#0a0a0a]">
        <div className="mx-auto max-w-5xl px-6 py-20 text-center sm:px-10 lg:py-24">

          <p className="mb-4 text-[9px] uppercase tracking-[0.4em] text-[#d4af37]">
            NEED HELP?
          </p>

          <h2 className="font-['Playfair_Display',serif] text-3xl sm:text-4xl">
            Looking for Your Signature Scent?
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/40">
            Explore our collection of carefully crafted fragrances and
            discover the scent that speaks to you.
          </p>

          <Link
            href="/shop"
            className="group mt-8 inline-flex items-center gap-3 border border-[#d4af37] px-8 py-4 text-[9px] uppercase tracking-[0.3em] text-[#d4af37] transition-all duration-300 hover:bg-[#d4af37] hover:text-black"
          >
            Explore Fragrances

            <ArrowUpRight
              size={14}
              strokeWidth={1.4}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>

        </div>
      </section>

      {/* =========================================================
          BRAND FOOTER MESSAGE
      ========================================================= */}

      <section className="bg-[#060606]">
        <div className="mx-auto max-w-7xl px-6 py-12 text-center">

          <p className="font-['Playfair_Display',serif] text-xl text-white/80 sm:text-2xl">
            The Art of Signature Fragrance
          </p>

          <p className="mt-3 text-[8px] uppercase tracking-[0.35em] text-white/30">
            SAAQ PERFUME · UAE
          </p>

          <div className="mx-auto mt-5 flex items-center justify-center gap-2">
            <span className="h-px w-8 bg-[#d4af37]/40" />
            <span className="h-1 w-1 rotate-45 bg-[#d4af37]" />
            <span className="h-px w-8 bg-[#d4af37]/40" />
          </div>

        </div>
      </section>
    </main>
  );
}

