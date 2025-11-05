<?php

namespace App\Http\Resources\this;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BookingUserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'booking_id' => $this->id,
            'user' => [
                'id' => $this->user->id,
                'first_name' => $this->user->first_name,
                'last_name' => $this->user->last_name,
            ],
            'status' => $this->status,
        ];
    }
}
