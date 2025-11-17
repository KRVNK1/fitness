<?php

namespace App\Http\Controllers\Admin\Workout;

use App\Http\Controllers\Controller;
use App\Models\WorkoutSchedule;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WorkoutScheduleController extends Controller
{
    public function index(Request $request)
    {
        $query = WorkoutSchedule::with(['trainer', 'workoutType']);

        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->whereHas('trainer', function ($q) use ($search) {
                $q->whereHas('user', function ($qq) use ($search) {
                    $qq->where('first_name', 'like', "%{$search}%")
                        ->orWhere('last_name', 'like', "%{$search}%");
                });
            });
        }

        if ($request->filled('trainer_id')) {
            $query->where('trainer_id', $request->input('trainer_id'));
        }

        if ($request->filled('date_from')) {
            $query->whereDate('start_time', '>=', $request->input('date_from'));
        }

        if ($request->filled('date_to')) {
            $query->whereDate('start_time', '<=', $request->input('date_to'));
        }

        if ($request->filled('status')) {
            $query->where('status', $request->input('status'));
        }

        $workoutSchedules = $query->orderBy('start_time', 'asc')->paginate(7)->appends($request->query());
        $trainers = User::where('role', 'trainer')->get();

        return Inertia::render('Admin/WorkoutSchedules/Index', [
            'workoutSchedules' => $workoutSchedules,
            'trainers' => $trainers,
            'filters' => $request->only(['search', 'trainer_id', 'date_from', 'date_to', 'status']),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'trainer_id' => 'required|exists:users,id',
            'workout_type_id' => 'required|exists:workout_types,id',
            'start_time' => 'required|date_format:Y-m-d H:i',
            'end_time' => 'required|date_format:Y-m-d H:i|after:start_time',
            'available_slots' => 'required|integer|min:1',
            'status' => 'required|in:scheduled,completed,cancelled',
        ]);

        WorkoutSchedule::create($validated);

        return back()->with('success', 'Расписание тренировки создано');
    }

    public function update(Request $request, WorkoutSchedule $workoutSchedule)
    {
        $validated = $request->validate([
            'trainer_id' => 'required|exists:users,id',
            'workout_type_id' => 'required|exists:workout_types,id',
            'start_time' => 'required|date_format:Y-m-d H:i',
            'end_time' => 'required|date_format:Y-m-d H:i|after:start_time',
            'available_slots' => 'required|integer|min:1',
            'status' => 'required|in:scheduled,completed,cancelled',
        ]);

        $workoutSchedule->update($validated);

        return back()->with('success', 'Расписание тренировки обновлено');
    }

    public function destroy(WorkoutSchedule $workoutSchedule)
    {
        $workoutSchedule->delete();
        return back()->with('success', 'Расписание тренировки успешно удалено');
    }
}
