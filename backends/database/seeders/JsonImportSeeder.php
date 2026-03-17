<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Carbon\Carbon;

class JsonImportSeeder extends Seeder
{
    private function parseDate($date)
    {
        if (!$date) return now();
        try {
            return Carbon::parse($date)->toDateTimeString();
        } catch (\Exception $e) {
            return now();
        }
    }

    public function run()
    {
        $jsonDir = base_path('../server/data'); // Adjust path to server/data

        // 1. Users
        $this->importUsers($jsonDir);

        // 2. Pages
        $this->importPages($jsonDir);

        // 3. Blogs
        $this->importBlogs($jsonDir);

        // 4. Portfolios
        $this->importPortfolios($jsonDir);

        // 5. Services
        $this->importServices($jsonDir);

        // 6. Team
        $this->importTeam($jsonDir);

        // 7. Testimonials
        $this->importTestimonials($jsonDir);

        // 8. Settings & Menus
        $this->importSettings($jsonDir);

        // 9. Categories
        $this->importCategories($jsonDir);

        // 10. Demos
        $this->importDemos($jsonDir);

        // 11. Leads
        $this->importLeads($jsonDir);

        // 12. Marketing Contacts
        $this->importMarketing($jsonDir);
    }

    private function getJson($path)
    {
        if (!File::exists($path)) return [];
        return json_decode(File::get($path), true);
    }

    private function importUsers($dir)
    {
        $users = $this->getJson("$dir/users.json");
        foreach ($users as $u) {
            DB::table('users')->updateOrInsert(
                ['email' => $u['email']],
                [
                    'name' => $u['name'],
                    'username' => $u['username'],
                    'password' => Hash::make($u['password']),
                    'role' => $u['role'],
                    'avatar' => $u['image'] ?? null,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]
            );
        }
    }

    private function importPages($dir)
    {
        $pages = $this->getJson("$dir/pages.json");
        foreach ($pages as $p) {
            DB::table('pages')->updateOrInsert(
                ['slug' => $p['slug']],
                [
                    'uuid' => $p['id'] ?? Str::uuid(),
                    'title' => $p['title'],
                    'content' => json_encode($p['content'] ?? []),
                    'sections' => json_encode($p['sections'] ?? []),
                    'seo' => json_encode($p['seo'] ?? []),
                    'created_at' => $this->parseDate($p['createdAt'] ?? null),
                    'updated_at' => $this->parseDate($p['updatedAt'] ?? null),
                ]
            );
        }
    }

    private function importBlogs($dir)
    {
        $blogs = $this->getJson("$dir/blogs.json");
        foreach ($blogs as $b) {
            $slug = $b['slug'] ?? Str::slug($b['title']);
            DB::table('blogs')->updateOrInsert(
                ['slug' => $slug],
                [
                    'uuid' => $b['id'] ?? Str::uuid(),
                    'title' => $b['title'],
                    'category' => $b['category'] ?? 'Uncategorized',
                    'author' => $b['author'] ?? 'Admin',
                    'excerpt' => $b['excerpt'] ?? '',
                    'content' => $b['content'] ?? '',
                    'image' => $b['image'] ?? null,
                    'seo' => json_encode($b['seo'] ?? []),
                    'created_at' => $this->parseDate($b['createdAt'] ?? null),
                    'updated_at' => now(), // Blog json usually only has createdAt
                ]
            );
        }
    }

    private function importPortfolios($dir)
    {
        $items = $this->getJson("$dir/portfolios.json");
        foreach ($items as $i) {
            DB::table('portfolios')->updateOrInsert(
                ['slug' => $i['slug']],
                [
                    'uuid' => $i['id'] ?? Str::uuid(),
                    'title' => $i['title'],
                    'category' => $i['category'] ?? 'General',
                    'technologies' => json_encode($i['technologies'] ?? []),
                    'description' => $i['description'] ?? '',
                    'image' => $i['image'] ?? null,
                    'url' => $i['url'] ?? null,
                    'client' => $i['client'] ?? null,
                    'duration' => $i['duration'] ?? null,
                    'challenge' => $i['challenge'] ?? null,
                    'solution' => $i['solution'] ?? null,
                    'created_at' => $this->parseDate($i['createdAt'] ?? null),
                    'updated_at' => now(),
                ]
            );
        }
    }

