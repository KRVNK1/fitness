<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Membership extends Model
{
    protected $fillable = [
        'user_id',
        'membership_type_id',
        'start_date',
        'end_date',
        'status',
    ];

    protected $casts = [
        'start_date'  => 'datetime',
        'end_date'    => 'datetime',
    ];

    public function membershipType()
    {
        return $this->belongsTo(MembershipType::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }
}