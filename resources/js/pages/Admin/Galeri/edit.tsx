import AppLayout from '@/layouts/app-layout'
import { type BreadcrumbItem } from '@/types'
import { Head, Link, useForm, usePage } from '@inertiajs/react'
import * as Select from '@radix-ui/react-select'
import { ImageIcon, VideoIcon, ChevronDown, ChevronUp, Check } from 'lucide-react'
import { useState, useEffect } from 'react'

interface KategoriOption {
  id: number
  nama: string
}

interface GaleriData {
  id: number
  judul: string
  keterangan: string
  file: string
  kategori_id: number
  kategori_nama: string
  tanggal: string
}

export default function EditGaleri() {
  const { props } = usePage()
  const galeri = props.galeri as GaleriData
  const kategoriOptions = props.kategoriOptions as KategoriOption[]

  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [currentFile, setCurrentFile] = useState<string>(galeri.file)

  const { data, setData, errors, post, processing } = useForm({
    judul: galeri.judul || '',
    keterangan: galeri.keterangan || '',
    file: null as File | null,
    kategori: galeri.kategori_id ? galeri.kategori_id.toString() : '',
    tanggal: galeri.tanggal || new Date().toISOString().split('T')[0],
    _method: 'PUT' as const,
  })

  useEffect(() => {
    if (galeri.file) {
      setCurrentFile(galeri.file)
    }
  }, [galeri.file])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('judul', data.judul)
    formData.append('keterangan', data.keterangan)
    formData.append('kategori', data.kategori)
    formData.append('tanggal', data.tanggal)
    formData.append('_method', 'PUT')

    if (data.file) {
      formData.append('file', data.file)
    }

    post(`/admin/galeri/update/${galeri.id}`, {
      forceFormData: true,
    })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setData('file', file)
    setCurrentFile('')

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

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'Kelola Galeri',
      href: '/admin/galeri',
    },
    {
      title: 'Edit Galeri',
      href: `/admin/galeri/edit/${galeri.id}`,
    },
  ]

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Edit Galeri" />
      <div className="p-0">
        <div className="w-full bg-white p-6 rounded-none shadow-md">
          <h1 className="text-2xl font-bold mb-6">Edit Data Galeri</h1>

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

                {/* Kategori - Diperbaiki dengan styling yang benar */}
                <div className="w-full">
                  <label htmlFor="kategori" className="block text-sm font-medium text-gray-700 mb-1">
                    Kategori <span className="text-red-500">*</span>
                  </label>
                  <Select.Root
                    value={data.kategori}
                    onValueChange={(value) => setData('kategori', value)}
                  >
                    <Select.Trigger
                      id="kategori"
                      className={`flex items-center justify-between w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.kategori ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <Select.Value placeholder="Pilih Kategori" />
                      <Select.Icon>
                        <ChevronDown className="h-4 w-4 opacity-50" />
                      </Select.Icon>
                    </Select.Trigger>

                    <Select.Portal>
                      <Select.Content className="overflow-hidden bg-white rounded-md shadow-lg border border-gray-200 z-50">
                        <Select.ScrollUpButton className="flex items-center justify-center h-6 bg-white text-gray-700 cursor-default">
                          <ChevronUp className="h-4 w-4" />
                        </Select.ScrollUpButton>

                        <Select.Viewport className="p-1">
                          {kategoriOptions.map((kategori) => (
                            <Select.Item
                              key={kategori.id}
                              value={kategori.id.toString()}
                              className="relative flex items-center px-8 py-2 text-sm text-gray-700 rounded-md hover:bg-blue-50 hover:text-blue-700 focus:bg-blue-50 focus:text-blue-700 focus:outline-none cursor-pointer"
                            >
                              <Select.ItemText>
                                <div className="flex items-center gap-2">
                                  {kategori.nama.toLowerCase().includes('foto') ? (
                                    <ImageIcon className="h-4 w-4" />
                                  ) : kategori.nama.toLowerCase().includes('video') ? (
                                    <VideoIcon className="h-4 w-4" />
                                  ) : null}
                                  {kategori.nama}
                                </div>
                              </Select.ItemText>
                              <Select.ItemIndicator className="absolute left-2 inline-flex items-center">
                                <Check className="h-4 w-4 text-blue-600" />
                              </Select.ItemIndicator>
                            </Select.Item>
                          ))}
                        </Select.Viewport>

                        <Select.ScrollDownButton className="flex items-center justify-center h-6 bg-white text-gray-700 cursor-default">
                          <ChevronDown className="h-4 w-4" />
                        </Select.ScrollDownButton>
                      </Select.Content>
                    </Select.Portal>
                  </Select.Root>
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

              {/* Kolom Kanan */}
              <div className="space-y-4 w-full">
                {/* File Upload */}
                <div className="w-full">
                  <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-1">
                    File
                  </label>
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="file"
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
                            <span className="text-white text-sm">Ganti File</span>
                          </div>
                        </div>
                      ) : currentFile ? (
                        <div className="relative w-full h-full">
                          {currentFile.toLowerCase().endsWith('.jpg') ||
                           currentFile.toLowerCase().endsWith('.jpeg') ||
                           currentFile.toLowerCase().endsWith('.png') ||
                           currentFile.toLowerCase().endsWith('.gif') ? (
                            <img
                              src={`/storage/assets/${currentFile}`}
                              alt="Current file"
                              className="w-full h-full object-contain rounded-lg"
                            />
                          ) : (
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <div className="text-4xl mb-4">📄</div>
                              <p className="text-sm text-gray-600">File saat ini: {currentFile}</p>
                              <p className="text-xs text-gray-500 mt-2">Klik untuk mengubah file</p>
                            </div>
                          )}
                          <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity">
                            <span className="text-white text-sm">Ganti File</span>
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
                          <p className="text-xs text-gray-500">SVG, PNG, JPG, GIF, atau PDF (MAX. 5MB)</p>
                        </div>
                      )}
                      <input
                        id="file"
                        name="file"
                        type="file"
                        onChange={handleFileChange}
                        className="hidden"
                        accept="image/*,.pdf,.doc,.docx"
                      />
                    </label>
                  </div>
                  {errors.file && <p className="mt-1 text-sm text-red-500">{errors.file}</p>}
                  {data.file && (
                    <p className="mt-2 text-sm text-gray-600">File baru: {data.file.name}</p>
                  )}
                  {currentFile && !data.file && (
                    <p className="mt-2 text-sm text-gray-600">File saat ini: {currentFile}</p>
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
                {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AppLayout>
  )
}
