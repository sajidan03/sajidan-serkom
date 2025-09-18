import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import {
  Calendar,
  CreditCard,
  TrendingUp,
  TrendingDown,
  Users,
  BookOpen,
  School,
  Newspaper,
  Image,
  Activity,
  DollarSign
} from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

// Interface untuk data dashboard
interface DashboardData {
  total_guru: number;
  total_siswa: number;
  total_berita: number;
  total_galeri: number;
  total_ekskul: number;
  total_users: number;
  statistik_siswa: { kelas: string; jumlah: number }[];
  statistik_guru: { bidang: string; jumlah: number }[];
  recent_activities: {
    id: number;
    user_name: string;
    activity: string;
    created_at: string;
  }[];
}

interface DashboardProps {
  dashboardData: DashboardData;
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: dashboard().url,
  },
];

// Data contoh untuk SMK YPC
const fakeDashboardData: DashboardData = {
  total_guru: 42,
  total_siswa: 586,
  total_berita: 24,
  total_galeri: 156,
  total_ekskul: 12,
  total_users: 8,
  statistik_siswa: [
    { kelas: "X", jumlah: 210 },
    { kelas: "XI", jumlah: 192 },
    { kelas: "XII", jumlah: 184 }
  ],
  statistik_guru: [
    { bidang: "Matematika & IPA", jumlah: 10 },
    { bidang: "Bahasa & Sastra", jumlah: 8 },
    { bidang: "Teknologi Informasi", jumlah: 12 },
    { bidang: "Teknik & Mesin", jumlah: 7 },
    { bidang: "Seni & Budaya", jumlah: 5 }
  ],
  recent_activities: [
    {
      id: 1,
      user_name: "Ahmad Sutisna",
      activity: "Menambahkan berita baru 'Penerimaan Siswa Baru 2024'",
      created_at: "2024-05-15T14:30:00"
    },
    {
      id: 2,
      user_name: "Dewi Kartika",
      activity: "Mengupdate data guru pengajar Matematika",
      created_at: "2024-05-15T13:15:00"
    },
    {
      id: 3,
      user_name: "Rizky Pratama",
      activity: "Mengupload foto kegiatan ekstrakurikuler",
      created_at: "2024-05-15T11:45:00"
    },
    {
      id: 4,
      user_name: "Siti Rahayu",
      activity: "Memperbarui profil sekolah",
      created_at: "2024-05-15T09:20:00"
    },
    {
      id: 5,
      user_name: "Budi Santoso",
      activity: "Menambahkan jadwal ujian semester",
      created_at: "2024-05-14T16:40:00"
    }
  ]
};

