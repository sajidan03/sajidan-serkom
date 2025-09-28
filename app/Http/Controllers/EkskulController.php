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
        $data['guru'] = Guru::all();
        return Inertia::render('Admin/Ekstrakulikuler/index',$data);
    }
    public function ekskulTambahView()
    {
        $data['guru'] = Guru::all();
        $data['profil'] = Profil_sekolah::all()->first();
        return Inertia::render('Admin/Ekstrakulikuler/tambah',$data);
    }
    public function ekskulTambah(Request $request){
        $data['esktrakulikuler'] = $request->validate([
            'nama_eskul' => 'required|string',
            'pembina' => 'required|string',
            'deskripsi' => 'required|string',
            'jadwal' => 'required|string',
            'guru_id' => 'nullable|exists:guru,id',
        ]);

        $filename = null;
        if ($request->hasFile('gambar')) {
            $file = $request->file('gambar');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->storeAs('assets', $filename);
            $data['gambar'] = $filename;
        }
        Ekstrakulikuler::create(
            [
                'nama' => $request->nama_eskul,
                'pembina' => $request->pembina,
                'deskripsi' => $request->deskripsi,
                'jadwal' => $request->jadwal,
                'gambar' => $filename,
                'guru_id' => $request->guru_id,
            ]
        );
        return Inertia::render('Admin/Ekstrakulikuler/index')->with('message', 'Ekstrakulikuler berhasil ditambahkan');
    }
}
