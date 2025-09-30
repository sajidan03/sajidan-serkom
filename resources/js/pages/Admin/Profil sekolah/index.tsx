import AppLayout from '@/layouts/app-layout'
import { User, type BreadcrumbItem } from '@/types'
import { Head, usePage, router, Link } from '@inertiajs/react'

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Kelola Ekstrakurikuler',
    href: '/admin/ekstrakurikuler',
  },
]

interface ProfilSekolah {
    id: number
    nama_sekolah: string
    kepala_sekolah: string
    foto: string
    logo: string
    npsn: string
    alamat: string
    kontak: string
    visi_misi: string
    tahun_berdiri: string
    deskripsi: string
    encrypted_id: string
}

export default function ProfilSekolah(){

    return (
        <AppLayout breadcrumbs={breadcrumbs}>

        </AppLayout>
    )
}
