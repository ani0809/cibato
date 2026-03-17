<?php
require __DIR__ . '/../vendor/autoload.php';
$app = require_once __DIR__ . '/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\Page;

$page = Page::where('slug', 'google-workspace')->first();

if ($page) {
    header('Content-Type: application/json');
    echo json_encode($page->content, JSON_PRETTY_PRINT);
} else {
    echo "Page not found.";
}
