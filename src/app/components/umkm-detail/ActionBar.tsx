"use client";

import { motion } from "framer-motion";
import { Navigation, MessageCircle } from "lucide-react";

interface ActionBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  hasPhone: boolean;
}

export default function ActionBar({ activeTab, onTabChange, hasPhone }: ActionBarProps) {
  const tabs = [
    { id: "about", label: "Tentang" },
    { id: "gallery", label: "Galeri" },
    { id: "info", label: "Info" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="bg-[#FFF8F3] rounded-2xl sm:rounded-3xl shadow-2xl border border-[#FF9E6B]/10 p-4 sm:p-5 lg:p-6 mb-6 sm:mb-8 sticky top-20 sm:top-4 z-20"
    >
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-between items-stretch sm:items-center">
        {/* Tabs - Full width on mobile, auto on desktop */}
        <div className="flex gap-2 sm:gap-3 pb-2 sm:pb-0 scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`px-4 sm:px-5 lg:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl font-semibold transition-all duration-300 whitespace-nowrap text-sm sm:text-base ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-[#FF9E6B] to-[#FF9E6B]/80 text-[#FFF8F3] shadow-lg scale-105"
                  : "bg-[#FFF2E7] text-[#2E2E2E] hover:bg-[#FF9E6B]/20"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 sm:gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 sm:flex-none px-4 sm:px-5 lg:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-[#FF9E6B] to-[#FF9E6B]/80 text-[#FFF8F3] font-semibold rounded-xl sm:rounded-2xl shadow-lg flex items-center justify-center gap-2 hover:shadow-xl transition-all text-sm sm:text-base"
          >
            <Navigation className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="inline">Navigasi</span>
          </motion.button>

          {hasPhone && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 sm:flex-none px-4 sm:px-5 lg:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-[#FFF8F3] font-semibold rounded-xl sm:rounded-2xl shadow-lg flex items-center justify-center gap-2 hover:shadow-xl hover:from-emerald-600 hover:to-emerald-700 transition-all text-sm sm:text-base"
            >
              <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="inline">WhatsApp</span>
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
}