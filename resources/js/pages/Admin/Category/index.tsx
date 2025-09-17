import AppLayout from "@/layouts/app-layout"
import { Head, Link, useForm } from "@inertiajs/react"
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
import { Edit, Trash2, Plus, Tag } from "lucide-react"

type Category = {
  id: number
  encrypted_id: string
  name: string
  period: string
  nominal: number
  created_at?: string
  updated_at?: string
}

interface CategoryIndexProps {
  categories: Category[]
  flash?: { success?: string; error?: string }
}

const breadcrumbs: BreadcrumbItem[] = [
  { title: "Kelola Kategori", href: "/admin/category" },
]

export default function CategoryIndex({ categories, flash }: CategoryIndexProps) {
  const { delete: destroy } = useForm()

  const handleDelete = (encryptedId: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus kategori ini?")) {
      destroy(`/admin/category/hapus/${encryptedId}`)
    }
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Daftar Kategori Iuran" />

      <div className="w-full space-y-6 p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <Tag className="w-7 h-7 text-blue-600" />
              Daftar Kategori Iuran
            </h1>
            <p className="text-gray-500 text-sm">
              Kelola kategori iuran warga untuk pembayaran rutin.
            </p>
          </div>
          <Link href="/admin/category/tambah">
            <Button className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Tambah Kategori
            </Button>
          </Link>
        </div>

        {/* Flash messages */}
        {flash?.success && (
          <div className="p-3 rounded bg-green-100 text-green-700 text-sm shadow-sm">
            {flash.success}
          </div>
        )}
        
        {flash?.error && (
          <div className="p-3 rounded bg-red-100 text-red-700 text-sm shadow-sm">
            {flash.error}
          </div>
        )}

        {/* Card Table */}
        <Card className="shadow-md border border-gray-200">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-700">
              Tabel Kategori Iuran
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>No</TableHead>
                  <TableHead>Nama Kategori</TableHead>
                  <TableHead>Periode Pembayaran</TableHead>
                  <TableHead>Nominal Pembayaran</TableHead>
                  <TableHead className="text-center">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.length > 0 ? (
                  categories.map((category, index) => (
                    <TableRow key={category.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell className="font-medium">
                        {category.name || 'N/A'}
                      </TableCell>
                      <TableCell className="capitalize">
                        {category.period || 'N/A'}
                      </TableCell>
                      <TableCell>
                        {category.nominal 
                          ? `Rp ${new Intl.NumberFormat('id-ID').format(category.nominal)}`
                          : 'N/A'
                        }
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-center gap-2">
                          <Link href={`/admin/category/edit/${category.encrypted_id}`}>
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="flex items-center gap-1"
                            >
                              <Edit className="w-4 h-4" />
                              Edit
                            </Button>
                          </Link>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(category.encrypted_id)}
                            className="flex items-center gap-1"
                          >
                            <Trash2 className="w-4 h-4" />
                            Hapus
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                      Tidak ada data kategori
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}