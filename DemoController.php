<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Demo;
use Illuminate\Support\Str;

class DemoController extends Controller
{
    public function index()
    {
        return Demo::all();
    }

    public function show($id)
    {
        return Demo::where('id', $id)->orWhere('slug', $id)->firstOrFail();
    }

    public function store(Request $request)
    {
        $request->validate(['title' => 'required']);
        $slug = $request->slug ?? Str::slug($request->title);
        
        $demo = Demo::create(array_merge($request->all(), [
            'slug' => $slug,
            'uuid' => (string) Str::uuid()
        ]));
        return response()->json($demo, 201);
    }

    public function update(Request $request, $id)
    {
        $demo = Demo::findOrFail($id);
        $demo->update($request->all());
        return $demo;
    }

    public function destroy($id)
    {
        $demo = Demo::where('id', $id)->orWhere('uuid', $id)->first();
        if ($demo) $demo->delete();
        return response()->json(['message' => 'Demo moved to trash']);
    }

    public function trash()
    {
        return Demo::onlyTrashed()->get();
    }

    public function restore($id)
    {
        $demo = Demo::withTrashed()->where('id', $id)->orWhere('uuid', $id)->first();
        if ($demo) {
            $demo->restore();
            return response()->json(['message' => 'Demo restored']);
        }
        return response()->json(['message' => 'Demo not found'], 404);
    }

    public function forceDelete($id)
    {
        $demo = Demo::withTrashed()->where('id', $id)->orWhere('uuid', $id)->first();
        if ($demo) {
            $demo->forceDelete();
            return response()->json(['message' => 'Demo permanently deleted']);
        }
        return response()->json(['message' => 'Demo not found'], 404);
    }
}

