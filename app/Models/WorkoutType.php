<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WorkoutType extends Model
{
    protected $fillable = [
        'workout_category_id',
        'name',
        'slug',
        'description',
        'duration_minutes',
        'intensivity_level',
    ];

    public function workoutCategory()
    {
        return $this->belongsTo(WorkoutCategory::class);
    }
}
