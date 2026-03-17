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
        Schema::create('leads', function (Blueprint $table) {
            $table->id(); // Use AutoIncrement
            $table->string('name');
            $table->string('email');
            $table->string('phone')->nullable();
            $table->string('service')->nullable();
            $table->text('message');
            $table->string('status')->default('new');
            $table->timestamps();
        });

        Schema::create('marketing_contacts', function (Blueprint $table) {
            $table->id();
            $table->string('name')->default('Unknown');
            $table->string('email')->unique();
            $table->string('category')->default('General');
            $table->string('source')->default('manual');
            $table->timestamp('added_at')->useCurrent();
            $table->timestamps();
        });

        Schema::create('demo_categories', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->timestamps();
        });

        Schema::create('demos', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique(); // Add UUID
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('category')->nullable(); // Denormalized or Relation? Node used strings.
            $table->string('image')->nullable();
            $table->string('url')->nullable();
            $table->string('type')->default('free'); // free/premium
            $table->timestamps();
        });

        Schema::create('awards', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('image');
            $table->string('year')->nullable();
            $table->timestamps();
        });

        Schema::create('clients', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('logo');
            $table->string('url')->nullable();
            $table->timestamps();
        });

        Schema::create('redirects', function (Blueprint $table) {
            $table->id();
            $table->string('from')->unique();
            $table->string('to');
            $table->string('type')->default('301');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('redirects');
        Schema::dropIfExists('clients');
        Schema::dropIfExists('awards');
        Schema::dropIfExists('demos');
        Schema::dropIfExists('demo_categories');
        Schema::dropIfExists('marketing_contacts');
        Schema::dropIfExists('leads');
    }
};
