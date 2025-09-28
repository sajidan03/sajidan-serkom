<?php

namespace App\Http\Controllers;

use App\Models\Ekstrakulikuler;
use App\Models\Guru;
use App\Models\Profil_sekolah;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EkskulController extends Controller
{
    //
    public function index()
    {
        $data['profil'] = Profil_sekolah::all()->first();
        $eskul = Ekstrakulikuler::all();
        $data['eskul'] = $eskul->map(function ($ekskul) {
            $guru = Guru::find($ekskul->guru_id);
            return [
                'id' => $ekskul->id,
                'nama' => $ekskul->nama,
                'deskripsi' => $ekskul->deskripsi,
                'jadwal' => $ekskul->jadwal,
                'guru' => $guru ? $guru->nama : 'Tidak ada guru',
            ];
        })->toArray();
        return Inertia::render('Admin/Ekstrakulikuler/index',$data);
    }
    public function ekskulTambahView()
    {
        $data['guru'] = Guru::all();
        $data['profil'] = Profil_sekolah::all()->first();
        return Inertia::render('Admin/Ekstrakulikuler/tambah',$data);
    }
}
