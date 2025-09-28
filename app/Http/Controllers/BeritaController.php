<?php

namespace App\Http\Controllers;

use App\Models\Berita;
use App\Models\Profil_sekolah;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Crypt;
use Inertia\Inertia;

class BeritaController extends Controller
{
    //

public function index(){
    $berita = Berita::with('user')->get();

    $data['berita'] = $berita->map(function ($berita) {
        return [
            'id' => $berita->id,
            'judul' => $berita->judul,
            'isi' => $berita->isi,
            'gambar' => $berita->gambar,
            'tanggal' => $berita->tanggal,
            'created_at' => $berita->created_at,
            'updated_at' => $berita->updated_at,
            'user' => $berita->user ? [
                'id' => $berita->user->id,
                'name' => $berita->user->name,
            ] : null,
            'encrypted_id' => Crypt::encrypt($berita->id),
        ];
    })->toArray();

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
            'judul' => $request->judul,
            'isi' => $request->isi,
            'gambar' => $fileName,
            'tanggal' => $request->tanggal,
            'id_user' => Auth::user()->id,
        ]);

        return redirect()->route('beritaView')->with('success', 'Berita berhasil ditambahkan.');
    }
    public function beritaEditView($id){
        try {
            $id = Crypt::decrypt($id);
        } catch (\Exception $e) {
            return redirect()->route('beritaView')->with('error', 'ID berita tidak valid.');
        }
        $data['berita'] = Berita::findOrFail($id);
        $data['profil'] = Profil_sekolah::all()->first();
        return Inertia::render('Admin/Berita/edit',$data);
    }
}
