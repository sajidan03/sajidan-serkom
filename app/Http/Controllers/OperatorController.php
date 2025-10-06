<?php

namespace App\Http\Controllers;

use App\Models\Berita;
use App\Models\Ekstrakulikuler;
use App\Models\Galeri;
use App\Models\Guru;
use App\Models\Profil_sekolah;
use App\Models\Siswa;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OperatorController extends Controller
{
    //
    public function index()
    {
        $total_guru = Guru::count();
        $total_siswa = Siswa::count();
        $total_berita = Berita::count();
        $total_galeri = Galeri::count();
        $total_ekskul = Ekstrakulikuler::count();
        $total_users = User::count();

        $statistik_siswa = Siswa::selectRaw('tahun_masuk, COUNT(*) as jumlah')
            ->groupBy('tahun_masuk')
            ->get()
            ->map(function ($row) {
                $kelas = match ((int)date('Y') - (int)$row->tahun_masuk) {
                    0 => 'X',
                    1 => 'XI',
                    2 => 'XII',
                    default => 'Alumni',
                };
                return [
                    'kelas' => $kelas,
                    'jumlah' => $row->jumlah,
                ];
            });

        $statistik_guru = Guru::selectRaw('mapel, COUNT(*) as jumlah')
            ->groupBy('mapel')
            ->get()
            ->map(function ($row) {
                return [
                    'bidang' => $row->mapel,
                    'jumlah' => $row->jumlah,
                ];
            });

        $recent_activities = Berita::with('user')
            ->latest()
            ->take(5)
            ->get()
            ->map(function ($berita) {
                return [
                    'id' => $berita->id,
                    'user_name' => $berita->user->name ?? 'Unknown',
                    'activity' => "Menambahkan berita baru '{$berita->judul}'",
                    'created_at' => $berita->created_at,
                ];
            });
        $guru['guru'] = Guru::all();
        $profil['profil'] = Profil_sekolah::all()->first();
        return Inertia::render('Operator/dashboard', [
            'guru' => $guru['guru'],
            'profil' => $profil['profil'],
            'dashboardData' => [
                'total_guru' => $total_guru,
                'total_siswa' => $total_siswa,
                'total_berita' => $total_berita,
                'total_galeri' => $total_galeri,
                'total_ekskul' => $total_ekskul,
                'total_users' => $total_users,
                'statistik_siswa' => $statistik_siswa,
                'statistik_guru' => $statistik_guru,
                'recent_activities' => $recent_activities,
            ]
        ]);
    }
}
