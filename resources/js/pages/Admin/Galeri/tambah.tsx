import AppLayout from '@/layouts/app-layout'
import { type BreadcrumbItem } from '@/types'
import { Head, Link, useForm, usePage} from '@inertiajs/react'
import { useState, useEffect } from 'react'

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Kelola Galeri',
    href: '/admin/galeri',
  },
  {
    title: 'Tambah Galeri',
    href: '/admin/galeri/tambah',
  },
]

interface KategoriOption {
  id: number
  nama: string
}

export default function TambahGaleri() {
  const { props } = usePage()
  const [kategoriOptions, setKategoriOptions] = useState<KategoriOption[]>([])

  useEffect(() => {
    if (props.kategoriOptions && Array.isArray(props.kategoriOptions)) {
      setKategoriOptions(props.kategoriOptions)
    } else {
      console.warn('Kategori options tidak ditemukan dalam props, menggunakan data fallback')
      setKategoriOptions([
        { id: 1, nama: 'Foto' },
        { id: 2, nama: 'Video' },
      ])
    }
  }, [props.kategoriOptions])

  const [preview, setPreview] = useState<string | null>(null)
  const [fileType, setFileType] = useState<'image' | 'video' | 'other' | null>(null)

  const { data, setData, errors, post, processing } = useForm({
    judul: '',
    keterangan: '',
    file: null as File | null,
    kategori: '',
    tanggal: new Date().toISOString().split('T')[0],
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('judul', data.judul)
    formData.append('keterangan', data.keterangan)
    formData.append('kategori', data.kategori)
    formData.append('tanggal', data.tanggal)
    if (data.file) {
      formData.append('file', data.file)
    }

    post('/admin/galeri/tambah', {
      forceFormData: true,
    })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setData('file', file)

    // Reset preview
    setPreview(null)
    setFileType(null)

    if (file) {
      // Determine file type
      if (file.type.startsWith('image/')) {
        setFileType('image')
        // Create preview for image files
        const reader = new FileReader()
        reader.onload = (e) => {
          setPreview(e.target?.result as string)
        }
        reader.readAsDataURL(file)
      } else if (file.type.startsWith('video/')) {
        setFileType('video')
        // Create preview for video files
        const videoUrl = URL.createObjectURL(file)
        setPreview(videoUrl)
      } else {
        setFileType('other')
      }
    }
  }

  // Clean up video URL when component unmounts
  useEffect(() => {
    return () => {
      if (preview && fileType === 'video') {
        URL.revokeObjectURL(preview)
      }
    }
  }, [preview, fileType])

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Tambah Galeri" />
      <div className="p-0">
        <div className="w-full bg-white p-6 rounded-none shadow-md">
          <h1 className="text-2xl font-bold mb-6">Tambah Data Galeri</h1>

          <form onSubmit={handleSubmit} className="w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">

              {/* Kolom Kiri */}
              <div className="space-y-4 w-full">
                {/* Judul */}
                <div className="w-full">
                  <label htmlFor="judul" className="block text-sm font-medium text-gray-700 mb-1">
                    Judul <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="judul"
                    type="text"
                    value={data.judul}
                    onChange={(e) => setData('judul', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.judul ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Masukkan judul galeri"
                  />
                  {errors.judul && <p className="mt-1 text-sm text-red-500">{errors.judul}</p>}
                </div>

                {/* Kategori */}
                <div className="w-full">
                  <label htmlFor="kategori" className="block text-sm font-medium text-gray-700 mb-1">
                    Kategori <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="kategori"
                    value={data.kategori}
                    onChange={(e) => setData('kategori', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.kategori ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Pilih Kategori</option>
                    {kategoriOptions.map((kategori) => (
                      <option key={kategori.id} value={kategori.id}>
                        {kategori.nama}
                      </option>
                    ))}
                  </select>
                  {errors.kategori && <p className="mt-1 text-sm text-red-500">{errors.kategori}</p>}
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
              </div>

              {/* Kolom Kanan - File Upload */}
              <div className="space-y-4 w-full">
                {/* File Upload */}
                <div className="w-full">
                  <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-1">
                    File <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="file"
                      className={`flex flex-col items-center justify-center w-full border-2 border-dashed rounded-lg cursor-pointer border-gray-300 hover:border-gray-400 ${
                        preview ? '' : 'h-48'
                      }`}
                    >
                      {preview ? (
                        <div className="w-full">
                          {fileType === 'image' && (
                            <img
                              src={preview}
                              alt="Preview"
                              className="w-full max-h-96 object-contain rounded-lg"
                            />
                          )}
                          {fileType === 'video' && (
                            <video
                              src={preview}
                              className="w-full max-h-96 object-contain rounded-lg"
                              controls
                              controlsList="nodownload"
                            />
                          )}
                          {fileType === 'other' && (
                            <div className="flex flex-col items-center justify-center w-full h-48">
                              <svg
                                className="w-12 h-12 text-gray-400 mb-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                              </svg>
                              <span className="text-sm text-gray-500">File terpilih</span>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center pt-5 pb-6 h-48">
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
                          <p className="text-xs text-gray-500">
                            JPG, JPEG, PNG, GIF, MP4, AVI, PDF, DOC, DOCX (MAX. 5MB)
                          </p>
                        </div>
                      )}
                      <input
                        id="file"
                        name="file"
                        type="file"
                        onChange={handleFileChange}
                        className="hidden"
                        accept="image/*,video/*,.pdf,.doc,.docx"
                      />
                    </label>
                  </div>
                  {errors.file && <p className="mt-1 text-sm text-red-500">{errors.file}</p>}
                  {data.file && (
                    <div className="mt-2 text-sm text-gray-600">
                      <p>File terpilih: {data.file.name}</p>
                      <p>Tipe: {data.file.type}</p>
                      <p>Ukuran: {(data.file.size / (1024 * 1024)).toFixed(2)} MB</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Keterangan (Full Width) */}
            <div className="mt-6 w-full">
              <label htmlFor="keterangan" className="block text-sm font-medium text-gray-700 mb-1">
                Keterangan
              </label>
              <textarea
                id="keterangan"
                name="keterangan"
                value={data.keterangan}
                onChange={(e) => setData('keterangan', e.target.value)}
                rows={4}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.keterangan ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Masukkan keterangan galeri (opsional)"
              />
              {errors.keterangan && <p className="mt-1 text-sm text-red-500">{errors.keterangan}</p>}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end mt-8 space-x-4 w-full">
              <Link
                href="/admin/galeri"
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
