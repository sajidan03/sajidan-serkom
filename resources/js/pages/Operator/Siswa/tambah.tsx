import AppLayout from '@/layouts/app-layout'
import { type BreadcrumbItem } from '@/types'
import { Head, useForm, usePage, router } from '@inertiajs/react'
import { useState, useEffect } from 'react'

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Kelola Siswa',
    href: '/siswa',
  },
  {
    title: 'Tambah Siswa',
    href: '/siswa/tambah',
  },
]

interface Errors {
  nisn?: string
  nama_siswa?: string
  jenis_kelamin?: string
  tahun_masuk?: string
}

export default function TambahSiswa() {
  const { props } = usePage()
  const errors = props.errors as Errors

  const { data, setData, post, processing } = useForm({
    nisn: '',
    nama_siswa: '',
    jenis_kelamin: '',
    jurusan: '',
    tahun_masuk: '',
  })

  const [tahunOptions, setTahunOptions] = useState<number[]>([])

  useEffect(() => {
    // Generate tahun options (10 tahun terakhir hingga tahun depan)
    const currentYear = new Date().getFullYear()
    const years = []
    for (let i = -5; i <= 1; i++) {
      years.push(currentYear + i)
    }
    setTahunOptions(years.sort((a, b) => b - a)) // Urutkan dari tahun terbaru
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    post('/admin/siswa/simpan')
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Tambah Siswa" />
      <div className="p-6">
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-6">Tambah Data Siswa</h1>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6">
              {/* Field NISN */}
              <div>
                <label htmlFor="nisn" className="block text-sm font-medium text-gray-700 mb-1">
                  NISN <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="nisn"
                  value={data.nisn}
                  onChange={(e) => setData('nisn', e.target.value)}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.nisn ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Masukkan NISN"
                />
                {errors.nisn && <p className="mt-1 text-sm text-red-500">{errors.nisn}</p>}
              </div>

              {/* Field Nama Siswa */}
              <div>
                <label htmlFor="nama_siswa" className="block text-sm font-medium text-gray-700 mb-1">
                  Nama Siswa <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="nama_siswa"
                  value={data.nama_siswa}
                  onChange={(e) => setData('nama_siswa', e.target.value)}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.nama_siswa ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Masukkan nama lengkap siswa"
                />
                {errors.nama_siswa && <p className="mt-1 text-sm text-red-500">{errors.nama_siswa}</p>}
              </div>

              <div>
                <label htmlFor="jurusan" className="block text-sm font-medium text-gray-700 mb-1">
                 Jurusan <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="jurusan"
                  value={data.jurusan}
                  onChange={(e) => setData('jurusan', e.target.value)}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.nama_siswa ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Jurusan"
                />
                {errors.nama_siswa && <p className="mt-1 text-sm text-red-500">{errors.nama_siswa}</p>}
              </div>

              {/* Field Jenis Kelamin */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Jenis Kelamin <span className="text-red-500">*</span>
                </label>
                <div className="flex space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="jenis_kelamin"
                      value="Laki-laki"
                      checked={data.jenis_kelamin === 'Laki-laki'}
                      onChange={(e) => setData('jenis_kelamin', e.target.value)}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2">Laki-laki</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="jenis_kelamin"
                      value="Perempuan"
                      checked={data.jenis_kelamin === 'Perempuan'}
                      onChange={(e) => setData('jenis_kelamin', e.target.value)}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2">Perempuan</span>
                  </label>
                </div>
                {errors.jenis_kelamin && <p className="mt-1 text-sm text-red-500">{errors.jenis_kelamin}</p>}
              </div>

              {/* Field Tahun Masuk */}
              <div>
                <label htmlFor="tahun_masuk" className="block text-sm font-medium text-gray-700 mb-1">
                  Tahun Masuk <span className="text-red-500">*</span>
                </label>
                <select
                  id="tahun_masuk"
                  value={data.tahun_masuk}
                  onChange={(e) => setData('tahun_masuk', e.target.value)}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.tahun_masuk ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Pilih Tahun Masuk</option>
                  {tahunOptions.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
                {errors.tahun_masuk && <p className="mt-1 text-sm text-red-500">{errors.tahun_masuk}</p>}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end mt-8 space-x-4">
              <button
                type="button"
                onClick={() => router.get('/admin/siswa')}
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
