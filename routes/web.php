<?php

use App\Http\Controllers\Booking\BookingController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Membership\MembershipController;
use App\Http\Controllers\Trainer\TrainerController;
use App\Http\Controllers\WorkoutSchedule\WorkoutScheduleController;
use Illuminate\Support\Facades\Route;

Route::get('/', [MembershipController::class, 'index'])->name('home');

Route::get('/dashboard', [DashboardController::class, 'index'])
    ->middleware(['auth'])
    ->name('dashboard');

Route::prefix('workouts')->name('workouts.')->group(function () {
    Route::get('/', [WorkoutScheduleController::class, 'index'])->name('index');
    Route::get('/{id}', [WorkoutScheduleController::class, 'show'])->name('show');
});

Route::prefix('trainers')->name('trainers.')->group(function () {
    Route::get('/', [TrainerController::class, 'index'])->name('index');
    Route::get('/{id}', [TrainerController::class, 'show'])->name('show');
});

Route::middleware(['auth'])->group(function () {
    Route::prefix('bookings')->name('bookings.')->group(function () {
        Route::get('/', [BookingController::class, 'index'])->name('index');
        Route::post('/', [BookingController::class, 'store'])->name('store');
        Route::post('/{bookingId}/cancel', [BookingController::class, 'cancel'])->name('cancel');
    });
});

require __DIR__.'/auth.php';
require __DIR__.'/profile.php';
require __DIR__.'/membership.php';
