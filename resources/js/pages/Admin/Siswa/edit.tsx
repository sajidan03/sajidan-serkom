import AppLayout from '@/layouts/app-layout'
import { type BreadcrumbItem } from '@/types'
import { Head, useForm, usePage, router } from '@inertiajs/react'
import { useState, useEffect } from 'react'

interface Errors {
  nisn?: string
  nama_siswa?: string
  jenis_kelamin?: string
  jurusan?: string
  tahun_masuk?: string
}

interface Siswa {
  id: number
  encrypted_id: string
  nisn: string
  nama_siswa: string
  jenis_kelamin: string
  jurusan: string
  tahun_masuk: string
}

interface PageProps {
  errors: Errors
  siswa: Siswa
}

export default function EditSiswa() {
  const { props } = usePage<PageProps>()
  const { errors, siswa } = props

  const { data, setData, post, processing } = useForm({
    encrypted_id: siswa?.encrypted_id || '',
    nisn: siswa?.nisn || '',
    nama_siswa: siswa?.nama_siswa || '',
    jenis_kelamin: siswa?.jenis_kelamin || '',
    jurusan: siswa?.jurusan || '',
    tahun_masuk: siswa?.tahun_masuk || '',
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

  // Jika siswa tidak ditemukan, tampilkan pesan error
  if (!siswa) {
    return (
      <AppLayout>
        <Head title="Error" />
        <div className="p-6">
          <div className="w-full mx-auto bg-white p-6 rounded-lg shadow-md">
            <div className="text-center text-red-500">
              <p>Data siswa tidak ditemukan</p>
              <button
                onClick={() => router.get('/admin/siswa')}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
              >
                Kembali ke Daftar Siswa
              </button>
            </div>
          </div>
        </div>
      </AppLayout>
    )
  }

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'Kelola Siswa',
      href: '/admin/siswa',
    },
    {
      title: `Edit Siswa - ${siswa.nama_siswa}`,
      href: `/admin/siswa/edit/${siswa.encrypted_id}`,
    },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    post(`/admin/siswa/update/${data.encrypted_id}`, {
      onError: (errors) => {
        console.log('Errors:', errors)
      },
      onSuccess: () => {
        router.visit('/admin/siswa')
      }
    })
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={`Edit Siswa - ${siswa.nama_siswa}`} />
      <div className="p-6">
        <div className="w-full mx-auto bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-6">Edit Data Siswa - {siswa.nama_siswa}</h1>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Field NISN */}
              <div className="md:col-span-1">
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
              <div className="md:col-span-2">
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

              {/* Field Jurusan */}
              <div className="md:col-span-1">
                <label htmlFor="jurusan" className="block text-sm font-medium text-gray-700 mb-1">
                  Jurusan <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="jurusan"
                  value={data.jurusan}
                  onChange={(e) => setData('jurusan', e.target.value)}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.jurusan ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Jurusan"
                />
                {errors.jurusan && <p className="mt-1 text-sm text-red-500">{errors.jurusan}</p>}
              </div>

              {/* Field Tahun Masuk */}
              <div className="md:col-span-1">
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

              {/* Field Jenis Kelamin */}
              <div className="md:col-span-2">
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
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end mt-8 space-x-4">
              <button
                type="button"
                onClick={() => router.get('/admin/siswa')}
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={processing}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
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
