<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\SoftDeletes;

class Team extends Model
{
    use SoftDeletes;
    protected $table = 'team'; // Explicit table name if needed, usually 'teams' but migration might be different. 
    // Audit error said "Add [name] to fillable".
    protected $fillable = [
        'uuid',
        'name',
        'role',
        'image',
        'bio',
        'social_links' // JSON usually
    ];

    protected $casts = [
        'social_links' => 'array'
    ];
    protected $dates = ['deleted_at'];
}
