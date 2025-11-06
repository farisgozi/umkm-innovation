'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { motion,cubicBezier } from 'framer-motion';
import { Star } from 'lucide-react';

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

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Pak Ahmad',
      business: 'Toko Kelontong Maju Jaya',
      avatar: '/assets/images/avatar/male1.png',
      rating: 4.5,
      text: 'Platform ini sangat membantu UMKM seperti saya untuk berkembang. Pelayanannya responsif dan fitur-fiturnya mudah dipahami.'
    },
    {
      id: 2,
      name: 'Ibu Lina',
      business: 'Salon Kecantikan Cantik',
      avatar: '/assets/images/avatar/female1.png',
      rating: 4.5,
      text: 'Dengan bergabung di sini, pelanggan saya bertambah banyak. Sistem pembayarannya juga aman dan terpercaya.'
    },
    {
      id: 3,
      name: 'Mas Rudi',
      business: 'Bengkel Motor Speedy',
      avatar: '/assets/images/avatar/male2.png',
      rating: 4.5,
      text: 'Sangat recommended untuk UMKM yang ingin go digital. Support team-nya juga sangat membantu dalam proses onboarding.'
    },
    {
      id: 4,
      name: 'Mbak Sari',
      business: 'Toko Bunga Melati',
      avatar: '/assets/images/avatar/female2.png',
      rating: 4.5,
      text: 'Interface-nya user-friendly dan mudah digunakan. Omzet toko bunga saya meningkat signifikan sejak bergabung.'
    },
    {
      id: 5,
      name: 'Pak Dedi',
      business: 'Warung Kopi Sedap',
      avatar: '/assets/images/avatar/male3.png',
      rating: 4.5,
      text: 'Fitur lokasi dan review sangat membantu warung kopi saya ditemukan lebih banyak pelanggan. Terima kasih!'
    },
    {
      id: 6,
      name: 'Bu Ani',
      business: 'Toko Kue Manis',
      avatar: '/assets/images/avatar/female3.png',
      rating: 4.5,
      text: 'Proses registrasi cepat dan mudah. Dalam seminggu, pesanan online saya langsung meningkat drastis.'
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
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

  // Testimonial Card Component
  const TestimonialCard = ({ testimonial, index }: { testimonial: Testimonial; index: number }) => (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="flex items-start gap-4 bg-white p-6 rounded-3xl shadow-lg hover:shadow-xl border border-gray-100"
    >
      {/* Avatar */}
      <motion.div
        initial={{ scale: 0 }}
        animate={isVisible ? { scale: 1 } : { scale: 0 }}
        transition={{
          duration: 0.5,
          delay: 0.3 + (index * 0.1),
          type: "spring",
          stiffness: 200
        }}
        whileHover={{ scale: 1.1, rotate: 5 }}
        className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden shrink-0 border-4 border-orange-200 shadow-lg"
      >
        <Image
          src={testimonial.avatar}
          alt={testimonial.name}
          fill
          className="object-cover"
        />
      </motion.div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg md:text-xl font-bold text-gray-900 truncate">
              {testimonial.name}
            </h3>
            <p className="text-sm md:text-base text-orange-500 font-medium truncate">
              {testimonial.business}
            </p>
          </div>
          
          {/* Rating */}
          <div className="flex items-center gap-1 shrink-0">
            <Star className="w-5 h-5 fill-orange-400 text-orange-400" />
            <span className="font-bold text-lg text-gray-900">
              {testimonial.rating}
            </span>
          </div>
        </div>

        {/* Testimonial Text */}
        <p className="text-sm md:text-base text-gray-700 leading-relaxed line-clamp-3">
          &quot;{testimonial.text}&quot;
        </p>
      </div>
    </motion.div>
  );

  return (
    <section ref={sectionRef} className="py-16 md:py-24 px-4 bg-linear-to-b from-orange-50/30 to-white">
      <div className="max-w-7xl mx-auto">
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

          {/* Testimonials Grid */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                index={index}
              />
            ))}
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-12 md:mt-16 text-center"
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