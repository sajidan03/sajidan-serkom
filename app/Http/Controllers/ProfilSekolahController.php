<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Profil_sekolah;

class ProfilSekolahController extends Controller
{
    //
    public function index(){
        $data['profil'] = Profil_sekolah::all()->first();
        return Inertia::render('Admin/Profil sekolah/index');
    }
}
