<?php
require __DIR__ . '/vendor/autoload.php';

$token = trim(shell_exec('c:\xampp\php\php.exe artisan tinker --execute="echo App\Models\User::first()->createToken(\"verify\")->plainTextToken;"'));
echo "🎟️ Auth Token Generated\n";

$client = new GuzzleHttp\Client([
    'base_uri' => 'http://localhost:8000/api/',
    'http_errors' => false,
    'headers' => ['Authorization' => 'Bearer ' . $token, 'Accept' => 'application/json']
]);

function testModule($client, $name, $uri, $data, $id_lookup = null) {
    echo "\nTesting $name...\n";
    
    // 1. CREATE
    try {
        $res = $client->post($uri, ['json' => $data]);
    } catch (\Exception $e) {
        echo "  [POST] Failed: " . $e->getMessage() . "\n";
        if (method_exists($e, 'getResponse') && $e->getResponse()) {
             echo substr($e->getResponse()->getBody()->getContents(), 0, 500) . "\n";
        }
        return;
    }

    $status = $res->getStatusCode();
    echo "  [POST] Status: $status\n";

    if ($status !== 201 && $status !== 200) {
        echo "  ❌ Create Failed! Response:\n";
        echo substr($res->getBody()->getContents(), 0, 1000) . "\n";
        return;
    }

    $body = json_decode($res->getBody()->getContents(), true);
    
    // Auto-detect ID
    $finalId = $id_lookup;
    if (isset($body['id'])) {
        $finalId = $body['id'];
        echo "  (Using ID: $finalId for lookup)\n";
    }

    if (!$finalId) {
        echo "  ⚠️ No ID returned and no lookup ID provided. Skipping GET.\n";
        return;
    }

    // 2. READ BACK
    try {
        $res2 = $client->get("$uri/$finalId");
    } catch (\Exception $e) {
        echo "  [GET] Request Failed: " . $e->getMessage() . "\n";
        return;
    }
    
    $status2 = $res2->getStatusCode();
    echo "  [GET]  Status: $status2\n";

    if ($status2 === 200) {
        echo "  ✅ PERSISTENCE CONFIRMED\n";
    } else {
        echo "  ❌ DB Persistence Failed (GET returned $status2)\n";
    }
}

$id = uniqid();
testModule($client, 'PAGES', 'pages', ['title' => "Verif Page $id", 'slug' => "verif-$id", 'content' => ['p' => 'test']], "verif-$id");

$id = uniqid();
testModule($client, 'BLOGS', 'blogs', ['title' => "Verif Blog $id", 'slug' => "verif-$id", 'content' => ['p' => 'test']], "verif-$id");

$id = uniqid();
testModule($client, 'SERVICES', 'services', ['title' => "Verif Service $id", 'slug' => "verif-$id", 'description' => 'test'], "verif-$id");

$id = uniqid();
testModule($client, 'TEAM', 'team', [
    'name' => 'John Doe ' . uniqid(),
    'role' => 'Developer',
    'bio' => 'Test Bio',
    'socials' => ['linkedin' => 'test']
], $id);

$id = uniqid();
testModule($client, 'AWARDS', 'awards', [
    'name' => 'Test Award ' . uniqid(),
    'url' => 'http://example.com',
    'logo' => 'award.png'
]);

$id = uniqid();
testModule($client, 'CLIENTS', 'clients', [
    'name' => 'Test Client ' . uniqid(),
    'url' => 'http://client.com',
    'logo' => 'client.png'
]);

echo "\n🏁 Done.\n";
