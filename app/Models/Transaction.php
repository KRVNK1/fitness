<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    protected $fillable = [
        'user_id',
        'membership_type_id',
        'amount',
        'description',
        'months',
        'yookassa_payment_id',
        'status',
    ];

    public function membership()
    {
        return $this->belongsTo(Membership::class);
    }

    public function membershipType()
    {
        return $this->belongsTo(MembershipType::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
