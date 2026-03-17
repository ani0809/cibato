<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Setting;
use Illuminate\Support\Facades\Artisan;

class SettingController extends Controller
{
    public function index()
    {
        return Setting::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'key' => 'required',
        ]);

        Setting::updateOrCreate(
            ['key' => $request->key],
            [
                'value' => $request->value,
                'group' => $request->group ?? 'general',
            ]
        );

        return Setting::all(); // Node returns all settings after update
    }


    public function clearCache()
    {
        Artisan::call('cache:clear');
        Artisan::call('config:clear');
        Artisan::call('view:clear');
        Artisan::call('route:clear');
        
        return response()->json(['message' => 'Cache cleared successfully']);
    }

    public function getSmtp()
    {
        $settings = Setting::where('group', 'mail')->get();
        $config = [
            'host' => '', 'port' => '', 'username' => '', 'password' => '',
            'encryption' => 'tls', 'fromEmail' => '', 'fromName' => '', 'mailer' => 'smtp'
        ];

        foreach ($settings as $s) {
            $key = str_replace('mail_', '', $s->key);
            if ($key === 'from_address') $key = 'fromEmail';
            if ($key === 'from_name') $key = 'fromName';
            $config[$key] = $s->value;
        }

        return response()->json($config);
    }

    public function updateSmtp(Request $request)
    {
        $map = [
            'host' => 'mail_host',
            'port' => 'mail_port',
            'username' => 'mail_username',
            'password' => 'mail_password',
            'encryption' => 'mail_encryption',
            'fromEmail' => 'mail_from_address',
            'fromName' => 'mail_from_name',
            'mailer' => 'mail_mailer'
        ];

        foreach ($map as $reqKey => $dbKey) {
            if ($request->has($reqKey)) {
                Setting::updateOrCreate(
                    ['key' => $dbKey],
                    ['value' => $request->input($reqKey), 'group' => 'mail']
                );
            }
        }

        Artisan::call('config:clear'); // Clear config cache
        
        return response()->json(['message' => 'SMTP settings updated']);
    }

    public function sendTestEmail(Request $request)
    {
        $request->validate(['to' => 'required|email']);
        
        try {
            // Force config reload from DB just in case (though Provider should handle it)
            // Actually, Provider runs at boot. This is safe.
            
            \Illuminate\Support\Facades\Mail::raw('This is a test email from your application.', function ($message) use ($request) {
                $message->to($request->to)
                        ->subject('SMTP Configuration Test');
            });

            return response()->json(['message' => 'Email sent successfully']);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }
}
