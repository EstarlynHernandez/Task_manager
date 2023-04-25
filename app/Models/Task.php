<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class task extends Model
{
    use HasFactory;

    protected $fillabele = [
        'name',
        'details',
        'status',
        'type',
        'time',
        'count',
    ];

    public function times() {
        return  $this->count;
    }
}
