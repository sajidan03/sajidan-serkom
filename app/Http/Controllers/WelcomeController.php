<?php

namespace App\Http\Controllers;

use App\Models\Berita;
use App\Models\Ekstrakulikuler;
use App\Models\Galeri;
use App\Models\Profil_sekolah;
use Inertia\Inertia;

class WelcomeController extends Controller
{
    public function index()
    {
        // Ambil data profil sekolah
        $profil = Profil_sekolah::first();

        // Ambil data berita terbaru (limit 6)
        $berita = Berita::with('user')
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
                    'user_name' => $item->user->name ?? 'Admin',
                ];
            });

        // Ambil data ekstrakulikuler
        $ekstrakulikuler = Ekstrakulikuler::orderBy('nama_eskul', 'asc')
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'nama_eskul' => $item->nama,
                    'deskripsi' => $item->deskripsi,
                    'gambar' => $item->gambar,
                    'pembina' => $item->pembina,
                ];
            });

        // Ambil data galeri (limit 8)
        $galeri = Galeri::orderBy('tanggal', 'desc')
            ->limit(8)
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'judul' => $item->judul,
                    'keterangan' => $item->keterangan,
                    'file' => $item->file,
                    'kategori' => $item->kategori,
                    'tanggal' => $item->tanggal,
                ];
            });

        return Inertia::render('welcome', [
            'profil' => $profil,
            'berita' => $berita,
            'ekstrakulikuler' => $ekstrakulikuler,
            'galeri' => $galeri,
        ]);
    }
}
