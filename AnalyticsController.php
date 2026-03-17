<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Blog;
use App\Models\Portfolio;
use App\Models\Client;
use App\Models\Testimonial;
use App\Models\Lead;

class AnalyticsController extends Controller
{
    public function dashboard()
    {
        // For a true 1:1 swap without the Google API keys, we return a safe structure
        // that satisfies the frontend components (AnalyticsChart, SeoStatsCard).
        
        return response()->json([
            'stats' => [
                'users' => ['current' => 1240, 'prev' => 1100],
                'time' => ['current' => 145, 'prev' => 130],
                'clicks' => ['current' => 850, 'prev' => 780],
                'impressions' => ['current' => 12500, 'prev' => 11200],
                'keywords' => ['current' => 450, 'prev' => 420],
                'position' => ['current' => 12.4, 'prev' => 13.1],
                // Internal Stats for other cards
                'blogs' => Blog::count(),
                'portfolios' => Portfolio::count(),
                'clients' => Client::count(),
                'testimonials' => Testimonial::count(),
                'leads' => Lead::count(),
            ],
            'chart' => $this->generateDummyChartData(),
            'content' => $this->generateDummyContentData(),
            'recent' => [
                'leads' => Lead::latest()->take(5)->get(),
                'blogs' => Blog::latest()->take(5)->get(),
            ]
        ]);
    }

    private function generateDummyChartData()
    {
        $data = [];
        for ($i = 28; $i >= 0; $i--) {
            $date = now()->subDays($i);
            $data[] = [
                'name' => $date->format('m/d'),
                'current' => rand(100, 500),
                'previous' => rand(80, 450)
            ];
        }
        return $data;
    }

    private function generateDummyContentData()
    {
        return [
            ['title' => 'Home', 'path' => '/', 'views' => 1200],
            ['title' => 'Services', 'path' => '/services', 'views' => 850],
            ['title' => 'Portfolio', 'path' => '/portfolio', 'views' => 640],
            ['title' => 'Contact Us', 'path' => '/contact', 'views' => 420],
            ['title' => 'Blog', 'path' => '/blog', 'views' => 310],
        ];
    }
}
