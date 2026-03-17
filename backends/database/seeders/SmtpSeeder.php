<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Setting;

class SmtpSeeder extends Seeder
{
    public function run()
    {
        $data = [
            'smtp_host' => 'smtp-relay.brevo.com',
            'smtp_port' => '465',
            'smtp_user' => '8969e9001@smtp-brevo.com',
            // Note: In real production, use env vars, but here we restore from the static file as requested
            'smtp_pass' => 'bsksO9QKnbPOvyu', 
            'smtp_from_email' => 'info@cibato.com',
            'smtp_from_name' => 'Cibato',
            'smtp_encryption' => 'ssl' // Optional if controller supports it, but good to store
        ];

        // Delete existing SMTP settings to avoid update weirdness
        DB::table('settings')->where('group', 'smtp')->delete();

        foreach ($data as $key => $value) {
            echo "Inserting $key = $value\n";
            DB::table('settings')->insert([
                'key' => $key,
                'value' => (string)$value, // Force string cast
                'group' => 'smtp',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        $this->command->info('SMTP Settings Restored.');
    }
}
