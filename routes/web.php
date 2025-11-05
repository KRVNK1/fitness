<?php

use App\Http\Controllers\Booking\AttendanceController;
use App\Http\Controllers\Booking\BookingController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Membership\MembershipController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Requests\TrainerApplicationController;
use App\Http\Controllers\Requests\UserApplicationController;
use App\Http\Controllers\WorkoutSchedule\Trainer\TrainerScheduleController;
use App\Http\Controllers\WorkoutSchedule\WorkoutScheduleController;
use Illuminate\Support\Facades\Route;

Route::get('/', [MembershipController::class, 'index'])->name('home');
Route::get('users/export/', [ProfileController::class, 'export']);

Route::get('/dashboard', [DashboardController::class, 'index'])
    ->middleware(['auth'])
    ->name('dashboard');

Route::prefix('workouts')->name('workouts.')->group(function () {
    Route::get('/catalog', [WorkoutScheduleController::class, 'catalog'])->name('catalog');

    Route::prefix('schedule')->name('schedule.')->group(function () {
        Route::get('/', [WorkoutScheduleController::class, 'index'])->name('index');
        Route::get('/{id}', [WorkoutScheduleController::class, 'show'])->name('show');
    });
});

Route::prefix('trainers')->name('trainers.')->group(function () {
    Route::get('/', [TrainerScheduleController::class, 'index'])->name('index');
    Route::get('/schedule/{id}', [TrainerScheduleController::class, 'show'])->name('show');
});

Route::middleware(['auth'])->group(function () {
    Route::prefix('bookings')->name('bookings.')->group(function () {
        Route::get('/', [BookingController::class, 'index'])->name('index');
        Route::post('/', [BookingController::class, 'store'])->name('store');
        Route::post('/{bookingId}/cancel', [BookingController::class, 'cancel'])->name('cancel');
    });

    Route::prefix('attendance')->name('attendance.')->group(function () {
        Route::get('/workout/{workoutScheduleId}', [AttendanceController::class, 'show'])->name('show');
        Route::post('/update', [AttendanceController::class, 'updateAttendance'])->name('update');
        Route::get('/attendees/{workoutScheduleId}', [AttendanceController::class, 'getAttendees'])->name('attendees');
    });

    Route::prefix('requests')->name('requests.')->group(function () {
        // Создание заявки
        Route::post('/', [UserApplicationController::class, 'store'])->name('store');

        // Заявки пользователя
        Route::get('/my-applications', [UserApplicationController::class, 'userApplications'])->name('user');

        // Отмена заявки пользователем
        Route::delete('/{id}/cancel', [UserApplicationController::class, 'cancel'])->name('cancel');

        // Заявки для тренера
        Route::get('/trainer', [TrainerApplicationController::class, 'trainerRequests'])->name('trainer');

        // Принять заявку (тренер)
        Route::post('/{id}/approve', [TrainerApplicationController::class, 'approve'])->name('approve');

        // Отклонить заявку (тренер)
        Route::post('/{id}/reject', [TrainerApplicationController::class, 'reject'])->name('reject');

        // Отменить принятую заявку (тренер)
        Route::post('/{id}/cancel-approved', [TrainerApplicationController::class, 'cancelApproved'])->name('cancel-approved');
    });
});

require __DIR__ . '/auth.php';
require __DIR__ . '/profile.php';
require __DIR__ . '/membership.php';
