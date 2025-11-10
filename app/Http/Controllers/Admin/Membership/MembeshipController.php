<?php

namespace App\Http\Controllers\Admin\Membership;

use App\Http\Controllers\Controller;
use App\Models\Membership;
use App\Models\MembershipType;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MembeshipController extends Controller
{
    public function index(Request $request)
    {
        $query = Membership::with(['user', 'membershipType']);

        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->whereHas('user', function ($q) use ($search) {
                $q->where('first_name', 'like', "%{$search}%")
                    ->orWhere('last_name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            });
        }

        if ($request->filled('status')) {
            $query->where('status', $request->input('status'));
        }

        if ($request->filled('membership_type_id')) {
            $query->where('membership_type_id', $request->input('membership_type_id'));
        }

        $memberships = $query->orderBy('created_at', 'asc')->paginate(7);
        $membershipTypes = MembershipType::all();

        return Inertia::render('Admin/Memberships/Index', [
            'memberships' => $memberships,
            'membershipTypes' => $membershipTypes,
            'filters' => $request->only(['search', 'status', 'membership_type_id']),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'membership_type_id' => 'required|exists:membership_types,id',
            'remaining_days' => 'required|integer|min:0',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
            'status' => 'required|in:active,expired,cancelled',
        ]);

        Membership::create($validated);

        return back()->with('success', 'Абонемент для пользователя создан.');
    }

    public function update(Request $request, Membership $membership)
    {
        $validated = $request->validate([
            'remaining_days' => 'required|integer|min:0',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
            'status' => 'required|in:active,expired,canceled',
        ]);

        $membership->update($validated);

        return back()->with('success', 'Абонемент пользователя обновлен.');
    }

    public function destroy(Membership $membership)
    {
        $membership->delete();
        return back()->with('success', 'Абонемент пользователя удален.');
    }
}
