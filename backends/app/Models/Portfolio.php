<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\SoftDeletes;

class Portfolio extends Model
{
    use SoftDeletes;
    protected $fillable = [
        'uuid', 'title', 'slug', 'category', 'client', 'duration', 
        'description', 'challenge', 'solution', 'image', 'technologies', 'url'
    ];

    protected $casts = [
        'technologies' => 'array',
    ];
    protected $dates = ['deleted_at'];
    //
}
