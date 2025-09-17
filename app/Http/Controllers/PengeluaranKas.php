<?php

namespace App\Http\Controllers;

use App\Models\Pengeluaran;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PengeluaranKas extends Controller
{
    //
    public function pengeluaranView()
    {
        $pengeluaran['pengeluaran'] = Pengeluaran::orderBy('tanggal', 'desc')->get();

        return Inertia::render('Admin/Kas/Pengeluaran', $pengeluaran);
    }
    public function pengeluaranTambah(Request $request)
    {
        $request->validate([
            'sumber' => 'required|string|max:255',
            'keterangan' => 'required|string|max:255',
            'nominal' => 'required|numeric|min:0',
            'tanggal' => 'required|date',
        ]);
        Pengeluaran::create([
            'sumber' => $request->sumber,
            'keterangan' => $request->keterangan,
            'nominal' => $request->nominal,
            'tanggal' => $request->tanggal,
        ]);
        return redirect()->route('laporanKasView')->with('success', 'Pemasukan kas berhasil ditambahkan.');
    }
}
