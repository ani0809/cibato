<?php

namespace App\Http\Controllers;

use App\Models\MarketingContact;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class MarketingController extends Controller
{
    public function track(Request $request)
    {
        $settings = Setting::where('group', 'general')->pluck('value', 'key');
        
        $pixelId = $settings['facebook_pixel_id'] ?? null;
        $accessToken = $settings['facebook_access_token'] ?? null;
        $enableCapi = $settings['enable_capi'] ?? null;
        $testCode = $settings['test_event_code'] ?? null;

        if (!$enableCapi || !$pixelId || !$accessToken) {
             return response()->json(['message' => 'CAPI disabled', 'skipped' => true]);
        }

        $payload = [
            'data' => [
                [
                    'event_name' => $request->event_name,
                    'event_time' => time(),
                    'action_source' => 'website',
                    'event_source_url' => $request->event_source_url,
                    'user_data' => [
                        'client_user_agent' => $request->header('User-Agent'),
                        'client_ip_address' => $request->ip(),
                        // ... merge other user_data
                    ],
                    'custom_data' => $request->custom_data
                ]
            ]
        ];

        if ($testCode) {
            $payload['test_event_code'] = $testCode;
        }

        $response = Http::post("https://graph.facebook.com/v19.0/{$pixelId}/events?access_token={$accessToken}", $payload);
        
        return response()->json($response->json(), $response->status());
    }

    public function contacts()
    {
        return MarketingContact::all();
    }

    public function storeContact(Request $request)
    {
        $request->validate(['email' => 'required']);
        
        $contact = MarketingContact::firstOrCreate(
            ['email' => $request->email],
            [
                'name' => $request->name ?? 'Unknown',
                'category' => $request->category ?? 'General',
                'source' => 'manual'
            ]
        );
        
        return response()->json($contact);
    }

    public function destroyContact($email)
    {
        MarketingContact::where('email', $email)->delete();
        return response()->json(['message' => 'Deleted']);
    }

    public function importLeads()
    {
        $leads = \App\Models\Lead::select('email', 'name', 'service_interest')->get();
        $count = 0;

        foreach ($leads as $lead) {
            $exists = MarketingContact::where('email', $lead->email)->exists();
            if (!$exists) {
                MarketingContact::create([
                    'name' => $lead->name ?? 'Unknown',
                    'email' => $lead->email,
                    'category' => $lead->service_interest ?? 'General',
                    'source' => 'imported'
                ]);
                $count++;
            }
        }

        return response()->json(['message' => "Imported {$count} new contacts from Leads"]);
    }

    public function batchStoreContacts(Request $request)
    {
        $request->validate(['contacts' => 'required|array']);
        
        $count = 0;
        foreach ($request->contacts as $c) {
            if (!isset($c['email'])) continue;
            
            $exists = MarketingContact::where('email', $c['email'])->exists();
            if (!$exists) {
                MarketingContact::create([
                    'name' => $c['name'] ?? 'Unknown',
                    'email' => $c['email'],
                    'category' => $request->category ?? 'General',
                    'source' => 'imported_file'
                ]);
                $count++;
            }
        }

        return response()->json(['message' => "Imported {$count} contacts from file"]);
    }

    public function sendCampaign(Request $request)
    {
        $request->validate([
            'recipients' => 'required|array',
            'subject' => 'required',
            'message' => 'required'
        ]);

        $success = 0;
        $failed = 0;

        // Use the SMTP configuration from Settings
        // Ensure Mail config is set dynamically or relying on .env if managed there.
        // For this system, we rely on Laravel's Mail facade which uses the configured transport.

        foreach ($request->recipients as $email) {
            try {
                \Illuminate\Support\Facades\Mail::html($request->message, function ($message) use ($email, $request) {
                    $message->to($email)
                        ->subject($request->subject);
                });
                $success++;
            } catch (\Exception $e) {
                \Illuminate\Support\Facades\Log::error("Campaign Send Error to $email: " . $e->getMessage());
                $failed++;
            }
        }

        return response()->json([
            'message' => 'Campaign completed',
            'stats' => ['success' => $success, 'failed' => $failed]
        ]);
    }
}
