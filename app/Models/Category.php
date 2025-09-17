<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $table = 'categories';
    protected $fillable = ['name','period', 'nominal', 'status'];

    public function member(){
        return $this->hasMany(Member::class, 'id_category');
    }
}
