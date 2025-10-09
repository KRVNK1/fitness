<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MembershipType extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'description',
        'price',
        'duration_days',
    ];

    protected $casts = [
        'features' => 'array',
    ];

    public function memberships()
    {
        return $this->hasMany(Membership::class);
    }
}
