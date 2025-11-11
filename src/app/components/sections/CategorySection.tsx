'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, cubicBezier, Variants } from 'framer-motion';

interface Category {
  id: number;
  name: string;
  illustration: string;
}

interface FoodItem {
  id: number;
  name: string;
  preview: string;
}

const CategorySection = () => {
  const [activeCategory, setActiveCategory] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const categories: Category[] = [
    { id: 1, name: 'Minuman', illustration: '/assets/images/illustrations/drink.png' },
    { id: 2, name: 'Makanan', illustration: '/assets/images/illustrations/sesame-bun.png' },
    { id: 3, name: 'Jasa', illustration: '/assets/images/illustrations/t-shirt.png' }
  ];

  const foodItems: FoodItem[] = [
    { id: 1, name: 'Sate Bakar', preview: '/assets/images/illustrations/seafood.jpg' },
    { id: 2, name: 'Es Cendol', preview: '/assets/images/illustrations/es-cendol.jpeg' },
    { id: 3, name: 'Lumpia Goreng', preview: '/assets/images/illustrations/pempek-pempek.jpeg' }
  ];

  const getPrevIndex = () => (activeCategory - 1 + categories.length) % categories.length;
  const getNextIndex = () => (activeCategory + 1) % categories.length;

  // 🌟 MOTION PRESETS
  const sectionPreset: Variants = {
    hidden: { opacity: 0, scale: 0.98, y: 40 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: cubicBezier(0.33, 1, 0.68, 1),
        when: "beforeChildren",
        staggerChildren: 0.15,
      },
    },
  };

  const titlePreset: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const cardPreset: Variants = {
    hidden: { opacity: 0, y: 40, scale: 0.9 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.7,
        ease: cubicBezier(0.33, 1, 0.68, 1),
      },
    }),
  };

  const sideImageVariants: Variants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 0.6, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.3 } },
  };

  return (
    <section ref={sectionRef} className="py-20 md:py-28 relative overflow-hidden">
      {/* Gradient Accent */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isVisible ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute inset-0 bg-gradient-to-b from-[#FFF8F2]/60 via-transparent to-[#FFD194]/20 -z-10"
      />

      <div className="container mx-auto px-6 md:px-10 lg:px-16">
        <motion.div
          variants={sectionPreset}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          {/* LEFT SIDE - Kategori Carousel */}
          <div>
            <motion.h2
              variants={titlePreset}
              className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#2E2E2E] mb-10 text-center lg:text-left"
            >
              Kategori Favoritmu
            </motion.h2>

            <motion.div
              variants={titlePreset}
              className="flex items-center justify-center gap-6 relative"
            >
              {/* Prev */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(getPrevIndex())}
                aria-label="Kategori Sebelumnya"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`prev-${getPrevIndex()}`}
                    variants={sideImageVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    <Image
                      src={categories[getPrevIndex()].illustration}
                      alt={categories[getPrevIndex()].name}
                      width={120}
                      height={120}
                      className="opacity-60"
                    />
                  </motion.div>
                </AnimatePresence>
              </motion.button>

              {/* Active */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5 }}
                className="bg-[#FF885B] w-64 h-64 lg:w-80 lg:h-80 flex flex-col items-center justify-center rounded-[48px] shadow-xl"
              >
                <Image
                  src={categories[activeCategory].illustration}
                  alt={categories[activeCategory].name}
                  width={180}
                  height={180}
                  className="object-contain mb-4"
                />
                <h3 className="text-white font-bold text-2xl">{categories[activeCategory].name}</h3>
              </motion.div>

              {/* Next */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(getNextIndex())}
                aria-label="Kategori Selanjutnya"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`next-${getNextIndex()}`}
                    variants={sideImageVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    <Image
                      src={categories[getNextIndex()].illustration}
                      alt={categories[getNextIndex()].name}
                      width={120}
                      height={120}
                      className="opacity-60"
                    />
                  </motion.div>
                </AnimatePresence>
              </motion.button>
            </motion.div>

            {/* Food grid bawah */}
            <div className="grid grid-cols-3 gap-4 mt-10">
              {foodItems.map((item, i) => (
                <motion.div
                  key={item.id}
                  variants={cardPreset}
                  custom={i}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="relative aspect-square rounded-3xl overflow-hidden shadow-lg cursor-pointer group"
                >
                  <Image
                    src={item.preview}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
                  <motion.div
                    initial={{ y: '100%' }}
                    whileHover={{ y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute bottom-0 w-full py-3 bg-[#FFC896] text-center rounded-b-3xl"
                  >
                    <p className="font-semibold text-gray-900 text-sm md:text-base">Lihat Detail</p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE - Showcase Image */}
          <motion.div
            variants={cardPreset}
            custom={4}
            className="relative h-[480px] md:h-[600px] lg:h-[720px] rounded-[40px] overflow-hidden shadow-2xl group"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.7 }}
              className="relative w-full h-full"
            >
              <Image
                src="/assets/images/illustrations/sate.jpg"
                alt="Sate Bakar Khas Nusantara"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="absolute bottom-6 left-6 text-white"
            >
              <p className="text-xs md:text-sm font-semibold mb-1 opacity-80">Featured</p>
              <h3 className="text-2xl md:text-3xl font-bold">Sate Bakar Khas Nusantara</h3>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CategorySection;
