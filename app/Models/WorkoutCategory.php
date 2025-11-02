<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WorkoutCategory extends Model
{
    protected $fillable = [
        'name',
        'slug',
    ];

    public function workoutTypes()
    {
        return $this->hasMany(WorkoutType::class);
    }

    public function workoutSchedules()
    {
        return $this->hasMany(WorkoutSchedule::class);
    }


    public function trainers()
    {
        return $this->belongsToMany(TrainerInfo::class, 'trainer_categories');
    }
}
