<?php

namespace App\Http\Controllers;

use App\Models\Berita;
use App\Models\Ekstrakulikuler;
use App\Models\Galeri;
use App\Models\Guru;
use App\Models\Profil_sekolah;
use App\Models\Siswa;
use App\Models\User;
use Illuminate\Support\Facades\Crypt;
use Inertia\Inertia;

class WelcomeController extends Controller
{
    public function index()
    {
        $data['profil'] = Profil_sekolah::first();
        $data['berita'] = Berita::with('user')
            ->orderBy('tanggal', 'desc')
            ->limit(6)
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'judul' => $item->judul,
                    'isi' => $item->isi,
                    'gambar' => $item->gambar,
                    'tanggal' => $item->tanggal,
                    'user_name' => $item->user->name ?? 'admin',
                ];
            });

        $data['ekstrakulikuler'] = Ekstrakulikuler::orderBy('nama_eskul', 'asc')
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'nama_eskul' => $item->nama_eskul,
                    'pembina' => $item->guru->nama_guru ?? 'Tidak ada pembina',
                    'deskripsi' => $item->deskripsi,
                    'gambar' => $item->gambar,
                ];
            });

        $data['galeri'] = Galeri::orderBy('id', 'desc')
            ->limit(8)
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'created_at' => $item->created_at->format('d M Y'),
                    'updated_at' => $item->updated_at->format('d M Y'),
                    'judul' => $item->judul,
                    'keterangan' => $item->keterangan,
                    'file' => $item->file,
                    'kategori' => $item->kategori,
                    'tanggal' => $item->tanggal,
                ];
            });
        $data['gmap'] = Profil_sekolah::value('link_map');
        $data['user'] = User::all();
        $data['guru'] = Guru::all();

        $data['jumlah_guru'] = [
            'jumlah_guru' => Guru::count()
        ];
        $data['jumlah_siswa'] = [
            'jumlah_siswa' => Siswa::count()
        ];

        return Inertia::render('welcome', $data);
    }

}
