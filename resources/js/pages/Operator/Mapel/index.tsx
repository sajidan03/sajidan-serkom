import AppLayout from '@/layouts/app-layout'
import { type BreadcrumbItem } from '@/types'
import { Head, Link, usePage, router } from '@inertiajs/react'

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Mata pelajaran',
    href: '/mapel',
  },
]

interface Mapel {
  id: number
  mapel: string
  encrypted_id: string
}

export default function MapelIndex() {
  const { props } = usePage()
  const mapel = props.mapel as Mapel[]

  const handleDelete = (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus mata pelajaran ini?')) {
      router.delete(`/operator/mapel/hapus/${id}`)
    }
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Mata Pelajaran" />
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Daftar Mata Pelajaran</h1>

          {/* Tombol Export + Tambah Mapel */}
          <div className="flex items-center gap-3">
            <Link
              href="/operator/mapel/tambah"
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              + Tambah Mapel
            </Link>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full table-auto border-collapse">
            <thead className="bg-gray-100 text-gray-700 text-sm">
              <tr>
                <th className="px-4 py-3 text-left">No</th>
                <th className="px-4 py-3 text-left">Mata Pelajaran</th>
                <th className="px-4 py-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              {mapel.length > 0 ? (
                mapel.map((mapel) => (
                  <tr key={mapel.id} className="border-b hover:bg-gray-50">
                    {/* <td className="px-4 py-3">{index + 1}</td> */}
                    <td className="px-4 py-3 font-medium">
                      <span className="px-3 py-2 bg-blue-100 text-blue-700 text-sm rounded-md">
                        {mapel.mapel}
                      </span>
                    </td>
                    <td className="px-4 py-3 flex items-center justify-center gap-2">
                      <Link
                        href={`/operator/mapel/edit/${mapel.encrypted_id}`}
                        className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(mapel.id)}
                        className="px-3 py-1 bg-red-600 text-white text-sm rounded-md hover:bg-red-700"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="px-4 py-6 text-center text-gray-500">
                    Tidak ada data mata pelajaran
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
  )
}
