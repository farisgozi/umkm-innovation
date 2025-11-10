import { UtensilsCrossed, Shirt, Gem, Briefcase, Store } from 'lucide-react';
import { createLucideIconMarker } from './leaflet-icons';
import { UMKM as UMKMType } from '../data/umkmDummy';

/* ===== Hitung Jarak antar Titik (km) ===== */
export function getDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

/* ===== Warna Kategori ===== */
export const CATEGORY_COLOR: Record<string, string> = {
  Kuliner: '#F97316',
  Fashion: '#3B82F6',
  Kerajinan: '#10B981',
  Jasa: '#8B5CF6',
  Default: '#9CA3AF',
};

/* ===== Ikon Marker Berdasarkan Kategori ===== */
export function getCategoryIcon(item: UMKMType, hoveredId: string | null) {
  const baseClass = `w-4 h-4 text-[#2E2E2E]`;
  const isHover = hoveredId === item.id;
  const scaleClass = isHover ? 'transform scale-110' : 'transform scale-100';

  const iconEl = (
    <div className={`${scaleClass} transition-transform`} aria-hidden>
      {item.category === 'Kuliner' ? (
        <UtensilsCrossed className={baseClass} />
      ) : item.category === 'Fashion' ? (
        <Shirt className={baseClass} />
      ) : item.category === 'Kerajinan' ? (
        <Gem className={baseClass} />
      ) : item.category === 'Jasa' ? (
        <Briefcase className={baseClass} />
      ) : (
        <Store className={baseClass} />
      )}
    </div>
  );

  const color = CATEGORY_COLOR[item.category] || CATEGORY_COLOR.Default;
  return createLucideIconMarker(iconEl, color);
}
