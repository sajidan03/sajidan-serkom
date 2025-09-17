<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Member;
use App\Models\Payment;
use App\Models\Category;
use Inertia\Inertia;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index()
    {
        $data = [
            'total_users' => User::count(),
            'total_members' => Member::count(),
            'total_residents' => User::where('role', 'warga')->count(),
            'total_officers' => User::where('role', 'petugas')->count(),
            'total_revenue' => (int) Payment::sum('nominal'),
            'total_categories' => Category::count(),
        ];

        // Data pendapatan bulanan (12 bulan terakhir)
        $monthlyRevenue = [];
        for ($i = 11; $i >= 0; $i--) {
            $date = Carbon::now()->subMonths($i);
            $revenue = Payment::whereYear('created_at', $date->year)
                ->whereMonth('created_at', $date->month)
                ->sum('nominal');

            $monthlyRevenue[] = [
                'month' => $date->format('M Y'), // Format lebih lengkap
                'revenue' => (int) $revenue
            ];
        }

        // Data aktivitas pengguna (7 hari terakhir)
        $userActivity = [];
        for ($i = 6; $i >= 0; $i--) {
            $date = Carbon::now()->subDays($i);
            $activity = Payment::whereDate('created_at', $date->toDateString())->count();

            $userActivity[] = [
                'day' => $date->format('D'), // Nama hari
                'active' => (int) $activity
            ];
        }

        // Pembayaran terbaru
        $recentPayments = Payment::with('user')
            ->orderBy('created_at', 'desc')
            ->take(5)
            ->get()
            ->map(function ($payment) {
                return [
                    'id' => $payment->id,
                    'user_name' => $payment->user->name ?? 'Unknown',
                    'amount' => (int) $payment->nominal,
                    'period' => $payment->period ?? Carbon::parse($payment->created_at)->format('F Y'),
                    'created_at' => $payment->created_at->toISOString()
                ];
            });

        // Hitung pertumbuhan pendapatan (year-over-year)
        $currentYear = Carbon::now()->year;
        $previousYear = $currentYear - 1;

        $currentYearRevenue = Payment::whereYear('created_at', $currentYear)->sum('nominal');
        $previousYearRevenue = Payment::whereYear('created_at', $previousYear)->sum('nominal');

        $revenueGrowth = 0;
        if ($previousYearRevenue > 0) {
            $revenueGrowth = (($currentYearRevenue - $previousYearRevenue) / $previousYearRevenue) * 100;
        } elseif ($currentYearRevenue > 0) {
            $revenueGrowth = 100;
        }

        $dashboardData = array_merge($data, [
            'monthly_revenue' => $monthlyRevenue,
            'user_activity' => $userActivity,
            'recent_payments' => $recentPayments,
            'revenue_growth' => (float) number_format($revenueGrowth, 1)
        ]);

        return Inertia::render('Admin/Dashboard', [
            'dashboardData' => $dashboardData
        ]);
    }

    // Alternatif: Query yang lebih efisien untuk data bulanan
   private function getMonthlyRevenueData()
{
    $monthlyRevenue = Payment::select(
            DB::raw('YEAR(created_at) as year'),
            DB::raw('MONTH(created_at) as month'),
            DB::raw('COALESCE(SUM(nominal), 0) as revenue')
        )
        ->where('created_at', '>=', Carbon::now()->subMonths(11)->startOfMonth())
        ->groupBy('year', 'month')
        ->orderBy('year', 'asc')
        ->orderBy('month', 'asc')
        ->get();

    // Pastikan ada 12 bulan data dengan nilai default 0
    $fullYearData = [];
    for ($i = 11; $i >= 0; $i--) {
        $date = Carbon::now()->subMonths($i);
        $monthYear = $date->format('M Y');
        $yearMonth = $date->format('Y-m');

        // Cari data yang sesuai
        $revenue = 0;
        foreach ($monthlyRevenue as $item) {
            $itemDate = Carbon::create($item->year, $item->month);
            if ($itemDate->format('Y-m') === $yearMonth) {
                $revenue = (int) $item->revenue;
                break;
            }
        }

        $fullYearData[] = [
            'month' => $monthYear,
            'revenue' => $revenue
        ];
    }

    return $fullYearData;
}

    // Alternatif: Query yang lebih efisien untuk data aktivitas
    public function getUserActivityData()
    {
        $userActivity = Payment::select(
                DB::raw('DATE(created_at) as date'),
                DB::raw('COUNT(*) as activity_count')
            )
            ->where('created_at', '>=', Carbon::now()->subDays(6)->startOfDay())
            ->groupBy('date')
            ->orderBy('date', 'asc')
            ->get()
            ->map(function ($item) {
                $date = Carbon::parse($item->date);
                return [
                    'day' => $date->format('D'),
                    'active' => (int) $item->activity_count
                ];
            });

        // Pastikan ada data untuk semua 7 hari
        $fullWeekData = [];
        for ($i = 6; $i >= 0; $i--) {
            $date = Carbon::now()->subDays($i);
            $existingData = $userActivity->firstWhere('day', $date->format('D'));

            $fullWeekData[] = $existingData ?? [
                'day' => $date->format('D'),
                'active' => 0
            ];
        }

        return $fullWeekData;
    }
}
