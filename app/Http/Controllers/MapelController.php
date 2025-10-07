<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Mapel;
use App\Models\Profil_sekolah;
use Inertia\Inertia;
use Illuminate\Support\Facades\Crypt;

class MapelController extends Controller
{
    //
    public function index(){
            $data['profil'] = Profil_sekolah::all()->first();
            $data['mapel'] = Mapel::all();
            $data['mapel'] = Mapel::all()->map(function ($mapel) {
                return [
                    'id' => $mapel->id,
                    'created_at' => $mapel->created_at,
                    'updated_at' => $mapel->updated_at,
                    'mapel' => $mapel->mapel,
                    'encrypted_id' => Crypt::encrypt($mapel->id),
                ];
            })->toArray();
            return Inertia::render('Admin/Mapel/index', $data);
    }

    public function mapelEditView($id){
        $id = Crypt::decrypt($id);
        $data['profil'] = Profil_sekolah::all()->first();
        $data['mapel'] = Mapel::findOrFail($id);
        return Inertia::render('Admin/Mapel/edit', $data);
    }
    public function mapelEdit(Request $request, $id){
        $data['profil'] = Profil_sekolah::all()->first();
        $request->validate([
            'mapel' => 'required',
        ]);
        $mapel = Mapel::findOrFail($id);

        $mapel->update([
            'mapel' => $request->mapel,
        ]);
        // dd($id);
        return redirect()->route('mapelView');
    }
    public function mapelTambah(Request $request){
        $request->validate([
            'mapel' => 'nullable|string'
        ]);
        Mapel::create([
            'mapel' => $request->mapel,
        ]);
        return redirect()->route('mapelView');
    }
    public function mapelTambahView(){
        $data['profil'] = Profil_sekolah::all()->first();
        return Inertia::render('Admin/Mapel/tambah', $data);
    }
    public function mapelHapus($id) {
        $hapus = Mapel::find($id)->delete();
        return redirect()->route('mapelView');
    }
}
