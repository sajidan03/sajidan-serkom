<?php

namespace App\Http\Controllers;

use App\Exports\GuruExport;
use App\Models\Guru;
use App\Models\Profil_sekolah;
use Illuminate\Contracts\Encryption\DecryptException;
use Illuminate\Contracts\Encryption\Encrypter as EncryptionEncrypter;
use Illuminate\Encryption\Encrypter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

class GuruController extends Controller
{
    //
    public function index()
    {
        $data['profil'] = Profil_sekolah::first();
        $data['guru'] = Guru::all()->map(function ($guru) {
            return [
                'id' => $guru->id,
                'nama_guru' => $guru->nama_guru,
                'nip' => $guru->nip,
                'mapel' => $guru->mapel,
                'foto' => $guru->foto,
                'created_at' => $guru->created_at,
                'encrypted_id' => Crypt::encrypt($guru->id),
            ];
        });
        return Inertia::render('Admin/Guru/index', $data);
    }
    public function tambahView()
    {
        $data['profil'] = Profil_sekolah::first();
        return Inertia::render('Admin/Guru/tambah', $data);
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
    public function guruEditView($id)
    {
        try {
            $id = Crypt::decrypt($id);
        } catch (DecryptException $d) {
        }
        $data['profil'] = Profil_sekolah::first();
        $data['guru'] = Guru::findOrFail($id);
        return Inertia::render('Admin/Guru/edit', $data);
    }
    public function guruEdit(Request $request, $id){
        $guru = Guru::findOrFail($id);

        $request->validate([
            'nama_guru' => 'required',
            'nip' => 'required|unique:gurus,nip,'.$id,
            'mapel' => 'required',
            'foto' => 'nullable|image|max:2048',
        ]);
        $fileName = $guru->foto;
        if ($request->hasFile('foto')) {
            $file = $request->file('foto');
            $fileName = time() . '_' . $file->getClientOriginalName();
            $file->storeAs('assets', $fileName);
        }
        $guru->update([
            'nama_guru' => $request->nama_guru,
            'nip' => $request->nip,
            'mapel' => $request->mapel,
            'foto' => $fileName,
        ]);
        return redirect()->route('guruView')->with('message', 'Data guru berhasil diupdate');
    }

    public function guruHapus($id)
    {
        $guru = Guru::findOrFail($id);
        $guru->delete();

        return redirect()->route('guruView')->with('message', 'Data guru berhasil dihapus.');
    }
    public function export()
    {
        return Excel::download(new GuruExport, 'data_guru.xlsx');
    }
}
