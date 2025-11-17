<?php

namespace App\Http\Controllers\Admin\User;

use App\Http\Controllers\Controller;
use App\Models\TrainerInfo;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $query = User::query()->with('trainerInfo');

        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('first_name', 'like', "%{$search}%")
                    ->orWhere('last_name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('phone', 'like', "%{$search}%");
            });
        }

        if ($request->filled('role')) {
            $query->where('role', $request->input('role'));
        }

        $users = $query->orderBy('id')->paginate(7)->appends($request->query());

        return Inertia::render('Admin/Users/Index', [
            'users' => $users,
            'filters' => $request->only(['search', 'role']),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'phone' => 'required|string|max:20',
            'password' => 'required|string|min:8|confirmed',
            'role' => 'required|in:client,trainer,admin',
        ]);

        User::create($validated);

        return back()->with('success', 'Пользователь успешно создан');
    }

    public function storeTrainer(Request $request)
    {
        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'phone' => 'required|string|max:20',
            'password' => 'required|string|min:8|confirmed',
            'role' => 'required|in:trainer',
            'description' => 'nullable|string',
            'experience_years' => 'required|integer|min:1',
            'photo' => 'nullable|image|max:2048',
        ]);

        try {
            $user = User::create([
                'first_name' => $validated['first_name'],
                'last_name' => $validated['last_name'],
                'email' => $validated['email'],
                'phone' => $validated['phone'],
                'password' => $validated['password'],
                'role' => $validated['role'],
            ]);

            $trainerData = [
                'user_id' => $user->id,
                'description' => $validated['description'] ?? null,
                'experience_years' => $validated['experience_years'] ?? null,
            ];

            if ($request->hasFile('photo')) {
                $path = $request->file('photo')->store('Workout/Trainers', 'public');
                $trainerData['photo'] = $path;
            }

            TrainerInfo::create($trainerData);

            return back()->with('success', 'Тренер успешно создан');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Ошибка при создании тренера: ' . $e->getMessage()]);
        }
    }

    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'phone' => 'required|string|max:20',
            'role' => 'required|in:client,trainer,admin',
        ]);

        $user->update($validated);

        return back()->with('success', 'Пользователь успешно обновлен');
    }

    public function updateTrainer(Request $request, User $user)
    {
        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'phone' => 'required|string|max:20',
            'role' => 'required|in:trainer',
            'description' => 'nullable|string',
            'experience_years' => 'required|integer|min:1',
            'photo' => 'nullable|image|max:2048',
        ]);

        try {
            $user->update([
                'first_name' => $validated['first_name'],
                'last_name' => $validated['last_name'],
                'email' => $validated['email'],
                'phone' => $validated['phone'],
                'role' => $validated['role'],
            ]);

            $trainerInfo = TrainerInfo::where('user_id', $user->id)->first();

            if (!$trainerInfo) {
                $trainerInfo = new TrainerInfo();
                $trainerInfo->user_id = $user->id;
            }

            $trainerInfo->description = $validated['description'] ?? null;
            $trainerInfo->experience_years = $validated['experience_years'] ?? null;

            if ($request->hasFile('photo')) {
                if ($trainerInfo->photo && Storage::exists('public/' . $trainerInfo->photo)) {
                    Storage::delete('public/' . $trainerInfo->photo);
                }
                $path = $request->file('photo')->store('Workout/Trainers', 'public');
                $trainerInfo->photo = $path;
            }

            $trainerInfo->save();

            return back()->with('success', 'Тренер успешно обновлен');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Ошибка при обновлении тренера: ' . $e->getMessage()]);
        }
    }

    public function destroy(User $user)
    {
        $user->delete();
        return back()->with('success', 'Пользователь успешно удален');
    }
}
