<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

try {
    require __DIR__ . '/../vendor/autoload.php';
    $app = require_once __DIR__ . '/../bootstrap/app.php';
    $kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
    $kernel->bootstrap();

    // Use Query Builder to avoid Model casting issues
    $page = \Illuminate\Support\Facades\DB::table('pages')->where('slug', 'google-workspace')->first();

    if ($page) {
        $content = $page->content;
        echo "DEBUG: Raw content type: " . gettype($content) . "\n";
        
        $contentArr = (is_string($content) ? json_decode($content, true) : (array)$content) ?? [];
        echo "DEBUG: Decoded type: " . gettype($contentArr) . "\n";
        
        if (!is_array($contentArr)) {
            $contentArr = [];
            echo "DEBUG: Forced to empty array.\n";
        }


        $newImages = [
            'smart_collaboration' => 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80',
            'productivity_software' => 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80',
            'get_g_suite' => 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80'
        ];

        $updated = false;
        foreach ($newImages as $key => $url) {
            if (!isset($contentArr[$key]) || $contentArr[$key] !== $url) {
                $contentArr[$key] = $url;
                $updated = true;
            }
        }

        if ($updated) {
            \Illuminate\Support\Facades\DB::table('pages')
                ->where('id', $page->id)
                ->update(['content' => json_encode($contentArr)]);
            echo "Successfully updated google-workspace content.";
        } else {
            echo "Content already up to date.";
        }
    } else {
        echo "Page 'google-workspace' not found.";
    }

} catch (\Throwable $e) {
    echo "Error: " . $e->getMessage();
    echo "\nTrace: " . $e->getTraceAsString();
}
