import { useState } from "react"
import { usePage, Link } from "@inertiajs/react"
import {
  Menu,
  ChevronLeft,
  User,
  Users,
  GraduationCap,
  Newspaper,
  Image as ImageIcon,
  Activity,
  Building2,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function Sidebar() {
  const { props } = usePage()
  const profil = props.profil
  const user = props.auth.user

  const [open, setOpen] = useState(false)

  const menuItems = [
    { label: "User", icon: <User className="w-5 h-5" />, href: "/user" },
    { label: "Siswa", icon: <Users className="w-5 h-5" />, href: "/siswa" },
    { label: "Guru", icon: <GraduationCap className="w-5 h-5" />, href: "/guru" },
    { label: "Berita", icon: <Newspaper className="w-5 h-5" />, href: "/berita" },
    { label: "Galeri", icon: <ImageIcon className="w-5 h-5" />, href: "/galeri" },
    { label: "Ekstrakurikuler", icon: <Activity className="w-5 h-5" />, href: "/ekstra" },
    { label: "Profil Sekolah", icon: <Building2 className="w-5 h-5" />, href: "/profil" },
  ]

  return (
    <div className="flex">
      {/* Tombol toggle mobile – hanya muncul kalau sidebar tertutup */}
      {!open && (
        <div className="md:hidden fixed top-4 left-4 z-50">
          <button
            onClick={() => setOpen(true)}
            className="p-2 rounded-lg bg-white shadow hover:bg-gray-100"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      )}

      {/* Sidebar */}
      <AnimatePresence>
        {(open || typeof window !== "undefined" && window.innerWidth >= 768) && (
          <motion.aside
            initial={{ x: -260 }}
            animate={{ x: 0 }}
            exit={{ x: -260 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="fixed md:static top-0 left-0 h-screen w-64 bg-white border-r shadow-sm z-40"
          >
            <nav className="h-full flex flex-col">
              {/* Logo + Nama */}
              <div className="p-4 pb-2 flex items-center gap-3 border-b">
                <img
                  src={`/storage/assets/${profil.logo}`}
                  alt="Logo"
                  className="w-10 h-10 object-contain"
                />
                <h1 className="text-base font-bold">{profil.nama_sekolah}</h1>
                {/* Tombol close hanya muncul di mobile */}
                {typeof window !== "undefined" && window.innerWidth < 768 && (
                  <button
                    onClick={() => setOpen(false)}
                    className="ml-auto p-1 rounded hover:bg-gray-100"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Menu Items */}
              <ul className="flex-1 px-3 mt-4 space-y-1 overflow-y-auto">
                {menuItems.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-50 hover:text-indigo-600 transition-colors"
                    >
                      {item.icon}
                      <span className="text-sm font-medium">{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Footer / Profil */}
              <div className="p-4 border-t">
                <div className="flex items-center gap-3">
                  <User className="w-6 h-6 text-gray-500" />
                  <div className="text-sm">
                    <p className="font-medium text-gray-700">{user?.name}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                </div>
              </div>
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  )
}
