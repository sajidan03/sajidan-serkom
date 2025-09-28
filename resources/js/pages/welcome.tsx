import { login } from '@/routes';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { motion } from 'framer-motion';

interface Berita {
  id: number;
  judul: string;
  isi: string;
  gambar: string | null;
  tanggal: string;
  user_name: string;
}

interface Ekstrakulikuler {
  id: number;
  nama: string;
  deskripsi: string;
  gambar: string | null;
  pembina: string;
}

interface Galeri {
  id: number;
  judul: string;
  keterangan: string;
  file: string;
  kategori: string;
  tanggal: string;
}

interface ProfilSekolah {
  id: number;
  nama_sekolah: string;
  kepala_sekolah: string;
  foto: string | null;
  logo: string | null;
  npsn: string;
  alamat: string;
  kontak: string;
  visi_misi: string;
  tahun_berdiri: string;
  deskripsi: string;
}

interface WelcomeProps {
  profil: ProfilSekolah;
  berita: Berita[];
  ekstrakulikuler: Ekstrakulikuler[];
  galeri: Galeri[];
}

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;
    const { profil, berita, ekstrakulikuler, galeri } = usePage<WelcomeProps>().props;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Format visi misi jika ada
    const visiMisiArray = profil.visi_misi ? profil.visi_misi.split('\n') : [];

    return (
        <>
            <Head title={`Selamat Datang di ${profil.nama_sekolah}`}>
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>

            <div className="bg-gradient-to-b from-blue-900 to-blue-800 min-h-screen">
                {/* Header - NAVBAR ASLI ANDA */}
                <motion.header
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="absolute inset-x-0 top-0 z-50">
                    <nav className="flex items-center justify-between p-6 lg:px-10">
                        {/* navbar */}
                        <div className="flex lg:flex-1">
                        <Link href="/" className="-m-1.5 p-1.5 flex items-center">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full mr-2">
                            <img src={`/storage/assets/${profil.logo}`} alt="Logo SMK YPC" className="h-full w-full object-contain" />
                            </div>
                            <span className="text-xl font-bold text-white">{profil.nama_sekolah}</span>
                        </Link>
                        </div>
                        <div className="flex lg:hidden">
                            <button
                                type="button"
                                onClick={() => setMobileMenuOpen(true)}
                                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-200"
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
                            <a href="#berita" className="text-sm/6 font-semibold text-white hover:text-yellow-400">
                                Berita
                            </a>
                            <a href="#galeri" className="text-sm/6 font-semibold text-white hover:text-yellow-400">
                                Galeri
                            </a>
                            <a href="#ekstrakulikuler" className="text-sm/6 font-semibold text-white hover:text-yellow-400">
                                Ekstrakulikuler
                            </a>
                            <a href="#kontak" className="text-sm/6 font-semibold text-white hover:text-yellow-400">
                                Guru
                            </a>
                             <a href="#profil" className="text-sm/6 font-semibold text-white hover:text-yellow-400">
                                Profil
                            </a>
                        </div>
                        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                            <Link
                                href='/login'
                                className="text-sm/6 font-semibold text-white hover:text-yellow-400"
                            >
                                Login<span aria-hidden="true">&rarr;</span>
                            </Link>
                        </div>
                    </nav>

                    {/* Mobile menu dialog */}
                    {mobileMenuOpen && (
                        <div className="lg:hidden">
                            <div className="fixed inset-0 z-50" />
                            <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-blue-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-white/10">
                                <div className="flex items-center justify-between">
                                    <Link href="/" className="-m-1.5 p-1.5 flex items-center">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-500 text-blue-900 mr-2">
                                            <img src={`/storage/assets/${profil.logo}`} alt="" />
                                        </div>
                                        <span className="text-xl font-bold text-white">{profil.nama_sekolah}</span>
                                    </Link>
                                    <button
                                        type="button"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="-m-2.5 rounded-md p-2.5 text-gray-200"
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
                                    <div className="-my-6 divide-y divide-white/10">
                                        <div className="space-y-2 py-6">
                                            <a
                                                href="#profil"
                                                className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-white/5"
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                Profil
                                            </a>
                                            <a
                                                href="#berita"
                                                className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-white/5"
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                Berita
                                            </a>
                                            <a
                                                href="#galeri"
                                                className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-white/5"
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                Galeri
                                            </a>
                                            <a
                                                href="#ekstrakulikuler"
                                                className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-white/5"
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                Ekstrakulikuler
                                            </a>
                                            <a
                                                href="#kontak"
                                                className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-white/5"
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                Kontak
                                            </a>
                                        </div>
                                        <div className="py-6">
                                            <Link
                                                href={login()}
                                                className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-white hover:bg-white/5"
                                            >
                                                Portal Siswa
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </motion.header>

                {/* Main Hero Section */}
                <div className="relative isolate px-6 pt-14 lg:px-8">
                    {/* Background effects */}
                    <div
                        aria-hidden="true"
                        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                    >
                        <div
                            style={{
                                clipPath:
                                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                            }}
                            className="relative left-[calc(50%-11rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#fffc40] to-[#0088ff] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                        />
                    </div>

                    <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
                        <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                            <div className="relative rounded-full px-3 py-1 text-sm/6 text-gray-200 ring-1 ring-white/10 hover:ring-white/20">
                                Sekolah Menengah Kejuruan Unggulan di Tasikmalaya{' '}
                                <a href="#profil" className="font-semibold text-yellow-400">
                                    <span aria-hidden="true" className="absolute inset-0" />
                                    Pelajari lebih lanjut <span aria-hidden="true">&rarr;</span>
                                </a>
                            </div>
                        </div>
                        <div className="text-center">
                            <h1 className="text-5xl font-semibold tracking-tight text-balance text-white sm:text-7xl">
                                {profil.nama_sekolah}
                            </h1>
                            <p className="mt-8 text-lg font-medium text-pretty text-gray-200 sm:text-xl/8">
                                {profil.deskripsi || 'Mencetak generasi profesional yang berkarakter, berkompeten, dan siap bersaing di era global.'}
                            </p>
                            <div className="mt-10 flex items-center justify-center gap-x-6">
                                <Link
                                    href='#profil'
                                    className="rounded-md bg-yellow-500 px-3.5 py-2.5 text-sm font-semibold text-blue-900 shadow-xs hover:bg-yellow-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500"
                                >
                                    Profil Sekolah
                                </Link>
                                <Link
                                    href={login()}
                                    className="text-sm/6 font-semibold text-white hover:text-yellow-400"
                                >
                                    Portal Siswa <span aria-hidden="true">→</span>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Background effect bottom */}
                    <div
                        aria-hidden="true"
                        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
                    >
                        <div
                            style={{
                                clipPath:
                                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                            }}
                            className="relative left-[calc(50%+3rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#fffc40] to-[#0088ff] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                        />
                    </div>
                </div>

                {/* Berita Section */}
                <motion.section
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 1, ease: "easeOut" }}
                id="berita" className="py-24 sm:py-32 bg-gradient-to-b from-blue-800 to-blue-900">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl lg:text-center">
                            <h2 className="text-base/7 font-semibold text-yellow-400">Berita Terbaru</h2>
                            <p className="mt-2 text-3xl font-semibold tracking-tight text-balance text-white sm:text-4xl">
                                Informasi Terkini {profil.nama_sekolah}
                            </p>
                        </div>
                        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                                {berita.map((item) => (
                                    <div key={item.id} className="bg-white/5 rounded-lg p-6 backdrop-blur-sm hover:bg-white/10 transition-colors">
                                        {item.gambar && (
                                            <img
                                                src={`/storage/assets/${item.gambar}`}
                                                alt={item.judul}
                                                className="w-full h-48 object-cover rounded-lg mb-4"
                                            />
                                        )}
                                        <h3 className="text-xl font-semibold text-white mb-2">{item.judul}</h3>
                                        <p className="text-gray-200 text-sm mb-4 line-clamp-3">
                                            {item.isi.substring(0, 150)}...
                                        </p>
                                        <div className="flex justify-between items-center text-sm text-gray-400">
                                            <span>{new Date(item.tanggal).toLocaleDateString('id-ID')}</span>
                                            <span>Oleh: {item.user_name}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {berita.length === 0 && (
                                <div className="text-center py-12">
                                    <p className="text-gray-200 text-lg">Belum ada berita tersedia</p>
                                </div>
                            )}
                        </div>
                    </div>
                </motion.section>

                {/* Galeri Section */}
                <motion.section
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 1, ease: "easeOut" }}
                id="galeri" className="py-24 sm:py-32 bg-gradient-to-b from-blue-900 to-blue-800">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl lg:text-center">
                            <h2 className="text-base/7 font-semibold text-yellow-400">Galeri Sekolah</h2>
                            <p className="mt-2 text-3xl font-semibold tracking-tight text-balance text-white sm:text-4xl">
                                Dokumentasi Kegiatan
                            </p>
                        </div>
                        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                                {galeri.map((item) => (
                                    <div key={item.id} className="group relative">
                                        <img
                                            src={`/storage/assets/${item.file}`}
                                            alt={item.judul}
                                            className="w-full h-32 object-cover rounded-lg"
                                        />
                                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-opacity rounded-lg flex items-center justify-center">
                                            <div className="text-white text-center opacity-0 group-hover:opacity-100 transition-opacity p-2">
                                                <p className="text-sm font-semibold">{item.judul}</p>
                                                <p className="text-xs">{item.kategori}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {galeri.length === 0 && (
                                <div className="text-center py-12">
                                    <p className="text-gray-200 text-lg">Belum ada galeri tersedia</p>
                                </div>
                            )}
                        </div>
                    </div>
                </motion.section>

                {/* Ekstrakulikuler Section - BARU DITAMBAHKAN */}
                <motion.section
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 1, ease: "easeOut" }}
                id="ekstrakulikuler" className="py-24 sm:py-32 bg-gradient-to-b from-blue-800 to-blue-900">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl lg:text-center">
                            <h2 className="text-base/7 font-semibold text-yellow-400">Ekstrakulikuler</h2>
                            <p className="mt-2 text-3xl font-semibold tracking-tight text-balance text-white sm:text-4xl">
                                Kegiatan Pengembangan Minat & Bakat
                            </p>
                            <p className="mt-6 text-lg/8 text-gray-200">
                                Berbagai kegiatan ekstrakulikuler untuk mengembangkan potensi dan bakat siswa di luar jam pelajaran.
                            </p>
                        </div>
                        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                                {ekstrakulikuler.map((item) => (
                                    <div key={item.id} className="bg-white/5 rounded-lg p-6 backdrop-blur-sm hover:bg-white/10 transition-colors">
                                        {item.gambar && (
                                            <img
                                                src={`/storage/assets/${item.gambar}`}
                                                alt={item.nama}
                                                className="w-full h-48 object-cover rounded-lg mb-4"
                                            />
                                        )}
                                        <h3 className="text-xl font-semibold text-white mb-2">{item.nama}</h3>
                                        <p className="text-gray-200 text-sm mb-4">
                                            {item.deskripsi}
                                        </p>
                                        <div className="flex justify-between items-center text-sm text-gray-400">
                                            <span>Pembina:</span>
                                            <span className="font-semibold text-yellow-400">{item.pembina}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {ekstrakulikuler.length === 0 && (
                                <div className="text-center py-12">
                                    <p className="text-gray-200 text-lg">Belum ada data ekstrakulikuler tersedia</p>
                                </div>
                            )}
                        </div>
                    </div>
                </motion.section>

                {/* Profil Section */}
                <section id="profil" className="py-24 sm:py-32 bg-gradient-to-b from-blue-800 to-blue-900">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl lg:text-center">
                            <h2 className="text-base/7 font-semibold text-yellow-400">Profil Sekolah</h2>
                            <p className="mt-2 text-3xl font-semibold tracking-tight text-balance text-white sm:text-4xl">
                                {profil.nama_sekolah}
                            </p>
                        </div>
                        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                            <div className="rounded-lg bg-white/5 p-8 backdrop-blur-sm">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div>
                                        <h3 className="text-xl font-semibold text-white mb-4">Identitas Sekolah</h3>
                                        <div className="space-y-3 text-gray-200">
                                            <p><strong>NPSN:</strong> {profil.npsn}</p>
                                            <p><strong>Kepala Sekolah:</strong> {profil.kepala_sekolah}</p>
                                            <p><strong>Tahun Berdiri:</strong> {profil.tahun_berdiri}</p>
                                            <p><strong>Alamat:</strong> {profil.alamat}</p>
                                            <p><strong>Kontak:</strong> {profil.kontak}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-white mb-4">Visi & Misi</h3>
                                        <div className="text-gray-200">
                                            {visiMisiArray.length > 0 ? (
                                                visiMisiArray.map((item, index) => (
                                                    <p key={index} className="mb-2">{item}</p>
                                                ))
                                            ) : (
                                                <p>Visi dan misi belum tersedia</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                {profil.deskripsi && (
                                    <div className="mt-8">
                                        <h3 className="text-xl font-semibold text-white mb-4">Deskripsi Sekolah</h3>
                                        <p className="text-gray-200 text-justify">{profil.deskripsi}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer id="kontak" className="bg-blue-900 py-12 border-t border-white/10">
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
                                    <p>Email: {profil.kontak}</p>
                                    <p>Telepon: {profil.kontak}</p>
                                    <p>Alamat: {profil.alamat}</p>
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
