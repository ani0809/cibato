<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        try {
            // Check if table exists to avoid migration errors
            if (\Illuminate\Support\Facades\Schema::hasTable('settings')) {
                $settings = \App\Models\Setting::where('group', 'mail')->get();
                
                $config = [];
                foreach ($settings as $setting) {
                    $config[$setting->key] = $setting->value;
                }

                if (!empty($config)) {
                    // Map DB keys to Laravel Config keys
                    // Assumes keys are like 'mail_host', 'mail_port', etc. or just 'host', 'port'
                    // Adapting based on standard naming found in similar projects
                    
                    if (isset($config['mail_mailer'])) config(['mail.default' => $config['mail_mailer']]);
                    if (isset($config['mail_host'])) config(['mail.mailers.smtp.host' => $config['mail_host']]);
                    if (isset($config['mail_port'])) config(['mail.mailers.smtp.port' => $config['mail_port']]);
                    if (isset($config['mail_username'])) config(['mail.mailers.smtp.username' => $config['mail_username']]);
                    if (isset($config['mail_password'])) config(['mail.mailers.smtp.password' => $config['mail_password']]);
                    if (isset($config['mail_encryption'])) config(['mail.mailers.smtp.encryption' => $config['mail_encryption']]);
                    if (isset($config['mail_from_address'])) config(['mail.from.address' => $config['mail_from_address']]);
                    if (isset($config['mail_from_name'])) config(['mail.from.name' => $config['mail_from_name']]);
                }
            }
        } catch (\Exception $e) {
            // Fail silently if DB not ready (e.g. during migration)
        }
    }
}
