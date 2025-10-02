<?php

namespace App\Http\Controllers\WorkoutSchedule;

use App\Http\Controllers\Controller;
use App\Models\WorkoutCategory;
use App\Models\WorkoutSchedule;
use App\Models\WorkoutType;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WorkoutScheduleController extends Controller
{
    public function index(Request $request)
    {
        $categoryFilter = $request->get('categories');
        $intensityFilter = $request->get('intensity');
        $durationFilter = $request->get('duration');

        $query = WorkoutType::with(['workoutCategory'])
            ->whereHas('workoutCategory');


        if ($categoryFilter) {
            $query->where('workout_category_id', $categoryFilter);
        }

        if ($intensityFilter) {
            $query->where('intensivity_level', $intensityFilter);
        }

        if ($durationFilter) {
            $query->where('duration_minutes', $durationFilter);
        }

        $workouts = $query->paginate(30);

        $categories = WorkoutCategory::whereHas('workoutTypes')->get();
        $intensityLevels = WorkoutType::distinct()->pluck('intensivity_level')->filter()->sort()->values()->toArray();
        $durations = WorkoutType::distinct()->pluck('duration_minutes')->filter()->sort()->values()->toArray();

        return Inertia::render('WorkoutSchedule/Index', [
            'workouts' => $workouts,
            'categories' => $categories,
            'intensivityLevels' => $intensityLevels,
            'durations' => $durations,

            'categoryFilter' => $categoryFilter,
            'intensityFilter' => $intensityFilter,
            'durationFilter' => $durationFilter
        ]);
    }

    public function show($id) {

        $workout = WorkoutType::with(['workoutCategory'])->findOrFail($id);

        $schedules = WorkoutSchedule::where('workout_type_id', $id)
            ->with(['trainer'])
            ->where('start_time', '>=', now())
            ->orderBy('start_time')
            ->take(10)
            ->get();

        // dd($workout);

        return Inertia::render('WorkoutSchedule/Show', [
            'workout' => $workout,
            'schedules' => $schedules
        ]);
    }
}
