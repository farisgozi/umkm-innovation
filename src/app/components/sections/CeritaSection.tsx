'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Story {
  id: number;
  name: string;
  business: string;
  story: string;
  image: string;
}

const CeritaSection = () => {
  const [currentStory, setCurrentStory] = useState(0);
  const [scrollY, setScrollY] = useState(0);
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

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const scrollPosition = window.scrollY;
        
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setScrollY(scrollPosition);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const stories: Story[] = [
    {
      id: 1,
      name: "Ibu Siti",
      business: "Warung Nasi Pecel",
      story: "Dari dapur rumah menjadi warung favorit warga. 15 tahun melayani dengan bumbu resep turun temurun.",
      image: "/assets/images/avatar/female1.png"
    },
    {
      id: 2,
      name: "Pak Budi",
      business: "Kerajinan Bambu",
      story: "Mengubah bambu menjadi seni. Produk lokal yang kini merambah pasar internasional.",
      image: "/assets/images/avatar/male1.png"
    },
    {
      id: 3,
      name: "Mbak Dewi",
      business: "Kopi Artisan",
      story: "Dari barista sampingan menjadi coffee shop dengan 3 cabang. Mimpi yang terwujud dengan ketekunan.",
      image: "/assets/images/avatar/female3.png"
    }
  ];

  const nextStory = () => {
    setCurrentStory((prev) => (prev + 1) % stories.length);
  };

  const prevStory = () => {
    setCurrentStory((prev) => (prev - 1 + stories.length) % stories.length);
  };

  const parallaxOffset = scrollY * 0.3;

  // Animation variants
  const headingVariants = (delay: number) => ({
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: delay,
        ease: [0.6, 0.05, 0.01, 0.9] as [number, number, number, number]
      }
    }
  });

  const lineVariants = {
    hidden: { width: 0, opacity: 0 },
    visible: (delay: number) => ({
      width: "auto",
      opacity: 1,
      transition: {
        duration: 0.6,
        delay: delay,
        ease: [0.6, 0.05, 0.01, 0.9] as [number, number, number, number]
      }
    })
  };

  const sliderVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 1.2,
        ease: [0.6, 0.05, 0.01, 0.9] as [number, number, number, number]
      }
    }
  };

  const ctaVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 1.4,
        ease: [0.6, 0.05, 0.01, 0.9] as [number, number, number, number]
      }
    }
  };
  
  return (
    <section 
      ref={sectionRef}
      className="relative w-full min-h-screen py-20 px-4 md:px-8 lg:px-16 overflow-hidden bg-linear-to-br from-gray-50 to-orange-50"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[80vh]">
          
          {/* Left Side - Parallax Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] }}
            className="relative h-[500px] lg:h-[700px] rounded-3xl overflow-hidden shadow-2xl"
          >
            <motion.div 
              className="absolute inset-0"
              style={{
                transform: `translateY(${parallaxOffset * 0.5}px)`,
                transition: 'transform 0.1s ease-out'
              }}
            >
              <Image
                src="/assets/images/umkm/cerita.jpg"
                alt="UMKM Story"
                fill
                className="object-cover scale-110"
                priority
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
            </motion.div>

            {/* Floating Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="absolute bottom-8 left-8 bg-[#FFF8F3] backdrop-blur-sm rounded-2xl px-6 py-4 shadow-xl z-10"
            >
              <p className="text-[#FF885B] font-display font-bold text-sm mb-1">📖 CERITA LOKAL</p>
              <p className="text-[#2E2E2E] text-xs font-semibold">Lebih dari {stories.length}00+ kisah inspiratif</p>
            </motion.div>
          </motion.div>

          {/* Right Side - Kinetic Typography & Content */}
          <div className="space-y-8 lg:space-y-12">
            
            {/* Kinetic Typography with Staggered Reveal */}
            <div className="space-y-4">
              <motion.div
                variants={headingVariants(0.3)}
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
                className="overflow-hidden"
              >
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#2E2E2E] leading-tight">
                  Setiap produk
                </h2>
              </motion.div>

              <motion.div
                variants={headingVariants(0.5)}
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
                className="overflow-hidden"
              >
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#FF885B] leading-tight">
                  punya cerita.
                </h2>
              </motion.div>

              <motion.div
                variants={headingVariants(0.7)}
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
                className="overflow-hidden"
              >
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#2E2E2E] leading-tight">
                  Mari dengarkan
                </h2>
              </motion.div>

              <motion.div
                variants={headingVariants(0.9)}
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
                className="overflow-hidden"
              >
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#2E2E2E] leading-tight">
                  mereka.
                </h2>
              </motion.div>
            </div>

            {/* Decorative Line with Sequential Reveal */}
            <div className="flex items-center gap-3">
              <motion.div
                custom={1.0}
                variants={lineVariants}
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
                className="w-24 h-1.5 bg-[#FF885B] rounded-full"
              />
              <motion.div
                custom={1.1}
                variants={lineVariants}
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
                className="w-16 h-1.5 bg-[#FF885B] rounded-full"
              />
              <motion.div
                custom={1.2}
                variants={lineVariants}
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
                className="w-10 h-1.5 bg-[#FF885B] rounded-full"
              />
            </div>

            {/* Story Slider with Animated Content */}
            <motion.div
              variants={sliderVariants}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStory}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="mb-6"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="relative w-16 h-16 rounded-full overflow-hidden shrink-0 border-2 border-[#FF885B]"
                    >
                      <Image
                        src={stories[currentStory].image}
                        alt={stories[currentStory].name}
                        fill
                        className="object-cover"
                      />
                    </motion.div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{stories[currentStory].name}</h3>
                      <p className="text-orange-500 font-medium">{stories[currentStory].business}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    &quot;{stories[currentStory].story}&quot;
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Controls */}
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  {stories.map((_, index) => (
                    <motion.button
                      key={index}
                      onClick={() => setCurrentStory(index)}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        index === currentStory 
                          ? 'w-12 bg-orange-500' 
                          : 'w-2 bg-gray-300 hover:bg-gray-400'
                      }`}
                      aria-label={`Go to story ${index + 1}`}
                    />
                  ))}
                </div>

                <div className="flex gap-2">
                  <motion.button
                    onClick={prevStory}
                    whileHover={{ scale: 1.1, backgroundColor: "#FF885B" }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 rounded-full bg-gray-100 hover:text-white transition-colors"
                    aria-label="Previous story"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </motion.button>
                  <motion.button
                    onClick={nextStory}
                    whileHover={{ scale: 1.1, backgroundColor: "#FF885B" }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 rounded-full bg-gray-100 hover:text-white transition-colors"
                    aria-label="Next story"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              variants={ctaVariants}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-full transition-colors duration-300 shadow-lg hover:shadow-xl"
              >
                Baca Semua Cerita →
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Floating Decorative Elements with Animation */}
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
        className="absolute top-20 right-10 w-32 h-32 bg-orange-300/20 rounded-full blur-3xl"
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
        className="absolute bottom-40 left-10 w-40 h-40 bg-yellow-300/20 rounded-full blur-3xl"
      />
    </section>
  );
};

export default CeritaSection;