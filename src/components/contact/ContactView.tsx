"use client";

import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Body, DisplayHeading, Eyebrow } from "@/components/ui";
import {
  getContactMailto,
  getContactMapUrl,
  getContactTel,
  SAAQ_CONTACT,
} from "@/config/contact";
import Reveal from "@/components/Reveal";
import { getEnquiryWhatsAppUrl } from "@/lib/whatsapp";

export default function ContactView() {
  const chatHref = getEnquiryWhatsAppUrl();

  return (
    <div className="saaq-page bg-saaq-black text-saaq-ivory">
      <section className="border-b border-white/10">
        <div className="saaq-container py-16 sm:py-20">
          <Reveal>
            <Eyebrow>SAAQ PERFUME</Eyebrow>
            <DisplayHeading as="h1" className="mt-6">
              Contact SAAQ
            </DisplayHeading>
            <Body className="mt-6 max-w-xl">
              We would love to hear from you.
            </Body>
          </Reveal>
        </div>
      </section>

      <section className="saaq-container py-16 lg:py-24">
        <Reveal>
          <Eyebrow>Get in touch</Eyebrow>
          <h2 className="saaq-h2 mt-4">A conversation, not a ticket.</h2>
          <Body className="mt-6 max-w-md">
            Enquiries about fragrances, orders, and the house — our team will
            reply with the same care we compose a scent.
          </Body>

          <ul className="mt-12 max-w-xl space-y-7">
            <ContactLine
              icon={MessageCircle}
              label="WhatsApp"
              href={chatHref}
              external
              value={SAAQ_CONTACT.whatsapp.display}
            />
            <ContactLine
              icon={Mail}
              label="Email"
              href={getContactMailto()}
              value={SAAQ_CONTACT.email}
            />
            <ContactLine
              icon={Phone}
              label="Phone"
              href={getContactTel()}
              value={SAAQ_CONTACT.phone.display}
            />
            <ContactLine
              icon={MapPin}
              label="Location"
              href={getContactMapUrl()}
              external
              value={SAAQ_CONTACT.location.lines.join(" · ")}
            />
            <li className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-saaq-gold/30 text-saaq-gold">
                <Clock size={16} strokeWidth={1.3} />
              </span>
              <div>
                <p className="saaq-eyebrow">Opening hours</p>
                <div className="mt-2 space-y-1 font-sans text-sm text-saaq-ivory/75">
                  {SAAQ_CONTACT.hours.map((slot) => (
                    <p key={slot.days}>
                      {slot.days}
                      <span className="text-saaq-ivory/40"> — {slot.time}</span>
                    </p>
                  ))}
                </div>
              </div>
            </li>
          </ul>

          <a
            href={chatHref}
            target="_blank"
            rel="noopener noreferrer"
            className="saaq-transition mt-12 inline-flex w-full items-center justify-center border border-[#25D366]/40 bg-[#25D366]/10 px-8 py-4 font-sans text-[10px] uppercase tracking-[0.22em] text-[#25D366] hover:border-[#25D366] hover:bg-[#25D366] hover:text-white sm:w-auto sm:tracking-[0.28em]"
          >
            Chat with SAAQ
          </a>
        </Reveal>
      </section>
    </div>
  );
}

function ContactLine({
  icon: Icon,
  label,
  value,
  href,
  external,
}: {
  icon: typeof Mail;
  label: string;
  value: string;
  href: string;
  external?: boolean;
}) {
  return (
    <li className="flex items-start gap-4">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-saaq-gold/30 text-saaq-gold">
        <Icon size={16} strokeWidth={1.3} />
      </span>
      <div className="min-w-0">
        <p className="saaq-eyebrow">{label}</p>
        <a
          href={href}
          className="saaq-transition mt-1 block break-words font-sans text-sm text-saaq-ivory/75 hover:text-saaq-gold"
          {...(external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {value}
        </a>
      </div>
    </li>
  );
}
