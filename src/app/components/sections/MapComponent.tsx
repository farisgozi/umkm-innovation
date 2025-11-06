'use client';

import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { UMKMLocation } from '../../lib/umkm';
import { createMarkerWithShadow } from '../../lib/leaflet-icons';
import { calculateOptimalBounds, fitBoundsWithAnimation, isValidBounds, getDefaultBounds } from '../../lib/map-bounds';
import MapControls from './MapControls';

interface MapComponentProps {
  filteredUMKM: UMKMLocation[];
  tileUrl?: string;
  attribution?: string;
}

// Component untuk auto-fit bounds berdasarkan markers
const MapBounds: React.FC<{ umkmData: UMKMLocation[] }> = ({ umkmData }) => {
  const map = useMap();

  useEffect(() => {
    // Hitung bounds optimal berdasarkan data UMKM
    const bounds = calculateOptimalBounds(umkmData);
    
    if (bounds && isValidBounds(bounds)) {
      // Fit map ke bounds dengan animasi
      fitBoundsWithAnimation(map, bounds, {
        padding: [30, 30], // Padding yang lebih besar untuk tampilan yang lebih baik
        maxZoom: 15, // Maksimal zoom level
        animate: true,
        duration: 1.2 // Durasi animasi
      });
    } else if (umkmData.length === 0) {
      // Jika tidak ada data, gunakan bounds default
      const defaultBounds = getDefaultBounds();
      fitBoundsWithAnimation(map, defaultBounds, {
        padding: [20, 20],
        maxZoom: 12,
        animate: true,
        duration: 1.0
      });
    }
  }, [map, umkmData]);

  return null;
};

const MapComponent: React.FC<MapComponentProps> = ({ 
  filteredUMKM, 
  tileUrl = "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
  attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
}) => {
  // Function untuk generate popup content
  const generatePopupContent = (umkm: UMKMLocation) => {
    return (
      <div className="p-2 max-w-xs">
        <div className="mb-2">
          <h3 className="font-bold text-lg text-gray-900">{umkm.name}</h3>
          <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 mt-1">
            {umkm.category}
          </span>
        </div>
        
        <div className="space-y-1 text-sm text-gray-600">
          <p><strong>📍 Alamat:</strong> {umkm.address}</p>
          
          {umkm.description && (
            <p><strong>ℹ️ Deskripsi:</strong> {umkm.description}</p>
          )}
          
          {umkm.phone && (
            <p><strong>📞 Telepon:</strong> 
              <a href={`tel:${umkm.phone}`} className="text-blue-600 hover:underline ml-1">
                {umkm.phone}
              </a>
            </p>
          )}
          
          {umkm.email && (
            <p><strong>✉️ Email:</strong> 
              <a href={`mailto:${umkm.email}`} className="text-blue-600 hover:underline ml-1">
                {umkm.email}
              </a>
            </p>
          )}
          
          {umkm.website && (
            <p><strong>🌐 Website:</strong> 
              <a href={umkm.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1">
                Kunjungi
              </a>
            </p>
          )}
          
          {umkm.openHours && (
            <p><strong>🕒 Jam Buka:</strong> {umkm.openHours.open} - {umkm.openHours.close}</p>
          )}
          
          {umkm.rating && (
            <p><strong>⭐ Rating:</strong> {umkm.rating}/5.0</p>
          )}
        </div>
        
        {umkm.socialMedia && (
          <div className="mt-2 pt-2 border-t border-gray-200">
            <p className="text-xs text-gray-500 mb-1">Ikuti kami:</p>
            <div className="flex space-x-2 text-xs">
              {umkm.socialMedia.instagram && (
                <a href={umkm.socialMedia.instagram} target="_blank" rel="noopener noreferrer"
                   className="text-pink-500 hover:text-pink-600">📷 IG</a>
              )}
              {umkm.socialMedia.facebook && (
                <a href={umkm.socialMedia.facebook} target="_blank" rel="noopener noreferrer"
                   className="text-blue-600 hover:text-blue-700">📘 FB</a>
              )}
              {umkm.socialMedia.whatsapp && (
                <a href={`https://wa.me/${umkm.socialMedia.whatsapp}`} target="_blank" rel="noopener noreferrer"
                   className="text-green-500 hover:text-green-600">💬 WA</a>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <MapContainer
      center={[-6.2088, 106.8456]} // Default center (akan di-override oleh MapBounds)
      zoom={12} // Default zoom (akan di-override oleh MapBounds)
      style={{ height: '100%', width: '100%' }}
      className="rounded-3xl"
    >
      <TileLayer
        attribution={attribution}
        url={tileUrl}
      />
      
      {/* Auto-fit bounds berdasarkan data UMKM */}
      <MapBounds umkmData={filteredUMKM} />
      
      {/* Map controls untuk tracking zoom dan bounds */}
      <MapControls />
      
      {filteredUMKM.map((umkm) => (
        <Marker 
          key={umkm.id} 
          position={[umkm.lat, umkm.lng]}
          icon={createMarkerWithShadow(umkm.category)}
        >
          <Popup maxWidth={300} className="custom-popup">
            {generatePopupContent(umkm)}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
