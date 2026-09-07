import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
    <html lang="en">
      <body>
        <Header />

        <main>{children}</main>
        <Footer/>
      </body>
     
    </html>
  );
}