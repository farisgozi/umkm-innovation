import AboutSection from "./components/sections/AboutSection";
import CategorySection from "./components/sections/CategorySection";
import CeritaSection from "./components/sections/CeritaSection";
import ExploreSection from "./components/sections/ExploreSection";
import HeroSection from "./components/sections/HeroSection";
import OpenStreetMapSection from "./components/sections/OpenStreetMap";
import TestimoniSection from "./components/sections/TestimoniSection";

export default function Home() {
  return (
    <>
    <HeroSection/>
    <CategorySection/>
    <ExploreSection/>
    <OpenStreetMapSection/>
    <CeritaSection/>
    <TestimoniSection/>
    <AboutSection/>
    </>
  );
}
