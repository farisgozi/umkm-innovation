"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, useSpring, Variants, easeOut } from "framer-motion";

const HeroSection = () => {
  const { scrollY } = useScroll();

  // Parallax effect
  const bgYRaw = useTransform(scrollY, [0, 800], [0, -60]);
  const fgYRaw = useTransform(scrollY, [0, 800], [0, -160]);
  const bgY = useSpring(bgYRaw, { stiffness: 60, damping: 20 });
  const fgY = useSpring(fgYRaw, { stiffness: 80, damping: 24 });

  // Variants for titles
  const titleVariants: Variants = {
    hidden: { opacity: 0, y: 26 },
    visible: (custom: number = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.12 * custom, duration: 0.6, ease: easeOut },
    }),
  };

  const emphasisVariants: Variants = {
    hidden: { opacity: 0, y: 32, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { delay: 0.28, duration: 0.6, ease: easeOut },
    },
  };

  return (
    <section className="relative h-[600px] md:h-[1024px] overflow-hidden">
      {/* Background Parallax */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 -z-10" aria-hidden>
        <Image
          src="/assets/images/background-hero.jpg"
          alt="City skyline at sunset"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/10 to-black/30" />
      </motion.div>

      {/* Foreground content */}
      <div className="container mx-auto px-6 h-full flex items-center">
        <motion.div style={{ y: fgY }} className="max-w-3xl">
          <motion.h1
            className="text-4xl md:text-6xl font-extrabold text-white leading-tight"
            initial="hidden"
            animate="visible"
            variants={titleVariants}
            custom={0}
          >
            Temukan{" "}
            <motion.span
              className="relative inline-block text-orange-300"
              initial="hidden"
              animate="visible"
              variants={emphasisVariants}
            >
              UMKM Keren
            </motion.span>{" "}
            di Sekitarmu
          </motion.h1>

          <motion.p
            className="mt-5 text-lg md:text-xl text-white/90"
            initial="hidden"
            animate="visible"
            variants={titleVariants}
            custom={1}
          >
            Dukung Bisnis Lokal, Bangun Komunitas Hebat.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={titleVariants}
            custom={2}
            className="mt-8 flex gap-4 flex-wrap"
          >
            <a
              href="#explore"
              className="inline-flex items-center bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-medium transition-shadow duration-200 shadow-md hover:shadow-[0_12px_40px_rgba(249,115,22,0.22)] ring-0 hover:ring-4 hover:ring-orange-300/30"
              aria-label="Jelajahi Sekarang"
            >
              Jelajahi Sekarang
            </a>
            <a
              href="#about"
              className="inline-block text-white/90 px-5 py-3 rounded-lg hover:bg-white/5 transition"
            >
              Pelajari Lebih Lanjut
            </a>
          </motion.div>

          {/* Scroll hint */}
          <div className="mt-12 flex items-center gap-3 text-white/80">
            <div className="w-10 h-[1px] bg-white/30" />
            <span className="text-sm">Geser ke bawah untuk melihat lebih banyak</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;