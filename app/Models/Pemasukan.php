<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pemasukan extends Model
{
    //
    // protected $fillable = [
    //     'sumber',
    //     'keterangan',
    //     'nominal',
    //     'tanggal',
    // ];
    protected $guarded = [];
    protected $casts = [
        'tanggal' => 'date',
        'nominal' => 'decimal:2',
    ];
}
