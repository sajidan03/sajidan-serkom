import AppLayout from '@/layouts/app-layout'
import { type BreadcrumbItem } from '@/types'
import { Head, Link, usePage, router } from '@inertiajs/react'

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Kelola Siswa',
    href: '/siswa',
  },
]

interface Siswa {
  id: number
  nisn: string
  nama_siswa: string
  jenis_kelamin: string
  jurusan: string
  tahun_masuk: string
  encrypted_id: string
}

export default function SiswaIndex() {
  const { props } = usePage()
  const siswaList = props.siswa as Siswa[]

  const handleDelete = (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus siswa ini?')) {
      router.delete(`/admin/siswa/hapus/${id}`)
    }
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Siswa" />
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Daftar Siswa</h1>

          {/* Tombol Export + Tambah Siswa */}
          <div className="flex items-center gap-3">
            <a href="/admin/siswa/export">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Export
              </button>
            </a>
            <Link
              href="/admin/siswa/tambah"
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              + Tambah Siswa
            </Link>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full table-auto border-collapse">
            <thead className="bg-gray-100 text-gray-700 text-sm">
              <tr>
                <th className="px-4 py-3 text-left">ID</th>
                <th className="px-4 py-3 text-left">NISN</th>
                <th className="px-4 py-3 text-left">Nama Siswa</th>
                <th className="px-4 py-3 text-left">Jenis Kelamin</th>
                <th className="px-4 py-3 text-left">Jurusan</th>
                <th className="px-4 py-3 text-left">Tahun Masuk</th>
                <th className="px-4 py-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              {siswaList.length > 0 ? (
                siswaList.map((siswa) => (
                  <tr key={siswa.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3">{siswa.id}</td>
                    <td className="px-4 py-3">{siswa.nisn}</td>
                    <td className="px-4 py-3">{siswa.nama_siswa}</td>
                    <td className="px-4 py-3">{siswa.jurusan}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 text-xs rounded-md ${
                          siswa.jenis_kelamin === 'Laki-laki'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-pink-100 text-pink-700'
                        }`}
                      >
                        {siswa.jenis_kelamin}
                      </span>
                    </td>
                    <td className="px-4 py-3">{siswa.tahun_masuk}</td>
                    <td className="px-4 py-3 flex items-center justify-center gap-2">
                      <Link
                        href={`/admin/siswa/edit/${siswa.encrypted_id}`}
                        className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(siswa.id)}
                        className="px-3 py-1 bg-red-600 text-white text-sm rounded-md hover:bg-red-700"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-4 py-6 text-center text-gray-500">
                    Tidak ada data siswa
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
