<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('page_images', function (Blueprint $table) {
            $table->id();
            $table->foreignId('page_id')->constrained()->cascadeOnDelete();
            $table->unsignedBigInteger('media_id')->nullable(); // Optional link to media table
            $table->string('key')->index(); // e.g. 'hero'
            $table->string('image_path'); // Stores the path/filename used
            $table->integer('order')->default(0);
            $table->timestamps();

            // Foreign key for media if desired, but media table might use UUID or IDs. 
            // Assuming media.id is BigInt from previous audit.
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('page_images');
    }
};
