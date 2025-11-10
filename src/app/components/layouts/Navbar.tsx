"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        setIsSearchOpen(false);
      }
    };
    
    if (isOpen || isSearchOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, isSearchOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] }}
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled 
            ? "backdrop-blur-xl bg-white/70 shadow-md" 
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            
            {/* Logo */}
            <Link href="/" className="flex items-center group z-50">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 3 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="relative w-14 h-14 md:w-16 md:h-16"
              >
                <Image
                  src="/assets/images/logo.png"
                  alt="UMKM Kita Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </motion.div>
            </Link>

            {/* Desktop Navigation - Centered */}
            <nav 
              className={`hidden lg:flex absolute left-1/2 transform -translate-x-1/2 items-center gap-8 xl:gap-12 text-base xl:text-lg font-bold font-display transition-colors duration-300 ${
                scrolled ? "text-gray-800" : "text-white"
              }`}
            >
              {[
                { name: "Beranda", href: "#beranda" },
                { name: "Kategori", href: "#kategori" },
                { name: "Eksplor", href: "#eksplor" },
                { name: "Cerita", href: "#cerita" },
                { name: "Tentang Kami", href: "#tentang" }
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="relative group py-2"
                >
                  <span className={`relative z-10 transition-colors duration-200 ${
                    scrolled 
                      ? "group-hover:text-[#FF885B]" 
                      : "group-hover:text-[#FF9E6B]"
                  }`}>
                    {item.name}
                  </span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FF885B] transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </nav>

            {/* Action Buttons - Right Side */}
            <div className="flex items-center gap-3 z-50">
              
              {/* Search Button - Expandable */}
              <motion.div
                initial={false}
                animate={{ 
                  width: isSearchOpen ? "auto" : "auto",
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className={`relative rounded-full overflow-hidden ${
                  scrolled 
                    ? "bg-white shadow-md" 
                    : "bg-white/20 backdrop-blur-sm border border-white/30"
                }`}
              >
                {isSearchOpen ? (
                  // Expanded Search Input
                  <div className="flex items-center gap-2 px-4 py-3 md:py-4">
                    <Search 
                      className={`w-5 h-5 md:w-6 md:h-6 shrink-0 ${
                        scrolled ? "text-gray-800" : "text-white"
                      }`}
                    />
                    <input
                      type="text"
                      placeholder="Search"
                      autoFocus
                      className={`outline-none bg-transparent min-w-[120px] md:min-w-[200px] font-bold text-base md:text-lg placeholder:font-bold ${
                        scrolled 
                          ? "text-gray-800 placeholder:text-gray-500" 
                          : "text-white placeholder:text-white/70"
                      }`}
                      onBlur={() => setIsSearchOpen(false)}
                    />
                  </div>
                ) : (
                  // Collapsed Search Icon
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsSearchOpen(true)}
                    className="p-3 md:p-4"
                    aria-label="Search"
                  >
                    <Search 
                      className={`w-5 h-5 md:w-6 md:h-6 transition-colors ${
                        scrolled ? "text-gray-800" : "text-white"
                      }`}
                    />
                  </motion.button>
                )}
              </motion.div>

              {/* Mobile Menu Button */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`lg:hidden p-3 md:p-4 rounded-full transition-all duration-300 ${
                  scrolled 
                    ? "bg-white hover:bg-gray-50 shadow-md" 
                    : "bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30"
                }`}
                aria-label="Toggle menu"
              >
                {isOpen ? (
                  <X className={`w-5 h-5 md:w-6 md:h-6 ${scrolled ? "text-gray-800" : "text-white"}`} />
                ) : (
                  <Menu className={`w-5 h-5 md:w-6 md:h-6 ${scrolled ? "text-gray-800" : "text-white"}`} />
                )}
              </motion.button>
            </div>
          </div>


        </div>

        {/* Mobile Menu Drawer */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm lg:hidden"
                style={{ top: '80px' }}
              />

              {/* Menu Content */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="lg:hidden bg-white/95 backdrop-blur-xl shadow-2xl"
              >
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                  <nav className="flex flex-col py-6 gap-2">
                    {[
                      { name: "Beranda", href: "#beranda" },
                      { name: "Kategori", href: "#kategori" },
                      { name: "Eksplor", href: "#eksplor" },
                      { name: "Cerita", href: "#cerita" },
                      { name: "Tentang Kami", href: "#tentang" }
                    ].map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="px-4 py-3 text-gray-800 font-semibold text-lg rounded-xl hover:bg-orange-50 hover:text-[#FF885B] transition-all duration-200"
                      >
                        {item.name}
                      </Link>
                    ))}

                    {/* Mobile CTA */}
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setIsOpen(false)}
                      className="mt-4 px-6 py-3 text-base font-bold bg-linear-to-r from-[#FF885B] to-[#FF9E6B] text-[#2E2E2E] rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                      Mulai Jelajah
                    </motion.button>
                  </nav>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}