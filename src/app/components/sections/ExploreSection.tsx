'use client';

import React, { useState } from 'react';
import Image from 'next/image';
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

  return (
    <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Explore UMKM Sekitarmu
                </h1>
                
                {/* Search Bar */}
                <div className="max-w-2xl mx-auto relative">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                    type="text"
                    placeholder="Search makanan, minuman, atau jasa"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-full border-2 border-gray-300 focus:border-[#FFD194] focus:outline-none text-gray-700 placeholder-gray-400"
                    />
                </div>
                </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Card - Vendor/Restaurant */}
                <div className="relative rounded-3xl overflow-hidden shadow-lg group cursor-pointer">
                <div className="relative h-[600px] w-full">
                    <Image
                    src={foodItems[0].image}
                    alt={foodItems[0].name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent" />
                    
                    {/* Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <h2 className="text-5xl font-bold mb-4 leading-tight">
                        {foodItems[0].name}
                    </h2>
                    <p className="text-white/90 mb-6 line-clamp-3">
                        {foodItems[0].description}
                    </p>
                    <button className="bg-white text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                        Lihat Detail
                    </button>
                    </div>
                </div>
                </div>

                {/* Right Column */}
                <div className="flex flex-col gap-6">
                {/* Review Card */}
                <div className="bg-white rounded-3xl shadow-lg p-6 flex items-start gap-4">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0">
                    <Image
                        src={reviews[0].avatar}
                        alt="User avatar"
                        fill
                        className="object-cover"
                    />
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                            <Star className="w-5 h-5 fill-orange-400 text-orange-400" />
                            <span className="font-semibold text-gray-900">
                            {reviews[0].rating}
                            </span>
                        </div>
                        <p className="text-gray-700 leading-relaxed">
                            {reviews[0].text}
                        </p>
                    </div>
                </div>

                    {/* Food Image Card */}
                    <div className="relative rounded-3xl overflow-hidden shadow-lg h-full group cursor-pointer">
                        <Image
                        src="/assets/images/umkm/produk.webp"
                        alt="Ayam Geprek Dish"
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                            <h3 className="text-3xl font-bold mb-2">
                                Ayam Geprek Dada
                            </h3>
                            <p className="text-white/90">
                                Nikmati sensasi pedas dan gurih dari Ayam Geprek Dada yang renyah,
                                disajikan dengan sambal spesial khas kami.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
};

export default ExploreSection;