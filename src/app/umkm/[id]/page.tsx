"use client";

import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { motion, cubicBezier } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "lenis/react";
import Image from "next/image";
import {
  ArrowLeft,
  MapPin,
  Clock,
  Phone,
  Star,
  Instagram,
  Facebook,
  MessageCircle,
  Share2,
  Heart,
  ExternalLink,
} from "lucide-react";
import { umkmDummy, getUMKMForPopup, UMKM } from "@/app/data/umkmDummy";
import UMKMCard from "@/app/components/layouts/UMKMCard";
import LoadingSpinner from "@/app/components/layouts/LoadingSpinner";
import UMKMNotFound from "@/app/components/layouts/UMKMNotFound";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function UMKMDetailPage() {
  const params = useParams();
  const containerRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const [umkm, setUmkm] = useState<UMKM | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    if (params.id) {
      // Simulate loading delay for better UX
      setTimeout(() => {
        const umkmData = getUMKMForPopup(params.id as string);
        setUmkm(umkmData);
        setIsLoading(false);
      }, 800);
    }
  }, [params.id]);

  useEffect(() => {
    if (!heroImageRef.current || !lenis) return;

    const ctx = gsap.context(() => {
      // Parallax effect for hero image
      gsap.to(heroImageRef.current, {
        scale: 1.15,
        yPercent: 20,
        ease: "power1.out",
        scrollTrigger: {
          trigger: heroImageRef.current,
          scroller: document.body,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [lenis, umkm]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        ease: cubicBezier(0.25, 0.1, 0.25, 1),
      },
    }),
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: cubicBezier(0.25, 0.1, 0.25, 1),
      },
    },
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!umkm) {
    return <UMKMNotFound />;
  }

  return (
    <div ref={containerRef} className="relative min-h-screen bg-bg">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <div
          ref={heroImageRef}
          className="absolute inset-0 w-full h-full"
        >
          <Image
            src={umkm.image || '/assets/images/umkm/placeholder.jpg'}
            alt={umkm.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>

        {/* Navigation & Actions */}
        <motion.div
          className="absolute top-6 left-6 right-6 flex justify-between items-center z-10"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          custom={0}
        >
          <Link
            href="/"
            className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 hover:bg-white/30 transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </Link>
          
          <div className="flex gap-3">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`w-12 h-12 backdrop-blur-md rounded-full flex items-center justify-center border transition-all duration-300 ${
                isLiked 
                  ? "bg-red-500/80 border-red-500/50 text-white" 
                  : "bg-white/20 border-white/30 text-white hover:bg-white/30"
              }`}
            >
              <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
            </button>
            <button className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 hover:bg-white/30 transition-all duration-300">
              <Share2 className="w-5 h-5 text-white" />
            </button>
          </div>
        </motion.div>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <motion.div
            className="max-w-4xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            custom={1}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-1 bg-primary/90 backdrop-blur-sm text-white text-sm font-medium rounded-full">
                {umkm.category}
              </span>
              <div className="flex items-center gap-1 text-white">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{umkm.rating}</span>
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-3">
              {umkm.name}
            </h1>
            <div className="flex items-start gap-2 text-white/90">
              <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <p className="text-lg leading-relaxed">{umkm.address}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="relative py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Description */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInUp}
                custom={0}
              >
                <h2 className="text-2xl md:text-3xl font-display font-bold text-text mb-6">
                  Tentang {umkm.name}
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-muted leading-relaxed text-lg">
                    {umkm.description}
                  </p>
                </div>
              </motion.div>

              {/* Gallery */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInUp}
                custom={1}
              >
                <h3 className="text-xl font-display font-semibold text-text mb-6">
                  Galeri
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((item, index) => (
                    <motion.div
                      key={item}
                      variants={scaleIn}
                      custom={index}
                      className="aspect-square rounded-2xl overflow-hidden bg-secondary/20 hover:scale-105 transition-transform duration-300 cursor-pointer"
                    >
                      <Image
                        src={umkm.image || '/assets/images/umkm/placeholder.jpg'}
                        alt={`Gallery ${item}`}
                        width={200}
                        height={200}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Quick Info Card */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={scaleIn}
                className="bg-white rounded-3xl p-6 shadow-lg border border-secondary/20"
              >
                <h3 className="text-xl font-display font-semibold text-text mb-6">
                  Informasi
                </h3>
                
                <div className="space-y-4">
                  {/* Operating Hours */}
                  {umkm.openHours && (
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Clock className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-text">Jam Operasional</p>
                        <p className="text-muted text-sm">
                          {umkm.openHours.open} - {umkm.openHours.close}
                        </p>
                        <p className="text-muted text-sm">
                          {umkm.openHours.days.join(", ")}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Phone */}
                  {umkm.phone && (
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Phone className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-text">Telepon</p>
                        <a
                          href={`tel:${umkm.phone}`}
                          className="text-primary hover:text-primary/80 transition-colors"
                        >
                          {umkm.phone}
                        </a>
                      </div>
                    </div>
                  )}

                  {/* Location */}
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-text">Lokasi</p>
                      <p className="text-muted text-sm leading-relaxed">
                        {umkm.address}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 space-y-3">
                  <button className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-full transition-all duration-300 flex items-center justify-center gap-2">
                    <ExternalLink className="w-5 h-5" />
                    Lihat di Peta
                  </button>
                  
                  {umkm.phone && (
                    <button className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-6 rounded-full transition-all duration-300 flex items-center justify-center gap-2">
                      <MessageCircle className="w-5 h-5" />
                      WhatsApp
                    </button>
                  )}
                </div>
              </motion.div>

              {/* Social Media */}
              {umkm.socialMedia && (
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={fadeInUp}
                  custom={2}
                  className="bg-white rounded-3xl p-6 shadow-lg border border-secondary/20"
                >
                  <h3 className="text-xl font-display font-semibold text-text mb-6">
                    Ikuti Kami
                  </h3>
                  
                  <div className="flex gap-3">
                    {umkm.socialMedia.instagram && (
                      <a
                        href={umkm.socialMedia.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform duration-300"
                      >
                        <Instagram className="w-6 h-6" />
                      </a>
                    )}
                    
                    {umkm.socialMedia.facebook && (
                      <a
                        href={umkm.socialMedia.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform duration-300"
                      >
                        <Facebook className="w-6 h-6" />
                      </a>
                    )}
                    
                    {umkm.socialMedia.whatsapp && (
                      <a
                        href={umkm.socialMedia.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform duration-300"
                      >
                        <MessageCircle className="w-6 h-6" />
                      </a>
                    )}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Related UMKM Section */}
      <section className="relative py-16 px-6 bg-secondary/5">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            custom={0}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-text mb-4">
              UMKM Lainnya
            </h2>
            <p className="text-muted text-lg max-w-2xl mx-auto">
              Jelajahi UMKM lain yang mungkin menarik untuk Anda kunjungi
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {umkmDummy
              .filter(item => item.id !== umkm?.id)
              .slice(0, 3)
              .map((relatedUmkm, index) => (
                <UMKMCard 
                  key={relatedUmkm.id} 
                  umkm={relatedUmkm} 
                  index={index} 
                />
              ))}
          </div>

          <motion.div
            className="text-center mt-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            custom={3}
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-medium py-3 px-8 rounded-full transition-all duration-300 hover:scale-105"
            >
              Lihat Semua UMKM
              <ExternalLink className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
