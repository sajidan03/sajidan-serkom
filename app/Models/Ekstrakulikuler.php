<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ekstrakulikuler extends Model
{
    //
    public function guru(){
        return $this->belongsTo(Guru::class, 'id_guru');
    }
    protected $guarded = [];
}
