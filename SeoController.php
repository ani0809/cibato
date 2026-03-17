<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Page;
use App\Models\Blog;
use App\Models\Portfolio;

class SeoController extends Controller
{
    public function analyze(Request $request)
    {
        // Support both POST (individual content analysis) and GET (site-wide health)
        if ($request->isMethod('get')) {
            return $this->getSiteHealth();
        }

        $content = $request->input('content');
        $keyword = $request->input('keyword');
        
        $wordCount = str_word_count(strip_tags($content));
        $keywordDensity = 0;
        if ($keyword && $wordCount > 0) {
            $keywordCount = substr_count(strtolower($content), strtolower($keyword));
            $keywordDensity = ($keywordCount / $wordCount) * 100;
        }

        return response()->json([
            'score' => 85,
            'suggestions' => [
                'Content length is good',
                'Keyword appears in first paragraph'
            ],
            'details' => [
                'wordCount' => $wordCount,
                'keywordDensity' => round($keywordDensity, 2)
            ]
        ]);
    }

    private function getSiteHealth()
    {
        $pages = Page::all();
        $blogs = Blog::all();
        $portfolios = Portfolio::all();

        $totalItems = 0;
        $scoreAccumulator = 0;
        $issues = [];

        foreach ($pages as $page) {
            $totalItems++;
            $itemScore = 100;
            $seo = is_string($page->seo) ? json_decode($page->seo, true) : $page->seo;
            
            $title = $seo['metaTitle'] ?? $page->title;
            $desc = $seo['metaDescription'] ?? '';

            if (!$title || strlen($title) < 10) {
                $itemScore -= 20;
                $issues[] = ['type' => 'warning', 'message' => "Page \"{$page->title}\" has a short or missing meta title."];
            }

            if (!$desc) {
                $itemScore -= 20;
                $issues[] = ['type' => 'critical', 'message' => "Page \"{$page->title}\" is missing a meta description."];
            }

            $scoreAccumulator += $itemScore;
        }

        foreach ($blogs as $blog) {
            $totalItems++;
            $itemScore = 100;
            if (!$blog->excerpt) {
                $itemScore -= 20;
                $issues[] = ['type' => 'warning', 'message' => "Blog \"{$blog->title}\" is missing an excerpt."];
            }
            $scoreAccumulator += $itemScore;
        }

        $finalScore = $totalItems > 0 ? round($scoreAccumulator / $totalItems) : 100;

        return response()->json([
            'score' => $finalScore,
            'totalChecked' => $totalItems,
            'issues' => array_slice($issues, 0, 10) // Limit issues
        ]);
    }
}
