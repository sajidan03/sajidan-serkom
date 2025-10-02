import { Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User, Search, Filter, Eye, FileQuestion, Facebook, Instagram, Youtube } from 'lucide-react';

interface Berita {
  id: number;
  judul: string;
  isi: string;
  tanggal: string;
  gambar: string;
  user?: User;
}

interface User {
  id: number;
  name: string;
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

interface BeritaProps {
  berita: Berita[];
  profil: ProfilSekolah;
}

export default function Berita() {
  const { berita, profil } = usePage<BeritaProps>().props;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'terbaru' | 'terlama'>('terbaru');

  // Filter dan sort berita
  const filteredBerita = berita
    .filter(item =>
      item.judul.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.isi.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.user?.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'terbaru') {
        return new Date(b.tanggal).getTime() - new Date(a.tanggal).getTime();
      } else {
        return new Date(a.tanggal).getTime() - new Date(b.tanggal).getTime();
      }
    });

  return (
    <>
      <Head title={`Berita - ${profil.nama_sekolah}`}>
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
                  <img src={`/storage/assets/${profil.logo}`} alt="Logo Sekolah" className="h-full w-full object-contain" />
                </div>
                <span className="text-xl font-bold text-gray-900">{profil.nama_sekolah}</span>
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
                Ekstrakulikuler
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
                      <img src={`/storage/assets/${profil.logo}`} alt="" />
                    </div>
                    <span className="text-xl font-bold text-gray-900">{profil.nama_sekolah}</span>
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
                        Ekstrakulikuler
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
                Berita {profil.nama_sekolah}
              </h1>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                Informasi terkini, kegiatan terbaru, dan update dari sekolah kami
              </p>
            </motion.div>

            {/* Search and Filter Section */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="max-w-4xl mx-auto mb-12"
            >
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
                <div className="flex flex-col lg:flex-row gap-4 items-center">
                  {/* Search Bar */}
                  <div className="flex-1 w-full">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        placeholder="Cari berita berdasarkan judul, isi, atau penulis..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent backdrop-blur-sm"
                      />
                    </div>
                  </div>

                  {/* Sort Filter */}
                  <div className="flex items-center gap-3">
                    <Filter className="w-5 h-5 text-gray-400" />
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as 'terbaru' | 'terlama')}
                      className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent backdrop-blur-sm"
                    >
                      <option value="terbaru">Terbaru</option>
                      <option value="terlama">Terlama</option>
                    </select>
                  </div>
                </div>

                {/* Results Info */}
                <div className="mt-4 flex justify-between items-center text-sm text-gray-300">
                  <span>
                    Menampilkan {filteredBerita.length} dari {berita.length} berita
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

            {/* Berita Grid */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredBerita.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Link
                    href={`/berita/${item.id}`}
                    className="block bg-white/5 rounded-xl overflow-hidden backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 group h-full"
                  >
                    {/* Gambar Berita */}
                    <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
                      {item.gambar && (
                        item.gambar.toLowerCase().endsWith('.jpg') ||
                        item.gambar.toLowerCase().endsWith('.jpeg') ||
                        item.gambar.toLowerCase().endsWith('.png') ||
                        item.gambar.toLowerCase().endsWith('.gif') ||
                        item.gambar.toLowerCase().endsWith('.webp') ? (
                          <img
                            src={`/storage/assets/${item.gambar}`}
                            alt={item.judul}
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

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>

                      {/* Read More Badge */}
                      <div className="absolute top-3 right-3">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-500/90 text-blue-900 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Eye className="w-3 h-3 mr-1" />
                          Baca
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 flex flex-col flex-grow">
                      <h3 className="font-semibold text-white text-sm line-clamp-2 mb-2 group-hover:text-yellow-400 transition-colors">
                        {item.judul}
                      </h3>
                      <p className="text-gray-300 text-xs line-clamp-3 mb-4 flex-grow">
                        {item.isi && item.isi.length > 120
                          ? `${item.isi.substring(0, 120)}...`
                          : item.isi
                        }
                      </p>
                      <div className="flex justify-between items-center text-xs text-gray-400 mt-auto">
                        <div className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          <span>{new Date(item.tanggal).toLocaleDateString('id-ID')}</span>
                        </div>
                        <div className="flex items-center">
                          <User className="w-3 h-3 mr-1" />
                          <span>{item.user?.name || 'Admin'}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {/* Empty State */}
            {filteredBerita.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <div className="flex flex-col items-center justify-center">
                  <Search className="w-16 h-16 text-gray-400 mb-4 opacity-50" />
                  <p className="text-gray-300 text-lg font-medium mb-2">
                    {searchTerm ? 'Berita tidak ditemukan' : 'Belum ada berita tersedia'}
                  </p>
                  <p className="text-gray-400 text-sm mb-6">
                    {searchTerm ? 'Coba kata kunci lain atau hapus pencarian' : 'Berita akan ditampilkan di sini'}
                  </p>
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="inline-flex items-center px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-blue-900 font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
                    >
                      Tampilkan Semua Berita
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
                    <img src={`/storage/assets/${profil.logo}`} alt={`Logo ${profil.nama_sekolah}`} className="h-full w-full object-contain" />
                  </div>
                  <span className="text-2xl font-bold text-white">{profil.nama_sekolah}</span>
                </div>
                <p className="text-sm text-gray-200 mb-4">
                  {profil.alamat}<br/>
                  Telp: {profil.kontak}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Kontak</h3>
                <div className="text-sm text-gray-200 space-y-2">
                  <p>Email: {profil.email}</p>
                  <p>Telepon: {profil.kontak}</p>
                  <p>Alamat: {profil.alamat}</p>
                  <br/>
                  <div className="flex gap-4">
                    <div className="flex align-baseline gap-2">
                      <Youtube className="w-5 h-5" />
                      <a className='mt-0.5 no-underline hover:underline' href={profil.youtube} target='_blank'>Youtube</a>
                    </div>
                    <div className="flex align-baseline gap-2">
                      <Instagram className="w-5 h-5" />
                      <a className='mt-0.5 no-underline hover:underline' href={profil.instagram} target='_blank'>Instagram</a>
                    </div>
                    <div className="flex align-baseline gap-2">
                      <Facebook className="w-5 h-5" />
                      <a className='mt-0.5 no-underline hover:underline' href={profil.facebook} target='_blank'>Facebook</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 border-t border-white/10 pt-8">
              <p className="text-center text-sm text-gray-400">
                © {new Date().getFullYear()} {profil.nama_sekolah}. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
