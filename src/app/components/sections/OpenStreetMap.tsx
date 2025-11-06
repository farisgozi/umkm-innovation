'use client';

import React, { useEffect, useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { UMKMLocation } from '../../lib/umkm';
import MapFilters from './MapFilters';
import MapStyleSelector, { MapStyle, mapStyles } from './MapStyleSelector';

// Dynamic import untuk seluruh MapComponent (untuk menghindari SSR issues)
const DynamicMapComponent = dynamic(() => import('./MapComponent'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] md:h-[600px] lg:h-[700px] rounded-3xl overflow-hidden shadow-2xl bg-blue-50 flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto"></div>
        <p className="text-gray-600 text-lg">Memuat peta...</p>
      </div>
    </div>
  )
}) as React.ComponentType<{ 
  filteredUMKM: UMKMLocation[];
  tileUrl?: string;
  attribution?: string;
}>;

// Data contoh UMKM - sama seperti sebelumnya
const sampleUMKMData: UMKMLocation[] = [
  {
    id: '1',
    name: 'Warung Makan Bu Sari',
    address: 'Jl. Merdeka No. 15, Jakarta Pusat',
    lat: -6.2088,
    lng: 106.8456,
    category: 'Kuliner',
    description: 'Warung makan tradisional dengan cita rasa autentik Indonesia',
    phone: '0812-3456-7890',
    email: 'busari@warungmakan.com',
    rating: 4.5,
    openHours: {
      open: '08:00',
      close: '21:00',
      days: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
    },
    socialMedia: {
      instagram: 'https://instagram.com/warungbusari',
      whatsapp: '6281234567890'
    }
  },
  {
    id: '2',
    name: 'Toko Kerajinan Bambu Pak Joko',
    address: 'Jl. Kerajinan No. 8, Jakarta Selatan',
    lat: -6.2297,
    lng: 106.8467,
    category: 'Kerajinan',
    description: 'Produsen kerajinan bambu berkualitas tinggi, mulai dari furniture hingga dekorasi rumah',
    phone: '0813-9876-5432',
    email: 'joko@kerajinanbambu.id',
    rating: 4.8,
    openHours: {
      open: '09:00',
      close: '17:00',
      days: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
    },
    socialMedia: {
      instagram: 'https://instagram.com/kerajinanbambu_joko',
      facebook: 'https://facebook.com/kerajinanbambujoko',
      whatsapp: '6281398765432'
    }
  },
  {
    id: '3',
    name: 'Kedai Kopi Nusantara',
    address: 'Jl. Sudirman No. 22, Jakarta Pusat',
    lat: -6.2146,
    lng: 106.8227,
    category: 'Kuliner',
    description: 'Kedai kopi dengan biji kopi pilihan nusantara, roasting sendiri untuk cita rasa terbaik',
    phone: '0814-5678-9012',
    email: 'hello@kopinusantara.id',
    website: 'https://kopinusantara.id',
    rating: 4.7,
    openHours: {
      open: '07:00',
      close: '22:00',
      days: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu']
    },
    socialMedia: {
      instagram: 'https://instagram.com/kopinusantara',
      facebook: 'https://facebook.com/kedaikopinusantara',
      whatsapp: '6281456789012'
    }
  },
  {
    id: '4',
    name: 'Butik Batik Nusantara',
    address: 'Jl. Thamrin No. 45, Jakarta Pusat',
    lat: -6.1951,
    lng: 106.8230,
    category: 'Fashion',
    description: 'Koleksi batik modern dan tradisional untuk berbagai acara',
    phone: '0821-5555-1234',
    rating: 4.6,
    openHours: {
      open: '10:00',
      close: '20:00',
      days: ['Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu']
    }
  },
  {
    id: '5',
    name: 'Service Laptop Pro',
    address: 'Jl. Gatot Subroto No. 88, Jakarta Selatan',
    lat: -6.2441,
    lng: 106.8291,
    category: 'Teknologi',
    description: 'Jasa service laptop dan komputer dengan teknisi berpengalaman',
    phone: '0877-9999-8888',
    rating: 4.4,
    openHours: {
      open: '09:00',
      close: '18:00',
      days: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
    }
  }
];

