<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Media;

class MediaController extends Controller
{
    public function index()
    {
        return Media::orderBy('created_at', 'desc')->get()->map(function($media) {
            return [
                'id' => $media->id,
                'name' => $media->filename, // Frontend expects 'name'
                'filename' => $media->filename,
                'url' => "/uploads/{$media->filename}",
                'size' => file_exists(public_path("uploads/{$media->filename}")) ? filesize(public_path("uploads/{$media->filename}")) : 0,
                'date' => $media->created_at,
                'type' => pathinfo($media->filename, PATHINFO_EXTENSION),
                'alt' => $media->alt,
                'title' => $media->title,
                'dimensions' => $media->dimensions,
                'uploadedBy' => $media->uploaded_by
            ];
        });
    }

    public function store(Request $request)
    {
        $request->validate([
            'file' => 'required|file|max:10240', // 10MB max
        ]);

        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $originalName = $file->getClientOriginalName();
            $filename = time() . '-' . preg_replace('/[^a-zA-Z0-9\-\.]/', '', $originalName); // Sanitize
            
            // Move to public/uploads to match legacy structure
            $file->move(public_path('uploads'), $filename);
            
            // Get dimensions if image
            $dimensions = '';
            try {
                $imageSize = getimagesize(public_path("uploads/{$filename}"));
                if ($imageSize) {
                    $dimensions = "{$imageSize[0]} by {$imageSize[1]} pixels";
                }
            } catch (\Exception $e) {
                // Ignore if not image
            }

            $media = Media::create([
                'filename' => $filename,
                'alt' => '',
                'title' => $originalName,
                'dimensions' => $dimensions,
                'uploaded_by' => $request->user() ? $request->user()->name : 'Admin',
            ]);

            return response()->json([
                'name' => $media->filename,
                'url' => "/uploads/{$media->filename}", // Legacy format expectation
                'size' => filesize(public_path("uploads/{$filename}")),
                'date' => $media->created_at,
                'type' => $file->getClientOriginalExtension(),
                'alt' => $media->alt,
                'title' => $media->title,
                'dimensions' => $media->dimensions,
                'uploadedBy' => $media->uploaded_by
            ], 201);
        }

        return response()->json(['message' => 'No file uploaded'], 400);
    }
    
    public function destroy($id)
    {
        $media = Media::find($id);
        if (!$media) {
            // Try finding by filename if ID fails (legacy compatibility)
            $media = Media::where('filename', $id)->first();
        }

        if ($media) {
            $path = public_path("uploads/{$media->filename}");
            if (file_exists($path)) {
                unlink($path);
            }
            $media->delete();
            return response()->json(['message' => 'File deleted successfully']);
        }
        
        return response()->json(['message' => 'File not found'], 404);
    }

    public function update(Request $request, $id)
    {
        $media = Media::find($id);
        if (!$media) {
            $media = Media::where('filename', $id)->first();
        }

        if ($media) {
            $media->update($request->only(['alt', 'title']));
             return response()->json(['message' => 'Metadata updated', 'data' => $media]);
        }

        return response()->json(['message' => 'File not found'], 404);
    }
}

