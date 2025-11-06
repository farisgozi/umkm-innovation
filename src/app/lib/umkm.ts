// Interface untuk data UMKM
export interface UMKMLocation {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  category: string;
  description?: string;
  phone?: string;
  email?: string;
  website?: string;
  image?: string;
  rating?: number;
  openHours?: {
    open: string;
    close: string;
    days: string[];
  };
  socialMedia?: {
    instagram?: string;
    facebook?: string;
    whatsapp?: string;
  };
}

// Kategori UMKM yang tersedia
export const UMKM_CATEGORIES = [
  'Kuliner',
  'Fashion',
  'Kerajinan',
  'Elektronik',
  'Otomotif',
  'Kesehatan & Kecantikan',
  'Pendidikan',
  'Jasa',
  'Teknologi',
  'Pertanian',
  'Lainnya'
] as const;

export type UMKMCategory = typeof UMKM_CATEGORIES[number];

// Function untuk mendapatkan icon marker berdasarkan kategori
export const getMarkerIcon = (category: string): string => {
  const iconColors: { [key: string]: string } = {
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

  const color = iconColors[category] || '#3B82F6';

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
    <svg width="32" height="42" viewBox="0 0 32 42" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 0C7.163 0 0 7.163 0 16c0 8.837 16 26 16 26s16-17.163 16-26C32 7.163 24.837 0 16 0z" fill="${color}"/>
      <circle cx="16" cy="16" r="10" fill="white"/>
      <circle cx="16" cy="16" r="6" fill="${color}"/>
    </svg>
  `)}`;
};

// Function untuk format jam operasional
export const formatOpenHours = (openHours?: UMKMLocation['openHours']): string => {
  if (!openHours) return 'Jam operasional tidak tersedia';
  
  const daysText = openHours.days.length === 7 
    ? 'Setiap hari' 
    : openHours.days.join(', ');
  
  return `${daysText}: ${openHours.open} - ${openHours.close}`;
};

// Function untuk generate info window content
export const generateInfoWindowContent = (umkm: UMKMLocation): string => {
  return `
    <div class="p-4 max-w-sm">
      ${umkm.image ? `
        <img src="${umkm.image}" alt="${umkm.name}" 
             class="w-full h-32 object-cover rounded-lg mb-3" />
      ` : ''}
      
      <div class="mb-3">
        <h3 class="font-bold text-lg text-gray-900">${umkm.name}</h3>
        <span class="inline-block px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 mt-1">
          ${umkm.category}
        </span>
      </div>
      
      <div class="space-y-2 text-sm text-gray-600">
        <p><strong>📍 Alamat:</strong> ${umkm.address}</p>
        
        ${umkm.description ? `
          <p><strong>ℹ️ Deskripsi:</strong> ${umkm.description}</p>
        ` : ''}
        
        ${umkm.phone ? `
          <p><strong>📞 Telepon:</strong> 
            <a href="tel:${umkm.phone}" class="text-blue-600 hover:underline">${umkm.phone}</a>
          </p>
        ` : ''}
        
        ${umkm.email ? `
          <p><strong>✉️ Email:</strong> 
            <a href="mailto:${umkm.email}" class="text-blue-600 hover:underline">${umkm.email}</a>
          </p>
        ` : ''}
        
        ${umkm.website ? `
          <p><strong>🌐 Website:</strong> 
            <a href="${umkm.website}" target="_blank" class="text-blue-600 hover:underline">Kunjungi</a>
          </p>
        ` : ''}
        
        ${umkm.openHours ? `
          <p><strong>🕒 Jam Buka:</strong> ${formatOpenHours(umkm.openHours)}</p>
        ` : ''}
        
        ${umkm.rating ? `
          <p><strong>⭐ Rating:</strong> ${umkm.rating}/5.0</p>
        ` : ''}
      </div>
      
      ${umkm.socialMedia ? `
        <div class="mt-3 pt-3 border-t border-gray-200">
          <p class="text-xs text-gray-500 mb-2">Ikuti kami:</p>
          <div class="flex space-x-2">
            ${umkm.socialMedia.instagram ? `
              <a href="${umkm.socialMedia.instagram}" target="_blank" 
                 class="text-pink-500 hover:text-pink-600">📷 IG</a>
            ` : ''}
            ${umkm.socialMedia.facebook ? `
              <a href="${umkm.socialMedia.facebook}" target="_blank" 
                 class="text-blue-600 hover:text-blue-700">📘 FB</a>
            ` : ''}
            ${umkm.socialMedia.whatsapp ? `
              <a href="https://wa.me/${umkm.socialMedia.whatsapp}" target="_blank" 
                 class="text-green-500 hover:text-green-600">💬 WA</a>
            ` : ''}
          </div>
        </div>
      ` : ''}
      
      <div class="mt-4 pt-3 border-t border-gray-200">
        <button onclick="window.open('https://www.google.com/maps/dir/?api=1&destination=${umkm.lat},${umkm.lng}', '_blank')"
                class="w-full px-3 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors">
          🗺️ Petunjuk Arah
        </button>
      </div>
    </div>
  `;
};