const OpenStreetMapSection = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [umkmData, setUmkmData] = useState<UMKMLocation[]>(sampleUMKMData);
  const [isClient, setIsClient] = useState(false);
  const [currentMapStyle, setCurrentMapStyle] = useState<MapStyle>(mapStyles[0]); // Default ke Clean Light

  // Fix untuk SSR
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Filter UMKM berdasarkan kategori dan pencarian
  const filteredUMKM = useMemo(() => {
    return umkmData.filter((umkm) => {
      const matchesCategory = selectedCategory === 'all' || umkm.category === selectedCategory;
      const matchesSearch = searchQuery === '' || 
        umkm.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        umkm.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        umkm.description?.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery, umkmData]);


  // Function to get custom icon based on category
  const getCategoryIcon = (category: string) => {
    const iconMap: { [key: string]: string } = {
      'Kuliner': '🍽️',
      'Fashion': '👗',
      'Kerajinan': '🎨',
      'Elektronik': '📱',
      'Otomotif': '🚗',
      'Kesehatan & Kecantikan': '💄',
      'Pendidikan': '📚',
      'Jasa': '🔧',
      'Teknologi': '💻',
      'Pertanian': '🌾',
      'Lainnya': '🏪'
    };
    return iconMap[category] || '📍';
  };

  if (!isClient) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8">
            Lokasi UMKM Sekitarmu
          </h2>
          <div className="w-full h-[500px] md:h-[600px] lg:h-[700px] rounded-3xl overflow-hidden shadow-2xl bg-blue-50 flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto"></div>
              <p className="text-gray-600 text-lg">Memuat peta...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8">
          Lokasi UMKM Sekitarmu
        </h2>
        
        {/* Filters */}
        <MapFilters
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        
        {/* OpenStreetMap Container */}
        <div className="w-full h-[500px] md:h-[600px] lg:h-[700px] rounded-3xl overflow-hidden shadow-2xl relative">
          <DynamicMapComponent 
            filteredUMKM={filteredUMKM}
            tileUrl={currentMapStyle.url}
            attribution={currentMapStyle.attribution}
          />
          
          {/* Map Controls Overlay */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
            {/* Map Info */}
            <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg">
              <div className="flex items-center space-x-2 text-sm">
                <span className="text-green-600">📍</span>
                <span className="font-medium text-gray-700">
                  {filteredUMKM.length} UMKM ditampilkan
                </span>
              </div>
            </div>
            
            {/* Map Style Selector */}
            <MapStyleSelector
              currentStyle={currentMapStyle.name}
              onStyleChange={setCurrentMapStyle}
            />
          </div>
        </div>

        {/* UMKM List */}
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-900">
              Daftar UMKM ({filteredUMKM.length})
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUMKM.map((umkm) => (
              <div key={umkm.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{getCategoryIcon(umkm.category)}</span>
                    <h3 className="font-bold text-lg text-gray-900">{umkm.name}</h3>
                  </div>
                  {umkm.rating && (
                    <span className="text-yellow-500 text-sm">⭐ {umkm.rating}</span>
                  )}
                </div>
                <p className="text-sm text-blue-600 mb-2">{umkm.category}</p>
                <p className="text-sm text-gray-600 mb-2">📍 {umkm.address}</p>
                {umkm.description && (
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">{umkm.description}</p>
                )}
                <div className="space-y-1 mb-3">
                  {umkm.phone && (
                    <p className="text-sm text-gray-600">📞 {umkm.phone}</p>
                  )}
                  {umkm.openHours && (
                    <p className="text-sm text-gray-600">
                      🕒 {umkm.openHours.open} - {umkm.openHours.close}
                    </p>
                  )}
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => {
                      // Focus pada marker di peta (implementasi bisa ditambahkan)
                      const element = document.querySelector(`[data-lat="${umkm.lat}"][data-lng="${umkm.lng}"]`);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      }
                    }}
                    className="flex-1 px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm font-medium"
                  >
                    Lihat di Peta
                  </button>
                  {umkm.socialMedia?.whatsapp && (
                    <a
                      href={`https://wa.me/${umkm.socialMedia.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors text-sm font-medium"
                    >
                      💬
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
    </section>
  );
};

export default OpenStreetMapSection;
