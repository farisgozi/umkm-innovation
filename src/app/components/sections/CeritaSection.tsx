import React from 'react';
import Image from 'next/image';

const CeritaSection = () => {
  return (
    <section className="relative w-full min-h-screen py-20 px-4 md:px-8 lg:px-16 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/images/umkm/cerita.jpg"
          alt="Street food background"
          fill
          className="object-cover"
          priority
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Main Heading */}
        <h2 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-8 md:mb-12 leading-tight">
          Lorem ipsum dolor
          <br />
          sit amet consectetur
        </h2>

        {/* Description Text */}
        <div className="max-w-4xl">
          <p className="text-white text-base md:text-lg lg:text-xl leading-relaxed">
            Lorem ipsum dolor sit amet consectetur. Pellentesque et semper adipiscing fringilla nulla amet enim in. Quis ut consectetur feugiat nunc ipsum. Libero nisi condimentum rutrum adipiscing. Porttitor hendrerit congue non arcu. Montes dui arcu sed vitae amet. Mauris volutpat at massa nascetur tellus aenean. Elementum aliquam cursus tellus cras. Ultricies habitant ac consectetur turpis eu libero tristique a massa. Erat nullam faucibus sed sed. Proin nibh commodo auctor laoreet. Viverra vel tempor interdum tempor amet ut nibh.
          </p>
        </div>
      </div>

      {/* Optional: Decorative Element */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-black/40 to-transparent z-5" />
    </section>
  );
};

export default CeritaSection;