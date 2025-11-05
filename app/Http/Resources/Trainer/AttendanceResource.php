<?php

namespace App\Http\Resources\Trainer;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AttendanceResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'booking_id' => $this->id,
            'user_id' => $this->user_id,
            'first_name' => $this->user->first_name,
            'last_name' => $this->user->last_name,
            'email' => $this->user->email,
            'phone' => $this->user->phone,
            'status' => $this->status,
        ];
    }
}
