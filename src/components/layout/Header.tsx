"use client";

import React from 'react';

interface HeaderProps {
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ className }) => {
  const navItems = ['Beranda', 'Kategori', 'Explore', 'Cerita', 'Tentang Kami'];

  return (
    <header className={className} style={{ backgroundColor: 'transparent', padding: '0 20px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10, maxWidth: '1440px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', gap: '10px', padding: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'stretch', gap: '10px', padding: '10px' }}>
          <img src="/images/logo.png" alt="Logo" style={{ height: '44px', width: 'auto' }} />
        </div>
        <nav style={{ display: 'flex', gap: '10px', padding: '10px' }}>
          {navItems.map((item) => (
            <div key={item} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4px 15px', cursor: 'pointer' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255, 209, 148, 0.2)'; e.currentTarget.style.borderRadius = '8px'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}>
              <span style={{ fontFamily: 'var(--font-clash-display)', fontSize: '24px', fontWeight: 700, color: '#FFF8F3', lineHeight: '1.23' }}>{item}</span>
            </div>
          ))}
        </nav>
        <div style={{ display: 'flex', gap: '10px', padding: '10px' }}>
          <button style={{ width: '54px', height: '54px', backgroundColor: '#FFF8F3', borderRadius: '22px', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', padding: '10px' }}>
            <img src="/images/search-icon.png" alt="Search" style={{ width: '20px', height: '20px' }} />
          </button>
        </div>
      </div>
    </header>
  );
};
