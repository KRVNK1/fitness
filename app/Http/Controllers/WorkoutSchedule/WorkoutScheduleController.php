<?php

namespace App\Http\Controllers\WorkoutSchedule;

use App\Http\Controllers\Controller;
use App\Service\WorkoutSchedule\WorkoutScheduleService;
use Inertia\Inertia;

class WorkoutScheduleController extends Controller
{
    private $workoutScheduleService;

    public function __construct(WorkoutScheduleService $workoutScheduleService)
    {
        $this->workoutScheduleService = $workoutScheduleService;
    }

    /**
     * Показать полное расписание тренировок
     */
    public function index()
    {
        return Inertia::render('WorkoutSchedule/Index', [
            'schedules' => $this->workoutScheduleService->getWorkoutSchedule()
        ]);
    }

    /**
     * Показать каталог тренировок (страница групповых тренировок)
     */
    public function catalog()
    {
        return Inertia::render('WorkoutSchedule/Catalog', [
            'workouts'          => $this->workoutScheduleService->getCatalog(),
            'categories'        => $this->workoutScheduleService->getWorkoutCategory(),
            'intensivityLevels' => $this->workoutScheduleService->getIntensivityLevels(),
            'durations'         => $this->workoutScheduleService->getDurations(),
        ]);
    }

    /**
     * Показать конкретную тренировку с расписанием
     */
    public function show($id)
    {
        return Inertia::render('WorkoutSchedule/Show', [
            'workout'   => $this->workoutScheduleService->getWorkoutType($id),
            'schedules' => $this->workoutScheduleService->getWorkoutTypeSchedule($id)
        ]);
    }
}
