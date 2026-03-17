<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\SoftDeletes;

class Demo extends Model
{
    use SoftDeletes;
    protected $fillable = ['uuid', 'title', 'slug', 'category', 'image', 'url', 'type'];
    protected $dates = ['deleted_at'];

    //
}
