<?php

namespace App\Http\Controllers;

use App\Models\Galeri;
use App\Models\Profil_sekolah;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class GaleriController extends Controller
{
    //
    public function index(){
        $data['galeri'] = Galeri::all()->map(function ($galeri) {
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
        $data['profil'] = Profil_sekolah::all()->first();
        return Inertia::render('Admin/Galeri/index', $data);
    }

    public function tambahView(){
        $data['galeri'] = Galeri::all();
        $data['profil'] = Profil_sekolah::all()->first();
        return Inertia::render('Admin/Galeri/tambah',$data);
    }

    public function simpan(Request $request)
{
    $request->validate([
        'judul' => 'required',
        'keterangan' => 'required',
        'file' => 'required|file|mimes:jpg,jpeg,png,gif,pdf,doc,docx|max:5120',
        'kategori' => 'nullable|string',
        'tanggal' => 'required|date',
    ]);

    $fileName = null;

    if ($request->hasFile('file')) {
        $file = $request->file('file');

        $fileName = time() . '_' . $file->getClientOriginalName();

        $file->storeAs('assets', $fileName);
    }

    Galeri::create([
        'judul' => $request->judul,
        'keterangan' => $request->keterangan,
        'file' => $fileName,
        'kategori' => $request->kategori,
        'tanggal' => $request->tanggal,
    ]);

    return redirect()->route('galeriView')->with('message', 'Data galeri berhasil ditambahkan');
}

public function update(Request $request, $id)
{
    $request->validate([
        'judul' => 'required',
        'keterangan' => 'required',
        'file' => 'nullable|file|mimes:jpg,jpeg,png,gif,pdf,doc,docx|max:5120',
        'kategori' => 'nullable|string',
        'tanggal' => 'required|date',
    ]);

    $galeri = Galeri::findOrFail($id);
    $fileName = $galeri->file;

    if ($request->hasFile('file')) {
        $file = $request->file('file');

        $fileName = time() . '_' . $file->getClientOriginalName();

        $file->storeAs('assets', $fileName);

        if ($galeri->file && Storage::exists('assets/' . $galeri->file)) {
            Storage::delete('assets/' . $galeri->file);
        }
    }

    $galeri->update([
        'judul' => $request->judul,
        'keterangan' => $request->keterangan,
        'file' => $fileName,
        'kategori' => $request->kategori,
        'tanggal' => $request->tanggal,
    ]);

    return redirect()->route('galeriView')->with('message', 'Data galeri berhasil diperbarui');
}
    public function galeriEditView($id){
        $id = Crypt::decrypt($id);
        $data['galeri'] = Galeri::findOrFail($id);
        $data['profil'] = Profil_sekolah::all()->first();
        return Inertia::render('Admin/Galeri/edit', $data);
    }
    public function galeriHapus($id){
        $galeri = Galeri::findOrFail($id);
        $galeri->delete();
        return redirect()->route('galeriView');
    }
}
