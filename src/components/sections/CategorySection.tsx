"use client";

import React from 'react';
import { Card } from '@/components/ui';
import { colors, spacing, typography, borderRadius } from '@/lib/design-system';

interface CategorySectionProps {
  className?: string;
}

export const CategorySection: React.FC<CategorySectionProps> = ({ className }) => {
  const categories = [
    { name: 'Minuman', image: '☕', color: colors.primary[100] },
    { name: 'Fashion', image: '👕', color: colors.primary[200] },
    { name: 'Makanan', image: '🍔', color: colors.primary[500] },
  ];

  return (
    <section className={className} style={{
      padding: `${spacing[6]} ${spacing[6]}`,
      minHeight: '1000px',
      display: 'flex',
      flexDirection: 'column',
      gap: spacing[8],
    }}>
      {/* Left Section - Food Images */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: spacing[6],
        minHeight: '400px',
      }}>
        {/* Food Image Gallery */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: spacing[3],
          borderRadius: borderRadius['4xl'],
          padding: spacing[3],
          position: 'relative',
        }}>
          {/* Background food images layout */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: spacing[3],
            width: '100%',
            maxWidth: '600px',
          }}>
            {/* Image placeholders based on Figma */}
            <div style={{
              aspectRatio: '1',
              backgroundColor: colors.primary[100],
              borderRadius: borderRadius['3xl'],
              backgroundImage: 'linear-gradient(135deg, #FF885B 0%, #FFD194 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '9px 9px 4px 0px rgba(0, 0, 0, 0.25)',
            }}>
              <span style={{ fontSize: '3rem' }}>🥘</span>
            </div>
            
            <div style={{
              aspectRatio: '1',
              backgroundColor: colors.primary[200],
              borderRadius: borderRadius['3xl'],
              backgroundImage: 'linear-gradient(135deg, #FFD194 0%, #FF9E6B 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0px 9px 4px 0px rgba(0, 0, 0, 0.25)',
            }}>
              <span style={{ fontSize: '3rem' }}>🍜</span>
            </div>
            
            {/* Featured center item */}
            <div style={{
              aspectRatio: '1',
              backgroundColor: colors.primary[500],
              borderRadius: borderRadius['3xl'],
              backgroundImage: 'linear-gradient(135deg, #FF885B 0%, #FF6F61 100%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '6px 0px 8px 0px rgba(107, 107, 107, 0.25), -6px 0px 8px 0px rgba(107, 107, 107, 0.25), 0px 6px 8px 0px rgba(107, 107, 107, 0.25), 0px -6px 8px 0px rgba(107, 107, 107, 0.25)',
              position: 'relative',
              gridRow: 'span 2',
            }}>
              <span style={{ fontSize: '4rem', marginBottom: spacing[2] }}>🍔</span>
              <span style={{
                fontFamily: typography.fontFamily.body,
                fontSize: typography.fontSize['4xl'],
                fontWeight: typography.fontWeight.bold,
                color: colors.text.primary,
                textAlign: 'center',
              }}>
                Makanan
              </span>
              
              {/* "Lihat Detail" button overlay */}
              <div style={{
                position: 'absolute',
                bottom: spacing[4],
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: colors.primary[100],
                color: colors.text.primary,
                padding: `${spacing[1]} ${spacing[4]}`,
                borderRadius: borderRadius['2xl'],
                fontSize: typography.fontSize['2xl'],
                fontWeight: typography.fontWeight.bold,
                fontFamily: typography.fontFamily.heading,
                letterSpacing: typography.letterSpacing.wide,
                cursor: 'pointer',
              }}>
                Lihat Detail
              </div>
            </div>
          </div>
          
          {/* Pagination dots */}
          <div style={{
            display: 'flex',
            gap: spacing[2],
            marginTop: spacing[4],
          }}>
            <div style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: colors.neutral[500],
            }} />
            <div style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: colors.primary[500],
            }} />
            <div style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: colors.neutral[500],
            }} />
          </div>
        </div>

        {/* Right Section - Category Selection */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: spacing[8],
        }}>
          <Card variant="default" style={{
            backgroundColor: colors.background.primary,
            border: `4px solid ${colors.neutral[500]}`,
            padding: spacing[8],
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: spacing[8],
            minHeight: '500px',
          }}>
            {/* Title */}
            <h2 style={{
              fontFamily: typography.fontFamily.heading,
              fontSize: typography.fontSize['4xl'],
              fontWeight: typography.fontWeight.bold,
              color: colors.text.primary,
              margin: 0,
              textAlign: 'center',
              letterSpacing: typography.letterSpacing.wide,
            }}>
              Pilih Kategori Favoritmu
            </h2>

            {/* Category Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: spacing[4],
              width: '100%',
              maxWidth: '400px',
            }}>
              {categories.map((category, index) => (
                <div
                  key={category.name}
                  style={{
                    aspectRatio: '1',
                    backgroundColor: index === 2 ? category.color : colors.primary[50],
                    borderRadius: borderRadius['3xl'],
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: spacing[2],
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: index === 2 ? '0px 4px 8px rgba(0,0,0,0.15)' : 'none',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    if (index !== 2) {
                      e.currentTarget.style.backgroundColor = colors.primary[100];
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    if (index !== 2) {
                      e.currentTarget.style.backgroundColor = colors.primary[50];
                    }
                  }}
                >
                  <span style={{ fontSize: '2.5rem' }}>{category.image}</span>
                  {index === 2 && (
                    <span style={{
                      fontFamily: typography.fontFamily.body,
                      fontSize: typography.fontSize.xl,
                      fontWeight: typography.fontWeight.bold,
                      color: colors.text.primary,
                      textAlign: 'center',
                    }}>
                      {category.name}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Pagination dots for categories */}
            <div style={{
              display: 'flex',
              gap: spacing[2],
              marginTop: 'auto',
            }}>
              <div style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: colors.neutral[500],
              }} />
              <div style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: colors.primary[500],
              }} />
              <div style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: colors.neutral[500],
              }} />
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};