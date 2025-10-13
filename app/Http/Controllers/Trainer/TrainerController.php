<?php

namespace App\Http\Controllers\Trainer;

use App\Http\Controllers\Controller;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TrainerController extends Controller
{
    public function index()
    {
        $trainers = User::where('role', 'trainer')
            ->with('trainerInfo')
            ->get();

        return Inertia::render('Trainer/Index', [
            'trainers' => $trainers
        ]);
    }

    public function show($id)
    {
        $trainer = User::where('role', 'trainer')
            ->with('trainerInfo')
            ->findOrFail($id);

        $startDate = Carbon::now()->startOfDay();
        $endDate = Carbon::now()->addDays(14)->endOfDay();

        $schedules = $trainer->workoutSchedules()
            ->with(['workoutType.workoutCategory'])
            ->whereBetween('start_time', [$startDate, $endDate])
            ->orderBy('start_time', 'asc')
            ->get()
            ->groupBy(function ($schedule) {
                return Carbon::parse($schedule->start_time)->format('Y-m-d');
            });

        return Inertia::render('Trainer/Show', [
            'trainer' => $trainer,
            'schedules' => $schedules,
        ]);
    }
}
