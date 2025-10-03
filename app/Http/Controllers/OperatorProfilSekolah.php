<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Profil_sekolah;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Storage;

class OperatorProfilSekolah extends Controller
{
    //
    public function index(){
        $data['profil'] = Profil_sekolah::all()->first();
        $data['profil_sekolah'] = Profil_sekolah::all()->map(function($profil){
            return[
                'id' => $profil->id,
                'created_at' => $profil->created_at->format('d M Y'),
                'updated_at' => $profil->updated_at->format('d M Y'),
                'nama_sekolah' => $profil->nama_sekolah,
                'kepala_sekolah' => $profil->kepala_sekolah,
                'foto_kepsek' => $profil->foto_kepsek,
                'foto' => $profil->foto,
                'logo' => $profil->logo,
                'npsn' => $profil->npsn,
                'alamat' => $profil->alamat,
                'kontak' => $profil->kontak,
                'instagram' => $profil->instagram,
                'facebook' => $profil->facebook,
                'youtube' => $profil->youtube,
                'visi_misi' => $profil->visi,
                'tahun_berdiri' => $profil->tahun_berdiri,
                'deskripsi' => $profil->deskripsi,
                'warna' => $profil->warna,
                'encrypted_id' => Crypt::encrypt($profil->id),
            ];
        })->toArray();
        return Inertia::render('Operator/Profil sekolah/index', $data);
    }
    public function tambahView(){
        $data['profil'] = Profil_sekolah::all()->first();
        return Inertia::render('Operator/Profil sekolah/tambah', $data);
    }
   public function profilTambah(Request $request)
{
    $request->validate([
        'nama_sekolah' => 'required|string|max:255',
        'kepala_sekolah' => 'required|string|max:255',
        'foto_kepsek' => 'nullable|image',
        'foto' => 'nullable|image',
        'logo' => 'nullable|image',
        'npsn' => 'nullable|string|max:20',
        'alamat' => 'nullable|string',
        'kontak' => 'nullable|string|max:15',
        'visi_misi' => 'nullable|string',
        'tahun_berdiri' => 'nullable|integer|min:1900|max:2099',
        'deskripsi' => 'nullable|string',
        'instagram' => 'nullable|string',
        'facebook' => 'nullable|string',
        'youtube' => 'nullable|string',
        'warna' => 'nullable|string',
    ]);
    $fileNameFotoKepsek = null;
    if ($request->hasFile('foto_kepsek')) {
        $file = $request->file('foto_kepsek');
        $fileNameFotoKepsek = time() . '_' . $file->getClientOriginalName();
        $file->storeAs('assets', $fileNameFotoKepsek);
    }

    $fileNameFoto = null;
    if ($request->hasFile('foto')) {
        $file = $request->file('foto');
        $fileNameFoto = time() . '_' . $file->getClientOriginalName();
        $file->storeAs('assets', $fileNameFoto);
    }
    $fileNameLogo = null;
    if ($request->hasFile('logo')) {
        $file = $request->file('logo');
        $fileNameLogo = time() . '_' . $file->getClientOriginalName();
        $file->storeAs('assets', $fileNameLogo);
    }

    Profil_sekolah::create([
        'nama_sekolah' => $request->nama_sekolah,
        'kepala_sekolah' => $request->kepala_sekolah,
        'foto_kepsek' => $fileNameFotoKepsek,
        'foto' => $fileNameFoto,
        'logo' => $fileNameLogo,
        'npsn' => $request->npsn,
        'alamat' => $request->alamat,
        'kontak' => $request->kontak,
        'visi_misi' => $request->visi_misi,
        'tahun_berdiri' => $request->tahun_berdiri,
        'deskripsi' => $request->deskripsi,
        'instagram' => $request->instagram,
        'facebook' => $request->facebook,
        'youtube' => $request->youtube,
    ]);

    return redirect()->route('operatorProfilView')->with('message', 'Profil sekolah berhasil ditambahkan');
}
    public function profilEditView($id){
        $id = Crypt::decrypt($id);
        $data['profil'] = Profil_sekolah::all()->first();
        $data['profil_sekolah'] = Profil_sekolah::find($id);
        return Inertia::render('Operator/Profil sekolah/edit', $data);
    }
    public function hapusProfil($id){
        $profil = Profil_sekolah::findOrFail($id);
        $profil->delete();

        return redirect()->route('operatorProfilView')->with('message', 'Data profil sekolah berhasil dihapus.');
    }

    public function profilEdit(Request $request, $id)
{
    $request->validate([
        'nama_sekolah' => 'required|string|max:255',
        'kepala_sekolah' => 'required|string|max:255',
        'foto_kepsek' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,wepb',
        'logo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,wepb',
        'foto' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,wepb',
        'npsn' => 'nullable|string|max:20',
        'alamat' => 'nullable|string',
        'kontak' => 'nullable|string|max:15',
        'visi_misi' => 'nullable|string',
        'tahun_berdiri' => 'nullable|integer|min:1900|max:' . date('Y'),
        'deskripsi' => 'nullable|string',
        'instagram' => 'nullable|string',
        'facebook' => 'nullable|string',
        'youtube' => 'nullable|string',
    ]);

    $profil = Profil_sekolah::findOrFail($id);

    $data = [
        'nama_sekolah' => $request->nama_sekolah,
        'kepala_sekolah' => $request->kepala_sekolah,
        'npsn' => $request->npsn,
        'alamat' => $request->alamat,
        'kontak' => $request->kontak,
        'visi_misi' => $request->visi_misi,
        'tahun_berdiri' => $request->tahun_berdiri,
        'deskripsi' => $request->deskripsi,
        'instagram' => $request->instagram,
        'facebook' => $request->facebook,
        'youtube' => $request->youtube,
    ];

    if ($request->hasFile('logo')) {
        if ($profil->logo && Storage::exists('assets/' . $profil->logo)) {
            Storage::delete('assets/' . $profil->logo);
        }

        $file = $request->file('logo');
        $fileNameLogo = time() . '_logo.' . $file->getClientOriginalExtension();
        $file->storeAs('assets', $fileNameLogo);
        $data['logo'] = $fileNameLogo;
    }

    if ($request->hasFile('foto')) {
        if ($profil->foto && Storage::exists('assets/' . $profil->foto)) {
            Storage::delete('assets/' . $profil->foto);
        }

        $file = $request->file('foto');
        $fileNameFoto = time() . '_foto.' . $file->getClientOriginalExtension();
        $file->storeAs('assets', $fileNameFoto);
        $data['foto'] = $fileNameFoto;
    }
    if ($request->hasFile('foto_kepsek')) {
        if ($profil->foto_kepsek && Storage::exists('assets/' . $profil->foto_kepsek)) {
            Storage::delete('assets/' . $profil->foto_kepsek);
        }

        $file = $request->file('foto_kepsek');
        $fileNameFotoKepsek = time() . '_foto_kepsek.' . $file->getClientOriginalExtension();
        $file->storeAs('assets', $fileNameFotoKepsek);
        $data['foto_kepsek'] = $fileNameFotoKepsek;
    }

    $profil->update($data);

    return redirect()->route('operatorProfilView')->with('success', 'Profil sekolah berhasil diupdate');
}
}
