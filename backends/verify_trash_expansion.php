<?php

require __DIR__ . '/vendor/autoload.php';

$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\Blog;
use App\Models\Service;
use App\Models\Team;
use App\Models\Portfolio;
use App\Models\Demo;
use Illuminate\Support\Facades\Schema;

echo "Starting Trash System Expansion Verification...\n";

// Helper function to test a module
function testModule($modelClass, $name, $data, $updateData) {
    echo "\nTesting Module: $name\n";
    echo str_repeat('-', 30) . "\n";

    // 1. Create
    echo "[1] Creating new $name... ";
    try {
        $item = $modelClass::create($data);
        echo "OK (ID: {$item->id})\n";
    } catch (\Exception $e) {
        echo "FAILED: " . $e->getMessage() . "\n";
        return;
    }

    // 2. Refresh and Check Active
    $item = $modelClass::find($item->id);
    if ($item) {
        echo "[2] Verified exists in Active... OK\n";
    } else {
        echo "[2] Failed to find in Active!\n";
        return;
    }

    // 3. Soft Delete (Trash)
    echo "[3] Soft Deleting (Moving to Trash)... ";
    $item->delete();
    
    // Verify it's gone from active query
    if (!$modelClass::find($item->id)) {
        echo "OK (Removed from Active query)\n";
    } else {
        echo "FAILED (Still in Active query)\n";
    }

    // Verify it's in trash (withTrashed)
    $trashedItem = $modelClass::withTrashed()->find($item->id);
    if ($trashedItem && $trashedItem->trashed()) {
        echo "[4] Verified exists in Trash (trashed() is true)... OK\n";
    } else {
        echo "[4] Failed to find in Trash!\n";
    }

    // 4. Restore
    echo "[5] Restoring... ";
    $trashedItem->restore();
    
    // Verify it's back in active
    if ($modelClass::find($item->id)) {
        echo "OK (Restored to Active)\n";
    } else {
        echo "FAILED (Not found in Active after restore)\n";
    }

    // 5. Force Delete
    echo "[6] Soft Deleting again for Force Delete... ";
    $item = $modelClass::find($item->id);
    $item->delete();
    echo "OK\n";

    echo "[7] Force Deleting... ";
    $trashedItem = $modelClass::withTrashed()->find($item->id);
    $trashedItem->forceDelete();

    if (!$modelClass::withTrashed()->find($item->id)) {
        echo "OK (Permanently deleted)\n";
    } else {
        echo "FAILED (Still exists in DB!)\n";
    }
}

// Data for testing
$modules = [
    [
        'class' => Blog::class,
        'name' => 'Blog',
        'data' => [
            'slug' => 'test-blog-trash-' . uniqid(),
            'title' => 'Test Blog for Trash',
            'content' => 'Content',
            'author' => 'Tester',
            'category' => 'Testing',
            'read_time' => 5,
            'image' => 'test.jpg',
            'date' => now(), // Add date field
            'excerpt' => 'Test excerpt' // Add excerpt field
        ],
        'update' => ['title' => 'Updated Blog Title']
    ],
    [
        'class' => Service::class,
        'name' => 'Service',
        'data' => [
            'icon' => 'Monitor',
            'title' => 'Test Service Trash',
            'description' => 'Test Desc',
            'link' => '/test',
            'gradient' => 'red-500', 
            'shadow' => 'shadow-lg' // Add required fields
        ],
        'update' => ['title' => 'Updated Service Title']
    ],
    [
        'class' => Team::class,
        'name' => 'Team',
        'data' => [
            'name' => 'Test Member Trash',
            'role' => 'Tester',
            'bio' => 'Bio',
            'image' => 'avatar.jpg',
            'socials' => [] // Add socials
        ],
        'update' => ['name' => 'Updated Member Name']
    ],
    [
        'class' => Portfolio::class,
        'name' => 'Portfolio',
        'data' => [
            'title' => 'Test Project Trash',
            'category' => 'Web',
            'image' => 'project.jpg',
            'description' => 'Desc',
            'client' => 'Client',
            'completion_date' => '2023-01-01', // Add required fields
            'slug' => 'test-project-' . uniqid() ,
            'link' => 'http://example.com' 
        ],
        'update' => ['title' => 'Updated Project Title']
    ],
    [
        'class' => Demo::class,
        'name' => 'Demo',
        'data' => [
            'title' => 'Test Demo Trash',
            'category' => 'SaaS',
            'image' => 'demo.jpg',
            'slug' => 'test-demo-' . uniqid(),
            'description' => 'Desc',
            'technologies' => ['React'],
            'features' => ['Auth'],
            'price' => '100'
        ],
        'update' => ['title' => 'Updated Demo Title']
    ],
];

foreach ($modules as $mod) {
    // Check if table has deleted_at column first
    $tableName = (new $mod['class'])->getTable();
    if (!Schema::hasColumn($tableName, 'deleted_at')) {
        echo "SKIPPING {$mod['name']}: 'deleted_at' column missing in '$tableName' table.\n";
        continue;
    }

    testModule($mod['class'], $mod['name'], $mod['data'], $mod['update']);
}

echo "\nVerification Complete.\n";
