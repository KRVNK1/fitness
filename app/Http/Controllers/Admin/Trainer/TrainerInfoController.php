<?php

namespace App\Http\Controllers\Admin\Trainer;

use App\Http\Controllers\Controller;
use App\Models\TrainerInfo;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TrainerInfoController extends Controller
{
    public function index(Request $request)
    {
        $query = TrainerInfo::with('user');

        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->whereHas('user', function ($q) use ($search) {
                $q->where('first_name', 'like', "%{$search}%")
                    ->orWhere('last_name', 'like', "%{$search}%");
            });
        }

        if ($request->filled('experience')) {
            $experience = $request->input('experience');
            if ($experience === 'beginner') {
                $query->where('experience_years', '<', 2);
            } elseif ($experience === 'intermediate') {
                $query->whereBetween('experience_years', [2, 5]);
            } elseif ($experience === 'expert') {
                $query->where('experience_years', '>', 5);
            }
        }

        $trainers = $query->orderBy('created_at', 'asc')->paginate(7);

        return Inertia::render('Admin/Trainers/Index', [
            'trainers' => $trainers,
            'filters' => $request->only(['search', 'experience']),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id|unique:trainer_infos,user_id',
            'description' => 'nullable|string',
            'experience_years' => 'required|integer|min:0',
            'photo' => 'nullable|string',
            'specializations' => 'nullable|array',
            'specializations.*' => 'exists:workout_categories,id',
        ]);

        $trainerInfo = TrainerInfo::create([
            'user_id' => $validated['user_id'],
            'description' => $validated['description'] ?? null,
            'experience_years' => $validated['experience_years'],
            'photo' => $validated['photo'] ?? null,
        ]);

        if (!empty($validated['specializations'])) {
            $trainerInfo->specializations()->attach($validated['specializations']);
        }

        return back()->with('success', 'Информация о тренере создана.');
    }

    public function update(Request $request, TrainerInfo $trainerInfo)
    {
        $validated = $request->validate([
            'description' => 'nullable|string',
            'experience_years' => 'required|integer|min:0',
            'photo' => 'nullable|string',
            'specializations' => 'nullable|array',
            'specializations.*' => 'exists:workout_categories,id',
        ]);

        $trainerInfo->update([
            'description' => $validated['description'] ?? null,
            'experience_years' => $validated['experience_years'],
            'photo' => $validated['photo'] ?? null,
        ]);

        if (isset($validated['specializations'])) {
            $trainerInfo->specializations()->sync($validated['specializations']);
        }

        return back()->with('success', 'Информация о тренере обновлена.');
    }

    public function destroy(TrainerInfo $trainerInfo)
    {
        $trainerInfo->delete();
        return back()->with('success', 'Информация о тренере удалена.');
    }
}
