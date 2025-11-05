<?php

namespace App\Service\Booking;

use App\Http\Resources\this\BookingUserResource;
use App\Http\Resources\Trainer\WorkoutResource;
use App\Models\Booking;
use App\Models\WorkoutSchedule;

class AttendanceService
{
    /**
     * Получить тренировку с информацией об участниках
     */
    public function getWorkoutWithAttendees(int $workoutScheduleId, int $trainerId)
    {
        $workout = WorkoutSchedule::with([
            'workoutType.workoutCategory',
            'bookings.user'
        ])->findOrFail($workoutScheduleId);

        if ($workout->trainer_id !== $trainerId) {
            return back()->with('error', 'Нет доступа к этой тренировке');
        }

        return new WorkoutResource($workout);
    }

    /**
     * Получить список участников тренировки
     */
    public function getWorkoutAttendees(int $workoutScheduleId, int $trainerId)
    {
        $workout = WorkoutSchedule::findOrFail($workoutScheduleId)
            ->with('bookings.user');

        if ($workout->trainer_id !== $trainerId) {
            return back()->with('error', 'Нет доступа к этой тренировке');
        }

        return new BookingUserResource($workout);
    }

    /**
     * Обновить статус присутствия
     */
    public function updateAttendanceStatus(int $bookingId, string $status, int $trainerId)
    {
        $booking = Booking::with('workoutSchedule')
            ->findOrFail($bookingId);

        if ($booking->workoutSchedule->trainer_id !== $trainerId) {
            return back()->with('error', 'Нет доступа к изменению статуса');
        }

        $booking->update(['status' => $status]);
    }
}
