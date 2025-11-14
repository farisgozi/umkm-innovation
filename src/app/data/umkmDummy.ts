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
    description: 'Bakmi legendaris dengan cita rasa autentik dan porsi melimpah. Sudah berdiri sejak tahun 1980 dan menjadi favorit warga Jakarta Pusat.',
    image: '/assets/images/umkm/Bakmi.webp',
    rating: 4.5,
    phone: '+62 21-3145678',
    openHours: { 
      open: '08:00', 
      close: '00:00', 
      days: ['Setiap Hari'] 
    },
    socialMedia: {
      instagram: 'https://instagram.com/bakmiroxycikini',
      whatsapp: 'https://wa.me/6221314567'
    }
  },
  {
    id: '2',
    name: 'Ayam Geprek Bu Rosita',
    address: 'Jl. Kebon Sirih No.45, RT.5/RW.2, Kebon Sirih, Jakarta Pusat',
    lat: -6.1873,
    lng: 106.8365,
    category: 'Makanan',
    description: 'Ayam geprek dengan sambal level yang beragam, mulai dari level 1 hingga level 10. Cocok untuk pecinta makanan pedas!',
    image: '/assets/images/umkm/geprek-cikini.webp',
    rating: 4.2,
    phone: '+62 812-3456789',
    openHours: { 
      open: '10:00', 
      close: '22:00', 
      days: ['Senin - Sabtu'] 
    },
    socialMedia: {
      instagram: 'https://instagram.com/geprekburosita',
      whatsapp: 'https://wa.me/62123456789'
    }
  },
  {
    id: '3',
    name: 'Warung Kopi Tugu',
    address: 'Jl. Tugu Raya No.12, Tugu Utara, Jakarta Utara',
    lat: -6.1751,
    lng: 106.8650,
    category: 'Minuman',
    description: 'Warung kopi tradisional dengan biji kopi pilihan dan suasana yang nyaman untuk nongkrong.',
    image: '/assets/images/umkm/baram-cafe.webp',
    rating: 4.3,
    phone: '+62 21-6543210',
    openHours: { 
      open: '06:00', 
      close: '23:00', 
      days: ['Setiap Hari'] 
    },
    socialMedia: {
      instagram: 'https://instagram.com/warungkopitugu',
      facebook: 'https://facebook.com/warungkopitugu'
    }
  },
  {
    id: '4',
    name: 'Toko Batik Nusantara',
    address: 'Jl. Pasar Baru No.88, Pasar Baru, Jakarta Pusat',
    lat: -6.1674,
    lng: 106.8456,
    category: 'Fashion',
    description: 'Menjual berbagai macam batik berkualitas tinggi dengan motif tradisional dan modern.',
    image: '/assets/images/umkm/cerita.jpg',
    rating: 4.1,
    phone: '+62 21-3847562',
    openHours: { 
      open: '09:00', 
      close: '18:00', 
      days: ['Senin - Sabtu'] 
    },
    socialMedia: {
      instagram: 'https://instagram.com/batiknusantarajkt',
      whatsapp: 'https://wa.me/62213847562'
    }
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
