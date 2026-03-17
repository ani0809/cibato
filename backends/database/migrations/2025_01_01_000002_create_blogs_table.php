<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('blogs', function (Blueprint $table) {
            $table->id(); // Use AI ID or UUID? Node IDs are UUIDs.
            // Let's use string UUID for Primary Key to match existing data exactly
            // Actually, best practice in Laravel is BigInt id, and separate uuid column.
            // But strict migration says "No Logic Refactor".
            // If the frontend uses these IDs in URLs, we MUST preserve them.
            // Node Example: "45775603-f70e-45bc..."
            $table->uuid('uuid')->unique(); // We'll map Node ID to this
            $table->string('title');
            $table->string('slug')->nullable(); // Computed from title in Node, logic needs migration
            $table->string('category')->nullable(); // Denormalized string in JSON
            $table->string('author')->nullable(); // Add Author
            $table->text('excerpt')->nullable();
            $table->longText('content')->nullable();
            $table->string('image')->nullable();
            $table->json('seo')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('blogs');
    }
};
