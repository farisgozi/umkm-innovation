"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, cubicBezier, useReducedMotion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function HeroSection() {
  const [scrollY, setScrollY] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const parallaxOffset = Math.min(scrollY * 0.4, 200);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: cubicBezier(0.25, 0.1, 0.25, 1)
      }
    }
  };

  const headingVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: custom * 0.2,
        scale: [1.05, 1],
        ease: cubicBezier(0.25, 0.1, 0.25, 1)
      }
    })
  };

  return (
    <section className="relative min-h-screen overflow-hidden flex items-center">
      {/* Background Layer with Parallax */}
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute inset-0 -z-10 w-full h-[120vh]"
        style={{
          transform: `translate3d(0, ${parallaxOffset}px, 0)`,
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
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#2E2E2E]/20 to-[#2E2E2E]/60" />

      </motion.div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-6 md:px-8 lg:px-16 py-20 flex items-center min-h-screen">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={!shouldReduceMotion && "visible"}
          className="max-w-4xl"
        >
          
          {/* Main Heading with Staggered Animation */}
          <div className="space-y-2 mb-6">
            <motion.h1
              custom={0}
              variants={headingVariants}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-[#FFF8F3] leading-tight"
            >
              Temukan UMKM
            </motion.h1>

            <motion.h1
              custom={1}
              variants={headingVariants}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-[#FF9E6B] leading-tight"
            >
              Keren di
            </motion.h1>

            <motion.h1
              custom={2}
              variants={headingVariants}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-[#FFF8F3] leading-tight"
            >
              Sekitarmu
            </motion.h1>
          </div>

          {/* Description */}
          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl text-[#FFF8F3]/90 leading-relaxed max-w-2xl"
          >
            Dari warung kopi legendaris, kedai bakso andalan, hingga usaha kreatif di kampusmu 
            semua ada di satu tempat. Jelajahi, dukung, dan kenali cerita di balik setiap karya lokal.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            variants={itemVariants}
            className="mt-8 flex gap-4 flex-wrap items-center"
          >
            <motion.a
              href="#explore"
              whileHover={{ scale: 1.05, boxShadow: "0 12px 40px rgba(249,115,22,0.4)" }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center font-bold rounded-full bg-[#FF9E6B] hover:bg-[#FF885B] text-[#FFF8F3] px-8 py-4 transition-all duration-300 shadow-lg"
              aria-label="Jelajahi Sekarang"
            >
              Jelajahi Sekarang
            </motion.a>
            <motion.a
              href="#about"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,248,243,0.2)" }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center font-bold text-[#FFF8F3] px-8 py-4 rounded-full bg-[#FFF8F3]/10 backdrop-blur-sm border border-[#FFF8F3]/30 transition-all duration-300"
            >
              Pelajari Lebih Lanjut
            </motion.a>
          </motion.div>

          {/* Scroll Hint */}
          <motion.div
            variants={itemVariants}
            className="mt-16 flex items-center gap-3 text-[#FFF8F3]/70"
          >
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: 48 }}
              transition={{ duration: 0.8, delay: 1.5 }}
              className="h-px bg-[#FFF8F3]/30"
            />
            <span className="text-sm font-medium">
              Geser ke bawah untuk melihat lebih banyak
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator - Animated */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.8, 
          delay: 1.8,
          repeat: Infinity,
          repeatType: "reverse",
          repeatDelay: 0.5
        }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <div className="flex flex-col items-center gap-2 text-[#FFF8F3]/80">
          <ChevronDown className="w-6 h-6" />
        </div>
      </motion.div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#2E2E2E]/40 to-transparent pointer-events-none" />
      
      {/* Floating Blobs with Animation */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/4 right-10 w-40 h-40 bg-[#FF9E6B]/10 rounded-full blur-3xl"
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        className="absolute bottom-1/4 left-10 w-32 h-32 bg-[#FF9E6B]/10 rounded-full blur-3xl"
      />
    </section>
  );
}