import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import {
  BarChart3,
  Users,
  UserCheck,
  UserCog,
  DollarSign,
  Folder,
  TrendingUp,
  Activity,
  Calendar,
  CreditCard
} from 'lucide-react';
import { useEffect, useState } from 'react';

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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format angka untuk tampilan
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('id-ID').format(num);
  };

  // Format currency untuk tampilan
  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(num);
  };

  // Format date untuk tampilan
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  // Format time untuk tampilan
  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Hitung progress percentage untuk chart
  const calculatePercentage = (value: number, max: number) => {
    return Math.min((value / max) * 100, 100);
  };

  // Find max values for charts
  const maxRevenue = Math.max(...dashboardData.monthly_revenue.map(item => item.revenue), 0);
  const maxActivity = Math.max(...dashboardData.user_activity.map(item => item.active), 0);

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
          {/* Total User */}
          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <h3 className="text-sm font-medium text-muted-foreground">Total User</h3>
                <p className="text-2xl font-bold">{formatNumber(dashboardData.total_users)}</p>
              </div>
              <div className="rounded-full bg-blue-100 p-3">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
            </div>
            <div className="mt-2 text-xs text-muted-foreground">
              Total pengguna sistem
            </div>
          </div>

          {/* Total Member */}
          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <h3 className="text-sm font-medium text-muted-foreground">Member Aktif</h3>
                <p className="text-2xl font-bold">{formatNumber(dashboardData.total_members)}</p>
              </div>
              <div className="rounded-full bg-green-100 p-3">
                <UserCheck className="h-5 w-5 text-green-600" />
              </div>
            </div>
            <div className="mt-2 text-xs text-muted-foreground">
              Anggota aktif iuran
            </div>
          </div>

          {/* Total Warga */}
          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <h3 className="text-sm font-medium text-muted-foreground">Total Warga</h3>
                <p className="text-2xl font-bold">{formatNumber(dashboardData.total_residents)}</p>
              </div>
              <div className="rounded-full bg-purple-100 p-3">
                <Users className="h-5 w-5 text-purple-600" />
              </div>
            </div>
            <div className="mt-2 text-xs text-muted-foreground">
              Data warga terdaftar
            </div>
          </div>

          {/* Total Petugas */}
          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <h3 className="text-sm font-medium text-muted-foreground">Petugas</h3>
                <p className="text-2xl font-bold">{formatNumber(dashboardData.total_officers)}</p>
              </div>
              <div className="rounded-full bg-orange-100 p-3">
                <UserCog className="h-5 w-5 text-orange-600" />
              </div>
            </div>
            <div className="mt-2 text-xs text-muted-foreground">
              Staff pengelola iuran
            </div>
          </div>

          {/* Total Pendapatan */}
          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <h3 className="text-sm font-medium text-muted-foreground">Total Pendapatan</h3>
                <p className="text-2xl font-bold">{formatCurrency(dashboardData.total_revenue)}</p>
              </div>
              <div className="rounded-full bg-teal-100 p-3">
                <DollarSign className="h-5 w-5 text-teal-600" />
              </div>
            </div>
            <div className="mt-2 text-xs text-muted-foreground">
              Total pemasukan iuran
            </div>
          </div>

          {/* Total Kategori */}
          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <h3 className="text-sm font-medium text-muted-foreground">Jenis Iuran</h3>
                <p className="text-2xl font-bold">{formatNumber(dashboardData.total_categories)}</p>
              </div>
              <div className="rounded-full bg-pink-100 p-3">
                <Folder className="h-5 w-5 text-pink-600" />
              </div>
            </div>
            <div className="mt-2 text-xs text-muted-foreground">
              Kategori iuran aktif
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Chart Pendapatan Bulanan */}
          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Pendapatan Bulanan</h2>
              <BarChart3 className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="h-64">
              {dashboardData.monthly_revenue.length > 0 ? (
                <div className="flex h-full items-end justify-between gap-2">
                  {dashboardData.monthly_revenue.map((item, index) => {
                    const heightPercentage = calculatePercentage(item.revenue, maxRevenue);
                    return (
                      <div key={index} className="flex flex-1 flex-col items-center">
                        <div
                          className="w-full rounded-t-md bg-teal-500 transition-all hover:bg-teal-600"
                          style={{ height: `${heightPercentage}%` }}
                          title={`${item.month}: ${formatCurrency(item.revenue)}`}
                        ></div>
                        <span className="mt-2 text-xs text-muted-foreground">
                          {item.month}
                        </span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="flex h-full items-center justify-center">
                  <p className="text-muted-foreground">Tidak ada data pendapatan</p>
                </div>
              )}
            </div>
          </div>

          {/* Chart Aktivitas Pengguna */}
          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Aktivitas Pengguna</h2>
              <Activity className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="h-64">
              {dashboardData.user_activity.length > 0 ? (
                <div className="flex h-full items-end justify-between gap-2">
                  {dashboardData.user_activity.map((item, index) => {
                    const heightPercentage = calculatePercentage(item.active, maxActivity);
                    return (
                      <div key={index} className="flex flex-1 flex-col items-center">
                        <div
                          className="w-full rounded-t-md bg-blue-500 transition-all hover:bg-blue-600"
                          style={{ height: `${heightPercentage}%` }}
                          title={`${item.day}: ${item.active} aktivitas`}
                        ></div>
                        <span className="mt-2 text-xs text-muted-foreground">
                          {item.day}
                        </span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="flex h-full items-center justify-center">
                  <p className="text-muted-foreground">Tidak ada data aktivitas</p>
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
              {dashboardData.recent_payments.map((payment, index) => (
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