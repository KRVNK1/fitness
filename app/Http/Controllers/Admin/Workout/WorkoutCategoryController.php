<?php

namespace App\Http\Controllers\Admin\Workout;

use App\Http\Controllers\Controller;
use App\Models\WorkoutCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WorkoutCategoryController extends Controller
{
    public function index(Request $request)
    {
        $query = WorkoutCategory::query();

        if ($request->filled('search')) {
            $query->where('name', 'like', "%{$request->input('search')}%");
        }

        $categories = $query->orderBy('created_at', 'desc')->paginate(7);

        return Inertia::render('Admin/WorkoutCategories/Index', [
            'categories' => $categories,
            'filters' => $request->only(['search']),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:workout_categories,name',
            'slug' => 'required|string|max:255|unique:workout_categories,slug',
        ]);

        WorkoutCategory::create($validated);

        return back()->with('success', 'Категория тренировок успешно создана.');
    }
    
    public function update(Request $request, WorkoutCategory $workoutCategory)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:workout_categories,name,' . $workoutCategory->id,
            'slug' => 'required|string|max:255|unique:workout_categories,slug,' . $workoutCategory->id,
        ]);

        $workoutCategory->update($validated);

        return back()->with('success', 'Категория тренировок успешно обновлена.');
    }

    public function destroy(WorkoutCategory $workoutCategory)
    {
        $workoutCategory->delete();
        return back()->with('success', 'Категория тренировок успешно удалена.');
    }
}
