'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, PanInfo, cubicBezier } from 'framer-motion';
import { Search, Star } from 'lucide-react';

interface ExploreItem {
  id: number;
  vendorName: string;
  vendorDescription: string;
  vendorImage: string;
  reviewAvatar: string;
  reviewRating: number;
  reviewText: string;
  productName: string;
  productDescription: string;
  productImage: string;
}

const ExploreSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const sectionRef = useRef<HTMLDivElement>(null);

  const exploreItems: ExploreItem[] = [
    {
      id: 1,
      vendorName: 'AYAM GEPREK 77',
      vendorDescription: 'Ayam Geprek 77 menyajikan ayam geprek dengan cita rasa pedas yang menggugah selera, dipadukan dengan sambal spesial yang khas dan lezat.',
      vendorImage: '/assets/images/umkm/ayam_geprek_77.webp',
      reviewAvatar: '/assets/images/avatar/female1.png',
      reviewRating: 4.5,
      reviewText: 'Pelayanan cepat dan makanan yang disajikan sangat lezat. Saya sangat merekomendasikan Ayam Geprek 77 kepada siapa saja yang mencari hidangan pedas yang autentik!',
      productName: 'Ayam Geprek Dada',
      productDescription: 'Nikmati sensasi pedas dan gurih dari Ayam Geprek Dada yang renyah, disajikan dengan sambal spesial khas kami.',
      productImage: '/assets/images/umkm/produk.webp'
    },
    {
      id: 2,
      vendorName: 'WARUNG NASI PECEL BU TINI',
      vendorDescription: 'Warung legendaris dengan resep pecel turun temurun lebih dari 30 tahun. Bumbu kacang yang khas dan sayuran segar setiap hari.',
      vendorImage: '/assets/images/umkm/warung_pecel.webp',
      reviewAvatar: '/assets/images/avatar/male2.png',
      reviewRating: 4.8,
      reviewText: 'Pecel terenak di kota! Bumbu kacangnya pas, tidak terlalu manis. Harga terjangkau dan porsi melimpah. Wajib coba!',
      productName: 'Nasi Pecel Komplit',
      productDescription: 'Nasi hangat dengan sayuran segar, telur, tempe, dan bumbu pecel khas yang menggoda selera.',
      productImage: '/assets/images/umkm/nasi_pecel.webp'
    },
    {
      id: 3,
      vendorName: 'KEDAI KOPI NUSANTARA',
      vendorDescription: 'Kedai kopi dengan biji kopi pilihan dari berbagai daerah Indonesia. Suasana nyaman untuk kerja atau ngobrol santai.',
      vendorImage: '/assets/images/umkm/kedai_kopi.webp',
      reviewAvatar: '/assets/images/avatar/female3.png',
      reviewRating: 4.7,
      reviewText: 'Kopi nya enak banget! Barista nya ramah dan tempatnya instagramable. Cocok buat nongkrong atau meeting.',
      productName: 'Kopi Susu Gula Aren',
      productDescription: 'Perpaduan sempurna espresso Indonesia dengan susu segar dan gula aren organik. Manis alami dan creamy.',
      productImage: '/assets/images/umkm/kopi_susu.webp'
    }
  ];

  // Observer untuk trigger motion
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if(entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % exploreItems.length);
  }, [exploreItems.length]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + exploreItems.length) % exploreItems.length);
  }, [exploreItems.length]);

  const goToSlide = useCallback(
    (index: number) => {
      setDirection(index > currentIndex ? 1 : -1);
      setCurrentIndex(index);
    },
    [currentIndex]
  );

  // Auto-play desktop/tablet only
  useEffect(() => {
    if (!isVisible || typeof window === 'undefined') return;

    const isDesktop = window.innerWidth >= 1024; 
    if (!isDesktop) return;

    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isVisible, nextSlide]);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x < -100) nextSlide();
    else if (info.offset.x > 100) prevSlide();
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
  };

  const titleVariants = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: cubicBezier(0.6,0.05,0.01,0.9) } } };
  const searchVariants = { hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: cubicBezier(0.6,0.05,0.01,0.9) } } };

  const slideVariants = {
    enter: (direction: number) => ({ x: direction > 0 ? 1200 : -1200, opacity: 0 }),
    center: { x: 0, opacity: 1, transition: { duration: 0.6, ease: cubicBezier(0.6,0.05,0.01,0.9) } },
    exit: (direction: number) => ({ x: direction > 0 ? -1200 : 1200, opacity: 0, transition: { duration: 0.6, ease: cubicBezier(0.6,0.05,0.01,0.9) } }),
  };

  const currentItem = exploreItems[currentIndex];

  return (
    <section ref={sectionRef} className="py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <motion.div initial="hidden" animate={isVisible ? "visible" : "hidden"} variants={containerVariants}>
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <motion.h1 variants={titleVariants} className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 md:mb-8">
              Explore UMKM Sekitarmu
            </motion.h1>
            <motion.div variants={searchVariants} className="max-w-2xl mx-auto relative">
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

          {/* Slider */}
          <div className="relative">
            <div className="relative min-h-[600px] lg:min-h-[750px]">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={handleDragEnd}
                  className="absolute inset-0"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 h-full">
                    {/* Vendor Card */}
                    <motion.div whileHover={{ y: -8 }} transition={{ duration: 0.3 }} className="relative rounded-3xl overflow-hidden shadow-lg group cursor-pointer">
                      <Image src={currentItem.vendorImage} alt={currentItem.vendorName} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                       <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
                          <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">{currentItem.vendorName}</h2>
                          <p className="text-white/90 mb-6 line-clamp-3 text-base md:text-lg">{currentItem.vendorDescription}</p>
                            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} className="bg-white text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-orange-50 transition-colors shadow-lg">
                              Lihat Detail
                            </motion.button>
                        </div>
                    </motion.div>

                    {/* Right Column (hidden on mobile) */}
                    <div className="hidden lg:flex flex-col gap-6">
                      <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.3 }} className="bg-white rounded-3xl shadow-lg p-6 md:p-8 flex items-start gap-4 border border-gray-100">
                        <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden shrink-0 border-2 border-orange-200">
                          <Image src={currentItem.reviewAvatar} alt="User avatar" fill className="object-cover" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-3">
                            <Star className="w-5 h-5 fill-orange-400 text-orange-400" />
                            <span className="font-bold text-gray-900 text-lg">{currentItem.reviewRating}</span>
                          </div>
                          <p className="text-gray-700 leading-relaxed text-sm md:text-base">&quot;{currentItem.reviewText}&quot;</p>
                        </div>
                      </motion.div>
                      <motion.div whileHover={{ y: -8 }} transition={{ duration: 0.3 }} className="relative rounded-3xl overflow-hidden shadow-lg flex-1 min-h-[400px] group cursor-pointer">
                        <Image src={currentItem.productImage} alt={currentItem.productName} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
                          <h3 className="text-2xl md:text-3xl font-bold mb-2">{currentItem.productName}</h3>
                          <p className="text-white/90 text-sm md:text-base">{currentItem.productDescription}</p>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Dot Indicators */}
            <div className="flex items-center justify-center gap-2 mt-8">
              {exploreItems.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => goToSlide(index)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className={`h-2 rounded-full transition-all duration-300 ${index === currentIndex ? "w-12 bg-orange-500" : "w-2 bg-gray-300 hover:bg-gray-400"}`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExploreSection;
