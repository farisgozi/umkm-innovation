"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence, cubicBezier } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  business: string;
  avatar: string;
  rating: number;
  text: string;
}

const TestimoniSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [direction, setDirection] = useState(1);
  const sectionRef = useRef<HTMLDivElement>(null);

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

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // === Callback Functions ===
  const nextTestimonial = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prevTestimonial = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  const goToTestimonial = useCallback(
    (index: number) => {
      setDirection(index > currentIndex ? 1 : -1);
      setCurrentIndex(index);
    },
    [currentIndex]
  );

  // Auto-play effect
  useEffect(() => {
    if (!isAutoPlay || !isVisible) return;

    const interval = setInterval(() => {
      nextTestimonial();
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, [isAutoPlay, isVisible, nextTestimonial]);

  // === Animation Variants ===
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
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
        ease: cubicBezier(0.6, 0.05, 0.01, 0.9),
      },
    },
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: cubicBezier(0.6, 0.05, 0.01, 0.9),
      },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.5,
        ease: cubicBezier(0.6, 0.05, 0.01, 0.9),
      },
    }),
  };

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 px-4 bg-linear-to-b from-orange-50/30 to-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {/* === Section Header === */}
          <div className="text-center mb-12 md:mb-16">
            <motion.div variants={titleVariants} className="inline-block mb-4">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-600 rounded-full text-sm font-bold">
                <Star className="w-4 h-4 fill-orange-600" />
                Testimoni
              </span>
            </motion.div>

            <motion.h2
              variants={titleVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4"
            >
              Apa Kata Mereka?
            </motion.h2>

            <motion.p
              variants={titleVariants}
              className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto"
            >
              Dengarkan cerita sukses dari pelaku UMKM yang telah bergabung
            </motion.p>
          </div>

          {/* === Testimonial Slider === */}
          <div className="relative max-w-4xl mx-auto">
            <div className="relative min-h-[400px] md:min-h-[300px] flex items-center">
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
                  <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-100">
                    <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
                      {/* Avatar */}
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden shrink-0 border-4 border-orange-400 shadow-xl"
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
                              className={`w-6 h-6 ${
                                i < Math.floor(testimonials[currentIndex].rating)
                                  ? "fill-orange-400 text-orange-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                          <span className="font-bold text-2xl text-gray-900 ml-2">
                            {testimonials[currentIndex].rating}
                          </span>
                        </div>

                        <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-6 italic">
                          &quot;{testimonials[currentIndex].text}&quot;
                        </p>

                        <div>
                          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                            {testimonials[currentIndex].name}
                          </h3>
                          <p className="text-lg md:text-xl text-orange-500 font-medium">
                            {testimonials[currentIndex].business}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Buttons */}
            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between items-center pointer-events-none px-2 md:-mx-16">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={prevTestimonial}
                className="pointer-events-auto p-3 md:p-4 rounded-full bg-white hover:bg-orange-500 text-gray-700 hover:text-white shadow-lg transition-colors border-2 border-gray-200"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-6 h-6" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={nextTestimonial}
                className="pointer-events-auto p-3 md:p-4 rounded-full bg-white hover:bg-orange-500 text-gray-700 hover:text-white shadow-lg transition-colors border-2 border-gray-200"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-6 h-6" />
              </motion.button>
            </div>

            {/* Dots + Controls */}
            <div className="flex items-center justify-center gap-6 mt-8">
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => goToTestimonial(index)}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? "w-12 bg-orange-500"
                        : "w-2 bg-gray-300 hover:bg-gray-400"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsAutoPlay(!isAutoPlay)}
                className="p-2 rounded-full bg-gray-100 hover:bg-orange-100 transition-colors"
                aria-label={isAutoPlay ? "Pause autoplay" : "Start autoplay"}
              >
                {isAutoPlay ? (
                  <Pause className="w-5 h-5 text-gray-700" />
                ) : (
                  <Play className="w-5 h-5 text-gray-700" />
                )}
              </motion.button>
            </div>
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16 text-center"
          >
            <p className="text-gray-600 mb-6 text-lg">
              Bergabung dengan ribuan UMKM yang telah berkembang bersama kami
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-colors duration-300"
            >
              Mulai Sekarang →
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimoniSection;
