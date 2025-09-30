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
            <a href="/operator/profil-sekolah/export">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Export
              </button>
            </a>
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
                <th className="px-4 py-3 text-left">Tahun Berdiri</th>
                <th className="px-4 py-3 text-left">Dibuat</th>
                <th className="px-4 py-3 text-left">Diupdate</th>
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
                    <td className="px-4 py-3">
                      {profil.tahun_berdiri || (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {new Date(profil.created_at).toLocaleDateString('id-ID')}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {new Date(profil.updated_at).toLocaleDateString('id-ID')}
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

        {/* Info tambahan untuk data yang tidak ditampilkan di tabel
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">Informasi Tambahan:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-700">
            <div>
              <strong>Field yang tersedia:</strong>
              <ul className="mt-1 list-disc list-inside">
                <li>Nama Sekolah</li>
                <li>Kepala Sekolah</li>
                <li>Foto</li>
                <li>Logo</li>
                <li>NPSN</li>
                <li>Alamat</li>
                <li>Kontak</li>
                <li>Visi & Misi</li>
                <li>Tahun Berdiri</li>
                <li>Deskripsi</li>
              </ul>
            </div>
            <div>
              <strong>Field yang ditampilkan di tabel:</strong>
              <ul className="mt-1 list-disc list-inside">
                <li>Nama Sekolah</li>
                <li>Kepala Sekolah</li>
                <li>NPSN</li>
                <li>Kontak</li>
                <li>Tahun Berdiri</li>
                <li>Tanggal dibuat & diupdate</li>
              </ul>
            </div>
          </div>
        </div>
      </div> */}
      </div>
    </AppLayout>
  )
}
