<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Category;
use Illuminate\Support\Str;

class CategoryController extends Controller
{
    public function index()
    {
        return Category::all();
    }

    public function indexPortfolio()
    {
        return Category::where('type', 'portfolio')->get();
    }

    public function storePortfolio(Request $request)
    {
        $request->validate(['name' => 'required']);
        $slug = $request->slug ?? Str::slug($request->name);
        
        $cat = Category::create([
            'name' => $request->name,
            'slug' => $slug,
            'type' => 'portfolio'
        ]);
        return response()->json($cat, 201);
    }

    public function indexDemo()
    {
        return Category::where('type', 'demo')->get();
    }

    public function storeDemo(Request $request)
    {
        $request->validate(['name' => 'required']);
        $slug = $request->slug ?? Str::slug($request->name);
        
        $cat = Category::create([
            'name' => $request->name,
            'slug' => $slug,
            'type' => 'demo'
        ]);
        return response()->json($cat, 201);
    }

    public function store(Request $request)
    {
        $request->validate(['name' => 'required']);
        
        $slug = $request->slug ?? Str::slug($request->name);
        
        $cat = Category::create([
            'name' => $request->name,
            'slug' => $slug,
            'type' => $request->type ?? 'general'
        ]);
        
        return response()->json($cat, 201);
    }

    public function update(Request $request, $id)
    {
        $cat = Category::findOrFail($id);
        $cat->update($request->all());
        return response()->json($cat);
    }

    public function destroy($id)
    {
        Category::destroy($id);
        return response()->json(['message' => 'Deleted']);
    }
}

