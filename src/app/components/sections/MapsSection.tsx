import React from 'react';
import Image from 'next/image';

const MapsSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
         <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8">
            Lokasi UMKM Sekitarmu
          </h2>
        {/* Map Container */}
        <div className="w-full h-[500px] md:h-[600px] lg:h-[700px] rounded-3xl overflow-hidden shadow-2xl bg-blue-50 relative">
          {/* Google Maps Icon Placeholder */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-4">
              {/* Google Maps Style Icon */}
             <Image
                src="/assets/images/google-maps.png"
                alt="Google Maps Icon"
                width={100}
                height={100}
                className="mx-auto"
             />
              <p className="text-gray-600 text-lg">
                Peta akan ditampilkan di sini
              </p>
            </div>
          </div>

          {/* Actual Google Maps/Mapbox/Leafleft Embed - Uncomment to use */}
          {/* 

          */}
        </div>
      </div>
    </section>
  );
};

export default MapsSection;