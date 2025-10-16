<?php

namespace App\Http\Controllers\WorkoutSchedule\Trainer;

use App\Http\Controllers\Controller;
use App\Service\Trainer\TrainerService;
use Inertia\Inertia;

class TrainerScheduleController extends Controller
{
    private TrainerService $trainerService;

    public function __construct(TrainerService $trainerService)
    {
        $this->trainerService = $trainerService;
    }

    public function index()
    {
        return Inertia::render('Trainer/Index', [
            'trainers' => $this->trainerService->getAllTrainers()
        ]);
    }

    public function show($id)
    {
        $trainer = $this->trainerService->getTrainerById($id);

        $schedules = $this->trainerService->getTrainerSchedule($trainer);

        return Inertia::render('Trainer/Show', [
            'trainer'   => $trainer,
            'schedules' => $schedules,
        ]);
    }
}
