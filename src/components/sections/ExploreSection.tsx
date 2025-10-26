"use client";

import React from 'react';
import { UMKMCard, SearchBar } from '@/components/ui';
import { colors, spacing, typography } from '@/lib/design-system';

interface ExploreSectionProps {
  className?: string;
}

export const ExploreSection: React.FC<ExploreSectionProps> = ({ className }) => {
  const umkmData = [
    {
      title: 'AYAM GEPREK 77',
      description: 'Lorem ipsum dolor sit amet consectetur. Eget enim morbi aenean vehicula rhoncus sed nisi proin. Blandit leo diam sit id tristique amet mattis lacinia id. Sagittis lectus est et nunc nec quisque pretium id platea. Duis accumsan lectus volutpat etiam lorem vitae.',
      category: 'Makanan',
      rating: 4.5,
      image: '/api/placeholder/300/200',
    },
    {
      title: 'KOPI NUSANTARA',
      description: 'Lorem ipsum dolor sit amet consectetur. Pulvinar lectus diam commodo luctus. Id vitae nullam posuere magna ultricies.',
      category: 'Minuman',
      rating: 4.8,
      image: '/api/placeholder/300/200',
    },
  ];

  return (
    <section className={className} style={{
      minHeight: '862px',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: colors.background.primary,
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: spacing[3],
        padding: `${spacing[3]} 0`,
        flex: 1,
      }}>
        {/* Section Title */}
        <div style={{
          textAlign: 'center',
          marginBottom: spacing[6],
        }}>
          <h2 style={{
            fontFamily: typography.fontFamily.heading,
            fontSize: typography.fontSize['4xl'],
            fontWeight: typography.fontWeight.bold,
            color: colors.text.primary,
            margin: 0,
            letterSpacing: typography.letterSpacing.wide,
          }}>
            Explore UMKM Sekitarmu
          </h2>
        </div>

        {/* Search Bar */}
        <div style={{
          width: '100%',
          maxWidth: '542px',
          marginBottom: spacing[6],
        }}>
          <SearchBar />
        </div>

        {/* UMKM Grid */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: spacing[6],
          width: '100%',
          maxWidth: '1420px',
          padding: `0 ${spacing[3]}`,
          flex: 1,
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(600px, 1fr))',
            gap: spacing[6],
            width: '100%',
            minHeight: '704px',
          }}>
            {/* Left Column */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: spacing[6],
            }}>
              {/* Featured UMKM Card */}
              <div style={{ width: '100%' }}>
                <UMKMCard
                  {...umkmData[0]}
                  variant="featured"
                  onViewDetail={() => console.log('View detail clicked')}
                />
              </div>

              {/* View Detail Button */}
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: spacing[6],
              }}>
                <button style={{
                  backgroundColor: colors.background.primary,
                  border: `2px solid ${colors.primary[100]}`,
                  borderRadius: '22px',
                  padding: `${spacing[3]} ${spacing[6]}`,
                  fontFamily: typography.fontFamily.heading,
                  fontSize: typography.fontSize.xl,
                  fontWeight: typography.fontWeight.bold,
                  color: colors.text.primary,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  letterSpacing: typography.letterSpacing.wide,
                }}>
                  Lihat Detail
                </button>
              </div>
            </div>

            {/* Right Column */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: spacing[6],
            }}>
              {/* Review Card */}
              <div style={{
                backgroundColor: colors.background.primary,
                borderRadius: '42px',
                padding: spacing[6],
                display: 'flex',
                flexDirection: 'column',
                gap: spacing[4],
                border: `1px solid ${colors.primary[50]}`,
                boxShadow: '0px 4px 8px rgba(0,0,0,0.1)',
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: spacing[4],
                }}>
                  {/* Avatar */}
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    backgroundColor: colors.primary[100],
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <span style={{
                      fontFamily: typography.fontFamily.heading,
                      fontSize: typography.fontSize.xl,
                      fontWeight: typography.fontWeight.bold,
                      color: colors.text.primary,
                    }}>
                      U
                    </span>
                  </div>

                  {/* Rating Stars */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: spacing[2],
                  }}>
                    <div style={{ display: 'flex', gap: '2px' }}>
                      {Array.from({ length: 5 }, (_, i) => (
                        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#DFB300">
                          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                        </svg>
                      ))}
                    </div>
                    <span style={{
                      fontFamily: typography.fontFamily.body,
                      fontSize: typography.fontSize.xl,
                      fontWeight: typography.fontWeight.bold,
                      color: colors.text.primary,
                    }}>
                      4.5
                    </span>
                  </div>
                </div>

                <p style={{
                  fontFamily: typography.fontFamily.body,
                  fontSize: typography.fontSize.lg,
                  fontWeight: typography.fontWeight.normal,
                  color: colors.text.primary,
                  margin: 0,
                  lineHeight: typography.lineHeight.normal,
                  letterSpacing: typography.letterSpacing.tighter,
                }}>
                  Lorem ipsum dolor sit amet consectetur. Pulvinar lectus diam commodo luctus. Id vitae nullam posuere magna ultricies.
                </p>
              </div>

              {/* Image placeholder */}
              <div style={{
                width: '100%',
                height: '300px',
                backgroundColor: colors.primary[50],
                borderRadius: '42px',
                backgroundImage: 'linear-gradient(135deg, #FFD194 0%, #FF885B 100%)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <span style={{ fontSize: '4rem', opacity: 0.7 }}>🏪</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};