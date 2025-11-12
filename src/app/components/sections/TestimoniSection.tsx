"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence, cubicBezier } from "framer-motion";
import { Star } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Testimonial {
  id: number;
  name: string;
  business: string;
  avatar: string;
  rating: number;
  text: string;
}

export default function TestimoniSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Pak Ahmad",
      business: "Toko Kelontong Maju Jaya",
      avatar: "/assets/images/avatar/male1.png",
      rating: 4.5,
      text: "Platform ini sangat membantu UMKM seperti saya untuk berkembang. Pelayanannya responsif dan fitur-fiturnya mudah dipahami.",
    },
    {
      id: 2,
      name: "Ibu Lina",
      business: "Salon Kecantikan Cantik",
      avatar: "/assets/images/avatar/female1.png",
      rating: 4.5,
      text: "Dengan bergabung di sini, pelanggan saya bertambah banyak. Sistem pembayarannya juga aman dan terpercaya.",
    },
    {
      id: 3,
      name: "Mas Rudi",
      business: "Bengkel Motor Speedy",
      avatar: "/assets/images/avatar/male2.png",
      rating: 4.5,
      text: "Sangat recommended untuk UMKM yang ingin go digital. Support team-nya juga sangat membantu dalam proses onboarding.",
    },
    {
      id: 4,
      name: "Mbak Sari",
      business: "Toko Bunga Melati",
      avatar: "/assets/images/avatar/female2.png",
      rating: 4.5,
      text: "Interface-nya user-friendly dan mudah digunakan. Omzet toko bunga saya meningkat signifikan sejak bergabung.",
    },
    {
      id: 5,
      name: "Pak Dedi",
      business: "Warung Kopi Sedap",
      avatar: "/assets/images/avatar/male3.png",
      rating: 4.5,
      text: "Fitur lokasi dan review sangat membantu warung kopi saya ditemukan lebih banyak pelanggan. Terima kasih!",
    },
    {
      id: 6,
      name: "Bu Ani",
      business: "Toko Kue Manis",
      avatar: "/assets/images/avatar/female3.png",
      rating: 4.5,
      text: "Proses registrasi cepat dan mudah. Dalam seminggu, pesanan online saya langsung meningkat drastis.",
    },
  ];

  // === Intersection Observer ===
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.25 }
    );
    const el = sectionRef.current;
    if (el) observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  // === Auto-play ===
  const goToTestimonial = useCallback(
    (index: number) => {
      setDirection(index > currentIndex ? 1 : -1);
      setCurrentIndex(index);
    },
    [currentIndex]
  );

  useEffect(() => {
    if (!isVisible) return;
    const timer = setInterval(() => {
      goToTestimonial((currentIndex + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isVisible, currentIndex, testimonials.length, goToTestimonial]);

  useEffect(() => {
    if (!bgRef.current || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(bgRef.current, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.15, 
        delayChildren: 0.2 
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: cubicBezier(0.6, 0.05, 0.01, 0.9) 
      },
    },
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 150 : -150,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { 
        duration: 0.7, 
        ease: cubicBezier(0.6, 0.05, 0.01, 0.9) 
      },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -150 : 150,
      opacity: 0,
      scale: 0.95,
      transition: { 
        duration: 0.7, 
        ease: cubicBezier(0.6, 0.05, 0.01, 0.9) }
        ,
    }),
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-32 px-4 overflow-hidden"
    >
      {/* === Parallax Background === */}
      <div
        ref={bgRef}
        className="absolute inset-0 bg-gradient-to-br from-[#FFF8F3] via-[#FFD194]/30 to-[#FF9E6B]/10 pointer-events-none"
      />

      <div className="relative max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {/* === Header === */}
          <div className="text-center mb-14 md:mb-20">
            <motion.div
              variants={titleVariants}
              className="inline-flex items-center gap-2 px-5 py-2 bg-[#FF9E6B]/15 text-[#FF885B] rounded-full font-semibold mb-4"
            >
              <Star className="w-5 h-5 fill-[#FF9E6B]" />
              Testimoni
            </motion.div>

            <motion.h2
              variants={titleVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#2E2E2E] mb-3"
            >
              Apa Kata Mereka?
            </motion.h2>

            <motion.p
              variants={titleVariants}
              className="text-lg md:text-xl text-[#6B6B6B] max-w-2xl mx-auto"
            >
              Dengarkan kisah nyata para pelaku UMKM yang berkembang bersama UMKM
              Kita.
            </motion.p>
          </div>

          {/* === Testimonial Slider === */}
          <div className="relative max-w-4xl mx-auto">
            <div className="relative min-h-[400px] md:min-h-[320px] flex items-center">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="w-full"
                >
                  <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-[#FFD194]/50">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                      {/* Avatar */}
                      <motion.div
                        whileHover={{ scale: 1.05, rotate: 3 }}
                        className="relative w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden shrink-0 border-4 border-[#FF9E6B]/60 shadow-lg"
                      >
                        <Image
                          src={testimonials[currentIndex].avatar}
                          alt={testimonials[currentIndex].name}
                          fill
                          className="object-cover"
                        />
                      </motion.div>

                      {/* Content */}
                      <div className="flex-1 text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-5 h-5 ${
                                i <
                                Math.floor(testimonials[currentIndex].rating)
                                  ? "fill-[#FF9E6B] text-[#FF9E6B]"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                          <span className="font-bold text-xl text-[#2E2E2E] ml-1">
                            {testimonials[currentIndex].rating}
                          </span>
                        </div>

                        <p className="text-lg md:text-xl text-[#6B6B6B] leading-relaxed mb-6 italic">
                          “{testimonials[currentIndex].text}”
                        </p>

                        <div>
                          <h3 className="text-2xl font-bold text-[#2E2E2E] mb-1">
                            {testimonials[currentIndex].name}
                          </h3>
                          <p className="text-lg text-[#FF885B] font-medium">
                            {testimonials[currentIndex].business}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* === Dots === */}
            <div className="flex items-center justify-center gap-2 mt-8">
              {testimonials.map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => goToTestimonial(i)}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === currentIndex
                      ? "w-10 bg-[#FF885B]"
                      : "w-3 bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Testimonial ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
