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
        Schema::create('workout_schedules', function (Blueprint $table) {
            $table->id();
            $table->foreignId('workout_type_id')->constrained()->onDelete('cascade');
            $table->foreignId('trainer_id')->constrained('users')->onDelete('cascade');
            $table->dateTime('start_time');
            $table->dateTime('end_time');
            $table->integer('available_slots');
            $table->integer('booked_slots')->default(0);
            $table->enum('status', ['scheduled', 'completed', 'cancelled'])->default('scheduled');
            $table->timestamps();
        });
    }

    
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('workout_schedules');
    }
};
