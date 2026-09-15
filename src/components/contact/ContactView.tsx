"use client";

import { useState, type FormEvent } from "react";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import {
  Body,
  Button,
  DisplayHeading,
  Eyebrow,
} from "@/components/ui";
import {
  getContactMailto,
  getContactMapUrl,
  getContactTel,
  SAAQ_CONTACT,
} from "@/config/contact";
import { cn } from "@/lib/cn";
import Reveal from "@/components/Reveal";
import { getEnquiryWhatsAppUrl } from "@/lib/whatsapp";

type ContactFormState = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

const emptyForm: ContactFormState = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export default function ContactView() {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const chatHref = getEnquiryWhatsAppUrl();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: Record<string, string> = {};

    if (!form.name.trim()) nextErrors.name = "Enter your name.";
    if (!form.email.trim()) nextErrors.email = "Enter your email.";
    else if (!isEmail(form.email)) nextErrors.email = "Enter a valid email.";
    if (!form.subject) nextErrors.subject = "Select a subject.";
    if (!form.message.trim()) nextErrors.message = "Enter a message.";

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setSent(true);
    setForm(emptyForm);
  };

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

      <section className="saaq-container grid gap-16 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:py-24">
        <Reveal>
          <Eyebrow>Get in touch</Eyebrow>
          <h2 className="saaq-h2 mt-4">A conversation, not a ticket.</h2>
          <Body className="mt-6 max-w-md">
            Enquiries about fragrances, orders, and the house — our team will
            reply with the same care we compose a scent.
          </Body>

          <ul className="mt-12 space-y-7">
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
            className="saaq-transition mt-12 inline-flex items-center justify-center border border-[#25D366]/40 bg-[#25D366]/10 px-8 py-4 font-sans text-[10px] uppercase tracking-[0.28em] text-[#25D366] hover:border-[#25D366] hover:bg-[#25D366] hover:text-white"
          >
            Chat with SAAQ
          </a>
        </Reveal>

        <Reveal className="border border-saaq-gold/20 bg-saaq-void p-6 sm:p-8 lg:p-10" delay={100}>
          <Eyebrow>Message</Eyebrow>
          <h2 className="saaq-h3 mt-3">Send a note to the house</h2>

          {sent ? (
            <div className="mt-12 text-center">
              <p className="saaq-eyebrow">Message sent</p>
              <h3 className="saaq-h2 mt-4">Thank you</h3>
              <Body className="mx-auto mt-4 max-w-sm">
                SAAQ has received your message. We will reply as soon as we can.
              </Body>
              <Button
                type="button"
                variant="outline"
                className="mt-8"
                onClick={() => setSent(false)}
              >
                Send another message
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 space-y-5" noValidate>
              <Field
                label="Name"
                name="name"
                value={form.name}
                error={errors.name}
                onChange={(value) => setForm((current) => ({ ...current, name: value }))}
              />
              <Field
                label="Email"
                name="email"
                type="email"
                value={form.email}
                error={errors.email}
                onChange={(value) => setForm((current) => ({ ...current, email: value }))}
              />
              <Field
                label="Phone"
                name="phone"
                type="tel"
                placeholder="+971"
                value={form.phone}
                onChange={(value) => setForm((current) => ({ ...current, phone: value }))}
              />
              <div>
                <label
                  htmlFor="subject"
                  className="mb-2 block font-sans text-[9px] uppercase tracking-[0.2em] text-saaq-ivory/50"
                >
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={form.subject}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      subject: event.target.value,
                    }))
                  }
                  className={cn(
                    "h-12 w-full border bg-saaq-black px-4 font-sans text-xs text-saaq-ivory outline-none saaq-transition",
                    errors.subject
                      ? "border-red-400/60"
                      : "border-white/15 focus:border-saaq-gold"
                  )}
                >
                  <option value="">Select a subject</option>
                  {SAAQ_CONTACT.formSubjects.map((subject) => (
                    <option key={subject} value={subject}>
                      {subject}
                    </option>
                  ))}
                </select>
                {errors.subject ? (
                  <p className="mt-2 font-sans text-[11px] text-red-300">
                    {errors.subject}
                  </p>
                ) : null}
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block font-sans text-[9px] uppercase tracking-[0.2em] text-saaq-ivory/50"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={form.message}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      message: event.target.value,
                    }))
                  }
                  className={cn(
                    "w-full resize-none border bg-saaq-black px-4 py-4 font-sans text-sm text-saaq-ivory outline-none saaq-transition",
                    errors.message
                      ? "border-red-400/60"
                      : "border-white/15 focus:border-saaq-gold"
                  )}
                />
                {errors.message ? (
                  <p className="mt-2 font-sans text-[11px] text-red-300">
                    {errors.message}
                  </p>
                ) : null}
              </div>
              <Button type="submit" size="lg" className="w-full">
                Send message
              </Button>
              <p className="text-center font-sans text-[10px] uppercase tracking-[0.18em] text-saaq-ivory/30">
                {SAAQ_CONTACT.responseNote}
              </p>
            </form>
          )}
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

function Field({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
  error,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  error?: string;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block font-sans text-[9px] uppercase tracking-[0.2em] text-saaq-ivory/50"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className={cn(
          "h-12 w-full border bg-saaq-black px-4 font-sans text-xs text-saaq-ivory outline-none placeholder:text-saaq-ivory/20 saaq-transition",
          error ? "border-red-400/60" : "border-white/15 focus:border-saaq-gold"
        )}
      />
      {error ? (
        <p className="mt-2 font-sans text-[11px] text-red-300">{error}</p>
      ) : null}
    </div>
  );
}
