"use client";

import { useEffect, useRef } from "react";
import Link from 'next/link';
import gsap from "gsap";

export default function MotionFooter() {
  const navLinks = [
    { name: 'Beranda', href: '/' },
    { name: 'Kategori', href: '/kategori' },
    { name: 'Explore', href: '/explore' },
    { name: 'Cerita', href: '/cerita' },
    { name: 'Tentang Kami', href: '/tentang-kami' }
  ];

  const waveRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animation
      gsap.to(waveRef.current, {
        y: 20,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        duration: 4,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <footer className="relative overflow-hidden">
      {/* Wavy Top Border */}
      <div className="absolute inset-0 -z-10">
        <svg 
        className='w-full h-full'
        preserveAspectRatio="none"
        viewBox="0 0 1440 590" 
        xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="gradient" x1="0%" y1="50%" x2="100%" y2="50%">
                    <stop offset="5%" stopColor="#ff885b"></stop>
                    <stop offset="95%" stopColor="#ffd194"></stop>
                </linearGradient>
            </defs>
            <path 
            ref={waveRef}
            d="M 0,600 L 0,150 C 120.05741626794256,175.37799043062202 240.1148325358851,200.75598086124404 336,216 C 431.8851674641149,231.24401913875596 503.598086124402,236.35406698564594 584,216 C 664.401913875598,195.64593301435406 753.4928229665071,149.82775119617224 851,121 C 948.5071770334929,92.17224880382776 1054.4306220095693,80.33492822966507 1154,88 C 1253.5693779904307,95.66507177033493 1346.7846889952152,122.83253588516746 1440,150 L 1440,600 L 0,600 Z" stroke="none" stroke-width="0" fill="url(#gradient)" fillOpacity="0.53">
            </path>
            <defs>
                <linearGradient id="gradient" x1="0%" y1="50%" x2="100%" y2="50%">
                    <stop offset="5%" stopColor="#ff885b"></stop>
                    <stop offset="95%" stopColor="#ffd194"></stop>
                </linearGradient>
            </defs>
            <path 
            ref={waveRef}
            d="M 0,600 L 0,350 C 80.32535885167462,342.5933014354067 160.65071770334924,335.1866028708134 253,320 C 345.34928229665076,304.8133971291866 449.72248803827756,281.8468899521531 566,310 C 682.2775119617224,338.1531100478469 810.4593301435407,417.42583732057415 908,414 C 1005.5406698564593,410.57416267942585 1072.4401913875597,324.4497607655502 1156,300 C 1239.5598086124403,275.5502392344498 1339.77990430622,312.7751196172249 1440,350 L 1440,600 L 0,600 Z" stroke="none" stroke-width="0" fill="url(#gradient)" fillOpacity="1"></path>
        </svg>  
      </div>

      {/* Content */}
      <div className="relative pt-24 md:pt-32 pb-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          {/* Title */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-8 md:mb-12 drop-shadow-lg" style={{
            textShadow: '3px 3px 0px rgba(0,0,0,0.2), 1px 1px 0px rgba(0,0,0,0.1)'
          }}>
            Dukung Bisnis Lokal
          </h2>

          {/* Navigation */}
          <nav className="inline-block bg-transparent backdrop-blur-md rounded-full px-6 md:px-8 py-4 shadow-xl">
            <ul className="flex flex-wrap font-display justify-center items-center gap-4 md:gap-8 lg:gap-10">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href}
                    className="text-white font-bold text-sm md:text-base lg:text-lg hover:text-orange-600 transition-colors duration-300 whitespace-nowrap"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Copyright or Additional Info (Optional) */}
          <div className="mt-8 text-white/80 text-sm md:text-base">
            <p>&copy; 2025 UMKM Lokal. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};



