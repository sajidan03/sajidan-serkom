import AppLayout from '@/layouts/app-layout'
import { type BreadcrumbItem } from '@/types'
import { Head, Link, useForm, usePage } from '@inertiajs/react'
import { useState } from 'react'

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Kelola Profil Sekolah',
    href: '/admin/profil-sekolah',
  },
  {
    title: 'Tambah Profil Sekolah',
    href: '/admin/profil-sekolah/tambah',
  },
]

interface PageProps {
  profil?: any
}

export default function TambahProfilSekolah() {
  const { props } = usePage<PageProps>()
  const [previewLogo, setPreviewLogo] = useState<string | null>(null)
  const [previewFoto, setPreviewFoto] = useState<string | null>(null)

  const { data, setData, post, errors, processing } = useForm({
    nama_sekolah: '',
    kepala_sekolah: '',
    npsn: '',
    alamat: '',
    kontak: '',
    visi_misi: '',
    tahun_berdiri: '',
    deskripsi: '',
    logo: null as File | null,
    foto: null as File | null,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    post('/admin/profil-sekolah/tambah', {
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
    } else {
      setPreviewFoto(null)
    }
  }

  const removeLogo = () => {
    setData('logo', null)
    setPreviewLogo(null)
  }

  const removeFoto = () => {
    setData('foto', null)
    setPreviewFoto(null)
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Tambah Profil Sekolah" />
      <div className="p-0">
        <div className="w-full bg-white p-6 rounded-none shadow-md">
          <h1 className="text-2xl font-bold mb-6">Tambah Profil Sekolah</h1>

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
                    type="number"
                    value={data.tahun_berdiri}
                    onChange={(e) => setData('tahun_berdiri', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.tahun_berdiri ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Masukkan tahun berdiri"
                    min="1900"
                    max="2099"
                  />
                  {errors.tahun_berdiri && <p className="mt-1 text-sm text-red-500">{errors.tahun_berdiri}</p>}
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
                </div>

                {/* Foto Upload */}
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
                {processing ? 'Menyimpan...' : 'Simpan Profil Sekolah'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AppLayout>
  )
}
