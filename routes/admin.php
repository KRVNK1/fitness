<?php

use App\Http\Controllers\Admin\User\UserController;
use App\Http\Controllers\Admin\Membership\MembeshipController;
use App\Http\Controllers\Admin\Membership\MembeshipTypeController;
use App\Http\Controllers\Admin\Workout\WorkoutTypeController;
use App\Http\Controllers\Admin\Workout\WorkoutCategoryController;
use App\Http\Controllers\Admin\Workout\WorkoutScheduleController;
use App\Http\Controllers\Admin\Trainer\TrainerInfoController;
use App\Http\Controllers\Admin\Trainer\TrainerCategoryController;
use App\Http\Controllers\Admin\Booking\BookingController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    // Users
    Route::prefix('users')->name('users.')->group(function () {
        Route::get('/', [UserController::class, 'index'])->name('index');
        Route::post('/', [UserController::class, 'store'])->name('store');
        Route::put('/{user}', [UserController::class, 'update'])->name('update');
        Route::delete('/{user}', [UserController::class, 'destroy'])->name('destroy');
        Route::get('/export', [UserController::class, 'export'])->name('export');
    });

    // Memberships
    Route::resource('memberships', MembeshipController::class);
    Route::resource('membership-types', MembeshipTypeController::class);

    // Workouts
    Route::resource('workout-types', WorkoutTypeController::class);
    Route::resource('workout-categories', WorkoutCategoryController::class);
    Route::resource('workout-schedules', WorkoutScheduleController::class)->only(['index', 'show', 'destroy']);

    // Trainers
    Route::resource('trainers', TrainerInfoController::class);

    Route::get('trainer-specializations', [TrainerCategoryController::class, 'index'])->name('trainer-specializations.index');
    Route::post('trainers/{trainerId}/specializations', [TrainerCategoryController::class, 'store'])->name('trainer-specializations.store');
    Route::delete('trainers/{trainerId}/specializations/{categoryId}', [TrainerCategoryController::class, 'destroy'])->name('trainer-specializations.destroy');

    // Bookings
    Route::resource('bookings', BookingController::class)->only(['index', 'show', 'destroy']);
});