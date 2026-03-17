<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Portfolio;
use Illuminate\Support\Str;

class PortfolioController extends Controller
{
    public function index()
    {
        return Portfolio::all()->map(function ($p) {
             $data = $p->toArray();
             $data['id'] = $p->uuid;
             unset($data['uuid']);
             return $data;
        });
    }

    public function show($idOrSlug)
    {
        $p = Portfolio::where('uuid', $idOrSlug)
            ->orWhere('slug', $idOrSlug)
            ->first();

        if (!$p) return response()->json(['message' => 'Not found'], 404);

        $data = $p->toArray();
        $data['id'] = $p->uuid;
        unset($data['uuid']);
        return $data;
    }

    public function store(Request $request)
    {
        $data = $request->all();
        $data['uuid'] = (string) Str::uuid();
        $p = Portfolio::create($data);
        
        $out = $p->toArray();
        $out['id'] = $p->uuid;
        return response()->json($out, 201);
    }

    public function update(Request $request, string $id)
    {
        $p = Portfolio::where('uuid', $id)->first();
        if (!$p) return response()->json(['message' => 'Not found'], 404);
        
        $data = $request->all();
        if (array_key_exists('slug', $data) && is_null($data['slug'])) {
             unset($data['slug']);
        }
        $p->update($data);
        $out = $p->fresh()->toArray();
        $out['id'] = $p->uuid;
        return response()->json($out);
    }

    public function destroy(string $id)
    {
        $p = Portfolio::where('uuid', $id)->first();
        if ($p) $p->delete();
        return response()->json(['message' => 'Portfolio item moved to trash']);
    }

    public function trash()
    {
        return Portfolio::onlyTrashed()->get()->map(function ($p) {
             $data = $p->toArray();
             $data['id'] = $p->uuid;
             unset($data['uuid']);
             return $data;
        });
    }

    public function restore($id)
    {
        $p = Portfolio::withTrashed()->where('uuid', $id)->first();
        if ($p) {
            $p->restore();
            return response()->json(['message' => 'Portfolio item restored']);
        }
        return response()->json(['message' => 'Portfolio item not found'], 404);
    }

    public function forceDelete($id)
    {
        $p = Portfolio::withTrashed()->where('uuid', $id)->first();
        if ($p) {
            $p->forceDelete();
            return response()->json(['message' => 'Portfolio item permanently deleted']);
        }
        return response()->json(['message' => 'Portfolio item not found'], 404);
    }
}

