import React from 'react';
import { useMapEvents } from 'react-leaflet';

interface MapControlsProps {
  onZoomChange?: (zoom: number) => void;
  onBoundsChange?: (bounds: L.LatLngBounds) => void;
}

const MapControls: React.FC<MapControlsProps> = ({ onZoomChange, onBoundsChange }) => {

  useMapEvents({
    zoomend: (e) => {
      const zoom = e.target.getZoom();
      const bounds = e.target.getBounds();
      
      onZoomChange?.(zoom);
      onBoundsChange?.(bounds);
    },
    moveend: (e) => {
      const bounds = e.target.getBounds();
      onBoundsChange?.(bounds);
    }
  });

  return null;
};

export default MapControls;
