import AppLayout from '@/layouts/officer-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';

interface User {
  id: number;
  name: string;
}

interface Category {
  id: number;
  name: string;
  period: string;
  nominal: number;
}

interface Member {
  id: number;
  id_user: number;
  user: User;
  category: Category;
  encrypted_id: string;
}

interface PaymentPageProps {
  belumBayar: Member[];
  sudahBayar: Member[];
  bulanIni: string;
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/officer',
  },
  {
    title: 'Daftar Pembayaran',
    href: '#',
  },
];

export default function PaymentList() {
  const { props } = usePage<PaymentPageProps>();
  const { belumBayar, bulanIni } = props;

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Daftar Pembayaran" />
      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Pembayaran Iuran {bulanIni}</h1>
        </div>

        {/* Table untuk anggota yang belum bayar */}
        <div id="belum-bayar" className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Total pembayaran({belumBayar.length})</h2>
          <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <table className="min-w-full table-auto border-collapse">
              <thead className="bg-gray-100 text-gray-700 text-sm">
                <tr>
                  <th className="px-4 py-3 text-left">No</th>
                  <th className="px-4 py-3 text-left">Nama Warga</th>
                  <th className="px-4 py-3 text-left">Kategori</th>
                  <th className="px-4 py-3 text-left">Periode Pembayaran</th>
                  <th className="px-4 py-3 text-left">Nominal Pembayaran</th>
                  <th className="px-4 py-3 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="text-gray-600">
                {belumBayar.length > 0 ? (
                  belumBayar.map((item, index) => (
                    <tr key={item.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3">{index + 1}</td>
                      <td className="px-4 py-3">{item.user?.name || 'N/A'}</td>
                      <td className="px-4 py-3">{item.category?.name || 'N/A'}</td>
                      <td className="px-4 py-3">{item.category?.period || 'N/A'}</td>
                      <td className="px-4 py-3">
                        {item.category?.nominal
                          ? `Rp ${new Intl.NumberFormat('id-ID').format(item.category.nominal)}`
                          : 'N/A'
                        }
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Link
                          href={`/petugas/payment/${item.encrypted_id}`}
                          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-sm"
                        >
                          Bayar Sekarang
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-4 py-6 text-center text-gray-500">
                      Semua anggota sudah membayar iuran bulan ini
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
