<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TrainerCategory extends Model
{
    protected $table = 'trainer_categories';

    protected $fillable = [
        'trainer_info_id',
        'workout_category_id',
    ];

    public function trainerInfo()
    {
        return $this->belongsTo(TrainerInfo::class);
    }

    public function workoutCategory()
    {
        return $this->belongsTo(WorkoutCategory::class);
    }
}
