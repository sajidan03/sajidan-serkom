<?php

namespace App\Http\Controllers;

use App\Models\Berita;
use App\Models\Ekstrakulikuler;
use App\Models\Galeri;
use App\Models\Guru;
use App\Models\Profil_sekolah;
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
        return Inertia::render('welcome', $data);
    }
    public function daftarBerita(){
        $data['profil'] = Profil_sekolah::all()->first();
        $data['berita'] = Berita::all()->map(function ($berita) {
            return [
                'id' => $berita->id,
                'judul' => $berita->judul,
                'isi' => $berita->isi,
                'gambar' => $berita->gambar,
                'tanggal' => $berita->tanggal,
                'created_at' => $berita->created_at,
                'updated_at' => $berita->updated_at,
                'encrypted_id' => Crypt::encrypt($berita->id),
                'user' => $berita->user ? [
                'id' => $berita->user->id,
                'name' => $berita->user->name,
            ] : null,
            ];
        });
        return Inertia::render('berita', $data);
    }
    public function detailBerita($id)
    {
        $id = Crypt::decrypt($id);
        $berita = Berita::with('user')->findOrFail($id);
        $berita->update([
            'dilihat' => ($berita->dilihat ?? 0) + 1
        ]);

        $beritaLain = Berita::with('user')
            ->where('id', '!=', $id)
            ->latest()
            ->limit(3)
            ->get();

        $profil = Profil_sekolah::first();

        return Inertia::render('detail-berita', [
            'berita' => $berita,
            'beritaLain' => $beritaLain,
            'profil' => $profil
        ]);
    }

    public function daftarGaleri(){
         $galeri = Galeri::latest()->get()->map(function ($galeri) {
             return [
                'id' => $galeri->id,
                'judul' => $galeri->judul,
                'keterangan' => $galeri->keterangan,
                'file'=> $galeri->file,
                'kategori'=> $galeri->kategori,
                'tanggal' => $galeri->tanggal,
                'encrypted_id' => Crypt::encrypt($galeri->id),
            ];
         });
        $profil = Profil_sekolah::first();

        $kategoriList = Galeri::distinct()
            ->whereNotNull('kategori')
            ->where('kategori', '!=', '')
            ->pluck('kategori')
            ->toArray();

        return Inertia::render('galeri', [
            'galeri' => $galeri,
            'profil' => $profil,
            'kategoriList' => $kategoriList
        ]);
    }
    public function detailGaleri($id) {
        $id = Crypt::decrypt($id);
         $galeri = Galeri::findOrFail($id);
        $galeri->update([
            'dilihat' => ($galeri->dilihat ?? 0) + 1
        ]);

        $galeriLain = Galeri::where('id', '!=', $id)
            ->latest()
            ->limit(3)
            ->get();

        $profil = Profil_sekolah::first();

        return Inertia::render('detail-galeri', [
            'galeri' => $galeri,
            'galeriLain' => $galeriLain,
            'profil' => $profil
        ]);
    }
    public function daftarEskul(){
        $data = [
        'ekstrakurikuler' => Ekstrakulikuler::all()->map(function ($ekskul) {
            return [
                'id' => $ekskul->id,
                'created_at' => $ekskul->created_at->format('d M Y'),
                'updated_at' => $ekskul->updated_at->format('d M Y'),
                'nama_eskul' => $ekskul->nama_eskul,
                'pembina' => $ekskul->guru ? $ekskul->guru->nama_guru : 'Tidak ada pembina',
                'guru_id' => $ekskul->pembina,
                'jadwal_latihan' => $ekskul->jadwal_latihan,
                'deskripsi' => $ekskul->deskripsi,
                'gambar' => $ekskul->gambar,
                'encrypted_id' => Crypt::encrypt($ekskul->id),
            ];
        })->toArray(),
        'profil' => Profil_sekolah::first()
    ];

    return Inertia::render('ekstrakulikuler', $data);
    }

    public function detailEskul($id) {
    try {
        $id = Crypt::decrypt($id);
        $ekstrakurikuler = Ekstrakulikuler::findOrFail($id);
        $ekstrakurikulerLain = Ekstrakulikuler::where('id', '!=', $id)
            ->latest()
            ->limit(3)
            ->get();

        $profil = Profil_sekolah::first();

        return Inertia::render('detail-eskul', [
            'ekstrakurikuler' => [
                'id' => $ekstrakurikuler->id,
                'nama_eskul' => $ekstrakurikuler->nama_eskul,
                'pembina' => $ekstrakurikuler->guru ? $ekstrakurikuler->guru->nama_guru : 'Tidak ada pembina',
                'jadwal_latihan' => $ekstrakurikuler->jadwal_latihan,
                'deskripsi' => $ekstrakurikuler->deskripsi,
                'gambar' => $ekstrakurikuler->gambar,
                'jumlah_anggota' => $ekstrakurikuler->jumlah_anggota ?? null,
                'tempat_latihan' => $ekstrakurikuler->tempat_latihan ?? null,
            ],
            'ekstrakurikulerLain' => $ekstrakurikulerLain->map(function ($ekskul) {
                return [
                    'id' => $ekskul->id,
                    'nama_eskul' => $ekskul->nama_eskul,
                    'pembina' => $ekskul->guru ? $ekskul->guru->nama_guru : 'Tidak ada pembina',
                    'jadwal_latihan' => $ekskul->jadwal_latihan,
                    'deskripsi' => $ekskul->deskripsi,
                    'gambar' => $ekskul->gambar,
                    'encrypted_id' => Crypt::encrypt($ekskul->id),
                ];
            })->toArray(),
            'profil' => $profil
        ]);
    } catch (\Exception $e) {
        abort(404, 'Ekstrakurikuler tidak ditemukan');
    }
}
}
