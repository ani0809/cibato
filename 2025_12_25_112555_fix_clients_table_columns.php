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
        Schema::table('clients', function (Blueprint $table) {
             // Check if columns exist before adding/renaming to be safe
             // Assuming clients table has 'name', 'logo', 'url' based on model inspection
             // If they are missing, add them.
             if (!Schema::hasColumn('clients', 'logo')) {
                 $table->string('logo')->nullable();
             }
             if (!Schema::hasColumn('clients', 'url')) {
                 $table->string('url')->nullable();
             }
             // Ensure name exists
             if (!Schema::hasColumn('clients', 'name')) {
                 $table->string('name');
             }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('clients', function (Blueprint $table) {
            //
        });
    }
};
