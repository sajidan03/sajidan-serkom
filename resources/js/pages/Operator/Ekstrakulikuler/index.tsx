import AppLayout from '@/layouts/app-layout'
import { User, type BreadcrumbItem } from '@/types'
import { Head, usePage, router, Link } from '@inertiajs/react'

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Kelola Ekstrakurikuler',
    href: '/operator/ekstrakurikuler',
  },
]

interface Ekstrakurikuler {
  id: number
    created_at: string
  updated_at: string
  nama_eskul: string
  pembina: string
  jadwal_latihan: string
  deskripsi: string
  gambar: string
  encrypted_id: string
  user: User
}


export default function EkstrakurikulerIndex() {
  const { props } = usePage()
  const eskul = props.eskul as Ekstrakurikuler[] || []

  const handleDelete = (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus ekstrakurikuler ini?')) {
      router.delete(`/operator/ekstrakulikuler/hapus/${id}`)
    }
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Ekstrakurikuler" />
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Daftar Ekstrakurikuler</h1>

          {/* Tombol Export + Tambah Ekstrakurikuler */}
          <div className="flex items-center gap-3">

            <Link
              href="/operator/ekstrakulikuler/tambah"
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              + Tambah Ekstrakurikuler
            </Link>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full table-auto border-collapse">
            <thead className="bg-gray-100 text-gray-700 text-sm">
              <tr>
                <th className="px-4 py-3 text-left">ID</th>
                <th className="px-4 py-3 text-left">Nama Eskul</th>
                <th className="px-4 py-3 text-left">Pembina</th>
                <th className="px-4 py-3 text-left">Jadwal Latihan</th>
                <th className="px-4 py-3 text-left">Deskripsi</th>
                <th className="px-4 py-3 text-left">Gambar</th>
                <th className="px-4 py-3 text-left">Dibuat</th>
                <th className="px-4 py-3 text-left">Diupdate</th>
                <th className="px-4 py-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              {eskul && eskul.length > 0 ? (
                eskul.map((eskul) => (
                  <tr key={eskul.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3">{eskul.id}</td>
                    <td className="px-4 py-3 font-medium">{eskul.nama_eskul}</td>
                    <td className="px-4 py-3">{eskul.pembina}</td>
                    <td className="px-4 py-3">{eskul.jadwal_latihan}</td>
                    <td className="px-4 py-3 max-w-xs" title={eskul.deskripsi}>
                      {eskul.deskripsi.length > 100 ? `${eskul.deskripsi.substring(0, 100)}...` : eskul.deskripsi}
                    </td>
                    <td className="px-4 py-3">
                      {eskul.gambar && (
                        eskul.gambar.toLowerCase().endsWith('.jpg') ||
                        eskul.gambar.toLowerCase().endsWith('.jpeg') ||
                        eskul.gambar.toLowerCase().endsWith('.png') ||
                        eskul.gambar.toLowerCase().endsWith('.gif') ? (
                          <img
                            src={`/storage/assets/${eskul.gambar}`}
                            alt={eskul.nama_eskul}
                            className="h-12 w-12 object-cover rounded"
                          />
                        ) : (
                          <a
                            href={`/storage/${eskul.gambar}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            Lihat File
                          </a>
                        )
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm">{eskul.created_at}</td>
                    <td className="px-4 py-3 text-sm">{eskul.updated_at}</td>
                    <td className="px-4 py-3 flex items-center justify-center gap-2">
                      <Link
                        href={`/operator/ekstrakulikuler/edit/${eskul.encrypted_id}`}
                        className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(eskul.id)}
                        className="px-3 py-1 bg-red-600 text-white text-sm rounded-md hover:bg-red-700"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="px-4 py-6 text-center text-gray-500">
                    Tidak ada data ekstrakurikuler
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
