"use client";

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, cubicBezier } from 'framer-motion';

interface InfoCard {
  id: number;
  title: string;
  description: string;
  image: string;
  bgColor: string;
}

export default function AboutSection() {
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

  const infoCards: InfoCard[] = [
    {
      id: 1,
      title: "Informasi",
      description: "Memudahkan akses informasi UMKM lokal",
      image: "/assets/images/illustrations/info.png",
      bgColor: "bg-orange-200"
    },
    {
      id: 2,
      title: "Kolaborasi",
      description: "Menghubungkan platform digital dan UMKM lokal",
      image: "/assets/images/illustrations/collaboration.png",
      bgColor: "bg-orange-200"
    },
    {
      id: 3,
      title: "Promosi",
      description: "Meningkatkan eksposur usaha kecil",
      image: "/assets/images/illustrations/promotions.png",
      bgColor: "bg-orange-200"
    },
    {
      id: 4,
      title: "Pemberdayaan",
      description: "Mendampingi UMKM agar siap bersaing secara digital",
      image: "/assets/images/illustrations/empowerment.png",
      bgColor: "bg-orange-200"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
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

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: cubicBezier(0.6, 0.05, 0.01, 0.9)
      }
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="py-20 md:py-28 px-4 md:px-8 lg:px-16 bg-linear-to-b from-white to-orange-50/30"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* Left Side - Main Content */}
          <motion.div
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={containerVariants}
            className="space-y-6"
          >
            {/* Section Badge */}
            <motion.div
              variants={titleVariants}
              className="inline-block"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-600 rounded-full text-sm font-bold">
                <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                Tentang Kami
              </span>
            </motion.div>

            {/* Main Title */}
            <motion.h2
              variants={titleVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight"
            >
              Kami menjadi wadah digital yang mempertemukan masyarakat dengan UMKM lokal mengangkat potensi daerah menjadi inspirasi nasional.
            </motion.h2>

            {/* Description */}
            <motion.p
              variants={titleVariants}
              className="text-lg md:text-xl text-gray-600 leading-relaxed"
            >
              Platform yang menghubungkan Anda dengan ribuan UMKM lokal, mendukung pertumbuhan ekonomi daerah, dan memberdayakan pelaku usaha kecil untuk go digital.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              variants={titleVariants}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="mt-4 inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Pelajari Lebih Lanjut
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Side - Info Cards Grid */}
          <motion.div
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6"
          >
            {infoCards.map((card, index) => (
              <motion.div
                key={card.id}
                variants={cardVariants}
                whileHover={{ 
                  scale: 1.05,
                  rotate: index % 2 === 0 ? 2 : -2,
                  transition: { duration: 0.3 }
                }}
                className={`${card.bgColor} rounded-3xl p-6 md:p-8 shadow-md hover:shadow-xl transition-shadow duration-300 ${
                  index === 1 ? 'sm:mt-8' : ''
                } ${
                  index === 2 ? 'sm:mt-0' : ''
                } ${
                  index === 3 ? 'sm:mt-8' : ''
                }`}
              >
                {/* Illustration */}
                <div className="relative w-full h-40 md:h-48 mb-4 rounded-2xl overflow-hidden bg-white/50">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-contain p-4"
                  />
                </div>

                {/* Card Content */}
                <div className="space-y-2">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                    {card.title}
                  </h3>
                  <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}