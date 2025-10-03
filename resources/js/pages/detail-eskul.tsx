import { Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Users, Calendar, User, Share2, Clock, MapPin, FileQuestion, Youtube, Instagram, Facebook } from 'lucide-react';

interface Ekstrakurikuler {
  id: number;
  nama_eskul: string;
  pembina: string;
  jadwal_latihan: string;
  deskripsi: string;
  gambar: string | null;
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

interface DetailEkstrakurikulerProps {
  ekstrakurikuler: Ekstrakurikuler;
  profil: ProfilSekolah;
  ekstrakurikulerLain: Ekstrakurikuler[];
}

export default function DetailEkstrakurikuler() {
  const { ekstrakurikuler, profil, ekstrakurikulerLain } = usePage<DetailEkstrakurikulerProps>().props;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showShareTooltip, setShowShareTooltip] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: ekstrakurikuler.nama_eskul,
          text: ekstrakurikuler.deskripsi,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setShowShareTooltip(true);
      setTimeout(() => setShowShareTooltip(false), 2000);
    }
  };

  return (
    <>
      <Head title={`${ekstrakurikuler.nama_eskul} - ${profil.nama_sekolah}`}>
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
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            {/* Back Button */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mb-8"
            >
              <Link
                href="/ekstrakurikuler"
                className="inline-flex items-center text-yellow-400 hover:text-yellow-300 font-semibold transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Kembali ke Ekstrakurikuler
              </Link>
            </motion.div>

            {/* Content */}
            <motion.article
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden"
            >
              {/* Featured Image */}
              <div className="relative h-80 lg:h-96 w-full overflow-hidden">
                {ekstrakurikuler.gambar ? (
                  <img
                    src={`/storage/assets/${ekstrakurikuler.gambar}`}
                    alt={ekstrakurikuler.nama_eskul}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 bg-gradient-to-br from-gray-800 to-gray-900">
                    <Users className="w-16 h-16 mb-4 opacity-50" />
                    <p className="text-lg">Tidak ada gambar</p>
                  </div>
                )}
                {/* Fallback ketika gambar error */}
                <div className="hidden absolute inset-0 flex flex-col items-center justify-center text-gray-400 bg-gradient-to-br from-gray-800 to-gray-900">
                  <FileQuestion className="w-16 h-16 mb-4 opacity-50" />
                  <p className="text-lg">Gambar tidak dapat dimuat</p>
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                {/* Title on Image */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="text-2xl lg:text-4xl font-bold text-white leading-tight"
                  >
                    {ekstrakurikuler.nama_eskul}
                  </motion.h1>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 lg:p-8">
                {/* Meta Information */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="flex flex-wrap items-center gap-4 lg:gap-6 text-gray-300 mb-6 pb-6 border-b border-white/10"
                >
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    <span className="text-sm">Pembina: {ekstrakurikuler.pembina}</span>
                  </div>

                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span className="text-sm">{ekstrakurikuler.jadwal_latihan}</span>
                  </div>

                  {ekstrakurikuler.jumlah_anggota && (
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-2" />
                      <span className="text-sm">{ekstrakurikuler.jumlah_anggota} Anggota</span>
                    </div>
                  )}

                  {/* Share Button */}
                  <div className="relative ml-auto">
                    <button
                      onClick={handleShare}
                      className="flex items-center text-yellow-400 hover:text-yellow-300 transition-colors"
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      <span className="text-sm">Bagikan</span>
                    </button>

                    {/* Share Tooltip */}
                    {showShareTooltip && (
                      <div className="absolute top-full right-0 mt-2 px-3 py-2 bg-green-500 text-white text-xs rounded-lg shadow-lg">
                        Link berhasil disalin!
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* Description */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="mb-8"
                >
                  <h2 className="text-xl font-semibold text-white mb-4">Deskripsi Kegiatan</h2>
                  <div className="text-gray-200 leading-relaxed text-justify space-y-4">
                    {ekstrakurikuler.deskripsi.split('\n').map((paragraph, index) => (
                      paragraph.trim() ? (
                        <p key={index} className="mb-4">
                          {paragraph}
                        </p>
                      ) : (
                        <br key={index} />
                      )
                    ))}
                  </div>
                </motion.div>

                {/* Information Card */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                  className="bg-white/5 rounded-lg p-6"
                >
                  <h3 className="text-lg font-semibold text-white mb-4">Informasi Kegiatan</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-3 text-yellow-400" />
                      <div>
                        <div className="font-medium">Nama Ekstrakurikuler</div>
                        <div>{ekstrakurikuler.nama_eskul}</div>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-3 text-yellow-400" />
                      <div>
                        <div className="font-medium">Pembina</div>
                        <div>{ekstrakurikuler.pembina}</div>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-3 text-yellow-400" />
                      <div>
                        <div className="font-medium">Jadwal Latihan</div>
                        <div>{ekstrakurikuler.jadwal_latihan}</div>
                      </div>
                    </div>

                    {ekstrakurikuler.tempat_latihan && (
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-3 text-yellow-400" />
                        <div>
                          <div className="font-medium">Tempat Latihan</div>
                          <div>{ekstrakurikuler.tempat_latihan}</div>
                        </div>
                      </div>
                    )}

                    {ekstrakurikuler.jumlah_anggota && (
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-3 text-yellow-400" />
                        <div>
                          <div className="font-medium">Jumlah Anggota</div>
                          <div>{ekstrakurikuler.jumlah_anggota} Siswa</div>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>
            </motion.article>

            {/* Related Ekstrakurikuler */}
            {ekstrakurikulerLain.length > 0 && (
              <motion.section
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="mt-16"
              >
                <h2 className="text-2xl font-bold text-white mb-8">Ekstrakurikuler Lainnya</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {ekstrakurikulerLain.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      <Link
                        href={`/ekstrakurikuler/${item.id}`}
                        className="block bg-white/5 rounded-xl overflow-hidden backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 group h-full"
                      >
                        {/* Thumbnail */}
                        <div className="relative h-40 w-full overflow-hidden">
                          {item.gambar ? (
                            <img
                              src={`/storage/assets/${item.gambar}`}
                              alt={item.nama_eskul}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                              <Users className="w-8 h-8 text-gray-400 opacity-50" />
                            </div>
                          )}
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                        </div>

                        {/* Content */}
                        <div className="p-4">
                          <h3 className="font-semibold text-white text-sm line-clamp-2 mb-2 group-hover:text-yellow-400 transition-colors">
                            {item.nama_eskul}
                          </h3>
                          <div className="space-y-1 text-xs text-gray-400">
                            <div className="flex items-center justify-between">
                              <span>Pembina:</span>
                              <span className="font-semibold text-yellow-400">{item.pembina}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span>Jadwal:</span>
                              <span className="font-semibold text-blue-400">{item.jadwal_latihan}</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* View All Button */}
                <div className="text-center mt-8">
                  <Link
                    href="/ekstrakulikuler"
                    className="inline-flex items-center px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-blue-900 font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                  >
                    Lihat Semua Ekstrakurikuler
                  </Link>
                </div>
              </motion.section>
            )}

            {/* Back to List */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="text-center mt-12"
            >
              <Link
                href="/ekstrakulikuler"
                className="inline-flex items-center text-yellow-400 hover:text-yellow-300 font-semibold transition-colors text-lg"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Kembali ke Ekstrakurikuler
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
