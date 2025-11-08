'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion,cubicBezier } from 'framer-motion';
import { Search, Star } from 'lucide-react';

interface Review {
  id: number;
  avatar: string;
  rating: number;
  text: string;
}

interface FoodItem {
  id: number;
  name: string;
  description: string;
  image: string;
  type: 'vendor' | 'food';
}

const ExploreSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
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

  const foodItems: FoodItem[] = [
    {
      id: 1,
      name: 'AYAM GEPREK 77',
      description: 'Ayam Geprek 77 menyajikan ayam geprek dengan cita rasa pedas yang menggugah selera, dipadukan dengan sambal spesial yang khas dan lezat.',
      image: '/assets/images/umkm/ayam_geprek_77.webp',
      type: 'vendor'
    }
  ];

  const reviews: Review[] = [
    {
      id: 1,
      avatar: '/assets/images/avatar/female1.png',
      rating: 4.5,
      text: 'Pelayanan cepat dan makanan yang disajikan sangat lezat. Saya sangat merekomendasikan Ayam Geprek 77 kepada siapa saja yang mencari hidangan pedas yang autentik!'
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
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

  const searchVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: cubicBezier(0.6, 0.05, 0.01, 0.9)
      }
    }
  };

  const leftCardVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: cubicBezier(0.6, 0.05, 0.01, 0.9)
      }
    }
  };

  const rightColumnVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: cubicBezier(0.6, 0.05, 0.01, 0.9),
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: cubicBezier(0.6, 0.05, 0.01, 0.9)
      }
    }
  };

  return (
    <section ref={sectionRef} className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <motion.h1
              variants={titleVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 md:mb-8"
            >
              Explore UMKM Sekitarmu
            </motion.h1>
            
            {/* Search Bar */}
            <motion.div
              variants={searchVariants}
              className="max-w-2xl mx-auto relative"
            >
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 transition-colors group-focus-within:text-orange-500" />
                <motion.input
                  type="text"
                  placeholder="Search makanan, minuman, atau jasa"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  whileFocus={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  className="w-full pl-12 pr-4 py-4 rounded-full border-2 border-gray-300 focus:border-[#FF885B] focus:outline-none text-gray-700 placeholder-gray-400 transition-all duration-300"
                />
              </div>
            </motion.div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Left Card - Vendor/Restaurant */}
            <motion.div
              variants={leftCardVariants}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              className="relative rounded-3xl overflow-hidden shadow-lg group cursor-pointer"
            >
              <div className="relative h-[600px] lg:h-[700px] w-full">
                <Image
                  src={foodItems[0].image}
                  alt={foodItems[0].name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                
                {/* Content Overlay */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white"
                >
                  <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                    {foodItems[0].name}
                  </h2>
                  <p className="text-white/90 mb-6 line-clamp-3 text-base md:text-lg">
                    {foodItems[0].description}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-white text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-orange-50 transition-colors shadow-lg"
                  >
                    Lihat Detail
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>

            {/* Right Column */}
            <motion.div
              variants={rightColumnVariants}
              className="flex flex-col gap-6"
            >
              {/* Review Card */}
              <motion.div
                variants={cardVariants}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-3xl shadow-lg p-6 md:p-8 flex items-start gap-4 border border-gray-100"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isVisible ? { scale: 1 } : { scale: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 0.8,
                    type: "spring",
                    stiffness: 200
                  }}
                  className="relative w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden shrink-0 border-2 border-orange-200"
                >
                  <Image
                    src={reviews[0].avatar}
                    alt="User avatar"
                    fill
                    className="object-cover"
                  />
                </motion.div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <Star className="w-5 h-5 fill-orange-400 text-orange-400" />
                    <span className="font-bold text-gray-900 text-lg">
                      {reviews[0].rating}
                    </span>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                    &quot;{reviews[0].text}&quot;
                  </p>
                </div>
              </motion.div>

              {/* Food Image Card */}
              <motion.div
                variants={cardVariants}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                className="relative rounded-3xl overflow-hidden shadow-lg h-[400px] md:h-[500px] group cursor-pointer"
              >
                <Image
                  src="/assets/images/umkm/produk.webp"
                  alt="Ayam Geprek Dish"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.8, delay: 1 }}
                  className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white"
                >
                  <h3 className="text-2xl md:text-3xl font-bold mb-2">
                    Ayam Geprek Dada
                  </h3>
                <p className="text-white/90 text-sm md:text-base">
                  Nikmati sensasi pedas dan gurih dari Ayam Geprek Dada yang renyah,
                  disajikan dengan sambal spesial khas kami.
                </p>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExploreSection;