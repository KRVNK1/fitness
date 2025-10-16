<?php

namespace App\Service\Trainer;

use App\Enums\User\UserEnum;
use App\Models\User;
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
            ->with(['trainerInfo'])
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
            ->with(['workoutType.workoutCategory'])
            ->whereBetween('start_time', [$startDate, $endDate])
            ->orderBy('start_time', 'asc')
            ->get()
            ->groupBy(function ($schedule) {
                return Carbon::parse($schedule->start_time)->format('Y-m-d');
            });
    }
}
