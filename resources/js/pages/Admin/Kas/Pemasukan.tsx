import { Input } from '@/components/ui/input'
import AppLayout from '@/layouts/app-layout'
import { type BreadcrumbItem } from '@/types'
import { Head, Link, useForm, usePage } from '@inertiajs/react'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Plus, Calendar, Wallet, DollarSign, FileText, Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: '/admin' },
  { title: 'Kas', href: '/admin/kas' },
  { title: 'Pemasukan', href: '#' },
]

interface Pemasukan {
  id: number
  tanggal: string
  sumber: string
  nominal: number
  keterangan: string | null
  created_at: string
  updated_at: string
}

interface PageProps {
  pemasukan: Pemasukan[]
}

export default function Pemasukan() {
  const { pemasukan } = usePage<PageProps>().props

  const { data, setData, post, processing, errors, reset } = useForm({
    tanggal: '',
    sumber: '',
    nominal: '',
    keterangan: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    post('/admin/kas/pemasukan', {
      onSuccess: () => reset()
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
  }

  const totalPemasukan = pemasukan.reduce((total, item) => total + item.nominal, 0)

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Tambah Pemasukan" />

      <div className="w-full p-4 md:p-6 space-y-6">
        {/* Header Section */}
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-100 rounded-lg">
              <Plus className="w-6 h-6 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Tambah Pemasukan Kas</h1>
          </div>
          <p className="text-gray-600">Tambahkan data pemasukan kas ke dalam sistem management iuran warga</p>
        </div>

        {/* Form Section */}
        <Card className="w-full shadow-lg border-0">
          <CardHeader className="bg-gradient-to-r from-green-50 to-teal-50">
            <CardTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Tambah pemasukan baru
            </CardTitle>
            <CardDescription>
              Lengkapi form berikut untuk menambahkan data pemasukan kas
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 md:p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Tanggal */}
                <div className="space-y-2">
                  <Label htmlFor="tanggal" className="text-sm font-medium">
                    Tanggal *
                  </Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="tanggal"
                      type="date"
                      name='tanggal'
                      value={data.tanggal}
                      onChange={(e) => setData('tanggal', e.target.value)}
                      className="w-full pl-10"
                      required
                    />
                  </div>
                  {errors.tanggal && (
                    <div className="text-red-600 text-sm flex items-center gap-1">
                      <span>⚠️</span>
                      {errors.tanggal}
                    </div>
                  )}
                </div>

                {/* Sumber */}
                <div className="space-y-2">
                  <Label htmlFor="sumber" className="text-sm font-medium">
                    Sumber *
                  </Label>
                  <div className="relative">
                    <Wallet className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="sumber"
                      type="text"
                      name='sumber'
                      value={data.sumber}
                      onChange={(e) => setData('sumber', e.target.value)}
                      placeholder="Masukkan sumber pemasukan"
                      className="w-full pl-10"
                      required
                    />
                  </div>
                  {errors.sumber && (
                    <div className="text-red-600 text-sm flex items-center gap-1">
                      <span>⚠️</span>
                      {errors.sumber}
                    </div>
                  )}
                </div>

                {/* Jumlah */}
                <div className="space-y-2">
                  <Label htmlFor="jumlah" className="text-sm font-medium">
                    Jumlah *
                  </Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="jumlah"
                      type="number"
                      name='nominal'
                      value={data.nominal}
                      onChange={(e) => setData('nominal', e.target.value)}
                      placeholder="Masukkan jumlah pemasukan"
                      className="w-full pl-10"
                      required
                    />
                  </div>
                  {errors.nominal && (
                    <div className="text-red-600 text-sm flex items-center gap-1">
                      <span>⚠️</span>
                      {errors.nominal}
                    </div>
                  )}
                </div>

                {/* Keterangan */}
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="keterangan" className="text-sm font-medium">
                    Keterangan
                  </Label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                    <textarea
                      id="keterangan"
                      value={data.keterangan}
                      name='keterangan'
                      onChange={(e) => setData('keterangan', e.target.value)}
                      placeholder="Masukkan keterangan (opsional)"
                      className="w-full border rounded-md px-3 py-2 pl-10 min-h-[80px]"
                    />
                  </div>
                  {errors.keterangan && (
                    <div className="text-red-600 text-sm flex items-center gap-1">
                      <span>⚠️</span>
                      {errors.keterangan}
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={processing}
                  className="bg-green-600 hover:bg-green-700 px-6 py-2"
                >
                  {processing ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Menyimpan...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Plus className="w-4 h-4" />
                      Simpan Pemasukan
                    </div>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Table Section */}
        <Card className="w-full shadow-lg border-0">
          <CardHeader className="bg-gradient-to-r from-green-50 to-teal-50">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle>Daftar Pemasukan Kas</CardTitle>
                <CardDescription>
                  {pemasukan.length} data pemasukan kas ditemukan
                </CardDescription>
              </div>
              <div className="mt-2 sm:mt-0">
                <Badge variant="secondary" className="bg-green-100 text-green-800 text-sm py-1">
                  Total: {formatCurrency(totalPemasukan)}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4 md:p-6">
            {/* Desktop Table */}
            <div className="hidden md:block rounded-md border">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium">Tanggal</th>
                    <th className="text-left py-3 px-4 font-medium">Sumber</th>
                    <th className="text-right py-3 px-4 font-medium">Nominal</th>
                    <th className="text-left py-3 px-4 font-medium">Keterangan</th>
                    <th className="text-center py-3 px-4 font-medium">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {pemasukan.length > 0 ? (
                    pemasukan.map((item) => (
                      <tr key={item.id} className="border-b">
                        <td className="py-3 px-4 font-medium">{formatDate(item.tanggal)}</td>
                        <td className="py-3 px-4">
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            {item.sumber}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-right font-bold text-green-600">
                          {formatCurrency(item.nominal)}
                        </td>
                        <td className="py-3 px-4">
                          {item.keterangan || '-'}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <Link
                            href={`/admin/kas/pemasukan/${item.id}`}
                            method="delete"
                            as="button"
                            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-8 px-3 text-destructive"
                            onClick={(e) => {
                              if (!confirm('Apakah Anda yakin ingin menghapus data pemasukan ini?')) {
                                e.preventDefault()
                              }
                            }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="text-center py-8 text-gray-500">
                        <div className="flex flex-col items-center justify-center">
                          <Wallet className="w-12 h-12 text-gray-300 mb-2" />
                          <p>Belum ada data pemasukan</p>
                          <p className="text-sm">Tambahkan data pemasukan menggunakan form di atas</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4">
              {pemasukan.length > 0 ? (
                pemasukan.map((item) => (
                  <div key={item.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="font-medium">{formatDate(item.tanggal)}</div>
                      <Link
                        href={`/admin/kas/pemasukan/${item.id}`}
                        method="delete"
                        as="button"
                        className="text-destructive"
                        onClick={(e) => {
                          if (!confirm('Apakah Anda yakin ingin menghapus data pemasukan ini?')) {
                            e.preventDefault()
                          }
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Link>
                    </div>
                    <div>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        {item.sumber}
                      </Badge>
                    </div>
                    <div className="font-bold text-green-600 text-lg">
                      {formatCurrency(item.nominal)}
                    </div>
                    <div className="text-sm text-gray-600">
                      {item.keterangan || 'Tidak ada keterangan'}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <div className="flex flex-col items-center justify-center">
                    <Wallet className="w-12 h-12 text-gray-300 mb-2" />
                    <p>Belum ada data pemasukan</p>
                    <p className="text-sm">Tambahkan data pemasukan menggunakan form di atas</p>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center pt-4 border-t mt-6 gap-4">
              <Link
                href="/admin/kas"
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Kembali ke Kas
              </Link>
              <div className="text-sm text-gray-600">
                Data terbaru ditampilkan pertama
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Info Box */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start gap-3">
            <div className="p-1 bg-blue-100 rounded">
              <FileText className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <h4 className="font-medium text-blue-800">Informasi Penting</h4>
              <p className="text-sm text-blue-700">
                Pastikan data yang dimasukkan sudah benar. Pemasukan yang sudah disimpan
                akan langsung tercatat dalam laporan kas. Data yang bertanda bintang (*) wajib diisi.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
