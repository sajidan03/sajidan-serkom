<?php

namespace App\Exports;

use App\Models\Guru;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class GuruExport implements FromCollection, WithHeadings
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        //
        $guru = Guru::all();
        return $guru;
    }
    public function headings(): array{
        return [ 
            'ID',
            'Nama Guru',
            'NIP',
            'Mata Pelajaran',
            'Foto',
            'Tanggal Dibuat',
        ];
    }
}
