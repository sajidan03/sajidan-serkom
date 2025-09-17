<?php

namespace App\Http\Controllers;

use App\Exports\PaymentsExport;
use App\Models\Payment;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Maatwebsite\Excel\Facades\Excel;

class WargaController extends Controller
{
    public function index()
    {
        $warga['warga'] = User::where('role', 'warga')->get();
        return Inertia::render('Admin/Warga/index', $warga);
    }

    public function export()
    {
        return Excel::download(new PaymentsExport, 'riwayat-pembayaran.xlsx');
    }

    public function exportWarga($id)
    {
        $id = Auth::id();
        return Excel::download(new PaymentsExport($id), 'riwayat-pembayaran-saya.xlsx');
    }
    public function wargaHapus($id)
    {
        $warga = User::findOrFail($id);
        $warga->delete();

        return redirect()->route('wargaAdminView')->with('success', 'Warga berhasil dihapus.');
    }

    public function wargaView()
    {
        $user = Auth::user();

        if ($user->role === 'warga') {
            $payments = Payment::where('id_user', $user->id)
                ->with(['user'])
                ->orderBy('created_at', 'desc')
                ->get();
        } else {
            $payments = collect([]);
        }

        Log::info('Payments data:', [
            'id_user' => $user->id,
            'role' => $user->role,
            'payments_count' => $payments->count(),
            'payments' => $payments->toArray()
        ]);

        return Inertia::render('Warga/Dashboard', [
            'payments' => $payments,
            'user' => $user
        ]);
    }
}
