<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Media extends Model
{
    protected $fillable = ['filename', 'alt', 'title', 'dimensions', 'uploaded_by'];

    //
}
