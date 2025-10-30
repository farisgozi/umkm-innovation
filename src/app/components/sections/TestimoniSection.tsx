import React from 'react';
import Image from 'next/image';
import { Star } from 'lucide-react';

interface Testimonial {
  id: number;
  avatar: string;
  rating: number;
  text: string;
}

const TestimoniSection = () => {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      avatar: '/images/avatar-1.jpg',
      rating: 4.5,
      text: 'Lorem ipsum dolor sit amet consectetur. Pulvinar lectus diam commodo luctus. Id vitae nullam posuere magna ultricies.'
    },
    {
      id: 2,
      avatar: '/images/avatar-2.jpg',
      rating: 4.5,
      text: 'Lorem ipsum dolor sit amet consectetur. Pulvinar lectus diam commodo luctus. Id vitae nullam posuere magna ultricies.'
    },
    {
      id: 3,
      avatar: '/images/avatar-3.jpg',
      rating: 4.5,
      text: 'Lorem ipsum dolor sit amet consectetur. Pulvinar lectus diam commodo luctus. Id vitae nullam posuere magna ultricies.'
    },
    {
      id: 4,
      avatar: '/images/avatar-4.jpg',
      rating: 4.5,
      text: 'Lorem ipsum dolor sit amet consectetur. Pulvinar lectus diam commodo luctus. Id vitae nullam posuere magna ultricies.'
    },
    {
      id: 5,
      avatar: '/images/avatar-5.jpg',
      rating: 4.5,
      text: 'Lorem ipsum dolor sit amet consectetur. Pulvinar lectus diam commodo luctus. Id vitae nullam posuere magna ultricies.'
    }
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-16">
          Apa Kata Mereka?
        </h2>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Row 1 - Left and Center */}
          <div className="flex items-center gap-4">
            <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden flex-shrink-0 border-4 border-white shadow-lg">
              <Image
                src={testimonials[0].avatar}
                alt="User testimonial"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-5 h-5 fill-orange-400 text-orange-400" />
                <span className="font-bold text-xl text-gray-900">
                  {testimonials[0].rating}
                </span>
              </div>
              <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                {testimonials[0].text}
              </p>
            </div>
          </div>

          {/* Row 1 - Right */}
          <div className="flex items-center gap-4">
            <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden flex-shrink-0 border-4 border-white shadow-lg">
              <Image
                src={testimonials[1].avatar}
                alt="User testimonial"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-5 h-5 fill-orange-400 text-orange-400" />
                <span className="font-bold text-xl text-gray-900">
                  {testimonials[1].rating}
                </span>
              </div>
              <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                {testimonials[1].text}
              </p>
            </div>
          </div>
        </div>

        {/* Center Testimonial */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-4 max-w-2xl">
            <div className="relative w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden flex-shrink-0 border-4 border-white shadow-lg">
              <Image
                src={testimonials[2].avatar}
                alt="User testimonial"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-6 h-6 fill-orange-400 text-orange-400" />
                <span className="font-bold text-2xl text-gray-900">
                  {testimonials[2].rating}
                </span>
              </div>
              <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                {testimonials[2].text}
              </p>
            </div>
          </div>
        </div>

        {/* Row 2 - Bottom */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Row 2 - Left */}
          <div className="flex items-center gap-4">
            <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden flex-shrink-0 border-4 border-white shadow-lg">
              <Image
                src={testimonials[3].avatar}
                alt="User testimonial"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-5 h-5 fill-orange-400 text-orange-400" />
                <span className="font-bold text-xl text-gray-900">
                  {testimonials[3].rating}
                </span>
              </div>
              <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                {testimonials[3].text}
              </p>
            </div>
          </div>

          {/* Row 2 - Right */}
          <div className="flex items-center gap-4">
            <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden flex-shrink-0 border-4 border-white shadow-lg">
              <Image
                src={testimonials[4].avatar}
                alt="User testimonial"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-5 h-5 fill-orange-400 text-orange-400" />
                <span className="font-bold text-xl text-gray-900">
                  {testimonials[4].rating}
                </span>
              </div>
              <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                {testimonials[4].text}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimoniSection;