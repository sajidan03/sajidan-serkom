<?php

namespace App\Http\Controllers;

use App\Models\Guru;
use App\Models\Profil_sekolah;
use Illuminate\Http\Request;

class GuruController extends Controller
{
    //
    public function index()
    {
        $data['profil'] = Profil_sekolah::first();
        $data['guru'] = Guru::all();
        return Inertia('Admin/Guru/index', $data);
    }
    public function tambahView()
    {
        $data['profil'] = Profil_sekolah::first();
        return Inertia('Admin/Guru/tambah', $data);
    }
    public function simpan(Request $request)
{
    $request->validate([
        'nama_guru' => 'required',
        'nip' => 'required|unique:gurus,nip',
        'mapel' => 'required',
        'foto' => 'required|image|max:2048',
    ]);

    $fileName = null;

    if ($request->hasFile('foto')) {
        $file = $request->file('foto');

        $fileName = time() . '_' . $file->getClientOriginalName();

        $file->storeAs('assets', $fileName);
    }

    Guru::create([
        'nama_guru' => $request->nama_guru,
        'nip' => $request->nip,
        'mapel' => $request->mapel,
        'foto' => $fileName ,
    ]);

    return redirect()->route('guruView')->with('message', 'Data guru berhasil ditambahkan');
}
}
