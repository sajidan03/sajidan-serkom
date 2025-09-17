import { Input } from "@/components/ui/input"
import AppLayout from "@/layouts/app-layout"
import { Head, Link, useForm } from "@inertiajs/react"
import { Label } from "@radix-ui/react-label"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"

interface User {
  id: number
  name: string
  username: string
  role: string
}

export default function Edit({ user }: { user: User }) {
  const { data, setData, put, processing, errors } = useForm({
    name: user.name || "",
    username: user.username || "",
    role: user.role || "warga",
    password: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    put(`/admin/user/edit/${user.id}`)
  }

  return (
    <AppLayout>
      <Head title="Edit User" />

      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Edit User</h1>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Nama */}
          <div>
            <Label>Nama</Label>
            <Input
              type="text"
              value={data.name}
              onChange={(e) => setData("name", e.target.value)}
            />
            {errors.name && (
              <div className="text-red-600 text-sm">{errors.name}</div>
            )}
          </div>

          {/* Email */}
          <div>
            <Label>Username</Label>
            <Input
              type="text"
              value={data.username}
              onChange={(e) => setData("username", e.target.value)}
            />
            {errors.username && (
              <div className="text-red-600 text-sm">{errors.username}</div>
            )}
          </div>

          {/* Password */}
          <div>
            <Label>Password (opsional)</Label>
            <Input
              type="password"
              value={data.password}
              onChange={(e) => setData("password", e.target.value)}
              placeholder="Kosongkan jika tidak ingin diubah"
            />
            {errors.password && (
              <div className="text-red-600 text-sm">{errors.password}</div>
            )}
          </div>

          {/* Role */}
          <div>
            <Label>Role</Label>
            <Select
              value={data.role}
              onValueChange={(value) => setData("role", value)}
            >
              <SelectTrigger className="mt-1 w-full">
                <SelectValue placeholder="Pilih role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="warga">Warga</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="petugas">Petugas</SelectItem>
              </SelectContent>
            </Select>
            {errors.role && (
              <div className="text-red-600 text-sm">{errors.role}</div>
            )}
          </div>

          {/* Tombol */}
          <div className="col-span-1 md:col-span-2 flex justify-between items-center mt-4">
            <Link
              href="/admin/user"
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              Kembali
            </Link>
            <button
              type="submit"
              disabled={processing}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
            >
              {processing ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </AppLayout>
  )
}
