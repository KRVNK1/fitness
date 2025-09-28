<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class TrainerRequest extends Model
{
    use HasFactory;

    // Массовое заполнение
    protected $fillable = [
        'user_id',
        'trainer_id',
        'requested_date',
        'status',
        'comment',
    ];

    protected $casts = [
        'requested_date' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function trainer()
    {
        return $this->belongsTo(User::class, 'trainer_id');
    }
}
