<?php

namespace App\Exports;

use App\Models\User;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class UsersExport implements FromCollection, WithHeadings
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        //
        $users = User::all();
        return $users;
    }
    public function headings(): array
    {
        return [
            'id',
            'name',
            'username',
            'role',
            'created At',
            'updated At',
        ];
    }
}
