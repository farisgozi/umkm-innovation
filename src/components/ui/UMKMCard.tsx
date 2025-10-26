"use client";

import React from 'react';
import { Card } from '@/components/ui';
import { colors, spacing, typography, borderRadius } from '@/lib/design-system';

interface UMKMCardProps {
  title: string;
  description: string;
  category?: string;
  rating?: number;
  image?: string;
  variant?: 'default' | 'featured' | 'compact';
  onViewDetail?: () => void;
  className?: string;
}

export const UMKMCard: React.FC<UMKMCardProps> = ({
  title,
  description,
  category = 'Makanan',
  rating = 4.5,
  image,
  variant = 'default',
  onViewDetail,
  className,
}) => {
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#DFB300">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
        </svg>
      );
    }
    
    if (hasHalfStar) {
      stars.push(
        <svg key="half" width="16" height="16" viewBox="0 0 24 24" fill="#F2F2F2" stroke="#DFB300" strokeWidth="2">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
        </svg>
      );
    }
    
    return stars;
  };

  if (variant === 'compact') {
    return (
      <Card variant="default" className={className}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: spacing[3],
        }}>
          <h3 style={{
            fontFamily: typography.fontFamily.heading,
            fontSize: typography.fontSize['7xl'],
            fontWeight: typography.fontWeight.bold,
            color: colors.text.primary,
            margin: 0,
            lineHeight: typography.lineHeight.tight,
          }}>
            {title}
          </h3>
          
          <p style={{
            fontFamily: typography.fontFamily.body,
            fontSize: typography.fontSize['2xl'],
            fontWeight: typography.fontWeight.normal,
            color: colors.text.primary,
            margin: 0,
            lineHeight: typography.lineHeight.normal,
            letterSpacing: typography.letterSpacing.tighter,
          }}>
            {description}
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card variant={variant === 'featured' ? 'featured' : 'default'} className={className}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: spacing[6],
        height: '100%',
      }}>
        {/* Image placeholder */}
        <div style={{
          width: '100%',
          height: '200px',
          backgroundColor: colors.neutral[100],
          borderRadius: borderRadius['3xl'],
          backgroundImage: image ? `url(${image})` : 'linear-gradient(135deg, #FFD194 0%, #FF885B 100%)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Image overlay for better text readability */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            background: 'linear-gradient(transparent, rgba(0,0,0,0.3))',
            height: '50%',
          }} />
        </div>

        {/* Content */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: spacing[4],
          flex: 1,
        }}>
          {/* Title */}
          <h3 style={{
            fontFamily: typography.fontFamily.heading,
            fontSize: typography.fontSize['4xl'],
            fontWeight: typography.fontWeight.bold,
            color: colors.text.primary,
            margin: 0,
            lineHeight: typography.lineHeight.tight,
          }}>
            {title}
          </h3>

          {/* Category and Rating */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: spacing[3],
          }}>
            {/* Category Tag */}
            <div style={{
              backgroundColor: colors.primary[500],
              color: colors.text.inverse,
              padding: `${spacing[1]} ${spacing[4]}`,
              borderRadius: borderRadius['2xl'],
              fontSize: typography.fontSize.xs,
              fontWeight: typography.fontWeight.semibold,
              fontFamily: typography.fontFamily.body,
            }}>
              {category}
            </div>

            {/* Rating */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: spacing[1],
            }}>
              <div style={{ display: 'flex', gap: '2px' }}>
                {renderStars(rating)}
              </div>
              <span style={{
                fontFamily: typography.fontFamily.body,
                fontSize: typography.fontSize.base,
                fontWeight: typography.fontWeight.bold,
                color: colors.text.primary,
                marginLeft: spacing[1],
              }}>
                {rating}
              </span>
            </div>
          </div>

          {/* Description */}
          <p style={{
            fontFamily: typography.fontFamily.body,
            fontSize: typography.fontSize.lg,
            fontWeight: typography.fontWeight.normal,
            color: colors.text.primary,
            margin: 0,
            lineHeight: typography.lineHeight.normal,
            letterSpacing: typography.letterSpacing.tighter,
            flex: 1,
          }}>
            {description}
          </p>

          {/* View Detail Button */}
          {onViewDetail && (
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: 'auto',
            }}>
              <button
                onClick={onViewDetail}
                style={{
                  backgroundColor: colors.primary[100],
                  color: colors.text.primary,
                  border: 'none',
                  borderRadius: borderRadius.xl,
                  padding: `${spacing[2]} ${spacing[5]}`,
                  fontFamily: typography.fontFamily.heading,
                  fontSize: typography.fontSize.xl,
                  fontWeight: typography.fontWeight.bold,
                  letterSpacing: typography.letterSpacing.wide,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: spacing[2],
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.backgroundColor = colors.primary[200];
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.backgroundColor = colors.primary[100];
                }}
              >
                Lihat Detail
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};