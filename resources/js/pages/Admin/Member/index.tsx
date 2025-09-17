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
import { Edit, Trash2, UserPlus, Users } from "lucide-react"

type Member = {
  id: number
  encrypted_id: string // Tambahkan encrypted_id
  user: { 
    name: string 
  }
  category: {
    period: string
    nominal: number
  }
}

interface MemberIndexProps {
  members: Member[]
  flash?: { success?: string }
}

const breadcrumbs: BreadcrumbItem[] = [
  { title: "Kelola Anggota", href: "/admin/member" },
]

export default function MemberIndex({ members, flash }: MemberIndexProps) {
  const { delete: destroy } = useForm()

  const handleDelete = (encryptedId: string) => {
    if (confirm("Hapus data ini?")) {
      destroy(`/admin/member/hapus/${encryptedId}`)
    }
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Daftar Anggota Iuran" />

      <div className="w-full space-y-6 p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <Users className="w-7 h-7 text-green-600" />
              Daftar Anggota Iuran
            </h1>
            <p className="text-gray-500 text-sm">
              Kelola data anggota yang terdaftar dalam iuran warga.
            </p>
          </div>
          <Link href="/admin/member/tambah">
            <Button className="bg-green-600 hover:bg-green-700 flex items-center gap-2">
              <UserPlus className="w-4 h-4" />
              Tambah Anggota
            </Button>
          </Link>
        </div>

        {/* Flash message */}
        {flash?.success && (
          <div className="p-3 rounded bg-green-100 text-green-700 text-sm shadow-sm">
            {flash.success}
          </div>
        )}

        {/* Card Table */}
        <Card className="shadow-md border border-gray-200">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-700">
              Tabel Anggota
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>No</TableHead>
                  <TableHead>Nama Anggota</TableHead>
                  <TableHead>Periode Pembayaran</TableHead>
                  <TableHead>Nominal Pembayaran</TableHead>
                  <TableHead className="text-center">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {members.length > 0 ? (
                  members.map((member, index) => (
                    <TableRow key={member.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell className="font-medium">
                        {member.user?.name || 'N/A'}
                      </TableCell>
                      <TableCell>{member.category?.period || 'N/A'}</TableCell>
                      <TableCell>
                        {member.category?.nominal 
                          ? `Rp ${new Intl.NumberFormat('id-ID').format(member.category.nominal)}`
                          : 'N/A'
                        }
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-center gap-2">
                          <Link href={`/admin/member/edit/${member.encrypted_id}`}>
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
                            onClick={() => handleDelete(member.encrypted_id)}
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
                      Tidak ada data anggota
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