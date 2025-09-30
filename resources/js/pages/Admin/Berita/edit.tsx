import AppLayout from '@/layouts/app-layout'
import { type BreadcrumbItem } from '@/types'
import { Head, Link, useForm, usePage } from '@inertiajs/react'
import { useState, useEffect } from 'react'

interface User {
  id: number
  name: string
}

interface Berita {
  id: number
  judul: string
  isi: string
  gambar: string | null
  tanggal: string
  id_user: number
  user?: User
}

interface EditBeritaProps {
  berita: Berita
}

export default function EditBerita({ berita }: EditBeritaProps) {
  const { props } = usePage()
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  const authUser = props.auth?.user

  const { data, setData, errors, post, processing, reset } = useForm({
    id: berita.id || 0,
    judul: berita.judul || '',
    isi: berita.isi || '',
    gambar: null as File | null,
    tanggal: berita.tanggal || new Date().toISOString().split('T')[0],
    id_user: authUser?.id || berita.id_user,
    _method: 'POST' as const,
  })

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'Kelola Berita',
      href: '/admin/berita',
    },
    {
      title: `Edit Berita: ${berita.judul || 'Untitled'}`,
      href: `/admin/berita/${berita.id}/edit`,
    },
  ]

  useEffect(() => {
    if (berita.gambar) {
      setPreviewImage(`/storage/assets/${berita.gambar}`)
    }
  }, [berita.gambar])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    post(`/admin/berita/edit/${data.id}`, {
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
    } else if (!file && berita.gambar) {
      // Jika file dihapus, kembalikan ke gambar lama
      setPreviewImage(`/storage/assets/${berita.gambar}`)
    } else {
      setPreviewImage(null)
    }
  }

  const hapusGambar = () => {
    setData('gambar', null)
    // Kembalikan ke gambar lama saat hapus
    if (berita.gambar) {
      setPreviewImage(`/storage/assets/${berita.gambar}`)
    } else {
      setPreviewImage(null)
    }
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={`Edit Berita: ${berita.judul || 'Untitled'}`} />
      <div className="p-0">
        <div className="w-full bg-white p-6 rounded-none shadow-md">
          <h1 className="text-2xl font-bold mb-6">Edit Data Berita</h1>

          {/* Info User yang Login dan pembuat berita */}
          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-700">
              <strong>Ditambahkan oleh:</strong> {berita.user?.name || authUser?.name || 'Unknown User'}
            </p>
            <p className="text-sm text-blue-700 mt-1">
              <strong>Diedit oleh:</strong> {authUser?.name || 'Unknown User'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">

              {/* Kolom Kiri */}
              <div className="space-y-4 w-full">
                {/* Judul */}
                <div className="w-full">
                  <label htmlFor="judul" className="block text-sm font-medium text-gray-700 mb-1">
                    Judul Berita <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="judul"
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
                  onChange={(e) => setData('id_user', parseInt(e.target.value))}
                />
              </div>

              {/* Kolom Kanan */}
              <div className="space-y-4 w-full">
                {/* Gambar Upload */}
                <div className="w-full">
                  <label htmlFor="gambar" className="block text-sm font-medium text-gray-700 mb-1">
                    Gambar {!berita.gambar && <span className="text-red-500">*</span>}
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
                    <div className="mt-2 flex items-center justify-between">
                      <p className="text-sm text-gray-600">File terpilih: {data.gambar.name}</p>
                      <button
                        type="button"
                        onClick={hapusGambar}
                        className="text-sm text-red-600 hover:text-red-800"
                      >
                        Hapus
                      </button>
                    </div>
                  )}
                  {berita.gambar && !data.gambar && (
                    <p className="mt-2 text-sm text-gray-600">
                      Gambar saat ini: {berita.gambar}
                    </p>
                  )}
                </div>
              </div>
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
                rows={10}
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
                {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AppLayout>
  )
}
