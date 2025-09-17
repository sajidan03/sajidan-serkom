import AppLayout from "@/layouts/app-layout"
import { Head, useForm, usePage } from "@inertiajs/react"
import { BreadcrumbItem } from "@/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

interface User {
  id: number
  name: string
}

interface Category {
  id: number
  period: string
  nominal: number
}

interface Member {
  id: number
  encrypted_id: string // TAMBAHKAN encrypted_id
  id_user: number
  id_category: number
  user?: User
  category?: Category
}

interface EditMemberProps {
  member: Member
  users: User[]
  categories: Category[]
}

const breadcrumbs: BreadcrumbItem[] = [
  { title: "Dashboard", href: "/admin" },
  { title: "Kelola Anggota", href: "/admin/member" },
  { title: "Edit Anggota", href: "#" },
]

export default function EditMember({ member, users, categories }: EditMemberProps) {
  const { data, setData, put, processing, errors } = useForm({
    id_user: member.id_user || '',
    id_category: member.id_category || '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // GUNAKAN encrypted_id bukan id biasa
    put(`/admin/member/edit/${member.encrypted_id}`)
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Edit Anggota Iuran" />

      <div className="w-full p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Edit Anggota Iuran</h1>
        </div>

        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle>Form Edit Anggota</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Warga Selection */}
              <div className="space-y-2">
                <Label htmlFor="id_user">Warga</Label>
                <Select
                  value={data.id_user.toString()}
                  onValueChange={(value) => setData('id_user', parseInt(value))}
                >
                  <SelectTrigger id="id_user">
                    <SelectValue placeholder="Pilih Warga" />
                  </SelectTrigger>
                  <SelectContent>
                    {users.map((user) => (
                      <SelectItem key={user.id} value={user.id.toString()}>
                        {user.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.id_user && (
                  <p className="text-red-500 text-sm">{errors.id_user}</p>
                )}
              </div>

              {/* Jenis Iuran Selection */}
              <div className="space-y-2">
                <Label htmlFor="id_category">Jenis Iuran</Label>
                <Select
                  value={data.id_category.toString()}
                  onValueChange={(value) => setData('id_category', parseInt(value))}
                >
                  <SelectTrigger id="id_category">
                    <SelectValue placeholder="Pilih Jenis Iuran" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id.toString()}>
                        {category.period.charAt(0).toUpperCase() + category.period.slice(1)} - 
                        Rp {new Intl.NumberFormat('id-ID').format(category.nominal)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.id_category && (
                  <p className="text-red-500 text-sm">{errors.id_category}</p>
                )}
              </div>

              <Button type="submit" disabled={processing} className="bg-blue-600 hover:bg-blue-700">
                {processing ? 'Memproses...' : 'Update'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}