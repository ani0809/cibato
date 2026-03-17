<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Team;

class TeamController extends Controller
{
    public function index()
    {
        return Team::all();
    }

    public function show($id)
    {
        $team = Team::where('id', $id)
            ->orWhere('uuid', $id)
            ->first();
        
        if (!$team) return response()->json(['message' => 'Not found'], 404);
        
        return $team;
    }

    public function store(Request $request)
    {
        return Team::create($request->all());
    }

    public function update(Request $request, string $id)
    {
        $team = Team::where('uuid', $id)->first();
        if (!$team) {
            return response()->json(['message' => 'Team member not found'], 404);
        }

        $team->update($request->all());

        $out = $team->fresh()->toArray();
        $out['id'] = $team->uuid;
        return response()->json($out);
    }

    public function destroy($id)
    {
        $team = Team::where('id', $id)->orWhere('uuid', $id)->first();
        if ($team) $team->delete();
        return response()->json(['message' => 'Team member moved to trash']);
    }

    public function trash()
    {
        return Team::onlyTrashed()->get();
    }

    public function restore($id)
    {
        $team = Team::withTrashed()->where('id', $id)->orWhere('uuid', $id)->first();
        if ($team) {
            $team->restore();
            return response()->json(['message' => 'Team member restored']);
        }
        return response()->json(['message' => 'Team member not found'], 404);
    }

    public function forceDelete($id)
    {
        $team = Team::withTrashed()->where('id', $id)->orWhere('uuid', $id)->first();
        if ($team) {
            $team->forceDelete();
            return response()->json(['message' => 'Team member permanently deleted']);
        }
        return response()->json(['message' => 'Team member not found'], 404);
    }
}

