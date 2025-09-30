<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Profil_sekolah;
use Illuminate\Support\Facades\Crypt;

class ProfilSekolahController extends Controller
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
                'foto' => $profil->foto,
                'logo' => $profil->logo,
                'npsn' => $profil->npsn,
                'alamat' => $profil->alamat,
                'kontak' => $profil->kontak,
                'visi_misi' => $profil->visi,
                'tahun_berdiri' => $profil->tahun_berdiri,
                'deskripsi' => $profil->deskripsi,
                'encrypted_id' => Crypt::encrypt($profil->id),
            ];
        })->toArray();
        return Inertia::render('Admin/Profil sekolah/index', $data);
    }
    public function tambahView(){
        $data['profil'] = Profil_sekolah::all()->first();
        return Inertia::render('Admin/Profil sekolah/tambah', $data);
    }
    public function simpan(Request $request){
        $request->validate([
            'nama_sekolah' => 'required',
            'kepala_sekolah' => 'required',
              'foto' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'npsn' => 'required|unique:profil_sekolahs,npsn',
            'alamat' => 'required',
            'kontak' => 'required',
            'visi_misi' => 'required',
            'tahun_berdiri' => 'nullable|digits:4|integer|min:1900|max:' . (date('Y')),
            'deskripsi' => 'required',
        ]);
    }
    public function profilEditView($id){
        $id = Crypt::decrypt($id);
        $data['profil'] = Profil_sekolah::findOrFail($id);
        return Inertia::render('Admin/Profil sekolah/edit', $data);
    }
    public function hapusProfil($id){
        $profil = Profil_sekolah::findOrFail($id);
        $profil->delete();

        return redirect()->route('profilView')->with('message', 'Data profil sekolah berhasil dihapus.');
    }

}
