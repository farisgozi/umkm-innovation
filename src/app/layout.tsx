import type { Metadata } from "next";
import { dmSans, clashDisplay } from "../fonts/fonts";
import "./globals.css";
import Navbar from "./components/layouts/Navbar";
import MotionFooter from "./components/layouts/MotionFooter";
import ClientWrapper from "./motion/providers/ClientWrapper";

export const metadata: Metadata = {
  title: "UMKM Kita - Platform Bisnis Lokal",
  description:
    "Temukan dan dukung UMKM di sekitar Anda. Dari warung kopi legendaris hingga usaha kreatif, semua ada di satu tempat.",
  keywords: "UMKM, bisnis lokal, warung, kedai, usaha kecil, Indonesia",
  authors: [{ name: "UMKM Kita" }],
  openGraph: {
    title: "UMKM Kita - Platform Bisnis Lokal",
    description: "Temukan dan dukung UMKM di sekitar Anda",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${clashDisplay.variable} ${dmSans.variable}`}
      suppressHydrationWarning={true}
    >
      <body 
        className="antialiased font-sans"
        suppressHydrationWarning={true}
        >
       <ClientWrapper pageKey="root">
          <Navbar />
          <main className="relative overflow-hidden">
            {children}
          </main>
          <MotionFooter />
        </ClientWrapper>
      </body>

    </html>
  );
}