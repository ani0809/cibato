<?php

use Illuminate\Support\Str;
use App\Models\Blog;
use App\Models\Service;
use App\Models\Team;
use App\Models\Portfolio;
use App\Models\Demo;
use App\Models\Setting;
use Illuminate\Support\Facades\Log;

require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

function testModule($name, $modelClass, $createPayload, $updatePayload, $checkFields) {
    echo "\nTesting Module: $name\n";
    echo str_repeat('-', 30) . "\n";

    try {
        // 1. Create
        echo "[CREATE] Attempting create...\n";
        $model = $modelClass::create($createPayload);
        
        if (!$model || !$model->exists) {
            echo "❌ FAILED: Create returned null or unsaved model.\n";
            return;
        }
        echo "✅ Created ID: " . $model->id . "\n";

        // 2. Verify Create Persistence
        $fresh = $modelClass::find($model->id);
        if (!$fresh) {
             echo "❌ FAILED: Could not retrieve created record from DB.\n";
             return;
        }

        // 3. Update
        echo "[UPDATE] Attempting update...\n";
        // Simulate what Controllers do: $model->update($data)
        // NOTE: We want to test ELOQUENT behavior here to see if the Model is capable.
        // If Model is fine, then Controller might be the issue. 
        // But this script tests the underlying persistence layer.
        
        $fresh->update($updatePayload);
        
        // 4. Verify Update Persistence (Reload from DB)
        $reloaded = $modelClass::find($model->id);
        
        foreach ($checkFields as $field => $expectedValue) {
            $actual = $reloaded->$field;
            
            // Handle array casing
            if (is_array($expectedValue)) {
                // Determine if actual is array or string (cast issue)
                $isMatch = false;
                if (is_array($actual)) {
                    $isMatch = ($actual == $expectedValue);
                } elseif (is_string($actual)) {
                     // Try decoding
                     $decoded = json_decode($actual, true);
                     $isMatch = ($decoded == $expectedValue);
                     if ($isMatch) echo "⚠️ WARNING: Field '$field' matches but is stored/cast as STRING, not ARRAY in Model.\n";
                }
                
                if ($isMatch) {
                    echo "✅ Field '$field' matches.\n";
                } else {
                    echo "❌ FAILED: Field '$field' mismatch.\n";
                    echo "   Expected: " . json_encode($expectedValue) . "\n";
                    echo "   Actual:   " . (is_string($actual) ? $actual : json_encode($actual)) . "\n";
                }
            } else {
                if ($actual == $expectedValue) {
                    echo "✅ Field '$field' matches.\n";
                } else {
                    echo "❌ FAILED: Field '$field' mismatch.\n";
                    echo "   Expected: $expectedValue\n";
                    echo "   Actual:   $actual\n";
                }
            }
        }

        // Cleanup
        $model->delete();
        echo "✅ Cleanup: Deleted test record.\n";

    } catch (\Exception $e) {
        echo "❌ EXCEPTION: " . $e->getMessage() . "\n";
    }
}

// --- BLOG TEST ---
testModule('Blog', Blog::class, 
    ['title' => 'Audit Test Blog', 'uuid' => (string)Str::uuid(), 'slug' => 'audit-test-blog'],
    ['title' => 'Audit Updated Blog', 'content' => ['p' => 'Updated content']],
    ['title' => 'Audit Updated Blog'] // Content check depends on casting
);

// --- SERVICE TEST ---
testModule('Service', Service::class,
    ['title' => 'Audit Service', 'slug' => 'audit-service'],
    ['title' => 'Audit Updated Service'],
    ['title' => 'Audit Updated Service']
);

// --- TEAM TEST ---
testModule('Team', Team::class,
    ['name' => 'Audit Member', 'role' => 'Tester'],
    ['name' => 'Audit Updated Member'],
    ['name' => 'Audit Updated Member']
);

// --- PORTFOLIO TEST ---
testModule('Portfolio', Portfolio::class,
    ['title' => 'Audit Portfolio', 'slug' => 'audit-portfolio', 'uuid' => (string)Str::uuid()],
    ['title' => 'Audit Updated Portfolio'],
    ['title' => 'Audit Updated Portfolio']
);

// --- DEMO TEST ---
testModule('Demo', Demo::class,
    ['title' => 'Audit Demo', 'link' => 'http://test.com', 'uuid' => (string)Str::uuid(), 'slug' => 'audit-demo'],
    ['title' => 'Audit Updated Demo'],
    ['title' => 'Audit Updated Demo']
);

// --- SETTING TEST ---
testModule('Setting', Setting::class,
    ['key' => 'audit_setting', 'value' => 'test_value'],
    ['key' => 'audit_setting', 'value' => ['nested' => 'updated_value']],
    ['value' => ['nested' => 'updated_value']]
);

echo "\nAudit Complete.\n";
