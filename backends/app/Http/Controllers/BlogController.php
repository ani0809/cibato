<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Blog;
use Illuminate\Support\Str;

class BlogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Blog::all()->map(function ($blog) {
             $data = $blog->toArray();
             $data['id'] = $blog->uuid; // Output uuid as id
             unset($data['uuid']);
             return $data;
        });
    }

    /**
     * Display the specified resource.
     */
    public function show($idOrSlug)
    {
        $blog = Blog::where('uuid', $idOrSlug)
            ->orWhere('slug', $idOrSlug)
            ->first();

        if (!$blog) {
             // Fallback logic: check if slug matches slugified title (Node behavior legacy support)
             // Node: const slug = b.slug || createSlug(b.title); return slug === param;
             // We can't easily do this in SQL efficiently. But with small data, we could fetch all.
             // Better: Assume specific routes work.
             return response()->json(['message' => 'Blog not found'], 404);
        }

        $data = $blog->toArray();
        $data['id'] = $blog->uuid;
        unset($data['uuid']);
        return $data;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->all();
        $data['uuid'] = (string) Str::uuid();
        
        $blog = Blog::create($data);

        $out = $blog->toArray();
        $out['id'] = $blog->uuid;
        unset($out['uuid']);
        return response()->json($out, 201);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $blog = Blog::where('uuid', $id)->first();
        if (!$blog) {
            return response()->json(['message' => 'Blog not found'], 404);
        }

        // Remove slug from update data if it is null
        $data = $request->all();
        if (array_key_exists('slug', $data) && is_null($data['slug'])) {
            unset($data['slug']);
        }

        $blog->update($data);

        $out = $blog->fresh()->toArray();
        $out['id'] = $blog->uuid;
        unset($out['uuid']);
        return response()->json($out);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $blog = Blog::withoutTrashed()->where('uuid', $id)->first();
        if ($blog) {
            $blog->delete();
        }
        return response()->json(['message' => 'Blog moved to trash']);
    }

    public function trash()
    {
        return Blog::onlyTrashed()
            ->get()
            ->map(function ($blog) {
                $data = $blog->toArray();
                $data['id'] = $blog->uuid;
                unset($data['uuid']);
                return $data;
            });
    }

    public function restore($id)
    {
        $blog = Blog::withTrashed()->where('uuid', $id)->first();
        if ($blog) {
            $blog->restore();
            return response()->json(['message' => 'Blog restored']);
        }
        return response()->json(['message' => 'Blog not found'], 404);
    }

    public function forceDelete($id)
    {
        $blog = Blog::withTrashed()->where('uuid', $id)->first();
        if ($blog) {
            $blog->forceDelete();
            return response()->json(['message' => 'Blog permanently deleted']);
        }
        return response()->json(['message' => 'Blog not found'], 404);
    }
}

