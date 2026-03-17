<?php

require __DIR__ . '/vendor/autoload.php';

use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;

$client = new Client([
    'base_uri' => 'http://localhost:8000/api/',
    'http_errors' => false,
    'headers' => [
        'Accept' => 'application/json',
        'Content-Type' => 'application/json',
        // Mock Auth Token - assuming we can grab one or the system allows it from localhost if we configured it. 
        // NOTE: If Sanctum is strict, we might need to login first.
    ]
]);

// 1. LOGIN to get Token
echo "🔑 Logging in...\n";
try {
    // We need a valid user. Assuming ID 1 exists from previous context or we create one.
    // Actually, let's try to grab the first user from DB using shell if needed, 
    // but for now let's assume we can use the "login" route we fixed.
    $response = $client->post('auth/login', [
        'json' => [
            'username' => 'admin', // standard default?
            'password' => 'password' // standard default?
        ]
    ]);
    
    // If login fails, we might need to create a token manually via artisan/tinker.
    // Let's assume we can just use a manual token from the logs if this fails.
    // For now, let's try to proceed.
} catch (\Exception $e) {
    echo "Login skipped/failed: " . $e->getMessage() . "\n";
}

// Helper to manually create a token if needed
// We'll use a hardcoded token if we can't login, relying on the user's previous logs?
// Better: Use `php artisan tinker` to generate a token for User 1.
$token = trim(shell_exec('php artisan tinker --execute="echo App\Models\User::first()->createToken(\"test\")->plainTextToken;"'));
echo "🎟️ Using Token: " . substr($token, 0, 10) . "...\n";

$client = new Client([
    'base_uri' => 'http://localhost:8000/api/',
    'http_errors' => false,
    'headers' => [
        'Accept' => 'application/json',
        'Content-Type' => 'application/json',
        'Authorization' => 'Bearer ' . $token
    ]
]);

function testEndpoint($module, $createUri, $updateUri, $createPayload, $updatePayload, $checkKey, $checkVal) {
    global $client;
    echo "\nTesting API: $module\n";
    echo str_repeat('-', 30) . "\n";

    // 1. CREATE
    echo "[POST] $createUri ... ";
    $res = $client->post($createUri, ['json' => $createPayload]);
    $status = $res->getStatusCode();
    $body = json_decode($res->getBody(), true);

    if ($status !== 201 && $status !== 200) {
        echo "❌ FAILED ($status)\n";
        print_r($body);
        return;
    }
    
    // Inspect ID - Support both 'id' and 'uuid' depending on response
    $id = $body['uuid'] ?? $body['id'] ?? null;
    if (!$id) {
         echo "❌ FAILED: No ID returned.\n";
         return;
    }
    echo "✅ Success (ID: $id)\n";

    // 2. UPDATE
    // Construct URL with ID
    // Some routes use {id}, others {uuid}. The Controller usually handles both or one.
    $url = str_replace('{id}', $id, $updateUri);
    
    echo "[PUT]  $url ... ";
    $res = $client->put($url, ['json' => $updatePayload]);
    $status = $res->getStatusCode();
    $body = json_decode($res->getBody(), true);

    if ($status !== 200) {
         echo "❌ FAILED ($status)\n";
         print_r($body);
         // Don't return, check persistence anyway? No, if update failed, persistence failed.
         return;
    }
    echo "✅ Success (200 OK)\n";

    // 3. RELOAD (GET)
    echo "[GET]  $url ... ";
    $res = $client->get($url);
    $data = json_decode($res->getBody(), true);
    
    // Check Value
    // Handle nested keys like 'content.p'
    $actual = $data;
    $keys = explode('.', $checkKey);
    foreach ($keys as $k) {
        $actual = $actual[$k] ?? null;
    }

    if ($actual == $checkVal) {
        echo "✅ PERSISTENCE CONFIRMED: '$checkKey' = '$checkVal'\n";
    } else {
        echo "❌ PERSISTENCE FAILED:\n";
        echo "   Expected: $checkVal\n";
        echo "   Actual:   " . json_encode($actual) . "\n";
    }
}

// --- TEST CASES ---

// 1. BLOGS (Uses UUID)
testEndpoint('Blogs', 'blogs', 'blogs/{id}', 
    ['title' => 'API Test Blog', 'content' => ['text' => 'Initial']], 
    ['title' => 'API Updated Blog', 'content' => ['text' => 'Updated'], 'slug' => null], // Test NULL slug handling!
    'title', 'API Updated Blog'
);

// 2. SERVICES (Uses ID? Let's check Controller. It uses `slug` or `id`)
testEndpoint('Services', 'services', 'services/{id}',
    ['title' => 'API Test Service', 'description' => 'Desc'],
    ['title' => 'API Updated Service', 'slug' => null],
    'title', 'API Updated Service'
);

// 3. TEAM (Uses UUID?)
testEndpoint('Team', 'team', 'team/{id}',
    ['name' => 'API Member', 'role' => 'Dev'],
    ['name' => 'API Updated Member'],
    'name', 'API Updated Member'
);

// 4. PORTFOLIO
testEndpoint('Portfolio', 'portfolio', 'portfolio/{id}',
    ['title' => 'API Portfolio', 'slug' => 'api-port'],
    ['title' => 'API Updated Portfolio', 'slug' => null], // Test NULL slug
    'title', 'API Updated Portfolio'
);

// 5. DEMOS
testEndpoint('Demos', 'demos', 'demos/{id}',
    ['title' => 'API Demo', 'url' => 'http://api.com'],
    ['title' => 'API Updated Demo'],
    'title', 'API Updated Demo'
);

echo "\nAPI Audit Complete.\n";
