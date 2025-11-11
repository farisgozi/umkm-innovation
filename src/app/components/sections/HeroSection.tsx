"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useInView, cubicBezier } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-10%" });

  useEffect(() => {
    if (!bgRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(bgRef.current, {
        scale: 1.2,
        yPercent: 15,
        ease: "power1.out",
        scrollTrigger: {
          trigger: bgRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  const heading = ["Temukan UMKM", "Keren di", "Sekitarmu"];

  const kineticVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.25,
        duration: 0.8,
        ease: cubicBezier(0.25, 0.1, 0.25, 1),
      },
    }),
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      <div
        ref={bgRef}
        className="absolute inset-0 -z-10 will-change-transform"
        aria-hidden="true"
      >
        <Image
          src="/assets/images/hero-bg.jpg"
          alt="Kota Jakarta senja"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#2E2E2E]/20 to-[#2E2E2E]/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 md:px-8 lg:px-16 py-20 min-h-screen flex flex-col justify-center">
        <div className="max-w-4xl space-y-6">
          {heading.map((text, i) => (
            <motion.h1
              key={text}
              custom={i}
              variants={kineticVariants}
              initial="hidden"
              animate={inView && "visible"}
              className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-tight ${
                i === 1 ? "text-[#FF9E6B]" : "text-[#FFF8F3]"
              }`}
            >
              {text}
            </motion.h1>
          ))}

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={inView && { opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
            className="text-lg md:text-xl text-[#FFF8F3]/90 leading-relaxed max-w-2xl"
          >
            Dari warung kopi legendaris, kedai bakso andalan, hingga usaha kreatif di
            kampusmu — semua ada di satu tempat. Jelajahi, dukung, dan kenali cerita di
            balik setiap karya lokal.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView && { opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.7 }}
            className="mt-8 flex flex-wrap gap-4 items-center"
          >
            <motion.a
              href="#explore"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 12px 40px rgba(249,115,22,0.4)",
              }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center font-bold rounded-full bg-[#FF9E6B] hover:bg-[#FF885B] text-[#FFF8F3] px-8 py-4 transition-all duration-300 shadow-lg"
            >
              Jelajahi Sekarang
            </motion.a>
            <motion.a
              href="#about"
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(255,248,243,0.2)",
              }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center font-bold text-[#FFF8F3] px-8 py-4 rounded-full bg-[#FFF8F3]/10 backdrop-blur-sm border border-[#FFF8F3]/30 transition-all duration-300"
            >
              Pelajari Lebih Lanjut
            </motion.a>
          </motion.div>

          {/* Scroll Hint */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView && { opacity: 1, y: 0 }}
            transition={{ delay: 1.6 }}
            className="mt-16 flex items-center gap-3 text-[#FFF8F3]/70"
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 48 }}
              transition={{ duration: 0.8, delay: 1.7 }}
              className="h-px bg-[#FFF8F3]/30"
            />
            <span className="text-sm font-medium">
              Geser ke bawah untuk melihat lebih banyak
            </span>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          delay: 2,
          repeat: Infinity,
          repeatType: "reverse",
          repeatDelay: 0.6,
        }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <ChevronDown className="w-6 h-6 text-[#FFF8F3]/80" />
      </motion.div>

      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 right-10 w-40 h-40 bg-[#FF9E6B]/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute bottom-1/4 left-10 w-32 h-32 bg-[#FF9E6B]/10 rounded-full blur-3xl"
      />
    </section>
  );
}
