<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Fax;
use App\Models\Profil_sekolah;
use Inertia\Inertia;


class FaxController extends Controller
{
    //
    public function index(){
        $fax = Fax::orderBy('created_at', 'desc')->get();
        return Inertia::render('Admin/Fax/index', [
            'fax' => $fax,
            'profil' => Profil_sekolah::all()->first()
        ]);
    }
    public function destroy($id){
    try {
        $fax = Fax::findOrFail($id);
        $fax->delete();

        return redirect()->back()->with('success', 'Pesan berhasil dihapus');
    } catch (\Exception $e) {
        return redirect()->back()->with('error', 'Gagal menghapus pesan');
    }
}
}
