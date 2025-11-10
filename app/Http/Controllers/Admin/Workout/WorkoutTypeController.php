<?php

namespace App\Http\Controllers\Admin\Workout;

use App\Http\Controllers\Controller;
use App\Models\WorkoutType;
use App\Models\WorkoutCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WorkoutTypeController extends Controller
{
    public function index(Request $request)
    {
        $query = WorkoutType::with('workoutCategory');

        if ($request->filled('search')) {
            $query->where('name', 'like', "%{$request->input('search')}%");
        }

        if ($request->filled('category_id')) {
            $query->where('workout_category_id', $request->input('category_id'));
        }

        if ($request->filled('intensivity_level')) {
            $query->where('intensivity_level', $request->input('intensivity_level'));
        }

        $workoutTypes = $query->orderBy('created_at', 'desc')->paginate(7);
        $categories = WorkoutCategory::all();

        return Inertia::render('Admin/WorkoutTypes/Index', [
            'workoutTypes' => $workoutTypes,
            'categories' => $categories,
            'filters' => $request->only(['search', 'category_id', 'intensivity_level']),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'workout_category_id' => 'required|exists:workout_categories,id',
            'name' => 'required|string|max:255|unique:workout_types,name',
            'slug' => 'required|string|max:255|unique:workout_types,slug',
            'description' => 'nullable|string',
            'duration_minutes' => 'required|integer|min:1',
            'intensivity_level' => 'required|integer',
        ]);

        WorkoutType::create($validated);

        return redirect()->route('admin.workout-types.index')->with('success', 'Тренировка успешно создана.');
    }

    public function update(Request $request, WorkoutType $workoutType)
    {
        $validated = $request->validate([
            'workout_category_id' => 'required|exists:workout_categories,id',
            'name' => 'required|string|max:255|unique:workout_types,name,' . $workoutType->id,
            'slug' => 'required|string|max:255|unique:workout_types,slug,' . $workoutType->id,
            'description' => 'nullable|string',
            'duration_minutes' => 'required|integer|min:1',
            'intensivity_level' => 'required|integer',
        ]);

        $workoutType->update($validated);

        return redirect()->route('admin.workout-types.index')->with('success', 'Тренировка успешно обновлена.');
    }

    public function destroy(WorkoutType $workoutType)
    {
        $workoutType->delete();
        return redirect()->route('admin.workout-types.index')->with('success', 'Тренировка успешно удалена.');
    }
}
