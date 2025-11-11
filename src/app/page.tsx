"use client";

import AboutSection from "./components/sections/AboutSection";
import CategorySection from "./components/sections/CategorySection";
import CeritaSection from "./components/sections/CeritaSection";
import ExploreSection from "./components/sections/ExploreSection";
import HeroSection from "./components/sections/HeroSection";
import MapsSection from "./components/sections/MapsSection";
import TestimoniSection from "./components/sections/TestimoniSection";

export default function Home() {
  return (
    <>
    <HeroSection/>
    <CategorySection/>
    <ExploreSection/>
    <MapsSection/>
    <CeritaSection/>
    <TestimoniSection/>
    <AboutSection/>
    </>
  );
}
