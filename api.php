<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\PortfolioController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\TestimonialController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\MediaController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\LeadController;
use App\Http\Controllers\MarketingController;
use App\Http\Controllers\DemoController;
use App\Http\Controllers\AwardController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\RedirectController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\AnalyticsController;
use App\Http\Controllers\SeoController;

// Public Routes (Auth)
Route::post('/login', [AuthController::class, 'login']);
Route::get('/login', function() {
    return response()->json(['message' => 'Unauthenticated.'], 401);
})->name('login');

Route::prefix('auth')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);
});

// Protected Routes (DEFINED FIRST TO PREVENT WILDCARD CONFLICTS)
Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/me', [AuthController::class, 'user']);
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::post('/upload', [MediaController::class, 'store']);
    Route::put('/media/{id}', [MediaController::class, 'update']);
    Route::delete('/media/{id}', [MediaController::class, 'destroy']);
    Route::post('/settings/clear-cache', [SettingController::class, 'clearCache']);
    
    // SMTP
    Route::get('/smtp', [SettingController::class, 'getSmtp']);
    Route::put('/smtp', [SettingController::class, 'updateSmtp']);
    Route::post('/smtp/test', [SettingController::class, 'sendTestEmail']);

    // Pages Trash System
    Route::get('/pages/trash', [PageController::class, 'trash']);
    Route::post('/pages/{id}/restore', [PageController::class, 'restore']);
    Route::delete('/pages/{id}/force', [PageController::class, 'forceDelete']);
    Route::apiResource('pages', PageController::class)->only(['store', 'update', 'destroy']);

    // Blogs Trash System
    Route::get('/blogs/trash', [BlogController::class, 'trash']);
    Route::post('/blogs/{id}/restore', [BlogController::class, 'restore']);
    Route::delete('/blogs/{id}/force', [BlogController::class, 'forceDelete']);
    Route::apiResource('blogs', BlogController::class)->only(['store', 'update', 'destroy']);

    // Portfolios Trash System
    Route::get('/portfolios/trash', [PortfolioController::class, 'trash']);
    Route::post('/portfolios/{id}/restore', [PortfolioController::class, 'restore']);
    Route::delete('/portfolios/{id}/force', [PortfolioController::class, 'forceDelete']);
    Route::apiResource('portfolios', PortfolioController::class)->only(['store', 'update', 'destroy']);

    // Services Trash System
    Route::get('/services/trash', [ServiceController::class, 'trash']);
    Route::post('/services/{id}/restore', [ServiceController::class, 'restore']);
    Route::delete('/services/{id}/force', [ServiceController::class, 'forceDelete']);
    Route::apiResource('services', ServiceController::class)->only(['store', 'update', 'destroy']);

    // Team Trash System
    Route::get('/team/trash', [TeamController::class, 'trash']);
    Route::post('/team/{id}/restore', [TeamController::class, 'restore']);
    Route::delete('/team/{id}/force', [TeamController::class, 'forceDelete']);
    Route::apiResource('team', TeamController::class)->only(['store', 'update', 'destroy']);

    // Demos Trash System
    Route::get('/demos/trash', [DemoController::class, 'trash']);
    Route::post('/demos/{id}/restore', [DemoController::class, 'restore']);
    Route::delete('/demos/{id}/force', [DemoController::class, 'forceDelete']);
    Route::apiResource('demos', DemoController::class)->only(['store', 'update', 'destroy']);

    Route::apiResource('testimonials', TestimonialController::class)->only(['store', 'update', 'destroy']);
    Route::apiResource('clients', ClientController::class)->only(['store', 'update', 'destroy']);
    Route::apiResource('awards', AwardController::class)->only(['store', 'update', 'destroy']);
    
    // Categories
    Route::post('/portfolio-categories', [CategoryController::class, 'storePortfolio']);
    Route::delete('/portfolio-categories/{id}', [CategoryController::class, 'destroy']);

    Route::post('/demo-categories', [CategoryController::class, 'storeDemo']);
    Route::delete('/demo-categories/{id}', [CategoryController::class, 'destroy']);
    
    Route::apiResource('categories', CategoryController::class)->only(['store', 'update', 'destroy']);

    // Marketing Tools
    Route::post('/marketing/send', [MarketingController::class, 'sendCampaign']);
    Route::post('/marketing/import', [MarketingController::class, 'importLeads']);
    Route::post('/marketing/contacts/batch', [MarketingController::class, 'batchStoreContacts']);
    Route::delete('/marketing/contacts/{email}', [MarketingController::class, 'destroyContact']);

    // User Management
    Route::apiResource('users', \App\Http\Controllers\UserController::class);
});

// Public Routes (Wildcards defined here, after specific protected routes)
// Pages (Public read, Admin write)
Route::get('/pages', [PageController::class, 'index']);
Route::get('/pages/{slug}', [PageController::class, 'show']);

Route::get('/blogs', [BlogController::class, 'index']);
Route::get('/blogs/{slug}', [BlogController::class, 'show']);

Route::get('/portfolios', [PortfolioController::class, 'index']);
Route::get('/portfolios/{slug}', [PortfolioController::class, 'show']);

Route::get('/services', [ServiceController::class, 'index']);
Route::get('/services/{slug}', [ServiceController::class, 'show']);

Route::get('/team', [TeamController::class, 'index']);
Route::get('/team/{id}', [TeamController::class, 'show']);

Route::get('/testimonials', [TestimonialController::class, 'index']);
Route::get('/testimonials/{id}', [TestimonialController::class, 'show']);

Route::get('/settings', [SettingController::class, 'index']);
Route::post('/settings/clear-cache', [SettingController::class, 'clearCache']); // This is public? It was in public block before.
Route::get('/media', [MediaController::class, 'index']);

Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/categories/{id}', [CategoryController::class, 'show']);
Route::get('/portfolio-categories', [CategoryController::class, 'indexPortfolio']);
Route::get('/demo-categories', [CategoryController::class, 'indexDemo']);

// New Entities Public
Route::get('/leads', [LeadController::class, 'index']);
Route::post('/leads', [LeadController::class, 'store']);

Route::post('/marketing/track', [MarketingController::class, 'track']);
Route::get('/marketing/contacts', [MarketingController::class, 'contacts']);
Route::post('/marketing/contacts', [MarketingController::class, 'storeContact']);

Route::get('/demos', [DemoController::class, 'index']);
Route::get('/demos/{id}', [DemoController::class, 'show']);

Route::get('/awards', [AwardController::class, 'index']);
Route::get('/awards/{id}', [AwardController::class, 'show']);

Route::get('/clients', [ClientController::class, 'index']);
Route::get('/clients/{id}', [ClientController::class, 'show']);
Route::get('/redirects', [RedirectController::class, 'index']);

Route::get('/menus', [MenuController::class, 'index']);

// Analytics & SEO
Route::get('/analytics/dashboard', [AnalyticsController::class, 'dashboard']); // Check if this should be protected? It was public before.

Route::match(['get', 'post'], '/seo-content/analyze', [SeoController::class, 'analyze']);
