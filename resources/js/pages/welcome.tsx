import { login } from '@/routes';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { profil } = usePage<{ profil: { nama_sekolah: string; logo?: string , deskripsi?: string } }>().props
    return (
        <>
            <Head title="Selamat Datang di SMK YPC Tasikmalaya">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>

            <div className="bg-gradient-to-b from-blue-900 to-blue-800 min-h-screen">
                {/* Header */}
                <motion.header
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="absolute inset-x-0 top-0 z-50">
                    <nav className="flex items-center justify-between p-6 lg:px-8">
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
                            <a href="#profil" className="text-sm/6 font-semibold text-white hover:text-yellow-400">
                                Profil
                            </a>
                            <a href="#jurusan" className="text-sm/6 font-semibold text-white hover:text-yellow-400">
                                Jurusan
                            </a>
                            <a href="#prestasi" className="text-sm/6 font-semibold text-white hover:text-yellow-400">
                                Prestasi
                            </a>
                            <a href="#kontak" className="text-sm/6 font-semibold text-white hover:text-yellow-400">
                                Kontak
                            </a>
                        </div>
                        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                            <Link
                                href='/login'
                                className="text-sm/6 font-semibold text-white hover:text-yellow-400"
                            >
                                Portal Siswa <span aria-hidden="true">&rarr;</span>
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
                                            <span className="text-lg font-bold">Y</span>
                                        </div>
                                        <span className="text-xl font-bold text-white">SMK YPC</span>
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
                                                href="#jurusan"
                                                className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-white/5"
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                Jurusan
                                            </a>
                                            <a
                                                href="#prestasi"
                                                className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-white/5"
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                Prestasi
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

                {/* Main content */}
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
                                Mencetak generasi profesional yang berkarakter, berkompeten, dan siap bersaing di era global.
                            </p>
                            <div className="mt-10 flex items-center justify-center gap-x-6">
                                <Link
                                    href='#jurusan'
                                    className="rounded-md bg-yellow-500 px-3.5 py-2.5 text-sm font-semibold text-blue-900 shadow-xs hover:bg-yellow-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500"
                                >
                                    Lihat Jurusan
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

                {/* Features Section - Jurusan */}
                <motion.section
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 1, ease: "easeOut" }}
                id="jurusan" className="py-24 sm:py-32 bg-gradient-to-b from-blue-800 to-blue-900">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl lg:text-center">
                            <h2 className="text-base/7 font-semibold text-yellow-400">Program Keahlian</h2>
                            <p className="mt-2 text-3xl font-semibold tracking-tight text-balance text-white sm:text-4xl">
                                Jurusan Unggulan SMK YPC Tasikmalaya
                            </p>
                            <p className="mt-6 text-lg/8 text-gray-200">
                                Kami menyediakan program keahlian yang relevan dengan kebutuhan industri saat ini.
                            </p>
                        </div>
                        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                            <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                                {/* Jurusan 1 */}
                                <div className="flex flex-col">
                                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-lg bg-yellow-500">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-8 w-8 text-blue-900"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 3.586L15.414 7A2 2 0 0116 8.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                    <h3 className="text-base/7 font-semibold text-white">Rekayasa Perangkat Lunak</h3>
                                    <p className="mt-2 text-sm/6 text-gray-200">
                                        Mempelajari pemrograman, pengembangan aplikasi, dan teknologi software terkini.
                                    </p>
                                </div>

                                {/* Jurusan 2 */}
                                <div className="flex flex-col">
                                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-lg bg-yellow-500">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-8 w-8 text-blue-900"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                    <h3 className="text-base/7 font-semibold text-white">Teknik Komputer dan Jaringan</h3>
                                    <p className="mt-2 text-sm/6 text-gray-200">
                                        Fokus pada instalasi, maintenance, dan pengelolaan jaringan komputer.
                                    </p>
                                </div>

                                {/* Jurusan 3 */}
                                <div className="flex flex-col">
                                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-lg bg-yellow-500">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-8 w-8 text-blue-900"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 2a8 8 0 00-8 8c0 3.85 2.66 7.07 6.24 7.9v-5.59H5.9V10h2.34V7.97c0-2.32 1.38-3.6 3.5-3.6 1 0 2.06.18 2.06.18v2.27h-1.16c-1.15 0-1.51.71-1.51 1.44V10h2.56l-.41 2.31h-2.15v5.59A8.002 8.002 0 0018 10a8 8 0 00-8-8z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                    <h3 className="text-base/7 font-semibold text-white">Multimedia</h3>
                                    <p className="mt-2 text-sm/6 text-gray-200">
                                        Mengembangkan kreativitas dalam desain grafis, animasi, dan produksi konten digital.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* Profil Section */}
                <section id="profil" className="py-24 sm:py-32 bg-gradient-to-b from-blue-900 to-blue-800">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl lg:text-center">
                            <h2 className="text-base/7 font-semibold text-yellow-400">Profil Sekolah</h2>
                            <p className="mt-2 text-3xl font-semibold tracking-tight text-balance text-white sm:text-4xl">
                                Mengenal SMK YPC Tasikmalaya
                            </p>
                        </div>
                        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                            <div className="rounded-lg bg-white/5 p-8 backdrop-blur-sm">
                                <p className="text-lg text-white text-justify">
                                    {/* SMK YPC Tasikmalaya adalah sekolah menengah kejuruan yang berkomitmen untuk mencetak lulusan
                                    yang kompeten dan siap kerja. Dengan fasilitas modern dan kurikulum yang sesuai dengan
                                    kebutuhan industri, kami mempersiapkan siswa untuk menghadapi tantangan dunia kerja
                                    maupun melanjutkan ke perguruan tinggi. */}
                                    {profil.deskripsi}
                                </p>
                                <div className="mt-8 grid grid-cols-2 gap-4">
                                    <div className="text-center">
                                        <p className="text-3xl font-bold text-yellow-400">500+</p>
                                        <p className="text-sm text-gray-200">Siswa Aktif</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-3xl font-bold text-yellow-400">50+</p>
                                        <p className="text-sm text-gray-200">Tenaga Pengajar</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-3xl font-bold text-yellow-400">10+</p>
                                        <p className="text-sm text-gray-200">Program Keahlian</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-3xl font-bold text-yellow-400">85%</p>
                                        <p className="text-sm text-gray-200">Tingkat Penyerapan Kerja</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Prestasi Section */}
                <section id="prestasi" className="py-24 sm:py-32 bg-gradient-to-b from-blue-800 to-blue-900">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl lg:text-center">
                            <h2 className="text-base/7 font-semibold text-yellow-400">Prestasi</h2>
                            <p className="mt-2 text-3xl font-semibold tracking-tight text-balance text-white sm:text-4xl">
                                Prestasi yang Membanggakan
                            </p>
                        </div>
                        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                            <div className="rounded-lg bg-white/5 p-8 backdrop-blur-sm">
                                <p className="text-lg italic text-white">
                                    "Siswa SMK YPC Tasikmalaya telah meraih berbagai prestasi di tingkat regional maupun nasional
                                    dalam bidang teknologi, seni, dan olahraga. Kami bangga dengan pencapaian mereka yang terus
                                    mengharumkan nama sekolah."
                                </p>
                                <p className="mt-6 text-base font-semibold text-yellow-400">- Dr. H. Ahmad Sopian, M.Pd.</p>
                                <p className="text-sm text-gray-200">Kepala Sekolah SMK YPC Tasikmalaya</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-24 sm:py-32 bg-gradient-to-b from-blue-900 to-blue-800">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl text-center">
                            <h2 className="text-3xl font-semibold tracking-tight text-balance text-white sm:text-4xl">
                                Tertarik menjadi bagian dari SMK YPC Tasikmalaya?
                            </h2>
                            <p className="mx-auto mt-6 max-w-xl text-lg/8 text-gray-200">
                                Daftarkan diri Anda sekarang dan raih masa depan gemilang bersama kami.
                            </p>
                            <div className="mt-10 flex items-center justify-center gap-x-6">
                                <Link
                                    href="#kontak"
                                    className="rounded-md bg-yellow-500 px-3.5 py-2.5 text-sm font-semibold text-blue-900 shadow-xs hover:bg-yellow-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500"
                                >
                                    Informasi Pendaftaran
                                </Link>
                                <Link
                                    href="#profil"
                                    className="text-sm/6 font-semibold text-white hover:text-yellow-400"
                                >
                                    Pelajari lebih lanjut <span aria-hidden="true">→</span>
                                </Link>
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
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-500 text-blue-900 mr-3">
                                        <span className="text-xl font-bold">Y</span>
                                    </div>
                                    <span className="text-2xl font-bold text-white">SMK YPC TASIKMALAYA</span>
                                </div>
                                <p className="text-sm text-gray-200 mb-4">
                                    Jl. YPC No. 123, Tasikmalaya, Jawa Barat<br/>
                                    Telp: (0265) 123456 | Email: info@smkypc.sch.id
                                </p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-4">Ikuti Kami</h3>
                                <div className="flex space-x-4">
                                    <a href="#" className="text-gray-200 hover:text-yellow-400">
                                        <span className="sr-only">Facebook</span>
                                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                                        </svg>
                                    </a>
                                    <a href="#" className="text-gray-200 hover:text-yellow-400">
                                        <span className="sr-only">Instagram</span>
                                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                                        </svg>
                                    </a>
                                    <a href="#" className="text-gray-200 hover:text-yellow-400">
                                        <span className="sr-only">YouTube</span>
                                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="mt-8 border-t border-white/10 pt-8">
                            <p className="text-center text-sm text-gray-400">
                                © {new Date().getFullYear()} SMK YPC Tasikmalaya. All rights reserved.
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
