'use client';

import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  useMap,
} from 'react-leaflet';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { MapPin, Star, X } from 'lucide-react';
import Image from 'next/image';
import L from 'leaflet';
import { MapControls } from './MapControls';
import { MapStyleSelector } from './MapStyleSelector';
import { MapFilters } from './MapFilters';
import { createLucideIconMarker } from '../../lib/leaflet-icons';
import { umkmDummy, UMKM as UMKMType } from '../../data/umkmDummy';
import { getDistanceKm, getCategoryIcon } from '../../lib/map-utils';

export default function MapComponent() {
  // ==== Responsive height fix (for mobile browsers) ====
  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    setVh();
    window.addEventListener('resize', setVh);
    return () => window.removeEventListener('resize', setVh);
  }, []);

  // ==== refs ====
  const mapRef = useRef<L.Map | null>(null);

  // ==== states ====
  const [mapStyle, setMapStyle] = useState(
    'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
  );
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [activeUMKM, setActiveUMKM] = useState<UMKMType | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [filterRadius, setFilterRadius] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // ==== data dummy ====
  const umkmList = useMemo(() => umkmDummy, []);

  // ==== filtering logic (optimized with useMemo) ====
  const filteredData = useMemo(() => {
    let data = umkmList;

    if (activeCategory !== 'All') {
      data = data.filter((d) => d.category === activeCategory);
    }

    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      data = data.filter((d) => d.name.toLowerCase().includes(query));
    }

    if (filterRadius && userLocation) {
      data = data.filter(
        (d) => getDistanceKm(userLocation.lat, userLocation.lng, d.lat, d.lng) <= 5
      );
    }

    return data;
  }, [umkmList, activeCategory, searchQuery, filterRadius, userLocation]);

  // ==== geolocation ====
  const handleLocateUser = useCallback(() => {
    if (!navigator.geolocation) {
      alert('Geolocation tidak didukung browser');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setFilterRadius(true);
      },
      () => alert('Gagal mendapatkan lokasi. Aktifkan izin lokasi 📍'),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }, []);

  // ==== marker click ====
  const onMarkerClick = useCallback(
    (m: UMKMType) => {
      setActiveUMKM(m);
      if (!isMobile && m.lat && m.lng) {
        mapRef.current?.flyTo([m.lat, m.lng], 15, { duration: 1.2 });
      }
    },
    [isMobile]
  );

  // ==== recenter component ====
  const Recenter: React.FC<{ lat: number; lng: number }> = ({ lat, lng }) => {
    const map = useMap();
    useEffect(() => {
      map.flyTo([lat, lng], 14, { duration: 1.2 });
    }, [lat, lng, map]);
    return null;
  };

  return (
    <div
      className="relative w-full rounded-3xl overflow-hidden shadow-2xl"
      style={{ height: `calc(var(--vh, 1vh) * 60)` }}
    >
      <MapContainer
        ref={mapRef}
        center={[-6.1753924, 106.8271528]}
        zoom={13}
        scrollWheelZoom
        className="w-full h-full z-10 transition-all duration-500"
      >
        <TileLayer url={mapStyle} />
        {userLocation && <Recenter lat={userLocation.lat} lng={userLocation.lng} />}

        {/* Radius Animation */}
        <AnimatePresence>
          {userLocation && filterRadius && (
            <motion.div
              key="radius"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 0.28, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
            >
              <Circle
                center={[userLocation.lat, userLocation.lng]}
                radius={5000}
                pathOptions={{ color: '#FF9E6B', fillColor: '#FF9E6B', fillOpacity: 0.18 }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Markers */}
        <LayoutGroup>
          <AnimatePresence mode="popLayout">
            {filteredData.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ type: 'spring', stiffness: 220, damping: 20 }}
              >
                <Marker
                  position={[item.lat, item.lng]}
                  eventHandlers={{
                    click: () => onMarkerClick(item),
                    mouseover: () => setHoveredId(item.id),
                    mouseout: () => setHoveredId(null),
                  }}
                  icon={getCategoryIcon(item, hoveredId)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </LayoutGroup>

        {/* User Marker */}
        {userLocation && (
          <Marker
            position={[userLocation.lat, userLocation.lng]}
            icon={createLucideIconMarker(
              <div className="flex items-center justify-center">
                <MapPin className="w-4 h-4 text-[#2E2E22E]" />
              </div>,
              '#2563EB'
            )}
          >
            <Popup autoPan={false}>
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="relative p-3 sm:p-4 bg-white rounded-2xl shadow-lg border border-blue-100 w-[160px] sm:w-[190px] text-center"
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const popupEl = e.currentTarget.closest('.leaflet-popup');
                    if (popupEl) popupEl.remove();
                  }}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-gray-100 hover:bg-blue-100 transition"
                  aria-label="Close popup"
                >
                  <X className="w-4 h-4 text-gray-600 hover:text-blue-600 transition" />
                </button>

                <div className="flex flex-col items-center space-y-2">
                  <div className="bg-blue-100 w-10 h-10 flex items-center justify-center rounded-full">
                    <MapPin className="text-blue-600 w-5 h-5" />
                  </div>
                  <p className="text-gray-800 text-sm font-semibold">Lokasimu 📍</p>
                  <p className="text-xs text-gray-500">Kamu sedang berada di sekitar sini</p>
                </div>
              </motion.div>
            </Popup>
          </Marker>
        )}
      </MapContainer>

      {/* Radius Toggle Button */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => {
          if (userLocation) setFilterRadius((p) => !p);
          else handleLocateUser();
        }}
        className="absolute top-4 sm:top-6 right-4 sm:right-6 z-20 cursor-pointer"
      >
        {/* Desktop */}
        <div
          className={`hidden sm:flex items-center gap-2 px-4 py-1.5 rounded-lg shadow-lg text-sm font-medium transition-colors ${
            filterRadius ? 'bg-orange-500 text-white shadow-orange-300' : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          <MapPin className={filterRadius ? 'text-white' : 'text-orange-500'} size={16} />
          {userLocation ? (
            filterRadius ? (
              <>UMKM dalam radius <span className="font-bold">5 km</span></>
            ) : (
              <>Menampilkan semua UMKM</>
            )
          ) : (
            <>Klik untuk aktifkan lokasi</>
          )}
        </div>

        {/* Mobile */}
        <div
          className={`sm:hidden relative flex items-center justify-center w-10 h-10 rounded-full shadow-lg transition-colors ${
            filterRadius ? 'bg-orange-500 text-white shadow-orange-300' : 'bg-white text-orange-500 hover:bg-gray-100'
          }`}
          title={userLocation ? (filterRadius ? 'Dalam radius 5 km' : 'Menampilkan semua UMKM') : 'Aktifkan lokasi'}
        >
          <MapPin size={18} />
        </div>
      </motion.div>

      {/* UI Controls */}
      <MapFilters
        categories={['All', 'Kuliner', 'Fashion', 'Kerajinan', 'Jasa']}
        onFilter={setActiveCategory}
        onSearch={setSearchQuery}
        activeCategory={activeCategory}
      />
      <MapStyleSelector setMapStyle={setMapStyle} />
      <MapControls onLocate={handleLocateUser} />

      {/* Bottom Popup */}
      <AnimatePresence>
        {activeUMKM && (
          <motion.div
            key="popup-card"
            drag={isMobile}
            dragConstraints={{ top: 0, bottom: 120 }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 80) setActiveUMKM(null);
            }}
            initial={{ opacity: 0, y: 120 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 120 }}
            transition={{ type: 'spring', stiffness: 120, damping: 16 }}
            className={`absolute left-0 right-0 z-30 bg-white shadow-2xl transition-all duration-400 ease-in-out
              ${isMobile ? 'bottom-0 rounded-t-3xl p-4' : 'bottom-10 left-1/2 -translate-x-1/2 rounded-3xl p-6 w-[90%] max-w-md'}`}
          >
            {isMobile && <div className="w-10 h-1.5 bg-gray-300 rounded-full mx-auto mb-3" />}

            <div className="flex gap-4 items-start">
              <Image
                src={activeUMKM.image || '/placeholder.png'}
                alt={activeUMKM.name}
                className="w-16 h-16 rounded-2xl object-cover shadow-md flex-shrink-0"
                width={64}
                height={64}
              />
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-800">{activeUMKM.name}</h3>
                <p className="text-sm text-gray-500">{activeUMKM.address}</p>

                <div className="flex items-center mt-2 text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      fill={i < Math.round(activeUMKM.rating || 0) ? 'currentColor' : 'none'}
                      strokeWidth={1.5}
                    />
                  ))}
                  <span className="ml-2 text-xs text-gray-600">{activeUMKM.rating?.toFixed(1)}</span>
                </div>
              </div>
            </div>

            <div className="max-h-[40vh] sm:max-h-none overflow-y-auto mt-3">
              <p className="text-gray-600 text-sm leading-relaxed">{activeUMKM.description}</p>
            </div>

            <div className="mt-4 flex justify-between items-center border-t pt-3">
              <p className="text-xs text-gray-500">
                {activeUMKM.openHours
                  ? `${activeUMKM.openHours.open} - ${activeUMKM.openHours.close}`
                  : 'Jam buka tidak tersedia'}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveUMKM(null)}
                  className="text-xs text-gray-500 hover:text-orange-600 font-medium"
                >
                  Tutup
                </button>
                <button className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold px-4 py-2 rounded-full shadow-md">
                  Lihat Detail
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
