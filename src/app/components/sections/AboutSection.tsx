import React from 'react';
import Image from 'next/image';

interface InfoCard {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  bgColor: string;
}

const AboutSection = () => {
  const infoCards: InfoCard[] = [
    {
      id: 1,
      title: 'Informasi',
      subtitle: 'Memudahkan akses informasi UMKM lokal',
      image: '/images/info-ilustrasi.svg',
      bgColor: 'bg-orange-200'
    },
    {
      id: 2,
      title: '',
      subtitle: 'Meningkatkan eksposur usaha kecil',
      image: '/images/eksposur-ilustrasi.svg',
      bgColor: 'bg-gray-100'
    },
    {
      id: 3,
      title: 'Kolaborasi',
      subtitle: 'Menghubungkan platform digital dan UMKM lokal',
      image: '/images/kolaborasi-ilustrasi.svg',
      bgColor: 'bg-orange-200'
    },
    {
      id: 4,
      title: 'Promosi',
      subtitle: '',
      image: '',
      bgColor: 'bg-orange-200'
    },
    {
      id: 5,
      title: 'Pemberdayaan',
      subtitle: 'Mendampingi UMKM agar siap bersaing secara digital',
      image: '/images/pemberdayaan-ilustrasi.svg',
      bgColor: 'bg-orange-200'
    }
  ];

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Side - Text Content */}
          <div className="lg:sticky lg:top-24">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
              Kami menjadi wadah digital yang mempertemukan masyarakat dengan UMKM lokal mengangkat potensi daerah menjadi inspirasi nasional.
            </h2>
          </div>

          {/* Right Side - Info Cards Grid */}
          <div className="grid grid-cols-2 gap-4 auto-rows-auto">
            
            {/* Card 1 - Informasi (Large) */}
            <div className={`${infoCards[0].bgColor} rounded-3xl p-6 flex flex-col justify-between col-span-1 row-span-2`}>
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                  {infoCards[0].title}
                </h3>
              </div>
              <div className="mt-4">
                <div className="relative w-full h-48 mb-4">
                  <Image
                    src={infoCards[0].image}
                    alt={infoCards[0].title}
                    fill
                    className="object-contain"
                  />
                </div>
                <p className="text-sm md:text-base text-gray-800 font-medium">
                  {infoCards[0].subtitle}
                </p>
              </div>
            </div>

            {/* Card 2 - Eksposur (Small Top Right) */}
            <div className={`${infoCards[1].bgColor} rounded-3xl p-6 flex flex-col justify-between col-span-1`}>
              <p className="text-sm md:text-base text-gray-800 font-medium mb-3">
                {infoCards[1].subtitle}
              </p>
              <div className="relative w-full h-32">
                <Image
                  src={infoCards[1].image}
                  alt="Eksposur"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* Card 4 - Promosi (Small) */}
            <div className={`${infoCards[3].bgColor} rounded-3xl p-6 flex items-center justify-center col-span-1`}>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 text-center">
                {infoCards[3].title}
              </h3>
            </div>

            {/* Card 3 - Kolaborasi (Wide) */}
            <div className={`${infoCards[2].bgColor} rounded-3xl p-6 flex flex-col justify-between col-span-2`}>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                {infoCards[2].title}
              </h3>
              <div className="flex items-end justify-between gap-4">
                <p className="text-sm md:text-base text-gray-800 font-medium flex-1">
                  {infoCards[2].subtitle}
                </p>
                <div className="relative w-48 h-32 flex-shrink-0">
                  <Image
                    src={infoCards[2].image}
                    alt={infoCards[2].title}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Card 5 - Pemberdayaan (Wide) */}
            <div className={`${infoCards[4].bgColor} rounded-3xl p-6 flex flex-col justify-between col-span-2`}>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                {infoCards[4].title}
              </h3>
              <div className="flex items-end justify-between gap-4">
                <div className="relative w-48 h-32 flex-shrink-0">
                  <Image
                    src={infoCards[4].image}
                    alt={infoCards[4].title}
                    fill
                    className="object-contain"
                  />
                </div>
                <p className="text-sm md:text-base text-gray-800 font-medium flex-1 text-right">
                  {infoCards[4].subtitle}
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;