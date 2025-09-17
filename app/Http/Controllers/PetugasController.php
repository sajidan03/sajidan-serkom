<?php

namespace App\Http\Controllers;

use App\Models\Member;
use App\Models\Payment;
use App\Models\Petugas;
use App\Models\User;
use DateTime;
use Illuminate\Contracts\Encryption\DecryptException;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Crypt;
use Inertia\Inertia;


class PetugasController extends Controller
{
    public function index(){
        $officers['officers'] = Petugas::with('user')->get();
        return Inertia::render('Admin/Petugas/index', $officers);
    }
    public function petugasTambahView(){
        $users['users'] = User::all();
        return Inertia::render('Admin/Petugas/tambah', $users);
    }
    public function petugasTambah(Request $request){
        $request->validate([
            'id_user' => 'required|exists:users,id',
        ]);
        Petugas::create([
            'id_user' => $request->id_user,
        ]);
        return redirect()->route('petugasView')->with('Success', 'Petugas berhasil ditambahkan');
    }
    public function petugasHapus($id)
    {
        $petugas = Petugas::findOrFail($id);
        $petugas->delete();
        return redirect()->route('petugasView')->with('success', 'User berhasil dihapus.');
    }
    //
    public function payment(){
        $data['member'] = Member::get();
        return Inertia::render('Petugas/payment', $data);
    }

public function petugasView()
{
    $bulanIni = Carbon::now()->format('Y-m');

    $allMembers = Member::with(['user', 'category'])->get();

    $paidMemberIds = Payment::where('period', $bulanIni)->pluck('id_member')->toArray();

    $belumBayar = $allMembers->whereNotIn('id', $paidMemberIds);
    $sudahBayar = $allMembers->whereIn('id', $paidMemberIds);

    // Gunakan encryptString untuk konsistensi
    $belumBayar->each(function($member) {
        $member->encrypted_id = Crypt::encryptString($member->id_user);
    });

    $sudahBayar->each(function($member) {
        $member->encrypted_id = Crypt::encryptString($member->id_user);
    });

    return Inertia::render('Petugas/payment', compact('belumBayar', 'sudahBayar', 'bulanIni'));
}
    public function paymentDetail(Request $request, $id)
{
    try {
        // Gunakan decryptString untuk match dengan encryptString
        $id = Crypt::decryptString($id);
    } catch (DecryptException $e) {
        return back()->with('error', 'ID tidak valid atau sudah rusak!');
    }

    $member = Member::with(['user', 'category' ,'payment'])
                  ->where('id_user', $id)
                  ->first();

    if (!$member) {
        return back()->with('error', 'Data anggota tidak ditemukan!');
    }

    $payment = Payment::where('id_user', $member->id_user)->get();

    $tanggalAwal = "01-08-2025";
    $tanggalAkhir = date('d-m-Y');

    $period = $member->category->period; // Perbaiki dari duesCategory ke category
    if ($period == 'mingguan') {
        $jumlahPeriode = $this->hitungJumlahMinggu($tanggalAwal, $tanggalAkhir);
    } elseif ($period == 'bulanan') {
        $jumlahPeriode = $this->hitungJumlahBulan($tanggalAwal, $tanggalAkhir);
    } else {
        $jumlahPeriode = $this->hitungJumlahTahun($tanggalAwal, $tanggalAkhir);
    }

    if ($payment->count() >= $jumlahPeriode) {
        $jumlah_tagihan = "Tidak Ada";
        $nominal_tagihan = 0;
    } else {
        $jumlah_tagihan = ($jumlahPeriode - $payment->count()) . " kali pembayaran";
        $nominal_tagihan = ($jumlahPeriode - $payment->count()) * $member->category->nominal;
    }

    if ($request->bayar) {
        if ($payment->count() >= $jumlahPeriode) {
            return back()->with('error', 'Semua tagihan sudah lunas, tidak perlu melakukan pembayaran lagi!');
        }

        $nominal_bayar = (int) $request->nominal;
        $nominal_kategori = $member->category->nominal;

        if ($nominal_bayar <= 0) {
            return back()->with('error', 'Nominal pembayaran tidak boleh 0 atau negatif!');
        }

        if ($nominal_bayar % $nominal_kategori != 0) {
            return back()->with('error', 'Nominal pembayaran harus kelipatan dari ' . number_format($nominal_kategori, 0, ',', '.'));
        }

        $jumlah_bayar = $nominal_bayar / $nominal_kategori;
        $pembayaranKeTerakhir = Payment::where('id_user', $member->id_user)->count();

        for ($i = 1; $i <= $jumlah_bayar; $i++) {
            Payment::create([
                'id_user'        => $member->id_user,
                'nominal'        => $nominal_kategori,
                'period'         => $member->category->period,
                'id_petugas'     => Auth::user()->id,
                'id_member'      => $member->id,
                'total_bayar'    => $pembayaranKeTerakhir + $i,
            ]);
        }

        return back()->with('success', 'Pembayaran berhasil disimpan!');
    }

    return Inertia::render('Petugas/payment-detail', [
        'jumlah_tagihan' => $jumlah_tagihan,
        'nominal_tagihan' => $nominal_tagihan,
        'payment' => $payment,
        'member' => $member,
        'encrypted_id' => Crypt::encryptString($member->id_user) // Kirim encrypted ID kembali
    ]);
}

function hitungJumlahMinggu($tanggalAwal, $tanggalAkhir)
{
    $awal = new DateTime($tanggalAwal);
    $akhir = new DateTime($tanggalAkhir);

    if ($akhir < $awal) return 0;

    $selisih = $awal->diff($akhir)->days;
    return ceil($selisih / 7);
}

function hitungJumlahBulan($tanggalAwal, $tanggalAkhir)
{
    $awal = new DateTime($tanggalAwal);
    $akhir = new DateTime($tanggalAkhir);

    if ($akhir < $awal) return 0;

    $selisih = $awal->diff($akhir);
    return ($selisih->y * 12) + $selisih->m + 1; // +1 biar termasuk bulan berjalan
}

function hitungJumlahTahun($tanggalAwal, $tanggalAkhir)
{
    $awal = new DateTime($tanggalAwal);
    $akhir = new DateTime($tanggalAkhir);

    if ($akhir < $awal) return 0;

    $selisih = $awal->diff($akhir);
    return $selisih->y + 1;
}



public function cancel($id)
{
    $payment = Payment::find($id);

    if (!$payment) {
        return back()->with('error', 'Data pembayaran tidak ditemukan!');
    }

    try {
        $payment->delete();
        return back()->with('success', 'Pembayaran berhasil dibatalkan!');
    } catch (\Exception $e) {
        return back()->with('error', 'Terjadi kesalahan saat membatalkan pembayaran!');
    }
}


}
