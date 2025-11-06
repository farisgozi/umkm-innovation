import L from 'leaflet';
import { UMKMLocation } from './umkm';

// Function untuk menghitung bounds optimal berdasarkan data UMKM
export const calculateOptimalBounds = (umkmData: UMKMLocation[]): L.LatLngBounds | null => {
  if (umkmData.length === 0) return null;

  if (umkmData.length === 1) {
    // Jika hanya 1 UMKM, buat bounds dengan radius kecil di sekitarnya
    const umkm = umkmData[0];
    const radius = 0.01; // ~1km radius
    return L.latLngBounds(
      [umkm.lat - radius, umkm.lng - radius],
      [umkm.lat + radius, umkm.lng + radius]
    );
  }

  // Jika lebih dari 1 UMKM, hitung bounds dari semua lokasi
  const lats = umkmData.map(umkm => umkm.lat);
  const lngs = umkmData.map(umkm => umkm.lng);

  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);

  // Tambah padding agar markers tidak tepat di edge
  const latPadding = (maxLat - minLat) * 0.1 || 0.005;
  const lngPadding = (maxLng - minLng) * 0.1 || 0.005;

  return L.latLngBounds(
    [minLat - latPadding, minLng - lngPadding],
    [maxLat + latPadding, maxLng + lngPadding]
  );
};

// Function untuk menghitung zoom level optimal berdasarkan bounds
export const calculateOptimalZoom = (bounds: L.LatLngBounds, mapSize: { width: number; height: number }): number => {
  const WORLD_DIM = { height: 256, width: 256 };
  const ZOOM_MAX = 18;

  function latRad(lat: number): number {
    const sin = Math.sin(lat * Math.PI / 180);
    const radX2 = Math.log((1 + sin) / (1 - sin)) / 2;
    return Math.max(Math.min(radX2, Math.PI), -Math.PI) / 2;
  }

  function zoom(mapPx: number, worldPx: number, fraction: number): number {
    return Math.floor(Math.log(mapPx / worldPx / fraction) / Math.LN2);
  }

  const ne = bounds.getNorthEast();
  const sw = bounds.getSouthWest();

  const latFraction = (latRad(ne.lat) - latRad(sw.lat)) / Math.PI;
  const lngDiff = ne.lng - sw.lng;
  const lngFraction = ((lngDiff < 0) ? (lngDiff + 360) : lngDiff) / 360;

  const latZoom = zoom(mapSize.height, WORLD_DIM.height, latFraction);
  const lngZoom = zoom(mapSize.width, WORLD_DIM.width, lngFraction);

  return Math.min(latZoom, lngZoom, ZOOM_MAX);
};

// Function untuk mendapatkan center point dari bounds
export const getBoundsCenter = (bounds: L.LatLngBounds): L.LatLng => {
  return bounds.getCenter();
};

// Function untuk memeriksa apakah bounds valid (tidak terlalu kecil atau besar)
export const isValidBounds = (bounds: L.LatLngBounds): boolean => {
  const ne = bounds.getNorthEast();
  const sw = bounds.getSouthWest();
  
  const latDiff = Math.abs(ne.lat - sw.lat);
  const lngDiff = Math.abs(ne.lng - sw.lng);
  
  // Bounds harus tidak terlalu kecil (min 0.001 degree) dan tidak terlalu besar (max 10 degree)
  return latDiff >= 0.001 && latDiff <= 10 && lngDiff >= 0.001 && lngDiff <= 10;
};

// Function untuk generate default bounds jika tidak ada data
export const getDefaultBounds = (): L.LatLngBounds => {
  // Default ke area Jakarta dengan radius yang wajar
  return L.latLngBounds(
    [-6.3, 106.7], // Southwest
    [-6.1, 106.9]  // Northeast
  );
};

// Function untuk fit bounds dengan animasi
export const fitBoundsWithAnimation = (
  map: L.Map, 
  bounds: L.LatLngBounds, 
  options?: L.FitBoundsOptions
): void => {
  const defaultOptions: L.FitBoundsOptions = {
    padding: [20, 20],
    maxZoom: 15,
    animate: true,
    duration: 1.0
  };

  map.fitBounds(bounds, { ...defaultOptions, ...options });
};

// Export utilities sebagai default object
const mapBoundsUtils = {
  calculateOptimalBounds,
  calculateOptimalZoom,
  getBoundsCenter,
  isValidBounds,
  getDefaultBounds,
  fitBoundsWithAnimation
};

export default mapBoundsUtils;
