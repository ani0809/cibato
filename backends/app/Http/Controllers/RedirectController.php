<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Redirect;

class RedirectController extends Controller
{
    public function index()
    {
        return Redirect::all();
    }

    public function store(Request $request)
    {
        return Redirect::create($request->all());
    }

    public function update(Request $request, $id)
    {
         $r = Redirect::findOrFail($id);
         $r->update($request->all());
         return $r;
    }

    public function destroy($id)
    {
        Redirect::destroy($id);
        return response()->json(['message' => 'Deleted']);
    }
}

