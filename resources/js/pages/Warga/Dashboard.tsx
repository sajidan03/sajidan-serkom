import AppLayout from "@/layouts/warga-layout"
import { Head } from "@inertiajs/react"
import { BreadcrumbItem } from "@/types"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table"
import { DollarSign, Calendar, CreditCard, Download } from "lucide-react"

type Payment = {
  id: number
  nominal: number
  keterangan: string
  tanggal: string
  status: string
  created_at: string
  user?: {
    name: string
  }
}

interface WargaDashboardProps {
  payments: Payment[]
  user: {
    name: string
    email: string
  }
}

const breadcrumbs: BreadcrumbItem[] = [
  { title: "Dashboard", href: "/warga/dashboard" },
]

export default function WargaDashboard({ payments, user }: WargaDashboardProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard Warga" />

      <div className="w-full min-h-screen p-6 bg-gray-50">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Header */}
          <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Selamat Datang, {user.name}!
            </h1>
            <p className="text-gray-600">
              Dashboard pembayaran iuran warga
            </p>
          </div>

          {/* Statistik */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-white border border-gray-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Pembayaran
                </CardTitle>
                <DollarSign className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatCurrency(payments.reduce((total, payment) => total + payment.nominal, 0))}
                </div>
                <p className="text-xs text-gray-500">
                  {payments.length} transaksi
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Pembayaran Terakhir
                </CardTitle>
                <Calendar className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {payments.length > 0 ? formatDate(payments[0].created_at) : '-'}
                </div>
                <p className="text-xs text-gray-500">
                  Tanggal terakhir bayar
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Status
                </CardTitle>
                <CreditCard className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {payments.length > 0 ? 'Aktif' : 'Belum Bayar'}
                </div>
                <p className="text-xs text-gray-500">
                  Status pembayaran
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Tabel Pembayaran */}
          <Card className="shadow-md border border-gray-200">
            <CardHeader className="border-b pb-3 flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-semibold text-gray-700">
                Riwayat Pembayaran
              </CardTitle>

              {/* Button Export dengan tag <a> langsung */}
              {payments.length > 0 && (
                <div className="flex gap-2">
                  <a
                    href="/warga/export/${user.id}"
                    download
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Export Excel
                  </a>
                </div>
              )}
            </CardHeader>

            <CardContent className="p-6">
              {payments.length > 0 ? (
                <>
                  <Table className="w-full">
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                        <TableHead>Tanggal</TableHead>
                        <TableHead>Nominal</TableHead>
                        <TableHead>Keterangan</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      {payments.map((payment, index) => (
                        <TableRow
                          key={payment.id}
                          className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                        >
                          <TableCell className="py-4">
                            {formatDate(payment.created_at)}
                          </TableCell>
                          <TableCell className="font-medium py-4 text-green-600">
                            {formatCurrency(payment.nominal)}
                          </TableCell>
                          <TableCell className="py-4">
                            {payment.keterangan || '-'}
                          </TableCell>
                          <TableCell className="py-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              payment.status === 'lunas'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {payment.status ?? '-'}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>

                  {/* Info Jumlah Data */}
                  <div className="mt-4 text-sm text-gray-500">
                    Menampilkan {payments.length} pembayaran
                  </div>
                </>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <CreditCard className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p>Belum ada riwayat pembayaran</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  )
}
