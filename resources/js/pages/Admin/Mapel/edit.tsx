import AppLayout from '@/layouts/app-layout'
import { type BreadcrumbItem } from '@/types'
import { Head, useForm, usePage, router } from '@inertiajs/react'
import { useState, useEffect } from 'react'

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Mata Pelajaran',
    href: '/admin/mapel',
  },
  {
    title: 'Edit Mata Pelajaran',
    href: '/admin/mapel/edit',
  },
]

interface Mapel {
  id: number
  mapel: string
  encrypted_id: string
}

interface PageProps {
  mapel: Mapel
}

export default function MapelEdit() {
  const { props } = usePage<PageProps>()
  const { mapel } = props

  const { data, setData, post, processing, errors } = useForm({
    mapel: mapel?.mapel || '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (mapel) {
      setData('mapel', mapel.mapel)
    }
  }, [mapel])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    post(`/admin/mapel/edit/${mapel.id}`, {
      onSuccess: () => {
        setIsSubmitting(false)
        alert('Mata pelajaran berhasil diupdate!')
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
      <Head title="Edit Mata Pelajaran" />
      <div className="p-6">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Edit Mata Pelajaran</h1>
            <p className="text-gray-600 mt-2">
              Ubah informasi mata pelajaran
            </p>
          </div>
          {/* Form */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Field Nama Mata Pelajaran */}
              <div>
                <label htmlFor="mapel" className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Mata Pelajaran <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="mapel"
                  name="mapel"
                  value={data.mapel}
                  onChange={(e) => setData('mapel', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.mapel ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Masukkan nama mata pelajaran"
                  disabled={processing}
                />
                {errors.mapel && (
                  <p className="mt-1 text-sm text-red-600">{errors.mapel}</p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={processing}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={processing || isSubmitting}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                >
                  {processing || isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Menyimpan...
                    </span>
                  ) : (
                    'Simpan Perubahan'
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Info */}
          <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">
                  Informasi
                </h3>
                <div className="mt-2 text-sm text-blue-700">
                  <p>
                    Pastikan nama mata pelajaran jelas dan mudah dipahami.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
