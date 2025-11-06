"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';

export default function HeroSection() {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const parallaxOffset = scrollY * 0.5;

  return (
    <section className="relative min-h-screen overflow-hidden flex items-center">
      {/* Background Layer with Parallax */}
      <div
        className="absolute inset-0 -z-10 w-full h-[120vh]"
        style={{
          transform: `translateY(${parallaxOffset}px)`,
          transition: 'transform 0.1s ease-out'
        }}
        aria-hidden="true"
      >
        <Image
          src="/assets/images/hero-bg.jpg"
          alt="Jakarta cityscape"
          fill
          priority
          className="object-cover"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/20 to-black/60" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-6 md:px-8 lg:px-16 py-20 flex items-center min-h-screen">
        <div className="max-w-4xl">
          
          {/* Main Heading with Staggered Animation */}
          <div className="space-y-2 mb-6">
            <h1
              className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-[#FFF8F3] leading-tight transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '100ms' }}
            >
              Temukan UMKM
            </h1>

            <h1
              className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-orange-400 leading-tight transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '300ms' }}
            >
              Keren di
            </h1>

            <h1
              className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-[#FFF8F3] leading-tight transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '500ms' }}
            >
              Sekitarmu
            </h1>
          </div>

          {/* Description */}
          <p 
            className={`text-lg md:text-xl text-[#FFF8F3]/90 leading-relaxed max-w-2xl transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: '700ms' }}
          >
            Dari warung kopi legendaris, kedai bakso andalan, hingga usaha kreatif di kampusmu 
            semua ada di satu tempat. Jelajahi, dukung, dan kenali cerita di balik setiap karya lokal.
          </p>

          {/* CTA Buttons */}
          <div 
            className={`mt-8 flex gap-4 flex-wrap items-center transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: '900ms' }}
          >
            <a
              href="#explore"
              className="inline-flex items-center font-bold rounded-full bg-orange-400 hover:bg-orange-500 text-white px-8 py-4 transition-all duration-300 shadow-lg hover:shadow-[0_12px_40px_rgba(249,115,22,0.4)] transform hover:scale-105"
              aria-label="Jelajahi Sekarang"
            >
              Jelajahi Sekarang
            </a>
            <a
              href="#about"
              className="inline-flex items-center font-bold text-[#FFF8F3] px-8 py-4 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/30 transition-all duration-300"
            >
              Pelajari Lebih Lanjut
            </a>
          </div>

          {/* Scroll Hint */}
          <div
            className={`mt-16 flex items-center gap-3 text-[#FFF8F3]/70 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: '1100ms' }}
          >
            <div className="w-12 h-px bg-[#FFF8F3]/30" />
            <span className="text-sm font-medium">
              Geser ke bawah untuk melihat lebih banyak
            </span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Animated */}
      <div 
        className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
        style={{ transitionDelay: '1300ms' }}
      >
        <div className="flex flex-col items-center gap-2 text-white/80 animate-bounce">
          <ChevronDown className="w-6 h-6" />
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-black/40 to-transparent pointer-events-none" />
      
      {/* Floating Blobs */}
      <div className="absolute top-1/4 right-10 w-40 h-40 bg-orange-400/10 rounded-full blur-3xl animate-pulse" />
      <div 
        className="absolute bottom-1/4 left-10 w-32 h-32 bg-yellow-400/10 rounded-full blur-3xl animate-pulse" 
        style={{ animationDelay: '1s' }}
      />
    </section>
  );
}