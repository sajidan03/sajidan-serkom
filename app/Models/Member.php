<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Member extends Model
{
    use HasFactory;
    protected $table = 'members';

    protected $fillable = [
        'id_user',
        'id_category',
    ];

    public function payment() {
        return $this->hasMany(Payment::class, 'id_member', 'id');
    }
    public function user()
    {
        return $this->belongsTo(User::class, 'id_user');
    }

    public function category()
    {
        return $this->belongsTo(Category::class, 'id_category');
    }
    // public function category()
    // {
    //     return $this->duesCategory();
    // }
}
