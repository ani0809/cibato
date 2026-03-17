<?php

require __DIR__ . '/vendor/autoload.php';

$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\Page;

$slug = 'content-writing-service';
$page = Page::where('slug', $slug)->first();

if (!$page) {
    echo "❌ Page not found: $slug\n";
    exit(1);
}

// Prepare new content
$content = [
    'hero' => [
        'title' => 'Professional <span class="text-cyan-500">Content Writing</span> Services to Elevate Your Brand',
        // Description from screenshot
        'description' => 'At Cibato, we provide expert content writing services designed to boost your brand’s visibility and engagement. From SEO-friendly blog posts to compelling website copy, our writers craft content that resonates with your audience and drives results. Whether you need product descriptions, social media content, or email marketing copy, we ensure high-quality, original, and engaging content tailored to your business needs. Enhance your online presence and convert visitors into loyal customers with our strategic content solutions.',
        'buttonText' => 'GET A FREE CONSULTANCY',
        // Using existing image or a placeholder that matches better if needed. Keeping existing for now as it's a "girl with laptop" illustration which is close enough or potentially the same.
        'imgUrl' => 'https://img.freepik.com/free-vector/content-creator-concept-illustration_114360-3794.jpg' 
    ],
    // Keeping other sections as they are or assuming they might need updates later, but the user specifically pointed out the Hero section content in the screenshot.
    // I will preserve existing structure for other keys if I were decoding existing JSON, but since I am overwriting to ensure cleanliness (and likely the existing JSON is empty or malformed for this page based on previous experience), I will just set the Hero. 
    // However, I should check if I need to preserve other sections. The existing file has other sections (Core Strategy, Services, etc.).
    // I will fetch existing content first to be safe, although likely it's empty/generated.
];

// Merge if existing content exists, otherwise just set Hero.
$currentContent = json_decode($page->content ?? '{}', true);
$currentContent['hero'] = $content['hero'];

$page->content = json_encode($currentContent);
$page->save();

echo "✅ Updated Content Writing page content for '$slug'.\n";
