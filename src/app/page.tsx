"use client";

import HeroSection from "./components/sections/HeroSection";
import CategorySection from "./components/sections/CategorySection";
import ExploreSection from "./components/sections/ExploreSection";
import CeritaSection from "./components/sections/CeritaSection";
import TestimoniSection from "./components/sections/TestimoniSection";
import AboutSection from "./components/sections/AboutSection";
import MapsSection from "./components/sections/MapsSection";

export default function Home() {
  return (
    <div className="relative">

      {/* Cinematic Motion Sections */}
      <HeroSection />
      <CategorySection />
      <ExploreSection />
      <MapsSection />
      <CeritaSection />
      <TestimoniSection />
      <AboutSection />
    </div>
  );
}
