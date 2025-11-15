"use client";

import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getUMKMForPopup, UMKM } from "@/app/data/umkmDummy";
import LoadingSpinner from "@/app/components/layouts/LoadingSpinner";
import UMKMNotFound from "@/app/components/layouts/UMKMNotFound";

// Import modular components
import HeroSection from "@/app/components/umkm-detail/HeroSection";
import ActionBar from "@/app/components/umkm-detail/ActionBar";
import AboutTab from "@/app/components/umkm-detail/AboutTab";
import GalleryTab from "@/app/components/umkm-detail/GalleryTab";
import InfoTab from "@/app/components/umkm-detail/InfoTab";
import Sidebar from "@/app/components/umkm-detail/Sidebar";
import RelatedSection from "@/app/components/umkm-detail/RelatedSection";

gsap.registerPlugin(ScrollTrigger);

export default function UMKMDetailPage() {
  const params = useParams();
  const containerRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const [umkm, setUmkm] = useState<UMKM | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [activeTab, setActiveTab] = useState("about");

  useEffect(() => {
    if (params.id) {
      setTimeout(() => {
        const umkmData = getUMKMForPopup(params.id as string);
         const normalized = umkmData
          ? {
              ...umkmData,
              gallery: Array.isArray(umkmData.gallery)
                ? umkmData.gallery
                : [umkmData.gallery],
            }
          : null;

        setUmkm(normalized);
        setIsLoading(false);
      }, 800);
    }
  }, [params.id]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!umkm) {
    return <UMKMNotFound />;
  }

  return (
    <section ref={containerRef} className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Hero Section */}
      <HeroSection
        umkm={umkm}
        isLiked={isLiked}
        onLikeToggle={() => setIsLiked(!isLiked)}
        heroImageRef={heroImageRef}
      />

      {/* Content Section */}
      <section className="relative -mt-20 pb-20 px-6 z-10">
        <div className="max-w-6xl mx-auto">
          {/* Action Bar */}
          <ActionBar
            activeTab={activeTab}
            onTabChange={setActiveTab}
            hasPhone={!!umkm.phone}
          />

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Main Content Area */}
            <div className="lg:col-span-8">
              {activeTab === "about" && <AboutTab umkm={umkm} />}
              {activeTab === "gallery" && <GalleryTab umkm={umkm} />}
              {activeTab === "info" && <InfoTab umkm={umkm} />}
            </div>

            {/* Sidebar */}
            <Sidebar umkm={umkm} />
          </div>
        </div>
      </section>

      {/* Related UMKM Section */}
      <RelatedSection currentUmkmId={umkm.id} />
    </section>
  );
}