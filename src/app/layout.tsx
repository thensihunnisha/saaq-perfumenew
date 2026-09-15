import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import StoreChrome from "@/components/StoreChrome";

const saaqSans = Inter({
  subsets: ["latin"],
  variable: "--font-saaq-sans",
  display: "swap",
});

const saaqDisplay = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-saaq-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SAAQ PERFUME | The Art of Signature Fragrance",
  description:
    "SAAQ PERFUME — Where Arabian heritage meets modern sophistication.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${saaqSans.variable} ${saaqDisplay.variable}`}
      suppressHydrationWarning
    >
      <body
        className="bg-saaq-black font-sans text-saaq-ivory antialiased"
        suppressHydrationWarning
      >
        <Providers>
          <StoreChrome>{children}</StoreChrome>
        </Providers>
      </body>
    </html>
  );
}