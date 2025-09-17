<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Pemasukan;
use App\Models\Pengeluaran;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class LaporanKas extends Controller
{
    public function index(Request $request)
    {
        $bulan = $request->input('bulan');
        $jenis = $request->input('jenis');
        $search = $request->input('search');

        $pemasukanQuery = Pemasukan::select(
            'id',
            'tanggal',
            DB::raw("'pemasukan' as jenis"),
            'sumber as kategori',
            'nominal as jumlah',
            'keterangan',
            'created_at'
        );

        $pengeluaranQuery = Pengeluaran::select(
            'id',
            'tanggal',
            DB::raw("'pengeluaran' as jenis"),
            'sumber as kategori',
            'nominal as jumlah',
            'keterangan',
            'created_at'
        );

        if ($bulan && $bulan !== 'all') {
            $year = substr($bulan, 0, 4);
            $month = substr($bulan, 5, 2);

            $pemasukanQuery->whereYear('tanggal', $year)
                          ->whereMonth('tanggal', $month);

            $pengeluaranQuery->whereYear('tanggal', $year)
                            ->whereMonth('tanggal', $month);
        }

        if ($jenis && $jenis !== 'all') {
            if ($jenis === 'pemasukan') {
                $query = $pemasukanQuery;
            } else {
                $query = $pengeluaranQuery;
            }
        } else {
            $query = $pemasukanQuery->union($pengeluaranQuery);
        }

        // Filter pencarian
        if ($search) {
            if ($jenis && $jenis !== 'all') {
                $query->where(function($q) use ($search) {
                    $q->where('sumber', 'like', "%{$search}%")
                      ->orWhere('keterangan', 'like', "%{$search}%");
                });
            } else {
                // Untuk union query, kita perlu menangani differently
                $pemasukanQuery->where(function($q) use ($search) {
                    $q->where('sumber', 'like', "%{$search}%")
                      ->orWhere('keterangan', 'like', "%{$search}%");
                });

                $pengeluaranQuery->where(function($q) use ($search) {
                    $q->where('sumber', 'like', "%{$search}%")
                      ->orWhere('keterangan', 'like', "%{$search}%");
                });

                $query = $pemasukanQuery->union($pengeluaranQuery);
            }
        }

        $transaksi = $query->orderBy('tanggal', 'desc')->paginate(10);

        // Hitung total
        $totalPemasukanQuery = Pemasukan::query();
        $totalPengeluaranQuery = Pengeluaran::query();

        if ($bulan && $bulan !== 'all') {
            $year = substr($bulan, 0, 4);
            $month = substr($bulan, 5, 2);

            $totalPemasukanQuery->whereYear('tanggal', $year)
                               ->whereMonth('tanggal', $month);

            $totalPengeluaranQuery->whereYear('tanggal', $year)
                                 ->whereMonth('tanggal', $month);
        }

        $totalPemasukan = $totalPemasukanQuery->sum('nominal');
        $totalPengeluaran = $totalPengeluaranQuery->sum('nominal');
        $saldoAkhir = $totalPemasukan - $totalPengeluaran;

        $monthOptions = $this->generateMonthOptions();

        return Inertia::render('Admin/Kas/LaporanKas', [
            'transaksi' => $transaksi,
            'total_pemasukan' => $totalPemasukan,
            'total_pengeluaran' => $totalPengeluaran,
            'saldo_akhir' => $saldoAkhir,
            'filters' => [
                'bulan' => $bulan ?? 'all',
                'jenis' => $jenis ?? 'all',
                'search' => $search ?? '',
            ],
            'monthOptions' => $monthOptions
        ]);
    }

    private function generateMonthOptions()
    {
        $options = [];
        $today = new \DateTime();

        for ($i = 0; $i < 12; $i++) {
            $date = new \DateTime($today->format('Y-m-01'));
            $date->modify("-$i months");

            $value = $date->format('Y-m');
            $label = $date->format('F Y');

            $options[] = ['value' => $value, 'label' => $label];
        }

        return $options;
    }
}
