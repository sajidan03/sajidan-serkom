<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Mapel;
use Inertia\Inertia;

class MapelController extends Controller
{
    //
    public function index(){
        $data['mapel'] = Mapel::all();
        return Inertia::render('Admin/Mapel/index');
    }
}
