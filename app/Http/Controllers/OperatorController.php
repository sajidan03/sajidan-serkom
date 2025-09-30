<?php

namespace App\Http\Controllers;

use App\Models\Profil_sekolah;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OperatorController extends Controller
{
    //
        public function index(){
        $data['profil'] = Profil_sekolah::first();
        return Inertia::render('Operator/dashboard', $data);
    }
}
