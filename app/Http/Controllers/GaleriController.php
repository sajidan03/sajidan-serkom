<?php

namespace App\Http\Controllers;

use App\Models\Galeri;
use App\Models\Profil_sekolah;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
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
    public function galeriEditView($id){
        $id = Crypt::decrypt($id);
        $data['galeri'] = Galeri::findOrFail($id);
        $data['profil'] = Profil_sekolah::all()->first();
        return Inertia::render('Admin/Galeri/edit', $data);
    }
}
