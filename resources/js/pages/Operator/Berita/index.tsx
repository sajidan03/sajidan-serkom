import AppLayout from '@/layouts/app-layout'
import { User, type BreadcrumbItem } from '@/types'
import { Head, usePage, router, Link } from '@inertiajs/react'

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Kelola Berita',
    href: '/operator/berita',
  },
]

interface Berita {
  id: number
  judul: string
  isi: string
  gambar: string
  tanggal: string
  id_user: string
  created_at: string
  updated_at: string
  encrypted_id: string
  user: User
}

export default function BeritaIndex() {
  const { props } = usePage()
  const beritaList = props.berita as Berita[]

  const handleDelete = (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus berita ini?')) {
      router.delete(`/operator/berita/hapus/${id}`)
    }
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Berita" />
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Daftar Berita</h1>

          {/* Tombol Export + Tambah Berita */}
          <div className="flex items-center gap-3">

            <Link
              href="/operator/berita/tambah"
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              + Tambah Berita
            </Link>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full table-auto border-collapse">
            <thead className="bg-gray-100 text-gray-700 text-sm">
              <tr>
                <th className="px-4 py-3 text-left">ID</th>
                <th className="px-4-4 py-3 text-left">Judul</th>
                <th className="px-4-4 py-3 text-left">Isi</th>
                <th className="px-4 py-3 text-left">Gambar</th>
                <th className="px-4 py-3 text-left">Tanggal</th>
                <th className="px-4 py-3 text-left">User</th>
                <th className="px-4 py-3 text-left">Dibuat</th>
                <th className="px-4 py-3 text-left">Diupdate</th>
                <th className="px-4 py-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              {beritaList.length > 0 ? (
                beritaList.map((berita) => (
                  <tr key={berita.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3">{berita.id}</td>
                    <td className="px-4 py-3">{berita.judul}</td>
                    <td className="px-4 py-3 max-w-xs truncate" title={berita.isi}>
                      {berita.isi.length > 100 ? `${berita.isi.substring(0, 100)}...` : berita.isi}
                    </td>
                    <td className="px-4 py-3">
                      {berita.gambar && (
                        berita.gambar.toLowerCase().endsWith('.jpg') ||
                        berita.gambar.toLowerCase().endsWith('.jpeg') ||
                        berita.gambar.toLowerCase().endsWith('.png') ||
                        berita.gambar.toLowerCase().endsWith('.gif') ? (
                          <img
                            src={`/storage/assets/${berita.gambar}`}
                            className="h-12 w-12 object-cover rounded"
                          />
                        ) : (
                          <a
                            href={`/storage/${berita.gambar}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            Lihat File
                          </a>
                        )
                      )}
                    </td>
                    <td className="px-4 py-3">{berita.tanggal}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-md">
                        {berita.user.name}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">{berita.created_at}</td>
                    <td className="px-4 py-3 text-sm">{berita.updated_at}</td>
                    <td className="px-4 py-3 flex items-center justify-center gap-2">
                      <Link
                        href={`/operator/berita/edit/${berita.encrypted_id}`}
                        className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(berita.id)}
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
                    Tidak ada data berita
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
