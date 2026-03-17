<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Client;

class ClientController extends Controller
{
    public function index()
    {
        return Client::all();
    }

    public function show($id)
    {
        return Client::findOrFail($id);
    }

    public function store(Request $request)
    {
        return Client::create($request->all());
    }

    public function update(Request $request, $id)
    {
         $c = Client::findOrFail($id);
         $c->update($request->all());
         return $c;
    }

    public function destroy($id)
    {
        Client::destroy($id);
        return response()->json(['message' => 'Deleted']);
    }
}

