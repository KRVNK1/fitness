<?php

namespace App\Service\WorkoutSchedule;

use App\Enums\Workout\Schedule\WorkoutScheduleEnum;
use App\Models\WorkoutCategory;
use App\Models\WorkoutSchedule;
use App\Models\WorkoutType;
use Carbon\Carbon;

class WorkoutScheduleService
{
    /**
     * Получить полное расписание тренировок
     */
    public function getWorkoutSchedule()
    {
        return WorkoutSchedule::with(['trainer.trainerInfo', 'workoutType.workoutCategory', 'bookings'])
            ->where('start_time', '>=', now())
            ->where('status', WorkoutScheduleEnum::SCHEDULED)
            ->orderBy('start_time')
            ->get()
            ->groupBy(function ($schedule) {
                return Carbon::parse($schedule->start_time)->format('Y-m-d');
            });
    }

    /**  
     * Получить каталог тренировок
     */
    public function getCatalog()
    {
        return WorkoutType::with(['workoutCategory'])
            ->whereHas('workoutCategory')
            ->paginate(30);
    }

    /**
     * Получить тип тренировки
     */
    public function getWorkoutType($id)
    {
        return WorkoutType::with(['workoutCategory'])->findOrFail($id);
    }

    /**
     * Получить расписание конкретной тренировки
     */
    public function getWorkoutTypeSchedule($id)
    {
        return WorkoutSchedule::where('workout_type_id', $id)
            ->with(['trainer.trainerInfo', 'workoutType.workoutCategory', 'bookings'])
            ->where('start_time', '>=', now())
            ->orderBy('start_time')
            ->take(15)
            ->get()
            ->groupBy(function ($schedule) {
                return Carbon::parse($schedule->start_time)->format('Y-m-d');
            });
    }

    /**
     * Получить категории тренировок (фильтр)
     */
    public function getWorkoutCategory()
    {
        return WorkoutCategory::whereHas('workoutTypes')->get();
    }

    /**
     * Получить уровень интенсивности (фильтр)
     */
    public function getIntensivityLevels()
    {
        return WorkoutType::distinct()->pluck('intensivity_level')->sort()->values()->toArray();
    }

    /**
     * Получить длительность тренировки (фильтр)
     */
    public function getDurations()
    {
        return WorkoutType::distinct()->pluck('duration_minutes')->sort()->values()->toArray();
    }
}
