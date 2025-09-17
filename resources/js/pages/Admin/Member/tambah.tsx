import AppLayout from "@/layouts/app-layout"
import { Head, Link, useForm } from "@inertiajs/react"
import { BreadcrumbItem } from "@/types"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { User, FileText } from "lucide-react"

type UserType = { id: number; name: string }
type CategoryType = { id: number; period: string; nominal: number }

interface MemberCreateProps {
  users: UserType[]
  categories: CategoryType[]
}

const breadcrumbs: BreadcrumbItem[] = [
  { title: "Kelola Anggota", href: "/admin/member" },
  { title: "Tambah", href: "/admin/member/create" },
]

export default function MemberCreate({ users, categories }: MemberCreateProps) {
  const { data, setData, post, processing, errors } = useForm({
    id_user: "",
    id_category: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    post("/admin/member/tambah")
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Tambah Anggota Iuran" />

      {/* full width, tidak dibatasi max-w */}
      <div className="px-6 py-8">
        <Card className="w-full shadow-lg border border-gray-200">
          <form onSubmit={handleSubmit}>
            <CardHeader className="pb-2 border-b">
              <CardTitle className="text-xl font-semibold text-green-600 flex items-center gap-2">
                <User className="w-6 h-6" />
                Tambah Anggota Iuran
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6 pt-6">
              {/* Pilih User */}
              <div className="space-y-1">
                <Label htmlFor="id_user" className="font-medium text-gray-700">
                  Pilih Warga
                </Label>
                <Select
                  onValueChange={(val) => setData("id_user", val)}
                  value={data.id_user}
                >
                  <SelectTrigger className="w-full h-11">
                    <SelectValue placeholder="Pilih Warga" />
                  </SelectTrigger>
                  <SelectContent>
                    {users.map((user) => (
                      <SelectItem key={user.id} value={String(user.id)}>
                        {user.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.id_user && (
                  <p className="text-sm text-red-500">{errors.id_user}</p>
                )}
              </div>

              {/* Pilih Jenis Iuran */}
              <div className="space-y-1">
                <Label
                  htmlFor="id_category"
                  className="font-medium text-gray-700"
                >
                  Jenis Iuran
                </Label>
                <Select
                  onValueChange={(val) => setData("id_category", val)}
                  value={data.id_category}
                >
                  <SelectTrigger className="w-full h-11">
                    <SelectValue placeholder="Pilih Jenis Iuran" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={String(cat.id)}>
                        {cat.period.charAt(0).toUpperCase() + cat.period.slice(1)}{" "}
                        - Rp{cat.nominal.toLocaleString("id-ID")}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.id_category && (
                  <p className="text-sm text-red-500">{errors.id_category}</p>
                )}
              </div>
            </CardContent>

            <CardFooter className="flex justify-end gap-3 border-t pt-4">
              <Link href="/admin/member">
                <Button variant="outline" disabled={processing}>
                  Batal
                </Button>
              </Link>
              <Button
                type="submit"
                className="bg-green-600 hover:bg-green-700 flex items-center gap-1"
                disabled={processing}
              >
                <FileText className="w-4 h-4" />
                Simpan
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </AppLayout>
  )
}
