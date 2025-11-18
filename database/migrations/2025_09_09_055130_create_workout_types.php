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
        Schema::create('workout_types', function (Blueprint $table) {
            $table->id();
            $table->foreignId('workout_category_id')->constrained()->onDelete('cascade');
            $table->string('name', 45);
            $table->string('slug', 45)->unique();
            $table->text('description')->nullable();
            $table->unsignedTinyInteger('duration_minutes');
            $table->unsignedTinyInteger('intensivity_level')->default(1); // 1-3 уровня
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('workout_types');
    }
};
