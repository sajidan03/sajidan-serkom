import Sidebar from "@/components/admin-sidebar"
import Breadcrumbs from "@/components/breadcrumbs"
import { usePage } from "@inertiajs/react"

export default function AdminLayout({ children, breadcrumbs = [] }) {
  const { props } = usePage()
  const profil = props.profil

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Konten */}
      <main className="flex-1 p-6 md:ml-64">
        {/* Judul */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            {profil?.nama_sekolah}
          </h1>
        </div>

        {/* Breadcrumbs */}
        {breadcrumbs.length > 0 && <Breadcrumbs items={breadcrumbs} />}

        <div className="bg-white rounded-xl shadow p-6">
          {children}
        </div>
      </main>
    </div>
  )
}
