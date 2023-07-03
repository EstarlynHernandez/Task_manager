<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Task extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'details',
        'status',
        'type',
        'tgroup_id',
        'date',
        'count',
        'value',
        'action',
        'family',
        'user_id',

    ];

    public function times() {
        return  $this->count;
    }
}
