import { Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Search, Filter, Eye, ImageIcon, Play, FileQuestion, Calendar, Facebook, Instagram, Youtube } from 'lucide-react';

interface Galeri {
  id: number;
  judul: string;
  keterangan: string;
  file: string;
  kategori: string;
  tanggal: string;
  encrypted_id: string,
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

interface GaleriProps {
  galeri: Galeri[];
  profil: ProfilSekolah;
  kategoriList: string[];
}

export default function Galeri() {
  const { galeri, profil, kategoriList } = usePage<GaleriProps>().props;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedKategori, setSelectedKategori] = useState<string>('semua');
  const [playingVideo, setPlayingVideo] = useState<number | null>(null);

  // Filter functions
  const isImage = (filename: string) => {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
    return imageExtensions.some(ext =>
      filename.toLowerCase().endsWith(ext)
    );
  }

  const isVideo = (filename: string) => {
    const videoExtensions = ['.mp4', '.avi', '.mkv', '.mov', '.wmv', '.webm'];
    return videoExtensions.some(ext =>
      filename.toLowerCase().endsWith(ext)
    );
  }

  const handleVideoPlay = (id: number) => {
    setPlayingVideo(id);
  }

  const handleVideoPause = () => {
    setPlayingVideo(null);
  }

  // Filter dan sort galeri
  const filteredGaleri = galeri
    .filter(item => {
      const matchesSearch = item.judul.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.keterangan.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.kategori.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesKategori = selectedKategori === 'semua' || item.kategori === selectedKategori;

      return matchesSearch && matchesKategori;
    })
    .sort((a, b) => new Date(b.tanggal).getTime() - new Date(a.tanggal).getTime());

