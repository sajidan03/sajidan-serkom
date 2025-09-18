<?php

namespace App\Http\Controllers;

use App\Models\Profil_sekolah;
use App\Models\Siswa;
use Illuminate\Http\Request;

class SiswaController extends Controller
{
    //
    public function index()
    {
        $data['profil'] = Profil_sekolah::first();
    $data['siswa'] = Siswa::all();
        return inertia('Admin/Siswa/index', $data);
    }
    public function tambahView()
    {
        $data['siswa'] = Siswa::all();
        $data['profil'] = Profil_sekolah::first();
        return inertia('Admin/Siswa/tambah', $data);
    }
    public function simpan(Request $request)
    {
        $request->validate([
            'nisn' => 'required|unique:siswas,nisn',
            'nama_siswa' => 'required',
            'jenis_kelamin' => 'required',
            'jurusan' => 'nullable|string|max:100',
            'tahun_masuk' => 'nullable|digits:4|integer|min:1900|max:' . (date('Y')),
        ]);

        Siswa::create([
            'nisn' => $request->nisn,
            'nama_siswa' => $request->nama_siswa,
            'jenis_kelamin' => $request->jenis_kelamin,
            'jurusan' => $request->jurusan,
            'tahun_masuk' => $request->tahun_masuk,
        ]);

        return redirect()->route('siswaView')->with('message', 'Data siswa berhasil ditambahkan.');
    }
    public function hapusSiswa($id)
    {
        $siswa = Siswa::findOrFail($id);
        $siswa->delete();

        return redirect()->route('siswaView')->with('message', 'Data siswa berhasil dihapus.');
    }
}
