<?php

namespace App\Http\Resources\Booking;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BookingResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $schedule = $this->workoutSchedule;

        return [
            'workout_name' => $schedule->workoutType->name ?? 'Неизвестно',
            'trainer_name' => $schedule->trainer
                ? "{$schedule->trainer->first_name} {$schedule->trainer->last_name}"
                : 'Не назначен',
            'start_time' => $schedule->start_time ?? null,
            'end_time' => $schedule->end_time ?? null,
            'duration' => $schedule
                ? $schedule->start_time->diffInMinutes($schedule->end_time)
                : 0,
            'type' => $schedule && $schedule->available_slots == 1
                ? 'individual'
                : 'group',
            'status' => $this->status,
            'created_at' => $this->created_at,
        ];
    }
}
