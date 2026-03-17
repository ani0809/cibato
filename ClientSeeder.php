<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class ClientSeeder extends Seeder
{
    public function run()
    {
        $jsonPath = base_path('../server/data/clients.json');

        if (!File::exists($jsonPath)) {
            $this->command->error("File not found: $jsonPath");
            return;
        }

        $clients = json_decode(File::get($jsonPath), true);

        if (!$clients) {
             $this->command->error("Failed to decode JSON");
             return;
        }

        $this->command->info("Seeding " . count($clients) . " clients...");

        foreach ($clients as $c) {
            DB::table('clients')->updateOrInsert(
                ['name' => $c['name']], // Unique key
                [
                    'logo' => $c['logo'],
                    'url' => $c['url'] ?? '#',
                    'created_at' => now(),
                    'updated_at' => now(),
                ]
            );
        }
        
        $this->command->info("Done!");
    }
}
