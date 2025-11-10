<?php

namespace App\Http\Controllers\Admin\Trainer;

use App\Http\Controllers\Controller;
use App\Models\TrainerInfo;
use App\Models\WorkoutCategory;
use App\Models\TrainerCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TrainerCategoryController extends Controller
{
    // Получение специализаций тренера
    public function index($trainerId)
    {
        $trainer = TrainerInfo::with('specializations')->findOrFail($trainerId);
        $allCategories = WorkoutCategory::all();

        return Inertia::render('Admin/Trainer/TrainerSpecializations', [
            'trainer' => $trainer,
            'specializations' => $trainer->specializations,
            'allCategories' => $allCategories,
        ]);
    }

    // Добавление категории (специализации) тренеру
    public function store(Request $request, $trainerId)
    {
        $request->validate([
            'workout_category_id' => 'required|exists:workout_categories,id',
        ]);

        $trainer = TrainerInfo::findOrFail($trainerId);

        // Проверяем, не добавлена ли уже эта категория
        $exists = TrainerCategory::where('trainer_info_id', $trainerId)
            ->where('workout_category_id', $request->workout_category_id)
            ->exists();

        if ($exists) {
            return back()->with('error', 'Эта категория уже добавлена тренеру.');
        }

        TrainerCategory::create([
            'trainer_info_id' => $trainerId,
            'workout_category_id' => $request->workout_category_id,
        ]);

        return back()->with('success', 'Категория добавлена тренеру.');
    }

    // Удаление категории (специализации) от тренера
    public function destroy($trainerId, $categoryId)
    {
        TrainerCategory::where('trainer_info_id', $trainerId)
            ->where('workout_category_id', $categoryId)
            ->delete();

        return back()->with('success', 'Категория удалена.');
    }
}
