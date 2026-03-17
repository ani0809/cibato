<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Page;
use Illuminate\Support\Str;

class PageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Return summary
        return Page::select('id', 'title', 'slug', 'seo', 'updated_at as updatedAt')
            ->get();
    }

    /**
     * Display the specified resource.
     */
    public function show($idOrSlug)
    {
        $page = Page::where('uuid', $idOrSlug)
            ->orWhere('slug', $idOrSlug)
            ->orWhere('id', $idOrSlug)
            ->first();

        if (!$page) {
            return response()->json(['message' => 'Page not found'], 404);
        }

        // Return full page data
        $data = $page->toArray();
        // $data['id'] = $page->uuid; // REMOVED: Use native ID
        return $data;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
        ]);

        $slug = $request->slug ?? Str::slug($request->title);
        if (Page::where('slug', $slug)->exists()) {
             return response()->json(['message' => 'Slug already exists'], 400);
        }

        $page = Page::create([
            'uuid' => (string) Str::uuid(),
            'title' => $request->title,
            'slug' => $slug,
            'content' => [],
            'sections' => [],
        ]);

        $data = $page->toArray();
        return response()->json($data, 201);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        \Illuminate\Support\Facades\Log::info('PageController@update: Entry', [
            'id_param' => $id,
            'request_all' => $request->all(),
            'content_raw' => $request->json('content'),
        ]);

        $page = Page::where('id', $id)->orWhere('uuid', $id)->orWhere('slug', $id)->first();

        if (!$page) {
             \Illuminate\Support\Facades\Log::error('PageController@update: Page Not Found', ['id' => $id]);
            return response()->json(['message' => 'Page not found'], 404);
        }

        // Handle title specifically if it exists in payload
        if ($request->has('title')) {
            $page->title = $request->input('title');
        }

        // Content Processing: Ensure we assign an ARRAY to the model, because $casts['content'] = 'array'
        $content = $request->input('content');
        $decodedContent = null;

        if (isset($content)) {
            if (is_string($content)) {
                 $decodedContent = json_decode($content, true);
            } else {
                 $decodedContent = $content;
            }
            
            // Assign the ARRAY to the model. 
            // Laravel will automatically json_encode this due to protected $casts = ['content' => 'array'];
            $page->content = $decodedContent;
        }

        // Update other fields from the request, excluding 'title', 'content', 'id', 'uuid', and 'slug' if it is null
        $otherData = $request->except(['title', 'content', 'id', 'uuid']);
        
        // Only update slug if it is provided and not null
        if ($request->has('slug') && is_null($request->input('slug'))) {
             unset($otherData['slug']);
        }

        $page->fill($otherData);

        $page->save(); // Save everything
        
        \Illuminate\Support\Facades\Log::info('PageController@update: Page Saved', ['page_id' => $page->id, 'content_type_saved' => gettype($page->content)]);
        
        \Illuminate\Support\Facades\Log::info('PageController@update: Page Saved', ['page_id' => $page->id]);

        // Sync PageImages
        if (is_array($decodedContent)) {
             \App\Models\PageImage::where('page_id', $page->id)->delete();
             
             // Extract images recursively
            $walk = function ($data, $prefix = '') use ($page, &$walk) {
                foreach ($data as $key => $value) {
                    if (is_array($value)) {
                         if (isset($value['imgUrl']) && is_string($value['imgUrl'])) {
                            $path = $value['imgUrl'];
                            $filename = basename($path);
                            // Clean path if needed
                             if (str_contains($path, 'localhost:5000')) {
                                 $path = str_replace('http://localhost:5000', '', $path);
                             }

                            // Use firstOrCreate to avoid duplicates if needed, or just create
                            // Check media by filename to link
                            $media = \App\Models\Media::where('filename', $filename)->first();
                            
                            \App\Models\PageImage::create([
                                'page_id' => $page->id,
                                'media_id' => $media ? $media->id : null,
                                'key' => $key,
                                'image_path' => $path,
                                'order' => 0 
                            ]);
                         } else {
                             $walk($value);
                         }
                    }
                }
            };
            $walk($decodedContent);
             \Illuminate\Support\Facades\Log::info('PageController@update: Images Synced');
        }
        
        $data = $page->fresh()->toArray();
        // $data['id'] = $page->uuid; // REMOVED: Return native ID
        return response()->json($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
         $page = Page::where('uuid', $id)
            ->orWhere('slug', $id)
            ->orWhere('id', $id)
            ->first();
         if ($page) {
             $page->delete();
         }
         return response()->json(['message' => 'Page moved to trash']);
    }

    /**
     * Display a listing of trashed resources.
     */
    public function trash()
    {
        return Page::onlyTrashed()
            ->select('id', 'title', 'slug', 'deleted_at as deletedAt')
            ->get();
    }

    /**
     * Restore the specified resource from trash.
     */
    public function restore($id)
    {
        $page = Page::withTrashed()
            ->where('id', $id)
            ->orWhere('uuid', $id)
            ->first();

        if ($page) {
            $page->restore();
            return response()->json(['message' => 'Page restored']);
        }
        return response()->json(['message' => 'Page not found'], 404);
    }

    /**
     * Permanently remove the specified resource from storage.
     */
    public function forceDelete($id)
    {
        $page = Page::withTrashed()
            ->where('id', $id)
            ->orWhere('uuid', $id)
            ->first();

        if ($page) {
            $page->forceDelete();
             return response()->json(['message' => 'Page permanently deleted']);
        }
        return response()->json(['message' => 'Page not found'], 404);
    }
}

