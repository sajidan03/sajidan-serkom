<?php

namespace App\Http\Controllers;

use App\Models\Ekstrakulikuler;
use App\Models\Guru;
use App\Models\Profil_sekolah;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
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
                'created_at' => $ekskul->created_at->format('d M Y'),
                'updated_at' => $ekskul->updated_at->format('d M Y'),
                'nama_eskul' => $ekskul->nama_eskul,
                'pembina' => $ekskul->guru->nama_guru,
                'jadwal_latihan' => $ekskul->jadwal_latihan,
                'deskripsi' => $ekskul->deskripsi,
                'gambar' => $ekskul->gambar,
                'encrypted_id' => encrypt($ekskul->id),
            ];
        })->toArray();
        $data['guru'] = Guru::all();
        // dd($data['eskul']);
        return Inertia::render('Admin/Ekstrakulikuler/index',$data);
    }
    public function ekskulTambahView()
    {
        $data['guru'] = Guru::all();
        $data['profil'] = Profil_sekolah::all()->first();
        return Inertia::render('Admin/Ekstrakulikuler/tambah',$data);
    }
  public function ekskulTambah(Request $request){
    $data = $request->validate([
        'nama_eskul' => 'required|string',
        'pembina' => 'required|string',
        'jadwal_latihan' => 'required|string',
        'deskripsi' => 'required|string',

    ]);

    $filename = null;
    if ($request->hasFile('gambar')) {
        $file = $request->file('gambar');
        $filename = time() . '_' . $file->getClientOriginalName();
        $file->storeAs('assets', $filename);
        $data['gambar'] = $filename;
    }

    Ekstrakulikuler::create([
        'nama_eskul' => $request->nama_eskul,
        'pembina' => $request->pembina,
        'jadwal_latihan' => $request->jadwal_latihan,
        'deskripsi' => $request->deskripsi,
        'gambar' => $filename,
    ]);

    return redirect()->route('ekskulView')->with('message', 'Ekstrakulikuler berhasil ditambahkan');
}
public function ekskulHapus($id)
{
    $ekskul = Ekstrakulikuler::findOrFail($id);
    if ($ekskul->gambar) {
        Storage::delete('assets/' . $ekskul->gambar);
    }

    $ekskul->delete();

    return redirect()->route('ekskulView')->with('message', 'Ekstrakulikuler berhasil dihapus');

}
}
