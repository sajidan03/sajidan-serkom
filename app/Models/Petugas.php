<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Petugas extends Model
{
    protected $fillable = ['id_user', 'previous_role'];
    public function user()
    {
        return $this->belongsTo(User::class, 'id_user', 'id');
    }
}
