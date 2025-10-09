<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'password',
        'phone',
        'role',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function trainerInfo()
    {
        return $this->hasOne(TrainerInfo::class);
    }

    public function memberships()
    {
        return $this->hasOne(Membership::class);
    }

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }

    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }

    // Связь для тренеров с их расписанием
    public function workoutSchedules()
    {
        return $this->hasMany(WorkoutSchedule::class, 'trainer_id');
    }

    // Связь для пользователей с их заявками
    public function trainerRequests()
    {
        return $this->hasMany(UserRequest::class, 'user_id');
    }

    // Связь для тренеров для одобрения заявок
    public function incomingRequests()
    {
        return $this->hasMany(UserRequest::class, 'trainer_id');
    }
}