  return (
    <>
      <Head title={`Galeri - ${profil.nama_sekolah}`}>
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
              <h2 className="text-3xl lg:text-3xl font-bold text-white mb-4">
                Galeri {profil.nama_sekolah}
              </h2>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                Kumpulan foto dan video dokumentasi kegiatan sekolah
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
                        placeholder="Cari galeri berdasarkan judul, keterangan, atau kategori..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent backdrop-blur-sm"
                      />
                    </div>
                  </div>

                  {/* Category Filter */}
                  <div className="flex items-center gap-3">
                    <Filter className="w-5 h-5 text-gray-400" />
                    <select
                      value={selectedKategori}
                      onChange={(e) => setSelectedKategori(e.target.value)}
                      className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent backdrop-blur-sm"
                    >
                      <option value="semua">Semua Kategori</option>
                      {kategoriList.map(kategori => (
                        <option key={kategori} value={kategori}>{kategori}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Results Info */}
                <div className="mt-4 flex justify-between items-center text-sm text-gray-300">
                  <span>
                    Menampilkan {filteredGaleri.length} dari {galeri.length} media
                  </span>
                  {(searchTerm || selectedKategori !== 'semua') && (
                    <button
                      onClick={() => {
                        setSearchTerm('');
                        setSelectedKategori('semua');
                      }}
                      className="text-yellow-400 hover:text-yellow-300 font-semibold"
                    >
                      Hapus filter
                    </button>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Galeri Grid */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filteredGaleri.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Link
                    href={`/galeri/${item.encrypted_id}`}
                    className="block bg-white/5 rounded-xl overflow-hidden backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 group h-full"
                  >
                    {/* Media Container */}
                    <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
                      {item.file ? (
                        <>
                          {isImage(item.file) ? (
                            // TAMPILAN UNTUK GAMBAR
                            <img
                              src={`/storage/assets/${item.file}`}
                              alt={item.judul}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                              onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextElementSibling?.classList.remove('hidden');
                              }}
                            />
                          ) : isVideo(item.file) ? (
                            // TAMPILAN UNTUK VIDEO
                            <div className="relative w-full h-full">
                              <video
                                src={`/storage/assets/${item.file}`}
                                className="w-full h-full object-cover"
                                controls={playingVideo === item.id}
                                onPlay={() => handleVideoPlay(item.id)}
                                onPause={handleVideoPause}
                                onEnded={handleVideoPause}
                                muted
                                preload="metadata"
                              >
                                Your browser does not support the video tag.
                              </video>
                              {playingVideo !== item.id && (
                                <div
                                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 cursor-pointer group-hover:bg-opacity-30 transition-colors"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleVideoPlay(item.id);
                                  }}
                                >
                                  <div className="bg-white bg-opacity-90 rounded-full p-3 group-hover:scale-110 transition-transform">
                                    <Play className="w-6 h-6 text-gray-800 fill-current" />
                                  </div>
                                </div>
                              )}
                            </div>
                          ) : (
                            // TAMPILAN UNTUK FILE LAINNYA
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 p-4">
                              <FileQuestion className="w-12 h-12 mb-2 opacity-50" />
                              <p className="text-sm text-center">File tidak dapat dimuat</p>
                              <p className="text-xs mt-1 opacity-75 truncate max-w-full px-2">
                                {item.file}
                              </p>
                            </div>
                          )}

                          {/* Fallback ketika file error */}
                          <div className="hidden absolute inset-0 flex flex-col items-center justify-center text-gray-400 p-4">
                            <FileQuestion className="w-12 h-12 mb-2 opacity-50" />
                            <p className="text-sm text-center">File tidak dapat dimuat</p>
                          </div>
                        </>
                      ) : (
                        /* Placeholder ketika tidak ada file */
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                          <ImageIcon className="w-12 h-12 mb-2 opacity-50" />
                          <p className="text-sm">Tidak ada file</p>
                        </div>
                      )}

                      {/* Category Badge */}
                      {item.kategori && (
                        <div className="absolute top-3 left-3">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-500/90 text-blue-900 backdrop-blur-sm">
                            {item.kategori}
                          </span>
                        </div>
                      )}

                      {/* Media Type Badge */}
                      <div className="absolute top-3 right-3">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/90 text-white backdrop-blur-sm">
                          {isVideo(item.file) ? (
                            <>
                              <Play className="w-3 h-3 mr-1" />
                              Video
                            </>
                          ) : (
                            <>
                              <ImageIcon className="w-3 h-3 mr-1" />
                              Foto
                            </>
                          )}
                        </span>
                      </div>

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>

                      {/* View Badge */}
                      <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-white/90 text-gray-800 backdrop-blur-sm">
                          <Eye className="w-3 h-3 mr-1" />
                          Lihat
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 flex flex-col flex-grow">
                      <h3 className="font-semibold text-white text-sm line-clamp-2 mb-2 group-hover:text-yellow-400 transition-colors">
                        {item.judul}
                      </h3>

                      {item.keterangan && (
                        <p className="text-gray-300 text-xs line-clamp-2 mb-3 flex-grow">
                          {item.keterangan}
                        </p>
                      )}

                      <div className="flex justify-between items-center text-xs text-gray-400 mt-auto">
                        <div className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          <span>
                            {item.tanggal ? new Date(item.tanggal).toLocaleDateString('id-ID', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric'
                            }) : 'No date'}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          {isVideo(item.file) ? (
                            <Play className="w-3 h-3" />
                          ) : (
                            <ImageIcon className="w-3 h-3" />
                          )}
                          <span>{isVideo(item.file) ? 'Video' : 'Foto'}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {/* Empty State */}
            {filteredGaleri.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <div className="flex flex-col items-center justify-center">
                  <ImageIcon className="w-16 h-16 text-gray-400 mb-4 opacity-50" />
                  <p className="text-gray-300 text-lg font-medium mb-2">
                    {searchTerm || selectedKategori !== 'semua' ? 'Media tidak ditemukan' : 'Belum ada galeri tersedia'}
                  </p>
                  <p className="text-gray-400 text-sm mb-6">
                    {searchTerm || selectedKategori !== 'semua' ? 'Coba kata kunci lain atau hapus filter' : 'Galeri akan ditampilkan di sini'}
                  </p>
                  {(searchTerm || selectedKategori !== 'semua') && (
                    <button
                      onClick={() => {
                        setSearchTerm('');
                        setSelectedKategori('semua');
                      }}
                      className="inline-flex items-center px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-blue-900 font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
                    >
                      Tampilkan Semua Galeri
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
