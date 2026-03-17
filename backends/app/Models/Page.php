<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Page extends Model
{
    use SoftDeletes;

    protected $fillable = ['uuid', 'title', 'slug', 'content', 'sections', 'seo'];

    protected $casts = [
        'content' => 'array',
        'sections' => 'array',
        'seo' => 'array',
    ];

    protected $dates = ['deleted_at'];
}
