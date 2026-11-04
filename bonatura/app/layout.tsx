import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "BONATURA — Discover Culture, Experience Heritage",
  description:
    "Platform terintegrasi pelestarian budaya nusantara, peta destinasi budaya interaktif, dan panduan cerdas AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="h-full antialiased scroll-smooth">
      <body className="min-h-full flex flex-col bg-[#F8F5EF] text-[#3E2723] font-sans selection:bg-[#D6C4A8] selection:text-[#2C1A14]">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
