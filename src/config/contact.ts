export const SAAQ_CONTACT = {
  brand: "SAAQ PERFUME",
  email: "info@saaqperfume.com",
  phone: {
    display: "+971 52 911 7712",
    tel: "+971529117712",
  },
  whatsapp: {
    number: "971529117712",
    display: "+971 52 911 7712",
  },
  location: {
    city: "Dubai",
    country: "United Arab Emirates",
    lines: ["Dubai", "United Arab Emirates"],
    mapQuery: "Dubai, United Arab Emirates",
    mapEmbedSrc:
      "https://maps.google.com/maps?q=Dubai%2C%20United%20Arab%20Emirates&z=11&output=embed",
  },
  hours: [
    { days: "Sunday – Thursday", time: "10:00 – 22:00" },
    { days: "Friday – Saturday", time: "12:00 – 23:00" },
  ],
  social: {
    instagram: {
      handle: "@saaqperfume",
      url: "https://www.instagram.com/saaqperfume",
    },
    facebook: {
      url: "https://www.facebook.com/",
    },
  },
  formSubjects: [
    "Fragrance enquiry",
    "Order enquiry",
    "Delivery",
    "Returns & exchange",
    "Other",
  ],
  responseNote: "We usually respond within 24 hours.",
} as const;

export function getContactMailto() {
  return `mailto:${SAAQ_CONTACT.email}`;
}

export function getContactTel() {
  return `tel:${SAAQ_CONTACT.phone.tel}`;
}

export function getContactMapUrl() {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    SAAQ_CONTACT.location.mapQuery
  )}`;
}

export function getNewsletterMailto(email: string) {
  const subject = encodeURIComponent("SAAQ newsletter");
  const body = encodeURIComponent(
    `Please add this address to the SAAQ list.\n\nEmail: ${email.trim()}`
  );
  return `mailto:${SAAQ_CONTACT.email}?subject=${subject}&body=${body}`;
}
