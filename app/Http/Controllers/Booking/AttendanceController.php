<?php

namespace App\Http\Controllers\Booking;

use App\Http\Controllers\Controller;
use App\Http\Requests\Booking\BookingRequest;
use App\Service\Booking\AttendanceService;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AttendanceController extends Controller
{
    private AttendanceService $attendanceService;

    public function __construct(AttendanceService $attendanceService)
    {
        $this->attendanceService = $attendanceService;
    }

    /**
     * Показать страницу с участниками тренировки и отметкой присутствия
     */
    public function show($workoutScheduleId)
    {
        return Inertia::render('Attendance/AttendanceTracker', [
            'workout' => $this->attendanceService->getWorkoutWithAttendees($workoutScheduleId, Auth::id()),
        ]);
    }

    /**
     * Обновить статус присутствия участника
     */
    public function updateAttendance(BookingRequest $request)
    {
        $this->attendanceService->updateAttendanceStatus(
            $request['booking_id'],
            $request['status'],
            Auth::id()
        );

        return back()->with('success', 'Статус посещения обновлён.');
    }
}
