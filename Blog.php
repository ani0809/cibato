<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\SoftDeletes;

class Blog extends Model
{
    use SoftDeletes;
    protected $fillable = [
        'uuid',
        'title',
        'slug',
        'content', // JSON
        'seo',     // JSON
        'image',
        'category',
        'author',
        'status',
        'published_at'
    ];

    protected $casts = [
        'content' => 'array',
        'seo' => 'array',
        'published_at' => 'datetime',
    ];

    protected $dates = ['deleted_at'];
}
