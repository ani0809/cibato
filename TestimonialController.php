<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Testimonial;

class TestimonialController extends Controller
{
    public function index()
    {
        return Testimonial::all();
    }

    public function show($id)
    {
        return Testimonial::findOrFail($id);
    }

    public function store(Request $request)
    {
        return Testimonial::create($request->all());
    }

    public function update(Request $request, $id)
    {
        $testimonial = Testimonial::findOrFail($id);
        $testimonial->update($request->all());
        return $testimonial;
    }

    public function destroy($id)
    {
        Testimonial::destroy($id);
        return response()->json(['message' => 'Deleted']);
    }
}

