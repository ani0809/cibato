<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\Page;

$pages = Page::all(['id', 'slug', 'title']);
foreach ($pages as $page) {
    echo "ID: " . $page->id . " | Slug: " . $page->slug . " | Title: " . $page->title . "\n";
}
