'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, cubicBezier, Variants } from 'framer-motion';
import { MapPin, Navigation } from 'lucide-react';

const MapsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: cubicBezier(0.6, 0.05, 0.01, 0.9)
      }
    }
  };

  const mapVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: cubicBezier(0.6, 0.05, 0.01, 0.9)
      }
    }
  };

  const iconVariants: Variants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        type: "spring" as const, // 🔥 fix utama: literal, bukan string umum
        stiffness: 200,
        damping: 15,
      },
    },
  };

  return (
    <section ref={sectionRef} className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <motion.div
              variants={titleVariants}
              className="inline-block mb-4"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-600 rounded-full text-sm font-bold">
                <MapPin className="w-4 h-4" />
                Lokasi
              </span>
            </motion.div>

            <motion.h2
              variants={titleVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4"
            >
              Temukan UMKM di Sekitarmu
            </motion.h2>

            <motion.p
              variants={titleVariants}
              className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto"
            >
              Jelajahi ribuan UMKM lokal yang tersebar di berbagai kota
            </motion.p>
          </div>

          {/* Map Container */}
          <motion.div
            variants={mapVariants}
            className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] rounded-3xl overflow-hidden shadow-2xl bg-linear-to-br from-blue-50 to-orange-50"
          >
            {/* Decorative Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-10 left-10 w-20 h-20 border-4 border-orange-400 rounded-full" />
              <div className="absolute bottom-20 right-20 w-16 h-16 border-4 border-blue-400 rounded-full" />
              <div className="absolute top-1/2 left-1/4 w-24 h-24 border-4 border-orange-300 rounded-full" />
            </div>

            {/* Google Maps Placeholder */}
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
              <motion.div
                variants={iconVariants}
                className="text-center space-y-6"
              >
                {/* Animated Google Maps Icon */}
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="relative"
                >
                  <Image
                    src="/assets/images/google-maps.png"
                    alt="Google Maps Icon"
                    width={120}
                    height={120}
                    className="mx-auto drop-shadow-lg"
                  />
                  
                  {/* Ping Animation Around Icon */}
                  <motion.div
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 0, 0.5]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeOut"
                    }}
                    className="absolute inset-0 rounded-full border-4 border-orange-400"
                  />
                </motion.div>

                <div className="space-y-3">
                  <p className="text-gray-700 text-lg md:text-xl font-semibold">
                    Peta Interaktif Segera Hadir
                  </p>
                  <p className="text-gray-500 text-sm md:text-base max-w-md mx-auto">
                    Temukan lokasi UMKM terdekat dengan fitur pencarian dan navigasi yang mudah
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-full shadow-lg transition-colors"
                  >
                    <Navigation className="w-5 h-5" />
                    Cari Lokasi Terdekat
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 font-bold px-6 py-3 rounded-full shadow-lg border-2 border-gray-200 transition-colors"
                  >
                    <MapPin className="w-5 h-5" />
                    Lihat Semua UMKM
                  </motion.button>
                </div>
              </motion.div>
            </div>

            {/* Location Markers (Decorative) */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="absolute top-1/4 left-1/4 z-20"
            >
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="bg-orange-500 text-white p-2 rounded-full shadow-lg"
              >
                <MapPin className="w-6 h-6" />
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="absolute bottom-1/3 right-1/3 z-20"
            >
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                className="bg-blue-500 text-white p-2 rounded-full shadow-lg"
              >
                <MapPin className="w-6 h-6" />
              </motion.div>
            </motion.div>

            {/* Actual Google Maps Embed - Ready to Use */}
            {/* 
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.5!2d106.8456!3d-6.2088!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM8KwMTInMzEuNyJTIDEwNsKwNTAnNDQuMiJF!5e0!3m2!1sen!2sid!4v1234567890123!5m2!1sen!2sid"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="UMKM Locations Map"
              className="absolute inset-0"
            />
            */}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default MapsSection;