import { Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Search, Filter, Users, Calendar, User, Eye, FileQuestion, Youtube, Instagram, Facebook } from 'lucide-react';

interface Ekstrakurikuler {
  id: number;
  nama_eskul: string;
  pembina: string;
  jadwal_latihan: string;
  deskripsi: string;
  gambar: string | null;
  encrypted_id: string
}

interface ProfilSekolah {
  id: number;
  nama_sekolah: string;
  logo: string | null;
  kontak: string;
  email: string;
  instagram: string;
  facebook: string;
  youtube: string;
  alamat: string;
}

interface EkstrakurikulerProps {
  ekstrakurikuler?: Ekstrakurikuler[];
  profil?: ProfilSekolah;
}

export default function Ekstrakurikuler() {
  const { ekstrakurikuler, profil } = usePage<EkstrakurikulerProps>().props;

  // Default value untuk menghindari undefined
  const ekstrakurikulerData = ekstrakurikuler || [];
  const profilData = profil || {
    id: 0,
    nama_sekolah: 'Sekolah',
    logo: null,
    kontak: '',
    email: '',
    instagram: '',
    facebook: '',
    youtube: '',
    alamat: ''
  };

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter ekstrakurikuler dengan safety check
  const filteredEkstrakurikuler = ekstrakurikulerData
    .filter(item => {
      if (!item) return false;

      const searchLower = searchTerm.toLowerCase();
      return (
        (item.nama_eskul || '').toLowerCase().includes(searchLower) ||
        (item.pembina || '').toLowerCase().includes(searchLower) ||
        (item.deskripsi || '').toLowerCase().includes(searchLower) ||
        (item.jadwal_latihan || '').toLowerCase().includes(searchLower)
      );
    })
    .sort((a, b) => (a.nama_eskul || '').localeCompare(b.nama_eskul || ''));

  if (!ekstrakurikuler) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-800 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
          <p>Memuat data ekstrakurikuler...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head title={`Ekstrakurikuler - ${profilData.nama_sekolah}`}>
        <link rel="preconnect" href="https://fonts.bunny.net" />
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
      </Head>

      <div className="bg-gradient-to-b from-blue-900 to-blue-800 min-h-screen">
        {/* Header - NAVBAR PUTIH DENGAN TEKS HITAM - FIXED */}
        <motion.header
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed inset-x-0 top-0 z-50"
        >
          <nav className="flex items-center justify-between p-6 lg:px-10 bg-white shadow-lg">
            <div className="flex lg:flex-1">
              <Link href="/" className="-m-1.5 p-1.5 flex items-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full mr-2">
                  {profilData.logo ? (
                    <img src={`/storage/assets/${profilData.logo}`} alt="Logo Sekolah" className="h-full w-full object-contain" />
                  ) : (
                    <div className="h-full w-full bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                      {profilData.nama_sekolah.charAt(0)}
                    </div>
                  )}
                </div>
                <span className="text-xl font-bold text-gray-900">{profilData.nama_sekolah}</span>
              </Link>
            </div>
            <div className="flex lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Buka menu utama</span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="size-6"
                  aria-hidden="true"
                >
                  <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
            <div className="hidden lg:flex lg:gap-x-12">
              <Link href="/#berita" className="text-sm/6 font-semibold text-gray-900 hover:text-blue-600">
                Berita
              </Link>
              <Link href="/#galeri" className="text-sm/6 font-semibold text-gray-900 hover:text-blue-600">
                Galeri
              </Link>
              <Link href="/#ekstrakulikuler" className="text-sm/6 font-semibold text-gray-900 hover:text-blue-600">
                Ekstrakurikuler
              </Link>
              <Link href="/#guru" className="text-sm/6 font-semibold text-gray-900 hover:text-blue-600">
                Guru
              </Link>
              <Link href="/#profil" className="text-sm/6 font-semibold text-gray-900 hover:text-blue-600">
                Profil
              </Link>
            </div>
            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
              <Link
                href='/login'
                className="text-sm/6 font-semibold text-gray-900 hover:text-blue-600"
              >
                Login<span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </nav>

          {/* Mobile menu dialog */}
          {mobileMenuOpen && (
            <div className="lg:hidden">
              <div className="fixed inset-0 z-50" />
              <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                <div className="flex items-center justify-between">
                  <Link href="/" className="-m-1.5 p-1.5 flex items-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white mr-2">
                      {profilData.logo ? (
                        <img src={`/storage/assets/${profilData.logo}`} alt="" />
                      ) : (
                        <span className="text-white font-bold">{profilData.nama_sekolah.charAt(0)}</span>
                      )}
                    </div>
                    <span className="text-xl font-bold text-gray-900">{profilData.nama_sekolah}</span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    className="-m-2.5 rounded-md p-2.5 text-gray-700"
                  >
                    <span className="sr-only">Tutup menu</span>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="size-6"
                      aria-hidden="true"
                    >
                      <path d="M6 18 18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
                <div className="mt-6 flow-root">
                  <div className="-my-6 divide-y divide-gray-500/10">
                    <div className="space-y-2 py-6">
                      <Link
                        href="/#profil"
                        className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Profil
                      </Link>
                      <Link
                        href="/#berita"
                        className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Berita
                      </Link>
                      <Link
                        href="/#galeri"
                        className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Galeri
                      </Link>
                      <Link
                        href="/#ekstrakulikuler"
                        className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Ekstrakurikuler
                      </Link>
                      <Link
                        href="/#guru"
                        className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Guru
                      </Link>
                    </div>
                    <div className="py-6">
                      <Link
                        href="/login"
                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                      >
                        Login
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.header>

        {/* Main Content */}
        <div className="pt-32 pb-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            {/* Header Section */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                Ekstrakurikuler {profilData.nama_sekolah}
              </h1>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                Berbagai kegiatan ekstrakurikuler untuk mengembangkan bakat, minat, dan kreativitas siswa
              </p>
            </motion.div>

            {/* Search Section */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="max-w-2xl mx-auto mb-12"
            >
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Cari ekstrakurikuler berdasarkan nama, pembina, atau deskripsi..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent backdrop-blur-sm"
                  />
                </div>

                {/* Results Info */}
                <div className="mt-4 flex justify-between items-center text-sm text-gray-300">
                  <span>
                    Menampilkan {filteredEkstrakurikuler.length} dari {ekstrakurikulerData.length} ekstrakurikuler
                  </span>
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="text-yellow-400 hover:text-yellow-300 font-semibold"
                    >
                      Hapus pencarian
                    </button>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Ekstrakurikuler Grid */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredEkstrakurikuler.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Link
                    href={`/ekstrakulikuler/${item.encrypted_id}`}
                    className="block bg-white/5 rounded-xl overflow-hidden backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 group h-full"
                  >
                    {/* Gambar Ekstrakurikuler */}
                    <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
                      {item.gambar && (
                        item.gambar.toLowerCase().endsWith('.jpg') ||
                        item.gambar.toLowerCase().endsWith('.jpeg') ||
                        item.gambar.toLowerCase().endsWith('.png') ||
                        item.gambar.toLowerCase().endsWith('.gif') ||
                        item.gambar.toLowerCase().endsWith('.webp') ? (
                          <img
                            src={`/storage/assets/${item.gambar}`}
                            alt={item.nama_eskul}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextElementSibling?.classList.remove('hidden');
                            }}
                          />
                        ) : (
                          <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                            <FileQuestion className="w-12 h-12 mb-2 opacity-50" />
                            <p className="text-sm">File bukan gambar</p>
                          </div>
                        )
                      )}
                      {/* Fallback ketika gambar error */}
                      <div className="hidden absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                        <FileQuestion className="w-12 h-12 mb-2 opacity-50" />
                        <p className="text-sm">Gambar tidak dapat dimuat</p>
                      </div>

                      {/* Default placeholder jika tidak ada gambar */}
                      {!item.gambar && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                          <Users className="w-12 h-12 mb-2 opacity-50" />
                          <p className="text-sm">{item.nama_eskul}</p>
                        </div>
                      )}

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>

                      {/* View Badge */}
                      <div className="absolute top-3 right-3">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-500/90 text-blue-900 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Eye className="w-3 h-3 mr-1" />
                          Detail
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 flex flex-col flex-grow">
                      <h3 className="font-semibold text-white text-sm line-clamp-2 mb-2 group-hover:text-yellow-400 transition-colors">
                        {item.nama_eskul}
                      </h3>
                      <p className="text-gray-300 text-xs line-clamp-3 mb-4 flex-grow">
                        {item.deskripsi && item.deskripsi.length > 120
                          ? `${item.deskripsi.substring(0, 120)}...`
                          : item.deskripsi
                        }
                      </p>

                      <div className="space-y-2 text-xs text-gray-400 mt-auto">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <User className="w-3 h-3 mr-1" />
                            <span>Pembina:</span>
                          </div>
                          <span className="font-semibold text-yellow-400">{item.pembina}</span>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            <span>Jadwal:</span>
                          </div>
                          <span className="font-semibold text-blue-400">{item.jadwal_latihan}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {/* Empty State */}
            {filteredEkstrakurikuler.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <div className="flex flex-col items-center justify-center">
                  <Users className="w-16 h-16 text-gray-400 mb-4 opacity-50" />
                  <p className="text-gray-300 text-lg font-medium mb-2">
                    {searchTerm ? 'Ekstrakurikuler tidak ditemukan' : 'Belum ada ekstrakurikuler tersedia'}
                  </p>
                  <p className="text-gray-400 text-sm mb-6">
                    {searchTerm ? 'Coba kata kunci lain atau hapus pencarian' : 'Data ekstrakurikuler akan ditampilkan di sini'}
                  </p>
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="inline-flex items-center px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-blue-900 font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
                    >
                      Tampilkan Semua Ekstrakurikuler
                    </button>
                  )}
                </div>
              </motion.div>
            )}

            {/* Back to Home */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-center mt-12"
            >
              <Link
                href="/"
                className="inline-flex items-center text-yellow-400 hover:text-yellow-300 font-semibold transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Kembali ke Halaman Utama
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-blue-900 py-12 border-t border-white/10">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center mb-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full mr-2">
                    {profilData.logo ? (
                      <img src={`/storage/assets/${profilData.logo}`} alt={`Logo ${profilData.nama_sekolah}`} className="h-full w-full object-contain" />
                    ) : (
                      <div className="h-full w-full bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                        {profilData.nama_sekolah.charAt(0)}
                      </div>
                    )}
                  </div>
                  <span className="text-2xl font-bold text-white">{profilData.nama_sekolah}</span>
                </div>
                <p className="text-sm text-gray-200 mb-4">
                  {profilData.alamat}<br/>
                  Telp: {profilData.kontak}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Kontak</h3>
                <div className="text-sm text-gray-200 space-y-2">
                  <p>Email: {profilData.email}</p>
                  <p>Telepon: {profilData.kontak}</p>
                  <p>Alamat: {profilData.alamat}</p>
                  <br/>
                  <div className="flex gap-4">
                    {profilData.youtube && (
                      <div className="flex align-baseline gap-2">
                        <Youtube className="w-5 h-5" />
                        <a className='mt-0.5 no-underline hover:underline' href={profilData.youtube} target='_blank'>Youtube</a>
                      </div>
                    )}
                    {profilData.instagram && (
                      <div className="flex align-baseline gap-2">
                        <Instagram className="w-5 h-5" />
                        <a className='mt-0.5 no-underline hover:underline' href={profilData.instagram} target='_blank'>Instagram</a>
                      </div>
                    )}
                    {profilData.facebook && (
                      <div className="flex align-baseline gap-2">
                        <Facebook className="w-5 h-5" />
                        <a className='mt-0.5 no-underline hover:underline' href={profilData.facebook} target='_blank'>Facebook</a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 border-t border-white/10 pt-8">
              <p className="text-center text-sm text-gray-400">
                © {new Date().getFullYear()} {profilData.nama_sekolah}. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
