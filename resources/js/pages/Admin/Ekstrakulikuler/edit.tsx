import AppLayout from '@/layouts/app-layout'
import { type BreadcrumbItem } from '@/types'
import { router } from '@inertiajs/core'
import { Head, Link, useForm, usePage } from '@inertiajs/react'
import { useState, useEffect } from 'react'

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Kelola Ekstrakurikuler',
    href: '/admin/ekstrakurikuler',
  },
  {
    title: 'Edit Ekstrakurikuler',
    href: '/admin/ekstrakurikuler/edit',
  },
]

interface Guru {
  id: number
  nama_guru: string
  nip: string
  mapel: string
  foto: string
}

interface Ekstrakulikuler {
  id: number
  nama_eskul: string
  jadwal_latihan: string
  deskripsi: string
  gambar: string | null
  id_guru: number
  encrypted_id: string
}

interface PageProps {
  guru: Guru[]
//   profil: any
  ekstrakulikuler?: Ekstrakulikuler
}

export default function EditEkstrakurikuler() {
  const { props } = usePage<PageProps>()
  const [guruOptions, setGuruOptions] = useState<Guru[]>([])
  const { ekstrakulikuler } = props

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (props.guru && Array.isArray(props.guru)) {
      setGuruOptions(props.guru)
    }

    if (ekstrakulikuler) {
      setIsLoading(false)
      console.log('Data ekstrakulikuler:', ekstrakulikuler)
    } else {
      setError('Data ekstrakurikuler tidak ditemukan')
      setIsLoading(false)
    }
  }, [props.guru, ekstrakulikuler])

  const [previewImage, setPreviewImage] = useState<string | null>(
    ekstrakulikuler?.gambar ? `/storage/assets/${ekstrakulikuler.gambar}` : null
  )

  const { data, setData, post, errors, processing } = useForm({
    id: ekstrakulikuler?.id,
    nama_eskul: ekstrakulikuler?.nama_eskul || '',
    jadwal_latihan: ekstrakulikuler?.jadwal_latihan || '',
    deskripsi: ekstrakulikuler?.deskripsi || '',
    gambar: null as File | null,
    id_guru: ekstrakulikuler?.id_guru || '',
    encrypted_id : ekstrakulikuler?.encrypted_id,
    _method: 'POST' as const,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
     post(`/admin/ekstrakulikuler/edit/${data.id}`, {
          forceFormData: true,
          onError: (errors) => {
            console.log('Errors:', errors)
          },
          onSuccess: () => {
            router.visit('/admin/guru')
          }
        })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setData('gambar', file)

    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreviewImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      if (!file && ekstrakulikuler?.gambar) {
        setPreviewImage(`/storage/assets/${ekstrakulikuler.gambar}`)
      } else {
        setPreviewImage(null)
      }
    }
  }

  const removeImage = () => {
    setData('gambar', null)
    setPreviewImage(ekstrakulikuler?.gambar ? `/storage/assets/${ekstrakulikuler.gambar}` : null)
  }

  if (isLoading) {
    return (
      <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="Edit Ekstrakurikuler" />
        <div className="p-0">
          <div className="w-full bg-white p-6 rounded-none shadow-md">
            <div className="flex justify-center items-center py-12">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Memuat data...</p>
              </div>
            </div>
          </div>
        </div>
      </AppLayout>
    )
  }

  if (error || !ekstrakulikuler) {
    return (
      <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="Edit Ekstrakurikuler" />
        <div className="p-0">
          <div className="w-full bg-white p-6 rounded-none shadow-md">
            <div className="text-center py-12">
              <div className="text-red-500 text-6xl mb-4">⚠️</div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">Data Tidak Ditemukan</h2>
              <p className="text-gray-600 mb-6">{error || 'Data ekstrakurikuler tidak tersedia'}</p>
              <Link
                href="/admin/ekstrakurikuler"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Kembali ke Daftar Ekstrakurikuler
              </Link>
            </div>
          </div>
        </div>
      </AppLayout>
    )
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Edit Ekstrakurikuler" />
      <div className="p-0">
        <div className="w-full bg-white p-6 rounded-none shadow-md">
          <h1 className="text-2xl font-bold mb-6">Edit Data Ekstrakurikuler</h1>

          {/* Debug Info */}
          <div className="mb-4 p-3 bg-blue-50 rounded-md">
            <p className="text-sm text-blue-700">
              Debug: Encrypted ID: {ekstrakulikuler.encrypted_id || 'Tidak tersedia'} |
              Regular ID: {ekstrakulikuler.id} |
              Pembina Value: {data.id_guru || 'Belum dipilih'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
              {/* Kolom Kiri */}
              <div className="space-y-4 w-full">
                {/* Nama Ekstrakurikuler */}
                <div className="w-full">
                  <label htmlFor="nama_eskul" className="block text-sm font-medium text-gray-700 mb-1">
                    Nama Ekstrakurikuler <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="nama_eskul"
                    type="text"
                    value={data.nama_eskul}
                    onChange={(e) => setData('nama_eskul', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.nama_eskul ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Masukkan nama ekstrakurikuler"
                  />
                  {errors.nama_eskul && <p className="mt-1 text-sm text-red-500">{errors.nama_eskul}</p>}
                </div>

                {/* Pembina (Guru) */}
                <div className="w-full">
                  <label htmlFor="id_guru" className="block text-sm font-medium text-gray-700 mb-1">
                    Pembina <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="id_guru"
                    value={data.id_guru}
                    onChange={(e) => setData('id_guru', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.id_guru ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Pilih Pembina</option>
                    {guruOptions.map((guru) => (
                      <option key={guru.id} value={guru.id}>
                        {guru.nama_guru} {guru.nip ? `- ${guru.nip}` : ''}
                      </option>
                    ))}
                  </select>
                  {errors.id_guru && <p className="mt-1 text-sm text-red-500">{errors.id_guru}</p>}
                </div>

                {/* Jadwal Latihan */}
                <div className="w-full">
                  <label htmlFor="jadwal_latihan" className="block text-sm font-medium text-gray-700 mb-1">
                    Jadwal Latihan <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="jadwal_latihan"
                    type="text"
                    value={data.jadwal_latihan}
                    onChange={(e) => setData('jadwal_latihan', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.jadwal_latihan ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Contoh: Senin & Kamis, 15:00-17:00"
                  />
                  {errors.jadwal_latihan && <p className="mt-1 text-sm text-red-500">{errors.jadwal_latihan}</p>}
                </div>
              </div>

              {/* Kolom Kanan */}
              <div className="space-y-4 w-full">
                {/* Gambar Upload */}
                <div className="w-full">
                  <label htmlFor="gambar" className="block text-sm font-medium text-gray-700 mb-1">
                    Gambar
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
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault()
                              e.stopPropagation()
                              removeImage()
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
                            <span className="font-semibold">Klik untuk upload</span> atau drag and drop
                          </p>
                          <p className="text-xs text-gray-500">SVG, PNG, JPG, GIF (MAX. 5MB)</p>
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
                  {ekstrakulikuler.gambar && !data.gambar && (
                    <p className="mt-2 text-sm text-gray-600">
                      Gambar saat ini: {ekstrakulikuler.gambar}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Deskripsi (Full Width) */}
            <div className="mt-6 w-full">
              <label htmlFor="deskripsi" className="block text-sm font-medium text-gray-700 mb-1">
                Deskripsi <span className="text-red-500">*</span>
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
                placeholder="Masukkan deskripsi ekstrakurikuler"
              />
              {errors.deskripsi && <p className="mt-1 text-sm text-red-500">{errors.deskripsi}</p>}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end mt-8 space-x-4 w-full">
              <Link
                href="/admin/ekstrakurikuler"
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
