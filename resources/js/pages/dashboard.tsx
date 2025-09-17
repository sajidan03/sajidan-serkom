import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import {
    
  Calendar,
  CreditCard,
  TrendingUp,
  TrendingDown
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

// Register ChartJS components - INI SANGAT PENTING!
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

interface DashboardData {
  total_users: number;
  total_members: number;
  total_residents: number;
  total_officers: number;
  total_revenue: number;
  total_categories: number;
  monthly_revenue: { month: string; revenue: number }[];
  user_activity: { day: string; active: number }[];
  recent_payments: {
    id: number;
    user_name: string;
    amount: number;
    period: string;
    created_at: string;
  }[];
  monthly_stats: {
    month: string;
    total_payments: number;
    total_amount: number;
  }[];
  revenue_growth: number;
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

export default function Dashboard({ dashboardData }: DashboardProps) {
  const { props } = usePage<{ dashboardData: DashboardData }>();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Pastikan kita di client-side untuk Chart.js
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('id-ID').format(num);
  };

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(num);
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

  // Chart options untuk pendapatan bulanan - DIPERBAIKI
  const revenueChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Pendapatan Bulanan',
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
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return formatCurrency(context.raw);
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value: any) {
            if (value >= 1000000) {
              return 'Rp' + (value / 1000000).toFixed(1) + 'Jt';
            } else if (value >= 1000) {
              return 'Rp' + (value / 1000).toFixed(0) + 'Rb';
            }
            return 'Rp' + value;
          }
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

  // Data untuk chart pendapatan bulanan - DIPERBAIKI
  const revenueChartData = {
    labels: dashboardData.monthly_revenue.map(item => item.month),
    datasets: [
      {
        label: 'Pendapatan',
        data: dashboardData.monthly_revenue.map(item => item.revenue),
        backgroundColor: 'rgba(16, 185, 129, 0.8)',
        borderColor: 'rgba(16, 185, 129, 1)',
        borderWidth: 1,
        borderRadius: 6,
        hoverBackgroundColor: 'rgba(16, 185, 129, 1)',
      },
    ],
  };

  // Chart options untuk aktivitas pengguna - DIPERBAIKI
  const activityChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Aktivitas Pengguna',
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
          stepSize: 1,
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

  // Data untuk chart aktivitas pengguna - DIPERBAIKI
  const activityChartData = {
    labels: dashboardData.user_activity.map(item => item.day),
    datasets: [
      {
        label: 'Aktivitas',
        data: dashboardData.user_activity.map(item => item.active),
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
        borderRadius: 6,
        hoverBackgroundColor: 'rgba(59, 130, 246, 1)',
      },
    ],
  };

  // Hitung statistik untuk card pendapatan
  const currentMonthRevenue = dashboardData.monthly_revenue.length > 0
    ? dashboardData.monthly_revenue[dashboardData.monthly_revenue.length - 1].revenue
    : 0;

  const previousMonthRevenue = dashboardData.monthly_revenue.length > 1
    ? dashboardData.monthly_revenue[dashboardData.monthly_revenue.length - 2].revenue
    : 0;

  const revenueChange = previousMonthRevenue > 0
    ? ((currentMonthRevenue - previousMonthRevenue) / previousMonthRevenue) * 100
    : 0;

  // Pastikan data chart tersedia sebelum render
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
      <Head title="Dashboard" />
      <div className="flex flex-col gap-6 p-6">
        {/* Header dengan Waktu Real-time */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground">
                Ringkasan data dan statistik sistem iuran warga
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
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {/* Total Pendapatan Bulan Ini */}
          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <h3 className="text-sm font-medium text-muted-foreground">Pendapatan Bulan Ini</h3>
                <p className="text-2xl font-bold">{formatCurrency(currentMonthRevenue)}</p>
                <div className={`flex items-center gap-1 text-xs ${
                  revenueChange >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {revenueChange >= 0 ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : (
                    <TrendingDown className="h-3 w-3" />
                  )}
                  <span>{Math.abs(revenueChange).toFixed(1)}% dari bulan lalu</span>
                </div>
              </div>
              <div className="rounded-full bg-teal-100 p-3">
                <DollarSign className="h-5 w-5 text-teal-600" />
              </div>
            </div>
          </div>

          {/* Card statistik lainnya... */}
          {/* ... (kode card statistik lainnya tetap sama) ... */}
        </div>

        {/* Charts Section - DIPERBAIKI */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Chart Pendapatan Bulanan dengan Chart.js */}
          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <div className="h-80">
              {dashboardData.monthly_revenue.length > 0 ? (
                <Bar
                  key={JSON.stringify(dashboardData.monthly_revenue)} // Force re-render on data change
                  options={revenueChartOptions}
                  data={revenueChartData}
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-500">Tidak ada data pendapatan</p>
                </div>
              )}
            </div>
          </div>

          {/* Chart Aktivitas Pengguna dengan Chart.js */}
          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <div className="h-80">
              {dashboardData.user_activity.length > 0 ? (
                <Bar
                  key={JSON.stringify(dashboardData.user_activity)} // Force re-render on data change
                  options={activityChartOptions}
                  data={activityChartData}
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-500">Tidak ada data aktivitas</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Pembayaran Terbaru */}
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold">Pembayaran Terbaru</h2>
          {dashboardData.recent_payments.length > 0 ? (
            <div className="space-y-4">
              {dashboardData.recent_payments.map((payment) => (
                <div key={payment.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded-full">
                      <CreditCard className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">{payment.user_name}</p>
                      <p className="text-sm text-muted-foreground">{payment.period}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">{formatCurrency(payment.amount)}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(payment.created_at)} {formatTime(payment.created_at)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Calendar className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>Belum ada pembayaran</p>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
