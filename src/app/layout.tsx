import type { Metadata } from "next";
import { dmSans, clashDisplay } from "../fonts/fonts";
import "./globals.css";
import Navbar from "./components/layouts/Navbar";
import MotionFooter from "./components/layouts/MotionFooter";

export const metadata: Metadata = {
  title: "UMKM Kita - Platform Bisnis Lokal",
  description: "Temukan dan dukung UMKM di sekitar Anda",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${clashDisplay.variable} ${dmSans.variable}`}>
      <body className="antialiased font-sans">
        <Navbar/>
        <main className="flex flex-col">{children}</main>
        <MotionFooter/>
      </body>
    </html>
  );
}