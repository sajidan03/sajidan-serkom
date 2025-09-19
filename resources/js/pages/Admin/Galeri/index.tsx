import AppLayout from '@/layouts/app-layout'
import { type BreadcrumbItem } from '@/types'
import { Head, Link, usePage, router } from '@inertiajs/react'

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Kelola Galeri',
    href: '/galeri',
  },
]

interface Galeri {
  id: number
  judul: string
  keterangan: string
  file: string
  kategori: string
  tanggal: string
  encrypted_id: string
}

export default function GaleriIndex() {
  const { props } = usePage()
  const galeriList = props.galeri as Galeri[]

  const handleDelete = (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus item galeri ini?')) {
      router.delete(`/admin/galeri/hapus/${id}`)
    }
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Galeri" />
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Daftar Galeri</h1>

          {/* Tombol Export + Tambah Galeri */}
          <div className="flex items-center gap-3">
            <a href="/admin/galeri/export">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Export
              </button>
            </a>
            <Link
              href="/admin/galeri/tambah"
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              + Tambah Galeri
            </Link>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full table-auto border-collapse">
            <thead className="bg-gray-100 text-gray-700 text-sm">
              <tr>
                <th className="px-4 py-3 text-left">ID</th>
                <th className="px-4 py-3 text-left">Judul</th>
                <th className="px-4 py-3 text-left">Keterangan</th>
                <th className="px-4 py-3 text-left">File</th>
                <th className="px-4 py-3 text-left">Kategori</th>
                <th className="px-4 py-3 text-left">Tanggal</th>
                <th className="px-4 py-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              {galeriList.length > 0 ? (
                galeriList.map((galeri) => (
                  <tr key={galeri.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3">{galeri.id}</td>
                    <td className="px-4 py-3 font-medium">{galeri.judul}</td>
                    <td className="px-4 py-3">{galeri.keterangan}</td>
                    <td className="px-4 py-3">
                      {galeri.file.toLowerCase().endsWith('.jpg') ||
                       galeri.file.toLowerCase().endsWith('.jpeg') ||
                       galeri.file.toLowerCase().endsWith('.png') ||
                       galeri.file.toLowerCase().endsWith('.gif') ? (
                        <img
                          src={`/storage/assets/${galeri.file}`}
                          alt={galeri.judul}
                          className="h-12 w-12 object-cover rounded"
                        />
                      ) : (
                        <a
                          href={`/storage/${galeri.file}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          Lihat File
                        </a>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-md">
                        {galeri.kategori}
                      </span>
                    </td>
                    <td className="px-4 py-3">{galeri.tanggal}</td>
                    <td className="px-4 py-3 flex items-center justify-center gap-2">
                      <Link
                        href={`/admin/galeri/edit/${galeri.encrypted_id}`}
                        className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(galeri.id)}
                        className="px-3 py-1 bg-red-600 text-white text-sm rounded-md hover:bg-red-700"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-4 py-6 text-center text-gray-500">
                    Tidak ada data galeri
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
