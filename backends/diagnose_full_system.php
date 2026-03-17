<?php
// backend/diagnose_full_system.php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

echo "--- DATABASE CONNECTION CHECK ---\n";
try {
    \Illuminate\Support\Facades\DB::connection()->getPdo();
    echo "Filesystem DB Connection: OK\n";
    echo "Database: " . \Illuminate\Support\Facades\DB::connection()->getDatabaseName() . "\n";
} catch (\Exception $e) {
    echo "DB Connection Failed: " . $e->getMessage() . "\n";
    exit(1);
}

echo "\n--- ALL PAGES DUMP ---\n";
$pages = \App\Models\Page::all();
foreach ($pages as $p) {
    echo "ID: {$p->id} | UUID: {$p->uuid} | Slug: '{$p->slug}' | Title: {$p->title}\n";
    echo "   Updated At: {$p->updated_at}\n";
    echo "   Content Type: " . gettype($p->content) . "\n";
    if (is_array($p->content)) {
        echo "   Content Sample: " . json_encode(array_slice($p->content, 0, 1)) . "\n";
    } else {
        echo "   Content Sample (Raw): " . substr((string)$p->content, 0, 50) . "...\n";
    }
    echo "---------------------------------------------------\n";
}
