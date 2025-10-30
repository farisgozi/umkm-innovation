'use client';

import React, { useState } from 'react';
import Image from 'next/image';

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

const CategoryCarousel = () => {
  const [activeCategory, setActiveCategory] = useState(1);

  const categories: Category[] = [
    {
      id: 1,
      name: 'Minuman',
      illustration: '/assets/images/illustrations/drink.png',
    },
    {
      id: 2,
      name: 'Makanan',
      illustration: '/assets/images/illustrations/Sesame-bun.png',
    },
    {
      id: 3,
      name: 'Jasa',
      illustration: '/assets/images/illustrations/t-shirt.png',
    }
  ];

  const foodItems: FoodItem[] = [
    {
      id: 1,
      name: 'Sate Bakar',
      preview: '/assets/images/illustrations/seafood.jpg'
    },
    {
      id: 2,
      name: 'Es Cendol',
      preview: '/assets/images/illustrations/es-cendol.jpeg'
    },
    {
      id: 3,
      name: 'Lumpia Goreng',
      preview: '/assets/images/illustrations/pempek-pempek.jpeg'
    }
  ];

  const getPrevIndex = () => (activeCategory - 1 + categories.length) % categories.length;
  const getNextIndex = () => (activeCategory + 1) % categories.length;

  return (
    <section className="py-12 md:py-16 ">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Left: Carousel Section */}
          <div className="relative flex flex-col">
            <div className="border-4 border-gray-400 rounded-[48px] lg:rounded-[72px] p-6 lg:p-8 bg-white shadow-lg">
              <h2 className="text-2xl md:text-3xl lg:text-4xl text-center font-bold text-gray-900 mb-8 lg:mb-12">
                Pilih Kategori Favoritmu
              </h2>

              {/* Category Carousel */}
              <div className="relative flex flex-col items-center justify-center mb-8">
                <div className="flex items-center justify-center gap-3 md:gap-4 lg:gap-6">
                  {/* Previous Category */}
                  <button
                    onClick={() => setActiveCategory(getPrevIndex())}
                    aria-label="Previous category"
                    className="transform hover:scale-105 transition-transform duration-300 opacity-50 hover:opacity-75"
                  >
                    <div className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 flex items-center justify-center">
                      <Image
                        src={categories[getPrevIndex()].illustration}
                        alt={categories[getPrevIndex()].name}
                        width={160}
                        height={160}
                        className="object-contain"
                        priority
                      />
                    </div>
                  </button>

                  {/* Active Category - Center with Orange Background */}
                  <div className="bg-[#FF885B] rounded-4xl lg:rounded-[52px] p-6 lg:p-8 w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 flex flex-col items-center justify-center shadow-2xl transform hover:scale-105 transition-transform duration-300">
                    <div className="w-full h-full flex flex-col items-center justify-center">
                      <Image
                        src={categories[activeCategory].illustration}
                        alt={categories[activeCategory].name}
                        width={220}
                        height={220}
                        className="object-contain mb-2 lg:mb-4"
                        priority
                      />
                      <h4 className="text-lg md:text-xl lg:text-2xl font-bold text-white">
                        {categories[activeCategory].name}
                      </h4>
                    </div>
                  </div>

                  {/* Next Category */}
                  <button
                    onClick={() => setActiveCategory(getNextIndex())}
                    aria-label="Next category"
                    className="transform hover:scale-105 transition-transform duration-300 opacity-50 hover:opacity-75"
                  >
                    <div className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 flex items-center justify-center">
                      <Image
                        src={categories[getNextIndex()].illustration}
                        alt={categories[getNextIndex()].name}
                        width={160}
                        height={160}
                        className="object-contain"
                        priority
                      />
                    </div>
                  </button>
                </div>

                {/* Pagination Dots */}
                <div className="flex justify-center gap-2 mt-6 lg:mt-8">
                  {categories.map((category, index) => (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(index)}
                      className={`transition-all duration-300 rounded-full ${
                        index === activeCategory
                          ? 'w-8 h-3 bg-[#FF885B]'
                          : 'w-3 h-3 bg-gray-400 hover:bg-gray-500'
                      }`}
                      aria-label={`Go to ${category.name}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Food Preview Grid Below Carousel */}
            <div className="relative grid grid-cols-3 gap-3 md:gap-4 mt-6 lg:mt-8 overflow-hi">
                {/* Card Item  */}
                <div className="relative aspect-square rounded-2xl lg:rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group">
                    <Image
                    src={foodItems[0].preview}
                    alt={foodItems[0].name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                </div>

                {/* Card Item  */}
                <div className="relative aspect-square rounded-2xl lg:rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group">
                    <Image
                    src={foodItems[1].preview}
                    alt={foodItems[1].name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                {/* Footer Label - Hidden by default, slides up on hover */}
                    <div className="absolute bottom-0 left-0 right-0 bg-[#FFC896] translate-y-full group-hover:translate-y-0 transition-transform duration-300 py-4 md:py-5 lg:py-6 rounded-b-2xl lg:rounded-b-3xl">
                        <h3 className="text-gray-900 font-bold text-base md:text-lg lg:text-xl text-center px-4">
                            Lihat Detail
                        </h3>
                    </div>
                </div>

                {/* Card Item */}
                <div className="relative aspect-square rounded-2xl lg:rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group">
                    <Image
                    src={foodItems[2].preview}
                    alt={foodItems[2].name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                </div>
            </div>
          </div>

          {/* Right: Hero Image */}
          <div className="relative h-[500px] md:h-[600px] lg:h-[800px] rounded-3xl lg:rounded-[40px] overflow-hidden shadow-2xl group">
            <Image
              src="/assets/images/illustrations/sate.jpg"
              alt="UMKM Showcase - Sate Bakar"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/50 via-black/20 to-transparent" />
            
            {/* Optional overlay text */}
            <div className="absolute bottom-6 left-6 text-white">
              <p className="text-xs md:text-sm font-semibold mb-1 opacity-90">Featured</p>
              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold drop-shadow-lg">
                Sate Bakar Khas Nusantara
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryCarousel;