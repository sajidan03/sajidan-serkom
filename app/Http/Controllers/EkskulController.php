<?php

namespace App\Http\Controllers;

use App\Models\Ekstrakulikuler;
use App\Models\Guru;
use App\Models\Profil_sekolah;
use Illuminate\Contracts\Encryption\DecryptException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class EkskulController extends Controller
{
    //
   public function index()
{
    $data['profil'] = Profil_sekolah::all()->first();

    $eskul = Ekstrakulikuler::with('guru')->get(); // Eager load relasi guru

    $data['eskul'] = $eskul->map(function ($ekskul) {
        return [
            'id' => $ekskul->id,
            'created_at' => $ekskul->created_at->format('d M Y'),
            'updated_at' => $ekskul->updated_at->format('d M Y'),
            'nama_eskul' => $ekskul->nama_eskul,
            'pembina' => $ekskul->guru ? $ekskul->guru->nama_guru : 'Tidak ada pembina',
            'guru_id' => $ekskul->pembina,
            'jadwal_latihan' => $ekskul->jadwal_latihan,
            'deskripsi' => $ekskul->deskripsi,
            'gambar' => $ekskul->gambar,
            'encrypted_id' => Crypt::encrypt($ekskul->id),
        ];
    })->toArray();

    $data['guru'] = Guru::all();

    return Inertia::render('Admin/Ekstrakulikuler/index', $data);
}    public function ekskulTambahView()
    {
        $data['guru'] = Guru::all();
        $data['profil'] = Profil_sekolah::all()->first();
        return Inertia::render('Admin/Ekstrakulikuler/tambah',$data);
    }
  public function ekskulTambah(Request $request){
        $data = $request->validate([
            'nama_eskul' => 'required|string',
            'pembina' => 'required',
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

    $guru = Guru::find($request->pembina);

    if (!$guru) {
        return back()->withErrors(['pembina' => 'Guru tidak ditemukan']);
    }

    Ekstrakulikuler::create([
        'nama_eskul' => $request->nama_eskul,
        'jadwal_latihan' => $request->jadwal_latihan,
        'deskripsi' => $request->deskripsi,
        'gambar' => $filename,
        'id_guru' => $request->pembina,
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
 public function ekskulEditView($id)
{
    try {
        $id = Crypt::decrypt($id);
    } catch (DecryptException $e) {
        return redirect()->route('ekskulView')->with('error', 'Invalid ID');
    }

    $ekstrakulikuler = Ekstrakulikuler::find($id);

    if (!$ekstrakulikuler) {
        abort(404, 'Ekstrakurikuler tidak ditemukan');
    }

    $encrypt = Crypt::encrypt($ekstrakulikuler->id);

    $data['ekstrakulikuler'] = [
        'id' => $ekstrakulikuler->id,
        'nama_eskul' => $ekstrakulikuler->nama_eskul,
        'jadwal_latihan' => $ekstrakulikuler->jadwal_latihan,
        'deskripsi' => $ekstrakulikuler->deskripsi,
        'gambar' => $ekstrakulikuler->gambar,
        'id_guru' => $ekstrakulikuler->id_guru,
        // 'encrypted_id' => Crypt::encrypt($ekstrakulikuler->id),
    ];

    $data['ekstrakulikuler']['encrypted_id'] = $encrypt;

    $data['guru'] = Guru::all();
    $data['profil'] = Profil_sekolah::all()->first();

    return Inertia::render('Admin/Ekstrakulikuler/edit', $data);
}


    public function ekskulEdit(Request $request, $id)
{
    $ekskul = Ekstrakulikuler::find($id);

    // try {
    //     $id = Crypt::decrypt($id);
    // } catch (DecryptException $e) {
    //     return redirect()->route('ekskulView')->with('error', 'Invalid ID');
    // }


    $request->validate([
        'nama_eskul' => 'required|string|max:255',
        'id_guru' => 'required|numeric|exists:gurus,id',
        'jadwal_latihan' => 'required|string|max:255',
        'deskripsi' => 'required|string',
        'gambar' => 'nullable|image|mimes:jpg,jpeg,png,gif|max:5120',
    ]);


    $filename = $ekskul->gambar;

    if ($request->hasFile('gambar')) {
        $file = $request->file('gambar');
        $filename = time() . '_' . $file->getClientOriginalName();
        $file->storeAs('assets', $filename);

        if ($ekskul->gambar && Storage::exists('assets/' . $ekskul->gambar)) {
            Storage::delete('assets/' . $ekskul->gambar);
        }
    }

    $ekskul->update([
        'nama_eskul' => $request->nama_eskul,
        'jadwal_latihan' => $request->jadwal_latihan,
        'deskripsi' => $request->deskripsi,
        'gambar' => $filename,
        'id_guru' => $request->id_guru,
    ]);

    return redirect()->route('ekskulView')->with('message', 'Ekstrakulikuler berhasil diperbarui');
}
}
