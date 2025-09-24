<?php

namespace App\Http\Controllers;

use App\Models\Berita;
use App\Models\Profil_sekolah;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class BeritaController extends Controller
{
    //
    public function index(){
        $data['berita'] = Berita::with('user')->get();
        $data['profil'] = Profil_sekolah::all()->first();
        return Inertia::render('Admin/Berita/index', $data);
    }
    public function beritaTambahView(){
        $data['berita'] = Berita::all();
        $data['profil'] = Profil_sekolah::all()->first();
        return Inertia::render('Admin/Berita/tambah',$data);
    }
    public function beritaTambah(Request $request){
        $request->validate([
            'isi' => 'required',
            'gambar' => 'required|file|mimes:jpg,jpeg,png,gif|max:5120',
            'tanggal' => 'required|date',
        ]);

        $fileName = null;

        if ($request->hasFile('gambar')) {
            $file = $request->file('gambar');

            $fileName = time() . '_' . $file->getClientOriginalName();

            $file->storeAs('assets', $fileName);
        }

        Berita::create([
            'created_at' => now(),
            'updated_at' => now(),
            'isi' => $request->isi,
            'gambar' => $fileName,
            'tanggal' => $request->tanggal,
            'id_user' => Auth::user()->id,
        ]);

        return redirect()->route('beritaView')->with('success', 'Berita berhasil ditambahkan.');
    }

}
