<?php

namespace App\Http\Controllers;

use App\Models\Profil_sekolah;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WelcomeController extends Controller
{
    //
    public function index()
    {
        $data['profil'] = Profil_sekolah::first();
        return Inertia::render('welcome', $data);
    }
    public function index2()
    {
        $data['profil'] = Profil_sekolah::first();
        return Inertia::render('Contoh', $data);
    }
}
