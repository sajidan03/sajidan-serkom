import AppLayout from '@/layouts/app-layout'
import { type BreadcrumbItem } from '@/types'
import { Head, Link, usePage, useForm } from '@inertiajs/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  ArrowLeft,
  Download,
  Filter,
  Plus,
  Search,
  FileText,
  Calendar,
  DollarSign,
  TrendingUp,
  TrendingDown
} from "lucide-react"

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: '/admin' },
  { title: 'Kas', href: '/admin/kas' },
  { title: 'Laporan Kas', href: '#' },
]

interface Transaksi {
  id: number
  tanggal: string
  jenis: 'pemasukan' | 'pengeluaran'
  kategori: string
  jumlah: number
  keterangan: string
  created_at: string
}

interface PageProps {
  transaksi: {
    data: Transaksi[]
    links: any[]
  }
  total_pemasukan: number
  total_pengeluaran: number
  saldo_akhir: number
  filters: {
    bulan: string
    jenis: string
    search: string
  }
  monthOptions: Array<{ value: string; label: string }>
}

export default function LaporanKas() {
  const { props } = usePage<PageProps>()
  const { data, setData, get, processing } = useForm({
    bulan: props.filters.bulan || '',
    jenis: props.filters.jenis || '',
    search: props.filters.search || '',
  })

  const handleFilter = () => {
    get('/admin/kas/laporan', {
      preserveState: true,
      preserveScroll: true,
    })
  }

  const handleReset = () => {
    setData({
      bulan: '',
      jenis: '',
      search: '',
    })
    get('/admin/kas/laporan', {
      preserveState: true,
      preserveScroll: true,
    })
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Laporan Kas" />

      <div className="w-full p-6">
        {/* Header Section */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Laporan Kas</h1>
          </div>
          <p className="text-gray-600">Lihat dan kelola laporan keuangan kas masyarakat</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-green-800 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Total Pemasukan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-700">
                Rp {props.total_pemasukan?.toLocaleString('id-ID') || 0}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-red-50 to-red-100 border-red-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-red-800 flex items-center gap-2">
                <TrendingDown className="w-4 h-4" />
                Total Pengeluaran
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-700">
                Rp {props.total_pengeluaran?.toLocaleString('id-ID') || 0}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-blue-800 flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Saldo Akhir
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-700">
                Rp {props.saldo_akhir?.toLocaleString('id-ID') || 0}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filter Section */}
        <Card className="w-full shadow-sm mb-6">
          <CardHeader className="py-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filter Laporan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bulan" className="text-sm">
                  Bulan
                </Label>
                <Select
                  value={data.bulan}
                  onValueChange={(value) => setData('bulan', value)}
                >
                  <SelectTrigger id="bulan">
                    <SelectValue placeholder="Semua Bulan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Bulan</SelectItem>
                    {props.monthOptions?.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="jenis" className="text-sm">
                  Jenis Transaksi
                </Label>
                <Select
                  value={data.jenis}
                  onValueChange={(value) => setData('jenis', value)}
                >
                  <SelectTrigger id="jenis">
                    <SelectValue placeholder="Semua Jenis" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Jenis</SelectItem>
                    <SelectItem value="pemasukan">Pemasukan</SelectItem>
                    <SelectItem value="pengeluaran">Pengeluaran</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="pencarian" className="text-sm">
                  Pencarian
                </Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="pencarian"
                    placeholder="Cari berdasarkan sumber atau keterangan..."
                    value={data.search}
                    onChange={(e) => setData('search', e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2 flex items-end">
                <div className="flex gap-2">
                  <Button
                    onClick={handleFilter}
                    disabled={processing}
                    className="flex-1"
                  >
                    Terapkan Filter
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleReset}
                    disabled={processing}
                  >
                    Reset
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Table Section */}
        <Card className="w-full shadow-lg border-0">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-blue-50">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Daftar Transaksi Kas</CardTitle>
                <CardDescription>
                  {props.transaksi.data?.length || 0} transaksi ditemukan
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Export
                </Button>
                <Link href="/admin/kas/pemasukan">
                  <Button className="bg-green-600 hover:bg-green-700 flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Pemasukan
                  </Button>
                </Link>
                <Link href="/admin/kas/pengeluaran">
                  <Button className="bg-red-600 hover:bg-red-700 flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Pengeluaran
                  </Button>
                </Link>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tanggal</TableHead>
                  <TableHead>Jenis</TableHead>
                  <TableHead>Sumber</TableHead>
                  <TableHead className="text-right">Jumlah</TableHead>
                  <TableHead>Keterangan</TableHead>
                  <TableHead className="text-center">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {props.transaksi.data && props.transaksi.data.length > 0 ? (
                  props.transaksi.data.map((item) => (
                    <TableRow key={`${item.jenis}-${item.id}`}>
                      <TableCell className="font-medium">
                        {new Date(item.tanggal).toLocaleDateString('id-ID', {
                          day: '2-digit',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          item.jenis === 'pemasukan'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {item.jenis === 'pemasukan' ? 'Pemasukan' : 'Pengeluaran'}
                        </span>
                      </TableCell>
                      <TableCell>{item.kategori}</TableCell>
                      <TableCell className={`text-right font-medium ${
                        item.jenis === 'pemasukan' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {item.jenis === 'pemasukan' ? '+' : '-'} Rp {item.jumlah.toLocaleString('id-ID')}
                      </TableCell>
                      <TableCell>{item.keterangan}</TableCell>
                      <TableCell className="text-center">
                        <Link href={item.jenis === 'pemasukan'
                          ? `/admin/kas/pemasukan/${item.id}/edit`
                          : `/admin/kas/pengeluaran/${item.id}/edit`
                        }>
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                      <FileText className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                      <p>Tidak ada data transaksi yang ditemukan</p>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Pagination */}
        {props.transaksi.links && props.transaksi.links.length > 3 && (
          <div className="mt-6 flex justify-center">
            <nav className="flex gap-1">
              {props.transaksi.links.map((link, index) => (
                <Link
                  key={index}
                  href={link.url || '#'}
                  className={`px-3 py-1 rounded-md ${
                    link.active
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  } ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                  dangerouslySetInnerHTML={{ __html: link.label }}
                />
              ))}
            </nav>
          </div>
        )}

        {/* Info Box */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start gap-3">
            <div className="p-1 bg-blue-100 rounded">
              <FileText className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <h4 className="font-medium text-blue-800">Informasi Penting</h4>
              <p className="text-sm text-blue-700">
                Laporan kas ini menampilkan data aktual dari sistem.
                Data akan diperbarui secara otomatis ketika ada transaksi baru.
                Gunakan filter untuk melihat data berdasarkan periode tertentu.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
