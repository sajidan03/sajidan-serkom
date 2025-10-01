import AppLayout from '@/layouts/app-layout'
import { type BreadcrumbItem } from '@/types'
import { Head, Link, useForm, usePage } from '@inertiajs/react'
import { useState, useEffect } from 'react'

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Kelola Profil Sekolah',
    href: '/admin/profil-sekolah',
  },
  {
    title: 'Edit Profil Sekolah',
    href: '/admin/profil-sekolah/edit',
  },
]

interface ProfilSekolah {
  id: number
  nama_sekolah: string
  kepala_sekolah: string
  foto: string | null
  logo: string | null
  foto_kepsek: string | null
  npsn: string | null
  alamat: string | null
  kontak: string | null
  visi_misi: string | null
  tahun_berdiri: number | null
  deskripsi: string | null
  created_at: string
  updated_at: string
  encrypted_id: string
}

interface PageProps {
  profil_sekolah?: ProfilSekolah
}

export default function EditProfilSekolah() {
  const { props } = usePage<PageProps>()
  const [previewLogo, setPreviewLogo] = useState<string | null>(null)
  const [previewFoto, setPreviewFoto] = useState<string | null>(null)
  const [previewFotoKepsek, setPreviewFotoKepsek] = useState<string | null>(null)

  const profil = props.profil_sekolah

  const { data, setData, post, errors, processing } = useForm({
    id: profil?.id || 0,
    nama_sekolah: profil?.nama_sekolah || '',
    kepala_sekolah: profil?.kepala_sekolah || '',
    npsn: profil?.npsn || '',
    alamat: profil?.alamat || '',
    kontak: profil?.kontak || '',
    visi_misi: profil?.visi_misi || '',
    tahun_berdiri: profil?.tahun_berdiri?.toString() || '',
    deskripsi: profil?.deskripsi || '',
    logo: null as File | null,
    foto: null as File | null,
    foto_kepsek: null as File | null,
  })

  useEffect(() => {
    if (profil?.logo) {
      setPreviewLogo(`/storage/assets/${profil.logo}`)
    }
    if (profil?.foto) {
      setPreviewFoto(`/storage/assets/${profil.foto}`)
    }
    if (profil?.foto_kepsek) {
      setPreviewFotoKepsek(`/storage/assets/${profil.foto_kepsek}`)
    }
  }, [profil])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    post(`/admin/profil-sekolah/edit/${data.id}`, {
      forceFormData: true,
      preserveScroll: true,
    })
  }

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setData('logo', file)

    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreviewLogo(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    } else if (!file && profil?.logo) {
      setPreviewLogo(`/storage/assets/${profil.logo}`)
    } else {
      setPreviewLogo(null)
    }
  }

  const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setData('foto', file)

    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreviewFoto(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    } else if (!file && profil?.foto) {
      setPreviewFoto(`/storage/assets/${profil.foto}`)
    } else {
      setPreviewFoto(null)
    }
  }

  const handleFotoKepsekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setData('foto_kepsek', file)

    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreviewFotoKepsek(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    } else if (!file && profil?.foto_kepsek) {
      setPreviewFotoKepsek(`/storage/assets/${profil.foto_kepsek}`)
    } else {
      setPreviewFotoKepsek(null)
    }
  }

  const removeLogo = () => {
    setData('logo', null)
    if (profil?.logo) {
      setPreviewLogo(`/storage/assets/${profil.logo}`)
    } else {
      setPreviewLogo(null)
    }
  }

  const removeFoto = () => {
    setData('foto', null)
    if (profil?.foto) {
      setPreviewFoto(`/storage/assets/${profil.foto}`)
    } else {
      setPreviewFoto(null)
    }
  }

  const removeFotoKepsek = () => {
    setData('foto_kepsek', null)
    if (profil?.foto_kepsek) {
      setPreviewFotoKepsek(`/storage/assets/${profil.foto_kepsek}`)
    } else {
      setPreviewFotoKepsek(null)
    }
  }

  // Fungsi untuk validasi input tahun
  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 4) // Hanya angka dan max 4 digit
    setData('tahun_berdiri', value)
  }

  if (!profil) {
    return (
      <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="Edit Profil Sekolah" />
        <div className="p-0">
          <div className="w-full bg-white p-6 rounded-none shadow-md">
            <div className="text-center py-12">
              <div className="text-red-500 text-6xl mb-4">⚠️</div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">Data Tidak Ditemukan</h2>
              <p className="text-gray-600 mb-6">Data profil sekolah tidak tersedia</p>
              <Link
                href="/admin/profil-sekolah"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Kembali ke Daftar Profil Sekolah
              </Link>
            </div>
          </div>
        </div>
      </AppLayout>
    )
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={`Edit Profil Sekolah: ${profil.nama_sekolah}`} />
      <div className="p-0">
        <div className="w-full bg-white p-6 rounded-none shadow-md">
          <h1 className="text-2xl font-bold mb-6">Edit Profil Sekolah: {profil.nama_sekolah}</h1>

          <form onSubmit={handleSubmit} className="w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">

              {/* Kolom Kiri */}
              <div className="space-y-4 w-full">
                {/* Nama Sekolah */}
                <div className="w-full">
                  <label htmlFor="nama_sekolah" className="block text-sm font-medium text-gray-700 mb-1">
                    Nama Sekolah <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="nama_sekolah"
                    type="text"
                    value={data.nama_sekolah}
                    onChange={(e) => setData('nama_sekolah', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.nama_sekolah ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Masukkan nama sekolah"
                  />
                  {errors.nama_sekolah && <p className="mt-1 text-sm text-red-500">{errors.nama_sekolah}</p>}
                </div>

                {/* Kepala Sekolah */}
                <div className="w-full">
                  <label htmlFor="kepala_sekolah" className="block text-sm font-medium text-gray-700 mb-1">
                    Kepala Sekolah <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="kepala_sekolah"
                    type="text"
                    value={data.kepala_sekolah}
                    onChange={(e) => setData('kepala_sekolah', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.kepala_sekolah ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Masukkan nama kepala sekolah"
                  />
                  {errors.kepala_sekolah && <p className="mt-1 text-sm text-red-500">{errors.kepala_sekolah}</p>}
                </div>

                {/* NPSN */}
                <div className="w-full">
                  <label htmlFor="npsn" className="block text-sm font-medium text-gray-700 mb-1">
                    NPSN
                  </label>
                  <input
                    id="npsn"
                    type="text"
                    value={data.npsn}
                    onChange={(e) => setData('npsn', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.npsn ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Masukkan NPSN"
                  />
                  {errors.npsn && <p className="mt-1 text-sm text-red-500">{errors.npsn}</p>}
                </div>

                {/* Kontak */}
                <div className="w-full">
                  <label htmlFor="kontak" className="block text-sm font-medium text-gray-700 mb-1">
                    Kontak
                  </label>
                  <input
                    id="kontak"
                    type="text"
                    value={data.kontak}
                    onChange={(e) => setData('kontak', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.kontak ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Masukkan nomor telepon"
                  />
                  {errors.kontak && <p className="mt-1 text-sm text-red-500">{errors.kontak}</p>}
                </div>

                {/* Tahun Berdiri */}
                <div className="w-full">
                  <label htmlFor="tahun_berdiri" className="block text-sm font-medium text-gray-700 mb-1">
                    Tahun Berdiri
                  </label>
                  <input
                    id="tahun_berdiri"
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]{4}"
                    maxLength={4}
                    value={data.tahun_berdiri}
                    onChange={handleYearChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.tahun_berdiri ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Masukkan tahun berdiri (contoh: 2024)"
                  />
                  {errors.tahun_berdiri && <p className="mt-1 text-sm text-red-500">{errors.tahun_berdiri}</p>}
                  <p className="mt-1 text-xs text-gray-500">
                    Format: 4 digit angka (contoh: 1990, 2024)
                  </p>
                </div>
              </div>

              {/* Kolom Kanan */}
              <div className="space-y-4 w-full">
                {/* Logo Upload */}
                <div className="w-full">
                  <label htmlFor="logo" className="block text-sm font-medium text-gray-700 mb-1">
                    Logo Sekolah
                  </label>
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="logo"
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer border-gray-300 hover:border-gray-400"
                    >
                      {previewLogo ? (
                        <div className="relative w-full h-full">
                          <img
                            src={previewLogo}
                            alt="Preview Logo"
                            className="w-full h-full object-contain rounded-lg"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity">
                            <span className="text-white text-sm">Ganti Logo</span>
                          </div>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault()
                              e.stopPropagation()
                              removeLogo()
                            }}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg
                            className="w-8 h-8 mb-4 text-gray-500"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 16"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                            />
                          </svg>
                          <p className="mb-2 text-sm text-gray-500">
                            <span className="font-semibold">Klik untuk upload logo</span>
                          </p>
                          <p className="text-xs text-gray-500">SVG, PNG, JPG, GIF (MAX. 5MB)</p>
                        </div>
                      )}
                      <input
                        id="logo"
                        name="logo"
                        type="file"
                        onChange={handleLogoChange}
                        className="hidden"
                        accept="image/*"
                      />
                    </label>
                  </div>
                  {errors.logo && <p className="mt-1 text-sm text-red-500">{errors.logo}</p>}
                  {data.logo && (
                    <p className="mt-2 text-sm text-gray-600">File terpilih: {data.logo.name}</p>
                  )}
                  {profil.logo && !data.logo && (
                    <p className="mt-2 text-sm text-gray-600">
                      Logo saat ini: {profil.logo}
                    </p>
                  )}
                </div>

                {/* Foto Sekolah Upload */}
                <div className="w-full">
                  <label htmlFor="foto" className="block text-sm font-medium text-gray-700 mb-1">
                    Foto Sekolah
                  </label>
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="foto"
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer border-gray-300 hover:border-gray-400"
                    >
                      {previewFoto ? (
                        <div className="relative w-full h-full">
                          <img
                            src={previewFoto}
                            alt="Preview Foto"
                            className="w-full h-full object-contain rounded-lg"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity">
                            <span className="text-white text-sm">Ganti Foto</span>
                          </div>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault()
                              e.stopPropagation()
                              removeFoto()
                            }}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg
                            className="w-8 h-8 mb-4 text-gray-500"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 16"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                            />
                          </svg>
                          <p className="mb-2 text-sm text-gray-500">
                            <span className="font-semibold">Klik untuk upload foto</span>
                          </p>
                          <p className="text-xs text-gray-500">JPG, JPEG, PNG (MAX. 5MB)</p>
                        </div>
                      )}
                      <input
                        id="foto"
                        name="foto"
                        type="file"
                        onChange={handleFotoChange}
                        className="hidden"
                        accept="image/*"
                      />
                    </label>
                  </div>
                  {errors.foto && <p className="mt-1 text-sm text-red-500">{errors.foto}</p>}
                  {data.foto && (
                    <p className="mt-2 text-sm text-gray-600">File terpilih: {data.foto.name}</p>
                  )}
                  {profil.foto && !data.foto && (
                    <p className="mt-2 text-sm text-gray-600">
                      Foto saat ini: {profil.foto}
                    </p>
                  )}
                </div>

                {/* Foto Kepala Sekolah Upload */}
                <div className="w-full">
                  <label htmlFor="foto_kepsek" className="block text-sm font-medium text-gray-700 mb-1">
                    Foto Kepala Sekolah
                  </label>
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="foto_kepsek"
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer border-gray-300 hover:border-gray-400"
                    >
                      {previewFotoKepsek ? (
                        <div className="relative w-full h-full">
                          <img
                            src={previewFotoKepsek}
                            alt="Preview Foto Kepala Sekolah"
                            className="w-full h-full object-contain rounded-lg"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity">
                            <span className="text-white text-sm">Ganti Foto</span>
                          </div>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault()
                              e.stopPropagation()
                              removeFotoKepsek()
                            }}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg
                            className="w-8 h-8 mb-4 text-gray-500"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 16"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                            />
                          </svg>
                          <p className="mb-2 text-sm text-gray-500">
                            <span className="font-semibold">Klik untuk upload foto</span>
                          </p>
                          <p className="text-xs text-gray-500">JPG, JPEG, PNG (MAX. 5MB)</p>
                        </div>
                      )}
                      <input
                        id="foto_kepsek"
                        name="foto_kepsek"
                        type="file"
                        onChange={handleFotoKepsekChange}
                        className="hidden"
                        accept="image/*"
                      />
                    </label>
                  </div>
                  {errors.foto_kepsek && <p className="mt-1 text-sm text-red-500">{errors.foto_kepsek}</p>}
                  {data.foto_kepsek && (
                    <p className="mt-2 text-sm text-gray-600">File terpilih: {data.foto_kepsek.name}</p>
                  )}
                  {profil.foto_kepsek && !data.foto_kepsek && (
                    <p className="mt-2 text-sm text-gray-600">
                      Foto saat ini: {profil.foto_kepsek}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Alamat (Full Width) */}
            <div className="mt-6 w-full">
              <label htmlFor="alamat" className="block text-sm font-medium text-gray-700 mb-1">
                Alamat
              </label>
              <textarea
                id="alamat"
                name="alamat"
                value={data.alamat}
                onChange={(e) => setData('alamat', e.target.value)}
                rows={3}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.alamat ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Masukkan alamat lengkap sekolah"
              />
              {errors.alamat && <p className="mt-1 text-sm text-red-500">{errors.alamat}</p>}
            </div>

            {/* Visi & Misi (Full Width) */}
            <div className="mt-6 w-full">
              <label htmlFor="visi_misi" className="block text-sm font-medium text-gray-700 mb-1">
                Visi & Misi
              </label>
              <textarea
                id="visi_misi"
                name="visi_misi"
                value={data.visi_misi}
                onChange={(e) => setData('visi_misi', e.target.value)}
                rows={4}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.visi_misi ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Masukkan visi dan misi sekolah"
              />
              {errors.visi_misi && <p className="mt-1 text-sm text-red-500">{errors.visi_misi}</p>}
            </div>

            {/* Deskripsi (Full Width) */}
            <div className="mt-6 w-full">
              <label htmlFor="deskripsi" className="block text-sm font-medium text-gray-700 mb-1">
                Deskripsi
              </label>
              <textarea
                id="deskripsi"
                name="deskripsi"
                value={data.deskripsi}
                onChange={(e) => setData('deskripsi', e.target.value)}
                rows={4}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.deskripsi ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Masukkan deskripsi sekolah"
              />
              {errors.deskripsi && <p className="mt-1 text-sm text-red-500">{errors.deskripsi}</p>}
            </div>

            {/* Info file saat ini */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">Informasi File Saat Ini:</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-blue-700">
                <div>
                  <strong>Logo:</strong> {profil.logo ? (
                    <span className="text-green-600">{profil.logo}</span>
                  ) : (
                    <span className="text-gray-500">Belum ada logo</span>
                  )}
                </div>
                <div>
                  <strong>Foto Sekolah:</strong> {profil.foto ? (
                    <span className="text-green-600">{profil.foto}</span>
                  ) : (
                    <span className="text-gray-500">Belum ada foto</span>
                  )}
                </div>
                <div>
                  <strong>Foto Kepala Sekolah:</strong> {profil.foto_kepsek ? (
                    <span className="text-green-600">{profil.foto_kepsek}</span>
                  ) : (
                    <span className="text-gray-500">Belum ada foto</span>
                  )}
                </div>
              </div>
              <p className="text-xs text-blue-600 mt-2">
                * Upload file baru untuk mengganti file yang sudah ada. Biarkan kosong jika tidak ingin mengubah.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end mt-8 space-x-4 w-full">
              <Link
                href="/admin/profil-sekolah"
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
              >
                Batal
              </Link>
              <button
                type="submit"
                disabled={processing}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AppLayout>
  )
}
