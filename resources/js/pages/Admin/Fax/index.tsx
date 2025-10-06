import AppLayout from '@/layouts/app-layout'
import { type BreadcrumbItem } from '@/types'
import { Head, usePage, router } from '@inertiajs/react'
import { useState } from 'react'
import { Eye, Search, Calendar, Mail, Phone, MessageSquare, Trash2 } from 'lucide-react'

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/admin/dashboard',
  },
  {
    title: 'Pesan & Saran',
    href: '/admin/fax',
  },
]

interface Fax {
  id: number
  email: string
  pesan: string
  created_at: string
}

interface PageProps {
  fax: Fax[]
  profil: any
}

export default function FaxIndex() {
  const { props } = usePage<PageProps>()
  const faxList = props.fax as Fax[]

  const [searchTerm, setSearchTerm] = useState('')
  const [filterDate, setFilterDate] = useState('')
  const [selectedFax, setSelectedFax] = useState<Fax | null>(null)

  const filteredFax = faxList.filter((fax) => {
    const matchesSearch = fax.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         fax.pesan.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDate = !filterDate || fax.created_at.startsWith(filterDate)
    return matchesSearch && matchesDate
  })

  const isEmail = (text: string) => {
    return text.includes('@') && text.includes('.')
  }

  const isPhoneNumber = (text: string) => {
    return /^[0-9+\-\s()]+$/.test(text) && text.replace(/[^0-9]/g, '').length >= 10
  }

  const handleDelete = (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus pesan ini?')) {
      router.delete(`/admin/fax/hapus/${id}`)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Pesan & Saran" />
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Pesan & Saran</h1>
                <p className="text-gray-600 mt-1">
                  Kelola pesan dan saran dari pengunjung website
                </p>
              </div>
              <div className="text-sm text-gray-500">
                Total: {faxList.length} pesan
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 py-6">
          <div className="mx-auto px-6 max-w-7xl">
            {/* Filters and Search */}
            <div className="mb-6">
              <div className="bg-white rounded-lg shadow-sm border p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Search */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Cari pesan atau email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  {/* Date Filter */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="date"
                      value={filterDate}
                      onChange={(e) => setFilterDate(e.target.value)}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  {/* Reset Filters */}
                  <button
                    onClick={() => {
                      setSearchTerm('')
                      setFilterDate('')
                    }}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    Reset Filter
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Left Side - List of Messages */}
              <div className="xl:col-span-2">
                <div className="bg-white shadow-sm rounded-lg border">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">
                      Daftar Pesan ({filteredFax.length})
                    </h2>
                  </div>

                  <div className="divide-y divide-gray-200">
                    {filteredFax.length > 0 ? (
                      filteredFax.map((fax) => (
                        <div
                          key={fax.id}
                          className={`p-6 hover:bg-gray-50 cursor-pointer transition-colors ${
                            selectedFax?.id === fax.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                          }`}
                          onClick={() => setSelectedFax(fax)}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-3 mb-2">
                                {isEmail(fax.email) ? (
                                  <Mail className="h-4 w-4 text-green-600" />
                                ) : isPhoneNumber(fax.email) ? (
                                  <Phone className="h-4 w-4 text-blue-600" />
                                ) : (
                                  <MessageSquare className="h-4 w-4 text-gray-600" />
                                )}
                                <p className="text-sm font-medium text-gray-900 truncate">
                                  {fax.email}
                                </p>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                  {isEmail(fax.email) ? 'Email' : isPhoneNumber(fax.email) ? 'Telepon' : 'Tidak Dikenal'}
                                </span>
                              </div>

                              <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                                {fax.pesan}
                              </p>

                              <div className="flex items-center justify-between">
                                <p className="text-xs text-gray-500">
                                  {formatDate(fax.created_at)}
                                </p>
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      setSelectedFax(fax)
                                    }}
                                    className="inline-flex items-center px-2 py-1 text-xs font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded"
                                  >
                                    <Eye className="h-3 w-3 mr-1" />
                                    Baca
                                  </button>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      handleDelete(fax.id)
                                    }}
                                    className="inline-flex items-center px-2 py-1 text-xs font-medium text-red-600 hover:text-red-800 hover:bg-red-50 rounded"
                                  >
                                    <Trash2 className="h-3 w-3 mr-1" />
                                    Hapus
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-12 text-center">
                        <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900">Tidak ada pesan</h3>
                        <p className="mt-1 text-sm text-gray-500">
                          {searchTerm || filterDate ? 'Coba ubah filter pencarian Anda.' : 'Belum ada pesan yang diterima.'}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Side - Message Detail */}
              <div className="xl:col-span-1">
                <div className="bg-white shadow-sm rounded-lg border sticky top-6">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">
                      Detail Pesan
                    </h2>
                  </div>

                  <div className="p-6">
                    {selectedFax ? (
                      <div className="space-y-6">
                        {/* Sender Info */}
                        <div>
                          <h3 className="text-sm font-medium text-gray-900 mb-2">Pengirim</h3>
                          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            {isEmail(selectedFax.email) ? (
                              <Mail className="h-5 w-5 text-green-600" />
                            ) : isPhoneNumber(selectedFax.email) ? (
                              <Phone className="h-5 w-5 text-blue-600" />
                            ) : (
                              <MessageSquare className="h-5 w-5 text-gray-600" />
                            )}
                            <div>
                              <p className="text-sm font-medium text-gray-900">{selectedFax.email}</p>
                              <p className="text-xs text-gray-500">
                                {isEmail(selectedFax.email) ? 'Alamat Email' :
                                 isPhoneNumber(selectedFax.email) ? 'Nomor Telepon' : 'Kontak'}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Message Date */}
                        <div>
                          <h3 className="text-sm font-medium text-gray-900 mb-2">Dikirim Pada</h3>
                          <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                            {formatDate(selectedFax.created_at)}
                          </p>
                        </div>

                        {/* Message Content */}
                        <div>
                          <h3 className="text-sm font-medium text-gray-900 mb-2">Isi Pesan</h3>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                              {selectedFax.pesan}
                            </p>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3 pt-4 border-t border-gray-200">
                          {isEmail(selectedFax.email) && (
                            <a
                              href={`mailto:${selectedFax.email}`}
                              className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                              <Mail className="h-4 w-4 mr-2" />
                              Balas Email
                            </a>
                          )}

                          {isPhoneNumber(selectedFax.email) && (
                            <a
                              href={`https://wa.me/${selectedFax.email.replace(/[^0-9]/g, '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            >
                              <Phone className="h-4 w-4 mr-2" />
                              Hubungi WA
                            </a>
                          )}

                          <button
                            onClick={() => handleDelete(selectedFax.id)}
                            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Hapus
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900">Pilih pesan</h3>
                        <p className="mt-1 text-sm text-gray-500">
                          Pilih pesan dari daftar untuk melihat detailnya.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
