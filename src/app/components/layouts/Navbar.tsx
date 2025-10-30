"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "./Container";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled ? "backdrop-blur-md bg-[#FFF8F3]/80 shadow-sm" : "bg-transparent"
      }`}
    >
      <Container className="flex items-center justify-between py-4 ">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/assets/images/logo.png"
            alt="Logo"
            width={90}
            height={90}
            className="object-contain"
            priority
          />
        </Link>

        {/*  Desktop Navigation */}
        <nav className={`hidden md:flex gap-8 text-2xl font-display font-bold ${
          scrolled ? "text-[#2E2E2E]" : "text-[#FFF8F3]"
        }`}>
          <Link href="#beranda" className="hover:text-[#FF885B] transition-colors">
            Beranda
          </Link>
          <Link href="#eksplor" className="hover:text-[#FF885B] transition-colors">
            Eksplor
          </Link>
          <Link href="#cerita" className="hover:text-[#FF885B] transition-colors">
            Cerita
          </Link>
          <Link href="#tentang" className="hover:text-[#FF885B] transition-colors">
            Tentang Kami
          </Link>
        </nav>

        {/*  CTA Button (Desktop) */}
        <div className="hidden md:block">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 text-sm font-medium bg-[#FF885B] text-white rounded-full shadow-md hover:bg-[#FF9E6B] transition"
          >
            Bergabung
          </motion.button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-[#2E2E2E] hover:text-[#FF885B] transition"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </Container>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-[#FFF8F3] shadow-md"
          >
            <div className="flex flex-col items-center py-6 gap-6 text-[#2E2E2E] font-medium">
              <Link
                href="#beranda"
                onClick={() => setIsOpen(false)}
                className="hover:text-[#FF885B] transition-colors"
              >
                Beranda
              </Link>
              <Link
                href="#eksplor"
                onClick={() => setIsOpen(false)}
                className="hover:text-[#FF885B] transition-colors"
              >
                Eksplor
              </Link>
              <Link
                href="#cerita"
                onClick={() => setIsOpen(false)}
                className="hover:text-[#FF885B] transition-colors"
              >
                Cerita
              </Link>
              <Link
                href="#tentang"
                onClick={() => setIsOpen(false)}
                className="hover:text-[#FF885B] transition-colors"
              >
                Tentang Kami
              </Link>

              {/* CTA Button (Mobile) */}
              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={() => setIsOpen(false)}
                className="mt-2 px-6 py-2 text-sm font-semibold bg-[#FF885B] text-white rounded-full shadow hover:bg-[#FF9E6B] transition"
              >
                Bergabung
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
