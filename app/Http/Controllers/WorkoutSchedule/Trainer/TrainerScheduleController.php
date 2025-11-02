<?php

namespace App\Http\Controllers\WorkoutSchedule\Trainer;

use App\Http\Controllers\Controller;
use App\Http\Resources\Trainer\TrainerResource;
use App\Service\Trainer\TrainerService;
use Inertia\Inertia;

class TrainerScheduleController extends Controller
{
    private TrainerService $trainerService;

    public function __construct(TrainerService $trainerService)
    {
        $this->trainerService = $trainerService;
    }

    /**
     * Показать всех тренеров
     */
    public function index()
    {
        return Inertia::render('Trainer/Index', [
            'trainers' => $this->trainerService->getAllTrainers()
        ]);
    }

    /**
     * Показать конкретного тренера с его расписанием
     */
    public function show($id)
    {
        $trainer = $this->trainerService->getTrainerById($id);

        $schedules = $this->trainerService->getTrainerSchedule($trainer);

        return Inertia::render('Trainer/Show', [
            'trainer'   => new TrainerResource($trainer),
            'schedules' => $schedules,
        ]);
    }
}
