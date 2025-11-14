'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Search, Star } from 'lucide-react';
import Image from 'next/image';
import useGsapSection from '@/app/motion/hooks/useGsapSection';

interface ExploreItem {
  id: number;
  umkmId: string;
  vendorName: string;
  vendorDescription: string;
  vendorImage: string;
  reviewName: string;
  reviewAvatar: string;
  reviewRating: number;
  reviewText: string;
  productName: string;
  productDescription: string;
  productImage: string;
}

  const exploreItems: ExploreItem[] = [
    {
      id: 1,
      umkmId: '7', // Menghubungkan ke Baram Cafe
      vendorName: 'BARAM CAFE',
      vendorDescription: 'Cafe modern dengan berbagai pilihan kopi specialty dan suasana yang nyaman untuk bekerja atau bersantai.',
      vendorImage: '/assets/images/umkm/baram-cafe.webp',
      reviewName: 'Sari',
      reviewAvatar: '/assets/images/avatar/female1.png',
      reviewRating: 4.6,
      reviewText: 'Tempatnya cozy banget! Kopinya enak, wifi kencang, cocok buat kerja atau hangout bareng teman.',
      productName: 'Specialty Coffee',
      productDescription: 'Kopi premium dengan berbagai metode brewing dan suasana yang Instagram-worthy.',
      productImage: '/assets/images/umkm/baram-cafe.webp'
    },
    {
      id: 2,
      umkmId: '1', // Menghubungkan ke Bakmi Roxy Cikini
      vendorName: 'BAKMI ROXY CIKINI',
      vendorDescription: 'Bakmi legendaris dengan cita rasa autentik dan porsi melimpah. Sudah berdiri sejak tahun 1980 dan menjadi favorit warga Jakarta Pusat.',
      vendorImage: '/assets/images/umkm/Bakmi.webp',
      reviewName: 'Ahmad',
      reviewAvatar: '/assets/images/avatar/male1.png',
      reviewRating: 4.5,
      reviewText: 'Bakmi paling enak di Jakarta! Cita rasa autentik dan porsi yang melimpah. Sudah langganan dari dulu!',
      productName: 'Bakmi Ayam Special',
      productDescription: 'Mie dengan topping ayam, pangsit, dan sayuran segar. Kuah kaldu yang kaya rasa.',
      productImage: '/assets/images/umkm/cerita.jpg'
    },
    {
      id: 3,
      umkmId: '8', // Menghubungkan ke Ayam Geprek 77
      vendorName: 'AYAM GEPREK 77',
      vendorDescription: 'Ayam geprek crispy dengan berbagai level kepedasan dan topping menarik.',
      vendorImage: '/assets/images/umkm/ayam_geprek_77.webp',
      reviewName: 'Maya',
      reviewAvatar: '/assets/images/avatar/female2.png',
      reviewRating: 4.3,
      reviewText: 'Ayam gepreknya crispy banget! Level pedasnya bisa request, cocok buat yang suka makanan pedas.',
      productName: 'Ayam Geprek Crispy',
      productDescription: 'Ayam geprek dengan tepung crispy dan sambal dengan level kepedasan pilihan.',
      productImage: '/assets/images/umkm/produk.webp'
    },
    {
      id: 4,
      umkmId: '10', // Menghubungkan ke Turkish Kebab & Pizza
      vendorName: 'TURKISH KEBAB & PIZZA',
      vendorDescription: 'Restoran Turki autentik dengan kebab dan pizza yang lezat. Halal dan fresh ingredients.',
      vendorImage: '/assets/images/umkm/produk.webp',
      reviewName: 'Budi',
      reviewAvatar: '/assets/images/avatar/male2.png',
      reviewRating: 4.4,
      reviewText: 'Kebabnya authentic banget! Pizza juga enak, bahan-bahannya seger dan halal. Recommended!',
      productName: 'Turkish Kebab',
      productDescription: 'Kebab daging authentic dengan sayuran segar dan saus special dari Turki.',
      productImage: '/assets/images/umkm/cerita.jpg'
    }
  ];

const ExploreSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  // === Auto-play untuk desktop/tablet ===
  useEffect(() => {
    const isDesktop = window.innerWidth >= 768; 
    if (!isDesktop) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % exploreItems.length);
    }, 5000); // 5 detik per slide

    return () => clearInterval(interval);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % exploreItems.length);
  }, []);
  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + exploreItems.length) % exploreItems.length);
  }, []);
  const goToSlide = useCallback((index: number) => setCurrentIndex(index), []);

  // === swipe mobile ===
  useEffect(() => {
    if (!sliderRef.current) return;
    let startX: number | null = null;

    const handleTouchStart = (e: TouchEvent) => {
      if (window.innerWidth >= 1024) return; 
      startX = e.touches[0].clientX;
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (!startX) return;
      e.preventDefault();
      const diff = e.touches[0].clientX - startX;
      if (Math.abs(diff) > 100) {
        if (diff > 0) prevSlide();
        else nextSlide();
        startX = null;
      }
    };
    const handleTouchEnd = () => { startX = null; };

    const el = sliderRef.current;
    el.addEventListener('touchstart', handleTouchStart);
    el.addEventListener('touchmove', handleTouchMove);
    el.addEventListener('touchend', handleTouchEnd);
    el.style.cursor = 'grab';

    return () => {
      el.removeEventListener('touchstart', handleTouchStart);
      el.removeEventListener('touchmove', handleTouchMove);
      el.removeEventListener('touchend', handleTouchEnd);
    };
  }, [nextSlide, prevSlide]);

  const currentItem = exploreItems[currentIndex];

  // === GSAP Section + Parallax ===
  const sectionRef = useGsapSection({
    start: 'top 80%',
    end: '10% top',
    scrub: 0.5,
    timeline: (tl: gsap.core.Timeline) => {
      tl.from('.explore-header', { opacity: 0, y: 50, duration: 0.8, stagger: 0.1 });
      tl.from('.explore-slide', { opacity: 0, y: 30, duration: 0.8, stagger: 0.2 }, '-=0.4');
    },
  });

  return (
    <section ref={sectionRef} className="py-16 md:py-20 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16 explore-header">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 md:mb-8">
            Explore UMKM Sekitarmu
          </h1>
          <div className="max-w-2xl mx-auto relative">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 transition-colors group-focus-within:text-orange-500" />
              <input
                type="text"
                placeholder="Search makanan, minuman, atau jasa"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-full border-2 border-gray-300 focus:border-[#FF885B] focus:outline-none text-gray-700 placeholder-gray-400 transition-all duration-300 focus:scale-[1.02]"
              />
            </div>
          </div>
        </div>

        {/* Slider */}
        <div className="relative">
          <div className="relative min-h-[600px] lg:min-h-[750px] explore-slide">
            <div ref={sliderRef} className="absolute inset-0 select-none touch-pan-y">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 h-full">
                {/* Vendor Card */}
                <div className="relative rounded-3xl overflow-hidden shadow-lg group cursor-pointer transition-all duration-300 hover:-translate-y-2 parallax-vendor">
                  <Image src={currentItem.vendorImage} alt={currentItem.vendorName} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">{currentItem.vendorName}</h2>
                    <p className="text-white/90 mb-6 line-clamp-3 text-base md:text-lg">{currentItem.vendorDescription}</p>
                    <button className="bg-white text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-orange-50 transition-colors shadow-lg active:scale-[0.98] hover:scale-[1.02]">
                      Lihat Detail
                    </button>
                  </div>
                </div>

                {/* Right Column (desktop only) */}
                <div className="hidden lg:flex flex-col gap-6">
                  <div className="bg-white rounded-3xl shadow-lg p-6 md:p-8 flex items-start gap-4 border border-gray-100 transition-all duration-300 hover:-translate-y-1">
                    <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden shrink-0 border-2 border-orange-200">
                      <Image src={currentItem.reviewAvatar} alt="User avatar" fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                         <h3 className="text-2xl font-bold text-[#2E2E2E]">
                          {currentItem.reviewName}
                        </h3>
                        <Star className="w-5 h-5 fill-orange-400 text-orange-400" />
                        <span className="font-bold text-gray-900 text-lg">{currentItem.reviewRating}</span>
                      </div>
                      <p className="text-gray-700 leading-relaxed text-sm md:text-base">&quot;{currentItem.reviewText}&quot;</p>
                    </div>
                  </div>
                  <div className="relative rounded-3xl overflow-hidden shadow-lg flex-1 min-h-[400px] group cursor-pointer transition-all duration-300 hover:-translate-y-2 parallax-product">
                    <Image src={currentItem.productImage} alt={currentItem.productName} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
                      <h3 className="text-2xl md:text-3xl font-bold mb-2">{currentItem.productName}</h3>
                      <p className="text-white/90 text-sm md:text-base">{currentItem.productDescription}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Dot Indicators */}
          <div className="flex items-center justify-center gap-2 mt-8 explore-dots">
            {exploreItems.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 transform hover:scale-125 active:scale-90 ${index === currentIndex ? "w-12 bg-orange-500" : "w-2 bg-gray-300 hover:bg-gray-400"}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExploreSection;