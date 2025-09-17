import { Input } from '@/components/ui/input'
import AppLayout from '@/layouts/app-layout'
import { type BreadcrumbItem } from '@/types'
import { Head, Link, useForm } from '@inertiajs/react'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, UserPlus, Shield, User, Users } from "lucide-react"

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: '/admin' },
  { title: 'Kelola User', href: '/admin/user' },
  { title: 'Tambah User', href: '#' },
]

export default function Create() {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    username: '',
    password: '',
    role: 'warga',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    post('/admin/user/tambah')
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return <Shield className="w-4 h-4" />
      case 'petugas': return <User className="w-4 h-4" />
      default: return <Users className="w-4 h-4" />
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-700 border-red-200'
      case 'petugas': return 'bg-blue-100 text-blue-700 border-blue-200'
      default: return 'bg-green-100 text-green-700 border-green-200'
    }
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Tambah User" />

      <div className="w-full p-6">
        {/* Header Section */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <UserPlus className="w-6 h-6 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Tambah User Baru</h1>
          </div>
          <p className="text-gray-600">Tambahkan user baru ke dalam sistem management iuran warga</p>
        </div>

        <Card className="w-full max-w-4xl mx-auto shadow-lg border-0">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardTitle className="flex items-center gap-2">
              <UserPlus className="w-5 h-5" />
              Form Tambah User
            </CardTitle>
            <CardDescription>
              Lengkapi form berikut untuk menambahkan user baru
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Nama */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">
                    Nama Lengkap *
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    placeholder="Masukkan nama lengkap"
                    className="w-full"
                  />
                  {errors.name && (
                    <div className="text-red-600 text-sm flex items-center gap-1">
                      <span>⚠️</span>
                      {errors.name}
                    </div>
                  )}
                </div>

                {/* Username */}
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-sm font-medium">
                    Username *
                  </Label>
                  <Input
                    id="username"
                    type="text"
                    value={data.username}
                    onChange={(e) => setData('username', e.target.value)}
                    placeholder="Masukkan username"
                    className="w-full"
                  />
                  {errors.username && (
                    <div className="text-red-600 text-sm flex items-center gap-1">
                      <span>⚠️</span>
                      {errors.username}
                    </div>
                  )}
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Password *
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                    placeholder="Masukkan password"
                    className="w-full"
                  />
                  {errors.password && (
                    <div className="text-red-600 text-sm flex items-center gap-1">
                      <span>⚠️</span>
                      {errors.password}
                    </div>
                  )}
                </div>

                {/* Role */}
                <div className="space-y-2">
                  <Label htmlFor="role" className="text-sm font-medium">
                    Role *
                  </Label>
                  <Select
                    value={data.role}
                    onValueChange={(value) => setData("role", value)}
                  >
                    <SelectTrigger id="role" className="w-full">
                      <SelectValue placeholder="Pilih role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="warga">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          Warga
                        </div>
                      </SelectItem>
                      <SelectItem value="petugas">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          Petugas
                        </div>
                      </SelectItem>
                      <SelectItem value="admin">
                        <div className="flex items-center gap-2">
                          <Shield className="w-4 h-4" />
                          Admin
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.role && (
                    <div className="text-red-600 text-sm flex items-center gap-1">
                      <span>⚠️</span>
                      {errors.role}
                    </div>
                  )}
                </div>
              </div>

              {/* Role Preview */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-sm text-gray-700 mb-2">Preview Role:</h4>
                <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-full border ${getRoleColor(data.role)}`}>
                  {getRoleIcon(data.role)}
                  <span className="text-sm font-medium capitalize">{data.role}</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  User akan memiliki akses sesuai dengan role yang dipilih
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between items-center pt-4 border-t">
                <Link
                  href="/admin/user"
                  className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Kembali ke Daftar User
                </Link>
                <Button
                  type="submit"
                  disabled={processing}
                  className="bg-blue-600 hover:bg-blue-700 px-6 py-2"
                >
                  {processing ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Menyimpan...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <UserPlus className="w-4 h-4" />
                      Simpan User
                    </div>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Info Box */}
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg max-w-4xl mx-auto">
          <div className="flex items-start gap-3">
            <div className="p-1 bg-yellow-100 rounded">
              <Shield className="w-4 h-4 text-yellow-600" />
            </div>
            <div>
              <h4 className="font-medium text-yellow-800">Informasi Penting</h4>
              <p className="text-sm text-yellow-700">
                Pastikan data yang dimasukkan sudah benar. Role yang dipilih akan menentukan 
                hak akses user dalam sistem.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}