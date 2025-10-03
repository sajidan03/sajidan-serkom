<?php

namespace App\Exports;

use App\Models\Siswa;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class SiswaExport implements FromCollection, WithHeadings
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        //
        $siswa = Siswa::all();
        return $siswa;
    }
    public function headings(): array
    {
        return [
            'nisn',
            'nama_siswa',
            'jenis_kelamin',
            'tahun_masuk',
        ];
    }
}
