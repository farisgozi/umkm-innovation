"use client";

import React from 'react';

interface HeroSectionProps {
  className?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ className }) => {
  return (
    <section 
      className={className}
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: 'url("/images/hero-bg.png")',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        overflow: 'hidden',
        padding: '26px 78px',
      }}
    >
      <div style={{
        position: 'relative',
        width: '1264px',
        height: '878px',
        backgroundColor: 'rgba(46, 46, 46, 0.7)',
        borderRadius: '20px',
        padding: '60px 60px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          paddingLeft: '10px',
        }}>
          <div>
            <h1 style={{
              fontFamily: 'var(--font-clash-display)',
              fontSize: '96px',
              fontWeight: 700,
              color: '#FFF8F3',
              lineHeight: '1.23',
              letterSpacing: '-0.02em',
              margin: 0,
            }}>
              Temukan UMKM Keren di Sekitarmu
            </h1>
          </div>

          <div>
            <h2 style={{
              fontFamily: 'var(--font-dm-sans)',
              fontSize: '48px',
              fontWeight: 600,
              color: '#FFF8F3',
              lineHeight: '1.302',
              letterSpacing: '-0.02em',
              margin: 0,
            }}>
              Dukung Bisnis Lokal<br />
              Bangun Komunitas Hebat
            </h2>
          </div>

          <div>
            <p style={{
              fontFamily: 'var(--font-dm-sans)',
              fontSize: '24px',
              fontWeight: 400,
              color: '#FFF8F3',
              lineHeight: '1.302',
              letterSpacing: '-0.02em',
              margin: 0,
            }}>
              Dari warung kopi legendaris, kedai bakso andalan, hingga usaha kreatif di kampusmu <br />
              semua ada di satu tempat. Jelajahi, dukung, dan kenali cerita di balik setiap karya lokal.
            </p>
          </div>
        </div>

        <button 
          style={{
            position: 'absolute',
            bottom: '100px',
            right: '288px',
            backgroundColor: '#FFD194',
            color: '#2E2E2E',
            fontFamily: 'var(--font-clash-display)',
            fontSize: '24px',
            fontWeight: 700,
            lineHeight: '1.23',
            padding: '16px 48px',
            borderRadius: '32px',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#FFB85C';
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#FFD194';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          Jelajahi Sekarang
        </button>
      </div>
    </section>
  );
};
