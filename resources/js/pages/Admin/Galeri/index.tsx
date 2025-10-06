import AppLayout from '@/layouts/app-layout'
import { type BreadcrumbItem } from '@/types'
import { Head, usePage, router, Link } from '@inertiajs/react'
import { useState } from 'react'

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
  const [playingVideo, setPlayingVideo] = useState<number | null>(null)

  const handleDelete = (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus item galeri ini?')) {
      router.delete(`/admin/galeri/hapus/${id}`)
    }
  }

  const isImage = (filename: string) => {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp']
    return imageExtensions.some(ext =>
      filename.toLowerCase().endsWith(ext)
    )
  }

  const isVideo = (filename: string) => {
    const videoExtensions = ['.mp4', '.avi', '.mkv', '.mov', '.wmv', '.webm']
    return videoExtensions.some(ext =>
      filename.toLowerCase().endsWith(ext)
    )
  }

  const handleVideoPlay = (id: number) => {
    setPlayingVideo(id)
  }

  const handleVideoPause = () => {
    setPlayingVideo(null)
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
                <th className="px-4 py-3 text-left w-48">File Preview</th>
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
                    <td className="px-4 py-3 max-w-xs truncate">{galeri.keterangan}</td>
                    <td className="px-4 py-3">
                      {isImage(galeri.file) ? (
                        <img
                          src={`/storage/assets/${galeri.file}`}
                          alt={galeri.judul}
                          className="h-32 w-48 object-cover rounded cursor-pointer hover:opacity-80 border"
                          onClick={() => window.open(`/storage/assets/${galeri.file}`, '_blank')}
                        />
                      ) : isVideo(galeri.file) ? (
                        <div className="relative">
                          <video
                            src={`/storage/assets/${galeri.file}`}
                            className="h-32 w-48 object-cover rounded cursor-pointer border"
                            controls={playingVideo === galeri.id}
                            onPlay={() => handleVideoPlay(galeri.id)}
                            onPause={handleVideoPause}
                            onEnded={handleVideoPause}
                            muted
                            preload="metadata"
                          >
                            Your browser does not support the video tag.
                          </video>
                          {playingVideo !== galeri.id && (
                            <div
                              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded cursor-pointer hover:bg-opacity-30 transition-all"
                              onClick={() => handleVideoPlay(galeri.id)}
                            >
                              <div className="bg-white bg-opacity-90 rounded-full p-3 hover:bg-opacity-100 transition-all">
                                <svg
                                  className="w-8 h-8 text-gray-800"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M8 5v14l11-7z"/>
                                </svg>
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <a
                          href={`/storage/assets/${galeri.file}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline flex items-center gap-2 p-3 border rounded-lg bg-gray-50 hover:bg-gray-100"
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                          </svg>
                          <span className="text-sm">Download File</span>
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
                      <a
                        href={`/admin/galeri/edit/${galeri.encrypted_id}`}
                        className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
                      >
                        Edit
                      </a>
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
