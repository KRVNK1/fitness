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
        Route::post('/trainer', [UserController::class, 'storeTrainer'])->name('store.trainer');
        Route::post('/{user}/trainer', [UserController::class, 'updateTrainer'])->name('update.trainer');
        Route::delete('/{user}', [UserController::class, 'destroy'])->name('destroy');
    });

    // Memberships
    Route::prefix('memberships')->name('memberships.')->group(function () {
        Route::get('/', [MembeshipController::class, 'index'])->name('index');
        Route::post('/', [MembeshipController::class, 'store'])->name('store');
        Route::put('/{membership}', [MembeshipController::class, 'update'])->name('update');
        Route::delete('/{membership}', [MembeshipController::class, 'destroy'])->name('destroy');
        Route::get('/export', [MembeshipController::class, 'export'])->name('export');
    });
    Route::prefix('membership-types')->name('memberships.')->group(function () {
        Route::get('/', [MembeshipTypeController::class, 'index'])->name('index');
        Route::post('/', [MembeshipTypeController::class, 'store'])->name('store');
        Route::put('/{membership_type}', [MembeshipTypeController::class, 'update'])->name('update');
        Route::delete('/{membership_type}', [MembeshipTypeController::class, 'destroy'])->name('destroy');
    });

    // Workouts
    Route::prefix('workout-types')->name('workout-types.')->group(function () {
        Route::get('/', [WorkoutTypeController::class, 'index'])->name('index');
        Route::post('/', [WorkoutTypeController::class, 'store'])->name('store');
        Route::post('/{workout_type}', [WorkoutTypeController::class, 'update'])->name('update');
        Route::delete('/{workout_type}', [WorkoutTypeController::class, 'destroy'])->name('destroy');
    });
    Route::resource('workout-categories', WorkoutCategoryController::class);
    Route::resource('workout-schedules', WorkoutScheduleController::class)->only(['index', 'show', 'destroy']);

    // Trainers
    Route::prefix('trainers')->name('trainers.')->group(function () {
        Route::get('/', [TrainerInfoController::class, 'index'])->name('index');
    });

    Route::get('trainer-specializations/{id}', [TrainerCategoryController::class, 'index'])->name('trainer-specializations.index');
    Route::post('trainers/{trainerId}/specializations', [TrainerCategoryController::class, 'store'])->name('trainer-specializations.store');
    Route::delete('trainers/{trainerId}/specializations/{categoryId}', [TrainerCategoryController::class, 'destroy'])->name('trainer-specializations.destroy');

    // Bookings
    Route::resource('bookings', BookingController::class)->only(['index', 'show', 'destroy']);
});