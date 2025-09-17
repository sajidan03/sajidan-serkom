<?php

namespace App\Exports;

use App\Models\Payment;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class PaymentsExport implements FromCollection, WithHeadings, WithMapping
{
    public function collection()
    {

        $payments = Payment::with(['user', 'petugas', 'member'])
            ->orderBy('created_at', 'desc')
            ->get();
        return $payments;
    }

    public function map($payment): array
    {
        return [
            $payment->created_at->format('d/m/Y'),
            $payment->user->name ?? 'Tidak Diketahui',
            $payment->petugas->user->name ?? 'Tidak Diketahui',
            $payment->member->user->name ?? 'Tidak Diketahui',
            ($payment->nominal ?? 0),
            $payment->keterangan ?? '-',
            $payment->status
        ];
    }

    public function headings(): array
    {
        return [
            'Tanggal',
            'Nama Warga',
            'Nama Petugas',
            'Nama Member',
            'Nominal',
            'Keterangan',
            'Status'
        ];
    }
}
