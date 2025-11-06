import L from 'leaflet';

// Fix untuk default marker icons di Leaflet
delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Color mapping untuk kategori
const categoryColors: { [key: string]: string } = {
  'Kuliner': '#EF4444', // Red
  'Fashion': '#EC4899', // Pink
  'Kerajinan': '#8B5CF6', // Purple
  'Elektronik': '#3B82F6', // Blue
  'Otomotif': '#059669', // Emerald
  'Kesehatan & Kecantikan': '#F59E0B', // Amber
  'Pendidikan': '#10B981', // Green
  'Jasa': '#6366F1', // Indigo
  'Teknologi': '#06B6D4', // Cyan
  'Pertanian': '#84CC16', // Lime
  'Lainnya': '#6B7280' // Gray
};

// Icon mapping untuk kategori
const categoryIcons: { [key: string]: string } = {
  'Kuliner': '🍽️',
  'Fashion': '👗',
  'Kerajinan': '🎨',
  'Elektronik': '📱',
  'Otomotif': '🚗',
  'Kesehatan & Kecantikan': '💄',
  'Pendidikan': '📚',
  'Jesa': '🔧',
  'Teknologi': '💻',
  'Pertanian': '🌾',
  'Lainnya': '🏪'
};

// Function untuk membuat custom marker icon berdasarkan kategori
export const createCustomIcon = (category: string): L.DivIcon => {
  const color = categoryColors[category] || '#3B82F6';
  const icon = categoryIcons[category] || '📍';
  
  return L.divIcon({
    html: `
      <div style="
        background-color: ${color};
        width: 32px;
        height: 32px;
        border-radius: 50% 50% 50% 0;
        border: 2px solid white;
        transform: rotate(-45deg);
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        position: relative;
      ">
        <span style="
          transform: rotate(45deg);
          font-size: 16px;
          line-height: 1;
          filter: drop-shadow(0 1px 2px rgba(0,0,0,0.3));
        ">${icon}</span>
      </div>
    `,
    className: 'custom-leaflet-marker',
    iconSize: [32, 32],
    iconAnchor: [16, 30],
    popupAnchor: [0, -30]
  });
};

// Function untuk membuat marker dengan shadow effect
export const createMarkerWithShadow = (category: string): L.DivIcon => {
  const color = categoryColors[category] || '#3B82F6';
  const icon = categoryIcons[category] || '📍';
  
  return L.divIcon({
    html: `
      <div style="position: relative;">
        <!-- Outer glow effect -->
        <div style="
          position: absolute;
          top: -4px;
          left: -4px;
          width: 52px;
          height: 52px;
          background: radial-gradient(circle, ${color}40 0%, ${color}20 50%, transparent 70%);
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          z-index: 0;
          animation: pulse 2s infinite;
        "></div>
        
        <!-- Shadow -->
        <div style="
          position: absolute;
          top: 38px;
          left: 12px;
          width: 20px;
          height: 10px;
          background: rgba(0,0,0,0.3);
          border-radius: 50%;
          transform: skewX(-10deg);
          z-index: 1;
        "></div>
        
        <!-- Main marker -->
        <div style="
          background: linear-gradient(135deg, ${color} 0%, ${color}cc 100%);
          width: 44px;
          height: 44px;
          border-radius: 50% 50% 50% 0;
          border: 3px solid white;
          transform: rotate(-45deg);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 6px 20px rgba(0,0,0,0.2), 0 3px 8px rgba(0,0,0,0.15);
          position: relative;
          z-index: 2;
          cursor: pointer;
          transition: all 0.3s ease;
        " 
        onmouseover="this.style.transform='rotate(-45deg) scale(1.1)'"
        onmouseout="this.style.transform='rotate(-45deg) scale(1)'">
          <span style="
            transform: rotate(45deg);
            font-size: 22px;
            line-height: 1;
            filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
          ">${icon}</span>
        </div>
      </div>
      
      <style>
        @keyframes pulse {
          0% { opacity: 1; transform: rotate(-45deg) scale(1); }
          50% { opacity: 0.7; transform: rotate(-45deg) scale(1.1); }
          100% { opacity: 1; transform: rotate(-45deg) scale(1); }
        }
      </style>
    `,
    className: 'custom-leaflet-marker-enhanced',
    iconSize: [44, 50],
    iconAnchor: [22, 44],
    popupAnchor: [0, -44]
  });
};

// Function untuk membuat cluster icon
export const createClusterIcon = (cluster: { getChildCount: () => number }): L.DivIcon => {
  const childCount = cluster.getChildCount();
  let c = ' marker-cluster-';
  
  if (childCount < 10) {
    c += 'small';
  } else if (childCount < 100) {
    c += 'medium';
  } else {
    c += 'large';
  }
  
  return L.divIcon({
    html: `
      <div style="
        background: linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%);
        color: white;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 14px;
        border: 2px solid white;
        box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
      ">
        ${childCount}
      </div>
    `,
    className: 'marker-cluster' + c,
    iconSize: [40, 40],
    iconAnchor: [20, 20]
  });
};

// Export semua utilities
export { categoryColors, categoryIcons };

// Default export
const leafletIconsUtils = {
  createCustomIcon,
  createMarkerWithShadow,
  createClusterIcon,
  categoryColors,
  categoryIcons
};

export default leafletIconsUtils;
