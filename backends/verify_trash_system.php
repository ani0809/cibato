<?php

require __DIR__ . '/vendor/autoload.php';

$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\Page;
use Illuminate\Support\Str;

echo "--- Verifying Trash System ---\n";

// 1. Create Test Page
$uuid = Str::uuid();
$slug = 'test-trash-page-' . time();
$page = Page::create([
    'uuid' => $uuid,
    'title' => 'Test Trash Page',
    'slug' => $slug,
    'content' => [],
    'sections' => [],
    'seo' => []
]);

if ($page) {
    echo "[PASS] Created Page ID: {$page->id}\n";
} else {
    echo "[FAIL] Could not create page.\n";
    exit(1);
}

// 2. Soft Delete
$page->delete();
$check = Page::withTrashed()->find($page->id);
if ($check->trashed()) {
    echo "[PASS] Soft Deleted Page (Trashed).\n";
} else {
    echo "[FAIL] Page is not trashed.\n";
}

// 3. Restore
$check->restore();
$check = Page::find($page->id);
if ($check && !$check->trashed()) {
    echo "[PASS] Restored Page.\n";
} else {
    echo "[FAIL] Page not restored.\n";
}

// 4. Force Delete
$check->delete(); // Soft delete first
$check->forceDelete();
$finalCheck = Page::withTrashed()->find($page->id);

if (!$finalCheck) {
    echo "[PASS] Permanently Deleted Page.\n";
} else {
    echo "[FAIL] Page still exists.\n";
}

echo "--- Verification Complete ---\n";
