<?php

use App\Http\Controllers\Membership\MembershipController;
use App\Http\Controllers\WorkoutSchedule\WorkoutScheduleController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [MembershipController::class, 'index'])->name('home');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::prefix('workouts')->name('workouts.')->group(function () {
    Route::get('/', [WorkoutScheduleController::class, 'index'])->name('index');
    Route::get('/{id}', [WorkoutScheduleController::class, 'show'])->name('show');
});

require __DIR__.'/auth.php';
require __DIR__.'/profile.php';
require __DIR__.'/membership.php';
