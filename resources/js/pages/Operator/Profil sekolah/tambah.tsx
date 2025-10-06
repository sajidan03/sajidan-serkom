import AppLayout from '@/layouts/app-layout'
import { type BreadcrumbItem } from '@/types'
import { Head, Link, useForm, usePage } from '@inertiajs/react'
import { useState } from 'react'
import { Palette } from 'lucide-react'

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Kelola Profil Sekolah',
    href: '/operator/profil-sekolah',
  },
  {
    title: 'Tambah Profil Sekolah',
    href: '/operator/profil-sekolah/tambah',
  },
]

interface PageProps {
  profil?: any
}

export default function TambahProfilSekolah() {
  const { props } = usePage<PageProps>()
  const [previewLogo, setPreviewLogo] = useState<string | null>(null)
  const [previewFoto, setPreviewFoto] = useState<string | null>(null)
  const [previewFotoKepsek, setPreviewFotoKepsek] = useState<string | null>(null)

  const { data, setData, post, errors, processing } = useForm({
    nama_sekolah: '',
    kepala_sekolah: '',
    npsn: '',
    alamat: '',
    kontak: '',
    visi_misi: '',
    tahun_berdiri: '',
    deskripsi: '',
    instagram: '',
    facebook: '',
    youtube: '',
    warna: '#3b82f6', // Default color blue-500
    logo: null as File | null,
    foto: null as File | null,
    foto_kepsek: null as File | null,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    post('/operator/profil-sekolah/tambah', {
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

  const handleFotoKepsekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setData('foto_kepsek', file)

    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreviewFotoKepsek(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setPreviewFotoKepsek(null)
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

  const removeFotoKepsek = () => {
    setData('foto_kepsek', null)
    setPreviewFotoKepsek(null)
  }

  const colorPresets = [
    '#3b82f6', // blue-500
    '#ef4444', // red-500
    '#10b981', // green-500
    '#f59e0b', // yellow-500
    '#8b5cf6', // purple-500
    '#06b6d4', // cyan-500
    '#84cc16', // lime-500
    '#f97316', // orange-500
    '#ec4899', // pink-500
    '#6b7280', // gray-500
  ]

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Tambah Profil Sekolah" />
      <div className="p-0">
        <div className="w-full p-6 bg-white rounded-none shadow-md">
          <h1 className="mb-6 text-2xl font-bold">Tambah Profil Sekolah</h1>

          <form onSubmit={handleSubmit} className="w-full">
            <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-2">

              {/* Kolom Kiri */}
              <div className="w-full space-y-4">
                {/* Nama Sekolah */}
                <div className="w-full">
                  <label htmlFor="nama_sekolah" className="block mb-1 text-sm font-medium text-gray-700">
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
                  <label htmlFor="kepala_sekolah" className="block mb-1 text-sm font-medium text-gray-700">
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
                  <label htmlFor="npsn" className="block mb-1 text-sm font-medium text-gray-700">
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
                  <label htmlFor="kontak" className="block mb-1 text-sm font-medium text-gray-700">
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
                  <label htmlFor="tahun_berdiri" className="block mb-1 text-sm font-medium text-gray-700">
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
              <div className="w-full space-y-4">
                {/* Logo Upload */}
                <div className="w-full">
                  <label htmlFor="logo" className="block mb-1 text-sm font-medium text-gray-700">
                    Logo Sekolah
                  </label>
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="logo"
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:border-gray-400"
                    >
                      {previewLogo ? (
                        <div className="relative w-full h-full">
                          <img
                            src={previewLogo}
                            alt="Preview Logo"
                            className="object-contain w-full h-full rounded-lg"
                          />
                          <div className="absolute inset-0 flex items-center justify-center transition-opacity bg-black opacity-0 bg-opacity-40 hover:opacity-100">
                            <span className="text-sm text-white">Ganti Logo</span>
                          </div>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault()
                              e.stopPropagation()
                              removeLogo()
                            }}
                            className="absolute p-1 text-white transition-colors bg-red-500 rounded-full top-2 right-2 hover:bg-red-600"
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

                {/* Foto Sekolah Upload */}
                <div className="w-full">
                  <label htmlFor="foto" className="block mb-1 text-sm font-medium text-gray-700">
                    Foto Sekolah
                  </label>
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="foto"
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:border-gray-400"
                    >
                      {previewFoto ? (
                        <div className="relative w-full h-full">
                          <img
                            src={previewFoto}
                            alt="Preview Foto"
                            className="object-contain w-full h-full rounded-lg"
                          />
                          <div className="absolute inset-0 flex items-center justify-center transition-opacity bg-black opacity-0 bg-opacity-40 hover:opacity-100">
                            <span className="text-sm text-white">Ganti Foto</span>
                          </div>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault()
                              e.stopPropagation()
                              removeFoto()
                            }}
                            className="absolute p-1 text-white transition-colors bg-red-500 rounded-full top-2 right-2 hover:bg-red-600"
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

                {/* Foto Kepala Sekolah Upload */}
                <div className="w-full">
                  <label htmlFor="foto_kepsek" className="block mb-1 text-sm font-medium text-gray-700">
                    Foto Kepala Sekolah
                  </label>
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="foto_kepsek"
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:border-gray-400"
                    >
                      {previewFotoKepsek ? (
                        <div className="relative w-full h-full">
                          <img
                            src={previewFotoKepsek}
                            alt="Preview Foto Kepala Sekolah"
                            className="object-contain w-full h-full rounded-lg"
                          />
                          <div className="absolute inset-0 flex items-center justify-center transition-opacity bg-black opacity-0 bg-opacity-40 hover:opacity-100">
                            <span className="text-sm text-white">Ganti Foto</span>
                          </div>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault()
                              e.stopPropagation()
                              removeFotoKepsek()
                            }}
                            className="absolute p-1 text-white transition-colors bg-red-500 rounded-full top-2 right-2 hover:bg-red-600"
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
                </div>
              </div>
            </div>

            {/* Alamat (Full Width) */}
            <div className="w-full mt-6">
              <label htmlFor="alamat" className="block mb-1 text-sm font-medium text-gray-700">
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
            <div className="w-full mt-6">
              <label htmlFor="visi_misi" className="block mb-1 text-sm font-medium text-gray-700">
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
            <div className="w-full mt-6">
              <label htmlFor="deskripsi" className="block mb-1 text-sm font-medium text-gray-700">
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
                {/* Link instagram */}
                <div className="w-full">
                  <label htmlFor="instagram" className="block mb-1 text-sm font-medium text-gray-700">
                    Link instagram <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="instagram"
                    type="text"
                    value={data.instagram}
                    onChange={(e) => setData('instagram', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.kepala_sekolah ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Masukkan link instagram"
                  />
                  {errors.instagram && <p className="mt-1 text-sm text-red-500">{errors.instagram}</p>}
                </div>
                <br />
                {/* Link facebook */}
                <div className="w-full">
                  <label htmlFor="facebook" className="block mb-1 text-sm font-medium text-gray-700">
                    Link Facebook <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="facebook"
                    type="text"
                    value={data.facebook}
                    onChange={(e) => setData('facebook', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.facebook ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Masukkan link Facebook"
                  />
                  {errors.facebook && <p className="mt-1 text-sm text-red-500">{errors.facebook}</p>}
                </div>
                <br />

                {/* Link Youtube */}
                <div className="w-full">
                  <label htmlFor="youtube" className="block mb-1 text-sm font-medium text-gray-700">
                    Link Youtube <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="youtube"
                    type="text"
                    value={data.youtube}
                    onChange={(e) => setData('youtube', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.youtube ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Masukkan link Youtube"
                  />
                  {errors.youtube && <p className="mt-1 text-sm text-red-500">{errors.youtube}</p>}
                </div>
            {/* Warna (Full Width) */}
            <div className="w-full mt-6">
              <label htmlFor="warna" className="block mb-3 text-sm font-medium text-gray-700">
                Warna Tema Sekolah
              </label>

              <div className="space-y-4">
                {/* Input Color dengan Preview */}
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-12 h-12 overflow-hidden border-2 border-gray-300 rounded-lg shadow-sm">
                      <input
                        id="warna"
                        name="warna"
                        type="color"
                        value={data.warna}
                        onChange={(e) => setData('warna', e.target.value)}
                        className="w-full h-full border-0 cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <Palette className="w-5 h-5 text-gray-500" />
                      <input
                        type="text"
                        value={data.warna}
                        onChange={(e) => setData('warna', e.target.value)}
                        className="px-3 py-2 font-mono text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="#3b82f6"
                      />
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      Pilih warna tema untuk sekolah atau ketik kode HEX
                    </p>
                  </div>
                </div>

                {/* Color Presets */}
                <div>
                  <p className="mb-2 text-sm font-medium text-gray-700">Pilihan Warna Cepat:</p>
                  <div className="flex flex-wrap gap-2">
                    {colorPresets.map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setData('warna', color)}
                        className={`w-8 h-8 rounded-full border-2 transition-all hover:scale-110 ${
                          data.warna === color ? 'border-gray-800 ring-2 ring-gray-300' : 'border-gray-300'
                        }`}
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {errors.warna && <p className="mt-1 text-sm text-red-500">{errors.warna}</p>}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end w-full mt-8 space-x-4">
              <Link
                href="/operator/profil-sekolah"
                className="px-4 py-2 text-white transition-colors bg-gray-500 rounded-md hover:bg-gray-600"
              >
                Batal
              </Link>
              <button
                type="submit"
                disabled={processing}
                className="px-4 py-2 text-white transition-colors bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
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
