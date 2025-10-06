import { login } from '@/routes';
import { Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, Facebook, FileQuestion, ImageIcon, Instagram, Play, User, Youtube, MapPin } from 'lucide-react';

interface Berita {
  id: number;
  judul: string;
  isi: string;
  tanggal: string;
  gambar: string;
  user?: User
  encrypted_id: string
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
  visi_misi: string,
  tahun_berdiri: string,
  deskripsi: string,
  link_map: string,
  warna: string; // Tambahkan field warna
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
  gmap: ProfilSekolah[];
}

export default function Welcome() {
    const { profil, berita, ekstrakulikuler, galeri, guru , gmap} = usePage<WelcomeProps>().props;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [playingVideo, setPlayingVideo] = useState<number | null>(null);

    // Warna tema dari database
    const themeColor = profil.warna || '#1e3a8a'; // Fallback ke biru default jika tidak ada

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

    // Fungsi untuk menghasilkan warna yang lebih terang atau gelap
    const adjustColor = (color: string, amount: number) => {
        return '#' + color.replace(/^#/, '').replace(/../g, color =>
            ('0' + Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2)
        );
    }

    // Warna turunan dari tema utama
    const lighterColor = adjustColor(themeColor, 30);
    const darkerColor = adjustColor(themeColor, -30);
    const accentColor = '#fbbf24'; // Tetap kuning untuk aksen

    const GoogleMapEmbed = ({ mapLink, address }: { mapLink: string, address: string }) => {
        if (mapLink) {
            if (mapLink.includes('embed')) {
                return (
                    <div className="w-full h-64 overflow-hidden border rounded-lg border-white/10">
                        <iframe
                            src={mapLink}
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title={`Lokasi ${profil.nama_sekolah}`}
                            onError={(e) => {
                                const openStreetMapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=107.6,-6.9,107.7,-6.8&layer=mapnik&marker=${encodeURIComponent(address)}`;
                                e.currentTarget.src = openStreetMapUrl;
                            }}
                        />
                    </div>
                );
            }

            const simpleEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;

            return (
                <div className="w-full h-64 overflow-hidden border rounded-lg border-white/10">
                    <iframe
                        src={simpleEmbedUrl}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title={`Lokasi ${profil.nama_sekolah}`}
                        onError={(e) => {
                            const openStreetMapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=107.6,-6.9,107.7,-6.8&layer=mapnik&marker=${encodeURIComponent(address)}`;
                            e.currentTarget.src = openStreetMapUrl;
                        }}
                    />
                </div>
            );
        }

        // Jika tidak ada link_map, gunakan OpenStreetMap sebagai fallback
        const openStreetMapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=107.6,-6.9,107.7,-6.8&layer=mapnik&marker=${encodeURIComponent(address)}`;

        return (
            <div className="w-full h-64 overflow-hidden border rounded-lg border-white/10">
                <iframe
                    src={openStreetMapUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    title={`Lokasi ${profil.nama_sekolah}`}
                />
            </div>
        );
    };

    // Fungsi untuk mendapatkan URL Google Maps yang aman
    const getSafeGoogleMapsUrl = (address: string, mapLink?: string) => {
        if (mapLink && !mapLink.includes('embed')) {
            return mapLink;
        }
        return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    };

    return (
        <>
            <Head title={`Selamat Datang di ${profil.nama_sekolah}`}>
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
                <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet"/>
                <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
            </Head>

            {/* Gunakan warna tema dinamis */}
            <div className="min-h-screen" style={{
                background: `linear-gradient(to bottom, ${lighterColor}, ${themeColor})`
            }}>
                {/* Header - NAVBAR PUTIH DENGAN TEKS HITAM - FIXED */}
                <motion.header
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="fixed inset-x-0 top-0 z-50">
                    <nav className="flex items-center justify-between p-6 bg-white shadow-lg lg:px-10">
                        <div className="flex lg:flex-1">
                        <Link href="/" className="-m-1.5 p-1.5 flex items-center">
                            <div className="flex items-center justify-center w-10 h-10 mr-2 rounded-full">
                            <img src={`/storage/assets/${profil.logo}`} alt="Logo SMK YPC" className="object-contain w-full h-full" />
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
                            <a href="#berita" className="font-semibold text-gray-900 text-sm/6 hover:text-blue-600">
                                Berita
                            </a>
                            <a href="#galeri" className="font-semibold text-gray-900 text-sm/6 hover:text-blue-600">
                                Galeri
                            </a>
                            <a href="#ekstrakulikuler" className="font-semibold text-gray-900 text-sm/6 hover:text-blue-600">
                                Ekstrakurikuler
                            </a>
                            <a href="#guru" className="font-semibold text-gray-900 text-sm/6 hover:text-blue-600">
                                Guru
                            </a>
                             <a href="#profil" className="font-semibold text-gray-900 text-sm/6 hover:text-blue-600">
                                Profil
                            </a>
                        </div>
                        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                            <Link
                                href='/login'
                                className="font-semibold text-gray-900 text-sm/6 hover:text-blue-600"
                            >
                                Login<span aria-hidden="true">&rarr;</span>
                            </Link>
                        </div>
                    </nav>

                    {/* Mobile menu dialog */}
                    {mobileMenuOpen && (
                        <div className="lg:hidden">
                            <div className="fixed inset-0 z-50" />
                            <div className="fixed inset-y-0 right-0 z-50 w-full px-6 py-6 overflow-y-auto bg-white sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                                <div className="flex items-center justify-between">
                                    <Link href="/" className="-m-1.5 p-1.5 flex items-center">
                                        <div className="flex items-center justify-center w-10 h-10 mr-2 text-white bg-blue-600 rounded-full">
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
                                <div className="flow-root mt-6">
                                    <div className="-my-6 divide-y divide-gray-500/10">
                                        <div className="py-6 space-y-2">
                                            <a
                                                href="#profil"
                                                className="block px-3 py-2 -mx-3 font-semibold text-gray-900 rounded-lg text-base/7 hover:bg-gray-50"
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                Profil
                                            </a>
                                            <a
                                                href="#berita"
                                                className="block px-3 py-2 -mx-3 font-semibold text-gray-900 rounded-lg text-base/7 hover:bg-gray-50"
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                Berita
                                            </a>
                                            <a
                                                href="#galeri"
                                                className="block px-3 py-2 -mx-3 font-semibold text-gray-900 rounded-lg text-base/7 hover:bg-gray-50"
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                Galeri
                                            </a>
                                            <a
                                                href="#ekstrakulikuler"
                                                className="block px-3 py-2 -mx-3 font-semibold text-gray-900 rounded-lg text-base/7 hover:bg-gray-50"
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                Ekstrakurikuler
                                            </a>
                                            <a
                                                href="#guru"
                                                className="block px-3 py-2 -mx-3 font-semibold text-gray-900 rounded-lg text-base/7 hover:bg-gray-50"
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                Guru
                                            </a>
                                        </div>
                                        <div className="py-6">
                                            <Link
                                                href={login()}
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

                {/* Main Hero Section */}
                <div className="relative px-6 pt-32 isolate lg:px-8 lg:pt-40">
                    <div
                        aria-hidden="true"
                        className="absolute inset-x-0 overflow-hidden -top-40 -z-10 transform-gpu blur-3xl sm:-top-80"
                    >
                        <div
                            style={{
                                clipPath:
                                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                            }}
                            className="relative left-[calc(50%-11rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 rotate-[30deg] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                            style={{
                                background: `linear-gradient(to top right, ${accentColor}, ${themeColor})`
                            }}
                        />
                    </div>

                    {profil.foto && (
                        <div className="absolute inset-0 overflow-hidden -z-10">
                            <img
                                src={`/storage/assets/${profil.foto}`}
                                alt={`Foto ${profil.nama_sekolah}`}
                                className="object-cover w-full h-full opacity-100"
                            />
                            <div className="absolute inset-0" style={{
                                background: `linear-gradient(to bottom, ${themeColor}80, ${darkerColor}80)`
                            }}></div>
                        </div>
                    )}

                    <div className="relative z-10 max-w-2xl py-20 mx-auto sm:py-32 lg:py-40">
                        <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                            <div className="relative px-3 py-1 text-gray-200 rounded-full text-sm/6 ring-1 ring-white/10 hover:ring-white/20">
                                Sekolah {profil.nama_sekolah}
                                <a href="#profil" className="font-semibold" style={{ color: accentColor }}>
                                    <span aria-hidden="true" className="absolute inset-0" />
                                    Pelajari lebih lanjut <span aria-hidden="true">&rarr;</span>
                                </a>
                            </div>
                        </div>
                        <div className="text-center">
                            <h1 className="text-5xl font-semibold tracking-tight text-white text-balance sm:text-7xl">
                                {profil.nama_sekolah}
                            </h1>
                            <p className="mt-8 text-lg font-medium text-gray-200 text-pretty sm:text-xl/8">
                                {profil.deskripsi || 'Mencetak generasi profesional yang berkarakter, berkompeten, dan siap bersaing di era global.'}
                            </p>
                            <div className="flex items-center justify-center mt-10 gap-x-6">
                                <Link
                                    href='#profil'
                                    className="rounded-md px-3.5 py-2.5 text-sm font-semibold shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2"
                                    style={{
                                        backgroundColor: accentColor,
                                        color: themeColor
                                    }}
                                >
                                    Profil Sekolah
                                </Link>
                                <Link
                                    href={login()}
                                    className="font-semibold text-white text-sm/6 hover:text-yellow-400"
                                >
                                    Login <span aria-hidden="true">→</span>
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div
                        aria-hidden="true"
                        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
                    >
                        <div
                            style={{
                                clipPath:
                                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                            }}
                            className="relative left-[calc(50%+3rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                            style={{
                                background: `linear-gradient(to top right, ${accentColor}, ${themeColor})`
                            }}
                        />
                    </div>
                </div>

                {/* Kepala Sekolah Section */}
                <motion.section
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="py-16 sm:py-24"
                    style={{
                        background: `linear-gradient(to bottom, ${themeColor}, ${darkerColor})`
                    }}
                >
                <h2 className='px-6 mx-auto my-6 text-2xl font-bold text-white max-w-7xl lg:px-48'>Sambutan dari kepala sekolah</h2>
                    <div className="px-6 mx-auto max-w-7xl lg:px-8">
                        <div className="max-w-4xl mx-auto">
                            <div className="p-8 border rounded-2xl bg-white/5 backdrop-blur-sm border-white/10">
                                <div className="flex flex-col items-center gap-8 md:flex-row">
                                    <div className="flex-shrink-0">
                                        <div className="w-48 h-48 overflow-hidden border-4 rounded-full" style={{ borderColor: accentColor, background: `linear-gradient(to bottom right, ${darkerColor}, ${themeColor})` }}>
                                            {profil.foto_kepsek ? (
                                                <img
                                                    src={`/storage/assets/${profil.foto_kepsek}`}
                                                    alt={`Kepala Sekolah ${profil.nama_sekolah}`}
                                                    className="object-cover w-full h-full"
                                                    onError={(e) => {
                                                        e.target.style.display = 'none';
                                                        e.target.nextElementSibling?.classList.remove('hidden');
                                                    }}
                                                />
                                            ) : (
                                                <div className="flex flex-col items-center justify-center w-full h-full text-gray-400">
                                                    <User className="w-16 h-16 mb-2 opacity-50" />
                                                    <p className="text-sm text-center">Tidak ada foto</p>
                                                </div>
                                            )}
                                            <div className="flex flex-col items-center justify-center hidden w-full h-full text-gray-400">
                                                <User className="w-16 h-16 mb-2 opacity-50" />
                                                <p className="text-sm text-center">Foto tidak dapat dimuat</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex-grow text-center md:text-left">
                                        <h3 className="mb-2 text-2xl font-bold text-white">
                                            {profil.kepala_sekolah}
                                        </h3>
                                        <p className="mb-4 text-lg font-semibold" style={{ color: accentColor }}>
                                            Kepala Sekolah
                                        </p>
                                        <p className="text-sm leading-relaxed text-gray-200">
                                            Memimpin {profil.nama_sekolah} dengan dedikasi dan komitmen untuk
                                            menciptakan lingkungan belajar yang berkualitas serta mendorong
                                            pengembangan potensi seluruh siswa.
                                        </p>
                                        <div className="flex flex-wrap justify-center gap-2 mt-4 md:justify-start">
                                            <span className="inline-flex items-center px-3 py-1 text-xs font-medium border rounded-full" style={{
                                                backgroundColor: `${accentColor}20`,
                                                color: accentColor,
                                                borderColor: `${accentColor}30`
                                            }}>
                                                Professional
                                            </span>
                                            <span className="inline-flex items-center px-3 py-1 text-xs font-medium border rounded-full" style={{
                                                backgroundColor: `${themeColor}20`,
                                                color: lighterColor,
                                                borderColor: `${themeColor}30`
                                            }}>
                                                Visioner
                                            </span>
                                            <span className="inline-flex items-center px-3 py-1 text-xs font-medium border rounded-full" style={{
                                                backgroundColor: '#10b98120',
                                                color: '#10b981',
                                                borderColor: '#10b98130'
                                            }}>
                                                Inovatif
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* Berita Section */}
                <motion.section
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 1, ease: "easeOut" }}
                id="berita" className="py-24 sm:py-32" style={{
                    background: `linear-gradient(to bottom, ${lighterColor}, ${themeColor})`
                }}>
                    <div className="px-6 mx-auto max-w-7xl lg:px-8">
                        <div className="max-w-2xl mx-auto lg:text-center">
                            <h2 className="font-semibold text-base/7" style={{ color: accentColor }}>Berita Terbaru</h2>
                            <p className="mt-2 text-3xl font-semibold tracking-tight text-white text-balance sm:text-4xl">
                                Informasi Terkini {profil.nama_sekolah}
                            </p>
                        </div>
                        <div className="max-w-2xl mx-auto mt-16 sm:mt-20 lg:mt-24 lg:max-w-6xl">
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                                {berita.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex flex-col h-full overflow-hidden border bg-white/5 rounded-xl backdrop-blur-sm border-white/10"
                                    >
                                        <div className="relative w-full h-48 overflow-hidden" style={{
                                            background: `linear-gradient(to bottom right, ${darkerColor}, ${themeColor})`
                                        }}>
                                            {item.gambar && (
                                                item.gambar.toLowerCase().endsWith('.jpg') ||
                                                item.gambar.toLowerCase().endsWith('.jpeg') ||
                                                item.gambar.toLowerCase().endsWith('.png') ||
                                                item.gambar.toLowerCase().endsWith('.gif') ||
                                                item.gambar.toLowerCase().endsWith('.webp') ? (
                                                    <img
                                                        src={`/storage/assets/${item.gambar}`}
                                                        alt={item.judul}
                                                        className="object-cover w-full h-full"
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
                                            <div className="absolute inset-0 flex flex-col items-center justify-center hidden text-gray-400">
                                                <FileQuestion className="w-12 h-12 mb-2 opacity-50" />
                                                <p className="text-sm">Gambar tidak dapat dimuat</p>
                                            </div>
                                        </div>

                                        <div className="flex flex-col flex-grow p-4">
                                            <h3 className="mb-2 text-sm font-semibold text-white line-clamp-2">
                                                {item.judul}
                                            </h3>
                                            <p className="flex-grow mb-4 text-xs text-gray-300 line-clamp-3">
                                                {item.isi && item.isi.length > 150 ? `${item.isi.substring(0, 150)}...` : item.isi}
                                            </p>
                                            <div className="flex items-center justify-between mt-auto text-xs text-gray-400">
                                                <span>{new Date(item.tanggal).toLocaleDateString('id-ID')}</span>
                                                <span>Oleh: {item.user?.name}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {berita.length === 0 && (
                                <div className="py-16 text-center">
                                    <div className="flex flex-col items-center justify-center">
                                        <FileQuestion className="w-16 h-16 mb-4 text-gray-400 opacity-50" />
                                        <p className="mb-2 text-lg font-medium text-gray-300">Belum ada berita tersedia</p>
                                        <p className="text-sm text-gray-400">Berita akan ditampilkan di sini</p>
                                    </div>
                                </div>
                            )}
                        </div>
                         {berita.length > 0 && (
                                <div className="mt-12 text-center">
                                    <button className="inline-flex items-center px-6 py-3 font-semibold transition-all duration-300 transform rounded-lg hover:scale-105 hover:shadow-lg"
                                        style={{
                                            backgroundColor: accentColor,
                                            color: themeColor
                                        }}
                                    >
                                        <Eye className="w-5 h-5 mr-2" />
                                        <Link href={'/berita'}>
                                        Lihat Semua Berita
                                        </Link>
                                    </button>
                                </div>
                            )}
                    </div>
                </motion.section>

                {/* Galeri Section */}
                <motion.section
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 1, ease: "easeOut" }}
                id="galeri" className="py-24 sm:py-32" style={{
                    background: `linear-gradient(to bottom, ${themeColor}, ${darkerColor})`
                }}>
                    <div className="px-6 mx-auto max-w-7xl lg:px-8">
                        <div className="max-w-2xl mx-auto lg:text-center">
                            <h2 className="font-semibold text-base/7" style={{ color: accentColor }}>Galeri Sekolah</h2>
                            <p className="mt-2 text-3xl font-semibold tracking-tight text-white text-balance sm:text-4xl">
                                Dokumentasi Kegiatan
                            </p>
                            <p className="mt-4 text-lg text-gray-300">
                                Kumpulan momen berharga dan aktivitas sekolah
                            </p>
                        </div>

                        <div className="max-w-2xl mx-auto mt-16 sm:mt-20 lg:mt-24 lg:max-w-6xl">
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                                {galeri.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex flex-col h-full overflow-hidden border bg-white/5 rounded-xl backdrop-blur-sm border-white/10"
                                    >
                                        <div className="relative w-full h-48 overflow-hidden" style={{
                                            background: `linear-gradient(to bottom right, ${darkerColor}, ${themeColor})`
                                        }}>
                                            {item.file ? (
                                                <>
                                                    {isImage(item.file) ? (
                                                        <img
                                                            src={`/storage/assets/${item.file}`}
                                                            alt={item.judul}
                                                            className="object-cover w-full h-full"
                                                            onError={(e) => {
                                                                console.error('Image failed to load:', item.file);
                                                                e.target.style.display = 'none';
                                                                e.target.nextElementSibling?.classList.remove('hidden');
                                                            }}
                                                        />
                                                    ) : isVideo(item.file) ? (
                                                        <div className="relative w-full h-full">
                                                            <video
                                                                src={`/storage/assets/${item.file}`}
                                                                className="object-cover w-full h-full"
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
                                                                    className="absolute inset-0 flex items-center justify-center bg-black cursor-pointer bg-opacity-40"
                                                                    onClick={() => handleVideoPlay(item.id)}
                                                                >
                                                                    <div className="p-3 bg-white rounded-full bg-opacity-90">
                                                                        <Play className="w-6 h-6 text-gray-800 fill-current" />
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    ) : (
                                                        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-gray-400">
                                                            <FileQuestion className="w-12 h-12 mb-2 opacity-50" />
                                                            <p className="text-sm text-center">File tidak dapat dimuat</p>
                                                            <p className="max-w-full px-2 mt-1 text-xs truncate opacity-75">
                                                                {item.file}
                                                            </p>
                                                        </div>
                                                    )}

                                                    <div className="absolute inset-0 flex flex-col items-center justify-center hidden p-4 text-gray-400">
                                                        <FileQuestion className="w-12 h-12 mb-2 opacity-50" />
                                                        <p className="text-sm text-center">File tidak dapat dimuat</p>
                                                        <p className="mt-1 text-xs opacity-75">{item.file}</p>
                                                    </div>
                                                </>
                                            ) : (
                                                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                                                    <ImageIcon className="w-12 h-12 mb-2 opacity-50" />
                                                    <p className="text-sm">Tidak ada file</p>
                                                </div>
                                            )}

                                            {item.kategori && (
                                                <div className="absolute top-3 left-3">
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium backdrop-blur-sm"
                                                        style={{
                                                            backgroundColor: `${accentColor}90`,
                                                            color: themeColor
                                                        }}>
                                                        {item.kategori}
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex flex-col flex-grow p-4">
                                            <h3 className="mb-2 text-sm font-semibold text-white line-clamp-2">
                                                {item.judul}
                                            </h3>

                                            {item.keterangan && (
                                                <p className="flex-grow mb-3 text-xs text-gray-300 line-clamp-2">
                                                    {item.keterangan}
                                                </p>
                                            )}

                                            <div className="flex items-center justify-between mt-auto text-xs text-gray-400">
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
                                <div className="py-16 text-center">
                                    <div className="flex flex-col items-center justify-center">
                                        <ImageIcon className="w-16 h-16 mb-4 text-gray-400 opacity-50" />
                                        <p className="mb-2 text-lg font-medium text-gray-300">Belum ada galeri tersedia</p>
                                        <p className="text-sm text-gray-400">Galeri akan ditampilkan di sini</p>
                                    </div>
                                </div>
                            )}

                            {galeri.length > 0 && (
                                <div className="mt-12 text-center">
                                    <button className="inline-flex items-center px-6 py-3 font-semibold transition-all duration-300 transform rounded-lg hover:scale-105 hover:shadow-lg"
                                        style={{
                                            backgroundColor: accentColor,
                                            color: themeColor
                                        }}
                                    >
                                        <Eye className="w-5 h-5 mr-2" />
                                        <Link
                                        href={'/galeri'}
                                        >
                                        Lihat Semua Galeri
                                        </Link>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </motion.section>

                {/* Ekstrakulikuler Section */}
                <motion.section
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 1, ease: "easeOut" }}
                id="ekstrakulikuler" className="py-24 sm:py-32" style={{
                    background: `linear-gradient(to bottom, ${lighterColor}, ${themeColor})`
                }}>
                    <div className="px-6 mx-auto max-w-7xl lg:px-8">
                        <div className="max-w-2xl mx-auto lg:text-center">
                            <h2 className="font-semibold text-base/7" style={{ color: accentColor }}>Ekstrakulikuler</h2>
                            <p className="mt-2 text-3xl font-semibold tracking-tight text-white text-balance sm:text-4xl">
                                Kegiatan Pengembangan Minat & Bakat
                            </p>
                            <p className="mt-6 text-gray-200 text-lg/8">
                                Berbagai kegiatan ekstrakurikuler untuk mengembangkan potensi dan bakat siswa di luar jam pelajaran.
                            </p>
                        </div>
                        <div className="max-w-2xl mx-auto mt-16 sm:mt-20 lg:mt-24 lg:max-w-6xl">
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                                {ekstrakulikuler.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex flex-col h-full overflow-hidden border bg-white/5 rounded-xl backdrop-blur-sm border-white/10"
                                    >
                                        <div className="relative w-full h-48 overflow-hidden" style={{
                                            background: `linear-gradient(to bottom right, ${darkerColor}, ${themeColor})`
                                        }}>
                                            {item.gambar && (
                                                item.gambar.toLowerCase().endsWith('.jpg') ||
                                                item.gambar.toLowerCase().endsWith('.jpeg') ||
                                                item.gambar.toLowerCase().endsWith('.png') ||
                                                item.gambar.toLowerCase().endsWith('.gif') ||
                                                item.gambar.toLowerCase().endsWith('.webp') ? (
                                                    <img
                                                        src={`/storage/assets/${item.gambar}`}
                                                        alt={item.nama_eskul}
                                                        className="object-cover w-full h-full"
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
                                            <div className="absolute inset-0 flex flex-col items-center justify-center hidden text-gray-400">
                                                <FileQuestion className="w-12 h-12 mb-2 opacity-50" />
                                                <p className="text-sm">Gambar tidak dapat dimuat</p>
                                            </div>
                                        </div>

                                        <div className="flex flex-col flex-grow p-4">
                                            <h3 className="mb-2 text-sm font-semibold text-white line-clamp-2">
                                                {item.nama_eskul}
                                            </h3>
                                            <p className="flex-grow mb-4 text-xs text-gray-300 line-clamp-3">
                                                {item.deskripsi}
                                            </p>
                                            <div className="flex items-center justify-between mt-auto text-xs text-gray-400">
                                                <span>Pembina:</span>
                                                <span className="font-semibold" style={{ color: accentColor }}>{item.pembina}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {ekstrakulikuler.length === 0 && (
                                <div className="py-16 text-center">
                                    <div className="flex flex-col items-center justify-center">
                                        <FileQuestion className="w-16 h-16 mb-4 text-gray-400 opacity-50" />
                                        <p className="mb-2 text-lg font-medium text-gray-300">Belum ada data ekstrakurikuler tersedia</p>
                                        <p className="text-sm text-gray-400">Data ekstrakurikuler akan ditampilkan di sini</p>
                                    </div>
                                </div>
                            )}
                        </div>
                         {ekstrakulikuler.length > 0 && (
                                <div className="mt-12 text-center">
                                    <button className="inline-flex items-center px-6 py-3 font-semibold transition-all duration-300 transform rounded-lg hover:scale-105 hover:shadow-lg"
                                        style={{
                                            backgroundColor: accentColor,
                                            color: themeColor
                                        }}
                                    >
                                        <Eye className="w-5 h-5 mr-2" />
                                        <Link href='/ekstrakulikuler' >
                                            Lihat Semua Ekstrakurikuler
                                        </Link>
                                    </button>
                                </div>
                            )}
                    </div>
                </motion.section>

                {/* Guru Section */}
                <motion.section
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 1, ease: "easeOut" }}
                id="guru" className="py-24 sm:py-32" style={{
                    background: `linear-gradient(to bottom, ${themeColor}, ${darkerColor})`
                }}>
                    <div className="px-6 mx-auto max-w-7xl lg:px-8">
                        <div className="max-w-2xl mx-auto lg:text-center">
                            <h2 className="font-semibold text-base/7" style={{ color: accentColor }}>Tenaga Pendidik</h2>
                            <p className="mt-2 text-3xl font-semibold tracking-tight text-white text-balance sm:text-4xl">
                                Guru & Staff Pengajar
                            </p>
                            <p className="mt-4 text-lg text-gray-300">
                                Para pendidik profesional yang berdedikasi dalam mencerdaskan generasi bangsa
                            </p>
                        </div>

                        <div className="max-w-2xl mx-auto mt-16 sm:mt-20 lg:mt-24 lg:max-w-6xl">
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                                {guru.map((guruItem) => (
                                    <div
                                        key={guruItem.id}
                                        className="flex flex-col h-full overflow-hidden border bg-white/5 rounded-xl backdrop-blur-sm border-white/10"
                                    >
                                        <div className="relative w-full h-48 overflow-hidden" style={{
                                            background: `linear-gradient(to bottom right, ${darkerColor}, ${themeColor})`
                                        }}>
                                            {guruItem.foto ? (
                                                <img
                                                    src={`/storage/assets/${guruItem.foto}`}
                                                    alt={guruItem.nama_guru}
                                                    className="object-cover w-full h-full"
                                                    onError={(e) => {
                                                        e.target.style.display = 'none';
                                                        e.target.nextElementSibling?.classList.remove('hidden');
                                                    }}
                                                />
                                            ) : (
                                                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                                                    <User className="w-12 h-12 mb-2 opacity-50" />
                                                    <p className="text-sm">Tidak ada foto</p>
                                                </div>
                                            )}

                                            <div className="absolute inset-0 flex flex-col items-center justify-center hidden text-gray-400">
                                                <User className="w-12 h-12 mb-2 opacity-50" />
                                                <p className="text-sm">Foto tidak dapat dimuat</p>
                                            </div>
                                        </div>

                                        <div className="flex flex-col flex-grow p-4">
                                            <h3 className="mb-2 text-sm font-semibold text-white line-clamp-2">
                                                {guruItem.nama_guru}
                                            </h3>
                                            <p className="flex-grow mb-4 text-xs text-gray-300">
                                                {guruItem.mapel}
                                            </p>
                                            <div className="flex items-center justify-center mt-auto text-xs text-gray-400">
                                                <User className="w-3 h-3 mr-1" />
                                                <span>Guru</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {guru.length === 0 && (
                                <div className="py-16 text-center">
                                    <div className="flex flex-col items-center justify-center">
                                        <User className="w-16 h-16 mb-4 text-gray-400 opacity-50" />
                                        <p className="mb-2 text-lg font-medium text-gray-300">Belum ada data guru tersedia</p>
                                        <p className="text-sm text-gray-400">Data guru akan ditampilkan di sini</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </motion.section>

                {/* Profil Section dengan Google Maps */}
                <section id="profil" className="py-24 sm:py-32" style={{
                    background: `linear-gradient(to bottom, ${lighterColor}, ${themeColor})`
                }}>
                    <div className="px-6 mx-auto max-w-7xl lg:px-8">
                        <div className="max-w-2xl mx-auto lg:text-center">
                            <h2 className="font-semibold text-base/7" style={{ color: accentColor }}>Profil Sekolah</h2>
                            <p className="mt-2 text-3xl font-semibold tracking-tight text-white text-balance sm:text-4xl">
                                {profil.nama_sekolah}
                            </p>
                        </div>
                        <div className="max-w-4xl mx-auto mt-16 sm:mt-20 lg:mt-24">
                            <div className="p-8 border rounded-lg bg-white/5 backdrop-blur-sm border-white/10">
                                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                                    <div>
                                        <h3 className="mb-4 text-xl font-semibold text-white">Identitas Sekolah</h3>
                                        <div className="space-y-4 text-gray-200">
                                            <div>
                                                <strong className="block mb-1">NPSN:</strong>
                                                <span>{profil.npsn}</span>
                                            </div>
                                            <div>
                                                <strong className="block mb-1">Kepala Sekolah:</strong>
                                                <span>{profil.kepala_sekolah}</span>
                                            </div>
                                            <div>
                                                <strong className="block mb-1">Tahun Berdiri:</strong>
                                                <span>{profil.tahun_berdiri}</span>
                                            </div>
                                            <div>
                                                <strong className="block mb-1">Alamat:</strong>
                                                <div className="flex items-start space-x-2">
                                                    <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: accentColor }} />
                                                    <span>{profil.alamat}</span>
                                                </div>
                                            </div>
                                            <div>
                                                <strong className="block mb-1">Kontak:</strong>
                                                <span>{profil.kontak}</span>
                                            </div>
                                            <div>
                                                <strong className="block mb-1">Email:</strong>
                                                <a
                                                    href={`mailto:${profil.email}`}
                                                    className="transition-colors"
                                                    style={{ color: accentColor }}
                                                >
                                                    {profil.email}
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="mb-4 text-xl font-semibold text-white">Visi & Misi</h3>
                                        <div className="text-gray-200">
                                            {visiMisiArray.length > 0 ? (
                                                <div className="space-y-3">
                                                    {visiMisiArray.map((item, index) => (
                                                        <p key={index} className="leading-relaxed">{item}</p>
                                                    ))}
                                                </div>
                                            ) : (
                                                <p>Visi dan misi belum tersedia</p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Google Maps Section */}
                                <div className="pt-8 mt-8 border-t border-white/10">
                                    <h3 className="mb-4 text-xl font-semibold text-white">Lokasi Sekolah</h3>
                                    <GoogleMapEmbed mapLink={profil.link_map} address={profil.alamat} />
                                    <div className="mt-3 text-center">
                                        <a
                                            href={getSafeGoogleMapsUrl(profil.alamat, profil.link_map)}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center px-4 py-2 font-semibold transition-all duration-300 transform rounded-lg hover:scale-105"
                                            style={{
                                                backgroundColor: accentColor,
                                                color: themeColor
                                            }}
                                        >
                                            <MapPin className="w-4 h-4 mr-2" />
                                            Buka di Google Maps
                                        </a>
                                    </div>
                                </div>

                                {profil.deskripsi && (
                                    <div className="pt-8 mt-8 border-t border-white/10">
                                        <h3 className="mb-4 text-xl font-semibold text-white">Deskripsi Sekolah</h3>
                                        <p className="leading-relaxed text-justify text-gray-200">{profil.deskripsi}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer id="kontak" className="py-12 border-t border-white/10" style={{
                    backgroundColor: darkerColor
                }}>
                    <div className="px-6 mx-auto max-w-7xl lg:px-8">
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                            <div>
                                <div className="flex items-center mb-6">
                                    <div className="flex items-center justify-center w-10 h-10 mr-2 rounded-full">
                                        <img src={`/storage/assets/${profil.logo}`} alt={`Logo ${profil.nama_sekolah}`} className="object-contain w-full h-full" />
                                    </div>
                                    <span className="text-2xl font-bold text-white">{profil.nama_sekolah}</span>
                                </div>
                                <div className="mb-4 space-y-2 text-sm text-gray-200">
                                    <div className="flex items-start space-x-2">
                                        <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: accentColor }} />
                                        <div>
                                            <p>{profil.alamat}</p>
                                            <a
                                                href={getSafeGoogleMapsUrl(profil.alamat, profil.link_map)}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center mt-1 text-xs"
                                                style={{ color: accentColor }}
                                            >
                                                Lihat di Google Maps
                                                <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                    <p>📞 Telp: {profil.kontak}</p>
                                    <p>📧 Email: {profil.email}</p>
                                </div>
                            </div>
                            <div>
                                <h3 className="mb-4 text-lg font-semibold text-white">Kontak & Media Sosial</h3>
                                <div className="space-y-2 text-sm text-gray-200">
                                    <p>Email: {profil.email}</p>
                                    <p>Telepon: {profil.kontak}</p>
                                    <br/>
                                    <div className="flex gap-4">
                                        <div className="flex gap-2 align-baseline">
                                            <Youtube className="w-5 h-5" />
                                            <a className='mt-0.5 no-underline hover:underline' href={profil.youtube} target='_blank'>Youtube</a>
                                        </div>
                                        <div className="flex gap-2 align-baseline">
                                            <Instagram className="w-5 h-5" />
                                            <a className='mt-0.5 no-underline hover:underline' href={profil.instagram} target='_blank'>Instagram</a>
                                        </div>
                                        <div className="flex gap-2 align-baseline">
                                            <Facebook className="w-5 h-5" />
                                            <a className='mt-0.5 no-underline hover:underline' href={profil.facebook} target='_blank'>Facebook</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="pt-8 mt-8 border-t border-white/10">
                            <p className="text-sm text-center text-gray-400">
                                © {new Date().getFullYear()} {profil.nama_sekolah}. All rights reserved.
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
