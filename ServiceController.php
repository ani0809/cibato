<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Service;

class ServiceController extends Controller
{
    // Services uses INT IDs in JSON ("1", "2"). We mapped ID to ID (bigint).
    // So no need for UUID mapping here, default behavior is fine.

    public function index()
    {
        return Service::all();
    }

    public function show($id)
    {
        $s = Service::find($id);
        if (!$s) return response()->json(['message' => 'Not found'], 404);
        return $s;
    }

    public function store(Request $request)
    {
        // JSON IDs were "1". We should let AutoIncrement handle it? 
        // Or if import preserves IDs, we might need to be careful.
        // For new creation, standard create.
        $s = Service::create($request->all());
        return response()->json($s, 201);
    }

    public function update(Request $request, string $id)
    {
        $s = Service::find($id);
        if (!$s) return response()->json(['message' => 'Not found'], 404);
        // Remove slug from update data if it is null
        $data = $request->all();
        if (array_key_exists('slug', $data) && is_null($data['slug'])) {
            unset($data['slug']);
        }
        $s->update($data);
        return response()->json($s);
    }

    public function destroy(string $id)
    {
        $s = Service::find($id);
        if ($s) $s->delete();
        return response()->json(['message' => 'Service moved to trash']);
    }

    public function trash()
    {
        return Service::onlyTrashed()->get();
    }

    public function restore($id)
    {
        $s = Service::withTrashed()->find($id);
        if ($s) {
            $s->restore();
            return response()->json(['message' => 'Service restored']);
        }
        return response()->json(['message' => 'Service not found'], 404);
    }

    public function forceDelete($id)
    {
        $s = Service::withTrashed()->find($id);
        if ($s) {
            $s->forceDelete();
            return response()->json(['message' => 'Service permanently deleted']);
        }
        return response()->json(['message' => 'Service not found'], 404);
    }
}

