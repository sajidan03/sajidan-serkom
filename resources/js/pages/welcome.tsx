import { login } from '@/routes';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import {motion} from 'framer-motion';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <>
            <Head title="Selamat Datang di Kaswarga">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>

            <div className="bg-gray-900 min-h-screen">
                {/* Header */}
                <motion.header
                initial={{ y: 50, opacity: 0 }}     // mulai agak turun
                animate={{ y: 0, opacity: 1 }}       // naik ke posisi normal
                transition={{ duration: 1, ease: "easeOut" }}
                className="absolute inset-x-0 top-0 z-50">
                    <nav className="flex items-center justify-between p-6 lg:px-8">
                        <div className="flex lg:flex-1">
                            <Link href="/" className="-m-1.5 p-1.5 flex items-center">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-500 text-white mr-2">
                                    <span className="text-lg font-bold">K</span>
                                </div>
                                <span className="text-xl font-bold text-white -py-3">aswarga</span>
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
                            <a href="#fitur" className="text-sm/6 font-semibold text-white hover:text-teal-400">
                                Fitur
                            </a>
                            <a href="#keunggulan" className="text-sm/6 font-semibold text-white hover:text-teal-400">
                                Keunggulan
                            </a>
                            <a href="#testimoni" className="text-sm/6 font-semibold text-white hover:text-teal-400">
                                Testimoni
                            </a>
                            <a href="#tentang" className="text-sm/6 font-semibold text-white hover:text-teal-400">
                                Tentang
                            </a>
                        </div>
                        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                            {auth.user ? (
                                <Link
                                    href='/login'
                                    className="text-sm/6 font-semibold text-white hover:text-teal-400"
                                >
                                    Login <span aria-hidden="true">&rarr;</span>
                                </Link>
                            ) : (
                                <Link
                                    href='/login'
                                    className="text-sm/6 font-semibold text-white hover:text-teal-400"
                                >
                                    Masuk <span aria-hidden="true">&rarr;</span>
                                </Link>
                            )}
                        </div>
                    </nav>

                    {/* Mobile menu dialog */}
                    {mobileMenuOpen && (
                        <div className="lg:hidden">
                            <div className="fixed inset-0 z-50" />
                            <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-white/10">
                                <div className="flex items-center justify-between">
                                    <Link href="/" className="-m-1.5 p-1.5 flex items-center">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-500 text-white mr-2">
                                            <span className="text-lg font-bold">K</span>
                                        </div>
                                        <span className="text-xl font-bold text-white">aswarga</span>
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
                                                href="#fitur"
                                                className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-white/5"
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                Fitur
                                            </a>
                                            <a
                                                href="#keunggulan"
                                                className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-white/5"
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                Keunggulan
                                            </a>
                                            <a
                                                href="#testimoni"
                                                className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-white/5"
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                Testimoni
                                            </a>
                                            <a
                                                href="#tentang"
                                                className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-white/5"
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                Tentang
                                            </a>
                                        </div>
                                        <div className="py-6">
                                            {auth.user ? (
                                                <Link
                                                    href={login()}
                                                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-white hover:bg-white/5"
                                                >
                                                    Login
                                                </Link>
                                            ) : (
                                                <Link
                                                    href={login()}
                                                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-white hover:bg-white/5"
                                                >
                                                    Masuk
                                                </Link>
                                            )}
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
                            className="relative left-[calc(50%-11rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#80ffd4] to-[#fc80ff] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                        />
                    </div>

                    <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
                        <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                            <div className="relative rounded-full px-3 py-1 text-sm/6 text-gray-400 ring-1 ring-white/10 hover:ring-white/20">
                                Platform terbaru untuk mengelola keuangan warga.{' '}
                                <a href="#tentang" className="font-semibold text-teal-400">
                                    <span aria-hidden="true" className="absolute inset-0" />
                                    Pelajari lebih lanjut <span aria-hidden="true">&rarr;</span>
                                </a>
                            </div>
                        </div>
                        <div className="text-center">
                            <h1 className="text-5xl font-semibold tracking-tight text-balance text-white sm:text-7xl">
                                Kelola Keuangan Warga dengan Mudah
                            </h1>
                            <p className="mt-8 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">
                                Aplikasi manajemen kas untuk lingkungan Anda. Pantau pemasukan, pengeluaran,
                                dan laporan keuangan warga secara transparan dan efisien.
                            </p>
                            <div className="mt-10 flex items-center justify-center gap-x-6">
                                {auth.user ? (
                                    <Link
                                        href={login()}
                                        className="rounded-md bg-teal-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-teal-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500"
                                    >
                                        Masuk ke Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={login()}
                                            className="rounded-md bg-teal-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-teal-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500"
                                        >
                                            Mulai Sekarang
                                        </Link>
                                        <Link
                                            href={login()}
                                            className="text-sm/6 font-semibold text-white hover:text-teal-400"
                                        >
                                            Masuk ke Akun <span aria-hidden="true">→</span>
                                        </Link>
                                    </>
                                )}
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
                            className="relative left-[calc(50%+3rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#80ffd4] to-[#fc80ff] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                        />
                    </div>
                </div>

                {/* Features Section */}
                <motion.section
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}   // animasi aktif saat terlihat
                viewport={{ once: true, amount: 0.2 }} // hanya sekali, muncul kalau 20% kelihatan
                transition={{ duration: 1, ease: "easeOut" }}
                id="fitur" className="py-24 sm:py-32 bg-gray-900">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl lg:text-center">
                            <h2 className="text-base/7 font-semibold text-teal-400">Fitur Unggulan</h2>
                            <p className="mt-2 text-3xl font-semibold tracking-tight text-balance text-white sm:text-4xl">
                                Semua yang Anda butuhkan untuk mengelola kas warga
                            </p>
                            <p className="mt-6 text-lg/8 text-gray-400">
                                Kaswarga menyediakan berbagai fitur lengkap untuk memudahkan pengelolaan keuangan lingkungan Anda.
                            </p>
                        </div>
                        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                            <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                                {/* Feature 1 */}
                                <div className="flex flex-col">
                                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-lg bg-teal-500">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-8 w-8 text-white"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                    <h3 className="text-base/7 font-semibold text-white">Transparan</h3>
                                    <p className="mt-2 text-sm/6 text-gray-400">
                                        Semua transaksi tercatat rapi dan dapat diakses warga secara transparan.
                                    </p>
                                </div>

                                {/* Feature 2 */}
                                <div className="flex flex-col">
                                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-lg bg-teal-500">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-8 w-8 text-white"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                    <h3 className="text-base/7 font-semibold text-white">Otomatis</h3>
                                    <p className="mt-2 text-sm/6 text-gray-400">
                                        Pengingat pembayaran dan laporan keuangan dibuat secara otomatis.
                                    </p>
                                </div>

                                {/* Feature 3 */}
                                <div className="flex flex-col">
                                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-lg bg-teal-500">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-8 w-8 text-white"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                    <h3 className="text-base/7 font-semibold text-white">Aman</h3>
                                    <p className="mt-2 text-sm/6 text-gray-400">
                                        Data keuangan terlindungi dengan sistem keamanan modern dan terenkripsi.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* Testimonial Section */}
                <section id="testimoni" className="py-24 sm:py-32 bg-gray-900">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl lg:text-center">
                            <h2 className="text-base/7 font-semibold text-teal-400">Testimoni</h2>
                            <p className="mt-2 text-3xl font-semibold tracking-tight text-balance text-white sm:text-4xl">
                                Apa kata pengguna Kaswarga?
                            </p>
                        </div>
                        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                            <div className="rounded-lg bg-white/5 p-8 backdrop-blur-sm">
                                <p className="text-lg italic text-white">
                                    "Kaswarga telah membantu lingkungan kami mengelola keuangan dengan lebih transparan dan efisien.
                                    Sekarang semua warga bisa melihat laporan keuangan secara real-time tanpa harus menunggu
                                    pertemuan rutin."
                                </p>
                                <p className="mt-6 text-base font-semibold text-teal-400">- Pak RT Cintawana</p>
                                <p className="text-sm text-gray-400">Ketua RT 01, Cintawana</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-24 sm:py-32 bg-gray-900">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl text-center">
                            <h2 className="text-3xl font-semibold tracking-tight text-balance text-white sm:text-4xl">
                                Siap mengelola keuangan warga dengan lebih baik?
                            </h2>
                            <p className="mx-auto mt-6 max-w-xl text-lg/8 text-gray-400">
                                Bergabung dengan ratusan lingkungan yang telah mempercayakan pengelolaan keuangan mereka kepada Kaswarga.
                            </p>
                            <div className="mt-10 flex items-center justify-center gap-x-6">

                                    <Link
                                        href={login()}
                                        className="rounded-md bg-teal-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-teal-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500"
                                    >
                                        Login
                                    </Link>

                                <Link
                                    href="#tentang"
                                    className="text-sm/6 font-semibold text-white hover:text-teal-400"
                                >
                                    Pelajari lebih lanjut <span aria-hidden="true">→</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-gray-900 py-12 border-t border-white/10">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="flex flex-col items-center justify-center">
                            <div className="flex items-center justify-center mb-6">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-500 text-white mr-3">
                                    <span className="text-xl font-bold">K</span>
                                </div>
                                <span className="text-2xl font-bold text-white -ms-2">aswarga</span>
                            </div>
                            <p className="text-center text-sm text-gray-400">
                                © {new Date().getFullYear()} Kaswarga. All rights reserved. Developed by Sajidan & Dhiya
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
