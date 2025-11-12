"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, cubicBezier } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "lenis/react";

gsap.registerPlugin(ScrollTrigger);

interface Story {
  id: number;
  name: string;
  business: string;
  story: string;
  image: string;
}

export default function CeritaSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const badgeRef = useRef<HTMLDivElement | null>(null);
  const [currentStory, setCurrentStory] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const lenis = useLenis();

  const stories: Story[] = [
    {
      id: 1,
      name: "Ibu Siti",
      business: "Warung Nasi Pecel",
      story:
        "Dari dapur rumah menjadi warung favorit warga. 15 tahun melayani dengan bumbu resep turun temurun.",
      image: "/assets/images/avatar/female1.png",
    },
    {
      id: 2,
      name: "Pak Budi",
      business: "Kerajinan Bambu",
      story:
        "Mengubah bambu menjadi seni. Produk lokal yang kini merambah pasar internasional.",
      image: "/assets/images/avatar/male1.png",
    },
    {
      id: 3,
      name: "Mbak Dewi",
      business: "Kopi Artisan",
      story:
        "Dari barista sampingan menjadi coffee shop dengan 3 cabang. Mimpi yang terwujud dengan ketekunan.",
      image: "/assets/images/avatar/female3.png",
    },
  ];

  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      setCurrentStory((prev) => (prev + 1) % stories.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isVisible, stories.length]);

  const ease = cubicBezier(0.77, 0, 0.175, 1);

  useEffect(() => {
    if (!sectionRef.current || !imageRef.current) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 80%",
        onEnter: () => setIsVisible(true),
      });

      gsap.to(imageRef.current, {
        yPercent: 10,
        scale: 1.08,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      gsap.from(badgeRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [lenis]);

  const headingVariant = (delay = 0) => ({
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, y: 0, 
      transition: { 
        duration: 0.9, 
        delay: delay, 
        ease: cubicBezier(0.6, 0.05, 0.01, 0.9)
      } 
    },
  });

  const lineVariants = {
    hidden: { 
      scaleX: 0, 
      opacity: 0 
    },
    visible: (delay: number) => ({
      scaleX: 1,
      opacity: 1,
      transition: {
        duration: 0.6,
        delay: delay,
        ease: cubicBezier(0.6, 0.05, 0.01, 0.9),
      },
    }),
  };

  const sliderVariant = {
    hidden: { 
      opacity: 0, 
      y: 30 },
    visible: { 
      opacity: 1, y: 0, 
      transition: { 
        duration: 0.8, 
        delay: 1.1, 
        ease: cubicBezier(0.6, 0.05, 0.01, 0.9)
        } 
      },
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen py-20 px-4 md:px-8 lg:px-16 overflow-hidden"
      aria-labelledby="cerita-heading"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
        <div className="relative h-[480px] md:h-[600px] lg:h-[720px] rounded-3xl overflow-hidden shadow-2xl">
          <div ref={imageRef} className="absolute inset-0 will-change-transform">
            <Image
              src="/assets/images/umkm/cerita.jpg"
              alt="UMKM Story"
              fill
              className="object-cover scale-110"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          </div>
          <div
            ref={badgeRef}
            className="absolute bottom-6 left-1/2 lg:left-8 -translate-x-1/2 lg:translate-x-0 
            bg-[#FFF8F3]/90 backdrop-blur-md rounded-2xl px-6 py-4 shadow-lg"
          >
            <p className="text-[#FF885B] font-display font-bold text-sm mb-1 text-center lg:text-left">
              📖 CERITA LOKAL
            </p>
            <p className="text-[#2E2E2E] text-xs font-semibold text-center lg:text-left">
              Lebih dari {stories.length}00+ kisah inspiratif
            </p>
          </div>
        </div>

        <div className="space-y-8 lg:space-y-10">
          <div className="space-y-3">
            {["Setiap produk", "punya cerita.", "Mari dengarkan", "mereka."].map(
              (text, i) => (
                <motion.h2
                  key={i}
                  variants={headingVariant(0.3 + i * 0.15)}
                  initial="hidden"
                  animate={isVisible ? "visible" : "hidden"}
                  className={`text-5xl md:text-6xl lg:text-7xl font-bold leading-tight ${
                    i === 1 ? "text-[#FF885B]" : "text-[#2E2E2E]"
                  }`}
                >
                  {text}
                </motion.h2>
              )
            )}
          </div>
          <div className="flex items-center gap-3">
              <motion.div
                custom={1.0}
                initial="hidden"
                variants={lineVariants}
                animate={isVisible ? "visible" : "hidden"}
                className="w-24 h-1.5 bg-[#FF885B] rounded-full origin-left"
              />
              <motion.div
                custom={1.1}
                variants={lineVariants}
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
                className="w-16 h-1.5 bg-[#FF885B] rounded-full origin-left"
              />
              <motion.div
                custom={1.2}
                variants={lineVariants}
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
                className="w-10 h-1.5 bg-[#FF885B] rounded-full origin-left"
              />
          </div>
          
          <motion.div
            variants={sliderVariant}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            className="relative overflow-hidden"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStory}
                initial={{ opacity: 0, x: 80, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -80, scale: 0.95 }}
                transition={{ duration: 0.6, ease }}
                className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100"
              >
                <div className="flex items-start gap-4 mb-4">
                  <motion.div
                    whileHover={{ scale: 1.08, rotate: 3 }}
                    className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[#FF885B]"
                  >
                    <Image
                      src={stories[currentStory].image}
                      alt={stories[currentStory].name}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {stories[currentStory].name}
                    </h3>
                    <p className="text-orange-500 font-medium">
                      {stories[currentStory].business}
                    </p>
                  </div>
                </div>

                <p className="text-gray-700 text-lg leading-relaxed">
                  &quot;{stories[currentStory].story}&quot;
                </p>

                {/* Indicator */}
                <div className="flex justify-center gap-2 mt-6">
                  {stories.map((_, i) => (
                    <motion.button
                      key={i}
                      onClick={() => setCurrentStory(i)}
                      whileTap={{ scale: 0.9 }}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        i === currentStory
                          ? "w-10 bg-[#FF885B]"
                          : "w-3 bg-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            variants={headingVariant(1.4)}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            className="bg-[#FF885B] hover:bg-[#FF9E6B] text-white font-semibold px-8 py-4 
            rounded-full shadow-lg hover:shadow-xl transition-all duration-300 w-full md:w-auto"
          >
            Baca Semua Cerita →
          </motion.button>
        </div>
      </div>

      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 right-10 w-32 h-32 bg-[#FF9E6B]/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-40 left-10 w-40 h-40 bg-[#FFD194]/20 rounded-full blur-3xl"
      />
    </section>
  );
}
