<?php

namespace App\Http\Controllers\Booking;

use App\Http\Controllers\Controller;
use App\Http\Requests\Workout\WorkoutSchedule\WorkoutScheduleRequest;
use App\Service\Booking\BookingService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BookingController extends Controller
{
    protected BookingService $bookingService;

    public function __construct(BookingService $bookingService)
    {
        $this->bookingService = $bookingService;
    }

    /**
     * Создать бронирование на групповую тренировку
     */
    public function store(WorkoutScheduleRequest $request)
    {
        $result = $this->bookingService->createBooking(
            Auth::id(),
            $request->workout_schedule_id
        );

        if ($result['success']) {
            return redirect()->back()->with('success', $result['message']);
        }

        return redirect()->back()->with('error', $result['message']);
    }

    /**
     * Отменить бронирование
     */
    public function cancel($bookingId)
    {
        $result = $this->bookingService->cancelBooking(Auth::id(), $bookingId);

        if ($result['success']) {
            return redirect()->back()->with('success', $result['message']);
        }

        return redirect()->back()->with('error', $result['message']);
    }

    /**
     * Получить список бронирований пользователя
     */
    public function index(Request $request)
    {
        $bookings = $this->bookingService->getUserBookings(
            Auth::id(),
        );

        return response()->json([
            'bookings' => $bookings
        ]);
    }
}
