import { Head, usePage, router } from "@inertiajs/react"
import AppLayout from "@/layouts/app-layout"
import { type BreadcrumbItem } from "@/types"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Plus, Trash2 } from "lucide-react"

interface Officer {
  id: number
  previous_role: string
  user?: {
    name: string
    username: string
  }
}

interface PageProps {
  officers: Officer[]
  flash: {
    success?: string
  }
  [key: string]: any
}

const breadcrumbs: BreadcrumbItem[] = [
  { title: "Kelola Petugas", href: "/admin/petugas" },
]

export default function PetugasIndex() {
  const { officers, flash } = usePage<PageProps>().props

  const handleDelete = (id: number) => {
    if (confirm("Yakin ingin menghapus officer ini?")) {
      router.delete(`/admin/petugas/hapus/${id}`)
    }
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Petugas" />

      <div className="p-6 flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Data Petugas</h2>
          <Button
            onClick={() => router.visit("/admin/petugas/tambah")}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Tambah Petugas
          </Button>
        </div>

        {flash?.success && (
          <div className="p-3 rounded-md bg-green-100 text-green-700">
            {flash.success}
          </div>
        )}

        <Card>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Nama</TableHead>
                  <TableHead>Username</TableHead>
                  <TableHead>Role Sebelum</TableHead>
                  <TableHead className="text-center">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {officers.length > 0 ? (
                  officers.map((officer) => (
                    <TableRow key={officer.id}>
                      <TableCell>{officer.id}</TableCell>
                      <TableCell>{officer.user?.name ?? "-"}</TableCell>
                      <TableCell>{officer.user?.username ?? "-"}</TableCell>
                      <TableCell>{officer.previous_role ?? "-"}</TableCell>
                      <TableCell className="text-center">
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(officer.id)}
                          className="flex items-center gap-1"
                        >
                          <Trash2 className="h-4 w-4" />
                          Hapus
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="text-center text-muted-foreground"
                    >
                      Belum ada petugas.
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
