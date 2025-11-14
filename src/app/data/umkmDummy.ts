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
  // Deket Kampus
  {
    id: '1',
    name: 'Bakmi Roxy Cikini',
    address: 'Jl. Cikini Raya, Cikini, Jakarta Pusat',
    lat: -6.188528568629569,
    lng: 106.83733248404994,
    category: 'Makanan',
    description: 'Bakmi legendaris dengan cita rasa autentik dan porsi melimpah. Sudah berdiri sejak tahun 1980 dan menjadi favorit warga Jakarta Pusat.',
    image: '/assets/images/umkm/Bakmi.webp',
    rating: 4.5,
    phone: '+62 21-3145678',
    openHours: { 
      open: '08:00', 
      close: '22:00', 
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
    address: 'Dekat Kampus, Jakarta Pusat',
    lat: -6.187329201047157,
    lng: 106.83655538466958,
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
    name: 'Nasi Uduk Ibu Mia',
    address: 'Dekat Kampus, Jakarta Pusat',
    lat: -6.18639010092864,
    lng: 106.83746098220887,
    category: 'Makanan',
    description: 'Nasi uduk dengan lauk pauk lengkap dan bumbu kacang yang gurih. Menu sarapan favorit mahasiswa.',
    image: '/assets/images/umkm/cerita.jpg',
    rating: 4.3,
    phone: '+62 812-1234567',
    openHours: { 
      open: '05:00', 
      close: '12:00', 
      days: ['Setiap Hari'] 
    },
    socialMedia: {
      whatsapp: 'https://wa.me/6281212345678'
    }
  },
  {
    id: '4',
    name: 'Warkop Pangestu',
    address: 'Dekat Kampus, Jakarta Pusat',
    lat: -6.1864562656584665,
    lng: 106.83761641840341,
    category: 'Minuman',
    description: 'Warung kopi legendaris dengan kopi tubruk authentic dan suasana hangat untuk nongkrong mahasiswa.',
    image: '/assets/images/umkm/baram-cafe.webp',
    rating: 4.4,
    phone: '+62 21-6543210',
    openHours: { 
      open: '06:00', 
      close: '23:00', 
      days: ['Setiap Hari'] 
    },
    socialMedia: {
      instagram: 'https://instagram.com/warkoppangestu'
    }
  },
  {
    id: '5',
    name: 'Soto Ayam Lamongan Pak Murianto',
    address: 'Dekat Kampus, Jakarta Pusat',
    lat: -6.187079534870674,
    lng: 106.83687569325322,
    category: 'Makanan',
    description: 'Soto ayam khas Lamongan dengan kuah bening yang segar dan ayam yang empuk.',
    image: '/assets/images/umkm/produk.webp',
    rating: 4.1,
    phone: '+62 856-7890123',
    openHours: { 
      open: '07:00', 
      close: '20:00', 
      days: ['Setiap Hari'] 
    },
    socialMedia: {
      whatsapp: 'https://wa.me/62856789012'
    }
  },
  {
    id: '6',
    name: 'Refa Laundry',
    address: 'Dekat Kampus, Jakarta Pusat',
    lat: -6.18645433486916,
    lng: 106.83794981104433,
    category: 'Jasa',
    description: 'Layanan laundry express untuk mahasiswa. Cuci kering, setrika, dan paket kiloan dengan harga terjangkau.',
    image: '/assets/images/umkm/ayam_geprek_77.webp',
    rating: 4.2,
    phone: '+62 878-9012345',
    openHours: { 
      open: '08:00', 
      close: '21:00', 
      days: ['Senin - Sabtu'] 
    },
    socialMedia: {
      whatsapp: 'https://wa.me/62878901234'
    }
  },
  // Deket Rumah
  {
    id: '7',
    name: 'Baram Cafe',
    address: 'Deket Rumah, Jakarta',
    lat: -6.236890906787093,
    lng: 106.96917319349133,
    category: 'Minuman',
    description: 'Cafe modern dengan berbagai pilihan kopi specialty dan suasana yang nyaman untuk bekerja atau bersantai.',
    image: '/assets/images/umkm/baram-cafe.webp',
    rating: 4.6,
    phone: '+62 21-5678901',
    openHours: { 
      open: '07:00', 
      close: '23:00', 
      days: ['Setiap Hari'] 
    },
    socialMedia: {
      instagram: 'https://instagram.com/baramcafe',
      facebook: 'https://facebook.com/baramcafe'
    }
  },
  {
    id: '8',
    name: 'Ayam Geprek 77',
    address: 'Deket Rumah, Jakarta',
    lat: -6.242962399725676,
    lng: 106.96793522329547,
    category: 'Makanan',
    description: 'Ayam geprek crispy dengan berbagai level kepedasan dan topping menarik.',
    image: '/assets/images/umkm/ayam_geprek_77.webp',
    rating: 4.3,
    phone: '+62 812-2345678',
    openHours: { 
      open: '11:00', 
      close: '23:00', 
      days: ['Setiap Hari'] 
    },
    socialMedia: {
      instagram: 'https://instagram.com/ayamgeprek77',
      whatsapp: 'https://wa.me/62812234567'
    }
  },
  {
    id: '9',
    name: 'Pecel Lele Has Lamongan',
    address: 'Deket Rumah, Jakarta',
    lat: -6.239230770312929,
    lng: 106.96879441216548,
    category: 'Makanan',
    description: 'Pecel lele khas Lamongan dengan sambal terasi yang pedas dan lele goreng yang renyah.',
    image: '/assets/images/umkm/geprek-cikini.webp',
    rating: 4.0,
    phone: '+62 823-4567890',
    openHours: { 
      open: '16:00', 
      close: '00:00', 
      days: ['Setiap Hari'] 
    },
    socialMedia: {
      whatsapp: 'https://wa.me/62823456789'
    }
  },
  {
    id: '10',
    name: 'Turkish Kebab & Pizza',
    address: 'Deket Rumah, Jakarta',
    lat: -6.239627524575201,
    lng: 106.96944413189696,
    category: 'Makanan',
    description: 'Restoran Turki autentik dengan kebab dan pizza yang lezat. Halal dan fresh ingredients.',
    image: '/assets/images/umkm/produk.webp',
    rating: 4.4,
    phone: '+62 834-5678901',
    openHours: { 
      open: '12:00', 
      close: '23:00', 
      days: ['Setiap Hari'] 
    },
    socialMedia: {
      instagram: 'https://instagram.com/turkishkebabpizza',
      whatsapp: 'https://wa.me/62834567890'
    }
  },
  {
    id: '11',
    name: 'Rumah Makan Sate Tegal H.Noto',
    address: 'Deket Rumah, Jakarta',
    lat: -6.2404568044782955,
    lng: 106.96987865720831,
    category: 'Makanan',
    description: 'Sate Tegal legendaris dengan bumbu kacang yang khas dan daging kambing pilihan.',
    image: '/assets/images/umkm/cerita.jpg',
    rating: 4.5,
    phone: '+62 845-6789012',
    openHours: { 
      open: '17:00', 
      close: '01:00', 
      days: ['Setiap Hari'] 
    },
    socialMedia: {
      whatsapp: 'https://wa.me/62845678901'
    }
  },
  {
    id: '12',
    name: 'Es Dawet Ireng Inkopol',
    address: 'Deket Rumah, Jakarta',
    lat: -6.23995273054431,
    lng: 106.97016947914739,
    category: 'Minuman',
    description: 'Minuman tradisional es dawet dengan cendol dan santan kelapa segar. Perfect untuk cuaca panas.',
    image: '/assets/images/umkm/Bakmi.webp',
    rating: 4.2,
    phone: '+62 856-7890123',
    openHours: { 
      open: '10:00', 
      close: '21:00', 
      days: ['Setiap Hari'] 
    },
    socialMedia: {
      whatsapp: 'https://wa.me/62856789012'
    }
  }
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
