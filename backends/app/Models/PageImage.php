<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PageImage extends Model
{
    protected $fillable = ['page_id', 'media_id', 'key', 'image_path', 'order'];

    public function page()
    {
        return $this->belongsTo(Page::class);
    }
    
    public function media()
    {
        return $this->belongsTo(Media::class);
    }
}
