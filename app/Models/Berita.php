<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Berita extends Model
{
    //
    protected $guarded = [];
    public function user(){
        return $this->belongsTo(User::class, 'id_user', 'id');
    }

    protected $attributes = [
        'dilihat' => 0
    ];
}
