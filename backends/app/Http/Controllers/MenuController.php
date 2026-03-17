<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use Illuminate\Http\Request;

class MenuController extends Controller
{
    public function index(Request $request)
    {
        $type = $request->query('type') === 'footer' ? 'footer_menu' : 'main_menu';
        
        $setting = Setting::where('key', $type)->first();
        
        // Since we removed 'json' cast from Setting model, we must manually decode
        $value = $setting ? json_decode($setting->value, true) : [];
        
        return response()->json($value ?: []);
    }

    public function update(Request $request)
    {
        $type = $request->query('type') === 'footer' ? 'footer_menu' : 'main_menu';
        
        // Upsert
        $setting = Setting::updateOrCreate(
            ['key' => $type],
            [
                'value' => json_encode($request->all()), // Manually encode
                'group' => 'menus'
            ]
        );

        return response()->json(json_decode($setting->value, true));
    }
}
