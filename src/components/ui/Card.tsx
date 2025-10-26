"use client";

import React from 'react';
import { cn, colors, borderRadius, spacing } from '@/lib/design-system';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'featured';
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  className,
  style,
  onClick,
}) => {
  const isClickable = !!onClick;

  const baseStyles = 'overflow-hidden';
  const clickableStyles = isClickable ? 'cursor-pointer transition-transform duration-200 hover:scale-105' : '';
  
  const cardStyle = variant === 'featured' ? {
    backgroundColor: colors.primary[100],
    borderRadius: borderRadius['4xl'],
    padding: spacing[6],
    boxShadow: '6px 0px 8px 0px rgba(107, 107, 107, 0.25), -6px 0px 8px 0px rgba(107, 107, 107, 0.25), 0px 6px 8px 0px rgba(107, 107, 107, 0.25), 0px -6px 8px 0px rgba(107, 107, 107, 0.25)',
  } : {
    backgroundColor: colors.background.primary,
    borderRadius: borderRadius['4xl'],
    padding: spacing[6],
  };

  const finalStyle = {
    ...cardStyle,
    ...style,
  };

  return (
    <div
      className={cn(baseStyles, clickableStyles, className)}
      style={finalStyle}
      onClick={onClick}
    >
      {children}
    </div>
  );
};