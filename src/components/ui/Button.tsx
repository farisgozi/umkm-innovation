"use client";

import React from 'react';
import { cn, componentVariants } from '@/lib/design-system';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className,
  ...props
}) => {
  const variantStyles = componentVariants.button.variants[variant];
  const sizeStyles = componentVariants.button.sizes[size];

  const baseStyles = 'inline-flex items-center justify-center font-clash-display transition-all duration-200 hover:scale-105 active:scale-95 border-0';

  const buttonStyle = {
    ...variantStyles,
    ...sizeStyles,
  };

  return (
    <button
      className={cn(baseStyles, className)}
      style={buttonStyle}
      {...props}
    >
      {children}
    </button>
  );
};