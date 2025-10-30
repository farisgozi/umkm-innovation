"use client";

import Image from "next/image";

export default function HeroSection() {

  return (
      <section className="relative min-h-[700px] md:min-h-[1024px] overflow-hidden flex items-center">
        {/* Background Layer (Parallax MotionImage) */}
        <div
          className="absolute inset-0 -z-10 h-screen w-full"
          aria-hidden="true"
        >
          <Image
            src="/assets/images/hero-bg.jpg"
            alt="Jakarta cityscape"
            fill
            priority
            className="object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/20 to-black/60" />
        </div>

        {/* Content (Text + Buttons) */}
        <div
          className="relative z-10 container mx-auto px-6 flex flex-col justify-center"
        >
            <div className="max-w-3xl">
              <h1
                className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display text-[#FFF8F3] font-extrabold"
              >
                Temukan UMKM
              </h1>

              <h1
                className="inline-block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-extrabold text-orange-300"
              >
                Keren di
              </h1>

              <h1
                className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display text-[#FFF8F3] font-extrabold"
              >
              Sekitarmu
              </h1>

              <p className="mt-5 text-lg md:text-xl text-[#FFF8F3]/90 font-sans"
              >
                Dari warung kopi legendaris, kedai bakso andalan, hingga usaha kreatif di kampusmu 
                semua ada di satu tempat. Jelajahi, dukung, dan kenali cerita di balik setiap karya lokal.
              </p>


              {/* Buttons */}
              <div className="mt-8 flex gap-4 flex-wrap items-end">
                <a
                  href="#explore"
                  className="inline-flex font-bold font-display rounded-4xl items-center bg-[#FF9E6B] hover:bg-[#FF885B] text-[#FFF8F3] px-6 py-3 transition-shadow duration-200 shadow-md hover:shadow-[0_12px_40px_rgba(249,115,22,0.22)]"
                  aria-label="Jelajahi Sekarang"
                >
                  Jelajahi Sekarang
                </a>
                <a
                  href="#about"
                  className="inline-block font-display font-bold text-[#FFF8F3]/90 px-5 py-3 rounded-4xl backdrop-blur-sm hover:bg-[#FFF8F3]/5 transition"
                >
                  Pelajari Lebih Lanjut
                </a>
              </div>

              {/* === Scroll hint === */}
              <div
                className="mt-12 flex items-center gap-3 text-[#FFF8F3]/80"
              >
                <div className="w-10 h-px bg-[#FFF8F3]/30" />
                <span className="text-sm">
                  Geser ke bawah untuk melihat lebih banyak
                </span>
              </div>
            </div>
        </div>
      </section>
  );
}
