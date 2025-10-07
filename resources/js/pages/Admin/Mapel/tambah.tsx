import AppLayout from '@/layouts/app-layout'
import { type BreadcrumbItem } from '@/types'
import { Head, useForm, router } from '@inertiajs/react'
import { useState } from 'react'

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Mata Pelajaran',
    href: '/admin/mapel',
  },
  {
    title: 'Tambah Mata Pelajaran',
    href: '/admin/mapel/tambah',
  },
]

export default function MapelCreate() {
  const { data, setData, post, processing, errors, reset } = useForm({
    mapel: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    post('/admin/mapel/tambah', {
      onSuccess: () => {
        setIsSubmitting(false)
        reset()
        alert('Mata pelajaran berhasil ditambahkan!')
        router.visit('/admin/mapel')
      },
      onError: () => {
        setIsSubmitting(false)
      },
      preserveScroll: true,
    })
  }

  const handleCancel = () => {
    router.get('/admin/mapel')
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Tambah Mata Pelajaran" />
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Tambah Mata Pelajaran</h1>
                <p className="text-gray-600 mt-1">
                  Tambahkan mata pelajaran baru ke dalam sistem
                </p>
              </div>
              <button
                type="button"
                onClick={handleCancel}
                disabled={processing}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
              >
                Kembali
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 py-6">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <div className="grid grid-cols-1 gap-6">

              {/* Form Section */}
              <div className="bg-white shadow-md rounded-lg">
                <div className="px-6 py-5 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Informasi Mata Pelajaran
                  </h2>
                </div>

                <div className="p-4 sm:p-6">
                  <form onSubmit={ handleSubmit} className="space-y-6">
                    {/* Field Nama Mata Pelajaran */}
                    <div>
                      <label
                        htmlFor="mapel"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Nama Mata Pelajaran <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="mapel"
                        name="mapel"
                        value={data.mapel}
                        onChange={(e) => setData('mapel', e.target.value)}
                        className={`w-full px-5 py-3 border rounded-xl shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          errors.mapel ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Contoh: Matematika, Bahasa Indonesia, IPA"
                        disabled={processing}
                        autoFocus
                      />
                      {errors.mapel && (
                        <p className="mt-2 text-sm text-red-600">{errors.mapel}</p>
                      )}
                      <p className="mt-2 text-sm text-gray-500">
                        Masukkan nama mata pelajaran dengan jelas dan mudah dipahami
                      </p>
                    </div>

                    {/* Tombol Aksi */}
                    <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-200">
                      <button
                        type="button"
                        onClick={handleCancel}
                        disabled={processing}
                        className="px-6 py-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 transition-colors duration-200"
                      >
                        Batal
                      </button>
                      <button
                        type="submit"
                        disabled={processing || isSubmitting || !data.mapel.trim()}
                        className="px-6 py-3 text-base font-medium text-white bg-green-600 border border-transparent rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 transition-colors duration-200"
                      >
                        {processing || isSubmitting ? (
                          <span className="flex items-center">
                            <svg
                              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Menyimpan...
                          </span>
                        ) : (
                          'Simpan Mata Pelajaran'
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>



            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
