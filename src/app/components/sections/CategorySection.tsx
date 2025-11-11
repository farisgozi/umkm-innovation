'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, cubicBezier } from 'framer-motion';

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
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const leftSideVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: cubicBezier(0.6, 0.05, 0.01, 0.9) } }
  };

  const rightSideVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: cubicBezier(0.6, 0.05, 0.01, 0.9) } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const sideImageVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 0.5, scale: 1, transition: { duration: 0.5, ease: cubicBezier(0.6, 0.05, 0.01, 0.9) } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.3 } }
  };

  return (
    <section ref={sectionRef} className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center"
        >
          {/* Left Side: Category Carousel */}
          <motion.div variants={leftSideVariants} className="relative flex flex-col">
            <div className="border-4 border-[#6B6B6B] rounded-[48px] lg:rounded-[72px] p-6 lg:p-8 bg-[#FFF8F2] shadow-lg">
              <motion.h2 variants={itemVariants} className="text-2xl md:text-3xl lg:text-4xl text-center font-bold text-[#2E2E2E] mb-8 lg:mb-12">
                Pilih Kategori Favoritmu
              </motion.h2>

              <motion.div variants={itemVariants} className="relative flex flex-col items-center justify-center mb-8 overflow-hidden">
                <div className="flex items-center justify-center gap-3 md:gap-4 lg:gap-6">
                  {/* Previous Category */}
                  <motion.button whileHover={{ scale: 1.1, opacity: 0.75 }} whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveCategory(getPrevIndex())} aria-label="Previous category">
                    <div className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 flex items-center justify-center">
                      <AnimatePresence mode="wait">
                        <motion.div key={`prev-${getPrevIndex()}`} variants={sideImageVariants} initial="initial" animate="animate" exit="exit">
                          <Image src={categories[getPrevIndex()].illustration} alt={categories[getPrevIndex()].name} width={160} height={160} className="object-contain" priority />
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </motion.button>

                  {/* Active Category */}
                  <motion.div whileHover={{ scale: 1.05 }} className="bg-[#FF885B] rounded-[32px] lg:rounded-[52px] p-6 lg:p-8 w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 flex flex-col items-center justify-center shadow-2xl">
                    <div className="w-full h-full flex flex-col items-center justify-center">
                      <Image src={categories[activeCategory].illustration} alt={categories[activeCategory].name} width={220} height={220} className="object-contain mb-2 lg:mb-4" priority />
                      <h4 className="text-lg md:text-xl lg:text-2xl font-bold text-white">{categories[activeCategory].name}</h4>
                    </div>
                  </motion.div>

                  {/* Next Category */}
                  <motion.button whileHover={{ scale: 1.1, opacity: 0.75 }} whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveCategory(getNextIndex())} aria-label="Next category">
                    <div className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 flex items-center justify-center">
                      <AnimatePresence mode="wait">
                        <motion.div key={`next-${getNextIndex()}`} variants={sideImageVariants} initial="initial" animate="animate" exit="exit">
                          <Image src={categories[getNextIndex()].illustration} alt={categories[getNextIndex()].name} width={160} height={160} className="object-contain" priority />
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </motion.button>
                </div>

                {/* Pagination */}
                <div className="flex justify-center gap-2 mt-6 lg:mt-8">
                  {categories.map((category, index) => (
                    <motion.button key={category.id} onClick={() => setActiveCategory(index)}
                      whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}
                      className={`transition-all duration-300 rounded-full ${
                        index === activeCategory ? 'w-8 h-3 bg-[#FF885B]' : 'w-3 h-3 bg-gray-400 hover:bg-gray-500'
                      }`}
                      aria-label={`Go to ${category.name}`} />
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Food Preview Grid */}
            <motion.div variants={itemVariants} className="relative grid grid-cols-3 gap-3 md:gap-4 mt-6 lg:mt-8">
              {foodItems.map((item, index) => (
                <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1, ease: cubicBezier(0.25,0.1,0.25,1) }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="relative aspect-square rounded-2xl lg:rounded-3xl overflow-hidden shadow-lg cursor-pointer group"
                >
                  <Image src={item.preview} alt={item.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />

                  {/* Overlay text */}
                  <motion.div className="absolute bottom-0 left-0 right-0 bg-[#FFC896] py-3 md:py-4 lg:py-5 rounded-b-2xl lg:rounded-b-3xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="text-gray-900 font-bold text-sm md:text-base lg:text-lg text-center px-2">Lihat Detail</h3>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Side Hero Image */}
          <motion.div variants={rightSideVariants} className="relative h-[500px] md:h-[600px] lg:h-[800px] rounded-3xl lg:rounded-[40px] overflow-hidden shadow-2xl group">
            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.7 }} className="relative w-full h-full">
              <Image src="/assets/images/illustrations/sate.jpg" alt="UMKM Showcase - Sate Bakar" fill className="object-cover group-hover:scale-105 transition-transform duration-700" priority />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} transition={{ duration: 0.8, delay: 0.6 }}
              className="absolute bottom-6 left-6 text-white">
              <p className="text-xs md:text-sm font-semibold mb-1 opacity-90">Featured</p>
              <h3 className="text-2xl sm:text-3xl font-bold drop-shadow-lg">Sate Bakar Khas Nusantara</h3>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CategorySection;
