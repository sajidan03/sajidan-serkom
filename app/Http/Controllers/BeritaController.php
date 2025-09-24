<?php

namespace App\Http\Controllers;

use App\Models\Berita;
use App\Models\Profil_sekolah;
use Illuminate\Http\Request;
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
}