export default function Dashboard({ dashboardData = fakeDashboardData }: DashboardProps) {
  const { props } = usePage<{ dashboardData: DashboardData }>();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('id-ID').format(num);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Chart options untuk statistik siswa
  const siswaChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Distribusi Siswa per Kelas',
        font: {
          size: 16,
          weight: 'bold',
        },
        color: '#374151',
        padding: {
          top: 10,
          bottom: 30
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 50,
          precision: 0
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    },
  };

  // Data untuk chart statistik siswa
  const siswaChartData = {
    labels: dashboardData.statistik_siswa.map(item => `Kelas ${item.kelas}`),
    datasets: [
      {
        label: 'Jumlah Siswa',
        data: dashboardData.statistik_siswa.map(item => item.jumlah),
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
        borderRadius: 6,
        hoverBackgroundColor: 'rgba(59, 130, 246, 1)',
      },
    ],
  };

  // Chart options untuk statistik guru
  const guruChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
      },
      title: {
        display: true,
        text: 'Distribusi Guru per Bidang',
        font: {
          size: 16,
          weight: 'bold',
        },
        color: '#374151',
        padding: {
          top: 10,
          bottom: 30
        }
      },
    },
  };

  // Data untuk chart statistik guru (pie chart)
  const guruChartData = {
    labels: dashboardData.statistik_guru.map(item => item.bidang),
    datasets: [
      {
        label: 'Jumlah Guru',
        data: dashboardData.statistik_guru.map(item => item.jumlah),
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  if (!isClient) {
    return (
      <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="Dashboard" />
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard Admin SMK YPC" />
      <div className="flex flex-col gap-6 p-6">
        {/* Header dengan Waktu Real-time */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Dashboard Admin SMK YPC</h1>
              <p className="text-muted-foreground">
                Sistem Manajemen Sekolah - SMK Yayasan Pendidikan Cendekia
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-mono text-blue-600">
                {currentTime.toLocaleTimeString('id-ID')}
              </div>
              <div className="text-sm text-muted-foreground">
                {currentTime.toLocaleDateString('id-ID', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Grid Statistik */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {/* Total Guru */}
          <div className="rounded-lg border bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <h3 className="text-sm font-medium text-muted-foreground">Total Guru</h3>
                <p className="text-2xl font-bold">{formatNumber(dashboardData.total_guru)}</p>
              </div>
              <div className="rounded-full bg-blue-100 p-2">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Total Siswa */}
          <div className="rounded-lg border bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <h3 className="text-sm font-medium text-muted-foreground">Total Siswa</h3>
                <p className="text-2xl font-bold">{formatNumber(dashboardData.total_siswa)}</p>
              </div>
              <div className="rounded-full bg-green-100 p-2">
                <School className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </div>

          {/* Total Berita */}
          <div className="rounded-lg border bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <h3 className="text-sm font-medium text-muted-foreground">Total Berita</h3>
                <p className="text-2xl font-bold">{formatNumber(dashboardData.total_berita)}</p>
              </div>
              <div className="rounded-full bg-amber-100 p-2">
                <Newspaper className="h-5 w-5 text-amber-600" />
              </div>
            </div>
          </div>

          {/* Total Galeri */}
          <div className="rounded-lg border bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <h3 className="text-sm font-medium text-muted-foreground">Galeri Foto</h3>
                <p className="text-2xl font-bold">{formatNumber(dashboardData.total_galeri)}</p>
              </div>
              <div className="rounded-full bg-purple-100 p-2">
                <Image className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </div>

          {/* Total Ekskul */}
          <div className="rounded-lg border bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <h3 className="text-sm font-medium text-muted-foreground">Ekstrakurikuler</h3>
                <p className="text-2xl font-bold">{formatNumber(dashboardData.total_ekskul)}</p>
              </div>
              <div className="rounded-full bg-red-100 p-2">
                <Activity className="h-5 w-5 text-red-600" />
              </div>
            </div>
          </div>

          {/* Total Admin */}
          <div className="rounded-lg border bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <h3 className="text-sm font-medium text-muted-foreground">Admin Sistem</h3>
                <p className="text-2xl font-bold">{formatNumber(dashboardData.total_users)}</p>
              </div>
              <div className="rounded-full bg-gray-100 p-2">
                <Users className="h-5 w-5 text-gray-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Chart Statistik Siswa */}
          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <div className="h-80">
              {dashboardData.statistik_siswa.length > 0 ? (
                <Bar
                  key={JSON.stringify(dashboardData.statistik_siswa)}
                  options={siswaChartOptions}
                  data={siswaChartData}
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-500">Tidak ada data siswa</p>
                </div>
              )}
            </div>
          </div>

          {/* Chart Statistik Guru */}
          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <div className="h-80">
              {dashboardData.statistik_guru.length > 0 ? (
                <Bar
                  key={JSON.stringify(dashboardData.statistik_guru)}
                  options={guruChartOptions}
                  data={guruChartData}
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-500">Tidak ada data guru</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Aktivitas Terbaru */}
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold">Aktivitas Terbaru</h2>
          {dashboardData.recent_activities.length > 0 ? (
            <div className="space-y-4">
              {dashboardData.recent_activities.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-full">
                      <Activity className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">{activity.user_name}</p>
                      <p className="text-sm text-muted-foreground">{activity.activity}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">
                      {formatDate(activity.created_at)} {formatTime(activity.created_at)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Calendar className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>Belum ada aktivitas</p>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
