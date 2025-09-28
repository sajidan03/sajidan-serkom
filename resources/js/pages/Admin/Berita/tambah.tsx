import AppLayout from '@/layouts/app-layout'
import { type BreadcrumbItem } from '@/types'
import { Input } from '@headlessui/react'
import { Head, Link, useForm, usePage } from '@inertiajs/react'
import { Heading } from 'lucide-react'
import { useState, useEffect } from 'react'

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Kelola Berita',
    href: '/admin/berita',
  },
  {
    title: 'Tambah Berita',
    href: '/admin/berita/tambah',
  },
]

export default function TambahBerita() {
  const { props } = usePage()
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  // Ambil data user yang login dari props
  const authUser = props.auth?.user

  const { data, setData, errors, post, processing } = useForm({
    judul: '',
    isi: '',
    gambar: null as File | null,
    tanggal: new Date().toISOString().split('T')[0],
    id_user: authUser?.id || '', // otomatis ambil id user yang login
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('judul', data.judul)
    formData.append('isi', data.isi)
    formData.append('tanggal', data.tanggal)
    formData.append('id_user', data.id_user) // otomatis dari user login
    if (data.gambar) {
      formData.append('gambar', data.gambar)
    }

    post('/admin/berita/tambah', {
      forceFormData: true,
    })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setData('gambar', file)

    // Create preview for image files
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreviewImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setPreviewImage(null)
    }
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Tambah Berita" />
      <div className="p-0">
        <div className="w-full bg-white p-6 rounded-none shadow-md">
          <h1 className="text-2xl font-bold mb-6">Tambah Data Berita</h1>

          {/* Info User yang Login */}
          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-700">
              <strong>Ditambahkan oleh:</strong> {authUser?.name} ({authUser?.email})
            </p>
          </div>

          <form onSubmit={handleSubmit} className="w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">

              {/* Kolom Kiri */}
              <div className="space-y-4 w-full">
                {/* Judul - DIHAPUS karena tidak ada di tabel */}
                {/* Hanya field yang ada di tabel: isi, tanggal, gambar, id_user */}

                {/* Tanggal */}
                <div className="w-full">
                  <label htmlFor="tanggal" className="block text-sm font-medium text-gray-700 mb-1">
                    Tanggal <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="tanggal"
                    type="date"
                    value={data.tanggal}
                    onChange={(e) => setData('tanggal', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.tanggal ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.tanggal && <p className="mt-1 text-sm text-red-500">{errors.tanggal}</p>}
                </div>

                {/* id_user (hidden) */}
                <input
                  type="hidden"
                  value={data.id_user}
                  onChange={(e) => setData('id_user', e.target.value)}
                />
              </div>

              {/* Kolom Kanan */}
              <div className="space-y-4 w-full">
                {/* Gambar Upload */}
                <div className="w-full">
                  <label htmlFor="gambar" className="block text-sm font-medium text-gray-700 mb-1">
                    Gambar <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="gambar"
                      className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer border-gray-300 hover:border-gray-400"
                    >
                      {previewImage ? (
                        <div className="relative w-full h-full">
                          <img
                            src={previewImage}
                            alt="Preview"
                            className="w-full h-full object-contain rounded-lg"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity">
                            <span className="text-white text-sm">Ganti Gambar</span>
                          </div>
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
                            <span className="font-semibold">Klik untuk upload</span> atau drag and drop
                          </p>
                          <p className="text-xs text-gray-500">JPG, JPEG, PNG, GIF (MAX. 5MB)</p>
                        </div>
                      )}
                      <input
                        id="gambar"
                        name="gambar"
                        type="file"
                        onChange={handleFileChange}
                        className="hidden"
                        accept="image/*"
                      />
                    </label>
                  </div>
                  {errors.gambar && <p className="mt-1 text-sm text-red-500">{errors.gambar}</p>}
                  {data.gambar && (
                    <p className="mt-2 text-sm text-gray-600">File terpilih: {data.gambar.name}</p>
                  )}
                </div>
              </div>
            </div>
            {/* isi judul */}
            {/* Judul */}
            <div className="w-full">
            <label htmlFor="judul" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                Judul Berita <span className="text-red-500">*</span>
            </label>
            <input
                id="judul"
                name="judul"
                type="text"
                value={data.judul}
                onChange={(e) => setData('judul', e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.judul ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Masukkan judul berita"
            />
            {errors.judul && <p className="mt-1 text-sm text-red-500">{errors.judul}</p>}
            </div>
            {/* Isi Berita (Full Width) */}
            <div className="mt-6 w-full">
              <label htmlFor="isi" className="block text-sm font-medium text-gray-700 mb-1">
                Isi Berita <span className="text-red-500">*</span>
              </label>
              <textarea
                id="isi"
                name="isi"
                value={data.isi}
                onChange={(e) => setData('isi', e.target.value)}
                rows={6}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.isi ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Masukkan isi berita"
              />
              {errors.isi && <p className="mt-1 text-sm text-red-500">{errors.isi}</p>}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end mt-8 space-x-4 w-full">
              <Link
                href="/admin/berita"
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
              >
                Batal
              </Link>
              <button
                type="submit"
                disabled={processing}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                {processing ? 'Menyimpan...' : 'Simpan'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AppLayout>
  )
}
//
