<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    protected $fillable = [
        'user_id',
        'workout_schedule_id',
        'membership_id',
        'status'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function workoutSchedule()
    {
        return $this->belongsTo(WorkoutSchedule::class);
    }

    public function membership()
    {
        return $this->belongsTo(Membership::class);
    }
}
