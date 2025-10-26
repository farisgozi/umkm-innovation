"use client";

import React from 'react';
import { cn, colors, borderRadius, spacing } from '@/lib/design-system';

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Search makanan, minuman, atau jasa',
  value,
  onChange,
  className,
}) => {
  return (
    <div 
      className={cn('flex items-center gap-3 border-2 border-neutral-500', className)}
      style={{
        backgroundColor: colors.background.primary,
        borderRadius: borderRadius['2xl'],
        padding: spacing[3],
        borderColor: colors.neutral[500],
      }}
    >
      {/* Search Icon */}
      <div className="flex items-center justify-center p-1">
        <svg 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" 
            stroke={colors.neutral[500]} 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </div>
      
      {/* Input */}
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="flex-1 bg-transparent border-0 outline-none font-dm-sans text-lg"
        style={{
          color: colors.text.primary,
          fontWeight: 600,
        }}
      />
    </div>
  );
};