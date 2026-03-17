<?php

require __DIR__ . '/vendor/autoload.php';

$app = require_once __DIR__ . '/bootstrap/app.php';

$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);

$kernel->bootstrap();

use App\Models\User;
use Illuminate\Support\Facades\Hash;

echo "--- Creating Admin User ---\n";

$email = 'admin@cibato.com';
$password = 'password'; 

$user = User::where('email', $email)->first();

if ($user) {
    echo "User {$email} already exists.\n";
    $user->update([
        'name' => 'Cibato Admin',
        'password' => Hash::make($password), // Reset password to ensuring known state
        'role' => 'admin',
        'username' => 'admin',
        'email_verified_at' => now(),
    ]);
    echo "User updated successfully.\n";
} else {
    $user = User::create([
        'name' => 'Cibato Admin',
        'email' => $email,
        'username' => 'admin',
        'password' => Hash::make($password),
        'role' => 'admin',
        'email_verified_at' => now(),
    ]);
    echo "User created successfully.\n";
}

echo "\nLogin Credentials:\n";
echo "Email: {$email}\n";
echo "Password: {$password}\n";
echo "---------------------------\n";
