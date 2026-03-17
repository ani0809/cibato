<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Lead;
use App\Models\Setting;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Mail;

class LeadController extends Controller
{
    public function index()
    {
        return Lead::orderBy('created_at', 'desc')->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required',
            'message' => 'required'
        ]);

        $lead = Lead::create($request->all());

        // Attempt Email Sending
        try {
            $this->sendEmail($lead);
        } catch (\Exception $e) {
            // Log error but don't fail request
            \Log::error('Lead email failed: ' . $e->getMessage());
        }

        return response()->json(['message' => 'Lead submitted successfully', 'lead' => $lead], 201);
    }

    public function destroy($id)
    {
        Lead::destroy($id);
        return response()->json(['message' => 'Lead deleted']);
    }

    protected function sendEmail($lead)
    {
        // 1. Fetch Settings (Prefer 'mail' group as used by SettingController/AdminPanel)
        $settings = Setting::where('group', 'mail')->pluck('value', 'key');
        
        // Fallback or explicit check
        if (!isset($settings['mail_host'])) {
             \Log::error('LeadController: Missing mail_host in settings.');
             return;
        }

        // 2. Configure Mailer Dynamically
        Config::set('mail.mailers.smtp.host', $settings['mail_host']);
        Config::set('mail.mailers.smtp.port', $settings['mail_port']);
        Config::set('mail.mailers.smtp.username', $settings['mail_username']);
        Config::set('mail.mailers.smtp.password', $settings['mail_password']);
        
        // Handle encryption - sometimes stored as "tls" (with quotes) or null
        $encryption = trim($settings['mail_encryption'] ?? 'tls', '"\''); 
        Config::set('mail.mailers.smtp.encryption', $encryption);
        
        Config::set('mail.from.address', $settings['mail_from_address']);
        Config::set('mail.from.name', $settings['mail_from_name']);
        Config::set('mail.default', 'smtp');

        // 3. Send Admin Notification
        try {
            Mail::raw("New Lead Submission:\n\nName: {$lead->name}\nEmail: {$lead->email}\nMessage:\n{$lead->message}", function ($message) use ($settings, $lead) {
                $message->to($settings['mail_from_address']) // To Admin
                        ->subject("New Lead: {$lead->name}");
            });
        } catch (\Exception $e) {
            \Log::error("Failed to send Admin Email: " . $e->getMessage());
        }

        // 4. Send Client Auto-Reply
        if ($lead->email) {
            try {
                $body = "Hi {$lead->name},\n\nThank you for contacting " . $settings['mail_from_name'] . ". We have received your message and will get back to you shortly.\n\nBest Regards,\n" . $settings['mail_from_name'];
                
                Mail::raw($body, function ($message) use ($settings, $lead) {
                    $message->to($lead->email) // To Client
                            ->subject("Thank you for contacting us");
                });
            } catch (\Exception $e) {
                \Log::error("Failed to send Client Email: " . $e->getMessage());
            }
        }
    }
}

