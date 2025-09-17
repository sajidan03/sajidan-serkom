import AppLayout from "@/layouts/app-layout"
import { Head, router } from "@inertiajs/react"
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
import { Button } from "@/components/ui/button"
import { Users, Trash2, Search } from "lucide-react"
import { useState, useMemo } from "react"

type Warga = {
  id: number
  name: string
  address?: string | null
}

interface WargaIndexProps {
  warga: Warga[]
}

const breadcrumbs: BreadcrumbItem[] = [
  { title: "Kelola Warga", href: "/admin/warga" },
]

export default function WargaIndex({ warga }: WargaIndexProps) {
  const [search, setSearch] = useState("")

  const filtered = useMemo(() => {
    return warga.filter(
      (w) =>
        w.name.toLowerCase().includes(search.toLowerCase()) ||
        (w.address ?? "").toLowerCase().includes(search.toLowerCase())
    )
  }, [warga, search])

  const handleDelete = (id: number) => {
    if (confirm("Hapus data ini?")) {
      router.delete(`/admin/warga/hapus/${id}`)
    }
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Daftar Warga" />

      <div className="w-full min-h-screen p-6 bg-gray-50">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <Users className="w-7 h-7 text-green-600" />
                Daftar Warga
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                Kelola data warga yang terdaftar di sistem.
              </p>
            </div>

            {/* Search */}
            <div className="flex items-center gap-2 w-full md:w-80">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring focus:ring-green-200 focus:border-green-500"
                placeholder="Cari nama atau alamat..."
              />
              <Button type="button" className="bg-green-600 hover:bg-green-700">
                <Search className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Table */}
          <Card className="shadow-md border border-gray-200">
            <CardHeader className="border-b pb-3">
              <CardTitle className="text-lg font-semibold text-gray-700">
                Tabel Warga
              </CardTitle>
            </CardHeader>

            <CardContent className="p-6">
              <Table className="w-full">
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="w-16 text-center">No</TableHead>
                    <TableHead>Nama</TableHead>
                    <TableHead>Alamat</TableHead>
                    <TableHead className="text-center w-36">Aksi</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {filtered.length > 0 ? (
                    filtered.map((item, index) => (
                      <TableRow
                        key={item.id}
                        className={`hover:bg-gray-100 ${
                          index % 2 === 0 ? "bg-white" : "bg-gray-50"
                        }`}
                      >
                        <TableCell className="text-center py-4 px-3">
                          {index + 1}
                        </TableCell>
                        <TableCell className="font-medium py-4 px-3">
                          {item.name}
                        </TableCell>
                        <TableCell className="py-4 px-3">
                          {item.address ?? "-"}
                        </TableCell>
                        <TableCell className="text-center py-4 px-3">
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(item.id)}
                            className="flex items-center gap-1"
                          >
                            <Trash2 className="w-4 h-4" />
                            Hapus
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={4}
                        className="text-center py-12 text-gray-500 italic"
                      >
                        <div className="flex flex-col items-center gap-2">
                          <Users className="w-10 h-10 text-gray-400" />
                          Tidak ada data warga ditemukan.
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  )
}
