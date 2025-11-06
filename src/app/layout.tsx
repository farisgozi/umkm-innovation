import type { Metadata } from "next";
import { DM_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";

// Note: Clash Display will be loaded via CDN in globals.css for this demo
const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
<<<<<<< HEAD
  title: "UMKM - Temukan UMKM Keren di Sekitarmu",
  description: "Dukung Bisnis Lokal, Bangun Komunitas Hebat. Platform untuk menemukan dan mendukung UMKM di sekitar Anda.",
=======
  title: "UMKM Kita - Platform Bisnis Lokal",
  description: "Temukan dan dukung UMKM di sekitar Anda. Dari warung kopi legendaris hingga usaha kreatif, semua ada di satu tempat.",
  keywords: "UMKM, bisnis lokal, warung, kedai, usaha kecil, Indonesia",
  authors: [{ name: "UMKM Kita" }],
  openGraph: {
    title: "UMKM Kita - Platform Bisnis Lokal",
    description: "Temukan dan dukung UMKM di sekitar Anda",
    type: "website",
  },
>>>>>>> 26cf800 (Final HomePage No Parallax)
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
<<<<<<< HEAD
    <html lang="id">
      <body
        className={`${dmSans.variable} ${spaceGrotesk.variable} antialiased`}
      >
        {children}
=======
    <html lang="id" className={`${clashDisplay.variable} ${dmSans.variable} scroll-smooth`}>
      <body className="antialiased font-sans">
        {/* Navbar */}
        <Navbar />
        
        {/* Main Content */}
        <main className="flex flex-col">
          {children}
        </main>
        
        {/* Footer */}
        <MotionFooter />
>>>>>>> 26cf800 (Final HomePage No Parallax)
      </body>
    </html>
  );
}
