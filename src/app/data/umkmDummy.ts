export interface UMKM {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  category: string;
  description?: string;
  phone?: string;
  gallery?: string[];
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
const defaultImage = '/assets/images/umkm/placeholder.jpg';
const defaultRating = 4.0;
const defaultDescription = 'Deskripsi UMKM belum tersedia.';

export const umkmDummy: UMKM[] = [
  {
    id: '1',
    name: 'Bakmi Roxy Cikini',
    address: 'Jl. Cikini Raya No.51, RT.16/RW.1 RT.16/RW.1, Cikini, Kec. Menteng, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta',
    lat: -6.188528568629569,
    lng: 106.83733248404994,
    category: 'Makanan',
    description: 'Bakmi legendaris dengan cita rasa autentik dan porsi melimpah. Sudah berdiri sejak tahun 1980 dan menjadi favorit warga Jakarta Pusat.',
    gallery: [
      '/assets/images/umkm/bakmi-cikini.webp',
      '/assets/images/umkm/Bakmi.webp',
      '/assets/images/umkm/bakmi-view.webp',
      '/assets/images/umkm/bakmi-produk.webp',
      '/assets/images/umkm/bakmi-produk2.webp',
      '/assets/images/umkm/bakmi-proses.webp',
    ],
    rating: 4.5,
    openHours: { 
      open: '08:00', 
      close: '00:00', 
      days: ['Setiap Hari'] 
    }
  },
  {
    id: '2',
    name: 'Ketoprak Masjid Cut Meutia',
    address: 'Jl. Taman Cut Mutiah No.4, RT.4/RW.9, Kb. Sirih, Kec. Menteng, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta',
    lat: -6.1869909736074975,
    lng: 106.83349263110313,
    category: 'Makanan',
    description: 'Ketoprak ini adalah legenda kuliner kaki lima di depan Masjid Cut Meutia, Gondangdia. Dikenal karena keautentikannya, bumbu kacangnya selalu diulek *fresh* langsung di piring, menghasilkan rasa yang kental, gurih, dan pedas yang bisa diatur sesuai selera. Dengan harga terjangkau (sekitar Rp21.000 - Rp25.000), ini adalah pilihan wajib bagi pecinta ketoprak di Jakarta Pusat.',
    gallery: [
      '/assets/images/umkm/ketoprak-view.webp',
      '/assets/images/umkm/ketoprak-cutMeutia.webp',
      '/assets/images/umkm/ketoprak-produk.webp',
      '/assets/images/umkm/ketoprak-produk2.webp',
      '/assets/images/umkm/ketoprak-produk3.webp',
      '/assets/images/umkm/ketoprak-produk4.webp',
    ],
    rating: 4.5,
    openHours: { 
      open: '10:00', 
      close: '22:00', 
      days: ['Senin - Sabtu'] 
    },
  },
  {
    id: '3',
    name: 'Nasi Uduk Ibu Mia',
    address: ' Jl. Kalipasir Gang Tembok No.8A, RT.3/RW.10, Kb. Sirih, Kec. Menteng, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta',
    lat: -6.18639010092864,
    lng: 106.83746098220887,
    category: 'Makanan',
    description: 'Nasi uduk dengan lauk pauk lengkap dan bumbu kacang yang gurih. Menu sarapan favorit mahasiswa.',
    gallery: [
      '/assets/images/umkm/nasiuduk-view.webp',
      '/assets/images/umkm/nasiuduk-cikini.webp',
      '/assets/images/umkm/nasiuduk-produk.webp',
      '/assets/images/umkm/nasiuduk-produk2.webp',
      '/assets/images/umkm/nasiuduk-produk3.webp',
    ],
    rating: 4.5,
    phone: '+62 898-9158008',
    openHours: { 
      open: '05:30', 
      close: '11:00', 
      days: ['Setiap Hari'] 
    },
    socialMedia: {
      whatsapp: 'https://wa.me/628989158008'
    }
  },
  {
    id: '4',
    name: 'Bubur Ayam H. Jewo',
    address: 'Jl. Taman Cut Mutiah No.1 10 5 10, RT.10/RW.5, Kb. Sirih, Kec. Menteng, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta',
    lat: -6.186987752529305,
    lng: 106.83360178758743,
    category: 'Makanan',
    description: 'Bubur Ayam H. Jewo adalah warung kaki lima legendaris yang selalu menjadi destinasi sarapan pagi di kawasan Menteng. Bubur disajikan dengan tekstur kental yang lembut, dilengkapi suwiran ayam, kacang, kerupuk, dan kuah kaldu kuning khas yang gurih. Dijual di pinggir jalan, gerai ini buka sejak subuh dan sering habis sebelum jam 10 pagi!',
    gallery: [
      '/assets/images/umkm/bubur-menteng.webp',
      '/assets/images/umkm/bubur-view.webp',
      '/assets/images/umkm/bubur-proses.webp',
      '/assets/images/umkm/bubur-produk.webp',
    ],
    rating: 4.4,
    phone: '+62 85210321777',
    openHours: { 
      open: '05:00', 
      close: '10:30', 
      days: ['Setiap Hari'] 
    },
    socialMedia: {
      whatsapp: 'https://wa.me/6285210321777'
    }
  },
  {
    id: '5',
    name: 'Soto Ayam Lamongan Pak Murianto',
    address: 'Jl. Kalipasir No.13-14 1, RT.1/RW.10, Cikini, Kec. Menteng, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10330',
    lat: -6.187079534870674,
    lng: 106.83687569325322,
    category: 'Makanan',
    description: 'Soto ayam khas Lamongan dengan kuah bening yang segar dan ayam yang empuk.',
    gallery: [
      '/assets/images/umkm/sotolamongan.jpg',
      '/assets/images/umkm/sotolamongan-produk.webp',
      '/assets/images/umkm/sotolamongan-view.webp',
    ],
    rating: 4.1,
    phone: '+62 856-7890123',
    openHours: { 
      open: '06:00', 
      close: '17:00', 
      days: ['Setiap Hari'] 
    },
    socialMedia: {
      whatsapp: 'https://wa.me/62856789012'
    }
  },
  {
    id: '6',
    name: 'Es Kolding Harum Since 1979',
    address: 'Jl.Wijaya Kusuma 1, RT.1/RW.7, Malaka Jaya, Kec. Duren Sawit, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta',
    lat: -6.222485105907088,
    lng: 106.93222250924728,
    category: 'Minuman',
    description: 'Sejak 1979, Es Kolding (Kolak Dingin) ini telah menjadi salah satu kuliner legendaris di Duren Sawit. Dijual dari gerobak sederhana di pinggir jalan, kolak dingin ini terkenal dengan kuah santan dan gula merahnya yang harum alami, disajikan dengan es serut. Pilihan yang sempurna dan menyegarkan untuk melepas dahaga di sore hari.',
    gallery: [
      '/assets/images/umkm/es-kolding.webp',
      '/assets/images/umkm/es-kolding-produk.webp',
      '/assets/images/umkm/es-kolding-produk2.webp',
    ],
    rating: 4.2,
    phone: '+62 858-10704123',
    openHours: { 
      open: '14:00', 
      close: '21:00', 
      days: ['Setiap Hari'] 
    },
    socialMedia: {
      whatsapp: 'https://wa.me/62878901234'
    }
  },
  {
    id: '7',
    name: 'Gudeg Jogja Bu Tinah',
    address: 'Jl. Srikaya II No.RT.2, RT.5/RW.7, Kb. Sirih, Kec. Menteng, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta',
    lat: -6.1866697620068,
    lng: 106.83310821223283,
    category: 'Makanan',
    description: 'Gudeg Jogja Bu Tinah adalah *hidden gem* kuliner kaki lima yang populer, terletak tidak jauh dari Stasiun Gondangdia. Gudeg di sini terkenal dengan rasa manis gurih otentik khas Jogja, disajikan dengan krecek pedas dan pilihan lauk lengkap. Tempat ini menjadi favorit pekerja kantoran dan komuter untuk sarapan maupun makan malam.',
    gallery: [
      '/assets/images/umkm/gudeg-menteng.webp',
      '/assets/images/umkm/gudeg-produk.webp',
      '/assets/images/umkm/gudeg-view.webp',
      '/assets/images/umkm/gudeg-produk2.webp',
      '/assets/images/umkm/gudeg-produk3.webp',
      '/assets/images/umkm/gudeg-produk4.webp',
      '/assets/images/umkm/gudeg-produk5.webp',
    ],
    rating: 4.6,
    openHours: { 
      open: '07:00', 
      close: '23:00', 
      days: ['Setiap Hari'] 
    },
  },
  {
    id: '8',
    name: 'Ayam Geprek 77 Kranji',
    address: 'Jl. Patriot, RT.004/RW.003, Jakasampurna, Kec. Bekasi Bar., Kota Bks',
    lat: -6.242962399725676,
    lng: 106.96793522329547,
    category: 'Makanan',
    description: 'Ayam geprek crispy dengan berbagai level kepedasan dan topping menarik.',
    gallery: [
      '/assets/images/umkm/ayamGeprek77.webp',
      '/assets/images/umkm/ayamGeprek77-produk.webp',
      '/assets/images/umkm/ayamGeprek77-produk2.webp',
    ],
    rating: 4.3,
    phone: '+62 896-1218-0158',
    openHours: { 
      open: '10:00', 
      close: '22:00', 
      days: ['Setiap Hari'] 
    },

  },
  {
    id: '9',
    name: 'Pecel Lele Khas Lamongan',
    address: 'Jl. Al-Ikhlas No.74, RT.004/RW.018, Jakasampurna, Kec. Bekasi Bar., Kota Bks, Jawa Barat 17145',
    lat: -6.239230770312929,
    lng: 106.96879441216548,
    category: 'Makanan',
    description: 'Pecel lele khas Lamongan dengan sambal terasi yang pedas dan lele goreng yang renyah.',
    gallery: [
      '/assets/images/umkm/pecel-lele.webp',
      '/assets/images/umkm/pecel-lele-produk.webp',
      '/assets/images/umkm/pecel-lele-produk2.webp',
    ],
    rating: 4.5,
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
    name: 'Martabak Populer Indomaret Merak',
    address: 'Jl. Merak Raya No.29, RT.004/RW.018, Jakasampurna, Kec. Bekasi Bar., Kota Bks',
    lat: -6.239627524575201,
    lng: 106.96944413189696,
    category: 'Makanan',
    description: 'Martabak Populer adalah gerai martabak manis dan telur yang selalu ramai di pinggir jalan, tepat di sebelah Indomaret Merak. Meskipun sederhana, martabak di sini terkenal dengan adonan yang lembut, topping melimpah, dan harganya yang pas di kantong.',
    gallery: [
      '/assets/images/umkm/martabak-view.webp',
      '/assets/images/umkm/martabak-merak.webp',
      '/assets/images/umkm/martabak-produk.webp',
      '/assets/images/umkm/martabak-produk2.webp',
      '/assets/images/umkm/martabak-produk3.webp',
      '/assets/images/umkm/martabak-produk4.webp',
    ],
    rating: 4.5,
    openHours: { 
      open: '16:00', 
      close: '23:00', 
      days: ['Senin - Jumat'] 
    },
  },
  {
    id: '11',
    name: 'MYS-BAR COFFE',
    address: 'Jl. Kemang Timur No.46, RT.10/RW.4, Bangka, Kec. Mampang Prpt., Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta',
    lat: -6.237621174303672,
    lng: 106.85048455278726,
    category: 'Kedai Kopi',
    description: 'MYS-BAR COFFE adalah tempat nongkrong modern yang menyajikan kopi dan minuman kekinian dengan harga terjangkau. Suasana yang nyaman dan estetis sangat cocok untuk bersantai atau bekerja.',
    gallery: [
      '/assets/images/umkm/mysbar-coffe.webp',
      '/assets/images/umkm/mysbar-product.webp',
      '/assets/images/umkm/mysbar-view.webp',
      '/assets/images/umkm/mysbar-view2.webp',
      '/assets/images/umkm/mysbar-product2.webp',
      '/assets/images/umkm/mysbar-product3.webp',
      '/assets/images/umkm/mysbar-product4.webp',
    ],
    rating: 4.8,
    phone: '+62 821-3335-3110',
    openHours: { 
      open: '11:00', 
      close: '23:00', 
      days: ['Setiap Hari'] 
    },
  },
  {
    id: '12',
    name: 'Mie Ayam Bakso Kangen',
    address: 'Jl. Swadaya Raya No.1 Blok k, RT.1/RW.5, Duren Sawit, Durensawit, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta',
    lat: -6.236547609513081,
    lng: 106.91800025659701,
    category: 'Makanan',
    description: 'Mie Ayam Bakso Kangen adalah warung kaki lima populer di kawasan Duren Sawit. Dikenal dengan mie ayam dengan bumbu racikan khas yang lezat dan bakso urat/halus yang kenyal. Tempat sederhana ini cocok untuk makan siang yang hangat dan mengenyangkan, dengan harga yang ramah di kantong warga sekitar.',
    gallery: [
      '/assets/images/umkm/bakso-kangen.webp',
      '/assets/images/umkm/bakso-kangen-produk.webp',
      '/assets/images/umkm/bakso-kangen-produk2.webp',
    ],
    rating: 4.5,
    openHours: { 
      open: '10:00', 
      close: '21:00', 
      days: ['Setiap Hari'] 
    },
  },

];

// ===== Helper untuk UMKMPopupCard =====
export function getUMKMForPopup(id: string) {
  const umkm = umkmDummy.find(u => u.id === id);
  if (!umkm) return null;

  return {
    ...umkm,
    gallery: umkm.gallery && umkm.gallery.length > 0 
      ? umkm.gallery 
      : defaultImage,
    rating: umkm.rating || defaultRating,
    description: umkm.description || defaultDescription,
  };
}
