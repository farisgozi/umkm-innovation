"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "./Container";

gsap.registerPlugin(ScrollTrigger);

export default function MotionFooter() {
  const footerRef = useRef<HTMLDivElement>(null);
  const waveRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Wave Animation
      gsap.to(waveRef.current, {
        y: 20,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        duration: 4,
      });
      
      // Footer Content Animation
      gsap.from(".footer-content", {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 80%",
        },
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="relative overflow-hidden mt-20">
      {/* Animated Wave Background */}
      <div className="absolute inset-0 -z-10">
        <svg
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            ref={waveRef}
            fill="url(#warmSunset)"
            d="M0,160L60,149.3C120,139,240,117,360,128C480,139,600,181,720,186.7C840,192,960,160,1080,138.7C1200,117,1320,107,1380,101.3L1440,96V320H0Z"
          ></path>
          <defs>
            <linearGradient id="warmSunset" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FF885B" />
              <stop offset="100%" stopColor="#FFD194" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/*  Konten Footer */}
      <Container>
        <div className="footer-content flex flex-col items-center justify-center gap-3 py-20 text-white text-center">
          <h2 className="text-2xl font-bold tracking-wide">
            UMKM<span className="opacity-90"> Sekitarmu</span>
          </h2>

          <nav className="flex flex-wrap justify-center gap-6 text-sm font-medium opacity-90">
            <a href="#beranda" className="hover:text-[#FFF8F3] transition-colors">Beranda</a>
            <a href="#eksplor" className="hover:text-[#FFF8F3] transition-colors">Eksplor</a>
            <a href="#cerita" className="hover:text-[#FFF8F3] transition-colors">Cerita</a>
            <a href="#tentang" className="hover:text-[#FFF8F3] transition-colors">Tentang Kami</a>
          </nav>

          <div className="flex gap-5 mt-2">
            <a href="#" className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/40 transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 19h3v-7H8v7zm4 0h3v-4h-3v4zm4 0h3v-10h-3v10zM3 21h18v2H3z"/></svg>
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/40 transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22 4.01C21.4 4.36 20.74 4.61 20.04 4.76C20.75 4.31 21.31 3.63 21.57 2.82C20.91 3.22 20.18 3.5 19.41 3.65C18.79 2.98 17.91 2.56 16.94 2.56C14.97 2.56 13.38 4.14 13.38 6.1C13.38 6.44 13.42 6.77 13.5 7.07C10.36 6.92 7.55 5.36 5.64 3.02C5.29 3.62 5.09 4.3 5.09 5.03C5.09 6.36 5.76 7.52 6.77 8.22C6.2 8.21 5.65 8.06 5.15 7.81V7.86C5.15 9.61 6.4 11.03 8.05 11.37C7.73 11.45 7.37 11.49 7 11.49C6.74 11.49 6.49 11.47 6.24 11.42C6.75 12.81 8.1 13.81 9.72 13.84C8.49 14.76 6.97 15.32 5.32 15.32C5.06 15.32 4.81 15.31 4.56 15.28C6.2 16.27 8.17 16.86 10.28 16.86C16.93 16.86 20.84 11.54 20.84 6.54C20.84 6.39 20.84 6.24 20.83 6.09C21.5 5.59 22.07 4.92 22.49 4.16L22 4.01Z"/></svg>
            </a>
          </div>

          <p className="text-xs mt-4 opacity-80">
            © {new Date().getFullYear()} UMKM Sekitarmu — Semua hak cipta dilindungi.
          </p>
        </div>
      </Container>
    </footer>
  );
}
