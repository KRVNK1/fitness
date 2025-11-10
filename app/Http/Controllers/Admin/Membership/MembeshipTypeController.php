<?php

namespace App\Http\Controllers\Admin\Membership;

use App\Http\Controllers\Controller;
use App\Models\MembershipType;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MembeshipTypeController extends Controller
{
    public function index(Request $request)
    {
        $query = MembershipType::query();
        
        $membershipTypes = $query->paginate(7);

        return Inertia::render('Admin/MembershipTypes/Index', [
            'membershipTypes' => $membershipTypes,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:membership_types,name',
            'slug' => 'required|string|max:255|unique:membership_types,slug',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'features' => 'nullable|array',
        ]);

        MembershipType::create($validated);

        return back()->with('success', 'Тип абонемента создан.');
    }

    public function update(Request $request, MembershipType $membershipType)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:membership_types,name,' . $membershipType->id,
            'slug' => 'required|string|max:255|unique:membership_types,slug,' . $membershipType->id,
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'features' => 'nullable|array',
        ]);

        $membershipType->update($validated);

        return back()->with('success', 'Тип абонемента обновлен.');
    }

    public function destroy(MembershipType $membershipType)
    {
        $membershipType->delete();
        return back()->with('success', 'Тип абонемента удален.');
    }
}
