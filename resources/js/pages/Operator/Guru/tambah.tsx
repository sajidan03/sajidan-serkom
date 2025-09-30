import AppLayout from '@/layouts/app-layout'
import { type BreadcrumbItem } from '@/types'
import { Head, useForm, usePage, router } from '@inertiajs/react'
import { useState } from 'react'

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Kelola Guru',
    href: '/guru',
  },
  {
    title: 'Tambah Guru',
    href: '/guru/tambah',
  },
]

interface Errors {
  nama_guru?: string
  nip?: string
  mapel?: string
  foto?: string
}

export default function TambahGuru() {
  const { props } = usePage()
  const errors = props.errors as Errors

  const { data, setData, post, processing } = useForm({
    nama_guru: '',
    nip: '',
    mapel: '',
    foto: null as File | null,
  })

  const [preview, setPreview] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setData('foto', file)

    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setPreview(null)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    post('/admin/guru/simpan', {
      forceFormData: true,
    })
  }

  const mataPelajaranOptions = [
    'Matematika',
    'Bahasa Indonesia',
    'Bahasa Inggris',
    'IPA',
    'IPS',
    'PKn',
    'Seni Budaya',
    'PJOK',
    'Prakarya',
    'Sejarah',
    'Geografi',
    'Ekonomi',
    'Sosiologi',
    'Fisika',
    'Kimia',
    'Biologi',
    'Agama',
    'BK',
  ]

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Tambah Guru" />
      <div className="p-6">
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-6">Tambah Data Guru</h1>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6">
              {/* Field Foto */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Foto
                </label>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                    {preview ? (
                      <img
                        src={preview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-gray-500 text-xs">No Photo</span>
                    )}
                  </div>
                  <label className="flex flex-col">
                    <span className="sr-only">Pilih foto</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                  </label>
                </div>
                {errors.foto && <p className="mt-1 text-sm text-red-500">{errors.foto}</p>}
              </div>

              {/* Field Nama Guru */}
              <div>
                <label htmlFor="nama_guru" className="block text-sm font-medium text-gray-700 mb-1">
                  Nama Guru <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="nama_guru"
                  value={data.nama_guru}
                  onChange={(e) => setData('nama_guru', e.target.value)}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.nama_guru ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Masukkan nama lengkap guru"
                />
                {errors.nama_guru && <p className="mt-1 text-sm text-red-500">{errors.nama_guru}</p>}
              </div>

              {/* Field NIP */}
              <div>
                <label htmlFor="nip" className="block text-sm font-medium text-gray-700 mb-1">
                  NIP
                </label>
                <input
                  type="text"
                  id="nip"
                  value={data.nip}
                  onChange={(e) => setData('nip', e.target.value)}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.nip ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Masukkan NIP"
                />
                {errors.nip && <p className="mt-1 text-sm text-red-500">{errors.nip}</p>}
              </div>

              {/* Field Mata Pelajaran */}
              <div>
                <label htmlFor="mapel" className="block text-sm font-medium text-gray-700 mb-1">
                  Mata Pelajaran <span className="text-red-500">*</span>
                </label>
                <select
                  id="mapel"
                  value={data.mapel}
                  onChange={(e) => setData('mapel', e.target.value)}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.mapel ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Pilih Mata Pelajaran</option>
                  {mataPelajaranOptions.map((mapel) => (
                    <option key={mapel} value={mapel}>
                      {mapel}
                    </option>
                  ))}
                </select>
                {errors.mapel && <p className="mt-1 text-sm text-red-500">{errors.mapel}</p>}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end mt-8 space-x-4">
              <button
                type="button"
                onClick={() => router.get('/admin/guru')}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={processing}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
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
