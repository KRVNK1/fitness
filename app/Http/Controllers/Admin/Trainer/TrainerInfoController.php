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
            $query->where(function ($q) use ($search) {
                $q->where('first_name', 'like', "%{$search}%")
                    ->orWhere('last_name', 'like', "%{$search}%");
            });
        }

        $trainers = $query->orderBy('created_at', 'asc')->paginate(7)->appends($request->query());

        return Inertia::render('Admin/Trainers/Index', [
            'trainers' => $trainers,
            'filters' => $request->only(['search']),
        ]);
    }
}