    private function importServices($dir)
    {
        $items = $this->getJson("$dir/services.json");
        foreach ($items as $i) {
            DB::table('services')->updateOrInsert(
                ['title' => $i['title']],
                [
                    'icon' => $i['icon'] ?? '',
                    'description' => $i['description'] ?? '',
                    'link' => $i['link'] ?? '#',
                    'gradient' => $i['gradient'] ?? '',
                    'shadow' => $i['shadow'] ?? '',
                ]
            );
        }
    }

    private function importTeam($dir)
    {
        $items = $this->getJson("$dir/team.json");
        foreach ($items as $i) {
            DB::table('team')->updateOrInsert(
                ['name' => $i['name']],
                [
                    'role' => $i['role'],
                    'bio' => $i['bio'] ?? '',
                    'image' => $i['image'] ?? '',
                    'socials' => json_encode($i['socials'] ?? []),
                ]
            );
        }
    }

    private function importTestimonials($dir)
    {
        $items = $this->getJson("$dir/testimonials.json");
        foreach ($items as $i) {
            DB::table('testimonials')->updateOrInsert(
                ['name' => $i['name']],
                [
                    'position' => $i['position'] ?? '',
                    'text' => $i['text'] ?? '',
                    'image' => $i['image'] ?? '',
                    'rating' => $i['rating'] ?? 5,
                ]
            );
        }
    }

    private function importSettings($dir)
    {
        $settings = $this->getJson("$dir/settings.json");
        foreach ($settings as $k => $v) {
            DB::table('settings')->updateOrInsert(
                ['key' => $v['key']],
                [
                    'value' => $v['value'] ?? '', // Handle missing value? Or check structure.
                    'group' => $v['group'] ?? 'general',
                ]
            );
        }

        $mainMenu = $this->getJson("$dir/menus.json");
        DB::table('settings')->updateOrInsert(
            ['key' => 'main_menu'],
            ['value' => json_encode($mainMenu), 'group' => 'menus']
        );

        $footerMenu = $this->getJson("$dir/footer_menus.json");
        DB::table('settings')->updateOrInsert(
            ['key' => 'footer_menu'],
            ['value' => json_encode($footerMenu), 'group' => 'menus']
        );
        
        $smtp = $this->getJson("$dir/smtp.json");
        $smtpMap = [
            'host' => 'smtp_host',
            'port' => 'smtp_port',
            'username' => 'smtp_user',
            'password' => 'smtp_pass',
            'fromEmail' => 'smtp_from_email',
            'fromName' => 'smtp_from_name'
        ];
        
        foreach ($smtpMap as $jsonKey => $dbKey) {
            if (isset($smtp[$jsonKey])) {
                DB::table('settings')->updateOrInsert(
                    ['key' => $dbKey],
                    ['value' => $smtp[$jsonKey], 'group' => 'smtp']
                );
            }
        }
    }

    private function importCategories($dir)
    {
        $items = $this->getJson("$dir/categories.json");
        foreach ($items as $i) {
            DB::table('categories')->updateOrInsert(
                ['slug' => $i['slug']],
                ['name' => $i['name']]
            );
        }
    }

    private function importDemos($dir)
    {
        $items = $this->getJson("$dir/demos.json");
        foreach ($items as $i) {
             DB::table('demos')->updateOrInsert(
                ['slug' => $i['slug']],
                [
                    'uuid' => $i['id'] ?? Str::uuid(),
                    'title' => $i['title'],
                    'category' => $i['category'],
                    'image' => $i['image'],
                    'url' => $i['url'],
                    'created_at' => $this->parseDate($i['createdAt'] ?? null),
                ]
            );
        }
    }

    private function importLeads($dir)
    {
        $items = $this->getJson("$dir/leads.json");
        foreach ($items as $i) {
             DB::table('leads')->insertOrIgnore([
                 'name' => $i['name'],
                 'email' => $i['email'],
                 'phone' => $i['phone'] ?? null,
                 'service' => $i['service'] ?? null,
                 'message' => $i['message'],
                 'status' => $i['status'] ?? 'new',
                 'created_at' => $this->parseDate($i['createdAt'] ?? null),
             ]);
        }
    }

    private function importMarketing($dir)
    {
        $contacts = $this->getJson("$dir/marketing_contacts.json");
        foreach ($contacts as $c) {
            DB::table('marketing_contacts')->updateOrInsert(
                ['email' => $c['email']],
                [
                    'name' => $c['name'] ?? 'Unknown',
                    'category' => $c['category'] ?? 'General',
                    'source' => $c['source'] ?? 'manual',
                    'added_at' => $this->parseDate($c['addedAt'] ?? null),
                ]
            );
        }
    }
}
