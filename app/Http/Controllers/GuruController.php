<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class GuruController extends Controller
{
    //
    public function index()
    {
        $data['profil'] = \App\Models\Profil_sekolah::first();
        $data['guru'] = \App\Models\Guru::all();
        return Inertia('Admin/Guru/index', $data);
    }
}
