"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Menu, X, ArrowLeft, MapPin, Star, TrendingUp } from "lucide-react";
import { useLenis } from "lenis/react";
import { umkmDummy } from "@/app/data/umkmDummy";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
   const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  const lenis = useLenis();
  const isHomePage = pathname === '/' || pathname === '/#beranda';
  const isDetailPage = pathname?.startsWith('/umkm/') && pathname !== '/umkm';

  const filteredUMKM = searchQuery.trim()
    ? umkmDummy.filter(umkm => 
        umkm.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        umkm.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        umkm.address.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];
  
  const popularSearches = ["Kedai Kopi", "Makanan", "Fashion", "Minuman"];

  // Scroll listener via Lenis
  useEffect(() => {
    if (!lenis) return;
    const handleScroll = () => setScrolled(lenis.scroll > 60);
    lenis.on("scroll", handleScroll);
    return () => lenis.off("scroll", handleScroll);
  }, [lenis]);

  // Close menu/search on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        setIsSearchOpen(false);
      }
    };

    if (isOpen || isSearchOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, isSearchOpen]);

  const navItems = [
    { name: "Beranda", href: "/#beranda" },
    { name: "Kategori", href: "/#kategori" },
    { name: "Eksplor", href: "/#eksplor" },
    { name: "Cerita", href: "/#cerita" },
    { name: "Tentang Kami", href: "#tentang" },
  ];

   const handleBack = () => {
    router.push('/');
    if (lenis) {
      setTimeout(() => {
        lenis.scrollTo(0, { duration: 1, easing: (t: number) => t });
      }, 100);
    }
  };

  const handleSearchClick = (umkmId: string) => {
    setIsSearchOpen(false);
    setSearchQuery("");
    router.push(`/umkm/${umkmId}`);
  };

  const handlePopularSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <>
      <motion.header
        initial={{ y: -120, opacity: 0 }}
        animate={{ y: scrolled ? -5 : 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] }}
        className={`fixed top-0 w-full z-50 transition-colors duration-500 ${
          scrolled 
            ? "backdrop-blur-xl bg-[#FFF8F3]/70 shadow-md" 
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <AnimatePresence mode="wait">
              {isDetailPage ? (
                <motion.button
                  key="back-button"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, ease: [0.6, 0.05, 0.01, 0.9] }}
                  onClick={handleBack}
                  className={`flex items-center gap-2 group z-50 px-4 py-2 rounded-full transition-all duration-300 ${
                    scrolled 
                    ? "bg-none"
                    : "bg-[#FFF8F3]"
                  }`}
                >
                  <motion.div
                    whileHover={{ x: -4 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <ArrowLeft 
                      className="w-6 h-6 text-[#2E2E2E]"
                      strokeWidth={2.5}
                    />
                  </motion.div>
                  <span className="font-bold text-lg hidden sm:inline-block text-[#2E2E2E]">
                    Kembali
                  </span>
                </motion.button>
              ) : (
                <Link href="/" className="flex items-center group z-50">
                  <motion.div
                      transition={{ duration: 0.4, ease: [0.6, 0.05, 0.01, 0.9] }}
                    className="relative w-14 h-14 md:w-16 md:h-16"
                  >
                    <Image
                      src="/assets/images/Logo.png"
                      alt="UMKM Kita Logo"
                      fill
                      className="object-contain"
                      priority
                    />
                  </motion.div>
                </Link>
              )}
            </AnimatePresence>

            {/* Desktop Navigation */}
            <AnimatePresence>
              {isHomePage && ( 
                <motion.nav 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease: [0.6, 0.05, 0.01, 0.9] }}
                  className={`hidden lg:flex transform -translate-x-1/2 items-center gap-8 xl:gap-12 text-base xl:text-lg font-bold font-display transition-colors duration-300 ${
                    scrolled ? "text-[#2E2E2E]" : "text-white"
                  }`}
                >
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        duration: 0.4, 
                        delay: index * 0.05,
                        ease: [0.6, 0.05, 0.01, 0.9]
                      }}
                    >
                      <Link
                        key={item.name}
                        href={item.href}
                        className="relative group py-2"
                      >
                        <span className={`relative z-10 transition-colors duration-300 ${
                          scrolled 
                            ? "group-hover:text-[#FF885B]" 
                            : "group-hover:text-[#FF9E6B]"
                        }`}>
                          {item.name}
                        </span>
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FF885B] transition-all duration-300 group-hover:w-full" />
                      </Link>
                    </motion.div>
                  ))}
                </motion.nav>
              )}
            </AnimatePresence>
             
            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <AnimatePresence>
                {!isDetailPage && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className={`relative rounded-full overflow-hidden ${
                      scrolled 
                        ? "bg-white shadow-md" 
                        : "bg-white/20 backdrop-blur-sm border border-white/30"
                    }`}
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsSearchOpen(true)}
                      className="p-3 md:p-4"
                      aria-label="Search"
                    >
                      <Search className={`w-5 h-5 md:w-6 md:h-6 ${scrolled ? "text-[#2E2E2E]" : "text-white"}`} />
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Mobile Menu Button */}
              <AnimatePresence>
                {!isDetailPage && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
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
                      <X className={`w-5 h-5 md:w-6 md:h-6 ${scrolled ? "text-[#2E2E2E]" : "text-white"}`} />
                    ) : (
                      <Menu className={`w-5 h-5 md:w-6 md:h-6 ${scrolled ? "text-[#2E2E2E]" : "text-white"}`} />
                    )}
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm lg:hidden"
                style={{ top: '80px' }}
              />

              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className={`lg:hidden bg-white/95 backdrop-blur-xl shadow-2xl `}
              >
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                  <motion.nav
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={{
                      hidden: {},
                      visible: { transition: { staggerChildren: 0.05 } }
                    }}
                    className="flex flex-col py-6 gap-2"
                  >
                    {navItems.map(item => (
                      <motion.div
                        key={item.name}
                        variants={{ hidden: { opacity: 0, y: -10 }, visible: { opacity: 1, y: 0 } }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className="px-4 py-3 text-[#2E2E2E] font-semibold text-lg rounded-xl hover:bg-[#FF9E6B]/10 hover:text-[#FF885B] transition-all duration-200"
                        >
                          {item.name}
                        </Link>
                      </motion.div>
                    ))}

                    {/* Mobile CTA */}
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      className="mt-4 px-6 py-3 text-base font-bold bg-gradient-to-r from-[#FF885B] to-[#FF9E6B] text-[#2E2E2E] rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
                      onClick={() => setIsOpen(false)}
                    >
                      Mulai Jelajah
                    </motion.button>
                  </motion.nav>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.header>
      
     

      <AnimatePresence>
        {isSearchOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => {
                setIsSearchOpen(false);
                setSearchQuery("");
              }}
              className="fixed inset-0 bg-black/70 backdrop-blur-md z-[60]"
              style={{ top: 0 }}
            />

            {/* Modal Content */}
             <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl max-h-[85vh] overflow-hidden"
              >
                {/* Search Header */}
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center gap-4">
                    <div className="flex-1 flex items-center gap-3 bg-gray-100 rounded-2xl px-4 py-3">
                      <Search className="w-5 h-5 text-gray-400" strokeWidth={2} />
                      <input
                        type="text"
                        placeholder="Cari UMKM, kategori, atau lokasi..."
                        autoFocus
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex-1 bg-transparent outline-none text-gray-900 placeholder:text-gray-500 font-medium"
                      />
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setIsSearchOpen(false);
                        setSearchQuery("");
                      }}
                      className="p-3 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <X className="w-5 h-5 text-gray-600" />
                    </motion.button>
                  </div>
                </div>

                {/* Search Results */}
                <div className="overflow-y-auto max-h-[calc(80vh-120px)]">
                  {searchQuery.trim() === "" ? (
                    // Popular Searches
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <TrendingUp className="w-5 h-5 text-orange-500" />
                        <h3 className="text-lg font-bold text-gray-900">Pencarian Populer</h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {popularSearches.map((term) => (
                          <motion.button
                            key={term}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handlePopularSearch(term)}
                            className="px-4 py-2 bg-orange-50 text-orange-600 rounded-full font-semibold text-sm hover:bg-orange-100 transition-colors"
                          >
                            {term}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  ) : filteredUMKM.length > 0 ? (
                    // Search Results
                    <div className="p-4">
                      <p className="text-sm text-gray-500 mb-4 px-2">
                        Ditemukan {filteredUMKM.length} hasil untuk <span className="font-semibold text-gray-900">{searchQuery}</span>
                      </p>
                      <div className="space-y-2">
                        {filteredUMKM.map((umkm, index) => (
                          <motion.button
                            key={umkm.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleSearchClick(umkm.id)}
                            className="w-full flex items-center gap-4 p-4 hover:bg-orange-50 rounded-2xl transition-all duration-200 text-left group"
                          >
                            {/* Image */}
                            <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-gray-200">
                              {umkm.gallery?.[0] && (
                                <Image
                                  src={umkm.gallery[0]}
                                  alt={umkm.name}
                                  fill
                                  className="object-cover"
                                />
                              )}
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                              <h4 className="font-bold text-gray-900 mb-1 group-hover:text-orange-600 transition-colors truncate">
                                {umkm.name}
                              </h4>
                              <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                                <span className="px-2 py-0.5 bg-orange-100 text-orange-600 rounded-full text-xs font-semibold">
                                  {umkm.category}
                                </span>
                                <div className="flex items-center gap-1">
                                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                  <span className="font-semibold text-gray-700">{umkm.rating?.toFixed(1)}</span>
                                </div>
                              </div>
                              <div className="flex items-start gap-1 text-xs text-gray-500">
                                <MapPin className="w-3 h-3 mt-0.5 flex-shrink-0" />
                                <span className="line-clamp-1">{umkm.address}</span>
                              </div>
                            </div>

                            {/* Arrow */}
                            <motion.div
                              initial={{ x: 0 }}
                              whileHover={{ x: 4 }}
                              className="text-gray-400 group-hover:text-orange-500"
                            >
                              <ArrowLeft className="w-5 h-5 rotate-180" />
                            </motion.div>
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    // No Results
                    <div className="p-12 text-center">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Search className="w-8 h-8 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">Tidak ada hasil</h3>
                      <p className="text-gray-500">
                        Tidak ditemukan UMKM dengan kata kunci<span className="font-semibold">{searchQuery}</span>
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}