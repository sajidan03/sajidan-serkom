<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Galeri extends Model
{
    //
    protected $guarded = [];
    public function ekskul(){
        return $this->belongsTo(Ekstrakulikuler::class, 'id');
    }
    public function user(){
        return $this->belongsTo(User::class, 'id');
    }
}
