'use client';

import { JSX, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Store, UtensilsCrossed, Shirt, Search } from 'lucide-react';

interface MapFiltersProps {
  categories: string[];
  onFilter: (category: string) => void;
  onSearch: (query: string) => void;
  activeCategory: string;
}

interface FilterOption {
  label: string;
  icon: JSX.Element;
}

export function MapFilters({ onFilter, onSearch, activeCategory }: MapFiltersProps) {
  const filters: FilterOption[] = [
    { label: 'All', icon: <Store className="w-4 h-4" /> },
    { label: 'Kuliner', icon: <UtensilsCrossed className="w-4 h-4" /> },
    { label: 'Fashion', icon: <Shirt className="w-4 h-4" /> },
  ];

  const [open, setOpen] = useState(false);

  const handleSelect = (option: FilterOption) => {
    onFilter(option.label);
    setOpen(false);
  };

  return (
    <div className="absolute top-4 sm:top-6 left-1/2 transform -translate-x-1/2 z-30 flex flex-col sm:flex-row items-center gap-3">
      {/* Dropdown */}
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 bg-white shadow-md rounded-full px-4 py-2 hover:shadow-lg transition-shadow duration-200 text-sm font-semibold text-gray-700"
        >
          {filters.find(f => f.label === activeCategory)?.icon}
          {activeCategory}
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              className="absolute top-full mt-2 w-40 bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col"
            >
              {filters.map(f => (
                <button
                  key={f.label}
                  onClick={() => handleSelect(f)}
                  className={`flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 transition-colors duration-200 ${
                    activeCategory === f.label ? 'bg-orange-100 text-orange-600 font-semibold' : ''
                  }`}
                >
                  {f.icon}
                  {f.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Search */}
      <div className="flex items-center gap-1 border border-gray-300 rounded-full px-3 py-1 bg-white shadow-md w-[200px] sm:w-[250px]">
        <Search className="w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => onSearch(e.target.value)}
          className="outline-none text-sm text-gray-700 bg-transparent w-full"
        />
      </div>
    </div>
  );
}
