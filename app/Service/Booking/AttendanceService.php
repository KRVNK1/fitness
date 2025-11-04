<?php

namespace App\Service\Booking;

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

        // Проверяем, что это тренировка текущего тренера
        if ($workout->trainer_id !== $trainerId) {
            return back()->with('error', 'Нет доступа к этой тренировке');
        }

        return [
            'id' => $workout->id,
            'start_time' => $workout->start_time,
            'end_time' => $workout->end_time,
            'workout_type' => $workout->workoutType->name,
            'category' => $workout->workoutType->workoutCategory->name,
            'attendees' => $workout->bookings->map(function ($booking) {
                return [
                    'booking_id' => $booking->id,
                    'user_id' => $booking->user_id,
                    'first_name' => $booking->user->first_name,
                    'last_name' => $booking->user->last_name,
                    'email' => $booking->user->email,
                    'phone' => $booking->user->phone,
                    'status' => $booking->status,
                ];
            })->toArray(),
        ];
    }

    /**
     * Получить список участников тренировки
     */
    public function getWorkoutAttendees(int $workoutScheduleId, int $trainerId)
    {
        $workout = WorkoutSchedule::findOrFail($workoutScheduleId);

        // Проверяем авторизацию
        if ($workout->trainer_id !== $trainerId) {
            return back()->with('error', 'Нет доступа к этой тренировке');
        }

        return $workout->bookings()
            ->with('user')
            ->get()
            ->map(function ($booking) {
                return [
                    'booking_id' => $booking->id,
                    'user' => [
                        'id' => $booking->user->id,
                        'first_name' => $booking->user->first_name,
                        'last_name' => $booking->user->last_name,
                    ],
                    'status' => $booking->status,
                ];
            });
    }

    /**
     * Обновить статус присутствия
     */
    public function updateAttendanceStatus(int $bookingId, string $status, int $trainerId)
    {
        $booking = Booking::with('workoutSchedule')
            ->findOrFail($bookingId);

        // Проверяем, что это тренировка текущего тренера
        if ($booking->workoutSchedule->trainer_id !== $trainerId) {
            return back()->with('error', 'Нет доступа к изменению статуса');
        }

        $booking->update(['status' => $status]);
    }
}
