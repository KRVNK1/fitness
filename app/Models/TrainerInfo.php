<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TrainerInfo extends Model
{
    protected $fillable = [
        'user_id',
        'description',
        'experience_years',
        'photo'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function specializations()
    {
        return $this->belongsToMany(WorkoutCategory::class, 'trainer_categories');
    }
}
