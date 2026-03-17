<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

echo "--- QUERY TEST START ---\n";
try {
    // Simulate the Controller Logic
    $id = 'about-page-id'; // String UUID
    $result = \App\Models\Page::where('id', $id)
        ->orWhere('uuid', $id)
        ->orWhere('slug', $id)
        ->toSql();
    
    echo "SQL: $result\n";

    $page = \App\Models\Page::where('id', $id)
        ->orWhere('uuid', $id)
        ->orWhere('slug', $id)
        ->first();

    if ($page) {
        echo "FOUND Page ID: " . $page->id . "\n";
        echo "Title: " . $page->title . "\n";
    } else {
        echo "NOT FOUND\n";
    }

} catch (\Exception $e) {
    echo "EXCEPTION: " . $e->getMessage() . "\n";
    echo "Trace: " . $e->getTraceAsString() . "\n";
}
echo "--- QUERY TEST END ---\n";
