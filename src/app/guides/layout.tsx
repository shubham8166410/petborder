import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  robots: { index: true, follow: true },
};

export default function GuidesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-12">{children}</main>
      <Footer />
    </>
  );
}
