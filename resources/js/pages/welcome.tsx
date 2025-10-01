import { login } from '@/routes';
import { Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, FileQuestion, ImageIcon, Play, User } from 'lucide-react';

interface Berita {
  id: number;
  judul: string;
  isi: string;
  tanggal: string;
  gambar: string;
  user?: User
}

interface User{
    id: number
    name: string
}
interface Ekstrakulikuler {
  id: number;
  nama_eskul: string;
  pembina: string;
  jadwal_latihan: string;
  deskripsi: string;
  gambar: string | null;
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
  foto_kepsek: string | null;
  foto: string | null;
  logo: string | null;
  npsn: string;
  alamat: string;
  kontak: string;
  email: string,
  instagram: string,
  facebook: string,
  youtube: string,
  visi_misi: string;
  tahun_berdiri: string;
  deskripsi: string;
}

interface Guru {
  id: number;
  nama_guru: string;
  mapel: string;
  foto: string | null;
}

interface WelcomeProps {
  profil: ProfilSekolah;
  berita: Berita[];
  ekstrakulikuler: Ekstrakulikuler[];
  galeri: Galeri[];
  guru: Guru[];
}

export default function Welcome() {
    const { profil, berita, ekstrakulikuler, galeri, guru } = usePage<WelcomeProps>().props;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [playingVideo, setPlayingVideo] = useState<number | null>(null);

    const visiMisiArray = profil.visi_misi ? profil.visi_misi.split('\n') : [];

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
                            <a href="#guru" className="text-sm/6 font-semibold text-white hover:text-yellow-400">
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
                                                href="#guru"
                                                className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-white/5"
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                Guru
                                            </a>
                                        </div>
                                        <div className="py-6">
                                            <Link
                                                href={login()}
                                                className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-white hover:bg-white/5"
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

                {/* Main Hero Section - TITLE DIATASKAN */}
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

                    {/* Background Image dari profil.foto */}
                    {profil.foto && (
                        <div className="absolute inset-0 -z-10 overflow-hidden">
                            <img
                                src={`/storage/assets/${profil.foto}`}
                                alt={`Foto ${profil.nama_sekolah}`}
                                className="w-full h-full object-cover opacity-100"
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-blue-900/80 to-blue-800/80"></div>
                        </div>
                    )}

                    {/* TITLE DIATASKAN - py dikurangi */}
                    <div className="mx-auto max-w-2xl py-20 sm:py-32 lg:py-40 relative z-10">
                        <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                            <div className="relative rounded-full px-3 py-1 text-sm/6 text-gray-200 ring-1 ring-white/10 hover:ring-white/20">
                                Sekolah {profil.nama_sekolah}
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
                                    Login <span aria-hidden="true">→</span>
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
                                    <div key={item.id} className="bg-white/5 rounded-lg p-6 backdrop-blur-sm border border-white/10 h-full flex flex-col">
                                        {item.gambar && (
                                            item.gambar.toLowerCase().endsWith('.jpg') ||
                                            item.gambar.toLowerCase().endsWith('.jpeg') ||
                                            item.gambar.toLowerCase().endsWith('.png') ||
                                            item.gambar.toLowerCase().endsWith('.gif') ||
                                            item.gambar.toLowerCase().endsWith('.webp') ? (
                                                <img
                                                    src={`/storage/assets/${item.gambar}`}
                                                    alt={item.judul}
                                                    className="w-full h-48 object-cover rounded-lg mb-4"
                                                    onError={(e) => {
                                                        e.target.style.display = 'none';
                                                    }}
                                                />
                                            ) : (
                                                <div className="w-full h-48 bg-gray-600 rounded-lg mb-4 flex items-center justify-center">
                                                    <span className="text-white">File bukan gambar</span>
                                                </div>
                                            )
                                        )}
                                        <h3 className="text-xl font-semibold text-white mb-2">{item.judul}</h3>
                                        <p className="text-gray-200 text-sm mb-4 line-clamp-3 flex-grow">
                                            {item.isi && item.isi.length > 150 ? `${item.isi.substring(0, 150)}...` : item.isi}
                                        </p>
                                        <div className="flex justify-between items-center text-sm text-gray-400 mt-auto">
                                            <span>{new Date(item.tanggal).toLocaleDateString('id-ID')}</span>
                                            <span>Oleh: {item.user?.name}</span>
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
                            <p className="mt-4 text-lg text-gray-300">
                                Kumpulan momen berharga dan aktivitas sekolah
                            </p>
                        </div>

                        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-6xl">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {galeri.map((item) => (
                                    <div
                                        key={item.id}
                                        className="bg-white/5 rounded-xl overflow-hidden backdrop-blur-sm border border-white/10 h-full flex flex-col"
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
                                                            className="w-full h-full object-cover"
                                                            onError={(e) => {
                                                                console.error('Image failed to load:', item.file);
                                                                e.target.style.display = 'none';
                                                                e.target.nextElementSibling?.classList.remove('hidden');
                                                            }}
                                                        />
                                                    ) : isVideo(item.file) ? (
                                                        // TAMPILAN UNTUK VIDEO - UKURAN SAMA DENGAN ADMIN
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
                                                                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 cursor-pointer"
                                                                    onClick={() => handleVideoPlay(item.id)}
                                                                >
                                                                    <div className="bg-white bg-opacity-90 rounded-full p-3">
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
                                                        <p className="text-xs mt-1 opacity-75">{item.file}</p>
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
                                        </div>

                                        {/* Content */}
                                        <div className="p-4 flex flex-col flex-grow">
                                            <h3 className="font-semibold text-white text-sm line-clamp-2 mb-2">
                                                {item.judul}
                                            </h3>

                                            {item.keterangan && (
                                                <p className="text-gray-300 text-xs line-clamp-2 mb-3 flex-grow">
                                                    {item.keterangan}
                                                </p>
                                            )}

                                            <div className="flex justify-between items-center text-xs text-gray-400 mt-auto">
                                                <span>
                                                    {item.tanggal ? new Date(item.tanggal).toLocaleDateString('id-ID', {
                                                        day: 'numeric',
                                                        month: 'short',
                                                        year: 'numeric'
                                                    }) : 'No date'}
                                                </span>
                                                <div className="flex items-center space-x-1">
                                                    {isVideo(item.file) ? (
                                                        <Play className="w-3 h-3" />
                                                    ) : (
                                                        <Eye className="w-3 h-3" />
                                                    )}
                                                    <span>{isVideo(item.file) ? 'Play' : 'View'}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {galeri.length === 0 && (
                                <div className="text-center py-16">
                                    <div className="flex flex-col items-center justify-center">
                                        <ImageIcon className="w-16 h-16 text-gray-400 mb-4 opacity-50" />
                                        <p className="text-gray-300 text-lg font-medium mb-2">Belum ada galeri tersedia</p>
                                        <p className="text-gray-400 text-sm">Galeri akan ditampilkan di sini</p>
                                    </div>
                                </div>
                            )}

                            {/* View All Button */}
                            {galeri.length > 0 && (
                                <div className="text-center mt-12">
                                    <button className="inline-flex items-center px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-blue-900 font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                                        <Eye className="w-5 h-5 mr-2" />
                                        Lihat Semua Galeri
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </motion.section>

                {/* Ekstrakulikuler Section*/}
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
                                    <div key={item.id} className="bg-white/5 rounded-lg p-6 backdrop-blur-sm border border-white/10 h-full flex flex-col">
                                        {item.gambar && (
                                            item.gambar.toLowerCase().endsWith('.jpg') ||
                                            item.gambar.toLowerCase().endsWith('.jpeg') ||
                                            item.gambar.toLowerCase().endsWith('.png') ||
                                            item.gambar.toLowerCase().endsWith('.gif') ||
                                            item.gambar.toLowerCase().endsWith('.webp') ? (
                                                <img
                                                    src={`/storage/assets/${item.gambar}`}
                                                    alt={item.nama_eskul}
                                                    className="w-full h-48 object-cover rounded-lg mb-4"
                                                    onError={(e) => {
                                                        e.target.style.display = 'none';
                                                    }}
                                                />
                                            ) : (
                                                <div className="w-full h-48 bg-gray-600 rounded-lg mb-4 flex items-center justify-center">
                                                    <span className="text-white">File bukan gambar</span>
                                                </div>
                                            )
                                        )}
                                        <h3 className="text-xl font-semibold text-white mb-2">{item.nama_eskul}</h3>
                                        <p className="text-gray-200 text-sm mb-4 flex-grow">
                                            {item.deskripsi}
                                        </p>
                                        <div className="flex justify-between items-center text-sm text-gray-400 mt-auto">
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

                {/* Guru Section */}
                <motion.section
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 1, ease: "easeOut" }}
                id="guru" className="py-24 sm:py-32 bg-gradient-to-b from-blue-900 to-blue-800">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl lg:text-center">
                            <h2 className="text-base/7 font-semibold text-yellow-400">Tenaga Pendidik</h2>
                            <p className="mt-2 text-3xl font-semibold tracking-tight text-balance text-white sm:text-4xl">
                                Guru & Staff Pengajar
                            </p>
                            <p className="mt-4 text-lg text-gray-300">
                                Para pendidik profesional yang berdedikasi dalam mencerdaskan generasi bangsa
                            </p>
                        </div>

                        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-6xl">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                                {guru.map((guruItem) => (
                                    <div
                                        key={guruItem.id}
                                        className="bg-white/5 rounded-xl overflow-hidden backdrop-blur-sm border border-white/10 h-full flex flex-col"
                                    >
                                        {/* Foto Guru */}
                                        <div className="relative h-64 w-full overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
                                            {guruItem.foto ? (
                                                <img
                                                    src={`/storage/assets/${guruItem.foto}`}
                                                    alt={guruItem.nama_guru}
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => {
                                                        e.target.style.display = 'none';
                                                        e.target.nextElementSibling?.classList.remove('hidden');
                                                    }}
                                                />
                                            ) : (
                                                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                                                    <User className="w-16 h-16 mb-2 opacity-50" />
                                                    <p className="text-sm">Tidak ada foto</p>
                                                </div>
                                            )}

                                            {/* Fallback ketika foto error */}
                                            <div className="hidden absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                                                <User className="w-16 h-16 mb-2 opacity-50" />
                                                <p className="text-sm">Foto tidak dapat dimuat</p>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-6 text-center flex flex-col flex-grow">
                                            <h3 className="font-semibold text-white text-lg mb-2">
                                                {guruItem.nama_guru}
                                            </h3>
                                            <p className="text-gray-300 text-sm mb-4 flex-grow">
                                                {guruItem.mapel}
                                            </p>
                                            <div className="flex justify-center items-center text-xs text-gray-400 mt-auto">
                                                <User className="w-4 h-4 mr-1" />
                                                <span>Guru</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {guru.length === 0 && (
                                <div className="text-center py-16">
                                    <div className="flex flex-col items-center justify-center">
                                        <User className="w-16 h-16 text-gray-400 mb-4 opacity-50" />
                                        <p className="text-gray-300 text-lg font-medium mb-2">Belum ada data guru tersedia</p>
                                        <p className="text-gray-400 text-sm">Data guru akan ditampilkan di sini</p>
                                    </div>
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
                            <div className="rounded-lg bg-white/5 p-8 backdrop-blur-sm border border-white/10">
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

                                {/* Card Kepala Sekolah */}
                                <div className="mt-12 pt-8 border-t border-white/10">
                                    <div className="flex flex-col md:flex-row items-center gap-8">
                                        {/* Foto Kepala Sekolah */}
                                        <div className="flex-shrink-0">
                                            <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-yellow-400 bg-gradient-to-br from-gray-800 to-gray-900">
                                                {profil.foto_kepsek ? (
                                                    <img
                                                        src={`/storage/assets/${profil.foto_kepsek}`}
                                                        alt={`Kepala Sekolah ${profil.nama_sekolah}`}
                                                        className="w-full h-full object-cover"
                                                        onError={(e) => {
                                                            e.target.style.display = 'none';
                                                            e.target.nextElementSibling?.classList.remove('hidden');
                                                        }}
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                                                        <User className="w-16 h-16 mb-2 opacity-50" />
                                                        <p className="text-sm text-center">Tidak ada foto</p>
                                                    </div>
                                                )}
                                                {/* Fallback ketika foto error */}
                                                <div className="hidden w-full h-full flex flex-col items-center justify-center text-gray-400">
                                                    <User className="w-16 h-16 mb-2 opacity-50" />
                                                    <p className="text-sm text-center">Foto tidak dapat dimuat</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Informasi Kepala Sekolah */}
                                        <div className="flex-grow text-center md:text-left">
                                            <h3 className="text-2xl font-bold text-white mb-2">
                                                {profil.kepala_sekolah}
                                            </h3>
                                            <p className="text-yellow-400 text-lg font-semibold mb-4">
                                                Kepala Sekolah
                                            </p>
                                            <p className="text-gray-200 text-sm leading-relaxed">
                                                Memimpin {profil.nama_sekolah} dengan dedikasi dan komitmen untuk
                                                menciptakan lingkungan belajar yang berkualitas serta mendorong
                                                pengembangan potensi seluruh siswa.
                                            </p>
                                            <div className="mt-4 flex flex-wrap gap-2 justify-center md:justify-start">
                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-300 border border-yellow-500/30">
                                                    Professional
                                                </span>
                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-300 border border-blue-500/30">
                                                    Visioner
                                                </span>
                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-300 border border-green-500/30">
                                                    Inovatif
                                                </span>
                                            </div>
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
                                    <p>Email: {profil.email}</p>
                                    <p>Telepon: {profil.kontak}</p>
                                    <p>Alamat: {profil.alamat}</p>
                                    <br/>
                                    <a href={profil.instagram}>Instagram</a>
                                    <br/>
                                    <a href={profil.facebook}>Facebook</a>
                                    <br/>
                                    <a href={profil.youtube}>Youtube</a>
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
