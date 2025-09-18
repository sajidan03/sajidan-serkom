import AppLayout from "@/layouts/app-layout"
import { Head, useForm } from "@inertiajs/react"
import { BreadcrumbItem } from "@/types"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { UserPlus, RotateCcw, Save } from "lucide-react"

type User = {
  id: number
  name: string
}

interface TambahOfficerProps {
  users: User[]
}

const breadcrumbs: BreadcrumbItem[] = [
  { title: "Kelola Petugas", href: "/admin/petugas" },
  { title: "Tambah Officer", href: "/admin/petugas/create" },
]

export default function TambahOfficer({ users }: TambahOfficerProps) {
  const { data, setData, post, processing, reset } = useForm({
    id_user: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    post("/admin/petugas/tambah")
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Tambah Officer" />

      <div className="px-4 sm:px-6 lg:px-8">
        <Card className="w-full shadow-sm border border-gray-100 rounded-2xl">
          <CardHeader className="border-b border-gray-100 pb-4">
            <CardTitle className="flex items-center gap-2 text-xl font-semibold text-green-700">
              <UserPlus className="w-5 h-5" />
              Tambah Officer
            </CardTitle>
          </CardHeader>

          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Pilih User */}
              <div className="space-y-2">
                <Label htmlFor="id_user" className="text-sm font-medium text-gray-700">
                  Pilih User
                </Label>
                <Select
                  value={data.id_user}
                  onValueChange={(value) => setData("id_user", value)}
                >
                  <SelectTrigger
                    id="id_user"
                    className="w-full border-gray-300 focus:border-green-500 focus:ring-green-500"
                  >
                    <SelectValue placeholder="-- Pilih User --" />
                  </SelectTrigger>
                  <SelectContent>
                    {users.map((user) => (
                      <SelectItem key={user.id} value={String(user.id)}>
                        {user.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Tombol Aksi */}
              <div className="flex items-center justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => reset()}
                  disabled={processing}
                  className="flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </Button>

                <Button
                  type="submit"
                  disabled={processing}
                  className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Simpan Officer
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}
