import L from 'leaflet';
import { renderToString } from 'react-dom/server';
import { ReactElement } from 'react';

/**
 * Marker Lucide berbentuk pin map modern.
 * - Background warna sesuai kategori
 * - Icon Lucide di tengah
 * - Glow lembut saat hover
 */
export function createLucideIconMarker(icon: ReactElement, color = '#FF885B') {
  const html = renderToString(
    <div
      style={{
        position: 'relative',
        width: '42px',
        height: '42px',
        backgroundColor: color,
        borderRadius: '50% 50% 50% 0',
        transform: 'rotate(-45deg)',
        boxShadow: `0 4px 10px ${color}40`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.3s ease',
      }}
      className="marker-pin"
    >
      <div
        style={{
          transform: 'rotate(45deg)',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {icon}
      </div>
    </div>
  );

  return L.divIcon({
    html,
    className: 'custom-lucide-marker',
    iconSize: [42, 42],
    iconAnchor: [21, 42],
    popupAnchor: [0, -35],
  });
}
