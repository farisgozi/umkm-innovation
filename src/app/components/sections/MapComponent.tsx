'use client';

import React, { useEffect, useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  useMap,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { MapPin, UtensilsCrossed, Shirt } from 'lucide-react';
import { MapControls } from './MapControls';
import { MapStyleSelector } from './MapStyleSelector';
import { MapFilters } from './MapFilters';
import { createLucideIconMarker } from '../../lib/leaflet-icons';

interface UMKM {
  id: number;
  name: string;
  category: string;
  lat: number;
  lng: number;
  description?: string;
}

const sampleData: UMKM[] = [
  { id: 1, name: 'Kopi Menteng', category: 'Kuliner', lat: -6.1904, lng: 106.8335, description: 'Kopi lokal dengan nuansa vintage.' },
  { id: 2, name: 'Batik Thamrin', category: 'Fashion', lat: -6.1829, lng: 106.8219, description: 'Busana batik modern.' },
  { id: 3, name: 'Roti Cikini', category: 'Kuliner', lat: -6.1965, lng: 106.841, description: 'Roti khas dengan resep klasik.' },
  { id: 4, name: 'Distro Gondangdia', category: 'Fashion', lat: -6.1897, lng: 106.8271, description: 'Pakaian streetwear lokal.' },
];

const Recenter = ({ lat, lng }: { lat: number; lng: number }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo([lat, lng], 14, { duration: 1.3 });
  }, [lat, lng, map]);
  return null;
};

const getDistanceKm = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
};

export default function MapComponent() {
  const [mapStyle, setMapStyle] = useState(
    'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
  );
  const [filteredData, setFilteredData] = useState(sampleData);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [activeUMKM, setActiveUMKM] = useState<UMKM | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [filterRadius, setFilterRadius] = useState(false);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  // === Filter + Search + Radius Logic ===
  useEffect(() => {
    const timeout = setTimeout(() => {
      let data = sampleData;

      if (activeCategory !== 'All') {
        data = data.filter((d) => d.category === activeCategory);
      }

      if (searchQuery.trim() !== '') {
        data = data.filter((d) =>
          d.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      if (filterRadius && userLocation) {
        data = data.filter(
          (d) => getDistanceKm(userLocation.lat, userLocation.lng, d.lat, d.lng) <= 5
        );
      }

      setFilteredData(data);
    }, 300); // debounce search

    return () => clearTimeout(timeout);
  }, [activeCategory, searchQuery, filterRadius, userLocation]);

  const handleFilter = (category: string) => setActiveCategory(category);
  const handleSearch = (query: string) => setSearchQuery(query);

  const handleLocateUser = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
      setUserLocation(coords);
      setFilterRadius(true);
    });
  };

  return (
    <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] rounded-3xl overflow-hidden shadow-2xl">
      <MapContainer
        center={[-6.1753924, 106.8271528]}
        zoom={13}
        scrollWheelZoom
        className="w-full h-full z-10"
      >
        <TileLayer url={mapStyle} />
        {userLocation && <Recenter lat={userLocation.lat} lng={userLocation.lng} />}

        {/* Radius Circle Animation */}
        <AnimatePresence>
          {userLocation && filterRadius && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.3, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
            >
              <Circle
                center={[userLocation.lat, userLocation.lng]}
                radius={5000}
                pathOptions={{ color: '#FF9E6B', fillColor: '#FF9E6B', fillOpacity: 0.2 }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Smooth Animated Markers */}
        <LayoutGroup>
          <AnimatePresence mode="popLayout">
            {filteredData.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ type: 'spring', stiffness: 240, damping: 22 }}
              >
              <Marker
                position={[item.lat, item.lng]}
                eventHandlers={{
                  click: () => setActiveUMKM(item),
                  mouseover: () => setHoveredId(item.id),
                  mouseout: () => setHoveredId(null),
                }}
                icon={createLucideIconMarker(
                  item.category === 'Kuliner' ? (
                    <UtensilsCrossed
                      className={`w-4 h-4 ${
                        hoveredId === item.id
                          ? 'scale-110 transition-transform'
                          : 'transition-all'
                      }`}
                    />
                  ) : (
                    <Shirt
                      className={`w-4 h-4 ${
                        hoveredId === item.id
                          ? 'scale-110 transition-transform'
                          : 'transition-all'
                      }`}
                    />
                  ),
                  item.category === 'Kuliner' ? '#FF885B' : '#3B82F6'
                )}
              />
              </motion.div>
            ))}
          </AnimatePresence>
        </LayoutGroup>

        {/* User Marker */}
        {userLocation && (
          <Marker
            position={[userLocation.lat, userLocation.lng]}
            icon={createLucideIconMarker(<MapPin className="text-blue-700 animate-pulse" />)}
          >
            <Popup>Lokasimu saat ini</Popup>
          </Marker>
        )}
      </MapContainer>

      {/* Radius Toggle Card */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          if (userLocation) setFilterRadius(!filterRadius);
          else handleLocateUser();
        }}
        className={`absolute top-6 right-6 flex items-center gap-2 px-4 py-2 rounded-lg shadow-lg cursor-pointer z-20 text-sm font-medium ${
          filterRadius ? 'bg-orange-500 text-white shadow-orange-300' : 'bg-white text-gray-700 hover:bg-gray-100'
        }`}
      >
        <MapPin className={`${filterRadius ? 'text-white' : 'text-orange-500'}`} size={16} />
        {userLocation ? (
          filterRadius ? <>UMKM dalam radius <span className="font-bold">5 km</span></> : <>Menampilkan semua UMKM</>
        ) : (
          <>Klik untuk temukan lokasimu & filter radius</>
        )}
      </motion.div>

      {/* Filters + Search + Map Controls */}
      <MapFilters
        categories={['All', 'Kuliner', 'Fashion']}
        onFilter={handleFilter}
        onSearch={handleSearch}
        activeCategory={activeCategory}
      />
      <MapStyleSelector setMapStyle={setMapStyle} />
      <MapControls onLocate={handleLocateUser} />

      {/* Popup Card Bottom */}
      <AnimatePresence>
        {activeUMKM && (
          <motion.div
            key="popup-card"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 60 }}
            transition={{ type: 'spring', stiffness: 120, damping: 16 }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-white rounded-3xl shadow-2xl p-6 w-[90%] md:w-[400px] z-30"
          >
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                {activeUMKM.category === 'Kuliner' ? (
                  <UtensilsCrossed className="text-orange-500 w-6 h-6" />
                ) : (
                  <Shirt className="text-blue-500 w-6 h-6" />
                )}
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800">{activeUMKM.name}</h3>
                <p className="text-sm text-gray-500">{activeUMKM.category}</p>
              </div>
            </div>

            <p className="mt-3 text-gray-600 text-sm leading-relaxed">{activeUMKM.description}</p>

            <div className="mt-5 flex justify-end">
              <button
                onClick={() => setActiveUMKM(null)}
                className="text-sm text-gray-600 hover:text-orange-600 font-semibold"
              >
                Tutup
              </button>
              <button className="ml-3 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold px-4 py-2 rounded-full shadow-md">
                Lihat Detail
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
