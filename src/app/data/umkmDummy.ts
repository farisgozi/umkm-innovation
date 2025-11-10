export interface UMKM {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  category: string;
  description?: string;
  phone?: string;
  image?: string;
  rating?: number;
  openHours?: { 
    open: string; 
    close: string; 
    days: string[] 
  };
  socialMedia?: { 
    instagram?: string; 
    facebook?: string; 
    whatsapp?: string 
  };
}

// ===== Default values helper =====
const defaultImage = '/images/umkm/placeholder.jpg';
const defaultRating = 4.0;
const defaultDescription = 'Deskripsi UMKM belum tersedia.';

export const umkmDummy: UMKM[] = [
  {
    id: '1',
    name: 'Bakmi Roxy Cikini',
    address: 'Jl. Cikini Raya No.51, RT.16/RW.1 RT.16/RW.1, Cikini, Jakarta Pusat',
    lat: -6.1885,
    lng: 106.8373,
    category: 'Makanan',
    description: 'Bakmi legendaris dengan cita rasa autentik dan porsi melimpah.',
    image: '/assets/images/umkm/Bakmi.webp',
    rating: 4.5,
    openHours: { 
      open: '08:00', 
      close: '00:00', 
      days: ['Setiap Hari'] 
    },
  },
  {
    id: '2',
    name: 'Ayam Geprek Bu Rosita',
    address: 'Jl. Kebon Sirih No.45, RT.5/RW.2, Kebon Sirih, Jakarta Pusat',
    lat: -6.1873,
    lng: 106.8365,
    category: 'Makanan',
    image: '/assets/images/umkm/geprek-cikini.webp',
    rating: 4.0,
    openHours: { 
      open: '10:00', 
      close: '19:00', 
      days: ['Senin - Sabtu'] 
    },
  },
];

// ===== Helper untuk UMKMPopupCard =====
export function getUMKMForPopup(id: string) {
  const umkm = umkmDummy.find(u => u.id === id);
  if (!umkm) return null;
  return {
    ...umkm,
    image: umkm.image || defaultImage,
    rating: umkm.rating || defaultRating,
    description: umkm.description || defaultDescription,
  };
}
