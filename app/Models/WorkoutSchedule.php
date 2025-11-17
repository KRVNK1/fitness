<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WorkoutSchedule extends Model
{
    protected $fillable = [
        'workout_type_id',
        'trainer_id',
        'start_time',
        'end_time',
        'available_slots',
        'booked_slots',
        'status',
    ];

    protected $casts = [
        'start_time' => 'datetime:Y-m-d\TH:i',
        'end_time' => 'datetime:Y-m-d\TH:i',
    ];

    public function workoutCategory()
    {
        return $this->belongsTo(WorkoutCategory::class);
    }

    public function workoutType()
    {
        return $this->belongsTo(WorkoutType::class);
    }

    public function trainer()
    {
        return $this->belongsTo(User::class, 'trainer_id');
    }

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'bookings')
            ->withTimestamps();
    }
}
