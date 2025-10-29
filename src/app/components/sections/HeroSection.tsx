"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import MotionSection from "../motion/MotionSection";
import MotionText from "../motion/MotionText";
import MotionImage from "../motion/MotionImage";
import Container from "../layouts/Container";

export default function HeroSection() {
  const { scrollY } = useScroll();

  // === Parallax effect ===
  const bgYRaw = useTransform(scrollY, [0, 800], [0, -60]);
  const fgYRaw = useTransform(scrollY, [0, 800], [0, -160]);
  const bgY = useSpring(bgYRaw, { stiffness: 60, damping: 20 });
  const fgY = useSpring(fgYRaw, { stiffness: 80, damping: 24 });

  return (
    <MotionSection className="relative min-h-[700px] md:min-h-[1024px] overflow-hidden flex items-center">
      {/* === Background Layer (Parallax MotionImage) === */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 -z-10 h-screen w-full"
        aria-hidden="true"
      >
        <MotionImage
          src="/assets/images/hero-bg.jpg"
          alt="City skyline at sunset"
          fill
          priority
          parallax={false}
          className="object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/20 to-black/60" />
      </motion.div>

      {/* === Foreground Content (Text + Buttons) === */}
      <motion.div
        style={{ y: fgY }}
        className="relative z-10 container mx-auto px-6 flex flex-col justify-center"
      >
        <Container>

          <div className="max-w-3xl">
            <MotionText
              text="Temukan UMKM"
              delay={0.1}
              className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display text-[#FFF8F3] font-extrabold"
            />

            <MotionText
              text="Keren di"
              delay={0.25}
              className="inline-block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-extrabold text-orange-300"
            />

            <MotionText
              text="Sekitarmu"
              delay={0.4}
              className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display text-[#FFF8F3] font-extrabold"
            />

            <MotionText
              text="Dari warung kopi legendaris, kedai bakso andalan, hingga usaha kreatif di kampusmu 
                    semua ada di satu tempat. Jelajahi, dukung, dan kenali cerita di balik setiap karya lokal."
              delay={0.7}
              className="mt-5 text-lg md:text-xl text-[#FFF8F3]/90 font-sans"
            />

            {/* === CTA Buttons === */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="mt-8 flex gap-4 flex-wrap items-end"
            >
              <a
                href="#explore"
                className="inline-flex items-center bg-[#FF9E6B] hover:bg-[#FF885B] text-[#FFF8F3] px-6 py-3 rounded-lg font-medium transition-shadow duration-200 shadow-md hover:shadow-[0_12px_40px_rgba(249,115,22,0.22)] ring-0 hover:ring-4 hover:ring-orange-300/30"
                aria-label="Jelajahi Sekarang"
              >
                Jelajahi Sekarang
              </a>
              <a
                href="#about"
                className="inline-block text-[#FFF8F3]/90 px-5 py-3 rounded-lg hover:bg-[#FFF8F3]/5 transition"
              >
                Pelajari Lebih Lanjut
              </a>
            </motion.div>

            {/* === Scroll hint === */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3, duration: 0.6 }}
              className="mt-12 flex items-center gap-3 text-[#FFF8F3]/80"
            >
              <div className="w-10 h-px bg-[#FFF8F3]/30" />
              <span className="text-sm">
                Geser ke bawah untuk melihat lebih banyak
              </span>
            </motion.div>
          </div>
        </Container>
      </motion.div>
    </MotionSection>
  );
}
