<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    protected $fillable = [
        'id_user',
        'period',
        'nominal',
        'id_petugas',
        'id_member',
    ];

    public function member()
    {
        return $this->belongsTo(Member::class, 'id_member', 'id');
    }

    public function officer()
    {
        return $this->belongsTo(Petugas::class, 'id_petugas', 'id');
    }
    public function petugas()
    {
        return $this->belongsTo(Petugas::class, 'id_petugas', 'id');
    }
    public function user()
    {
        return $this->belongsTo(User::class, 'id_user', 'id');
    }
}
