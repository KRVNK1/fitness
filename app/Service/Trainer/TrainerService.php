<?php

namespace App\Service\Trainer;

use App\Enums\User\UserEnum;
use App\Models\User;
use App\Models\WorkoutSchedule;
use Carbon\Carbon;

class TrainerService
{
    /**
     * Получить всех тренеров
     */
    public function getAllTrainers()
    {
        return User::where('role', UserEnum::TRAINER)
            ->with(['trainerInfo'])
            ->get();
    }

    /**
     * Получить тренера по id
     */
    public function getTrainerById(int $id)
    {
        return User::where('role', UserEnum::TRAINER)
            ->with(['trainerInfo.specializations'])
            ->findOrFail($id);
    }

    /**
     * Получить расписание тренера
     */
    public function getTrainerSchedule(User $trainer)
    {
        $startDate = Carbon::now()->startOfDay();
        $endDate = Carbon::now()->addDays(14)->endOfDay();

        return $trainer->workoutSchedules()
            ->with(['workoutType.workoutCategory', 'bookings'])
            ->whereBetween('start_time', [$startDate, $endDate])
            ->orderBy('start_time', 'asc')
            ->get()
            ->groupBy(function ($schedule) {
                return Carbon::parse($schedule->start_time)->format('Y-m-d');
            });
    }

    /**
     * Получить групповые тренировки тренера
     */
    public function getTrainerGroupWorkouts(int $trainerId)
    {
        return WorkoutSchedule::where('trainer_id', $trainerId)
            ->with([
                'workoutType',
                'workoutType.workoutCategory',
                'bookings.user'
            ])
            ->where('start_time', '>=', now())
            ->orderBy('start_time', 'asc')
            ->get()
            ->map(function ($workout) {
                return [
                    'id' => $workout->id,
                    'workout_type' => $workout->workoutType,
                    'start_time' => $workout->start_time,
                    'end_time' => $workout->end_time,
                    'available_slots' => $workout->available_slots,
                    'booked_slots' => $workout->booked_slots,
                    'bookings_count' => $workout->bookings->count(),
                    'bookings' => $workout->bookings,
                ];
            });
    }
}
