import AppLayout from '@/layouts/app-layout'
import { type BreadcrumbItem } from '@/types'
import { Head, Link, usePage, router } from '@inertiajs/react'

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Kelola Profil Sekolah',
    href: '/operator/profil-sekolah',
  },
]

interface ProfilSekolah {
  id: number
  nama_sekolah: string
  kepala_sekolah: string
  foto: string | null
  logo: string | null
  npsn: string | null
  alamat: string | null
  kontak: string | null
  instagram?: string | null
  facebook: string | null
  youtube: string | null
  visi_misi: string | null
  tahun_berdiri: number | null
  deskripsi: string | null
  created_at: string
  updated_at: string
  encrypted_id: string
}
export default function ProfilSekolah() {
  const { props } = usePage()
  const profilSekolah = props.profil_sekolah as ProfilSekolah[]

  const handleDelete = (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus data profil sekolah ini?')) {
      router.delete(`/operator/profil-sekolah/hapus/${id}`)
    }
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Profil Sekolah" />
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Daftar Profil Sekolah</h1>

          {/* Tombol Export + Tambah Profil Sekolah */}
          <div className="flex items-center gap-3">
            <Link
              href="/operator/profil-sekolah/tambah"
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              + Tambah Profil Sekolah
            </Link>
          </div>
        </div>
        {/* Table */}
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full table-auto border-collapse">
            <thead className="bg-gray-100 text-gray-700 text-sm">
              <tr>
                <th className="px-4 py-3 text-left">No</th>
                <th className="px-4 py-3 text-left">Nama Sekolah</th>
                <th className="px-4 py-3 text-left">Kepala Sekolah</th>
                <th className="px-4 py-3 text-left">NPSN</th>
                <th className="px-4 py-3 text-left">Kontak</th>
                <th className="px-4 py-3 text-left">Instagram</th>
                <th className="px-4 py-3 text-left">Facebook</th>
                <th className="px-4 py-3 text-left">Youtube</th>
                <th className="px-4 py-3 text-left">Tahun Berdiri</th>
                <th className="px-4 py-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              {profilSekolah.length > 0 ? (
                profilSekolah.map((profil, index) => (
                  <tr key={profil.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3">{index + 1}</td>
                    <td className="px-4 py-3 font-medium">{profil.nama_sekolah}</td>
                    <td className="px-4 py-3">{profil.kepala_sekolah}</td>
                    <td className="px-4 py-3">
                      {profil.npsn || (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {profil.kontak || (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm">
                        <a
                            href={profil.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 no-underline"
                        >
                            {profil.instagram}
                        </a>
                    </td>
                    <td className="px-4 py-3 text-sm">
                        <a
                            href={profil.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 no-underline"
                        >
                            {profil.facebook}
                        </a>
                    </td>
                    <td className="px-4 py-3 text-sm">
                        <a
                            href={profil.youtube}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 no-underline"
                        >
                            {profil.youtube}
                        </a>
                    </td>
                    <td className="px-4 py-3">
                      {profil.tahun_berdiri || (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>

                    <td className="px-4 py-3 flex items-center justify-center gap-2">
                      <Link
                        href={`/operator/profil-sekolah/edit/${profil.encrypted_id}`}
                        className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(profil.id)}
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
                    Tidak ada data profil sekolah
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
