// Utility function untuk handle gambar UMKM
export function getImagePath(imagePath: string, fallback: string = '/assets/images/umkm/placeholder.jpg'): string {
  // Daftar gambar yang pasti ada
  const availableImages = [
    '/assets/images/umkm/Bakmi.webp',
    '/assets/images/umkm/ayam_geprek_77.webp',
    '/assets/images/umkm/baram-cafe.webp',
    '/assets/images/umkm/cerita.jpg',
    '/assets/images/umkm/geprek-cikini.webp',
    '/assets/images/umkm/produk.webp'
  ];

  // Jika gambar ada dalam daftar, return path asli
  if (availableImages.includes(imagePath)) {
    return imagePath;
  }

  // Jika tidak, return fallback
  return fallback;
}

export function getAvatarPath(avatarPath: string, fallback: string = '/assets/images/avatar/female1.png'): string {
  const availableAvatars = [
    '/assets/images/avatar/female1.png',
    '/assets/images/avatar/female2.png',
    '/assets/images/avatar/female3.png',
    '/assets/images/avatar/male1.png',
    '/assets/images/avatar/male2.png',
    '/assets/images/avatar/male3.png'
  ];

  if (availableAvatars.includes(avatarPath)) {
    return avatarPath;
  }

  return fallback;
}
