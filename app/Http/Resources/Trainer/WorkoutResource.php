<?php

namespace App\Http\Resources\Trainer;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class WorkoutResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray(Request $request): array
    {
        $bookings = $this->bookings;

        return [
            'id' => $this->id,
            'start_time' => $this->start_time,
            'end_time' => $this->end_time,
            'workout_type' => $this->workoutType->name,
            'category' => $this->workoutType->workoutCategory->name,
            'attendees' => AttendanceResource::collection($bookings)
        ];
    }
}
