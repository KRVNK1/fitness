<?php

use App\Http\Controllers\Booking\AttendanceController;
use App\Http\Controllers\Requests\TrainerApplicationController;
use Illuminate\Support\Facades\Route;

Route::middleware(['trainer'])->prefix('attendance')->name('attendance.')->group(function () {
    Route::get('/workout/{workoutScheduleId}', [AttendanceController::class, 'show'])->name('show');
    Route::post('/update', [AttendanceController::class, 'updateAttendance'])->name('update');
    Route::get('/attendees/{workoutScheduleId}', [AttendanceController::class, 'getAttendees'])->name('attendees');
});

Route::middleware('trainer')->prefix('requests')->name('requests.')->group(function () {
    // Заявки для тренера
    Route::get('/trainer', [TrainerApplicationController::class, 'trainerRequests'])->name('trainer');

    // Принять заявку (тренер)
    Route::post('/{id}/approve', [TrainerApplicationController::class, 'approve'])->name('approve');

    // Отклонить заявку (тренер)
    Route::post('/{id}/reject', [TrainerApplicationController::class, 'reject'])->name('reject');

    // Отменить принятую заявку (тренер)
    Route::post('/{id}/cancel-approved', [TrainerApplicationController::class, 'cancelApproved'])->name('cancel-approved');
});
