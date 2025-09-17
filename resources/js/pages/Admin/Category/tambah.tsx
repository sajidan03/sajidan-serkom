import AppLayout from "@/layouts/app-layout"
import { Head, Link, useForm } from "@inertiajs/react"
import { BreadcrumbItem } from "@/types"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { Save, ArrowLeft } from "lucide-react"

const breadcrumbs: BreadcrumbItem[] = [
  { title: "Jenis Iuran", href: "/admin/category" },
  { title: "Buat Baru", href: "/admin/category/tambah" },
]

export default function CategoryCreate() {
  const { data, setData, post, processing } = useForm({
    name: "",
    period: "",
    nominal: "",
    status: "active",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    post("/admin/category/tambah")
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Buat Jenis Iuran" />

      {/* hilangkan max-w, gunakan w-full + padding */}
      <div className="w-full px-4 md:px-10 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Buat Jenis Iuran
          </h1>
          <p className="text-gray-500 text-sm">
            Tambahkan jenis iuran baru untuk warga.
          </p>
        </div>

        <Card className="border border-gray-200 shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-blue-600 text-lg">
              Formulir Jenis Iuran
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* nama */}
              <div className="space-y-2">
                <Label htmlFor="name" className="font-medium">
                  Nama Jenis Iuran
                </Label>
                <Input
                  id="name"
                  value={data.name}
                  onChange={(e) => setData("name", e.target.value)}
                  placeholder="Contoh: Iuran Kebersihan"
                  required
                />
              </div>

              {/* grid periode + nominal */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Periode</Label>
                  <Select
                    value={data.period}
                    onValueChange={(val) => setData("period", val)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="-- Pilih Periode --" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mingguan">Mingguan</SelectItem>
                      <SelectItem value="bulanan">Bulanan</SelectItem>
                      <SelectItem value="tahunan">Tahunan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nominal">Nominal</Label>
                  <Input
                    id="nominal"
                    type="number"
                    value={data.nominal}
                    onChange={(e) => setData("nominal", e.target.value)}
                    placeholder="Contoh: 50000"
                    required
                  />
                </div>
              </div>

              {/* status */}
              <div className="space-y-2">
                <Label>Status</Label>
                <Select
                  value={data.status}
                  onValueChange={(val) => setData("status", val)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* tombol */}
              <div className="flex flex-col md:flex-row md:justify-between gap-3 pt-4">
                <Link href="/admin/category" className="md:order-1">
                  <Button type="button" variant="outline" className="flex items-center gap-1">
                    <ArrowLeft className="w-4 h-4" />
                    Kembali
                  </Button>
                </Link>
                <Button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 flex items-center gap-1 md:order-2"
                  disabled={processing}
                >
                  <Save className="w-4 h-4" />
                  Simpan
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}
