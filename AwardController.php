<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Award;

class AwardController extends Controller
{
    public function index()
    {
        return Award::all();
    }

    public function show($id)
    {
        return Award::findOrFail($id);
    }

    public function store(Request $request)
    {
        return Award::create($request->all());
    }

    public function update(Request $request, $id)
    {
         $a = Award::findOrFail($id);
         $a->update($request->all());
         return $a;
    }

    public function destroy($id)
    {
        Award::destroy($id);
        return response()->json(['message' => 'Deleted']);
    }
}

